var ServerName = "";
var ServerType = "";
var TableName = "";
var DeviceTableName = "";
var DbName = "";
//#region  API inventory
async function get_by_apiserver()
{
  const post_data = 
  {
    "Data": {

    },
    "Code": 0,
    "Result": "",
    "Value": "",
    "ServerName" : ServerName,
    "ServerType" : ServerType,
    "TableName" : TableName,
    "DbName" : DbName,
    "TimeTaken": ""
  };
  console.log("post_data",post_data);
  let response = await postDataToAPI(`${MED_page_url}/get_by_apiserver`,post_data);
  return response;
}
async function upadte_by_guid(Meds)
{
  const post_data = 
  {
    "Data": Meds,
    "Code": 0,
    "Result": "",
    "Value": "",
    "ServerName" : ServerName,
    "ServerType" : ServerType,
    "TableName" : TableName,
    "DbName" : DbName,
    "TimeTaken": ""
  };
  console.log("post_data",post_data);
  let response = await postDataToAPI(`${MED_page_url}/upadte_by_guid`,post_data);
  await postDataToAPI_NoneReturn(`${MessageAPI_url}`,response);

  return response;
}
async function serch_by_BarCode(barcode)
{
  const post_data = 
  {
    "Data": {

    },
    "Code": 0,
    "Result": "",
    "Value": barcode,
    "ServerName" : ServerName,
    "ServerType" : ServerType,
    "TableName" : TableName,
    "DbName" : DbName,
    "TimeTaken": ""
  };
  console.log("post_data",post_data);
  let response = await postDataToAPI(`${MED_page_url}/serch_by_BarCode`,post_data);
  return response;
}
async function device_sort_by_ip(ip)
{
  const post_data = 
  {
    "Data": [],
    "Master_GUID": 0,
    "TableName":``,
    "Result": "",
    "Value": ip,
    "ServerName" : ServerName,
    "ServerType" : ServerType,
    "TableName" : TableName,
    "TimeTaken": ""
  };
  var _url = `${device_url}/sort_by_ip`;
  console.log(`Url [${arguments.callee.name}]` , _url);
  console.log(`Post_data [${arguments.callee.name}]`,post_data);
  let response = await postDataToAPI(`${_url}`,post_data);
  return response;
}
async function device_all_storage()
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
    "TableName" : "storage",
    "TimeTaken": ""
  };

  var _url = `${device_url}/all`;
  console.log(`Url [${arguments.callee.name}]` , _url);
  console.log(`Post_data [${arguments.callee.name}]`,post_data);
  let response = await postDataToAPI(`${_url}`,post_data);
  return response;
}
//#endregion