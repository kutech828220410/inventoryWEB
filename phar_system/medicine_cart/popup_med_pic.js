let popup_med_pic_div;

function get_popup_med_pic() {
    popup_med_pic_div = new Basic_popup_Div('popup_med_pic_div','popup_med_pic_div','','');
    popup_med_pic_div._popup_div.style.border = '10px solid white';

    let header = get_pp_med_pic_header();
    let main = get_pp_med_pic_main();
    let footer = get_pp_med_pic_footer();

    popup_med_pic_div.AddControl(header);
    popup_med_pic_div.AddControl(main);
    popup_med_pic_div.AddControl(footer);

    return popup_med_pic_div;
};
function get_pp_med_pic_header() {
    let ppmp_header_container = document.createElement("div");
    ppmp_header_container.classList.add("ppmp_header_container");

    let ppmp_h_title = document.createElement("div");
    ppmp_h_title.classList.add("ppmp_h_title");
    ppmp_h_title.innerHTML = `<span class="ppmp_h_title_span">藥品外觀</span>`;

    let ppmp_h_close_btn = document.createElement("img");
    ppmp_h_close_btn.classList.add("ppmp_h_close_btn");
    ppmp_h_close_btn.src = "../image/close.png";
    ppmp_h_close_btn.addEventListener("click", () => {
        popup_med_pic_div_close();
    });

    ppmp_header_container.appendChild(ppmp_h_title);
    ppmp_header_container.appendChild(ppmp_h_close_btn);

    return ppmp_header_container;
}
function get_pp_med_pic_main() {
    let ppmp_main_container = document.createElement("div");
    ppmp_main_container.classList.add("ppmp_main_container");

    let ppmp_main_name = document.createElement("div");
    ppmp_main_name.classList.add("ppmp_main_name");

    let ppmp_main_cht_name = document.createElement("div");
    ppmp_main_cht_name.classList.add("ppmp_main_cht_name");

    let ppmp_main_code = document.createElement("div");
    ppmp_main_code.classList.add("ppmp_main_code");

    let ppmp_main_pic_container = document.createElement("div");
    ppmp_main_pic_container.classList.add("ppmp_main_pic_container");

    ppmp_main_container.appendChild(ppmp_main_name);
    ppmp_main_container.appendChild(ppmp_main_cht_name);
    ppmp_main_container.appendChild(ppmp_main_code);
    ppmp_main_container.appendChild(ppmp_main_pic_container);

    return ppmp_main_container;
}
function get_pp_med_pic_footer() {
    let ppmp_footer_container = document.createElement("div");
    ppmp_footer_container.classList.add("ppmp_footer_container");

    return ppmp_footer_container;
}
function popup_med_pic_div_close() {
    popup_med_pic_div.Set_Visible(false);
}
async function popup_med_pic_div_open() {
    popup_med_pic_div.Set_Visible(true);
}
async function set_pp_med_pic_func(name, cht_name, code) {
    let ppmp_main_name = document.querySelector(".ppmp_main_name");
    let ppmp_main_cht_name = document.querySelector(".ppmp_main_cht_name");
    let ppmp_main_code = document.querySelector(".ppmp_main_code");
    let ppmp_main_pic_container = document.querySelector(".ppmp_main_pic_container");
    ppmp_main_pic_container.innerHTML = "";

    let pic_boolean = false;
    if(page_setting_params.med_pic_base64) {
      pic_boolean = page_setting_params.med_pic_base64.value == "True" ? false : true;
    }

    if(pic_boolean) {
        // ===== 使用範例（只需兩個參數）=====
        let temp_arr = [
            "https://www7.vghtpe.gov.tw/home/attach/f91e89b6-4177-4ad7-9ea6-1055e23713b4",
            "https://www7.vghtpe.gov.tw/home/attach/a00c5e10-7487-4554-b9ff-4fd91fb4c568",
            "https://www7.vghtpe.gov.tw/home/attach/a071a9a0-6ae9-464e-9a00-acbf030dc561"
        ];
        // createLoopSlider(ppmp_main_pic_container, temp_arr);
        set_med_silder_pic([], ppmp_main_pic_container);
    } else {
        let ppmp_main_img = document.createElement("img");
        ppmp_main_img.classList.add("ppmp_main_img");
    
        ppmp_main_pic_container.appendChild(ppmp_main_img);
    
        let temp_pic_data = await get_med_pic_by_code(code);
        let med_pic_data = temp_pic_data.Data;
        let temp_src;
    
        // console.log(temp_pic_data);
        if(temp_pic_data.Code != -200) {
            temp_src = med_pic_data.pic_base64;
        } else {
            temp_src = "../image/no_pic.png";
        }
        ppmp_main_img.src = temp_src;
    }

    ppmp_main_name.innerHTML = `${name}`;
    ppmp_main_cht_name.innerHTML = cht_name;
    ppmp_main_code.innerHTML = `藥碼：${code}`;
}

