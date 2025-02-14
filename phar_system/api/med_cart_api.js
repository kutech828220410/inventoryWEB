// 取得住院藥局清單
async function med_cart_all_get_phar() {
    let start_p = performance.now();
    let temp_doman = transform_api_ip_4433(api_ip);
    console.log(temp_doman);
    let temp_data = await fetch(`${temp_doman}api/medCarList/get_phar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"Data":{}}),
    })
    .then((response) => {
        return response.json();
    });

    let end_p = performance.now();
    console.log(end_p - start_p);
    console.log(temp_data);

    return temp_data;
}

// 依藥局取得護理站清單
async function get_all_med_cart_by_phar(phar) {
    let start_p = performance.now();
    let temp_doman = transform_api_ip_4433(api_ip);
    let temp_data = await fetch(`${temp_doman}api/medCarList/get_medcar_by_phar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "ValueAry":[phar],
    }),
    })
    .then((response) => {
        return response.json();
    });

    let end_p = performance.now();
    console.log(end_p - start_p);
    console.log(temp_data);

    return temp_data;
}

// 取得病床清單
async function get_bed_list_by_cart(phar, med_cart) {
    let start_p = performance.now();
    let temp_doman = transform_api_ip_4433(api_ip);
    console.log(`"test", ${temp_doman}api/med_cart/get_bed_list_by_cart`);
    let temp_data = await fetch(`${temp_doman}api/med_cart/get_bed_list_by_cart`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "ValueAry":[phar, med_cart]
        }),
    })
    .then((response) => {
        return response.json();
    })

    let end_p = performance.now();
    console.log(end_p - start_p);
    console.log(temp_data);

    return temp_data;
}

// 取的病床資訊
async function get_patient_by_bedNum(phar, med_cart, bed_num) {
    let start_p = performance.now();
    let temp_doman = transform_api_ip_4433(api_ip);
    let temp_data = await fetch(`${temp_doman}api/med_cart/get_patient_by_bedNum`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "ValueAry":[phar, med_cart, bed_num]
        }),
    })
    .then((response) => {
        return response.json();
    })

    let end_p = performance.now();
    console.log(end_p - start_p);
    console.log(temp_data);

    return temp_data;
}
// 取的病床資訊
async function get_patient_GUID(data) {
    let start_p = performance.now();
    let temp_doman = transform_api_ip_4433(api_ip);
    let temp_data = await fetch(`${temp_doman}api/med_cart/get_patient_by_GUID`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((response) => {
        return response.json();
    })

    let end_p = performance.now();
    console.log(end_p - start_p);
    console.log(temp_data);

    return temp_data;
}

// 取得藥品總量
async function get_all_med_qty(phar, med_cart, table) {
    let start_p = performance.now();
    let temp_doman = transform_api_ip_4433(api_ip);
    let temp_data = await fetch(`${temp_doman}api/med_cart/get_med_qty`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            Value: table,
            ValueAry:[phar, med_cart]
        }),
    })
    .then((response) => {
        return response.json();
    })

    let end_p = performance.now();
    console.log(end_p - start_p);
    console.log(temp_data);

    return temp_data;
}

// 取得藥品異動清單
async function get_patient_with_NOdispense(data) {
    let start_p = performance.now();
    let temp_doman = transform_api_ip_4433(api_ip);
    let temp_data = await fetch(`${temp_doman}api/med_cart/get_patient_with_NOdispense`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ValueAry: data
        }),
    })
    .then((response) => {
        return response.json();
    })

    let end_p = performance.now();
    console.log(end_p - start_p);
    console.log(temp_data);

    return temp_data;
}

