let popup_muilt_med_select_div;
let muilt_med_select_num = 0;

function get_popup_muilt_med_select()
{
    popup_muilt_med_select_div = new Basic_popup_Div('popup_muilt_med_select_div','popup_muilt_med_select_div','','');
    popup_muilt_med_select_div._popup_div.style.border = '10px solid white';

    let temp_med_data;

    let header = get_pp_muilt_med_select_header();
    let main = get_pp_muilt_med_select_main();
    let footer = get_pp_muilt_med_select_footer();

    popup_muilt_med_select_div.AddControl(header);
    popup_muilt_med_select_div.AddControl(main);
    popup_muilt_med_select_div.AddControl(footer);

    popup_muilt_med_select_reset();
    get_muilt_med_icon();

    return popup_muilt_med_select_div;
};

function get_pp_muilt_med_select_header()
{
    let popup_muilt_med_select_header = document.createElement("div");
    popup_muilt_med_select_header.classList.add("popup_muilt_med_select_header");
    popup_muilt_med_select_header.innerText = "請選選擇日期區間";

    return popup_muilt_med_select_header;
};

function get_pp_muilt_med_select_main()
{
    let pp_muilt_med_select_main_container = document.createElement("div");
    pp_muilt_med_select_main_container.classList.add("pp_muilt_med_select_main_container");

    let pp_mms_med_info_container = document.createElement("div");
    pp_mms_med_info_container.classList.add("pp_mms_med_info_container");

    let hr_line = document.createElement("hr");

    let pp_mms_start_time_container = document.createElement("div");
    pp_mms_start_time_container.classList.add("pp_mms_start_time_container");

    let pp_mms_start_time_title = document.createElement("div");
    pp_mms_start_time_title.classList.add('pp_mms_start_time_title');
    pp_mms_start_time_title.innerText = "起始時間";

    let pp_mms_start_time_content = document.createElement("div");
    pp_mms_start_time_content.classList.add('pp_mms_start_time_content');

    let pp_mms_start_date_div = document.createElement("div");
    pp_mms_start_date_div.classList.add("muilt_med_select_input_container_style");

    let pp_mms_start_date_label = document.createElement("label");
    pp_mms_start_date_label.classList.add("muilt_med_select_label");
    pp_mms_start_date_label.setAttribute("for", "pp_mms_start_date_input");
    pp_mms_start_date_label.innerHTML = '日期';

    let pp_mms_start_date_input = document.createElement("input");
    pp_mms_start_date_input.id = "pp_mms_start_date_input";
    pp_mms_start_date_input.name = "pp_mms_start_date_input";
    pp_mms_start_date_input.type = "date";

    pp_mms_start_date_div.appendChild(pp_mms_start_date_input);
    // pp_mms_start_date_div.appendChild(pp_mms_start_date_label);

    let pp_mms_start_hour_div = document.createElement("div");
    pp_mms_start_hour_div.classList.add("muilt_med_select_input_container_style");

    let pp_mms_start_hour_label = document.createElement("label");
    pp_mms_start_hour_label.classList.add("muilt_med_select_label");
    pp_mms_start_hour_label.setAttribute("for", "pp_mms_start_hour_input");
    pp_mms_start_hour_label.innerHTML = '時';

    let pp_mms_start_hour_input = document.createElement("input");
    pp_mms_start_hour_input.id = "pp_mms_start_hour_input";
    pp_mms_start_hour_input.name = "pp_mms_start_hour_input";
    pp_mms_start_hour_input.type = "number";
    pp_mms_start_hour_input.max = 23;
    pp_mms_start_hour_input.min = 0;
    pp_mms_start_hour_input.addEventListener("input", () => {
        let temp_data = parseInt(pp_mms_start_hour_input.value);

        // 确保输入的分钟数在00到59之间
        if (temp_data < 0) {
            temp_data = 0;
        } else if (temp_data > 23) {
            temp_data = 23;
        }

        // 格式化分钟数为两位数，并更新输入框的值
        pp_mms_start_hour_input.value = temp_data.toLocaleString('en-US', {minimumIntegerDigits: 2});
    });

    pp_mms_start_hour_div.appendChild(pp_mms_start_hour_input);
    pp_mms_start_hour_div.appendChild(pp_mms_start_hour_label);

    let pp_mms_start_minute_div = document.createElement("div");
    pp_mms_start_minute_div.classList.add("muilt_med_select_input_container_style");

    let pp_mms_start_minute_label = document.createElement("label");
    pp_mms_start_minute_label.classList.add("muilt_med_select_label");
    pp_mms_start_minute_label.setAttribute("for", "pp_mms_start_minute_input");
    pp_mms_start_minute_label.innerHTML = '分';

    let pp_mms_start_minute_input = document.createElement("input");
    pp_mms_start_minute_input.id = "pp_mms_start_minute_input";
    pp_mms_start_minute_input.name = "pp_mms_start_minute_input";
    pp_mms_start_minute_input.type = "number";
    pp_mms_start_minute_input.max = 59;
    pp_mms_start_minute_input.min = 0;
    pp_mms_start_minute_input.addEventListener("input", () => {
        let temp_data = parseInt(pp_mms_start_minute_input.value);

        // 确保输入的分钟数在00到59之间
        if (temp_data < 0) {
            temp_data = 0;
        } else if (temp_data > 59) {
            temp_data = 59;
        }

        // 格式化分钟数为两位数，并更新输入框的值
        pp_mms_start_minute_input.value = temp_data.toLocaleString('en-US', {minimumIntegerDigits: 2});
    });

    pp_mms_start_minute_div.appendChild(pp_mms_start_minute_input);
    pp_mms_start_minute_div.appendChild(pp_mms_start_minute_label);

    pp_mms_start_time_content.appendChild(pp_mms_start_date_div);
    pp_mms_start_time_content.appendChild(pp_mms_start_hour_div);
    pp_mms_start_time_content.appendChild(pp_mms_start_minute_div);

    pp_mms_start_time_container.appendChild(pp_mms_start_time_title);
    pp_mms_start_time_container.appendChild(pp_mms_start_time_content);

    let pp_mms_end_time_container = document.createElement("div");
    pp_mms_end_time_container.classList.add("pp_mms_end_time_container");

    let pp_mms_end_time_title = document.createElement("div");
    pp_mms_end_time_title.classList.add('pp_mms_end_time_title');
    pp_mms_end_time_title.innerText = "結束時間";

    let pp_mms_end_time_content = document.createElement("div");
    pp_mms_end_time_content.classList.add('pp_mms_end_time_content');

    let pp_mms_end_date_div = document.createElement("div");
    pp_mms_end_date_div.classList.add("muilt_med_select_input_container_style");

    let pp_mms_end_date_label = document.createElement("label");
    pp_mms_end_date_label.classList.add("muilt_med_select_label");
    pp_mms_end_date_label.setAttribute("for", "pp_mms_end_date_input");
    pp_mms_end_date_label.innerHTML = '日期';

    let pp_mms_end_date_input = document.createElement("input");
    pp_mms_end_date_input.id = "pp_mms_end_date_input";
    pp_mms_end_date_input.name = "pp_mms_end_date_input";
    pp_mms_end_date_input.type = "date";

    pp_mms_end_date_div.appendChild(pp_mms_end_date_input);
    // pp_mms_end_date_div.appendChild(pp_mms_end_date_label);

    let pp_mms_end_hour_div = document.createElement("div");
    pp_mms_end_hour_div.classList.add("muilt_med_select_input_container_style");

    let pp_mms_end_hour_label = document.createElement("label");
    pp_mms_end_hour_label.classList.add("muilt_med_select_label");
    pp_mms_end_hour_label.setAttribute("for", "pp_mms_end_hour_input");
    pp_mms_end_hour_label.innerHTML = '時';

    let pp_mms_end_hour_input = document.createElement("input");
    pp_mms_end_hour_input.id = "pp_mms_end_hour_input";
    pp_mms_end_hour_input.name = "pp_mms_end_hour_input";
    pp_mms_end_hour_input.type = "number";
    pp_mms_end_hour_input.max = 23;
    pp_mms_end_hour_input.min = 0;
    pp_mms_end_hour_input.addEventListener("input", () => {
        let temp_data = parseInt(pp_mms_end_hour_input.value);

        // 确保输入的分钟数在00到59之间
        if (temp_data < 0) {
            temp_data = 0;
        } else if (temp_data > 23) {
            temp_data = 23;
        }

        // 格式化分钟数为两位数，并更新输入框的值
        pp_mms_end_hour_input.value = temp_data.toLocaleString('en-US', {minimumIntegerDigits: 2});
    });

    pp_mms_end_hour_div.appendChild(pp_mms_end_hour_input);
    pp_mms_end_hour_div.appendChild(pp_mms_end_hour_label);

    let pp_mms_end_minute_div = document.createElement("div");
    pp_mms_end_minute_div.classList.add("muilt_med_select_input_container_style");

    let pp_mms_end_minute_label = document.createElement("label");
    pp_mms_end_minute_label.classList.add("muilt_med_select_label");
    pp_mms_end_minute_label.setAttribute("for", "pp_mms_end_minute_input");
    pp_mms_end_minute_label.innerHTML = '分';

    let pp_mms_end_minute_input = document.createElement("input");
    pp_mms_end_minute_input.id = "pp_mms_end_minute_input";
    pp_mms_end_minute_input.name = "pp_mms_end_minute_input";
    pp_mms_end_minute_input.type = "number";
    pp_mms_end_minute_input.max = 59;
    pp_mms_end_minute_input.min = 0;
    pp_mms_end_minute_input.addEventListener("input", () => {
        let temp_data = parseInt(pp_mms_end_minute_input.value);

        // 确保输入的分钟数在00到59之间
        if (temp_data < 0) {
            temp_data = 0;
        } else if (temp_data > 59) {
            temp_data = 59;
        }

        // 格式化分钟数为两位数，并更新输入框的值
        pp_mms_end_minute_input.value = temp_data.toLocaleString('en-US', {minimumIntegerDigits: 2});
    });

    pp_mms_end_minute_div.appendChild(pp_mms_end_minute_input);
    pp_mms_end_minute_div.appendChild(pp_mms_end_minute_label);

    pp_mms_end_time_content.appendChild(pp_mms_end_date_div);
    pp_mms_end_time_content.appendChild(pp_mms_end_hour_div);
    pp_mms_end_time_content.appendChild(pp_mms_end_minute_div);

    pp_mms_end_time_container.appendChild(pp_mms_end_time_title);
    pp_mms_end_time_container.appendChild(pp_mms_end_time_content);

    pp_muilt_med_select_main_container.appendChild(pp_mms_med_info_container);
    pp_muilt_med_select_main_container.appendChild(hr_line);
    pp_muilt_med_select_main_container.appendChild(pp_mms_start_time_container);
    pp_muilt_med_select_main_container.appendChild(pp_mms_end_time_container);

    return pp_muilt_med_select_main_container;
};
function get_pp_muilt_med_select_footer()
{
    let pp_muilt_med_select_footer_container = document.createElement("div");
    pp_muilt_med_select_footer_container.classList.add("pp_muilt_med_select_footer_container");

    let pp_mms_return_btn = document.createElement("div");
    pp_mms_return_btn.classList.add("pp_mms_return_btn");
    pp_mms_return_btn.innerHTML = "返回";
    pp_mms_return_btn.addEventListener("click", () => {
        popup_muilt_med_select_div_close();
        popup_muilt_med_select_reset();
    });

    let pp_mms_confirm_btn = document.createElement("div");
    pp_mms_confirm_btn.classList.add("pp_mms_confirm_btn");
    pp_mms_confirm_btn.innerHTML = "下載報表";
    pp_mms_confirm_btn.addEventListener("click", () => {
        get_download_excel_form_func();
    });

    pp_muilt_med_select_footer_container.appendChild(pp_mms_return_btn);
    pp_muilt_med_select_footer_container.appendChild(pp_mms_confirm_btn);

    return pp_muilt_med_select_footer_container;
};

