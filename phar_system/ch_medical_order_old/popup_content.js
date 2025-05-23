let popup_cht_med_content_div;

function get_popup_cht_med_content()
{
    popup_cht_med_content_div = new Basic_popup_Div('popup_cht_med_content_div','popup_cht_med_content_div','','');
    popup_cht_med_content_div._popup_div.style.border = '10px solid white';

    let header = get_ppcmc_header();
    let main = get_ppcmc_main();
    let footer = get_ppcmc_footer();

    popup_cht_med_content_div.AddControl(header);
    popup_cht_med_content_div.AddControl(main);
    popup_cht_med_content_div.AddControl(footer);

    return popup_cht_med_content_div;
};
function get_ppcmc_header() {
    let ppcmc_header_container = document.createElement("div");
    ppcmc_header_container.classList.add("ppcmc_header_container");

    let ppcmc_h_title = document.createElement("div");
    ppcmc_h_title.classList.add("ppcmc_h_title");
    ppcmc_h_title.innerText = "處方查詢";

    let ppcmc_h_close_btn = document.createElement("img");
    ppcmc_h_close_btn.classList.add("ppcmc_h_close_btn");
    ppcmc_h_close_btn.src = "../image/close.png";
    ppcmc_h_close_btn.addEventListener("click", () => {
        popup_cht_med_content_div_close();
    });

    ppcmc_header_container.appendChild(ppcmc_h_title);
    ppcmc_header_container.appendChild(ppcmc_h_close_btn);

    return ppcmc_header_container;
}
function get_ppcmc_main() {
    let ppcmc_main_container = document.createElement("div");
    ppcmc_main_container.classList.add("ppcmc_main_container");

    let pp_patient_info_container = set_pp_patient_info_container();
    let pp_med_list_table_container = set_pp_med_list_table_container();

    ppcmc_main_container.appendChild(pp_patient_info_container);
    ppcmc_main_container.appendChild(pp_med_list_table_container);

    return ppcmc_main_container;
}
function get_ppcmc_footer() {
    let ppcmc_footer_container = document.createElement("div");
    ppcmc_footer_container.classList.add("ppcmc_footer_container");

    return ppcmc_footer_container;
}
function popup_cht_med_content_div_close() {
    popup_cht_med_content_div.Set_Visible(false);
}
function popup_cht_med_content_div_open() {
    popup_cht_med_content_div.Set_Visible(true);
}
function set_pp_patient_info_container() {
    let pp_patient_info_container = document.createElement("div");
    pp_patient_info_container.classList.add("pp_patient_info_container");

    let pppi_p_name_div = document.createElement("div");
    pppi_p_name_div.classList.add("pppi_div");
    pppi_p_name_div.id = "pppi_p_name_div";
    pppi_p_name_div.innerHTML = `
        <span class="pppi_patient_name">病人姓名</span>
        <span class="pppi_patient_gender">(性別)</span>
        <span class="pppi_patient_PATCODE">病歷號</span>
    `;

    let pppi_p_age_div = document.createElement("div");
    pppi_p_age_div.classList.add("pppi_div");
    pppi_p_age_div.id = "pppi_p_age_div";
    pppi_p_age_div.innerHTML = `
        <span class="pppi_patient_label">年齡</span>：
        <span class="pppi_patient_age">100歲</span>
    `;

    let pppi_p_date_div = document.createElement("div");
    pppi_p_date_div.classList.add("pppi_div");
    pppi_p_date_div.id = "pppi_p_date_div";
    pppi_p_date_div.innerHTML = `
        <span class="pppi_patient_label">處方日期</span>：
        <span class="pppi_patient_ORD_START">開方時間</span>
    `;

    pp_patient_info_container.appendChild(pppi_p_name_div);
    pp_patient_info_container.appendChild(pppi_p_age_div);
    pp_patient_info_container.appendChild(pppi_p_date_div);

    return pp_patient_info_container;
}
function set_pp_med_list_table_container() {
    let pp_med_list_table_container = document.createElement("div");
    pp_med_list_table_container.classList.add("pp_med_list_table_container");

    return pp_med_list_table_container;
}
function set_pp_med_table(array) {
    let table_header_data = ["", "藥名", "應調", "實調", "天", "單位", "備註"];

    let pppi_patient_name = document.querySelector(".pppi_patient_name");
    let pppi_patient_gender = document.querySelector(".pppi_patient_gender");
    let pppi_patient_PATCODE = document.querySelector(".pppi_patient_PATCODE");
    let pppi_patient_age = document.querySelector(".pppi_patient_age");
    let pppi_patient_ORD_START = document.querySelector(".pppi_patient_ORD_START");

    pppi_patient_name.innerHTML = array[0].PATNAME;
    if(array[0].SEX == "M") {
        pppi_patient_gender.innerHTML = `(男)`;
    } else {
        pppi_patient_gender.innerHTML = `(女)`;
    }
    pppi_patient_PATCODE.innerHTML = array[0].PATCODE;
    pppi_patient_age.innerHTML = array[0].AGE;
    pppi_patient_ORD_START.innerHTML = array[0].ORD_START;


    let pp_med_list_table_container = document.querySelector(".pp_med_list_table_container");
    pp_med_list_table_container.innerHTML = "";

    let pp_med_table = document.createElement("table");
    pp_med_table.classList.add("pp_med_table");

    let ppm_table_header_container = document.createElement("tr");
    ppm_table_header_container.classList.add("ppm_table_header_container");

    table_header_data.forEach((element, index) => {
        let ppm_table_th = document.createElement("th");
        ppm_table_th.classList.add(`col${index + 1}`);
        ppm_table_th.classList.add(`ppm_table_th`);
        ppm_table_th.innerHTML = element;
        ppm_table_header_container.appendChild(ppm_table_th);
    });

    pp_med_table.appendChild(ppm_table_header_container);

    array.forEach((item, y) => {
        let ppm_content_container = document.createElement("tr");
        ppm_content_container.classList.add("ppm_content_container");

        if(y%2 != 0) {
            ppm_content_container.innerHTML = `
                <td class="ppm_table_td td_col_1 col_1">${y + 1}</td>
                <td class="ppm_table_td td_col_2 col_2">${item.NAME}</td>
                <td class="ppm_table_td td_col_3 col_3">${item.TXN_QTY}</td>
                <td class="ppm_table_td td_col_4 col_4">${item.DISP_QTY}</td>
                <td class="ppm_table_td td_col_5 col_5">${item.DAYS}</td>
                <td class="ppm_table_td td_col_6 col_6">${item.DUNIT}</td>
                <td class="ppm_table_td td_col_7 col_7">${item.NOTE}</td>
            `;
        } else {
            ppm_content_container.innerHTML = `
                <td class="ppm_table_td bgc_gray td_col_1 col_1">${y + 1}</td>
                <td class="ppm_table_td bgc_gray td_col_2 col_2">${item.NAME}</td>
                <td class="ppm_table_td bgc_gray td_col_3 col_3">${item.TXN_QTY}</td>
                <td class="ppm_table_td bgc_gray td_col_4 col_4">${item.DISP_QTY}</td>
                <td class="ppm_table_td bgc_gray td_col_5 col_5">${item.DAYS}</td>
                <td class="ppm_table_td bgc_gray td_col_6 col_6">${item.DUNIT}</td>
                <td class="ppm_table_td bgc_gray td_col_7 col_7">${item.NOTE}</td>
            `;
        }


        pp_med_table.appendChild(ppm_content_container);
    });

    pp_med_list_table_container.appendChild(pp_med_table);
}