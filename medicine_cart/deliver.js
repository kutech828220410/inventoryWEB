// 交車作業生成
let deliver_cart_data = [
    {
        uid: '33222',
        ctname: 'C066',
        deliver_status: false
    },
    {
        uid: '33131',
        ctname: 'C229',
        deliver_status: false
    },
    {
        uid: '32241',
        ctname: 'C220',
        deliver_status: true
    },
    {
        uid: '322121',
        ctname: 'C099',
        deliver_status: false
    },
    {
        uid: '322442',
        ctname: 'C120',
        deliver_status: true
    },
];

function display_deliver_func() {
    func_display_init();

    let function_display_container = document.querySelector(".function_display_container");

    let d_carts_list_contaienr = document.createElement("div");
    d_carts_list_contaienr.classList.add("d_carts_list_contaienr");

    deliver_cart_data.forEach(element => {
        let d_cart_container = document.createElement("div");
        d_cart_container.classList.add("d_cart_container");
        d_cart_container.setAttribute("UID", element.uid);
        d_cart_container.innerHTML = element.ctname;

        if(element.deliver_status) {
            d_cart_container.classList.add("d_cart_done");
        } else {
            d_cart_container.addEventListener("click", d_cart_check);
        }

        d_carts_list_contaienr.appendChild(d_cart_container);
    });

    let d_carts_notice_contaienr = document.createElement("div");
    d_carts_notice_contaienr.classList.add("d_carts_notice_contaienr");
    d_carts_notice_contaienr.innerHTML = `
        <div class="d_carts_notice_color"></div>
        <div class="d_carts_notice_content">交車完成</div>
    `;
 
    function_display_container.appendChild(d_carts_list_contaienr);
    function_display_container.appendChild(d_carts_notice_contaienr);
}

async function d_cart_check() {
    console.log("檢測藥車DC/NEW是否完全完成");
}