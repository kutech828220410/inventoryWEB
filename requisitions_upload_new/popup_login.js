var popup_login_div;
var popup_login_finishedEvent = [];
var popup_login_session_login;
async function popup_login_load()
{ 
    const serverName ="";
    const serverType = "網頁";
    APIServer = await LoadAPIServer();
    const API01 = serch_APIServer(serverName,serverType,"API01");
    const API02 = serch_APIServer(serverName,serverType,"API02");
    console.log("API01",API01);
    console.log("API02",API02);
    await check_ip(API01[0].server,API02[0].server);
    popup_login_div.Clear();
    const title = popup_login_title_init();
    const content = popup_login_content_init();
    const underline = popup_login_underline_init();
    popup_login_div.Set_BackgroundOpacity(1);
    popup_login_div.AddControl(title);
    popup_login_div.AddControl(content);
    popup_login_div.AddControl(underline);

}
async function popup_login_closed()
{

}
async function popup_login_init()
{
    popup_login_div = new Basic_popup_Div('popup_login_div_popup_login','popup_login_div_popup_login','330px','');
    popup_login_div._popup_div.style.border = '10px solid white';
    popup_login_div.LoadEvent.push(popup_login_load);
    popup_login_div.ClosedEvent.push(popup_login_closed);

    popup_login_div.Close();
    
    document.body.appendChild(popup_login_div.div);
    return popup_login_div;
}

function popup_login_title_init()
{
    const title_text = document.createElement('div');
    My_Div.Init(title_text, 'popup_login_title','popup_login_title', '100%', '40px', 'green');
    My_Div.Set_Text(title_text ,"系統登入" , TextAlignEnum.CENTER , "24px", true,"微軟正黑體","white");
    title_text.style.borderRadius = "5px";
    title_text.style.marginBottom = "10px";
    return title_text;
}
function popup_login_content_init()
{
    const content = document.createElement('div');
    My_Div.Set_Block(content, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.CENTER);
    content.style.marginTop = '20px';

    const popup_login_content_user_input = document.createElement('input');
    My_Div.Init(popup_login_content_user_input, 'popup_login_content_user_input','popup_login_content_user_input', '90%', '40px',);
    My_Div.Set_Text(popup_login_content_user_input ,"使用者登入" , TextAlignEnum.CENTER , "20px", true,"微軟正黑體","black");
    popup_login_content_user_input.placeholder = '請輸入帳號';
    popup_login_content_user_input.style.borderRadius = "3px";
    popup_login_content_user_input.style.border = "1px solid gray";
    popup_login_content_user_input.type = "text";
    popup_login_content_user_input.inputMode = "latin";
    popup_login_content_user_input.onfocus = function()
    {
       this.select();       
    };

    const popup_login_content_pwd_input = document.createElement('input');
    My_Div.Init(popup_login_content_pwd_input, 'popup_login_content_pwd_input','popup_login_content_pwd_input', '90%', '40px',);
    My_Div.Set_Text(popup_login_content_pwd_input ,"使用者登入" , TextAlignEnum.CENTER , "20px", true,"微軟正黑體","black");
    popup_login_content_pwd_input.placeholder = '請輸入密碼';
    popup_login_content_pwd_input.style.marginTop = '10px';
    popup_login_content_pwd_input.style.borderRadius = "3px";
    popup_login_content_pwd_input.style.border = "1px solid gray";
    popup_login_content_pwd_input.type = "password";
    popup_login_content_pwd_input.inputMode = "latin";
    popup_login_content_pwd_input.onfocus = function()
    {
       this.select();       
    };

    content.appendChild(popup_login_content_user_input);
    content.appendChild(popup_login_content_pwd_input);

    return content;
}

function popup_login_underline_init()
{
    const underline = document.createElement('div');
    My_Div.Set_Block(underline, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.CENTER);
    underline.style.marginTop = '20px';


    const popup_login_content_submit_button = document.createElement('button');
    My_Div.Init(popup_login_content_submit_button, 'link_btn','popup_login_content_submit_button', '95%', '60px','gray');
    My_Div.Set_Text(popup_login_content_submit_button ,"登入" , TextAlignEnum.CENTER , "24px", true,"微軟正黑體","white");

    // popup_login_content_submit_button.type = "submit";
    popup_login_content_submit_button.borderRadius = "10px";
    popup_login_content_submit_button.onclick = async function(event)
    {
        var flag_login = await popup_login_content_submit_button_click(event); 
        if(flag_login)
        {
            for(var i = 0 ; i < popup_login_finishedEvent.length ; i++)
            {
                if(typeof popup_login_finishedEvent[i] == "function") 
                {
                    await popup_login_finishedEvent[i]();
                }
            }
      
            await popup_login_div.Close();
        }
    };
    underline.appendChild(popup_login_content_submit_button);

    return underline;
}


async function popup_login_content_submit_button_click(event)
{
    event.preventDefault(); // 阻止表单的自动提交

    // 取得使用者輸入的帳號和密碼
    const user = document.querySelector("#popup_login_content_user_input").value;
    const password = document.querySelector("#popup_login_content_pwd_input").value;
    const loginBtn = document.querySelector("#popup_login_content_submit_button");


    // 判斷帳號和密碼是否都有輸入
    if (user === "" || password === "") {
        alert("請輸入帳號和密碼！");
        return false; // 防止表單提交
    }
    loginBtn.disabled = true;
    loginBtn.textContent = "登入中...";

    const session_login = await login(user, password);
    await update_session(user, session_login.Data.GUuser);
    console.log(session_login);
    loginBtn.disabled = false;
    loginBtn.textContent = "登入";
    if (session_login.Code !=200) 
    {
        alert(session_login.Result);
        return false;
    }
    // 恢復按鈕為可用狀態
    Set_main_div_enable(true);
    console.log(session_login.Data.ID);
    sessionStorage.setItem("login_json",JSON.stringify(session_login.Data));
    sessionStorage.setItem('GUuser', session_login.Data.GUuser);
    sessionStorage.setItem('loggeduser', session_login.Data.user);
    sessionStorage.setItem('loggedPassword', session_login.Data.Password);
    sessionStorage.setItem('loggedName', session_login.Data.Name); 
    sessionStorage.setItem('loggedEmployer', session_login.Data.Employer);
    sessionStorage.setItem('loggedlevel', session_login.Data.level);
    sessionStorage.setItem('loggedTime', session_login.Data.loginTime);
    sessionStorage.setItem('loggedID', session_login.Data.ID);
    sessionStorage.setItem('color', session_login.Data.color);
    const greeting = `${session_login.Data.Name} 登入成功!`;

    // let loggedID = sessionStorage.getItem('loggedID');

    // let post_data = {
    //     ValueAry: [loggedID],
    //     Value: "N"
    // }
    // user_log = await user_precheck(post_data);

    alert(greeting);

    // let user_name = sessionStorage.getItem("loggedName");
    // let header_user = document.querySelector(".header_user");
    // header_user.innerHTML = `使用者：${user_name}`;

    Set_main_div_enable(false);
    
    return true; // 防止表單提交
}