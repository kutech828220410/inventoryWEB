let display_data;
let current_pagination = 1;
let pagination_num = 8;
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
            <option value="all">全部藥品</option>
            <option value="code">藥碼</option>
            <option value="name">藥名</option>
            <option value="cht_name">中文名</option>
            <option value="dianame">商品名</option>
            <option value="barcode">藥品條碼</option>
            <option value="drugkind">管制級別</option>
            <option value="h_price">高價藥品</option>
            <option value="med_group">藥品群組</option>
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
        <div class="btn search_med_btn">搜尋</div>
        <div class="med_type_checkbox_container">
            <label for="west_med">
                <input type="checkbox" name="west_med" id="west_med" checked>西藥
            </label>
            <label for="cht_med">
                <input type="checkbox" name="cht_med" id="cht_med" checked>中藥
            </label>
        </div>
    `;

    // 展示搜尋結果容器
    let mm_all_display_container = document.createElement("div");
    mm_all_display_container.classList.add("mm_all_display_container");

    let pagination_container = document.createElement("div");
    pagination_container.classList.add("pagination_container");

    mm_main_container.appendChild(mm_display_container);
    mm_main_container.appendChild(mm_all_display_container);
    mm_main_container.appendChild(pagination_container);

    gm_main_container.appendChild(mm_main_container);

    // 搜尋列功能
    let search_med_select_method = document.querySelector("#search_med_select_method");
    search_med_select_method.addEventListener("change", async (element) => {
        let search_med_input = document.querySelector("#search_med_input");
        let search_drug_kind_select = document.querySelector("#search_drug_kind_select");

        search_med_input.value = "";
        // search_drug_kind_select.value = "N";
        // console.log(element.target.value);
        if (element.target.value == "drugkind") {
            search_med_input.style.display = "none";
            search_drug_kind_select.style.display = "block";
            search_drug_kind_select.innerHTML = "";
            search_drug_kind_select.innerHTML = `
                <option value="N">N</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            `;
        } else if(element.target.value == "med_group") {            
            search_med_input.style.display = "none";
            search_drug_kind_select.style.display = "block";
            let temp_med_group_data = await get_med_group_data_api();
            search_drug_kind_select.innerHTML = "";
            temp_med_group_data["Data"].forEach(element => {
                search_drug_kind_select.innerHTML += `
                    <option value="${element.GUID}">${element.NAME}</option>
                `;
            });
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
        search_med_result_func();
    });
};
function main_all_display_init() {
    let mm_all_display_container = document.querySelector(".mm_all_display_container");
    mm_all_display_container.innerHTML = '';
}
function search_med_result_func() {
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
        case "med_group":
            search_by_med_group();
            break;
        case "all":
            search_all_med();
            break;
    }
}
async function get_search_result_display() {
    main_all_display_init();
    let mm_all_display_container = document.querySelector(".mm_all_display_container");

    if(display_data.length != 0) {
        showLoadingPopup();
        for (let index = pagination_num * (current_pagination - 1); index < pagination_num * current_pagination; index++) {
            let element = display_data[index];
            console.log(element);
            if(element == undefined) continue;
            let med_item_card_container = document.createElement("div");
            med_item_card_container.classList.add("med_item_card_container");
    
            console.log(element.CODE);
    
            let temp_pic_data = await get_med_pic_by_code(element.CODE);
            let med_pic_data = temp_pic_data.Data;
            let temp_src;
    
            // console.log(temp_pic_data);
            if(temp_pic_data.Code != -200) {
                temp_src = med_pic_data.pic_base64;
            } else {
                temp_src = "../image/no_pic.png";
            }
        
            med_item_card_container.innerHTML = `
                <div class="med_item_img_container">
                    <img src=${temp_src} />
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
                    </div>
                </div>
            `;
                        // <div class="med_item_delete_btn" id="med_delete_code_${element.CODE}">刪除</div>
    
            mm_all_display_container.appendChild(med_item_card_container);
    
            let med_modify_btn = document.querySelector(`#med_modify_code_${element.CODE}`);
            // let med_delete_btn = document.querySelector(`#med_delete_code_${element.CODE}`);
    
            med_modify_btn.addEventListener("click", (e) => {
                let str = e.target.id;
                let str_arr = str.split("_");
                let code = str_arr[str_arr.length - 1];
                
                show_med_item(code);
            });
            set_pagination_init();
        };
        hideLoadingPopup();
    };
    // await display_data.forEach(async (element, index) => {
    //     let med_item_card_container = document.createElement("div");
    //     med_item_card_container.classList.add("med_item_card_container");

    //     console.log(element.CODE);

    //     let temp_pic_data = await get_med_pic_by_code(element.CODE);
    //     let med_pic_data = temp_pic_data.Data;
    //     let temp_src;

    //     // console.log(temp_pic_data);
    //     if(temp_pic_data.Code != -200) {
    //         temp_src = med_pic_data.pic_base64;
    //     } else {
    //         temp_src = "../image/no_pic.png";
    //     }
    
    //     med_item_card_container.innerHTML = `
    //         <div class="med_item_img_container">
    //             <img src=${temp_src} />
    //         </div>
    //         <div class="med_item_content_container">
    //             <div class="med_item_name_content">
    //                 <span class="med_item_name_content_span">藥名：</span>
    //                 <span>${text_switch(element.NAME)}</span>
    //             </div>
    //             <div class="med_item_ctname_content">
    //                 <span class="med_item_ctname_content_span">中文名：</span>
    //                 <span>${text_switch(element.CHT_NAME)}</span>
    //             </div>
    //             <div class="med_item_code_content">
    //                 <span style="margin-right: 20px">藥碼：${element.CODE}</span>
    //                 <span>${skdiacode_switch(element.SKDIACODE)}</span>
    //             </div>
    //             <div class="med_item_btn_container">
    //                 <div class="med_item_modify_btn" id="med_modify_code_${element.CODE}">修改</div>
    //             </div>
    //         </div>
    //     `;
    //                 // <div class="med_item_delete_btn" id="med_delete_code_${element.CODE}">刪除</div>

    //     mm_all_display_container.appendChild(med_item_card_container);

    //     let med_modify_btn = document.querySelector(`#med_modify_code_${element.CODE}`);
    //     let med_delete_btn = document.querySelector(`#med_delete_code_${element.CODE}`);

    //     med_modify_btn.addEventListener("click", (e) => {
    //         let str = e.target.id;
    //         let str_arr = str.split("_");
    //         let code = str_arr[str_arr.length - 1];
            
    //         show_med_item(code);
    //     });
    // });
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

    console.log(med_data["Data"]);

    if(value == "") {
        alert("請輸入資料");
    } else {
        let temp_arr = med_data["Data"].filter(e => e["CODE"].includes(value));
        if(temp_arr.length < 1) {
            temp_arr = med_data["Data"].filter(e => e["SKDIACODE"].includes(value));
            if(temp_arr.length < 1) {
                alert("查無此藥");
            } else {
                let west_med = document.querySelector("#west_med");
                let cht_med = document.querySelector("#cht_med");
                if(west_med.checked && !cht_med.checked) {
                    // 西藥
                    temp_arr = temp_arr.filter(e => e["TYPE"] == "西藥");
                } else if(!west_med.checked && cht_med.checked) {
                    // 中藥
                    temp_arr = temp_arr.filter(e => e["TYPE"] == "中藥");
                } else if(!west_med.checked && !cht_med.checked) {
                    alert("請至少勾選中/西藥其中一種");
                }

                console.log(temp_arr);
                current_pagination = 1;
                display_data = temp_arr;
                await get_search_result_display();
            }
        } else {
            console.log(temp_arr);
            current_pagination = 1;
            display_data = temp_arr;
            await get_search_result_display();
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
            let west_med = document.querySelector("#west_med");
            let cht_med = document.querySelector("#cht_med");
            if(west_med.checked && !cht_med.checked) {
                // 西藥
                temp_arr = temp_arr.filter(e => e["TYPE"] == "西藥");
            } else if(!west_med.checked && cht_med.checked) {
                // 中藥
                temp_arr = temp_arr.filter(e => e["TYPE"] == "中藥");
            } else if(!west_med.checked && !cht_med.checked) {
                alert("請至少勾選中/西藥其中一種");
            }

            console.log(temp_arr);
            current_pagination = 1;
            display_data = temp_arr;
            await get_search_result_display();
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
            let west_med = document.querySelector("#west_med");
            let cht_med = document.querySelector("#cht_med");
            if(west_med.checked && !cht_med.checked) {
                // 西藥
                temp_arr = temp_arr.filter(e => e["TYPE"] == "西藥");
            } else if(!west_med.checked && cht_med.checked) {
                // 中藥
                temp_arr = temp_arr.filter(e => e["TYPE"] == "中藥");
            } else if(!west_med.checked && !cht_med.checked) {
                alert("請至少勾選中/西藥其中一種");
            }

            console.log(temp_arr);
            current_pagination = 1;
            display_data = temp_arr;
            await get_search_result_display();
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
            let west_med = document.querySelector("#west_med");
            let cht_med = document.querySelector("#cht_med");
            if(west_med.checked && !cht_med.checked) {
                // 西藥
                temp_arr = temp_arr.filter(e => e["TYPE"] == "西藥");
            } else if(!west_med.checked && cht_med.checked) {
                // 中藥
                temp_arr = temp_arr.filter(e => e["TYPE"] == "中藥");
            } else if(!west_med.checked && !cht_med.checked) {
                alert("請至少勾選中/西藥其中一種");
            }

            console.log(temp_arr);
            current_pagination = 1;
            display_data = temp_arr;
            await get_search_result_display();
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
            let west_med = document.querySelector("#west_med");
            let cht_med = document.querySelector("#cht_med");
            if(west_med.checked && !cht_med.checked) {
                // 西藥
                temp_arr = temp_arr.filter(e => e["TYPE"] == "西藥");
            } else if(!west_med.checked && cht_med.checked) {
                // 中藥
                temp_arr = temp_arr.filter(e => e["TYPE"] == "中藥");
            } else if(!west_med.checked && !cht_med.checked) {
                alert("請至少勾選中/西藥其中一種");
            }

            console.log(temp_arr);
            current_pagination = 1;
            display_data = temp_arr;
            await get_search_result_display();
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
        let west_med = document.querySelector("#west_med");
        let cht_med = document.querySelector("#cht_med");
        if(west_med.checked && !cht_med.checked) {
            // 西藥
            temp_arr = temp_arr.filter(e => e["TYPE"] == "西藥");
        } else if(!west_med.checked && cht_med.checked) {
            // 中藥
            temp_arr = temp_arr.filter(e => e["TYPE"] == "中藥");
        } else if(!west_med.checked && !cht_med.checked) {
            alert("請至少勾選中/西藥其中一種");
        }

        console.log(temp_arr);
        current_pagination = 1;
        display_data = temp_arr;
        await get_search_result_display(display_data);
    }
    hideLoadingPopup();
};
async function search_by_med_group() {
    showLoadingPopup();
    let search_drug_kind_select = document.querySelector("#search_drug_kind_select");
    let temp_med_group_data = await get_med_group_data_api();
    let med_data = await get_medicine_cloud();
    let temp_med_group = temp_med_group_data["Data"].filter(e => e["GUID"].includes(search_drug_kind_select.value));
    let match_arr = [];
    temp_med_group[0]["MedClasses"].forEach(element => {
      match_arr.push(element.CODE);
    });
    console.log(match_arr);
    if(match_arr.length < 1) {
      alert("藥品群組無資料");
      hideLoadingPopup();
      return;
    }
    temp_arr = med_data["Data"].filter(e => match_arr.includes(e["CODE"]));

    if(temp_arr.length < 1) {
        alert("查無此藥");
    } else {
        let west_med = document.querySelector("#west_med");
        let cht_med = document.querySelector("#cht_med");
        if(west_med.checked && !cht_med.checked) {
            // 西藥
            temp_arr = temp_arr.filter(e => e["TYPE"] == "西藥");
        } else if(!west_med.checked && cht_med.checked) {
            // 中藥
            temp_arr = temp_arr.filter(e => e["TYPE"] == "中藥");
        } else if(!west_med.checked && !cht_med.checked) {
            alert("請至少勾選中/西藥其中一種");
        }

        console.log(temp_arr);
        current_pagination = 1;
        display_data = temp_arr;
        await get_search_result_display(display_data);
    }
    hideLoadingPopup();
};
async function search_all_med() {
    showLoadingPopup();
    let med_data = await get_medicine_cloud();

    console.log(med_data["Data"]);

    let temp_arr = med_data["Data"];

    let west_med = document.querySelector("#west_med");
    let cht_med = document.querySelector("#cht_med");
    if(west_med.checked && !cht_med.checked) {
        // 西藥
        temp_arr = temp_arr.filter(e => e["TYPE"] == "西藥");
    } else if(!west_med.checked && cht_med.checked) {
        // 中藥
        temp_arr = temp_arr.filter(e => e["TYPE"] == "中藥");
    } else if(!west_med.checked && !cht_med.checked) {
        alert("請至少勾選中/西藥其中一種");
    }
    
    console.log(temp_arr);
    current_pagination = 1;
    display_data = temp_arr;
    await get_search_result_display();

    hideLoadingPopup();
};
// async function search_by_west_med() {
//     showLoadingPopup();
//     let med_data = await get_medicine_cloud();

