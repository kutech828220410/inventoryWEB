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
    "batch_storage"
];

async function get_permissions_arr() {
    let temp_arr = [];
    let permissions_data = await et_web_peremeter();
    console.log(permissions_data);
    if(permissions_data == "error") {
        return permissions_data
    } else {
        permissions_data = permissions_data.Data;
        console.log(permissions_data);
        console.log(Array.isArray(permissions_data));
        if(Array.isArray(permissions_data)) {
            permissions_data.forEach(element => {
                if(element.value == "True") {
                    let temp_str = swtich_logic_func(element.content);
                    temp_arr.push(temp_str);
                }
            });
            
            console.log(temp_arr);
        
            return temp_arr;
        } else {
            return [];
        }   
    }
}
function swtich_logic_func(str) {
    // 模塊轉換
    let temp_str = "";
    switch (str) {
        case "盤點單管理模組不啟用":
            temp_str = "inventory_list";
            break;

        case "條碼建置模組不啟用":
            temp_str = "barcodemanagement";
            break;

        case "藥品管理模組不啟用":
            temp_str = "medGroup";
            break;

        case "庫存量清單模組不啟用":
            temp_str = "med_balance";
            break;

        case "盤點單合併模組不啟用":
            temp_str = "inventory_merge";
            break;

        case "驗收單管理模組不啟用":
            temp_str = "inspection";
            break;

        case "藥品申領模組不啟用":
            temp_str = "med_request";
            break;

        case "揀貨模組不啟用":
            temp_str = "pickingpage";
            break;

        case "藥品撥補模組不啟用":
            temp_str = "med_allocate";
            break;

        case "管制結存模組不啟用":
            temp_str = "drugs_report";
            break;

        case "交易紀錄模組不啟用":
            temp_str = "consumption_report";
            break;

        case "批次入庫模組不啟用":
            temp_str = "batch_storage";
            break;

        case "住院調劑模組不啟用":
            temp_str = "medicine_cart";
            break;

        case "中藥交易紀錄模組不啟用":
            temp_str = "cht_consumption_report";
            break;

        case "中藥醫令模組不啟用":
            temp_str = "ch_medical_order";
            break;
        case "單據辨識模組不啟用":
            temp_str = "requisitions_upload";
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
function user_permission_check(arr, page_name, level) {
    // 權限判定邏輯
    let boolean = false;
    if(page_name == "權限設定") {
        if(+level > 19) {
            boolean = true;
        }
        console.log("==========權限設定=========", boolean);
    } else {
        arr.forEach(element => {
            if(element.name == page_name) {
                console.log("權限state", element.state);
                console.log(element.name, "======", page_name);
                boolean = element.state;
                // console.log(level);
            }
        });
    }

    return boolean;
}
async function get_web_peremeter_name() {
    try {
        let data = {
            Data: {},
            ValueAry : []
        };
        let start_p = performance.now();
        console.log("進入api取得資料");
        console.log(data);
        console.log(`${api_ip}api/ServerSetting/get_web_peremeter_name`);
        // 這邊偷偷調整權限全開，破壞fetch的url就可以
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
    
        let end_p = performance.now();
        console.log(end_p - start_p);

        console.log(temp_data);
    
        return temp_data;
    } catch (error) {
        console.log(error);
        return "error";
    }
}
async function et_web_peremeter() {
    let data = await get_web_peremeter_name();
    if(data == "error" || data.Code == -200) {
        return data;
    } else {
        data = data.Data;
        data = {
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
}
async function page_check_permissions(str) {
    let permissions_arr = await get_permissions_arr();
    console.log(permissions_arr);
    if(permissions_arr == "error") {
      console.log("權限全開");
    } else {
      if(permissions_arr.includes(str)) {
          alert('權限未開放');
          window.location.href = '../../frontpage';
      };
    }
}
async function get_user_permissions(data) {
    try {
        let start_p = performance.now();
        console.log("進入api取得資料");
        console.log(data);
        console.log(`${api_ip}api/session/get_setting_by_type`);
        let temp_data = await fetch(`${api_ip}api/session/get_setting_by_type`, {
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
        console.log("資料分析api效能", end_p - start_p);
    
        return temp_data;
    } catch(err) {
        let err_data = {
            Code: -200,
            Result: `網路錯誤：${err}`
        }
        return err_data;
    }
}