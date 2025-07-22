let popup_med_change_list_div;

function get_popup_med_change_list() {
    popup_med_change_list_div = new Basic_popup_Div('popup_med_change_list_div','popup_med_change_list_div','','');
    popup_med_change_list_div._popup_div.style.border = '10px solid white';

    let header = get_ppmcl_header();
    let main = get_ppmcl_main();
    let footer = get_ppmcl_footer();

    popup_med_change_list_div.AddControl(header);
    popup_med_change_list_div.AddControl(main);
    popup_med_change_list_div.AddControl(footer);

    return popup_med_change_list_div;
};
function get_ppmcl_header() {
    let ppmcl_header_container = document.createElement("div");
    ppmcl_header_container.classList.add("ppmcl_header_container");

    let ppmcl_h_title = document.createElement("div");
    ppmcl_h_title.classList.add("ppmcl_h_title");

    let ppmcl_h_current_cart_select = document.createElement("select");
    ppmcl_h_current_cart_select.classList.add("ppmcl_h_current_cart_select");
    ppmcl_h_current_cart_select.addEventListener("change", async () => {
        Set_main_div_enable(true);
        // last_med_change_list_n = ppmcl_h_current_cart_select.value;

        let post_data = [current_pharmacy.phar, ppmcl_h_current_cart_select.value];
        console.log(post_data);
        if(current_func == "allocate") {
            med_change_data = await get_patient_with_NOdispense(post_data);
            med_change_data = med_change_data.Data;
    
            // med_change_data = med_change_data.filter((e) => {
            //     return e.cpoe_change_status != "";
            // });
        } else {
            med_change_data = await get_patient_with_NOcheck(post_data);
            med_change_data = med_change_data.Data;
        }

        console.log(med_change_data);
    
        med_change_data = med_change_data.filter((e) => {
            return Array.isArray(e.cpoe) && e.cpoe.length != 0;
        });
    
        console.log(med_change_data);
    
        if(med_change_data.length > 0) {
            med_change_data.sort((a, b) => +a.bednum - +b.bednum);
        }
    
        console.log("++++++++++++++++++++", med_change_data);
        await set_ppmcl_main_info();
        
        // popup_med_change_list_div.Set_Visible(true);
        Set_main_div_enable(false);

        let ppdl_h_current_cart_select = document.querySelector(".ppdl_h_current_cart_select");

        for (let i = 0; i < cart_list.length; i++) {
            const element = cart_list[i];
            if(element.hnursta == ppmcl_h_current_cart_select.value) {
                current_cart = element;
                // let temp_logic = get_func_logic();
                // get_all_select_option_logic(temp_logic);
                
                // 根據選取的調劑台解鎖藥品
                if(current_med_table != "") {
                    console.log("切換調劑台");
                    patient_bed_index = -1;
                    await allocate_display_init("on");
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
                cart_content.innerHTML = ppmcl_h_current_cart_select.value;
                break;
            }
        }
        // 檢測有無退藥
        Set_main_div_enable(true);
        let test_data_arr = await check_cart_dispense();
        if(test_data_arr.length > 0 && test_data_arr.includes(ppmcl_h_current_cart_select.value)) {
            post_data = {
            Value: "調劑台",
            ValueAry:  [current_pharmacy.phar, ppmcl_h_current_cart_select.value]
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

                        ppdl_h_current_cart_select.value = ppmcl_h_current_cart_select.value;

                        set_discharged_data_display();
                        Set_main_div_enable(false);
                        popup_med_change_list_div_close();
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

    let ppmcl_h_title_content = document.createElement("div");
    ppmcl_h_title_content.classList.add("ppmcl_h_title_content");
    ppmcl_h_title_content.innerHTML = `未調藥品`;

    ppmcl_h_title.appendChild(ppmcl_h_current_cart_select);
    ppmcl_h_title.appendChild(ppmcl_h_title_content);

    let ppmcl_h_close_btn = document.createElement("img");
    ppmcl_h_close_btn.classList.add("ppmcl_h_close_btn");
    ppmcl_h_close_btn.src = "../image/close.png";
    ppmcl_h_close_btn.addEventListener("click", () => {
        popup_med_change_list_div_close();
    });

    let ppmcl_head_sort_container = document.createElement("div");
    ppmcl_head_sort_container.classList.add("ppmcl_head_sort_container");

    let ppmcl_head_sort_title = document.createElement("div");
    ppmcl_head_sort_title.classList.add("ppmcl_head_sort_title");
    ppmcl_head_sort_title.innerHTML = "調劑台";

    let ppmcl_head_med_table_filter_container = document.createElement("div");
    ppmcl_head_med_table_filter_container.classList.add("ppmcl_head_med_table_filter_container");

    ppmcl_head_sort_container.appendChild(ppmcl_head_sort_title)
    ppmcl_head_sort_container.appendChild(ppmcl_head_med_table_filter_container);

    ppmcl_header_container.appendChild(ppmcl_h_title);
    ppmcl_header_container.appendChild(ppmcl_h_close_btn);
    ppmcl_header_container.appendChild(ppmcl_head_sort_container);

    return ppmcl_header_container;
}
function get_ppmcl_main() {
    let ppmcl_main_container = document.createElement("div");
    ppmcl_main_container.classList.add("ppmcl_main_container");

    return ppmcl_main_container;
}
function get_ppmcl_footer() {
    let ppmcl_footer_container = document.createElement("div");
    ppmcl_footer_container.classList.add("ppmcl_footer_container");

    return ppmcl_footer_container;
}
function popup_med_change_list_div_close() {
    popup_med_change_list_div.Set_Visible(false);
    check_cart_dispense();
}
async function popup_med_change_list_div_open() {
    await check_cart_dispense();
    if(!current_pharmacy.phar) {
        alert("請先選擇藥局");
        return;
    }
    if(current_func == "" || current_func == "deliver") {
        alert("請選擇調劑 / 覆核");
        return;    
    }

    let ppmcl_h_current_cart_select = document.querySelector(".ppmcl_h_current_cart_select");
    if(current_cart.hnursta && ppmcl_h_current_cart_select.value != current_cart.hnursta) {
        ppmcl_h_current_cart_select.value = current_cart.hnursta;
    }
    // if(last_med_change_list_n == "") {

    //     last_med_change_list_n = ppmcl_h_current_cart_select.value
    // } else {
    //     last_med_change_list_n = ppmcl_h_current_cart_select.value
    // }

    Set_main_div_enable(true);
    let post_data = [current_pharmacy.phar, ppmcl_h_current_cart_select.value];
    console.log(post_data);
    if(current_func == "allocate") {
        med_change_data = await get_patient_with_NOdispense(post_data);
        med_change_data = med_change_data.Data;

        // med_change_data = med_change_data.filter((e) => {
        //     return e.cpoe_change_status != "";
        // });
    } else {
        console.log("==-=-=-=-=-=-=-=-==", "這邊撈覆核");
        med_change_data = await get_patient_with_NOcheck(post_data);
        med_change_data = med_change_data.Data;
    }

    console.log(med_change_data);

    med_change_data = med_change_data.filter((e) => {
        return Array.isArray(e.cpoe) && e.cpoe.length != 0;
    });

    console.log(med_change_data);

    if(med_change_data.length > 0) {
        med_change_data.sort((a, b) => +a.bednum - +b.bednum);
    }

    console.log("++++++++++++++++++++", med_change_data);
    await set_ppmcl_main_info();
    
    popup_med_change_list_div.Set_Visible(true);
    Set_main_div_enable(false);

    let ppdl_h_current_cart_select = document.querySelector(".ppdl_h_current_cart_select");
    // 檢測有無退藥
    console.log("============ 檢查退藥中 =============");
    Set_main_div_enable(true);
    console.log("檢測退藥資料中");
    let test_data_arr = await check_cart_dispense();
    if(test_data_arr.length > 0 && test_data_arr.includes(ppmcl_h_current_cart_select.value)) {
        post_data = {
        Value: "調劑台",
        ValueAry:  [current_pharmacy.phar, ppmcl_h_current_cart_select.value]
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

                    ppdl_h_current_cart_select.value = ppmcl_h_current_cart_select.value;

                    set_discharged_data_display();
                    Set_main_div_enable(false);
                    console.log("============ 檢查退藥完成 =============");
                    popup_med_change_list_div_close();
                    popup_discharged_list_div_open();
                } else {
                    Set_main_div_enable(false);
                    console.log("============ 檢查退藥完成 =============");
                }
            }
        }        
    } else {
        console.log("============ 檢查退藥完成 =============");
        Set_main_div_enable(false);
    }
    console.log("開啟退藥彈窗");
}

async function set_ppmcl_main_info() {
    let ppmcl_main_container = document.querySelector(".ppmcl_main_container");
    let ppmcl_h_current_cart_select = document.querySelector(".ppmcl_h_current_cart_select");
    console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-");
    ppmcl_main_container.innerHTML = "";
    console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-");
    if(med_change_data.length == 0) {
        ppmcl_main_container.innerHTML = `<div class="ppmcl_main_no_info">${ppmcl_h_current_cart_select.value} 處方無異動</div>`;
        return;
    }

    let med_change_all_check_btn = document.createElement("div");
    med_change_all_check_btn.classList.add("med_change_all_check_btn");
    med_change_all_check_btn.classList.add("btn");
    if(current_func == "allocate") {
        med_change_all_check_btn.innerHTML = "全部異動調劑";
        med_change_all_check_btn.addEventListener("click", async () => {
            if(confirm("是否調劑所有異動？")) {
                Set_main_div_enable(true);
                let ppmcl_cpoe_med_check_btn = document.querySelectorAll(".ppmcl_cpoe_med_check_btn");
                let ppmcl_bed_card_container = document.querySelectorAll(".ppmcl_bed_card_container");
                if(ppmcl_bed_card_container.length == 0) {
                    Set_main_div_enable(false);
                    return;
                }

                let guid_arr = [];
                ppmcl_cpoe_med_check_btn.forEach(element => {
                    let temp_guid = element.getAttribute("guid");
                    guid_arr.push(temp_guid);
                });

                let checkedRadio = document.querySelector('input[name="ppmcl_filter_med_table_input"]:checked');
                let temp_table = checkedRadio.value;
                let loggedName = sessionStorage.getItem('login_json');
                loggedName = JSON.parse(loggedName);

                let post_data = {
                    ServerName: "",
                    ServerType: "",
                    UserName: loggedName.Name,
                    ValueAry: [guid_arr.join(";"), ppmcl_h_current_cart_select.value]
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

                console.log("未條藥品總調劑", post_data);
                console.log("未條藥品總調劑log", post_data2);
                let return_data = await api_med_cart_dispensed_by_cart(post_data);

                if(return_data.Code != 200) {
                    alert("總調劑失敗", return_data.Result);
                    Set_main_div_enable(false);
                    return;
                }
                
                show_popup_notice(return_data.Result, true)

                await add_med_inventory_log(post_data2);

                post_data = [current_pharmacy.phar, ppmcl_h_current_cart_select.value];
                console.log(post_data);
            
                med_change_data = await get_patient_with_NOdispense(post_data);
                med_change_data = med_change_data.Data;
                med_change_data = med_change_data.filter((e) => {
                    return e.cpoe_change_status != "";
                });
            
                console.log(med_change_data);
            
                med_change_data = med_change_data.filter((e) => {
                    return e.cpoe.length != 0;
                });
            
                console.log(med_change_data);
            
                if(med_change_data.length > 0) {
                    med_change_data.sort((a, b) => +a.bednum - +b.bednum);
                }
            
                console.log("++++++++++++++++++++", med_change_data);
                await set_ppmcl_main_info();

                Set_main_div_enable(false);
            }
        });
    } else {
        med_change_all_check_btn.innerHTML = "全部異動覆核";
        med_change_all_check_btn.addEventListener("click", async () => {
            if(confirm("是否覆核所有異動？")) {
                Set_main_div_enable(true);
                let ppmcl_cpoe_med_check_btn = document.querySelectorAll(".ppmcl_cpoe_med_check_btn");
                let ppmcl_bed_card_container = document.querySelectorAll(".ppmcl_bed_card_container");
                if(ppmcl_bed_card_container.length == 0) {
                    Set_main_div_enable(false);
                    return;
                }

                let guid_arr = [];
                ppmcl_cpoe_med_check_btn.forEach(element => {
                    let temp_guid = element.getAttribute("guid");
                    guid_arr.push(temp_guid);
                });

                let checkedRadio = document.querySelector('input[name="ppmcl_filter_med_table_input"]:checked');
                let temp_table = checkedRadio.value;
                let loggedName = sessionStorage.getItem('login_json');
                loggedName = JSON.parse(loggedName);

                let post_data = {
                    ServerName: "",
                    ServerType: "",
                    UserName: loggedName.Name,
                    ValueAry: [guid_arr.join(";"), ppmcl_h_current_cart_select.value]
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

                console.log("未條藥品總調劑", post_data);
                console.log("未條藥品總調劑log", post_data2);
                let return_data = await api_med_cart_check_by_cart(post_data);
                if(return_data.Code == 200) {
                    show_popup_notice(return_data.Result, true);

                    await add_med_inventory_log(post_data2);
                    
                    post_data = [current_pharmacy.phar, ppmcl_h_current_cart_select.value];
                    console.log(post_data);
                    if(current_func == "allocate") {
                        med_change_data = await get_patient_with_NOdispense(post_data);
                        med_change_data = med_change_data.Data;
                
                        med_change_data = med_change_data.filter((e) => {
                            return e.cpoe_change_status != "";
                        });
                
                    } else {
                        med_change_data = await get_patient_with_NOcheck(post_data);
                        med_change_data = med_change_data.Data;
                    }
                
                    console.log(med_change_data);
                
                    med_change_data = med_change_data.filter((e) => {
                        return Array.isArray(e.cpoe) && e.cpoe.length != 0;
                    });
                
                    console.log(med_change_data);
                
                    if(med_change_data.length > 0) {
                        med_change_data.sort((a, b) => +a.bednum - +b.bednum);
                    }
                
                    console.log("++++++++++++++++++++", med_change_data);
                    await set_ppmcl_main_info();
                    Set_main_div_enable(false);
                } else {
                    show_popup_notice(return_data.Result, false);
                    Set_main_div_enable(false);
                }
            }
        });
    }

    ppmcl_main_container.appendChild(med_change_all_check_btn);

    let temp_count_bed = 0;

    med_change_data.forEach(element => {
        let ppmcl_bed_card_container = document.createElement("div");
        ppmcl_bed_card_container.classList.add("ppmcl_bed_card_container");
        ppmcl_bed_card_container.setAttribute("Master_Guid", element.GUID);

        let ppmcl_bed_name_container = document.createElement("div");
        ppmcl_bed_name_container.classList.add("ppmcl_bed_name_container");

        let ppmcl_bed_name_title = document.createElement("div");
        ppmcl_bed_name_title.classList.add("ppmcl_bed_name_title");
        ppmcl_bed_name_title.innerHTML = `${element.bednum} 床 - ${element.pnamec}`;
        ppmcl_bed_name_title.addEventListener("click", async () => {
            let cart_content = document.querySelector(".cart_content");
            let ppmcl_h_current_cart_select = document.querySelector(".ppmcl_h_current_cart_select");

            if(current_cart.hnursta != ppmcl_h_current_cart_select.value) {
                for (let index = 0; index < cart_list.length; index++) {
                    const element = cart_list[index];
                    
                    if(ppmcl_h_current_cart_select.value == element.hnursta) {
                        cart_content.innerHTML = element.hnursta;
                        current_cart = element;
                        med_cart_beds_data = await get_bed_list_by_cart(current_pharmacy.phar, current_cart.hnursta);
                        med_cart_beds_data = med_cart_beds_data.Data;
                        break;
                    }
                }
            }
            let temp_index = -1;
            for (let index = 0; index < med_cart_beds_data.length; index++) {
                const item = med_cart_beds_data[index];
                if(item.bednum == element.bednum) {
                    temp_index = index;
                    break;
                }
            }

            if(temp_index == patient_bed_index) {
                alert("已經是目前床位"); 
                return;
            } else {
                Set_main_div_enable(true);
            
                last_patient_bed_index = patient_bed_index;
                patient_bed_index = temp_index;
            
                allocate_display_init("");
                popup_med_change_list_div_close();
            }
        });

        let ppmcl_bed_name_all_btn = document.createElement("div");
        ppmcl_bed_name_all_btn.classList.add("ppmcl_bed_name_all_btn");
        ppmcl_bed_name_all_btn.classList.add("btn");
        if(current_func == "allocate") {
            ppmcl_bed_name_all_btn.innerHTML = `全部調劑`;
        } else {
            ppmcl_bed_name_all_btn.innerHTML = `全部覆核`;
        }
        ppmcl_bed_name_all_btn.setAttribute("Master_GUID", element.GUID);
        ppmcl_bed_name_all_btn.addEventListener("click", async () => {
            if(current_func == "allocate") {
                if(confirm(`${element.bednum} 號病床處方異動調劑確認`)) {
                    Set_main_div_enable(true);
                    let temp_guid_arr = [];
    
                    let post_data = [current_pharmacy.phar, ppmcl_h_current_cart_select.value];
                    console.log(post_data);
                
                    med_change_data = await get_patient_with_NOdispense(post_data);
                    med_change_data = med_change_data.Data;
                
                    med_change_data = med_change_data.filter((item) => {
                        return Array.isArray(item["cpoe"]) && item["cpoe"].length != 0;
                    });
    
                    let temp_result = med_change_data.find(item => item.GUID === element.GUID);
                
                    console.log(med_change_data);
                    console.log(temp_result);

                    if(!temp_result) {
                        alert("資料異常，請重新整理");
                        return;
                    }
    
                    for (let index = 0; index < temp_result.cpoe.length; index++) {
                        const item = temp_result.cpoe[index];
                        if(item.dispens_status == "") {
                            temp_guid_arr.push(item.GUID);
                        }
                    };
    
                    let return_data = await set_post_data_to_dispensed_by_GUID(temp_guid_arr, element.GUID);
                    console.log("***************************", return_data);
                    return_data = return_data.Data;
                    
                    if(Array.isArray(return_data)) {
                        return_data.forEach(item => {
                            if(item.dispens_status == "Y") {
                                let ppmcl_cpoe_container = document.querySelector(`.ppmcl_cpoe_container[guid="${item.GUID}"]`);
                                let ppmcl_cpoe_more_container = document.querySelectorAll(`.ppmcl_cpoe_container[check_more="Y"]`);

                                ppmcl_cpoe_more_container.forEach(object => {
                                    let guid = object.getAttribute("guid");
                                    console.log(object);
                                    console.log("這邊有沒有多個處方", guid);
                                    let guid_arr = guid.split(";");
                                    if(guid_arr.includes(item.GUID)) {
                                        object.remove();
                                    }
                                });

                                if(ppmcl_cpoe_container) {
                                    ppmcl_cpoe_container.remove();
                                }
                            }
                        });
        
                        let allDispensStatusY = return_data.every(item => item.dispens_status === "Y");
        
                        // // 判斷該床是否還有處方，若沒有處方則所有床位消失
                        if(allDispensStatusY) {
                            let ppmcl_bed_card = document.querySelector(`.ppmcl_bed_card[Master_Guid="${element.GUID}"]`);
                            let ppmcl_bed_card_container = document.querySelector(`.ppmcl_bed_card_container[Master_Guid="${element.GUID}"]`);
            
                            console.log(ppmcl_bed_card.clientHeight == 0);
            
                            if(ppmcl_bed_card.clientHeight == 0) {
                                if (ppmcl_bed_card_container) {
                                    ppmcl_bed_card_container.remove();
                                }
                            }
                        }

                        post_data = [current_pharmacy.phar, ppmcl_h_current_cart_select.value];
                        console.log(post_data);
                        if(current_func == "allocate") {
                            med_change_data = await get_patient_with_NOdispense(post_data);
                            med_change_data = med_change_data.Data;
                    
                            med_change_data = med_change_data.filter((e) => {
                                return e.cpoe_change_status != "";
                            });
                    
                        } else {
                            med_change_data = await get_patient_with_NOcheck(post_data);
                            med_change_data = med_change_data.Data;
                        }
                    
                        console.log(med_change_data);
                    
                        med_change_data = med_change_data.filter((e) => {
                            return Array.isArray(e.cpoe) && e.cpoe.length != 0;
                        });
                    
                        console.log(med_change_data);
                    
                        if(med_change_data.length > 0) {
                            med_change_data.sort((a, b) => +a.bednum - +b.bednum);
                        }
                    
                        console.log("++++++++++++++++++++", med_change_data);
                    }
    
                    Set_main_div_enable(false);
                }
            } else {
                if(confirm(`${element.bednum} 號病床處方異動覆核確認`)) {
                    Set_main_div_enable(true);
                    let temp_guid_arr = [];

                    element["cpoe"].forEach(item => {       
                        if(item.dispens_status == "Y" && item.check_status != "Y") {
                            temp_guid_arr.push(item.GUID);
                        }
                    });

                    console.log(temp_guid_arr);

                    let loggedName = sessionStorage.getItem('login_json');
                    loggedName = JSON.parse(loggedName);

                    let post_data = {
                        ServerName: "",
                        ServerType: "",
                        UserName: loggedName.Name,
                        ValueAry: [temp_guid_arr.join(";"), ppmcl_h_current_cart_select.value]
                    }

                    // if(temp_table != "all") {
                    //     post_data.ServerName = temp_table;
                    //     post_data.ServerType = "調劑台";
                    // }

                    console.log("藥品異動逐床全部複合post_data", post_data);
                    let return_data = await api_med_cart_check_by_cart(post_data);
                    if(return_data.Code == 200) {
                        temp_guid_arr.forEach(item => {
                            let ppmcl_cpoe_container = document.querySelector(`.ppmcl_cpoe_container[guid="${item}"]`);

                            let ppmcl_cpoe_more_container = document.querySelectorAll(`.ppmcl_cpoe_container[check_more="Y"]`);

                            ppmcl_cpoe_more_container.forEach(object => {
                                let guid = object.getAttribute("guid");
                                console.log(object);
                                console.log("這邊有沒有多個處方", guid);
                                let guid_arr = guid.split(";");
                                if(guid_arr.includes(item.GUID)) {
                                    object.remove();
                                }
                            });

                            if (ppmcl_cpoe_container) {
                                ppmcl_cpoe_container.remove();
                            }
                        });

                        console.log(ppmcl_bed_card.clientHeight == 0);
            
                        if(ppmcl_bed_card.clientHeight == 0) {
                            ppmcl_bed_card_container.remove();
                        }
                    }

                    let post_data2 = {
                        Data: [
                            {
                                op_id: loggedName.ID,
                                op_name: loggedName.Name
                            }
                        ],
                        ServerName: "",
                        ServerType: "",
                        ValueAry: [temp_guid_arr.join(";")],
                        Value: ""
                    }
                    // if(current_med_table != "all") {
                    //     post_data2.ServerName = current_med_table.name;
                    //     post_data2.ServerType = current_med_table.type;
                    // }
            
                    if(current_func == "allocate") {
                        post_data2.Value = "調劑"
                    } else if(current_func == "review") {
                        post_data2.Value = "覆核"
                    }
                
                    if(return_data.Code == 200) {
                        show_popup_notice(return_data.Result, true);
                        await add_med_inventory_log(post_data2);
                        console.log("藥品異動逐床全部複合post_data2", post_data2);
                    } else {
                        show_popup_notice(return_data.Result, false);
                    }

                    
                    post_data = [current_pharmacy.phar, ppmcl_h_current_cart_select.value];
                    console.log(post_data);
                    if(current_func == "allocate") {
                        med_change_data = await get_patient_with_NOdispense(post_data);
                        med_change_data = med_change_data.Data;
                
                        med_change_data = med_change_data.filter((e) => {
                            return e.cpoe_change_status != "";
                        });
                
                    } else {
                        med_change_data = await get_patient_with_NOcheck(post_data);
                        med_change_data = med_change_data.Data;
                    }
                
                    console.log(med_change_data);
                
                    med_change_data = med_change_data.filter((e) => {
                        return Array.isArray(e.cpoe) && e.cpoe.length != 0;
                    });
                
                    console.log(med_change_data);
                
                    if(med_change_data.length > 0) {
                        med_change_data.sort((a, b) => +a.bednum - +b.bednum);
                    }
                
                    console.log("++++++++++++++++++++", med_change_data);
                    
                    Set_main_div_enable(false);
                }
            }
        });

        let ppmcl_bed_name_info_container = document.createElement("div");
        ppmcl_bed_name_info_container.classList.add("ppmcl_bed_name_info_container");

        let ppmcl_bed_name_old_bed = document.createElement("div");
        ppmcl_bed_name_old_bed.classList.add("ppmcl_bed_name_old_bed");
        if(element.bedStatus) {
            if (Object.keys(element.bedStatus).length !== 0) {
                ppmcl_bed_name_old_bed.innerHTML = `從 ${element.bedStatus.bed_old} 轉入`;
            }
        } else {
            console.log("沒有收到轉出床位資料，element.bedStatus：", element.bedStatus);
        }

        ppmcl_bed_name_info_container.appendChild(ppmcl_bed_name_title);
        if(element.bedStatus) {
            if (Object.keys(element.bedStatus).length !== 0) {
                ppmcl_bed_name_info_container.appendChild(ppmcl_bed_name_old_bed);
            }
        }

        ppmcl_bed_name_container.appendChild(ppmcl_bed_name_info_container);
        ppmcl_bed_name_container.appendChild(ppmcl_bed_name_all_btn);

        let ppmcl_bed_card = document.createElement("div");
        ppmcl_bed_card.classList.add("ppmcl_bed_card");
        ppmcl_bed_card.setAttribute("Master_Guid", element.GUID);

        // let temp_cpoe = element.cpoe.filter(e => {
        //     return e.dispens_change == "Y";
        // });
        let temp_cpoe = element.cpoe;

        // console.log(temp_cpoe);

        temp_cpoe.forEach(item => {
            // if(item.dispens_change != "") {};
            //  && item.dispens_change != "":
            
            if(temp_cpoe.length > 0) {
                let ppmcl_cpoe_container = document.createElement("div");
                ppmcl_cpoe_container.classList.add("ppmcl_cpoe_container");
                ppmcl_cpoe_container.setAttribute("GUID", item.GUID);
                ppmcl_cpoe_container.setAttribute("Master_GUID", item.Master_GUID);
                let check_more_arr = item.GUID.split(";");
                if(check_more_arr.length > 1) {
                    ppmcl_cpoe_container.setAttribute("check_more", "Y");
                }

                let ppmcl_light_container = document.createElement("div");
                ppmcl_light_container.classList.add("ppmcl_light_container");

                let ppmcl_light_btn = document.createElement("div");
                ppmcl_light_btn.classList.add("ppmcl_light_btn");
                ppmcl_light_btn.innerHTML = "亮燈";
                ppmcl_light_btn.addEventListener("click", async () => {
                    let checkedRadio = document.querySelector('input[name="ppmcl_filter_med_table_input"]:checked');
                    if(checkedRadio.value != "all") {
                        await light_on_func(item.code, checkedRadio.value, "調劑台");
                    } else {
                        alert("請彈窗上方選擇調劑台");
                    }
                });
    
                let ppmcl_cpoe_med_info_container = document.createElement("div");
                ppmcl_cpoe_med_info_container.classList.add("ppmcl_cpoe_med_info_container");
    
                let ppmcl_cpoe_name = document.createElement("div");
                ppmcl_cpoe_name.classList.add("ppmcl_cpoe_name");
                ppmcl_cpoe_name.innerHTML = item.name;
    
                let ppmcl_cpoe_cht_name = document.createElement("div");
                ppmcl_cpoe_cht_name.classList.add("ppmcl_cpoe_cht_name");
                ppmcl_cpoe_cht_name.innerHTML = item.cht_name;
    
                let ppmcl_cpoe_med_info2 = document.createElement("div");
                ppmcl_cpoe_med_info2.classList.add("ppmcl_cpoe_med_info2");
    
                let ppmcl_cpoe_dunit = document.createElement("div");
                ppmcl_cpoe_dunit.classList.add("ppmcl_cpoe_dunit");
                ppmcl_cpoe_dunit.innerHTML = `單位：${item.dunit}`;

                let ppmcl_cpoe_storage = document.createElement("div");
                ppmcl_cpoe_storage.classList.add("ppmcl_cpoe_storage");
                ppmcl_cpoe_storage.innerHTML = `儲位：${item.store_position}`;

                let ppmcl_cpoe_ordseq = document.createElement("div");
                ppmcl_cpoe_ordseq.classList.add("ppmcl_cpoe_ordseq");
                ppmcl_cpoe_ordseq.innerHTML = `序號：${item.ordseq}`;

                let ppmcl_cpoe_dosage = document.createElement("div");
                ppmcl_cpoe_dosage.classList.add("ppmcl_cpoe_dosage");
                ppmcl_cpoe_dosage.innerHTML = `劑量：${item.dosage}`;

                let ppmcl_cpoe_freqn = document.createElement("div");
                ppmcl_cpoe_freqn.classList.add("ppmcl_cpoe_freqn");
                ppmcl_cpoe_freqn.innerHTML = `頻次：${item.freqn}`;

                let ppmcl_cpoe_route = document.createElement("div");
                ppmcl_cpoe_route.classList.add("ppmcl_cpoe_route");
                ppmcl_cpoe_route.innerHTML = `途徑：${item.route}`;

                let ppmcl_cpoe_code = document.createElement("div");
                ppmcl_cpoe_code.classList.add("ppmcl_cpoe_code");
                ppmcl_cpoe_code.innerHTML = `藥碼：${item.code}`;

    
                let ppmcl_cpoe_qty = document.createElement("div");
                ppmcl_cpoe_qty.classList.add("ppmcl_cpoe_qty");
                ppmcl_cpoe_qty.innerHTML = `總量：${+item.qty}`;

                if(page_setting_params.display_block_nocheck && page_setting_params.display_block_nocheck.value_db) {
                    let temp_str_ary = page_setting_params.display_block_nocheck.value_db.split(";");

                    temp_str_ary.forEach(element => {
                        switch (element) {
                            case "dunit":
                                ppmcl_cpoe_med_info2.appendChild(ppmcl_cpoe_dunit);
                                break;
                            case "code":
                                ppmcl_cpoe_med_info2.appendChild(ppmcl_cpoe_code);
                                break;
                            case "storage":
                                ppmcl_cpoe_med_info2.appendChild(ppmcl_cpoe_storage);
                                break;
                            case "ordseq":
                                ppmcl_cpoe_med_info2.appendChild(ppmcl_cpoe_ordseq);
                                break;
                            case "dosage":
                                ppmcl_cpoe_med_info2.appendChild(ppmcl_cpoe_dosage);
                                break;
                            case "freqn":
                                ppmcl_cpoe_med_info2.appendChild(ppmcl_cpoe_freqn);
                                break;
                            case "route":
                                ppmcl_cpoe_med_info2.appendChild(ppmcl_cpoe_route);
                                break;
                        
                            default:
                                break;
                        }
                    });
                } else {
                    ppmcl_cpoe_med_info2.appendChild(ppmcl_cpoe_dunit);
                    if(page_setting_params.med_unCheck_display_loc) {
                        if(page_setting_params.med_unCheck_display_loc.value == "True") {
                            ppmcl_cpoe_med_info2.appendChild(ppmcl_cpoe_storage);
                        }
                    }
                }
    
                ppmcl_cpoe_med_info2.appendChild(ppmcl_cpoe_qty);

                let ppmcl_cpoe_name_container = document.createElement("div");
                ppmcl_cpoe_name_container.classList.add("ppmcl_cpoe_name_container");

                ppmcl_cpoe_name_container.appendChild(ppmcl_cpoe_name);
                ppmcl_cpoe_name_container.appendChild(ppmcl_cpoe_cht_name);
                
                ppmcl_cpoe_med_info_container.appendChild(ppmcl_cpoe_name_container);
                ppmcl_cpoe_med_info_container.appendChild(ppmcl_cpoe_med_info2);

                let ppmcl_cpoe_right_container = document.createElement("div");
                ppmcl_cpoe_right_container.classList.add("ppmcl_cpoe_right_container");

                let ppmcl_cpoe_status = document.createElement("div");
                ppmcl_cpoe_status.classList.add("ppmcl_cpoe_status");
                ppmcl_cpoe_status.textContent = item.status;
    
                let ppmcl_cpoe_med_check_btn = document.createElement("div");
                ppmcl_cpoe_med_check_btn.classList.add("ppmcl_cpoe_med_check_btn");
                ppmcl_cpoe_med_check_btn.classList.add("btn");
                ppmcl_cpoe_med_check_btn.setAttribute("GUID", item.GUID);
                ppmcl_cpoe_med_check_btn.setAttribute("Master_GUID", item.Master_GUID);
                if(current_func == "allocate") {
                    ppmcl_cpoe_med_check_btn.innerHTML = "調劑";
                    ppmcl_cpoe_med_check_btn.addEventListener("click", async () => {
                        Set_main_div_enable(true);
                        let return_data = await set_post_data_to_check_dispense_for_med_list(element.GUID, item.GUID, "Y", true);
    
                        if(return_data.Code == 200) {
                            let ppmcl_cpoe_container = document.querySelector(`.ppmcl_cpoe_container[guid="${item.GUID}"]`);
                            ppmcl_cpoe_container.remove();
                        }
    
                        // 判斷該床是否還有處方，若沒有處方則所有床位消失
                        let ppmcl_bed_card = document.querySelector(`.ppmcl_bed_card[Master_Guid="${element.GUID}"]`);
                        let ppmcl_bed_card_container = document.querySelector(`.ppmcl_bed_card_container[Master_Guid="${element.GUID}"]`);
    
                        console.log(ppmcl_bed_card.clientHeight == 0);
    
                        if(ppmcl_bed_card.clientHeight == 0) {
                            ppmcl_bed_card_container.remove();
                        }
    
                        post_data = [current_pharmacy.phar, ppmcl_h_current_cart_select.value];
                        console.log(post_data);
                        if(current_func == "allocate") {
                            med_change_data = await get_patient_with_NOdispense(post_data);
                            med_change_data = med_change_data.Data;
                    
                            med_change_data = med_change_data.filter((e) => {
                                return e.cpoe_change_status != "";
                            });
                    
                        } else {
                            med_change_data = await get_patient_with_NOcheck(post_data);
                            med_change_data = med_change_data.Data;
                        }
                    
                        console.log(med_change_data);
                    
                        med_change_data = med_change_data.filter((e) => {
                            return Array.isArray(e.cpoe) && e.cpoe.length != 0;
                        });
                    
                        console.log(med_change_data);
                    
                        if(med_change_data.length > 0) {
                            med_change_data.sort((a, b) => +a.bednum - +b.bednum);
                        }
                    
                        console.log("++++++++++++++++++++", med_change_data);
    
                        Set_main_div_enable(false);
                    });
                } else {
                    ppmcl_cpoe_med_check_btn.innerHTML = "覆核";
                    if(item.dispens_status == "Y" && item.check_status != "Y") {
                        ppmcl_cpoe_med_check_btn.addEventListener("click", async () => {
                            Set_main_div_enable(true);
                            let return_data = await set_post_data_to_check_dispense_for_med_list(element.GUID, item.GUID, "Y", true);
        
                            if(return_data.Code == 200) {
                                let ppmcl_cpoe_container = document.querySelector(`.ppmcl_cpoe_container[guid="${item.GUID}"]`);
                                ppmcl_cpoe_container.remove();
                            }
        
                            // 判斷該床是否還有處方，若沒有處方則所有床位消失
                            let ppmcl_bed_card = document.querySelector(`.ppmcl_bed_card[Master_Guid="${element.GUID}"]`);
                            let ppmcl_bed_card_container = document.querySelector(`.ppmcl_bed_card_container[Master_Guid="${element.GUID}"]`);
        
                            console.log(ppmcl_bed_card.clientHeight == 0);
        
                            if(ppmcl_bed_card.clientHeight == 0) {
                                ppmcl_bed_card_container.remove();
                            }
        
                            post_data = [current_pharmacy.phar, ppmcl_h_current_cart_select.value];
                            console.log(post_data);
                            if(current_func == "allocate") {
                                med_change_data = await get_patient_with_NOdispense(post_data);
                                med_change_data = med_change_data.Data;
                        
                                med_change_data = med_change_data.filter((e) => {
                                    return e.cpoe_change_status != "";
                                });
                        
                            } else {
                                med_change_data = await get_patient_with_NOcheck(post_data);
                                med_change_data = med_change_data.Data;
                            }
                        
                            console.log(med_change_data);
                        
                            med_change_data = med_change_data.filter((e) => {
                                return Array.isArray(e.cpoe) && e.cpoe.length != 0;
                            });
                        
                            console.log(med_change_data);
                        
                            if(med_change_data.length > 0) {
                                med_change_data.sort((a, b) => +a.bednum - +b.bednum);
                            }
                        
                            console.log("++++++++++++++++++++", med_change_data);
        
                            Set_main_div_enable(false);
                        });
                    } else {
                        ppmcl_cpoe_med_check_btn.style.backgroundColor = "#909090";
                        ppmcl_cpoe_med_check_btn.style.cursor = "not-allowed";
                        ppmcl_cpoe_med_check_btn.style.color = "#3e3e3e";
                        ppmcl_cpoe_med_check_btn.style.border = "none";
                        ppmcl_cpoe_med_check_btn.addEventListener("click", () => {
                            alert("請先完成調劑");
                        });
                    }
                }

                ppmcl_cpoe_right_container.appendChild(ppmcl_light_btn);
                ppmcl_cpoe_right_container.appendChild(ppmcl_cpoe_status);
                ppmcl_cpoe_right_container.appendChild(ppmcl_cpoe_med_check_btn);
    
                // ppmcl_cpoe_container.appendChild(ppmcl_light_container);
                ppmcl_cpoe_container.appendChild(ppmcl_cpoe_med_info_container);
                ppmcl_cpoe_container.appendChild(ppmcl_cpoe_right_container);
    
                if(current_func == "allocate") {
                    ppmcl_bed_card.appendChild(ppmcl_cpoe_container);
                    // if(item.dispens_change != "") {
                    // }
                } else {
                    if(item.check_status != "Y") {
                        ppmcl_bed_card.appendChild(ppmcl_cpoe_container);
                    }
                }
            }
        });

        ppmcl_bed_card_container.appendChild(ppmcl_bed_name_container);
        ppmcl_bed_card_container.appendChild(ppmcl_bed_card);

        if(current_func == "allocate") {
            let temp_cpoe2 = temp_cpoe;
            // .filter(e => {
            //     return e.dispens_change != "";
            // });
            if(temp_cpoe2.length != 0) {
                ppmcl_main_container.appendChild(ppmcl_bed_card_container);
                temp_count_bed++;
            }
        } else {
            if(temp_cpoe.length != 0) {
                let temp_cpoe2 = temp_cpoe;
                // .filter(e => {
                //     return e.check_status != "Y";
                // });
                console.log(temp_cpoe2);
                if(temp_cpoe2.length != 0) {
                    ppmcl_main_container.appendChild(ppmcl_bed_card_container);
                    temp_count_bed++;
                }
            }
        }
    });

    if(temp_count_bed == 0) {
        ppmcl_main_container.innerHTML = `<div class="ppmcl_main_no_info">${ppmcl_h_current_cart_select.value} 處方無異動</div>`;
    }
}

async function set_post_data_to_dispensed_by_GUID(guid_arr, master_guid) {
    let checkedRadio = document.querySelector('input[name="ppmcl_filter_med_table_input"]:checked');
    let loggedName = sessionStorage.getItem('login_json');
    loggedName = JSON.parse(loggedName);
    let med_card_checkbox = document.querySelectorAll(".med_card_checkbox");
    let return_data;
    let temp_str = "";
    temp_str = guid_arr.join(";");

    let post_data = {
        ServerName: "",
        ServerType: "",
        UserName: loggedName.Name,
        ValueAry: []
    };

    if(checkedRadio.value != "all") {
        post_data = {
            ServerName: checkedRadio.value,
            ServerType: "調劑台",
            UserName: loggedName.Name,
            ValueAry: []
        };
    }

    post_data.ValueAry[0] = temp_str;
    post_data.ValueAry[1] = master_guid;

    console.log("post_data", post_data);

    med_card_checkbox.forEach(element => {
        if(guid_arr.includes(element.id)) {
            element.checked = true;
        }
    });

    if(current_func == "allocate") {
        return_data = await api_med_cart_dispensed_by_GUID(post_data);
    };

    let post_data2 = {
        Data: [
            {
                op_id: loggedName.ID,
                op_name: loggedName.Name
            }
        ],
        ServerName: "",
        ServerType: "",
        ValueAry: [temp_str],
        Value: ""
    }
    if(current_med_table != "all") {
        post_data2.ServerName = checkedRadio.value;
        post_data2.ServerType = "調劑台";
    }

    if(current_func == "allocate") {
        post_data2.Value = "調劑"
    } else if(current_func == "review") {
        post_data2.Value = "覆核"
    }

    console.log("post_data2", post_data2);

    if(return_data.Code == 200) {
        await add_med_inventory_log(post_data2);
        show_popup_notice(return_data.Result, true);
    } else {
        show_popup_notice(return_data.Result, false);
    }

    return return_data;
};

function ppmcl_set_med_table_filter_radio() {
    console.log(page_setting_params,"這邊要設定預設的調劑台+++++++++++++++++");
    if(page_setting_params.default_dps_nocheck) {
        console.log("未調/核藥品預設調劑台：", page_setting_params.default_dps_nocheck.value);
    }
    let head_med_table_filter_container = document.querySelector(".ppmcl_head_med_table_filter_container");
    head_med_table_filter_container.innerHTML = "";

    let all_input = document.createElement("input");
    all_input.className = "ppmcl_filter_med_table_input";
    all_input.name = "ppmcl_filter_med_table_input";
    all_input.type = "radio";
    all_input.value = "all";
    all_input.id = "ppmcl_filter_med_table_all";
    if(page_setting_params.default_dps_nocheck) {
        if(page_setting_params.default_dps_nocheck.value) {
            let check_str = page_setting_params.default_dps_nocheck.value;
            let hasMatch = med_table.some(item => item.name == check_str);
            if(!hasMatch) {
                all_input.checked = true;
            }
        } else {
            all_input.checked = true;
        }
    }
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
    all_label.classList.add("ppmcl_filter_med_label");
    all_label.innerHTML = "全部";
    all_label.setAttribute("for", "ppmcl_filter_med_table_all");

    head_med_table_filter_container.appendChild(all_input);
    head_med_table_filter_container.appendChild(all_label);

    if(med_table.length == 0) return;

    med_table.forEach(element => {
        let input = document.createElement("input");
        input.className = "ppmcl_filter_med_table_input";
        input.name = "ppmcl_filter_med_table_input";
        input.type = "radio";
        input.value = element.name;
        input.id = `ppmcl_guid_${element.GUID}`;
        // input.addEventListener("change", async (e) => {
        //     let ppml_main_container = document.querySelector(".ppml_main_container");
        //     med_list_data = await get_all_med_qty(current_pharmacy.phar, current_cart.hnursta, e.target.value);
        //     med_list_data = med_list_data.Data;
        //     med_list_data = sort_med_list_data(med_list_data, current_func);
        //     med_list_data = sort_display_med_data(med_list_data);
        //     await set_pp_med_list_display();
        //     ppml_main_container.scrollTop = 0;
        // });
        if(page_setting_params.default_dps_nocheck) {
            if(page_setting_params.default_dps_nocheck.value) {
                let check_str = page_setting_params.default_dps_nocheck.value;
                let hasMatch = false;
                if(element.name == check_str) hasMatch = true;
                if(hasMatch) {
                    console.log("未調/核藥品預設調劑台：\n","調劑台名稱：",element.name , "\ncheck_str：", check_str, "\n配對成功：", hasMatch);
                    input.checked = true;
                }
            }
        }

        let label = document.createElement("label");
        label.classList.add("ppmcl_filter_med_label");
        label.innerHTML = element.name;
        label.setAttribute("for", `ppmcl_guid_${element.GUID}`);

        head_med_table_filter_container.appendChild(input);
        head_med_table_filter_container.appendChild(label);
    });
}