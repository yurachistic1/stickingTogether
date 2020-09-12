let updateBtns = document.getElementsByClassName('update-cart')
let updateCartQtBtns = document.getElementsByClassName('product-qt-spinner')

let syncCart = {}

for (i = 0; i < updateCartQtBtns.length; i++){
	let name = updateCartQtBtns[i].dataset.product
	let qt = document.getElementById('amount'.concat(updateCartQtBtns[i].dataset.id)).value
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
	let productName = this.dataset.product
	let action = this.dataset.action
	let counterid = this.dataset.id
	let amount = document.getElementById('amount'.concat(counterid)).value
	let max = document.getElementById('amount'.concat(counterid)).max

	if (parseInt(amount) < 1){
		amount = 1
		document.getElementById('amount'.concat(counterid)).value = 1
	} else if (parseInt(amount) > parseInt(max)){
		amount = max
		document.getElementById('amount'.concat(counterid)).value = max
	}

	if (action == 'change'){
		let oldTotal = document.getElementById('total'.concat(counterid))
		let price = document.getElementById('price'.concat(counterid)).value
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
    document.cookie ='cart=' + JSON.stringify(cart) + ";domain=;path=/"
    getNoOfItems()
}

function recalculateTotal(){
	let subTotals = document.getElementsByClassName('sub-total')
	total = 0
	for (i = 0; i < subTotals.length; i++) {

		total += parseFloat(subTotals[i].innerHTML)
	}

	let a = document.getElementById('totalID')
	if(a != null){
		a.innerHTML = total.toFixed(2)
	}
}

function locationChange(){
	let loc = document.getElementById('storeLoc').value
	document.cookie='storeLoc=' + JSON.stringify(loc) + ";domain=;path=/"
	location.reload()
}