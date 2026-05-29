const carousel = document.getElementById('packsCarousel');
const openBtn = document.getElementById('open-pack');

openBtn.addEventListener('click', () => {
    const activeItem = carousel.querySelector('.carousel-item.active');
    const packType = activeItem.querySelector('.pack-card').dataset.pack;

    //console.log('Pack seleccionado:', packType);
    // Abrir modal y simualr las 5 cartas abiertas

    // después:
    // fetch('/api/open-pack/', { method: 'POST', body: ... })
    // necesito un json.players, queiro que tenga solo 10 jugadores como ejemplo, en este json voy a tener, id, nombre, rareza, img 


    // Mando un fetch a open pack
    // Activo el MODAL aca 
    // Llamo la funcion generteCard para cada uno de las cinco cartas
    // Las appendeo  en pack-cards muestro y ya esta
    

    fetch('/open_pack/', {
        method: 'POST',
        headers: {
          'X-CSRFToken': getCookie('csrftoken'),
          'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {

        // data va a dodlver data.result y peude ser succes o fail 
        if (data.result == 'success'){
            // Loopeo y apendo cada CARTA.
            data['cards'].forEach(card => {
                card = generteCard(card)
                document.querySelector('#pack-cards').appendChild(card);    
            });
            const modal = new bootstrap.Modal(
                document.getElementById('packModal')
            );
            
            modal.show();
            openBtn.disabled = true;        
        }else{
            alert("You alredy claimed a pack today! You can claim another pack in " + data.remainingHours)
        }

        

    })
    .catch(err => console.error(err));
});


