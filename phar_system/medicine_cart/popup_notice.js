function set_popup_notice_div() {
    let body = document.querySelector('body');

    let popup_notice_div = document.createElement('div');
    popup_notice_div.id = 'popup_notice_div';
    popup_notice_div.classList.add('popup_notice_div');

    body.appendChild(popup_notice_div);
}

function show_popup_notice(message, err_bool) {
    let popup_notice_div = document.querySelector('.popup_notice_div');

    if(err_bool) {
        popup_notice_div.style.backgroundColor = '#80fe9c';
    } else {
        popup_notice_div.style.backgroundColor = '#ffb3b3';
    }

    popup_notice_div.innerHTML = message;

    popup_notice_div.style.display = 'block';
    setTimeout(() => {
        popup_notice_div.style.display = 'none';
    }, 2000);
}