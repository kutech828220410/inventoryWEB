let popup_excel_down_div;

async function get_popup_excel_down()
{
    popup_excel_down_div = new Basic_popup_Div('popup_excel_down_div','popup_excel_down_div','','');
    popup_excel_down_div._popup_div.style.border = '10px solid white';

    let header = get_pped_header();
    let main = await get_pped_main();
    let footer = get_pped_footer();

    popup_excel_down_div.AddControl(header);
    popup_excel_down_div.AddControl(main);
    popup_excel_down_div.AddControl(footer);

    return popup_excel_down_div;
};
function get_pped_header() {
    let pped_header_container = document.createElement("div");
    pped_header_container.classList.add("pped_header_container");

    let pped_h_title = document.createElement("div");
    pped_h_title.classList.add("pped_h_title");
    pped_h_title.innerText = "下載條件";

    let pped_h_close_btn = document.createElement("img");
    pped_h_close_btn.classList.add("pped_h_close_btn");
    pped_h_close_btn.src = "../image/close.png";
    pped_h_close_btn.addEventListener("click", () => {
        popup_excel_down_div_close();
    });

    pped_header_container.appendChild(pped_h_title);
    pped_header_container.appendChild(pped_h_close_btn);

    return pped_header_container;
}
async function get_pped_main() {
    let pped_main_container = document.createElement("div");
    pped_main_container.classList.add("pped_main_container");
    let today = new Date();

    let data_arr = [
        {
            name: "起始",
            value: "start_time",
            time: `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')} 00:00:00`
        },
        {
            name: "結束",
            value: "end_time",
            time: `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${(today.getDate() + 1).toString().padStart(2, '0')} 00:00:00`
        }
    ];

    data_arr.forEach(element => {
        let pped_time_div = document.createElement("div");
        pped_time_div.classList.add("pped_time_div");

        pped_time_div.innerHTML = `
            <label for="pped_${element.value}">${element.name}</label>
            <input type="datetime-local" id="pped_${element.value}" value="${element.time}">
        `
        pped_main_container.appendChild(pped_time_div);
    });

    return pped_main_container;
}
function get_pped_footer() {
    let pped_footer_container = document.createElement("div");
    pped_footer_container.classList.add("pped_footer_container");

    let pped_footer_submit_btn = document.createElement("div");
    pped_footer_submit_btn.classList.add("btn");
    pped_footer_submit_btn.classList.add("pped_footer_submit_btn");
    pped_footer_submit_btn.innerHTML = "送出";
    pped_footer_submit_btn.addEventListener("click", async () => {
        let pped_start_time = document.querySelector("#pped_start_time");
        let pped_end_time = document.querySelector("#pped_end_time");
        let post_data = {
            Data: {},
            ValueAry: [
                `${pped_start_time.value}:00`,
                `${pped_end_time.value}:00`
            ]
        };
        console.log(post_data);
        download_excel_by_requestTime(post_data);
    });

    pped_footer_container.appendChild(pped_footer_submit_btn);

    return pped_footer_container;
}
function popup_excel_down_div_close() {
    popup_excel_down_div.Set_Visible(false);
}
function popup_excel_down_div_open() {
    popup_excel_down_div.Set_Visible(true);
}