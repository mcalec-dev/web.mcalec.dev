const songs = [{
  title: "bruh-what.mp3",
  src: "bruh-what.mp3"
}, {
  title: "cats-remix.mp3",
  src: "cats-remix.mp3"
}, {
  title: "cats.mp3",
  src: "cats.mp3"
}, {
  title: "hotel-california.mp3",
  src: "hotel-california.mp3"
}, {
  title: "i-wanna-be-like-you.mp3",
  src: "i-wanna-be-like-you.mp3"
}, {
  title: "moves-like-jagger.mp3",
  src: "moves-like-jagger.mp3"
}, {
  title: "this-love.mp3",
  src: "this-love.mp3"
}, {
  title: "upside-down.mp3",
  src: "upside-down.mp3"
}, {
  title: "veridis-quo.mp3",
  src: "veridis-quo.mp3"
}, {
  title: "virtual-insanity.mp3",
  src: "virtual-insanity.mp3"
}, {
  title: "wiiu-eshop-music.mp3",
  src: "wiiu-eshop-music.mp3"
}, {
  title: "wiiu-mii-maker.mp3",
  src: "wiiu-mii-maker.mp3"
}, {
  title: "goat-simulator.mp3",
  src: "goat-simulator.mp3"
}, {
  title: "song-for-denise.mp3",
  src: "song-for-denise.mp3"
}, {
  title: "break-my-stride.mp3",
  src: "break-my-stride.mp3"
}];
let currentSong = 0;
function initMusic() {
  const e = document.getElementById("music-src")
    , t = document.getElementById("music")
    , s = document.getElementById("music-skip")
    , n = document.getElementById("music-info")
  //  , i = document.getElementById("music-cover");
  //function c() {
  //    i.src = `/audio/mp3/thumbnails/${songs[currentSong].src.replace(".mp3", ".png")}`,
  //    i.style.display = "block"
  //}
  function o() {
      currentSong = (currentSong + 1) % songs.length,
      e.src = `//cdn.mcalec.dev/audio/mp3/${songs[currentSong].src}`,
      e.play(),
      t.classList.add("paused"),
      s.style.display = "block",
      n.textContent = songs[currentSong].title,
      c()
  }
  currentSong = Math.floor(Math.random() * songs.length),
  e.src = `//cdn.mcalec.dev/audio/mp3/${songs[currentSong].src}`,
  //i.style.display = "none",
  t.addEventListener("click", (function() {
      e.paused ? (e.play(),
      t.classList.add("paused"),
      s.style.display = "block",
      n.textContent = songs[currentSong].title,
      c()) : (e.pause(),
      t.classList.remove("paused"),
      s.style.display = "none",
      n.textContent = "",
      i.style.display = "none")
  }
  )),
  s.addEventListener("click", o),
  e.volume = .5,
  e.addEventListener("ended", (function() {
      o()
  }
  ))
}
initMusic();