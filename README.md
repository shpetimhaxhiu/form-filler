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

1. Open the [demo page](index.html)
2. Drag the "Form Autofill" link to your bookmarks bar
3. Click the bookmark when you're on a website with forms

## Requirements

- An OpenAI API key
- A modern web browser with JavaScript enabled

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