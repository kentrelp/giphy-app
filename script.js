const apiKey = "PASTE_YOUR_GIPHY_API_KEY_HERE";
const gifContainer = document.getElementById("gifContainer");
const trendingBtn = document.getElementById("trendingBtn");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

function renderGifs(gifs) {
  gifContainer.innerHTML = "";

  if (!gifs || gifs.length === 0) {
    gifContainer.innerHTML = "<p>No GIFs found.</p>";
    return;
  }

  gifs.forEach((gif) => {
    const gifCard = document.createElement("div");
    gifCard.classList.add("gif-card");

    gifCard.innerHTML = `
      <img src="${gif.images.fixed_height.url}" alt="${gif.title}">
      <p>${gif.title || "Untitled GIF"}</p>
    `;

    gifContainer.appendChild(gifCard);
  });
}

async function fetchTrendingGifs() {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=12&rating=g`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch trending GIFs.");
    }

    const data = await response.json();
    renderGifs(data.data);
  } catch (error) {
    gifContainer.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

async function searchGifs() {
  const searchTerm = searchInput.value.trim();

  if (searchTerm === "") {
    gifContainer.innerHTML = "<p>Please enter a search term.</p>";
    return;
  }

  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(searchTerm)}&limit=12&rating=g`
    );

    if (!response.ok) {
      throw new Error("Failed to search GIFs.");
    }

    const data = await response.json();
    renderGifs(data.data);
  } catch (error) {
    gifContainer.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

trendingBtn.addEventListener("click", fetchTrendingGifs);
searchBtn.addEventListener("click", searchGifs);

searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    searchGifs();
  }
});