function set_med_silder_pic(array, div) {
    let temp_arr = [
        "https://www7.vghtpe.gov.tw/home/attach/f91e89b6-4177-4ad7-9ea6-1055e23713b4",
        "https://www7.vghtpe.gov.tw/home/attach/a00c5e10-7487-4554-b9ff-4fd91fb4c568",
        "https://www7.vghtpe.gov.tw/home/attach/a071a9a0-6ae9-464e-9a00-acbf030dc561",
        "https://www7.vghtpe.gov.tw/home/attach/8bb41a33-5e68-49e1-95f4-147b926ac950",
        "https://www7.vghtpe.gov.tw/home/attach/2003209a-b7ce-4e88-b76a-e3d80fb4ad7e",
        "https://www7.vghtpe.gov.tw/home/attach/becfae1e-f4c1-434f-a6b5-88878a170b69"
    ];

    div.style.position = "relative";

    let silder_med_container = document.createElement("div");
    silder_med_container.classList.add("silder_med_container");

    let max_slider_index = temp_arr.length - 1;

    temp_arr.forEach((element, index) => {
        let silder_div = document.createElement("div");
        silder_div.classList.add("silder_div");
        silder_div.classList.add(`silder_div_${index}`);
        if(index == max_slider_index) {
            silder_div.style.left = `100%`;
        } else {
            silder_div.style.left = `${100 * -index}%`;
        }

        let silder_img = document.createElement("img");
        silder_img.classList.add("silder_img");
        silder_img.src = element

        silder_div.appendChild(silder_img);

        silder_med_container.appendChild(silder_div);
    });
    
    if(temp_arr.length > 1) {
        let slider_pre_btn = document.createElement("div");
        slider_pre_btn.classList.add("slider_pre_btn");
        slider_pre_btn.addEventListener("click", () => {
            let silder_div_arr = document.querySelectorAll(".silder_div");

            silder_div_arr.forEach(element => {
                // console.log(element);
                // 全部往左移動
                let current_left = +element.style.left.replace("%", "");
                element.style.left = `${current_left - 100}%`;

                // 取得新的展示圖片定位
                let new_left = +element.style.left.replace("%", "");
                let remove_index;

                if(new_left == (max_slider_index * -100)) {
                    let temp_class = element.classList[1]
                    remove_index = temp_class.split('_')[2];
                    console.log('--------' ,temp_class);
                    console.log('--------' ,remove_index);
                    element.remove();
                }

                if(new_left == 0) {
                    // 取得所有移動照片的index
                    let temp_remove_class_index = element.classList[1];
                    let temp_index = temp_remove_class_index.split('_')[2];
                    console.log("展示的容器",temp_remove_class_index);
                    console.log("容器的index", temp_index);

                    //       |         |
                    // 3 2 1 0
                    // 2 1 0 3 ==> 1 0 3 2
                    // 1 0 3 2
                    // 0 3 2 1
                    //       |         |
                    let new_create_index = +temp_index - 1;
                    if(new_create_index < 0) new_create_index = max_slider_index;
                    console.log(new_create_index);
                    console.log("新增的index", new_create_index);
                    
                    let silder_div = document.createElement("div");
                    silder_div.classList.add("silder_div");
                    silder_div.classList.add(`silder_div_${new_create_index}`);
                    let temp_move = +max_slider_index - 1;
                    silder_div.style.left = `100%`;

                    let silder_img = document.createElement("img");
                    silder_img.classList.add("silder_img");
                    silder_img.src = temp_arr[new_create_index];

                    silder_div.appendChild(silder_img);

                    silder_med_container.appendChild(silder_div);
                }
            }); 
        });
    
        let slider_next_btn = document.createElement("div");
        slider_next_btn.classList.add("slider_next_btn");
        slider_next_btn.addEventListener("click", () => {
            let silder_div_arr = document.querySelectorAll(".silder_div");

            silder_div_arr.forEach(element => {
                // console.log(element);
                // 全部往左移動
                let current_left = +element.style.left.replace("%", "");
                element.style.left = `${current_left + 100}%`;

                // 取得新的展示圖片定位
                let new_left = +element.style.left.replace("%", "");
                if(new_left > 100) {
                    element.remove();
                }

                if(new_left == 0) {
                    // 取得所有移動照片的index
                    let temp_remove_class_index = element.classList[1];
                    let temp_index = temp_remove_class_index.split('_')[2];
                    console.log("展示的容器",temp_remove_class_index);
                    console.log("容器的index", temp_index);

                    //   |             |
                    // 3 2 1 0
                    // 2 1 0 3 ==> 3 2 1 0 
                    // 1 0 3 2 ==> 2 1 0 3
                    // 0 3 2 1
                    //   |             |
                    let new_create_index = +temp_index - 2;
                    if(new_create_index < 0) {
                        switch (new_create_index) {
                            case -1:
                                new_create_index = +max_slider_index;
                                break;
                            case -2:
                                new_create_index = +max_slider_index - 1;
                                break;
                        
                            default:
                                break;
                        }
                    }
                    console.log(new_create_index);
                    console.log("新增的index", new_create_index);
                    
                    let silder_div = document.createElement("div");
                    silder_div.classList.add("silder_div");
                    silder_div.classList.add(`silder_div_${new_create_index}`);
                    let temp_move = +max_slider_index - 1;
                    silder_div.style.left = `${temp_move * -100}%`;

                    let silder_img = document.createElement("img");
                    silder_img.classList.add("silder_img");
                    silder_img.src = temp_arr[new_create_index];

                    silder_div.appendChild(silder_img);

                    silder_med_container.appendChild(silder_div);
                }
            }); 
        });

        div.appendChild(slider_pre_btn);
        div.appendChild(slider_next_btn);
    }

    div.appendChild(silder_med_container);
}

