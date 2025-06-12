window.onload = load;
// window.addEventListener('resize', handleResize);
let medicine_page = [];
let temp_object_aa = {};
var IsLogged = (function() 
{
  return (sessionData.Name != null && sessionData.Name != "");
})();;

function handleResize() 
{
   //Set_popup_find_position();
}
async function load()
{
  check_session_off();
  var serverName = "";
  //   ServerName = serverName;
  ServerType = "網頁";
  TableName = "medicine_page";
  APIServer = await LoadAPIServer();
  console.log(ServerType, TableName, APIServer);
  const API01 = serch_APIServer(serverName,"調劑台","API01");
  const API02 = serch_APIServer(serverName,"調劑台","API02");
  console.log("API01",API01);
  console.log("API02",API02);
  check_ip(API01[0].server,API02[0].server);
  permissions = await GetApipermissions();
  console.log(permissions);

  await page_check_permissions("requisitions_upload");

  let rowNum = 1;
  const Loadingpopup = GetLoadingpopup();
  document.body.appendChild(Loadingpopup);
  Set_main_div_enable(true);
  medicine_page = await get_medicine_cloud();
  medicine_page = medicine_page.Data;
  console.log(medicine_page);

  let loggedID = sessionStorage.getItem('loggedID');  
  let loggedName = sessionStorage.getItem('loggedName');  
  const test_user_data = {
    id: loggedID,
    name: loggedName,
  }

  let post_data = {
    ValueAry: [loggedID],
    Value: "N"
  }
  user_log = await user_precheck(post_data);

  nav_bar_create("requisitions_upload", test_user_data);
  get_header(test_user_data);
  get_main_div();

  set_main_init();
  set_input_file_event();

  // set_main_card_display();
  initializeImageZoom();
  initializeImageZoom_ppui();

  Set_main_div_enable(false);
}

function get_header(test_user_data) {
    let body = document.querySelector("body");
    const header = document.createElement("div");
    header.id = "header";
    header.className = "header";

    let header_title_container = document.createElement("div");
    header_title_container.classList = "header_title_container";

    let h_title = document.createElement("div");
    h_title.classList = 'h_title';
    h_title.innerHTML = "單據辨識";

    let header_user = document.createElement("div");
    header_user.classList.add("header_user");
    header_user.innerHTML = `使用者 : ${test_user_data.name}`

    header_title_container.appendChild(h_title);
    header_title_container.appendChild(header_user);

    let header_btn_container = document.createElement("div");
    header_btn_container.classList = "header_btn_container";

    let header_logout_btn = document.createElement("div");
    header_logout_btn.classList.add("header_logout_btn");
    header_logout_btn.innerHTML = `<img src="../../image/logout.png" alt="upload">`;
    header_logout_btn.addEventListener("click", async () => {
      if (confirm("是否登出？")) {
        sessionStorage.removeItem("login_json");
        sessionStorage.removeItem("IC_SN");

        location.reload();
      }
    });

    header_btn_container.appendChild(header_logout_btn);

    header.appendChild(header_title_container);
    header.appendChild(header_btn_container);
    body.appendChild(header);
}

async function popup_login_finished() {
  console.log(`[${arguments.callee.name}]`);
}

function get_main_div() {
    let body = document.querySelector("body");
    const main_div = document.createElement("div");
    main_div.id = "main_div";
    main_div.className = "main_div";

    let main_header_btn_container = document.createElement("div");
    main_header_btn_container.classList.add("main_header_btn_container");
    
    let main_display_card_container = document.createElement("div");
    main_display_card_container.classList.add("main_display_card_container");

    main_div.appendChild(main_header_btn_container);
    main_div.appendChild(main_display_card_container);

    body.appendChild(main_div);
}
function Set_main_div_enable(value) 
{
    const main_div = document.querySelector('#main_div');
    if (value) {
      showLoadingPopup();
    }
    else {
      hideLoadingPopup();
    }
}

