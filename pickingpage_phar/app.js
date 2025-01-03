window.onload = load;
let select_rgb = {
    "black" : [0, 0, 0],
    "red" : [40,40,255],
    "green" : [40, 255, 40],
    "yellow" : [40, 255, 255],
    "blue" : [255, 40, 40]
}
let last_light_med = "";
let temp_table_arr;
async function load()
{
    const Loadingpopup = GetLoadingpopup();
    document.body.appendChild(Loadingpopup);

    const serverName ="";
    const serverType = "網頁";
    APIServer = await LoadAPIServer();
    const API01 = serch_APIServer(serverName,serverType,"API01");
    const API02 = serch_APIServer(serverName,serverType,"API02");
    console.log("API01",API01);
    console.log("API02",API02);
    await check_ip(API01[0].server,API02[0].server);
    console.log("inventory_url",inventory_url);
    let medicine_page = await get_medicine_cloud();
    var temp_group_all_data = {}
    medicine_page["Data"].forEach(element => {
        temp_group_all_data[element.CODE] = element
    });
    console.log(temp_group_all_data);

    await page_check_permissions("pickingpage");

    var loggedID = sessionStorage.getItem('loggedID');  
    var loggedName = sessionStorage.getItem('loggedName');  
    const test_user_data = {
      id: loggedID,
      name: loggedName,
    }

    nav_bar_create("pickingpage", test_user_data);

    temp_table_arr = await get_serversetting_by_type();
    temp_table_arr = temp_table_arr.Data;
    console.log("temp", temp_table_arr);

    await mainDiplay(temp_group_all_data, medicine_page);
}

async function mainDiplay(med_data, medicine_page) {
    const main = document.querySelector(".main");

    const pk_title = document.createElement("div");
    pk_title.innerHTML="藥品指引";
    pk_title.classList.add('pk_title');

    const radio_container = document.createElement("div");
    radio_container.classList.add('radio_container');
    radio_container.innerHTML = `
        <label for="green">
            <input type="radio" name="color" id="green" value="green" checked>
            綠色
        </label>
        <label for="red">
            <input type="radio" name="color" id="red" value="red">
            紅色
        </label>
        <label for="yellow">
            <input type="radio" name="color" id="yellow" value="yellow">
            黃色
        </label>
        <label for="blue">
            <input type="radio" name="color" id="blue" value="blue">
            藍色
        </label>
        <label for="none">
            <input type="radio" name="color" id="black" value="black">
            不亮燈
        </label>
    `;

    const pp_barcode_input = document.createElement('input');
    pp_barcode_input.classList.add('pp_barcode_input');
    pp_barcode_input.placeholder = "請輸入藥碼、藥名或掃描國際條碼";

    const display_med_img_container = document.createElement("div");
    display_med_img_container.classList.add("display_med_img_container");

    const display_med_img = document.createElement("img");
    display_med_img.classList.add("display_med_img");

    display_med_img_container.appendChild(display_med_img);

    const med_input_display_container = document.createElement("div");
    med_input_display_container.classList.add("med_input_display_container");
    med_input_display_container.innerHTML = `        
        <div class="med_display_code">藥碼 : 
            <span class="code_span"></span>
        </div>
        <div class="med_display_engname">英文名 : 
            <span class="engname_span"></span>
        </div>
        <div class="med_display_ctname">中文名 : 
            <span class="ctname_span"></span>
        </div>
        <div class="med_display_storage_location">儲位位置 : 
            <span class="storage_location"></span>
        </div>
    `;

    const pick_light_all_off_btn = document.createElement("div");
    pick_light_all_off_btn.classList.add("pick_light_all_off_btn");
    pick_light_all_off_btn.innerHTML = "全部滅燈";

    const picking_list_container = document.createElement("div");
    picking_list_container.classList.add("picking_list_container");

    // const picking_list_select = document.createElement("select");
    // picking_list_select.classList.add('picking_list_select')
    // picking_list_select.innerHTML += `<option value="">請選擇揀貨單</option>`;

    // picking_list_container.appendChild(picking_list_select);

    let table_select = document.createElement("select");
    table_select.classList.add("table_select");
    temp_table_arr.forEach(element => {
        table_select.innerHTML += `<option value="${element.name}">${element.name}</option>`
    });


    main.appendChild(pk_title);
    main.appendChild(radio_container);
    main.appendChild(pp_barcode_input);
    main.appendChild(table_select);
    main.appendChild(display_med_img_container);
    main.appendChild(med_input_display_container);
    main.appendChild(pick_light_all_off_btn);
    main.appendChild(picking_list_container);

    let med_display_page = 1;

    pp_barcode_input.addEventListener('keydown', async function(e) 
    {
        if (e.keyCode === 13 || e.key === "Enter") { 
            const text = document.querySelector('.pp_barcode_input');
            const text_for_search = text.value;
            const response = await serch_by_BarCode(text.value ,medicine_page.Data);
            console.log("serch_by_BarCode",response)
            console.log(text_for_search);
            if(response.Data.length == 0) {
                let temp_medicine_page;
                picking_list_container.innerHTML = ''
                temp_medicine_page = medicine_page["Data"].filter(function(item)
                {
                    return item['NAME'].toUpperCase().includes(text_for_search.toUpperCase());
                });

                if (temp_medicine_page.length == 0) {
                    console.log(temp_medicine_page);
                    set_med_display("", med_data);
                    text.value = '';
                    return;
                }

                for (let i = 0; i < temp_medicine_page.length; i++) {
                    let temp_div = await display_search_med_by_name(temp_medicine_page[i], med_data)
                    picking_list_container.appendChild(temp_div)
                }
                text.value = '';
                return;
            }
     
            console.log(response.Data[0].CODE);
            await light_on_by_code(response.Data[0].CODE);
            set_med_display(response.Data[0].CODE, med_data);
            text.value = '';
        }
    });

    BarcodeKeyinEvent = BarcodeKeyin;
    async function BarcodeKeyin(parsedCode)
    {
        if(document.activeElement == pp_barcode_input) return;

        const response = await serch_by_BarCode(parsedCode ,medicine_page.Data);
        console.log("serch_by_BarCode",response)
        if(response.Data.length == 0) {
            set_med_display("", med_data)
            pp_barcode_input.value = ''
            return;
        }
 
        console.log(response.Data[0].CODE);
        await light_on_by_code(response.Data[0].CODE)
        set_med_display(response.Data[0].CODE, med_data)
        pp_barcode_input.value = ''
    }
}

