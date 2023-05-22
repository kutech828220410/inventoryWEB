async function creat_get_by_CT_TIME(date)
{
  const post_data = 
  {
    "Data": {
      "GUID": null,
      "IC_SN": null,
      "CT": null,
      "CT_TIME": `${date}`,
      "START_TIME": null,
      "END_TIME": null,
      "STATE": null,
      "Contents": []
    },
    "Code": 0,
    "Result": "",
    "Value": "",
    "TimeTaken": ""
  };
  let response = await postDataToAPI(`${inventory_url}/creat_get_by_CT_TIME`,post_data);
  return response;
}
async function creat_get_by_CT_TIME_L(date)
{
  const post_data = 
  {
    "Data": {
      "GUID": null,
      "IC_SN": null,
      "CT": null,
      "CT_TIME": `${date}`,
      "START_TIME": null,
      "END_TIME": null,
      "STATE": null,
      "Contents": []
    },
    "Code": 0,
    "Result": "",
    "Value": "1",
    "TimeTaken": ""
  };
  let response = await postDataToAPI(`${inventory_url}/creat_get_by_CT_TIME`,post_data);
  return response;
}


async function creat_get_by_IC_SN(IC_SN)
{
  const post_data = 
  {
    "Data": {
      "GUID": null,
      "IC_SN": `${IC_SN}`,
      "CT": null,
      "CT_TIME": null,
      "START_TIME": null,
      "END_TIME": null,
      "STATE": null,
      "Contents": []
    },
    "Code": 0,
    "Result": "",
    "Value": "",
    "TimeTaken": ""
  };
  var _url = `${inventory_url}/creat_get_by_IC_SN`;
  console.log(_url)
  let response = await postDataToAPI(`${_url}`,post_data);
  return response;
}
async function creat_delete_by_IC_SN(IC_SN)
{
  const post_data = 
  {
    "Data": {
      "GUID": null,
      "IC_SN": `${IC_SN}`,
      "CT": null,
      "CT_TIME": null,
      "START_TIME": null,
      "END_TIME": null,
      "STATE": null,
      "Contents": []
    },
    "Code": 0,
    "Result": "",
    "Value": "",
    "TimeTaken": ""
  };
  var _url = `${inventory_url}/creat_delete_by_IC_SN`;
  console.log(_url)
  let response = await postDataToAPI(`${_url}`,post_data);
  return response;
}
async function GET_creat_add()
{
  var _url = `${inventory_url}/creat_add?TableName=${BalsicDeviceTableName}`;
  console.log(_url)
  let response = await getDataFromAPI(`${_url}`);
  return response;
}

async function download_excel_by_IC_SN(IC_SN)
{
  const post_data = 
  {
    "Data": {
      "GUID": null,
      "IC_SN": `${IC_SN}`,
      "CT": null,
      "CT_TIME": null,
      "START_TIME": null,
      "END_TIME": null,
      "STATE": null,
      "Contents": []
    },
    "Code": 0,
    "Result": "",
    "Value": "",
    "TimeTaken": ""
  };
  var _url = `${inventory_url}/download_excel_by_IC_SN`;
  console.log(_url)
  await downloadExcel(_url,post_data, `${IC_SN}_盤點管理`);
}