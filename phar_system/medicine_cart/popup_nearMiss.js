let popup_nearMiss_div;
const nearMiss_data = {
    nurnum: "",
    bednum: "",
    miss_cpoe: [],
    note: {
        checked: false,
        content: ""
    }
}
let ppnms_steps_count = 0;
let nearMiss_type = [
  { name: "配錯病患", value: "wrongPatient" },
  { name: "配錯藥品-配錯藥品劑型", value: "wrongDrugDosageForm" },
  { name: "配錯藥品-配錯藥品含量", value: "wrongDrugStrength" },
  { name: "配錯藥品-配錯藥品廠牌", value: "wrongDrugBrand" },
  { name: "配錯藥品-多種藥品混雜", value: "wrongDrugMixed" },
  { name: "配錯藥品-配錯藥名", value: "wrongDrugName" },
  { name: "無此醫囑，多配發藥品", value: "noPrescriptionExtraDispensed" },
  { name: "漏發藥品", value: "omittedDrug" },
  { name: "藥物品質-藥物過期", value: "drugExpired" },
  { name: "藥物品質-藥物品質不良", value: "drugDefective" },
  { name: "藥物滲漏", value: "drugLeakage" },
  { name: "藥物總量欠妥-過量", value: "drugOverdose" },
  { name: "藥物總量欠妥-不足", value: "drugUnderdose" },
  { name: "藥品放錯藥盒", value: "wrongDrugBox" },
  { name: "藥品標示不完整", value: "incompleteLabeling" }
];

let nearMiss_type_object = {
  wrongPatient: "配錯病患",
  wrongDrugDosageForm: "配錯藥品-配錯藥品劑型",
  wrongDrugStrength: "配錯藥品-配錯藥品含量",
  wrongDrugBrand: "配錯藥品-配錯藥品廠牌",
  wrongDrugMixed: "配錯藥品-多種藥品混雜",
  wrongDrugName: "配錯藥品-配錯藥名",
  noPrescriptionExtraDispensed: "無此醫囑，多配發藥品",
  omittedDrug: "漏發藥品",
  drugExpired: "藥物品質-藥物過期",
  drugDefective: "藥物品質-藥物品質不良",
  drugLeakage: "藥物滲漏",
  drugOverdose: "藥物總量欠妥-過量",
  drugUnderdose: "藥物總量欠妥-不足",
  wrongDrugBox: "藥品放錯藥盒",
  incompleteLabeling: "藥品標示不完整"
}

