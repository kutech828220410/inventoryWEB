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
        // [
        //     "起始時間",
        //     "結束時間",
        //     "口服1,口服2",
        //     "調劑台,調劑台"
        // ]
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