document.addEventListener("DOMContentLoaded", function () {

    const galleryImages = document.querySelectorAll(".gallery-images");
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImages");
    const lightboxCaption = document.getElementById("lightboxCaption");
    const closeLightboxButton = document.getElementById("closeLightbox");

    if (
        !lightbox ||
        !lightboxImage ||
        !lightboxCaption ||
        !closeLightboxButton
    ) {
        return;
    }

    let previouslyFocusedElement = null;

    function openLightbox(images) {

        previouslyFocusedElement = document.activeElement;

        lightboxImage.src = images.src;
        lightboxImage.alt = images.alt;

        const figure = images.closest("figure");
        const caption = figure
            ? figure.querySelector("figcaption")
            : null;

        lightboxCaption.textContent = caption
            ? caption.textContent
            : images.alt;

        lightbox.hidden = false;
        lightbox.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        closeLightboxButton.focus();
    }

    function closeLightbox() {

        lightbox.hidden = true;
        lightbox.setAttribute("aria-hidden", "true");

        lightboxImage.src = "";
        lightboxImage.alt = "";
        lightboxCaption.textContent = "";

        document.body.style.overflow = "";

        if (previouslyFocusedElement) {
            previouslyFocusedElement.focus();
        }
    }

    galleryImages.forEach(function (images) {

        images.addEventListener("click", function () {
            openLightbox(images);
        });

        images.addEventListener("keydown", function (event) {

            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openLightbox(image);
            }

        });

    });

    closeLightboxButton.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", function (event) {

        if (event.target === lightbox) {
            closeLightbox();
        }

    });

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape" && !lightbox.hidden) {
            closeLightbox();
        }

    });

});