function get_popup_nearMiss() {
    popup_nearMiss_div = new Basic_popup_Div('popup_nearMiss_div','popup_nearMiss_div','','');
    popup_nearMiss_div._popup_div.style.border = '10px solid white';

    let header = get_pp_nearMiss_header();
    let main = get_pp_nearMiss_main();
    let footer = get_pp_nearMiss_footer();

    popup_nearMiss_div.AddControl(header);
    popup_nearMiss_div.AddControl(main);
    popup_nearMiss_div.AddControl(footer);

    return popup_nearMiss_div;
};
function get_pp_nearMiss_header() {
    let ppnms_header_container = document.createElement("div");
    ppnms_header_container.classList.add("ppnms_header_container");

    let ppnms_h_title = document.createElement("div");
    ppnms_h_title.classList.add("ppnms_h_title");
    ppnms_h_title.innerHTML = `調劑錯誤回報`;

    let ppnms_h_close_btn = document.createElement("img");
    ppnms_h_close_btn.classList.add("ppnms_h_close_btn");
    ppnms_h_close_btn.src = "../image/close.png";
    ppnms_h_close_btn.addEventListener("click", () => {
        popup_nearMiss_div_close();
    });

    let ppnms_h_report_btn = document.createElement("div");
    ppnms_h_report_btn.classList.add("ppnms_h_report_btn");
    ppnms_h_report_btn.classList.add("btn");
    ppnms_h_report_btn.innerHTML = "紀錄";
    ppnms_h_report_btn.addEventListener("click", () => {
        popup_nearMiss_report_div_open();
    })

    ppnms_header_container.appendChild(ppnms_h_report_btn);
    ppnms_header_container.appendChild(ppnms_h_title);
    ppnms_header_container.appendChild(ppnms_h_close_btn);

    return ppnms_header_container;
}
function get_pp_nearMiss_main() {
    let ppnms_main_container = document.createElement("div");
    ppnms_main_container.classList.add("ppnms_main_container");

    let ppnms_main_bed_title = document.createElement("div");
    ppnms_main_bed_title.classList.add("ppnms_main_bed_title");

    let ppnms_main_bed_info = document.createElement("div");
    ppnms_main_bed_info.classList.add("ppnms_main_bed_info");

    let ppnms_main_step_info = document.createElement("div");
    ppnms_main_step_info.classList.add("ppnms_main_step_info");

    ppnms_main_bed_title.appendChild(ppnms_main_bed_info);
    ppnms_main_bed_title.appendChild(ppnms_main_step_info);

    let ppnms_main_display = document.createElement("div");
    ppnms_main_display.classList.add("ppnms_main_display");
    ppnms_main_display.setAttribute("step", 1);

    let ppnms_main_footer = document.createElement("div");
    ppnms_main_footer.classList.add("ppnms_main_footer");

    let ppnms_pre_btn = document.createElement("div");
    ppnms_pre_btn.classList.add("ppnms_pre_btn");
    ppnms_pre_btn.classList.add("btn");
    ppnms_pre_btn.innerHTML = "上一步";
    ppnms_pre_btn.addEventListener("click", () => {
        let ppnms_main_display = document.querySelector(".ppnms_main_display");
        let current_step = ppnms_main_display.getAttribute("step");
        ppnms_main_display.setAttribute("step", +current_step - 1);
        set_ppnms_main_display();
    });

    let ppnms_next_btn = document.createElement("div");
    ppnms_next_btn.classList.add("ppnms_next_btn");
    ppnms_next_btn.classList.add("ppnms_next_btn_disable");
    ppnms_next_btn.classList.add("btn");
    ppnms_next_btn.innerHTML = "下一步";
    ppnms_next_btn.addEventListener("click", () => {
        if(ppnms_next_btn.className.includes("ppnms_next_btn_disable")) return;
        let ppnms_main_display = document.querySelector(".ppnms_main_display");
        let current_step = ppnms_main_display.getAttribute("step");
        ppnms_main_display.setAttribute("step", +current_step + 1);
        set_ppnms_main_display();
    });

    let ppnms_submit_btn = document.createElement("div");
    ppnms_submit_btn.classList.add("ppnms_submit_btn");
    ppnms_submit_btn.classList.add("btn");
    ppnms_submit_btn.innerHTML = "完成";
    ppnms_submit_btn.addEventListener("click", async () => {
        console.log("這邊送出NearMiss資料：", nearMiss_data);
        let report_name;
        let report_id;
        try {
            report_name = JSON.parse(sessionStorage.getItem("user_session")).Name;
            report_id = JSON.parse(sessionStorage.getItem("user_session")).ID;
        } catch (error) {
            alert(`燈入資料有誤：${error}`);
            return;
        }
        nearMiss_type_object
        let post_data = {
            Data:[]
        };

        if(Array.isArray(nearMiss_data.miss_cpoe)) {
            nearMiss_data.miss_cpoe.forEach(element => {
                let disp_data = element.med_inv_log.filter(item => item.op_act === "調劑");

                if(disp_data.length > 1) {
                    disp_data = disp_data.reduce((latestItem, current) => {
                        return new Date(current.op_time) > new Date(latestItem.op_time)
                        ? current
                        : latestItem;
                    });
                } else if(disp_data.length === 1) {
                    disp_data = disp_data[0];
                } else {
                    disp_data = {
                        op_id: "",
                        op_name: ""
                    }
                }
                
                console.log(disp_data);

                let temp_reason_arr = [];
                let temp_reason_str = "";

                if(Array.isArray(element.type)) {
                    element.type.forEach(element => {
                        temp_reason_arr.push(nearMiss_type_object[element]);
                    });
                }

                if(temp_reason_arr.length > 0) temp_reason_str = temp_reason_arr.join(";");

                let temp_object = {
                    pat_GUID: element.pat_GUID,
                    cpoe_GUID: element.GUID,
                    pharm: current_pharmacy.phar,
                    nurnum: nearMiss_data.nurnum,
                    disp_id: disp_data.op_id,
                    disp_name: disp_data.op_name,
                    reporter_id: report_id,
                    reporter_name: report_name,
                    reason: temp_reason_str,
                    note: nearMiss_data.note.content
                }

                post_data.Data.push(temp_object);
            });        
        }

        if(nearMiss_data.note.checked) {
            let temp_object = {
                pat_GUID: current_p_bed_data.GUID,
                cpoe_GUID: "",
                pharm: current_pharmacy.phar,
                nurnum: nearMiss_data.nurnum,
                disp_id: "",
                disp_name: "",
                reporter_id: report_id,
                reporter_name: report_name,
                reason: "",
                note: nearMiss_data.note.content
            };

            post_data.Data.push(temp_object);
        }

        console.log(post_data);
        let return_data = await submit_nearMiss_api(post_data);
        if(return_data.Code == 200) {
            show_popup_notice("處方疑義資料已送出", true);
            popup_nearMiss_div_close();
            nearMiss_data_reset();
            set_step_btn();
        } else {
            show_popup_notice(`系統錯誤：${return_data.Result}`, false);
        }
    });

    ppnms_main_footer.appendChild(ppnms_pre_btn);
    ppnms_main_footer.appendChild(ppnms_next_btn);
    ppnms_main_footer.appendChild(ppnms_submit_btn);

    ppnms_main_container.appendChild(ppnms_main_bed_title);
    ppnms_main_container.appendChild(ppnms_main_display);
    ppnms_main_container.appendChild(ppnms_main_footer);

    return ppnms_main_container;
}
function get_pp_nearMiss_footer() {
    let ppnms_footer_container = document.createElement("div");
    ppnms_footer_container.classList.add("ppnms_footer_container");

    return ppnms_footer_container;
}
function popup_nearMiss_div_close() {
    let ppnms_main_display = document.querySelector(".ppnms_main_display");
    ppnms_main_display.setAttribute("step", 1);
    popup_nearMiss_div.Set_Visible(false);
}
function popup_nearMiss_div_open() {
    check_cart_dispense();
    if(current_p_bed_data) {
        set_ppnms_main_display();
    }
    popup_nearMiss_div.Set_Visible(true);
}
function set_step_btn() {
    let ppnms_main_footer = document.querySelector(".ppnms_main_footer");
    let ppnms_main_display = document.querySelector(".ppnms_main_display");
    let ppnms_pre_btn = document.querySelector(".ppnms_pre_btn");
    let ppnms_next_btn = document.querySelector(".ppnms_next_btn");
    let ppnms_submit_btn = document.querySelector(".ppnms_submit_btn");

    let pages = +nearMiss_data.miss_cpoe.length + 2;
    if(nearMiss_data.note.checked) +pages++;
    
    let temp_step = ppnms_main_display.getAttribute("step");

    if(nearMiss_data.miss_cpoe.length == 0 && !nearMiss_data.note.checked) {
        ppnms_next_btn.classList.add("ppnms_next_btn_disable");
    } else {
        ppnms_next_btn.classList.remove("ppnms_next_btn_disable");
    }

    switch (+temp_step) {
        case 1:
            ppnms_pre_btn.style.display = "none";
            ppnms_next_btn.style.display = "block";
            ppnms_submit_btn.style.display = "none";
            ppnms_main_footer.style.justifyContent = "end";
            break;
        case pages:
            ppnms_pre_btn.style.display = "block";
            ppnms_next_btn.style.display = "none";
            ppnms_submit_btn.style.display = "block";
            ppnms_main_footer.style.justifyContent = "space-between";
            break;
        default:
            ppnms_pre_btn.style.display = "block";
            ppnms_next_btn.style.display = "block";
            ppnms_submit_btn.style.display = "none";
            ppnms_main_footer.style.justifyContent = "space-between";
            break;        
    }
}
function set_ppnms_main_display() {
    console.log(nearMiss_data.nurnum != current_p_bed_data.nurnum);
    console.log(current_p_bed_data.bednum != nearMiss_data.bednum);
    if(nearMiss_data.nurnum != current_p_bed_data.nurnum || current_p_bed_data.bednum != nearMiss_data.bednum) nearMiss_data_reset();

    nearMiss_data.nurnum = current_p_bed_data.nurnum;
    nearMiss_data.bednum = current_p_bed_data.bednum;
    // 計算步驟
    set_step_btn();
    set_steps_count();

    let ppnms_main_bed_info = document.querySelector(".ppnms_main_bed_info");
    let ppnms_main_display = document.querySelector(".ppnms_main_display");
    let current_step = ppnms_main_display.getAttribute("step");

    ppnms_main_bed_info.innerHTML = `${current_p_bed_data.nurnum}-${current_p_bed_data.bednum} ${current_p_bed_data.pnamec}`;

    if(nearMiss_data.note.checked && +current_step == +ppnms_steps_count - 1) {
        // 其他備註畫面
        set_ppnms_note_page()
        return;
    }
    if(+current_step == 1) {
        // 初始畫面
        set_ppnms_first_page();
        return;
    }
    if(+current_step == +ppnms_steps_count) {
        // 送出畫面
        set_ppnms_submit_page();
        return;
    }

    // 處方箋資料
    set_ppnms_cpoe_page();
    return;
}
function nearMiss_data_reset() {
    nearMiss_data.nurnum = "";
    nearMiss_data.bednum = "";
    nearMiss_data.miss_cpoe = [];
    nearMiss_data.note.checked = false;
    nearMiss_data.note.content = "";
}