function set_main_init() {
  let main_div = document.querySelector(".main_div");
  let main_header_btn_container = document.querySelector(".main_header_btn_container");
  let main_display_card_container = document.querySelector(".main_display_card_container");

  main_header_btn_container.innerHTML = "";
  main_display_card_container.innerHTML = "";

  let new_add_pic_container = document.createElement("div");
  new_add_pic_container.classList.add("new_add_pic_container");

  let new_add_pic_btn = document.createElement("div");
  new_add_pic_btn.classList.add("new_add_pic_btn");
  new_add_pic_btn.addEventListener("click", async () => {
    // 索取回執
    // let pic_input = document.getElementById("pic_input");
    console.log(user_log);
    if(user_log.Code == 201) {
      // 確認回執
      if(confirm("尚有未辨識完成或未完成輸入單據，是否恢復？")) {
        Set_main_div_enable(true);
        let loggedID = sessionStorage.getItem('loggedID'); 
        let post_data = {
          ValueAry: [loggedID],
          Value: "Y"
        }
        let return_data = await user_precheck(post_data);
        console.log(return_data);
        batch_id = return_data.Data[0].batch_id;

        let unanal_count = 0;
        let index_count = 0;
        let fail_file_count = 0;
        let repeat_count = 0;
        done_list_data = [];

        Set_main_div_enable(false);
        process_bar_display(true);
        return_data["Data"].forEach(element => {
          if(element.Code_status == -200 && element.Result == "未辨識") {
            unanal_count += 1;
          }
        });
        console.log(unanal_count);
        for (let i = 0; i < return_data["Data"].length; i++) {
          const element = return_data["Data"][i];
          if(element.Code_status == -200) {
            let post_data = {
              ValueAry:[element.GUID]
            };

            console.log(post_data);
            let return_data = await img_to_analysis(post_data);
            console.log(return_data);
            if(return_data.Code != -200) {
              if(return_data.Data[0].Code_status == 200 || return_data.Data[0].Code_status == -2 || return_data.Data[0].Code_status == -1) {
                console.log("辨識完成", return_data);
                console.log("GUID", return_data.Data[0].GUID);
                orgin_list_data.push(return_data.Data[0]);
                set_process_bar_log(unanal_count, index_count, process_bar_status.anal);
                index_count += 1;
              } else if(return_data.Data[0].Code_status == -4) {
                console.log("辨識重複且完成", return_data);
                console.log("GUID", return_data.Data[0].GUID);
                done_list_data.push(return_data.Data[0]);
                let del_post_data = {
                  ValueAry:[element.GUID]
                }
                console.log("刪除api_GUID", del_post_data);
                await delete_by_GUID(del_post_data);
                set_process_bar_log(unanal_count, index_count, process_bar_status.anal);
                index_count += 1;
              } else if(return_data.Data[0].Code_status == -5) {
                console.log("辨識重複單號", return_data);
                console.log("GUID", element.GUID);
                let del_post_data = {
                  ValueAry:[element.GUID]
                }
                console.log("刪除api_GUID", del_post_data);
                await delete_by_GUID(del_post_data);
                set_process_bar_log(unanal_count, index_count, process_bar_status.anal);
                index_count += 1;
                repeat_count += 1;
              } else if(return_data.Data[0].Code_status == -200) {
                fail_file_count += 1;
                console.log(return_data);
                alert(`第${i + 1}張圖片，發生預料外錯誤，Result: ${return_data.Result}`);
                set_process_bar_log(unanal_count, index_count, process_bar_status.anal);
                
                index_count += 1;
              }
            } else {
              fail_file_count += 1;
              console.log(return_data);
              alert(`第${i + 1}張圖片，發生預料外錯誤，Result: ${return_data.Result}`);
              set_process_bar_log(unanal_count, index_count, process_bar_status.anal);
              
              index_count += 1;
            }
          } else {
            orgin_list_data.push(element);
          }
        }
        if(fail_file_count > 0) {
          alert(`有檢測到${fail_file_count}張單據，發生預料外錯誤。`);
          
          // let pic_input = document.querySelector(".pic_input");
          // pic_input.value = "";
        }
        if(repeat_count > 0) {
          alert(`有檢測到${repeat_count}張單號重複，以刪除。`);
          // let pic_input = document.querySelector(".pic_input");
          // pic_input.value = "";
        }
    
        if(done_list_data.length != 0) {
          let temp_str = `下列單據已辨識過並排除\n`;
    
          let temp_arr = [];
          done_list_data.forEach(element => {
            temp_arr.push(element.po_num);
          });
    
          temp_str += temp_arr.join("、");
          alert(temp_str);
        }
        display_list_data = orgin_list_data;
        set_main_card_display();
        init_mdc_card_container();
        reset_process_bar_log(process_bar_status.anal);
        process_bar_display(false);
        // display_list_data.forEach(element => {
        //   set_upload_data_display(element);
        // });
        set_upload_data_display_arr(display_list_data);
        return;
      }

      popup_confrim_IC_SN_open();
    } else if(user_log.Code == 202) {
      popup_confrim_IC_SN_open();
    } else if(user_log.Code == -200){
      console.error(user_log.Result);
    }
  });

  let napc_img = document.createElement("img");
  napc_img.classList.add("napc_img");
  napc_img.src = "../../image/add.png";

  let napc_content_title = document.createElement("div");
  napc_content_title.classList.add("napc_content_title");
  napc_content_title.innerHTML = "上傳來源";

  let napc_content = document.createElement("div");
  napc_content.classList.add("napc_content");
  napc_content.classList.add("napc_content");
  napc_content.innerHTML = "<span>選擇檔案</span>上傳";

  let napc_content_bottom = document.createElement("div");
  napc_content_bottom.classList.add("napc_content_bottom");
  napc_content_bottom.classList.add("napc_content_bottom");
  napc_content_bottom.innerText = `支援的檔案類型\n.jpg .png .heic(圖像檔案)`;

  new_add_pic_btn.appendChild(napc_img);
  new_add_pic_btn.appendChild(napc_content_title);
  new_add_pic_btn.appendChild(napc_content);
  new_add_pic_btn.appendChild(napc_content_bottom);

  new_add_pic_container.appendChild(new_add_pic_btn);

  main_div.appendChild(new_add_pic_container);
}
// 單獨處理檔案選擇框的點擊邏輯，保證在用戶互動中執行
function handleFileInput() {
  let pic_input = document.getElementById("pic_input");
  pic_input.click(); // 確保 click() 是在用戶操作範圍內觸發
  Set_main_div_enable(false);
}
function set_main_card_display() {
  let new_add_pic_container = document.querySelector(".new_add_pic_container");
  new_add_pic_container.style.display = "none";
  clear_card_display_container();
  set_main_header_btn_container();
  set_main_card_display_container();
  scroll_fixed_events();
  // set_upload_data_display_arr(test_data);
}
function set_main_header_btn_container() {
  let main_header_btn_container = document.querySelector(".main_header_btn_container");

  let mhb_new_btn_container = document.createElement("div");
  mhb_new_btn_container.classList.add("mhb_new_btn_container");
  mhb_new_btn_container.addEventListener("click", () => {
    popup_confrim_IC_SN_open();
  })

  let mhb_new_img = document.createElement("img");
  mhb_new_img.classList.add("mhb_new_img");
  mhb_new_img.src = "../../image/add.png"; 

  let mhb_new_content = document.createElement("div");
  mhb_new_content.classList.add("mhb_new_content");
  mhb_new_content.innerHTML = "New Upload";

  mhb_new_btn_container.appendChild(mhb_new_img);
  mhb_new_btn_container.appendChild(mhb_new_content);

  let mhb_search_input_div = document.createElement("div");
  mhb_search_input_div.classList.add("mhb_search_input_div");

  let search_input_container = document.createElement("div");
  search_input_container.classList.add("search_input_container");

  let search_input = document.createElement("input");
  search_input.classList.add("search_input");
  search_input.type = "text";
  search_input.maxLength = 80;
  search_input.placeholder = "請輸入單號";
  search_input.addEventListener("blur", () => {
    setTimeout(() => {
      search_result_container.style.display = "none";
    }, 100);
  })
  search_input.addEventListener("focus", () => {
    search_result_container.style.display = "block";
  })
  search_input.addEventListener("input", (e) => {
    let temp_search_str = e.target.value
    let temp_arr = [];
    search_result_container.innerHTML = "";
    if(temp_search_str == "") {
      return;
    } else {
      orgin_list_data.forEach(element => {
        if (element.po_num.includes(temp_search_str)) {
          temp_arr.push(element.po_num);
        }
      });
    }
    if(temp_arr.length == 0) {
      let blur_search_div = document.createElement("div");
      blur_search_div.classList.add("blur_search_div");

      let blur_search_image = document.createElement("img");
      blur_search_image.classList.add("search_icon");
      blur_search_image.src = "../../image/icon/search_glass.png";

      let blur_search_content = document.createElement("div");
      blur_search_content.classList.add("blur_search_content");
      blur_search_content.textContent = "查無單號";

      blur_search_div.appendChild(blur_search_image);
      blur_search_div.appendChild(blur_search_content);

      search_result_container.appendChild(blur_search_div);
    } else {
      temp_arr.forEach(element => {
        let blur_search_div = document.createElement("div");
        blur_search_div.classList.add("blur_search_div");
        blur_search_div.setAttribute("value", element);
        blur_search_div.addEventListener("click", () => {
          let search_icon = document.querySelector("#search_icon");
          search_icon.setAttribute("func", "cancel");
          search_icon.src = "../../image/icon/cancel.png";

          search_input.value = element;
          search_input.blur();
          orgin_list_data.filter(item => item.po_num == element);
          display_list_data = orgin_list_data.filter(item => item.po_num == element);
          init_upload_data_display()
          set_upload_data_display_arr(display_list_data);
        });
  
        let blur_search_image = document.createElement("img");
        blur_search_image.classList.add("search_icon");
        blur_search_image.src = "../../image/icon/search_glass.png";
  
        let blur_search_content = document.createElement("div");
        blur_search_content.classList.add("blur_search_content");
        blur_search_content.textContent = element;
  
        blur_search_div.appendChild(blur_search_image);
        blur_search_div.appendChild(blur_search_content);
  
        search_result_container.appendChild(blur_search_div);
      });
    }
  });

  let search_icon = document.createElement("img");
  search_icon.classList.add("search_icon");
  search_icon.id = "search_icon";
  search_icon.setAttribute("func", "search");
  search_icon.src = "../../image/icon/search_glass.png";
  search_icon.addEventListener("click", () => {
    if(search_icon.getAttribute("func") == "search") {
      if(search_input.value == "") {
        search_input.focus();
      } else {
        
      }
    } else {
      search_icon.setAttribute("func", "search");
      search_icon.src = "../../image/icon/search_glass.png";

      search_input.value = "";
      display_list_data = orgin_list_data;

      let mdcs_name = document.querySelector(".mdcs_name");
      let mdcs_po_num = document.querySelector(".mdcs_po_num");
      let mdcs_name_img = document.querySelector(".mdcs_name_img");
      let mdcs_po_num_img = document.querySelector(".mdcs_po_num_img");

      mdcs_name.setAttribute("sort", "none");
      mdcs_po_num.setAttribute("sort", "none");
      mdcs_po_num.style.backgroundColor = "#efefef";
      mdcs_po_num.style.backgroundColor = "#efefef";
      mdcs_name_img.style.transform = "rotate(0deg)";
      mdcs_po_num_img.style.transform = "rotate(0deg)";

      init_upload_data_display()
      set_upload_data_display_arr(display_list_data);
    }
  });

  search_input_container.appendChild(search_icon);
  search_input_container.appendChild(search_input);

  let search_result_container = document.createElement("div");
  search_result_container.classList.add("search_result_container");

  mhb_search_input_div.appendChild(search_input_container);
  mhb_search_input_div.appendChild(search_result_container);

  main_header_btn_container.appendChild(mhb_new_btn_container);
  main_header_btn_container.appendChild(mhb_search_input_div);
}
function set_main_card_display_container() {
  init_main_display_card_container();
  let main_display_card_container = document.querySelector(".main_display_card_container");

  let mdc_top_btn_container = set_main_display_btn_container();
  let mdc_container = set_mdc_container();
  // let mdc_bottom_btn_container = set_main_display_btn_container();

  main_display_card_container.appendChild(mdc_top_btn_container);
  main_display_card_container.appendChild(mdc_container);
  // main_display_card_container.appendChild(mdc_bottom_btn_container);
}
function set_main_display_btn_container() {
  let main_display_btn_container = document.createElement("div");
  main_display_btn_container.classList.add("main_display_btn_container");

  let mdbc_btn_container = document.createElement("div");
  mdbc_btn_container.classList.add("mdbc_btn_container");

  let mdbc_submit = document.createElement("div");
  mdbc_submit.classList.add("mdbc_submit");
  mdbc_submit.classList.add("btn");
  mdbc_submit.classList.add("light_green");
  mdbc_submit.innerHTML = "送出";
  mdbc_submit.addEventListener("click", async () => {
    await batch_check();
  })

  let mdbc_del = document.createElement("div");
  mdbc_del.classList.add("mdbc_del");
  mdbc_del.classList.add("btn");
  mdbc_del.classList.add("dark_red");
  mdbc_del.innerHTML = `刪除`;
  mdbc_del.addEventListener("click", () => {
    if(confirm("是否刪除已選項目？")) {
      let card_checkbox = document.querySelectorAll(".card_checkbox");
      let card_container = document.querySelectorAll(".card_container");
      let temp_count = 0;
      card_checkbox.forEach(async (element, index) => {
        if(element.checked) {
            let guid = element.getAttribute("guid");
            let post_data = {
              ValueAry: [guid]
            };
            await delete_by_GUID(post_data);
            orgin_list_data = orgin_list_data.filter(item => item.GUID != guid);
            if(card_container[index].getAttribute("guid") == guid) {
              card_container[index].remove();
              temp_count += 1;
            }
        }
        await reset_new_add(orgin_list_data);
      });

      if(temp_count == 0) {
        alert("請勾選需刪除的單據。");
      }
    }
  });

  mdbc_btn_container.appendChild(mdbc_submit);
  mdbc_btn_container.appendChild(mdbc_del);

  let mdbc_select = document.createElement("div");
  mdbc_select.classList.add("mdbc_select");
  mdbc_select.classList.add("btn");
  mdbc_select.innerHTML = "全選";
  mdbc_select.setAttribute("select", "true");
  mdbc_select.addEventListener("click", (e) => {
    let mdbc_select_all = document.querySelectorAll(".mdbc_select");
    let card_right_checkbox_all = document.querySelectorAll(".card_checkbox");
  
    if(e.target.getAttribute("select") == "true") {
      card_right_checkbox_all.forEach(element => {
        element.checked = true;
      });

      mdbc_select_all.forEach(element => {
        element.innerHTML = "取消全選";
        element.setAttribute("select", false);
      });
    } else if(e.target.getAttribute("select") == "false") {
      card_right_checkbox_all.forEach(element => {
        element.checked = false;
      });

      mdbc_select_all.forEach(element => {
        element.innerHTML = "全選";
        element.setAttribute("select", true);
      });
    }
  });

  main_display_btn_container.appendChild(mdbc_select);
  main_display_btn_container.appendChild(mdbc_btn_container);

  return main_display_btn_container;
}
function set_mdc_container() {
  let mdc_container = document.createElement("div");
  mdc_container.classList.add("mdc_container");

  let mdc_sort_container = document.createElement("div");
  mdc_sort_container.classList.add("mdc_sort_container");

  let mdcs_name = document.createElement("div");
  mdcs_name.classList.add("mdcs_name");
  mdcs_name.setAttribute("sort", "none");
  mdcs_name.addEventListener("click", () => {
    let sort_direction = mdcs_name.getAttribute("sort");
    let mdcs_po_num = document.querySelector(".mdcs_po_num");
    let mdcs_name_img = document.querySelector(".mdcs_name_img");
    let mdcs_po_num_img = document.querySelector(".mdcs_po_num_img");
    let temp_arr = [];
    let check_box_all = document.querySelectorAll(".card_checkbox");
    check_box_all.forEach(element => {
      if(element.checked) {
        temp_arr.push(element.getAttribute("guid"));
      }
    });

    if(sort_direction == "none") {
      mdcs_po_num.setAttribute("sort", "none");
      mdcs_name.setAttribute("sort", "down");
      mdcs_name.style.backgroundColor = "#797979";
      mdcs_po_num.style.backgroundColor = "#d2d2d2";
      mdcs_name_img.style.transform = "rotate(-90deg)";
      mdcs_po_num_img.style.transform = "rotate(0deg)";

      display_list_data = sort_logic_func('name', mdcs_name.getAttribute("sort"), orgin_list_data);
      init_upload_data_display();
      set_upload_data_display_arr(display_list_data);
    } else if(sort_direction == "down") {
      mdcs_po_num.setAttribute("sort", "none");
      mdcs_name.setAttribute("sort", "up");
      mdcs_name.style.backgroundColor = "#a0a0a0";
      mdcs_po_num.style.backgroundColor = "#d2d2d2";
      mdcs_name_img.style.transform = "rotate(90deg)";
      mdcs_po_num_img.style.transform = "rotate(0deg)";
      
      display_list_data = sort_logic_func('name', mdcs_name.getAttribute("sort"), orgin_list_data);
      init_upload_data_display();
      set_upload_data_display_arr(display_list_data);
    } else {
      mdcs_po_num.setAttribute("sort", "none");
      mdcs_name.setAttribute("sort", "down");
      mdcs_name.style.backgroundColor = "#797979";
      mdcs_po_num.style.backgroundColor = "#d2d2d2";
      mdcs_name_img.style.transform = "rotate(-90deg)";
      mdcs_po_num_img.style.transform = "rotate(0deg)";

      display_list_data = sort_logic_func('name', mdcs_name.getAttribute("sort"), orgin_list_data);
      init_upload_data_display();
      set_upload_data_display_arr(display_list_data);
    }
 
    set_rechecked(temp_arr);
  });

  let mdcs_name_text = document.createElement("div");
  mdcs_name_text.textContent = "藥名";
  
  let mdcs_name_img = document.createElement("img");
  mdcs_name_img.classList.add("mdcs_name_img");
  mdcs_name_img.src = "../../image/left-arrow.png";

  mdcs_name.appendChild(mdcs_name_text);
  mdcs_name.appendChild(mdcs_name_img);

  let mdcs_po_num = document.createElement("div");
  mdcs_po_num.classList.add("mdcs_po_num");
  mdcs_po_num.setAttribute("sort", "none");
  mdcs_po_num.addEventListener("click", () => {
    let sort_direction = mdcs_po_num.getAttribute("sort");
    let mdcs_name_img = document.querySelector(".mdcs_name_img");
    let mdcs_po_num_img = document.querySelector(".mdcs_po_num_img");
    let temp_arr = [];
    let check_box_all = document.querySelectorAll(".card_checkbox");
    check_box_all.forEach(element => {
      if(element.checked) {
        temp_arr.push(element.getAttribute("guid"));
      }
    });

    if(sort_direction == "none") {
      mdcs_name.setAttribute("sort", "none");
      mdcs_po_num.setAttribute("sort", "down");
      mdcs_name.style.backgroundColor = "#d2d2d2";
      mdcs_po_num.style.backgroundColor = "#797979";
      mdcs_name_img.style.transform = "rotate(0deg)";
      mdcs_po_num_img.style.transform = "rotate(-90deg)";

      display_list_data = sort_logic_func('po_num', mdcs_po_num.getAttribute("sort"), orgin_list_data);
      init_upload_data_display();
      set_upload_data_display_arr(display_list_data);
    } else if(sort_direction == "down") {
      mdcs_name.setAttribute("sort", "none");
      mdcs_po_num.setAttribute("sort", "up");
      mdcs_name.style.backgroundColor = "#d2d2d2";
      mdcs_po_num.style.backgroundColor = "#797979";
      mdcs_name_img.style.transform = "rotate(0deg)";
      mdcs_po_num_img.style.transform = "rotate(90deg)";

      display_list_data = sort_logic_func('po_num', mdcs_po_num.getAttribute("sort"), orgin_list_data);
      init_upload_data_display();
      set_upload_data_display_arr(display_list_data);
    } else {
      mdcs_name.setAttribute("sort", "none");
      mdcs_po_num.setAttribute("sort", "down");
      mdcs_name.style.backgroundColor = "#d2d2d2";
      mdcs_po_num.style.backgroundColor = "#797979";
      mdcs_name_img.style.transform = "rotate(0deg)";
      mdcs_po_num_img.style.transform = "rotate(-90deg)";

      display_list_data = sort_logic_func('po_num', mdcs_po_num.getAttribute("sort"), orgin_list_data);
      init_upload_data_display();
      set_upload_data_display_arr(display_list_data);
    }

    set_rechecked(temp_arr);
  });

  let mdcs_po_num_text = document.createElement("div");
  mdcs_po_num_text.textContent = "單號";

  let mdcs_po_num_img = document.createElement("img");
  mdcs_po_num_img.classList.add("mdcs_po_num_img");
  mdcs_po_num_img.src = "../../image/left-arrow.png";

  mdcs_po_num.appendChild(mdcs_po_num_text);
  mdcs_po_num.appendChild(mdcs_po_num_img);

  mdc_sort_container.appendChild(mdcs_name);
  mdc_sort_container.appendChild(mdcs_po_num);

  let mdc_card_container = document.createElement("div");
  mdc_card_container.classList.add("mdc_card_container");

  mdc_container.appendChild(mdc_sort_container);
  mdc_container.appendChild(mdc_card_container);

  return mdc_container;
}

