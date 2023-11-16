var popup_creatSelect_div;
var popup_creatSelect_creat = [];
var popup_creatSelect_finishedEvent = [];

async function popup_creatSelect_load()
{ 
    const serverName ="";
    const serverType = "網頁";
    APIServer = await LoadAPIServer();
    const API01 = serch_APIServer(serverName,serverType,"API01");
    const API02 = serch_APIServer(serverName,serverType,"API02");
    console.log("API01",API01);
    console.log("API02",API02);
    await check_ip(API01[0].server,API02[0].server);

    const currentDate = new Date();
    var date_end = DateTimeAddDays(currentDate, 1);
    var date_start = DateTimeAddDays(currentDate, -30);
    date_start = getDateStr(date_start);
    date_end = getDateStr(date_end);
 
    popup_creatSelect_creat = await creat_get_by_CT_TIME_ST_END(date_start,date_end);
    console.log("creatSelect",popup_creatSelect_creat);
    const creats = popup_creatSelect_creat.Data.filter(function(item) 
    {
       return item.IC_SN.charAt(0) != "Q";
    })
    popup_creatSelect_creat.Data = creats;
    console.log("盤點單",popup_creatSelect_creat);   
    popup_creatSelect_div.Set_BackgroundOpacity(1);
    popup_creatSelect_div.Clear();
    const title = popup_creatSelect_title_init();
    const content = popup_creatSelect_content_init();

    popup_creatSelect_div.AddControl(title);
    popup_creatSelect_div.AddControl(content);
}
async function popup_creatSelect_closed()
{

}
async function popup_creatSelect_init()
{
    popup_creatSelect_div = new Basic_popup_Div('popup_creatSelect','popup_creatSelect','330px','');
    popup_creatSelect_div._popup_div.style.border = '10px solid white';
    popup_creatSelect_div.LoadEvent.push(popup_creatSelect_load);
    popup_creatSelect_div.ClosedEvent.push(popup_creatSelect_closed);
    popup_creatSelect_div.Close();
    document.body.appendChild(popup_creatSelect_div.div);
    
}

