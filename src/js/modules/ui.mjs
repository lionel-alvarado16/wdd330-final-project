import { qs } from "./utils.mjs";
import { addFavorite, removeFavorite, isFavorite } from "./storage.mjs";
import { getArtistBio } from "./api.mjs";

// Function to render the list of tracks on the screen
export function displayTracks(tracks, container) {
    // Clear the container to remove previous search results
    container.innerHTML = "";

    // Show a friendly message if the API returns no results
    if (!tracks || tracks.length === 0) {
        container.innerHTML = '<p class="no-results">No tracks found. Try searching for another artist or song!</p>';
        return;
    }

    // Get references to modal DOM elements
    const modal = qs("#details-modal");
    const modalBody = qs("#modal-details-body");
    const closeModalBtn = qs("#close-modal");

    // Loop through each track object returned by iTunes
    tracks.forEach((track) => {
        // Create the container element for the track card
        const trackCard = document.createElement("article");
        trackCard.classList.add("track-card");

        // Check if current track is already in favorites
        const favorited = isFavorite(track.trackId);
        const favIcon = favorited ? "❤️" : "🤍";
        const favLabel = favorited ? "Remove from Favorites" : "Add to Favorites";

        // Replace image dimensions with a higher resolution (600x600)
        const artworkUrl = track.artworkUrl100 ? track.artworkUrl100.replace("100x100bb", "600x600bb") : "https://placehold.co/300x300?text=No+Cover";

        // Build the card structure using Template Literals
        trackCard.innerHTML = `
            <div class="card-image-container">
                <img src="${artworkUrl}" alt="${track.trackName} cover" class="track-image"/>
                <button class="fav-btn" title="${favLabel}">${favIcon}</button>
            </div>
    
            <div class="track-info">
                <h3 class="track-title">${track.trackName}</h3>
                <p class="track-artist">${track.artistName}</p>
                <p class="track-album">${track.collectionName || "Single"}</p>
            </div>

            <audio controls src="${track.previewUrl}"></audio>
            <button class="details-btn">View Details</button>
        `;

        // Event listener for Favorite button click
        const favBtn = trackCard.querySelector(".fav-btn");
        favBtn.addEventListener("click", () => {
            if (isFavorite(track.trackId)) {
                removeFavorite(track.trackId);

                // If we are currently on the favorites page (#favorites-grid), remove the card directly from screen
                if (container.id === "favorites-grid") {
                    trackCard.remove();
                    // Show empty state message if no cards remain
                    if (container.children.length === 0) {
                        container.innerHTML = '<p class="no-results">You have no saved favorite tracks yet!</p>';
                    }
                } else {
                    favBtn.textContent = "🤍";
                    favBtn.setAttribute("title", "Add to Favorites");
                }
            } else {
                const trackToSave = {
                    trackId: track.trackId,
                    trackName: track.trackName,
                    artistName: track.artistName,
                    artworkUrl100: track.artworkUrl100,
                    previewUrl: track.previewUrl
                };
                addFavorite(trackToSave);
                favBtn.textContent = "❤️";
                favBtn.setAttribute("title", "Remove from Favorites");
            }
        });

        // Attach click event to "View Details" button for this specific track
        const detailsBtn = trackCard.querySelector(".details-btn");
        detailsBtn.addEventListener("click", async () => {
            // Render basic modal structure with a placeholder for artist bio
            modalBody.innerHTML = `
                <h2>${track.trackName}</h2>
                <p><strong>Artist:</strong> ${track.artistName}</p>
                <p><strong>Album:</strong> ${track.collectionName || "N/A"}</p>
                <p><strong>Genre:</strong> ${track.primaryGenreName || "N/A"}</p>
                <p><strong>Price:</strong> $${track.trackPrice || "N/A"}</p>
                <p><strong>Release Date:</strong> ${track.releaseDate ? new Date(track.releaseDate).toLocaleDateString() : "N/A"}</p>
                ${track.trackViewUrl || track.collectionViewUrl ? `<a href="${track.trackViewUrl || track.collectionViewUrl}" target="_blank" rel="noopener noreferrer">View on Apple Music</a>` : ""}
                
                <div class="artist-bio-container">
                    <h3>About the Artist</h3>
                    <p id="bio-text">Loading artist info...</p>
                </div>
            `;

            // Open native HTML modal dialog immediately
            modal.showModal();

            // Fetch artist biography asynchronously from 2nd API (Wikipedia)
            const bio = await getArtistBio(track.artistName);
            const bioText = modalBody.querySelector("#bio-text");
            if (bioText) {
                bioText.textContent = bio;
            }
        });

        // Append the completed track card to the grid container
        container.appendChild(trackCard);
    });

    // Close modal when clicking close button or background overlay
    if (closeModalBtn) {
        closeModalBtn.onclick = () => modal.close();
    }
    if (modal) {
        modal.onclick = (e) => {
            if (e.target === modal) {
                modal.close();
            }
        };
    }
}

// Render loading spinner
export function showLoading(container) {
    container.innerHTML = '<div class="spinner" role="status"></div>';
}

// Render error message
export function showError(message, container) {
    container.innerHTML = `<p class="error-message">⚠️ ${message}</p>`;
}