// 依藥局取得調劑台
async function get_serversetting_by_department_type(phar) {
    let start_p = performance.now();
    let temp_doman = transform_api_ip_4433(api_ip);
    let temp_data = await fetch(`${temp_doman}api/ServerSetting/get_serversetting_by_department_type`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "ValueAry":[phar]
        }),
    })
    .then((response) => {
        return response.json();
    })

    let end_p = performance.now();
    console.log(end_p - start_p);
    console.log(temp_data);

    return temp_data;
}
// 依藥局&護理站確認可否交車
async function med_cart_handover(phar, med_cart) {
    let start_p = performance.now();
    let temp_doman = transform_api_ip(api_ip);
    let temp_data = await fetch(`${temp_doman}api/med_cart/handover`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "ValueAry":[phar, med_cart]
        }),
    })
    .then((response) => {
        return response.json();
    })

    let end_p = performance.now();
    console.log(end_p - start_p);
    console.log(temp_data);

    return temp_data;
}
// 調劑狀態確認
async function api_med_cart_check_dispense(data) {
    let start_p = performance.now();
    let temp_doman = transform_api_ip_4433(api_ip);
    let temp_data = await fetch(`${temp_doman}api/med_cart/check_dispense`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((response) => {
        return response.json();
    })

    let end_p = performance.now();
    console.log(end_p - start_p);
    console.log("病床藥品調劑確認");
    console.log(temp_data);
    return temp_data
}
// 覆核狀態確認
async function api_med_cart_double_check(data) {
    let start_p = performance.now();
    let temp_doman = transform_api_ip_4433(api_ip);
    let temp_data = await fetch(`${temp_doman}api/med_cart/double_check`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((response) => {
        return response.json();
    })

    let end_p = performance.now();
    console.log(end_p - start_p);
    console.log("病床藥品覆核確認");
    console.log(temp_data);
    return temp_data
}
// 覆核狀態確認
async function api_med_cart_double_check_by_GUID(data) {
    let start_p = performance.now();
    let temp_doman = transform_api_ip_4433(api_ip);
    let temp_data = await fetch(`${temp_doman}api/med_cart/double_check_by_GUID`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((response) => {
        return response.json();
    })

    let end_p = performance.now();
    console.log(end_p - start_p);
    console.log("單一藥品覆核確認");
    console.log(temp_data);
    return temp_data
}
// 調劑狀態確認
async function api_med_cart_check_dispense_by_GUID(data) {
    let start_p = performance.now();
    let temp_doman = transform_api_ip_4433(api_ip);
    let temp_data = await fetch(`${temp_doman}api/med_cart/check_dispense_by_GUID`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((response) => {
        return response.json();
    })

    let end_p = performance.now();
    console.log(end_p - start_p);
    console.log("單一藥品調劑確認");
    console.log(temp_data);
    return temp_data
}
// 調劑狀態確認（未調藥品）
async function api_med_cart_dispensed_by_GUID(data) {
    let start_p = performance.now();
    let temp_doman = transform_api_ip_4433(api_ip);
    let temp_data = await fetch(`${temp_doman}api/med_cart/dispensed_by_GUID`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((response) => {
        return response.json();
    })

    let end_p = performance.now();
    console.log(end_p - start_p);
    console.log(temp_data);
    return temp_data
}

// 初盤紀錄log
async function add_med_inventory_log(data) {
    let start_p = performance.now();
    let temp_doman = transform_api_ip_4433(api_ip);
    let temp_data = await fetch(`${temp_doman}api/med_inventory/add_med_inventory_log`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((response) => {
        return response.json();
    })

    let end_p = performance.now();
    console.log(end_p - start_p);
    console.log(temp_data);
}
// 新增初盤紀錄
async function add_med_inventory_time_track(data) {
    let start_p = performance.now();
    let temp_doman = transform_api_ip_4433(api_ip);
    let temp_data = await fetch(`${temp_doman}api/med_inventory/add_med_inventory`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((response) => {
        return response.json();
    })
    if(temp_data.Code == 200) {
        alert(`紀錄時間：${temp_data.Data[0].op_time}`);
    }

    let end_p = performance.now();
    console.log(end_p - start_p);
    console.log(temp_data);
}
// 根據藥局、護理站、日期給出操作人清單
async function get_opid_by_time(data) {
    let start_p = performance.now();
    let temp_doman = transform_api_ip_4433(api_ip);
    let temp_data = await fetch(`${temp_doman}api/med_inventory/get_opid_by_time`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((response) => {
        return response.json();
    })

    let end_p = performance.now();
    console.log(end_p - start_p);
    console.log(temp_data);

    return temp_data
}
// 根據藥局、護理站、日期、操作人id給出時間清單
async function get_time_by_op_id(data) {
    let temp_doman = transform_api_ip_4433(api_ip);
    let temp_data = await fetch(`${temp_doman}api/med_inventory/get_time_by_op_id`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((response) => {
        return response.json();
    })
    console.log(temp_data);

    return temp_data
}
// 根據病床GUID給出DC/NEW資料
async function get_medChange_by_GUID(data) {
    let temp_doman = transform_api_ip_4433(api_ip);
    let temp_data = await fetch(`${temp_doman}api/med_cart/get_medChange_by_GUID`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((response) => {
        return response.json();
    })
    console.log(temp_data);

    return temp_data
}
// 根據處方GUID變更大瓶點滴狀態
async function update_large_in_med_cpoe(data) {
    let temp_doman = transform_api_ip_4433(api_ip);
    let temp_data = await fetch(`${temp_doman}api/med_cart/update_large_in_med_cpoe`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((response) => {
        return response.json();
    })
    console.log(temp_data);

    return temp_data
}
// 取得初盤紀錄log
async function get_logtime_by_opid(data) {
    let temp_doman = transform_api_ip_4433(api_ip);
    let temp_data = await fetch(`${temp_doman}api/med_inventory/get_logtime_by_opid`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((response) => {
        return response.json();
    })
    console.log(temp_data);

    return temp_data
}
// 亮滅燈api
async function light_on_by_code(data) {
    let temp_doman = transform_api_ip_4433(api_ip);
    let temp_data = await fetch(`${temp_doman}api/device/light_on_by_code`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((response) => {
        return response.json();
    })
    console.log(temp_data);

    return temp_data
}
// 以藥碼及該藥局所有調劑台確認是否存在
async function get_dispens_by_code(data) {
    let temp_doman = transform_api_ip_4433(api_ip);
    let temp_data = await fetch(`${temp_doman}api/med_cart/get_dispens_by_code`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((response) => {
        return response.json();
    })
    console.log(temp_data);

    return temp_data
};

// 病床異動api
async function get_bed_status(data) {
    let temp_doman = transform_api_ip_4433(api_ip);
    let temp_data = await fetch(`${temp_doman}api/med_cart/get_bed_status`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((response) => {
        return response.json();
    })
    console.log(temp_data);

    return temp_data
}

function transform_api_ip(ip) {
    let temp_url = serch_APIServer("Main", "網頁", "med_cart_vm_api");
    // console.log(temp_url);
    
    let newStr = temp_url[0].server.replace("/api/med_cart", "");
    console.log("VM轉址", newStr);

    newStr += "/";

    newStr = is_https_trans_ip(newStr);

    return newStr;
    // return ip;
}
function transform_api_ip_4433(ip) {
    let newStr = ip

    newStr = is_https_trans_ip(newStr);
    return newStr;
    // return ip;
}