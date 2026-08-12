// Base URLs of the iTunes API
const ITUNES_BASE_URL = "https://itunes.apple.com";

// Endpoint 1: General song search
export async function searchTracks(searchTerm) {
    try {
        const response = await fetch(`${ITUNES_BASE_URL}/search?entity=song&limit=52&term=${searchTerm}`);
        
        if (!response.ok) {
            throw new Error(`HTTPS Error: ${response.status}`);
        }

        const data = await response.json();
        return data.results;
    } catch (error) {
        throw error;
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
        throw error;
    }
}

export async function getArtistBio(artistName) {
    try {
        const url = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&titles=${artistName}&format=json&origin=*`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Failed to fetch artist biography");
        }

        const data = await response.json();
        const pages = data.query.pages;

        // Iterate through pages object using for...in to get the dynamically generated page ID
        for (const pageId in pages) {
            if (pageId === "-1" || !pages[pageId].extract) {
                return "No biography available for this artist.";
            }
            return pages[pageId].extract;
        }

        return "No biography available for this artist.";
    } catch (error) {
        return "Could not load artist biography at this time.";
    }
}