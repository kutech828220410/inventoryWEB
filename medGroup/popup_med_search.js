// var popup_med_search_div;

// function get_popup_med_search()
// {
//     popup_med_search_div = new Basic_popup_Div('popup_med_search_div','popup_med_search_div','','');
//     popup_med_search_div._popup_div.style.border = '10px solid white';
//     const title_text = get_title_med_search();
//     const serch_box_div = get_serch_box_med_search();
//     const underline = get_underline_med_search();

//     popup_med_search_div.AddControl(title_text);
//     popup_med_search_div.AddControl(serch_box_div);
//     popup_med_search_div.AddControl(underline);

//     set_all_search_func();

//     return popup_med_search_div;
// }

// function get_title_med_search()
// {
//     const title_text = document.createElement('div');
//     My_Div.Init(title_text, 'title_med_search_div','title_med_search_div', '100%', '40px', 'gray');
//     My_Div.Set_Text(title_text ,"藥檔搜尋" , TextAlignEnum.CENTER , "24px", true,"微軟正黑體","white");
//     title_text.style.borderRadius = "5px";
//     title_text.style.marginBottom = "10px";
//     return title_text;
// }

// function get_serch_box_med_search()
// {
//     const serch_box_med_search_div = document.createElement('div');
//     My_Div.Init(serch_box_med_search_div,'serch_box_med_search_div','serch_box_med_search_div', '100%','','');
//     My_Div.Set_Block(serch_box_med_search_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.CENTER);
//     serch_box_med_search_div.style.alignsearchs = "center";
//     serch_box_med_search_div.style.flexWrap  = "wrap";

//     serch_box_med_search_div.innerHTML = `
//         <div class="popup_med_search_bar_container">
//             <div class="popup_med_search_input_container">
//                 <div class="popup_med_label">藥碼</div>
//                 <input class="popup_med_search_input" type="text" id="popup_search_input_code">
//                 <button class="popup_med_search_btn" id="popup_search_btn_code">搜尋</button>
//             </div>
//             <div class="popup_med_search_input_container">
//                 <div class="popup_med_label">藥名</div>
//                 <input class="popup_med_search_input" type="text" id="popup_search_input_name">
//                 <button class="popup_med_search_btn" id="popup_search_btn_name">搜尋</button>
//             </div>
//             <div class="popup_med_search_input_container">
//                 <div class="popup_med_label">中文名</div>
//                 <input class="popup_med_search_input" type="text" id="popup_search_input_ctname">
//                 <button class="popup_med_search_btn" id="popup_search_btn_ctname">搜尋</button>
//             </div>
//             <div class="popup_med_search_input_container">
//                 <div class="popup_med_label">商品名</div>
//                 <input class="popup_med_search_input" type="text" id="popup_search_input_dianame">
//                 <button class="popup_med_search_btn" id="popup_search_btn_dianame">搜尋</button>
//             </div>
//             <div class="popup_med_search_input_container">
//                 <div class="popup_med_label">藥品條碼</div>
//                 <input class="popup_med_search_input" type="text" id="popup_search_input_barcode">
//                 <button class="popup_med_search_btn" id="popup_search_btn_barcode">搜尋</button>
//             </div>
//             <div class="popup_med_search_input_container">
//                 <div class="popup_med_label">高價藥品</div>
//                 <button class="popup_med_search_btn" id="popup_search_btn_highprice">搜尋</button>
//             </div>
//             <div class="popup_med_search_input_container">
//                 <div class="popup_med_label">管制級別</div>
//                 <select class="popup_med_search_select_style" name="popup_search_drugkind" id="popup_search_drugkind">
//                     <option value="N">N</option>
//                     <option value="1">1</option>
//                     <option value="2">2</option>
//                     <option value="3">3</option>
//                     <option value="4">4</option>
//                 </select>
//                 <button class="popup_med_search_btn" id="popup_search_btn_drugkind">搜尋</button>
//             </div>
//         </div>
//     `;

//     return serch_box_med_search_div;
// }

