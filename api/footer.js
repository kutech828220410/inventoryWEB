window.addEventListener('load', () => {
  const footer_div = document.createElement('footer');
  footer_div.classList.add('footer_div');

  footer_div.innerHTML = `
    <div class="footer_menu">
        <a href="../../pages/homepage/">首頁</a>
        <a href="../../pages/about/">關於我們</a>
        <a href="../../pages/products">產品</a>
        <a href="../../pages/work_resource">人力資源</a>
    </div>
    <div class="f_contact_info">
      <div class="f_contact_info_title">鴻森整合機電有限公司</div>
      <div class="f_contact_info_phone">
        <div class="phone_tax"><span>傳真：</span>02-82822040</div>
        <div class="phone_tax"><span>電話：</span>02-82821373</div>
      </div>
      <div class="f_contact_info_address">新北市蘆洲區和平路114巷8號6樓
        <a href="https://www.google.com/maps/place/247%E6%96%B0%E5%8C%97%E5%B8%82%E8%98%86%E6%B4%B2%E5%8D%80%E5%92%8C%E5%B9%B3%E8%B7%AF114%E5%B7%B78%E8%99%9F6/@25.0800898,121.4659587,17z/data=!3m1!4b1!4m5!3m4!1s0x3442a8c7f81e9961:0x5d4925ab8b302f1b!8m2!3d25.0800898!4d121.468539?authuser=0&entry=ttu" target="_blank">
          <img src="../../resource/map.png" alt="location-icon">
        </a>
      </div>
    </div>
    <div class="footer_bottom">Copyright ©2023 鴻森整合機電有限公司</div>
  `;

  let main_div = document.querySelector('#main');
  main_div.appendChild(footer_div);
});
