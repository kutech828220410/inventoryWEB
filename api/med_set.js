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