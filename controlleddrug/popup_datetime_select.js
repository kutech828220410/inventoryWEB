let popup_datetime_select_div;

function get_popup_datetime_select()
{
    popup_datetime_select_div = new Basic_popup_Div('popup_datetime_select_div','popup_datetime_select_div','','');
    popup_datetime_select_div._popup_div.style.border = '10px solid white';

    let temp_med_data;

    let header = get_ppdatetime_header();
    let main = get_ppdatetime_main();
    let footer = get_ppdatetime_footer();

    popup_datetime_select_div.AddControl(header);
    popup_datetime_select_div.AddControl(main);
    popup_datetime_select_div.AddControl(footer);

    popup_datetime_reset();

    return popup_datetime_select_div;
};

function get_ppdatetime_header()
{
    let popup_datetime_header = document.createElement("div");
    popup_datetime_header.classList.add("popup_datetime_header");
    popup_datetime_header.innerText = "請選選擇日期區間";

    return popup_datetime_header;
};

function get_ppdatetime_main()
{
    let pp_datetime_main_container = document.createElement("div");
    pp_datetime_main_container.classList.add("pp_datetime_main_container");

    let pp_dt_med_info_container = document.createElement("div");
    pp_dt_med_info_container.classList.add("pp_dt_med_info_container");

    let pp_dt_med_name = document.createElement("div");
    pp_dt_med_name.classList.add("pp_dt_med_name");

    let pp_dt_med_ctname = document.createElement("div");
    pp_dt_med_ctname.classList.add("pp_dt_med_ctname");

    let pp_dt_med_code = document.createElement("div");
    pp_dt_med_code.classList.add("pp_dt_med_code");

    pp_dt_med_info_container.appendChild(pp_dt_med_name);
    pp_dt_med_info_container.appendChild(pp_dt_med_ctname);
    pp_dt_med_info_container.appendChild(pp_dt_med_code);

    let hr_line = document.createElement("hr");

    let pp_dt_start_time_container = document.createElement("div");
    pp_dt_start_time_container.classList.add("pp_dt_start_time_container");

    let pp_dt_start_time_title = document.createElement("div");
    pp_dt_start_time_title.classList.add('pp_dt_start_time_title');
    pp_dt_start_time_title.innerText = "起始時間";

    let pp_dt_start_time_content = document.createElement("div");
    pp_dt_start_time_content.classList.add('pp_dt_start_time_content');

    let pp_dt_start_date_div = document.createElement("div");
    pp_dt_start_date_div.classList.add("datetime_input_container_style");

    let pp_dt_start_date_label = document.createElement("label");
    pp_dt_start_date_label.classList.add("datetime_label");
    pp_dt_start_date_label.setAttribute("for", "pp_dt_start_date_input");
    pp_dt_start_date_label.innerHTML = '日期';

    let pp_dt_start_date_input = document.createElement("input");
    pp_dt_start_date_input.id = "pp_dt_start_date_input";
    pp_dt_start_date_input.name = "pp_dt_start_date_input";
    pp_dt_start_date_input.type = "date";

    pp_dt_start_date_div.appendChild(pp_dt_start_date_input);
    // pp_dt_start_date_div.appendChild(pp_dt_start_date_label);

    let pp_dt_start_hour_div = document.createElement("div");
    pp_dt_start_hour_div.classList.add("datetime_input_container_style");

    let pp_dt_start_hour_label = document.createElement("label");
    pp_dt_start_hour_label.classList.add("datetime_label");
    pp_dt_start_hour_label.setAttribute("for", "pp_dt_start_hour_input");
    pp_dt_start_hour_label.innerHTML = '時';

    let pp_dt_start_hour_input = document.createElement("input");
    pp_dt_start_hour_input.id = "pp_dt_start_hour_input";
    pp_dt_start_hour_input.name = "pp_dt_start_hour_input";
    pp_dt_start_hour_input.type = "number";
    pp_dt_start_hour_input.max = 23;
    pp_dt_start_hour_input.min = 0;
    pp_dt_start_hour_input.addEventListener("input", () => {
        let temp_data = parseInt(pp_dt_start_hour_input.value);

        // 确保输入的分钟数在00到59之间
        if (temp_data < 0) {
            temp_data = 0;
        } else if (temp_data > 23) {
            temp_data = 23;
        }

        // 格式化分钟数为两位数，并更新输入框的值
        pp_dt_start_hour_input.value = temp_data.toLocaleString('en-US', {minimumIntegerDigits: 2});
    });

    pp_dt_start_hour_div.appendChild(pp_dt_start_hour_input);
    pp_dt_start_hour_div.appendChild(pp_dt_start_hour_label);

    let pp_dt_start_minute_div = document.createElement("div");
    pp_dt_start_minute_div.classList.add("datetime_input_container_style");

    let pp_dt_start_minute_label = document.createElement("label");
    pp_dt_start_minute_label.classList.add("datetime_label");
    pp_dt_start_minute_label.setAttribute("for", "pp_dt_start_minute_input");
    pp_dt_start_minute_label.innerHTML = '分';

    let pp_dt_start_minute_input = document.createElement("input");
    pp_dt_start_minute_input.id = "pp_dt_start_minute_input";
    pp_dt_start_minute_input.name = "pp_dt_start_minute_input";
    pp_dt_start_minute_input.type = "number";
    pp_dt_start_minute_input.max = 59;
    pp_dt_start_minute_input.min = 0;
    pp_dt_start_minute_input.addEventListener("input", () => {
        let temp_data = parseInt(pp_dt_start_minute_input.value);

        // 确保输入的分钟数在00到59之间
        if (temp_data < 0) {
            temp_data = 0;
        } else if (temp_data > 59) {
            temp_data = 59;
        }

        // 格式化分钟数为两位数，并更新输入框的值
        pp_dt_start_minute_input.value = temp_data.toLocaleString('en-US', {minimumIntegerDigits: 2});
    });

    pp_dt_start_minute_div.appendChild(pp_dt_start_minute_input);
    pp_dt_start_minute_div.appendChild(pp_dt_start_minute_label);

    pp_dt_start_time_content.appendChild(pp_dt_start_date_div);
    pp_dt_start_time_content.appendChild(pp_dt_start_hour_div);
    pp_dt_start_time_content.appendChild(pp_dt_start_minute_div);

    pp_dt_start_time_container.appendChild(pp_dt_start_time_title);
    pp_dt_start_time_container.appendChild(pp_dt_start_time_content);

    let pp_dt_end_time_container = document.createElement("div");
    pp_dt_end_time_container.classList.add("pp_dt_end_time_container");

    let pp_dt_end_time_title = document.createElement("div");
    pp_dt_end_time_title.classList.add('pp_dt_end_time_title');
    pp_dt_end_time_title.innerText = "結束時間";

    let pp_dt_end_time_content = document.createElement("div");
    pp_dt_end_time_content.classList.add('pp_dt_end_time_content');

    let pp_dt_end_date_div = document.createElement("div");
    pp_dt_end_date_div.classList.add("datetime_input_container_style");

    let pp_dt_end_date_label = document.createElement("label");
    pp_dt_end_date_label.classList.add("datetime_label");
    pp_dt_end_date_label.setAttribute("for", "pp_dt_end_date_input");
    pp_dt_end_date_label.innerHTML = '日期';

    let pp_dt_end_date_input = document.createElement("input");
    pp_dt_end_date_input.id = "pp_dt_end_date_input";
    pp_dt_end_date_input.name = "pp_dt_end_date_input";
    pp_dt_end_date_input.type = "date";

    pp_dt_end_date_div.appendChild(pp_dt_end_date_input);
    // pp_dt_end_date_div.appendChild(pp_dt_end_date_label);

    let pp_dt_end_hour_div = document.createElement("div");
    pp_dt_end_hour_div.classList.add("datetime_input_container_style");

    let pp_dt_end_hour_label = document.createElement("label");
    pp_dt_end_hour_label.classList.add("datetime_label");
    pp_dt_end_hour_label.setAttribute("for", "pp_dt_end_hour_input");
    pp_dt_end_hour_label.innerHTML = '時';

    let pp_dt_end_hour_input = document.createElement("input");
    pp_dt_end_hour_input.id = "pp_dt_end_hour_input";
    pp_dt_end_hour_input.name = "pp_dt_end_hour_input";
    pp_dt_end_hour_input.type = "number";
    pp_dt_end_hour_input.max = 23;
    pp_dt_end_hour_input.min = 0;
    pp_dt_end_hour_input.addEventListener("input", () => {
        let temp_data = parseInt(pp_dt_end_hour_input.value);

        // 确保输入的分钟数在00到59之间
        if (temp_data < 0) {
            temp_data = 0;
        } else if (temp_data > 23) {
            temp_data = 23;
        }

        // 格式化分钟数为两位数，并更新输入框的值
        pp_dt_end_hour_input.value = temp_data.toLocaleString('en-US', {minimumIntegerDigits: 2});
    });

    pp_dt_end_hour_div.appendChild(pp_dt_end_hour_input);
    pp_dt_end_hour_div.appendChild(pp_dt_end_hour_label);

    let pp_dt_end_minute_div = document.createElement("div");
    pp_dt_end_minute_div.classList.add("datetime_input_container_style");

    let pp_dt_end_minute_label = document.createElement("label");
    pp_dt_end_minute_label.classList.add("datetime_label");
    pp_dt_end_minute_label.setAttribute("for", "pp_dt_end_minute_input");
    pp_dt_end_minute_label.innerHTML = '分';

    let pp_dt_end_minute_input = document.createElement("input");
    pp_dt_end_minute_input.id = "pp_dt_end_minute_input";
    pp_dt_end_minute_input.name = "pp_dt_end_minute_input";
    pp_dt_end_minute_input.type = "number";
    pp_dt_end_minute_input.max = 59;
    pp_dt_end_minute_input.min = 0;
    pp_dt_end_minute_input.addEventListener("input", () => {
        let temp_data = parseInt(pp_dt_end_minute_input.value);

        // 确保输入的分钟数在00到59之间
        if (temp_data < 0) {
            temp_data = 0;
        } else if (temp_data > 59) {
            temp_data = 59;
        }

        // 格式化分钟数为两位数，并更新输入框的值
        pp_dt_end_minute_input.value = temp_data.toLocaleString('en-US', {minimumIntegerDigits: 2});
    });

    pp_dt_end_minute_div.appendChild(pp_dt_end_minute_input);
    pp_dt_end_minute_div.appendChild(pp_dt_end_minute_label);

    pp_dt_end_time_content.appendChild(pp_dt_end_date_div);
    pp_dt_end_time_content.appendChild(pp_dt_end_hour_div);
    pp_dt_end_time_content.appendChild(pp_dt_end_minute_div);

    pp_dt_end_time_container.appendChild(pp_dt_end_time_title);
    pp_dt_end_time_container.appendChild(pp_dt_end_time_content);

    pp_datetime_main_container.appendChild(pp_dt_med_info_container);
    pp_datetime_main_container.appendChild(hr_line);
    pp_datetime_main_container.appendChild(pp_dt_start_time_container);
    pp_datetime_main_container.appendChild(pp_dt_end_time_container);

    return pp_datetime_main_container;
};
function get_ppdatetime_footer()
{
    let pp_datetime_footer_container = document.createElement("div");
    pp_datetime_footer_container.classList.add("pp_datetime_footer_container");

    let pp_dt_return_btn = document.createElement("div");
    pp_dt_return_btn.classList.add("pp_dt_return_btn");
    pp_dt_return_btn.innerHTML = "返回";
    pp_dt_return_btn.addEventListener("click", () => {
        popup_datetime_select_div_close();
        popup_datetime_reset();
    });

    let pp_dt_confirm_btn = document.createElement("div");
    pp_dt_confirm_btn.classList.add("pp_dt_confirm_btn");
    pp_dt_confirm_btn.innerHTML = "輸出報表";
    pp_dt_confirm_btn.addEventListener("click", async () => {
        showLoadingPopup();
        popup_datetime_select_div_close();
        let form_data = await set_med_balance_form_data();
        popup_mbf_get_form_list(form_data);
        popup_med_balance_form_open();
        hideLoadingPopup();
    });

    pp_datetime_footer_container.appendChild(pp_dt_return_btn);
    pp_datetime_footer_container.appendChild(pp_dt_confirm_btn);

    return pp_datetime_footer_container;
};

