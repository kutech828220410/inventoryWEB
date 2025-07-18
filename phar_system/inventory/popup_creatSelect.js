var popup_creatSelect_div;
var review_data = [];
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
 
    popup_creatSelect_creat = await get_all_unlock_creat();
    console.log("creatSelect",popup_creatSelect_creat);
    const creats = popup_creatSelect_creat.Data.filter(function(item) 
    {
       return item.IC_SN.charAt(0) != "Q";
    })
    popup_creatSelect_creat.Data = creats;
    console.log("盤點單",popup_creatSelect_creat);  
    popup_creatSelect_div.Set_BackgroundOpacity(1);
    popup_creatSelect_div.Clear();

    review_data = popup_creatSelect_creat.Data.filter((item) => {
       return item.IC_SN.includes("REV");
    })

    console.log("覆盤單清單", review_data);

    const title = popup_creatSelect_title_init();
    const content = popup_creatSelect_content_init();
    
    // let loged_name = get_logedName();
    // creats.forEach(async(element) => {
    //     if (element.DEFAULT_OP == loged_name) {
    //         sessionStorage.setItem('IC_SN', element.IC_SN);
    //         await popup_creatSelect_div.Close();
    //         popup_creatSelect_finished();
    //     }
    // });

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
    My_Div.Set_Text(title_text ,"選擇區域" , TextAlignEnum.CENTER , "24px", true,"微軟正黑體","white");
    title_text.style.borderRadius = "5px";
    return title_text;
}
function popup_creatSelect_content_init()
{
    const content = document.createElement('div');
    My_Div.Set_Block(content, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.CENTER);
    
    const normal_CN = document.createElement('div');
    My_Div.Init(normal_CN, 'popup_creatSelect_normal_CN','popup_creatSelect_normal_CN', '100%', '', '');
    My_Div.Set_Block(normal_CN, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN);
    normal_CN.style.overflow = "auto";
    normal_CN.style.margin = '5px';
    normal_CN.style.padding = '5px';

    let loged_name = get_logedName();
    let count_include = 0;

    temp_data = [];
    
    popup_creatSelect_creat["Data"].forEach(element => {
        let temp_str = element.DEFAULT_OP; // "123,4234,1124"
        // let temp_arr = []; 
        // if (temp_str != "") {
        //   temp_arr = temp_str.split(',');
        // }
        // // temp_arr [123, 4234, 1134]
        // temp_arr.forEach(e => {
        // })
        if(temp_str.includes(loged_name)) {
            count_include = +count_include + 1;
            temp_data.push(element);
        }
    });

    if(temp_data.length == 1) {
        popup_creatSelect_creat["Data"] = temp_data;
        console.log(popup_creatSelect_creat["Data"]);
    } else if (temp_data.length > 1) {
        popup_creatSelect_creat["Data"] = temp_data;
        console.log(popup_creatSelect_creat["Data"]);
    } else {
        temp_data = popup_creatSelect_creat["Data"].filter(item => {
            return item.DEFAULT_OP == "";
        })

        popup_creatSelect_creat["Data"] = temp_data;
        if(temp_data.length == 0) {
            alert("目前沒有任何單據符合您, 請與管理員確認後再登入確認");
        }
    }

    for(var i = 0; i < popup_creatSelect_creat.Data.length; i++)
    {
        const IC_SN = popup_creatSelect_creat.Data[i].IC_SN;
        const IC_NAME = popup_creatSelect_creat.Data[i].IC_NAME;
        const temp_button = document.createElement('button');
        // My_Div.Init(temp_button, `creatSelect_button`,`creatSelect_button_${IC_SN}`, '90%', '50px',);
        My_Div.Init(temp_button, `pp_review_IC_SN`,`creatSelect_button_${IC_SN}`, '90%', '50px',);
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

    let pp_review_container;
    if(review_data.length > 0) {
        pp_review_container = document.createElement("div");
        pp_review_container.classList.add("pp_review_container");

        let pp_review_title = document.createElement("div");
        pp_review_title.classList.add("pp_review_title");
        pp_review_title.innerHTML = "覆盤";

        let pp_review_button_container = document.createElement("div");
        pp_review_button_container.classList.add("pp_review_button_container");

        pp_review_container.appendChild(pp_review_title);
        pp_review_container.appendChild(pp_review_button_container);

        for (let i = 0; i < review_data.length; i++) {
            const element = review_data[i];
            
            let pp_review_IC_SN = document.createElement("div");
            pp_review_IC_SN.classList.add("pp_review_IC_SN");
            pp_review_IC_SN.id = `${element.IC_SN}`;
            pp_review_IC_SN.innerHTML = element.IC_NAME
            pp_review_IC_SN.setAttribute("IC_SN",element.IC_SN);
            pp_review_IC_SN.setAttribute("IC_NAME",element.IC_NAME);

            pp_review_IC_SN.addEventListener('click', async () => {
                const IC_SN = pp_review_IC_SN.getAttribute("IC_SN");
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
            
            pp_review_button_container.appendChild(pp_review_IC_SN);
        }
    }

    const quick_CN = document.createElement('div');
    My_Div.Init(quick_CN, 'popup_creatSelect_quick_CN','popup_creatSelect_quick_CN', '100%', '', '');
    My_Div.Set_Block(quick_CN, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.TOP);
    quick_CN.style.border = "1px solid black";
    quick_CN.style.borderRadius = "2px";
    quick_CN.style.padding = "5px";

    const quick_CN_text = document.createElement('div');
    My_Div.Init(quick_CN_text, 'popup_creatSelect_quick_CN','popup_creatSelect_quick_CN', '100%', '40px', '#c77a05');
    My_Div.Set_Text(quick_CN_text ,"快速盤點" , TextAlignEnum.CENTER , "24px", true,"微軟正黑體","white");
    quick_CN_text.style.borderRadius = "5px";
    quick_CN_text.style.marginBottom = "5px";
    quick_CN.appendChild(quick_CN_text);

    const quick_CN_controls = document.createElement('div');
    My_Div.Init(quick_CN_controls, 'popup_creatSelect_quick_CN_controls','popup_creatSelect_quick_CN_controls', '100%', '', '');
    My_Div.Set_Block(quick_CN_controls, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);

    const high_priced_button = document.createElement('button');
    My_Div.Init(high_priced_button, `creatSelect_button_high_priced`,`creatSelect_button_high_priced`, '95%', '60px',);
    My_Div.Set_Text(high_priced_button ,`高價藥品` , TextAlignEnum.CENTER , "18px", true,"微軟正黑體","black");
    high_priced_button.addEventListener('mouseover', function () 
    {
        high_priced_button.style.backgroundColor = 'lightgray'; // 或者您可以设置其他反白样式
    });
    high_priced_button.addEventListener('mouseout', function () 
    {
        high_priced_button.style.backgroundColor = ''; // 清除背景颜色以恢复默认样式
    });
    high_priced_button.addEventListener('click', async function () 
    {       
        const creat_response = await creat_quick_add("高價藥品");
        const IC_SN = creat_response.Data.IC_SN;

        const temp =  await get_creat_Islocked_by_IC_SN(IC_SN);
        if(temp.Data == "鎖定")
        {
            alert("此盤點單被管理者鎖定,無法進入盤點!");
            return;
        }
        console.log("IC_SN",IC_SN);
        sessionStorage.setItem('IC_SN', IC_SN);
        console.log("creat_response",creat_response);
        for(var i = 0 ; i < popup_creatSelect_finishedEvent.length ; i++)
        {
            if(typeof popup_creatSelect_finishedEvent[i] == "function") 
            {
                await popup_creatSelect_finishedEvent[i]();
            }
        }
        popup_creatSelect_div.Close();
    });
    high_priced_button.style.marginLeft = '2px';
    high_priced_button.style.marginRight = '2px';
    quick_CN_controls.appendChild(high_priced_button);

    const controlled_button = document.createElement('button');
    My_Div.Init(controlled_button, `creatSelect_button_controlled`,`creatSelect_button_controlled`, '95%', '60px',);
    My_Div.Set_Text(controlled_button ,`管制藥品` , TextAlignEnum.CENTER , "16px", true,"微軟正黑體","black");
    controlled_button.addEventListener('mouseover', function () 
    {
        controlled_button.style.backgroundColor = 'lightgray'; // 或者您可以设置其他反白样式
    });
    controlled_button.addEventListener('mouseout', function () 
    {
        controlled_button.style.backgroundColor = ''; // 清除背景颜色以恢复默认样式
    });
    controlled_button.addEventListener('click', async function () 
    {       
        const creat_response = await creat_quick_add("管制藥品");
        const IC_SN = creat_response.Data.IC_SN;

        const temp =  await get_creat_Islocked_by_IC_SN(IC_SN);
        if(temp.Data == "鎖定")
        {
            alert("此盤點單被管理者鎖定,無法進入盤點!");
            return;
        }

        console.log("IC_SN",IC_SN);
        sessionStorage.setItem('IC_SN', IC_SN);
        console.log("creat_response",creat_response);
        for(var i = 0 ; i < popup_creatSelect_finishedEvent.length ; i++)
        {
            if(typeof popup_creatSelect_finishedEvent[i] == "function") 
            {
                await popup_creatSelect_finishedEvent[i]();
            }
        }
        popup_creatSelect_div.Close();
    });
    controlled_button.style.marginLeft = '2px';
    controlled_button.style.marginRight = '2px';
    quick_CN_controls.appendChild(controlled_button);

    const med_back_button = document.createElement('button');
    My_Div.Init(med_back_button, `creatSelect_button_med_back`,`creatSelect_button_med_back`, '95%', '60px',);
    My_Div.Set_Text(med_back_button ,`退藥` , TextAlignEnum.CENTER , "16px", true,"微軟正黑體","black");
    med_back_button.addEventListener('mouseover', function () 
    {
        med_back_button.style.backgroundColor = 'lightgray'; // 或者您可以设置其他反白样式
    });
    med_back_button.addEventListener('mouseout', function () 
    {
        med_back_button.style.backgroundColor = ''; // 清除背景颜色以恢复默认样式
    });
    med_back_button.addEventListener('click', async function () 
    {       
        const creat_response = await creat_quick_add("退藥");
        const IC_SN = creat_response.Data.IC_SN;

        const temp =  await get_creat_Islocked_by_IC_SN(IC_SN);
        if(temp.Data == "鎖定")
        {
            alert("此盤點單被管理者鎖定,無法進入盤點!");
            return;
        }

        console.log("IC_SN",IC_SN);
        sessionStorage.setItem('IC_SN', IC_SN);
        console.log("creat_response",creat_response);
        for(var i = 0 ; i < popup_creatSelect_finishedEvent.length ; i++)
        {
            if(typeof popup_creatSelect_finishedEvent[i] == "function") 
            {
                await popup_creatSelect_finishedEvent[i]();
            }
        }
        popup_creatSelect_div.Close();
    });
    med_back_button.style.marginLeft = '2px';
    med_back_button.style.marginRight = '2px';
    quick_CN_controls.appendChild(med_back_button);
    quick_CN.appendChild(quick_CN_controls);

    content.appendChild(normal_CN);
    console.log(pp_review_container);
    if(pp_review_container) {
        content.appendChild(pp_review_container);
    }
    content.appendChild(quick_CN);
    return content;
}