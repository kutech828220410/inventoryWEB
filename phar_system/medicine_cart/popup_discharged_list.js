let popup_discharged_list_div;
let discharged_data = [];

function get_popup_discharged_list() {
    popup_discharged_list_div = new Basic_popup_Div('popup_discharged_list_div','popup_discharged_list_div','','');
    popup_discharged_list_div._popup_div.style.border = '10px solid white';

    let header = get_ppdl_header();
    let main = get_ppdl_main();
    let footer = get_ppdl_footer();

    popup_discharged_list_div.AddControl(header);
    popup_discharged_list_div.AddControl(main);
    popup_discharged_list_div.AddControl(footer);

    return popup_discharged_list_div;
};

function get_ppdl_header() {
    let ppdl_header_container = document.createElement("div");
    ppdl_header_container.classList.add("ppdl_header_container");

    let ppdl_h_title = document.createElement("div");
    ppdl_h_title.classList.add("ppdl_h_title");

    let ppdl_h_current_cart_select = document.createElement("select");
    ppdl_h_current_cart_select.classList.add("ppdl_h_current_cart_select");
    ppdl_h_current_cart_select.addEventListener("change", async (e) => {
        Set_main_div_enable(true);
        // if(current_cart && e.target.value != current_cart.hnursta) {
        //   e.target.value = current_cart.hnursta;
        // }
    
        post_data = {
          Value: "調劑台",
          ValueAry:  [current_pharmacy.phar, e.target.value]
        };
    
        console.log("出院處方退藥api",post_data);
        return_data = await get_patient_discharge(post_data);
        if(return_data.Code != 200) {
          alert("出院處方資料錯誤", return_data.Result);
        } else {  
            discharged_data = return_data.Data;
            set_discharged_data_display();
        }

        for (let i = 0; i < cart_list.length; i++) {
            const element = cart_list[i];
            if(element.hnursta == ppdl_h_current_cart_select.value) {
                current_cart = element;
                // let temp_logic = get_func_logic();
                // get_all_select_option_logic(temp_logic);
                
                // 根據選取的調劑台解鎖藥品
                if(current_med_table != "") {
                    console.log("切換調劑台");
                    await allocate_display_init("on");
                } else {
                    console.log("未選調劑台");
                    await allocate_display_init();
                }

                last_current_cart = current_cart;
                let cart_content = document.querySelector(".cart_select_container > .cart_content");
                cart_content.innerHTML = ppdl_h_current_cart_select.value;
                break;
            }
        }
        Set_main_div_enable(false);
    });

    let ppdl_h_title_content = document.createElement("div");
    ppdl_h_title_content.classList.add("ppdl_h_title_content");
    ppdl_h_title_content.innerHTML = `出院退藥`;

    ppdl_h_title.appendChild(ppdl_h_current_cart_select);
    ppdl_h_title.appendChild(ppdl_h_title_content);

    let ppdl_h_close_btn = document.createElement("img");
    ppdl_h_close_btn.classList.add("ppdl_h_close_btn");
    ppdl_h_close_btn.src = "../image/close.png";
    ppdl_h_close_btn.addEventListener("click", () => {
        popup_discharged_list_div_close();
    });

        let ppdl_head_sort_container = document.createElement("div");
    ppdl_head_sort_container.classList.add("ppdl_head_sort_container");

    let ppdl_head_sort_title = document.createElement("div");
    ppdl_head_sort_title.classList.add("ppdl_head_sort_title");
    ppdl_head_sort_title.innerHTML = "調劑台";

    let ppdl_head_med_table_filter_container = document.createElement("div");
    ppdl_head_med_table_filter_container.classList.add("ppdl_head_med_table_filter_container");

    ppdl_head_sort_container.appendChild(ppdl_head_sort_title)
    ppdl_head_sort_container.appendChild(ppdl_head_med_table_filter_container);

    ppdl_header_container.appendChild(ppdl_h_title);
    ppdl_header_container.appendChild(ppdl_h_close_btn);
    ppdl_header_container.appendChild(ppdl_head_sort_container);

    return ppdl_header_container;
}
function get_ppdl_main() {
    let ppdl_main_container = document.createElement("div");
    ppdl_main_container.classList.add("ppdl_main_container");

    return ppdl_main_container;
}
function get_ppdl_footer() {
    let ppdl_footer_container = document.createElement("div");
    ppdl_footer_container.classList.add("ppdl_footer_container");

    return ppdl_footer_container;
}
function popup_discharged_list_div_close() {
    check_cart_dispense();
    popup_discharged_list_div.Set_Visible(false);
}
async function popup_discharged_list_div_open() {
    await check_cart_dispense();
    if(!current_pharmacy.phar) {
        alert("請先選擇藥局");
        return;
    }
    
    popup_discharged_list_div.Set_Visible(true);
    Set_main_div_enable(false);
}

