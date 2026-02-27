
// Your predefined "List of Lists"
const myReelCollections = [
  ["https://web.facebook.com/reel/697360596101927"],
  ["https://web.facebook.com/reel/891762759890788"],
  ["https://youtu.be/8kpnSb4yGR0?si=sMEjGP3Bv0JoWSPn"],
  ["https://youtu.be/KhHtqz_NQA0?si=28oJOBNqeiKQ54LC"],
  ["https://web.facebook.com/reel/2146730562760051"],
  ["https://web.facebook.com/reel/4199522350335393"],
  ["https://web.facebook.com/reel/904746362290279"],
  ["https://web.facebook.com/reel/2826712717681291"],
  ["https://web.facebook.com/reel/25470773862618570"],
  ["https://fb.watch/FxixWBBoA8/"]
];

const feed = document.getElementById('mainFeed');

// 1. Flatten the list
let allReels = myReelCollections.flat();

// 2. Shuffle function (Fisher-Yates)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Function to extract YouTube ID from various URL formats
function getYouTubeID(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

function loadFeed() {
  // 3. Shuffle before rendering
  const randomizedReels = shuffleArray(allReels);

  randomizedReels.forEach(url => {
    let iframeSrc = "";

    // Check if it's a YouTube link
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      const videoId = getYouTubeID(url);
      iframeSrc = `https://www.youtube.com/embed/${videoId}?rel=0&autoplay=0`;
    }
    // Otherwise, treat as Facebook
    else {
      const encodedUrl = encodeURIComponent(url);
      iframeSrc = `https://www.facebook.com/plugins/video.php?href=${encodedUrl}&show_text=0&width=450`;
    }

    const card = document.createElement('div');
    card.className = 'reel-card';
    card.innerHTML = `
                <iframe src="${iframeSrc}" 
                    scrolling="no" 
                    allowfullscreen="true" 
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
                </iframe>`;

    feed.appendChild(card);
  });
}

// Initialize the app
window.onload = loadFeed;