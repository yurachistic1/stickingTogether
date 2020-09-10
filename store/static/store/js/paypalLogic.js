paypal.Buttons({
    createOrder: function(data, actions) {

    const loc = JSON.parse(getCookie('storeLoc'))
    console.log(loc)
    let currency = 'GBP'
    if (loc == 'SG'){
        currency = 'SGD'
    } 
    console.log(currency)

    const tot = document.getElementById('totalID').innerHTML
    const ship = document.getElementById('shipID').innerHTML

    const stickers = document.getElementsByClassName('product')

    let arr = []
    for(let i = 0; i < stickers.length; i++){
        arr.push( {
                name: document.getElementById('name'.concat(i)).innerHTML,
                unit_amount: {
                    currency_code: currency,
                    value: document.getElementById('price'.concat(i)).value
                },
                quantity: document.getElementById('amount'.concat(i)).value
            })
    }

    // This function sets up the details of the transaction, including the amount and line item details.
    return actions.order.create({
        purchase_units: [{
        amount: {
            currency_code: currency,
            value: tot,
            breakdown: {
                item_total: {
                    currency_code: currency,
                    value: (tot-ship).toFixed(2)
                },
                shipping: {
                    currency_code: currency,
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

function getCookie(name) {
    // Split cookie string and get all individual name=value pairs in an array
    let cookieArr = document.cookie.split(";");

    // Loop through the array elements
    for(let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");

        /* Removing whitespace at the beginning of the cookie name
        and compare it with the given string */
        if(name == cookiePair[0].trim()) {
            // Decode the cookie value and return
            return decodeURIComponent(cookiePair[1]);
        }
    }

    // Return null if not found
    return null;
}