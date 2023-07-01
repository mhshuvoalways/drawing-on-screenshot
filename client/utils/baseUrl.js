let baseUrl;

if (import.meta.env.VITE_DEV) {
  baseUrl = "http://localhost:5000";
} else {
  baseUrl = "https://baseball.onrender.com";
}

export default baseUrl;
