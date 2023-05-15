let userData = [];
let session_login = [];


async function verifyUser(event) {
    event.preventDefault(); // 阻止表单的自动提交

    // 取得使用者輸入的帳號和密碼
    var account = document.getElementsByName("account")[0].value;
    var password = document.getElementsByName("password")[0].value;

    // 判斷帳號和密碼是否都有輸入
    if (account === "" || password === "") {
        alert("請輸入帳號和密碼！");
        return false; // 防止表單提交
    }
    var loginBtn = document.getElementById("login-btn");
    loginBtn.disabled = true;
    loginBtn.textContent = "登入中...";

    
    let userdata = {
        "ID": account,
        "Password": password
    };
    console.log(JSON.stringify(userdata));

    session_login = await postDataToAPI(session_login_post_url, userdata);
    console.log(session_login);

    // 恢復按鈕為可用狀態
    loginBtn.disabled = false;
    loginBtn.textContent = "登入";

    if (session_login.Code == -3) {
        
        return showConfirm(session_login , password);
    }
    else if (session_login.Code < 0) {
        alert(session_login.Result);
        return false;
    }
    else {
        const greeting = `歡迎登入 ${session_login.Data[0].Name} 即將進入後台首頁。`;
        alert(greeting);

        sessionStorage.setItem('loggedID', session_login.Data[0].ID);
        sessionStorage.setItem('loggedName', session_login.Data[0].Name);        
        sessionStorage.setItem('loggedEmployer', session_login.Data[0].Employer);
        sessionStorage.setItem('loggedlevel', session_login.Data[0].level);
        sessionStorage.setItem('loggedTime', session_login.Data[0].loginTime);

        window.location.href = "frontpage.html?loggedIn=true"; // 跳轉到 frontpage.html 頁面
    }

    return false; // 防止表單提交
}
async function showConfirm(session_login ,pwd) {
    
    if (confirm("帳號已登入,是否強制登出?")) {  
        console.log(session_login);     
        let userdata = {
            "ID": session_login.Data[0].ID,
            "Password": pwd
        };
        console.log(userdata);
        data = await postDataToAPI(session_logout_post_url, userdata);
        console.log(data);
        session_login = await postDataToAPI(session_login_post_url, userdata);
        console.log(session_login);
        sessionStorage.setItem('loggedID', session_login.Data[0].ID);
        sessionStorage.setItem('loggedName', session_login.Data[0].Name);
        sessionStorage.setItem('loggedEmployer', session_login.Data[0].Employer);
        sessionStorage.setItem('loggedlevel', session_login.Data[0].level);
        sessionStorage.setItem('loggedTime', session_login.Data[0].loginTime);

        window.location.href = "frontpage.html?loggedIn=true"; // 跳轉到 frontpage.html 頁面
        return true;
    } else {
        return false;
    }
}
