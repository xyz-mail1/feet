const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors()); // Enable CORS for all routes

// Function to introduce a delay (sleep) in async/await flow
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Route to fetch multiple images with rate-limiting (5 seconds between requests)
app.get("/images", async (req, res) => {
  const count = parseInt(req.query.count) || 1; // Default to 1 image if no count is specified

  try {
    const messages = [];

    for (let index = 0; index < count; index++) {
      // Introduce a 5-second delay between each request to avoid rate-limiting
      if (index > 0) {
        console.log("Waiting 5 seconds before sending the next request...");
        await sleep(5000); // 5000ms = 5 seconds
      }

      // Fetch image data from the external API
      const response = await fetch("https://nekobot.xyz/api/image?type=feet");
      const data = await response.json();

      if (data.message) {
        console.log("Fetched message:", data.message); // Log the image URL
        messages.push({ message: data.message }); // Assuming the response contains a 'message' field with a URL
      } else {
        console.error("No image message found");
        throw new Error("No image message found");
      }
    }

    res.json(messages); // Return an array of message objects (each containing a URL)
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Error fetching images" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`CORS Proxy running on port ${PORT}`);
});
