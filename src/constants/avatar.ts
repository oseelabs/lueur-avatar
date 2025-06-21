import { AvatarOptions } from "../types";

// Default options for the avatar generator
/**
 * DEFAULT_AVATAR_OPTIONS defines the default configuration options for generating avatars.
 * The options include dimensions, appearance, and text customization.
 *
 * @type {Required<AvatarOptions>}
 * @property {number} width - The width of the avatar in pixels.
 * @property {number} height - The height of the avatar in pixels.
 * @property {string} backgroundColor - The background color of the avatar. This will be dynamically generated.
 * @property {string} textColor - The color of the text within the avatar. This will be dynamically generated.
 * @property {string} shape - The shape of the avatar. Accepts 'square' or other predefined shapes.
 * @property {number} initialsLength - The length of the initials to be displayed (e.g., 2 for a two-character initial).
 * @property {string} fontFamily - The font family used for the text within the avatar.
 * @property {number} fontSize - The font size of the text. This will be dynamically calculated based on the avatar size.
 * @property {string} text - The text content to display in the avatar. Defaults to an empty string if no username is provided.
 * @property {Object} svgAttributes - Additional SVG attributes for further customization of the avatar.
 */
export const DEFAULT_AVATAR_OPTIONS: Required<AvatarOptions> = {
  width: 100,
  height: 100,
  backgroundColor: '', // Will be generated
  textColor: '',       // Will be generated
  shape: 'square',
  initialsLength: 2,
  fontFamily: 'Arial, sans-serif',
  fontSize: 0, // Will be calculated
  text: '', // No default text, handled by username
  svgAttributes: {},
};