async function display_search_med_by_name (med, med_data) {
    console.log(med);
    console.log(med_data);
    let temp_pic_data = await get_med_pic_by_code(med.CODE);

    let med_pic = temp_pic_data.Data;

    let search_med_display_container = document.createElement("div")
    search_med_display_container.classList.add("search_med_display_container")
    search_med_display_container.id = med.CODE;

    let med_img = document.createElement("img");
    med_img.classList.add("med_img");
    med_img.src = `${med_pic.pic_base64}`;
    med_img.alt = `med image`;

    let med_content = document.createElement("div");
    med_content.classList.add("med_content");

    let search_med_name = document.createElement("div")
    search_med_name.classList.add("search_med_name")
    search_med_name.innerHTML = med.NAME;

    let search_med_ctname = document.createElement("div")
    search_med_ctname.classList.add("search_med_ctname")
    search_med_ctname.innerHTML = med.CHT_NAME

    med_content.appendChild(search_med_name)
    med_content.appendChild(search_med_ctname)

    search_med_display_container.appendChild(med_img);
    search_med_display_container.appendChild(med_content);

    search_med_display_container.addEventListener("click", async ()=> {
        await light_on_by_code(search_med_display_container.id);
        set_med_display(search_med_display_container.id, med_data);
    })

    return search_med_display_container
}

async function set_med_display(barcode, med_data) {
    let med_code = document.querySelector('.med_display_code');
    let med_name = document.querySelector('.med_display_engname');
    let med_ctname = document.querySelector('.med_display_ctname');
    let storage_location = document.querySelector('.storage_location');
    let display_med_img = document.querySelector(".display_med_img");
    let temp_pic_data = await get_med_pic_by_code(med_data[`${barcode}`].CODE);

    let med_pic = temp_pic_data.Data;

    if(med_data[`${barcode}`]) {
        med_code.innerHTML = `藥碼: ${med_data[`${barcode}`].CODE}`
        med_name.innerHTML = `英文: ${med_data[`${barcode}`].NAME}`
        med_ctname.innerHTML = `中文: ${med_data[`${barcode}`].CHT_NAME}`
        storage_location.innerHTML = `${med_data[`${barcode}`].STORAGE_NOTE}`
        display_med_img.src = `${med_pic.pic_base64}`;
        display_med_img.alt = `med image`;
    } else {
        med_code.innerHTML = `藥碼: 查無此藥`
        med_name.innerHTML = `英文: 查無此藥`
        med_ctname.innerHTML = `中文: 查無此藥`
        storage_location.innerHTML = `查無此藥`
        display_med_img.src = ``;
        display_med_img.alt = `no result`;
    }

}

