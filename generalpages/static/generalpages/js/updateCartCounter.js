function getNoOfItems(){
    var counter = document.getElementById('bsk-count')
    cart = JSON.parse(getCookie('cart'))
    total = 0
    console.log(Object.keys(cart))
    for (const value of Object.values(cart)){
        total += value['quantity']
    }

    counter.innerHTML = total
}

getNoOfItems()