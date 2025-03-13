let popup_bed_list_div;

function get_popup_bed_list() {
    popup_bed_list_div = new Basic_popup_Div('popup_bed_list_div','popup_bed_list_div','','');
    popup_bed_list_div._popup_div.style.border = '10px solid white';

    let header = get_pp_bed_list_header();
    let main = get_pp_bed_list_main();
    let footer = get_pp_bed_list_footer();

    popup_bed_list_div.AddControl(header);
    popup_bed_list_div.AddControl(main);
    popup_bed_list_div.AddControl(footer);

    return popup_bed_list_div;
};
function get_pp_bed_list_header() {
    let ppbl_header_container = document.createElement("div");
    ppbl_header_container.classList.add("ppbl_header_container");

    let ppbl_h_title = document.createElement("div");
    ppbl_h_title.classList.add("ppbl_h_title");
    ppbl_h_title.innerHTML = `<span class="ppbl_h_title_span"></span>病床清單`;

    let ppbl_h_close_btn = document.createElement("img");
    ppbl_h_close_btn.classList.add("ppbl_h_close_btn");
    ppbl_h_close_btn.src = "../image/close.png";
    ppbl_h_close_btn.addEventListener("click", () => {
        popup_bed_list_div_close();
    });

    ppbl_header_container.appendChild(ppbl_h_title);
    ppbl_header_container.appendChild(ppbl_h_close_btn);
    // ppbl_header_container.appendChild(ppbl_h_cart_name);

    return ppbl_header_container;
}
function get_pp_bed_list_main() {
    let ppbl_main_container = document.createElement("div");
    ppbl_main_container.classList.add("ppbl_main_container");

    return ppbl_main_container;
}
function get_pp_bed_list_footer() {
    let ppbl_footer_container = document.createElement("div");
    ppbl_footer_container.classList.add("ppbl_footer_container");

    return ppbl_footer_container;
}
function popup_bed_list_div_close() {
    popup_bed_list_div.Set_Visible(false);
}
async function popup_bed_list_div_open() {
    // await allocate_display_init();
    med_cart_beds_data = await get_bed_list_by_cart(current_pharmacy.phar, current_cart.hnursta);
    med_cart_beds_data = med_cart_beds_data.Data;
    await set_pp_bed_list_info();
    popup_bed_list_div.Set_Visible(true);
}

function set_pp_bed_list_info() {
    let ppbl_main_container = document.querySelector(".ppbl_main_container");
    ppbl_main_container.innerHTML = "";

    let ppbl_h_title_span = document.querySelector(".ppbl_h_title_span");
    ppbl_h_title_span.innerHTML = current_cart.hnursta;

    med_cart_beds_data.forEach((element, index) => {
        let pp_bed_card = document.createElement("div");
        pp_bed_card.classList.add("pp_bed_card");
        if(index == patient_bed_index) pp_bed_card.classList.add("pp_current_bed");
        if(index == last_patient_bed_index) pp_bed_card.classList.add("pp_last_selected_bed");
        if(current_func == "allocate") {
            if(element.dispens_status != "") pp_bed_card.classList.add("pp_done_bed");
        } else {
            if(element.check_status != "") pp_bed_card.classList.add("pp_done_bed");
        }
        // if(element["cpoe"].length == 0) pp_bed_card.classList.add("pp_done_bed");
        if(element.bed_status != "已佔床") pp_bed_card.classList.add("pp_nouse_bed");
        // console.log(element);

        pp_bed_card.innerHTML = element.bednum;
        // pp_bed_card.innerHTML = `${element.nurnum}-${element.bednum}`;

        if(element.bed_status == "已佔床") {
            pp_bed_card.addEventListener("click", async () => {
                if(index == patient_bed_index) return;
                Set_main_div_enable(true);
                await set_post_data_to_check_dispense();

                last_patient_bed_index = patient_bed_index;
                patient_bed_index = index;

                if(current_med_table == "" || current_med_table == "all") {
                    if(current_func == "allocate") {
                        current_med_table = "all";
                        last_current_med_table = "all";
                        let med_table_content = document.querySelector(".med_table_content");
                        med_table_content.innerHTML = "全部";
                    }
        
                    post_data = {
                        Value: current_med_table,
                        ValueAry: [med_cart_beds_data[patient_bed_index].GUID]
                    }
                } else {
                    post_data = {
                        Value: current_med_table.name,
                        ValueAry: [med_cart_beds_data[patient_bed_index].GUID]
                    }
                }
            
                current_p_bed_data = await get_patient_GUID(post_data);
                current_p_bed_data = current_p_bed_data.Data;
                console.log("病床跳轉", current_p_bed_data);
    
                allocate_display_init("");
                Set_main_div_enable(false);
                popup_bed_list_div_close();
            });
        }

        let pp_bed_notice = document.createElement("img");
        pp_bed_notice.classList.add("pp_bed_notice");
        pp_bed_notice.src = "../image/notice_mark.png";

        if(element.change == "Y") {
            pp_bed_card.appendChild(pp_bed_notice);
        }

        ppbl_main_container.appendChild(pp_bed_card);
    });
}