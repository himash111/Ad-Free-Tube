const API_KEY = "AIzaSyA3V6d9T-P1w9TYTykxnIqltlZ5iJQDLgI";
const videoContainer = document.getElementById("videoContainer");

async function fetchVideos() {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&chart=mostPopular&maxResults=20&videoCategoryId=0&key=${API_KEY}`);
    const data = await response.json();
    
    videoContainer.innerHTML = "";
    data.items.forEach(video => {
        const videoCard = document.createElement("div");
        videoCard.classList.add("video-card");
        videoCard.innerHTML = `
            <img src="${video.snippet.thumbnails.medium.url}" onclick="watchVideo('${video.id}')">
            <h3>${video.snippet.title}</h3>
        `;
        videoContainer.appendChild(videoCard);
    });
}

function watchVideo(videoId) {
    window.location.href = `watch.html?v=${videoId}`;
}

fetchVideos();
