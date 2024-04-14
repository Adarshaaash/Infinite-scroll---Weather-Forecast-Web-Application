declare global{
namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_WEATHER_API_KEY: string; // Colon instead of equals
    // Add other environment variables as needed 
  }
}
}