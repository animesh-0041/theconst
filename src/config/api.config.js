export const appConfig = {
  apiBaseURL: "https://stackdev-backend.vercel.app/api",
  // apiBaseURL: "http://localhost:5000/api",
  // apiBaseURL: "https://stackdev-backend.onrender.com/api",
  API_HEADER: { "content-type": "application/json" },
  timeout: 10000,
  retryDelay: 1000,
  maxRetry: 2,
};