//     console.log(med_data["Data"]);
//     let temp_arr = med_data["Data"].filter(e => e["TYPE"] == "西藥");
//     console.log(temp_arr);
//     await get_search_result_display(temp_arr);

//     hideLoadingPopup();
// };
// async function search_by_cht_med() {
//     showLoadingPopup();
//     let med_data = await get_medicine_cloud();

//     console.log(med_data["Data"]);
//     let temp_arr = med_data["Data"].filter(e => e["TYPE"] == "中藥");
//     console.log(temp_arr);
//     await get_search_result_display(temp_arr);

//     hideLoadingPopup();
// };


// 自定義設定功能資料
async function get_medConfig_data() {
    let temp_data = {};
    let med_config_data = await get_all_medConfig();

    med_config_data["Data"].forEach(element => {
        temp_data[`${element.CODE}`] = element
    });

    return temp_data;
}
async function get_med_group_data_api() {
    console.log("api_ip",api_ip);
    let data = await fetch(`${api_ip}api/medGroup/get_all_group`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      }).catch(e => {
        console.log(e);
      }).then(res => {
        return res.json()
      });
  
      return data
}

// 分頁更新
function set_pagination_init() {
    let pagination_container = document.querySelector(".pagination_container");
    pagination_container.innerHTML = "";
  
    let temp_data_num = display_data.length;
    let temp_pages = temp_data_num / pagination_num;
    temp_pages = Math.ceil(temp_pages);
  
    let pre_page_btn = document.createElement("img");
    pre_page_btn.classList.add("pre_page_btn");
    pre_page_btn.src = '../image/left-arrow.png';
    if(current_pagination == 1) pre_page_btn.classList.add("disable_page_btn");
  
    pre_page_btn.addEventListener("click", () => {
      if(current_pagination == 1) {
        return;
      } else {
        current_pagination = current_pagination - 1;
        set_pagination_init();
        get_search_result_display();
      }
    });
  
    let next_page_btn = document.createElement("img");
    next_page_btn.classList.add('next_page_btn');
    next_page_btn.src = '../image/left-arrow.png';
    if(current_pagination == temp_pages) next_page_btn.classList.add("disable_page_btn");
  
    next_page_btn.addEventListener("click", () => {
      if(current_pagination == temp_pages) {
        return;
      } else {
        current_pagination = current_pagination + 1;
        set_pagination_init();
        get_search_result_display();
      }
    });
  
    let pagination_pages_container = document.createElement("div");
    pagination_pages_container.classList.add("pagination_pages_container");
  
    if(temp_pages < 13) {
      for (let i = 1; i <= temp_pages; i++) {
        let pagination_page_container = document.createElement("div");
        pagination_page_container.classList.add("pagination_page");
        pagination_page_container.setAttribute("tab_page", i);
        pagination_page_container.innerHTML = i;
  
        if(i == current_pagination) {
          pagination_page_container.classList.add("current_pagination_page");
        } else {
          pagination_page_container.addEventListener("click", (e) => {
            let temp_page = +e.target.getAttribute("tab_page");
            current_pagination = temp_page;
            set_pagination_init();
            get_search_result_display();
          });
        };
        pagination_pages_container.appendChild(pagination_page_container);
      };
    } else {
      if(current_pagination < 7) {
        for (let i = 1; i <= 9; i++) {
          if(i <= 7) {
            // 前七頁
            let pagination_page_container = document.createElement("div");
            pagination_page_container.classList.add("pagination_page");
            pagination_page_container.setAttribute("tab_page", i);
            pagination_page_container.innerHTML = i;
      
            if(i == current_pagination) {
              pagination_page_container.classList.add("current_pagination_page");
            } else {
              pagination_page_container.addEventListener("click", (e) => {
                let temp_page = +e.target.getAttribute("tab_page");
                current_pagination = temp_page;
                set_pagination_init();
                get_search_result_display();
              });
            };
            pagination_pages_container.appendChild(pagination_page_container);
          } else if(i == 8) {
            // 中間頁數
            let pagination_page_container = document.createElement("div");
            pagination_page_container.classList.add("pagination_page");
            pagination_page_container.innerHTML = "...";
            pagination_pages_container.appendChild(pagination_page_container);
          } else {
            // 最後一頁
            let pagination_page_container = document.createElement("div");
            pagination_page_container.classList.add("pagination_page");
            pagination_page_container.setAttribute("tab_page", temp_pages);
            pagination_page_container.innerHTML = temp_pages;
            pagination_page_container.addEventListener("click", (e) => {
              let temp_page = +e.target.getAttribute("tab_page");
              current_pagination = temp_page;
              set_pagination_init();
              get_search_result_display();
            });
            pagination_pages_container.appendChild(pagination_page_container);
          }
        }
      } else if (current_pagination > temp_pages - 6) {
        for (let i = 1; i <= 9; i++) {
          if(i == 1) {
            // 第一頁
            let pagination_page_container = document.createElement("div");
            pagination_page_container.classList.add("pagination_page");
            pagination_page_container.setAttribute("tab_page", i);
            pagination_page_container.innerHTML = i;
      
            pagination_page_container.addEventListener("click", (e) => {
              let temp_page = +e.target.getAttribute("tab_page");
              current_pagination = temp_page;
              set_pagination_init();
              get_search_result_display();
            });
            pagination_pages_container.appendChild(pagination_page_container);
          } else if(i == 2) {
            // 中間頁數
            let pagination_page_container = document.createElement("div");
            pagination_page_container.classList.add("pagination_page");
            pagination_page_container.innerHTML = "...";
            pagination_pages_container.appendChild(pagination_page_container);
          } else {
            // 最後一頁
            let temp_num_page = i - 9;
            let pagination_page_container = document.createElement("div");
            pagination_page_container.classList.add("pagination_page");
            pagination_page_container.setAttribute("tab_page", temp_pages + temp_num_page);
            pagination_page_container.innerHTML = temp_pages + temp_num_page;
  
            if(temp_pages + temp_num_page == current_pagination) {
              pagination_page_container.classList.add("current_pagination_page");
            } else {
              pagination_page_container.addEventListener("click", (e) => {
                let temp_page = +e.target.getAttribute("tab_page");
                current_pagination = temp_page;
                set_pagination_init();
                get_search_result_display();
              });
            };
            pagination_pages_container.appendChild(pagination_page_container);
          }
        }
      } else {
        for (let i = 1; i <= 9; i++) {
          if(i == 1) {
            // 第一頁
            let pagination_page_container = document.createElement("div");
            pagination_page_container.classList.add("pagination_page");
            pagination_page_container.setAttribute("tab_page", i);
            pagination_page_container.innerHTML = i;
            pagination_page_container.addEventListener("click", (e) => {
              let temp_page = +e.target.getAttribute("tab_page");
              current_pagination = temp_page;
              set_pagination_init();
              get_search_result_display();
            });
            pagination_pages_container.appendChild(pagination_page_container);
          } else if(i == 2 || i == 8) {
            // 中間頁數...
            let pagination_page_container = document.createElement("div");
            pagination_page_container.classList.add("pagination_page");
            pagination_page_container.innerHTML = "...";
            pagination_pages_container.appendChild(pagination_page_container);
          } else if(i > 2 && i < 8) {
            // 中間頁數
            let temp_num_page = i - 5;
            let pagination_page_container = document.createElement("div");
            pagination_page_container.classList.add("pagination_page");
            pagination_page_container.setAttribute("tab_page", current_pagination + temp_num_page);
            pagination_page_container.innerHTML = current_pagination + temp_num_page;
      
            if(current_pagination + temp_num_page == current_pagination) {
              pagination_page_container.classList.add("current_pagination_page");
            } else {
              pagination_page_container.addEventListener("click", (e) => {
                let temp_page = +e.target.getAttribute("tab_page");
                current_pagination = temp_page;
                set_pagination_init();
                get_search_result_display();
              });
            };
            pagination_pages_container.appendChild(pagination_page_container);
          } else {
            let pagination_page_container = document.createElement("div");
            pagination_page_container.classList.add("pagination_page");
            pagination_page_container.setAttribute("tab_page", temp_pages);
            pagination_page_container.innerHTML = temp_pages;
            pagination_page_container.addEventListener("click", (e) => {
              let temp_page = +e.target.getAttribute("tab_page");
              current_pagination = temp_page;
              set_pagination_init();
              get_search_result_display();
            });
            pagination_pages_container.appendChild(pagination_page_container);
          }
        }
      }
    }
  
    pagination_container.appendChild(pre_page_btn);
    pagination_container.appendChild(pagination_pages_container);
    pagination_container.appendChild(next_page_btn);
}