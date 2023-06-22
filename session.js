function get_logedName()
{
    var loggedName = sessionStorage.getItem('loggedName');
    return loggedName;
}
function get_loggedID()
{
    var loggedName = sessionStorage.getItem('loggedID');
    return loggedName;
}

function get_loggedColor()
{
    var color = sessionStorage.getItem('color');
    return color;
}

async function login(id, password)
{

    const post_data = 
    {
        "Data": 
        {
            "ID": id,
            "Password": password
        },
        "Code": 0,
        "Server":"",
        "DbName":"",
        "Result": "",
        "Value": "",
        "TimeTaken": ""
    };
    console.log("post_data" , post_data);
    const data = await postDataToAPI(`${session_url}/login`, post_data);
    console.log("data",data);
    return data;
}

async function logout(ID)
{
    if(ID == null)
    {
        ID = get_loggedID();
    }
    const post_data = 
    {
        "Data": 
        {
            "ID": ID,
        },
        "Code": 0,
        "Server":"",
        "DbName":"",
        "Result": "",
        "Value": "",
        "TimeTaken": ""
    };
    console.log("post_data" , post_data);
    const data = await postDataToAPI(`${session_url}/logout`, post_data);
    console.log(data);

    sessionStorage.clear();
//   window.location.href = "login.html";
    return data;
}

async function update_session(ID , GUID)
{
    const post_data = 
    {
        "Data": 
        {
            "GUID": GUID,
            "ID": ID,
        },
        "Code": 0,
        "Server":"",
        "DbName":"",
        "Result": "",
        "Value": "",
        "TimeTaken": ""
    };
    console.log("post_data" , post_data);
    const data = await postDataToAPI(`${session_url}/update_session`, post_data);
    console.log(data);

    sessionStorage.clear();
//   window.location.href = "login.html";
     return data;
}

async function get_permissions(id, password)
{

    const post_data = 
    {
        "Data": 
        {
            "ID": id,
            "Password": password
        },
        "Code": 0,
        "Server":"",
        "DbName":"",
        "Result": "",
        "Value": "",
        "TimeTaken": ""
    };
    console.log("post_data" , post_data);
    const data = await postDataToAPI(`${session_url}/get_permissions`, post_data);
    console.log("data",data);
    return data;
}