function set_batch_id() {
  let now = new Date();

  let year = now.getFullYear();
  let month = String(now.getMonth() + 1).padStart(2, '0'); // 月份補零
  let day = String(now.getDate()).padStart(2, '0');        // 日期補零
  let hour = String(now.getHours()).padStart(2, '0');      // 小時補零（24 小時制）
  let minute = String(now.getMinutes()).padStart(2, '0');  // 分鐘補零
  let second = String(now.getSeconds()).padStart(2, '0');  // 秒數補零

  return `${year}${month}${day}${hour}${minute}${second}`;
}
async function processImage(file) {
  return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = async (e) => {
          const img = new Image();
          img.src = e.target.result;

          img.onload = () => {
              const canvas = document.createElement("canvas");
              const ctx = canvas.getContext("2d");

              // 設定轉換為 JPG 格式
              canvas.width = img.width;
              canvas.height = img.height;
              ctx.drawImage(img, 0, 0);

              // 以 JPG 格式輸出，並轉換成 Base64
              const base64 = canvas.toDataURL("image/jpeg", 0.8); // 壓縮品質 0.8
              resolve(base64);
          };
      };

      // 如果是 PNG 或 HEIC，讀取後再轉換
      reader.readAsDataURL(file);
  });
}
function init_main_display_card_container() {
  let main_display_card_container = document.querySelector(".main_display_card_container");
  main_display_card_container.innerHTML = "";
}
function init_upload_data_display() {
  let mdc_card_container = document.querySelector(".mdc_card_container");
  mdc_card_container.innerHTML = "";
}
function set_upload_data_display_arr(arr) {
  let mdc_card_container = document.querySelector(".mdc_card_container");

  arr.forEach(element => {
    let temp_div = set_card(element);

    mdc_card_container.appendChild(temp_div);
  });
}
function clear_card_display_container() {
  let main_header_btn_container = document.querySelector(".main_header_btn_container");
  let main_display_card_container = document.querySelector(".main_display_card_container");
  main_header_btn_container.innerHTML = "";
  main_display_card_container.innerHTML = "";
}
function set_upload_data_display(data) {
  let mdc_card_container = document.querySelector(".mdc_card_container");

  let temp_div = set_card(data);
  if(temp_div != false) {
    mdc_card_container.appendChild(temp_div);
  } else {
    return;
  }

}
function init_mdc_card_container() {
  let mdc_card_container = document.querySelector(".mdc_card_container");
  mdc_card_container.innerHTML = "";
}
function set_card(data) {
  if(data.Code_status == -1 || data.Code_status == -2 || data.Code_status == 200) {
    let card_container = document.createElement("div");
    card_container.classList.add("card_container");
    card_container.setAttribute("guid", data.GUID);
    card_container.setAttribute("code", data.Code_status);
    if(data.Code_status == 200) {
      card_container.setAttribute("check", data.check);
    }
  
    if(data.Code_status == 200 && data.check == "已確認") card_container.classList.add("bgc_done");
    if(data.Code_status == 200 && data.check != "已確認") card_container.classList.add("bgc_set");
    if(data.Code_status == -1 || data.Code_status == -2) card_container.classList.add("bgc_error");
  
    let card_top = document.createElement("div");
    card_top.classList.add("card_top");
  
    let card_top_left = document.createElement("div");
    card_top_left.classList.add("card_top_left"); 
  
    let card_checkbox;
    if(data.Code_status == 200 && data.check != "已確認" || data.Code_status == -1 || data.Code_status == -2) {
      card_checkbox = document.createElement("input");
      card_checkbox.classList.add("card_checkbox");
      card_checkbox.type = "checkbox";
      card_checkbox.setAttribute("guid", data.GUID);
      card_checkbox.setAttribute("code", data.Code_status);
      if(data.Code_status == 200) {
        card_checkbox.setAttribute("check", data.check);
      }
      card_checkbox.addEventListener("click", (event) => {
        event.stopPropagation();
      })
  
      card_top_left.appendChild(card_checkbox);
    }
  
    let card_po_number = document.createElement("div");
    card_po_number.classList.add("card_po_number");
    switch (data.Code_status) {
      case "200":
        card_po_number.innerHTML = data.po_num;
        break;
      case "-1":
        card_po_number.innerHTML = `AI Fail ${error_index += 1}`;
        card_container.setAttribute("index", error_index);
        break;
      case "-2":
        card_po_number.innerHTML = `Not Found ${error_index += 1}`;
        card_container.setAttribute("index", error_index);
        break;
    
      default:
        break;
    }
    // if(data.Code_status == 200) card_po_number.innerHTML = data.po_num;
    // else if(data.Code_status == -1 || data.Code_status == -2) {
    //   card_po_number.innerHTML = `Fail ${error_index += 1} Try Again`;
    //   card_container.setAttribute("index", error_index);
    // }
    if(data.Code_status == 200 && data.check != "已確認" || data.Code_status == -1 || data.Code_status == -2) {
      card_po_number.addEventListener("click", (event) => {
        card_checkbox.checked = !card_checkbox.checked;
        event.stopPropagation();
      })
    }
  
    card_top_left.appendChild(card_po_number);
  
    let card_top_right = document.createElement("div");
    card_top_right.classList.add("card_top_right");
  
    if(data.Code_status == 200 && data.check != "已確認") {
      let card_retake_btn = document.createElement("div");
      card_retake_btn.classList.add("card_retake_btn");
      card_retake_btn.classList.add("new_btn");
      card_retake_btn.setAttribute("guid", data.GUID);
      card_retake_btn.innerHTML = `<img class="camra_img" src="../../image/camara.png" alt="camara">`;
      card_retake_btn.addEventListener("click", (event) => {
        popup_retake_div_open(card_retake_btn.getAttribute("guid"));
        event.stopPropagation();
      })
  
      card_top_right.appendChild(card_retake_btn);
      
      let card_delete_btn = document.createElement("div");
      card_delete_btn.classList.add("card_delete_btn");
      card_delete_btn.classList.add("new_btn");
      card_delete_btn.setAttribute("guid", data.GUID);
      card_delete_btn.innerHTML = `<img class="delete_img" src="../../image/delete.png" alt="delete">`;
      card_delete_btn.addEventListener("click", async (event) => {
        if(confirm("是否刪除此單據辨識？")) {
          let post_data = {
            ValueAry: [
                card_delete_btn.getAttribute("guid")
              ]
          };
          await delete_by_GUID(post_data);
          orgin_list_data = orgin_list_data.filter(item => item.GUID != card_delete_btn.getAttribute("guid"));
          card_container.remove();
          // 刪除Data資料、及card
          await reset_new_add(orgin_list_data);
        }
        event.stopPropagation();
      })
    
      card_top_right.appendChild(card_delete_btn);
    }
    if(data.Code_status == -1 || data.Code_status == -2) {
      let card_delete_btn = document.createElement("div");
      card_delete_btn.classList.add("card_delete_btn");
      card_delete_btn.classList.add("new_btn");
      card_delete_btn.setAttribute("guid", data.GUID);
      card_delete_btn.innerHTML = `<img class="delete_img" src="../../image/delete.png" alt="delete">`;
      card_delete_btn.addEventListener("click", async (event) => {
        if(confirm("是否刪除此單據辨識？")) {
          let post_data = {
            ValueAry: [
                card_delete_btn.getAttribute("guid")
              ]
          };
          await delete_by_GUID(post_data);
          orgin_list_data = orgin_list_data.filter(item => item.GUID != card_delete_btn.getAttribute("guid"));
          card_container.remove();
          // 刪除Data資料、及card
          await reset_new_add(orgin_list_data);
        }
        event.stopPropagation();
      })
    
      card_top_right.appendChild(card_delete_btn);
    }
  
    card_top.appendChild(card_top_left);
    card_top.appendChild(card_top_right);
  
    let card_divide = document.createElement("div");
    card_divide.classList.add("card_divide");
  
    let card_bottom = document.createElement("div");
    card_bottom.classList.add("card_bottom");
    card_bottom.setAttribute("guid", data.GUID);
    if(data.Code_status == 200 && data.check != "已確認") {
      card_bottom.addEventListener("click", async (event) => {
        Set_main_div_enable(true);
        
        // await set_popup_input_po_num(card_bottom.getAttribute("guid"));
        await popup_update_info_div_open(card_bottom.getAttribute("guid"));

        Set_main_div_enable(false);
      })
    }
  
    if(data.Code_status == 200) {
      let card_bottom_left = document.createElement("div");
      card_bottom_left.classList.add("card_bottom_left");
    
      let card_name = document.createElement("div");
      card_name.classList.add("card_name");
      card_name.innerHTML = data.name;
    
      let card_cht_name = document.createElement("div");
      card_cht_name.classList.add("card_cht_name");
      card_cht_name.innerHTML = data.cht_name;
  
      let card_info_container = document.createElement("div");
      card_info_container.classList.add("card_info_container");
  
      let card_expirydate = document.createElement("div");
      card_expirydate.classList.add("card_expirydate");
      let dateOnly = data.expirydate.replace(/\s\d{2}:\d{2}:\d{2}$/, "");
      card_expirydate.innerHTML = "(效) " + dateOnly;
  
      let card_batch_num = document.createElement("div");
      card_batch_num.classList.add("card_batch_num");
      card_batch_num.innerHTML = "(批) " + data.batch_num;
  
      card_info_container.appendChild(card_expirydate);
      card_info_container.appendChild(card_batch_num);
    
      card_bottom_left.appendChild(card_name);
      card_bottom_left.appendChild(card_cht_name);
      card_bottom_left.appendChild(card_info_container);
    
      let card_bottom_right = document.createElement("div");
      card_bottom_right.classList.add("card_bottom_right");
  
      let card_qty = document.createElement("div");
      card_qty.classList.add("card_qty");
      card_qty.innerHTML = data.qty;
  
      card_bottom_right.appendChild(card_qty);
    
      card_bottom.appendChild(card_bottom_left);
      card_bottom.appendChild(card_bottom_right);
    } else {
      let error_btn_container = document.createElement("div");
      error_btn_container.classList.add("error_btn_container");
  
      let card_edit = document.createElement("div");
      card_edit.classList.add("card_edit");
      card_edit.classList.add("new_btn");
      card_edit.classList.add("new_big_btn");
      card_edit.setAttribute("guid", data.GUID);
      card_edit.innerHTML = `<img class="edit_img edit_img_big" src="../../image/edit.png" alt="edit">`;
      card_edit.addEventListener("click", async (event) => {
        Set_main_div_enable(true);

        await set_popup_input_po_num(event.target.getAttribute("guid"));

        event.stopPropagation();
      })
  
      let card_retake_btn = document.createElement("div");
      card_retake_btn.classList.add("card_retake_btn");
      card_retake_btn.classList.add("new_btn");
      card_retake_btn.classList.add("new_big_btn");
      card_retake_btn.setAttribute("guid", data.GUID);
      card_retake_btn.innerHTML = `<img class="camra_img camra_img_big" src="../../image/camara.png" alt="camara">`;
      card_retake_btn.addEventListener("click", (event) => {
        popup_retake_div_open(card_retake_btn.getAttribute("guid"));
        event.stopPropagation();
      })
  
      error_btn_container.appendChild(card_edit);
      error_btn_container.appendChild(card_retake_btn);
     
      card_bottom.appendChild(error_btn_container);
    }
  
    card_container.appendChild(card_top);
    card_container.appendChild(card_divide);
    card_container.appendChild(card_bottom);
  
    return card_container;
  } else {
    return false;
  }
}
function set_input_file_event() {
  let pic_input = document.getElementById("pic_input");
  pic_input.addEventListener("change", async (e) => {
    const files = Array.from(e.target.files);

    if (files.length > maxLength_for_file) {
      alert(`最多只能上傳 ${maxLength_for_file} 張圖片！`);
      return;
    }

    batch_id = set_batch_id();

    process_bar_display(true);
    set_process_bar_log(files.length, 0, process_bar_status.load);

    let files_length = files.length;
    let fail_file_count = 0;
    let repeat_count = 0;
    batch_id_return = [];
    done_list_data = [];
    error_index = 0;
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      let fileToProcess = file;

      // 若格式為 HEIC 或 PNG，先轉為 JPG
      if (file.type === 'image/heic' || file.type === 'image/png') {
          fileToProcess = await convertToJpg(file);
      }

      // 將圖片轉為 Base64
      let base64 = await convertToBase64(fileToProcess);
      let loggedID = sessionStorage.getItem('loggedID');  
      let loggedName = sessionStorage.getItem('loggedName');  
      let post_data = {
        Data:[
          {
            op_id: loggedID,
            op_name: loggedName,
            base64: base64,
            batch_id: batch_id,
            IC_SN: IC_SN
          }
        ]
      };

      let return_data = await img_presave(post_data);
      console.log("presave return data", return_data);
      if(return_data.Code == 200) {
        set_process_bar_log(files_length, i - fail_file_count, process_bar_status.load);
        batch_id_return.push(return_data.Data[0]);
      } else {
        fail_file_count += 1;
        files_length = files_length - fail_file_count;
      }
    }

    console.log(batch_id_return);
    reset_process_bar_log(process_bar_status.anal);
    fail_file_count = 0;
    set_main_card_display();
    init_mdc_card_container();

    orgin_list_data = [];

    for (let i = 0; i < batch_id_return.length; i++) {
      const element = batch_id_return[i];

      let post_data = {
        ValueAry:[element.GUID]
      }

      console.log(post_data);
      let return_data = await img_to_analysis(post_data);
      if(return_data.Code != -200) {
        for (let index = 0; index < return_data.Data.length; index++) {
          if(return_data.Data[index].Code_status == 200 || return_data.Data[index].Code_status == -2 || return_data.Data[index].Code_status == -1) {
            console.log("驗收單辨識完成", return_data);
            orgin_list_data.push(return_data.Data[index]);
  
            set_process_bar_log(batch_id_return.length, i - fail_file_count, process_bar_status.anal);
            set_upload_data_display(return_data.Data[index]);
          } else if(return_data.Data[index].Code_status == -4) {
            console.log("辨識重複且完成", return_data);
            console.log("GUID", return_data.Data[index].GUID);
            done_list_data.push(return_data.Data[index]);
            console.log("已加入辨識且完成數量", done_list_data.length);
            let del_post_data = {
              ValueAry:[element.GUID]
            }
            console.log("刪除已完成送出的單號", del_post_data);
            await delete_by_GUID(del_post_data);
            set_process_bar_log(batch_id_return.length, i - fail_file_count, process_bar_status.anal);
          } else if(return_data.Data[index].Code_status == -5) {
            console.log("刪除重複單號", return_data);
            let post_data_1 = {
              ValueAry: [element.GUID]
            };
            console.log(post_data_1);
            await delete_by_GUID(post_data_1);
            set_process_bar_log(batch_id_return.length, i - fail_file_count, process_bar_status.anal);
            repeat_count += 1;
          }
        }
      } else {
        fail_file_count += 1;
        alert(`第${i + 1}張圖片，發生預料外錯誤，Result: ${return_data.Result}`);
        console.log(return_data);
      }
    }
    if(fail_file_count > 0) {
      alert(`有偵測到${fail_file_count}張單據，發生預料外錯誤。`);
      
      files.length = 0;
      pic_input.value = "";
    }

    if(repeat_count > 0) {
      alert(`有偵測到${repeat_count}張單號重複，已刪除`);
    }

    if(done_list_data.length != 0) {
      let temp_str = `下列單據已辨識過並排除\n`;

      let temp_arr = [];
      done_list_data.forEach(element => {
        temp_arr.push(element.po_num);
      });

      temp_str += temp_arr.join("、");
      alert(temp_str);
    }

    setTimeout(() => {
      clearInterval(process_timer);
      process_bar_display(false);

      // 清空 files 陣列
      files.length = 0;
      pic_input.value = "";
    }, 1500);

  });
}
async function convertToJpg(file) {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
          const img = new Image();
          img.onload = () => {
              const canvas = document.createElement('canvas');
              canvas.width = img.width;
              canvas.height = img.height;
              const ctx = canvas.getContext('2d');
              ctx.drawImage(img, 0, 0);
              canvas.toBlob(
                  (blob) => {
                      resolve(new File([blob], file.name, { type: 'image/jpeg' }));
                  },
                  'image/jpeg',
                  0.9
              );
          };
          img.src = reader.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
  });
}
async function convertToBase64(file) {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
          resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
  });
}
function sort_logic_func(key, direction, arr) {
  console.log(arr)
  // 比較函數，根據key進行排序
  let temp_arr = arr;
  error_index = 0;
  // 比較函數，根據key進行排序
  const compare = (a, b) => {
    if (a[key] < b[key]) return direction === "down" ? -1 : 1;
    if (a[key] > b[key]) return direction === "down" ? 1 : -1;
    return 0;
  };

  // 先根據指定的key進行排序
  temp_arr.sort((a, b) => compare(a, b));

  // 最後根據Code值和submit條件進行排序
  temp_arr.sort((a, b) => {
    const getPriority = (item) => {
      if (item.Code_status == 200 && item.check != "已確認") return 1;
      if (item.Code_status == -1) return 2;
      if (item.Code_status == -2) return 3;
      if (item.Code_status == 200 && item.check == "已確認") return 4;
      return 5; // 預設最低優先級
    };
    return getPriority(a) - getPriority(b);
  });

  console.log(temp_arr);

  return temp_arr;
}
async function reset_new_add(arr) {
  if(arr.length == 0) {
    clear_card_display_container();
    let new_add_pic_container = document.querySelector(".new_add_pic_container");
    new_add_pic_container.style.display = "flex";

    let loggedID = sessionStorage.getItem('loggedID');
        
    let post_data = {
      ValueAry: [loggedID],
      Value: "N"
    }
    user_log = await user_precheck(post_data);
  }
}
function change_object_by_GUID(arr, new_object) {
  if(new_object.Code == -200 || new_object.Code == -1 || new_object.Code == -2) {
    alert(new_object.Result);
    new_object.Data = [
      {
        GUID: new_object.ValueAry[0],
        Code_status: new_object.Code
      }
    ];
    return arr;
  }
  // 替換物件邏輯
  if(new_object.Code == 200 || new_object.Code == -1 || new_object.Code == -2) {
    console.log(new_object);
    arr = arr.map(item => {
      if (item.GUID === new_object.Data[0].GUID) {
        console.log(item);
        return new_object.Data[0]; // 替換為新的物件
      }
      return item; // 保留原始物件
    });
    if(new_object.Code == -1 || new_object.Code == -2) alert(new_object.Result);
    return arr;
  }
}
function replaceDataByGUID(originalData, newObject) {
  // 建立 GUID 索引表
  const guidIndexMap = {};
  originalData.forEach((item, index) => {
    guidIndexMap[item.GUID] = index;
  });

  // 根據 GUID 索引直接定位替換
  const targetIndex = guidIndexMap[newObject.GUID];
  if (targetIndex !== undefined) {
    originalData[targetIndex] = newObject;
    return true;
  } else {
    return false;
  }
}

