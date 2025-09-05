let popup_nearMiss_report_div;

let nearMiss_report;

function get_popup_nearMiss_report() {
    popup_nearMiss_report_div = new Basic_popup_Div('popup_nearMiss_report_div','popup_nearMiss_report_div','','');
    popup_nearMiss_report_div._popup_div.style.border = '10px solid white';

    let header = get_pp_nearMiss_report_header();
    let main = get_pp_nearMiss_report_main();
    let footer = get_pp_nearMiss_report_footer();

    popup_nearMiss_report_div.AddControl(header);
    popup_nearMiss_report_div.AddControl(main);
    popup_nearMiss_report_div.AddControl(footer);

    return popup_nearMiss_report_div;
};
function get_pp_nearMiss_report_header() {
    let ppnmsr_header_container = document.createElement("div");
    ppnmsr_header_container.classList.add("ppnmsr_header_container");

    let ppnmsr_h_title = document.createElement("div");
    ppnmsr_h_title.classList.add("ppnmsr_h_title");
    ppnmsr_h_title.innerHTML = `處方疑義紀錄`;

    let ppnmsr_h_close_btn = document.createElement("img");
    ppnmsr_h_close_btn.classList.add("ppnmsr_h_close_btn");
    ppnmsr_h_close_btn.src = "../image/close.png";
    ppnmsr_h_close_btn.addEventListener("click", () => {
        popup_nearMiss_report_div_close();
    });

    let ppnmsr_h_report_btn = document.createElement("div");
    ppnmsr_h_report_btn.classList.add("ppnmsr_h_report_btn");
    ppnmsr_h_report_btn.classList.add("btn");
    ppnmsr_h_report_btn.innerHTML = "紀錄"

    // ppnmsr_header_container.appendChild(ppnmsr_h_report_btn);
    ppnmsr_header_container.appendChild(ppnmsr_h_title);
    ppnmsr_header_container.appendChild(ppnmsr_h_close_btn);

    return ppnmsr_header_container;
}
function get_pp_nearMiss_report_main() {
    let ppnmsr_main_container = document.createElement("div");
    ppnmsr_main_container.classList.add("ppnmsr_main_container");

    return ppnmsr_main_container;
}
function get_pp_nearMiss_report_footer() {
    let ppnmsr_footer_container = document.createElement("div");
    ppnmsr_footer_container.classList.add("ppnmsr_footer_container");

    return ppnmsr_footer_container;
}
function popup_nearMiss_report_div_close() {
    popup_nearMiss_report_div.Set_Visible(false);
}

