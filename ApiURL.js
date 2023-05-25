// JavaScript source code
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
var session_login_post_url = 'http://103.1.221.188:4433/api/session';
var session_check_post_url = 'http://103.1.221.188:4433/api/session/check';
var session_logout_post_url = 'http://103.1.221.188:4433/api/session/logout';

var inspection_get_url = 'http://103.1.221.188:4433/api/inspection';
var inspection_update_post_url = 'http://103.1.221.188:4433/api/inspection/update';
var inspection_get_od_Date = 'http://103.1.221.188:4433/api/inspection/get_od_Date';
var inspection_download_excel = 'http://103.1.221.188:4433/api/inspection/download_excel';

var inventory_url = 'http://103.1.221.188:4433/api/inventory';
