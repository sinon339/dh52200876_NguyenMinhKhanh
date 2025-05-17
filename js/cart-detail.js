cart=getCartLocalStorage();
const items=document.getElementsByClassName('items')[0];
const amount=document.getElementsByClassName('amount')[0];
const gia=document.getElementsByClassName('gia')[0];
const tongtien=document.getElementsByClassName('tong-tien')[0];
if(cart.length==0){
    items.innerHTML=`<span>Empty!</span>`;
}
else{
    showItem(cart);
}
function showItem(cart){
    items.innerHTML=``;
    tongtien.textContent=`0 VNĐ`;
    let tien=0;
    let soluong=0;
    cart.forEach(item => {
        const itemTotal=item.gia*item.quantity;
        tien+=itemTotal;
        soluong+=item.quantity;
        const giaItem=formatPrice(itemTotal);
        const sp=document.createElement('div');   
        sp.className='item';
        sp.innerHTML=`
            <div class="item-left">
                <img src="${item.anh}" alt="">
            </div>
            <div class="item-mid">
                <a href="#" class="ten">${item.ten}</a>
                <span class="gia">${giaItem} VNĐ</span>
                <div class="process">
                    <button class="btn-minus" data-id="${item.ma}">
                        <img src="./icons/remove_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="">
                    </button>
                    <span class="quantity"> ${item.quantity}</span>
                    <button class="btn-them" data-id="${item.ma}">
                        <img src="./icons/add_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg" alt="">
                    </button>
                </div>
            </div>
            <div class="item-right">
                <button class="btn-xoa" data-id="${item.ma}">
                    <img src="./icons/delete-white.svg" alt="">
                </button>
            </div>
        `;
        items.appendChild(sp);
        
    })      
    amount.textContent= soluong.toString();
    tongtien.textContent= formatPrice(tien)+ ' VNĐ'
    document.querySelectorAll('.btn-minus').forEach(button=>{
        button.addEventListener('click', function(){
            const masp=button.getAttribute('data-id');
            const sp=cart.find(item=>item.ma===masp);
            if(sp && sp.quantity>1){
                sp.quantity-=1;
                saveCartLocalStorage(cart);
                updateCart();
                showItem(cart);
            }
        })
    })
    console.log(cart);
    document.querySelectorAll('.btn-them').forEach(button=>
        button.addEventListener('click', function(){
            const masp=button.getAttribute('data-id');
            const sp=cart.find(item=>item.ma===masp);
            sp.quantity+=1;
            saveCartLocalStorage(cart);
            updateCart();
            showItem(cart);
            
        })
    )
    document.querySelectorAll('.btn-xoa').forEach(button=>{
        button.addEventListener('click', function(){
            const masp=button.getAttribute('data-id');
            cart=cart.filter(item=>item.ma!=masp)
            saveCartLocalStorage(cart);
            updateCart();
            showItem(cart);  
        })
    })
}