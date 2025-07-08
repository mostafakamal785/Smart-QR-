# Smart QR Code Generator

A versatile and user-friendly web application for generating a variety of QR codes. This tool allows for real-time customization of QR code content, type, and appearance, all within an intuitive interface.

## Features

* **Multiple QR Code Types:** Generate QR codes for various data types, including:
    * SMS
    * Plain Text
    * URL
    * Phone Number
    * Email
    * Wi-Fi credentials
    * vCard (contact information)

* **Real-Time Preview:** See your QR code update instantly as you modify the content and design.

* **Customization Options:**
    * **Colors:** Tailor the foreground and background colors of your QR code to match your style or branding.
    * **Size:** Adjust the size of the QR code from 100px up to 500px.

* **Download and Share:**
    * **Download:** Save your generated QR code as a PNG image with a single click.
    * **Share:** Easily share the QR code to other applications using the Web Share API.

* **History:** Your generated QR codes are automatically saved to a history list, allowing you to:
    * Regenerate a previous QR code with current settings.
    * Download a QR code from your history.
    * Delete individual entries from your history.

* **Dark/Light Theme:** Toggle between light and dark modes for a comfortable viewing experience. The chosen theme is saved in your browser's local storage.

* **Responsive Design:** The application is fully responsive and works seamlessly on both desktop and mobile devices.

## How to Use

1.  **Select Content Type:** Choose the type of QR code you want to create from the "content type" dropdown menu (e.g., URL, Text, Wi-Fi).
2.  **Enter Content:** Fill in the corresponding input fields for your chosen content type.
3.  **Customize (Optional):**
    * Use the color pickers to change the foreground and background colors.
    * Drag the slider to adjust the size of the QR code.
4.  **Generate QR Code:** Click the "Generate QR code" button. Your QR code will appear in the preview section.
5.  **Download or Share:**
    * Click the "download" button to save the QR code to your device.
    * Click the "share" button to open your device's sharing options.
6.  **View History:** Previously generated QR codes will be listed at the bottom of the page for easy access.

## Technologies Used

* **HTML5:** The core structure of the web page.
* **CSS3:** For styling the application, including a responsive layout and dark/light themes.
* **JavaScript (ES6 Modules):** Handles all the application logic, including:
    * QR code generation using the `qrcode.min.js` library.
    * DOM manipulation for real-time updates.
    * Event handling for user interactions.
    * Managing theme preferences with `localStorage`.
* **qrcode.min.js:** A lightweight, standalone library for generating QR codes.

## Project Structure

The project is organized into modular JavaScript files for better maintainability and readability:

* `index.html`: The main HTML file.
* `css/style.css`: The stylesheet for the application.
* `js/main.js`: The main entry point for the application's JavaScript, handling event listeners and initialization.
* `js/ui-elements.js`: A module that exports all the necessary DOM element selectors.
* `js/generator.js`: Handles the logic for collecting data and generating the QR code.
* `js/history.js`: Manages the creation and interaction with the QR code history list.
* `js/theme.js`: Controls the light and dark theme functionality.
* `js/share-download.js`: Contains the functions for downloading and sharing the QR code.
* `js/qrcode.min.js`: The external library used for QR code generation.
