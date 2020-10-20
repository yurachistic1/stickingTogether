// plus minus qty buttons

var plusMinusBtns = document.getElementsByClassName('sticker-qt-button')

for (i = 0; i < plusMinusBtns.length; i++){
	plusMinusBtns[i].addEventListener('click', updateAmount)
}

function updateAmount(){
	var action1 = this.dataset.action1
	var counterid = this.dataset.id
	var current = document.getElementById('newamount' + counterid)

	if (action1 === 'plus'){
		if (parseInt(current.innerHTML) < parseInt(this.dataset.max)){
			current.innerHTML = parseInt(current.innerHTML) + 1
		}
	} else {
		if (parseInt(current.innerHTML) > parseInt(this.dataset.min)){
			current.innerHTML = parseInt(current.innerHTML) - 1
		}
	}

	if (this.dataset.action === 'change'){

		var oldTotal = document.getElementById('total'.concat(counterid))
		var price = document.getElementById('price'.concat(counterid)).value
		oldTotal.innerHTML = (current.innerHTML * price).toFixed(2)
		recalculateTotal()
		addCookieItem(this.dataset.product, this.dataset.action, current.innerHTML, this.dataset.max)
	}
}

// add to cart buttons and remove buttons

var updateBtns = document.getElementsByClassName('update-cart')

for (i = 0; i < updateBtns.length; i++) {
	updateBtns[i].addEventListener('click', handleEvent)
}

recalculateTotal()

var stickerAmounts = document.getElementsByClassName("sticker-qt-amount")

var syncCart = {}

for (i = 0; i < stickerAmounts.length; i++){
	var name = stickerAmounts[i].dataset.product
	var qt = stickerAmounts[i].innerHTML
	syncCart[name] = {'quantity': parseInt(qt)}
	f(syncCart)
}
 
function handleEvent(){
	var productName = this.dataset.product
	var action = this.dataset.action
	var counterid = this.dataset.id
	var amount = document.getElementById('newamount'.concat(counterid)).innerHTML
	var max = document.getElementById('newamount'.concat(counterid)).dataset.max

	if (parseInt(amount) < 1){
		amount = 1
		document.getElementById('newamount'.concat(counterid)).innerHTML = 1
	} else if (parseInt(amount) > parseInt(max)){
		amount = max
		document.getElementById('newamount'.concat(counterid)).innerHTML = max
	}

	if (action == 'add'){
		addConfirmation(this)
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
    document.cookie ='cart=' + JSON.stringify(cart) + ";max-age=3600;path=/"
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
	document.cookie='storeLoc=' + JSON.stringify(loc) + ";max-age=3600;path=/"
	location.reload()
}

function addConfirmation(btn){
	btn.innerHTML = "Items added!"
	setTimeout(function(){ btn.innerHTML = 'Add to basket' }, 1000);
}