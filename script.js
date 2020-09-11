//Get the UI elements
let cartBtn = document.querySelector('#cartBtn');
let cartProQuan = document.querySelector('#index');
let cart = document.querySelector('.product_cart');
let cartProList = document.querySelector('#pro_list');
let product_wrap = document.querySelector('.product_wrap');
let price_report = document.querySelector('.price_report');

//Event Listeners
cartBtn.addEventListener('click', toggleCart);
product_wrap.addEventListener('click', addToCart);
cartProList.addEventListener('click', removeFromCart);

//Toggles cart
function toggleCart(e){
    cart.classList.toggle('show');
    if(cartProQuan){
        cartProQuan.classList.remove('show');
        cartProQuan.textContent = '';
    }
    priceSummery();
    showEmptyMsg();
    e.preventDefault();
}

//Adds products to cart
function addToCart(e){
    let checkTarget = e.target.hasAttribute('href');
    if(checkTarget){
        let proTitile = e.target.previousElementSibling.previousElementSibling.textContent.trim()+' ';
        let check = e.target.classList.contains('added');

        if(!check){
            let span = document.createElement('span');
            let li = document.createElement('li');
            let link = document.createElement('a');
            let price = document.createElement('p');

            price.className = 'proPrice';
            price.innerHTML = e.target.previousElementSibling.textContent;

            link.setAttribute('href', '#');
            link.innerHTML = 'x';
            span.appendChild(document.createTextNode(proTitile));
            li.appendChild(span);
            li.appendChild(link);
            li.appendChild(price);
            cartProList.appendChild(li);

            //New product status
            let checkCart = cart.classList.contains('show');
            if(!checkCart){
                if(cartProQuan.textContent == ''){
                    cartProQuan.innerHTML = 1;
                }else{
                    let quantity = parseInt(cartProQuan.textContent);
                    quantity+=1;
                    cartProQuan.innerHTML = quantity;
                }
                cartProQuan.className = 'show';
            }

            let checkEmpty = document.querySelector('.empty');
            if(checkEmpty) checkEmpty.remove();

            e.target.classList.add('added');
            e.target.textContent = 'Added to cart';
            e.target.parentElement.style.background = '#6c5ce7';
            showMessage(proTitile, 'added into cart');
            priceSummery();
        }
    }

    e.preventDefault();
}

//removes element from cart
function removeFromCart(e){
    if(e.target.hasAttribute('href')){
        if(confirm('Are you sure?')){
            let title= e.target.previousElementSibling.textContent.trim();

            let productTitles = product_wrap.querySelectorAll('h3');

            productTitles.forEach((value) => {
                if(value.textContent == title){
                    value.parentElement.removeAttribute('style');
                    value.nextElementSibling.nextElementSibling.classList.remove('added');
                    value.nextElementSibling.nextElementSibling.textContent = 'Add to cart';
                    showMessage(title, 'removed from cart');
                }
            });

            e.target.parentElement.remove();
            if(this.childElementCount<1){
                showEmptyMsg();
            }
        }
        priceSummery();
    }
}

//Shows message in cart if the cart is empty
function showEmptyMsg(){
    let listOfCartPro = cartProList.childElementCount;
    let h2 = document.createElement('h2');
    if(listOfCartPro<1){
        h2.appendChild(document.createTextNode('Cart is empty!'));
        h2.className = 'empty';
        cartProList.appendChild(h2);
    }
}

//Alert function
function showMessage(productTitle, msg){
    let previousMsg = document.querySelector('.msg');
    if(previousMsg) previousMsg.remove();
    let h2 = document.createElement('h2');
    let body = document.querySelector('body');
    let header = document.querySelector('header');
    h2.className = 'msg';
    let message = document.createTextNode(`${productTitle} ${msg}`);
    h2.appendChild(message);
        body.insertBefore(h2, header);
    setTimeout(() => {
        h2.style.top = '20px';
    }, 100);

    setTimeout(() => {
        h2.removeAttribute('style');
    }, 3000);
    setTimeout(() => {
        h2.remove();
    }, 4000);
}

//Shows the total price
function priceSummery(){
    let prices = document.querySelectorAll('.proPrice');
    let total = 0;

    prices.forEach(value=>{
        let price = getThePrice(value);
        total += price;
    });

    if(total>0){
        price_report.innerHTML = `Total: <b>${total}tk</b>`;
    }else{
        price_report.innerHTML = '';
    }
}

// Gets price from string values
function getThePrice(value){
    let getPrice = value.textContent;
    getPrice = getPrice.slice(7);
    getPrice = getPrice.slice(0, -2);
    let price = parseInt(getPrice);
    return price;
}