function popup_datetime_select_div_close() {
    popup_datetime_select_div.Set_Visible(false);
}

function popup_datetime_select_div_open(med_data) {
    // console.log(med_data);
    temp_med_data = med_data;
    // console.log(temp_med_data);
    get_pp_dt_med_info_func(med_data);
    pp_set_med_bal_form_info(med_data);
    popup_datetime_select_div.Set_Visible(true);
}
function popup_datetime_reset() {
    let today = new Date();
    let temp_date = today.toISOString().split('T')[0];
    let pre_date = new Date(today);
    pre_date.setDate(pre_date.getDate() - 1);
    let temp_pre_date = pre_date.toISOString().split('T')[0];
    let temp_hour = 8;
    temp_hour = temp_hour.toLocaleString('en-US', {minimumIntegerDigits: 2});
    let temp_minute = 0;
    temp_minute = temp_minute.toLocaleString('en-US', {minimumIntegerDigits: 2});

    let pp_dt_start_date_input = document.querySelector("#pp_dt_start_date_input");
    let pp_dt_start_hour_input = document.querySelector("#pp_dt_start_hour_input");
    let pp_dt_start_minute_input = document.querySelector("#pp_dt_start_minute_input");
    pp_dt_start_date_input.value = temp_pre_date;
    pp_dt_start_hour_input.value = temp_hour;
    pp_dt_start_minute_input.value = temp_minute;

    let pp_dt_end_date_input = document.querySelector("#pp_dt_end_date_input");
    let pp_dt_end_hour_input = document.querySelector("#pp_dt_end_hour_input");
    let pp_dt_end_minute_input = document.querySelector("#pp_dt_end_minute_input");
    pp_dt_end_date_input.value = temp_date;
    pp_dt_end_hour_input.value = temp_hour;
    pp_dt_end_minute_input.value = temp_minute;
}
function get_pp_dt_med_info_func(med_data) {
    let pp_dt_med_name = document.querySelector(".pp_dt_med_name");
    if(med_data.NAME == "") {
        pp_dt_med_name.innerHTML = '藥名：無';
    } else {
        pp_dt_med_name.innerHTML = `藥名：${med_data.NAME}`;
    }

    let pp_dt_med_ctname = document.querySelector(".pp_dt_med_ctname");
    if(med_data.CHT_NAME == "") {
        pp_dt_med_ctname.innerHTML = '中文名：無';
    } else {
        pp_dt_med_ctname.innerHTML = `中文名：${med_data.CHT_NAME}`;
    }

    let pp_dt_med_code = document.querySelector(".pp_dt_med_code");
    if(med_data.SKDIACODE == "") {
        pp_dt_med_code.innerHTML = `藥碼：${med_data.CODE}`;
    } else {
        pp_dt_med_code.innerHTML = `藥碼：${med_data.CODE}&nbsp&nbsp&nbsp&nbsp料號:${med_data.SKDIACODE}`;
    }

    let popup_datetime_header = document.querySelector(".popup_datetime_header");
    popup_datetime_header.setAttribute("code", med_data.CODE);
}
async function set_med_balance_form_data() {

    let popup_datetime_header = document.querySelector(".popup_datetime_header");
    let temp_code = popup_datetime_header.getAttribute("code");

    // console.log(temp_selected_arr);
    let start_datetime = get_start_time_data();
    let end_datetime = get_end_time_data();

    let pp_mbf_h_start_time = document.querySelector(".pp_mbf_h_start_time");
    let pp_mbf_h_end_time = document.querySelector(".pp_mbf_h_end_time");

    pp_mbf_h_start_time.innerHTML = start_datetime;
    pp_mbf_h_end_time.innerHTML = end_datetime;

    // console.log(start_datetime);
    // console.log(end_datetime);

    let serverNameStr = "";
    let serverTypeStr = "";

    temp_selected_arr.forEach(element => {
        serverNameStr += element.serverName + ",";
        serverTypeStr += element.serverType + ",";
    });

    // Remove the trailing comma
    serverNameStr = serverNameStr.slice(0, -1);
    serverTypeStr = serverTypeStr.slice(0, -1);

    // console.log(st_time);
    // console.log(end_time);
    // console.log(serverNameStr);
    // console.log(serverTypeStr);

    let post_data = {
        Data: {},
        ValueAry: [   
            `${start_datetime}`,
            `${end_datetime}`,
            `${serverNameStr}`,
            `${serverTypeStr}`]
    };

    console.log(post_data);

    let data = await get_datas_by_op_time_st_end_transactions(post_data);
    console.log(data);
    let temp_data = data["Data"].filter((e) => {
        return e.CODE == temp_code;
    });

    return temp_data
}

function get_start_time_data() {
    let date = "";
    let pp_dt_start_date_input = document.querySelector("#pp_dt_start_date_input");
    let pp_dt_start_hour_input = document.querySelector("#pp_dt_start_hour_input");
    let pp_dt_start_minute_input = document.querySelector("#pp_dt_start_minute_input");

    date = `${pp_dt_start_date_input.value} ${pp_dt_start_hour_input.value}:${pp_dt_start_minute_input.value}`;

    return date;
}
function get_end_time_data() {
    let date;
    let pp_dt_end_date_input = document.querySelector("#pp_dt_end_date_input");
    let pp_dt_end_hour_input = document.querySelector("#pp_dt_end_hour_input");
    let pp_dt_end_minute_input = document.querySelector("#pp_dt_end_minute_input");
    date = `${pp_dt_end_date_input.value} ${pp_dt_end_hour_input.value}:${pp_dt_end_minute_input.value}`;

    return date;
}