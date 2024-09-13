let popup_code_compare_div;

async function get_popup_code_compare() {
    popup_code_compare_div = new Basic_popup_Div('popup_code_compare_div','popup_code_compare_div','','');
    popup_code_compare_div._popup_div.style.border = '10px solid white';

    let header = get_pcc_header();
    let main = get_pcc_main();
    let footer = get_pcc_footer();

    popup_code_compare_div.AddControl(header);
    popup_code_compare_div.AddControl(main);
    popup_code_compare_div.AddControl(footer);

    return popup_code_compare_div;
};
function get_pcc_header() {
    let pcc_header_container = document.createElement("div");
    pcc_header_container.classList.add("pcc_header_container");

    let pcc_h_title = document.createElement("div");
    pcc_h_title.classList.add("pcc_h_title");
    pcc_h_title.innerText = "藥碼比對輸入";

    let pcc_h_close_btn = document.createElement("img");
    pcc_h_close_btn.classList.add("pcc_h_close_btn");
    pcc_h_close_btn.src = "../image/close.png";
    pcc_h_close_btn.addEventListener("click", async () => {
        console.log(pcc_h_close_btn.getAttribute("GUID"));
        if(pcc_h_close_btn.getAttribute("GUID") == null) {
            popup_result_confirm_div_close();
            popup_code_compare_div_close();
            return;
        }

        if(confirm("是否取消辨識結果")) {
            console.log("這裡放取消辨識的API，並刪除DB資料");
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
                popup_code_compare_div_close();
            }
            return;
        }
        
    });

    pcc_header_container.appendChild(pcc_h_title);
    pcc_header_container.appendChild(pcc_h_close_btn);

    return pcc_header_container;
};
function get_pcc_main() {
    let pcc_main_container = document.createElement("div");
    pcc_main_container.classList.add("pcc_main_container");

    let pcc_code_div = document.createElement("div");
    pcc_code_div.classList.add("prc_content_div");
    
    let pcc_code_label = document.createElement("label");
    pcc_code_label.classList.add("prc_label");
    pcc_code_label.innerHTML = "藥碼";
    pcc_code_label.setAttribute("for", "pcc_code_input");

    let pcc_code_input = document.createElement("input");
    pcc_code_input.id = "pcc_code_input";
    pcc_code_input.name = "pcc_code_input";

    pcc_code_div.appendChild(pcc_code_label);
    pcc_code_div.appendChild(pcc_code_input);

    let pcc_name_div = document.createElement("div");
    pcc_name_div.classList.add("prc_content_div");

    let pcc_name_label = document.createElement("div");
    pcc_name_label.classList.add("prc_label");
    pcc_name_label.innerHTML = "藥名";

    let pcc_name_content = document.createElement("div");
    pcc_name_content.classList.add("prc_content");
    pcc_name_content.id = "pcc_name_content";

    pcc_name_div.appendChild(pcc_name_label);
    pcc_name_div.appendChild(pcc_name_content);

    let pcc_cht_name_div = document.createElement("div");
    pcc_cht_name_div.classList.add("prc_content_div");

    let pcc_cht_name_label = document.createElement("div");
    pcc_cht_name_label.classList.add("prc_label");
    pcc_cht_name_label.innerHTML = "中文名";

    let pcc_cht_name_content = document.createElement("div");
    pcc_cht_name_content.classList.add("prc_content");
    pcc_cht_name_content.id = "pcc_cht_name_content";
    // pcc_cht_name_content.innerHTML = "安以斯膜衣錠 30粒/瓶";

    pcc_cht_name_div.appendChild(pcc_cht_name_label);
    pcc_cht_name_div.appendChild(pcc_cht_name_content);

    pcc_main_container.appendChild(pcc_code_div);
    pcc_main_container.appendChild(pcc_name_div);
    pcc_main_container.appendChild(pcc_cht_name_div);

    return pcc_main_container;
};
function get_pcc_footer() {
    let pcc_footer_container = document.createElement("div");
    pcc_footer_container.classList.add("pcc_footer_container");

    let pcc_code_compare_confirm_btn = document.createElement("div");
    pcc_code_compare_confirm_btn.classList.add("pcc_code_compare_confirm_btn");
    pcc_code_compare_confirm_btn.classList.add("btn");
    pcc_code_compare_confirm_btn.innerHTML = "輸入";
    pcc_code_compare_confirm_btn.addEventListener("click", async () => {
        let pcc_code_input = document.querySelector("#pcc_code_input");
        let pcc_name_content = document.querySelector("#pcc_name_content");

        if(pcc_code_input.value == "") {
            alert("請輸入藥碼");
            return;
        }

        let post_data = {
            ValueAry: [
                pcc_name_content.innerHTML, pcc_code_input.value
            ]
        };
        let res_data = await update_med_code_srch(post_data);
        if(res_data.Code == 200) {
            let prc_code_content = document.querySelector("#prc_code_content");
            prc_code_content.innerHTML = pcc_code_input.value;
            popup_code_compare_div_close();
            console.log(res_data);
        }
    });

    pcc_footer_container.appendChild(pcc_code_compare_confirm_btn);

    return pcc_footer_container;
};
function popup_code_compare_div_close() {
    popup_code_compare_div.Set_Visible(false);
}
function popup_code_compare_div_open() {
    popup_code_compare_div.Set_Visible(true);
}
