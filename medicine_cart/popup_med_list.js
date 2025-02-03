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

function get_popup_med_list() {
    popup_med_list_div = new Basic_popup_Div('popup_med_list_div','popup_med_list_div','','');
    popup_med_list_div._popup_div.style.border = '10px solid white';

    let header = get_pp_med_list_header();
    let main = get_pp_med_list_main();
    let footer = get_pp_med_list_footer();

    popup_med_list_div.AddControl(header);
    popup_med_list_div.AddControl(main);
    popup_med_list_div.AddControl(footer);

    return popup_med_list_div;
};
function get_pp_med_list_header() {
    let ppml_header_container = document.createElement("div");
    ppml_header_container.classList.add("ppml_header_container");

    let ppml_h_title = document.createElement("div");
    ppml_h_title.classList.add("ppml_h_title");
    ppml_h_title.innerHTML = `<span class="ppml_h_title_span"></span>藥品總量`;

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
    ppml_display_all_btn.innerHTML = `全部`;
    ppml_display_all_btn.addEventListener("click", async () => {
        med_list_data = await get_all_med_qty(current_pharmacy.phar, current_cart.hnursta, "all");
        med_list_data = med_list_data.Data;
        med_list_data = sort_med_list_data(med_list_data, current_func);;
        await set_pp_med_list_display();
    });

    let ppml_h_close_btn = document.createElement("img");
    ppml_h_close_btn.classList.add("ppml_h_close_btn");
    ppml_h_close_btn.src = "../image/close.png";
    ppml_h_close_btn.addEventListener("click", () => {
        popup_med_list_div_close();
    });

    ppml_header_container.appendChild(ppml_h_title);
    ppml_header_container.appendChild(ppml_h_close_btn);

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
        med_list_data = await get_all_med_qty(current_pharmacy.phar, current_cart.hnursta, "all");
        med_list_data = med_list_data.Data;
        med_list_data = sort_med_list_data(med_list_data, current_func);;
        await set_pp_med_list_display();
    });

    ppml_footer_container.appendChild(ppml_search_btn);
    ppml_footer_container.appendChild(ppml_display_all_btn);

    return ppml_footer_container;
}
function popup_med_list_div_close() {
    popup_med_list_div.Set_Visible(false);
}
function popup_med_list_div_open() {
    popup_med_list_div.Set_Visible(true);
}

