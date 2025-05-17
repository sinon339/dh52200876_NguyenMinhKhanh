const params=new URLSearchParams(window.location.search);
const productId=Number(params.get('id'));

function renderProduct(product){
    const container=document.getElementsByClassName('main-content')[0];
    if(!product){
        container.innerHTML='<p> sản phẩm không tồn tại.</p>'
        return;
    }
    container.innerHTML=`
        <div class="slide">
                <div class="slide-img">
                    <img src="${product.img}" alt="">
                </div>
                <div class="slide-info">
                    <h1>${product.name}</h1>
                    <div class="slide-data">
                        <div class="price">
                            <div class="value">
                                ${product.price} VNĐ
                            </div>
                            <div class="title">
                                Giá tiêu chuẩn
                            </div>
                        </div>
                        <div class="capacity">
                            <div class="value">
                                ${product.capacity}
                            </div>
                            <div class="title">
                                Công suất
                            </div>
                        </div>
                        <div class="speed">
                            <div class="value">
                                ${product.speed}
                            </div>
                            <div class="title">
                                Tăng tốc từ 0 - 100 km/giờ
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="parameter">
                <h2>Thông số kĩ thuật</h2>
                <div class="list-wrapper">
                    <ul class="list-para">
                        <li>
                            <div class="left">
                                Công suất
                            </div>
                            <div class="right">
                                ${product.capacity}
                            </div>
                        </li>
                        <li>
                            <div class="left">
                                Mô men xoắn cực đại
                            </div>
                            <div class="right">
                                ${product.momen}
                            </div>
                        </li>
                        <li>
                            <div class="left">
                                Tăng tốc từ 0 - 100 km/giờ (0 - 62 dặm/giờ)
                            </div>
                            <div class="right">
                                ${product.speed}
                            </div>
                        </li>
                        <li>
                            <div class="left">
                                Tốc độ tối đa
                            </div>
                            <div class="right">
                                ${product.maxsp}
                            </div>
                        </li>
                        <li>
                            <div class="left">
                                Mức tiêu thụ kết hợp
                            </div>
                            <div class="right">
                                ${product.consume}
                            </div>
                        </li>
                        <li>
                            <div class="left">
                                Lượng khí thải CO2
                            </div>
                            <div class="right">
                                ${product.co2}
                            </div>
                        </li>
                        <li>
                            <div class="left">
                                Giá tiêu chuẩn
                            </div>
                            <div class="right">
                                ${product.price} VNĐ
                            </div>
                        </li>
                    </ul>
                    
                </div>
            </div>
            <div class="add-cart">
                <button class="btn-add-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-img="${product.img_self}">
                    <span>add to cart</span>
                </button>
            </div>
    `;
}
if(typeof products!==undefined){
    const product=products.find(p=>p.id===productId);
    renderProduct(product);
} 
