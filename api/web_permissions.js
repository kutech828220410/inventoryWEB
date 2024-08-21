let web_list = [
    "inventory",
    "barcodemanagement",
    "medGroup",
    "med_balance",
    "staff_management",
    "inspection",
    "med_request",
    "pickingpage",
    "drugs_report",
    "consumption_report",
    "ch_medical_order",
    "cht_consumption_report",
]
async function get_permissions_arr() {
    let temp_arr = [];
    let permissions_data = await et_web_peremeter();
    permissions_data = permissions_data.Data;
    
    permissions_data.forEach(element => {
        if(element.value == "False") {
            let temp_str = swtich_logic_func(element.content);
            temp_arr.push(temp_str);
        }
    });

    temp_arr.push("staff_management");
    
    console.log(temp_arr);

    return temp_arr;
}
function swtich_logic_func(str) {
    // 模塊轉換
    let temp_str = "";
    switch (str) {
        case "驗收單管理模組不啟用":
            temp_str = "inspection";
            break;
        case "庫存量清單模組不啟用":
            temp_str = "med_balance";
            break;
        case "交易紀錄模組不啟用":
            temp_str = "consumption_report";
            break;
        case "藥品申領模組不啟用":
            temp_str = "med_request";
            break;
        case "揀貨模組不啟用":
            temp_str = "pickingpage";
            break;
        case "盤點單合併模組不啟用":
            temp_str = "inventory_merge";
            break;
        case "條碼建置模組不啟用":
            temp_str = "barcodemanagement";
            break;
        case "管制結存模組不啟用":
            temp_str = "drugs_report";
            break;
        case "藥品管理模組不啟用":
            temp_str = "medGroup";
            break;
        case "盤點單管理模組不啟用":
            temp_str = "inventory_list";
            break;
        case "中藥交易紀錄模組不啟用":
            temp_str = "cht_consumption_report";
            break;
        case "中藥醫令模組不啟用":
            temp_str = "ch_medical_order";
            break;
    
        default:
            break;
    }

    return temp_str;
}
function front_page_display_logic(str, arr) {
    // front_page icon禁用
    let temp_str = "";
    switch (str) {
        case "inventory":
            temp_str = "inventory_list";
            break;
    
        default:
            temp_str = str;
            break;
    }
    // console.log(temp_str);

    let boolean = arr.includes(temp_str);

    return boolean;
}
async function get_web_peremeter_name() {
    let data =   {
        Data: {},
        ValueAry : []
    };
    let start_p = performance.now();
    console.log("進入api取得資料");
    console.log(data);
    console.log(`${api_ip}api/ServerSetting/get_web_peremeter_name`);
    let temp_data = await fetch(`${api_ip}api/ServerSetting/get_web_peremeter_name`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((response) => {
        console.log("取得資料ＪＳＯＮ格式");
        return response.json();
    });
    // [
    //     "起始時間",
    //     "結束時間",
    //     "口服1,口服2",
    //     "調劑台,調劑台"
    // ]
    let end_p = performance.now();
    console.log(end_p - start_p);

    return temp_data;
}
async function et_web_peremeter() {
    let data = await get_web_peremeter_name();
    data = data.Data;
    data =   {
        Data: {},
        ValueAry : data
    }
    let start_p = performance.now();
    console.log("進入api取得資料");
    console.log(data);
    console.log(`${api_ip}api/ServerSetting/et_web_peremeter`);
    let temp_data = await fetch(`${api_ip}api/ServerSetting/et_web_peremeter`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((response) => {
        console.log("取得資料ＪＳＯＮ格式");
        return response.json();
    });
    let end_p = performance.now();
    console.log(end_p - start_p);
    console.log(temp_data);

    return temp_data;
}