async function set_pp_med_list_display() {
    let ppml_main_container = document.querySelector(".ppml_main_container");
    ppml_main_container.innerHTML = "";

    let ppml_h_title_span = document.querySelector(".ppml_h_title_span");
    ppml_h_title_span.innerHTML = current_cart.hnursta;

    med_list_data.forEach(element => {
        let ppml_card_container = document.createElement("div");
        ppml_card_container.classList.add("ppml_card_container");
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

        let ppml_light_on_btn = document.createElement("div");
        ppml_light_on_btn.classList.add("ppml_light_on_btn");
        ppml_light_on_btn.classList.add("btn");
        ppml_light_on_btn.setAttribute("code", element.code);
        ppml_light_on_btn.innerHTML = "亮燈";
        ppml_light_on_btn.addEventListener("click", async () => {
            await set_light_table(element.code, element.name, element.cht_name);
            popup_light_table_select_div_open();
        });

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

        element["bed_list"].forEach(item => {
            let ppml_bed_card = document.createElement("div");
            ppml_bed_card.classList.add("ppml_bed_card");
            ppml_bed_card.innerHTML = `${item.bednum}<div class="ppml_bed_card_qty">${+item.lqnty}</div>`;
            ppml_bed_card.setAttribute("m_guid", item.Master_GUID);
            ppml_bed_card.setAttribute("guid", item.GUID);

            total_qty += +item.lqnty;

            if(current_func == "allocate") {
                if(item.dispens_status == "Y") {
                    ppml_bed_card.classList.add("ppml_bed_done");
                    done_qty += +item.lqnty;
                } 
                ppml_bed_card.addEventListener("click", async (e) => {
                    console.log(e.target.classList.contains("ppml_bed_done"));
                    if(e.target.classList.contains("ppml_bed_done")) {
                        if(confirm("是否取消調劑狀態")) {
                            Set_main_div_enable(true);
    
                            let master_guid = ppml_bed_card.getAttribute("m_guid");
                            let guid = ppml_bed_card.getAttribute("guid");
        
                            await set_post_data_to_check_dispense_for_med_list(master_guid, guid, "");
        
                            // med_list_data = await get_all_med_qty(current_pharmacy.phar, current_cart.hnursta, "all");
                            // med_list_data = med_list_data.Data;
                            // med_list_data = sort_med_list_data(med_list_data, current_func);;
                            // await set_pp_med_list_display();

                            // med_list_search_result();

                            ppml_bed_card.classList.remove("ppml_bed_done");
                            item.dispens_status = "";

                            done_qty = +done_qty - +item.lqnty;

                            infoCode2.textContent = `${done_qty} / ${total_qty}`;
                            
                            Set_main_div_enable(false);
                        }
                    } else {
                        Set_main_div_enable(true);
                        let master_guid = ppml_bed_card.getAttribute("m_guid");
                        let guid = ppml_bed_card.getAttribute("guid");
    
                        await set_post_data_to_check_dispense_for_med_list(master_guid, guid, "Y");
    
                        // med_list_data = await get_all_med_qty(current_pharmacy.phar, current_cart.hnursta, "all");
                        // med_list_data = med_list_data.Data;
                        // med_list_data = sort_med_list_data(med_list_data, current_func);;
                        // await set_pp_med_list_display();

                        // med_list_search_result();

                        ppml_bed_card.classList.add("ppml_bed_done");
                        item.dispens_status = "Y";

                        done_qty = +done_qty + +item.lqnty;

                        infoCode2.textContent = `${done_qty} / ${total_qty}`;
                        
                        Set_main_div_enable(false);
                    }
                });
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
                    ppml_bed_card.addEventListener("click", async (e) => {
                        console.log(e.target.classList.contains("ppml_bed_done"));
                        if(e.target.classList.contains("ppml_bed_done")) {
                            if(confirm("是否取消覆核狀態")) {
                                Set_main_div_enable(true);
        
                                let master_guid = ppml_bed_card.getAttribute("m_guid");
                                let guid = ppml_bed_card.getAttribute("guid");
            
                                await set_post_data_to_check_dispense_for_med_list(master_guid, guid, "");
            
                                // med_list_data = await get_all_med_qty(current_pharmacy.phar, current_cart.hnursta, "all");
                                // med_list_data = med_list_data.Data;
                                // med_list_data = sort_med_list_data(med_list_data, current_func);;
                                // await set_pp_med_list_display();

                                // med_list_search_result();

                                ppml_bed_card.classList.remove("ppml_bed_done");
                                item.check_status = "";

                                check_qty = +check_qty - +item.lqnty;

                                infoCode2.textContent = `${check_qty} / ${total_qty}`;
                                
                                Set_main_div_enable(false);
                            }
                        } else {
                            Set_main_div_enable(true);
                            let master_guid = ppml_bed_card.getAttribute("m_guid");
                            let guid = ppml_bed_card.getAttribute("guid");
        
                            await set_post_data_to_check_dispense_for_med_list(master_guid, guid, "Y");
        
                            // med_list_data = await get_all_med_qty(current_pharmacy.phar, current_cart.hnursta, "all");
                            // med_list_data = med_list_data.Data;
                            // med_list_data = sort_med_list_data(med_list_data, current_func);;
                            // await set_pp_med_list_display();

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

            ppml_bed_list_container.appendChild(ppml_bed_card);
        });

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

        ppml_main_container.appendChild(ppml_card_container);
    });
}

async function set_post_data_to_check_dispense_for_med_list(m_guid, guid, status) {
    let loggedName = sessionStorage.getItem('login_json');
    loggedName = JSON.parse(loggedName);
    let med_card_checkbox = document.querySelectorAll(".med_card_checkbox");
    let check_status = status;
    let return_data;
    let post_data = {
        ValueAry: [m_guid, guid, check_status]
    }
    let post_data2 = {
        Data: [
            {
                op_id: loggedName.ID,
                op_name: loggedName.Name
            }
        ],
        ValueAry: [guid],
        Value: ""
    }

    if(current_func == "allocate") {
        post_data2.Value = "調劑"
    } else if(current_func == "review") {
        post_data2.Value = "覆核"
    }
    console.log("post_data", post_data);

    med_card_checkbox.forEach(element => {
        if(element.id == guid) {
            if(check_status == "Y") {
                element.checked = true;
            } else {
                element.checked = false;
            }
        }
    });

    if(current_func == "allocate") {
        return_data = await api_med_cart_check_dispense_by_GUID(post_data);
    } else {
        return_data = await api_med_cart_double_check_by_GUID(post_data);
    }

    console.log(post_data2);

    await add_med_inventory_log(post_data2);

    return return_data;
};

function sort_med_list_data(array, current_func) {
    if(current_func == "allocate") {
        let sortedArray = array.sort((a, b) => {
            const getStatusCategory = (bedList) => {
                const hasAllY = bedList.every(bed => bed.dispens_status === "Y");
                const hasSomeY = bedList.some(bed => bed.dispens_status === "Y");
                return hasAllY ? 2 : hasSomeY ? 1 : 0;
            };
        
            const aStatus = getStatusCategory(a.bed_list);
            const bStatus = getStatusCategory(b.bed_list);
        
            return aStatus - bStatus;
        });
    
    
        console.log('sortedArray', sortedArray);
        return sortedArray;
    } else {
        let sortedArray = array.sort((a, b) => {
            const getStatusCategory = (bedList) => {
                const hasAllY = bedList.every(bed => bed.check_status === "Y");
                const hasSomeY = bedList.some(bed => bed.check_status === "Y");
                return hasAllY ? 2 : hasSomeY ? 1 : 0;
            };
        
            const aStatus = getStatusCategory(a.bed_list);
            const bStatus = getStatusCategory(b.bed_list);
        
            return aStatus - bStatus;
        });
    
    
        console.log('sortedArray', sortedArray);
        return sortedArray;
    }
}