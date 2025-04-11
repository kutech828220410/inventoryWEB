let popup_bed_change_div;

function get_popup_bed_change() {
    popup_bed_change_div = new Basic_popup_Div('popup_bed_change_div','popup_bed_change_div','','');
    popup_bed_change_div._popup_div.style.border = '10px solid white';

    let header = get_pp_bed_change_header();
    let main = get_pp_bed_change_main();
    let footer = get_pp_bed_change_footer();

    popup_bed_change_div.AddControl(header);
    popup_bed_change_div.AddControl(main);
    popup_bed_change_div.AddControl(footer);

    return popup_bed_change_div;
};
function get_pp_bed_change_header() {
    let ppbc_header_container = document.createElement("div");
    ppbc_header_container.classList.add("ppbc_header_container");

    let ppbc_h_title = document.createElement("div");
    ppbc_h_title.classList.add("ppbc_h_title");
    
    let ppbc_h_current_cart_select = document.createElement("select");
    ppbc_h_current_cart_select.classList.add("ppbc_h_current_cart_select");
    ppbc_h_current_cart_select.addEventListener("change", async () => {
        let post_data = {
            ValueAry:[current_pharmacy.phar, ppbc_h_current_cart_select.value],
        };
    
        console.log(post_data);
        let return_data = await get_bed_status(post_data);
    
        let temp_arr = return_data.Data
    
        temp_arr.sort((a, b) => {
            let nameCompare = a.name.localeCompare(b.name, 'und', { sensitivity: 'base' });
            if (nameCompare === 0) {
                return new Date(a.move_time) - new Date(b.move_time); // 如果 name 相同，按照 move_time 排序
            }
            return nameCompare;
        });
    
        bed_change_data = temp_arr;
        console.log(bed_change_data);
        set_ppbc_display();
    });

    let ppbc_h_title_content = document.createElement("div");
    ppbc_h_title_content.classList.add("ppbc_h_title_content");
    ppbc_h_title_content.innerHTML = `病床異動`;

    ppbc_h_title.appendChild(ppbc_h_current_cart_select);
    ppbc_h_title.appendChild(ppbc_h_title_content);

    let ppbc_h_close_btn = document.createElement("img");
    ppbc_h_close_btn.classList.add("ppbc_h_close_btn");
    ppbc_h_close_btn.src = "../image/close.png";
    ppbc_h_close_btn.addEventListener("click", () => {
        popup_bed_change_div_close();
    });

    ppbc_header_container.appendChild(ppbc_h_title);
    ppbc_header_container.appendChild(ppbc_h_close_btn);
    // ppbc_header_container.appendChild(ppbc_h_cart_name);

    return ppbc_header_container;
}
function get_pp_bed_change_main() {
    let ppbc_main_container = document.createElement("div");
    ppbc_main_container.classList.add("ppbc_main_container");

    let ppbc_main_radio_container = document.createElement("div");
    ppbc_main_radio_container.classList.add("ppbc_main_radio_container");

    let arr = [
        { cht: "全部", value: "all" },
        { cht: "轉入", value: "in" },
        { cht: "轉出", value: "out" },
        { cht: "轉床", value: "change" }
    ];

    arr.forEach(item => {
        let label = document.createElement("label");
        label.textContent = item.cht;
        label.classList.add("ppbc_main_radio_label");
        label.setAttribute('for', `ppbc_main_radio_${item.value}`);

        let input = document.createElement("input");
        input.id = `ppbc_main_radio_${item.value}`;
        input.classList.add("ppbc_main_radio");
        input.type = "radio";
        input.name = "ppbc_main_radio";
        input.value = item.value;
        input.addEventListener("change", () => {
            set_ppbc_display();
        })
        if (item.value == "all") input.checked = true;

        ppbc_main_radio_container.appendChild(input);
        ppbc_main_radio_container.appendChild(label);
    });

    let ppbc_display_container = document.createElement("div");
    ppbc_display_container.classList.add("ppbc_display_container");

    ppbc_main_container.appendChild(ppbc_main_radio_container);
    ppbc_main_container.appendChild(ppbc_display_container);

    return ppbc_main_container;
}
function get_pp_bed_change_footer() {
    let ppbc_footer_container = document.createElement("div");
    ppbc_footer_container.classList.add("ppbc_footer_container");

    let ppbc_search_btn = document.createElement("div");
    ppbc_search_btn.classList.add("ppbc_search_btn");
    ppbc_search_btn.classList.add("btn");
    ppbc_search_btn.innerHTML = '搜尋';
    ppbc_search_btn.addEventListener("click", () => {
        popup_bed_change_search_div_open();
    });

    let ppbc_sort_all_btn = document.createElement("div");
    ppbc_sort_all_btn.classList.add("ppbc_sort_all_btn");
    ppbc_sort_all_btn.classList.add("btn");
    ppbc_sort_all_btn.innerHTML = '顯示全部';
    ppbc_sort_all_btn.addEventListener("click", () => {
        dispaly_bed_change_data = bed_change_data;
        set_ppbc_display();
        ppbcs_init_search();
    });

    ppbc_footer_container.appendChild(ppbc_search_btn);
    ppbc_footer_container.appendChild(ppbc_sort_all_btn);

    return ppbc_footer_container;
}
function popup_bed_change_div_close() {
    popup_bed_change_div.Set_Visible(false);
}
async function popup_bed_change_div_open() {
    if(!current_pharmacy.phar) {
        alert("請先選擇藥局");
        return;
    }
    let ppbc_h_current_cart_select = document.querySelector(".ppbc_h_current_cart_select");
    if(current_cart.hnursta && ppbc_h_current_cart_select.value != current_cart.hnursta) {
        ppbc_h_current_cart_select.value = current_cart.hnursta;
    }

    let post_data = {
        ValueAry:[current_pharmacy.phar, ppbc_h_current_cart_select.value],
    };

    console.log(post_data);
    let return_data = await get_bed_status(post_data);

    let temp_arr = return_data.Data

    temp_arr.sort((a, b) => {
        let nameCompare = a.name.localeCompare(b.name, 'und', { sensitivity: 'base' });
        if (nameCompare === 0) {
            return new Date(a.move_time) - new Date(b.move_time); // 如果 name 相同，按照 move_time 排序
        }
        return nameCompare;
    });

    bed_change_data = temp_arr;
    console.log(bed_change_data);
    set_ppbc_display();

    popup_bed_change_div.Set_Visible(true);
}