function popup_muilt_med_select_div_close() {
    popup_muilt_med_select_div.Set_Visible(false);
}

function popup_muilt_med_select_div_open() {
    let popup_muilt_med_select_header = document.querySelector(".popup_muilt_med_select_header");
    popup_muilt_med_select_header.innerHTML = `請選擇日期區間<span>數量：${med_select_array.length}</span>`
    popup_muilt_med_select_div.Set_Visible(true);
}
function popup_muilt_med_select_reset() {
    let today = new Date();
    let temp_date = today.toISOString().split('T')[0];
    let pre_date = new Date(today);
    pre_date.setDate(pre_date.getDate() - 1);
    let temp_pre_date = pre_date.toISOString().split('T')[0];
    let temp_hour = 8;
    temp_hour = temp_hour.toLocaleString('en-US', {minimumIntegerDigits: 2});
    let temp_minute = 0;
    temp_minute = temp_minute.toLocaleString('en-US', {minimumIntegerDigits: 2});

    let pp_mms_start_date_input = document.querySelector("#pp_mms_start_date_input");
    let pp_mms_start_hour_input = document.querySelector("#pp_mms_start_hour_input");
    let pp_mms_start_minute_input = document.querySelector("#pp_mms_start_minute_input");
    pp_mms_start_date_input.value = temp_pre_date;
    pp_mms_start_hour_input.value = temp_hour;
    pp_mms_start_minute_input.value = temp_minute;

    let pp_mms_end_date_input = document.querySelector("#pp_mms_end_date_input");
    let pp_mms_end_hour_input = document.querySelector("#pp_mms_end_hour_input");
    let pp_mms_end_minute_input = document.querySelector("#pp_mms_end_minute_input");
    pp_mms_end_date_input.value = temp_date;
    pp_mms_end_hour_input.value = temp_hour;
    pp_mms_end_minute_input.value = temp_minute;
}
function get_muilt_med_icon() {
    let body = document.querySelector('body');
    let muilt_med_icon_container = document.createElement("div");
    muilt_med_icon_container.classList.add('muilt_med_icon_container');

    muilt_med_icon_container.addEventListener('click', async (e) => {
        if(med_select_array.length !== 0) {
            showLoadingPopup();
            popup_muilt_med_select_div_open();
            let temp_arr = await get_selected_meds_data();
            get_pp_mms_display(temp_arr);
            e.preventDefault;
            hideLoadingPopup();
            return;
        } else {
            alert("請選擇藥品!");
            e.preventDefault;
            return;
        }
    });

    let muilt_med_icon_content = document.createElement("img");
    muilt_med_icon_content.classList.add("muilt_med_icon_content");
    muilt_med_icon_content.src = "../image/icon/medicine.png";
    muilt_med_icon_content.alt = "muilt med selected icom";

    let muilt_med_icon_number = document.createElement("div");
    muilt_med_icon_number.classList.add("muilt_med_icon_number");
    // muilt_med_icon_number.innerHTML = '20';

    muilt_med_icon_container.appendChild(muilt_med_icon_content);
    muilt_med_icon_container.appendChild(muilt_med_icon_number);

    body.appendChild(muilt_med_icon_container);
}

