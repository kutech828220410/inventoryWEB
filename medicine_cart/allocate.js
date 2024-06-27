let med_cart_data;
// 調劑畫面生成
function allocate_diplay_logic() {
    if(last_current_cart == "") {
        console.log("調劑功能畫面初生成");
        patient_bed_index = 0;
        allocate_display_init();
    } else if(current_cart != last_current_cart && last_current_cart != "") {
        console.log("調劑功能畫面init，藥車切換");
        patient_bed_index = 0;
        allocate_display_init();
    }

    // 根據選取的調劑台解鎖藥品
    if(current_med_table != "") {
        console.log("切換調劑台");
    } else {
        console.log("未選調劑台");
    }

    return;
}

// 產生調劑台畫面
function allocate_display_init() {
    console.log("調劑功能畫面產生");
    func_display_init();

    let function_display_container = document.querySelector(".function_display_container");

    let p_bed_header = get_p_bed_header();

    function_display_container.appendChild(p_bed_header);
}

function get_p_bed_header() {
    let p_bed_header = document.createElement("div");
    p_bed_header.classList.add("p_bed_header");

    let pb_name_display = document.createElement("div");
    pb_name_display.classList.add("pb_name_display");

    let pb_name_title = document.createElement("span");
    pb_name_title.classList.add("pb_name_title");
    pb_name_title.innerHTML = "病床號：";

    let pb_name_content = document.createElement("span");
    pb_name_content.classList.add("pb_name_content");
    pb_name_content.innerHTML = `這裡放病床名`;

    pb_name_display.appendChild(pb_name_title);
    pb_name_display.appendChild(pb_name_content);

    let pb_btn_container = document.createElement("div");
    pb_btn_container.classList.add("pb_btn_container");

    let pb_list_btn = document.createElement("div");
    pb_list_btn.classList.add("btn");
    pb_list_btn.classList.add("pb_list_btn");
    pb_list_btn.innerHTML = "病床清單";
    
    let pb_list_notice = document.createElement("img");
    pb_list_notice.classList.add("pb_list_notice");
    pb_list_notice.classList.add("display_none");
    pb_list_notice.src = '../image/change.png'
    
    pb_list_btn.appendChild(pb_list_notice);
    pb_btn_container.appendChild(pb_list_btn);

    // pb_btn_container.appendChild();
    // pb_btn_container.appendChild();

    p_bed_header.appendChild(pb_name_display);
    p_bed_header.appendChild(pb_btn_container);

    return p_bed_header;
}