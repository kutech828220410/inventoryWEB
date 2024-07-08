let popup_storage_div;

function get_popup_storage()
{
    popup_storage_div = new Basic_popup_Div('popup_storage_div','popup_storage_div','','');
    popup_storage_div._popup_div.style.border = '10px solid white';

    let header = get_ppstorage_header();
    let main = get_ppstorage_main();
    let footer = get_ppstorage_footer();

    popup_storage_div.AddControl(header);
    popup_storage_div.AddControl(main);
    popup_storage_div.AddControl(footer);

    return popup_storage_div;
};
function get_ppstorage_header() {
    let ppstorage_header_container = document.createElement("div");
    ppstorage_header_container.classList.add("ppstorage_header_container");

    let ppstorage_h_title = document.createElement("div");
    ppstorage_h_title.classList.add("ppstorage_h_title");
    ppstorage_h_title.innerText = "儲位查詢";

    let ppstorage_h_close_btn = document.createElement("img");
    ppstorage_h_close_btn.classList.add("ppstorage_h_close_btn");
    ppstorage_h_close_btn.src = "../image/close.png";
    ppstorage_h_close_btn.addEventListener("click", () => {
        popup_storage_div_close();
    });

    ppstorage_header_container.appendChild(ppstorage_h_title);
    ppstorage_header_container.appendChild(ppstorage_h_close_btn);

    return ppstorage_header_container;
}
function get_ppstorage_main() {
    let ppstorage_main_container = document.createElement("div");
    ppstorage_main_container.classList.add("ppstorage_main_container");

    let storage_info_container = set_storage_info_container();

    ppstorage_main_container.appendChild(storage_info_container);

    return ppstorage_main_container;
}
function get_ppstorage_footer() {
    let ppstorage_footer_container = document.createElement("div");
    ppstorage_footer_container.classList.add("ppstorage_footer_container");

    let ppstorage_light_on_btn = document.createElement("div");
    ppstorage_light_on_btn.classList.add("ppstorage_light_on_btn");
    ppstorage_light_on_btn.classList.add("btn");
    ppstorage_light_on_btn.setAttribute("CODE", "");
    ppstorage_light_on_btn.innerHTML = "亮燈";
    ppstorage_light_on_btn.addEventListener("click", (e) => {
        let code = e.target.getAttribute("CODE");
        console.log(code);
        set_light_off(code);
    });

    let ppstorage_light_off_btn = document.createElement("div");
    ppstorage_light_off_btn.classList.add("ppstorage_light_off_btn");
    ppstorage_light_off_btn.classList.add("btn");
    ppstorage_light_off_btn.innerHTML = "滅燈";
    ppstorage_light_off_btn.addEventListener("click", (e) => {
        let code = e.target.getAttribute("CODE");
        set_light_on(code);
    });

    ppstorage_footer_container.appendChild(ppstorage_light_off_btn);
    ppstorage_footer_container.appendChild(ppstorage_light_on_btn);

    return ppstorage_footer_container;
}
function popup_storage_div_close() {
    popup_storage_div.Set_Visible(false);
}
function popup_storage_div_open() {
    popup_storage_div.Set_Visible(true);
}
function set_storage_info_container() {
    let storage_info_container = document.createElement("div");
    storage_info_container.classList.add("storage_info_container");

    let ppsi_position_div = document.createElement("ppsi_position_div");
    ppsi_position_div.classList.add("ppsi_div");

    let ppsi_position_label = document.createElement("div");
    ppsi_position_label.classList.add("ppsi_label");
    ppsi_position_label.innerHTML = "儲位位置：";
    
    let ppsi_position_content = document.createElement("div");
    ppsi_position_content.classList.add("ppsi_content");
    ppsi_position_content.classList.add("ppsi_position_content");
    ppsi_position_content.innerHTML = "巴拉巴拉巴拉巴拉";

    ppsi_position_div.appendChild(ppsi_position_label);
    ppsi_position_div.appendChild(ppsi_position_content);

    let ppsi_position_desc_div = document.createElement("ppsi_position_desc_div");
    ppsi_position_desc_div.classList.add("ppsi_div");

    let ppsi_med_img = document.createElement("img");
    ppsi_med_img.classList.add("ppsi_med_img");
    ppsi_med_img.alt = "medicine image";

    let ppsi_med_info_div = document.createElement("div");
    ppsi_med_info_div.classList.add("ppsi_div");
    ppsi_med_info_div.innerHTML = `
        <span class="ppsi_code">藥碼：10103</span>
        <span class="ppsi_sdkacode">料號：10103</span>
    `

    let ppsi_med_name_div = document.createElement("div");
    ppsi_med_name_div.classList.add("ppsi_div");
    ppsi_med_name_div.classList.add("ppsi_med_name_div");
    ppsi_med_name_div.innerHTML = "(英)：asdfasdfasd";

    let ppsi_med_cht_name_div = document.createElement("div");
    ppsi_med_cht_name_div.classList.add("ppsi_div");
    ppsi_med_cht_name_div.classList.add("ppsi_med_cht_name_div");
    ppsi_med_cht_name_div.innerHTML = "(中)：afsdfasdfasdfasdf";


    storage_info_container.appendChild(ppsi_position_div);
    storage_info_container.appendChild(ppsi_position_desc_div);
    storage_info_container.appendChild(ppsi_med_img);
    storage_info_container.appendChild(ppsi_med_info_div);
    storage_info_container.appendChild(ppsi_med_name_div);
    storage_info_container.appendChild(ppsi_med_cht_name_div);

    return storage_info_container;
}
// /api/MED_page/get_med_clouds_by_codes
async function set_popup_storage_info(code) {
    let temp_pic_data = await get_med_pic_by_code(code);
    let temp_data = await get_med_clouds_by_codes(code);

    if(temp_data["Data"].length < 1) {
        alert("資料有誤請確認");
        return;
    }
    let med_pic = temp_pic_data.Data;
    let med_data = temp_data.Data[0];
    console.log(med_data);
    console.log(med_pic);

    let ppsi_position_content = document.querySelector(".ppsi_position_content");
    let ppsi_med_img = document.querySelector(".ppsi_med_img");
    let ppsi_code = document.querySelector(".ppsi_code");
    let ppsi_sdkacode = document.querySelector(".ppsi_sdkacode");
    let ppsi_med_name_div = document.querySelector(".ppsi_med_name_div");
    let ppsi_med_cht_name_div = document.querySelector(".ppsi_med_cht_name_div");
    let ppstorage_light_on_btn = document.querySelector(".ppstorage_light_on_btn");
    let ppstorage_light_off_btn = document.querySelector(".ppstorage_light_off_btn");

    ppsi_position_content.innerHTML = `${med_data.STORAGE_NOTE}`;

    if(temp_pic_data.Code == 200) {
        ppsi_med_img.src = `${med_pic.pic_base64}`;
    } else {
        ppsi_med_img.src = ``;
    }

    ppsi_code.innerHTML = `藥碼：${med_data.CODE}`;
    if(med_data.SKDIACODE) {
        ppsi_sdkacode.innerHTML = `料號：${med_data.SKDIACODE}`;
    } else {
        ppsi_sdkacode.innerHTML = `料號：無`;
    }
    ppsi_med_name_div.innerHTML = `(英)：${med_data.NAME}`;
    ppsi_med_cht_name_div.innerHTML = `(中)：${med_data.CHT_NAME}`;

    ppstorage_light_on_btn.setAttribute("CODE", code);
    ppstorage_light_off_btn.setAttribute("CODE", code);

    popup_storage_div_open();
}