// function get_underline_med_search()
// {
//     const underline_div = document.createElement('div');
//     My_Div.Init(underline_div, 'underline_div_search_btn_div','underline_div_search_btn_div', '100%','','');
//     underline_div.style.alignsearchs = "center";

//     let underline_display_all_med_search_popup_btn = document.createElement("div");
//     underline_display_all_med_search_popup_btn.classList.add('underline_popup_btn_style');
//     underline_display_all_med_search_popup_btn.classList.add('underline_display_all_med_search_popup_btn');
//     underline_display_all_med_search_popup_btn.innerHTML = "顯示全部";

//     let underline_init_search_popup_btn = document.createElement("div");
//     underline_init_search_popup_btn.classList.add('underline_popup_btn_style');
//     underline_init_search_popup_btn.classList.add('underline_init_search_popup_btn');
//     underline_init_search_popup_btn.innerHTML = "清除條件";

//     let underline_close_med_search_popup_btn = document.createElement("div");
//     underline_close_med_search_popup_btn.classList.add('underline_popup_btn_style');
//     underline_close_med_search_popup_btn.classList.add('underline_close_med_search_popup_btn');
//     underline_close_med_search_popup_btn.innerHTML = "關閉";

//     underline_close_med_search_popup_btn.addEventListener("click", () => {
//         console.log("object");
//         hide_med_search();
//     });

//     // underline_div.appendChild(underline_new_modify_med_btn);
//     underline_div.appendChild(underline_display_all_med_search_popup_btn);
//     underline_div.appendChild(underline_init_search_popup_btn);
//     underline_div.appendChild(underline_close_med_search_popup_btn);

//     return underline_div;
// }

// async function show_med_search()
// {
//     showLoadingPopup();
//     popup_med_search_div.Set_Visible(true);
//     hideLoadingPopup();
// }

// function hide_med_search()
// {
//     search_block_init();
//     popup_med_search_div.Set_Visible(false);
// }

// function search_block_init() {
//     let popup_search_input_code = document.querySelector("#popup_search_input_code");
//     let popup_search_input_name = document.querySelector("#popup_search_input_name");
//     let popup_search_input_ctname = document.querySelector("#popup_search_input_ctname");
//     let popup_search_input_dianame = document.querySelector("#popup_search_input_dianame");
//     let popup_search_input_barcode = document.querySelector("#popup_search_input_barcode");
//     let popup_search_drugkind = document.querySelector("#popup_search_drugkind");

//     popup_search_input_code.value = "";
//     popup_search_input_name.value = "";
//     popup_search_input_ctname.value = "";
//     popup_search_input_dianame.value = "";
//     popup_search_input_barcode.value = "";
//     popup_search_drugkind.value = "N";
// };

// // 條件搜尋func
// async function search_by_code() {
//     showLoadingPopup();
//     let popup_search_input_code = document.querySelector("#popup_search_input_code");
//     let med_data = await get_medicine_cloud();

//     if(popup_search_input_code.value == "") {
//         alert("請輸入資料");
//     } else {
//         let temp_arr = med_data["Data"].filter(e => e["CODE"].includes(popup_search_input_code.value));
//         if(temp_arr.length < 1) {
//             temp_arr = med_data["Data"].filter(e => e["SKDIACODE"].includes(popup_search_input_code.value));
//             if(temp_arr.length < 1) {
//                 alert("查無此藥");
//             } else {
//                 console.log(temp_arr);
//                 get_search_result_display(temp_arr);
//                 hide_med_search();
//             }
//         } else {
//             console.log(temp_arr);
//             get_search_result_display(temp_arr);
//             hide_med_search();
//         }
//     }
//     hideLoadingPopup();
// };
// async function search_by_name() {
//     showLoadingPopup();
//     let popup_search_input_name = document.querySelector("#popup_search_input_name");
//     let med_data = await get_medicine_cloud();

