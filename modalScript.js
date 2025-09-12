window.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("openModalBtn");
  const closeBtn = document.getElementById("closeModalBtn");
  const modal = document.getElementById("modal");

  openBtn.addEventListener("click", () => {
    modal.classList.add("show");
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("show");
  });

  // cerrar clickeando fuera del menú
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
    }
  });
});
