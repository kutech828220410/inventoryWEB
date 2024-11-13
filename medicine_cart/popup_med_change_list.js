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
    ppmcl_h_title.innerText = "未調藥品";

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

    med_change_data = await get_patient_with_NOdispense(post_data);
    med_change_data = med_change_data.Data;
    // med_change_data = med_change_data.filter((e) => {
    //     return e.cpoe_change_status != "";
    // });

    console.log(med_change_data);

    med_change_data = med_change_data.filter((e) => {
        return e.cpoe.length != 0;
    });

    console.log(med_change_data);

    if(med_change_data.length > 0) {
        med_change_data.sort((a, b) => +a.bednum - +b.bednum);
    }

    console.log(med_change_data);
    set_ppmcl_main_info();
    
    popup_med_change_list_div.Set_Visible(true);
    Set_main_div_enable(false);
}

function set_ppmcl_main_info() {
    let ppmcl_main_container = document.querySelector(".ppmcl_main_container");
    ppmcl_main_container.innerHTML = "";
    if(med_change_data.length == 0) {
        ppmcl_main_container.innerHTML = `<div class="ppmcl_main_no_info">${current_cart.hnursta} 處方無異動</div>`;
        return;
    }

    med_change_data.forEach(element => {
        let ppmcl_bed_card_container = document.createElement("div");
        ppmcl_bed_card_container.classList.add("ppmcl_bed_card_container");
        ppmcl_bed_card_container.setAttribute("Master_Guid", element.GUID);

        let ppmcl_bed_name_container = document.createElement("div");
        ppmcl_bed_name_container.classList.add("ppmcl_bed_name_container");

        let ppmcl_bed_name_title = document.createElement("div");
        ppmcl_bed_name_title.classList.add("ppmcl_bed_name_title");
        ppmcl_bed_name_title.innerHTML = `${element.bednum} 號病床`;

        let ppmcl_bed_name_all_btn = document.createElement("div");
        ppmcl_bed_name_all_btn.classList.add("ppmcl_bed_name_all_btn");
        ppmcl_bed_name_all_btn.classList.add("btn");
        ppmcl_bed_name_all_btn.innerHTML = `全部調劑`;
        ppmcl_bed_name_all_btn.setAttribute("Master_GUID", element.GUID);
        ppmcl_bed_name_all_btn.addEventListener("click", () => {
            if(confirm(`${element.bednum} 號病床處方異動調劑確認`)) {
                
                element.cpoe.forEach(async item => {
                    Set_main_div_enable(true);
                    // item.dispens_change == "" && 
                    if(item.dispens_status == "") {
                        let return_data = await set_post_data_to_check_dispense_for_med_list(element.GUID, item.GUID, "Y");

                        if(return_data.Code == 200) {
                            let ppmcl_cpoe_container = document.querySelector(`.ppmcl_cpoe_container[guid="${item.GUID}"]`);
                            ppmcl_cpoe_container.style.display = "none";
                        }

                        // 判斷該床是否還有處方，若沒有處方則所有床位消失
                        let ppmcl_bed_card = document.querySelector(`.ppmcl_bed_card[Master_Guid="${element.GUID}"]`);
                        let ppmcl_bed_card_container = document.querySelector(`.ppmcl_bed_card_container[Master_Guid="${element.GUID}"]`);

                        console.log(ppmcl_bed_card.clientHeight == 0);

                        if(ppmcl_bed_card.clientHeight == 0) {
                            ppmcl_bed_card_container.style.display = "none";
                        }
                    }
                    Set_main_div_enable(false);
                });

            }
        });

        ppmcl_bed_name_container.appendChild(ppmcl_bed_name_title);
        ppmcl_bed_name_container.appendChild(ppmcl_bed_name_all_btn);

        let ppmcl_bed_card = document.createElement("div");
        ppmcl_bed_card.classList.add("ppmcl_bed_card");
        ppmcl_bed_card.setAttribute("Master_Guid", element.GUID);

        let temp_cpoe = element.cpoe.filter(e => {
            return e.dispens_status == "";
        });

        if(temp_cpoe.length == 0) ppmcl_bed_card_container.style.display = "none";

        temp_cpoe.forEach(item => {
            // if(item.dispens_change != "") {}
            //  && item.dispens_change != ""
            
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
    
                let ppmcl_cpoe_med_check_btn = document.createElement("div");
                ppmcl_cpoe_med_check_btn.classList.add("ppmcl_cpoe_med_check_btn");
                ppmcl_cpoe_med_check_btn.classList.add("btn");
                ppmcl_cpoe_med_check_btn.innerHTML = "調劑";
                ppmcl_cpoe_med_check_btn.setAttribute("GUID", item.GUID);
                ppmcl_cpoe_med_check_btn.setAttribute("Master_GUID", item.Master_GUID);
                ppmcl_cpoe_med_check_btn.addEventListener("click", async () => {
                    Set_main_div_enable(true);
                    let return_data = await set_post_data_to_check_dispense_for_med_list(element.GUID, item.GUID, "Y");

                    if(return_data.Code == 200) {
                        let ppmcl_cpoe_container = document.querySelector(`.ppmcl_cpoe_container[guid="${item.GUID}"]`);
                        ppmcl_cpoe_container.style.display = "none";
                    }

                    // 判斷該床是否還有處方，若沒有處方則所有床位消失
                    let ppmcl_bed_card = document.querySelector(`.ppmcl_bed_card[Master_Guid="${element.GUID}"]`);
                    let ppmcl_bed_card_container = document.querySelector(`.ppmcl_bed_card_container[Master_Guid="${element.GUID}"]`);

                    console.log(ppmcl_bed_card.clientHeight == 0);

                    if(ppmcl_bed_card.clientHeight == 0) {
                        ppmcl_bed_card_container.style.display = "none";
                    }
                    Set_main_div_enable(false);
                });
    
                ppmcl_cpoe_container.appendChild(ppmcl_cpoe_med_info_container)
                ppmcl_cpoe_container.appendChild(ppmcl_cpoe_med_check_btn)
    
                ppmcl_bed_card.appendChild(ppmcl_cpoe_container);   
            }
        });

        ppmcl_bed_card_container.appendChild(ppmcl_bed_name_container);
        ppmcl_bed_card_container.appendChild(ppmcl_bed_card);

        ppmcl_main_container.appendChild(ppmcl_bed_card_container);
    });
}
