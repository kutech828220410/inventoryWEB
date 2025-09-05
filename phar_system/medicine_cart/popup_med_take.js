let popup_med_take_div;
let med_take_data;
let temp_pp_mt_index = 0;

function get_popup_med_take() {
    popup_med_take_div = new Basic_popup_Div('popup_med_take_div','popup_med_take_div','','');
    popup_med_take_div._popup_div.style.border = '10px solid white';

    let header = get_pp_med_take_header();
    let main = get_pp_med_take_main();
    let footer = get_pp_med_take_footer();

    popup_med_take_div.AddControl(header);
    popup_med_take_div.AddControl(main);
    popup_med_take_div.AddControl(footer);

    return popup_med_take_div;
};
function get_pp_med_take_header() {
    let ppmt_header_container = document.createElement("div");
    ppmt_header_container.classList.add("ppmt_header_container");

    let ppmt_h_title = document.createElement("div");
    ppmt_h_title.classList.add("ppmt_h_title");
    ppmt_h_title.innerHTML = `<span class="ppmt_h_title_span">C0XX</span>撈藥清單`;

    let ppmt_h_close_btn = document.createElement("img");
    ppmt_h_close_btn.classList.add("ppmt_h_close_btn");
    ppmt_h_close_btn.src = "../image/close.png";
    ppmt_h_close_btn.addEventListener("click", () => {
        popup_med_take_div_close();
    });

    let ppmt_h_cart_name = document.createElement("div");
    ppmt_h_cart_name.classList.add("ppmt_h_cart_name");
    ppmt_h_cart_name.classList.add("btn");
    ppmt_h_cart_name.innerHTML = "時間設定";
    ppmt_h_cart_name.addEventListener("click", () => {
        popup_med_take_time_div_open();
    });

    ppmt_header_container.appendChild(ppmt_h_title);
    ppmt_header_container.appendChild(ppmt_h_close_btn);
    ppmt_header_container.appendChild(ppmt_h_cart_name);

    return ppmt_header_container;
}
function get_pp_med_take_main() {
    let ppmt_main_container = document.createElement("div");
    ppmt_main_container.classList.add("ppmt_main_container");

    return ppmt_main_container;
}
function get_pp_med_take_footer() {
    let ppmt_footer_container = document.createElement("div");
    ppmt_footer_container.classList.add("ppmt_footer_container");

    let ppmt_pre_bed_btn = document.createElement("div");
    ppmt_pre_bed_btn.classList.add("ppmt_pre_bed_btn");
    ppmt_pre_bed_btn.classList.add("disable_btn");
    ppmt_pre_bed_btn.classList.add("btn");
    ppmt_pre_bed_btn.innerHTML = "上一床";
    ppmt_pre_bed_btn.addEventListener("click", () => {
        pp_med_take_pre();
    })

    let ppmt_next_bed_btn = document.createElement("div");
    ppmt_next_bed_btn.classList.add("ppmt_next_bed_btn");
    ppmt_next_bed_btn.classList.add("btn");
    ppmt_next_bed_btn.innerHTML = "下一床";
    ppmt_next_bed_btn.addEventListener("click", () => {
        pp_med_take_next();
    })

    ppmt_footer_container.appendChild(ppmt_pre_bed_btn);
    ppmt_footer_container.appendChild(ppmt_next_bed_btn);

    return ppmt_footer_container;
}
function popup_med_take_div_close() {
    popup_med_take_div.Set_Visible(false);
}
async function popup_med_take_div_open() {
    await open_med_take_func();
    popup_med_take_div.Set_Visible(true);
}
function set_med_take_info_table() {
    let ppmt_main_container = document.querySelector(".ppmt_main_container");
    ppmt_main_container.innerHTML = "";
    
    if(med_take_data.length == 0) {
        ppmt_main_container.innerHTML = `<span class="ppmt_main_no_data_span">無撈藥資料</span>`;
        return;
    }
    let bed_name = med_take_data[temp_pp_mt_index].bednum;
    let med_array = med_take_data[temp_pp_mt_index].cpoes;
    let table_th_arr = ["序號", "藥名", "DC/NEW", "劑量", "總量", "頻次", "更新時間"];


    let ppmt_main_table = document.createElement("table");
    ppmt_main_table.classList.add("ppmt_main_table");

    let ppmt_p_bed_name_container = document.createElement("tr");
    ppmt_p_bed_name_container.classList.add("ppmt_p_bed_name_container");

    let ppmt_p_bed_name = document.createElement("td");
    ppmt_p_bed_name.classList.add("ppmt_p_bed_name");
    ppmt_p_bed_name.innerHTML = `${current_cart.hnursta}-${bed_name}`;
    ppmt_p_bed_name.colSpan = 8;

    ppmt_p_bed_name_container.appendChild(ppmt_p_bed_name);
    ppmt_main_table.appendChild(ppmt_p_bed_name_container);

    let ppmt_med_th_container = document.createElement("tr");
    ppmt_med_th_container.classList.add("ppmt_med_th_container");

    table_th_arr.forEach((element, index) => {
        let ppmt_med_th = document.createElement("th");
        ppmt_med_th.classList.add(`td_${index}`);
        ppmt_med_th.classList.add("ppmt_med_th");
        ppmt_med_th.innerHTML = element;

        ppmt_med_th_container.appendChild(ppmt_med_th);
    });

    ppmt_main_table.appendChild(ppmt_med_th_container);

    if(med_array.length == 0) {

    } else {
        med_array.forEach((element, index) => {
            let ppmt_med_td_container = document.createElement("tr");
            ppmt_med_td_container.classList.add("ppmt_med_td_container");
            if(index % 2 != 0) {
                ppmt_med_td_container.classList.add("bgc_light");
            }
    
            for (let i = 0; i < 7; i++) {
                let ppmt_med_td = document.createElement("th");
                ppmt_med_td.classList.add(`mt_td_${i}`);
                ppmt_med_td.classList.add("ppmt_med_td");
    
                switch (i) {
                    case 0:
                        // 序號
                        ppmt_med_td.innerHTML = element.ordseq;
                        break;
                    case 1:
                        // 藥名
                        if(element.cht_name) {
                            ppmt_med_td.innerText = element.name;
                            ppmt_med_td.style.textAlign = "left";
                        } else {
                            ppmt_med_td.innerText = `${element.name}\n${element.cht_name}`;
                            ppmt_med_td.style.textAlign = "left";
                        }
                        break;
                    case 2:
                        // dc or new
                        ppmt_med_td.innerHTML = element.status;
                        break;
                    case 3:
                        // 劑量
                        ppmt_med_td.innerHTML = `${element.dosage} ${element.dunit}`;
                        break;
                    case 4:
                        // 總量
                        ppmt_med_td.innerHTML = element.qty;
                        break;
                    case 5:
                        // 頻次
                        ppmt_med_td.innerHTML = element.freqn;
                        break;
                    case 6:
                        // 更新時間
                        ppmt_med_td.innerHTML = element.update_time;
                        break;
                
                    default:
                        break;
                }
        
                ppmt_med_td_container.appendChild(ppmt_med_td);
            }
    
            ppmt_main_table.appendChild(ppmt_med_td_container);
        });
    }

    ppmt_main_container.appendChild(ppmt_main_table);
}
async function open_med_take_func() {
    Set_main_div_enable(true);
    let ppmt_h_title_span = document.querySelector(".ppmt_h_title_span");
    let ppmtt_start_time_input = document.querySelector("#ppmtt_start_time_input");
    let ppmtt_end_time_input = document.querySelector("#ppmtt_end_time_input");

    ppmt_h_title_span.innerHTML = current_cart.hnursta;
    let post_data = {
        ValueAry: [current_pharmacy.phar, current_cart.hnursta, ppmtt_start_time_input.value, ppmtt_end_time_input.value]
    };
    med_take_data = await get_medChange_by_ST_EN(post_data);
    med_take_data = med_take_data.Data;
    console.log(med_take_data);
    med_take_data = set_med_data(med_take_data);
    console.log(med_take_data);

    let temp_current_bed_num = +current_p_bed_data.bednum;
    
    let temp_find_index = findIndexByBednum(med_take_data, temp_current_bed_num);
    if(temp_find_index != -1) temp_pp_mt_index = temp_find_index;
    console.log(temp_current_bed_num);
    console.log(temp_find_index);
    console.log(temp_pp_mt_index);
    
    let ppmt_next_bed_btn = document.querySelector(".ppmt_next_bed_btn");
    let ppmt_pre_bed_btn = document.querySelector(".ppmt_pre_bed_btn");
    ppmt_pre_bed_btn.classList.remove("disable_btn");
    ppmt_next_bed_btn.classList.remove("disable_btn");

    if(med_take_data.length - 1 == temp_pp_mt_index || med_take_data.length == 0) {
        ppmt_next_bed_btn.classList.add("disable_btn");
    } 
    if(0 == temp_pp_mt_index) {
        ppmt_pre_bed_btn.classList.add("disable_btn");
    }
    
    if(med_take_data.length == 0) {
        ppmt_pre_bed_btn.classList.add("disable_btn");
        ppmt_next_bed_btn.classList.add("disable_btn");
    }

    set_med_take_info_table();
    Set_main_div_enable(false);
}
async function pp_med_take_next() {
    let ppmt_next_bed_btn = document.querySelector(".ppmt_next_bed_btn");
    let ppmt_pre_bed_btn = document.querySelector(".ppmt_pre_bed_btn");
    if(ppmt_next_bed_btn.classList.contains("disable_btn")) return;

    // let ppmtt_start_time_input = document.querySelector("#ppmtt_start_time_input");
    // let ppmtt_end_time_input = document.querySelector("#ppmtt_end_time_input");

    // let post_data = {
    //     ValueAry: [current_pharmacy.phar, current_cart.hnursta, ppmtt_start_time_input.value, ppmtt_end_time_input.value]
    // };
    
    // med_take_data = await get_medChange_by_ST_EN(post_data);
    // med_take_data = med_take_data.Data;
    // med_take_data = set_med_data(med_take_data);

    temp_pp_mt_index++;

    if(med_take_data.length - 1 == temp_pp_mt_index) {
        ppmt_next_bed_btn.classList.add("disable_btn");
        ppmt_pre_bed_btn.classList.remove("disable_btn");
    } else {
        ppmt_next_bed_btn.classList.remove("disable_btn");
        ppmt_pre_bed_btn.classList.remove("disable_btn");
    }

    set_med_take_info_table();
}
async function pp_med_take_pre() {
    let ppmt_next_bed_btn = document.querySelector(".ppmt_next_bed_btn");
    let ppmt_pre_bed_btn = document.querySelector(".ppmt_pre_bed_btn");
    if(ppmt_pre_bed_btn.classList.contains("disable_btn")) return;

    
    // let ppmtt_start_time_input = document.querySelector("#ppmtt_start_time_input");
    // let ppmtt_end_time_input = document.querySelector("#ppmtt_end_time_input");

    // let post_data = {
    //     ValueAry: [current_pharmacy.phar, current_cart.hnursta, ppmtt_start_time_input.value, ppmtt_end_time_input.value]
    // };

    // med_take_data = await get_medChange_by_ST_EN(post_data);
    // med_take_data = med_take_data.Data;
    // med_take_data = set_med_data(med_take_data);

    temp_pp_mt_index = temp_pp_mt_index - 1;

    if(first_patient_bed_index == temp_pp_mt_index) {
        ppmt_next_bed_btn.classList.remove("disable_btn");
        ppmt_pre_bed_btn.classList.add("disable_btn");
    } else {
        ppmt_next_bed_btn.classList.remove("disable_btn");
    }

    set_med_take_info_table();
}

function set_med_data(arr) {
    const data = arr;

    const groupedData = Object.values(data.reduce((acc, item) => {
        const key = item.MAster_GUID;
        if (!acc[key]) {
        acc[key] = {
            MAster_GUID: key,
            bednum: item.bednum,
            caseno: item.caseno,
            cpoes: [],
        };
        }
        acc[key].cpoes.push(item);
        return acc;
    }, {})
    );

    return groupedData;
}

function findIndexByBednum(dataArray, targetBednum) {
  const index = dataArray.findIndex(item => +item.bednum === +targetBednum);
  return index !== -1 ? index : -1;
}