//     if(popup_search_input_name.value == "") {
//         alert("請輸入資料");
//     } else {
//         let temp_arr = med_data["Data"].filter(e => e["NAME"].includes(popup_search_input_name.value));
//         if(temp_arr.length < 1) {
//             alert("查無此藥");
//         } else {
//             console.log(temp_arr);
//             get_search_result_display(temp_arr);
//             hide_med_search();
//         }
//     }
//     hideLoadingPopup();
// };
// async function search_by_ctname() {
//     showLoadingPopup();
//     let popup_search_input_ctname = document.querySelector("#popup_search_input_ctname");
//     let med_data = await get_medicine_cloud();

//     console.log(popup_search_input_ctname.value);
//     if(popup_search_input_ctname.value == "") {
//         alert("請輸入資料");
//     } else {
//         let temp_arr = med_data["Data"].filter(e => e["CHT_NAME"].includes(popup_search_input_ctname.value));
//         if(temp_arr.length < 1) {
//             alert("查無此藥");
//         } else {
//             console.log(temp_arr);
//             get_search_result_display(temp_arr);
//             hide_med_search();
//         }
//     }
//     hideLoadingPopup();
// };
// async function search_by_dianame() {
//     showLoadingPopup();
//     let popup_search_input_dianame = document.querySelector("#popup_search_input_dianame");
//     let med_data = await get_medicine_cloud();

//     console.log(popup_search_input_dianame.value);
//     if(popup_search_input_dianame.value == "") {
//         alert("請輸入資料");
//     } else {
//         let temp_arr = med_data["Data"].filter(e => e["DIANAME"].includes(popup_search_input_dianame.value));
//         if(temp_arr.length < 1) {
//             alert("查無此藥");
//         } else {
//             console.log(temp_arr);
//             get_search_result_display(temp_arr);
//             hide_med_search();
//         }
//     }
//     hideLoadingPopup();
// };
// async function search_by_drugkind() {
//     showLoadingPopup();
//     let popup_search_drugkind = document.querySelector("#popup_search_drugkind");
//     let med_data = await get_medicine_cloud();

//     console.log(popup_search_drugkind.value);
//     if(popup_search_drugkind.value == "") {
//         alert("請輸入資料");
//     } else {
//         let temp_arr = med_data["Data"].filter(e => e["DRUGKIND"].includes(popup_search_drugkind.value));
//         if(temp_arr.length < 1) {
//             alert("查無此藥");
//         } else {
//             console.log(temp_arr);
//             get_search_result_display(temp_arr);
//             hide_med_search();
//         }
//     }
//     hideLoadingPopup();
// };

// async function set_all_search_func() {
//     // 搜尋block按鈕功能
//     let popup_search_btn_code = document.querySelector("#popup_search_btn_code");
//     popup_search_btn_code.addEventListener("click", () => {
//         search_by_code();
//     });
//     let popup_search_btn_name = document.querySelector("#popup_search_btn_name");
//     popup_search_btn_name.addEventListener("click", () => {
//         search_by_name();
//     });
//     let popup_search_btn_ctname = document.querySelector("#popup_search_btn_ctname");
//     popup_search_btn_ctname.addEventListener("click", () => {
//         search_by_ctname();
//     });
//     let popup_search_btn_dianame = document.querySelector("#popup_search_btn_dianame");
//     popup_search_btn_dianame.addEventListener("click", () => {
//         search_by_dianame();
//     });
//     let popup_search_btn_drugkind = document.querySelector("#popup_search_btn_drugkind");
//     popup_search_btn_drugkind.addEventListener("click", () => {
//         search_by_drugkind();
//     });

//     let underline_display_all_med_search_popup_btn = document.querySelector(".underline_display_all_med_search_popup_btn");
//     underline_display_all_med_search_popup_btn.addEventListener("click", async () => {
//         showLoadingPopup();
//         let med_data = await get_medicine_cloud();
//         get_search_result_display(med_data["Data"]);
//         hide_med_search();
//         hideLoadingPopup();
//     });

//     let underline_init_search_popup_btn = document.querySelector(".underline_init_search_popup_btn");
//     underline_init_search_popup_btn.addEventListener("click", () => {
//         search_block_init();
//     });
// }