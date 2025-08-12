let popup_dc_new_div;
let dc_new_p_bed_data;
let temp_pp_dn_index = 0;

function get_popup_dc_new() {
    popup_dc_new_div = new Basic_popup_Div('popup_dc_new_div','popup_dc_new_div','','');
    popup_dc_new_div._popup_div.style.border = '10px solid white';

    let header = get_pp_dc_new_header();
    let main = get_pp_dc_new_main();
    let footer = get_pp_dc_new_footer();

    popup_dc_new_div.AddControl(header);
    popup_dc_new_div.AddControl(main);
    popup_dc_new_div.AddControl(footer);

    return popup_dc_new_div;
};
function get_pp_dc_new_header() {
    let ppdn_header_container = document.createElement("div");
    ppdn_header_container.classList.add("ppdn_header_container");

    let ppdn_h_title = document.createElement("div");
    ppdn_h_title.classList.add("ppdn_h_title");
    ppdn_h_title.innerText = "歷程清單";

    let ppdn_h_close_btn = document.createElement("img");
    ppdn_h_close_btn.classList.add("ppdn_h_close_btn");
    ppdn_h_close_btn.src = "../image/close.png";
    ppdn_h_close_btn.addEventListener("click", () => {
        popup_dc_new_div_close();
    });

    let ppdn_h_cart_name = document.createElement("div");
    ppdn_h_cart_name.classList.add("ppdn_h_cart_name");
    ppdn_h_cart_name.innerHTML = "C069";

    ppdn_header_container.appendChild(ppdn_h_title);
    ppdn_header_container.appendChild(ppdn_h_close_btn);
    ppdn_header_container.appendChild(ppdn_h_cart_name);

    return ppdn_header_container;
}
function get_pp_dc_new_main() {
    let ppdn_main_container = document.createElement("div");
    ppdn_main_container.classList.add("ppdn_main_container");

    return ppdn_main_container;
}
function get_pp_dc_new_footer() {
    let ppdn_footer_container = document.createElement("div");
    ppdn_footer_container.classList.add("ppdn_footer_container");

    let ppdn_pre_bed_btn = document.createElement("div");
    ppdn_pre_bed_btn.classList.add("ppdn_pre_bed_btn");
    ppdn_pre_bed_btn.classList.add("disable_btn");
    ppdn_pre_bed_btn.classList.add("btn");
    ppdn_pre_bed_btn.innerHTML = "上一床";
    ppdn_pre_bed_btn.addEventListener("click", () => {
        pp_dc_new_pre();
    })

    let ppdn_next_bed_btn = document.createElement("div");
    ppdn_next_bed_btn.classList.add("ppdn_next_bed_btn");
    ppdn_next_bed_btn.classList.add("btn");
    ppdn_next_bed_btn.innerHTML = "下一床";
    ppdn_next_bed_btn.addEventListener("click", () => {
        pp_dc_new_next();
    })

    ppdn_footer_container.appendChild(ppdn_pre_bed_btn);
    ppdn_footer_container.appendChild(ppdn_next_bed_btn);

    return ppdn_footer_container;
}
function popup_dc_new_div_close() {
    popup_dc_new_div.Set_Visible(false);
}
function popup_dc_new_div_open() {
    open_dc_new_func();
    popup_dc_new_div.Set_Visible(true);
}
function set_dc_new_info_table() {
    let bed_name = dc_new_p_bed_data[0].bednum;
    let med_array = dc_new_p_bed_data[0].cpoe_change;
    let table_th_arr = ["序號", "藥名", "（中）", "DC/NEW", "劑量", "頻次", "更新時間"];

    let ppdn_main_container = document.querySelector(".ppdn_main_container");
    ppdn_main_container.innerHTML = "";

    let ppdn_main_table = document.createElement("table");
    ppdn_main_table.classList.add("ppdn_main_table");

    let ppdn_p_bed_name_container = document.createElement("tr");
    ppdn_p_bed_name_container.classList.add("ppdn_p_bed_name_container");

    let ppdn_p_bed_name = document.createElement("td");
    ppdn_p_bed_name.classList.add("ppdn_p_bed_name");
    ppdn_p_bed_name.innerHTML = `${current_cart.hnursta}-${bed_name}`;
    ppdn_p_bed_name.colSpan = 8;

    ppdn_p_bed_name_container.appendChild(ppdn_p_bed_name);
    ppdn_main_table.appendChild(ppdn_p_bed_name_container);

    let ppdn_med_th_container = document.createElement("tr");
    ppdn_med_th_container.classList.add("ppdn_med_th_container");

    table_th_arr.forEach((element, index) => {
        let ppdn_med_th = document.createElement("th");
        ppdn_med_th.classList.add(`td_${index}`);
        ppdn_med_th.classList.add("ppdn_med_th");
        ppdn_med_th.innerHTML = element;

        ppdn_med_th_container.appendChild(ppdn_med_th);
    });

    ppdn_main_table.appendChild(ppdn_med_th_container);

    if(med_array.length == 0) {

    } else {
        med_array.forEach((element, index) => {
            let ppdn_med_td_container = document.createElement("tr");
            ppdn_med_td_container.classList.add("ppdn_med_td_container");
            if(index % 2 != 0) {
                ppdn_med_td_container.classList.add("bgc_light");
            }
    
            for (let i = 0; i < 7; i++) {
                let ppdn_med_td = document.createElement("th");
                ppdn_med_td.classList.add(`td_${i}`);
                ppdn_med_td.classList.add("ppdn_med_td");
    
                switch (i) {
                    case 0:
                        // 序號
                        ppdn_med_td.innerHTML = element.ordseq;
                        break;
                    case 1:
                        // 藥名
                        ppdn_med_td.innerHTML = element.name;
                        break;
                    case 2:
                        // 中文名
                        if(element.cht_name == "") {
                            ppdn_med_td.innerHTML = "無";
                        } else {
                            ppdn_med_td.innerHTML = element.cht_name;
                        }
                        break;
                    case 3:
                        // dc or new
                        ppdn_med_td.innerHTML = element.status;
                        break;
                    case 4:
                        // 劑量
                        ppdn_med_td.innerHTML = element.qty;
                        break;
                    case 5:
                        // 單位
                        ppdn_med_td.innerHTML = element.freqn;
                        break;
                    case 6:
                        // 單位
                        ppdn_med_td.innerHTML = element.update_time;
                        break;
                
                    default:
                        break;
                }
        
                ppdn_med_td_container.appendChild(ppdn_med_td);
            }
    
            ppdn_main_table.appendChild(ppdn_med_td_container);
        });
    }


    ppdn_main_container.appendChild(ppdn_main_table);
}
async function open_dc_new_func() {
    let ppdn_h_cart_name = document.querySelector(".ppdn_h_cart_name");
    ppdn_h_cart_name.innerHTML = current_cart.hnursta;
    let post_data = {
        ValueAry: [current_p_bed_data.GUID]
    };
    dc_new_p_bed_data = await get_medChange_by_GUID(post_data);
    dc_new_p_bed_data = dc_new_p_bed_data.Data;
    console.log("asdf");

    for (let index = 0; index < med_cart_beds_data.length; index++) {
        let element = med_cart_beds_data[index];
        if(current_p_bed_data.GUID == element.GUID) {
            temp_pp_dn_index = index;
            break;
        }
    }

    let ppdn_next_bed_btn = document.querySelector(".ppdn_next_bed_btn");
    let ppdn_pre_bed_btn = document.querySelector(".ppdn_pre_bed_btn");
    ppdn_pre_bed_btn.classList.remove("disable_btn");
    ppdn_next_bed_btn.classList.remove("disable_btn");

    if(final_patient_bed_index == temp_pp_dn_index) {
        ppdn_next_bed_btn.classList.add("disable_btn");
    } 
    if(first_patient_bed_index == temp_pp_dn_index) {
        ppdn_pre_bed_btn.classList.add("disable_btn");
    }

    set_dc_new_info_table();
}
async function pp_dc_new_next() {
    let ppdn_next_bed_btn = document.querySelector(".ppdn_next_bed_btn");
    let ppdn_pre_bed_btn = document.querySelector(".ppdn_pre_bed_btn");
    if(ppdn_next_bed_btn.classList.contains("disable_btn")) return;

    do {
        temp_pp_dn_index++;
    } while(med_cart_beds_data[temp_pp_dn_index]["bed_status"] != "已佔床");
    let post_data = {
        ValueAry: [med_cart_beds_data[temp_pp_dn_index].GUID]
    };

    dc_new_p_bed_data = await get_medChange_by_GUID(post_data);
    dc_new_p_bed_data = dc_new_p_bed_data.Data;

    if(final_patient_bed_index == temp_pp_dn_index) {
        ppdn_next_bed_btn.classList.add("disable_btn");
        ppdn_pre_bed_btn.classList.remove("disable_btn");
    } else {
        ppdn_next_bed_btn.classList.remove("disable_btn");
        ppdn_pre_bed_btn.classList.remove("disable_btn");
    }

    set_dc_new_info_table();
}
async function pp_dc_new_pre() {
    let ppdn_next_bed_btn = document.querySelector(".ppdn_next_bed_btn");
    let ppdn_pre_bed_btn = document.querySelector(".ppdn_pre_bed_btn");
    if(ppdn_pre_bed_btn.classList.contains("disable_btn")) return;

    do {
        temp_pp_dn_index--;
    } while(med_cart_beds_data[temp_pp_dn_index]["bed_status"] != "已佔床");
    let post_data = {
        ValueAry: [med_cart_beds_data[temp_pp_dn_index].GUID]
    };

    dc_new_p_bed_data = await get_medChange_by_GUID(post_data);
    dc_new_p_bed_data = dc_new_p_bed_data.Data;

    if(first_patient_bed_index == temp_pp_dn_index) {
        ppdn_next_bed_btn.classList.remove("disable_btn");
        ppdn_pre_bed_btn.classList.add("disable_btn");
    } else {
        ppdn_next_bed_btn.classList.remove("disable_btn");
    }

    set_dc_new_info_table();
}
