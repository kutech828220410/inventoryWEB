// 藥檔管理功能
async function med_manage_get_data() {
    // var temp_med_data = {}
    // med_data["Data"].forEach(element => {
    //     temp_med_data[element.CODE] = element
    // });
    // console.log(med_data["Data"]);
    // console.log(temp_med_data);

    // 获取浏览器窗口的宽度
    let windowWidth = window.innerWidth;

    if (windowWidth < 1200) {
        alert("建議使用電腦畫面操作");
    };

    let gm_main_container = document.querySelector('.gm_main_container');
    container_display_init(gm_main_container);

    mm_header_init();
    mm_main_init();
    main_all_display_init();
};

function mm_header_init() {
    let gm_main_container = document.querySelector('.gm_main_container');
    let mm_header_container = document.createElement("div");
    mm_header_container.classList.add("mm_header_container");

    let mm_header_title = document.createElement("div");
    mm_header_title.classList.add("mm_header_title");
    mm_header_title.innerHTML = "藥品檔案管理";

    let mm_header_button_container = document.createElement("div");
    mm_header_button_container.classList.add("mm_header_button_container");

    let mm_header_add_med_btn = document.createElement("div");
    mm_header_add_med_btn.classList.add("mm_header_btn_style");
    mm_header_add_med_btn.classList.add("mm_header_add_med_btn");
    mm_header_add_med_btn.innerHTML = '新增';
    mm_header_button_container.appendChild(mm_header_add_med_btn);

    // let mm_header_modify_med_btn = document.createElement("div");
    // mm_header_modify_med_btn.classList.add("mm_header_btn_style");
    // mm_header_modify_med_btn.classList.add("mm_header_modify_med_btn");
    // mm_header_modify_med_btn.innerHTML = '修改';
    // mm_header_button_container.appendChild(mm_header_modify_med_btn);

    // let mm_header_del_med_btn = document.createElement("div");
    // mm_header_del_med_btn.classList.add("mm_header_btn_style");
    // mm_header_del_med_btn.classList.add("mm_header_del_med_btn");
    // mm_header_del_med_btn.innerHTML = '刪除';
    // mm_header_button_container.appendChild(mm_header_del_med_btn);

    // let mm_header_search_med_btn = document.createElement("div");
    // mm_header_search_med_btn.classList.add("mm_header_btn_style");
    // mm_header_search_med_btn.classList.add("mm_header_search_med_btn");
    // mm_header_search_med_btn.innerHTML = '搜尋';
    // mm_header_button_container.appendChild(mm_header_search_med_btn);

    mm_header_add_med_btn.addEventListener("click", () => {
        let title_med_item_div = document.querySelector(".title_med_item_div");
        title_med_item_div.innerHTML = "藥檔新增";

        let underline_new_modify_med_btn = document.querySelector(".underline_new_modify_med_btn");
        underline_new_modify_med_btn.innerHTML = "新增";

        show_med_item("");
    });

    // mm_header_search_med_btn.addEventListener("click", () => {
    //     show_med_search();
    // })

    mm_header_container.appendChild(mm_header_title);
    mm_header_container.appendChild(mm_header_button_container);

    gm_main_container.appendChild(mm_header_container);
};

function mm_main_init() {
    let gm_main_container = document.querySelector('.gm_main_container');

    let mm_main_container = document.createElement("div");
    mm_main_container.classList.add("mm_main_container");

    // 頁面搜尋功能容器
    let mm_display_container = document.createElement("div");
    mm_display_container.classList.add('mm_display_container');

    mm_display_container.innerHTML = `
        <select name="search_med_select_method" id="search_med_select_method">
            <option value="code">藥碼</option>
            <option value="name">藥名</option>
            <option value="cht_name">中文名</option>
            <option value="dianame">商品名</option>
            <option value="barcode">藥品條碼</option>
            <option value="drugkind">管制級別</option>
            <option value="h_price">高價藥品</option>
        </select>
        <div class="search_input_container">
            <input type="text" id="search_med_input" />
            <select name="search_drug_kind_select" id="search_drug_kind_select">
            <option value="N">N</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            </select>
        </div>
        <div class="search_med_btn">搜尋</div>
    `;

    // 展示搜尋結果容器
    let mm_all_display_container = document.createElement("div");
    mm_all_display_container.classList.add("mm_all_display_container");

    mm_main_container.appendChild(mm_display_container);
    mm_main_container.appendChild(mm_all_display_container);

    gm_main_container.appendChild(mm_main_container);

    // 搜尋列功能
    let search_med_select_method = document.querySelector("#search_med_select_method");
    search_med_select_method.addEventListener("change", (element) => {
        let search_med_input = document.querySelector("#search_med_input");
        let search_drug_kind_select = document.querySelector("#search_drug_kind_select");

        search_med_input.value = "";
        search_drug_kind_select.value = "N";
        // console.log(element.target.value);
        if (element.target.value == "drugkind") {
            search_med_input.style.display = "none";
            search_drug_kind_select.style.display = "block";
        } else {
            search_med_input.style.display = "block";
            search_drug_kind_select.style.display = "none";

            if (element.target.value == "h_price") {
                search_med_input.disabled = true;
            } else {
                search_med_input.disabled = false;
            }
        }
    });

    let search_med_btn = document.querySelector(".search_med_btn");
    search_med_btn.addEventListener("click", () => {
        let search_med_input = document.querySelector("#search_med_input");
        let search_drug_kind_select = document.querySelector("#search_drug_kind_select");
        let value = search_med_input.value;

        switch (search_med_select_method.value) {
            case "code":
                search_by_code(value);
                break;
            case "name":
                search_by_name(value);
                break;
            case "cht_name":
                search_by_ctname(value);
                break;
            case "dianame":
                search_by_dianame(value);
                break;
            case "barcode":
            
                break;
            case "drugkind":
                value = search_drug_kind_select.value;
                search_by_drugkind(value);
                break;
            case "h_price":
                search_by_h_price();
                break;
        }
    });
};

