let popup_med_list_div;
let fake_med_list_data = {
    cart_name: "C069",
    med_list: [
        {
            code: "IPET",
            name: "管2※ Pethidine inj. 50mg/ml 1ml",
            cht_name: "鹽酸配西汀注射液",
            unit: "VIAL",
            bed_list: [
                {
                    bed_name: "C069-1",
                    qty: 1,
                    status: false
                },
                {
                    bed_name: "C069-1",
                    qty: 1,
                    status: true
                },
                {
                    bed_name: "C069-1",
                    qty: 2,
                    status: true
                },
                {
                    bed_name: "C069-1",
                    qty: 1,
                    status: false
                },
            ],
        },
        {
            code: "IPET1",
            name: "管2※ Pethidine inj. 50mg/ml 1ml",
            cht_name: "鹽酸配西汀注射液",
            unit: "VIAL",
            bed_list: [
                {
                    bed_name: "C069-1",
                    qty: 1,
                    status: false
                },
                {
                    bed_name: "C069-1",
                    qty: 1,
                    status: false
                },
                {
                    bed_name: "C069-1",
                    qty: 1,
                    status: true
                },
                {
                    bed_name: "C069-1",
                    qty: 1,
                    status: false
                },
            ],
        },
        {
            code: "IPET2",
            name: "管2※ Pethidine inj. 50mg/ml 1ml",
            cht_name: "鹽酸配西汀注射液",
            unit: "VIAL",
            bed_list: [
                {
                    bed_name: "C069-1",
                    qty: 1,
                    status: false
                },
                {
                    bed_name: "C069-1",
                    qty: 1,
                    status: false
                },
                {
                    bed_name: "C069-1",
                    qty: 1,
                    status: true
                },
                {
                    bed_name: "C069-1",
                    qty: 1,
                    status: false
                },
            ],
        },
        {
            code: "IPET3",
            name: "管2※ Pethidine inj. 50mg/ml 1ml",
            cht_name: "鹽酸配西汀注射液",
            unit: "VIAL",
            bed_list: [
                {
                    bed_name: "C069-1",
                    qty: 1,
                    status: false
                },
                {
                    bed_name: "C069-1",
                    qty: 1,
                    status: false
                },
                {
                    bed_name: "C069-1",
                    qty: 1,
                    status: true
                },
                {
                    bed_name: "C069-1",
                    qty: 1,
                    status: false
                },
            ],
        },
    ]
};
let med_list_data;
let first_open = true;

async function get_popup_med_list() {
    popup_med_list_div = new Basic_popup_Div('popup_med_list_div','popup_med_list_div','','');
    popup_med_list_div._popup_div.style.border = '10px solid white';

    let header = await get_pp_med_list_header();
    let main = get_pp_med_list_main();
    let footer = get_pp_med_list_footer();

    popup_med_list_div.AddControl(header);
    popup_med_list_div.AddControl(main);
    popup_med_list_div.AddControl(footer);

    return popup_med_list_div;
};
async function get_pp_med_list_header() {
    let ppml_header_container = document.createElement("div");
    ppml_header_container.classList.add("ppml_header_container");

    let ppml_h_title = document.createElement("div");
    ppml_h_title.classList.add("ppml_h_title");

    let ppml_h_current_cart_select = document.createElement("select");
    ppml_h_current_cart_select.classList.add("ppml_h_current_cart_select");
    ppml_h_current_cart_select.addEventListener("change", async () => {    
        Set_main_div_enable(true);
        clearTimeout(med_list_timer);
        api_logger_add(`藥品總量：${current_cart.hnursta}更換藥車${ppml_h_current_cart_select.value}`, "click");
        med_list_timer = setTimeout(() => {
            Set_main_div_enable(false);
            alert("連線超時，請重新點選");
            return;
        }, 6000);
        
        // last_med_list_n = ppml_h_current_cart_select.value;

        med_list_data = await get_all_med_qty(current_pharmacy.phar, ppml_h_current_cart_select.value, "all");
        if(med_list_data.Code != 200) {
            clearTimeout(med_list_timer);
    
            alert("藥品總量資料錯誤", med_list_data.Result);
            Set_main_div_enable(false);
        } else {
            if(Array.isArray(med_list_data.Data)) {
                med_list_data = med_list_data.Data;
                med_list_data = sort_med_list_data(med_list_data, current_func);
                med_list_data = sort_display_med_data(med_list_data);
                await set_pp_med_list_display();
    
                clearTimeout(med_list_timer);

                let ppml_main_container = document.querySelector(".ppml_main_container");
                ppml_main_container.scrollTop = 0;

                Set_main_div_enable(false);
            } else {
                console.log("藥品總量，資料格式錯誤", med_list_data.Data);
                med_list_data.Data = [];
                med_list_data = med_list_data.Data;
                med_list_data = sort_med_list_data(med_list_data, current_func);
                med_list_data = sort_display_med_data(med_list_data);
                await set_pp_med_list_display();

                let ppml_main_container = document.querySelector(".ppml_main_container");
                ppml_main_container.scrollTop = 0;
                
                clearTimeout(med_list_timer);
                Set_main_div_enable(false);
            }
        }

        let ppdl_h_current_cart_select = document.querySelector(".ppdl_h_current_cart_select");

        for (let i = 0; i < cart_list.length; i++) {
            const element = cart_list[i];
            if(element.hnursta == ppml_h_current_cart_select.value) {
                current_cart = element;
                // let temp_logic = get_func_logic();
                // get_all_select_option_logic(temp_logic);
                
                // 根據選取的調劑台解鎖藥品
                if(current_med_table != "") {
                    console.log("切換調劑台");
                    patient_bed_index = -1;
                    await allocate_display_init();
                } else {
                    console.log("未選調劑台");
                    patient_bed_index = -1;
                    await allocate_display_init();
                }

                if(med_cart_beds_data[patient_bed_index].bednum != "1" && med_cart_beds_data.length != 0) {
                    alert(`目前為第${med_cart_beds_data[patient_bed_index].bednum}床`);
                }

                last_current_cart = current_cart;
                let cart_content = document.querySelector(".cart_select_container > .cart_content");
                cart_content.innerHTML = ppml_h_current_cart_select.value;
                break;
            }
        }

        // 檢測有無退藥
        Set_main_div_enable(true);
        let test_data_arr = await check_cart_dispense();
        if(test_data_arr.length > 0 && test_data_arr.includes(ppml_h_current_cart_select.value)) {
            let post_data = {
            Value: "調劑台",
            ValueAry:  [current_pharmacy.phar, ppml_h_current_cart_select.value]
            };

            console.log("出院處方退藥api",post_data);
            let return_data = await get_patient_discharge(post_data);
            if(return_data.Code != 200) {
                alert("出院處方資料錯誤", return_data.Result);
                Set_main_div_enable(false);
            } else {
                discharged_data = return_data.Data;
                if(discharged_data.length != 0) {
                    let any_cpoe = false;
                    for (let index = 0; index < discharged_data.length; index++) {
                    const element = discharged_data[index];
                    
                    if(element.cpoe.length > 0) {
                        any_cpoe = true;
                        break;
                    }
                    }

                    if(any_cpoe) {
                        alert("有出院退藥資料，請先處理");
                        clearTimeout(med_list_timer);
            
                        ppdl_h_current_cart_select.value = ppml_h_current_cart_select.value;
            
                        set_discharged_data_display();
                        Set_main_div_enable(false);
            
                        // popup_med_list_div_close();
                        popup_med_list_div_close_other();
                        popup_discharged_list_div_open();
                    } else {
                        Set_main_div_enable(false);
                    }
                }
            }
        } else {
            Set_main_div_enable(false);
        }
    });

    let ppml_h_title_content = document.createElement("div");
    ppml_h_title_content.classList.add("ppml_h_title_content");
    ppml_h_title_content.innerHTML = `藥品總量`;

    ppml_h_title.appendChild(ppml_h_current_cart_select);
    ppml_h_title.appendChild(ppml_h_title_content);

    let ppml_search_btn = document.createElement("div");
    ppml_search_btn.classList.add("ppml_search_btn");
    ppml_search_btn.classList.add("btn");
    ppml_search_btn.innerHTML = `搜尋`;
    ppml_search_btn.addEventListener("click", () => {
        popup_med_list_search_div_open();
    });

    // let ppml_display_all_btn = document.createElement("div");
    // ppml_display_all_btn.classList.add("ppml_display_all_btn");
    // ppml_display_all_btn.classList.add("btn");
    // ppml_display_all_btn.innerHTML = `全部`;
    // ppml_display_all_btn.addEventListener("click", async () => {
    //     med_list_data = await get_all_med_qty(current_pharmacy.phar, current_cart.hnursta, "all");
    //     med_list_data = med_list_data.Data;
    //     med_list_data = sort_med_list_data(med_list_data, current_func);
    //     med_list_data = sort_display_med_data(med_list_data);
    //     await set_pp_med_list_display();
    // });

    let ppml_h_close_btn = document.createElement("img");
    ppml_h_close_btn.classList.add("ppml_h_close_btn");
    ppml_h_close_btn.src = "../image/close.png";
    ppml_h_close_btn.addEventListener("click", () => {
        popup_med_list_div_close();
    });

    let ppml_head_sort_container_1 = document.createElement("div");
    ppml_head_sort_container_1.classList.add("ppml_head_sort_container");

    let ppml_head_sort_title_1 = document.createElement("div");
    ppml_head_sort_title_1.classList.add("ppml_head_sort_title");
    ppml_head_sort_title_1.innerHTML = "藥品種類";

    let head_sort_radio_container = document.createElement("div");
    head_sort_radio_container.classList.add("head_sort_radio_container");

    ppml_head_sort_container_1.appendChild(ppml_head_sort_title_1);
    ppml_head_sort_container_1.appendChild(head_sort_radio_container);

    let head_med_table_filter_line = document.createElement("div");
    head_med_table_filter_line.classList.add("head_med_table_filter_line");

    let ppml_head_sort_container_2 = document.createElement("div");
    ppml_head_sort_container_2.classList.add("ppml_head_sort_container");

    let ppml_head_sort_title_2 = document.createElement("div");
    ppml_head_sort_title_2.classList.add("ppml_head_sort_title");
    ppml_head_sort_title_2.innerHTML = "調劑台";

    let head_med_table_filter_container = document.createElement("div");
    head_med_table_filter_container.classList.add("head_med_table_filter_container");

    ppml_head_sort_container_2.appendChild(ppml_head_sort_title_2)
    ppml_head_sort_container_2.appendChild(head_med_table_filter_container);

    ppml_header_container.appendChild(ppml_h_title);
    ppml_header_container.appendChild(ppml_h_close_btn);
    ppml_header_container.appendChild(ppml_head_sort_container_1);
    ppml_header_container.appendChild(head_med_table_filter_line);
    ppml_header_container.appendChild(ppml_head_sort_container_2);

    return ppml_header_container;
}
function get_pp_med_list_main() {
    let ppml_main_container = document.createElement("div");
    ppml_main_container.classList.add("ppml_main_container");

    return ppml_main_container;
}
function get_pp_med_list_footer() {
    let ppml_footer_container = document.createElement("div");
    ppml_footer_container.classList.add("ppml_footer_container");

    let ppml_search_btn = document.createElement("div");
    ppml_search_btn.classList.add("ppml_search_btn");
    ppml_search_btn.classList.add("btn");
    ppml_search_btn.innerHTML = `搜尋`;
    ppml_search_btn.addEventListener("click", () => {
        popup_med_list_search_div_open();
    });

    let ppml_display_all_btn = document.createElement("div");
    ppml_display_all_btn.classList.add("ppml_display_all_btn");
    ppml_display_all_btn.classList.add("btn");
    ppml_display_all_btn.innerHTML = `全部顯示`;
    ppml_display_all_btn.addEventListener("click", async () => {
        api_logger_add(`藥品總量：顯示全部藥品`, "click");
        let checkedRadio = document.querySelector('input[name="filter_med_table_input"]:checked');
        let temp_table = checkedRadio.value;
        let ppml_h_current_cart_select = document.querySelector(".ppml_h_current_cart_select");
        med_list_data = await get_all_med_qty(current_pharmacy.phar, ppml_h_current_cart_select.value, temp_table);
        med_list_data = med_list_data.Data;
        med_list_data = sort_med_list_data(med_list_data, current_func);
        med_list_data = sort_display_med_data(med_list_data);
        await set_pp_med_list_display();
    });

    ppml_footer_container.appendChild(ppml_search_btn);
    ppml_footer_container.appendChild(ppml_display_all_btn);

    return ppml_footer_container;
}
function popup_med_list_div_close() {
    popup_med_list_div.Set_Visible(false);
    check_cart_dispense();
}
function popup_med_list_div_close_other() {
    popup_med_list_div.Set_Visible(false);
}
function popup_med_list_div_open() {
    popup_med_list_div.Set_Visible(true);
}

