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
        popup_code_compare_div_close();
    });

    pcc_header_container.appendChild(pcc_h_title);
    pcc_header_container.appendChild(pcc_h_close_btn);

    return pcc_header_container;
};
function get_pcc_main() {
    let pcc_main_container = document.createElement("div");
    pcc_main_container.classList.add("pcc_main_container");

    let pcc_code_div = document.createElement("div");
    pcc_code_div.classList.add("pcc_content_div");
    
    let pcc_code_label = document.createElement("label");
    pcc_code_label.classList.add("pcc_label");
    pcc_code_label.innerHTML = "藥碼";
    pcc_code_label.setAttribute("for", "pcc_code_input");

    let pcc_code_input = document.createElement("input");
    pcc_code_input.id = "pcc_code_input";
    pcc_code_input.name = "pcc_code_input";

    pcc_code_div.appendChild(pcc_code_label);
    pcc_code_div.appendChild(pcc_code_input);

    let pcc_name_div = document.createElement("div");
    pcc_name_div.classList.add("pcc_content_div");

    let pcc_name_label = document.createElement("div");
    pcc_name_label.classList.add("pcc_label");
    pcc_name_label.innerHTML = "藥名";

    let pcc_name_content = document.createElement("div");
    pcc_name_content.classList.add("pcc_content");
    pcc_name_content.id = "pcc_name_content";

    pcc_name_div.appendChild(pcc_name_label);
    pcc_name_div.appendChild(pcc_name_content);

    let pcc_cht_name_div = document.createElement("div");
    pcc_cht_name_div.classList.add("pcc_content_div");

    let pcc_cht_name_label = document.createElement("div");
    pcc_cht_name_label.classList.add("pcc_label");
    pcc_cht_name_label.innerHTML = "中文名";

    let pcc_cht_name_content = document.createElement("div");
    pcc_cht_name_content.classList.add("pcc_content");
    pcc_cht_name_content.id = "pcc_cht_name_content";
    // pcc_cht_name_content.innerHTML = "安以斯膜衣錠 30粒/瓶";

    pcc_cht_name_div.appendChild(pcc_cht_name_label);
    pcc_cht_name_div.appendChild(pcc_cht_name_content);

    pcc_main_container.appendChild(pcc_code_div);
    pcc_main_container.appendChild(pcc_name_div);
    pcc_main_container.appendChild(pcc_cht_name_div);
    
    let pcc_med_search_block = document.createElement("div");
    pcc_med_search_block.classList.add("pcc_med_search_block");

    let pcc_med_search_title = document.createElement("div");
    pcc_med_search_title.classList.add("pcc_med_search_title");
    pcc_med_search_title.innerHTML = "藥碼搜尋";

    let pccms_content = document.createElement("div");
    pccms_content.classList.add("pccms_content");

    let pccms_select = document.createElement("select");
    pccms_select.classList.add("pccms_select");
    pccms_select.id = "pccms_select";
    pccms_select.innerHTML = `
        <option value="name">藥名</option>
        <option value="cht_name">中文名</option>
    `;

    let pccms_input = document.createElement("input");
    pccms_input.classList.add("pccms_input");
    pccms_input.id = "pccms_input";
    pccms_input.addEventListener("input", (e) => {
        pccms_result_func(e);
    });
    // 當 input blur 時隱藏清單
    pccms_input.addEventListener('blur', function() {
        let pccms_input_result = document.querySelector(".pccms_input_result");
        // 延遲關閉清單以確保 mousedown 事件能被觸發
        setTimeout(() => {
            pccms_input_result.style.display = 'none';
        }, 100);
    });
    pccms_input.addEventListener("focus", () => {
        let pccms_input_result = document.querySelector(".pccms_input_result");

        pccms_input_result.style.display = "block";
    });

    pccms_content.appendChild(pccms_select);
    pccms_content.appendChild(pccms_input);

    let pccms_input_result = document.createElement("div");
    pccms_input_result.classList.add("pccms_input_result");

    pcc_med_search_block.appendChild(pcc_med_search_title);
    pcc_med_search_block.appendChild(pccms_content);
    pcc_med_search_block.appendChild(pccms_input_result);
    
    pcc_main_container.appendChild(pcc_med_search_block);

    return pcc_main_container;
};
function get_pcc_footer() {
    let pcc_footer_container = document.createElement("div");
    pcc_footer_container.classList.add("pcc_footer_container");

    let pcc_code_compare_confirm_btn = document.createElement("div");
    pcc_code_compare_confirm_btn.classList.add("pcc_code_compare_confirm_btn");
    pcc_code_compare_confirm_btn.classList.add("btn");
    pcc_code_compare_confirm_btn.innerHTML = "輸入";
    pcc_code_compare_confirm_btn.addEventListener("click", async (e) => {
        let pcc_code_input = document.querySelector("#pcc_code_input");
        let pcc_name_content = document.querySelector("#pcc_name_content");
        let pcc_cht_name_content = document.querySelector("#pcc_cht_name_content");

        if(pcc_code_input.value == "") {
            alert("請輸入藥碼");
            return;
        } else if(temp_guid == "") {
            console.log(temp_guid);
            alert("未辨識出請購單");
            return;
        }

        let post_data = {
            Data: [
                {
                    Master_GUID: temp_guid,
                    recog_cht_name: pcc_cht_name_content.innerHTML,
                    recog_name: pcc_name_content.innerHTML,
                    code: pcc_code_input.value
                }
            ]
        };
        let res_data = await update_med_code_srch(post_data);
        console.log(res_data);
        if(res_data.Code == 200) {
            let med_code = document.querySelector("#code");
            let med_name = document.querySelector("#name");
            let med_cht_name = document.querySelector("#cht_name");

            med_code.value = pcc_code_input.value;
            med_name.value = pcc_name_content.innerHTML;
            med_cht_name.value = pcc_cht_name_content.innerHTML;

            popup_code_compare_div_close();
            console.log(res_data);
        }
    });

    pcc_footer_container.appendChild(pcc_code_compare_confirm_btn);

    return pcc_footer_container;
};
function popup_code_compare_div_close() {
    popup_code_compare_div.Set_Visible(false);
    init_ppcms_content();
}
function popup_code_compare_div_open() {
    popup_code_compare_div.Set_Visible(true);
}
function pccms_result_func(e) {
    let pcc_code_input = document.querySelector("#pcc_code_input");
    let pccms_select = document.querySelector("#pccms_select");
    let pccms_input_result = document.querySelector(".pccms_input_result");
    let pcc_name_content = document.querySelector("#pcc_name_content");
    let pcc_cht_name_content = document.querySelector("#pcc_cht_name_content");

    pccms_input_result.innerHTML = "";

    let input_text = e.target.value;
    input_text = input_text.toUpperCase();

    let result_data = [];

    if(input_text == "") return;

    switch (pccms_select.value) {
        case "name":
            result_data = medicine_page.filter(item => 
                item.NAME.toUpperCase().includes(input_text)
            );
            break;
    
        case "cht_name":
            result_data = medicine_page.filter(item => 
                item.CHT_NAME.toUpperCase().includes(input_text)
            );
            break;
    
        default:
            break;
    }

    if(result_data.length == 0) {
        pccms_input_result.innerHTML = "查無藥品";
    } else {
        result_data.forEach(element => {
            let result_card = document.createElement("div");
            result_card.classList.add("result_card");

            let temp_text = highlightText(element.NAME, e.target.value);
            let temp_cht_text = highlightText(element.CHT_NAME, e.target.value);

            switch (pccms_select.value) {
                case "name":
                    result_card.innerHTML = temp_text;
                    break;
                    
                    case "cht_name":
                    result_card.innerHTML = temp_cht_text;
                    break;
            
                default:
                    break;
            }
            result_card.addEventListener("click", () => {
                pcc_code_input.value = element.CODE;
                pcc_name_content.innerHTML = element.NAME;
                pcc_cht_name_content.innerHTML = element.CHT_NAME;
                switch (pccms_select.value) {
                    case "name":
                        e.target.value = element.NAME;
                        break;
                        
                        case "cht_name":
                        e.target.value = element.CHT_NAME;
                        break;
                
                    default:
                        break;
                }
                pccms_input_result.style.display = "none";
            })

            pccms_input_result.appendChild(result_card);
        });
    }
}
// 高亮輸入的文字部分
function highlightText(text, query) {
    const regExp = new RegExp(query, 'gi');
    return text.replace(regExp, match => `<span class="highlight_red">${match}</span>`);
}

function init_ppcms_content() {
    let pcc_code_content = document.querySelector("#pcc_code_content");
    let pcc_name_content = document.querySelector("#pcc_name_content");
    let pcc_cht_name_content = document.querySelector("#pcc_cht_name_content");
    let pcc_code_input = document.querySelector("#pcc_code_input");

    pcc_code_content.value = "";
    pcc_code_content.innerHTML = "";
    pcc_code_content.innerHTML = "";
    pcc_code_input.value = "";
}
