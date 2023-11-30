let nav_bar = `
        <div class="mobile_header_logo">
            <a href="../../pages/homepage">
            <img src="../../resource/hs_logo_shadow.png" />
            </a>
        </div>
        <div class="m_h_trigger">
            <span class="m_trigger_1"></span>
            <span class="m_trigger_2"></span>
        </div>
        <div class="mobile_nav h_nav">
            <ul class="nav_menu">
                <li class="menu_about">
                    <a href="../../pages/about/">關於我們</a>
                </li>
                <li class="menu_products">
                    <a href="../../pages/products">產品</a>
                </li>
                <li class="menu_join">
                    <a href="../../pages/work_resource">人力資源</a>
                </li>
            </ul>
        </div>
    `;

let body = document.querySelector('body');
body.innerHTML += nav_bar;

// 手機版導覽列動畫
// let m_h_trigger = document.querySelector('.m_h_trigger');

// m_h_trigger.addEventListener('click', () => {
//   let mobile_nav = document.querySelector('.mobile_nav');
//   let mobile_header_logo = document.querySelector('.mobile_header_logo');
//   let body_controll = document.querySelector('body');

//   if (m_h_trigger.classList[1]) {
//     m_h_trigger.classList.remove('m_h_trigger_active');
//     mobile_nav.style.zIndex = -1;
//     mobile_nav.style.opacity = 0;
//     mobile_header_logo.style.position = 'absolute';
//     mobile_header_logo.style.left = '0%';
//     mobile_header_logo.style.transform = 'translateX(0%)';
//     body_controll.style.overflowY = 'scroll';
//   } else {
//     m_h_trigger.classList.add('m_h_trigger_active');
//     mobile_nav.style.zIndex = 20;
//     mobile_nav.style.opacity = 1;
//     mobile_header_logo.style.position = 'fixed';
//     mobile_header_logo.style.zIndex = 21;
//     mobile_header_logo.style.left = '50%';
//     mobile_header_logo.style.transform = 'translateX(-50%)';
//     body_controll.style.overflowY = 'hidden';
//   }
// });
