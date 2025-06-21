# `@lueur/avatar`
[![npm version](https://img.shields.io/npm/v/@lueur/avatar)](https://www.npmjs.com/package/@lueur/avatar)
[![npm downloads](https://img.shields.io/npm/dt/@lueur/avatar.svg)](https://www.npmjs.com/package/@lueur/avatar)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![bundlephobia](https://badgen.net/bundlephobia/min/@lueur/avatar)](https://bundlephobia.com/package/@lueur/avatar)
[![Last Commit](https://img.shields.io/github/last-commit/oseelabs/lueur-avatar)](https://github.com/oseelabs/lueur-avatar)

A lightweight and customizable TypeScript package for generating beautiful SVG user avatars based on usernames or custom text.

---

## Table of Contents

* [Features](#key-features)
* [Installation](#installation)
* [Usage](#usage)

  * [Basic Usage](#basic-usage)
  * [Customizing Avatars](#customizing-avatars)
  * [Using Avatars in HTML](#using-avatars-in-html)
* [API Reference](#api-reference)

  * [`generateAvatarSvg(username, options)`](#generateavatarsvgusername-string-options-avataroptions-string)
  * [`generateAvatarDataUri(username, options)`](#generateavatardatauriusername-string-options-avataroptions-string)
  * [`AvatarOptions` Interface](#avataroptions-interface)
  * [`AvatarShape` Type](#avatarshape-type)
* [How It Works](#how-it-works)
* [Contributing](#contributing)
* [License](#license)

---

## Key Features

- 🎨 **Generate SVG Avatars:** Outputs a complete SVG string you can use directly in HTML or as a data URI.
- 👤 **Username-Based Initials:** Automatically extracts initials from a given username (e.g., "John Doe" becomes "JD").
- 🎯 **Deterministic Colors:** Generates consistent, aesthetically pleasing background colors for each unique username.
- 🔄 **Automatic Text Contrast:** Ensures initials are always readable by choosing an appropriate black or white text color.
- ⚙️ **Highly Customizable:**

  * Set **width** and **height**.
  * Choose **square** or **circle** shapes.
  * Override **background** and **text colors**.
  * Control **initials length**, **font family**, and **font size**.
  * Provide **custom text** instead of initials.
  * Add **arbitrary SVG attributes** to the root element.
- 📦 **TypeScript Support:** Fully typed for a great developer experience in TypeScript projects.

---

## Installation

You can install the package using `npm` or `yarn`:

```bash
npm install @lueur/avatar
# or
yarn add @lueur/avatar
```

---

## Usage

### Basic Usage

Import `generateAvatarSvg` and pass a username. By default, it creates a 100x100 square avatar with two initials and a deterministically generated background color.

```ts
import { generateAvatarSvg } from '@lueur/avatar';

// Generate a basic avatar SVG string for "John Doe"
const johnDoeAvatar = generateAvatarSvg('John Doe');
console.log(johnDoeAvatar);
```

### Customizing Avatars

The `generateAvatarSvg` function accepts an optional options object for extensive customization.

```ts
import { generateAvatarSvg } from '@lueur/avatar';

// Custom size and specific colors
const customColorsAvatar = generateAvatarSvg('Sarah Connor', {
  width: 80,
  height: 80,
  backgroundColor: '#3498db', // A nice blue
  textColor: '#ffffff',       // White text
});

// Circular avatar with a single initial and custom font
const circularAvatar = generateAvatarSvg('Michael B Jordan', {
  width: 60,
  height: 60,
  shape: 'circle',
  initialsLength: 1, // Only show "M"
  fontFamily: 'Verdana, sans-serif',
  fontSize: 30,
});

// Avatar with custom text and additional SVG attributes
const specialAvatar = generateAvatarSvg('Guest User', {
  width: 120,
  height: 120,
  backgroundColor: '#FF6600',
  textColor: '#000000',
  text: 'GU',
  svgAttributes: {
    'data-user-id': 'guest-123',
    'class': 'avatar-icon',
    'title': 'Guest Avatar'
  }
});
```

### Using Avatars in HTML

You can directly embed the generated SVG string into your HTML:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Avatar Examples</title>
  <style>
    body { font-family: sans-serif; display: flex; flex-wrap: wrap; gap: 20px; padding: 20px; }
    .avatar-container { text-align: center; }
    .avatar-container p { margin-top: 5px; font-size: 0.9em; color: #555; }
    .my-custom-class { border: 2px solid purple; border-radius: 8px; }
  </style>
</head>
<body>
  <div class="avatar-container">
    <div id="johnDoeAvatar"></div>
    <p>John Doe</p>
  </div>

  <div class="avatar-container">
    <div id="aliceCircular"></div>
    <p>Alice (Circular)</p>
  </div>

  <div class="avatar-container">
    <div id="customAttrAvatar"></div>
    <p>Custom Attrs</p>
  </div>

  <script type="module">
    import { generateAvatarSvg } from '@lueur/avatar';

    document.getElementById('johnDoeAvatar').innerHTML = generateAvatarSvg('John Doe');
    document.getElementById('aliceCircular').innerHTML = generateAvatarSvg('Alice', { shape: 'circle', width: 60, height: 60 });
    document.getElementById('customAttrAvatar').innerHTML = generateAvatarSvg('Bob Smith', {
      width: 70, height: 70, initialsLength: 2,
      svgAttributes: { class: 'my-custom-class' }
    });
  </script>
</body>
</html>
```

You can also use the SVG string as a data URI in an `<img>` tag:

```ts
const dataUri = generateAvatarDataUri('Emma Watson', { width: 50, height: 50 });

// In JSX
// <img src={dataUri} alt="Emma Watson Avatar" />
```

---

## API Reference

### `generateAvatarSvg(username: string, options?: AvatarOptions): string`

The main function to create an SVG avatar.

* `username` (string, required): The name of the user. Initials will be derived from this unless `options.text` is provided.
* `options` (AvatarOptions, optional): An object to customize the avatar's appearance.
* **Returns:** A string containing the complete SVG markup.

---

### `generateAvatarDataUri(username: string, options?: AvatarOptions): string`

This function uses `generateAvatarSvg` function (above) to generate an svg string.
It then generates a base64 string that can be used as an image data uri to display the avatar as an actual image.

* `username` (string, required): The name of the user. Initials will be derived from this unless `options.text` is provided.
* `options` (AvatarOptions, optional): An object to customize the avatar's appearance.
* **Returns:** A string containing the base64 value of the SVG image.

---

### `AvatarOptions` Interface

```ts
interface AvatarOptions {
  width?: number;
  height?: number;
  backgroundColor?: string;
  textColor?: string;
  shape?: AvatarShape;
  initialsLength?: number;
  fontFamily?: string;
  fontSize?: number;
  text?: string;
  svgAttributes?: { [key: string]: string };
}
```

---

### `AvatarShape` Type

```ts
type AvatarShape = 'square' | 'circle';
```

---

## How It Works

1. **Initials Extraction:** Cleans and processes the username to extract initials. (e.g., "Dr. John Paul Smith Jr." → "JPS").
2. **Color Generation:** A hash from the username deterministically maps to a background color.
3. **Text Contrast:** Based on background luminance, text color is chosen as black or white for readability.
4. **SVG Assembly:** Combines options into a valid SVG string using the calculated styles and text.

---

## Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes.
4. Write tests.
5. Commit: `git commit -m 'feat: Add feature'`
6. Push: `git push origin feature/your-feature-name`
7. Open a pull request.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