function main_all_display_init() {
    let mm_all_display_container = document.querySelector(".mm_all_display_container");
    mm_all_display_container.innerHTML = '';
}

function get_search_result_display(arr) {
    main_all_display_init();
    let mm_all_display_container = document.querySelector(".mm_all_display_container");

    arr.forEach((element) => {     
        let med_item_card_container = document.createElement("div");
        med_item_card_container.classList.add("med_item_card_container");
    
        med_item_card_container.innerHTML = `
            <div class="med_item_img_container">
                <img src="https://fakeimg.pl/300x200/200" />
            </div>
            <div class="med_item_content_container">
                <div class="med_item_name_content">
                    <span class="med_item_name_content_span">藥名：</span>
                    <span>${text_switch(element.NAME)}</span>
                </div>
                <div class="med_item_ctname_content">
                    <span class="med_item_ctname_content_span">中文名：</span>
                    <span>${text_switch(element.CHT_NAME)}</span>
                </div>
                <div class="med_item_code_content">
                    <span style="margin-right: 20px">藥碼：${element.CODE}</span>
                    <span>${skdiacode_switch(element.SKDIACODE)}</span>
                </div>
                <div class="med_item_btn_container">
                    <div class="med_item_modify_btn" id="med_modify_code_${element.CODE}">修改</div>
                    <div class="med_item_delete_btn" id="med_delete_code_${element.CODE}">刪除</div>
                </div>
            </div>
        `;

        mm_all_display_container.appendChild(med_item_card_container);

        let med_modify_btn = document.querySelector(`#med_modify_code_${element.CODE}`);
        let med_delete_btn = document.querySelector(`#med_delete_code_${element.CODE}`);

        med_modify_btn.addEventListener("click", (e) => {
            let str = e.target.id;
            let str_arr = str.split("_");
            let code = str_arr[str_arr.length - 1];
            
            show_med_item(code);
        });

    });
};

function text_switch(text) {
    if(text == "") {
        return "無";
    } else {
        return text;
    }
}
function skdiacode_switch(text) {
    if(text == "") {
        return "";
    } else {
        return `料號：${text}`;
    }
}

// 搜尋條件功能
async function search_by_code(value) {
    showLoadingPopup();
    let med_data = await get_medicine_cloud();

    if(value == "") {
        alert("請輸入資料");
    } else {
        let temp_arr = med_data["Data"].filter(e => e["CODE"].includes(value));
        if(temp_arr.length < 1) {
            temp_arr = med_data["Data"].filter(e => e["SKDIACODE"].includes(value));
            if(temp_arr.length < 1) {
                alert("查無此藥");
            } else {
                console.log(temp_arr);
                get_search_result_display(temp_arr);
            }
        } else {
            console.log(temp_arr);
            get_search_result_display(temp_arr);
        }
    }
    hideLoadingPopup();
};
async function search_by_name(value) {
    showLoadingPopup();
    let med_data = await get_medicine_cloud();

    if(value == "") {
        alert("請輸入資料");
    } else {
        let temp_arr = med_data["Data"].filter(e => e["NAME"].includes(value));
        if(temp_arr.length < 1) {
            alert("查無此藥");
        } else {
            console.log(temp_arr);
            get_search_result_display(temp_arr);
        }
    }
    hideLoadingPopup();
};

async function search_by_ctname(value) {
    showLoadingPopup();
    
    let med_data = await get_medicine_cloud();

    console.log(value);
    if(value == "") {
        alert("請輸入資料");
    } else {
        let temp_arr = med_data["Data"].filter(e => e["CHT_NAME"].includes(value));
        if(temp_arr.length < 1) {
            alert("查無此藥");
        } else {
            console.log(temp_arr);
            get_search_result_display(temp_arr);
        }
    }
    hideLoadingPopup();
};
async function search_by_dianame(value) {
    showLoadingPopup();
    let med_data = await get_medicine_cloud();

    console.log(value);
    if(value == "") {
        alert("請輸入資料");
    } else {
        let temp_arr = med_data["Data"].filter(e => e["DIANAME"].includes(value));
        if(temp_arr.length < 1) {
            alert("查無此藥");
        } else {
            console.log(temp_arr);
            get_search_result_display(temp_arr);
        }
    }
    hideLoadingPopup();
};
async function search_by_drugkind(value) {
    showLoadingPopup();
    let med_data = await get_medicine_cloud();

    console.log(value);
    if(value == "") {
        alert("請輸入資料");
    } else {
        let temp_arr = med_data["Data"].filter(e => e["DRUGKIND"].includes(value));
        if(temp_arr.length < 1) {
            alert("查無此藥");
        } else {
            console.log(temp_arr);
            get_search_result_display(temp_arr);
        }
    }
    hideLoadingPopup();
};
async function search_by_h_price() {
    showLoadingPopup();
    let med_data = await get_medicine_cloud();

    let temp_arr = med_data["Data"].filter(e => e["IS_H_COST"] != false);
    if(temp_arr.length < 1) {
        alert("查無此藥");
    } else {
        console.log(temp_arr);
        get_search_result_display(temp_arr);
    }
    hideLoadingPopup();
};