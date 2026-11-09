function createReviewForm() {
    const form = document.createElement("form");
    form.className = "review-form";

    const ratingGroup = document.createElement("fieldset");
    const ratingLegend = document.createElement("legend");
    ratingLegend.textContent = "Choose a rating";
    const ratingOptions = document.createElement("div");
    ratingOptions.className = "review-rating-options";
    const ratingImages = [];

    for (let rating = 1; rating <= 5; rating++) {
        const label = document.createElement("label");
        label.className = "review-rating-choice";

        const input = document.createElement("input");
        input.type = "radio";
        input.className = "sr-only";
        input.name = "rating";
        input.value = rating;
        input.required = true;
        input.setAttribute("aria-label", rating + " out of 5 toilets");

        const image = document.createElement("img");
        image.src = "images/toilet_ratings/normal_0.png";
        image.alt = "";
        label.title = rating + " out of 5 toilets";
        ratingImages.push(image);

        input.addEventListener("change", function () {
            for (let index = 0; index < ratingImages.length; index++) {
                let fill = 0;
                if (index < rating) {
                    fill = 100;
                }
                ratingImages[index].src = "images/toilet_ratings/normal_" + fill + ".png";
            }
        });

        label.append(input, image);
        ratingOptions.appendChild(label);
    }

    ratingGroup.append(ratingLegend, ratingOptions);

    const tagGroup = document.createElement("fieldset");
    const tagLegend = document.createElement("legend");
    tagLegend.textContent = "Select tags (optional)";
    const tagOptions = document.createElement("div");
    tagOptions.className = "review-tag-options";
    const allowedTags = ["Old", "Modern", "Clean", "Accessible", "Urinals", "Stalls"];

    for (const tag of allowedTags) {
        const label = document.createElement("label");
        const input = document.createElement("input");
        input.type = "checkbox";
        input.name = "tags";
        input.value = tag;
        label.append(input, document.createTextNode(" " + tag));
        tagOptions.appendChild(label);
    }

    tagGroup.append(tagLegend, tagOptions);

    const message = document.createElement("p");
    message.setAttribute("role", "status");
    message.textContent = "Review saving is not connected yet.";

    const actions = document.createElement("div");
    actions.className = "review-actions";
    const submit = document.createElement("button");
    submit.type = "submit";
    submit.textContent = "Submit review";
    submit.disabled = true;
    actions.appendChild(submit);

    form.addEventListener("submit", function (event) {
        event.preventDefault();
    });

    form.append(ratingGroup, tagGroup, message, actions);
    return form;
}
