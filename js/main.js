document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburger");
    const menu = document.querySelector(".menu");
    hamburger.addEventListener("click", () => {
      menu.classList.toggle("active");
    });
  });
//sticky bar
const menu = document.querySelector('.menu-wrapper');
const offset = menu.offsetTop;
window.addEventListener('scroll', () => {
  if (window.pageYOffset > offset) {
    menu.classList.add('sticky');
  } 
  else {
    menu.classList.remove('sticky');
  }
});
//Chuc nang gio hang
const cartItems=document.getElementsByClassName('cart-item')[0];
const cartSummary=document.getElementsByClassName('cart-summary')[0];
const cartTotal=document.getElementsByClassName('cart-total')[0];
const cartDropDown=document.getElementsByClassName('cart-dropdown')[0];
const btnAddCarts=document.querySelectorAll('.btn-add-cart');
let cart=getCartLocalStorage();
if(cart.length==0)
  cartItems.innerHTML=`Empty!`;
btnAddCarts.forEach(button=>{
  button.addEventListener('click', function(){
    const ma= button.getAttribute('data-id');
    const ten=button.getAttribute('data-name');
    const gia=parseInt((button.getAttribute(('data-price')).replace(/\./g, "")));
    const anh=button.getAttribute('data-img');
    const menu = document.querySelector(".menu");
    menu.classList.toggle('active');
    //let cart=JSON.parse(localStorage.getItem("cart")) || [];
    const item_exsisting=cart.find(item =>item.ma===ma)
    if(item_exsisting)
      item_exsisting.quantity +=1;
    else{ 
      cart.push({
      ma,
      ten,
      gia,
      anh,
      quantity: 1
      });
    };
    saveCartLocalStorage(cart);
    updateCart();
    cartDropDown.style.display='block';
  })
})
 
