// 此函式用於從 API 中取得盤點單，以建表日期（CT_TIME）作為條件
// 引數 date: 要作為查詢條件的建表日期（CT_TIME）
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
    "ServerName" : "",
    "ServerType" : "網頁",
    "TableName" : "",
    "TimeTaken": ""
  };
  var _url = `${inspection_url}/creat_get_by_CT_TIME`;
  console.log(`Url [${arguments.callee.name}]` , _url);
  console.log(`Post_data [${arguments.callee.name}]`,post_data);
  let response = await postDataToAPI(`${_url}`,post_data);
  return response;
}
// 此函式用於從 API 中取得盤點單，以建表日期（CT_TIME_S）作為條件
// 引數 date: 要作為查詢條件的建表日期（CT_TIME_S）
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
    "ServerName" : "",
    "ServerType" : "網頁",
    "TableName" : "",
    "TimeTaken": ""
  };
  var _url = `${inspection_url}/creat_get_by_CT_TIME_S`;
  console.log(`Url [${arguments.callee.name}]` , _url);
  console.log(`Post_data [${arguments.callee.name}]`,post_data);
  let response = await postDataToAPI(`${_url}`,post_data);
  return response;
}
// 此函式用於更新盤點單的開始時間（START_TIME）以及其他相關資訊，根據盤點單號（ICSN）
// 引數 ICSN: 盤點單號，用來識別要更新的盤點單
async function creat_update_startime_by_IC_SN(ICSN)
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
    "Value": `${ICSN}`,
    "ServerName" : "",
    "ServerType" : "網頁",
    "TableName" : "",
    "TimeTaken": ""
  };
  var _url = `${inspection_url}/creat_update_startime_by_IC_SN`;
  console.log(`Url [${arguments.callee.name}]` , _url);
  console.log(`Post_data [${arguments.callee.name}]`,post_data);
  let response = await postDataToAPI(`${_url}`,post_data);
  return response;
}
// 此函式用於按照時間區段搜尋符合建表日期內的盤點單
// 引數 date_ST: 搜尋的時間區段的起始日期
// 引數 date_END: 搜尋的時間區段的結束日期
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
    "ServerName" : "",
    "ServerType" : "網頁",
    "TableName" : "",
    "TimeTaken": ""
  };
  var _url = `${inspection_url}/creat_get_by_CT_TIME_ST_END`;
  console.log(`Url [${arguments.callee.name}]` , _url);
  console.log(`Post_data [${arguments.callee.name}]`,post_data);
  let response = await postDataToAPI(`${_url}`,post_data);
  return response;
}
// 此函式用於按照建表序號（IC_SN）取得完整的盤點單資訊
// 引數 IC_SN: 要取得盤點單的建表序號
async function creat_get_by_IC_SN(IC_SN)
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
    "Value": `${IC_SN}`,
    "ServerName" : "",
    "ServerType" : "網頁",
    "TableName" : "",
    "TimeTaken": ""
  };
  var _url = `${inspection_url}/creat_get_by_IC_SN`;
  console.log(`Url [${arguments.callee.name}]` , _url);
  console.log(`Post_data [${arguments.callee.name}]`,post_data);
  let response = await postDataToAPI(`${_url}`,post_data);
  return response;
}
// 此函式用於依據輸入的名稱快速建立一個盤點單
// 引數 name: 要建立的盤點單的名稱
async function creat_quick_add(name)
{
  const post_data = 
  {
    "Data": {
      "GUID": null,
      "IC_SN": ``,
      "CT": null,
      "CT_TIME": null,
      "START_TIME": null,
      "END_TIME": null,
      "STATE": null,
      "Contents": []
    },
    "Code": 0,
    "Result": "",
    "Value": name,
    "ServerName" : "",
    "ServerType" : "網頁",
    "TableName" : "",
    "TimeTaken": ""
  };
  var _url = `${inspection_url}/creat_quick_add`;
  console.log(`Url [${arguments.callee.name}]` , _url);
  console.log(`Post_data [${arguments.callee.name}]`,post_data);
  let response = await postDataToAPI(`${_url}`,post_data);
  return response;
}
// 此函式用於依據盤點單序號（IC_SN）刪除盤點單
// 引數 IC_SN: 要刪除的盤點單的序號
async function creat_delete_by_IC_SN(IC_SN)
{
  const post_data = 
  {
    "Data": {

    },
    "Code": 0,
    "Result": "",
    "Value": `${IC_SN}`,
    "ServerName" : "",
    "ServerType" : "網頁",
    "TableName" : "",
    "TimeTaken": ""
  };
  var _url = `${inspection_url}/creat_delete_by_IC_SN`;
  console.log(`Url [${arguments.callee.name}]` , _url);
  console.log(`Post_data [${arguments.callee.name}]`,post_data);
  let response = await postDataToAPI(`${_url}`,post_data);
  await postDataToAPI_NoneReturn(`${MessageAPI_url}`,response);
  return response;
}
// 此函式用於根據盤點單序號（IC_SN）取得盤點單是否鎖定的資訊
// 引數 IC_SN: 要查詢的盤點單序號
async function get_creat_Islocked_by_IC_SN(IC_SN)
{
  const post_data = 
  {
    "Data": {
   
    },
    "Code": 0,
    "Result": "",
    "Value": IC_SN,
    "ServerName" : "",
    "ServerType" : "網頁",
    "TableName" : "",
    "TimeTaken": ""
  };
  var _url = `${inspection_url}/get_creat_Islocked_by_IC_SN`;
  // console.log(`Url [${arguments.callee.name}]` , _url);
  // console.log(`Post_data [${arguments.callee.name}]`,post_data);
  let response = await postDataToAPI(`${_url}`,post_data);
  return response;
}
// 此函式用於根據盤點單序號（IC_SN）將盤點單鎖定
// 引數 IC_SN: 要鎖定的盤點單序號
async function creat_lock_by_IC_SN(IC_SN)
{
  const post_data = 
  {
    "Data": {
 
    },
    "Code": 0,
    "Result": "",
    "Value": `${IC_SN}`,
    "ServerName" : "",
    "ServerType" : "網頁",
    "TableName" : "",
    "TimeTaken": ""
  };
  var _url = `${inspection_url}/creat_lock_by_IC_SN`;
  console.log(`Url [${arguments.callee.name}]` , _url);
  console.log(`Post_data [${arguments.callee.name}]`,post_data);
  let response = await postDataToAPI(`${_url}`,post_data);
  await postDataToAPI_NoneReturn(`${MessageAPI_url}`,response);
  return response;
}
// 此函式用於根據盤點單序號（IC_SN）將盤點單解鎖
// 引數 IC_SN: 要解鎖的盤點單序號
async function creat_unlock_by_IC_SN(IC_SN)
{
  const post_data = 
  {
    "Data": {

    },
    "Code": 0,
    "Result": "",
    "Value": `${IC_SN}`,
    "ServerName" : "",
    "ServerType" : "網頁",
    "TableName" : "",
    "TimeTaken": ""
  };
  var _url = `${inspection_url}/creat_unlock_by_IC_SN`;
  console.log(`Url [${arguments.callee.name}]` , _url);
  console.log(`Post_data [${arguments.callee.name}]`,post_data);
  let response = await postDataToAPI(`${_url}`,post_data);
  await postDataToAPI_NoneReturn(`${MessageAPI_url}`,response);
  return response;
}
// 此函式用於根據輸入的盤點名稱（IC_NAME）和操作人（CT）建立盤點單
// 引數 IC_NAME: 盤點名稱
// 引數 CT: 操作人
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
    "ServerName" : "",
    "ServerType" : "網頁",
    "TableName" : "",
    "TimeTaken": ""
  };
  var _url = `${inspection_url}/creat_auto_add`;
  console.log(`Url [${arguments.callee.name}]` , _url);
  console.log(`Post_data [${arguments.callee.name}]`,post_data);
  let response = await postDataToAPI(`${_url}`,post_data);
  await postDataToAPI_NoneReturn(`${MessageAPI_url}`,response);
  return response;
}
// 此函式用於根據唯一識別碼（GUID）取得盤點單內的單個藥品明細
// 引數 _GUID: 要查詢的藥品明細的唯一識別碼
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
    "ServerName" : "",
    "ServerType" : "網頁",
    "TableName" : "",
    "TimeTaken": ""
  };
  var _url = `${inspection_url}/content_get_by_content_GUID`;
  console.log(`Url [${arguments.callee.name}]` , _url);
  console.log(`Post_data [${arguments.callee.name}]`,post_data);
  let response = await postDataToAPI(`${_url}`,post_data);
  await postDataToAPI_NoneReturn(`${MessageAPI_url}`,response);
  return response;
}
// 此函式用於根據唯一識別碼（GUID）取得單個藥品明細內的盤點明細資訊
// 引數 _GUID: 要查詢的藥品明細的唯一識別碼
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
    "ServerName" : "",
    "ServerType" : "網頁",
    "TableName" : "",
    "TimeTaken": ""
  };
  var _url = `${inspection_url}/sub_content_get_by_content_GUID`;
  console.log(`Url [${arguments.callee.name}]` , _url);
  console.log(`Post_data [${arguments.callee.name}]`,post_data);
  let response = await postDataToAPI(`${_url}`,post_data);
  return response;
}
// 此函式用於取得所有已解鎖的盤點單
async function get_all_unlock_creat()
{
  const post_data = 
  {
    "Data": {
      

    },
    "Master_GUID": 0,
    "TableName":``,
    "Result": "",
    "Value": "",
    "ServerName" : "",
    "ServerType" : "網頁",
    "TableName" : "",
    "TimeTaken": ""
  };
  var _url = `${inspection_url}/get_all_unlock_creat`;
  console.log(`Url [${arguments.callee.name}]` , _url);
  console.log(`Post_data [${arguments.callee.name}]`,post_data);
  let response = await postDataToAPI(`${_url}`,post_data);
  return response;
}
// 此函式用於新增單個藥品的盤點明細
// 引數 _Master_GUID: 上層盤點單的GUID識別碼
// 引數 _END_QTY: 藥品的庫存量
// 引數 _OP: 操作人
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
    "ServerName" : "",
    "ServerType" : "網頁",
    "TableName" : "",
    "TimeTaken": ""
  };
  var _url = `${inspection_url}/sub_content_add_single`;
  console.log(`Url [${arguments.callee.name}]` , _url);
  console.log(`Post_data [${arguments.callee.name}]`,post_data);
  let response = await postDataToAPI(`${_url}`,post_data);
  if(response.Code != 200)
  {
    alert("輸入資料失敗,請重新整理");
  }
  return response;
}
// 此函式用於新增單個藥品的盤點明細
// 引數 _Master_GUID: 上層盤點單的GUID識別碼
// 引數 _END_QTY: 藥品的庫存量
// 引數 _OP: 操作人
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
    "ServerName" : "",
    "ServerType" : "網頁",
    "TableName" : "",
    "TimeTaken": ""
  };
  var _url = `${inspection_url}/sub_content_add`;
  console.log(`Url [${arguments.callee.name}]` , _url);
  console.log(`Post_data [${arguments.callee.name}]`,post_data);
  let response = await postDataToAPI(`${_url}`,post_data);
  await postDataToAPI_NoneReturn(`${MessageAPI_url}`,response);
  if(response.Code != 200)
  {
    alert("輸入資料失敗,請重新整理");
    location.reload();
  }
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
    "ServerName" : "",
    "ServerType" : "網頁",
    "TableName" : "",
    "TimeTaken": ""
  };
  var _url = `${inspection_url}/sub_contents_delete_by_GUID`;
  console.log("post_data",post_data)
  let response = await postDataToAPI(`${_url}`,post_data);
  await postDataToAPI_NoneReturn(`${MessageAPI_url}`,response);
  return response;
}
async function download_excel_by_IC_SN(IC_SN, API_inspection_excel_download)
{
  const post_data = 
  {
    "Data": {

    },
    "Code": 0,
    "Result": "",
    "Value": `${IC_SN}`,
    "ServerName" : "",
    "ServerType" : "網頁",
    "TableName" : "",
    "TimeTaken": ""
  };
  var _url = `${API_inspection_excel_download[0].server}`;
  console.log(`Url [${arguments.callee.name}]` , _url);
  console.log(`Post_data [${arguments.callee.name}]`,post_data);
  await downloadExcel(_url, post_data, `${IC_SN}_驗收管理`);
}