async function light_on_by_code(code) {
    if(this.last_light_med) {
        let temp_last_data = await fetch(`${api_ip}api/device/light_on_by_code`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.last_light_med),
        })
        .then((response) => {
            return response.json();
        })
        console.log("滅燈", temp_last_data);
    }

    let temp_serverName
    let temp_serverType
    let table_select = document.querySelector(".table_select");
    let selectedColor = document.querySelector('input[name="color"]:checked').value;
    let temp_color_str = "";

    for (let i = 0; i < select_rgb[`${selectedColor}`].length; i++) {
        if(select_rgb[`${selectedColor}`].length - 1 == i) {
            temp_color_str += `${select_rgb[`${selectedColor}`][i]}`;
        } else {
            temp_color_str += `${select_rgb[`${selectedColor}`][i]},`;
        }
    };

    console.log(temp_color_str);
    
    for (let index = 0; index < temp_table_arr.length; index++) {
        const element = temp_table_arr[index];
        if(element.name == table_select.value) {
            console.log(element.name);
            temp_serverName = element.name;
            temp_serverType = element.type;
            break;
        }
    }


    let data = {
        ServerName: temp_serverName,
        ServerType: temp_serverType,
        ValueAry : 
        [
          code,
          temp_color_str,
          "60000"
        ]
    }

    console.log("送入的資料", data);

    let temp_data = await fetch(`${api_ip}api/device/light_on_by_code`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((response) => {
        return response.json();
    })

    console.log("亮燈回傳", temp_data);

    this.last_light_med = data;
    this.last_light_med.ValueAry[1] = "0,0,0";
    console.log("下次滅登資料", this.last_light_med);

    return temp_data;
}


// async function light_on_by_code(barcode) {
//     let selectedColor = document.querySelector('input[name="color"]:checked').value;

//     let data_str = barcode;
//     let table_select = document.querySelector(".table_select");

//     // "10103,0,255,0,60"

//     for (let i = 0; i < select_rgb[`${selectedColor}`].length; i++) {
//         data_str += `,${select_rgb[`${selectedColor}`][i]}`;
//     };
//     // 加入綠色燈條件,字串最後一個單位為亮燈秒數(1為恆亮,單位為秒),不填入為預設10秒,0為滅燈
//     data_str += `,60`;

//     console.log({
//         "Data": {},
//         "Value": data_str,
//         "TableName": "",
//         "ServerName": "調劑台",
//         "ServerType": table_select.value,
//         "TimeTaken": ""
//     });
    
//     await fetch(`${api_ip}api/OutTakeMed/light_on`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//                 "Data": {},
//                 "Value": data_str,
//                 "TableName": "",
//                 "ServerName": "調劑台",
//                 "ServerType": table_select.value,
//                 "TimeTaken": ""
//           }),
//       }).catch(e => {
//         console.log(e);
//       }).then(res => {
//         return res.json()
//       }).then(res => {
//         console.log(res);
//     });
// }
// async function set_light_off(barcode) {
//     let data_str = barcode;
//     // 加入黑色燈條件滅燈
//     data_str += `,0,0,0,0`;

//     await fetch(`${api_ip}api/OutTakeMed/light_on`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//                 "Data": {},
//                 "Value": data_str,
//                 "TableName": "",
//                 "ServerName": "DS01",
//                 "ServerType": "藥庫",
//                 "TimeTaken": ""
//             }),
//         }).catch(e => {
//         console.log(e);
//         }).then(res => {
//         return res.json()
//         }).then(res => {
//         console.log(res);
//     });
// }
// 亮滅燈api

async function get_serversetting_by_type() {
    let temp_data = await fetch(`${api_ip}api/ServerSetting/get_serversetting_by_type`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            Data: 
            {
                
            },
            ValueAry : 
            [
                "調劑台"
            ]
        }),
    })
    .then((response) => {
        return response.json();
    })

    return temp_data;
}