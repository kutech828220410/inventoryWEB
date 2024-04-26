let popup_med_balance_form_div;

function popup_med_balance_form()
{
    popup_med_balance_form_div = new Basic_popup_Div('popup_med_balance_form_div','popup_med_balance_form_div','','');
    popup_med_balance_form_div._popup_div.style.border = '10px solid white';

    let header = get_mbf_header();
    let main = get_mbf_main();
    let footer = get_mbf_footer();

    popup_med_balance_form_div.AddControl(header);
    popup_med_balance_form_div.AddControl(main);
    popup_med_balance_form_div.AddControl(footer);

    popup_datetime_reset();
    popup_mbf_get_form_list(test_data_form);

    return popup_med_balance_form_div;
};

function get_mbf_header()
{
    let popup_mbf_header = document.createElement("div");
    popup_mbf_header.classList.add("popup_mbf_header");

    let pp_mbf_header_title = document.createElement("div");
    pp_mbf_header_title.classList.add('pp_mbf_header_title');
    pp_mbf_header_title.innerHTML = '結存報表';

    let pp_mbf_header_content_contaienr = document.createElement("div");
    pp_mbf_header_content_contaienr.classList.add("pp_mbf_header_content_contaienr");

    let pp_mbf_header_name_div = document.createElement("div");
    pp_mbf_header_name_div.classList.add("pp_mbf_header_name_div");

    let pp_mbf_h_name_title = document.createElement("div");
    pp_mbf_h_name_title.classList.add("pp_mbf_h_title");
    pp_mbf_h_name_title.innerHTML = "藥名：";

    let pp_mbf_h_name_content = document.createElement("div");
    pp_mbf_h_name_content.classList.add("pp_mbf_h_title");
    pp_mbf_h_name_content.id = "pp_mbf_h_name_content";

    pp_mbf_header_name_div.appendChild(pp_mbf_h_name_title);
    pp_mbf_header_name_div.appendChild(pp_mbf_h_name_content);

    // let pp_mbf_header_ctname_div = document.createElement("div");
    // pp_mbf_header_ctname_div.classList.add("pp_mbf_header_ctname_div");

    let pp_mbf_h_ctname_title = document.createElement("div");
    pp_mbf_h_ctname_title.classList.add("pp_mbf_h_title");
    pp_mbf_h_ctname_title.innerHTML = "中文名：";

    let pp_mbf_h_ctname_content = document.createElement("div");
    pp_mbf_h_ctname_content.classList.add("pp_mbf_h_title");
    pp_mbf_h_ctname_content.id = "pp_mbf_h_ctname_content";

    pp_mbf_header_name_div.appendChild(pp_mbf_h_ctname_title);
    pp_mbf_header_name_div.appendChild(pp_mbf_h_ctname_content);

    let pp_mbf_header_code_div = document.createElement("div");
    pp_mbf_header_code_div.classList.add("pp_mbf_header_code_div");

    let pp_mbf_h_code_title = document.createElement("div");
    pp_mbf_h_code_title.classList.add("pp_mbf_h_title");
    pp_mbf_h_code_title.innerHTML = "藥碼：";

    let pp_mbf_h_code_content = document.createElement("div");
    pp_mbf_h_code_content.classList.add("pp_mbf_h_title");
    pp_mbf_h_code_content.id = "pp_mbf_h_code_content";

    pp_mbf_header_code_div.appendChild(pp_mbf_h_code_title);
    pp_mbf_header_code_div.appendChild(pp_mbf_h_code_content);
    
    let pp_mbf_h_dkind_title = document.createElement("div");
    pp_mbf_h_dkind_title.classList.add("pp_mbf_h_title");
    pp_mbf_h_dkind_title.innerHTML = "管制級別：";

    let pp_mbf_h_dkind_content = document.createElement("div");
    pp_mbf_h_dkind_content.classList.add("pp_mbf_h_title");
    pp_mbf_h_dkind_content.id = "pp_mbf_h_dkind_content";

    pp_mbf_header_code_div.appendChild(pp_mbf_h_dkind_title);
    pp_mbf_header_code_div.appendChild(pp_mbf_h_dkind_content);

    let pp_mbf_h_unit_title = document.createElement("div");
    pp_mbf_h_unit_title.classList.add("pp_mbf_h_title");
    pp_mbf_h_unit_title.innerHTML = "最小單位：";

    let pp_mbf_h_unit_content = document.createElement("div");
    pp_mbf_h_unit_content.classList.add("pp_mbf_h_title");
    pp_mbf_h_unit_content.id = "pp_mbf_h_unit_content";

    pp_mbf_header_code_div.appendChild(pp_mbf_h_unit_title);
    pp_mbf_header_code_div.appendChild(pp_mbf_h_unit_content);

    let pp_mbf_h_sum_title = document.createElement("div");
    pp_mbf_h_sum_title.classList.add("pp_mbf_h_title");
    pp_mbf_h_sum_title.innerHTML = "總消耗量：";

    let pp_mbf_h_sum_content = document.createElement("div");
    pp_mbf_h_sum_content.classList.add("pp_mbf_h_title");
    pp_mbf_h_sum_content.id = "pp_mbf_h_sum_content";

    pp_mbf_header_code_div.appendChild(pp_mbf_h_sum_title);
    pp_mbf_header_code_div.appendChild(pp_mbf_h_sum_content);

    let pp_mbf_header_daterange_div = document.createElement("div");
    pp_mbf_header_daterange_div.classList.add('pp_mbf_header_daterange_div');

    let pp_mbf_h_start_time_div = document.createElement("div");
    pp_mbf_h_start_time_div.classList.add("pp_mbf_h_time_div");

    let pp_mbf_h_start_time_title = document.createElement("div");
    pp_mbf_h_start_time_title.classList.add("pp_mbf_h_start_time_title");
    pp_mbf_h_start_time_title.innerText = '起始時間：';

    let pp_mbf_h_start_time = document.createElement("div");
    pp_mbf_h_start_time.classList.add("pp_mbf_h_start_time");

    pp_mbf_h_start_time_div.appendChild(pp_mbf_h_start_time_title);
    pp_mbf_h_start_time_div.appendChild(pp_mbf_h_start_time);

    let pp_mbf_h_end_time_div = document.createElement("div");
    pp_mbf_h_end_time_div.classList.add("pp_mbf_h_time_div");

    let pp_mbf_h_end_time_title = document.createElement("div");
    pp_mbf_h_end_time_title.classList.add("pp_mbf_h_end_time_title");
    pp_mbf_h_end_time_title.innerText = '結束時間：';

    let pp_mbf_h_end_time = document.createElement("div");
    pp_mbf_h_end_time.classList.add("pp_mbf_h_end_time");

    pp_mbf_h_end_time_div.appendChild(pp_mbf_h_end_time_title);
    pp_mbf_h_end_time_div.appendChild(pp_mbf_h_end_time);

    pp_mbf_header_daterange_div.appendChild(pp_mbf_h_start_time_div);
    pp_mbf_header_daterange_div.appendChild(pp_mbf_h_end_time_div);

    pp_mbf_header_content_contaienr.appendChild(pp_mbf_header_name_div);
    // pp_mbf_header_content_contaienr.appendChild(pp_mbf_header_ctname_div);
    pp_mbf_header_content_contaienr.appendChild(pp_mbf_header_code_div);
    pp_mbf_header_content_contaienr.appendChild(pp_mbf_header_daterange_div);

    popup_mbf_header.appendChild(pp_mbf_header_title);
    popup_mbf_header.appendChild(pp_mbf_header_content_contaienr);

    return popup_mbf_header;
};

