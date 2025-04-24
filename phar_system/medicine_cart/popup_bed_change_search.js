let popup_bed_change_search_div;

function get_popup_bed_change_search() {
    popup_bed_change_search_div = new Basic_popup_Div('popup_bed_change_search_div','popup_bed_change_search_div','','');
    popup_bed_change_search_div._popup_div.style.border = '10px solid white';

    let header = get_pp_bed_change_search_header();
    let main = get_pp_bed_change_search_main();
    let footer = get_pp_bed_change_search_footer();

    popup_bed_change_search_div.AddControl(header);
    popup_bed_change_search_div.AddControl(main);
    popup_bed_change_search_div.AddControl(footer);

    return popup_bed_change_search_div;
};
function get_pp_bed_change_search_header() {
    let ppbcs_header_container = document.createElement("div");
    ppbcs_header_container.classList.add("ppbcs_header_container");

    let ppbcs_h_title = document.createElement("div");
    ppbcs_h_title.classList.add("ppbcs_h_title");
    ppbcs_h_title.innerHTML = `病床異動搜尋`;

    let ppbcs_h_close_btn = document.createElement("img");
    ppbcs_h_close_btn.classList.add("ppbcs_h_close_btn");
    ppbcs_h_close_btn.src = "../image/close.png";
    ppbcs_h_close_btn.addEventListener("click", () => {
        popup_bed_change_search_div_close();
    });

    ppbcs_header_container.appendChild(ppbcs_h_title);
    ppbcs_header_container.appendChild(ppbcs_h_close_btn);
    // ppbcs_header_container.appendChild(ppbcs_h_cart_name);

    return ppbcs_header_container;
}
function get_pp_bed_change_search_main() {
    let ppbcs_main_container = document.createElement("div");
    ppbcs_main_container.classList.add("ppbcs_main_container");

    // let ppbcs_status_select_container = document.createElement("div");
    // ppbcs_status_select_container.classList.add("ppbcs_input_container");

    // let ppbcs_status_select_input = document.createElement("select");
    // ppbcs_status_select_input.classList.add("ppbcs_status_select_input");
    // ppbcs_status_select_input.innerHTML = `
    //     <option value="">轉床狀態</option>
    //     <option value="all">全部</option>
    //     <option value="in">轉入</option>
    //     <option value="change">轉床</option>
    //     <option value="out">轉出</option>
    // `;

    // ppbcs_status_select_container.appendChild(ppbcs_status_select_input);

    let ppbcs_name_input_container = document.createElement("div");
    ppbcs_name_input_container.classList.add("ppbcs_input_container");

    let ppbcs_name_input = document.createElement("input");
    ppbcs_name_input.classList.add("ppbcs_name_input");
    ppbcs_name_input.type = "text";
    ppbcs_name_input.maxLength = 20;
    ppbcs_name_input.placeholder = "請輸入病人姓名";

    ppbcs_name_input_container.appendChild(ppbcs_name_input);

    let ppbcs_nurnum_container = document.createElement("div");
    ppbcs_nurnum_container.classList.add("ppbcs_input_container");

    let ppbcs_nurnum_input = document.createElement("input");
    ppbcs_nurnum_input.classList.add("ppbcs_nurnum_input");
    ppbcs_nurnum_input.type = "text";
    ppbcs_nurnum_input.maxLength = 20;
    ppbcs_nurnum_input.placeholder = "請輸入護理站代號";

    ppbcs_nurnum_container.appendChild(ppbcs_nurnum_input);

    let ppbcs_bednum_container = document.createElement("div");
    ppbcs_bednum_container.classList.add("ppbcs_input_container");

    let ppbcs_bednum_input = document.createElement("input");
    ppbcs_bednum_input.classList.add("ppbcs_bednum_input");
    ppbcs_bednum_input.type = "text";
    ppbcs_bednum_input.maxLength = 20;
    ppbcs_bednum_input.placeholder = "請輸入床號";

    ppbcs_bednum_container.appendChild(ppbcs_bednum_input);

    // ppbcs_main_container.appendChild(ppbcs_status_select_container);
    ppbcs_main_container.appendChild(ppbcs_name_input_container);
    ppbcs_main_container.appendChild(ppbcs_nurnum_container);
    ppbcs_main_container.appendChild(ppbcs_bednum_container);

    return ppbcs_main_container;
}
function get_pp_bed_change_search_footer() {
    let ppbcs_footer_container = document.createElement("div");
    ppbcs_footer_container.classList.add("ppbcs_footer_container");

    let ppbcs_search_result_btn = document.createElement("div");
    ppbcs_search_result_btn.classList.add('ppbcs_search_result_btn');
    ppbcs_search_result_btn.classList.add('btn');
    ppbcs_search_result_btn.innerHTML = "搜尋";
    ppbcs_search_result_btn.addEventListener("click", () => {
        ppbcs_seacrh_result();
    });

    ppbcs_footer_container.appendChild(ppbcs_search_result_btn);

    let ppbcs_search_init_btn = document.createElement("div");
    ppbcs_search_init_btn.classList.add('ppbcs_search_init_btn');
    ppbcs_search_init_btn.classList.add('btn');
    ppbcs_search_init_btn.innerHTML = "清空條件";
    ppbcs_search_init_btn.addEventListener("click", () => {
        ppbcs_init_search();
    });

    ppbcs_footer_container.appendChild(ppbcs_search_init_btn);

    return ppbcs_footer_container;
}
function popup_bed_change_search_div_close() {
    check_cart_dispense();
    popup_bed_change_search_div.Set_Visible(false);
}
async function popup_bed_change_search_div_open() {
    await check_cart_dispense();
    popup_bed_change_search_div.Set_Visible(true);
}
function ppbcs_seacrh_result() {
    let ppbcs_name_input = document.querySelector(".ppbcs_name_input");
    let ppbcs_nurnum_input = document.querySelector(".ppbcs_nurnum_input");
    let ppbcs_bednum_input = document.querySelector(".ppbcs_bednum_input");
    // let ppbcs_status_select_input = document.querySelector(".ppbcs_status_select_input");

    let filteredArr = [];
    // 檢查是否所有條件都是空值
    // if (!ppbcs_name_input.value && !ppbcs_nurnum_input.value && !ppbcs_bednum_input.value && !ppbcs_status_select_input.value) {
    if (!ppbcs_name_input.value && !ppbcs_nurnum_input.value && !ppbcs_bednum_input.value) {
        alert("請至少輸入一個條件！");
        return;
    } else {
        filteredArr = bed_change_data.filter(item => {
            // 條件判斷，預設為 true，若條件有值才進行過濾
            let nameMatch = ppbcs_name_input.value ? item.name.includes(ppbcs_name_input.value) : true;
            
            let bedInfo = item.status == "轉出" ? item.bed_old : item.bed_new;
            let [station, bed] = bedInfo.split("-");

            let stationMatch = ppbcs_nurnum_input.value ? station == ppbcs_nurnum_input.value : true;
            let bedMatch = ppbcs_bednum_input.value ? bed == ppbcs_bednum_input.value : true;

            // let statusMatch = true;
            // if (ppbcs_status_select_input.value && ppbcs_status_select_input.value !== "all") {
            //     if (ppbcs_status_select_input.value === "in") statusMatch = item.status === "轉入";
            //     if (ppbcs_status_select_input.value === "out") statusMatch = item.status === "轉出";
            //     if (ppbcs_status_select_input.value === "change") statusMatch = item.status === "轉床"; // 目前沒這個狀態
            // }
    
            // 只有符合所有有值條件的資料才保留
            // return nameMatch && stationMatch && bedMatch && statusMatch;
            return nameMatch && stationMatch && bedMatch;
        });
        console.log(filteredArr);
    }

    if(filteredArr.length != 0) {
        dispaly_bed_change_data = filteredArr;
        set_ppbc_display();
        // ppbcs_init_search();
        popup_bed_change_search_div_close();
    } else {
        alert("查無相關資料");
        ppbcs_init_search();
    }
}
function ppbcs_init_search() {
    let ppbcs_name_input = document.querySelector(".ppbcs_name_input");
    let ppbcs_nurnum_input = document.querySelector(".ppbcs_nurnum_input");
    let ppbcs_bednum_input = document.querySelector(".ppbcs_bednum_input");
    // let ppbcs_status_select_input = document.querySelector(".ppbcs_status_select_input");

    ppbcs_name_input.value = "";
    ppbcs_nurnum_input.value = "";
    ppbcs_bednum_input.value = "";
    // ppbcs_status_select_input.value = "";
}