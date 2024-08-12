let popup_med_list_div;
let fake_med_list_data = {
    cart_name: "C069",
    med_list: [
        {
            code: "IPET",
            name: "管2※ Pethidine inj. 50mg/ml 1ml",
            cht_name: "鹽酸配西汀注射液",
            unit: "VIAL",
            bed_list: [
                {
                    bed_name: "C069-1",
                    qty: 1,
                    status: false
                },
                {
                    bed_name: "C069-1",
                    qty: 1,
                    status: true
                },
                {
                    bed_name: "C069-1",
                    qty: 2,
                    status: true
                },
                {
                    bed_name: "C069-1",
                    qty: 1,
                    status: false
                },
            ],
        },
        {
            code: "IPET1",
            name: "管2※ Pethidine inj. 50mg/ml 1ml",
            cht_name: "鹽酸配西汀注射液",
            unit: "VIAL",
            bed_list: [
                {
                    bed_name: "C069-1",
                    qty: 1,
                    status: false
                },
                {
                    bed_name: "C069-1",
                    qty: 1,
                    status: false
                },
                {
                    bed_name: "C069-1",
                    qty: 1,
                    status: true
                },
                {
                    bed_name: "C069-1",
                    qty: 1,
                    status: false
                },
            ],
        },
        {
            code: "IPET2",
            name: "管2※ Pethidine inj. 50mg/ml 1ml",
            cht_name: "鹽酸配西汀注射液",
            unit: "VIAL",
            bed_list: [
                {
                    bed_name: "C069-1",
                    qty: 1,
                    status: false
                },
                {
                    bed_name: "C069-1",
                    qty: 1,
                    status: false
                },
                {
                    bed_name: "C069-1",
                    qty: 1,
                    status: true
                },
                {
                    bed_name: "C069-1",
                    qty: 1,
                    status: false
                },
            ],
        },
        {
            code: "IPET3",
            name: "管2※ Pethidine inj. 50mg/ml 1ml",
            cht_name: "鹽酸配西汀注射液",
            unit: "VIAL",
            bed_list: [
                {
                    bed_name: "C069-1",
                    qty: 1,
                    status: false
                },
                {
                    bed_name: "C069-1",
                    qty: 1,
                    status: false
                },
                {
                    bed_name: "C069-1",
                    qty: 1,
                    status: true
                },
                {
                    bed_name: "C069-1",
                    qty: 1,
                    status: false
                },
            ],
        },
    ]
};

function get_popup_med_list() {
    popup_med_list_div = new Basic_popup_Div('popup_med_list_div','popup_med_list_div','','');
    popup_med_list_div._popup_div.style.border = '10px solid white';

    let header = get_pp_med_list_header();
    let main = get_pp_med_list_main();
    let footer = get_pp_med_list_footer();

    popup_med_list_div.AddControl(header);
    popup_med_list_div.AddControl(main);
    popup_med_list_div.AddControl(footer);

    return popup_med_list_div;
};
function get_pp_med_list_header() {
    let ppml_header_container = document.createElement("div");
    ppml_header_container.classList.add("ppml_header_container");

    let ppml_h_title = document.createElement("div");
    ppml_h_title.classList.add("ppml_h_title");
    ppml_h_title.innerHTML = `<span class="ppml_h_title_span"></span>藥品總量`;

    let ppml_search_btn = document.createElement("div");
    ppml_search_btn.classList.add("ppml_search_btn");
    ppml_search_btn.classList.add("btn");
    ppml_search_btn.innerHTML = `搜尋`;
    ppml_search_btn.addEventListener("click", () => {
        popup_med_list_search_div_open();
    });

    let ppml_h_close_btn = document.createElement("img");
    ppml_h_close_btn.classList.add("ppml_h_close_btn");
    ppml_h_close_btn.src = "../image/close.png";
    ppml_h_close_btn.addEventListener("click", () => {
        popup_med_list_div_close();
    });

    ppml_header_container.appendChild(ppml_h_title);
    ppml_header_container.appendChild(ppml_h_close_btn);
    ppml_header_container.appendChild(ppml_search_btn);

    return ppml_header_container;
}
function get_pp_med_list_main() {
    let ppml_main_container = document.createElement("div");
    ppml_main_container.classList.add("ppml_main_container");

    return ppml_main_container;
}
function get_pp_med_list_footer() {
    let ppml_footer_container = document.createElement("div");
    ppml_footer_container.classList.add("ppml_footer_container");

    return ppml_footer_container;
}
function popup_med_list_div_close() {
    popup_med_list_div.Set_Visible(false);
}
function popup_med_list_div_open() {
    popup_med_list_div.Set_Visible(true);
}

