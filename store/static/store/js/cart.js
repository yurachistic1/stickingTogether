var updateBtns = document.getElementsByClassName('update-cart')
var updateCartQtBtns = document.getElementsByClassName('product-qt-spinner')

var syncCart = {}

for (i = 0; i < updateCartQtBtns.length; i++){
	var name = updateCartQtBtns[i].dataset.product
	var qt = document.getElementById('amount'.concat(updateCartQtBtns[i].dataset.id)).value
	syncCart[name] = {'quantity': parseInt(qt)}
	f(syncCart)
}

for (i = 0; i < updateBtns.length; i++) {
	updateBtns[i].addEventListener('click', handleEvent)
}

for (i = 0; i < updateCartQtBtns.length; i++){
	updateCartQtBtns[i].addEventListener('change', handleEvent)
}

recalculateTotal()

function handleEvent(){
	var productName = this.dataset.product
	var action = this.dataset.action
	var counterid = this.dataset.id
	var amount = document.getElementById('amount'.concat(counterid)).value
	var max = document.getElementById('amount'.concat(counterid)).max

	if (parseInt(amount) < 1){
		amount = 1
		document.getElementById('amount'.concat(counterid)).value = 1
	} else if (parseInt(amount) > parseInt(max)){
		amount = max
		document.getElementById('amount'.concat(counterid)).value = max
	}

	if (action == 'change'){
		var oldTotal = document.getElementById('total'.concat(counterid))
		var price = document.getElementById('price'.concat(counterid)).value
		oldTotal.innerHTML = (amount * price).toFixed(2)
		recalculateTotal()
	}
	
	addCookieItem(productName, action, amount, max)
}

function addCookieItem(productId, action, amount, max){
    
    cart = JSON.parse(getCookie('cart'))

	if (action == 'add'){
		if (cart[productId] == undefined){
		cart[productId] = {'quantity': parseInt(amount)}

		}else{
			if (cart[productId]['quantity'] + parseInt(amount) > parseInt(max)){
				cart[productId]['quantity'] = parseInt(max)
			} else {
				cart[productId]['quantity'] += parseInt(amount)
			}
		}

		f(cart)
	}

	if (action == 'change'){
		if (amount == '' || amount < 1){
			delete cart[productId];
			f(cart)
			location.reload()
		} else {
			cart[productId]['quantity'] = Math.min(parseInt(amount), parseInt(max))
			f(cart)
		}
	}

	if (action == 'delete'){
		delete cart[productId]
		f(cart)
		location.reload()
	}
	
}

function f(cart){
    document.cookie ='cart=' + JSON.stringify(cart) + ";path=/"
    getNoOfItems()
}

function recalculateTotal(){
	var subTotals = document.getElementsByClassName('sub-total')
	total = 0
	for (i = 0; i < subTotals.length; i++) {

		total += parseFloat(subTotals[i].innerHTML)
	}

	var a = document.getElementById('totalID')
	if(a != null){
		a.innerHTML = total.toFixed(2)
	}
}

function locationChange(){
	var loc = document.getElementById('storeLoc').value
	document.cookie='storeLoc=' + JSON.stringify(loc) + ";path=/"
	location.reload()
}