function updateCart(){
  cart=getCartLocalStorage();
  if(cart.length==0){
    cartItems.innerHTML=`<span>Empty!</span>`;
    cartTotal.textContent="0 VNĐ";
  } 
  else{
    cartItems.innerHTML=``;
    let total=0;
    cart.forEach(item=>{
      const itemTotal = item.gia*item.quantity;
      total += itemTotal;
      const cartItem = document.createElement('div');
      cartItem.className = 'item';
      cartItem.innerHTML = `
        <div class="item-img">
            <img src="${item.anh}" alt="">
        </div>
        <div class="item-mid">
            <span>${item.ten}</span>
            <div class="item-mid-process">
                <button class="btn-remove" data-id="${item.ma}">
                    <img src="./icons/remove_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="">
                </button>                                 
                <span>${item.quantity}</span>
                <button class="btn-add" data-id="${item.ma}">
                    <img src="./icons/add_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="">
                </button>
                
            </div>
        </div>
        <div class="item-delete">
            <button class="btn-delete" data-id="${item.ma}">
                <img src="./icons/delete_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="">
            </button>
        </div>
      `;
      cartItems.appendChild(cartItem);
      cartTotal.textContent = formatPrice(total)+'VNĐ';

      document.querySelectorAll('.btn-remove').forEach(button=>{
        button.addEventListener('click', function(){
          const masp = button.getAttribute('data-id');
          const sp = cart.find(item => item.ma === masp)
          if(sp && sp.quantity > 1){
            sp.quantity -= 1;
            saveCartLocalStorage(cart);
            updateCart();
            showItem(cart);
          }
        })
      })
      document.querySelectorAll('.btn-add').forEach(button=>{
        button.addEventListener('click', function(){
          const masp=button.getAttribute('data-id');
          const sp=cart.find(item=>item.ma===masp);
          sp.quantity+=1;
          saveCartLocalStorage(cart);
          updateCart();
          showItem(cart);
        })
      })
      document.querySelectorAll('.btn-delete').forEach(button=>{
        button.addEventListener('click', function(){
          const masp=button.getAttribute('data-id');
          console.log(masp);
          cart=cart.filter(item=>item.ma!==masp);
          saveCartLocalStorage(cart);
          updateCart();
          showItem(cart);
        })
      })
    })
  }
}
function formatPrice(price){
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
function getCartLocalStorage(){
  const cartString= localStorage.getItem("cart");
  if(!cartString || cartString===undefined)
    return [];
  try{
    return JSON.parse(cartString);
  }catch(error)
  {
    console.error("Du lieu khong hop le", error);
    return [];
  }
}
function saveCartLocalStorage(cart){
  localStorage.setItem("cart",JSON.stringify(cart));
}
function renderCart(){
  var cart=getCartLocalStorage();
  updateCart();
}
window.addEventListener('DOMContentLoaded', function () {
  window.onload = updateCart;
  document.getElementsByClassName('cart')[0].addEventListener('click', function(){
        cartDropDown.style.display='block';
        
      })
  document.querySelectorAll('.close-cart').forEach(button=>{
        button.addEventListener('click', function(){
          cartDropDown.style.display = 'none';
        })
      })
});
//Form Validation
function formValidation(){
  const ten=document.getElementById('nameInput').value.trim();
  const sdt=document.getElementById('sdtInput').value.trim();
  const email=document.getElementById('emailInput').value.trim();
  const tieude=document.getElementById('tieuDeInput').value.trim();
  const loinhan=document.getElementById('loiNhanInput').value.trim();
  var isValid=true;
  
  if(ten===''){
    document.getElementById('nameError').textContent='*Hãy nhập tên của bạn';
    isValid=false;
  }
  else{
    document.getElementById('nameError').textContent='';
  }
  if(sdt===''){
    document.getElementById('sdtError').textContent='*Hãy nhập số điện thoại của bạn';
    isValid=false;
  }
  else{
    document.getElementById('sdtError').textContent='';
  }
  if(email===''){
    document.getElementById('emailError').textContent='*Hãy nhập email của bạn';
    isValid=false;
  }
  else{
    document.getElementById('emailError').textContent='';
  }
  if(tieude===''){
    document.getElementById('tieuDeError').textContent='*Hãy nhập tiêu đề';
    isValid=false;
  }
  else{
    document.getElementById('tieuDeError').textContent='';
  }
  if(loinhan===''){
    document.getElementById('loiNhanError').textContent='*Hãy nhập lời nhắn';
    isValid=false;
  }
  else{
    document.getElementById('loiNhanError').textContent='';
  }
  if(!validateEmail(email)){
    isValid=false;
    document.getElementById('emailError').textContent='*Hãy nhập một email hợp lệ dạng example@gmail.com';
  }
  else{
    document.getElementById('emailError').textContent='';
  }
  if(isValid){
    alert('Gửi lời nhắn thành công!');
  }
}
function validateEmail(email) {
  var emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
}
function checkEmail(){
  var isValid=true;
  const email=document.getElementById('emailInput').value.trim();
  if(email===''){
    document.getElementById('emailError').textContent='*Hãy nhập email của bạn';
    isValid=false;
  }
  else{
    document.getElementById('emailError').textContent='';
  }
  if(!validateEmail(email)){
    isValid=false;
    document.getElementById('emailError').textContent='*Hãy nhập một email hợp lệ dạng example@gmail.com';
  }
  if(isValid){
    alert('Đăng kí thành công!');
  }
}
//Carousel banner
var slideIndex=1;
showSlide(slideIndex);
setInterval(() => {
  plusSlide(1);
}, 2000);
function currentSlide(n){
  showSlide(slideIndex=n);
}
function plusSlide(n){
  showSlide(slideIndex+=n);
}
function showSlide(n){
  let i;
  const slides=document.getElementsByClassName('slide');
  const dots=document.getElementsByClassName('dot');
  if(n>slides.length)
    slideIndex=1;
  if(n<1)
    slideIndex=slides.length;
  for(i=0;i<slides.length;i++){
    slides[i].style.display='none';
  }
  for(i=0;i<dots.length;i++){
    dots[i].className=dots[i].className.replace(' active', '');
  }
  slides[slideIndex-1].style.display='block';
  dots[slideIndex-1].className+=' active';
}






  