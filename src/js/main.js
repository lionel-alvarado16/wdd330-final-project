import { initHeaderAndFooter, qs } from "./modules/utils.mjs";
import { searchTracks } from "./modules/api.mjs";
import { displayTracks } from "./modules/ui.mjs";

// Select required form and display elements
const searchForm = qs("#search-form");
const searchInput = qs("#search-input");
const musicGrid = qs("#music-grid");

document.addEventListener("DOMContentLoaded", async () => {
  initHeaderAndFooter();

  // Load popular tracks by default on page load
  if (musicGrid) {
    musicGrid.innerHTML = `<p class="loading">Loading popular tracks...</p>`;
    try {
      // Default query to populate results initially
      const defaultTracks = await searchTracks("pop");
      displayTracks(defaultTracks, musicGrid);
    } catch {
      musicGrid.innerHTML = `<p class="error">Failed to load popular tracks. Please try again later.</p>`;
    }
  }
});

// Event listener for search form submission
searchForm.addEventListener("submit", async (event) => {
  // Prevent default page refresh on form submit
  event.preventDefault();

  // Get and clean the search query text
  const query = searchInput.value.trim();

  if (!query) return;

  // Show a loading message while waiting for API response
  musicGrid.innerHTML = `<p class="loading">Searching tracks for "${query}"...</p>`;

  try {
    // Fetch track data from API module
    const tracks = await searchTracks(query);

    // Render results grid with modal listeners attached
    displayTracks(tracks, musicGrid);
  } catch {
    musicGrid.innerHTML = `<p class="error">Something went wrong while fetching the songs. Please try again.</p>`;
  }
});
