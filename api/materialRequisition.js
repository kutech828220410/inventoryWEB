// 根據時間區間取得資料
async function get_by_requestTime(str_date, end_date) {
    let data =   {
        Data: 
        {},
        "ValueAry" : 
        [
           `${str_date} 00:00:00`,
           `${end_date} 23:59:59`
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
// 根據時間區間取得資料
async function add_request_list(data) {
    let post_data = {
        Data: [data]
    }
    let start_p = performance.now();
    console.log("進入api取得資料");
    console.log(post_data);
    console.log(`${api_ip}api/materialRequisition/add`);
    let temp_data = await fetch(`${api_ip}api/materialRequisition/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(post_data),
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
async function download_excel_by_requestTime(data)
{
    let temp_url = serch_APIServer("Main", "網頁", "download_excel_by_requestTime");
    if(temp_url.length != 0) { 
        // console.log("post_data [excel_upload]",file);
        // let api_url = api_ip.replace(":4433", ":443/dbvm/batch_inventory_import/excel_upload");
        // ${api_url}api/materialRequisition/download_excel_by_requestTime
        console.log(temp_url);
        console.log("batch上傳excel轉址",temp_url[0].server);  
        try {
            const response = await fetch(`${temp_url[0].server}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            });
    
            if (!response.ok) {
            throw new Error('Failed to fetch the Excel file.');
            }
    
            const blob = await response.blob();
            const _url = window.URL.createObjectURL(blob);
    
            // 创建下载链接
            let downloadLink = document.createElement('a');
            downloadLink.href = window.URL.createObjectURL(blob);
            downloadLink.download = `${data.ValueAry[0]}-${data.ValueAry[1]}申領紀錄.xlsx`;
            downloadLink.click();
        } catch (error) {
            console.error(error);
        }
    } else {
        try {
            const response = await fetch(`${api_ip}api/materialRequisition/download_excel_by_requestTime`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            });
    
            if (!response.ok) {
            throw new Error('Failed to fetch the Excel file.');
            }
    
            const blob = await response.blob();
            const _url = window.URL.createObjectURL(blob);
    
            // 创建下载链接
            let downloadLink = document.createElement('a');
            downloadLink.href = window.URL.createObjectURL(blob);
            downloadLink.download = `${data.ValueAry[0]}-${data.ValueAry[1]}申領紀錄.xlsx`;
            downloadLink.click();
        } catch (error) {
            console.error(error);
        }
    }
}
