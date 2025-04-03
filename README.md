# Form Autofill Bookmarklet

A JavaScript bookmarklet that uses OpenAI's GPT-4o-mini to automatically generate realistic sample data for any web form.

## How It Works

1. Click the bookmarklet while viewing a page with forms
2. Select the form you want to fill by clicking on it
3. Confirm your selection by clicking again
4. Enter your OpenAI API key when prompted
5. Wait for AI to analyze the form structure and generate realistic data
6. The form will be automatically filled with the generated data

## Features

- Works on any website with HTML forms
- Analyzes form field names and types to generate contextually appropriate data
- Handles various input types: text, email, phone, date, select, radio, checkbox, etc.
- Visual feedback with overlay and highlighting during selection
- Uses OpenAI's GPT-4o-mini for intelligent form analysis and data generation

## Installation

1. Open the [demo page](https://shpetimhaxhiu.github.io/form-filler/)
2. Drag the "Form Autofill" link to your bookmarks bar
3. Click the bookmark when you're on a website with forms

## Requirements

- An OpenAI API key
- A modern web browser with JavaScript enabled

## Development Setup

This project uses modern JavaScript tooling:

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

## Technologies Used

- Webpack 5 for bundling
- Babel for JavaScript transpilation
- ESLint and Prettier for code quality
- Jest for testing
- Modern ES6+ JavaScript
- CSS modules for styling

## Project Structure

```
├── dist/                # Built files
├── src/                 # Source files
│   ├── css/             # CSS styles
│   ├── js/              # JavaScript modules
│   ├── bookmarklet.js   # Main bookmarklet code
│   └── index.html       # Demo page
├── scripts/             # Build scripts
├── __mocks__/           # Jest mocks
├── .babelrc             # Babel configuration
├── .eslintrc.js         # ESLint configuration
├── .prettierrc.js       # Prettier configuration
├── jest.config.js       # Jest configuration
├── webpack.config.js    # Webpack configuration
└── package.json         # Project metadata and dependencies
```

## Security Notice

- Your OpenAI API key is only used for the current session and is never stored
- The bookmarklet only sends form structure (field names, types, etc.) to OpenAI
- No actual form data from the website is transmitted

## Author

Created by [Shpetim Haxhiu](https://pito.dev)
- GitHub: [shpetimhaxhiu](https://github.com/shpetimhaxhiu)
- Twitter: [@CrazieCoder](https://twitter.com/CrazieCoder)
- Email: shpetim.h@gmail.com

## License

MIT License 