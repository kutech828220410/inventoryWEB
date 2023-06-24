var flag_check_connection_OK = false;
var APIServer = [];

var ipadress1 = 'http://www.ketech.tw:4435';
var ipadress2 = 'http://www.ketech.tw:4436';

var api_ip = `${ipadress1}/`; 
var Chat_url = `${api_ip}chatHub`;
var MessageAPI_url = `${api_ip}api/Message`;
var inventory_url = `${api_ip}api/inventory`;
var transactions_url = `${api_ip}api/transactions`;
var device_url = `${api_ip}api/device`;
var session_url = `${api_ip}api/session`;

async function LoadAPIServer()
{
  const json = await Loadtxt("../../config.txt");
  APIServer =  await getDataFromAPI(`${json.API_Server}/api/ServerSetting`);
  const API_Session = serch_APIServer("Main","網頁" ,"API_Session");
  session_url = `${API_Session[0].server}/api/session`;
  console.log("session_url",session_url);
  return APIServer;
}
function serch_APIServer(name ,type, content)
{
  var temp = APIServer.Data;
  if(name != "") temp  = searchJSON(temp,"name",name);
  if(type != "") temp  = searchJSON(temp,"type",type);
  if(content != "") temp  = searchJSON(temp,"content",content);
  return temp;
}
async function check_ip(ip0 , ip1)
{
    if(flag_check_connection_OK) 
    {
        console.log('flag_check_connection_OK',flag_check_connection_OK);
        return;
    }
    var api_ip_temp;
    if(await pingIP(ip0))
    {
        api_ip_temp = `${ip0}/`;     
        flag_check_connection_OK = true;
    }
    else if(await pingIP(ip1))
    {
        api_ip_temp = `${ip1}/`;     
        flag_check_connection_OK = true;
    }
    if(flag_check_connection_OK)
    {
        console.log("成功設定IP : " ,api_ip_temp);

        inventory_url = `${api_ip_temp}api/inventory`;
        transactions_url = `${api_ip_temp}api/transactions`;
        device_url = `${api_ip_temp}api/device`;
        
        return;
    }
    check_ip(ip0 ,ip1);
}
async function set_ip(flag_api_server)
{
    if(flag_api_server == null ) await LoadAPIServer();
    check_ip(ipadress1 ,ipadress2);
}

async function Set_ChatHub_url()
{
    console.log("Set_ChatHub_url");
    await LoadAPIServer();
    var flag_OK = false;
    const json = await Loadtxt("../../config.txt");
    const json_return =  await getDataFromAPI(`${json.API_Server}/api/ServerSetting`);
    const json_API_Server = searchJSON(json_return.Data,"type","網頁")
    const API01 = searchJSON(json_API_Server,"content","API01");
    const API02 = searchJSON(json_API_Server,"content","API02");
    var api_ip_temp;
    if(await pingIP(API01[0].server))
    {
        api_ip_temp = `${API01[0].server}/`;     
        flag_OK = true;
    }
    else if(await pingIP(API02[0].server))
    {
        api_ip_temp = `${API02[0].server}/`;     
        flag_OK = true;
    }
    if(flag_OK)
    {
        Chat_url = `${api_ip_temp}chatHub`;
        MessageAPI_url = `${api_ip_temp}api/Message`;
    }
}

async function pingIP(ipAddress, timeout = 1000) 
{
    const url = `${ipAddress}/api/test`;
    console.log("getDataFromAPI", url);
  
    const controller = new AbortController();
    const signal = controller.signal;
  
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, timeout);
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        signal: signal
      });
  
      clearTimeout(timeoutId);
  
      if (response.ok) {
        console.log(response);
        return true;
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      console.error(`PING 連結失敗! ${ipAddress}`, error);
      return false;
    }
}



const Enum_Target =
{
    Dept : 'Dept',
    Phar : 'Phar',
}
var Target = Enum_Target.Dept;

const Enum_BasicDeviceTableName = 
{
    Dept: 'firstclass_device_jsonstring',
    Phar: 'phar_device_jsonstring',
    SMDS: 'devicebasic_jsonstring'
};

var BalsicDeviceTableName = "";
if(Target == Enum_Target.Dept)
{
    BalsicDeviceTableName = Enum_BasicDeviceTableName.Dept;
}
else if(Target == Enum_Target.Phar)
{
    BalsicDeviceTableName = Enum_BasicDeviceTableName.Phar;
}

var inspection_get_url = 'http://103.1.221.188:4433/api/inspection';
var inspection_update_post_url = 'http://103.1.221.188:4433/api/inspection/update';
var inspection_get_od_Date = 'http://103.1.221.188:4433/api/inspection/get_od_Date';
var inspection_download_excel = 'http://103.1.221.188:4433/api/inspection/download_excel';



