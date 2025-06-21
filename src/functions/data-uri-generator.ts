import { generateAvatarSvg } from "./svg-string-generator";
import type { AvatarOptions } from "../types";

/**
 * Generates a Base64-encoded data URI representing an SVG avatar
 * for a given username and optional customization options.
 *
 * This is useful for embedding the avatar directly into an <img> tag,
 * CSS `background-image`, or similar usage without needing a file server.
 * 
 * @category Generator Functions
 * @categoryDescription The main functions to generate the avatar.
 * @author Lazaro Osee
 * @showCategory
 *
 * @param {string} username - The name from which initials are derived to create the avatar.
 * @param {AvatarOptions} [options] - Optional configuration to customize the avatar's appearance.
 * @returns {string} A `data:image/svg+xml;base64,...` string representing the avatar.
 *
 * @example
 * const uri = generateAvatarDataUri("Jane Doe", { shape: "circle", width: 64, height: 64 });
 * // <img src={uri} alt="Jane's Avatar" />
 */
export function generateAvatarDataUri(username: string, options?: AvatarOptions): string {
  const svgString = generateAvatarSvg(username, options);
  return `data:image/svg+xml;base64,${btoa(svgString)}`;
}
