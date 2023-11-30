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

    nav_bar_create("forDisplay", test_user_data)

    let selectedColor;
    // document.querySelector('input[name="color"]:checked').value;

    let barcode_test = document.querySelector('#barcode_test')
    let barcode_test_btn = document.querySelector("#barcode_test_btn")

    function set_med_display(barcode) {
        let med_code = document.querySelector('.med_code')
        let med_name = document.querySelector('.med_name')
        let med_ctname = document.querySelector('.med_ctname')

        if(temp_group_all_data[`${barcode}`]) {
            med_code.innerHTML = `藥碼: ${temp_group_all_data[`${barcode}`].CODE}`
            med_name.innerHTML = `英文: ${temp_group_all_data[`${barcode}`].NAME}`
            med_ctname.innerHTML = `中文: ${temp_group_all_data[`${barcode}`].CHT_NAME}`
        } else {
            alert("查無此藥品")
        }
    
    }

    // window.addEventListener('keydown', (e) => {
    //     if (e.keyCode === 13 || e.keyCode === "Enter") {
    //         console.log(barcode_value);
    //     }
    // })

    barcode_test.addEventListener("keydown", (e) => {
        if (e.keyCode === 13 || e.key === "Enter") { 

            set_light_on(barcode_test.value)
            set_med_display(barcode_test.value)
            barcode_test.value = ''
        }
    })
    barcode_test_btn.addEventListener('click', () => {
        set_light_on(barcode_test.value)
        set_med_display(barcode_test.value)
        barcode_test.value = ''
    })

    BarcodeKeyinEvent = BarcodeKeyin;
    async function BarcodeKeyin(parsedCode)
    {
        console.log(parsedCode);
        await set_light_on(parsedCode)
        set_med_display(parsedCode)
    }



    console.log(selectedColor);
}

async function set_light_on(barcode) {
    selectedColor = document.querySelector('input[name="color"]:checked').value;

    let data_str = barcode

    for (let i = 0; i < select_rgb[`${selectedColor}`].length; i++) {
        data_str += `,${select_rgb[`${selectedColor}`][i]}`
    }
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