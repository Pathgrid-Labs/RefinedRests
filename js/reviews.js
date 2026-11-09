function createReviewForm(bathroomId, onSaved) {
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

    const actions = document.createElement("div");
    actions.className = "review-actions";
    const submit = document.createElement("button");
    submit.type = "submit";
    submit.textContent = "Submit review";
    actions.appendChild(submit);

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        if (submit.disabled) {
            return;
        }

        const selectedRating = form.querySelector('input[name="rating"]:checked');
        if (!selectedRating) {
            message.textContent = "Choose a rating from 1 to 5.";
            return;
        }

        const rating = Number(selectedRating.value);
        const tags = [];
        const selectedTags = form.querySelectorAll('input[name="tags"]:checked');
        for (const tag of selectedTags) {
            tags.push(tag.value);
        }

        submit.disabled = true;
        ratingGroup.disabled = true;
        tagGroup.disabled = true;
        message.textContent = "Saving your review…";

        let bathroom;

        try {
            const response = await fetch(
                "http://localhost:3001/api/bathrooms/" + bathroomId + "/reviews",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ rating: rating, tags: tags })
                }
            );

            if (!response.ok) {
                message.textContent = "Could not save your review. Please try again.";
                return;
            }

            bathroom = await response.json();
        } catch {
            message.textContent = "Could not save your review. Check your connection and try again.";
            return;
        } finally {
            submit.disabled = false;
            ratingGroup.disabled = false;
            tagGroup.disabled = false;
        }

        onSaved(bathroom);
    });

    form.append(ratingGroup, tagGroup, message, actions);
    return form;
}
