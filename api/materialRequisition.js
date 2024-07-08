// 根據時間區間取得資料
async function get_by_requestTime(str_date, end_date) {
    let data =   {
        Data: 
        {},
        "ValueAry" : 
        [
           `${str_date} 00:00:00`,
           `${end_date} 00:00:00`
        ]
      }
    let start_p = performance.now();
    console.log("進入api取得資料");
    console.log(data);
    console.log(`${api_ip}api/materialRequisition/get_by_requestTime`);
    let temp_data = await fetch(`${api_ip}api/materialRequisition/get_by_requestTime`, {
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

// 更改過帳狀態為已過帳
async function update_status_posted(GUID) {
    let data = {
        Data: {
           GUID: GUID
        }
    }
    let start_p = performance.now();
    console.log("進入api取得資料");
    console.log(data);
    console.log(`${api_ip}api/materialRequisition/update_status_posted`);
    let temp_data = await fetch(`${api_ip}api/materialRequisition/update_status_posted`, {
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
    console.log(temp_data);
    return;
}

// 更新實領量
async function update_actual_quantity(GUID, a_qty) {
    let data = {
        Data: {
           GUID: GUID,
           actualQuantity: `${a_qty}`
        }
    }
    let start_p = performance.now();
    console.log("進入api取得資料");
    console.log(data);
    console.log(`${api_ip}api/materialRequisition/update_actual_quantity`);
    let temp_data = await fetch(`${api_ip}api/materialRequisition/update_actual_quantity`, {
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
    console.log(temp_data);
    return;
}
