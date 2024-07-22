let popup_bed_list_div;
let fake_bed_list_data = {
    cart_name: "C069",
    bed_list: [
        {
            name: "C069-1",
            status: false,
        },
        {
            name: "C069-1",
            status: false,
        },
        {
            name: "C069-1",
            status: true,
        },
        {
            name: "C069-1",
            status: true,
        },
        {
            name: "C069-1",
            status: false,
        },
        {
            name: "C069-1",
            status: true,
        },
        {
            name: "C069-1",
            status: true,
        },
        {
            name: "C069-1",
            status: true,
        },
        {
            name: "C069-1",
            status: true,
        },
        {
            name: "C069-1",
            status: false,
        },
        {
            name: "C069-1",
            status: true,
        },
        {
            name: "C069-1",
            status: true,
        },
        {
            name: "C069-1",
            status: true,
        },
        {
            name: "C069-1",
            status: false,
        },
        {
            name: "C069-1",
            status: false,
        },
        {
            name: "C069-1",
            status: true,
        },
        {
            name: "C069-1",
            status: false,
        },
        {
            name: "C069-1",
            status: true,
        },
        {
            name: "C069-1",
            status: true,
        },
        {
            name: "C069-1",
            status: false,
        }
    ]
}

function get_popup_bed_list() {
    popup_bed_list_div = new Basic_popup_Div('popup_bed_list_div','popup_bed_list_div','','');
    popup_bed_list_div._popup_div.style.border = '10px solid white';

    let header = get_pp_bed_list_header();
    let main = get_pp_bed_list_main();
    let footer = get_pp_bed_list_footer();

    popup_bed_list_div.AddControl(header);
    popup_bed_list_div.AddControl(main);
    popup_bed_list_div.AddControl(footer);

    return popup_bed_list_div;
};
function get_pp_bed_list_header() {
    let ppbl_header_container = document.createElement("div");
    ppbl_header_container.classList.add("ppbl_header_container");

    let ppbl_h_title = document.createElement("div");
    ppbl_h_title.classList.add("ppbl_h_title");
    ppbl_h_title.innerHTML = `<span class="ppbl_h_title_span"></span>病床清單`;

    let ppbl_h_close_btn = document.createElement("img");
    ppbl_h_close_btn.classList.add("ppbl_h_close_btn");
    ppbl_h_close_btn.src = "../image/close.png";
    ppbl_h_close_btn.addEventListener("click", () => {
        popup_bed_list_div_close();
    });

    ppbl_header_container.appendChild(ppbl_h_title);
    ppbl_header_container.appendChild(ppbl_h_close_btn);
    // ppbl_header_container.appendChild(ppbl_h_cart_name);

    return ppbl_header_container;
}
function get_pp_bed_list_main() {
    let ppbl_main_container = document.createElement("div");
    ppbl_main_container.classList.add("ppbl_main_container");

    return ppbl_main_container;
}
function get_pp_bed_list_footer() {
    let ppbl_footer_container = document.createElement("div");
    ppbl_footer_container.classList.add("ppbl_footer_container");

    return ppbl_footer_container;
}
function popup_bed_list_div_close() {
    popup_bed_list_div.Set_Visible(false);
}
function popup_bed_list_div_open() {
    popup_bed_list_div.Set_Visible(true);
}

function set_pp_bed_list_info() {
    let ppbl_main_container = document.querySelector(".ppbl_main_container");
    ppbl_main_container.innerHTML = "";

    let ppbl_h_title_span = document.querySelector(".ppbl_h_title_span");
    ppbl_h_title_span.innerHTML = fake_bed_list_data.cart_name;

    fake_bed_list_data["bed_list"].forEach((element, index) => {
        let pp_bed_card = document.createElement("div");
        pp_bed_card.classList.add("pp_bed_card");
        if(index == patient_bed_index) pp_bed_card.classList.add("pp_current_bed");
        if(index == last_patient_bed_index) pp_bed_card.classList.add("pp_last_selected_bed");
        if(element.status) pp_bed_card.classList.add("pp_done_bed");

        pp_bed_card.innerHTML = element.name;

        pp_bed_card.addEventListener("click", () => {
            if(index == patient_bed_index) return;

            last_patient_bed_index = patient_bed_index;
            patient_bed_index = index;

            popup_bed_list_div_close();
        });

        ppbl_main_container.appendChild(pp_bed_card);
    });
}