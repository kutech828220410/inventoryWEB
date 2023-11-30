window.addEventListener('load', () => {
  let windowWidth = window.innerWidth;
  let tb_title_ct = document.querySelector('.tb_title_ct');

  if (windowWidth < 550) {
    tb_title_ct.innerHTML =
      '鴻森整合機電<span class="padding_left">有限公司</span>';
  }
});
