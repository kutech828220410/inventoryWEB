let popup_prescription_info_div;
// let ppp_info_label_data = [
//     {
//         name: "id",
//         title: "序號"
//     },
//     {
//         name: "name",
//         title: "藥名"
//     },
//     {
//         name: "classno",
//         title: "分類號"
//     },
//     {
//         name: "classname",
//         title: "類別名"
//     },
//     {
//         name: "trade",
//         title: "藥品商品名"
//     },
//     {
//         name: "class",
//         title: "藥品分類"
//     },
//     {
//         name: "txclass",
//         title: "藥品治療分類"
//     },
//     {
//         name: "indic",
//         title: "適應症"
//     },
//     {
//         name: "dosage_info",
//         title: "用法劑量"
//     },
// ];
let ppp_info_label_data = [
    {
        name: "PHARMACOLOGICAL_SEQ",
        title: "序號"
    },
    {
        name: "NAME",
        title: "藥名"
    },
    {
        name: "PHARMACOLOGICAL_CODE",
        title: "分類號"
    },
    {
        name: "PHARMACOLOGICAL_NAME",
        title: "類別名"
    },
    {
        name: "DIANAME",
        title: "藥品商品名"
    },
    {
        name: "HealthInsurancePrice",
        title: "健保價"
    },
    {
        name: "SalePrice",
        title: "售價"
    },
    {
        name: "TYPE",
        title: "藥品分類"
    },
    {
        name: "TREATMENT_CATEGORY_CODE",
        title: "藥品治療分類"
    },
    {
        name: "INDICATION",
        title: "適應症"
    },
    {
        name: "INSTRUCTIONS",
        title: "用法劑量"
    },
];

function get_popup_prescription_info() {
    popup_prescription_info_div = new Basic_popup_Div('popup_prescription_info_div','popup_prescription_info_div','','');
    popup_prescription_info_div._popup_div.style.border = '10px solid white';

    let header = get_ppp_info_header();
    let main = get_ppp_info_main();
    let footer = get_ppp_info_footer();

    popup_prescription_info_div.AddControl(header);
    popup_prescription_info_div.AddControl(main);
    popup_prescription_info_div.AddControl(footer);

    return popup_prescription_info_div;
};
function get_ppp_info_header() {
    let ppp_info_header_container = document.createElement("div");
    ppp_info_header_container.classList.add("ppp_info_header_container");

    let ppp_info_h_title = document.createElement("div");
    ppp_info_h_title.classList.add("ppp_info_h_title");
    ppp_info_h_title.innerHTML = `<span class="ppp_info_h_title_span">處方集</span>`;

    let ppp_info_h_close_btn = document.createElement("img");
    ppp_info_h_close_btn.classList.add("ppp_info_h_close_btn");
    ppp_info_h_close_btn.src = "../image/close.png";
    ppp_info_h_close_btn.addEventListener("click", () => {
        popup_prescription_info_div_close();
    });

    ppp_info_header_container.appendChild(ppp_info_h_title);
    ppp_info_header_container.appendChild(ppp_info_h_close_btn);

    return ppp_info_header_container;
}
function get_ppp_info_main() {
    let ppp_info_main_container = document.createElement("div");
    ppp_info_main_container.classList.add("ppp_info_main_container");

    ppp_info_label_data.forEach(element => {
        let ppp_med_info_container = document.createElement("div");
        ppp_med_info_container.classList.add("ppp_med_info_container");

        let ppp_info_main_title = document.createElement("div");
        ppp_info_main_title.classList.add("ppp_info_main_title");
        ppp_info_main_title.innerHTML = element.title;

        let ppp_info_main_content = document.createElement("div");
        ppp_info_main_content.classList.add(`ppp_info_main_content_${element.name}`);

        ppp_med_info_container.appendChild(ppp_info_main_title);
        ppp_med_info_container.appendChild(ppp_info_main_content);

        ppp_info_main_container.appendChild(ppp_med_info_container);
    });

    return ppp_info_main_container;
}
function get_ppp_info_footer() {
    let ppp_info_footer_container = document.createElement("div");
    ppp_info_footer_container.classList.add("ppp_info_footer_container");

    return ppp_info_footer_container;
}
function popup_prescription_info_div_close() {
    popup_prescription_info_div.Set_Visible(false);
}
async function popup_prescription_info_div_open() {
    popup_prescription_info_div.Set_Visible(true);
}
async function set_ppp_info_func(element, item_price) { 
    console.log(element);
    console.log(item_price);
    ppp_info_label_data.forEach(item => {
        let temp_div = document.querySelector(`.ppp_info_main_content_${item.name}`);
        if(element == "") {
            temp_div.innerHTML = "無資料";
        } else {
            if(item.name == "HealthInsurancePrice") {
                temp_div.innerHTML = item_price[`${item.name}`];
            } else if(item.name == "SalePrice") {
                temp_div.innerHTML = item_price[`${item.name}`];
            } else {
                temp_div.innerHTML = element[`${item.name}`];
            }

        }
    });
}
