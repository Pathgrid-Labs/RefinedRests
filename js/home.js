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
    ratingElement.className = "restroom-rating";
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
    const roundedRating = Math.round(averageRating * 4) / 4;

    const iconsElement = document.createElement("span");
    iconsElement.className = "rating-icons";
    iconsElement.setAttribute("aria-hidden", "true");

    for (let position = 1; position <= 5; position++) {
        let fill = 0;

        if (position <= roundedRating) {
            fill = 100;
        } else if (position - 1 < roundedRating) {
            fill = (roundedRating - (position - 1)) * 100;
        }

        const icon = document.createElement("img");
        icon.src = "images/toilet_ratings/normal_" + fill + ".png";
        icon.alt = "";

        const iconContainer = document.createElement("span");
        iconContainer.className = "rating-icon";

        if (fill > 0 && fill < 100) {
            const outline = document.createElement("img");
            outline.src = "images/toilet_ratings/normal_0.png";
            outline.alt = "";
            outline.className = "rating-icon-outline";
            iconContainer.appendChild(outline);
        }

        iconContainer.appendChild(icon);
        iconsElement.appendChild(iconContainer);
    }

    const scoreElement = document.createElement("span");
    scoreElement.textContent =
        " " + averageRating.toFixed(1) +
        "/5 (" + reviewCount + " sample ratings)";

    ratingElement.append(iconsElement, scoreElement);
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
    let selectedRestroom = null;

    restroomList.replaceChildren();

    function showSelectedCard() {
        if (!selectedRestroom) {
            return;
        }

        const cardBounds = selectedRestroom.card.getBoundingClientRect();
        const listBounds = restroomList.getBoundingClientRect();

        if (cardBounds.top < listBounds.top) {
            restroomList.scrollTop += cardBounds.top - listBounds.top;
        } else if (cardBounds.bottom > listBounds.bottom) {
            restroomList.scrollTop += cardBounds.bottom - listBounds.bottom;
        }
    }

    function clearSelection() {
        if (!selectedRestroom) {
            return;
        }

        const restroom = selectedRestroom;
        selectedRestroom = null;

        restroom.card.classList.remove("selected");
        restroom.card.setAttribute("aria-pressed", "false");
        restroom.info.close();
        restroom.showDetails();
    }

    function selectRestroom(restroom) {
        if (selectedRestroom === restroom) {
            return;
        }

        clearSelection();

        selectedRestroom = restroom;
        restroom.card.classList.add("selected");
        restroom.card.setAttribute("aria-pressed", "true");

        map.panTo(restroom.marker.position);

        restroom.info.open({
            map: map,
            anchor: restroom.marker,
            shouldFocus: false
        });

        showSelectedCard();
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

        function showDetails() {
            const content = createPopupContent(bathroom);
            const reviewButton = document.createElement("button");
            reviewButton.type = "button";
            reviewButton.className = "leave-review-button";
            reviewButton.textContent = "Leave a review";
            reviewButton.addEventListener("click", showReview);
            content.appendChild(reviewButton);
            info.setHeaderContent(bathroom.bathroomName);
            info.setContent(content);
        }

        function showReview() {
            const header = document.createElement("div");
            header.className = "review-popup-header";
            const back = document.createElement("button");
            back.type = "button";
            back.textContent = "← Back";
            back.addEventListener("click", function () {
                showDetails();
                info.getContent().querySelector("button").focus();
            });
            const title = document.createElement("strong");
            title.textContent = "Review " + bathroom.bathroomName;
            header.append(back, title);

            const form = createReviewForm();
            info.setHeaderContent(header);
            info.setContent(form);
            back.focus();
        }

        showDetails();

        let searchText = bathroom.bathroomName + " " + bathroom.address;
        for (const tag of bathroom.tags || []) {
            searchText += " " + tag;
        }

        const restroom = {
            card: card,
            marker: marker,
            info: info,
            showDetails: showDetails,
            searchText: searchText.toLowerCase()
        };

        card.setAttribute("aria-pressed", "false");

        info.addListener("closeclick", function () {
            if (selectedRestroom === restroom) {
                clearSelection();
            }
        });

        marker.addListener("click", function () {
            selectRestroom(restroom);
        });

        card.addEventListener("click", function () {
            if (selectedRestroom === restroom) {
                clearSelection();
                return;
            }

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
                if (restroom.marker.map !== map) {
                    restroom.marker.map = map;
                }
                restroom.card.style.display = "";
            } else {
                if (selectedRestroom === restroom) {
                    clearSelection();
                }
                if (restroom.marker.map) {
                    restroom.marker.map = null;
                }
                restroom.card.style.display = "none";
            }
        }

        showSelectedCard();
    }

    function filterRestrooms(value) {
        sidebarSearch.value = value;
        mapSearch.value = value;

        clearSelection();

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
