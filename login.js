let userData = [];
let session_login = [];

window.onload = load;
var ID = "";
var password = "";
async function load()
{ 
    ServerName ="";
    ServerType = "網頁";
    APIServer = await LoadAPIServer();
    const API01 = serch_APIServer(ServerName,ServerType,"API01");
    const API02 = serch_APIServer(ServerName,ServerType,"API02");
    console.log("API01",API01);
    console.log("API02",API02);
    check_ip(API01[0].server,API02[0].server);
  
}

async function verifyUser(event) 
{
    event.preventDefault(); // 阻止表单的自动提交

    // 取得使用者輸入的帳號和密碼
    ID = document.getElementsByName("account")[0].value;
    password = document.getElementsByName("password")[0].value;

    // 判斷帳號和密碼是否都有輸入
    if (ID === "" || password === "") {
        alert("請輸入帳號和密碼！");
        return false; // 防止表單提交
    }
    var loginBtn = document.getElementById("login-btn");
    loginBtn.disabled = true;
    loginBtn.textContent = "登入中...";


    session_login = await login(ID, password);
    await update_session(ID, session_login.Data.GUID);
    console.log(session_login);

    // 恢復按鈕為可用狀態
    loginBtn.disabled = false;
    loginBtn.textContent = "登入";

    if (session_login.Code == -3) 
    {
        return showConfirm();
    }
    else if (session_login.Code < 0) 
    {
        alert(session_login.Result);
        return false;
    }
    else 
    {
        const greeting = `歡迎登入 ${session_login.Data.Name} 即將進入後台首頁。`;
        alert(greeting);
        sessionStorage.setItem('GUID', session_login.Data.GUID);
        sessionStorage.setItem('loggedID', session_login.Data.ID);
        sessionStorage.setItem('loggedPassword', session_login.Data.Password);
        sessionStorage.setItem('loggedName', session_login.Data.Name);        
        sessionStorage.setItem('loggedEmployer', session_login.Data.Employer);
        sessionStorage.setItem('loggedlevel', session_login.Data.level);
        sessionStorage.setItem('loggedTime', session_login.Data.loginTime);
        sessionStorage.setItem('color', session_login.Data.color);
        window.location.href = "frontpage/main.html"; // 跳轉到 frontpage.html 頁面
    }
    return false; // 防止表單提交
}
async function showConfirm()
{
    
    if (confirm("帳號已登入,是否強制登出?")) 
    {  
        await logout(ID);
        session_login = await login(ID, password);
        sessionStorage.setItem('GUID', session_login.Data.GUID);
        sessionStorage.setItem('GUID', session_login.Data.CO);
        sessionStorage.setItem('loggedID', session_login.Data.ID);
        sessionStorage.setItem('loggedPassword', session_login.Data.Password);
        sessionStorage.setItem('loggedName', session_login.Data.Name);        
        sessionStorage.setItem('loggedEmployer', session_login.Data.Employer);
        sessionStorage.setItem('loggedlevel', session_login.Data.level);
        sessionStorage.setItem('loggedTime', session_login.Data.loginTime);
        sessionStorage.setItem('color', session_login.Data.color);

        window.location.href = "frontpage/main.html"; // 跳轉到 frontpage.html 頁面
        return true;
    } else 
    {
        return false;
    }
}
