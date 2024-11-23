let popup_result_confirm_div;

async function get_popup_result_confirm() {
    popup_result_confirm_div = new Basic_popup_Div('popup_result_confirm_div','popup_result_confirm_div','','');
    popup_result_confirm_div._popup_div.style.border = '10px solid white';

    let header = get_prc_header();
    let main = get_prc_main();
    let footer = get_prc_footer();

    popup_result_confirm_div.AddControl(header);
    popup_result_confirm_div.AddControl(main);
    popup_result_confirm_div.AddControl(footer);

    return popup_result_confirm_div;
};
function get_prc_header() {
    let prc_header_container = document.createElement("div");
    prc_header_container.classList.add("prc_header_container");

    let prc_h_title = document.createElement("div");
    prc_h_title.classList.add("prc_h_title");
    prc_h_title.innerText = "辨識結果";

    let prc_h_close_btn = document.createElement("img");
    prc_h_close_btn.classList.add("prc_h_close_btn");
    prc_h_close_btn.src = "../image/close.png";
    prc_h_close_btn.addEventListener("click", () => {
        popup_result_confirm_div_close();
    });

    prc_header_container.appendChild(prc_h_title);
    // prc_header_container.appendChild(prc_h_close_btn);

    return prc_header_container;
};
function get_prc_main() {
    let prc_main_container = document.createElement("div");
    prc_main_container.classList.add("prc_main_container");

    let prc_content_container = set_prc_content_container();

    prc_main_container.appendChild(prc_content_container)

    return prc_main_container;
};
function get_prc_footer() {
    let prc_footer_container = document.createElement("div");
    prc_footer_container.classList.add("prc_footer_container");

    let prc_double_confirm_btn = document.createElement("div");
    prc_double_confirm_btn.classList.add("prc_double_confirm_btn");
    prc_double_confirm_btn.classList.add("btn");
    prc_double_confirm_btn.innerHTML = "確認";
    prc_double_confirm_btn.addEventListener("click", async () => {
        if(confirm("確認辨識結果並送出")) {
            console.log("這裡塞二次確認api");

            let prc_code_content = document.querySelector("#prc_code_content");
            let prc_name_content = document.querySelector("#prc_name_content");
            let prc_cht_name_content = document.querySelector("#prc_cht_name_content");
            let prc_deadtime_input = document.querySelector("#prc_deadtime_input");
            let prc_qty_input = document.querySelector("#prc_qty_input");
            let prc_batch_num_input = document.querySelector("#prc_batch_num_input");
            let prc_list_num_input = document.querySelector("#prc_list_num_input");

            let post_data = {
                Data: [
                    {
                        GUID: prc_double_confirm_btn.getAttribute("GUID"),
                        batch_num: prc_batch_num_input.value,
                        po_num: prc_list_num_input.value,
                        qty: prc_qty_input.value,
                        expirydate: prc_deadtime_input.value,
                        code: prc_code_content.innerHTML,
                        name: prc_name_content.innerHTML,
                        cht_name: prc_cht_name_content.innerHTML
                    }
                ]  
            };

            console.log(post_data);

            let res_data = await update_textvision(post_data);
            if(res_data.Code == 200) {
                alert("寫入成功");
                popup_result_confirm_div_close();
            }
            return;
        }

        return;
    });

    let prc_cancel_btn = document.createElement("div");
    prc_cancel_btn.classList.add("btn");
    prc_cancel_btn.classList.add("prc_cancel_btn");
    prc_cancel_btn.innerHTML = "取消";
    prc_cancel_btn.addEventListener("click", async () => {
        if(confirm("取消辨識結果")) {
            console.log("這裡放取消辨識的API，並刪除DB資料");

            let post_data = {
                ValueAry: [prc_cancel_btn.getAttribute("GUID")]
            };

            console.log(post_data);

            let res_data = await delete_textVision(post_data);
            console.log(res_data);
            if(res_data.Code == 200) {
                alert("已取消辨識結果");
            }
            popup_result_confirm_div_close();
        }
        return;
    })

    prc_footer_container.appendChild(prc_cancel_btn);
    prc_footer_container.appendChild(prc_double_confirm_btn);

    return prc_footer_container;
};
function popup_result_confirm_div_close() {
    popup_result_confirm_div.Set_Visible(false);
}
function popup_result_confirm_div_open() {
    popup_result_confirm_div.Set_Visible(true);
}
function set_prc_content_container() {
    let prc_content_container =document.createElement("div");
    prc_content_container.classList.add("prc_content_container");

    let prc_code_div = document.createElement("div");
    prc_code_div.classList.add("prc_content_div");
    
    let prc_code_label = document.createElement("div");
    prc_code_label.classList.add("prc_label");
    prc_code_label.innerHTML = "藥碼";

    let prc_code_content = document.createElement("div");
    prc_code_content.classList.add("prc_content");
    prc_code_content.id = "prc_code_content";
    // prc_code_content.innerHTML = "ODEF1";

    let prc_code_revise = document.createElement("div");
    prc_code_revise.classList.add("prc_code_revise");
    prc_code_revise.classList.add("btn");
    prc_code_revise.innerHTML = "新增藥碼比對";

    prc_code_div.appendChild(prc_code_label);
    prc_code_div.appendChild(prc_code_content);
    // prc_code_div.appendChild(prc_code_revise);

    let prc_name_div = document.createElement("div");
    prc_name_div.classList.add("prc_content_div");

    let prc_name_label = document.createElement("div");
    prc_name_label.classList.add("prc_label");
    prc_name_label.innerHTML = "藥名";

    let prc_name_content = document.createElement("div");
    prc_name_content.classList.add("prc_content");
    prc_name_content.id = "prc_name_content";
    // prc_name_content.innerHTML = "Odefsey 25mg 30 FC.tab./bt1";

    prc_name_div.appendChild(prc_name_label);
    prc_name_div.appendChild(prc_name_content);

    let prc_cht_name_div = document.createElement("div");
    prc_cht_name_div.classList.add("prc_content_div");

    let prc_cht_name_label = document.createElement("div");
    prc_cht_name_label.classList.add("prc_label");
    prc_cht_name_label.innerHTML = "中文名";

    let prc_cht_name_content = document.createElement("div");
    prc_cht_name_content.classList.add("prc_content");
    prc_cht_name_content.id = "prc_cht_name_content";
    // prc_cht_name_content.innerHTML = "安以斯膜衣錠 30粒/瓶";

    prc_cht_name_div.appendChild(prc_cht_name_label);
    prc_cht_name_div.appendChild(prc_cht_name_content);

    let prc_deadtime_div = document.createElement("div");
    prc_deadtime_div.classList.add("prc_content_div");
    
    let prc_deadtime_label = document.createElement("label");
    prc_deadtime_label.classList.add("prc_label");
    prc_deadtime_label.innerHTML = "效期";
    prc_deadtime_label.setAttribute("for", "prc_deadtime_input");

    let prc_deadtime_input = document.createElement("input");
    prc_deadtime_input.id = "prc_deadtime_input";
    prc_deadtime_input.name = "prc_deadtime_input";
    prc_deadtime_input.addEventListener("change", () => {
        if(prc_deadtime_input.classList.contains("border_red") && prc_deadtime_input.value != "") {
            prc_deadtime_input.classList.remove("border_red");
        }
        if(prc_deadtime_input.value == "") {
            prc_deadtime_input.classList.add("border_red");
        }
    });
    // prc_deadtime_input.value = "2026.02.28";

    prc_deadtime_div.appendChild(prc_deadtime_label);
    prc_deadtime_div.appendChild(prc_deadtime_input);

    let prc_qty_div = document.createElement("div");
    prc_qty_div.classList.add("prc_content_div");
    
    let prc_qty_label = document.createElement("label");
    prc_qty_label.classList.add("prc_label");
    prc_qty_label.innerHTML = "數量";
    prc_qty_label.setAttribute("for", "prc_qty_input");

    let prc_qty_input = document.createElement("input");
    prc_qty_input.id = "prc_qty_input";
    prc_qty_input.name = "prc_qty_input";
    prc_qty_input.addEventListener("change", () => {
        if(prc_qty_input.classList.contains("border_red") && prc_qty_input.value != "") {
            prc_qty_input.classList.remove("border_red");
        }
        if(prc_qty_input.value == "") {
            prc_qty_input.classList.add("border_red");
        }
    });
    // prc_qty_input.value = "3";

    prc_qty_div.appendChild(prc_qty_label);
    prc_qty_div.appendChild(prc_qty_input);
    
    let prc_batch_num_div = document.createElement("div");
    prc_batch_num_div.classList.add("prc_content_div");
    
    let prc_batch_num_label = document.createElement("label");
    prc_batch_num_label.classList.add("prc_label");
    prc_batch_num_label.innerHTML = "批號";
    prc_batch_num_label.setAttribute("for", "prc_batch_num_input");

    let prc_batch_num_input = document.createElement("input");
    prc_batch_num_input.id = "prc_batch_num_input";
    prc_batch_num_input.name = "prc_batch_num_input";
    prc_batch_num_input.addEventListener("change", () => {
        if(prc_batch_num_input.classList.contains("border_red") && prc_batch_num_input.value != "") {
            prc_batch_num_input.classList.remove("border_red");
        }
        if(prc_batch_num_input.value == "") {
            prc_batch_num_input.classList.add("border_red");
        }
    });
    // prc_batch_num_input.value = "7314801P.B";

    prc_batch_num_div.appendChild(prc_batch_num_label);
    prc_batch_num_div.appendChild(prc_batch_num_input);

    let prc_list_num_div = document.createElement("div");
    prc_list_num_div.classList.add("prc_content_div");
    
    let prc_list_num_label = document.createElement("label");
    prc_list_num_label.classList.add("prc_label");
    prc_list_num_label.innerHTML = "單號";
    prc_list_num_label.setAttribute("for", "prc_list_num_input");

    let prc_list_num_input = document.createElement("input");
    prc_list_num_input.id = "prc_list_num_input";
    prc_list_num_input.name = "prc_list_num_input";
    prc_list_num_input.addEventListener("change", () => {
        if(prc_list_num_input.classList.contains("border_red") && prc_list_num_input.value != "") {
            prc_list_num_input.classList.remove("border_red");
        }
        if(prc_list_num_input.value == "") {
            prc_list_num_input.classList.add("border_red");
        }
    });
    // prc_list_num_input.value = "1130606002-39";

    prc_list_num_div.appendChild(prc_list_num_label);
    prc_list_num_div.appendChild(prc_list_num_input);

    prc_content_container.appendChild(prc_code_div);
    prc_content_container.appendChild(prc_name_div);
    prc_content_container.appendChild(prc_cht_name_div);
    prc_content_container.appendChild(prc_deadtime_div);
    prc_content_container.appendChild(prc_qty_div);
    prc_content_container.appendChild(prc_batch_num_div);
    prc_content_container.appendChild(prc_list_num_div);

    return prc_content_container;
}