function set_pp_med_list_display() {
    let ppml_main_container = document.querySelector(".ppml_main_container");
    ppml_main_container.innerHTML = "";

    let ppml_h_title_span = document.querySelector(".ppml_h_title_span");
    ppml_h_title_span.innerHTML = fake_med_list_data.cart_name;

    fake_med_list_data["med_list"].forEach(element => {
        let ppml_card_container = document.createElement("div");
        ppml_card_container.classList.add("ppml_card_container");
        ppml_card_container.setAttribute("code", element.code);
        ppml_card_container.setAttribute("name", element.name);
        ppml_card_container.setAttribute("cht_name", element.cht_name);
        ppml_card_container.setAttribute("skdiacode", element.SKDIACODE);

        let ppml_card_info_container = document.createElement("div");
        ppml_card_info_container.classList.add("ppml_card_info_container");

        let ppml_ci_1_div = document.createElement("div");
        ppml_ci_1_div.classList.add("ppml_ci_1_div");
        ppml_ci_1_div.innerHTML = `
            <div class="ppml_ci_content">藥碼：${element.code}</div>
            <div class="ppml_ci_content">(英)：${element.name}</div>
            <div class="ppml_ci_content">(中)：${element.cht_name}</div>
        `;

        let ppml_ci_2_div = document.createElement("div");
        ppml_ci_2_div.classList.add("ppml_ci_2_div");
        ppml_ci_2_div.innerHTML = `
            <div class="ppml_ci_content">已調配 / 總量</div>
            <div class="ppml_ci_qty">10 / 50</div>
        `;

        let ppml_ci_3_div = document.createElement("div");
        ppml_ci_3_div.classList.add("ppml_ci_3_div");
        ppml_ci_3_div.innerHTML = `
        <div class="ppml_ci_content">單位</div>
        <div class="ppml_ci_qty">${element.unit}</div>
        `;

        let ppml_light_btn_container = document.createElement("div");
        ppml_light_btn_container.classList.add("ppml_light_btn_container");

        let ppml_light_on_btn = document.createElement("div");
        ppml_light_on_btn.classList.add("ppml_light_on_btn");
        ppml_light_on_btn.classList.add("btn");
        ppml_light_on_btn.setAttribute("code", element.code);
        ppml_light_on_btn.innerHTML = "亮燈";
        ppml_light_on_btn.addEventListener("click", () => {
            set_light_table(element.code, element.name, element.cht_name);
            popup_light_table_select_div_open();
        })

        ppml_light_btn_container.appendChild(ppml_light_on_btn)

        ppml_card_info_container.appendChild(ppml_ci_1_div);
        ppml_card_info_container.appendChild(ppml_ci_2_div);
        ppml_card_info_container.appendChild(ppml_ci_3_div);
        ppml_card_info_container.appendChild(ppml_light_btn_container);

        let ppml_hr = document.createElement("div");
        ppml_hr.classList.add("ppml_hr");

        let ppml_bed_list_container = document.createElement("div");
        ppml_bed_list_container.classList.add("ppml_bed_list_container");

        let total_qty = 0;
        let done_qty = 0;

        element["bed_list"].forEach(item => {
            let ppml_bed_card = document.createElement("div");
            ppml_bed_card.classList.add("ppml_bed_card");
            ppml_bed_card.innerHTML = item.bed_name;
            total_qty += item.qty;

            if(item.status) {
                ppml_bed_card.classList.add("ppml_bed_done");
                done_qty += item.qty;
            }

            ppml_bed_list_container.appendChild(ppml_bed_card);
        });

        ppml_ci_2_div.innerHTML = `
            <div class="ppml_ci_content">已調配 / 總量</div>
            <div class="ppml_ci_qty">${done_qty} / ${total_qty}</div>
        `;

        ppml_card_container.appendChild(ppml_card_info_container);
        ppml_card_container.appendChild(ppml_hr);
        ppml_card_container.appendChild(ppml_bed_list_container);

        ppml_main_container.appendChild(ppml_card_container);
    });
}
