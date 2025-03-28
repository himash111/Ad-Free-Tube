const shortsContainer = document.getElementById("shortsContainer");

async function fetchShorts() {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&type=video&videoDuration=short&key=${API_KEY}`);
    const data = await response.json();
    
    data.items.forEach(video => {
        const shortElement = document.createElement("div");
        shortElement.classList.add("short-video");
        shortElement.innerHTML = `
            <iframe src="https://www.youtube.com/embed/${video.id.videoId}?autoplay=1&loop=1&controls=0&showinfo=0" frameborder="0" allowfullscreen></iframe>
        `;
        shortsContainer.appendChild(shortElement);
    });
}

document.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        fetchShorts();
    }
});

fetchShorts();
