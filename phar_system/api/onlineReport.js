// 回報人數api
async function report_member(page, ic_sn, userID, userName) {
    let start_p = performance.now();
    let temp_doman = transform_api_ip_4433(api_ip);
    let post = {
        Data: {
            page: page,
            parameter: ic_sn,
            user_id: userID,
            user_name: userName,
        }
    }
    console.log("回報人員", `${temp_doman}api/webTraffic/add`);
    let temp_data = await fetch(`${temp_doman}api/webTraffic/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
    })
    .then((response) => {
        return response.json();
    });

    let end_p = performance.now();
    console.log(end_p - start_p);
    console.log(temp_data);

    return temp_data;
}

// 取得人數api
async function get_members_with_page(page, ic_sn) {
    let start_p = performance.now();
    let temp_doman = transform_api_ip_4433(api_ip);
    let post = {
        ValueAry:[
            page,
            ic_sn,
            "10"
        ]
    }
    console.log("回報人數取得", `${temp_doman}api/webTraffic/get_by_page`);
    let temp_data = await fetch(`${temp_doman}api/webTraffic/get_by_page`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
    })
    .then((response) => {
        return response.json();
    });

    let end_p = performance.now();
    console.log(end_p - start_p);
    console.log(temp_data);

    return temp_data;
}

// 回報人數api
async function get_all_review_list(page, ic_sn) {
    let start_p = performance.now();
    let temp_doman = transform_api_ip_4433(api_ip);
    let post = {
        ValueAry:[
            page,
            ic_sn,
            "10"
        ]
    }
    console.log("回報人數取得", `${temp_doman}api/inventory/creat_review_get_by_CT_TIME_ST_END`);
    let temp_data = await fetch(`${temp_doman}api/inventory/creat_review_get_by_CT_TIME_ST_END`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
    })
    .then((response) => {
        return response.json();
    });

    let end_p = performance.now();
    console.log(end_p - start_p);
    console.log(temp_data);

    return temp_data;
}