function set_ppbc_display() {
    let status_radio = document.querySelector('input[name="ppbc_main_radio"]:checked');
    let ppbc_display_container = document.querySelector(".ppbc_display_container");
    ppbc_display_container.innerHTML = '';

    dispaly_bed_change_data = bed_change_data;

    dispaly_bed_change_data.forEach(element => {
        let ppbc_card_container = document.createElement("div");
        ppbc_card_container.classList.add("ppbc_card_container");
        switch (status_radio.value) {
            case "in":
                if(element.status != "轉入") ppbc_card_container.style.display = "none";
                break;
            case "out":
                if(element.status != "轉出") ppbc_card_container.style.display = "none";
                break;
            case "change":
                if(element.status != "轉床") ppbc_card_container.style.display = "none";
                break;
            default:
                break;
        }
        if(element.status == "轉入") {
            ppbc_card_container.classList.add("ppbc_bed_in_bg");
        } else if(element.status == "轉床") {
            ppbc_card_container.classList.add("ppbc_bed_change_bg");
        } else {
            ppbc_card_container.classList.add("ppbc_bed_out_bg");
        }

        let ppbc_paitient_name = document.createElement("div");
        ppbc_paitient_name.classList.add("ppbc_paitient_name");
        ppbc_paitient_name.innerHTML = `${element.histno} - ${element.name}`;

        let ppbc_paitient_status = document.createElement("div");
        ppbc_paitient_status.classList.add("ppbc_paitient_status");
        ppbc_paitient_status.innerHTML = element.status;

        let ppbc_paitient_time = document.createElement("div");
        ppbc_paitient_time.classList.add("ppbc_paitient_time");
        ppbc_paitient_time.innerHTML = element.move_time;

        let ppbc_paitient_bed = document.createElement("div");
        ppbc_paitient_bed.classList.add("ppbc_paitient_bed");

        let ppbc_paitient_bed_span_another = document.createElement("span");
        ppbc_paitient_bed_span_another.classList.add("ppbc_paitient_bed_span_another");
        ppbc_paitient_bed_span_another.innerHTML = `${element.bed_old}<br>`;

        let ppbc_paitient_bed_span = document.createElement("span");
        ppbc_paitient_bed_span.classList.add("ppbc_paitient_bed_span");
        ppbc_paitient_bed_span.addEventListener("click", async () => {
            Set_main_div_enable(true);
            let bedInfo = element.status == "轉出" ? element.bed_old : element.bed_new;
            let str_arr = bedInfo.split("-");

            let cart_content = document.querySelector(".cart_content");
            let get_nunnum = false;

            for (let i = 0; i < cart_list.length; i++) {
                const element = cart_list[i];
                if(element.hnursta == str_arr[0]) {
                    get_nunnum = true
                    await set_post_data_to_check_dispense();
                    if(current_cart.hnursta != element.hnursta) {
                        last_current_cart = current_cart;
                        cart_content.innerHTML = element.hnursta;
                        current_cart = element;
                    }

                    med_cart_beds_data = await get_bed_list_by_cart(current_pharmacy.phar, current_cart.hnursta);
                    med_cart_beds_data = med_cart_beds_data.Data;

                    for (let i = 0; i < med_cart_beds_data.length; i++) {
                        const element = med_cart_beds_data[i];
                        if(element.bednum == str_arr[1]) {
                            if(current_cart.hnursta == element.hnursta) {
                                last_patient_bed_index = patient_bed_index;
                            } else {
                                last_patient_bed_index = -1
                            }
                            patient_bed_index = i;
                        }
                    }

                    allocate_display_init("");
                    popup_bed_change_div_close();
                    break;
                }
            };

            if(!get_nunnum) {
                alert("無該護理站資料");
                Set_main_div_enable(false);
            }
        });
        if(element.status == "轉入") {
            ppbc_paitient_bed_span.innerHTML = element.bed_new;
        } else if(element.status == "轉出") {
            ppbc_paitient_bed_span.innerHTML = element.bed_old;
        } else {
            ppbc_paitient_bed_span.innerHTML = `=> ${element.bed_new}`;
            ppbc_paitient_bed.appendChild(ppbc_paitient_bed_span_another);
        }

        ppbc_paitient_bed.appendChild(ppbc_paitient_bed_span);
     
        ppbc_card_container.appendChild(ppbc_paitient_name);
        ppbc_card_container.appendChild(ppbc_paitient_status);
        ppbc_card_container.appendChild(ppbc_paitient_time);
        ppbc_card_container.appendChild(ppbc_paitient_bed);

        ppbc_display_container.appendChild(ppbc_card_container);
    });
}

// function ppbc_formatDateTime(dateTimeStr) {
//     let [date, time] = dateTimeStr.split(" ");
//     let [year, month, day] = date.split("/");
//     let [hour, minute, second] = time.split(":");

//     return `${year}年${parseInt(month)}月${parseInt(day)}日 ${parseInt(hour)}點${parseInt(minute)}分${parseInt(second)}秒`;
// }