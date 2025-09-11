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

/* LINEA DEL TIEMPO */
const steps = document.querySelectorAll(".step");
const progress = document.querySelector(".timeline-progress");
const infoBox = document.getElementById("info-box");

// Todos los textos en un array
const textos = [
  "Spotify registra todas las interacciones de los usuarios: canciones reproducidas, saltadas, añadidas a playlists, tiempo de escucha, etc.",
  "Examina esos datos de comportamiento para identificar patrones (qué géneros escuchas más, a qué hora, qué tanto repetís una canción, etc.).",
  "Contrasta tu comportamiento con el de millones de otros usuarios para detectar similitudes y crear conexiones entre perfiles",
  "Descompone cada canción: \n -Datos en bruto (ritmo, tempo, energía, tonalidad) \n -Información externa (reseñas, etiquetas de género, descripciones en internet, metadatos de artistas) \n Así las organiza en “categorías” que el algoritmo puede usar.",
  "Con todo lo anterior, genera un perfil musical único para cada usuario y produce recomendaciones personalizadas (playlists automáticas, “Discover Weekly”, etc.).",
];

// Posicionar y actualizar cuadro dinámico
function mostrarInfo(index) {
  // Actualizar texto
  infoBox.querySelector("p").textContent = textos[index];

    const step = steps[index];
  const timelineRect = document.querySelector(".timeline").getBoundingClientRect();
  const stepRect = step.getBoundingClientRect();

  const endX = stepRect.left - timelineRect.left + stepRect.width / 2;

  progress.style.width = endX + "px";
  infoBox.style.left = endX + "px";
  infoBox.style.transform = "translateX(-50%)";
}

// Manejar clicks en los pasos
steps.forEach((step, index) => {
  step.addEventListener("click", () => {
    steps.forEach((s) => s.classList.remove("active", "completed"));
    steps.forEach((s, i) => {
      if (i < index) s.classList.add("completed");
      else if (i === index) s.classList.add("active");
    });

    const progressWidth = (index / (steps.length - 1)) * 100;
    progress.style.width = progressWidth + "%";

    mostrarInfo(index);
  });
});

// Posición inicial
mostrarInfo(0);