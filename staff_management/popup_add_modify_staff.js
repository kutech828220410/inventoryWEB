let popup_add_modify_staff_div;

function get_popup_add_modify_staff()
{
    popup_add_modify_staff_div = new Basic_popup_Div('popup_add_modify_staff_div','popup_add_modify_staff_div','','');
    popup_add_modify_staff_div._popup_div.style.border = '10px solid white';

    let header = get_pp_add_modify_staff_header();
    let main = get_pp_add_modify_staff_main();
    let footer = get_pp_add_modify_staff_footer();

    popup_add_modify_staff_div.AddControl(header);
    popup_add_modify_staff_div.AddControl(main);
    popup_add_modify_staff_div.AddControl(footer);

    return popup_add_modify_staff_div;
}
function get_pp_add_modify_staff_header() {
    let ppams_header_container = document.createElement("div");
    ppams_header_container.classList.add("ppams_header_container");
    ppams_header_container.innerHTML = '新增人員';

    return ppams_header_container;
}
function get_pp_add_modify_staff_main() {
    let ppams_main_container = document.createElement("div");
    ppams_main_container.classList.add("ppams_main_container");

    let form_data_title = ["ID", "姓名", "性別", "密碼", "單位", "權限等級", "顏色", "卡號", "一維條碼", "藥師證號"];

    form_data_title.forEach(element => {
        let staff_info_container = document.createElement("div");
        staff_info_container.classList.add("staff_info_container");

        let staff_info_label = document.createElement("label");
        staff_info_label.innerHTML = element;
        staff_info_container.appendChild(staff_info_label);

        switch (element) {
            case "ID":
                staff_info_label.setAttribute("for", "staff_info_id");
                let staff_info_id = document.createElement("input");
                staff_info_id.id = "staff_info_id";
                staff_info_id.name = "staff_info_id";
                staff_info_id.type = "text";
                staff_info_container.appendChild(staff_info_id);
                break;
        
            case "姓名":
                staff_info_label.setAttribute("for", "staff_info_name");
                let staff_info_name = document.createElement("input");
                staff_info_name.id = "staff_info_name";
                staff_info_name.name = "staff_info_name";
                staff_info_name.type = "text";
                staff_info_container.appendChild(staff_info_name);
                break;
        
            case "性別":
                staff_info_label.setAttribute("for", "");

                let staff_female_label = document.createElement("label");
                staff_female_label.classList.add('staff_gender_label');
                staff_female_label.innerHTML = "女";
                staff_female_label.setAttribute("for", "staff_gender_female_radio");

                let staff_gender_female_radio = document.createElement("input");
                staff_gender_female_radio.type = "radio";
                staff_gender_female_radio.value = "female";
                staff_gender_female_radio.name = "staff_gender_radio";
                staff_gender_female_radio.id = "staff_gender_female_radio";

                let staff_male_label = document.createElement("label");
                staff_male_label.classList.add('staff_gender_label');
                staff_male_label.innerHTML = "男";
                staff_male_label.setAttribute("for", "staff_gender_male_radio");

                let staff_gender_male_radio = document.createElement("input");
                staff_gender_male_radio.type = "radio";
                staff_gender_male_radio.value = "male";
                staff_gender_male_radio.name = "staff_gender_radio";
                staff_gender_male_radio.id = "staff_gender_male_radio";

                staff_info_container.appendChild(staff_gender_female_radio);
                staff_info_container.appendChild(staff_female_label);
                staff_info_container.appendChild(staff_gender_male_radio);
                staff_info_container.appendChild(staff_male_label);
                break;
        
            case "密碼":
                staff_info_label.setAttribute("for", "staff_info_pwd");
                let staff_info_pwd = document.createElement("input");
                staff_info_pwd.id = "staff_info_pwd";
                staff_info_pwd.name = "staff_info_pwd";
                staff_info_pwd.type = "text";
                staff_info_container.appendChild(staff_info_pwd);
                break;
        
            case "單位":
                staff_info_label.setAttribute("for", "staff_info_unit");
                let staff_info_unit = document.createElement("input");
                staff_info_unit.id = "staff_info_unit";
                staff_info_unit.name = "staff_info_unit";
                staff_info_unit.type = "text";
                staff_info_container.appendChild(staff_info_unit);
                break;
        
            case "權限等級":
                staff_info_label.setAttribute("for", "staff_info_level");
                let staff_info_level = document.createElement("select");
                staff_info_level.id = "staff_info_level";
                staff_info_level.innerHTML = `
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                    <option value="18">18</option>
                    <option value="19">19</option>
                    <option value="20">20</option>
                `
                staff_info_container.appendChild(staff_info_level);
                break;
        
            case "顏色":
                staff_info_label.setAttribute("for", "staff_info_color");
                let staff_info_color = document.createElement("select");
                staff_info_color.id = "staff_info_color";
                staff_info_color.innerHTML = `
                    <option value="green">綠色</option>
                    <option value="red">紅色</option>
                    <option value="blue">藍色</option>
                    <option value="yellow">黃色</option>
                    <option value="orange">橘色</option>
                `
                staff_info_container.appendChild(staff_info_color);
                break;
        
            case "卡號":
                staff_info_label.setAttribute("for", "staff_info_card_num");
                let staff_info_card_num = document.createElement("input");
                staff_info_card_num.id = "staff_info_card_num";
                staff_info_card_num.name = "staff_info_card_num";
                staff_info_card_num.type = "text";
                staff_info_container.appendChild(staff_info_card_num);
                break;
        
            case "一維條碼":
                staff_info_label.setAttribute("for", "staff_info_barcode");
                let staff_info_barcode = document.createElement("input");
                staff_info_barcode.id = "staff_info_barcode";
                staff_info_barcode.name = "staff_info_barcode";
                staff_info_barcode.type = "text";
                staff_info_container.appendChild(staff_info_barcode);
                break;
        
            case "藥師證號":
                staff_info_label.setAttribute("for", "staff_info_license");
                let staff_info_license = document.createElement("input");
                staff_info_license.id = "staff_info_license";
                staff_info_license.name = "staff_info_license";
                staff_info_license.type = "text";
                staff_info_container.appendChild(staff_info_license);
                break;
        
            default:
                break;
        }


        ppams_main_container.appendChild(staff_info_container);
    });

    return ppams_main_container;
}
function get_pp_add_modify_staff_footer() {
    let ppams_footer_container = document.createElement("div");
    ppams_footer_container.classList.add("ppams_footer_container");

    let ppams_btn = document.createElement("div");
    ppams_btn.classList.add('btn');
    ppams_btn.classList.add('ppams_btn');
    ppams_btn.innerHTML = "新增";

    let ppams_close_btn = document.createElement("div");
    ppams_close_btn.classList.add('btn');
    ppams_close_btn.classList.add('ppams_close_btn');
    ppams_close_btn.innerHTML = "關閉";
    ppams_close_btn.addEventListener("click", () => {
        popup_add_modify_staff_div_close();
    })

    ppams_footer_container.appendChild(ppams_close_btn);
    ppams_footer_container.appendChild(ppams_btn);

    return ppams_footer_container;
}

function popup_add_modify_staff_div_close() {
    popup_add_modify_staff_div.Set_Visible(false);
}
 
function popup_add_modify_staff_div_open() {
    popup_add_modify_staff_div.Set_Visible(true);
}