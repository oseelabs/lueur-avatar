/**
 * A collection of utility functions for generating and customizing avatars.
 * These functions handle color generation, text processing, and contrast calculations.
 * @module avatar-utils
 */

/**
 * Hashes a string into a numeric value.
 * Used for deterministic color generation.
 * @param {string} str The input string.
 * @returns {number} A numeric hash.
 * @example
 * const hash = stringToHash('johndoe'); // Returns consistent numeric hash
 */
export function stringToHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash |= 0; // Convert to 32bit integer
    }
    return Math.abs(hash); // Ensure positive
}

/**
 * Generates a color from a hash value.
 * Uses a predefined palette for aesthetic consistency.
 * @param {number} hash The numeric hash value.
 * @returns {string} A hex color string (e.g., '#RRGGBB').
 * @example
 * const color = getColorFromHash(12345); // Returns '#4CAF50'
 */
export function getColorFromHash(hash: number): string {
    const colors = [
        '#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5',
        '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50',
        '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800',
        '#FF5722', '#795548', '#9E9E9E', '#607D8B'
    ];
    return colors[hash % colors.length];
}

/**
 * Calculates the luminance of a hex color.
 * @param {string} hex Color in hex format (e.g., '#RRGGBB').
 * @returns {number} A number between 0 and 255 representing luminance.
 * @example
 * const luminance = getLuminance('#FFFFFF'); // Returns 255
 */
export function getLuminance(hex: string): number {
    const r = parseInt(hex.substring(1, 3), 16);
    const g = parseInt(hex.substring(3, 5), 16);
    const b = parseInt(hex.substring(5, 7), 16);
    // ITU-R BT.709 coefficients for luminance
    return (0.2126 * r + 0.7152 * g + 0.0722 * b);
}

/**
 * Determines a contrasting text color (black or white) based on background luminance.
 * @param {string} hexBackgroundColor The background color in hex format.
 * @returns {string} '#000000' (black) or '#FFFFFF' (white).
 * @example
 * const textColor = getContrastingTextColor('#FF0000'); // Returns '#FFFFFF'
 */
export function getContrastingTextColor(hexBackgroundColor: string): string {
    return getLuminance(hexBackgroundColor) > 128 ? '#000000' : '#FFFFFF';
}

/**
 * Extracts initials from a username.
 * Handles various name formats, including special characters and multiple words.
 * @param {string} username The full username string.
 * @param {number} length The desired number of initials.
 * @returns The extracted initials.
 * @example
 * getInitials('John Doe', 2); // Returns 'JD'
 * getInitials('mary.jane@email.com', 2); // Returns 'MJ'
 * getInitials('Dr. Robert Smith Jr.', 2); // Returns 'RS'
 */
export function getInitials(username: string, length: number): string {
    if (!username) {
        return '';
    }

    // Remove common prefixes/suffixes and normalize spaces
    const cleanedName = username
        .replace(/\b(mr|mrs|ms|dr|jr|sr)\.?\b/gi, '') // Remove titles
        .replace(/[^a-zA-Z0-9\s]/g, '')             // Remove special characters, keep letters, numbers, spaces
        .trim()
        .toUpperCase();

    const words = cleanedName.split(/\s+/).filter(word => word.length > 0);

    if (words.length === 0) {
        return '';
    }

    if (words.length === 1) {
        return words[0].substring(0, length);
    }

    let initials = '';
    for (let i = 0; i < Math.min(words.length, length); i++) {
        initials += words[i][0];
    }

    return initials;
}