function set_discharged_data_display() {
    let ppdl_main_container = document.querySelector(".ppdl_main_container");
    if(Array.isArray(discharged_data)) {
        console.log("篩選前退要資料", discharged_data);
        // 執行篩選
        discharged_data = discharged_data
        .filter(item => Array.isArray(item.cpoe) && item.cpoe.length > 0) // 移除空 cpoe
        .map(item => {
        // 篩選出 dispens_status !== "Y" 的項目
        const filteredCpoe = item.cpoe.filter(cpoeItem => cpoeItem.dispens_status !== "Y");

        // 如果有保留的項目才更新 cpoe
        if (filteredCpoe.length > 0) {
            return { ...item, cpoe: filteredCpoe };
        }
        return null; // 如果全部 dispens_status 為 Y，也移除這筆
        })
        .filter(item => item !== null);

        console.log("資料長度", discharged_data.length);
        console.log("退藥資料", discharged_data);
        if(discharged_data.length > 0) {
            console.log("=========退藥料顯示==========");
            console.log(ppdl_main_container);
            ppdl_main_container.innerHTML = "";

            let ppdl_return_all_btn = document.createElement("div");
            ppdl_return_all_btn.classList.add("ppdl_return_all_btn");
            ppdl_return_all_btn.classList.add("btn");
            ppdl_return_all_btn.innerHTML = "護理站退藥";
            ppdl_return_all_btn.addEventListener("click", async () => {
                Set_main_div_enable(true);
                let ppdl_h_current_cart_select = document.querySelector(".ppdl_h_current_cart_select");
                let checkedRadio = document.querySelector('input[name="ppdl_filter_med_table_input"]:checked');
                let temp_table = checkedRadio.value;
                let ppdl_cpoe_med_check_btn = document.querySelectorAll(".ppdl_cpoe_med_check_btn");
                let ppdl_return_container = document.querySelectorAll(".ppdl_return_container");
                if(ppdl_return_container.length == 0) {
                    Set_main_div_enable(false);
                    return;
                }

                let guid_arr = [];
                ppdl_cpoe_med_check_btn.forEach(element => {
                    let temp_guid = element.getAttribute("guid");
                    guid_arr.push(temp_guid);
                });

                let loggedName = sessionStorage.getItem('login_json');
                loggedName = JSON.parse(loggedName);

                let post_data = {
                    ServerName: "",
                    ServerType: "",
                    UserName: loggedName.Name,
                    ValueAry: [guid_arr.join(";"), ppdl_h_current_cart_select.value]
                }

                if(temp_table != "all") {
                    post_data.ServerName = temp_table;
                    post_data.ServerType = "調劑台";
                }

                console.log("未條藥品總調劑", post_data);
                let return_data = await api_med_cart_dispensed_by_cart(post_data);

                if(return_data.Code != 200) {
                    alert("總調劑失敗", return_data.Result);
                    Set_main_div_enable(false);
                    return;
                }
                                
                post_data = {
                    Value: "調劑台",
                    ValueAry:  [current_pharmacy.phar, ppdl_h_current_cart_select.value]
                };
            
                console.log("出院處方退藥api", post_data);
                return_data = await get_patient_discharge(post_data);
                if(return_data.Code != 200) {
                    alert("出院處方資料錯誤", return_data.Result);
                    Set_main_div_enable(false);
                } else {
                    let loggedName = sessionStorage.getItem('login_json');
                    loggedName = JSON.parse(loggedName);
                    
                    let post_data2 = {
                        Data: [
                            {
                                op_id: loggedName.ID,
                                op_name: loggedName.Name
                            }
                        ],
                        ServerName: "",
                        ServerType: "",
                        ValueAry: [guid_arr.join(";")],
                        Value: "退藥"
                    }

                    console.log("退藥log post", post_data2);
                    await add_med_inventory_log(post_data2);

                    discharged_data = return_data.Data;
                    set_discharged_data_display();
                    Set_main_div_enable(false);
                }

                Set_main_div_enable(false);
            });

            ppdl_main_container.appendChild(ppdl_return_all_btn);

            discharged_data.forEach(element => {
                if(Array.isArray(element["cpoe"])) {
                    if(element["cpoe"].length > 0) {
                        let ppdl_return_container = document.createElement("div");
                        ppdl_return_container.classList.add("ppdl_return_container");
    
                        let ppdl_return_header = document.createElement("div");
                        ppdl_return_header.classList.add("ppdl_return_header");
    
                        let ppdl_bed_number_label = document.createElement("div");
                        ppdl_bed_number_label.classList.add("ppdl_bed_number_label");
                        if(element.bedStatus.status) {
                            if(element.bedStatus.status == "轉床") {
                                ppdl_bed_number_label.innerHTML = `${element.bednum} 床 - ${element.pnamec}（轉床：${element.bedStatus.bed_new}）`;
                            }
                        } else {
                            ppdl_bed_number_label.innerHTML = `${element.bednum} 床 - ${element.pnamec}（出院）`;
                        }
    
                        let ppdl_return_bed_all_btn = document.createElement("div");
                        ppdl_return_bed_all_btn.classList.add("ppdl_return_bed_all_btn");
                        ppdl_return_bed_all_btn.classList.add("btn");
                        ppdl_return_bed_all_btn.setAttribute("master_guid", element.GUID);
                        ppdl_return_bed_all_btn.innerHTML = "病床退藥";
                        ppdl_return_bed_all_btn.addEventListener("click", async () => {
                            Set_main_div_enable(true);
                            let guid_arr = [];
                            element["cpoe"].forEach(item => {
                                if(item.dispens_status != "Y") {
                                    guid_arr.push(item.GUID);
                                }
                            });

                            console.log("病床退藥按鈕", guid_arr, element.GUID);
                            if(guid_arr.length != 0) {
                                let return_data = await set_post_data_to_discharged_by_GUID(guid_arr, element.GUID);
    
                                if(return_data.Code == 200) {
                                    let ppdl_h_current_cart_select = document.querySelector(".ppdl_h_current_cart_select");
                                    
                                    post_data = {
                                        Value: "調劑台",
                                        ValueAry:  [current_pharmacy.phar, ppdl_h_current_cart_select.value]
                                    };
                                
                                    console.log("出院處方退藥api", post_data);
                                    return_data = await get_patient_discharge(post_data);
                                    if(return_data.Code != 200) {
                                        alert("出院處方資料錯誤", return_data.Result);
                                        Set_main_div_enable(false);
                                    } else {  
                                        discharged_data = return_data.Data;
                                        set_discharged_data_display();
                                        Set_main_div_enable(false);
                                    }
                                } else {
                                    alert("退藥失敗", return_data.Result);
                                    Set_main_div_enable(false);
                                }
                            } else {
                                alert("無可退藥項目", "請確認是否有可退藥項目");
                                Set_main_div_enable(false);
                            }
                        });
    
                        ppdl_return_header.appendChild(ppdl_bed_number_label);
                        ppdl_return_header.appendChild(ppdl_return_bed_all_btn);

                        ppdl_return_container.appendChild(ppdl_return_header);

                        element["cpoe"].forEach(item => {
                            if(item.dispens_status != "Y") {
                                let ppdl_med_card_container = document.createElement("div");
                                ppdl_med_card_container.classList.add("ppdl_med_card_container");

                                let ppdl_med_info_container = document.createElement("div");
                                ppdl_med_info_container.classList.add("ppdl_med_info_container");

                                let ppdl_med_name_label = document.createElement("div");
                                ppdl_med_name_label.classList.add("ppdl_med_name_label");
                                ppdl_med_name_label.innerHTML = item.name;

                                let ppdl_med_cht_name_label = document.createElement("div");
                                ppdl_med_cht_name_label.classList.add("ppdl_med_cht_name_label");
                                ppdl_med_cht_name_label.innerHTML = item.cht_name;

                                let ppdl_med_info_detail = document.createElement("div");
                                ppdl_med_info_detail.classList.add("ppdl_med_info_detail");

                                let ppdl_med_info_dunit = document.createElement("div");
                                ppdl_med_info_dunit.classList.add("ppdl_med_info_dunit");
                                ppdl_med_info_dunit.innerHTML = "單位：" + item.dunit;

                                let ppdl_med_info_storage = document.createElement("div");
                                ppdl_med_info_storage.classList.add("ppdl_med_info_storage");
                                ppdl_med_info_storage.innerHTML = "儲位：" + item.store_position;

                                let ppdl_med_info_qty = document.createElement("div");
                                ppdl_med_info_qty.classList.add("ppdl_med_info_qty");
                                ppdl_med_info_qty.innerHTML = "數量：" + item.qty;

                                ppdl_med_info_detail.appendChild(ppdl_med_info_dunit);
                                if(page_setting_params.med_unCheck_display_loc) {
                                    if(page_setting_params.med_unCheck_display_loc.value == "True") {
                                        ppdl_med_info_detail.appendChild(ppdl_med_info_storage);
                                    }
                                }
                                ppdl_med_info_detail.appendChild(ppdl_med_info_qty);

                                ppdl_med_info_container.appendChild(ppdl_med_name_label);
                                ppdl_med_info_container.appendChild(ppdl_med_cht_name_label);
                                ppdl_med_info_container.appendChild(ppdl_med_info_detail);

                                let ppdl_med_right_container = document.createElement("div");
                                ppdl_med_right_container.classList.add("ppdl_med_right_container");

                                let ppdl_cpoe_status = document.createElement("div");
                                ppdl_cpoe_status.classList.add("ppdl_cpoe_status");
                                ppdl_cpoe_status.textContent = item.status;
                    
                                let ppdl_cpoe_med_check_btn = document.createElement("div");
                                ppdl_cpoe_med_check_btn.classList.add("ppdl_cpoe_med_check_btn");
                                ppdl_cpoe_med_check_btn.classList.add("btn");
                                ppdl_cpoe_med_check_btn.setAttribute("GUID", item.GUID);
                                ppdl_cpoe_med_check_btn.setAttribute("Master_GUID", item.Master_GUID);
                                ppdl_cpoe_med_check_btn.innerHTML = "退藥";
                                ppdl_cpoe_med_check_btn.addEventListener("click", async () => {
                                    Set_main_div_enable(true);
                                    let guid_arr = [item.GUID];
                                    let master_guid = item.Master_GUID;
                                    console.log("退藥按鈕", guid_arr, master_guid);
                                    let return_data = await set_post_data_to_discharged_by_GUID(guid_arr, master_guid);
                                    if(return_data.Code == 200) {
                                        let ppdl_h_current_cart_select = document.querySelector(".ppdl_h_current_cart_select");
                                
                                        post_data = {
                                            Value: "調劑台",
                                            ValueAry:  [current_pharmacy.phar, ppdl_h_current_cart_select.value]
                                        };
                                    
                                        console.log("出院處方退藥api", post_data);
                                        return_data = await get_patient_discharge(post_data);
                                        if(return_data.Code != 200) {
                                            alert("出院處方資料錯誤", return_data.Result);
                                            Set_main_div_enable(false);
                                        } else {  
                                            discharged_data = return_data.Data;
                                            set_discharged_data_display();
                                            Set_main_div_enable(false);
                                        }
                                    } else {
                                        alert("退藥失敗", return_data.Result);
                                        Set_main_div_enable(false);
                                    }
                                });

                                ppdl_med_right_container.appendChild(ppdl_cpoe_status);
                                ppdl_med_right_container.appendChild(ppdl_cpoe_med_check_btn);

                                let ppdl_med_card_type = document.createElement("div");
                                // ppdl_med_card_type.classList.add("ppml_big_bottle");
                                if(item.ice == "Y" || item.large == "L") ppdl_med_card_type.classList.add("ppml_big_bottle");

                                ppdl_med_card_container.appendChild(ppdl_med_info_container);
                                ppdl_med_card_container.appendChild(ppdl_med_card_type);
                                ppdl_med_card_container.appendChild(ppdl_med_right_container);

                                ppdl_return_container.appendChild(ppdl_med_card_container);
                            }
                        });
        
                        ppdl_main_container.appendChild(ppdl_return_container);
                    }
                }
            });

        } else {
            ppdl_main_container.innerHTML = `<span class="ppdl_span_main_content">無需退藥</span>`;
        }
    } else {
        ppdl_main_container.innerHTML = `<span class="ppdl_span_main_content">資料格式有誤</span>`;
    }
}

