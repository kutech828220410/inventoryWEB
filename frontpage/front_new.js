window.onload = load;
async function load()
{
    const serverName ="";
    const serverType = "網頁";
    sessionStorage.setItem('ServerName', "");
    // sessionStorage.setItem('ServerName', "DS01");
    sessionStorage.setItem('ServerType', "網頁");
    // sessionStorage.setItem('ServerType', "藥庫");
    APIServer = await LoadAPIServer();
    const API01 = serch_APIServer(serverName,serverType,"API01");
    const API02 = serch_APIServer(serverName,serverType,"API02");
    console.log("API01",API01);
    console.log("API02",API02);
    await check_ip(API01[0].server,API02[0].server);
    console.log("inventory_url",inventory_url);

    let permissions_arr = await get_permissions_arr();
    console.log(permissions_arr);

    var loggedID = sessionStorage.getItem('loggedID');  
    var loggedName = sessionStorage.getItem('loggedName');  
    const test_user_data = {
      id: loggedID,
      name: loggedName,
    }

    set_web_info_icon();
    nav_bar_create("frontpage", test_user_data);
    get_pages_container(html_pages, permissions_arr);
}

function get_pages_container(array, arr) {
    let main_container = document.querySelector(".container");
    main_container.innerHTML = '';

    array.forEach(element => {
      let temp_div = get_page_section(element, arr);

      main_container.appendChild(temp_div);
    });
}

function get_page_section(object, arr) {
  if(object["branch"].length < 2) {
    let section_div = document.createElement("div");
    section_div.classList.add('section_div');
  
    let h2 = document.createElement("h2");
    h2.innerHTML = `${object.name}`;
    let h3 = document.createElement("h3");
    h3.innerHTML = `${object.engname}`;
  
    let pages_icon_container = document.createElement("div");
    pages_icon_container.classList.add("pages_icon_container");

    if(arr == "error") {
        object['branch'][0]["pages"].forEach(element => {
          let temp_div = get_page_icon(element, arr);
          pages_icon_container.appendChild(temp_div);
        });
    } else {      
        object['branch'][0]["pages"].forEach(element => {
          let temp_div = get_page_icon(element, arr);
          if(front_page_display_logic(element.html_name, arr)) {
            pages_icon_container.appendChild(temp_div);
          }
        });
    
        // 將禁止頁面放置後方
        object['branch'][0]["pages"].forEach(element => {
          let temp_div = get_page_icon(element, arr);
          if(!front_page_display_logic(element.html_name, arr)) {
            pages_icon_container.appendChild(temp_div);
          }
        });
    }
  
    section_div.appendChild(h2);
    section_div.appendChild(h3);
    section_div.appendChild(pages_icon_container);
    
    return section_div;
  } else {
    let rotate_div = document.createElement("div");
    rotate_div.classList.add("rotate_div");

    let name_arr = ["中藥局", "藥局"];

    object['branch'].forEach((element, index) => {
      let card_div = document.createElement("div");
      card_div.classList.add("card_div");
      if(index == 0) {
        card_div.classList.add(`front_div`);
      } else {
        card_div.classList.add("back_div");
      }

      let h2 = document.createElement("h2");
      h2.innerHTML = `${element.name}`;
      let h3 = document.createElement("h3");
      h3.innerHTML = `${element.engname}`;
    
      let pages_icon_container = document.createElement("div");
      pages_icon_container.classList.add("pages_icon_container");

      let filp_btn = document.createElement("div");
      filp_btn.innerHTML = `${name_arr[index]}<img src="../image/fast-forward.png" alt="">`;
      filp_btn.classList.add("filp_btn");
      filp_btn.addEventListener("click", () => {
        rotate_div.classList.toggle("rotate180");
        // filp_btn.classList.toggle("img_rotate");
      });
    
      card_div.appendChild(filp_btn);
      card_div.appendChild(h2);
      card_div.appendChild(h3);

      if(arr == "error") {
        element["pages"].forEach(element => {
          let temp_div = get_page_icon(element, arr);
          pages_icon_container.appendChild(temp_div);
        });
      } else {
        element["pages"].forEach(element => {
          let temp_div = get_page_icon(element, arr);
          if(front_page_display_logic(element.html_name, arr)) {
            pages_icon_container.appendChild(temp_div);
          }
        });
  
        // 將禁止頁面放置後方
        element["pages"].forEach(element => {
          let temp_div = get_page_icon(element, arr);
          if(!front_page_display_logic(element.html_name, arr)) {
            pages_icon_container.appendChild(temp_div);
          }
        });
      }

      card_div.appendChild(pages_icon_container);

      rotate_div.appendChild(card_div);
    });

    return rotate_div;
  }
}

function get_page_icon(object, arr) {
  let page_card = document.createElement("div");
  page_card.classList.add('page_card');
  if(arr == "error") {
    page_card.addEventListener("click", () => {
      window.location.href = object.html_url;
    })
  } else {
    if(!front_page_display_logic(object.html_name, arr)) {
      page_card.classList.add('web_icon_disable');
      page_card.addEventListener("click", () => {
        alert("尚未啟用該功能");
      })
    } else {
      page_card.addEventListener("click", () => {
        window.location.href = object.html_url;
      })
    }
  }

  let page_card_img = document.createElement("img");
  page_card_img.classList.add("page_card_img");
  page_card_img.src = object.icon_big_url;

  let page_card_title = document.createElement("div");
  page_card_title.classList.add("page_card_title");
  page_card_title.innerHTML = object.html_ctName;

  let page_card_engtitle = document.createElement("div");
  page_card_engtitle.classList.add("page_card_title");
  page_card_engtitle.innerHTML = object.html_name;

  page_card.appendChild(page_card_img);
  page_card.appendChild(page_card_title);
  //   page_card.appendChild(page_card_engtitle);

  return page_card;
}


function set_web_info_icon() {
  let info_btn = document.querySelector(".info_btn");
  info_btn.addEventListener("click", async () => {
    let web_info_api = await get_web_version_info();
    let api_version_data = await get_api_version();
    set_version_func(web_info_api, api_version_data);
    popup_info_div_open();
  });
}
async function get_api_version() {
  let temp_data = await fetch(`${api_ip}api/test`, {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      },
      // body: JSON.stringify({"Data":{}}),
  }).then((response) => {
      return response.json();
  })
  
  return temp_data
}