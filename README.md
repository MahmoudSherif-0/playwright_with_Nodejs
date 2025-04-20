# Playwright Screenshot Server

This project provides web automation capabilities through a REST API, with implementations in both Node.js (Express) and Python (Flask).

## Features

- RESTful API endpoints for web automation
- Playwright integration for browser automation
- Screenshot API endpoint to capture website screenshots
- Human-like behavior simulation (mouse movements, scrolling, etc.)
- Bot detection avoidance techniques
- Simple web interface to test the functionality
- Support for Arabic locale and settings

## Node.js Version (Express)

### Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

### Usage

#### Start the server:

```bash
npm start
```

#### Development mode (with auto-restart):

```bash
npm run dev
```

The server will run at http://localhost:3000

## Python Version (Flask)

### Installation

1. Install dependencies:

```bash
pip install flask playwright
playwright install chromium
```

### Usage

#### Start the server:

```bash
python app.py
```

The server will run at http://localhost:5000

### Google Colab Usage

You can also run the Python version in Google Colab:

1. Upload the `playwright_screenshot_colab.ipynb` file to Google Colab
2. Run the cells in order
3. To access the application from outside Colab, you'll need an ngrok authtoken (available for free from the ngrok website)

## API Endpoints

### Take a Screenshot

**Endpoint:** `POST /screenshot`

**Body:**
```json
{
  "url": "https://example.com"
}
```

**Response:**
```json
{
  "success": true,
  "screenshot": "base64_encoded_image_data"
}
```

## Web Interface

A simple web interface is available at the root URL to test the screenshot functionality.

## Notes

This application is for educational purposes only. Use it responsibly and in accordance with the terms of service of the websites you visit.