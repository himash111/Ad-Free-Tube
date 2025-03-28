const urlParams = new URLSearchParams(window.location.search);
const videoId = urlParams.get("v");
const playerContainer = document.getElementById("playerContainer");
const relatedVideos = document.getElementById("relatedVideos");

playerContainer.innerHTML = `
    <iframe width="100%" height="500px" src="https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1" frameborder="0" allowfullscreen></iframe>
`;

async function fetchRelatedVideos() {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&relatedToVideoId=${videoId}&type=video&key=${API_KEY}`);
    const data = await response.json();
    
    relatedVideos.innerHTML = "";
    data.items.forEach(video => {
        const videoCard = document.createElement("div");
        videoCard.innerHTML = `
            <img src="${video.snippet.thumbnails.medium.url}" onclick="watchRelated('${video.id.videoId}')">
            <h3>${video.snippet.title}</h3>
        `;
        relatedVideos.appendChild(videoCard);
    });
}

function watchRelated(videoId) {
    window.location.href = `watch.html?v=${videoId}`;
}

fetchRelatedVideos();