function update_card(div, data) {
  console.log(data);
  let temp_code = div.getAttribute("code");
  console.log(temp_code);
  let temp_index;
  if(temp_code == "-1" || temp_code == "-2") {
    temp_index = div.getAttribute("index");
  }
  div.innerHTML = "";
  div.className = "";
  console.log("更新卡片");
  if(data.Code_status == -1 || data.Code_status == -2 || data.Code_status == 200) {
    div.classList.add("card_container");
    div.setAttribute("guid", data.GUID);
    div.setAttribute("code", data.Code_status);
    if(data.Code_status == 200) {
      div.setAttribute("check", data.check);
    }
  
    if(data.Code_status == 200 && data.check == "已確認") div.classList.add("bgc_done");
    if(data.Code_status == 200 && data.check != "已確認") div.classList.add("bgc_set");
    if(data.Code_status == -1 || data.Code_status == -2) div.classList.add("bgc_error");
  
    let card_top = document.createElement("div");
    card_top.classList.add("card_top");
  
    let card_top_left = document.createElement("div");
    card_top_left.classList.add("card_top_left"); 
  
    let card_checkbox;
    if(data.Code_status == 200 && data.check != "已確認" || data.Code_status == -1 || data.Code_status == -2) {
      card_checkbox = document.createElement("input");
      card_checkbox.classList.add("card_checkbox");
      card_checkbox.type = "checkbox";
      card_checkbox.setAttribute("guid", data.GUID);
      card_checkbox.setAttribute("code", data.Code_status);
      if(data.Code_status == 200) {
        card_checkbox.setAttribute("check", data.check);
      }
      card_checkbox.addEventListener("click", (event) => {
        event.stopPropagation();
      })
  
      card_top_left.appendChild(card_checkbox);
    }
  
    let card_po_number = document.createElement("div");
    card_po_number.classList.add("card_po_number");
    if(data.Code_status == 200) {
      card_po_number.innerHTML = data.po_num;
    } else if(data.Code_status == -1 || data.Code_status == -2) {
      switch (temp_code) {
        case "-1":
          card_po_number.innerHTML = `AI Fail ${temp_index}`;
          break;
        case "-2":
          card_po_number.innerHTML = `Not Found ${temp_index}`;
          break;
      
        default:
          card_po_number.innerHTML = `Fail ${error_index += 1} Try Again`;
          div.setAttribute("index", error_index);
          break;
      }
    }
    if(data.Code_status == 200 && data.check != "已確認" || data.Code_status == -1 || data.Code_status == -2) {
      card_po_number.addEventListener("click", (event) => {
        card_checkbox.checked = !card_checkbox.checked;
        event.stopPropagation();
      })
    }
  
    card_top_left.appendChild(card_po_number);
  
    let card_top_right = document.createElement("div");
    card_top_right.classList.add("card_top_right");
  
    if(data.Code_status == 200 && data.check != "已確認") {
      let card_retake_btn = document.createElement("div");
      card_retake_btn.classList.add("card_retake_btn");
      card_retake_btn.classList.add("new_btn");
      card_retake_btn.setAttribute("guid", data.GUID);
      card_retake_btn.innerHTML = `<img class="camra_img" src="../../image/camara.png" alt="camara">`;
      card_retake_btn.addEventListener("click", (event) => {
        popup_retake_div_open(card_retake_btn.getAttribute("guid"));
        event.stopPropagation();
      })
  
      card_top_right.appendChild(card_retake_btn);
      
      let card_delete_btn = document.createElement("div");
      card_delete_btn.classList.add("card_delete_btn");
      card_delete_btn.classList.add("new_btn");
      card_delete_btn.setAttribute("guid", data.GUID);
      card_delete_btn.innerHTML = `<img class="delete_img" src="../../image/delete.png" alt="delete">`;
      card_delete_btn.addEventListener("click", async (event) => {
        if(confirm("是否刪除此單據辨識？")) {
          let post_data = {
            ValueAry: [
                card_delete_btn.getAttribute("guid")
              ]
          };
          await delete_by_GUID(post_data);
          orgin_list_data = orgin_list_data.filter(item => item.GUID != card_delete_btn.getAttribute("guid"));
          div.remove();
          // 刪除Data資料、及card
          await reset_new_add(orgin_list_data);
        }
        event.stopPropagation();
      })
    
      card_top_right.appendChild(card_delete_btn);
    }
    if(data.Code_status == -1 || data.Code_status == -2) {
      let card_delete_btn = document.createElement("div");
      card_delete_btn.classList.add("card_delete_btn");
      card_delete_btn.classList.add("new_btn");
      card_delete_btn.setAttribute("guid", data.GUID);
      card_delete_btn.innerHTML = `<img class="delete_img" src="../../image/delete.png" alt="delete">`;
      card_delete_btn.addEventListener("click", async (event) => {
        if(confirm("是否刪除此單據辨識？")) {
          let post_data = {
            ValueAry: [
                card_delete_btn.getAttribute("guid")
              ]
          };
          await delete_by_GUID(post_data);
          orgin_list_data = orgin_list_data.filter(item => item.GUID != card_delete_btn.getAttribute("guid"));
          div.remove();
          // 刪除Data資料、及card
          await reset_new_add(orgin_list_data);
        }
        event.stopPropagation();
      })
    
      card_top_right.appendChild(card_delete_btn);
    }
  
    card_top.appendChild(card_top_left);
    card_top.appendChild(card_top_right);
  
    let card_divide = document.createElement("div");
    card_divide.classList.add("card_divide");
  
    let card_bottom = document.createElement("div");
    card_bottom.classList.add("card_bottom");
    card_bottom.setAttribute("guid", data.GUID);
    if(data.Code_status == 200 && data.check != "已確認") {
      card_bottom.addEventListener("click", async (event) => {
        Set_main_div_enable(true);
        
        // await set_popup_input_po_num(card_bottom.getAttribute("guid"));
        await popup_update_info_div_open(card_bottom.getAttribute("guid"));

        Set_main_div_enable(false);
      })
    }
  
    if(data.Code_status == 200) {
      let card_bottom_left = document.createElement("div");
      card_bottom_left.classList.add("card_bottom_left");
    
      let card_name = document.createElement("div");
      card_name.classList.add("card_name");
      card_name.innerHTML = data.name;
    
      let card_cht_name = document.createElement("div");
      card_cht_name.classList.add("card_cht_name");
      card_cht_name.innerHTML = data.cht_name;
  
      let card_info_container = document.createElement("div");
      card_info_container.classList.add("card_info_container");
  
      let card_expirydate = document.createElement("div");
      card_expirydate.classList.add("card_expirydate");
      let dateOnly = data.expirydate.replace(/\s\d{2}:\d{2}:\d{2}$/, "");
      card_expirydate.innerHTML = "(效) " + dateOnly;
  
      let card_batch_num = document.createElement("div");
      card_batch_num.classList.add("card_batch_num");
      card_batch_num.innerHTML = "(批) " + data.batch_num;
  
      card_info_container.appendChild(card_expirydate);
      card_info_container.appendChild(card_batch_num);
    
      card_bottom_left.appendChild(card_name);
      card_bottom_left.appendChild(card_cht_name);
      card_bottom_left.appendChild(card_info_container);
    
      let card_bottom_right = document.createElement("div");
      card_bottom_right.classList.add("card_bottom_right");
  
      let card_qty = document.createElement("div");
      card_qty.classList.add("card_qty");
      card_qty.innerHTML = data.qty;
      
      card_bottom_right.appendChild(card_qty);
    
      card_bottom.appendChild(card_bottom_left);
      card_bottom.appendChild(card_bottom_right);
    } else {
      let error_btn_container = document.createElement("div");
      error_btn_container.classList.add("error_btn_container");
  
      let card_edit = document.createElement("div");
      card_edit.classList.add("card_edit");
      card_edit.classList.add("new_btn");
      card_edit.classList.add("new_big_btn");
      card_edit.setAttribute("guid", data.GUID);
      card_edit.innerHTML = `<img class="edit_img edit_img_big" src="../../image/edit.png" alt="edit">`;
      card_edit.addEventListener("click", async (event) => {
        Set_main_div_enable(true);

        await set_popup_input_po_num(event.target.getAttribute("guid"));

        Set_main_div_enable(false);

        event.stopPropagation();
      })
  
      let card_retake_btn = document.createElement("div");
      card_retake_btn.classList.add("card_retake_btn");
      card_retake_btn.classList.add("new_btn");
      card_retake_btn.classList.add("new_big_btn");
      card_retake_btn.setAttribute("guid", data.GUID);
      card_retake_btn.innerHTML = `<img class="camra_img camra_img_big" src="../../image/camara.png" alt="camara">`;
      card_retake_btn.addEventListener("click", (event) => {
        popup_retake_div_open(card_retake_btn.getAttribute("guid"));
        event.stopPropagation();
      })
  
      error_btn_container.appendChild(card_edit);
      error_btn_container.appendChild(card_retake_btn);
     
      card_bottom.appendChild(error_btn_container);
    }
  
    div.appendChild(card_top);
    div.appendChild(card_divide);
    div.appendChild(card_bottom);
  } else {
    div.textContent = "發生不可預知的錯誤";
  }
}

