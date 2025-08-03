let apiBaseUrl;

if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
  apiBaseUrl = "http://localhost:5000";
} else {
  apiBaseUrl = "urldodeploy.com"; 
}

window.apiBaseUrl = apiBaseUrl;
