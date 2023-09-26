function get_cards(data) {
    let block_list = document.querySelector('.block_list');
    let self_list = document.querySelector('.self_list');
    console.log(data.Data);
    data.Data.forEach(e => {
        if(e.IC_SN.substr(0,1) == "Q" || e.IC_SN.substr(0,1) == "I"){
            block_list.innerHTML += `
            <div class="list_card" GUID="${e.GUID}">${e.IC_SN}</div>
            `
            console.log(e.IC_SN.substr(0,1));
        } else {
            console.log(e.IC_SN.substr(0,1));
        }
    });
}