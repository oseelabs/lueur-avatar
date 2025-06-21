import { AvatarOptions } from "../types";

// Default options for the avatar generator
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