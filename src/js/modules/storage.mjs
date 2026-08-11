// Storage key used to retain favorited tracks in LocalStorage
const FAVORITES_KEY = "music_explorer_favorites";

// Retrieves and parses array data from LocalStorage
export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

// Converts and stores array data into LocalStorage
export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Adds a track objket to the favorites array if its not alrady present
export function addFavorite(track) { 
    const favorites = getLocalStorage(FAVORITES_KEY);
    const exists = favorites.some((item) => item.trackId === track.trackId);

    if (!exists) {
        favorites.push(track);
        setLocalStorage(FAVORITES_KEY, favorites);
    }
}

// Removes a track objecto from the favorites array using its unique trackId
export function removeFavorite(trackId) { 
    const favorites = getLocalStorage(FAVORITES_KEY);
    const updatedFavorites = favorites.filter((item) => item.trackId !== trackId);
    setLocalStorage(FAVORITES_KEY, updatedFavorites);
}

//Verifies if a specific track exists within the stored favorites list
export function isFavorite(trackId) { 
    const favorites = getLocalStorage(FAVORITES_KEY);
    return favorites.some((item) => item.trackId === trackId);
}