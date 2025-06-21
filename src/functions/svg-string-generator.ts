import { DEFAULT_AVATAR_OPTIONS } from "../constants";
import { AvatarOptions } from "../types";

import {
  stringToHash,
  getColorFromHash,
  getContrastingTextColor,
  getInitials,
} from "../utils";

/**
 * Generates an SVG avatar based on the provided username and customization options.
 *
 * @param {string} username - The name or identifier used to generate the avatar.
 * @param {AvatarOptions} [options] - Optional customization settings for the avatar.
 * @param {number} [options.width=100] - Width of the avatar in pixels.
 * @param {number} [options.height=100] - Height of the avatar in pixels.
 * @param {string} [options.backgroundColor] - Background color of the avatar.
 *    If not provided, it is generated from the username hash.
 * @param {string} [options.textColor] - Color of the text in the avatar.
 *    If not provided, it is derived for proper contrast with the background color.
 * @param {string} [options.shape="square"] - Shape of the avatar background ("circle" or "square").
 * @param {number} [options.initialsLength=2] - Number of characters to use for the avatar's initials.
 * @param {string} [options.fontFamily="Arial, sans-serif"] - Font family for the text inside the avatar.
 * @param {number} [options.fontSize] - Font size for the text. If not provided,
 *    it is calculated based on the avatar dimensions.
 * @param {string} [options.text] - Custom text to display in the avatar. If not provided,
 *    initials are generated from the username.
 * @param {Object} [options.svgAttributes={}] - Additional attributes to add to the root SVG element.
 *
 * @return {string} The generated avatar SVG as a string.
 *
 * @example
 * // Generate a basic square avatar
 * const svg = generateAvatarSvg('johndoe');
 *
 * @example
 * // Generate a circular avatar with custom colors
 * const svg = generateAvatarSvg('janedoe', {
 *   shape: 'circle',
 *   backgroundColor: '#FF0000',
 *   textColor: '#FFFFFF'
 * });
 *
 * @example
 * // Generate an avatar with custom size and text
 * const svg = generateAvatarSvg('bobsmith', {
 *   width: 200,
 *   height: 200,
 *   text: 'BS',
 *   fontSize: 48,
 *   svgAttributes: { class: 'custom-avatar' }
 * });
 */
export function generateAvatarSvg(
    username: string,
    options?: AvatarOptions
): string {
  // Merge default options with user-provided options
  const mergedOptions: Required<AvatarOptions> = {
    ...DEFAULT_AVATAR_OPTIONS,
    ...options,
    svgAttributes: {
      // Merge svgAttributes specifically to allow overriding default ones
      ...DEFAULT_AVATAR_OPTIONS.svgAttributes,
      ...(options?.svgAttributes || {}),
    },
  };

  const {
    width,
    height,
    backgroundColor,
    textColor,
    shape,
    initialsLength,
    fontFamily,
    fontSize,
    text,
    svgAttributes,
  } = mergedOptions;

  const effectiveWidth = Math.max(1, width); // Ensure positive dimensions
  const effectiveHeight = Math.max(1, height);

  const initials = text || getInitials(username, initialsLength);

  // Generate background color if not provided
  const effectiveBackgroundColor =
      backgroundColor || getColorFromHash(stringToHash(username));

  // Determine text color if not provided
  const effectiveTextColor =
      textColor || getContrastingTextColor(effectiveBackgroundColor);

  // Calculate font size if not explicitly provided
  const effectiveFontSize =
      fontSize > 0 ? fontSize : Math.min(effectiveWidth, effectiveHeight) * 0.4; // 40% of the smaller dimension

  let backgroundShape: string;
  if (shape === "circle") {
    const radius = Math.min(effectiveWidth, effectiveHeight) / 2;
    backgroundShape = `<circle cx="${effectiveWidth / 2}" cy="${
        effectiveHeight / 2
    }" r="${radius}" fill="${effectiveBackgroundColor}" />`;
  } else {
    // Default to square/rectangle
    backgroundShape = `<rect width="${effectiveWidth}" height="${effectiveHeight}" fill="${effectiveBackgroundColor}" />`;
  }

  // Convert additional SVG attributes to a string
  const additionalSvgAttrs = Object.entries(svgAttributes)
      .map(([key, value]) => `${key}="${value}"`)
      .join(" ");

  return `
    <svg width="${effectiveWidth}" height="${effectiveHeight}" viewBox="0 0 ${effectiveWidth} ${effectiveHeight}" fill="none" xmlns="http://www.w3.org/2000/svg" ${additionalSvgAttrs}>
      ${backgroundShape}
      <text
        x="50%"
        y="50%"
        dominant-baseline="middle"
        text-anchor="middle"
        fill="${effectiveTextColor}"
        font-family="${fontFamily}"
        font-size="${effectiveFontSize}"
        font-weight="bold"
      >${initials}</text>
    </svg>
  `.trim();
}