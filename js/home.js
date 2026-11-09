async function loadBathrooms() {
    const response = await fetch("http://localhost:3001/api/bathrooms");

    if (!response.ok) {
        throw new Error("Could not load restrooms.");
    }

    return await response.json();
}

function createFlairs(tags) {
    if (!Array.isArray(tags) || tags.length === 0) {
        return null;
    }

    const flairs = document.createElement("span");
    flairs.className = "restroom-flairs";

    for (const tag of tags) {
        const flair = document.createElement("span");
        flair.className = "restroom-flair";
        flair.textContent = tag;
        flairs.appendChild(flair);
    }

    return flairs;
}

function createRatingDisplay(reviews) {
    const ratingElement = document.createElement("p");
    const reviewCount = reviews.length;

    if (reviewCount === 0) {
        ratingElement.textContent = "No ratings yet.";
        return ratingElement;
    }

    let totalRating = 0;

    for (const review of reviews) {
        totalRating += review.rating;
    }

    const averageRating = totalRating / reviewCount;
    const roundedRating = Math.round(averageRating * 2) / 2;
    const fullStarCount = Math.floor(roundedRating);
    const hasHalfStar = roundedRating % 1 !== 0;

    const starsElement = document.createElement("span");
    starsElement.style.color = "#8A6200";
    starsElement.style.fontSize = "22px";
    starsElement.setAttribute("aria-hidden", "true");

    for (let position = 1; position <= 5; position++) {
        const star = document.createElement("span");

        if (position <= fullStarCount) {
            star.textContent = "★";
        } else if (position === fullStarCount + 1 && hasHalfStar) {
            star.className = "half-star";
            star.textContent = "☆";
        } else {
            star.textContent = "☆";
        }

        starsElement.appendChild(star);
    }

    const scoreElement = document.createElement("span");
    scoreElement.textContent =
        " " + averageRating.toFixed(1) +
        "/5 (" + reviewCount + " sample ratings)";

    ratingElement.append(starsElement, scoreElement);
    return ratingElement;
}

function createRestroomCard(bathroom) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "restroom-card";

    const cardName = document.createElement("strong");
    cardName.textContent = bathroom.bathroomName;

    const cardAddress = document.createElement("span");
    cardAddress.textContent = bathroom.address;

    card.append(cardName, cardAddress);

    const flairs = createFlairs(bathroom.tags);
    if (flairs) {
        card.appendChild(flairs);
    }

    return card;
}

function createPopupContent(bathroom) {
    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = bathroom.description;

    const ratingElement = createRatingDisplay(bathroom.reviews);
    const popupContent = document.createElement("div");
    popupContent.append(descriptionElement, ratingElement);

    const flairs = createFlairs(bathroom.tags);
    if (flairs) {
        popupContent.appendChild(flairs);
    }

    return popupContent;
}

async function initMap() {
    const bathrooms = await loadBathrooms();

    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 39.71084367645474, lng: -75.12028505092695 },
        zoom: 17,
        mapId: "DEMO_MAP_ID"
    });

    const restroomList = document.getElementById("restroom-list");
    const sidebarSearch = document.getElementById("sidebar-search");
    const mapSearch = document.getElementById("map-search");
    const searchableRestrooms = [];
    let openRestroomInfo = null;

    restroomList.replaceChildren();

    function selectRestroom(restroom) {
        if (openRestroomInfo) {
            openRestroomInfo.close();
        }

        map.panTo(restroom.marker.position);

        restroom.info.open({
            map: map,
            anchor: restroom.marker
        });

        openRestroomInfo = restroom.info;
    }

    function addRestroom(bathroom) {
        const card = createRestroomCard(bathroom);
        restroomList.appendChild(card);

        const marker = new google.maps.marker.AdvancedMarkerElement({
            map: map,
            position: {
                lat: bathroom.latitude,
                lng: bathroom.longitude
            },
            title: bathroom.bathroomName
        });

        const info = new google.maps.InfoWindow({
            headerContent: bathroom.bathroomName,
            content: createPopupContent(bathroom)
        });

        let searchText = bathroom.bathroomName + " " + bathroom.address;
        for (const tag of bathroom.tags || []) {
            searchText += " " + tag;
        }

        const restroom = {
            card: card,
            marker: marker,
            info: info,
            searchText: searchText.toLowerCase()
        };

        marker.addListener("click", function () {
            selectRestroom(restroom);
        });

        card.addEventListener("click", function () {
            selectRestroom(restroom);
        });

        searchableRestrooms.push(restroom);
    }

    function updateVisibleMarkers() {
        const bounds = map.getBounds();

        if (!bounds) {
            return;
        }

        const query = sidebarSearch.value.trim().toLowerCase();

        for (const restroom of searchableRestrooms) {
            const matchesSearch = restroom.searchText.includes(query);
            const isInMap = bounds.contains(restroom.marker.position);

            if (matchesSearch && isInMap) {
                restroom.marker.map = map;
                restroom.card.style.display = "";
            } else {
                restroom.info.close();
                if (openRestroomInfo === restroom.info) {
                    openRestroomInfo = null;
                }
                restroom.marker.map = null;
                restroom.card.style.display = "none";
            }
        }
    }

    function filterRestrooms(value) {
        sidebarSearch.value = value;
        mapSearch.value = value;

        if (openRestroomInfo) {
            openRestroomInfo.close();
            openRestroomInfo = null;
        }

        updateVisibleMarkers();
    }

    for (const bathroom of bathrooms) {
        addRestroom(bathroom);
    }

    map.addListener("idle", updateVisibleMarkers);
    updateVisibleMarkers();

    sidebarSearch.addEventListener("input", function () {
        filterRestrooms(sidebarSearch.value);
    });

    mapSearch.addEventListener("input", function () {
        filterRestrooms(mapSearch.value);
    });
}

function loadGoogleMaps() {
    const mapsScript = document.createElement("script");
    mapsScript.src =
        "https://maps.googleapis.com/maps/api/js?key=" +
        GOOGLE_MAPS_API_KEY +
        "&loading=async&libraries=marker&callback=initMap";
    mapsScript.async = true;
    document.head.appendChild(mapsScript);
}

loadGoogleMaps();
