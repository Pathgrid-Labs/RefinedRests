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
        "/5 (" + reviewCount + " ratings)";

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
    const addressElement = document.createElement("p");
    addressElement.textContent = bathroom.address;

    const descriptionElement = document.createElement("p");
    descriptionElement.textContent = bathroom.description;

    const ratingElement = createRatingDisplay(bathroom.reviews);
    const popupContent = document.createElement("div");
    popupContent.append(addressElement, descriptionElement, ratingElement);

    const directionsLink = document.createElement("a");
    directionsLink.textContent = "Get directions";
    directionsLink.href =
        "https://www.google.com/maps/dir/?api=1&destination=" +
        bathroom.latitude + "%2C" + bathroom.longitude;
    directionsLink.target = "_blank";
    directionsLink.rel = "noopener noreferrer";

    const directionsElement = document.createElement("p");
    directionsElement.appendChild(directionsLink);
    popupContent.appendChild(directionsElement);

    const tags = [];
    for (const tag of bathroom.tags || []) {
        tags.push(tag);
    }

    for (const review of bathroom.reviews) {
        if (!Array.isArray(review.tags)) {
            continue;
        }

        for (const tag of review.tags) {
            if (!tags.includes(tag)) {
                tags.push(tag);
            }
        }
    }

    const flairs = createFlairs(tags);
    if (flairs) {
        popupContent.appendChild(flairs);
    }

    return popupContent;
}

