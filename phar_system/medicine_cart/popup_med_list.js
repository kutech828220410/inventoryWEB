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
        med_list_data = sort_med_list_data(med_list_data, current_func);
        med_list_data = sort_display_med_data(med_list_data);
        await set_pp_med_list_display();
    });

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

    med_list_sort_radio_data.forEach(element => {
        let input = document.createElement("input");
        input.className = "sort_med_input";
        input.name = "sort_med_input";
        input.type = "radio";
        input.value = element.value;
        input.id = element.name;
        if(element.value == "all") {
            input.checked = true;
        }
        input.addEventListener("change", () => {
            let ppml_main_container = document.querySelector(".ppml_main_container");
            set_pp_med_list_display();
            ppml_main_container.scrollTop = 0;
        });

        let label = document.createElement("label");
        label.classList.add("sort_med_label");
        label.innerHTML = element.cht_name;
        label.setAttribute("for", element.name);

        head_sort_radio_container.appendChild(input);
        head_sort_radio_container.appendChild(label);
    });

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
        med_list_data = await get_all_med_qty(current_pharmacy.phar, current_cart.hnursta, "all");
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
            Set_main_div_enable(true);
            let check_count = 0;
            let guid_arr = [];
            let fail_count= 0;
            let confirm_arr = [];
            let temp_coonfirm_text = "";

            element["bed_list"].forEach(item => {
                if(item.dispens_status != "Y") {
                    confirm_arr.push(item.bednum);
                }
            });

            temp_coonfirm_text = `第${confirm_arr.join("、")}病床\n${element.name}藥品是否全部調劑？`;

            for (let index = 0; index < element["bed_list"].length; index++) {
                const item = element["bed_list"][index];
                if(item.dispens_status != "Y") {
                    let return_data = await set_post_data_to_check_dispense_for_med_list(item.Master_GUID, item.GUID, "Y");
                    console.log(return_data);
                    if(return_data.Code == "-200") {
                        fail_count++;
                    } else {
                        guid_arr.push(item.GUID);
                        check_count++;
                    }
                }
            }

            guid_arr.forEach(guid => {
                let ppml_bed_card = document.querySelector(`.ppml_bed_card[guid="${guid}"]`);
                ppml_bed_card.classList.add("ppml_bed_done");
            });
            
            if(check_count == 0) {
                if(current_func == "allocate") {
                    alert("無可調劑藥品");
                } else {
                    alert("無可覆核藥品");
                }
            }

            if(fail_count > 0) {
                alert("部分藥品調劑失敗");
            }

            let filter_med_table_input = document.querySelector('.filter_med_table_input:checked');

            med_list_data = await get_all_med_qty(current_pharmacy.phar, current_cart.hnursta, filter_med_table_input.value);
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
            await set_light_table(element.code, element.name, element.cht_name);
            popup_light_table_select_div_open();
        });

        ppml_light_btn_container.appendChild(ppml_light_all_check_btn);
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
            // PRN標示
            let temp_str = item.freqn.toUpperCase();
            // console.log(temp_str);
            // console.log(temp_str.includes("PRN"));
            if(temp_str.includes("PRN")) {
                ppml_bed_card.innerHTML = `
                <span class="ppml_bed_card_num">${item.bednum}床</span><div class="ppml_bed_card_qty">${+item.lqnty}P</div>
                `;
            } else {
                ppml_bed_card.innerHTML = `<span class="ppml_bed_card_num">${item.bednum}床</span><div class="ppml_bed_card_qty">${+item.lqnty}</div>`;
            }
            // else if(item.freqn == "PRN") {
            //     ppml_bed_card.innerHTML = `
            //     <div class="ppml_bed_card_PRN">P</div><span class="ppml_bed_card_num">${item.bednum}床</span><div class="ppml_bed_card_qty">${+item.lqnty}</div>
            //     `;
            // }
            // ppml_bed_card.innerHTML = `<span class="ppml_bed_card_num">${item.bednum}床</span><div class="ppml_bed_card_qty">${+item.lqnty}</div>`;
            ppml_bed_card.setAttribute("m_guid", item.Master_GUID);
            ppml_bed_card.setAttribute("guid", item.GUID);

            total_qty += +item.lqnty;

            if(current_func == "allocate") {
                if(item.dispens_status == "Y") {
                    ppml_bed_card.classList.add("ppml_bed_done");
                    done_qty += +item.lqnty;
                } 
                ppml_bed_card.addEventListener("click", async (e) => {
                    console.log(ppml_bed_card.classList.contains("ppml_bed_done"));
                    if(ppml_bed_card.classList.contains("ppml_bed_done")) {
                        if(confirm("是否取消調劑狀態")) {
                            Set_main_div_enable(true);
    
                            let master_guid = ppml_bed_card.getAttribute("m_guid");
                            let guid = ppml_bed_card.getAttribute("guid");
        
                            await set_post_data_to_check_dispense_for_med_list(master_guid, guid, "");
        
                            let filter_med_table_input = document.querySelector('.filter_med_table_input:checked');

                            med_list_data = await get_all_med_qty(current_pharmacy.phar, current_cart.hnursta, filter_med_table_input.value);
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
                        let master_guid = ppml_bed_card.getAttribute("m_guid");
                        let guid = ppml_bed_card.getAttribute("guid");
    
                        await set_post_data_to_check_dispense_for_med_list(master_guid, guid, "Y");
    
                        let filter_med_table_input = document.querySelector('.filter_med_table_input:checked');

                        med_list_data = await get_all_med_qty(current_pharmacy.phar, current_cart.hnursta, filter_med_table_input.value);
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
                        console.log(ppml_bed_card.classList.contains("ppml_bed_done"));
                        if(ppml_bed_card.classList.contains("ppml_bed_done")) {
                            if(confirm("是否取消覆核狀態")) {
                                Set_main_div_enable(true);
        
                                let master_guid = ppml_bed_card.getAttribute("m_guid");
                                let guid = ppml_bed_card.getAttribute("guid");
            
                                await set_post_data_to_check_dispense_for_med_list(master_guid, guid, "");
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
                            let master_guid = ppml_bed_card.getAttribute("m_guid");
                            let guid = ppml_bed_card.getAttribute("guid");
        
                            await set_post_data_to_check_dispense_for_med_list(master_guid, guid, "Y");
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
        
        let radio_checked_input = document.querySelector('.sort_med_input:checked');

        // 這邊調整radio大瓶、針劑顯示
        // 藥品總量為0時不顯示
        if(+total_qty != 0) {
            if(radio_checked_input.value == "all") {
                ppml_main_container.appendChild(ppml_card_container);
            } else if(radio_checked_input.value == "bottle") {
                if(element.large == "L") {
                    ppml_main_container.appendChild(ppml_card_container);
                }
            } else if(radio_checked_input.value == "injection") {
                if(element.injection == "Y") {
                    ppml_main_container.appendChild(ppml_card_container);
                }
            } else if(radio_checked_input.value == "oral") {
                if(element.oral == "Y") {
                    ppml_main_container.appendChild(ppml_card_container);
                }
            } else if(radio_checked_input.value == "ice") {
                if(element.ice == "Y") {
                    ppml_main_container.appendChild(ppml_card_container);
                }
            }
        }
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

    let sortedArray = array.sort((a, b) => a.name.localeCompare(b.name));

    if(current_func == "allocate") {
        let sortedArray = array.sort((a, b) => {
            const getStatusCategory = (bedList) => {
                const hasAllY = bedList.every(bed => bed.dispens_status === "Y");
                return hasAllY ? 1 : 0;
                // const hasSomeY = bedList.some(bed => bed.dispens_status === "Y");
                // return hasAllY ? 2 : hasSomeY ? 1 : 0;
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
                // const hasSomeY = bedList.some(bed => bed.check_status === "Y");
                return hasAllY ?  1 : 0;
                // const hasSomeY = bedList.some(bed => bed.check_status === "Y");
                // return hasAllY ? 2 : hasSomeY ? 1 : 0;
            };
        
            const aStatus = getStatusCategory(a.bed_list);
            const bStatus = getStatusCategory(b.bed_list);
        
            return aStatus - bStatus;
        });
    
        console.log('sortedArray', sortedArray);
        return sortedArray;
    }
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
    let temp_arr = arr.filter(item => item.dispens_name == "Y");
    // let temp_arr = arr;
    console.log("排序過濾後", temp_arr);

    return temp_arr;
}
function set_med_table_filter_radio() {
    let head_med_table_filter_container = document.querySelector(".head_med_table_filter_container");
    head_med_table_filter_container.innerHTML = "";

    let all_input = document.createElement("input");
    all_input.className = "filter_med_table_input";
    all_input.name = "filter_med_table_input";
    all_input.type = "radio";
    all_input.value = "all";
    all_input.id = "filter_med_table_all";
    all_input.checked = true;
    all_input.addEventListener("change", async (e) => {
        let ppml_main_container = document.querySelector(".ppml_main_container");
        med_list_data = await get_all_med_qty(current_pharmacy.phar, current_cart.hnursta, e.target.value);
        med_list_data = med_list_data.Data;
        med_list_data = sort_med_list_data(med_list_data, current_func);
        med_list_data = sort_display_med_data(med_list_data);
        await set_pp_med_list_display();
        ppml_main_container.scrollTop = 0;
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
            let ppml_main_container = document.querySelector(".ppml_main_container");
            med_list_data = await get_all_med_qty(current_pharmacy.phar, current_cart.hnursta, e.target.value);
            med_list_data = med_list_data.Data;
            med_list_data = sort_med_list_data(med_list_data, current_func);
            med_list_data = sort_display_med_data(med_list_data);
            await set_pp_med_list_display();
            ppml_main_container.scrollTop = 0;
        });

        let label = document.createElement("label");
        label.classList.add("filter_med_label");
        label.innerHTML = element.name;
        label.setAttribute("for", `guid_${element.GUID}`);

        head_med_table_filter_container.appendChild(input);
        head_med_table_filter_container.appendChild(label);
    });
}