window.addEventListener('load', () => {
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