function set_steps_count() {
    let pages = +nearMiss_data.miss_cpoe.length + 2;
    if(nearMiss_data.note.checked) +pages++;
    if(nearMiss_data.miss_cpoe.length == 0 && !nearMiss_data.note.checked) {
        pages = 1;
    }

    let ppnms_main_step_info = document.querySelector(".ppnms_main_step_info");
    let ppnms_main_display = document.querySelector(".ppnms_main_display");
    let current_step = ppnms_main_display.getAttribute("step");
    
    ppnms_steps_count = pages;
    ppnms_main_step_info.innerHTML = `${current_step}/${ppnms_steps_count}`;
}

function set_ppnms_first_page() {
    let ppnms_main_display = document.querySelector(".ppnms_main_display");
    ppnms_main_display.innerHTML = "";

    if(Array.isArray(current_p_bed_data.cpoe)) {
        current_p_bed_data.cpoe.forEach(element => {
            let nearMiss_cpoe_card = document.createElement("label");
            nearMiss_cpoe_card.classList.add("nearMiss_cpoe_card");
            nearMiss_cpoe_card.setAttribute("GUID", element.GUID);
            nearMiss_cpoe_card.setAttribute("for", element.GUID);

            let nearMiss_cpoe_check_input = document.createElement("input");
            nearMiss_cpoe_check_input.classList.add("nearMiss_cpoe_check_input");
            nearMiss_cpoe_check_input.id = element.GUID;
            nearMiss_cpoe_check_input.setAttribute("code", element.code);
            nearMiss_cpoe_check_input.type = "checkbox";
            if(nearMiss_data.miss_cpoe.some(a => a.GUID === element.GUID)) nearMiss_cpoe_check_input.checked = true;
            nearMiss_cpoe_check_input.addEventListener("click", () => {
                if(nearMiss_cpoe_check_input.checked) {
                    let temp_object = {
                        GUID: element.GUID,
                        pat_GUID: element.Master_GUID,
                        type: [],
                        content: "",
                        med_inv_log: element.med_inve_log
                    };
                    // nearMiss_data.miss_cpoe.push(element.GUID);
                    nearMiss_data.miss_cpoe.push(temp_object);

                    // 依照 a_arr 順序重排 b_arr
                    nearMiss_data.miss_cpoe = current_p_bed_data.cpoe.map(a => nearMiss_data.miss_cpoe.find(b => b.GUID === a.GUID)).filter(item => item !== undefined);
                } else {
                    nearMiss_data.miss_cpoe = nearMiss_data.miss_cpoe.filter(item => item.GUID !== element.GUID);
                }

                // 依照 a_arr 的順序重排
                // nearMiss_data.miss_cpoe = current_p_bed_data.cpoe.map(item => item.GUID).filter(guid => nearMiss_data.miss_cpoe.includes(guid));        

                set_step_btn();
                set_steps_count();

                console.log(nearMiss_data.miss_cpoe);
            });

            nearMiss_cpoe_card.appendChild(nearMiss_cpoe_check_input);
            
            let nearMiss_cpoe_card_med_info_container = document.createElement("div");
            nearMiss_cpoe_card_med_info_container.classList.add("nearMiss_cpoe_card_med_info_container");

            let ppnsm_cpoe_card_info_top = document.createElement("div");
            ppnsm_cpoe_card_info_top.classList.add("ppnsm_cpoe_card_info_top");

            let ppnms_cm_name_container = document.createElement("div");
            ppnms_cm_name_container.classList.add("ppnms_cm_name_container");
            ppnms_cm_name_container.innerHTML = `
                <div class="ppnms_cm_name">${element.name}</div>
                <div class="ppnms_cm_cht_name">${element.cht_name}</div>
            `;

            let ppnms_cm_large_icon = document.createElement("div");
            ppnms_cm_large_icon.classList.add("ppnms_cm_large_icon");
            ppnms_cm_large_icon.innerHTML = `<img src="../image/iv-bag.png" alt="bottle icon">`;


            ppnsm_cpoe_card_info_top.appendChild(ppnms_cm_name_container);
            if(element.large == "L") ppnsm_cpoe_card_info_top.appendChild(ppnms_cm_large_icon);

            let ppnsm_cpoe_card_info_bottom = document.createElement("div");
            ppnsm_cpoe_card_info_bottom.classList.add("ppnsm_cpoe_card_info_bottom");

            let ppnsm_cpoe_card_info_bottom_left = document.createElement("div");
            ppnsm_cpoe_card_info_bottom_left.classList.add("ppnsm_cpoe_card_info_bottom_left");

            let med_card_code = document.createElement("div");
            med_card_code.classList.add("med_card_code");
            med_card_code.innerHTML = `藥碼：${element.code}`;

            let med_card_ordseq = document.createElement("div");
            med_card_ordseq.classList.add("med_card_ordseq");
            med_card_ordseq.innerHTML = `序號：${element.ordseq}`;

            let med_card_dosage = document.createElement("div");
            med_card_dosage.classList.add("med_card_dosage");
            med_card_dosage.innerHTML = `劑量：${element.dosage} ${element.dunit}`;

            let med_card_freqn = document.createElement("div");
            med_card_freqn.classList.add("med_card_freqn");
            let temp_str = element.freqn.toUpperCase()
            if(temp_str.includes("PRN")) {
                med_card_freqn.innerHTML = `頻次：<span class="s_color">${element.freqn}</span>`;
            } else {
                med_card_freqn.innerHTML = `頻次：${element.freqn}`;
            }

            let med_card_route = document.createElement("div");
            med_card_route.classList.add("med_card_route");
            med_card_route.innerHTML = `途徑：${element.route}`;

            let med_card_unit = document.createElement("div");
            med_card_unit.classList.add("med_card_unit");
            med_card_unit.innerHTML = `單位：${element.dunit}`;

            let med_card_storage = document.createElement("div");
            med_card_storage.classList.add("med_card_storage");
            med_card_storage.innerHTML = `儲位：${element.store_position}`;

            let med_card_other_phar = document.createElement("div");
            med_card_other_phar.classList.add("med_card_other_phar");
            med_card_other_phar.innerHTML = element.pharm_name;

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
            ppnsm_cpoe_card_info_bottom_right.innerHTML = `總量：${element.qty}`;

            ppnsm_cpoe_card_info_bottom.appendChild(ppnsm_cpoe_card_info_bottom_right);


            nearMiss_cpoe_card_med_info_container.appendChild(ppnsm_cpoe_card_info_top);
            nearMiss_cpoe_card_med_info_container.appendChild(ppnsm_cpoe_card_info_bottom);

            
            nearMiss_cpoe_card.appendChild(nearMiss_cpoe_card_med_info_container);

            if(element.pub_med != "Y") ppnms_main_display.appendChild(nearMiss_cpoe_card);
        });
    }

    let nearMiss_note_card = document.createElement("label");
    nearMiss_note_card.classList.add("nearMiss_note_card");
    nearMiss_note_card.setAttribute("for", "nearMiss_note_check_input");

    let nearMiss_note_check_input = document.createElement("input");
    nearMiss_note_check_input.classList.add("nearMiss_cpoe_check_input");
    nearMiss_note_check_input.id = "nearMiss_note_check_input";
    nearMiss_note_check_input.type = "checkbox";
    if(nearMiss_data.note.checked) nearMiss_note_check_input.checked = true;
    nearMiss_note_check_input.addEventListener("click", () => {
        nearMiss_data.note.checked = nearMiss_note_check_input.checked;

        set_step_btn();
        set_steps_count();

        console.log(nearMiss_data);
    });

    let nearMiss_note_content = document.createElement("div");
    nearMiss_note_content.classList.add("nearMiss_note_content");
    nearMiss_note_content.innerHTML = "其他";

    nearMiss_note_card.appendChild(nearMiss_note_check_input);
    nearMiss_note_card.appendChild(nearMiss_note_content);

    ppnms_main_display.appendChild(nearMiss_note_card);
}
function set_ppnms_cpoe_page() {
    let ppnms_main_display = document.querySelector(".ppnms_main_display");
    ppnms_main_display.innerHTML = "";
    let current_step = ppnms_main_display.getAttribute("step");
    let nearMiss_index = +current_step - 2;
    let temp_data = current_p_bed_data.cpoe.filter(item => {
        return nearMiss_data.miss_cpoe[nearMiss_index].GUID == item.GUID
    });
    temp_data = temp_data[0];

    let nearMiss_cpoe_card = document.createElement("div");
    nearMiss_cpoe_card.classList.add("nearMiss_cpoe_card");
    nearMiss_cpoe_card.setAttribute("GUID", temp_data.GUID);
    nearMiss_cpoe_card.setAttribute("for", temp_data.GUID);
    
    let nearMiss_cpoe_card_med_info_container = document.createElement("div");
    nearMiss_cpoe_card_med_info_container.classList.add("nearMiss_cpoe_card_med_info_container");

    let ppnsm_cpoe_card_info_top = document.createElement("div");
    ppnsm_cpoe_card_info_top.classList.add("ppnsm_cpoe_card_info_top");

    let ppnms_cm_name_container = document.createElement("div");
    ppnms_cm_name_container.classList.add("ppnms_cm_name_container");
    ppnms_cm_name_container.innerHTML = `
        <div class="ppnms_cm_name">${temp_data.name}</div>
        <div class="ppnms_cm_cht_name">${temp_data.cht_name}</div>
    `;

    let ppnms_cm_large_icon = document.createElement("div");
    ppnms_cm_large_icon.classList.add("ppnms_cm_large_icon");
    ppnms_cm_large_icon.innerHTML = `<img src="../image/iv-bag.png" alt="bottle icon">`;


    ppnsm_cpoe_card_info_top.appendChild(ppnms_cm_name_container);
    if(temp_data.large == "L") ppnsm_cpoe_card_info_top.appendChild(ppnms_cm_large_icon);

    let ppnsm_cpoe_card_info_bottom = document.createElement("div");
    ppnsm_cpoe_card_info_bottom.classList.add("ppnsm_cpoe_card_info_bottom");

    let ppnsm_cpoe_card_info_bottom_left = document.createElement("div");
    ppnsm_cpoe_card_info_bottom_left.classList.add("ppnsm_cpoe_card_info_bottom_left");

    let med_card_code = document.createElement("div");
    med_card_code.classList.add("med_card_code");
    med_card_code.innerHTML = `藥碼：${temp_data.code}`;

    let med_card_ordseq = document.createElement("div");
    med_card_ordseq.classList.add("med_card_ordseq");
    med_card_ordseq.innerHTML = `序號：${temp_data.ordseq}`;

    let med_card_dosage = document.createElement("div");
    med_card_dosage.classList.add("med_card_dosage");
    med_card_dosage.innerHTML = `劑量：${temp_data.dosage} ${temp_data.dunit}`;

    let med_card_freqn = document.createElement("div");
    med_card_freqn.classList.add("med_card_freqn");
    let temp_str = temp_data.freqn.toUpperCase()
    if(temp_str.includes("PRN")) {
        med_card_freqn.innerHTML = `頻次：<span class="s_color">${temp_data.freqn}</span>`;
    } else {
        med_card_freqn.innerHTML = `頻次：${temp_data.freqn}`;
    }

    let med_card_route = document.createElement("div");
    med_card_route.classList.add("med_card_route");
    med_card_route.innerHTML = `途徑：${temp_data.route}`;

    let med_card_unit = document.createElement("div");
    med_card_unit.classList.add("med_card_unit");
    med_card_unit.innerHTML = `單位：${temp_data.dunit}`;

    let med_card_storage = document.createElement("div");
    med_card_storage.classList.add("med_card_storage");
    med_card_storage.innerHTML = `儲位：${temp_data.store_position}`;

    let med_card_other_phar = document.createElement("div");
    med_card_other_phar.classList.add("med_card_other_phar");
    med_card_other_phar.innerHTML = temp_data.pharm_name;

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
    ppnsm_cpoe_card_info_bottom_right.innerHTML = `總量：${temp_data.qty}`;

    ppnsm_cpoe_card_info_bottom.appendChild(ppnsm_cpoe_card_info_bottom_right);

    nearMiss_cpoe_card_med_info_container.appendChild(ppnsm_cpoe_card_info_top);
    nearMiss_cpoe_card_med_info_container.appendChild(ppnsm_cpoe_card_info_bottom);

    nearMiss_cpoe_card.appendChild(nearMiss_cpoe_card_med_info_container);

    let nearMiss_selection_section = document.createElement("div");
    nearMiss_selection_section.classList.add("nearMiss_selection_section");

    nearMiss_type.forEach(element => {
        let ppnms_selection_container = document.createElement("div");
        ppnms_selection_container.classList.add("ppnms_selection_container");

        let ppnms_selection_input = document.createElement("input");
        ppnms_selection_input.classList.add("ppnms_selection_input");
        ppnms_selection_input.id = element.value;
        ppnms_selection_input.value = element.value;
        ppnms_selection_input.name = element.value;
        ppnms_selection_input.type = "checkbox";
        if(nearMiss_data.miss_cpoe[nearMiss_index].type.includes(element.value)) ppnms_selection_input.checked = true;
        ppnms_selection_input.addEventListener("click", () => {
            if (ppnms_selection_input.checked) {
                nearMiss_data.miss_cpoe[nearMiss_index].type.push(ppnms_selection_input.value);
            } else {
                nearMiss_data.miss_cpoe[nearMiss_index].type = nearMiss_data.miss_cpoe[nearMiss_index].type.filter(item => {
                    return item !== ppnms_selection_input.value
                });
            }
        });

        let ppnms_selection_label = document.createElement("label");
        ppnms_selection_label.classList.add("ppnms_selection_label");
        ppnms_selection_label.innerHTML = element.name;
        ppnms_selection_label.setAttribute("for", element.value);

        ppnms_selection_container.appendChild(ppnms_selection_input);
        ppnms_selection_container.appendChild(ppnms_selection_label);

        nearMiss_selection_section.appendChild(ppnms_selection_container);
    });

    let nearMiss_notifiy_container = document.createElement("div");
    nearMiss_notifiy_container.classList.add("nearMiss_notifiy_container");

    let ppnms_notifiy_label = document.createElement("label");
    ppnms_notifiy_label.classList.add("ppnms_notifiy_label");
    ppnms_notifiy_label.innerHTML = "其他";
    ppnms_notifiy_label.setAttribute("for", "notifiy_content");

    let ppnms_notifiy_input = document.createElement("textarea");
    ppnms_notifiy_input.classList.add("ppnms_notifiy_input");
    ppnms_notifiy_input.id = "notifiy_content";
    ppnms_notifiy_input.name = "notifiy_content";
    ppnms_notifiy_input.rows = "5";
    ppnms_notifiy_input.cols = "50";
    ppnms_notifiy_input.maxLength = 500;
    if(nearMiss_data.miss_cpoe[nearMiss_index].content) ppnms_notifiy_input.value = nearMiss_data.miss_cpoe[nearMiss_index].content;
    ppnms_notifiy_input.addEventListener("change", () => {
        nearMiss_data.miss_cpoe[nearMiss_index].content = ppnms_notifiy_input.value;
    })

    nearMiss_notifiy_container.appendChild(ppnms_notifiy_label);
    nearMiss_notifiy_container.appendChild(ppnms_notifiy_input);

    ppnms_main_display.appendChild(nearMiss_cpoe_card);
    ppnms_main_display.appendChild(nearMiss_selection_section);
    ppnms_main_display.appendChild(nearMiss_notifiy_container);
}
function set_ppnms_note_page() {
    let ppnms_main_display = document.querySelector(".ppnms_main_display");
    ppnms_main_display.innerHTML = "";

    let ppnms_notifiy_label = document.createElement("label");
    ppnms_notifiy_label.classList.add("ppnms_notifiy_label");
    ppnms_notifiy_label.innerHTML = "備註";
    ppnms_notifiy_label.setAttribute("for", "notifiy_content");

    let ppnms_notifiy_input = document.createElement("textarea");
    ppnms_notifiy_input.classList.add("ppnms_notifiy_input");
    ppnms_notifiy_input.id = "notifiy_content";
    ppnms_notifiy_input.name = "notifiy_content";
    ppnms_notifiy_input.rows = "10";
    ppnms_notifiy_input.cols = "50";
    ppnms_notifiy_input.maxLength = 500;
    ppnms_notifiy_input.addEventListener("change", () => {
        nearMiss_data.note.content = ppnms_notifiy_input.value;
    })
    if(nearMiss_data.note.checked) ppnms_notifiy_input.value = nearMiss_data.note.content;

    ppnms_main_display.appendChild(ppnms_notifiy_label);
    ppnms_main_display.appendChild(ppnms_notifiy_input);
}
function set_ppnms_submit_page() {
    let ppnms_main_display = document.querySelector(".ppnms_main_display");
    ppnms_main_display.innerHTML = "";

    let temp_arr = [];

    for (let i = 0; i < nearMiss_data.miss_cpoe.length; i++) {
        const element = nearMiss_data.miss_cpoe[i];

        let temp_object = current_p_bed_data.cpoe.find(item => item.GUID === element.GUID);
        temp_arr.push(temp_object);
    }

    console.log(temp_arr);
    if(Array.isArray(temp_arr)) {
        temp_arr.forEach((element, index) => {
            let nearMiss_cpoe_card = document.createElement("label");
            nearMiss_cpoe_card.classList.add("nearMiss_cpoe_card");
            nearMiss_cpoe_card.setAttribute("GUID", element.GUID);
            nearMiss_cpoe_card.setAttribute("for", element.GUID);
            
            let nearMiss_cpoe_card_med_info_container = document.createElement("div");
            nearMiss_cpoe_card_med_info_container.classList.add("nearMiss_cpoe_card_med_info_container");

            let ppnsm_cpoe_card_info_top = document.createElement("div");
            ppnsm_cpoe_card_info_top.classList.add("ppnsm_cpoe_card_info_top");

            let ppnms_cm_name_container = document.createElement("div");
            ppnms_cm_name_container.classList.add("ppnms_cm_name_container");
            ppnms_cm_name_container.innerHTML = `
                <div class="ppnms_cm_name">${element.name}</div>
                <div class="ppnms_cm_cht_name">${element.cht_name}</div>
            `;

            let ppnms_cm_large_icon = document.createElement("div");
            ppnms_cm_large_icon.classList.add("ppnms_cm_large_icon");
            ppnms_cm_large_icon.innerHTML = `<img src="../image/iv-bag.png" alt="bottle icon">`;


            ppnsm_cpoe_card_info_top.appendChild(ppnms_cm_name_container);
            if(element.large == "L") ppnsm_cpoe_card_info_top.appendChild(ppnms_cm_large_icon);

            let ppnsm_cpoe_card_info_bottom = document.createElement("div");
            ppnsm_cpoe_card_info_bottom.classList.add("ppnsm_cpoe_card_info_bottom");

            let ppnsm_cpoe_card_info_bottom_left = document.createElement("div");
            ppnsm_cpoe_card_info_bottom_left.classList.add("ppnsm_cpoe_card_info_bottom_left");

            let med_card_code = document.createElement("div");
            med_card_code.classList.add("med_card_code");
            med_card_code.innerHTML = `藥碼：${element.code}`;

            let med_card_ordseq = document.createElement("div");
            med_card_ordseq.classList.add("med_card_ordseq");
            med_card_ordseq.innerHTML = `序號：${element.ordseq}`;

            let med_card_dosage = document.createElement("div");
            med_card_dosage.classList.add("med_card_dosage");
            med_card_dosage.innerHTML = `劑量：${element.dosage} ${element.dunit}`;

            let med_card_freqn = document.createElement("div");
            med_card_freqn.classList.add("med_card_freqn");
            let temp_str = element.freqn.toUpperCase()
            if(temp_str.includes("PRN")) {
                med_card_freqn.innerHTML = `頻次：<span class="s_color">${element.freqn}</span>`;
            } else {
                med_card_freqn.innerHTML = `頻次：${element.freqn}`;
            }

            let med_card_route = document.createElement("div");
            med_card_route.classList.add("med_card_route");
            med_card_route.innerHTML = `途徑：${element.route}`;

            let med_card_unit = document.createElement("div");
            med_card_unit.classList.add("med_card_unit");
            med_card_unit.innerHTML = `單位：${element.dunit}`;

            let med_card_storage = document.createElement("div");
            med_card_storage.classList.add("med_card_storage");
            med_card_storage.innerHTML = `儲位：${element.store_position}`;

            let med_card_other_phar = document.createElement("div");
            med_card_other_phar.classList.add("med_card_other_phar");
            med_card_other_phar.innerHTML = element.pharm_name;

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
            ppnsm_cpoe_card_info_bottom_right.innerHTML = `總量：${element.qty}`;

            ppnsm_cpoe_card_info_bottom.appendChild(ppnsm_cpoe_card_info_bottom_right);


            nearMiss_cpoe_card_med_info_container.appendChild(ppnsm_cpoe_card_info_top);
            nearMiss_cpoe_card_med_info_container.appendChild(ppnsm_cpoe_card_info_bottom);

            
            nearMiss_cpoe_card.appendChild(nearMiss_cpoe_card_med_info_container);

            let nearMiss_log_container = document.createElement("div");
            nearMiss_log_container.classList.add("nearMiss_log_container");

            if(Array.isArray(nearMiss_data.miss_cpoe[index].type)) {
                nearMiss_data.miss_cpoe[index].type.forEach(item => {
                    let ppnms_type_card = document.createElement("div");
                    ppnms_type_card.classList.add("ppnms_type_card");
    
                    let info_object = nearMiss_type.find(a => a.value === item);
                    
                    ppnms_type_card.innerHTML = info_object.name;

                    nearMiss_log_container.appendChild(ppnms_type_card);
                });
            };

            let ppnms_type_content = document.createElement("div");
            ppnms_type_content.classList.add("ppnms_type_content");
            ppnms_type_content.innerText = `補充：\n${nearMiss_data.miss_cpoe[index].content}`;

            ppnms_main_display.appendChild(nearMiss_cpoe_card);
            if(nearMiss_data.miss_cpoe[index].type.length > 0) ppnms_main_display.appendChild(nearMiss_log_container);
            if(nearMiss_data.miss_cpoe[index].content) ppnms_main_display.appendChild(ppnms_type_content);
        });

        if(nearMiss_data.note.checked) {
            let ppnms_last_note_contaienr = document.createElement("div");
            ppnms_last_note_contaienr.classList.add("ppnms_last_note_contaienr");
            ppnms_last_note_contaienr.innerHTML = `
                <div>其他：</div>
                <div>${nearMiss_data.note.content}</div>
            `;

            ppnms_main_display.appendChild(ppnms_last_note_contaienr);
        }
    }
}