function get_add_med_select_num() {
    let muilt_med_icon_number = document.querySelector(".muilt_med_icon_number");
    if(med_select_array.length !== 0) {
        muilt_med_icon_number.style.display = "flex";
        muilt_med_icon_number.innerHTML = med_select_array.length;
    }
}
function get_del_med_select_num() {
    let muilt_med_icon_number = document.querySelector(".muilt_med_icon_number");
    if(med_select_array.length !== 0) {
        muilt_med_icon_number.innerHTML = med_select_array.length;
    } else {
        muilt_med_icon_number.style.display = "none";
        muilt_med_icon_number.innerHTML = med_select_array.length;
    }
}
function get_pp_mms_display(array) {
    let pp_mms_med_info_container = document.querySelector(".pp_mms_med_info_container");
    pp_mms_med_info_container.innerHTML = "";

    array.forEach(element => {
        let pp_mms_med_item_div = document.createElement("div");
        pp_mms_med_item_div.classList.add("pp_mms_med_item_div");

        let pp_mms_med_name_div = document.createElement("div");
        pp_mms_med_name_div.classList.add('pp_mms_med_name_div');
        
        let pp_mms_med_name_title = document.createElement("div");
        pp_mms_med_name_title.classList.add("pp_mms_med_name_title");
        pp_mms_med_name_title.innerHTML = "藥名：";

        let pp_mms_med_name_content = document.createElement("div");
        pp_mms_med_name_content.classList.add('pp_mms_med_name_content');
        if(element.NAME !== "") {
            pp_mms_med_name_content.innerHTML = `${element.NAME}`;
        } else {
            pp_mms_med_name_content.innerHTML = `無`;
        }

        pp_mms_med_name_div.appendChild(pp_mms_med_name_title);
        pp_mms_med_name_div.appendChild(pp_mms_med_name_content);

        let pp_mms_med_ctname_div = document.createElement("div");
        pp_mms_med_ctname_div.classList.add('pp_mms_med_ctname_div');

        let pp_mms_med_ctname_title = document.createElement("div");
        pp_mms_med_ctname_title.classList.add("pp_mms_med_ctname_title");
        pp_mms_med_ctname_title.innerHTML = "中文名：";

        let pp_mms_med_ctname_content = document.createElement("div");
        pp_mms_med_ctname_content.classList.add('pp_mms_med_ctname_content');
        if(element.CHT_NAME !== "") {
            pp_mms_med_ctname_content.innerHTML = `${element.CHT_NAME}`;
        } else {
            pp_mms_med_ctname_content.innerHTML = `無`;
        }

        pp_mms_med_ctname_div.appendChild(pp_mms_med_ctname_title);
        pp_mms_med_ctname_div.appendChild(pp_mms_med_ctname_content);

        let pp_mms_med_code_div = document.createElement("div");
        pp_mms_med_code_div.classList.add('pp_mms_med_code_div');

        let pp_mms_med_code_title = document.createElement("div");
        pp_mms_med_code_title.classList.add("pp_mms_med_code_title");
        pp_mms_med_code_title.innerHTML = "藥碼：";

        let pp_mms_med_code_content = document.createElement("div");
        pp_mms_med_code_content.classList.add('pp_mms_med_code_content');
        if(element.CODE !== "") {
            pp_mms_med_code_content.innerHTML = `${element.CODE}`;
        } else {
            pp_mms_med_code_content.innerHTML = `無`;
        }

        pp_mms_med_code_div.appendChild(pp_mms_med_code_title);
        pp_mms_med_code_div.appendChild(pp_mms_med_code_content);

        pp_mms_med_item_div.appendChild(pp_mms_med_name_div);
        pp_mms_med_item_div.appendChild(pp_mms_med_ctname_div);
        pp_mms_med_item_div.appendChild(pp_mms_med_code_div);

        pp_mms_med_info_container.appendChild(pp_mms_med_item_div);
    });
}
async function get_download_excel_form_func() {
    showLoadingPopup();
    let start_date = document.querySelector("#pp_mms_start_date_input").value;
    let start_hour = document.querySelector("#pp_mms_start_hour_input").value;
    let start_min = document.querySelector("#pp_mms_start_minute_input").value;
    let end_date = document.querySelector("#pp_mms_end_date_input").value;
    let end_hour = document.querySelector("#pp_mms_start_hour_input").value;
    let end_min = document.querySelector("#pp_mms_start_minute_input").value;
    let start_datetime = `${start_date} ${start_hour}:${start_min}`;
    let end_datetime = `${end_date} ${end_hour}:${end_min}`;
    let med_arr_str = "";
    let serverNameStr = "";
    let serverTypeStr = "";

    temp_selected_arr.forEach(element => {
        serverNameStr += element.serverName + ",";
        serverTypeStr += element.serverType + ",";
    });

    med_select_array.forEach(element => {
        med_arr_str += element + ",";
    });

    // Remove the trailing comma
    serverNameStr = serverNameStr.slice(0, -1);
    serverTypeStr = serverTypeStr.slice(0, -1);
    med_arr_str = med_arr_str.slice(0, -1);

    // console.log(st_time);
    // console.log(end_time);
    // console.log(serverNameStr);
    // console.log(serverTypeStr);

    let post_data = {
        Data: {},
        ValueAry: [
            `${med_arr_str}`,
            `${start_datetime}`,
            `${end_datetime}`,
            `${serverNameStr}`,
            `${serverTypeStr}`]
    };

    console.log(post_data);
    await download_cdmis_datas_excel(post_data);
    hideLoadingPopup();
};