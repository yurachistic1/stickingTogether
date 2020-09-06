var updateBtns = document.getElementsByClassName('update-cart')

for (i = 0; i < updateBtns.length; i++) {
	updateBtns[i].addEventListener('click', function(){
		var productName = this.dataset.product
        var action = this.dataset.action
        var counterid = this.dataset.id
        var amount = document.getElementById('add'.concat(counterid)).value
        console.log(amount)
        
		console.log(
            'productName:', productName, 
            'Action:', action, 
            'Amount:', amount
        )
        
        addCookieItem(productName, action, amount)
    })
}

function addCookieItem(productId, action, amount){
    console.log('User is not authenticated')
    
    cart = JSON.parse(getCookie('cart'))

	if (action == 'add'){
		if (cart[productId] == undefined){
		cart[productId] = {'quantity': parseInt(amount)}

		}else{
			cart[productId]['quantity'] += parseInt(amount)
		}
	}

	if (action == 'remove'){
		cart[productId]['quantity'] -= 1

		if (cart[productId]['quantity'] <= 0){
			console.log('Item should be deleted')
			delete cart[productId];
		}
	}
	console.log('CART:', cart)
    document.cookie ='cart=' + JSON.stringify(cart) + ";domain=;path=/"
    getNoOfItems()
}