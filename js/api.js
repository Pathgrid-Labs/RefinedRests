const API_BASE_URL = "http://localhost:3001/api";

async function loadBathrooms() {
    const response = await fetch(API_BASE_URL + "/bathrooms");

    if (!response.ok) {
        throw new Error("Could not load restrooms.");
    }

    return await response.json();
}

async function saveReview(bathroomId, rating, tags) {
    const response = await fetch(
        API_BASE_URL + "/bathrooms/" + bathroomId + "/reviews",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ rating: rating, tags: tags })
        }
    );

    if (!response.ok) {
        return null;
    }

    return await response.json();
}