async function set_pp_med_list_display() {
    let ppml_main_container = document.querySelector(".ppml_main_container");
    ppml_main_container.innerHTML = "";

    console.log("med_list_data", med_list_data);

    med_list_data.forEach(element => {
        let ppml_card_container = document.createElement("div");
        ppml_card_container.classList.add("ppml_card_container");
        if (element.dispens_name != "Y") {
            ppml_card_container.classList.add("ppml_disable_card");
        }
        ppml_card_container.setAttribute("code", element.code);
        ppml_card_container.setAttribute("name", element.name);
        ppml_card_container.setAttribute("cht_name", element.cht_name);
        ppml_card_container.setAttribute("skdiacode", element.SKDIACODE);

        let ppml_card_info_container = document.createElement("div");
        ppml_card_info_container.classList.add("ppml_card_info_container");

        let ppml_ci_1_div = document.createElement("div");
        ppml_ci_1_div.classList.add("ppml_ci_1_div");
        // 動態生成並 append 元素

        let ppml_ci_top = document.createElement('div');
        ppml_ci_top.className = 'ppml_ci_top';

        let nameDiv_container = document.createElement('div');
        nameDiv_container.className = 'ppml_ci_name_container';

        let nameDiv = document.createElement('div');
        nameDiv.className = 'ppml_ci_content';
        nameDiv.textContent = element.name;
        ppml_ci_1_div.appendChild(nameDiv);

        let chtNameDiv = document.createElement('div');
        chtNameDiv.className = 'ppml_ci_content';
        chtNameDiv.textContent = element.cht_name;
        
        nameDiv_container.appendChild(nameDiv);
        if(element.cht_name) nameDiv_container.appendChild(chtNameDiv);

        ppml_ci_top.appendChild(nameDiv_container);
        if(element.large == "L") {
            let ppml_big_bottle = document.createElement("div");
            ppml_big_bottle.classList.add("ppml_big_bottle");
    
            ppml_ci_top.appendChild(ppml_big_bottle);
        }

        ppml_ci_1_div.appendChild(ppml_ci_top);

        let bottomContainer = document.createElement('div');
        bottomContainer.className = 'ppml_ci_bottom_container';

        let infoContainer1 = document.createElement('div');
        infoContainer1.className = 'ppml_ci_info_container';

        let infoLabel1 = document.createElement('div');
        infoLabel1.className = 'ppml_ci_info_label';
        infoLabel1.textContent = '藥碼';

        let infoCode1 = document.createElement('div');
        infoCode1.className = 'ppml_ci_info ppml_ci_info_code';
        infoCode1.textContent = element.code;

        infoContainer1.appendChild(infoLabel1);
        infoContainer1.appendChild(infoCode1);
        bottomContainer.appendChild(infoContainer1);
        
        let infoContainer4 = document.createElement('div');
        infoContainer4.className = 'ppml_ci_info_container';

        let infoLabel4 = document.createElement('div');
        infoLabel4.className = 'ppml_ci_info_label';
        infoLabel4.textContent = '儲位';

        let infoCode4 = document.createElement('div');
        infoCode4.className = 'ppml_ci_info ppml_ci_info_code';
        infoCode4.textContent = element.store_position;

        if(page_setting_params.med_qty_display_loc) {
            if(page_setting_params.med_qty_display_loc.value == "True") {
                infoContainer4.appendChild(infoLabel4);
                infoContainer4.appendChild(infoCode4);
                bottomContainer.appendChild(infoContainer4);
            }
        }

        let infoContainer2 = document.createElement('div');
        infoContainer2.className = 'ppml_ci_info_container';

        let infoLabel2 = document.createElement('div');
        infoLabel2.className = 'ppml_ci_info_label';
        infoLabel2.textContent = '已調配 / 總量';

        let infoCode2 = document.createElement('div');
        infoCode2.className = 'ppml_ci_info ppml_ci_info_qty';
        infoCode2.textContent = element.code;

        infoContainer2.appendChild(infoLabel2);
        infoContainer2.appendChild(infoCode2);
        bottomContainer.appendChild(infoContainer2);

        let infoContainer3 = document.createElement('div');
        infoContainer3.className = 'ppml_ci_info_container';

        let infoLabel3 = document.createElement('div');
        infoLabel3.className = 'ppml_ci_info_label';
        infoLabel3.textContent = '單位';

        let infoUnit = document.createElement('div');
        infoUnit.className = 'ppml_ci_info ppml_ci_info_unit';
        infoUnit.textContent = element.dunit;

        infoContainer3.appendChild(infoLabel3);
        infoContainer3.appendChild(infoUnit);
        bottomContainer.appendChild(infoContainer3);

        ppml_ci_1_div.appendChild(bottomContainer);

        // let ppml_ci_2_div = document.createElement("div");
        // ppml_ci_2_div.classList.add("ppml_ci_2_div");
        // ppml_ci_2_div.innerHTML = `
        //     <div class="ppml_ci_content">已調配 / 總量</div>
        //     <div class="ppml_ci_qty">10 / 50</div>
        // `;

        // let ppml_ci_3_div = document.createElement("div");
        // ppml_ci_3_div.classList.add("ppml_ci_3_div");
        // ppml_ci_3_div.innerHTML = `
        // <div class="ppml_ci_content">單位</div>
        // <div class="ppml_ci_qty">${element.dunit}</div>
        // `;

        let ppml_light_btn_container = document.createElement("div");
        ppml_light_btn_container.classList.add("ppml_light_btn_container");

        let ppml_light_all_check_btn = document.createElement("div");
        ppml_light_all_check_btn.classList.add("ppml_light_all_check_btn");
        ppml_light_all_check_btn.classList.add("btn");
        ppml_light_all_check_btn.setAttribute("code", element.code);
        if(current_func == "allocate") {
            ppml_light_all_check_btn.innerHTML = "全部調劑";
        } else {
            ppml_light_all_check_btn.innerHTML = "全部覆核";
        }
        ppml_light_all_check_btn.addEventListener("click", async () => {
            api_logger_add(`${current_cart.hnursta}藥品總量：${element.code}全部調劑`, "click");
            Set_main_div_enable(true);
            let check_count = 0;
            let guid_arr = [];

            for (let index = 0; index < element["bed_list"].length; index++) {
                const item = element["bed_list"][index];

                if(current_func == "allocate") {
                    if(item.dispens_status != "Y") {
                        // let return_data = await set_post_data_to_check_dispense_for_med_list(item.Master_GUID, item.GUID, "Y", false);
                        // console.log(return_data);
                        // if(return_data.Code == "-200") {
                        //     fail_count++;
                        // } else {
                        // }
                        guid_arr.push(item.GUID);
                        check_count++;
                    }
                } else if(current_func == "review") {
                    if(item.check_status != "Y" && item.dispens_status == "Y") {
                        // let return_data = await set_post_data_to_check_dispense_for_med_list(item.Master_GUID, item.GUID, "Y", false);
                        // console.log(return_data);
                        // if(return_data.Code == "-200") {
                        //     fail_count++;
                        // } else {
                        // }
                        guid_arr.push(item.GUID);
                        check_count++;
                    }
                }
            }
            
            if(check_count == 0) {
                if(current_func == "allocate") {
                    alert("無可調劑藥品");
                    Set_main_div_enable(false);
                    return;
                } else {
                    alert("無可覆核藥品");
                    Set_main_div_enable(false);
                    return;
                }
            }
            
            let checkedRadio = document.querySelector('input[name="filter_med_table_input"]:checked');
            let temp_table = checkedRadio.value;
            let ppml_h_current_cart_select = document.querySelector(".ppml_h_current_cart_select");
            
            let loggedName = sessionStorage.getItem('login_json');
            loggedName = JSON.parse(loggedName);
            
            let post_data = {
                ServerName: "",
                ServerType: "",
                UserName: loggedName.Name,
                ValueAry: [guid_arr.join(";"), ppml_h_current_cart_select.value]
            }
            
            let post_data2 = {
                Data: [
                    {
                        op_id: loggedName.ID,
                        op_name: loggedName.Name
                    }
                ],
                ValueAry: [guid_arr.join(";")],
                Value: "",
                ServerName: "",
                ServerType: "",
                UserName: loggedName.Name
            }
            
            if(current_func == "allocate") {
                post_data2.Value = "調劑";
            } else if(current_func == "review") {
                post_data2.Value = "覆核";
            }
            
            if(temp_table != "all") {
                post_data.ServerName = temp_table;
                post_data.ServerType = "調劑台";
            }
            
            console.log("post_data", post_data);
            console.log("post_log_data", post_data2);
            
            let return_data;
            if(current_func == "allocate") {
                console.log("藥品全部調劑post_data", post_data);
                return_data = await api_med_cart_dispensed_by_cart(post_data);
            } else if(current_func == "review") {
                console.log("藥品全部複合post_data", post_data);
                return_data = await api_med_cart_check_by_cart(post_data);
            }
            
            if(return_data.Code == 200) {
                guid_arr.forEach(guid => {
                    let ppml_bed_card = document.querySelector(`.ppml_bed_card[guid="${guid}"]`);
                    ppml_bed_card.classList.add("ppml_bed_done");
                    
                    
                    let med_card_container = document.querySelector(`.med_card_container[guid="${guid}"]`);
                    let med_card_checkbox = document.querySelector(`.med_card_checkbox[id="${guid}"]`);
                    
                    if(med_card_container) {
                        let temp_guid = med_card_container.getAttribute("guid");
                        if(guid == temp_guid) {
                            if(current_func == "review") {
                                med_card_container.classList.add("dobule_checked_color");
                            }
                        }
                    }
                    if(med_card_checkbox) {
                        let temp_guid = med_card_checkbox.id;
                        if(guid == temp_guid) {
                            med_card_checkbox.checked = true;
                        }
                    }
                });
                                        
                show_popup_notice(return_data.Result, true);
                await add_med_inventory_log(post_data2);
            } else {
                alert("操作失敗 Result:", return_data.Result);
                Set_main_div_enable(false);
                return;
            }

            let filter_med_table_input = document.querySelector('.filter_med_table_input:checked');

            med_list_data = await get_all_med_qty(current_pharmacy.phar, ppml_h_current_cart_select.value, filter_med_table_input.value);
            med_list_data = med_list_data.Data;
            med_list_data = sort_med_list_data(med_list_data, current_func);
            med_list_data = sort_display_med_data(med_list_data);
            await set_pp_med_list_display();

            Set_main_div_enable(false);
        });

        let ppml_light_on_btn = document.createElement("div");
        ppml_light_on_btn.classList.add("ppml_light_on_btn");
        ppml_light_on_btn.classList.add("btn");
        ppml_light_on_btn.setAttribute("code", element.code);
        ppml_light_on_btn.innerHTML = "亮燈";
        ppml_light_on_btn.addEventListener("click", async () => {
            let checkedRadio = document.querySelector('input[name="filter_med_table_input"]:checked');
            api_logger_add(`${current_cart.hnursta}-藥品總量：藥品亮燈(${element.code})`, "click");

            if(checkedRadio.value != "all") {
                // await light_off_func();
                await light_on_func(element.code, checkedRadio.value, "調劑台");
            } else {
                alert("請選擇調劑台");
            }

            // console.log(checkedRadio);

            // await set_light_table(element.code, element.name, element.cht_name);
            // popup_light_table_select_div_open();
        });

        let check_count = 0;
        for (let index = 0; index < element["bed_list"].length; index++) {
            const item = element["bed_list"][index];

            if(current_func == "allocate") {
                if(item.dispens_status != "Y") {
                    check_count++;
                }
            } else if(current_func == "review") {
                if(item.check_status != "Y" && item.dispens_status == "Y") {
                    check_count++;
                }
            }
        }

        // 切換調劑模式
        let temp_mode = false;
        if(page_setting_params.med_qty_popup_prefill) {
            if(page_setting_params.med_qty_popup_prefill.value == "True") temp_mode = true;
        }
        let uncheck_arr = [];
        let check_arr = [];
        if(temp_mode) {
            if(current_func == "allocate") {
                uncheck_arr = element["bed_list"].filter(item => {
                    return item.dispens_status != "Y";
                });
                check_arr = element["bed_list"].filter(item => {
                    return item.dispens_status == "Y";
                });
            } else {
                uncheck_arr = element["bed_list"].filter(item => {
                    return item.check_status != "Y" && item.dispens_status == "Y";
                });
                check_arr = element["bed_list"].filter(item => {
                    return item.check_status == "Y" && item.dispens_status == "Y";
    
                });
            }

            let ppml_check_btn_container = document.createElement("div");
            ppml_check_btn_container.classList.add("ppml_check_btn_container");

            let ppml_check_select_all_btn = document.createElement("div");
            ppml_check_select_all_btn.classList.add("ppml_check_select_all_btn");
            if (element.dispens_name != "Y") {
                ppml_check_select_all_btn.classList.add("check_selected_disable");
            }
            ppml_check_select_all_btn.classList.add("btn");
            ppml_check_select_all_btn.setAttribute("code", `med_${element.code}`);
            ppml_check_select_all_btn.innerHTML = "全選";
            ppml_check_select_all_btn.addEventListener("click", () => {
                if (element.dispens_name != "Y") {
                    alert("請選取對應的調劑台");
                    return;
                }
                let ppml_bed_med_input_all = document.querySelectorAll(`.ppml_bed_med_input[code="med_${element.code}"]`);
                let ppml_check_selected_submin_btn = document.querySelector(`.ppml_check_selected_submin_btn[code="med_${element.code}"]`);
                if(ppml_check_select_all_btn.innerHTML == "取消") {
                    ppml_bed_med_input_all.forEach(item => {
                        item.checked = false;
                    });
                    ppml_check_select_all_btn.innerHTML = "全選";
                    ppml_check_selected_submin_btn.classList.add("check_selected_disable");
                } else {
                    ppml_bed_med_input_all.forEach(item => {
                        item.checked = true;
                    });
                    ppml_check_select_all_btn.innerHTML = "取消";
                    ppml_check_selected_submin_btn.classList.remove("check_selected_disable");
                }
            });

            let ppml_check_selected_submin_btn = document.createElement("div");
            ppml_check_selected_submin_btn.classList.add("ppml_check_selected_submin_btn");
            ppml_check_selected_submin_btn.classList.add("btn");
            ppml_check_selected_submin_btn.classList.add("check_selected_disable");
            ppml_check_selected_submin_btn.setAttribute("code", `med_${element.code}`);
            if(current_func == "allocate") {
                ppml_check_selected_submin_btn.innerHTML = "調劑";
            } else {
                ppml_check_selected_submin_btn.innerHTML = "覆核";
            }
            ppml_check_selected_submin_btn.addEventListener("click", async () => {
                if (element.dispens_name != "Y") {
                    alert("請選取對應的調劑台");
                    return;
                }
                if(ppml_check_selected_submin_btn.className.includes("check_selected_disable")) {
                    alert("未選取任何床位");
                    return;
                }

                let temp_str = true;
                // if(current_func == "allocate") {
                //     temp_str = `${element.name}是否進行調劑？`;
                // } else {
                //     temp_str = `${element.name}是否進行覆核？`;
                // }
                // if(confirm(temp_str)) {
                if(temp_str) {
                    let ppml_bed_med_input_all = document.querySelectorAll(`.ppml_bed_med_input[code="med_${element.code}"]:checked`);
                    api_logger_add(`${current_cart.hnursta}藥品總量：${element.code}全部調劑`, "click");
                    Set_main_div_enable(true);
                    let check_count = 0;
                    let guid_arr = [];

                    ppml_bed_med_input_all.forEach(item => {
                        let temp_guid = item.id;
                        guid_arr.push(temp_guid);
                        check_count++;
                    });

                    let checkedRadio = document.querySelector('input[name="filter_med_table_input"]:checked');
                    let temp_table = checkedRadio.value;
                    let ppml_h_current_cart_select = document.querySelector(".ppml_h_current_cart_select");
                    let loggedName = sessionStorage.getItem('login_json');
                    loggedName = JSON.parse(loggedName);
                    
                    let post_data = {
                        ServerName: "",
                        ServerType: "",
                        UserName: loggedName.Name,
                        ValueAry: [guid_arr.join(";"), ppml_h_current_cart_select.value]
                    }

                    let post_data2 = {
                        Data: [
                            {
                                op_id: loggedName.ID,
                                op_name: loggedName.Name
                            }
                        ],
                        ValueAry: [guid_arr.join(";")],
                        Value: "",
                        ServerName: "",
                        ServerType: "",
                        UserName: loggedName.Name
                    }

                    if(current_func == "allocate") {
                        post_data2.Value = "調劑";
                    } else if(current_func == "review") {
                        post_data2.Value = "覆核";
                    }

                    if(temp_table != "all") {
                        post_data.ServerName = temp_table;
                        post_data.ServerType = "調劑台";
                    }

                    console.log("post_data", post_data);
                    console.log("post_log_data", post_data2);
                    let return_data;
                    if(current_func == "allocate") {
                        console.log("藥品全部調劑post_data", post_data);
                        return_data = await api_med_cart_dispensed_by_cart(post_data);
                    } else if(current_func == "review") {
                        console.log("藥品全部複合post_data", post_data);
                        return_data = await api_med_cart_check_by_cart(post_data);
                    }

                    if(return_data.Code == 200) {
                        show_popup_notice(return_data.Result, true);
                        await add_med_inventory_log(post_data2);
                    } else {
                        alert("操作失敗 Result:", return_data.Result);
                        Set_main_div_enable(false);
                        return;
                    }

                    let filter_med_table_input = document.querySelector('.filter_med_table_input:checked');

                    med_list_data = await get_all_med_qty(current_pharmacy.phar, ppml_h_current_cart_select.value, filter_med_table_input.value);
                    med_list_data = med_list_data.Data;
                    med_list_data = sort_med_list_data(med_list_data, current_func);
                    med_list_data = sort_display_med_data(med_list_data);
                    await set_pp_med_list_display();

                    Set_main_div_enable(false);
                    // 安安安
                }
            });

            ppml_check_btn_container.appendChild(ppml_check_select_all_btn);
            ppml_check_btn_container.appendChild(ppml_check_selected_submin_btn);
            
            if(uncheck_arr.length > 0) {
                ppml_light_btn_container.appendChild(ppml_check_btn_container);
            }
        } else {
            if(element.dispens_name == "Y") {
                if(check_count != 0) {
                    ppml_light_btn_container.appendChild(ppml_light_all_check_btn);
                }
            }
        }
        ppml_light_btn_container.appendChild(ppml_light_on_btn);


        ppml_card_info_container.appendChild(ppml_ci_1_div);
        // ppml_card_info_container.appendChild(ppml_ci_2_div);
        // ppml_card_info_container.appendChild(ppml_ci_3_div);
        ppml_card_info_container.appendChild(ppml_light_btn_container);

        let ppml_hr = document.createElement("div");
        ppml_hr.classList.add("ppml_hr");

        let ppml_bed_list_container = document.createElement("div");
        ppml_bed_list_container.classList.add("ppml_bed_list_container");

        let total_qty = 0;
        let done_qty = 0;
        let check_qty = 0;

        if(temp_mode) {
            uncheck_arr.forEach(item => {
                let ppml_bed_card = document.createElement("label");
                ppml_bed_card.classList.add("ppml_bed_card");
                ppml_bed_card.setAttribute("for", item.GUID);

                if(item.selfPRN == "Y") {
                    // 調整自費PRN顯示
                    // ppml_bed_card.innerHTML = `<span class="ppml_bed_card_num">${item.bednum}床</span><div class="ppml_bed_card_qty">${item.lqnty}</div>`;
                    ppml_bed_card.innerHTML = `
                    <div class="ppml_bed_card_PRN">P</div><span class="ppml_bed_card_num">${item.bednum}床</span><div class="ppml_bed_card_qty">${item.lqnty}</div>
                    `;
                } else if(item.selfPRN != "Y" && item.freqn == "Y") {
                    ppml_bed_card.innerHTML = `<div class="ppml_bed_card_PRN_noself">P</div><span class="ppml_bed_card_num">${item.bednum}床</span><div class="ppml_bed_card_qty">${+item.lqnty}</div>`;
                } else {
                    ppml_bed_card.innerHTML = `<span class="ppml_bed_card_num">${item.bednum}床</span><div class="ppml_bed_card_qty">${item.lqnty}</div>`;
                }
                
                ppml_bed_card.setAttribute("m_guid", item.Master_GUID);
                ppml_bed_card.setAttribute("guid", item.GUID);

                total_qty += +item.lqnty;

                let ppml_bed_med_input = document.createElement("input");
                ppml_bed_med_input.id = item.GUID;
                ppml_bed_med_input.name = item.GUID;
                ppml_bed_med_input.classList.add("ppml_bed_med_input");
                ppml_bed_med_input.setAttribute("code", `med_${element.code}`);
                ppml_bed_med_input.type = "checkbox";
                if(element.dispens_name != "Y") {
                    ppml_bed_med_input.disabled = true;
                }
                ppml_bed_med_input.addEventListener("change", () => {
                    let ppml_bed_med_input_all = document.querySelectorAll(`.ppml_bed_med_input[code="med_${element.code}"]`);
                    let ppml_check_selected_submin_btn = document.querySelector(`.ppml_check_selected_submin_btn[code="med_${element.code}"]`);
                    let ppml_check_select_all_btn = document.querySelector(`.ppml_check_select_all_btn[code="med_${element.code}"]`);

                    let temp_count = 0;
                    let temp_no_count = 0;
                    ppml_bed_med_input_all.forEach(item => {
                        if(item.checked) temp_count++;
                        if(!item.checked) temp_no_count++;
                    });

                    if(temp_no_count == 0) {
                        ppml_check_select_all_btn.innerHTML = "取消";
                    } else {
                        ppml_check_select_all_btn.innerHTML = "全選";
                    }

                    if(temp_count > 0) ppml_check_selected_submin_btn.classList.remove("check_selected_disable");
                    if(temp_count == 0) ppml_check_selected_submin_btn.classList.add("check_selected_disable");
                });

                ppml_bed_list_container.appendChild(ppml_bed_med_input);
                ppml_bed_list_container.appendChild(ppml_bed_card);
            });
            check_arr.forEach(item => {
                let ppml_bed_card = document.createElement("div");
                ppml_bed_card.classList.add("ppml_bed_card");

                if(item.selfPRN == "Y") {
                    // 調整自費PRN顯示
                    // ppml_bed_card.innerHTML = `<span class="ppml_bed_card_num">${item.bednum}床</span><div class="ppml_bed_card_qty">${item.lqnty}</div>`;
                    ppml_bed_card.innerHTML = `
                    <div class="ppml_bed_card_PRN">P</div><span class="ppml_bed_card_num">${item.bednum}床</span><div class="ppml_bed_card_qty">${item.lqnty}</div>
                    `;
                } else if(item.selfPRN != "Y" && item.freqn == "Y") {
                    ppml_bed_card.innerHTML = `<div class="ppml_bed_card_PRN_noself">P</div><span class="ppml_bed_card_num">${item.bednum}床</span><div class="ppml_bed_card_qty">${+item.lqnty}</div>`;
                } else {
                    ppml_bed_card.innerHTML = `<span class="ppml_bed_card_num">${item.bednum}床</span><div class="ppml_bed_card_qty">${item.lqnty}</div>`;
                }
                
                ppml_bed_card.setAttribute("m_guid", item.Master_GUID);
                ppml_bed_card.setAttribute("guid", item.GUID);

                ppml_bed_card.classList.add("ppml_bed_done");
                total_qty += +item.lqnty;
                done_qty += +item.lqnty;
                if(element.dispens_name != "Y") {
                    ppml_bed_card.setAttribute("checkable", false);
                    ppml_bed_card.classList.add("ppml_bed_card_disable");
                } else {
                    ppml_bed_card.setAttribute("checkable", true);
                    ppml_bed_card.addEventListener("click", async (e) => {
                        console.log(ppml_bed_card.classList.contains("ppml_bed_done"));
                        let temp_str = "";
                        if(current_func == "allocate") {
                            temp_str = `是否取消調劑狀態`;
                        } else {
                            temp_str = `是否取消覆核狀態`;
                        }
                        if(confirm(temp_str)) {
                            Set_main_div_enable(true);
    
                            let master_guid = ppml_bed_card.getAttribute("m_guid");
                            let guid = ppml_bed_card.getAttribute("guid");
        
                            await set_post_data_to_check_dispense_for_med_list(master_guid, guid, "", false);
        
                            let filter_med_table_input = document.querySelector('.filter_med_table_input:checked');
                            let ppml_h_current_cart_select = document.querySelector(".ppml_h_current_cart_select");
                            med_list_data = await get_all_med_qty(current_pharmacy.phar, ppml_h_current_cart_select.value, filter_med_table_input.value);
                            med_list_data = med_list_data.Data;
                            med_list_data = sort_med_list_data(med_list_data, current_func);
                            med_list_data = sort_display_med_data(med_list_data);
                            await set_pp_med_list_display();
    
                            // med_list_search_result();
    
                            ppml_bed_card.classList.remove("ppml_bed_done");
                            item.dispens_status = "";
    
                            done_qty = +done_qty - +item.lqnty;
    
                            infoCode2.textContent = `${done_qty} / ${total_qty}`;
                            
                            Set_main_div_enable(false);
                        }
                    });
                }


                ppml_bed_list_container.appendChild(ppml_bed_card);
            });
        } else {
            element["bed_list"].forEach(item => {
                let ppml_bed_card = document.createElement("div");
                ppml_bed_card.classList.add("ppml_bed_card");
                // PRN標示
                // let temp_str = item.freqn.toUpperCase();
                // console.log(temp_str);
                // console.log(temp_str.includes("PRN"));
                if(item.selfPRN == "Y") {
                    // 調整自費PRN顯示
                    // ppml_bed_card.innerHTML = `<span class="ppml_bed_card_num">${item.bednum}床</span><div class="ppml_bed_card_qty">${item.lqnty}</div>`;
                    ppml_bed_card.innerHTML = `
                    <div class="ppml_bed_card_PRN">P</div><span class="ppml_bed_card_num">${item.bednum}床</span><div class="ppml_bed_card_qty">${item.lqnty}</div>
                    `;
                } else if(item.selfPRN != "Y" && item.freqn == "Y") {
                    ppml_bed_card.innerHTML = `<div class="ppml_bed_card_PRN_noself">P</div><span class="ppml_bed_card_num">${item.bednum}床</span><div class="ppml_bed_card_qty">${+item.lqnty}</div>`;
                } else {
                    ppml_bed_card.innerHTML = `<span class="ppml_bed_card_num">${item.bednum}床</span><div class="ppml_bed_card_qty">${item.lqnty}</div>`;
                }
    
                // else if(item.freqn == "PRN") {
                //     ppml_bed_card.innerHTML = `
                //     <div class="ppml_bed_card_PRN">P</div><span class="ppml_bed_card_num">${item.bednum}床</span><div class="ppml_bed_card_qty">${+item.lqnty}</div>
                //     `;
                // }
                // ppml_bed_card.innerHTML = `<span class="ppml_bed_card_num">${item.bednum}床</span><div class="ppml_bed_card_qty">${+item.lqnty}</div>`;
                ppml_bed_card.setAttribute("m_guid", item.Master_GUID);
                ppml_bed_card.setAttribute("guid", item.GUID);
                
                if(element.dispens_name != "Y") {
                    ppml_bed_card.setAttribute("checkable", false);
                    ppml_bed_card.classList.add("ppml_bed_card_disable");
                } else {
                    ppml_bed_card.setAttribute("checkable", true);
                }
    
                total_qty += +item.lqnty;
    
                if(current_func == "allocate") {
                    if(item.dispens_status == "Y") {
                        ppml_bed_card.classList.add("ppml_bed_done");
                        done_qty += +item.lqnty;
                    }
                    if(element.dispens_name == "Y") {
                        ppml_bed_card.addEventListener("click", async (e) => {
                            console.log(ppml_bed_card.classList.contains("ppml_bed_done"));
                            if(ppml_bed_card.classList.contains("ppml_bed_done")) {
                                if(confirm(`是否取消調劑狀態`)) {
                                    Set_main_div_enable(true);
            
                                    let master_guid = ppml_bed_card.getAttribute("m_guid");
                                    let guid = ppml_bed_card.getAttribute("guid");
                
                                    await set_post_data_to_check_dispense_for_med_list(master_guid, guid, "", false);
                
                                    let filter_med_table_input = document.querySelector('.filter_med_table_input:checked');
                                    let ppml_h_current_cart_select = document.querySelector(".ppml_h_current_cart_select");
                                    med_list_data = await get_all_med_qty(current_pharmacy.phar, ppml_h_current_cart_select.value, filter_med_table_input.value);
                                    med_list_data = med_list_data.Data;
                                    med_list_data = sort_med_list_data(med_list_data, current_func);
                                    med_list_data = sort_display_med_data(med_list_data);
                                    await set_pp_med_list_display();
        
                                    // med_list_search_result();
        
                                    ppml_bed_card.classList.remove("ppml_bed_done");
                                    item.dispens_status = "";
        
                                    done_qty = +done_qty - +item.lqnty;
        
                                    infoCode2.textContent = `${done_qty} / ${total_qty}`;
                                    
                                    Set_main_div_enable(false);
                                }
                            } else {
                                Set_main_div_enable(true);
                                api_logger_add(`${current_cart.hnursta}藥品總量：${item.bednum}床，${element.code} 調劑`, "click");
                                let master_guid = ppml_bed_card.getAttribute("m_guid");
                                let guid = ppml_bed_card.getAttribute("guid");
            
                                await set_post_data_to_check_dispense_for_med_list(master_guid, guid, "Y", false);
            
                                let filter_med_table_input = document.querySelector('.filter_med_table_input:checked');
                                let ppml_h_current_cart_select = document.querySelector(".ppml_h_current_cart_select");
                                
                                med_list_data = await get_all_med_qty(current_pharmacy.phar, ppml_h_current_cart_select.value, filter_med_table_input.value);
                                med_list_data = med_list_data.Data;
                                med_list_data = sort_med_list_data(med_list_data, current_func);
                                med_list_data = sort_display_med_data(med_list_data);
                                await set_pp_med_list_display();
                                // med_list_search_result();
        
                                ppml_bed_card.classList.add("ppml_bed_done");
                                item.dispens_status = "Y";
        
                                done_qty = +done_qty + +item.lqnty;
        
                                infoCode2.textContent = `${done_qty} / ${total_qty}`;
                                
                                Set_main_div_enable(false);
                            }
                        });
                    }
                } else {
                    if(item.dispens_status != "Y") {
                        ppml_bed_card.classList.add("ppml_bed_disalbe");
                        ppml_bed_card.addEventListener("click", () => {
                            alert("請先完成調劑");
                        }) 
                    } else {
                        if(item.check_status == "Y") {
                            ppml_bed_card.classList.add("ppml_bed_done");
                            check_qty += +item.lqnty;
                            // ppml_bed_card.addEventListener("click", async (e) => {
                            //     console.log(e.target.classList.contains("ppml_bed_done"));
                            //     if(e.target.classList.contains("ppml_bed_done")) {
                            //         if(confirm("是否取消覆核狀態")) {
                            //             Set_main_div_enable(true);
                
                            //             let master_guid = ppml_bed_card.getAttribute("m_guid");
                            //             let guid = ppml_bed_card.getAttribute("guid");
                    
                            //             await set_post_data_to_check_dispense_for_med_list(master_guid, guid, "");
                    
                            //             // med_list_data = await get_all_med_qty(current_pharmacy.phar, current_cart.hnursta, "all");
                            //             // med_list_data = med_list_data.Data;
                            //             // med_list_data = sort_med_list_data(med_list_data, current_func);;
                            //             // await set_pp_med_list_display();
        
                            //             // med_list_search_result();
        
                            //             ppml_bed_card.classList.remove("ppml_bed_done");
                            //             item.check_status = "";
                                        
                            //             Set_main_div_enable(false);
                            //         }
                            //     }
                            // });
                        }
                        if(element.dispens_name == "Y") {
                            ppml_bed_card.addEventListener("click", async (e) => {
                                console.log(ppml_bed_card.classList.contains("ppml_bed_done"));
                                if(ppml_bed_card.classList.contains("ppml_bed_done")) {
                                    if(confirm("是否取消覆核狀態")) {
                                        Set_main_div_enable(true);
                                        api_logger_add(`${current_cart.hnursta}藥品總量：${item.bednum}床，${element.code} 取消覆核`, "click");
                                        let master_guid = ppml_bed_card.getAttribute("m_guid");
                                        let guid = ppml_bed_card.getAttribute("guid");
                    
                                        await set_post_data_to_check_dispense_for_med_list(master_guid, guid, "", false);
                                        let filter_med_table_input = document.querySelector('.filter_med_table_input:checked');
        
                                        med_list_data = await get_all_med_qty(current_pharmacy.phar, current_cart.hnursta, filter_med_table_input.value);
                                        med_list_data = med_list_data.Data;
                                        med_list_data = sort_med_list_data(med_list_data, current_func);
                                        med_list_data = sort_display_med_data(med_list_data);
                                        await set_pp_med_list_display();
        
                                        // med_list_search_result();
        
                                        ppml_bed_card.classList.remove("ppml_bed_done");
                                        item.check_status = "";
        
                                        check_qty = +check_qty - +item.lqnty;
        
                                        infoCode2.textContent = `${check_qty} / ${total_qty}`;
                                        
                                        Set_main_div_enable(false);
                                    }
                                } else {
                                    Set_main_div_enable(true);
                                    api_logger_add(`${current_cart.hnursta}藥品總量：${item.bednum}床，${element.code} 覆核`, "click");
                                    let master_guid = ppml_bed_card.getAttribute("m_guid");
                                    let guid = ppml_bed_card.getAttribute("guid");
                
                                    await set_post_data_to_check_dispense_for_med_list(master_guid, guid, "Y", false);
                                    let filter_med_table_input = document.querySelector('.filter_med_table_input:checked');
                                   
                                    med_list_data = await get_all_med_qty(current_pharmacy.phar, current_cart.hnursta, filter_med_table_input.value);
                                    med_list_data = med_list_data.Data;
                                    med_list_data = sort_med_list_data(med_list_data, current_func);
                                    med_list_data = sort_display_med_data(med_list_data);
                                    await set_pp_med_list_display();
        
                                    // med_list_search_result();
        
                                    ppml_bed_card.classList.add("ppml_bed_done");
                                    item.check_status = "Y";
        
                                    check_qty = +check_qty + +item.lqnty;
        
                                    infoCode2.textContent = `${check_qty} / ${total_qty}`;
                                    
                                    Set_main_div_enable(false);
                                }
                            });
                        }
                    }
                }
    
                ppml_bed_list_container.appendChild(ppml_bed_card);
            });
        }

        if(current_func == "allocate") {
            infoLabel2.textContent = '已調配 / 總量';
            infoCode2.textContent = `${done_qty} / ${total_qty}`;
        } else {
            infoLabel2.textContent = '已覆核 / 總量';
            infoCode2.textContent = `${check_qty} / ${total_qty}`;
        }

        // ppml_ci_2_div.innerHTML = `
        //     <div class="ppml_ci_content">已調配 / 總量</div>
        //     <div class="ppml_ci_qty">${done_qty} / ${total_qty}</div>
        // `;

        ppml_card_container.appendChild(ppml_card_info_container);
        ppml_card_container.appendChild(ppml_hr);
        ppml_card_container.appendChild(ppml_bed_list_container);
        
        let radio_checked_input = document.querySelector('.sort_med_input:checked');

        // 這邊調整radio大瓶、針劑顯示
        // 藥品總量為0時不顯示
        if(radio_checked_input.value == "all") {
            ppml_main_container.appendChild(ppml_card_container);
        } else {
            if(Array.isArray(element.med_group)) {
                if(element.med_group.includes(radio_checked_input.value)) ppml_main_container.appendChild(ppml_card_container);
            }
        }
        if(+total_qty != 0) {
        }
    });
}
async function set_post_data_to_check_dispense_for_med_list(m_guid, guid, status, med_change) {
    let checkedRadio = document.querySelector('input[name="filter_med_table_input"]:checked');
    let checkedRadio_med_change = document.querySelector('input[name="ppmcl_filter_med_table_input"]:checked');
    let temp_table = checkedRadio.value;

    let loggedName = sessionStorage.getItem('login_json');
    loggedName = JSON.parse(loggedName);
    let med_card_checkbox = document.querySelectorAll(".med_card_checkbox");
    let med_card_container = document.querySelectorAll(".med_card_container");
    let check_status = status;
    let return_data;
    let post_data = {
        ServerName: "",
        ServerType: "",
        UserName: loggedName.Name,
        ValueAry: [m_guid, guid, check_status]
    }
    if(temp_table != "all" && !med_change) {
        post_data = {
            ServerName: temp_table,
            ServerType: "調劑台",
            UserName: loggedName.Name,
            ValueAry: [m_guid, guid, check_status]
        }
    } else if(checkedRadio_med_change.value != "all" && med_change) {
        post_data = {
            ServerName: checkedRadio_med_change.value,
            ServerType: "調劑台",
            UserName: loggedName.Name,
            ValueAry: [m_guid, guid, check_status]
        }
    }
    let post_data2 = {
        Data: [
            {
                op_id: loggedName.ID,
                op_name: loggedName.Name
            }
        ],
        ValueAry: [guid],
        Value: "",
        ServerName: "",
        ServerType: "",
        UserName: loggedName.Name
    }
    if(temp_table != "all" && !med_change) {
        post_data2 = {
            Data: [
                {
                    op_id: loggedName.ID,
                    op_name: loggedName.Name
                }
            ],
            ValueAry: [guid],
            Value: "",
            ServerName: temp_table,
            ServerType: "調劑台",
            UserName: loggedName.Name
        }
    } else if(checkedRadio_med_change.value != "all" && med_change) {
        post_data2 = {
            Data: [
                {
                    op_id: loggedName.ID,
                    op_name: loggedName.Name
                }
            ],
            ValueAry: [guid],
            Value: "",
            ServerName: checkedRadio_med_change.value,
            ServerType: "調劑台",
            UserName: loggedName.Name
        }
    }

    if(current_func == "allocate") {
        if(status  == "Y") {
            post_data2.Value = "調劑"
        } else {
            post_data2.Value = "取消調劑"
        }
    } else if(current_func == "review") {
        if(status  == "Y") {
            post_data2.Value = "覆核"
        } else {
            post_data2.Value = "取消覆核"
        }
    }
    console.log("post_data", post_data);
    console.log("post_log_data", post_data2);

    med_card_checkbox.forEach((element, index) => {
        if(element.id == guid) {
            if(check_status == "Y") {
                if(current_func == "review") {
                    med_card_container[index].classList.add("dobule_checked_color");
                }
                element.checked = true;
            } else {
                if(current_func == "review") {
                    med_card_container[index].classList.remove("dobule_checked_color");
                }
                element.checked = false;
            }
        }
    });

    let guid_arr = guid.split(";");
    console.log(guid_arr.length);

    if(guid_arr.length > 1) {
        if(status == "Y") {
            // 這裡將多個GUID調劑換一隻API送出調劑
            let ppml_h_current_cart_select = document.querySelector(".ppml_h_current_cart_select");
            post_data = {
                ServerName: checkedRadio_med_change.value,
                ServerType: "調劑台",
                UserName: loggedName.Name,
                ValueAry: [guid_arr.join(";"), ppml_h_current_cart_select.value]
            }

            if(current_func == "allocate") {
                console.log("單床多藥品重複整合調劑post_data", post_data);
                return_data = await api_med_cart_dispensed_by_cart(post_data);
            } else if(current_func == "review") {
                console.log("單床多藥品重複整合複合post_data", post_data);
                return_data = await api_med_cart_check_by_cart(post_data);
            }
        } else {
            // 這裡將多個GUID取消調劑換一隻API送出取消調劑
            let post_data_array = [];
            guid_arr.forEach(item => {
                post_data_array.push({
                    ServerName: checkedRadio_med_change.value,
                    ServerType: "調劑台",
                    UserName: loggedName.Name,
                    ValueAry: [m_guid, item, check_status]
                });
            });

            console.log("單床多藥品重複整合取消調劑post_data", post_data_array);
            if(current_func == "allocate") {
                for (let index = 0; index < post_data_array.length; index++) {
                    const element = post_data_array[index];
                    
                    return_data = await api_med_cart_check_dispense_by_GUID(element);
                }
            } else if(current_func == "review") {
                for (let index = 0; index < post_data_array.length; index++) {
                    const element = post_data_array[index];
                    
                    return_data = await api_med_cart_double_check_by_GUID(element);
                }
            }
        }
    } else {
        if(current_func == "allocate") {
            return_data = await api_med_cart_check_dispense_by_GUID(post_data);
        } else {
            return_data = await api_med_cart_double_check_by_GUID(post_data);
        }
    }


    if(return_data.Code == "200") {
        show_popup_notice(return_data.Result, true);
        await add_med_inventory_log(post_data2);
    } else {
        show_popup_notice(return_data.Result, false);
    }

    return return_data;
};

