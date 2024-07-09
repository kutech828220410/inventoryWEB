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

async function get_med_pic_by_code(code) {
  let start_p = performance.now();
  let data = {
      "Data": {},
      "ValueAry" : [code]
  };
  console.log("進入api取得資料");
  // console.log(`${api_ip}api/medPic/get_by_code`);
  let temp_data = await fetch(`${api_ip}api/medPic/get_by_code`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
  })
  .then((response) => {
      console.log("取得資料ＪＳＯＮ格式");
      // console.log(response.json());
      return response.json();
  });
  // console.log(temp_data);

  if(temp_data.Code != -200) {
    console.log("code 200");
    let jpeg_default = "data:image/jpeg;base64,";
    let png_default = "data:image/png;base64,";

    if(temp_data["Data"].pic_base64 != "") {
      if(temp_data["Data"].pic_base64.includes(jpeg_default) || temp_data["Data"].pic_base64.includes(png_default)) {
        
      } else {
        if(temp_data["Data"].extension != undefined) {
          if(temp_data["Data"].extension != "") {
            switch (temp_data["Data"].extension) {
              case "jpg":
                temp_data["Data"].pic_base64 = jpeg_default + temp_data["Data"].pic_base64;
              break;
  
              case "jpeg":
                temp_data["Data"].pic_base64 = jpeg_default + temp_data["Data"].pic_base64;
              break;
  
              case "png":
                temp_data["Data"].pic_base64 = png_default + temp_data["Data"].pic_base64;
              break;
          
              default:
              break;
            }
          } else {
            console.log("沒有定義類型");
            temp_data["Data"].pic_base64 = jpeg_default + temp_data["Data"].pic_base64;
          }
        } else {
          console.log("沒有定義類型");
          temp_data["Data"].pic_base64 = jpeg_default + temp_data["Data"].pic_base64;
        }
      };
    }
  }

  // console.log(temp_data);
  let end_p = performance.now();
  console.log(end_p - start_p); 

  return temp_data;
}