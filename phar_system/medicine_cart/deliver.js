// 交車作業生成
let deliver_cart_data;

function display_deliver_func() {
    // 清除現有的定時器
    // if (setUpdateInterval) {
    //     clearInterval(setUpdateInterval);
    // }
    func_display_init();

    let function_display_container = document.querySelector(".function_display_container");

    let d_carts_list_contaienr = document.createElement("div");
    d_carts_list_contaienr.classList.add("d_carts_list_contaienr");

    deliver_cart_data.forEach(element => {
        let d_cart_container = document.createElement("div");
        d_cart_container.classList.add("d_cart_container");
        d_cart_container.setAttribute("GUID", element.GUID);
        d_cart_container.innerHTML = element.hnursta;

        if(element.hand_status == "已交車") {
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
    let temp_nurnum = this.innerHTML;
    if(confirm(`${current_pharmacy.phar} ${temp_nurnum} 是否交車？`)) {
        let result = await med_cart_handover(current_pharmacy.phar, temp_nurnum);
        result = result.Data;
        if(result.hand_status == "") {
            alert(result.note);
        } else {
            deliver_cart_data = await get_all_med_cart_by_phar(current_pharmacy.phar);
            deliver_cart_data = deliver_cart_data.Data;
            display_deliver_func();
            reset_cart_list_container();
        }
        return;
    }
    return;
}