async function set_post_data_to_discharged_by_GUID(guid_arr, master_guid) {
    let loggedName = sessionStorage.getItem('login_json');
    loggedName = JSON.parse(loggedName);
    let checkedRadio = document.querySelector('input[name="ppdl_filter_med_table_input"]:checked');
    let temp_table = checkedRadio.value;
    let return_data;
    let temp_str = "";
    temp_str = guid_arr.join(";");

    let post_data = {
        ServerName: "",
        ServerType: "",
        UserName: loggedName.Name,
        ValueAry: []
    };

    post_data.ValueAry[0] = temp_str;
    post_data.ValueAry[1] = master_guid;

    if(temp_table != "all") {
        post_data.ServerName = temp_table;
        post_data.ServerType = "調劑台";
    }

    console.log("退藥調劑post_data", post_data);

    return_data = await api_med_cart_dispensed_by_GUID(post_data);

    let post_data2 = {
        Data: [
            {
                op_id: loggedName.ID,
                op_name: loggedName.Name
            }
        ],
        ServerName: "",
        ServerType: "",
        ValueAry: [guid_arr.join(";")],
        Value: "退藥"
    }

    console.log("退藥log post", post_data2);
    await add_med_inventory_log(post_data2);

    return return_data;
};

function ppdl_set_med_table_filter_radio() {
    let head_med_table_filter_container = document.querySelector(".ppdl_head_med_table_filter_container");
    head_med_table_filter_container.innerHTML = "";

    let all_input = document.createElement("input");
    all_input.className = "ppdl_filter_med_table_input";
    all_input.name = "ppdl_filter_med_table_input";
    all_input.type = "radio";
    all_input.value = "all";
    all_input.id = "ppdl_filter_med_table_all";
    all_input.checked = true;
    // all_input.addEventListener("change", async (e) => {
    //     let ppml_main_container = document.querySelector(".ppml_main_container");
    //     med_list_data = await get_all_med_qty(current_pharmacy.phar, current_cart.hnursta, e.target.value);
    //     med_list_data = med_list_data.Data;
    //     med_list_data = sort_med_list_data(med_list_data, current_func);
    //     med_list_data = sort_display_med_data(med_list_data);
    //     await set_pp_med_list_display();
    //     ppml_main_container.scrollTop = 0;
    // });

    let all_label = document.createElement("label");
    all_label.classList.add("ppdl_filter_med_label");
    all_label.innerHTML = "全部";
    all_label.setAttribute("for", "ppdl_filter_med_table_all");

    head_med_table_filter_container.appendChild(all_input);
    head_med_table_filter_container.appendChild(all_label);

    if(med_table.length == 0) return;

    med_table.forEach(element => {
        let input = document.createElement("input");
        input.className = "ppdl_filter_med_table_input";
        input.name = "ppdl_filter_med_table_input";
        input.type = "radio";
        input.value = element.name;
        input.id = `ppdl_guid_${element.GUID}`;
        // input.addEventListener("change", async (e) => {
        //     let ppml_main_container = document.querySelector(".ppml_main_container");
        //     med_list_data = await get_all_med_qty(current_pharmacy.phar, current_cart.hnursta, e.target.value);
        //     med_list_data = med_list_data.Data;
        //     med_list_data = sort_med_list_data(med_list_data, current_func);
        //     med_list_data = sort_display_med_data(med_list_data);
        //     await set_pp_med_list_display();
        //     ppml_main_container.scrollTop = 0;
        // });

        let label = document.createElement("label");
        label.classList.add("ppdl_filter_med_label");
        label.innerHTML = element.name;
        label.setAttribute("for", `ppdl_guid_${element.GUID}`);

        head_med_table_filter_container.appendChild(input);
        head_med_table_filter_container.appendChild(label);
    });
}