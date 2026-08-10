import { initHeaderAndFooter, qs } from "./modules/utils.mjs";
import { searchTracks } from "./modules/api.mjs";
import { displayTracks } from "./modules/ui.mjs";

document.addEventListener("DOMContentLoaded", () => {
  initHeaderAndFooter();
});

// Select required DOM elements
const searchForm = qs("#search-form");
const searchInput = qs("#search-input");
const musicGrid = qs("#music-grid");

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
    const tracks = await searchTracks(query);

    // Display the results inside the grid container
    displayTracks(tracks, musicGrid);
  } catch (error) {
    console.error("Error fetching tracks:", error);
    musicGrid.innerHTML = `<p class="error">Something went wrong while fetching the songs. Please try again.</p>`;
  }
});