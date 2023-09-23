const appSettings = {
  // base_url: "https://gonje.iapplabz.co.in/api/",
  // base_url: "https://gonje.com.au/api/",
  base_url: "http://127.0.0.1:8000/",
  // socket_url: "https://socket.gonje.com.au/",
  // socket_url: "http://localhost:3000/",
};

let variable = appSettings;

if (process.env.NODE_ENV === "development") {
  variable = {
    // base_url: "https://gonje.iapplabz.co.in/api/",
    // base_url: "https://gonje.com.au/api/",
    base_url: "http://127.0.0.1:8000/",
    // socket_url: "https://socket.gonje.com.au/",
    // socket_url: "http://localhost:3000/",

  };
}

export default variable;