function popup_creatSelect_title_init()
{
    const title_text = document.createElement('div');
    My_Div.Init(title_text, 'popup_creatSelect_title','popup_creatSelect_title', '100%', '50px', 'blue');
    My_Div.Set_Text(title_text ,"選擇驗收單" , TextAlignEnum.CENTER , "24px", true,"微軟正黑體","white");
    title_text.style.borderRadius = "5px";
    return title_text;
}
function popup_creatSelect_content_init()
{
    const content = document.createElement('div');
    My_Div.Set_Block(content, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.CENTER);
    
    const normal_CN = document.createElement('div');
    My_Div.Init(normal_CN, 'popup_creatSelect_normal_CN','popup_creatSelect_normal_CN', '100%', '', '');
    My_Div.Set_Block(normal_CN, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.CENTER);
    normal_CN.style.marginTop = '5px';
    normal_CN.style.padding = '5px';
    for(var i = 0; i < popup_creatSelect_creat.Data.length; i++)
    {
        const IC_SN = popup_creatSelect_creat.Data[i].IC_SN;
        const IC_NAME = popup_creatSelect_creat.Data[i].IC_NAME;
        const temp_button = document.createElement('button');
        My_Div.Init(temp_button, `creatSelect_button_${IC_SN}`,`creatSelect_button_${IC_SN}`, '95%', '50px',);
        My_Div.Set_Text(temp_button ,`${IC_NAME}` , TextAlignEnum.CENTER , "20px", true,"微軟正黑體","black");
        temp_button.setAttribute("IC_SN",IC_SN);
        temp_button.setAttribute("IC_NAME",IC_NAME);
        
        temp_button.style.marginTop = '2px';
        temp_button.addEventListener('mouseover', function () 
        {
            temp_button.style.backgroundColor = 'lightgray'; // 或者您可以设置其他反白样式
        });
        temp_button.addEventListener('mouseout', function () 
        {
            temp_button.style.backgroundColor = ''; // 清除背景颜色以恢复默认样式
        });
        temp_button.addEventListener('click', async function () 
        {
            const IC_SN = this.getAttribute("IC_SN");
            console.log("IC_SN",IC_SN);
            sessionStorage.setItem('IC_SN', IC_SN);
            for(var i = 0 ; i < popup_creatSelect_finishedEvent.length ; i++)
            {
                if(typeof popup_creatSelect_finishedEvent[i] == "function") 
                {
                    await popup_creatSelect_finishedEvent[i]();
                }
            }
            popup_creatSelect_div.Close();
        });
        normal_CN.appendChild(temp_button);
    }
    // const quick_CN = document.createElement('div');
    // My_Div.Init(quick_CN, 'popup_creatSelect_quick_CN','popup_creatSelect_quick_CN', '100%', '', '');
    // My_Div.Set_Block(quick_CN, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.TOP);
    // quick_CN.style.border = "1px solid black";
    // quick_CN.style.borderRadius = "2px";
    // quick_CN.style.padding = "5px";

    // const quick_CN_text = document.createElement('div');
    // My_Div.Init(quick_CN_text, 'popup_creatSelect_quick_CN','popup_creatSelect_quick_CN', '100%', '40px', '#c77a05');
    // My_Div.Set_Text(quick_CN_text ,"快速盤點" , TextAlignEnum.CENTER , "24px", true,"微軟正黑體","white");
    // quick_CN_text.style.borderRadius = "5px";
    // quick_CN_text.style.marginBottom = "5px";
    // quick_CN.appendChild(quick_CN_text);



    // const quick_CN_controls = document.createElement('div');
    // My_Div.Init(quick_CN_controls, 'popup_creatSelect_quick_CN_controls','popup_creatSelect_quick_CN_controls', '100%', '', '');
    // My_Div.Set_Block(quick_CN_controls, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);

    // const high_priced_button = document.createElement('button');
    // My_Div.Init(high_priced_button, `creatSelect_button_high_priced`,`creatSelect_button_high_priced`, '95%', '60px',);
    // My_Div.Set_Text(high_priced_button ,`高價藥品` , TextAlignEnum.CENTER , "18px", true,"微軟正黑體","black");
    // high_priced_button.addEventListener('mouseover', function () 
    // {
    //     high_priced_button.style.backgroundColor = 'lightgray'; // 或者您可以设置其他反白样式
    // });
    // high_priced_button.addEventListener('mouseout', function () 
    // {
    //     high_priced_button.style.backgroundColor = ''; // 清除背景颜色以恢复默认样式
    // });
    // high_priced_button.addEventListener('click', async function () 
    // {       
    //     const creat_response = await creat_quick_add("高價藥品");
    //     const IC_SN = creat_response.Data.IC_SN;

    //     const temp =  await get_creat_Islocked_by_IC_SN(IC_SN);
    //     if(temp.Data == "鎖定")
    //     {
    //         alert("此盤點單被管理者鎖定,無法進入盤點!");
    //         return;
    //     }
    //     console.log("IC_SN",IC_SN);
    //     sessionStorage.setItem('IC_SN', IC_SN);
    //     console.log("creat_response",creat_response);
    //     for(var i = 0 ; i < popup_creatSelect_finishedEvent.length ; i++)
    //     {
    //         if(typeof popup_creatSelect_finishedEvent[i] == "function") 
    //         {
    //             await popup_creatSelect_finishedEvent[i]();
    //         }
    //     }
    //     popup_creatSelect_div.Close();
    // });
    // high_priced_button.style.marginLeft = '2px';
    // high_priced_button.style.marginRight = '2px';
    // quick_CN_controls.appendChild(high_priced_button);

    // const controlled_button = document.createElement('button');
    // My_Div.Init(controlled_button, `creatSelect_button_controlled`,`creatSelect_button_controlled`, '95%', '60px',);
    // My_Div.Set_Text(controlled_button ,`管制藥品` , TextAlignEnum.CENTER , "16px", true,"微軟正黑體","black");
    // controlled_button.addEventListener('mouseover', function () 
    // {
    //     controlled_button.style.backgroundColor = 'lightgray'; // 或者您可以设置其他反白样式
    // });
    // controlled_button.addEventListener('mouseout', function () 
    // {
    //     controlled_button.style.backgroundColor = ''; // 清除背景颜色以恢复默认样式
    // });
    // controlled_button.addEventListener('click', async function () 
    // {       
    //     const creat_response = await creat_quick_add("管制藥品");
    //     const IC_SN = creat_response.Data.IC_SN;

    //     const temp =  await get_creat_Islocked_by_IC_SN(IC_SN);
    //     if(temp.Data == "鎖定")
    //     {
    //         alert("此盤點單被管理者鎖定,無法進入盤點!");
    //         return;
    //     }

    //     console.log("IC_SN",IC_SN);
    //     sessionStorage.setItem('IC_SN', IC_SN);
    //     console.log("creat_response",creat_response);
    //     for(var i = 0 ; i < popup_creatSelect_finishedEvent.length ; i++)
    //     {
    //         if(typeof popup_creatSelect_finishedEvent[i] == "function") 
    //         {
    //             await popup_creatSelect_finishedEvent[i]();
    //         }
    //     }
    //     popup_creatSelect_div.Close();
    // });
    // controlled_button.style.marginLeft = '2px';
    // controlled_button.style.marginRight = '2px';
    // quick_CN_controls.appendChild(controlled_button);

    // const med_back_button = document.createElement('button');
    // My_Div.Init(med_back_button, `creatSelect_button_med_back`,`creatSelect_button_med_back`, '95%', '60px',);
    // My_Div.Set_Text(med_back_button ,`退藥` , TextAlignEnum.CENTER , "16px", true,"微軟正黑體","black");
    // med_back_button.addEventListener('mouseover', function () 
    // {
    //     med_back_button.style.backgroundColor = 'lightgray'; // 或者您可以设置其他反白样式
    // });
    // med_back_button.addEventListener('mouseout', function () 
    // {
    //     med_back_button.style.backgroundColor = ''; // 清除背景颜色以恢复默认样式
    // });
    // med_back_button.addEventListener('click', async function () 
    // {       
    //     const creat_response = await creat_quick_add("退藥");
    //     const IC_SN = creat_response.Data.IC_SN;

    //     const temp =  await get_creat_Islocked_by_IC_SN(IC_SN);
    //     if(temp.Data == "鎖定")
    //     {
    //         alert("此盤點單被管理者鎖定,無法進入盤點!");
    //         return;
    //     }

    //     console.log("IC_SN",IC_SN);
    //     sessionStorage.setItem('IC_SN', IC_SN);
    //     console.log("creat_response",creat_response);
    //     for(var i = 0 ; i < popup_creatSelect_finishedEvent.length ; i++)
    //     {
    //         if(typeof popup_creatSelect_finishedEvent[i] == "function") 
    //         {
    //             await popup_creatSelect_finishedEvent[i]();
    //         }
    //     }
    //     popup_creatSelect_div.Close();
    // });
    // med_back_button.style.marginLeft = '2px';
    // med_back_button.style.marginRight = '2px';
    // quick_CN_controls.appendChild(med_back_button);
    // quick_CN.appendChild(quick_CN_controls);

    content.appendChild(normal_CN);
    // content.appendChild(quick_CN);
    return content;
}