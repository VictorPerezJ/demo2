/* =========================================================
   INICIALIZACIÓN GENERAL DEL PROYECTO
   - Este archivo concentra la interacción del sitio
   ========================================================= */

/* =========================================================
   ESTADO GLOBAL
   ========================================================= */
let isServiceModalClosing = false;
let isGalleryModalClosing = false;
let currentGalleryIndex = 0;

/* =========================================================
   DATOS DE LA GALERÍA
   - Demo temporal con 3 imágenes
   ========================================================= */
const galleryItems = [
    {
        src: "images/sol/lente1.jpg",
        title: "Modelo Solar 1"
    },
    {
        src: "images/sol/lente2.jpg",
        title: "Modelo Solar 2"
    },
    {
        src: "images/sol/lente3.jpg",
        title: "Modelo Solar 3"
    }
];

/* =========================================================
   INICIALIZAR ÍCONOS LUCIDE
   ========================================================= */
document.addEventListener("DOMContentLoaded", function () {
    if (window.lucide) {
        lucide.createIcons();
    }
});

/* =========================================================
   CONTROL DEL MODAL DE CONTACTO
   ========================================================= */
function toggleModal() {
    const modal = document.getElementById("contactModal");
    if (!modal) return;

    modal.classList.toggle("hidden");

    const isHidden = modal.classList.contains("hidden");
    document.body.style.overflow = isHidden ? "" : "hidden";
}

/* =========================================================
   CONTROL DE LA SECCIÓN LEGAL
   ========================================================= */
function toggleLegal() {
    const legalSection = document.getElementById("legalSection");
    if (!legalSection) return;

    legalSection.classList.toggle("hidden");
}

/* =========================================================
   OBSERVADOR DEL MODAL DE CONTACTO
   - Mantiene el bloqueo de scroll consistente
   ========================================================= */
const observer = new MutationObserver(() => {
    const modal = document.getElementById("contactModal");
    if (!modal) return;

    const serviceModal = document.getElementById("serviceModal");
    const galleryModal = document.getElementById("galleryModal");

    const contactIsOpen = !modal.classList.contains("hidden");
    const serviceIsOpen = serviceModal && !serviceModal.classList.contains("hidden");
    const galleryIsOpen = galleryModal && !galleryModal.classList.contains("hidden");

    document.body.style.overflow = (contactIsOpen || serviceIsOpen || galleryIsOpen) ? "hidden" : "";
});

document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("contactModal");
    if (!modal) return;

    observer.observe(modal, {
        attributes: true,
        attributeFilter: ["class"]
    });
});

/* =========================================================
   VALIDACIÓN FUTURA / PUNTO DE EXPANSIÓN
   ========================================================= */
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("optometristaForm");
    if (!form) return;

    form.addEventListener("submit", function () {
        // Punto de expansión futura
    });
});

/* =========================================================
   MODAL DE SERVICIOS
   ========================================================= */
function openServiceModal(title, image, description) {
    const modal = document.getElementById("serviceModal");
    const overlay = document.getElementById("serviceModalOverlay");
    const panel = document.getElementById("serviceModalPanel");
    const modalTitle = document.getElementById("serviceModalTitle");
    const modalImage = document.getElementById("serviceModalImage");
    const modalDescription = document.getElementById("serviceModalDescription");

    if (!modal || !overlay || !panel || !modalTitle || !modalImage || !modalDescription) return;

    modalTitle.textContent = title;
    modalImage.src = image;
    modalImage.alt = title;
    modalDescription.textContent = description;

    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";

    if (window.lucide) {
        lucide.createIcons();
    }

    requestAnimationFrame(() => {
        overlay.classList.remove("opacity-0");
        panel.classList.remove("opacity-0", "scale-95", "translate-y-4");
        panel.classList.add("opacity-100", "scale-100", "translate-y-0");
    });
}