async function get_med_clouds_by_codes(code) {
    let start_p = performance.now();
    let data = {
        Data: {},
        ValueAry: [code]
    };
    console.log("進入api取得資料");
    console.log(`${api_ip}api/MED_page/get_med_clouds_by_codes`);
    let temp_data = await fetch(`${api_ip}api/MED_page/get_med_clouds_by_codes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((response) => {
        console.log("取得資料ＪＳＯＮ格式");
        // console.log(response.json());
        return response.json();
    });
    let end_p = performance.now();
    console.log(end_p - start_p);

    console.log(temp_data);

    return temp_data;
}

async function set_light_on(code) {
    if(!code) {
        console.log("找不到藥碼");
        return;
    }

    let data_str = code;

    // "10103,0,255,0,60"
    data_str += ",0,255,0";

    data_str += `,60`;

    console.log({
        "Data": {},
        "Value": data_str,
        "TableName": "",
        "ServerName": "DS01",
        "ServerType": "藥庫",
        "TimeTaken": ""
    });
    
    await fetch(`${api_ip}api/OutTakeMed/light_on`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
                "Data": {},
                "Value": data_str,
                "TableName": "",
                "ServerName": "DS01",
                "ServerType": "藥庫",
                "TimeTaken": ""
          }),
      }).catch(e => {
        console.log(e);
      }).then(res => {
        return res.json()
      }).then(res => {
        console.log(res);
    });
}
async function set_light_off(code) {
    if(!code) {
        console.log("找不到藥碼");
        return;
    }

    let data_str = code;
    // 加入黑色燈條件滅燈
    data_str += `,0,0,0,0`;

    await fetch(`${api_ip}api/OutTakeMed/light_on`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
                "Data": {},
                "Value": data_str,
                "TableName": "",
                "ServerName": "DS01",
                "ServerType": "藥庫",
                "TimeTaken": ""
            }),
        }).catch(e => {
        console.log(e);
        }).then(res => {
        return res.json()
        }).then(res => {
        console.log(res);
    });
}
async function get_med_pic_by_code(code) {
    let start_p = performance.now();
    let data = {
        "Data": {},
        "ValueAry" : [code]
    };
    console.log("進入api取得資料");
    console.log(`${api_ip}api/medPic/get_by_code`);
    let temp_data = await fetch(`${api_ip}api/medPic/get_by_code`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((response) => {
        console.log("取得資料ＪＳＯＮ格式");
        // console.log(response.json());
        return response.json();
    });
    let end_p = performance.now();
    console.log(end_p - start_p);

    console.log(temp_data);

    return temp_data;
}