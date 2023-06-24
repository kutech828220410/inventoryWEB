//setInterval(check_session, 5000);
var permissions;
var flag_session_check = true;
async function GetApipermissions()
{
    var loggedID = sessionStorage.getItem('loggedID');
    var loggedPassword = sessionStorage.getItem('loggedPassword');
    var loggedlevel = sessionStorage.getItem('loggedlevel');
    const post_data = 
    {
        "Data": 
        {
            "ID": loggedID,
            "Password": loggedPassword,
            "level": loggedlevel,
        },
        "Code": 0,
        "Server":"",
        "DbName":"",
        "Result": "",
        "Value": "",
        "TimeTaken": ""
    };
    const get_permissions = await postDataToAPI(`${session_url}/get_permissions`, post_data);
    // console.log(get_permissions.Data.Permissions);
    permissions = get_permissions.Data.Permissions;
    return get_permissions.Data.Permissions;
}
function GetPermissions(name)
{
    for(var i = 0; i < permissions.length; i++)
    {
      
        if(permissions[i] == name)
        {
            return true;
        }
    }
    return false;
}
function check_session_off()
{
    flag_session_check = false;
}
async function check_session()
{
    console.log("Checking session",flag_session_check);
    if(!flag_session_check) return;
    var GUID = sessionStorage.getItem('GUID');

    var loggedID = sessionStorage.getItem('loggedID');
    var loggedPassword = sessionStorage.getItem('loggedPassword');
    var loggedName = sessionStorage.getItem('loggedName');
    var loggedEmployer = sessionStorage.getItem('loggedEmployer');
    var loggedlevel = sessionStorage.getItem('loggedlevel');
    var loggedTime = sessionStorage.getItem('loggedTime');
    const post_data = 
    {
        "Data": 
        {
            "GUID": GUID,
            "ID": loggedID,
            "Password": loggedPassword,

            "level": loggedlevel,
            "loginTime": loggedTime,
            "check_sec": "30"
        },
        "Code": 0,
        "Server":"",
        "DbName":"",
        "Result": "",
        "Value": "",
        "TimeTaken": ""
    };
    // Getpermissions();

    const data = await postDataToAPI(`${session_url}/check_session`, post_data);
    console.log(data);

    if (data.Code < 0) 
    {
        let lotoutdata = 
        {
            "Data": 
            {
                "GUID": GUID,
                "ID": loggedID,
            },
            "Code": 0,
            "Server":"",
            "DbName":"",
            "Result": "",
            "Value": "",
            "TimeTaken": ""
        };
        data_0 = await postDataToAPI(`${session_url}/logout`, lotoutdata);
        console.log(data_0);
        sessionStorage.clear();
        alert(data.Result);
        window.location.href = "../../login.html";
    }
}
