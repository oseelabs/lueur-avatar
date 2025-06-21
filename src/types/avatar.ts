/**
 * Defines the available shapes for the avatar.
 * 'square': A standard square avatar.
 * 'circle': A circular avatar.
 */
export type AvatarShape = 'square' | 'circle';

/**
 * Defines the options for generating an SVG avatar.
 */
export interface AvatarOptions {
  /**
   * The width of the avatar in pixels. Defaults to 100.
   */
  width?: number;
  /**
   * The height of the avatar in pixels. Defaults to 100.
   */
  height?: number;
  /**
   * The background color of the avatar (e.g., '#FF6600').
   * If not provided, a color will be deterministically generated from the username.
   */
  backgroundColor?: string;
  /**
   * The color of the text (initials) on the avatar (e.g., '#FFFFFF').
   * If not provided, a contrasting color will be chosen based on the background.
   */
  textColor?: string;
  /**
   * The shape of the avatar. Defaults to 'square'.
   */
  shape?: AvatarShape;
  /**
   * The maximum number of initials to display. Defaults to 2.
   */
  initialsLength?: number;
  /**
   * The font family for the initials. Defaults to 'Arial, sans-serif'.
   */
  fontFamily?: string;
  /**
   * The font size for the initials. If not provided, it will be calculated based on avatar size.
   */
  fontSize?: number;
  /**
   * Text to explicitly display on the avatar instead of generated initials.
   * If provided, `initialsLength` and username-based initial generation will be ignored.
   */
  text?: string;
  /**
   * Additional SVG attributes to apply to the root <svg> element (e.g., { class: 'my-avatar' }).
   * Values will be stringified directly.
   */
  svgAttributes?: { [key: string]: string };
}