async function batch_check() {
  Set_main_div_enable(true);
  let card_checkbox = document.querySelectorAll(".card_checkbox");

  let temp_post_arr = [];
  card_checkbox.forEach(element => {
    let code = element.getAttribute("code");
    console.log("code", code);
    console.log("checked", element.checked);
    if(code == 200 && element.checked) {
      let guid = element.getAttribute("guid");
      console.log("guid", guid);

      temp_post_arr.push(guid);
    }
  });
  if(temp_post_arr.length == 0) {
    alert("請勾選辨識成功的單據，進行送出。");

    Set_main_div_enable(false);
    return;
  }

  let post_data = {
    ValueAry: [batch_id, temp_post_arr.join(";")]
  }
  let return_data = await po_check_api(post_data);
  console.log(return_data);
  let temp_obj = {};
  orgin_list_data.forEach(element => {
    temp_obj[element.GUID] = element;
  });
  if(return_data.Code == 200) {
    return_data["Data"].forEach(async element => {
      let object_exist = replaceDataByGUID(orgin_list_data, element);
      if(object_exist) {
        let card_container = document.querySelector(`.card_container[guid="${element.GUID}"]`)
        update_card(card_container, element);
      }

      // 發出請購單操作頁面
      let master_GUID = temp_obj[element.GUID].Master_GUID;
      let end_qty = temp_obj[element.GUID].qty;
      let op = temp_obj[element.GUID].op_name;
      let val = temp_obj[element.GUID].expirydate;
      let lot = temp_obj[element.GUID].batch_num;
      await sub_content_add(master_GUID, end_qty, op, val, lot);

      // orgin_list_data.forEach(async item => {
      //   if(item.GUID == element.GUID) {
      //     let master_GUID = item.Master_GUID;
      //     let end_qty = item.qty;
      //     let op = item.op_name;
      //     let val = item.expirydate;
      //     let lot = item.batch_num;
  
      //     await sub_content_add(master_GUID, end_qty, op, val, lot);
      //   }
      // });
    });
  }

  // temp_post_arr.forEach(element => {
  //   orgin_list_data.forEach(async item => {
  //     if(item.GUID == element) {
  //       let master_GUID = item.Master_GUID;
  //       let end_qty = item.qty;
  //       let op = item.op_name;
  //       let val = item.expirydate;
  //       let lot = item.batch_num;

  //       await sub_content_add(master_GUID, end_qty, op, val, lot);
  //     }
  //   });
  // });

  Set_main_div_enable(false);
}

