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

            const form = createReviewForm(bathroom.bathroomId, function (updatedBathroom) {
                bathroom.reviews = updatedBathroom.reviews;

                if (info.getContent() === form) {
                    showDetails();
                    const message = document.createElement("p");
                    message.setAttribute("role", "status");
                    message.textContent = "Your review was saved.";
                    info.getContent().appendChild(message);
                    info.getContent().querySelector("button").focus();
                }
            });
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
