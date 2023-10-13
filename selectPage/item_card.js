// 製作卡片
function get_cards(data) {
    let block_group = document.querySelector('.block_group');
    let self_group = document.querySelector('.self_group');

    data.Data.forEach(e => {
        if(e.IC_SN.substr(0,1) == "Q" || e.IC_SN.substr(0,1) == "I"){
            block_group.innerHTML += `
            <div class="group_card" data-GUID="${e.GUID}">
                    單號：${e.IC_SN}<br/>
                    名稱：${e.IC_NAME}
            </div>
            `
        } else {
            self_group.innerHTML += `
            <div class="group_card" data-GUID="${e.GUID}">
                單號：${e.IC_SN}<br/>
                名稱：${e.IC_NAME}
            </div>
            `
        }
    });
    show_detail(data, block_group)
    show_detail(data, self_group)
}

// 展示點選群組細項
function show_detail(data, click_div) {
    let show_item = document.querySelector('#show_item')
    click_div.addEventListener('click', e => {
        let group_card = document.querySelectorAll('.group_card')
        let input = e.target.dataset.guid;

        if (input) {
            group_card.forEach(i => {
                i.classList.remove('select_check');
            });
            e.target.classList.add('select_check')

            data.Data.forEach(e =>{
                if (input == e.GUID) {
                    show_item.innerHTML = `
                    <span class="material-symbols-outlined">
                    cancel
                    </span>
                    <div id="get_group_id" data-guid="${e.GUID}"></div>
                    <p>單號: ${e.IC_SN}</p>
                    <p>名稱: ${e.IC_NAME}</p>
                    <p>建表人: ${""}</p>
                    <div class="item_btn_container">
                        <button class="item_btn_style" id="release_item">發佈盤點單</button>
                        <button class="item_btn_style" id="revise_item">修改盤點單</button>
                    </div>
                    `
                    
                    let material_symbols_outlined = document.querySelector('.material-symbols-outlined')
                    material_symbols_outlined.addEventListener('click', () => {
                        show_item.innerHTML = `
                            <div class="not_select">
                                <div>請選擇上方群組進行發布</div>
                                <div>或 <button id="upload_doc">匯入表單並發布</button></div>
                            </div>
                        `
                        group_card.forEach(i => {
                            i.classList.remove('select_check');
                        });
                    })
                }
            })

        } else {
            e.preventDefault();
        }
    })
}