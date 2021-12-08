/*
1. Render song
2. Scroll top
3. Play/pause/seek
4. CD rorare
5. Next/prev
6. Random
7. Next/Repeat when ended
8. Active song
9. Scroll active song into view
10. Play song when click
*/

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const playList = $(".playlist");
const playBtn = $(".btn-toggle-play");
const player = $(".player");
const cd = $(".cd");
let currentIndex = 0;
let isPlaying = false;
const progress = $("#progress");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const songs = [
  {
    name: "Cứ Chill Thôi",
    singer: ["Chillies", "Suni Hạ Linh", "Rhymastic"],
    path: "./assets/music/song1.mp3",
    image: "./assets/img/song1.jpg",
  },
  {
    name: "Crush",
    singer: ["WN", "Vani", "An An"],
    path: "./assets/music/song2.mp3",
    image: "./assets/img/song2.jpg",
  },
  {
    name: "Vô Tình",
    singer: ["Xesi", "Hoaprox"],
    path: "./assets/music/song3.mp3",
    image: "./assets/img/song3.jpg",
  },
  {
    name: "Cứ Chill Thôi",
    singer: ["Chillies", "Suni Hạ Linh", "Rhymastic"],
    path: "./assets/music/song1.mp3",
    image: "./assets/img/song1.jpg",
  },
  {
    name: "Crush",
    singer: ["WN", "Vani", "An An"],
    path: "./assets/music/song2.mp3",
    image: "./assets/img/song2.jpg",
  },
  {
    name: "Vô Tình",
    singer: ["Xesi", "Hoaprox"],
    path: "./assets/music/song3.mp3",
    image: "./assets/img/song3.jpg",
  },
];

const start = () => {
  //Lắng nghe và xử lý sự kiện
  handleEvents();

  //Tải thông tin bài hát đầu khi chạy ứng dụng
  loadCurrentSong(currentIndex);
  render();
};

// Render the list song
const render = () => {
  const htmls = songs.map((song) => {
    return `<div class="song">
        <div
          class="thumb"
          style="
            background-image: url(${song.image});
          "
        ></div>
        <div class="body">
          <h3 class="title">${song.name}</h3>
          <p class="author">${song.singer}</p>
        </div>
        <div class="option">
          <i class="fas fa-ellipsis-h"></i>
        </div>
      </div>`;
  });
  playList.innerHTML = htmls.join("");
};

//Handle Events:
const handleEvents = () => {
  const cdWidth = cd.offsetWidth;

  //Xử lý CD quay
  //Animate API
  const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
    duration: 10000,
    iterations: Infinity,
  });
    cdThumbAnimate.pause();

  //Xử lý phóng to hoặc thu nhỏ
  window.onscroll = () => {
    const scrollTop = window.scrollY;
    const newCdWidth = cdWidth - scrollTop;
    // console.log(newCdWidth)
    cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
    cd.style.opacity = newCdWidth / cdWidth;
  };
  //Xử lý  khi click play: code xấu
  //   playBtn.onclick = ()=>{
  //     if(isPlaying){
  //         audio.pause()
  //         player.classList.remove('playing')
  //         isPlaying=false
  //     }else{
  //         audio.play()

  //     }
  //   }

  //Khi song được play
  playBtn.onclick = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  };
  audio.onplay = () => {
    player.classList.add("playing");
    isPlaying = true;
    cdThumbAnimate.play();
  };
  //Khi song được pause
  audio.onpause = () => {
    player.classList.remove("playing");
    isPlaying = false;
    cdThumbAnimate.pause();
  };
  //Khi bài hát thay đổi
  audio.ontimeupdate = () => {
    if (audio.duration) {
      const progressPercent = Math.floor(
        (audio.currentTime / audio.duration) * 100
      );
      progress.value = progressPercent;
    }
  };

  //Xử lý khi tua song
  progress.onchange = (e) => {
    const seekTime = (audio.duration / 100) * e.target.value;
    audio.currentTime = seekTime;
  };
};

// const getCurrentSong = (currentIndex)=>{
//     return songs[currentIndex]
// }

const loadCurrentSong = (currentIndex) => {
  heading.textContent = songs[currentIndex].name;
  cdThumb.style.backgroundImage = `url(${songs[currentIndex].image})`;
  audio.src = songs[currentIndex].path;
  //   console.log(heading, cdThumb, audio);
};

start();
