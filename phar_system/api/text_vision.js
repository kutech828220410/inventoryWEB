async function upload_img_to_analysis(data) {
    console.log(JSON.stringify(data));
    try {
        let start_p = performance.now();
        console.log("進入api取得資料");
        console.log(data);
        console.log(`${api_ip}api/PCMPO/OLDanalyze`);
        // console.log(`http://www.kutech.tw:4436/api/PCMPO/analyze`);
        console.log(trans_api_ip(api_ip));
        let temp_data = await fetch(`${trans_api_ip(api_ip)}api/PCMPO/OLDanalyze`, {
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
    } catch(err) {
        let err_data = {
            Code: -200,
            Result: err
        }
        return err_data;
    }
}
async function update_med_code_srch(data) {
    console.log(JSON.stringify(data));
    try {
        let start_p = performance.now();
        console.log("進入api取得資料");
        console.log(data);
        // console.log(`${api_ip}api/PCMPO/update_med_code_srch`);
        // console.log(`http://www.kutech.tw:4436/api/PCMPO/update_med_code_srch`);
        console.log(trans_api_ip(api_ip));
        let temp_data = await fetch(`${trans_api_ip(api_ip)}api/PCMPO/update_med_code_srch`, {
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
    } catch(err) {
        let err_data = {
            Code: -200,
            Result: err
        }
        return err_data;
    }
}
async function update_textvision(data) {
    console.log(JSON.stringify(data));
    try {
        let start_p = performance.now();
        console.log("進入api取得資料");
        console.log(data);
        // console.log(`${api_ip}api/PCMPO/update_textvision`);
        // console.log(`http://www.kutech.tw:4436/api/PCMPO/update_textvision`);
        console.log(trans_api_ip(api_ip));
        let temp_data = await fetch(`${trans_api_ip(api_ip)}api/PCMPO/update_textvision`, {
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
    } catch(err) {
        let err_data = {
            Code: -200,
            Result: err
        }
        return err_data;
    }
}
async function delete_textVision(data) {
    console.log(JSON.stringify(data));
    try {
        let start_p = performance.now();
        console.log("進入api取得資料");
        console.log(data);
        // console.log(`${api_ip}api/PCMPO/delete_textVision`);
        // console.log(`http://www.kutech.tw:4436/api/PCMPO/delete_textVision`);
        console.log(trans_api_ip(api_ip));
        let temp_data = await fetch(`${trans_api_ip(api_ip)}api/PCMPO/delete_textVision`, {
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
    } catch(err) {
        let err_data = {
            Code: -200,
            Result: err
        }
        return err_data;
    }
}

function trans_api_ip(ip) {
    let url = 'http://www.kutech.tw:4436/';
    // return url;
    return ip;
}