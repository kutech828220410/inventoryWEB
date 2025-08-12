// logger 紀錄
async function api_logger_add(event, op_type) {
    //  "event": "藥品總量調劑",
    //  "op_type": "護理站調劑",
    //  "op_id": "HS001",
    //  "op_name": "洪森智能科技",
    //  "op_time": "2025-08-12T16:32:30"

    const user_session = JSON.parse(sessionStorage.getItem("user_session"));
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 月份補0
    const day = String(today.getDate()).padStart(2, '0'); // 日期補0
    const hour = String(today.getHours()).padStart(2, '0');
    const minute = String(today.getMinutes()).padStart(2, '0');
    const second = String(today.getSeconds()).padStart(2, '0');  

    const time = `${year}-${month}-${day}T${hour}:${minute}:${second}`;

    let data = {
        Data:[
            {
             event: event,
             op_type: op_type,
             op_id: user_session.ID,
             op_name: user_session.Name,
             op_time: time
            }
        ]
    }
    try {
        let start_p = performance.now();
        let temp_doman = transform_api_ip_4433(api_ip);
        let temp_data = await fetch(`${temp_doman}api/Logger/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        .then((response) => {
            return response.json();
        })
    
        let end_p = performance.now();
        console.log(end_p - start_p);
        console.log(temp_data);
        return temp_data
    } catch (error) {
        let err_data = {
            Code: -200,
            Result: `網路錯誤：${error}`
        }
        return err_data;
    }
}