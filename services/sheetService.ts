// This service handles saving data to a Google Sheet via a Google Apps Script Web App.

export const saveToGoogleSheets = async (data: any, type: 'INTEREST' | 'ENROLLMENT') => {
  // TODO: REPLACE THIS URL with your deployed Google Apps Script Web App URL.
  // Instructions:
  // 1. Go to script.google.com -> New Project
  // 2. Paste the script provided in the AI instructions.
  // 3. Deploy -> New Deployment -> Select "Web app"
  // 4. "Who has access" -> "Anyone" (Important!)
  // 5. Copy the URL and paste it below.
  const SCRIPT_URL = ''; 

  const payload = {
    ...data,
    type,
    timestamp: new Date().toISOString(),
    // Add user agent for debugging context
    userAgent: navigator.userAgent
  };

  console.log(`[Saving to Sheets - ${type}]`, payload);

  // If no URL is provided, we simulate a successful save for the MVP demo
  if (!SCRIPT_URL) {
    await new Promise(resolve => setTimeout(resolve, 1500)); // Fake network delay
    return true;
  }

  try {
    // We use no-cors mode because Google Scripts don't return standard CORS headers.
    // The request will succeed, but the response will be 'opaque' (we can't read it).
    await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    return true;
  } catch (error) {
    console.error('Error saving to Google Sheets:', error);
    return false;
  }
};