function closeServiceModal() {
    const modal = document.getElementById("serviceModal");
    const overlay = document.getElementById("serviceModalOverlay");
    const panel = document.getElementById("serviceModalPanel");

    if (!modal || !overlay || !panel || isServiceModalClosing) return;

    isServiceModalClosing = true;

    overlay.classList.add("opacity-0");
    panel.classList.remove("opacity-100", "scale-100", "translate-y-0");
    panel.classList.add("opacity-0", "scale-95", "translate-y-4");

    setTimeout(() => {
        modal.classList.add("hidden");

        const contactModal = document.getElementById("contactModal");
        const contactIsOpen = contactModal && !contactModal.classList.contains("hidden");

        document.body.style.overflow = contactIsOpen ? "hidden" : "";
        isServiceModalClosing = false;
    }, 300);
}

/* =========================================================
   MODAL DE GALERÍA
   ========================================================= */
function openGalleryModal(index) {
    const modal = document.getElementById("galleryModal");
    const overlay = document.getElementById("galleryModalOverlay");
    const panel = document.getElementById("galleryModalPanel");

    if (!modal || !overlay || !panel) return;
    if (typeof index !== "number" || !galleryItems[index]) return;

    currentGalleryIndex = index;
    updateGalleryModalContent();

    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";

    if (window.lucide) {
        lucide.createIcons();
    }

    requestAnimationFrame(() => {
        overlay.classList.remove("opacity-0");
        panel.classList.remove("opacity-0", "scale-95", "translate-y-4");
        panel.classList.add("opacity-100", "scale-100", "translate-y-0");
    });
}

function updateGalleryModalContent() {
    const modalImage = document.getElementById("galleryModalImage");
    const modalTitle = document.getElementById("galleryModalTitle");

    if (!modalImage || !modalTitle) return;

    const currentItem = galleryItems[currentGalleryIndex];
    if (!currentItem) return;

    modalImage.src = currentItem.src;
    modalImage.alt = currentItem.title;
    modalTitle.textContent = currentItem.title;
}

function showNextGalleryImage() {
    currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
    updateGalleryModalContent();
}

function showPrevGalleryImage() {
    currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
    updateGalleryModalContent();
}

function closeGalleryModal() {
    const modal = document.getElementById("galleryModal");
    const overlay = document.getElementById("galleryModalOverlay");
    const panel = document.getElementById("galleryModalPanel");

    if (!modal || !overlay || !panel || isGalleryModalClosing) return;

    isGalleryModalClosing = true;

    overlay.classList.add("opacity-0");
    panel.classList.remove("opacity-100", "scale-100", "translate-y-0");
    panel.classList.add("opacity-0", "scale-95", "translate-y-4");

    setTimeout(() => {
        modal.classList.add("hidden");

        const serviceModal = document.getElementById("serviceModal");
        const contactModal = document.getElementById("contactModal");

        const serviceIsOpen = serviceModal && !serviceModal.classList.contains("hidden");
        const contactIsOpen = contactModal && !contactModal.classList.contains("hidden");

        document.body.style.overflow = (serviceIsOpen || contactIsOpen) ? "hidden" : "";
        isGalleryModalClosing = false;
    }, 300);
}

/* =========================================================
   SWIPE EN MÓVIL PARA EL MODAL DE GALERÍA
   ========================================================= */
document.addEventListener("DOMContentLoaded", function () {
    const swipeArea = document.getElementById("gallerySwipeArea");
    if (!swipeArea) return;

    let touchStartX = 0;
    let touchEndX = 0;

    swipeArea.addEventListener("touchstart", function (event) {
        touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });

    swipeArea.addEventListener("touchend", function (event) {
        touchEndX = event.changedTouches[0].screenX;
        const distance = touchEndX - touchStartX;

        if (Math.abs(distance) < 50) return;

        if (distance < 0) {
            showNextGalleryImage();
        } else {
            showPrevGalleryImage();
        }
    }, { passive: true });
});

/* =========================================================
   CARRUSEL AUTOMÁTICO INFINITO
   - Movimiento lento constante
   - Pausa al pasar mouse
   - Soporte táctil manual
   ========================================================= */
