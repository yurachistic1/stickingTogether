paypal.Buttons({
    createOrder: function(data, actions) {

    var loc = JSON.parse(getCookie('storeLoc'))
    var currency = 'GBP'
    if (loc == 'SG'){
        currency = 'SGD'
    } 

    var tot = document.getElementById('totalID').innerHTML
    var ship = document.getElementById('shipID').innerHTML
    var fee = document.getElementById('feeID').innerHTML

    var stickers = document.getElementsByClassName('product')

    var arr = []
    for(var i = 0; i < stickers.length; i++){
        arr.push( {
                name: document.getElementById('name'.concat(i)).innerHTML,
                unit_amount: {
                    currency_code: currency,
                    value: document.getElementById('price'.concat(i)).value
                },
                quantity: parseInt(document.getElementById('newamount'.concat(i)).innerHTML)
            })
    }

    console.log(arr)

    // This function sets up the details of the transaction, including the amount and line item details.
    return actions.order.create({
        purchase_units: [{
        amount: {
            currency_code: currency,
            value: tot,
            breakdown: {
                item_total: {
                    currency_code: currency,
                    value: (tot-ship-fee).toFixed(2)
                },
                shipping: {
                    currency_code: currency,
                    value: ship
                },
                handling: {
                    currency_code: currency,
                    value: fee
                }
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
        document.getElementById('successform').submit();
    });
    }
}).render('#paypal-button-container');

function getCookie(name) {
    // Split cookie string and get all individual name=value pairs in an array
    var cookieArr = document.cookie.split(";");

    // Loop through the array elements
    for(var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");

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