function scroll_fixed_events() {
  // 取得 container 的 DOM 元素
  const main_display_btn_container = document.querySelector('.main_display_btn_container');
  const mdc_container = document.querySelector(".mdc_container");

  // 取得 container 與頂部的距離
  const stickyOffset = main_display_btn_container.offsetTop + main_display_btn_container.offsetHeight + 40;

  // 監聽滾動事件
  window.addEventListener('scroll', () => {
      if (window.scrollY >= stickyOffset) {
          main_display_btn_container.style.width = `${mdc_container.offsetWidth}px`;
          main_display_btn_container.classList.add('sticky');
      } else {
        main_display_btn_container.style.width = `auto`;
          main_display_btn_container.classList.remove('sticky');
      }
  });
}
function set_rechecked(array) {
  array.forEach(element => {
    let check_box = document.querySelector(`.card_checkbox[guid="${element}"]`);
    check_box.checked = true;
  });
}

async function sub_content_add(_Master_GUID, _END_QTY, _OP, _VAL, _LOT) {
  const post_data = 
  {
    "Data": {
      "Master_GUID": `${_Master_GUID}`,
      "END_QTY": `${_END_QTY}`,
      "OP": `${_OP}`,
      "VAL": `${_VAL}`,
      "LOT": `${_LOT}`
    },
    "Master_GUID": 0,
    "TableName":``,
    "Result": "",
    "Value": "",
    "ServerName" : ServerName,
    "ServerType" : ServerType,
    "TableName" : TableName,
    "TimeTaken": ""
  };
  var _url = `${inspection_url}/sub_content_add`;
  console.log(`Url [${arguments.callee.name}]` , _url);
  console.log(`Post_data [${arguments.callee.name}]`,post_data);
  let response = await postDataToAPI(`${_url}`,post_data);
  await postDataToAPI_NoneReturn(`${MessageAPI_url}`,response);
  return response;
}