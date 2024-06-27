let popup_result_confirm_div;


async function get_popup_result_confirm()
{
    popup_result_confirm_div = new Basic_popup_Div('popup_result_confirm_div','popup_result_confirm_div','','');
    popup_result_confirm_div._popup_div.style.border = '10px solid white';

    let header = get_prc_header();
    let main = get_prc_main();
    let footer = get_prc_footer();

    popup_result_confirm_div.AddControl(header);
    popup_result_confirm_div.AddControl(main);
    popup_result_confirm_div.AddControl(footer);

    return popup_result_confirm_div;
};

function get_prc_header()
{
    let prc_header_container = document.createElement("div");
    prc_header_container.classList.add("prc_header_container");

    let prc_h_title = document.createElement("div");
    prc_h_title.classList.add("prc_h_title");
    prc_h_title.innerText = "辨識結果";

    let prc_h_close_btn = document.createElement("img");
    prc_h_close_btn.classList.add("prc_h_close_btn");
    prc_h_close_btn.src = "../image/close.png";
    prc_h_close_btn.addEventListener("click", () => {
        popup_result_confirm_div_close();
    });

    prc_header_container.appendChild(prc_h_title);
    prc_header_container.appendChild(prc_h_close_btn);

    return prc_header_container;
};

function get_prc_main()
{
    let prc_main_container = document.createElement("div");
    prc_main_container.classList.add("prc_main_container");

    return prc_main_container;
};
function get_prc_footer()
{
    let prc_footer_container = document.createElement("div");
    prc_footer_container.classList.add("prc_footer_container");

    let prc_double_confirm_btn = document.createElement("div");
    prc_double_confirm_btn.classList.add("prc_double_confirm_btn");
    prc_double_confirm_btn.classList.add("btn");
    prc_double_confirm_btn.innerHTML = "確認";
    prc_double_confirm_btn.addEventListener("click", () => {
        if(confirm("確認辨識結果並送出")) {
            console.log("這裡塞二次確認api");
        } else {
            return;
        }
    });

    prc_footer_container.appendChild(prc_double_confirm_btn);

    return prc_footer_container;
};

function popup_result_confirm_div_close() {
    popup_result_confirm_div.Set_Visible(false);
}

function popup_result_confirm_div_open() {
    popup_result_confirm_div.Set_Visible(true);
}
