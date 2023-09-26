window.addEventListener('load', () => {
    let block_list = document.querySelector('.block_list');
    let self_list = document.querySelector('.self_list');
    // 連接資料
    fetch('./test.json')
        .catch((err)=>{
            console.log(err);
        }).then((res)=>{
            return res.json()
        }).then((res)=>{
            get_cards(res)
        })
})