let popup_add_div;
let search_data = [
    {
        name: "藥碼",
        value: "CODE",
        type: "text",
        maxLength: 16,
        element: "input"
    },
    {
        name: "效期",
        value: "VAL",
        type: "date",
        element: "input"
    },
    {
        name: "批號",
        value: "LOT",
        type: "text",
        maxLength: 40,
        element: "input"
    },
    {
        name: "收支原因",
        value: "RSN",
        type: "text",
        maxLength: 40,
        element: "input"
    },
    {
        name: "庫別",
        value: "STORE_NAME",
        element: "select"
    },
    {
        name: "數量",
        value: "QTY",
        type: "text",
        maxLength: 40,
        element: "input"
    }
]

async function get_popup_add()
{
    popup_add_div = new Basic_popup_Div('popup_add_div','popup_add_div','','');
    popup_add_div._popup_div.style.border = '10px solid white';

    let header = get_ppadd_header();
    let main = await get_ppadd_main();
    let footer = get_ppadd_footer();

    popup_add_div.AddControl(header);
    popup_add_div.AddControl(main);
    popup_add_div.AddControl(footer);

    return popup_add_div;
};
function get_ppadd_header() {
    let ppadd_header_container = document.createElement("div");
    ppadd_header_container.classList.add("ppadd_header_container");

    let ppadd_h_title = document.createElement("div");
    ppadd_h_title.classList.add("ppadd_h_title");
    ppadd_h_title.innerText = "新增入庫品項";

    let ppadd_h_close_btn = document.createElement("img");
    ppadd_h_close_btn.classList.add("ppadd_h_close_btn");
    ppadd_h_close_btn.src = "../image/close.png";
    ppadd_h_close_btn.addEventListener("click", () => {
        popup_add_div_close();
    });

    ppadd_header_container.appendChild(ppadd_h_title);
    ppadd_header_container.appendChild(ppadd_h_close_btn);

    return ppadd_header_container;
}
async function get_ppadd_main() {
    let ppadd_main_container = document.createElement("div");
    ppadd_main_container.classList.add("ppadd_main_container");

    search_data.forEach(async (element) => {
        let temp_div = document.createElement("div");
        temp_div.classList.add(`ppadd_div`);

        let label = document.createElement("label");
        label.classList.add(`ppadd_label`);
        label.setAttribute("for", `ppadd_${element.value}_input`);
        label.innerHTML = element.name;

        temp_div.appendChild(label);

        if(element.element == "input") {
            let input = document.createElement("input");
            input.id = `ppadd_${element.value}_input`;
            input.classList.add("ppadd_input");
            input.type = element.type;

            if(element.value == "QTY") {
                input.inputMode = "decimal";
                input.pattern = "[0-9]*";
            }

            if(element.type == "date") {
                input.max = "9999/12/31";
            } else if(element.type == "text") {
                input.maxLength = element.maxLength;
            }

            temp_div.appendChild(input);
        }
        if (element.element == "select") {
            let select = document.createElement("select");
            select.classList.add("ppadd_input");
            select.id = `ppadd_${element.value}_input`;

            let phar_table_data = await get_serversetting_by_type();
            phar_table_data = phar_table_data.Data;

            phar_table_data.forEach(item => {
                select.innerHTML += `<option value="${item.name}">${item.name}</option>`;
            });

            temp_div.appendChild(select);
        }

        ppadd_main_container.appendChild(temp_div);
    });

    return ppadd_main_container;
}
function get_ppadd_footer() {
    let ppadd_footer_container = document.createElement("div");
    ppadd_footer_container.classList.add("ppadd_footer_container");

    let ppadd_submit_btn = document.createElement("div");
    ppadd_submit_btn.classList.add('ppadd_submit_btn');
    ppadd_submit_btn.classList.add("btn");
    ppadd_submit_btn.innerHTML = "提交";

    ppadd_submit_btn.addEventListener("click", () => {
        add_batch_import();
    })

    ppadd_footer_container.appendChild(ppadd_submit_btn);

    return ppadd_footer_container;
}
function popup_add_div_close() {
    popup_add_div.Set_Visible(false);
}
function popup_add_div_open() {
    popup_add_div.Set_Visible(true);
}
async function add_batch_import() {
    let ppadd_CODE_input = document.querySelector("#ppadd_CODE_input");
    let ppadd_VAL_input = document.querySelector("#ppadd_VAL_input");
    let ppadd_LOT_input = document.querySelector("#ppadd_LOT_input");
    let ppadd_RSN_input = document.querySelector("#ppadd_RSN_input");
    let ppadd_QTY_input = document.querySelector("#ppadd_QTY_input");
    let ppadd_STORE_NAME_input = document.querySelector("#ppadd_STORE_NAME_input");
    let loggedName = sessionStorage.getItem('loggedName'); 

    let post_data = {
        Data: [
            {
                CODE: "",
                VAL: "",
                LOT: "",
                RSN: "",
                QTY: "",
                STORE_NAME: ""
            }
        ],
        ValueAry : [loggedName]
    };

    if(ppadd_CODE_input.value == "") {
        alert("請填寫藥品碼");
        return;
    }
    if(ppadd_VAL_input.value == "") {
        alert("請填寫效期");
        return;
    }
    if(ppadd_LOT_input.value == "") {
        alert("請填寫批號");
        return;
    }
    if(ppadd_QTY_input.value == "") {
        alert("請填寫數量");
        return;
    }
    if(isNaN(+ppadd_QTY_input.value)) {
        alert("數量格式有誤");
        return;
    }
    
    post_data.Data[0].CODE = ppadd_CODE_input.value;
    post_data.Data[0].VAL = ppadd_VAL_input.value;
    post_data.Data[0].LOT = ppadd_LOT_input.value;
    post_data.Data[0].QTY = ppadd_QTY_input.value;
    post_data.Data[0].RSN = ppadd_RSN_input.value;
    post_data.Data[0].STORE_NAME = ppadd_STORE_NAME_input.value;

    let comfirm_str = `
        藥品碼:${ppadd_CODE_input.value}\n
        效期:${ppadd_VAL_input.value}\n
        批號:${ppadd_LOT_input.value}\n
        收支原因:${ppadd_RSN_input.value}\n
        數量:${ppadd_QTY_input.value}\n
        庫位:${ppadd_STORE_NAME_input.value}\n
    `;

    if(confirm(comfirm_str)) {
        let return_data = await batch_inventory_import_add(post_data);
        if(return_data.Code == 200) {
            batch_data = return_data.Data;
            set_main_batch_list_container();
            alert(return_data.Result);
        } else {
            alert("提交失敗，請聯絡工程師");
        }
    } else {
        return;
    }
}