import { generateAvatarSvg } from "./svg-string-generator";
import type { AvatarOptions } from "../types";

/**
 * Generates a data URI for a user's avatar based on their username and optional configuration options.
 *
 * @param {string} username - The username to generate the avatar for.
 * @param {AvatarOptions} [options] - Optional configuration settings for avatar generation.
 * @return {string} A data URI containing a base64 encoded SVG representation of the avatar.
 *
 * @example
 * // Generate a basic avatar data URI
 * const uri = generateAvatarDataUri('johndoe');
 *
 * @example
 * // Generate a customized circular avatar
 * const uri = generateAvatarDataUri('janedoe', {
 *   shape: 'circle',
 *   width: 200,
 *   height: 200,
 *   backgroundColor: '#FF0000',
 *   textColor: '#FFFFFF'
 * });
 *
 * @example
 * // Generate an avatar with custom text
 * const uri = generateAvatarDataUri('bobsmith', {
 *   text: 'BS',
 *   fontSize: 48,
 *   svgAttributes: { class: 'custom-avatar' }
 * });
 */
export function generateAvatarDataUri(username: string, options?: AvatarOptions): string {
  const svgString = generateAvatarSvg(username, options);
  return `data:image/svg+xml;base64,${btoa(svgString)}`;
}