function get_mbf_main()
{
    let pp_mbf_main_container = document.createElement("div");
    pp_mbf_main_container.classList.add("pp_mbf_main_container");

    let pp_mbf_main_th_container = popup_mbf_main_th_get();
    let pp_mbf_main_table_container = document.createElement("div");
    pp_mbf_main_table_container.classList.add('pp_mbf_main_table_container');

    pp_mbf_main_container.appendChild(pp_mbf_main_th_container);
    pp_mbf_main_container.appendChild(pp_mbf_main_table_container);

    return pp_mbf_main_container;
};
function get_mbf_footer()
{
    let pp_mbf_footer_container = document.createElement("div");
    pp_mbf_footer_container.classList.add("pp_mbf_footer_container");

    let pp_mbf_close_btn = document.createElement("div");
    pp_mbf_close_btn.classList.add("pp_mbf_close_btn");
    pp_mbf_close_btn.innerHTML = '關閉';
    pp_mbf_close_btn.addEventListener("click", () => {
        popup_med_balance_form_close();
    });

    let pp_mbf_download_btn = document.createElement("div");
    pp_mbf_download_btn.classList.add("pp_mbf_download_btn");
    pp_mbf_download_btn.innerHTML = '下載報表';
    pp_mbf_download_btn.addEventListener("click", () => {
    });

    pp_mbf_footer_container.appendChild(pp_mbf_close_btn);
    pp_mbf_footer_container.appendChild(pp_mbf_download_btn);

    return pp_mbf_footer_container;
};

