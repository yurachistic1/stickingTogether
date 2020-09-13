function getNoOfItems(){
    var counter = document.getElementById('bsk-count')
    cart = JSON.parse(getCookie('cart'))
    total = 0
    for (var value of Object.values(cart)){
        total += value['quantity']
    }

    counter.innerHTML = total
}