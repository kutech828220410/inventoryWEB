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

    get_pages_container(html_pages);
    set_web_info_icon();
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

function get_pages_container(array) {
    let main_container = document.querySelector(".container");
    main_container.innerHTML = '';

    array.forEach(element => {
      let temp_div = get_page_section(element);

      main_container.appendChild(temp_div);
    });
}

function get_page_section(object) {
  let section_div = document.createElement("div");
  section_div.classList.add('section_div');

  let h2 = document.createElement("h2");
  h2.innerHTML = `${object.name}`;
  let h3 = document.createElement("h3");
  h3.innerHTML = `${object.engname}`;

  let pages_icon_container = document.createElement("div");
  pages_icon_container.classList.add("pages_icon_container");

  object['pages'].forEach(element => {
    let temp_div = get_page_icon(element);

    pages_icon_container.appendChild(temp_div);
  });

  section_div.appendChild(h2);
  section_div.appendChild(h3);
  section_div.appendChild(pages_icon_container);
  
  return section_div;
}

function get_page_icon(object) {
  let page_card = document.createElement("div");
  page_card.classList.add('page_card');
  page_card.addEventListener("click", () => {
    window.location.href = object.html_url;
  })

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