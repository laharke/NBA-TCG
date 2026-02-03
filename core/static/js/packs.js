const carousel = document.getElementById('packsCarousel');
const openBtn = document.getElementById('open-pack');

openBtn.addEventListener('click', () => {
const activeItem = carousel.querySelector('.carousel-item.active');
const packType = activeItem.querySelector('.pack-card').dataset.pack;

    console.log('Pack seleccionado:', packType);
    // Abrir modal y simualr las 5 cartas abiertas

    // después:
    // fetch('/api/open-pack/', { method: 'POST', body: ... })
});
