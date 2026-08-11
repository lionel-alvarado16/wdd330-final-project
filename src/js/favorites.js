import { qs, initHeaderAndFooter } from "./modules/utils.mjs";
import { getLocalStorage } from "./modules/storage.mjs";
import { displayTracks } from "./modules/ui.mjs";

const FAVORITES_KEY = "music_explorer_favorites";

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Header mobile toggle and Footer dates
  initHeaderAndFooter();

  const favoritesGrid = qs("#favorites-grid");

  // Get favorites array from LocalStorage
  const savedTracks = getLocalStorage(FAVORITES_KEY);

  if (favoritesGrid) {
    if (savedTracks.length === 0) {
      favoritesGrid.innerHTML = `<p class="no-results">You have no saved favorite tracks yet!</p>`;
    } else {
      // Reuse displayTracks to render saved items
      displayTracks(savedTracks, favoritesGrid);
    }
  }
});