document.addEventListener("DOMContentLoaded", function () {
    const track = document.getElementById("seasonCarouselTrack");
    const prevBtn = document.getElementById("seasonPrevBtn");
    const nextBtn = document.getElementById("seasonNextBtn");

    if (!track || !prevBtn || !nextBtn) return;

    let autoScrollSpeed = 0.35;
    let isPaused = false;
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let animationFrameId;

    const originalItemsCount = 3;

    function getCardStep() {
        const firstCard = track.querySelector(".season-card");
        if (!firstCard) return 244;
        return firstCard.offsetWidth + 24;
    }

    function getResetPoint() {
        return getCardStep() * originalItemsCount;
    }

    function loopCarousel() {
        if (!isPaused && !isDragging) {
            currentTranslate -= autoScrollSpeed;

            const resetPoint = getResetPoint();
            if (Math.abs(currentTranslate) >= resetPoint) {
                currentTranslate = 0;
            }

            track.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;
        }

        animationFrameId = requestAnimationFrame(loopCarousel);
    }

    function moveCarouselByCards(direction = 1) {
        currentTranslate -= getCardStep() * direction;

        const resetPoint = getResetPoint();

        if (Math.abs(currentTranslate) >= resetPoint) {
            currentTranslate = 0;
        }

        if (currentTranslate > 0) {
            currentTranslate = -resetPoint + getCardStep();
        }

        track.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;
    }

    prevBtn.addEventListener("click", function () {
        moveCarouselByCards(-1);
    });

    nextBtn.addEventListener("click", function () {
        moveCarouselByCards(1);
    });

    track.addEventListener("mouseenter", function () {
        isPaused = true;
    });

    track.addEventListener("mouseleave", function () {
        isPaused = false;
    });

    track.addEventListener("touchstart", function (event) {
        isDragging = true;
        isPaused = true;
        startX = event.touches[0].clientX;
    }, { passive: true });

    track.addEventListener("touchmove", function (event) {
        if (!isDragging) return;

        const currentX = event.touches[0].clientX;
        const diff = currentX - startX;

        track.style.transform = `translate3d(${currentTranslate + diff}px, 0, 0)`;
    }, { passive: true });

    track.addEventListener("touchend", function (event) {
        if (!isDragging) return;

        const endX = event.changedTouches[0].clientX;
        const diff = endX - startX;

        if (Math.abs(diff) > 50) {
            if (diff < 0) {
                moveCarouselByCards(1);
            } else {
                moveCarouselByCards(-1);
            }
        } else {
            track.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;
        }

        isDragging = false;
        isPaused = false;
    }, { passive: true });

    track.addEventListener("mousedown", function (event) {
        isDragging = true;
        isPaused = true;
        startX = event.clientX;
    });

    window.addEventListener("mousemove", function (event) {
        if (!isDragging) return;

        const diff = event.clientX - startX;
        track.style.transform = `translate3d(${currentTranslate + diff}px, 0, 0)`;
    });

    window.addEventListener("mouseup", function (event) {
        if (!isDragging) return;

        const diff = event.clientX - startX;

        if (Math.abs(diff) > 50) {
            if (diff < 0) {
                moveCarouselByCards(1);
            } else {
                moveCarouselByCards(-1);
            }
        } else {
            track.style.transform = `translate3d(${currentTranslate}px, 0, 0)`;
        }

        isDragging = false;
        isPaused = false;
    });

    loopCarousel();

    window.addEventListener("beforeunload", function () {
        cancelAnimationFrame(animationFrameId);
    });
});

/* =========================================================
   CIERRE DE MODALES CON TECLADO
   ========================================================= */
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        const galleryModal = document.getElementById("galleryModal");
        const serviceModal = document.getElementById("serviceModal");
        const contactModal = document.getElementById("contactModal");

        if (galleryModal && !galleryModal.classList.contains("hidden")) {
            closeGalleryModal();
            return;
        }

        if (serviceModal && !serviceModal.classList.contains("hidden")) {
            closeServiceModal();
            return;
        }

        if (contactModal && !contactModal.classList.contains("hidden")) {
            contactModal.classList.add("hidden");
            document.body.style.overflow = "";
        }
    }

    if (event.key === "ArrowRight") {
        const galleryModal = document.getElementById("galleryModal");
        if (galleryModal && !galleryModal.classList.contains("hidden")) {
            showNextGalleryImage();
        }
    }

    if (event.key === "ArrowLeft") {
        const galleryModal = document.getElementById("galleryModal");
        if (galleryModal && !galleryModal.classList.contains("hidden")) {
            showPrevGalleryImage();
        }
    }
});