import { defaultPages } from "./pages.js";

const STORAGE_KEY = "sidebar-pages";

export function loadPages() {

    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.warn("Failed to parse pages, resetting.");
            savePages(defaultPages);
            return defaultPages;
        }
    }

    // first run → seed storage so future edits persist
    savePages(defaultPages);
    return defaultPages;
}

export function savePages(pages) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
}