// 根據頁面名稱取的參數
async function get_by_page_name(data) {
    let start_p = performance.now();
    let temp_data = await fetch(`${api_ip}api/settingPage/get_by_page_name`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((response) => {
        return response.json();
    });

    let end_p = performance.now();
    console.log(end_p - start_p);
    console.log("get_by_page_name", temp_data);

    return temp_data;
}

// 更新參數GUID、Value
async function update_by_GUID(data) {
    let start_p = performance.now();
    let temp_data = await fetch(`${api_ip}api/settingPage/update`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((response) => {
        return response.json();
    });

    let end_p = performance.now();
    console.log(end_p - start_p);
    console.log("update_by_GUID", temp_data);

    return temp_data;
}