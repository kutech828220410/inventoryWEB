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
    "TableName" : "medicine_page_cloud",
    "DbName" : "dbvm",
    "TimeTaken": ""
  };
  console.log("post_data",post_data);
  let response = await postDataToAPI(`${MED_page_url}/serch_by_BarCode`,post_data);
  return response;
}
//#endregion