// 取得住院藥局清單
async function get_all_inv_combinelist(data) {
    let start_p = performance.now();
    let temp_doman = transform_api_ip_4433(api_ip);
    console.log(temp_doman);
    let temp_data = await fetch(`${temp_doman}api/inv_combinelist/get_all_inv`, {
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
    console.log(temp_data);

    return temp_data;
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