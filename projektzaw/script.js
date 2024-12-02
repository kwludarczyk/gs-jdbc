const gallery = document.querySelector(".gallery");
const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector("#lightbox-img");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const closeBtn = document.querySelector(".close");

const images = Array.from({ length: 10 }, (_, i) => `images/${i}.png`);
let currentIndex = 0;

images.forEach((src, index) => {
  const img = document.createElement("img");
  img.src = src;
  img.dataset.index = index;
  gallery.appendChild(img);
});

gallery.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG") {
    currentIndex = parseInt(e.target.dataset.index, 10);
    showLightbox();
  }
});

function showLightbox() {
  lightboxImg.src = images[currentIndex];
  lightbox.classList.remove("hidden");
}

closeBtn.addEventListener("click", () => {
  lightbox.classList.add("hidden");
});

prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showLightbox();
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % images.length;
  showLightbox();
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.add("hidden");
  }
});
