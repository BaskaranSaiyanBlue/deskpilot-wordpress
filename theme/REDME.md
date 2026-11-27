
# DeskPilot – WordPress Portfolio Project

DeskPilot is a modern customer support platform landing page built with WordPress. This project demonstrates custom WordPress theme development and reusable Gutenberg block development.

## Features

- Custom WordPress theme
- Custom Gutenberg blocks
- Responsive landing page
- Feature Grid section
- Statistics section
- Testimonials section
- Pricing section
- Customizable block content through the Gutenberg editor

## Technologies

- WordPress
- PHP
- JavaScript
- React
- Gutenberg Block Editor
- SCSS
- HTML5
- CSS3
- Node.js
- @wordpress/scripts

## Project Structure

```text
deskpilot-wordpress/
├── theme/
│   └── deskpilot/
├── plugin/
│   └── deskpilot-blocks/
├── screenshots/
├── .gitignore
└── README.md
```

## Installation

1. Install WordPress locally.
2. Copy the `deskpilot` theme into `wp-content/themes/`.
3. Copy the `deskpilot-blocks` plugin into `wp-content/plugins/`.
4. Activate the DeskPilot theme.
5. Activate the DeskPilot Blocks plugin.
6. Create a homepage and add the available DeskPilot blocks.

## Custom Gutenberg Blocks

| Block | Description |
|---|---|
| Feature Grid | Customizable feature cards |
| Statistics | Editable statistics section |
| Testimonials | Customer testimonial cards |
| Pricing | Customizable pricing plans |

## Development

The Gutenberg plugin uses `@wordpress/scripts`.

Install dependencies:

```bash
npm install
```

Start development:

```bash
npm start
```

Build production assets:

```bash
npm run build
```

## Project Status

In development.

## Author

Baskaran Chandrasekar

Portfolio: https://baskaranchandrasekar.dev/
