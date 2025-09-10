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


/*   ZONA DE PRUEBAS NUCLEO 4
  ADVERTENCIA: HEHCO CON CHAT GPT */

const scrollWrapper = document.getElementById("scrollWrapper");
  const thumb = document.getElementById("customThumb");
  const scrollbar = document.querySelector(".custom-scrollbar");

  function updateThumb() {
    const ratio = scrollWrapper.scrollLeft / (scrollWrapper.scrollWidth - scrollWrapper.clientWidth);
    const maxThumbPos = scrollbar.clientWidth - thumb.clientWidth;
    thumb.style.left = ratio * maxThumbPos + "px";
  }

  scrollWrapper.addEventListener("scroll", updateThumb);

  // Drag manual del thumb
  let isDragging = false;
  thumb.addEventListener("mousedown", () => isDragging = true);
  document.addEventListener("mouseup", () => isDragging = false);
  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const rect = scrollbar.getBoundingClientRect();
    let x = e.clientX - rect.left - thumb.clientWidth / 2;
    x = Math.max(0, Math.min(x, rect.width - thumb.clientWidth));
    thumb.style.left = x + "px";
    const ratio = x / (rect.width - thumb.clientWidth);
    scrollWrapper.scrollLeft = ratio * (scrollWrapper.scrollWidth - scrollWrapper.clientWidth);
  });

  updateThumb(); // inicializa

  /* TERMINA ZONA DE PRUEBAS NUCLEO 4 */

function scrollToSection(id) {
  const section = document.getElementById(id);
  const container = document.querySelector('.scrollContainer');

  container.scrollTo({
    left: section.offsetLeft,
    behavior: "smooth"
  });
}