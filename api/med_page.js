//取得雲端藥檔資料
async function get_medicine_cloud()
{
  const post_data = 
  {
    "Data": {

    },
    "Code": 0,
    "Result": "",
    "Value": "",
    "ServerName" : "Main",
    "ServerType" : "網頁",
    "TableName" : "medicine_page_cloud",
    "DbName" : "dbvm",
    "TimeTaken": ""
  };
  const _url = `${MED_page_url}/get_by_apiserver`;
  console.log(`Url [${arguments.callee.name}]` , _url);
  console.log(`Post_data [${arguments.callee.name}]`,post_data);
  let response = await postDataToAPI(_url,post_data);
  return response;
}

async function serch_by_BarCode(barcode , _medicine_page)
{
  if(_medicine_page == undefined) return; 
  var post_data = 
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
  // console.log("_medicine_page",_medicine_page);
  var foundObject =[];
  if(barcode != "")
  {
    barcode = barcode.toUpperCase();
    for(var i = 0; i < _medicine_page.length; i++)
    {
       const item = _medicine_page[i];
       if(item.CODE.toUpperCase() == barcode)
       {
         foundObject.push(item);
         continue;
       }
       if(item.SKDIACODE.toUpperCase() == barcode)
       {
         foundObject.push(item);
         continue;
       }
       for(var k = 0; k < item.BARCODE.length; k++)
       {
         if(item.BARCODE[k].toUpperCase() == barcode)
         {
            foundObject.push(item);
            continue;
         }
       }
    }
  }
  
  post_data.Data = foundObject;
  console.log(`Post_data [${arguments.callee.name}]`,post_data);
  return post_data;
}