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

let maybeCart = JSON.parse(getCookie('cart'))

function createCart(cart) {

    if (cart == undefined){
        cart = {}
        document.cookie ='cart=' + JSON.stringify(cart) + ";domain=;path=/"
    }

    return cart;
}


createCart(maybeCart)