let popup_pharmacy_select_div;
let pharmacy_table_data = [
    {
        serverName:'藥局一',
        serverType:'pharmacy_1',
        serverTable:[
            {
                serverName:'調劑台A1',
                serverType:'table_A1',
                checked:true
            },
            {
                serverName:'調劑台A2',
                serverType:'table_A2',
                checked:true
            }, 
            {
                serverName:'調劑台A3',
                serverType:'table_A3',
                checked:true
            },
            {
                serverName:'調劑台A4',
                serverType:'table_A4',
                checked:true
            },
            {
                serverName:'調劑台A5',
                serverType:'table_A5',
                checked:true
            },
            {
                serverName:'調劑台A6',
                serverType:'table_A6',
                checked:true
            },
            {
                serverName:'調劑台A7',
                serverType:'table_A7',
                checked:true
            },
            {
                serverName:'調劑台A8',
                serverType:'table_A8',
                checked:true
            },
        ],
        checked:true
    },
    {
        serverName:'急診中藥藥局',
        serverType:'pharmacy_2',
        serverTable:[
            {
                serverName:'調劑台B1',
                serverType:'table_B1',
                checked:true
            },
            {
                serverName:'調劑台B2',
                serverType:'table_B2',
                checked:true
            }, 
            {
                serverName:'調劑台B3',
                serverType:'table_B3',
                checked:true
            },
            {
                serverName:'調劑台B4',
                serverType:'table_B4',
                checked:true
            },
        ],
        checked:true
    },
    {
        serverName:'藥局三',
        serverType:'pharmacy_3',
        serverTable:[
            {
                serverName:'調劑台C1',
                serverType:'table_C1',
                checked:true
            },
            {
                serverName:'調劑台C2',
                serverType:'table_C2',
                checked:true
            }, 
            {
                serverName:'調劑台C3',
                serverType:'table_C3',
                checked:true
            },
            {
                serverName:'調劑台C4',
                serverType:'table_C4',
                checked:true
            },
        ],
        checked:true
    },
    {
        serverName:'藥局四',
        serverType:'pharmacy_4',
        serverTable:[
            {
                serverName:'調劑台D1',
                serverType:'table_D1',
                checked:true
            },
            {
                serverName:'調劑台D2',
                serverType:'table_D2',
                checked:true
            }, 
            {
                serverName:'調劑台D3',
                serverType:'table_D3',
                checked:true
            },
            {
                serverName:'調劑台D4',
                serverType:'table_D4',
                checked:true
            },
        ],
        checked:true
    },
];

var temp_selected_arr;

function get_popup_pharmacy_select()
{
    popup_pharmacy_select_div = new Basic_popup_Div('popup_pharmacy_select_div','popup_pharmacy_select_div','','');
    popup_pharmacy_select_div._popup_div.style.border = '10px solid white';

    let header = get_pps_header();
    let main = get_pps_main();
    let footer = get_pps_footer();

    popup_pharmacy_select_div.AddControl(header);
    popup_pharmacy_select_div.AddControl(main);
    popup_pharmacy_select_div.AddControl(footer);

    return popup_pharmacy_select_div;
};

function get_pps_header()
{
    let pps_header_container = document.createElement("div");
    pps_header_container.classList.add("pps_header_container");
    pps_header_container.innerText = "請選選擇調劑台";

    return pps_header_container;
};

function get_pps_main()
{
    let pps_main_container = document.createElement("div");
    pps_main_container.classList.add("pps_main_container");

    pharmacy_table_data.forEach((item) => {
        pps_main_container.appendChild(get_pps_card(item));
    });

    return pps_main_container;
};
function get_pps_footer()
{
    let pps_footer_container = document.createElement("div");
    pps_footer_container.classList.add("pps_footer_container");

    let pps_f_confirm_btn = document.createElement("div");
    pps_f_confirm_btn.classList.add('pps_f_confirm_btn');
    pps_f_confirm_btn.innerText = '確認';
    pps_f_confirm_btn.addEventListener("click", () => {
        temp_selected_arr = [];
        temp_selected_arr = checked_pharmacy_arr();
        console.log(temp_selected_arr);
        if(temp_selected_arr.length == 0) {
            alert('至少選擇一個調劑台！！');
            return;
        } else {
            popup_pharmacy_select_div_close();
            get_select_block_func(temp_selected_arr);
        }
    });
    
    let pps_f_close_btn = document.createElement("div");
    pps_f_close_btn.classList.add('pps_f_close_btn');
    pps_f_close_btn.innerText = '關閉';
    pps_f_close_btn.addEventListener("click",() => {
        popup_pharmacy_select_div_close();
    });

    pps_footer_container.appendChild(pps_f_confirm_btn);
    // pps_footer_container.appendChild(pps_f_close_btn);

    return pps_footer_container;
};

function get_pps_card(item) {
    let set_all_select = true;
    let pps_card_container = document.createElement("div");
    pps_card_container.classList.add('pps_card_container');
    pps_card_container.setAttribute("serverType", item.serverType);

    let pps_card_title = document.createElement("div");
    pps_card_title.classList.add("pps_card_title");
    pps_card_title.innerHTML = item.serverName;

    let pps_card_checkbox_container = document.createElement("div");
    pps_card_checkbox_container.classList.add('pps_card_checkbox_container');

    item["serverTable"].forEach((element) => {
        let pps_checkbox_div = document.createElement("div");
        pps_checkbox_div.classList.add('pps_checkbox_div');

        let pps_checkbox_label = document.createElement("label");
        pps_checkbox_label.classList.add('pps_checkbox_label');
        pps_checkbox_label.setAttribute('for', element.serverType);
        pps_checkbox_label.innerHTML = element.serverName;

        let pps_checkbox_input = document.createElement('input');
        pps_checkbox_input.type = "checkbox";
        pps_checkbox_input.id = element.serverType;
        pps_checkbox_input.name = element.serverType;
        pps_checkbox_input.checked = element.checked;

        pps_checkbox_div.appendChild(pps_checkbox_input);
        pps_checkbox_div.appendChild(pps_checkbox_label);

        pps_card_checkbox_container.appendChild(pps_checkbox_div);
    });

    pps_card_title.addEventListener('click',() => {
        set_all_select = !set_all_select;
        if(set_all_select) {
            item["serverTable"].forEach((e) => {
                let temp_input = document.querySelector(`#${e.serverType}`);
                temp_input.checked = true;
            });
        } else {
            item["serverTable"].forEach((e) => {
                let temp_input = document.querySelector(`#${e.serverType}`);
                temp_input.checked = false;
            });
        }
    });

    pps_card_container.appendChild(pps_card_title);
    pps_card_container.appendChild(pps_card_checkbox_container);
    
    return pps_card_container
}

function popup_pharmacy_select_div_close() {
    popup_pharmacy_select_div.Set_Visible(false);
}

function popup_pharmacy_select_div_open() {
    popup_pharmacy_select_div.Set_Visible(true);
}
function checked_pharmacy_arr() {
    let temp_arr = [];
    pharmacy_table_data.forEach(e => {
        e["serverTable"].forEach(element => {
            let temp_input = document.querySelector(`#${element.serverType}`);
            if(temp_input.checked) {
                let temp_data = {};
                temp_data.serverName = element.serverName;
                temp_data.serverType = element.serverType;
                temp_arr.push(temp_data);
            }
        });
    });

    return temp_arr;
} 