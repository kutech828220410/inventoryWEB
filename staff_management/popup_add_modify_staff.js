let popup_add_modify_staff_div;
let temp_staff_data = {};

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
                staff_gender_female_radio.default = true;

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
                    <option value="01">01</option>
                    <option value="02">02</option>
                    <option value="03">03</option>
                    <option value="04">04</option>
                    <option value="05">05</option>
                    <option value="06">06</option>
                    <option value="07">07</option>
                    <option value="08">08</option>
                    <option value="09">09</option>
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
    ppams_btn.addEventListener("click", (e) => {
        staff_add_edit_func(e);
    });

    let ppams_close_btn = document.createElement("div");
    ppams_close_btn.classList.add('btn');
    ppams_close_btn.classList.add('ppams_close_btn');
    ppams_close_btn.innerHTML = "關閉";
    ppams_close_btn.addEventListener("click", () => {
        reset_popup_staff_info("");
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

async function staff_add_edit_func(e) {
    Set_main_div_enable(true);
    // {
    //     GUID: "", str
    //     ID: "", str
    //     name: "測試人員", str
    //     gender: "男", str
    //     password: "T999", str
    //     employer: "藥劑科", str
    //     license: "", str
    //     level: "20", str
    //     color: "200,0,255", str
    //     UID: "8A226D7E99999", str
    //     barcode: "", 
    //     face_image: "", 
    //     finger_feature: "", 
    //     finger_ID: "", 
    //     open_access: ""
    // }
    let staff_info_id = document.querySelector("#staff_info_id");
    let staff_info_name = document.querySelector("#staff_info_name");
    let staff_gender_radio = document.getElementsByName("staff_gender_radio");
    let staff_info_pwd = document.querySelector("#staff_info_pwd");
    let staff_info_unit = document.querySelector("#staff_info_unit");
    let staff_info_level = document.querySelector("#staff_info_level");
    let staff_info_color = document.querySelector("#staff_info_color");
    let staff_info_card_num = document.querySelector("#staff_info_card_num");
    let staff_info_barcode = document.querySelector("#staff_info_barcode");
    let staff_info_license = document.querySelector("#staff_info_license");

    console.log(e.target.innerHTML);
    console.log(temp_staff_data);

    let temp_post_data = [
        {
            GUID: "",
            ID: "",
            name: "",
            gender: "",
            password: "",
            employer: "",
            license: "",
            level: "",
            color: "",
            UID: "",
            barcode: "",
            face_image: "",
            finger_feature: "",
            finger_ID: "",
            open_access: ""
        }
    ];

    if(e.target.innerHTML == "新增") {
        temp_post_data[0].ID = staff_info_id.value;
        temp_post_data[0].name = staff_info_name.value;
        staff_gender_radio.forEach(e => {
            if(e.checked) {
                switch (e.value) {
                    case "male":
                        temp_post_data[0].gender = "男";
                        break;

                    case "female":
                        temp_post_data[0].gender = "女";
                        break;
                
                    default:
                        break;
                }
            }
        });
        temp_post_data[0].password = staff_info_pwd.value;
        temp_post_data[0].employer = staff_info_unit.value;
        temp_post_data[0].level = staff_info_level.value;
        switch (staff_info_color.value) {
            case "green":
                temp_post_data[0].color = "40,255,40";
                break;
        
            case "yellow":
                temp_post_data[0].color = "255,255,40";
                break;
        
            case "red":
                temp_post_data[0].color = "255,40,40";
                break;
        
            case "blue":
                temp_post_data[0].color = "40,40,255";
                break;
        
            case "orange":
                temp_post_data[0].color = "255,160,40";
                break;
        
            default:
                break;
        }
        temp_post_data[0].UID = staff_info_card_num.value;
        temp_post_data[0].barcode = staff_info_barcode.value;
        temp_post_data[0].license = staff_info_license.value;

        console.log("post_data", temp_post_data);
    } else if(e.target.innerHTML == "修改") {
        temp_post_data[0].GUID = temp_staff_data.GUID;
        temp_post_data[0].face_image = temp_staff_data.face_image;
        temp_post_data[0].finger_feature = temp_staff_data.finger_feature;
        temp_post_data[0].finger_ID = temp_staff_data.finger_ID;
        temp_post_data[0].open_access = temp_staff_data.open_access;

        temp_post_data[0].ID = staff_info_id.value;
        temp_post_data[0].name = staff_info_name.value;
        staff_gender_radio.forEach(e => {
            if(e.checked) {
                switch (e.value) {
                    case "male":
                        temp_post_data[0].gender = "男";
                        break;

                    case "female":
                        temp_post_data[0].gender = "女";
                        break;
                
                    default:
                        break;
                }
            }
        });
        temp_post_data[0].password = staff_info_pwd.value;
        temp_post_data[0].employer = staff_info_unit.value;
        temp_post_data[0].level = staff_info_level.value;
        switch (staff_info_color.value) {
            case "green":
                temp_post_data[0].color = "40,255,40";
                break;
        
            case "yellow":
                temp_post_data[0].color = "255,255,40";
                break;
        
            case "red":
                temp_post_data[0].color = "255,40,40";
                break;
        
            case "blue":
                temp_post_data[0].color = "40,40,255";
                break;
        
            case "orange":
                temp_post_data[0].color = "255,160,40";
                break;
        
            default:
                break;
        }
        temp_post_data[0].UID = staff_info_card_num.value;
        temp_post_data[0].barcode = staff_info_barcode.value;
        temp_post_data[0].license = staff_info_license.value;

        console.log("post_data", temp_post_data);
    }

    let res = await staff_add_edit_api(temp_post_data);
    this.staff_info = await get_all_staff_info();
    get_info_init(this.staff_info["Data"]);
    
    console.log(res);
    if(res.Code != 200) {
        alert('發生不可預期錯誤！');
    } else {
        alert("新增/修改人員成功");
        popup_add_modify_staff_div_close();
    }

    Set_main_div_enable(false);
}