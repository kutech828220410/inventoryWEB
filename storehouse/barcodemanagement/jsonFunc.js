var ServerName = "";
var ServerType = "";
var TableName = "";
var DeviceTableName = "";

//#region  API inventory
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
  let response = await postDataToAPI(`${inventory_url}/creat_get_by_CT_TIME`,post_data);
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
  let response = await postDataToAPI(`${inventory_url}/creat_get_by_CT_TIME`,post_data);
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
  console.log("post_data",post_data);
  let response = await postDataToAPI(`${inventory_url}/creat_update_startime_by_IC_SN`,post_data);
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
  console.log("post_data",post_data);
  let response = await postDataToAPI(`${inventory_url}/creat_get_by_CT_TIME_ST_END`,post_data);
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
  var _url = `${inventory_url}/creat_get_by_IC_SN`;
  console.log("creat_get_by_IC_SN" , _url);
  console.log("post_data",post_data);
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
  var _url = `${inventory_url}/creat_delete_by_IC_SN`;
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
  var _url = `${inventory_url}/creat_lock_by_IC_SN`;
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
  var _url = `${inventory_url}/creat_unlock_by_IC_SN`;
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
  var _url = `${inventory_url}/creat_auto_add`;
  console.log("post_data",post_data)
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
  var _url = `${inventory_url}/content_get_by_content_GUID`;
  console.log("post_data",post_data)
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
  var _url = `${inventory_url}/sub_content_get_by_content_GUID`;
  console.log(post_data)
  let response = await postDataToAPI(`${_url}`,post_data);
  return response;
}

async function sub_content_add_single(_Master_GUID, _END_QTY, _OP)
{
  const post_data = 
  {
    "Data": {
      "Master_GUID": `${_Master_GUID}`,
      "END_QTY": `${_END_QTY}`,
      "OP": `${_OP}`
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
  var _url = `${inventory_url}/sub_content_add_single`;
  console.log("post_data",post_data)
  let response = await postDataToAPI(`${_url}`,post_data);
  return response;
}
async function sub_content_add(_Master_GUID, _END_QTY, _OP)
{
  const post_data = 
  {
    "Data": {
      "Master_GUID": `${_Master_GUID}`,
      "END_QTY": `${_END_QTY}`,
      "OP": `${_OP}`
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
  var _url = `${inventory_url}/sub_content_add`;
  console.log("post_data",post_data);
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
  var _url = `${inventory_url}/sub_contents_delete_by_GUID`;
  console.log("post_data",post_data)
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
  var _url = `${inventory_url}/download_excel_by_IC_SN`;
  console.log("post_data",post_data)
  await downloadExcel(_url,post_data, `${IC_SN}_盤點管理`);
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
  console.log("post_data",post_data)
  let response = await postDataToAPI(`${_url}`,post_data);
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
  var _url = `${device_url}/light`;
  console.log("post_data",post_data)
  let response = await postDataToAPI(`${_url}`,post_data);
  return response;
}
//#endregion