function popup_med_balance_form_close() {
    popup_med_balance_form_div.Set_Visible(false);
}

function popup_med_balance_form_open() {
    popup_med_balance_form_div.Set_Visible(true);
}

function popup_mbf_main_th_get() {
    let pp_mbf_main_th_container = document.createElement("div");
    pp_mbf_main_th_container.classList.add("pp_mbf_main_th_container");

    for (let i = 0; i < 10; i++) {
        let pp_mbf_th = document.createElement("div");
        pp_mbf_th.classList.add(`pp_mbf_th_${i}`);
        pp_mbf_th.classList.add(`pp_mbf_th_style`);
            if (i == 0) pp_mbf_th.innerHTML = "序號";
            if (i == 1)pp_mbf_th.innerHTML = "日期時間";
            if (i == 2)pp_mbf_th.innerHTML = "領藥號/病房";
            if (i == 3)pp_mbf_th.innerHTML = "類別";
            if (i == 4)pp_mbf_th.innerHTML = "病人姓名";
            if (i == 5)pp_mbf_th.innerHTML = "病歷號";
            if (i == 6)pp_mbf_th.innerHTML = "調劑人";
            if (i == 7)pp_mbf_th.innerHTML = "交易量";
            if (i == 8)pp_mbf_th.innerHTML = "結存量";
            if (i == 9)pp_mbf_th.innerHTML = "收支原因";
            
        pp_mbf_main_th_container.appendChild(pp_mbf_th);
    }

    return pp_mbf_main_th_container;
}

function popup_mbf_table_init() {
    let pp_mbf_main_table_container = document.querySelector(".pp_mbf_main_table_container");
    pp_mbf_main_table_container.innerHTML = "";
}

let test_data_form = [
    {
        index: 0,
        datetime: "2024/02/05 09:16:49",
        order: 1113580,
        type: "入庫",
        p_name: "王小美",
        p_list: 11531522,
        p_man: '湯慧茹',
        trade: -1,
        balance: 1841,
        reason: "[系統領藥]"
    },
    {
        index: 0,
        datetime: "2024/02/05 09:16:49",
        order: 1113580,
        type: "入庫",
        p_name: "王小美",
        p_list: 11531522,
        p_man: '湯慧茹',
        trade: -1,
        balance: 1841,
        reason: "[系統領藥]"
    },
    {
        index: 0,
        datetime: "2024/02/05 09:16:49",
        order: 1113580,
        type: "入庫",
        p_name: "王小美",
        p_list: 11531522,
        p_man: '湯慧茹',
        trade: -1,
        balance: 1841,
        reason: "[系統領藥]"
    },
    {
        index: 0,
        datetime: "2024/02/05 09:16:49",
        order: 1113580,
        type: "入庫",
        p_name: "王小美",
        p_list: 11531522,
        p_man: '湯慧茹',
        trade: -1,
        balance: 1841,
        reason: "[系統領藥]"
    },
    {
        index: 0,
        datetime: "2024/02/05 09:16:49",
        order: 1113580,
        type: "入庫",
        p_name: "王小美",
        p_list: 11531522,
        p_man: '湯慧茹',
        trade: -1,
        balance: 1841,
        reason: "[系統領藥]"
    },
]