// function sort_med_list_data(array, current_func) {
//     let sortedArray = array.sort((a, b) => a.name.localeCompare(b.name));

//     if(current_func == "allocate") {
//         let sortedArray = array.sort((a, b) => {
//             const getStatusCategory = (bedList) => {
//                 const hasAllY = bedList.every(bed => bed.dispens_status === "Y");
//                 return hasAllY ? 1 : 0;
//                 // const hasSomeY = bedList.some(bed => bed.dispens_status === "Y");
//                 // return hasAllY ? 2 : hasSomeY ? 1 : 0;
//             };
        
//             const aStatus = getStatusCategory(a.bed_list);
//             const bStatus = getStatusCategory(b.bed_list);
        
//             return aStatus - bStatus;
//         });
    
    
//         console.log('sortedArray', sortedArray);
//         return sortedArray;
//     } else {
//         let sortedArray = array.sort((a, b) => {
//             const getStatusCategory = (bedList) => {
//                 const hasAllY = bedList.every(bed => bed.check_status === "Y");
//                 // const hasSomeY = bedList.some(bed => bed.check_status === "Y");
//                 return hasAllY ?  1 : 0;
//                 // const hasSomeY = bedList.some(bed => bed.check_status === "Y");
//                 // return hasAllY ? 2 : hasSomeY ? 1 : 0;
//             };
        
