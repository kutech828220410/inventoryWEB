async function get_all_medConfig() {
    let temp_data = await fetch(`${api_ip}api/medConfig/get_all`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({"Data":{}}),
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

async function set_medConfig_add(data) {
    let temp_data = await fetch(`${api_ip}api/medConfig/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(  
          {
            Data: data
          }
      ),
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

async function upadte_by_guid(Meds)
{
  const post_data = 
  {
    "Data": Meds,
    "Code": 0,
    "Result": "",
    "Value": "",
    "TableName" : "medicine_page_cloud",
    "TimeTaken": ""
  };
  console.log("post_data",post_data);
  let response = await postDataToAPI(`${api_ip}api/MED_page/upadte_by_guid`,post_data);
  await postDataToAPI_NoneReturn(`${api_ip}api/MED_page`,response);

  return response;
}

async function batch_upload_med_excel(data)
{
    // `${api_ip}api/med_page/excel_upload`
    try {
        const response = await fetch(`${api_ip}api/med_page/excel_upload`, {
        method: 'POST',
        body: data,
        });

        if (!response.ok) {
            throw new Error('Failed to fetch the Excel file.');
        }

        // 解析回傳內容為 JSON
        const result = await response.json();

        return result;
    } catch (error) {
        console.error(error);
        return error;
    }   
}
async function get_ex_excel_download()
{
  try {
    const response = await fetch(`${api_ip}api/med_page/excel_download`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch the Excel file.');
    }

    const blob = await response.blob();
    const _url = window.URL.createObjectURL(blob);

    // 创建下载链接
    let downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(blob);
    downloadLink.download = `範例表格.xlsx`;
    downloadLink.click();
  } catch (error) {
    console.error(error);
  }
}