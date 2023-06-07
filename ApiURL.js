var flag_check_connection_OK = false;
const ipadress2 = 'www.ketech.tw:4433';
const ipadress1 = 'www.ketech.tw:4434';




var api_ip = `http://${ipadress1}/`; 
var Chat_url = `${api_ip}chatHub`;
var MessageAPI_url = `${api_ip}api/Message`;
var inventory_url = `${api_ip}api/inventory`;
var transactions_url = `${api_ip}api/transactions`;

var session_login_post_url = `${api_ip}api/session`;
var session_check_post_url = `${api_ip}api/session/check`;
var session_logout_post_url = `${api_ip}api/session/logout`;

async function set_ip()
{
    if(flag_check_connection_OK) 
    {
        console.log('flag_check_connection_OK',flag_check_connection_OK);
        return;
    }
    var api_ip_temp;
    if(await pingIP(ipadress1))
    {
        api_ip_temp = `http://${ipadress1}/`;     
        flag_check_connection_OK = true;
    }
    else if(await pingIP(ipadress2))
    {
        api_ip_temp = `http://${ipadress2}/`;     
        flag_check_connection_OK = true;
    }
    if(flag_check_connection_OK)
    {
        api_ip = api_ip_temp;
        console.log("成功設定IP : " ,api_ip)  
        
        MessageAPI_url = `${api_ip}api/Message`;
        Chat_url = `${api_ip}chatHub`;
        inventory_url = `${api_ip}api/inventory`;
        transactions_url = `${api_ip}api/transactions`;
        session_login_post_url = `${api_ip}api/session`;
        session_check_post_url = `${api_ip}api/session/check`;
        session_logout_post_url = `${api_ip}api/session/logout`;
        return;
    }
    set_ip();
}
async function pingIP(ipAddress, timeout = 1000) 
{
    const url = `http://${ipAddress}/api/test`;
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



var person_page_url = 'http://103.1.221.188:4433/api/person_page';


var inspection_get_url = 'http://103.1.221.188:4433/api/inspection';
var inspection_update_post_url = 'http://103.1.221.188:4433/api/inspection/update';
var inspection_get_od_Date = 'http://103.1.221.188:4433/api/inspection/get_od_Date';
var inspection_download_excel = 'http://103.1.221.188:4433/api/inspection/download_excel';



