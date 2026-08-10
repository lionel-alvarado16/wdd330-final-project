// Function to render the list of tracks on the screen
export function displayTracks(tracks, container) {
    // Clear the container to remove previous search results
    container.innerHTML = "";

    // If search yields no results, show a message
    if (!tracks || tracks.length === 0) {
        container.innerHTML = `<p class="no-results">No tracks found. Try another search!</p>`;
    }

    if (!tracks || tracks.length === 0) {
        container.innerHTML = '<p class="no-results">No tracks found. Try another search!</p>';
        return;
    }

    // Loop through each track in the array and build its HMTL card
    tracks.forEach((track) => {
        // Create the container element for the track card
        const trackCard = document.createElement("article");
        trackCard.classList.add("track-card");

        // Replace image dimensions with a higher resolution (600x600)
        const artworkUrl = track.artworkUrl100 ? track.artworkUrl100.replace("100x100bb", "600x600bb") : "https://placehold.co/300x300?text=No+Cover";

        // Build the card structure using Template Literals
        trackCard.innerHTML = `
            <img src="${artworkUrl}" alt="${track.trackName} cover" class="track-image"/>
            <div class="track-info">
                <h3 class="track-title">${track.trackName}</h3>
                <p class="track-artist">${track.artistName}</p>
                <p class="track-album">${track.collectionName || "Single"}</p>
                <audio controls src="${track.previewUrl}"></audio>
                <button class="details-btn" data-id="${track.trackId}">View Details</button>
        `;

        // Append the completed card
        container.appendChild(trackCard);
    });
}    