//             const aStatus = getStatusCategory(a.bed_list);
//             const bStatus = getStatusCategory(b.bed_list);
        
//             return aStatus - bStatus;
//         });
    
//         console.log('sortedArray', sortedArray);
//         return sortedArray;
//     }
// }

// 新的排序方式，帶API更新調整d_time後啟用=>update_time
// function sort_med_list_data(array, current_func) {
//     const key = current_func === "allocate" ? "dispens_status" : "check_status";

//     const getStatusCategory = (bedList, key) => {
//         const allY = bedList.every(bed => bed[key] === "Y");
//         const someY = bedList.some(bed => bed[key] === "Y");
//         if (allY) return 2;    // 全部是 Y → 最後
//         if (someY) return 1;   // 部分是 Y → 中間
//         return 0;              // 全部不是 Y → 最前
//     };

//     // 預先附加 group 給每筆資料
//     const taggedArray = array.map(item => {
//         const group = getStatusCategory(item.bed_list, key);
//         return { ...item, _group: group };
//     });

//     // 排序邏輯
//     const sortedArray = taggedArray
//         .slice()
//         .sort((a, b) => {
//             // group 先比
//             if (a._group !== b._group) {
//                 return a._group - b._group;
//             }

//             // group 相同時再排序
//             if (a._group === 0) {
//                 // group 0 再依 code 升冪排序
//                 return a.code.localeCompare(b.code);
//             } else {
//                 // 其他 group 依 update_time 降冪排序
//                 const timeA = a.update_time ? new Date(a.update_time) : new Date(0);
//                 const timeB = b.update_time ? new Date(b.update_time) : new Date(0);
//                 return timeB - timeA;
//             }
//         });

