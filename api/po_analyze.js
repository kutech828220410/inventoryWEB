async function img_presave(data) {
    try {
        let start_p = performance.now();
        console.log("進入api取得資料");
        console.log(data);
        console.log(`${api_ip}api/pcmpo/presave`);
        let temp_data = await fetch(`${api_ip}api/pcmpo/presave`, {
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
async function img_to_analysis(data) {
    try {
        let start_p = performance.now();
        console.log("進入api取得資料");
        console.log(data);
        console.log(`${api_ip}api/PCMPO/analyze`);
        let temp_data = await fetch(`${api_ip}api/PCMPO/analyze`, {
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
async function get_by_GUID(data) {
    // ValueAry: [
    //     "GUID"
    // ]
    try {
        let start_p = performance.now();
        console.log("進入api取得資料");
        console.log(data);
        console.log(`${api_ip}api/PCMPO/get_by_GUID`);
        let temp_data = await fetch(`${api_ip}api/PCMPO/get_by_GUID`, {
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
async function delete_by_GUID(data) {
    // ValueAry: [
    //     "GUID"
    // ]
    try {
        let start_p = performance.now();
        console.log("進入api取得資料");
        console.log(data);
        console.log(`${api_ip}api/PCMPO/delete_by_GUID`);
        let temp_data = await fetch(`${api_ip}api/PCMPO/delete_by_GUID`, {
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
async function user_precheck(data) {
    // ValueAry: [
    //     "GUID"
    // ]
    try {
        let start_p = performance.now();
        console.log("進入api取得資料");
        console.log(data);
        console.log(`${api_ip}api/pcmpo/precheck`);
        let temp_data = await fetch(`${api_ip}api/pcmpo/precheck`, {
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
async function update_by_GUID_poNum(data) {
    // {
    //     "ValueAry": [
    //         "GUID",
    //         "單號"
    //     ]
    // }
    try {
        let start_p = performance.now();
        console.log("進入api取得資料");
        console.log(data);
        console.log(`${api_ip}api/pcmpo/update_by_GUID_poNum`);
        let temp_data = await fetch(`${api_ip}api/pcmpo/update_by_GUID_poNum`, {
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
async function po_check_api(data) {
    // {
    //     "ValueAry": [
    //         "batchID",
    //         "GUID1;GUID2;GUID3"
    //     ]
    // }
    try {
        let start_p = performance.now();
        console.log("進入api取得資料");
        console.log(data);
        console.log(`${api_ip}api/pcmpo/check`);
        let temp_data = await fetch(`${api_ip}api/pcmpo/check`, {
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
async function update_pic_by_GUID(data) {
    // {
    //     "ValueAry": [
    //         "GUID",
    //         "base64"
    //     ]
    // }
    
    try {
        let start_p = performance.now();
        console.log("進入api取得資料");
        console.log(data);
        console.log(`${api_ip}api/pcmpo/update_pic_by_GUID`);
        let temp_data = await fetch(`${api_ip}api/pcmpo/update_pic_by_GUID`, {
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