// Middleware function to log request details
const requestLoggerMiddleware = (req, res, next) => {
    const timestamp = new Date().toISOString(); // Get current timestamp
    const { method, url, headers } = req; // Extract method, URL, and headers from request object
    const accessToken = headers.authorization || 'No access token'; // Extract access token from headers or set to 'No access token' if not present
  
    // Log request details
    console.log(`[${timestamp}] ${method}: ${url}, AccessToken: "${accessToken}"`);
  
    next(); // Call the next middleware in the stack
  };
  
  module.exports = requestLoggerMiddleware;
  