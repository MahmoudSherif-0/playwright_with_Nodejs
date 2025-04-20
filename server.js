const express = require('express');
const { chromium } = require('playwright');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

// Function to visit a website in an infinite loop
async function visitWebsiteInLoop(url) {
  while (true) {
    try {
      console.log('Starting 50 concurrent visits...');
      
      // Create array of 50 promises to visit the website concurrently
      const visitPromises = [];
      for (let i = 0; i < 50; i++) {
        visitPromises.push(visitWebsite(url, i));
      }
      
      // Wait for all visits to complete
      await Promise.all(visitPromises);
      
      console.log('All 50 visits completed, restarting loop...');
    } catch (error) {
      console.error('Error in main loop:', error);
    }
  }
}

// Function to visit a website once
async function visitWebsite(url, instanceId) {
  let browser = null;
  try {
    console.log(`Instance ${instanceId}: Visiting ${url}...`);
    
    // Launch browser with human-like configurations
    browser = await chromium.launch({
      headless: true,
      slowMo: 50
    });
    
    // Create context with human-like properties
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
      viewport: { width: 1280, height: 800 },
      deviceScaleFactor: 1,
      hasTouch: false,
      locale: 'ar-SA',
      timezoneId: 'Asia/Riyadh',
      permissions: ['geolocation'],
      geolocation: { latitude: 24.7136, longitude: 46.6753 },
      colorScheme: 'light',
      javaScriptEnabled: true,
      acceptDownloads: true,
      defaultBrowserType: 'chromium',
      extraHTTPHeaders: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'ar,en-US;q=0.9,en;q=0.8',
        'Sec-Ch-Ua': '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1'
      },
    });

    const page = await context.newPage();
    
    // Emulate human behavior
    await page.addInitScript(() => {
      // Override navigator properties
      const originalNavigator = window.navigator;
      const navigator = Object.create(originalNavigator);
      
      // Make navigator.webdriver not detectable
      Object.defineProperty(navigator, 'webdriver', {
        get: () => undefined
      });
      
      // Override plugins and mime types
      Object.defineProperty(navigator, 'plugins', {
        get: () => {
          const plugins = [
            { name: 'Chrome PDF Plugin', filename: 'internal-pdf-viewer', description: 'Portable Document Format' },
            { name: 'Chrome PDF Viewer', filename: 'mhjfbmdgcfjbbpaeojofohoefgiehjai', description: 'Portable Document Format' },
            { name: 'Native Client', filename: 'internal-nacl-plugin', description: '' }
          ];
          return plugins;
        }
      });
      
      // Add the modified navigator back
      Object.defineProperty(window, 'navigator', {
        value: navigator,
        writable: false
      });
    });
    
    // Navigate to URL with referer and cookies enabled
    await page.goto(url, {
      waitUntil: 'networkidle',
      timeout: 5000,
      referer: 'https://www.google.com/'
    });
    
    console.log(`Instance ${instanceId}: Visit completed`);
  } catch (error) {
    console.error(`Instance ${instanceId}: Error visiting website:`, error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// Simple home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Example API endpoint using Playwright
app.post('/screenshot', async (req, res) => {
  const { url } = req.body;
  
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }
  
  let browser = null;
  
  try {
    // Launch browser with human-like configurations
    browser = await chromium.launch({
      headless: true,
      slowMo: 50 // Slow down Playwright operations by 50ms
    });
    
    // Create context with human-like properties
    const context = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36',
      viewport: { width: 1280, height: 800 },
      deviceScaleFactor: 1,
      hasTouch: false,
      locale: 'ar-SA', // Arabic locale for apkpure.com/ar
      timezoneId: 'Asia/Riyadh',
      permissions: ['geolocation'],
      geolocation: { latitude: 24.7136, longitude: 46.6753 }, // Riyadh coordinates
      colorScheme: 'light',
      javaScriptEnabled: true,
      acceptDownloads: true,
      defaultBrowserType: 'chromium',
      // Add HTTP headers that browsers typically send
      extraHTTPHeaders: {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'ar,en-US;q=0.9,en;q=0.8',
        'Sec-Ch-Ua': '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1'
      },
    });

    const page = await context.newPage();
    
    // Emulate human behavior
    await page.addInitScript(() => {
      // Override navigator properties
      const originalNavigator = window.navigator;
      const navigator = Object.create(originalNavigator);
      
      // Make navigator.webdriver not detectable
      Object.defineProperty(navigator, 'webdriver', {
        get: () => undefined
      });
      
      // Override plugins and mime types
      Object.defineProperty(navigator, 'plugins', {
        get: () => {
          const plugins = [
            { name: 'Chrome PDF Plugin', filename: 'internal-pdf-viewer', description: 'Portable Document Format' },
            { name: 'Chrome PDF Viewer', filename: 'mhjfbmdgcfjbbpaeojofohoefgiehjai', description: 'Portable Document Format' },
            { name: 'Native Client', filename: 'internal-nacl-plugin', description: '' }
          ];
          return plugins;
        }
      });
      
      // Add the modified navigator back
      Object.defineProperty(window, 'navigator', {
        value: navigator,
        writable: false
      });
    });
    
    // Add random mouse movements and scrolling
    async function simulateHumanBehavior(page) {
      // Random wait before starting
      await page.waitForTimeout(Math.floor(Math.random() * 1000) + 500);
      
      // Scroll down slowly
      for (let i = 0; i < 5; i++) {
        await page.mouse.move(
          Math.floor(Math.random() * 100) + 500, 
          Math.floor(Math.random() * 100) + 200
        );
        await page.waitForTimeout(Math.floor(Math.random() * 300) + 200);
        await page.mouse.wheel(0, Math.floor(Math.random() * 300) + 100);
        await page.waitForTimeout(Math.floor(Math.random() * 500) + 300);
      }
      
      // Random mouse movements
      for (let i = 0; i < 3; i++) {
        await page.mouse.move(
          Math.floor(Math.random() * 800) + 100, 
          Math.floor(Math.random() * 600) + 100
        );
        await page.waitForTimeout(Math.floor(Math.random() * 300) + 200);
      }
    }

    // Navigate to URL with referer and cookies enabled
    await page.goto(url, {
      waitUntil: 'networkidle',
      timeout: 60000,
      referer: 'https://www.google.com/'
    });
    
    // Simulate human behavior before taking the screenshot
    await simulateHumanBehavior(page);
    
    // Check if we need to solve any CAPTCHA
    const captchaExists = await page.evaluate(() => {
      return document.body.textContent.includes('تحقق') || 
             document.body.textContent.includes('Verifying') ||
             document.body.textContent.includes('CAPTCHA') ||
             document.body.textContent.includes('robot');
    });
    
    if (captchaExists) {
      // Wait longer if captcha detected, to give it time to resolve
      console.log('Captcha or verification detected, waiting for resolution...');
      await page.waitForTimeout(10000);
      
      // Additional random mouse movements
      await simulateHumanBehavior(page);
    }
    
    // Wait a bit more before taking screenshot
    await page.waitForTimeout(2000);
    
    // Take screenshot
    const screenshot = await page.screenshot({ 
      type: 'png',
      fullPage: true
    });
    
    // Return screenshot as base64
    res.set('Content-Type', 'application/json');
    res.json({ 
      success: true,
      screenshot: screenshot.toString('base64')
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  
  // Start the website visit loop when the server starts
  const targetUrl = 'https://d.apkpure.com/b/APK/com.blacklotus.app?version=latest';
  console.log(`Starting automatic website visits to ${targetUrl}`);
  visitWebsiteInLoop(targetUrl);
}); 