window.onload = load;
let select_rgb = {
    "black" : [0, 0, 0],
    "red" : [255, 0, 0],
    "green" : [0, 255, 0],
    "yellow" : [255, 255, 0],
    "blue" : [0, 0, 255]
}
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

    // const test_user_data = {
    //     name: "王曉明",
    // }

    var loggedID = sessionStorage.getItem('loggedID');  
    var loggedName = sessionStorage.getItem('loggedName');  
    const test_user_data = {
      id: loggedID,
      name: loggedName,
    }

    nav_bar_create("pickingpage", test_user_data)

    mainDiplay(temp_group_all_data)

}

function mainDiplay(med_data) {
    const main = document.querySelector(".main");

    const pk_title = document.createElement("div");
    pk_title.innerHTML="揀貨模式";
    pk_title.classList.add('pk_title');

    const radio_container = document.createElement("div");
    radio_container.classList.add('radio_container');
    radio_container.innerHTML = `
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
        <label for="green">
            <input type="radio" name="color" id="green" value="green">
            綠色
        </label>
        <label for="none">
            <input type="radio" name="color" id="none" value="none">
            不亮燈
        </label>
    `;

    const pp_barcode_input = document.createElement('input');
    pp_barcode_input.classList.add('pp_barcode_input');
    pp_barcode_input.placeholder = "請輸入藥碼或掃描國際條碼";

    const med_input_display_container = document.createElement("div");
    med_input_display_container.classList.add("med_input_display_container");
    med_input_display_container.innerHTML = `        
        <div class="med_display_code">藥碼 : 
            <span class="code_span"></span>
        </div>
        <div class="med_display_ctname">中文名 : 
            <span class="ctname_span"></span>
        </div>
        <div class="med_display_engname">英文名 : 
            <span class="engname_span"></span>
        </div>
    `;

    const picking_list_container = document.createElement("div");
    picking_list_container.classList.add("picking_list_container");

    const picking_list_select = document.createElement("select");
    picking_list_select.classList.add('picking_list_select')
    picking_list_select.innerHTML += `<option value="">請選擇揀貨單</option>`;

    picking_list_container.appendChild(picking_list_select)

    main.appendChild(pk_title);
    main.appendChild(radio_container);
    main.appendChild(pp_barcode_input);
    main.appendChild(med_input_display_container);
    main.appendChild(picking_list_container);
}

async function set_light_on(barcode) {
    selectedColor = document.querySelector('input[name="color"]:checked').value;

    let data_str = barcode;

    for (let i = 0; i < select_rgb[`${selectedColor}`].length; i++) {
        data_str += `,${select_rgb[`${selectedColor}`][i]}`;
    };
    await fetch(`${api_ip}api/OutTakeMed/light_on`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
                "Data": {},
                "Value": data_str,
                "TableName": "",
                "ServerName": "展覽台",
                "ServerType": "",
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