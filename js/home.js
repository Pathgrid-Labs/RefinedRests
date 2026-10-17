async function initMap() {

    //fetch bathroom data from the backend api
    const response = await fetch("http://localhost:3001/api/bathrooms");

    if (!response.ok) {
        throw new Error("Could not load restrooms.");
    }

    const bathrooms = await response.json();


    // Create one map shared by all restroom markers.
    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 39.71084367645474, lng: -75.12028505092695 },
        zoom: 17,
        mapId: "DEMO_MAP_ID"
    });

    const restroomList = document.getElementById("restroom-list");

    restroomList.replaceChildren();

    let openRestroomInfo = null;

    for (const bathroom of bathrooms) {
        const card = document.createElement("button");
        card.type = "button";
        card.className = "restroom-card";

        const cardName = document.createElement("strong");
        cardName.textContent = bathroom.bathroomName;

        const cardAddress = document.createElement("span");
        cardAddress.textContent = bathroom.address;

        card.append(cardName, cardAddress);
        restroomList.appendChild(card);

        const restroomMarker = new google.maps.marker.AdvancedMarkerElement({
            map: map,
            position: {
                lat: bathroom.latitude,
                lng: bathroom.longitude
            },
            title: bathroom.bathroomName
        });

        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = bathroom.description;


        //rating element -------------------------------------------------------------------------------------------------------------------------
        const ratingElement = document.createElement("p");
        const reviewCount = bathroom.reviews.length;

        if (reviewCount === 0) {
            ratingElement.textContent = "No ratings yet.";
        }
        else {
            let totalRating = 0;

            for (const review of bathroom.reviews) {
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

            //add the numeric rating to the right of the stars
            const scoreElement = document.createElement("span");
            scoreElement.textContent =
                " " + averageRating.toFixed(1) +
                "/5 (" + reviewCount + " sample ratings)";

            ratingElement.append(starsElement, scoreElement);
        }

        const popupContent = document.createElement("div");
        popupContent.append(descriptionElement, ratingElement);


        const restroomInfo = new google.maps.InfoWindow({
            headerContent: bathroom.bathroomName,
            content: popupContent
        });

        // Cards and markers share the same selection behavior.
        function selectRestroom() {
            if (openRestroomInfo) {
                openRestroomInfo.close();
            }

            map.panTo(restroomMarker.position);

            restroomInfo.open({
                map: map,
                anchor: restroomMarker
            });

            openRestroomInfo = restroomInfo;
        }

        restroomMarker.addListener("click", selectRestroom);
        card.addEventListener("click", selectRestroom);
    }
}

const mapsScript = document.createElement("script");
mapsScript.src =
    "https://maps.googleapis.com/maps/api/js?key=" +
    GOOGLE_MAPS_API_KEY +
    "&loading=async&libraries=marker&callback=initMap";
mapsScript.async = true;
document.head.appendChild(mapsScript);
