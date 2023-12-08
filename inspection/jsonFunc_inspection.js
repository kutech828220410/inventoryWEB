var ServerName = "";
var ServerType = "";
var TableName = "";
var DeviceTableName = "";

//#region  API inspection
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
    "ServerName" : ServerName,
    "ServerType" : ServerType,
    "TableName" : TableName,
    "TimeTaken": ""
  };
  var _url = `${inspection_url}/creat_get_by_CT_TIME`;
  console.log(`Url [${arguments.callee.name}]` , _url);
  console.log(`Post_data [${arguments.callee.name}]`,post_data);
  let response = await postDataToAPI(`${_url}`,post_data);
  return response;
}
async function creat_get_by_CT_TIME_S(date)
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
    "ServerName" : ServerName,
    "ServerType" : ServerType,
    "TableName" : TableName,
    "TimeTaken": ""
  };
  var _url = `${inspection_url}/creat_get_by_CT_TIME_S`;
  console.log(`Url [${arguments.callee.name}]` , _url);
  console.log(`Post_data [${arguments.callee.name}]`,post_data);
  let response = await postDataToAPI(`${_url}`,post_data);
  return response;
}


async function creat_update_startime_by_IC_SN(ICSN)
{
  const post_data = 
  {
    "Data": {
      "GUID": null,
      "IC_SN": `${ICSN}`,
      "CT": null,
      "CT_TIME": null,
      "START_TIME": null,
      "END_TIME": null,
      "STATE": null,
      "Contents": []
    },
    "Code": 0,
    "Result": "",
    "Value": ``,
    "ServerName" : ServerName,
    "ServerType" : ServerType,
    "TableName" : TableName,
    "TimeTaken": ""
  };
  var _url = `${inspection_url}/creat_update_startime_by_IC_SN`;
  console.log(`Url [${arguments.callee.name}]` , _url);
  console.log(`Post_data [${arguments.callee.name}]`,post_data);
  let response = await postDataToAPI(`${_url}`,post_data);
  return response;
}
async function creat_get_by_CT_TIME_ST_END(date_ST,date_END)
{
  const post_data = 
  {
    "Data": {
      "GUID": null,
      "IC_SN": null,
      "CT": null,
      "CT_TIME": null,
      "START_TIME": null,
      "END_TIME": null,
      "STATE": null,
      "Contents": []
    },
    "Code": 0,
    "Result": "",
    "Value": `${date_ST},${date_END}`,
    "ServerName" : ServerName,
    "ServerType" : ServerType,
    "TableName" : TableName,
    "TimeTaken": ""
  };
  var _url = `${inspection_url}/creat_get_by_CT_TIME_ST_END`;
  console.log(`Url [${arguments.callee.name}]` , _url);
  console.log(`Post_data [${arguments.callee.name}]`,post_data);
  let response = await postDataToAPI(`${_url}`,post_data);
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
    "ServerName" : ServerName,
    "ServerType" : ServerType,
    "TableName" : TableName,
    "TimeTaken": ""
  };
  var _url = `${inspection_url}/creat_get_by_IC_SN`;
  console.log(`Url [${arguments.callee.name}]` , _url);
  console.log(`Post_data [${arguments.callee.name}]`,post_data);
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
    "ServerName" : ServerName,
    "ServerType" : ServerType,
    "TableName" : TableName,
    "TimeTaken": ""
  };
  var _url = `${inspection_url}/creat_delete_by_IC_SN`;
  console.log(`Url [${arguments.callee.name}]` , _url);
  console.log(`Post_data [${arguments.callee.name}]`,post_data);
  let response = await postDataToAPI(`${_url}`,post_data);
  await postDataToAPI_NoneReturn(`${MessageAPI_url}`,response);
  return response;
}
async function creat_lock_by_IC_SN(IC_SN)
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
    "ServerName" : ServerName,
    "ServerType" : ServerType,
    "TableName" : TableName,
    "TimeTaken": ""
  };
  var _url = `${inspection_url}/creat_lock_by_IC_SN`;
  console.log(`Url [${arguments.callee.name}]` , _url);
  console.log(`Post_data [${arguments.callee.name}]`,post_data);
  let response = await postDataToAPI(`${_url}`,post_data);
  await postDataToAPI_NoneReturn(`${MessageAPI_url}`,response);
  return response;
}
async function creat_unlock_by_IC_SN(IC_SN)
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
    "ServerName" : ServerName,
    "ServerType" : ServerType,
    "TableName" : TableName,
    "TimeTaken": ""
  };
  var _url = `${inspection_url}/creat_unlock_by_IC_SN`;
  console.log(`Url [${arguments.callee.name}]` , _url);
  console.log(`Post_data [${arguments.callee.name}]`,post_data);
  let response = await postDataToAPI(`${_url}`,post_data);
  await postDataToAPI_NoneReturn(`${MessageAPI_url}`,response);
  return response;
}
async function creat_auto_add(IC_NAME , CT)
{
  const post_data = 
  {
    "Data": {
      "GUID": null,
      "IC_SN": null,
      "CT": `${CT}`,
      "CT_TIME": null,
      "START_TIME": null,
      "END_TIME": null,
      "STATE": null,
      "IC_NAME" : `${IC_NAME}`,
      "Contents": []
    },
    "Code": 0,
    "TableName":`${BalsicDeviceTableName}`,
    "Result": "",
    "Value": "",
    "ServerName" : ServerName,
    "ServerType" : ServerType,
    "TableName" : TableName,
    "TimeTaken": ""
  };
  var _url = `${inspection_url}/creat_auto_add`;
  console.log(`Url [${arguments.callee.name}]` , _url);
  console.log(`Post_data [${arguments.callee.name}]`,post_data);
  let response = await postDataToAPI(`${_url}`,post_data);
  await postDataToAPI_NoneReturn(`${MessageAPI_url}`,response);
  return response;
}
async function content_get_by_content_GUID(_GUID)
{
  const post_data = 
  {
    "Data": {
      "GUID": `${_GUID}`,
   
    },
    "Master_GUID": 0,
    "TableName":`${BalsicDeviceTableName}`,
    "Result": "",
    "Value": "",
    "ServerName" : ServerName,
    "ServerType" : ServerType,
    "TableName" : TableName,
    "TimeTaken": ""
  };
  var _url = `${inspection_url}/content_get_by_content_GUID`;
  console.log(`Url [${arguments.callee.name}]` , _url);
  console.log(`Post_data [${arguments.callee.name}]`,post_data);
  let response = await postDataToAPI(`${_url}`,post_data);
  await postDataToAPI_NoneReturn(`${MessageAPI_url}`,response);
  return response;
}

