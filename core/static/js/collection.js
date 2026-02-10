

// Get full collection data
let data = document.getElementById("collection-data");
const collection = JSON.parse(data.textContent);
console.log(collection)

const grid = document.getElementById("collection-grid");
// Voy a loopear la Collection y agrego cada carta como una cosa msiteriosa uwu , pero me fijo si el usuario OWNS that card
// Esto con sql seria mas sencillo porque podria ahcerun  join y marcar como OWN true o false pero weno fue
collection.forEach(card => {
    if (card.own == true){
        // Creo la carta
        carta = generteCard(card)
    }else{
        // Creo la mystery card
        card['name'] = "";
        card['holo'] = false;
        card['image'] = "/static/imgs/players/questionmark.avif"
        card['team'] = "questionmark"
        carta = generteCard(card)
    }
    
    grid.appendChild(carta);
})






cards.forEach(card => {

    // La quantity no mei mporta

    /*
    for (let i = 0; i < card.quantity; i++) {

        inv = generteCard(card)
        grid.appendChild(inv);
    }*/
});
