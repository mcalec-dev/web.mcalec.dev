let songs = [];
let currentSong = 0;
const baseUrls = [ // urls here
  "//cdn.mcalec.dev/audio/mp3/",
  "//cdn.mcalec.dev/audio/opus/",
];
async function loadSongs() {
  try {
    const response = await fetch('/json/songs.json'); // json here
    songs = await response.json();
    initMusic();
  } catch (error) {
    console.error('Error loading songs:', error);
  }
}
async function checkUrlExists(url) {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}
async function getValidSongUrl(songSrc) {
  for (const baseUrl of baseUrls) {
    const fullUrl = `${baseUrl}${songSrc}`;
    if (await checkUrlExists(fullUrl)) {
      return fullUrl;
    }
  }
  return null;
}
async function initMusic() {
  if (songs.length === 0) return;
  const e = document.getElementById("music-src"),
        t = document.getElementById("music"),
        s = document.getElementById("music-skip"),
        n = document.getElementById("music-info");
    async function o() {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * songs.length);
    } while (newIndex === currentSong && songs.length > 1);
      currentSong = newIndex;
      const validUrl = await getValidSongUrl(songs[currentSong].src);
      if (validUrl) {
        e.src = validUrl;
        e.play();
        t.setAttribute("title", "Unpause the current song.");
        t.classList.add("paused");
        s.style.display = "block";
        n.textContent = songs[currentSong].title;
        n.setAttribute("title", songs[currentSong].title);
      } else {
        console.error(`Song not found: ${songs[currentSong].src}`);
      }
    }
    currentSong = Math.floor(Math.random() * songs.length);
    const initialUrl = await getValidSongUrl(songs[currentSong].src);
    if (initialUrl) {
      e.src = initialUrl;
      n.setAttribute("title", songs[currentSong].title);
    } else {
      console.error(`Initial song not found: ${songs[currentSong].src}`);
    }
    t.addEventListener("click", async function () {
    if (e.paused) {
      e.play();
      t.classList.add("paused");
      t.setAttribute("title", "Pause the current song.")
      s.style.display = "block";
      n.textContent = songs[currentSong].title;
      n.setAttribute("title", songs[currentSong].title);
    } else {
      e.pause();
      t.classList.remove("paused");
      t.setAttribute("title", "Unpause the current song.");
    }
  });
  s.addEventListener("click", o);
  e.volume = 0.75;
  e.addEventListener("ended", o);
}
loadSongs();