async function sub_content_get_by_content_GUID(_GUID)
{
  const post_data = 
  {
    "Data": {
      "GUID": `${_GUID}`,

    },
    "Master_GUID": 0,
    "TableName":`${BalsicDeviceTableName}`,
    "Result": "",
    "Value": "",
    "ServerName" : ServerName,
    "ServerType" : ServerType,
    "TableName" : TableName,
    "TimeTaken": ""
  };
  var _url = `${inspection_url}/sub_content_get_by_content_GUID`;
  console.log(`Url [${arguments.callee.name}]` , _url);
  console.log(`Post_data [${arguments.callee.name}]`,post_data);
  console.log(post_data)
  let response = await postDataToAPI(`${_url}`,post_data);
  return response;
}

async function sub_content_add_single(_Master_GUID, _END_QTY, _OP , _VAL,_LOT)
{
  const post_data = 
  {
    "Data": {
      "Master_GUID": `${_Master_GUID}`,
      "END_QTY": `${_END_QTY}`,
      "OP": `${_OP}`,
      "VAL": `${_VAL}`,
      "LOT": `${_LOT}`
    },
    "Master_GUID": 0,
    "TableName":``,
    "Result": "",
    "Value": "",
    "ServerName" : ServerName,
    "ServerType" : ServerType,
    "TableName" : TableName,
    "TimeTaken": ""
  };
  var _url = `${inspection_url}/sub_content_add_single`;
  console.log(`Url [${arguments.callee.name}]` , _url);
  console.log(`Post_data [${arguments.callee.name}]`,post_data);
  let response = await postDataToAPI(`${_url}`,post_data);
  return response;
}
async function sub_content_add(_Master_GUID, _END_QTY, _OP, _VAL,_LOT)
{
  const post_data = 
  {
    "Data": {
      "Master_GUID": `${_Master_GUID}`,
      "END_QTY": `${_END_QTY}`,
      "OP": `${_OP}`,
      "VAL": `${_VAL}`,
      "LOT": `${_LOT}`
    },
    "Master_GUID": 0,
    "TableName":``,
    "Result": "",
    "Value": "",
    "ServerName" : ServerName,
    "ServerType" : ServerType,
    "TableName" : TableName,
    "TimeTaken": ""
  };
  var _url = `${inspection_url}/sub_content_add`;
  console.log(`Url [${arguments.callee.name}]` , _url);
  console.log(`Post_data [${arguments.callee.name}]`,post_data);
  let response = await postDataToAPI(`${_url}`,post_data);
  await postDataToAPI_NoneReturn(`${MessageAPI_url}`,response);
  return response;
}
async function sub_contents_delete_by_GUID(_GUID, Master_GUID)
{
  const post_data = 
  {
    "Data": [{
      "GUID": `${_GUID}`,
      "Master_GUID" : `${Master_GUID}`
    }],
    "Master_GUID": 0,
    "TableName":``,
    "Result": "",
    "Value": "",
    "ServerName" : ServerName,
    "ServerType" : ServerType,
    "TableName" : TableName,
    "TimeTaken": ""
  };
  var _url = `${inspection_url}/sub_contents_delete_by_GUID`;
  console.log(`Url [${arguments.callee.name}]` , _url);
  console.log(`Post_data [${arguments.callee.name}]`,post_data);
  let response = await postDataToAPI(`${_url}`,post_data);
  await postDataToAPI_NoneReturn(`${MessageAPI_url}`,response);
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
    "ServerName" : ServerName,
    "ServerType" : ServerType,
    "TableName" : TableName,
    "TimeTaken": ""
  };
  var _url = `${inspection_url}/download_excel_by_IC_SN`;
  console.log(`Url [${arguments.callee.name}]` , _url);
  console.log(`Post_data [${arguments.callee.name}]`,post_data);
  await downloadExcel(_url,post_data, `${IC_SN}_驗收單`);
}
//#endregion
//#region API Device
async function device_all()
{

  const post_data = 
  {
    "Data": {
      "GUID": null,
      "IC_SN": null,
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
    "ServerName" : ServerName,
    "ServerType" : ServerType,
    "TableName" : TableName,
    "TimeTaken": ""
  };

  var _url = `${device_url}/all`;
  console.log(`Url [${arguments.callee.name}]` , _url);
  console.log(`Post_data [${arguments.callee.name}]`,post_data);
  let response = await postDataToAPI(`${_url}`,post_data);
  console.log("response",response);
  return response;
}
async function device_light(Color, device_basic)
{
  const post_data = 
  {
    "Data": device_basic,
    "Master_GUID": 0,
    "TableName":``,
    "Result": "",
    "Value": Color,
    "ServerName" : ServerName,
    "ServerType" : ServerType,
    "TableName" : TableName,
    "TimeTaken": ""
  };
  var _url = `${device_url}/light_web`;
  console.log(`Url [${arguments.callee.name}]` , _url);
  console.log(`Post_data [${arguments.callee.name}]`,post_data);
  let response = await postDataToAPI(`${_url}`,post_data);
  return response;
}

async function excel_upload(file, IC_NAME, PON, CT , API_inspection_excel_upload) 
{

  const formData = new FormData();
  formData.append('file', file);
  formData.append('IC_NAME', IC_NAME);
  formData.append('PON', PON);
  formData.append('CT', CT);
  console.log("excel_upload" , `${API_inspection_excel_upload}`);
  console.log("post_data [excel_upload]",formData);
  try {
    const response = await fetch(`${API_inspection_excel_upload}`, {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      const result = await response.json();
      console.log(result); // 处理返回的结果
    } else {
      console.error('请求失败');
    }
  } catch (error) {
    console.error('请求出错', error);
  }
}

//#endregion