const imageGallery = document.getElementById("imageGallery");
const columns = document.querySelectorAll(".imageColumn"); // Get all 4 columns

// Function to introduce a delay (sleep) in async/await flow
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchImages() {
  try {
    const count = 100; // Number of images to fetch
    for (let i = 0; i < count; i++) {
      // Fetch a single image at a time
      const response = await fetch("http://localhost:8080/images?count=1"); // Fetch 1 image
      const data = await response.json();
      console.log(data); // Log to check the structure of the fetched data

      if (data[0] && data[0].message) {
        const imgElement = document.createElement("img");
        imgElement.src = data[0].message; // The URL of the image
        imgElement.alt = "Waifu Image";
        imgElement.style.width = "100%"; // Ensure the image takes up the full width of the column
        imgElement.style.height = "auto"; // Maintain aspect ratio

        // Determine which column to place the image in (cyclically)
        const columnIndex = i % 4; // Distribute images to 4 columns cyclically
        const column = columns[columnIndex]; // Get the appropriate column
        column.appendChild(imgElement); // Add the image to the column
      }

      // Wait for 5 seconds before fetching the next image
      await sleep(5000); // 5000ms = 5 seconds
    }
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}

// Load images on page load
fetchImages();
