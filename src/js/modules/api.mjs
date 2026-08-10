// Base URLs of the iTunes API
const ITUNES_BASE_URL = "https://itunes.apple.com";

// Endpoint 1: General song search
export async function searchTracks(searchTerm) {
    try {
        const response = await fetch(`${ITUNES_BASE_URL}/search?entity=song&limit=12&term=${searchTerm}`);
        
        if (!response.ok) {
            throw new Error(`HTTPS Error: ${response.status}`);
        }

        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error("Error fetching data from iTunes:", error);
        return [];
    }
}

// Endpoint 2: Lookup by ID
export async function getTrackById(trackId) {
    try {
        const response = await fetch(`${ITUNES_BASE_URL}/lookup?id=${trackId}`);

        if (!response.ok) {
            throw new Error(`HTTPS Error: ${response.status}`);
        }

        const data = await response.json();
        return data.results[0];
    } catch (error) {
        console.error("Error fetching track details from iTunes:", error);
        return null;
    }
}