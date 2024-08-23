// 取得住院藥局清單
async function med_cart_all_get_phar() {
    let temp_doman = transform_api_ip(api_ip);
    let temp_data = await fetch(`${temp_doman}api/medCarList/get_phar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"Data":{}}),
    })
    .then((response) => {
        return response.json();
    })

    console.log(temp_data);

    return temp_data;
}

// 依藥局取得護理站清單
async function get_all_med_cart_by_phar(phar) {
    let temp_doman = transform_api_ip(api_ip);
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
    })

    console.log(temp_data);

    return temp_data;
}

// 取得病床清單
async function get_bed_list_by_cart(phar, med_cart) {
    let temp_doman = transform_api_ip(api_ip);
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

    console.log(temp_data);

    return temp_data;
}

// 取的病床資訊
async function get_patient_by_bedNum(phar, med_cart, bed_num) {
    let temp_doman = transform_api_ip(api_ip);
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

    console.log(temp_data);

    return temp_data;
}
// 取的病床資訊
async function get_patient_GUID(p_GUID) {
    let temp_doman = transform_api_ip(api_ip);
    let temp_data = await fetch(`${temp_doman}api/med_cart/get_patient_by_GUID`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "ValueAry":[p_GUID]
        }),
    })
    .then((response) => {
        return response.json();
    })

    console.log(temp_data);

    return temp_data;
}

// 取得藥品總量
async function get_all_med_qty(phar, med_cart) {
    let temp_doman = transform_api_ip(api_ip);
    let temp_data = await fetch(`${temp_doman}api/med_cart/get_med_qty`, {
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

    console.log(temp_data);

    return temp_data;
}

// 依藥局取得調劑台
async function get_serversetting_by_department_type(phar) {
    let temp_doman = transform_api_ip(api_ip);
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

    console.log(temp_data);

    return temp_data;
}
// 依藥局&護理站確認可否交車
async function med_cart_handover(phar, med_cart) {
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

    console.log(temp_data);

    return temp_data;
}
// 調劑狀態確認
async function api_med_cart_check_dispense(data) {
    let temp_doman = transform_api_ip(api_ip);
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

    console.log(temp_data);
}

function transform_api_ip(ip) {
    // 4433 => 4436
    let newStr = ip.replace(":4433", ":4436");
    return newStr;
}