//     console.log('sortedArray', sortedArray);
//     return sortedArray;
// }

//  更新排序方式，字母排序完後分組、全部調劑組別依照時間排序
function sort_med_list_data(array, current_func) {
    const key = current_func === "allocate" ? "dispens_status" : "check_status";

    const getGroup = (bedList) => {
        const allY = bedList.every(bed => bed[key] === "Y");
        // const someY = bedList.some(bed => bed[key] === "Y");
        if (allY) return 2; // 全部是 Y → group 2（全部調劑）
        // if (someY) return 1; // 部分是 Y → group 1（部分調劑）
        return 0; // 都不是 Y → group 0（全部未調劑）
    };

    // 先根據 code 升冪排序
    const baseSorted = array.slice().sort((a, b) => a.name.localeCompare(b.name));

    console.log("藥碼排序", baseSorted);

    // 分組
    const group0 = [];
    const group1 = [];
    const group2 = [];

    for (const item of baseSorted) {
        const group = getGroup(item.bed_list);
        if (group === 0) group0.push(item);
        else if (group === 1) group1.push(item);
        else group2.push(item);
    }

    group0.sort((a, b) => {
        const aHasY = a.dispens_name == "Y" ? 1 : 0;
        const bHasY = b.dispens_name == "Y" ? 1 : 0;
        return bHasY - aHasY; // 有 Y 的排前面
    })
    // group2 裡用 update_time 降冪排序
    group2.sort((a, b) => {
        const timeA = a.update_time ? new Date(a.update_time) : new Date(0);
        const timeB = b.update_time ? new Date(b.update_time) : new Date(0);
        return timeB - timeA; // 降冪
    });

    // group2.sort((a, b) => {
    //     const aHasY = a.dispens_name == "Y" ? 1 : 0;
    //     const bHasY = b.dispens_name == "Y" ? 1 : 0;
    //     return bHasY - aHasY; // 有 Y 的排前面
    // });

    console.log("全調時間排序", group2);

    // 合併結果：未調劑 → 部分調劑 → 全部調劑（內部已依 update_time 降冪）
    const finalSorted = [...group0, ...group1, ...group2];

    console.log("sortedArray", finalSorted);
    return finalSorted;
}



