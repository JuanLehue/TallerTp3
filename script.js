 const audio = document.getElementById("audioPlayer");
  const playBtn = document.querySelector(".playIcon img");
  const progressBar = document.querySelector(".progress");
  const progressContainer = document.querySelector(".progressBar");

  let isPlaying = false;

  // Play/Pause
  playBtn.addEventListener("click", () => {
    if (isPlaying) {
      audio.pause();
      playBtn.src = "images/playIcon.png"; // ícono play
    } else {
      audio.play();
      playBtn.src = "images/pauseIcon.png"; // cambia al ícono pause
    }
    isPlaying = !isPlaying;
  });

  // Actualizar progreso mientras suena la música
  audio.addEventListener("timeupdate", () => {
    const percentage = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = percentage + "%";
  });

  // Permitir hacer click en la barra para saltar en el tiempo
  progressContainer.addEventListener("click", (e) => {
    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
  });