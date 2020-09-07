paypal.Buttons({
    createOrder: function(data, actions) {
    const tot = document.getElementById('totalID').innerHTML
    const ship = document.getElementById('shipID').innerHTML

    const stickers = document.getElementsByClassName('product')

    let arr = []
    for(let i = 0; i < stickers.length; i++){
        arr.push( {
                name: document.getElementById('name'.concat(i)).innerHTML,
                unit_amount: {
                    currency_code: "GBP",
                    value: document.getElementById('price'.concat(i)).value
                },
                quantity: document.getElementById('amount'.concat(i)).value
            })
    }

    console.log(arr)

    // This function sets up the details of the transaction, including the amount and line item details.
    return actions.order.create({
        purchase_units: [{
        amount: {
            currency_code: 'GBP',
            value: tot,
            breakdown: {
                item_total: {
                    currency_code: "GBP",
                    value: tot-ship
                },
                shipping: {
                    currency_code: "GBP",
                    value: ship
                },
            }

        },
        items:arr
        }]
    });
    },
    onApprove: function(data, actions) {
    // This function captures the funds from the transaction.
    return actions.order.capture().then(function(details) {
        // This function shows a transaction success message to your buyer.
        alert('Transaction completed by ' + details.payer.name.given_name);
    });
    }
}).render('#paypal-button-container');