/** 無縫循環輪播：只需容器與圖片陣列兩個參數 */
function createLoopSlider(container, images) {
  // 容器解析：支援字串選擇器或元素
  const root = typeof container === 'string' ? document.querySelector(container) : container;
  if (!root) throw new Error('createLoopSlider: 找不到容器元素');
  if (!Array.isArray(images) || images.length < 1) throw new Error('createLoopSlider: images 需為非空陣列');

  // ---- 全域樣式（只注入一次）----
  const STYLE_ID = 'loop-slider-base-style';
  if (!document.getElementById(STYLE_ID)) {
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .lslider { position: relative; width: 100%; max-width: 800px; margin: 0 auto; user-select:none; }
      .ls-viewport { overflow: hidden; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,.12); }
      .ls-track { display: flex; transition: transform .5s ease; will-change: transform; }
      .ls-slide { flex: 0 0 100%; height: 360px; display:flex; align-items:center; justify-content:center; background:#f1f5f9; }
      .ls-slide > img { width:100%; height:100%; object-fit: cover; display:block; }
      .ls-nav { position:absolute; top:50%; transform:translateY(-50%); width:44px; height:44px; border:0; border-radius:999px; background:rgba(0,0,0,.45); color:#fff; font-size:28px; line-height:44px; cursor:pointer; z-index:2; }
      .ls-nav:hover { background:rgba(0,0,0,.6); }
      .ls-prev { left:8px; } .ls-next { right:8px; }
      .ls-dots { display:flex; gap:8px; justify-content:center; margin-top:10px; }
      .ls-dot { width:8px; height:8px; border-radius:999px; background:#cbd5e1; cursor:pointer; transition:transform .2s ease, background .2s ease; border:0; }
      .ls-dot.is-active { background:#334155; transform:scale(1.25); }
      @media (hover:none){ .ls-nav { width:56px; height:56px; font-size:32px; line-height:56px; } }
    `;
    document.head.appendChild(style);
  }

  // ---- 建立 DOM ----
  root.classList.add('lslider');
  root.innerHTML = `
    <button class="ls-nav ls-prev" aria-label="上一張">‹</button>
    <div class="ls-viewport"><div class="ls-track"></div></div>
    <button class="ls-nav ls-next" aria-label="下一張">›</button>
    <div class="ls-dots" aria-label="頁面指示器"></div>
  `;

  const viewport = root.querySelector('.ls-viewport');
  const track = root.querySelector('.ls-track');
  const prevBtn = root.querySelector('.ls-prev');
  const nextBtn = root.querySelector('.ls-next');
  const dotsBox = root.querySelector('.ls-dots');

  // 產生真實 slides
  images.forEach((src, i) => {
    const div = document.createElement('div');
    div.className = 'ls-slide';
    div.dataset.idx = String(i);
    const img = document.createElement('img');
    img.alt = `slide-${i+1}`;
    img.src = src;
    div.appendChild(img);
    track.appendChild(div);
  });

  // clone 首尾以無縫迴圈
  const slides = Array.from(track.children);
  const count = slides.length;
  const firstClone = slides[0].cloneNode(true);
  const lastClone  = slides[count - 1].cloneNode(true);
  firstClone.dataset.clone = 'first';
  lastClone.dataset.clone = 'last';
  track.insertBefore(lastClone, slides[0]);
  track.appendChild(firstClone);

  const allSlides = Array.from(track.children);

  // 狀態
  let index = 1; // 從真實第一張（含前置 clone 後的索引）開始
  let width = viewport.clientWidth;
  const DURATION = 500; // 與 CSS transition .5s 對齊
  let isAnimating = false;
  let timer = null;
  const AUTOPLAY_MS = 3000;

  // dots
  function renderDots() {
    dotsBox.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const b = document.createElement('button');
      b.className = 'ls-dot' + (i === 0 ? ' is-active' : '');
      b.type = 'button';
      b.dataset.to = String(i);
      dotsBox.appendChild(b);
    }
  }
  function setActiveDot(realIdx) {
    dotsBox.querySelectorAll('.ls-dot').forEach(d => d.classList.remove('is-active'));
    const dot = dotsBox.querySelector(`.ls-dot[data-to="${realIdx}"]`);
    if (dot) dot.classList.add('is-active');
  }

  // 移動
  function setTranslate(immediate = false) {
    if (immediate) track.style.transition = 'none';
    track.style.transform = `translateX(${-index * width}px)`;
    if (immediate) requestAnimationFrame(() => { track.style.transition = ''; });
  }
  function animate(step = 0) {
    if (isAnimating) return;
    isAnimating = true;
    if (step) index += step;

    const onEnd = () => {
      track.removeEventListener('transitionend', onEnd);
      // 無縫重定位
      if (allSlides[index]?.dataset.clone === 'first') {
        index = 1;
        setTranslate(true);
      } else if (allSlides[index]?.dataset.clone === 'last') {
        index = count;
        setTranslate(true);
      }
      const real = (index - 1 + count) % count;
      setActiveDot(real);
      isAnimating = false;
    };
    track.addEventListener('transitionend', onEnd, { once: true });

    // 安全保險（部分裝置 transitionend 偶發缺失）
    setTimeout(() => {
      if (isAnimating) track.dispatchEvent(new Event('transitionend'));
    }, DURATION + 50);

    setTranslate(false);
  }
  function goTo(realIdx) {
    index = realIdx + 1; // 真實 -> 含 clone
    setActiveDot(realIdx);
    setTranslate(false);
  }

  // 自動播放
  function play() {
    stop();
    timer = setInterval(() => animate(+1), AUTOPLAY_MS);
  }
  function stop() {
    if (timer) { clearInterval(timer); timer = null; }
  }

  // 事件：按鈕
  prevBtn.addEventListener('click', () => animate(-1));
  nextBtn.addEventListener('click', () => animate(+1));

  // 事件：dots
  dotsBox.addEventListener('click', (e) => {
    const btn = e.target.closest('.ls-dot');
    if (!btn) return;
    goTo(+btn.dataset.to);
  });

  // 懸停/觸控暫停
  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', play);
  root.addEventListener('touchstart', stop, { passive: true });
  root.addEventListener('touchend', play, { passive: true });

  // 拖曳/滑動
  let startX = 0, dx = 0, dragging = false;
  viewport.addEventListener('pointerdown', (e) => {
    dragging = true;
    startX = e.clientX;
    stop();
    track.style.transition = 'none';
  });
  window.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    dx = e.clientX - startX;
    track.style.transform = `translateX(${-(index * width) + dx}px)`;
  });
  window.addEventListener('pointerup', () => {
    if (!dragging) return;
    dragging = false;
    track.style.transition = '';
    if (Math.abs(dx) > width * 0.2) animate(dx < 0 ? +1 : -1);
    else setTranslate(false);
    dx = 0;
    play();
  });

  // 響應式
  function resize() {
    width = viewport.clientWidth;
    setTranslate(true);
  }
  window.addEventListener('resize', resize);

  // 初始化
  renderDots();
  setTranslate(true);
  play();

  // 對外控制
  return {
    next: () => animate(+1),
    prev: () => animate(-1),
    goTo: (i) => goTo(i),
    play,
    stop,
    destroy: () => {
      stop();
      window.removeEventListener('resize', resize);
      // 清空容器（保留 root 本身）
      root.innerHTML = '';
      root.classList.remove('lslider');
    }
  };
}

