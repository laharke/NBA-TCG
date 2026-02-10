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