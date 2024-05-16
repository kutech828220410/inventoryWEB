var ServerName = "";
var ServerType = "";
var TableName = "";
var DeviceTableName = "";

async function serch_by_ST_END(start_time, end_time)
{
  const post_data = 
  {
    "Data": {},
    "Code": 0,
    "ServerName" : ServerName,
    "ServerType" : ServerType,
    "TableName" : TableName,
    "Result": "",
    "Value": `${start_time},${end_time}`,
    "TimeTaken": ""
  };
  var _url = `${consumption_url}/serch_by_ST_END`;
  let response = await postDataToAPI(_url,post_data);
  console.log(`Url [${arguments.callee.name}]` , _url);
  console.log(`Post_data [${arguments.callee.name}]`,post_data);
  return response;
}


async function download_excel_by_serch(start_time, end_time)
{

  const post_data = 
  {
    "Data": {},
    "Code": 0,
    "ServerName" : ServerName,
    "ServerType" : ServerType,
    "TableName" : TableName,
    "Result": "",
    "Value": `${start_time},${end_time}`,
    "TimeTaken": ""
  };
  var _url = `${consumption_url}/download_excel_by_serch`;
  await downloadExcel(_url,post_data, `${getDateStr()}_交易量`);
  console.log(`Url [${arguments.callee.name}]` , _url);
  console.log(`Post_data [${arguments.callee.name}]`,post_data);
}
