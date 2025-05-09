let userData = [];
let session_login = [];

window.onload = load;
var ID = "";
var password = "";
async function load()
{ 
    ServerName ="";
    ServerType = "網頁";
    console.log("object");
    APIServer = await LoadAPIServer();
    const API01 = serch_APIServer(ServerName,ServerType,"API01");
    const API02 = serch_APIServer(ServerName,ServerType,"API02");
    console.log("API01",API01);
    console.log("API02",API02);
    check_ip(API01[0].server,API02[0].server);
    auto_input_account();
}
function auto_input_account() {
    let input_id = document.querySelector("#account");
    let input_pwd = document.querySelector("#password");

    input_id.addEventListener("keydown", async (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            e.target.blur();
            input_pwd.focus();
        }
        if (e.key === 'Enter') {
            return verifyUser("");
        }
    });
    input_pwd.addEventListener("keydown", async (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            e.target.blur();
            input_id.focus();
        }
        if (e.key === 'Enter') {
            return verifyUser("");
        }
    });
}

async function verifyUser(event)
{
    if(event != "") {
        event.preventDefault(); // 阻止表单的自动提交
    }

    // 取得使用者輸入的帳號和密碼
    ID = document.getElementsByName("account")[0].value;
    password = document.getElementsByName("password")[0].value;

    // 判斷帳號和密碼是否都有輸入
    if (ID === "" || password === "") {
        alert("請輸入帳號和密碼！");
        return false; // 防止表單提交
    }

    session_login = await login(ID, password);

    if(session_login == undefined) {
        return false;
    }

    var loginBtn = document.getElementById("login-btn");
    loginBtn.disabled = true;
    loginBtn.textContent = "登入中...";

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
        sessionStorage.setItem("login_json",JSON.stringify(session_login.Data));
        sessionStorage.setItem('GUID', session_login.Data.GUID);
        sessionStorage.setItem('loggedID', session_login.Data.ID);
        sessionStorage.setItem('loggedPassword', session_login.Data.Password);
        sessionStorage.setItem('loggedName', session_login.Data.Name);        
        sessionStorage.setItem('loggedEmployer', session_login.Data.Employer);
        sessionStorage.setItem('loggedlevel', session_login.Data.level);
        sessionStorage.setItem('loggedTime', session_login.Data.loginTime);
        sessionStorage.setItem('color', session_login.Data.color);
        sessionStorage.setItem('user_session', JSON.stringify(session_login.Data));
        // window.location.href = "frontpage/main.html"; // 跳轉到 frontpage.html 頁面
        window.location.href = "../phar_system/frontpage/"; // 跳轉到 frontpage.html 頁面
    }
    return false; // 防止表單提交
}

async function showConfirm()
{
    await logout(ID);
    session_login = await login(ID, password);
    sessionStorage.setItem("login_json",JSON.stringify(session_login.Data));
    sessionStorage.setItem('GUID', session_login.Data.GUID);
    sessionStorage.setItem('GUID', session_login.Data.CO);
    sessionStorage.setItem('loggedID', session_login.Data.ID);
    sessionStorage.setItem('loggedPassword', session_login.Data.Password);
    sessionStorage.setItem('loggedName', session_login.Data.Name);        
    sessionStorage.setItem('loggedEmployer', session_login.Data.Employer);
    sessionStorage.setItem('loggedlevel', session_login.Data.level);
    sessionStorage.setItem('loggedTime', session_login.Data.loginTime);
    sessionStorage.setItem('color', session_login.Data.color);
    sessionStorage.setItem('user_session', JSON.stringify(session_login.Data));

    window.location.href = "frontpage/main.html"; // 跳轉到 frontpage.html 頁面
    // if (confirm("帳號已登入,是否強制登出?")) 
    // {  
    //     await logout(ID);
    //     session_login = await login(ID, password);
    //     sessionStorage.setItem('GUID', session_login.Data.GUID);
    //     sessionStorage.setItem('GUID', session_login.Data.CO);
    //     sessionStorage.setItem('loggedID', session_login.Data.ID);
    //     sessionStorage.setItem('loggedPassword', session_login.Data.Password);
    //     sessionStorage.setItem('loggedName', session_login.Data.Name);        
    //     sessionStorage.setItem('loggedEmployer', session_login.Data.Employer);
    //     sessionStorage.setItem('loggedlevel', session_login.Data.level);
    //     sessionStorage.setItem('loggedTime', session_login.Data.loginTime);
    //     sessionStorage.setItem('color', session_login.Data.color);

    //     window.location.href = "frontpage/main.html"; // 跳轉到 frontpage.html 頁面
    //     return true;
    // } else 
    // {
    //     return false;
    // }
}