function popup_mbf_get_form_list(array) {
    popup_mbf_table_init();

    array.forEach((element, index) => {
        popup_mgf_get_form_item(element, index);
    });
}
function popup_mgf_get_form_item(data, index) {
    let pp_mbf_main_table_container = document.querySelector(".pp_mbf_main_table_container");

    let pp_mgf_main_td_container = document.createElement('div');
    pp_mgf_main_td_container.classList.add("pp_mgf_main_td_container");

    let pp_mgf_main_tr_0 = document.createElement("div");
    pp_mgf_main_tr_0.classList.add("pp_mgf_main_tr_0");
    pp_mgf_main_tr_0.classList.add("pp_mgf_main_tr");
    pp_mgf_main_tr_0.innerHTML = data.index;

    let pp_mgf_main_tr_1 = document.createElement("div");
    pp_mgf_main_tr_1.classList.add("pp_mgf_main_tr_1");
    pp_mgf_main_tr_1.classList.add("pp_mgf_main_tr");
    pp_mgf_main_tr_1.innerHTML = data.datetime;

    let pp_mgf_main_tr_2 = document.createElement("div");
    pp_mgf_main_tr_2.classList.add("pp_mgf_main_tr_2");
    pp_mgf_main_tr_2.classList.add("pp_mgf_main_tr");
    pp_mgf_main_tr_2.innerHTML = data.order;

    let pp_mgf_main_tr_3 = document.createElement("div");
    pp_mgf_main_tr_3.classList.add("pp_mgf_main_tr_3");
    pp_mgf_main_tr_3.classList.add("pp_mgf_main_tr");
    pp_mgf_main_tr_3.innerHTML = data.type;

    let pp_mgf_main_tr_4 = document.createElement("div");
    pp_mgf_main_tr_4.classList.add("pp_mgf_main_tr_4");
    pp_mgf_main_tr_4.classList.add("pp_mgf_main_tr");
    pp_mgf_main_tr_4.innerHTML = data.p_name;

    let pp_mgf_main_tr_5 = document.createElement("div");
    pp_mgf_main_tr_5.classList.add("pp_mgf_main_tr_5");
    pp_mgf_main_tr_5.classList.add("pp_mgf_main_tr");
    pp_mgf_main_tr_5.innerHTML = data.p_list;

    let pp_mgf_main_tr_6 = document.createElement("div");
    pp_mgf_main_tr_6.classList.add("pp_mgf_main_tr_6");
    pp_mgf_main_tr_6.classList.add("pp_mgf_main_tr");
    pp_mgf_main_tr_6.innerHTML = data.p_man;

    let pp_mgf_main_tr_7 = document.createElement("div");
    pp_mgf_main_tr_7.classList.add("pp_mgf_main_tr_7");
    pp_mgf_main_tr_7.classList.add("pp_mgf_main_tr");
    pp_mgf_main_tr_7.innerHTML = data.trade;

    let pp_mgf_main_tr_8 = document.createElement("div");
    pp_mgf_main_tr_8.classList.add("pp_mgf_main_tr_8");
    pp_mgf_main_tr_8.classList.add("pp_mgf_main_tr");
    pp_mgf_main_tr_8.innerHTML = data.balance;

    let pp_mgf_main_tr_9 = document.createElement("div");
    pp_mgf_main_tr_9.classList.add("pp_mgf_main_tr_9");
    pp_mgf_main_tr_9.classList.add("pp_mgf_main_tr");
    pp_mgf_main_tr_9.innerHTML = data.reason;

    if(index % 2 == 1) {
        pp_mgf_main_tr_0.classList.add("pp_mgf_main_tr_bgc");
        pp_mgf_main_tr_1.classList.add("pp_mgf_main_tr_bgc");
        pp_mgf_main_tr_2.classList.add("pp_mgf_main_tr_bgc");
        pp_mgf_main_tr_3.classList.add("pp_mgf_main_tr_bgc");
        pp_mgf_main_tr_4.classList.add("pp_mgf_main_tr_bgc");
        pp_mgf_main_tr_5.classList.add("pp_mgf_main_tr_bgc");
        pp_mgf_main_tr_6.classList.add("pp_mgf_main_tr_bgc");
        pp_mgf_main_tr_7.classList.add("pp_mgf_main_tr_bgc");
        pp_mgf_main_tr_8.classList.add("pp_mgf_main_tr_bgc");
        pp_mgf_main_tr_9.classList.add("pp_mgf_main_tr_bgc");
    }

    pp_mgf_main_td_container.appendChild(pp_mgf_main_tr_0);
    pp_mgf_main_td_container.appendChild(pp_mgf_main_tr_1);
    pp_mgf_main_td_container.appendChild(pp_mgf_main_tr_2);
    pp_mgf_main_td_container.appendChild(pp_mgf_main_tr_3);
    pp_mgf_main_td_container.appendChild(pp_mgf_main_tr_4);
    pp_mgf_main_td_container.appendChild(pp_mgf_main_tr_5);
    pp_mgf_main_td_container.appendChild(pp_mgf_main_tr_6);
    pp_mgf_main_td_container.appendChild(pp_mgf_main_tr_7);
    pp_mgf_main_td_container.appendChild(pp_mgf_main_tr_8);
    pp_mgf_main_td_container.appendChild(pp_mgf_main_tr_9);

    
    pp_mbf_main_table_container.appendChild(pp_mgf_main_td_container);
}