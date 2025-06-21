import { DEFAULT_AVATAR_OPTIONS } from "../constants";
import { AvatarOptions } from "../types";

import {
  stringToHash,
  getColorFromHash,
  getContrastingTextColor,
  getInitials,
} from "../utils/avatar";

/**
 * Generates an SVG string for a user avatar based on a username and provided options.
 * 
 * @category Generator Functions
 * @categoryDescription The main functions to generate the avatar.
 * @author Lazaro Osee
 * @showCategory
 * 
 * @param {number} username The name of the user for whom to generate the avatar.
 * @param {AvatarOptions} options Customization options for the avatar.
 * @returns {string} A string containing the SVG representation of the avatar.
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

  let backgroundShape = "";
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
