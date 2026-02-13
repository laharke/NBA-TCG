console.log("trade")

function trade_card(element){
    alert("you gonna trade card are u sure")
    let td = $(element).parent().parent().find("td")

    // TENGO QUE MEJORAR LSO NOBMRES Y TAMBIEN TENGO QUE MANDAR EL ID DEL USUARIO LGOGEADO
    let tradeId = td[0].dataset.trade;
    let userTrade = td[0].dataset.user;
    let offeredId = td[0].dataset.offered;
    let wantedId = td[0].dataset.wanted;

    console.log(tradeId, userTrade, offeredId, wantedId)
    fetch('/make_trade/', {
        method: 'POST',
        headers: {
          'X-CSRFToken': getCookie('csrftoken'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'tradeId': tradeId,
            'userTrade': userTrade,
            'offeredId': offeredId,
            'wantedId': wantedId
        })
    })
    .then(response => response.json())
    .then(data => {
    // Loopeo y apendo cada CARTA.
    data['cards'].forEach(card => {
        card = generteCard(card)
        document.querySelector('#pack-cards').appendChild(card);    
    });

    })
    .catch(err => console.error(err));
      
}
