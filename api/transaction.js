async function get_datas_by_op_time_st_end_transactions(data) {
    let temp_data = await fetch(`${api_ip}api/transactions/get_datas_by_op_time_st_end`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((response) => {
        return response.json();
    })

    // [
    //     "起始時間",
    //     "結束時間",
    //     "口服1,口服2",
    //     "調劑台,調劑台"
    // ]
    return temp_data;
}
async function get_datas_by_rx_time_st_end_transactions(data) {
    let temp_data = await fetch(`${api_ip}api/transactions/get_datas_by_rx_time_st_end`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((response) => {
        return response.json();
    })

    // [
    //     "起始時間",
    //     "結束時間",
    //     "口服1,口服2",
    //     "調劑台,調劑台"
    // ]

    return temp_data;
}
async function get_datas_by_op_time_st_end_consumption(data) {
    let temp_data = await fetch(`${api_ip}api/consumption/serch_datas_by_ST_END`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    .then((response) => {
        return response.json();
    })

    // [
    //     "起始時間",
    //     "結束時間",
    //     "口服1,口服2",
    //     "調劑台,調劑台"
    // ]

    return temp_data;
}
async function download_datas_excel(data, start_date, end_date)
{
    // {
    //     "Data": {},
    //     "ValueAry" : 
    //     [
    //       "藥碼",
    //       "起始時間",
    //       "結束時間",
    //       "口服1,口服2",
    //       "調劑台,調劑台"
    //     ]
    //   }
    try {
        const response = await fetch(`${api_ip}api/transactions/download_datas_excel`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( {
            "Data": data,
            "ValueAry" : []
          }),
        });

        if (!response.ok) {
        throw new Error('Failed to fetch the Excel file.');
        }

        const blob = await response.blob();
        const _url = window.URL.createObjectURL(blob);

        // 创建下载链接
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.download = `${start_date}-${end_date}交易紀錄.xlsx`;
        downloadLink.click();
    } catch (error) {
        console.error(error);
    }
}
async function download_cdmis_datas_excel(data)
{
    // {
    //     "Data": {},
    //     "ValueAry" : 
    //     [
    //       "藥碼",
    //       "起始時間",
    //       "結束時間",
    //       "口服1,口服2",
    //       "調劑台,調劑台"
    //     ]
    //   }
    try {
        const response = await fetch(`${api_ip}api/transactions/download_cdmis_datas_excel`, {
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
        if(data.ValueAry[0].includes(',')) {
            downloadLink.download = `多項藥品結存報表.xlsx`;
        } else {
            downloadLink.download = `${data.ValueAry[0]}結存報表.xlsx`;
        }
        downloadLink.click();
    } catch (error) {
        console.error(error);
    }
}
async function download_datas_excel_by_serch(data)
{
    // {
    //     "Data": {},
    //     "ValueAry" : 
    //     [
    //       "起始時間",
    //       "結束時間",
    //       "口服1,口服2",
    //       "調劑台,調劑台"
    //     ]
    //   }
    try {
        const response = await fetch(`${api_ip}api/consumption/download_datas_excel_by_serch`, {
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
        downloadLink.download = `${data.ValueAry[0]}結存報表.xlsx`;
        downloadLink.click();
    } catch (error) {
        console.error(error);
    }
}