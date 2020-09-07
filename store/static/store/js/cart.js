let updateBtns = document.getElementsByClassName('update-cart')
let updateCartQtBtns = document.getElementsByClassName('product-qt-spinner')

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

	if (action == 'change'){
		let oldTotal = document.getElementById('total'.concat(counterid))
		let price = document.getElementById('price'.concat(counterid)).value
		oldTotal.innerHTML = (amount * price).toFixed(2)
		recalculateTotal()
	}
	
	addCookieItem(productName, action, amount)
}

function addCookieItem(productId, action, amount){
    
    cart = JSON.parse(getCookie('cart'))

	if (action == 'add'){
		if (cart[productId] == undefined){
		cart[productId] = {'quantity': parseInt(amount)}

		}else{
			cart[productId]['quantity'] += parseInt(amount)
		}

		f(cart)
	}

	if (action == 'change'){
		if (amount == '' || amount < 1){
			delete cart[productId];
			f(cart)
			location.reload()
		} else {
			cart[productId]['quantity'] = parseInt(amount)
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