function sort_display_med_data(arr) {
    // let temp_arr = arr.sort((a, b) => {
    //     const aHasLargeL = a.large === "L" ? 1 : 0;
    //     const bHasLargeL = b.large === "L" ? 1 : 0;
    //     return bHasLargeL - aHasLargeL; // 讓有 large: "L" 的排前面
    // });
    // let temp_arr = arr.sort((a, b) => a.name.localeCompare(b.name));
    // for (let i = 0; i < arr.length; i++) {
    //     const element = arr[i];
    //     if(element.dispens_name != "Y") {
    //         console.log("element.dispens_name", element.dispens_name);
    //         console.log("排除～～～～");
    //     }
    // }
    let temp_arr = arr;
    // let temp_arr = arr;
    let new_arr = [];

    temp_arr.forEach(element => {
        const data = element;

        const seen = new Set();
        const uniqueBedList = data.bed_list.filter(item => {
        if (seen.has(item.GUID)) {
            return false;
        }
        seen.add(item.GUID);
        return true;
        });

        // 將結果重新賦值回原本的資料物件中
        data.bed_list = uniqueBedList;
        new_arr.push(data);
    });

    console.log("排序過濾後", new_arr);

    return new_arr;
}
function set_med_table_filter_radio() {
    console.log(page_setting_params,"這邊要設定預設的調劑台+++++++++++++++++");
    if(page_setting_params.default_dps_qty) {
        console.log("藥品總量預設調劑台：", page_setting_params.default_dps_qty.value);
    }
    let head_med_table_filter_container = document.querySelector(".head_med_table_filter_container");
    head_med_table_filter_container.innerHTML = "";

    let all_input = document.createElement("input");
    all_input.className = "filter_med_table_input";
    all_input.name = "filter_med_table_input";
    all_input.type = "radio";
    all_input.value = "all";
    all_input.id = "filter_med_table_all";
    all_input.checked = true;
        if(page_setting_params.default_dps_qty) {
        if(page_setting_params.default_dps_qty.value) {
            let check_str = page_setting_params.default_dps_qty.value;
            let hasMatch = med_table.some(item => item.name == check_str);
            if(!hasMatch) {
                all_input.checked = true;
            }
        } else {
            all_input.checked = true;
        }
    }
    all_input.addEventListener("change", async (e) => {
        Set_main_div_enable(true);
        api_logger_add(`藥品總量：${current_cart.hnursta}更換調劑台${e.target.value}`, "click");
        let ppml_h_current_cart_select = document.querySelector(".ppml_h_current_cart_select");
        let ppml_main_container = document.querySelector(".ppml_main_container");
        med_list_data = await get_all_med_qty(current_pharmacy.phar, ppml_h_current_cart_select.value, e.target.value);
        med_list_data = med_list_data.Data;
        med_list_data = sort_med_list_data(med_list_data, current_func);
        med_list_data = sort_display_med_data(med_list_data);
        await set_pp_med_list_display();
        // ppml_main_container.scrollTop = 0;
        Set_main_div_enable(false);
    });

    let all_label = document.createElement("label");
    all_label.classList.add("filter_med_label");
    all_label.innerHTML = "全部";
    all_label.setAttribute("for", "filter_med_table_all");

    head_med_table_filter_container.appendChild(all_input);
    head_med_table_filter_container.appendChild(all_label);

    if(med_table.length == 0) return;

    med_table.forEach(element => {
        let input = document.createElement("input");
        input.className = "filter_med_table_input";
        input.name = "filter_med_table_input";
        input.type = "radio";
        input.value = element.name;
        input.id = `guid_${element.GUID}`;
        input.addEventListener("change", async (e) => {
            Set_main_div_enable(true);
            api_logger_add(`藥品總量：${current_cart.hnursta}更換調劑台${e.target.value}`, "click");
            let ppml_h_current_cart_select = document.querySelector(".ppml_h_current_cart_select");
            let ppml_main_container = document.querySelector(".ppml_main_container");
            med_list_data = await get_all_med_qty(current_pharmacy.phar, ppml_h_current_cart_select.value, e.target.value);
            med_list_data = med_list_data.Data;
            med_list_data = sort_med_list_data(med_list_data, current_func);
            med_list_data = sort_display_med_data(med_list_data);
            await set_pp_med_list_display();
            // ppml_main_container.scrollTop = 0;
            Set_main_div_enable(false);
        });
        
        if(page_setting_params.default_dps_qty) {
            if(page_setting_params.default_dps_qty.value) {
                let check_str = page_setting_params.default_dps_qty.value;
                let hasMatch = false;
                if(element.name == check_str) hasMatch = true;
                if(hasMatch) {
                    console.log("藥品總量預設調劑台：\n","調劑台名稱：",element.name , "\ncheck_str：", check_str, "\n配對成功：", hasMatch);
                    input.checked = true;
                }   
            }
        }



        let label = document.createElement("label");
        label.classList.add("filter_med_label");
        label.innerHTML = element.name;
        label.setAttribute("for", `guid_${element.GUID}`);

        head_med_table_filter_container.appendChild(input);
        head_med_table_filter_container.appendChild(label);
    });
}