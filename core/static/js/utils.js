function getCookie(name) {
    let cookieValue = null;
  
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
  
      for (let cookie of cookies) {
        cookie = cookie.trim();
  
        if (cookie.startsWith(name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
  
    return cookieValue;
}

function generteCard(cardData){
  card = document.createElement('nba-card');
  card.setAttribute('number', cardData['id']);
  card.setAttribute('name', cardData['name']);
  card.setAttribute('rarity', cardData['rarity']);
  card.setAttribute('image', cardData['image']);

  card.setAttribute('team-logo', "/static/imgs/logos/" + cardData['team'] + ".png");

  card.setAttribute('border1', cardData['border1']);
  card.setAttribute('border2', cardData['border2']);
  
  if(cardData['holo'] == true){
      card.setAttribute('holo', 'holo');      
  }
  return card;
}

//Mostrar una alerta - Va a recibir un argumento si queres mostrar error, success o info y un mensaje text para mostrar en pantalla.
function showAlert(tipo, mensaje){
  if (tipo == 'info'){
    tipo = '#infoAlert'
  } else if( tipo == 'success'){
    tipo = '#successAlert'
  } else if( tipo == 'error'){
    tipo = '#dangerAlert'
  }

  //Muestro el div
  $(tipo).show().delay(4500).fadeOut()
  //Cambio el text
  $(tipo).find('span').text(mensaje)
}

// BORRAR ALERTAS DE DJANO SINO QUEDNA FIJA
setTimeout(() => {
    document.querySelectorAll('.alert').forEach(el => {
        el.style.opacity = "0";
        setTimeout(() => el.remove(), 500);
    });
}, 3000);
