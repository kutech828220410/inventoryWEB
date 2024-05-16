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