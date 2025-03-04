let popup_similar_drugs_div;
// let ppsd_label_data = [
//     {
//         name: "name",
//         title: "藥品名"
//     },
//     {
//         name: "price",
//         title: "健保價"
//     },
//     {
//         name: "cost",
//         title: "售價"
//     },
//     {
//         name: "freqn",
//         title: "頻次代號"
//     },
//     {
//         name: "dosage",
//         title: "劑量"
//     },
// ];
let ppsd_label_data = [
    {
        name: "NAME",
        title: "藥品名"
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
        name: "SUGGESTED_FREQUENCY",
        title: "頻次代號"
    },
    {
        name: "SUGGESTED_DOSE",
        title: "劑量"
    },
];

function get_popup_similar_drugs() {
    popup_similar_drugs_div = new Basic_popup_Div('popup_similar_drugs_div','popup_similar_drugs_div','','');
    popup_similar_drugs_div._popup_div.style.border = '10px solid white';

    let header = get_ppsd_header();
    let main = get_ppsd_main();
    let footer = get_ppsd_footer();

    popup_similar_drugs_div.AddControl(header);
    popup_similar_drugs_div.AddControl(main);
    popup_similar_drugs_div.AddControl(footer);

    return popup_similar_drugs_div;
};
function get_ppsd_header() {
    let ppsd_header_container = document.createElement("div");
    ppsd_header_container.classList.add("ppsd_header_container");

    let ppsd_h_title = document.createElement("div");
    ppsd_h_title.classList.add("ppsd_h_title");
    ppsd_h_title.innerHTML = `<span class="ppsd_h_title_span">同類藥</span>`;

    let ppsd_h_close_btn = document.createElement("img");
    ppsd_h_close_btn.classList.add("ppsd_h_close_btn");
    ppsd_h_close_btn.src = "../image/close.png";
    ppsd_h_close_btn.addEventListener("click", () => {
        popup_similar_drugs_div_close();
    });

    ppsd_header_container.appendChild(ppsd_h_title);
    ppsd_header_container.appendChild(ppsd_h_close_btn);

    return ppsd_header_container;
}
function get_ppsd_main() {
    let ppsd_main_container = document.createElement("div");
    ppsd_main_container.classList.add("ppsd_main_container");

    ppsd_label_data.forEach(element => {
        let ppp_med_info_container = document.createElement("div");
        ppp_med_info_container.classList.add("ppp_med_info_container");

        let ppsd_main_title = document.createElement("div");
        ppsd_main_title.classList.add("ppsd_main_title");
        ppsd_main_title.innerHTML = element.title;

        let ppsd_main_content = document.createElement("div");
        ppsd_main_content.classList.add(`ppsd_main_content_${element.name}`);

        ppp_med_info_container.appendChild(ppsd_main_title);
        ppp_med_info_container.appendChild(ppsd_main_content);

        ppsd_main_container.appendChild(ppp_med_info_container);
    });

    return ppsd_main_container;
}
function get_ppsd_footer() {
    let ppsd_footer_container = document.createElement("div");
    ppsd_footer_container.classList.add("ppsd_footer_container");

    return ppsd_footer_container;
}
function popup_similar_drugs_div_close() {
    popup_similar_drugs_div.Set_Visible(false);
}
async function popup_similar_drugs_div_open() {
    popup_similar_drugs_div.Set_Visible(true);
}
async function set_ppsd_func(element, params) {
    let temp_info = element
    if(params == "" || params == undefined) {
        
    } else {
        Object.assign(temp_info, params);
    }
    console.log(element);
    ppsd_label_data.forEach(item => {
        let temp_div = document.querySelector(`.ppsd_main_content_${item.name}`);
        if(element == "" || element == undefined) {
            temp_div.innerHTML = "無資料";
        } else {
            temp_div.innerHTML = element[`${item.name}`];
        }
    });
}
