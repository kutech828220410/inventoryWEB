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

    // [
    //     "起始時間",
    //     "結束時間",
    //     "口服1,口服2",
    //     "調劑台,調劑台"
    // ]
    console.log(temp_data);

    return temp_data;
}
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

    // [
    //     "起始時間",
    //     "結束時間",
    //     "口服1,口服2",
    //     "調劑台,調劑台"
    // ]
    console.log(temp_data);

    return temp_data;
}
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

    // [
    //     "起始時間",
    //     "結束時間",
    //     "口服1,口服2",
    //     "調劑台,調劑台"
    // ]
    console.log(temp_data);

    return temp_data;
}
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

    // [
    //     "起始時間",
    //     "結束時間",
    //     "口服1,口服2",
    //     "調劑台,調劑台"
    // ]
    console.log(temp_data);

    return temp_data;
}
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

    // [
    //     "起始時間",
    //     "結束時間",
    //     "口服1,口服2",
    //     "調劑台,調劑台"
    // ]
    console.log(temp_data);

    return temp_data;
}

function transform_api_ip(ip) {
    // 4433 => 4436
    let newStr = ip.replace(":4433", ":4436");
    return newStr;
}