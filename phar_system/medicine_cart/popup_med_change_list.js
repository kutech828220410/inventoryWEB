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
    ppmcl_h_title.innerText = "藥品異動";

    let ppmcl_h_close_btn = document.createElement("img");
    ppmcl_h_close_btn.classList.add("ppmcl_h_close_btn");
    ppmcl_h_close_btn.src = "../image/close.png";
    ppmcl_h_close_btn.addEventListener("click", () => {
        popup_med_change_list_div_close();
    });

    ppmcl_header_container.appendChild(ppmcl_h_title);
    ppmcl_header_container.appendChild(ppmcl_h_close_btn);

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
}
async function popup_med_change_list_div_open() {
    Set_main_div_enable(true);
    let post_data = [current_cart.phar, current_cart.hnursta];
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
    
    popup_med_change_list_div.Set_Visible(true);
    Set_main_div_enable(false);
}

async function set_ppmcl_main_info() {
    let ppmcl_main_container = document.querySelector(".ppmcl_main_container");
    console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-");
    ppmcl_main_container.innerHTML = "";
    console.log("-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-");
    if(med_change_data.length == 0) {
        ppmcl_main_container.innerHTML = `<div class="ppmcl_main_no_info">${current_cart.hnursta} 處方無異動</div>`;
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
                let ppmcl_bed_card_container = document.querySelectorAll(".ppmcl_bed_card_container");
                let ppmcl_cpoe_med_check_btn = document.querySelectorAll(".ppmcl_cpoe_med_check_btn");
                if(ppmcl_bed_card_container.length == 0) {
                    Set_main_div_enable(false);
                    return;
                }
                let temp_master_arr = [];
                let temp_object = {};
                ppmcl_bed_card_container.forEach(element => {
                    let temp_master_guid = element.getAttribute("master_guid");
                    temp_master_arr.push(temp_master_guid);
                    temp_object[temp_master_guid] = [];
                });
    
                ppmcl_cpoe_med_check_btn.forEach(element => {
                    let master_guid = element.getAttribute("master_guid");
                    let guid = element.getAttribute("guid");
    
                    temp_object[master_guid].push(guid);
                });
    
                console.log(temp_master_arr);
                console.log(temp_object);
    
                let result_arr = [];
    
                for (let i = 0; i < temp_master_arr.length; i++) {
                    const element = temp_master_arr[i];
                    let return_data = await set_post_data_to_dispensed_by_GUID(temp_object[element], element);
    
                    console.log(return_data);
                    if(return_data.Code == 200) {
                        result_arr.push(return_data.ValueAry[1]);
                    }
                }
                if(result_arr.length == 0) {
                    alert("調劑失敗，請確認伺服器狀態");
                    Set_main_div_enable(false);
                    return;
                }
                for (let i = 0; i < result_arr.length; i++) {
                    const element = result_arr[i];
                    
                    let ppmcl_bed_card_container = document.querySelector(`.ppmcl_bed_card_container[Master_Guid="${element}"]`);
                    let ppmcl_bed_card_container_arr = document.querySelectorAll(".ppmcl_bed_card_container");
                    if(ppmcl_bed_card_container == null) {
                        continue;
                    }
                    ppmcl_bed_card_container.remove();
    
                    if(ppmcl_bed_card_container_arr.length > 0) {
                        let post_data = [current_cart.phar, current_cart.hnursta];
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
                    }
                }
                Set_main_div_enable(false);
            }
        });
    } else {
        med_change_all_check_btn.innerHTML = "全部異動覆核";
        med_change_all_check_btn.addEventListener("click", async () => {
            if(confirm("是否覆核所有異動？")) {
                Set_main_div_enable(true);

                let temp_guid_arr = [];

                med_change_data.forEach(element => {
                    element.cpoe.forEach(item => {
                        if(item.dispens_status == "Y" && item.check_status != "Y") {
                            temp_guid_arr.push(item.GUID);
                        }
                    });
                });

                console.log(temp_guid_arr);

                let loggedName = sessionStorage.getItem('login_json');
                loggedName = JSON.parse(loggedName);

                let post_data = {
                    ServerName: "",
                    ServerType: "",
                    UserName: loggedName.Name,
                    ValueAry: [temp_guid_arr.join(";"), current_cart.hnursta]
                }

                // if(temp_table != "all") {
                //     post_data.ServerName = temp_table;
                //     post_data.ServerType = "調劑台";
                // }

                console.log("藥品異動全部複合post_data", post_data);
                let return_data = await api_med_cart_check_by_cart(post_data);
                if(return_data.Code == 200) {
                    temp_guid_arr.forEach(async item => {      
                        let post_data2 = {
                            Data: [
                                {
                                    op_id: loggedName.ID,
                                    op_name: loggedName.Name
                                }
                            ],
                            ServerName: "",
                            ServerType: "",
                            ValueAry: [item],
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
                    
                        await add_med_inventory_log(post_data2);
                    });
    
                    
                    post_data = [current_cart.phar, current_cart.hnursta];
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
        ppmcl_bed_name_title.innerHTML = `${element.bednum} 號病床`;
        ppmcl_bed_name_title.addEventListener("click", () => {
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
    
                    let post_data = [current_cart.phar, current_cart.hnursta];
                    console.log(post_data);
                
                    med_change_data = await get_patient_with_NOdispense(post_data);
                    med_change_data = med_change_data.Data;
                
                    med_change_data = med_change_data.filter((item) => {
                        return Array.isArray(item["cpoe"]) && item["cpoe"].length != 0;
                    });
    
                    let temp_result = med_change_data.find(item => item.GUID === element.GUID);
                
                    console.log(med_change_data);
                    console.log(temp_result);
    
                    temp_result.cpoe.forEach(async item => {
                        if(item.dispens_status == "") {
                            temp_guid_arr.push(item.GUID);
                        }
                    });
    
                    let return_data = await set_post_data_to_dispensed_by_GUID(temp_guid_arr, element.GUID);
                    console.log("***************************", return_data);
                    return_data = return_data.Data;
                    
                    if(Array.isArray(return_data)) {
                        return_data.forEach(item => {
                            if(item.dispens_status == "Y") {
                                let ppmcl_cpoe_container = document.querySelector(`.ppmcl_cpoe_container[guid="${item.GUID}"]`);
                                if (ppmcl_cpoe_container) {
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

                        post_data = [current_cart.phar, current_cart.hnursta];
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
                        ValueAry: [temp_guid_arr.join(";"), current_cart.hnursta]
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
                            if (ppmcl_cpoe_container) {
                                ppmcl_cpoe_container.remove();
                            }
                        });

                        console.log(ppmcl_bed_card.clientHeight == 0);
            
                        if(ppmcl_bed_card.clientHeight == 0) {
                            ppmcl_bed_card_container.remove();
                        }
                    }

                    temp_guid_arr.forEach(async item => {      
                        let post_data2 = {
                            Data: [
                                {
                                    op_id: loggedName.ID,
                                    op_name: loggedName.Name
                                }
                            ],
                            ServerName: "",
                            ServerType: "",
                            ValueAry: [item],
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
                    
                        await add_med_inventory_log(post_data2);
                    });

                    
                    post_data = [current_cart.phar, current_cart.hnursta];
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

        ppmcl_bed_name_container.appendChild(ppmcl_bed_name_title);
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
    
                let ppmcl_cpoe_qty = document.createElement("div");
                ppmcl_cpoe_qty.classList.add("ppmcl_cpoe_qty");
                ppmcl_cpoe_qty.innerHTML = `總量：${+item.qty}`;
    
                ppmcl_cpoe_med_info2.appendChild(ppmcl_cpoe_dunit);
                ppmcl_cpoe_med_info2.appendChild(ppmcl_cpoe_qty);
                
                ppmcl_cpoe_med_info_container.appendChild(ppmcl_cpoe_name);
                ppmcl_cpoe_med_info_container.appendChild(ppmcl_cpoe_cht_name);
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
    
                        post_data = [current_cart.phar, current_cart.hnursta];
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
        
                            post_data = [current_cart.phar, current_cart.hnursta];
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

                ppmcl_cpoe_right_container.appendChild(ppmcl_cpoe_status);
                ppmcl_cpoe_right_container.appendChild(ppmcl_cpoe_med_check_btn);
    
                ppmcl_cpoe_container.appendChild(ppmcl_cpoe_med_info_container);
                ppmcl_cpoe_container.appendChild(ppmcl_cpoe_right_container);
    
                if(current_func == "allocate") {
                    if(item.dispens_change != "") {
                        ppmcl_bed_card.appendChild(ppmcl_cpoe_container);
                    }
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
            let temp_cpoe2 = temp_cpoe.filter(e => {
                return e.dispens_change != "";
            });
            if(temp_cpoe2.length != 0) {
                ppmcl_main_container.appendChild(ppmcl_bed_card_container);
                temp_count_bed++;
            }
        } else {
            if(temp_cpoe.length != 0) {
                let temp_cpoe2 = temp_cpoe.filter(e => {
                    return e.check_status != "Y";
                });
                console.log(temp_cpoe2);
                if(temp_cpoe2.length != 0) {
                    ppmcl_main_container.appendChild(ppmcl_bed_card_container);
                    temp_count_bed++;
                }
            }
        }
    });

    if(temp_count_bed == 0) {
        ppmcl_main_container.innerHTML = `<div class="ppmcl_main_no_info">${current_cart.hnursta} 處方無異動</div>`;
    }
}

async function set_post_data_to_dispensed_by_GUID(guid_arr, master_guid) {
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

    if(current_med_table != "all") {
        post_data = {
            ServerName: current_med_table.name,
            ServerType: current_med_table.type,
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

    await guid_arr.forEach(async element => {
        let post_data2 = {
            Data: [
                {
                    op_id: loggedName.ID,
                    op_name: loggedName.Name
                }
            ],
            ServerName: "",
            ServerType: "",
            ValueAry: [element],
            Value: ""
        }
        if(current_med_table != "all") {
            post_data2.ServerName = current_med_table.name;
            post_data2.ServerType = current_med_table.type;
        }

        if(current_func == "allocate") {
            post_data2.Value = "調劑"
        } else if(current_func == "review") {
            post_data2.Value = "覆核"
        }
    
        await add_med_inventory_log(post_data2);
    });

    return return_data;
};