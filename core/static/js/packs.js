const carousel = document.getElementById('packsCarousel');
const openBtn = document.getElementById('open-pack');

openBtn.addEventListener('click', () => {
const activeItem = carousel.querySelector('.carousel-item.active');
const packType = activeItem.querySelector('.pack-card').dataset.pack;

    console.log('Pack seleccionado:', packType);
    // Abrir modal y simualr las 5 cartas abiertas

    // después:
    // fetch('/api/open-pack/', { method: 'POST', body: ... })
    // necesito un json.players, queiro que tenga solo 10 jugadores como ejemplo, en este json voy a tener, id, nombre, rareza, img 

    const card = document.createElement('nba-card');

    card.setAttribute('number', '34');
    card.setAttribute('name', 'Giannis Antetokounmpo');
    card.setAttribute('rarity', 'legendary');
    card.setAttribute('image', '/static/imgs/cards/giannis.png');
    card.setAttribute('team-logo', '/static/imgs/teams/bucks.png');

    //document.querySelector('#cards-container').appendChild(card);

    
});
