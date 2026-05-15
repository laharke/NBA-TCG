function trade_card(element){
    alert("you gonna trade card are u sure")
    let td = $(element).parent().parent().find("td")

    // TENGO QUE MEJORAR LSO NOBMRES Y TAMBIEN TENGO QUE MANDAR EL ID DEL USUARIO LGOGEADO
    let tradeId = td[0].dataset.trade;
    let userTradeId = td[0].dataset.user;
    let offeredCardId = td[0].dataset.offered;
    let wantedCardId = td[0].dataset.wanted;

    fetch('/make_trade/', {
        method: 'POST',
        headers: {
          'X-CSRFToken': getCookie('csrftoken'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'tradeId': tradeId,
            'userTradeId': userTradeId,
            'offeredCardId': offeredCardId,
            'wantedCardId': wantedCardId
        })
    })
    .then(response => response.json())
    .then(data => {
        if(data.result == 'success'){
            //showAlert('success', 'Card traded correctly! Check your collection o7');
            window.location.reload();

        }else{
            showAlert('error', data.error);
        }

  
        // IF data.result == success muestrou n mesnaej que todo salio bien y refresheo la pagina o borro esa rOW creo que prefeiro refreshar la pagina whatver.
        // else muestro un mensaje de > nope salio tod mal uwu y que error es 

    })
    .catch(err => console.error(err));
      
}

function openTradeModal(){
    new bootstrap.Modal(document.getElementById('tradeModal')).show();
    // Aca tendria que mandar un GET request para popular el modal con las CARTAS aunque podria directametne popularlo en el 
    fetch('/add_trade/', {
        method: 'GET',
        headers: {
          'X-CSRFToken': getCookie('csrftoken'),
          'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        //console.log(data)
        data.cards
        //data.cards.id data.cards.card_id data.cards.id.name data.cards.id data.cards.id.team
        data.cards.forEach(card => {
            let option = document.createElement('option');
            option.value = card.card_id
            option.textContent = card.name + " (" + card.team.split(/(?=[A-Z])/).join(" ") + ")";
            $("#wantedCardSelect").append(option)
        });


        data.owned.forEach(card => {
            let option = document.createElement('option');
            console.log(card)
            option.value = card.card_id
            option.textContent = card.name + " (" + card.team.split(/(?=[A-Z])/).join(" ") + ") (Owned: " + card.quantity +")";
            $("#offeredCardSelect").append(option)
        });
        




   

    })
    .catch(err => console.error(err));
}

function add_trade(){
    
    // Hay que agarrar los dos id de cartas
    wantedCardId = $("#wantedCardSelect").val();
    offeredCardId = $("#offeredCardSelect").val();

    fetch('/add_trade/', {
        method: 'POST',
        headers: {
          'X-CSRFToken': getCookie('csrftoken'),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'wantedCardId': wantedCardId,
            'offeredCardId': offeredCardId,
        })
    })
    .then(response => response.json())
    .then(data => {
        if(data.result == 'success'){
            window.location.reload();
        }else{
            showAlert('error', data.error);
        }   
    })
    .catch(err => console.error(err));
}


function delete_trade(element){
    
    if (confirm("you gonna delete de trade are you sure")){
        let td = $(element).parent().parent().find("td")
        // Busco el trade ID 
        let tradeId = td[0].dataset.trade;

        fetch('/delete_trade/', {
            method: 'POST',
            headers: {
              'X-CSRFToken': getCookie('csrftoken'),
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'tradeId': tradeId,
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.result == 'success'){
                window.location.reload();
            }else{
                showAlert('error', data.error);
            }
    
        })
        .catch(err => console.error(err));
    
    }
}