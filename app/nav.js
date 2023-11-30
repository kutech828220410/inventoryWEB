window.addEventListener('load', () => {
  let m_h_trigger = document.querySelector('.m_h_trigger');

  m_h_trigger.addEventListener('click', () => {
    let mobile_nav = document.querySelector('.mobile_nav');
    let mobile_header_logo = document.querySelector('.mobile_header_logo');
    let body_controll = document.querySelector('body');

    if (m_h_trigger.classList[1]) {
      m_h_trigger.classList.remove('m_h_trigger_active');
      mobile_nav.style.zIndex = -1;
      mobile_nav.style.opacity = 0;
      mobile_header_logo.style.position = 'absolute';
      mobile_header_logo.style.left = '0%';
      mobile_header_logo.style.transform = 'translateX(0%)';
      body_controll.style.overflowY = 'auto';
    } else {
      m_h_trigger.classList.add('m_h_trigger_active');
      mobile_nav.style.zIndex = 20;
      mobile_nav.style.opacity = 1;
      mobile_header_logo.style.position = 'fixed';
      mobile_header_logo.style.zIndex = 21;
      mobile_header_logo.style.left = '50%';
      mobile_header_logo.style.transform = 'translateX(-50%)';
      body_controll.style.overflowY = 'hidden';
    }
  });
});
