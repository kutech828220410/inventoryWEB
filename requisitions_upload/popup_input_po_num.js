function trigger_popup_input_po_num(boolean) {
    let popup_input_po_num_div = document.querySelector(".popup_input_po_num_div");
    let body = document.querySelector("body");

    if(boolean) {
        popup_input_po_num_div.style.display = "block";
        popup_input_po_num_div.style.visibility = "visible";

        body.style.overflowY = "hidden";
    } else {
        popup_input_po_num_div.style.display = "none";
        popup_input_po_num_div.style.visibility = "hidden";

        body.style.overflowY = "auto";
        init_popup_input_po_num();
    }
}

async function set_popup_input_po_num(guid) {
    let ppipn_main_img = document.querySelector(".ppipn_main_img");
}

function init_popup_input_po_num() {
    let ppipn_main_img = document.querySelector(".ppipn_main_img");
    let ppipn_main_input = document.querySelector(".ppipn_main_input");
 
    ppipn_main_img.src = "";
    ppipn_main_input.value = "";
}