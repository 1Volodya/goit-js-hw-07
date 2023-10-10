import { galleryItems } from "./gallery-items.js";
// Change code below this line

const gallery = document.querySelector(".gallery");

function renderGallery() {
  const markup = galleryItems
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item"><a class="gallery__link" href="${original}"><img class="gallery__image" src="${preview}" data-source="${original}" alt="${description}"></a></li>`;
    })
    .join("");
  gallery.innerHTML = markup;
}

function openModal(event) {
  event.preventDefault();
  const target = event.target;
  const dataset = target.dataset;

  if (
    target.classList.contains("gallery__image") ||
    target.parentElement.classList.contains("gallery__item") ||
    target.classList.contains("gallery__link")
  ) {
    const modal = basicLightbox.create(
      `<img src="${dataset.source}" width="800" height="600">`,
      {
        onShow: (instance) => {
          window.addEventListener("keydown", closeByEsc);
        },
        onClose: (instance) => {
          window.removeEventListener("keydown", closeByEsc);
        },
      }
    );
    modal.show();

    function closeByEsc(event) {
      if (event.code === "Escape") {
        modal.close();
      }
    }
  }
}

gallery.addEventListener("click", openModal);

renderGallery();
