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
        
        return showConfirm(session_login);
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
        sessionStorage.setItem('loggedTime', session_login.Data[0].loginTime);

        window.location.href = "frontpage.html?loggedIn=true"; // 跳轉到 frontpage.html 頁面
    }
    //console.log(person_page_url);
    //userData = await getDataFromAPI(person_page_url);

    //// 在使用者資料中尋找符合輸入帳號的資料，currentUser是一個暫存的名稱，提供給CODE作為辨識
    //var currentUser = userData.find(function(user) {
    //    return user.ID === account;
    //});
    //console.log(currentUser);
    //if (currentUser && currentUser.password === password) {
    //    alert("驗證成功！即將進入盤點首頁。");

    //    // 將驗證資訊儲存在sessionStorage中
    //    sessionStorage.setItem('loggedIn', 'true');
    //    sessionStorage.setItem('loggedInUser', currentUser.name);
    //    sessionStorage.setItem('loggedInEmployer', currentUser.employer);
    //    sessionStorage.setItem('loggedInLevel', currentUser.level);

    //    window.location.href = "frontpage.html?loggedIn=true"; // 跳轉到 frontpage.html 頁面
    //} else if (currentUser && currentUser.password !== password) {
    //    alert("密碼錯誤，請重新輸入！");
    //} else {
    //    alert("帳號或密碼錯誤，請重新輸入！");
    //}

    return false; // 防止表單提交
}
async function showConfirm(session_login) {
    if (confirm("帳號已登入,是否強制登出?")) {

        let userdata = {
            "ID": session_login.Data[0].ID
        };
        data = await postDataToAPI(session_logout_post_url, userdata);
        console.log(data);

        sessionStorage.setItem('loggedID', session_login.Data[0].ID);
        sessionStorage.setItem('loggedName', session_login.Data[0].Name);
        sessionStorage.setItem('loggedEmployer', session_login.Data[0].Employer);
        sessionStorage.setItem('loggedTime', session_login.Data[0].loginTime);

        window.location.href = "frontpage.html?loggedIn=true"; // 跳轉到 frontpage.html 頁面
        return true;
    } else {
        return false;
    }
}
