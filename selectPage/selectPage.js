// (async function(){
//     loadScript("../api/map.js");
//     loadScript("../ApiURL.js");
//     loadScript("../ChatHub.js");
//     loadScript("../svg/mySVG.js");
//     loadScript("../UI/map.js");
//     loadScript("../popup/map.js");    
//     loadScript("../dist/JsBarcode.all.js");
//     loadScript("../session_check.js");
//     loadScript("../session.js");
// })();
window.addEventListener('load', () => {

    // const serverName ="";
    // const serverType = "網頁";
    // APIServer = LoadAPIServer();
    // const API01 = serch_APIServer(serverName,serverType,"API01");
    // const API02 = serch_APIServer(serverName,serverType,"API02");
    // console.log("API01",API01);
    // console.log("API02",API02);
    // check_ip(API01[0].server,API02[0].server);
    // console.log("inventory_url",inventory_url);

    // let med_data = get_medicine_cloud();
    let temp_guid;
    let med_data;

    // 連接資料
    fetch('./test.json')
        .catch((err)=>{
            console.log(err);
        }).then((res)=>{
            return res.json()
        }).then((res)=>{
            get_cards(res)
            return_guid("group_card")
        })

    fetch('./med.json')
        .catch(err => {
            console.log(err);
        }).then(res => {
            return res.json()
        }).then(res => {
            med_data = res
            console.log(med_data);

            // 彈出視窗
            const create_group = document.querySelector('.create_group');
            const pop_group = new Basic_popup_Div('popup_create_group_popup','popup_create_group_popup','','')
            
            let popup_create_group_popup = document.querySelector('.popup_create_group_popup')

            // 自建群組容器
            const self_create_container = document.createElement('div');
            self_create_container.classList.add("self_create_container");
            self_create_container.innerHTML = 
            `
                <div class="self_create">自建群組</div>
                <div>or</div>
                <div class="upload_doc">匯入資料建立群組</div>
            `
            
            // 關閉按鈕
            const close_create_group_button = document.createElement('div');
            close_create_group_button.classList.add('close_create_group_button')
            close_create_group_button.innerHTML = `<img src="./close.png" alt="">`
            close_create_group_button.addEventListener('click', (e) => {
                hide_popup_add()
            })
            
            popup_create_group_popup.appendChild(self_create_container)
            popup_create_group_popup.appendChild(close_create_group_button)
            hide_popup_add();
            
            create_group.addEventListener('click', (e) => {
                show_popup_add();

            })

            // 彈跳視窗開關
            function show_popup_add()
            {
                pop_group.Set_Visible(true);
            }
            function hide_popup_add()
            {
                pop_group.Set_Visible(false);
            }
        })
    
    // 回傳暫時ID
    function return_guid(group_div) {
        let group_card = document.querySelectorAll(`.${group_div}`)
        group_card.forEach(e => {
            e.addEventListener("click", (e) => {
                temp_guid = e.target.dataset.guid;
                console.log(temp_guid);
            })
        });
    }
    
})