function set_main_report_display() {
    let ppnmsr_main_container = document.querySelector(".ppnmsr_main_container");
    ppnmsr_main_container.innerHTML = "";

    if(Array.isArray(nearMiss_report)) {
        let temp_cpoe_data = nearMiss_report.filter(item => item.medCpoe);
        let temp_note_data = nearMiss_report.filter(item => !item.medCpoe);

        if(temp_cpoe_data.length > 0 || temp_note_data.length > 0) {
            temp_cpoe_data.forEach(element => {
                let ppnmsr_card_container = document.createElement("div");
                ppnmsr_card_container.classList.add("ppnmsr_card_container");

                let ppnmsr_card_title = document.createElement("div");
                ppnmsr_card_title.classList.add("ppnmsr_card_title");
                ppnmsr_card_title.innerHTML = `${element.nurnum}-${element.medCpoe.bednum}床 ${element.medCpoe.pnamec}`;


                // =============
                let nearMiss_cpoe_card = document.createElement("div");
                nearMiss_cpoe_card.classList.add("nearMiss_cpoe_card");
                nearMiss_cpoe_card.setAttribute("GUID", element.medCpoe.GUID);
                
                let nearMiss_cpoe_card_med_info_container = document.createElement("div");
                nearMiss_cpoe_card_med_info_container.classList.add("nearMiss_cpoe_card_med_info_container");

                let ppnsm_cpoe_card_info_top = document.createElement("div");
                ppnsm_cpoe_card_info_top.classList.add("ppnsm_cpoe_card_info_top");

                let ppnms_cm_name_container = document.createElement("div");
                ppnms_cm_name_container.classList.add("ppnms_cm_name_container");
                ppnms_cm_name_container.innerHTML = `
                    <div class="ppnms_cm_name">${element.medCpoe.name}</div>
                    <div class="ppnms_cm_cht_name">${element.medCpoe.cht_name}</div>
                `;

                let ppnms_cm_large_icon = document.createElement("div");
                ppnms_cm_large_icon.classList.add("ppnms_cm_large_icon");
                ppnms_cm_large_icon.innerHTML = `<img src="../image/iv-bag.png" alt="bottle icon">`;


                ppnsm_cpoe_card_info_top.appendChild(ppnms_cm_name_container);
                if(element.medCpoe.large == "L") ppnsm_cpoe_card_info_top.appendChild(ppnms_cm_large_icon);

                let ppnsm_cpoe_card_info_bottom = document.createElement("div");
                ppnsm_cpoe_card_info_bottom.classList.add("ppnsm_cpoe_card_info_bottom");

                let ppnsm_cpoe_card_info_bottom_left = document.createElement("div");
                ppnsm_cpoe_card_info_bottom_left.classList.add("ppnsm_cpoe_card_info_bottom_left");

                let med_card_code = document.createElement("div");
                med_card_code.classList.add("med_card_code");
                med_card_code.innerHTML = `藥碼：${element.medCpoe.code}`;

                let med_card_ordseq = document.createElement("div");
                med_card_ordseq.classList.add("med_card_ordseq");
                med_card_ordseq.innerHTML = `序號：${element.medCpoe.ordseq}`;

                let med_card_dosage = document.createElement("div");
                med_card_dosage.classList.add("med_card_dosage");
                med_card_dosage.innerHTML = `劑量：${element.medCpoe.dosage} ${element.medCpoe.dunit}`;

                let med_card_freqn = document.createElement("div");
                med_card_freqn.classList.add("med_card_freqn");
                let temp_str = element.medCpoe.freqn.toUpperCase()
                if(temp_str.includes("PRN")) {
                    med_card_freqn.innerHTML = `頻次：<span class="s_color">${element.medCpoe.freqn}</span>`;
                } else {
                    med_card_freqn.innerHTML = `頻次：${element.medCpoe.freqn}`;
                }

                let med_card_route = document.createElement("div");
                med_card_route.classList.add("med_card_route");
                med_card_route.innerHTML = `途徑：${element.medCpoe.route}`;

                let med_card_unit = document.createElement("div");
                med_card_unit.classList.add("med_card_unit");
                med_card_unit.innerHTML = `單位：${element.medCpoe.dunit}`;

                let med_card_storage = document.createElement("div");
                med_card_storage.classList.add("med_card_storage");
                med_card_storage.innerHTML = `儲位：${element.medCpoe.store_position}`;

                let med_card_other_phar = document.createElement("div");
                med_card_other_phar.classList.add("med_card_other_phar");
                med_card_other_phar.innerHTML = element.medCpoe.pharm_name;

                temp_check_isArray = page_setting_params && page_setting_params["display_block"] && page_setting_params["display_block"].value;

                if(temp_check_isArray) {
                    for (let i = 0; i < page_setting_params["display_block"]["value"].length; i++) {
                        const item = page_setting_params["display_block"]["value"][i];
                        switch (item.name) {
                            case "ordseq":
                                if(item.value == "True") ppnsm_cpoe_card_info_bottom_left.appendChild(med_card_ordseq);
                                break;
                            case "dosage":
                                if(item.value == "True") ppnsm_cpoe_card_info_bottom_left.appendChild(med_card_dosage);
                                break;
                            case "dunit":
                                if(item.value == "True") ppnsm_cpoe_card_info_bottom_left.appendChild(med_card_unit);
                                break;
                            case "freqn":
                                if(item.value == "True") ppnsm_cpoe_card_info_bottom_left.appendChild(med_card_freqn);
                                break;
                            case "route":
                                if(item.value == "True") ppnsm_cpoe_card_info_bottom_left.appendChild(med_card_route);
                                break;
                            case "code":
                                if(item.value == "True") ppnsm_cpoe_card_info_bottom_left.appendChild(med_card_code);
                                break;
                            case "storage":
                                if(item.value == "True") ppnsm_cpoe_card_info_bottom_left.appendChild(med_card_storage);
                                break;
                        
                            default:
                                break;
                        }
                    }
                } else {
                    ppnsm_cpoe_card_info_bottom_left.appendChild(med_card_ordseq);
                    ppnsm_cpoe_card_info_bottom_left.appendChild(med_card_dosage);
                    ppnsm_cpoe_card_info_bottom_left.appendChild(med_card_unit);
                    ppnsm_cpoe_card_info_bottom_left.appendChild(med_card_route);
                    ppnsm_cpoe_card_info_bottom_left.appendChild(med_card_freqn);
                    ppnsm_cpoe_card_info_bottom_left.appendChild(med_card_code);
                }

                ppnsm_cpoe_card_info_bottom.appendChild(ppnsm_cpoe_card_info_bottom_left);
                
                let ppnsm_cpoe_card_info_bottom_right = document.createElement("div");
                ppnsm_cpoe_card_info_bottom_right.classList.add("ppnsm_cpoe_card_info_bottom_right");
                ppnsm_cpoe_card_info_bottom_right.innerHTML = `總量：${element.medCpoe.qty}`;

                ppnsm_cpoe_card_info_bottom.appendChild(ppnsm_cpoe_card_info_bottom_right);


                nearMiss_cpoe_card_med_info_container.appendChild(ppnsm_cpoe_card_info_top);
                nearMiss_cpoe_card_med_info_container.appendChild(ppnsm_cpoe_card_info_bottom);

                
                nearMiss_cpoe_card.appendChild(nearMiss_cpoe_card_med_info_container);

                let nearMiss_log_container = document.createElement("div");
                nearMiss_log_container.classList.add("nearMiss_log_container");

                let temp_type_arr = element.reason.split(";");
                

                if(Array.isArray(temp_type_arr)) {
                    temp_type_arr.forEach(item => {
                        let ppnms_type_card = document.createElement("div");
                        ppnms_type_card.classList.add("ppnms_type_card");
                        
                        ppnms_type_card.innerHTML = item;

                        if(item) nearMiss_log_container.appendChild(ppnms_type_card);
                    });
                };

                let ppnms_type_content = document.createElement("div");
                ppnms_type_content.classList.add("ppnms_type_content");
                ppnms_type_content.innerText = `補充：\n${element.note}`;

                ppnmsr_card_container.appendChild(ppnmsr_card_title);
                ppnmsr_card_container.appendChild(nearMiss_cpoe_card);
                if(temp_type_arr.length > 0) ppnmsr_card_container.appendChild(nearMiss_log_container);
                if(element.note) ppnmsr_card_container.appendChild(ppnms_type_content);

                ppnmsr_main_container.appendChild(ppnmsr_card_container);
            });

            temp_note_data.forEach(element => {
                let ppnmsr_card_container = document.createElement("div");
                ppnmsr_card_container.classList.add("ppnmsr_card_container");

                let ppnmsr_card_title = document.createElement("div");
                ppnmsr_card_title.classList.add("ppnmsr_card_title");
                ppnmsr_card_title.innerHTML = `${element.nurnum}備註：`;

                let ppnmsr_note_content = document.createElement("div");
                ppnmsr_note_content.classList.add("ppnmsr_note_content");
                ppnmsr_note_content.innerHTML = element.note;

                ppnmsr_card_container.appendChild(ppnmsr_card_title);
                ppnmsr_card_container.appendChild(ppnmsr_note_content);

                ppnmsr_main_container.appendChild(ppnmsr_card_container);
            });
        } else {
            ppnmsr_main_container.innerHTML = '<div class="ppnmsr_no_report">暫無處方</div>';
        }
    }
}
async function popup_nearMiss_report_div_open() {
    let post_data = {
        ValueAry: [current_pharmacy.phar]
    }
    let return_data = await get_nearMiss_by_phar_api(post_data);
    if(return_data.Code == 200) {
        nearMiss_report = return_data.Data;
        console.log(nearMiss_report);
        set_main_report_display();
    } else {
        alert(`系統錯誤：${return_data.Result}`);
    }
    popup_nearMiss_report_div.Set_Visible(true);
}

