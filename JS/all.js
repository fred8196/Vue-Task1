let productData = [];
const productTitle = document.querySelector('#title');
const productOriginPrice = document.querySelector('#origin_price');
const productPrice = document.querySelector('#price');
const addProduct = document.querySelector('#addProduct')
const addProductForm = document.querySelector('.addProductForm');

//新增產品
addProduct.addEventListener('click', () => {
    const productId = Math.floor(Date.now());
    if (productTitle.value.trim() == '' || productOriginPrice.value == '' || productPrice.value == '') {
        alert('請填寫完整產品資料');
        return;
    }
    productData.push({
        title: productTitle.value,
        originPrice: parseInt(productOriginPrice.value) || 0,
        price: parseInt(productPrice.value) || 0,
        id: productId,
        status: false
    });
    console.log(productData);
    renderProductList();
    addProductForm.reset();
})

//渲染染品列表
const productList = document.querySelector('#productList');
const productCount = document.querySelector('#productCount');
function renderProductList() {
    let str = '';
    productData.forEach((item, index) => {
        str += `<tr>
        <td>${item.title}</td>
        <td width="120">
            $ ${item.originPrice}
        </td>
        <td width="120">
            $ ${item.price}
        </td>
        <td width="100">
            <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" id=${item.id} ${item.status
                ? 'checked' : ''} data-action="complete" data-id="${index}">
                <label class="form-check-label" for=${item.id}>${item.status ? '啟用' : '未啟用'}</label>
            </div>
        </td>
        <td width="120">
            <button type="button" class="btn btn-sm btn-danger move" data-action="remove"
                data-id="${index}"> 刪除 </button>
        </td>
    </tr>`
    })
    productList.innerHTML = str;
    productCount.textContent = productData.length;
}

//刪除產品.變更狀態
productList.addEventListener('click', (e) => {
    productIndex = e.target.dataset.id;
    if (e.target.dataset.action == 'remove') {
        productData.splice(productIndex, 1);
        renderProductList();
    } else if (e.target.dataset.action == 'complete') {
        productData[productIndex].status = !productData[productIndex].status;
        renderProductList();
    }
})

//刪除全部產品
const clearAll = document.querySelector('#clearAll');
clearAll.addEventListener('click', () => {
    productData.length = 0;
    renderProductList();
})

