async function upload_img_to_analysis(data) {
    console.log(JSON.stringify(data));
    try {
        let start_p = performance.now();
        console.log("進入api取得資料");
        console.log(data);
        console.log(`http://www.kutech.tw:4436/api/PCMPO/Start`);
        let temp_data = await fetch(`http://www.kutech.tw:4436/api/PCMPO/Start`, {
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
        console.log(err);
    }
}