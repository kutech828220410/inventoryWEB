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
    ppbc_h_title.innerHTML = `病床異動`;

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
    });

    ppbc_footer_container.appendChild(ppbc_search_btn);
    ppbc_footer_container.appendChild(ppbc_sort_all_btn);

    return ppbc_footer_container;
}
function popup_bed_change_div_close() {
    popup_bed_change_div.Set_Visible(false);
}
async function popup_bed_change_div_open() {
    let post_data = {
        ValueAry:[""]
    };

    let return_data = await get_bed_status(post_data);

    bed_change_data = return_data.Data;
    console.log(bed_change_data);
    set_ppbc_display();

    popup_bed_change_div.Set_Visible(true);
}

function set_ppbc_display() {
    let ppbc_main_container = document.querySelector(".ppbc_main_container");
    ppbc_main_container.innerHTML = '';

    if(dispaly_bed_change_data.length == 0) dispaly_bed_change_data = bed_change_data;

    dispaly_bed_change_data.forEach(element => {
        let ppbc_card_container = document.createElement("div");
        ppbc_card_container.classList.add("ppbc_card_container");
        if(element.status == "轉入") {
            ppbc_card_container.classList.add("ppbc_bed_in_bg");
        } else {
            ppbc_card_container.classList.add("ppbc_bed_out_bg");
        }

        let ppbc_paitient_name = document.createElement("div");
        ppbc_paitient_name.classList.add("ppbc_paitient_name");
        ppbc_paitient_name.innerHTML = element.name;

        let ppbc_paitient_status = document.createElement("div");
        ppbc_paitient_status.classList.add("ppbc_paitient_status");
        ppbc_paitient_status.innerHTML = element.status;

        let ppbc_paitient_time = document.createElement("div");
        ppbc_paitient_time.classList.add("ppbc_paitient_time");
        ppbc_paitient_time.innerHTML = element.move_time;

        let ppbc_paitient_bed = document.createElement("div");
        ppbc_paitient_bed.classList.add("ppbc_paitient_bed");
        if(element.status == "轉入") {
            ppbc_paitient_bed.innerHTML = element.bed_new;
        } else {
            ppbc_paitient_bed.innerHTML = element.bed_old;
        }
    
        ppbc_card_container.appendChild(ppbc_paitient_name);
        ppbc_card_container.appendChild(ppbc_paitient_status);
        ppbc_card_container.appendChild(ppbc_paitient_time);
        ppbc_card_container.appendChild(ppbc_paitient_bed);

        ppbc_main_container.appendChild(ppbc_card_container);
    });
}

// function ppbc_formatDateTime(dateTimeStr) {
//     let [date, time] = dateTimeStr.split(" ");
//     let [year, month, day] = date.split("/");
//     let [hour, minute, second] = time.split(":");

//     return `${year}年${parseInt(month)}月${parseInt(day)}日 ${parseInt(hour)}點${parseInt(minute)}分${parseInt(second)}秒`;
// }