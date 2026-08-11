import { initHeaderAndFooter, qs } from "./modules/utils.mjs";
import { searchTracks } from "./modules/api.mjs";
import { displayTracks, showLoading, showError } from "./modules/ui.mjs";

// Select required form and display elements
const searchForm = qs("#search-form");
const searchInput = qs("#search-input");
const musicGrid = qs("#music-grid");

document.addEventListener("DOMContentLoaded", async () => {
  initHeaderAndFooter();

  // Load popular tracks by default on page load
  if (musicGrid) {
    showLoading(musicGrid);
    try {
      // Default query to populate results initially
      const defaultTracks = await searchTracks("pop");
      displayTracks(defaultTracks, musicGrid);
    } catch {
      showError(
        "Failed to load popular tracks. Please try again later.",
        musicGrid,
      );
    }
  }
});

// Event listener for search form submission
if (searchForm) {
  searchForm.addEventListener("submit", async (event) => {
    // Prevent default page refresh on form submit
    event.preventDefault();

    // Get and clean the search query text
    const query = searchInput.value.trim();

    if (!query) return;

    // Show a loading spinner while waiting for API response
    showLoading(musicGrid);

    try {
      // Fetch track data from API module
      const tracks = await searchTracks(query);

      if (tracks.length === 0) {
        musicGrid.innerHTML = `<p class="no-results">No tracks found for "${query}". Try another search!</p>`;
      } else {
        // Render results grid with modal listeners attached
        displayTracks(tracks, musicGrid);
      }
    } catch {
      showError(
        `Something went wrong while fetching "${query}". Please check your internet connection.`,
        musicGrid,
      );
    }
  });
}
