var Server = "127.0.0.1";
var DbName = "";

async function serch(CODE, start_time, end_time)
{
  var _value = '';
  if(CODE == null)
  {
    return null;
  }
  if(start_time == null || end_time == null)
  {
    _value = `${CODE}`;
  }
  else
  {
    _value = `${CODE},${start_time},${end_time}`;
  }
  const post_data = 
  {
    "Data": {},
    "Code": 0,
    "Server":`${Server}`,
    "DbName":`${DbName}`,
    "Result": "",
    "Value": `${_value}`,
    "TimeTaken": ""
  };
  let response = await postDataToAPI(`${transactions_url}/serch`,post_data);
  return response;
}
async function serch_med_information_by_code(CODE)
{
 

  const post_data = 
  {
    "Data": {},
    "Code": 0,
    "Server":`${Server}`,
    "DbName":`${DbName}`,
    "Result": "",
    "Value": `${CODE}`,
    "TimeTaken": ""
  };
  let response = await postDataToAPI(`${transactions_url}/serch_med_information_by_code`,post_data);
  return response;
}

async function download_excel_by_serch(CODE, start_time, end_time)
{
  var _value = '';
  if(CODE == null)
  {
    return null;
  }
  if(start_time == null || end_time == null)
  {
    _value = `${CODE}`;
  }
  else
  {
    _value = `${CODE},${start_time},${end_time}`;
  }
  const post_data = 
  {
    "Data": {},
    "Code": 0,
    "Server":`${Server}`,
    "DbName":`${DbName}`,
    "Result": "",
    "Value": `${_value}`,
    "TimeTaken": ""
  };
  var _url = `${transactions_url}/download_excel_by_serch`;
  console.log("post_data",post_data)
  await downloadExcel(_url,post_data, `${CODE}_管制結存`);
}
