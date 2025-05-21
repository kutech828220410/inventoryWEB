let med_cart_beds_data;
let current_p_bed_data;
let med_list_timer;
// let pre_p_bed_data;
// let next_p_bed_data;
// let setUpdateInterval;
let last_p_bed_data;
let med_log_arr = [];
let med_nodis_log_arr = [];
let stickyOffset;
let med_double_check_arr = [];
let fake_icon_popup_data = [
    {
        short_name: "處方",
        name: "處方集",
    },
    {
        short_name: "外觀",
        name: "藥品外觀",
    },
    {
        short_name: "仿單",
        name: "藥品仿單",
    },
    {
        short_name: "同類",
        name: "同類藥",
    },
    {
        short_name: "規範",
        name: "健保規範",
    },
    {
        short_name: "註解",
        name: "醫師註解",
    },
];

// 調劑畫面生成
async function allocate_diplay_logic() {
    if(last_current_cart == "") {
        console.log("調劑功能畫面初生成");
        patient_bed_index = -1;
        last_patient_bed_index = -1;
        // pre_patient_bed_index = -1;
        // next_patient_bed_index = -1;
        // pre_p_bed_data = "";
        // next_p_bed_data = "";
        change_cart = true;
    } else if(current_cart != last_current_cart && last_current_cart != "") {
        console.log("調劑功能畫面init，藥車切換");
        patient_bed_index = -1;
        last_patient_bed_index = -1;
        // pre_patient_bed_index = -1;
        // next_patient_bed_index = -1;
        // pre_p_bed_data = "";
        // next_p_bed_data = "";
        change_cart = true;
    }

    // 根據選取的調劑台解鎖藥品
    if(current_med_table != "") {
        console.log("切換調劑台");
        await allocate_display_init("on");
    } else {
        console.log("未選調劑台");
        await allocate_display_init();
    }
    if(change_cart && med_cart_beds_data.length != 0) {
        alert(`目前為第${med_cart_beds_data[patient_bed_index].bednum}床`);
    }

    return;
}

function pbm_header_scroll() {
    let pbm_header_container = document.querySelector(".pbm_header_container");
    let pbm_main_container = document.querySelector(".pbm_main_container");

    // console.log(window.scrollY, "======", stickyOffset, "=======", pbm_header_container);
    if (window.scrollY >= stickyOffset) {
        pbm_header_container.classList.add('fixed');
        pbm_main_container.classList.add('pbm_main_container_fixed');
    } else {
        pbm_header_container.classList.remove('fixed');
        pbm_main_container.classList.remove('pbm_main_container_fixed');
    }
}

// 產生調劑台畫面
async function allocate_display_init(light_on) {
    Set_main_div_enable(true);

    med_cart_beds_data = await get_bed_list_by_cart(current_pharmacy.phar, current_cart.hnursta);
    med_cart_beds_data = med_cart_beds_data.Data;

    // 移除監聽滾動事件
    window.removeEventListener('scroll', pbm_header_scroll);

    console.log("調劑功能畫面產生");
    console.log(med_cart_beds_data);
    // console.log(current_p_bed_data);
    func_display_init();
    med_log_arr = [];
    med_double_check_arr = [];
    med_nodis_log_arr = [];

    let function_display_container = document.querySelector(".function_display_container");

    if(med_cart_beds_data.length == 0) {
        let no_data_div = document.createElement("div");
        no_data_div.classList.add("no_data_div");
        no_data_div.innerHTML = `${current_cart.hnursta} 無資料`;

        function_display_container.appendChild(no_data_div);
        Set_main_div_enable(false);
    } else {
        // 定位第一床與最後一床
        first_patient_bed_index = -1;
        final_patient_bed_index = med_cart_beds_data.length;
        do {
            first_patient_bed_index++;
        } while(med_cart_beds_data[first_patient_bed_index].bed_status != "已佔床");
    
        if(med_cart_beds_data.length > 1) {
            do {
                final_patient_bed_index--;
            } while(med_cart_beds_data[final_patient_bed_index].bed_status != "已佔床" || first_patient_bed_index == final_patient_bed_index);
        } else {
            final_patient_bed_index == 0;
        }
        
        if(patient_bed_index == -1) {
            for (let index = 0; index < med_cart_beds_data.length; index++) {
                let element = med_cart_beds_data[index];
                if(element.bed_status == "已佔床") {
                    patient_bed_index = index;
                    break;
                }
            }
        }

        // if(pre_patient_bed_index == -1 && next_patient_bed_index == -1) {
            // 第一次載入病床資料
            // 預設調劑台為全部
            let post_data;
            if(current_med_table == "" || current_med_table == "all") {
                if(current_func == "allocate") {
                    current_med_table = "all";
                    last_current_med_table = "all";
                    let med_table_content = document.querySelector(".med_table_content");
                    med_table_content.innerHTML = "全部";

                    post_data = {
                        Value: current_med_table,
                        ValueAry: [med_cart_beds_data[patient_bed_index].GUID]
                    }
                } else if (current_func == "review") {
                    post_data = {
                        Value: "all",
                        ValueAry: [med_cart_beds_data[patient_bed_index].GUID]
                    }
                }
    
            } else {
                post_data = {
                    Value: current_med_table.name,
                    ValueAry: [med_cart_beds_data[patient_bed_index].GUID]
                }
            }
    
            console.log("first_load post_data", post_data);
            current_p_bed_data = await get_patient_GUID(post_data);
            if(current_p_bed_data.Code != 200) {
                alert("病床資料錯誤", current_p_bed_data.Result);
                Set_main_div_enable(false);
                return;
            }
            current_p_bed_data = current_p_bed_data.Data;
            current_p_bed_data.cpoe.sort((a, b) => {
                const aHasPubMedY = a.pub_med == "Y" ? 1 : 0;
                const bHasPubMedY = b.pub_med == "Y" ? 1 : 0;
                return aHasPubMedY - bHasPubMedY; // 讓 pub_med 為 "Y" 的排到最後
            });
            

        // }
        // 這裡對預載入index做定位
        // 先將當前一床index定位為當前床index
        // pre_patient_bed_index = patient_bed_index;
        // next_patient_bed_index = patient_bed_index;
        
        // // 當前一床與當前床index不相等的時候，往前查找有效前一床(已佔床)
        // if(patient_bed_index != first_patient_bed_index) {
        //     do {
        //         pre_patient_bed_index--;
        //     } while(med_cart_beds_data[pre_patient_bed_index].bed_status != "已佔床");
        // }

        // // 當後一床與當前床index不相等，往後查找有效後一床(已佔床)
        // if(patient_bed_index != final_patient_bed_index) {
        //     do {
        //         next_patient_bed_index++;
        //     } while(med_cart_beds_data[next_patient_bed_index].bed_status != "已佔床");
        // }

        // setPreprocessingInterval();

        if(Array.isArray(current_p_bed_data["cpoe"]) && current_p_bed_data["cpoe"].length > 0) {
            let sortedData = current_p_bed_data["cpoe"].sort((a, b) => {
                if (a.dispens_name === "Y" && b.dispens_name !== "Y") {
                    return -1;
                } else if (a.dispens_name !== "Y" && b.dispens_name === "Y") {
                    return 1;
                } else {
                    return 0;
                }
            });
            console.log(sortedData);
            current_p_bed_data["cpoe"] = sortedData;
        }

        if(light_on == "on") {
            await light_switch_func();
        }

        let p_bed_header = get_p_bed_header();
        let p_bed_info_container = set_p_bed_info_container();
        let p_bed_med_container = set_p_bed_med_container();
    
        function_display_container.appendChild(p_bed_header);
        function_display_container.appendChild(p_bed_info_container);
        function_display_container.appendChild(p_bed_med_container);

        let p_status_td = document.querySelectorAll(".p_status_td");
        let p_status_arr = current_p_bed_data.abnormal.split(';');
        console.log(p_status_arr);

        p_status_td.forEach(element => {
            if(p_status_arr.includes(element.getAttribute("key"))) {
                element.classList.add("p_red_notice");
            }
        });
        open_med_detail_info();

        console.log("回到最上面");
        window.scrollTo({
            top: 0,
            behavior: "smooth" // 平滑滾動
        });
        console.log("回到最上面done");

        if(current_func == "allocate") {
            post_data = [current_cart.phar, current_cart.hnursta];
            console.log(post_data);
        
            med_change_data = await get_patient_with_NOdispense(post_data);
            med_change_data = med_change_data.Data;
            med_change_data = med_change_data.filter((e) => {
                return e.dispens_status != "Y";
            });

            med_change_data = med_change_data.filter((e) => {
                return Array.isArray(e.cpoe);
            });
        
            med_change_data = med_change_data.filter((e) => {
                return e.cpoe.length != 0;
            });
        
            console.log("藥品異動確認", med_change_data);
            console.log(med_change_data.length);
            if(med_change_data.length != 0) {
                console.log("加入驚嘆號");
                let ppmcl_btn = document.querySelector(".ppmcl_btn");
                ppmcl_btn.innerHTML = `未調藥品`;
            } else {
                console.log("去除驚嘆號");
                let ppmcl_btn = document.querySelector(".ppmcl_btn");
                ppmcl_btn.innerHTML = `未調藥品`;
            }
        } else {
            post_data = [current_cart.phar, current_cart.hnursta];
            console.log(post_data);
        
            med_change_data = await get_patient_with_NOdispense(post_data);
            med_change_data = med_change_data.Data;
            med_change_data = med_change_data.filter((e) => {
                return e.check_status != "Y";
            });

            med_change_data = med_change_data.filter((e) => {
                return Array.isArray(e.cpoe);
            });
        
            med_change_data = med_change_data.filter((e) => {
                return e.cpoe.length != 0;
            });
        
            console.log("藥品異動確認", med_change_data);
            console.log(med_change_data.length);
            if(med_change_data.length != 0) {
                console.log("加入驚嘆號");
                let ppmcl_btn = document.querySelector(".ppmcl_btn");
                ppmcl_btn.innerHTML = `未調藥品`;
            } else {
                console.log("去除驚嘆號");
                let ppmcl_btn = document.querySelector(".ppmcl_btn");
                ppmcl_btn.innerHTML = `未調藥品`;
            }
        }

        // 監聽滾動事件
        let pbm_header_container = document.querySelector(".pbm_header_container");
        // 取得 container 與頂部的距離
        stickyOffset = pbm_header_container.offsetTop + pbm_header_container.offsetHeight;
        window.addEventListener('scroll', pbm_header_scroll);

        Set_main_div_enable(false);
    }
}
function get_p_bed_header() {
    // 病床資訊及彈窗按鈕
    let p_bed_header = document.createElement("div");
    p_bed_header.classList.add("p_bed_header");

    let pb_name_display = document.createElement("div");
    pb_name_display.classList.add("pb_name_display");

    let pb_name_title = document.createElement("span");
    pb_name_title.classList.add("pb_name_title");
    pb_name_title.innerHTML = "病床號：";

    let pb_name_content = document.createElement("span");
    pb_name_content.classList.add("pb_name_content");
    pb_name_content.innerHTML = `${current_p_bed_data.nurnum}-${current_p_bed_data.bednum}`;

    pb_name_display.appendChild(pb_name_title);
    pb_name_display.appendChild(pb_name_content);

    let pb_btn_container = document.createElement("div");
    pb_btn_container.classList.add("pb_btn_container");

    let ppmcl_btn = document.createElement("div");
    ppmcl_btn.classList.add("btn");
    ppmcl_btn.classList.add("ppmcl_btn");
    ppmcl_btn.innerHTML = "未調藥品";
    ppmcl_btn.addEventListener("click", () => {
        popup_med_change_list_div_open();
    });

    let pb_list_btn = document.createElement("div");
    pb_list_btn.classList.add("btn");
    pb_list_btn.classList.add("pb_list_btn");
    pb_list_btn.innerHTML = "病床清單";
    pb_list_btn.addEventListener("click", () => {
        // set_pp_bed_list_info();
        popup_bed_list_div_open();
    })
    
    let pb_list_notice = document.createElement("img");
    pb_list_notice.classList.add("pb_list_notice");
    pb_list_notice.src = '../image/notice_mark.png'
    pb_list_notice.classList.add("display_none");
    for (let i = 0; i < med_cart_beds_data.length; i++) {
        const element = med_cart_beds_data[i];
        if(element.change == "Y") {
            pb_list_notice.classList.remove("display_none");
            break;
        };
    };
    
    pb_list_btn.appendChild(pb_list_notice);

    let med_cart_sum_list_btn = document.createElement("div");
    med_cart_sum_list_btn.classList.add("btn");
    med_cart_sum_list_btn.classList.add("med_cart_sum_list_btn");
    med_cart_sum_list_btn.innerHTML = "藥品總量";
    med_cart_sum_list_btn.addEventListener("click", async () => {
        Set_main_div_enable(true);
        clearTimeout(med_list_timer);
        med_list_timer = await setTimeout(() => {
            Set_main_div_enable(false);
            alert("連線超時，請重新點選");
            return;
        }, 6000);
        med_list_data = await get_all_med_qty(current_pharmacy.phar, current_cart.hnursta, "all");
        if(med_list_data.Code != 200) {
            clearTimeout(med_list_timer);

            alert("藥品總量資料錯誤", med_list_data.Result);
            Set_main_div_enable(false);
        } else {
            if(Array.isArray(med_list_data.Data)) {
                med_list_data = med_list_data.Data;
                med_list_data = sort_med_list_data(med_list_data, current_func);
                med_list_data = sort_display_med_data(med_list_data);
                await set_pp_med_list_display();
    
                clearTimeout(med_list_timer);
                
                popup_med_list_div_open();
                Set_main_div_enable(false);
            } else {
                console.log("藥品總量，資料格式錯誤", med_list_data.Data);
                med_list_data.Data = [];
                med_list_data = med_list_data.Data;
                med_list_data = sort_med_list_data(med_list_data, current_func);
                med_list_data = sort_display_med_data(med_list_data);
                await set_pp_med_list_display();
                
                clearTimeout(med_list_timer);
                Set_main_div_enable(false);
            }
        }
    });

    let dc_new_btn = document.createElement("div");
    dc_new_btn.classList.add("btn");
    dc_new_btn.classList.add("dc_new_btn");
    dc_new_btn.innerHTML = "歷程清單";
    dc_new_btn.addEventListener("click", () => {
        // cart_bed_length = fake_dc_new_data["p_bed"].length;
        // set_dc_new_info_table();
        popup_dc_new_div_open();
    });

    let bed_change_btn = document.createElement("div");
    bed_change_btn.classList.add("btn");
    bed_change_btn.classList.add("bed_change_btn");
    bed_change_btn.innerHTML = "病床異動";
    bed_change_btn.addEventListener("click", () => {
        popup_bed_change_div_open()
    });

    let med_take_btn = document.createElement("div");
    med_take_btn.classList.add("btn");
    med_take_btn.classList.add("med_take_btn");
    med_take_btn.innerHTML = "撈藥清單";
    med_take_btn.addEventListener("click", () => {
        popup_med_take_div_open();
    });

    // pb_btn_container.appendChild(ppmcl_btn);
    pb_btn_container.appendChild(med_take_btn);
    pb_btn_container.appendChild(dc_new_btn);
    // pb_btn_container.appendChild(med_cart_sum_list_btn);
    pb_btn_container.appendChild(pb_list_btn);
    // pb_btn_container.appendChild(bed_change_btn);

    // pb_btn_container.appendChild();
    // pb_btn_container.appendChild();

    p_bed_header.appendChild(pb_name_display);
    p_bed_header.appendChild(pb_btn_container);

    return p_bed_header;
}
function set_p_bed_info_container() {
    // 病床資料
    let p_bed_info_container = document.createElement("div");
    p_bed_info_container.classList.add("p_bed_info_container");

    let pbic_top = document.createElement("div");
    pbic_top.classList.add("pbic_top");

    let p_bed_simple_container = document.createElement("div");
    p_bed_simple_container.classList.add("p_bed_simple_container");

    let div_grid_1 = document.createElement("div");
    div_grid_1.classList.add("grid_30_30_30");

    // 病床號
    let pbsc_bed_num = document.createElement("div");
    pbsc_bed_num.classList.add("pbsc_info");
    pbsc_bed_num.innerHTML = `${current_p_bed_data.nurnum}-${current_p_bed_data.bednum}`;

    // p_bed_simple_container.appendChild(pbsc_bed_num);

    // 姓名
    let pbsc_p_name = document.createElement("div");
    pbsc_p_name.classList.add("pbsc_info");
    pbsc_p_name.innerHTML = `${current_p_bed_data.pnamec}`;

    div_grid_1.appendChild(pbsc_p_name);

    // 病例好
    let pbsc_histno = document.createElement("div");
    pbsc_histno.classList.add("pbsc_info");
    pbsc_histno.innerHTML = `${current_p_bed_data.histno}`;

    div_grid_1.appendChild(pbsc_histno);

    // 健保類別
    let pbsc_pfinc = document.createElement("div");
    pbsc_pfinc.classList.add("pbsc_info");
    pbsc_pfinc.innerHTML = `${current_p_bed_data.pfinc}`;

    div_grid_1.appendChild(pbsc_pfinc);

    p_bed_simple_container.appendChild(div_grid_1);

    let div_grid_2 = document.createElement("div");
    div_grid_2.classList.add("grid_30_30_30");

    // 性別
    let pbsc_gender = document.createElement("div");
    pbsc_gender.classList.add("pbsc_info");
    pbsc_gender.innerHTML = `${current_p_bed_data.hsexc}`;

    div_grid_2.appendChild(pbsc_gender);

    // 年齡
    let pbsc_age = document.createElement("div");
    pbsc_age.classList.add("pbsc_info");
    pbsc_age.innerHTML = `${current_p_bed_data.age}`;

    div_grid_2.appendChild(pbsc_age);

    // 科別
    let pbsc_psectc = document.createElement("div");
    pbsc_psectc.classList.add("pbsc_info");
    pbsc_psectc.innerHTML = `${current_p_bed_data.psectc}`;

    div_grid_2.appendChild(pbsc_psectc);

    p_bed_simple_container.appendChild(div_grid_2);

    let div_grid_3 = document.createElement("div");
    div_grid_3.classList.add("grid_30_30_30");

    // 體重
    let pbsc_weight = document.createElement("div");
    pbsc_weight.classList.add("pbsc_info");
    pbsc_weight.innerHTML = `${+current_p_bed_data.weight}Kg`;

    div_grid_3.appendChild(pbsc_weight);

    // 身高
    let pbsc_hight = document.createElement("div");
    pbsc_hight.classList.add("pbsc_info");
    pbsc_hight.innerHTML = `${+current_p_bed_data.hight}cm`;

    div_grid_3.appendChild(pbsc_hight);

    // 體表面積
    let pbsc_pbbsa = document.createElement("div");
    pbsc_pbbsa.classList.add("pbsc_info");
    // pbsc_pbbsa.innerHTML = `BSA：${+current_p_bed_data.pbbsa}㎡`;
    pbsc_pbbsa.innerHTML = `${+current_p_bed_data.pbbsa}㎡`;

    div_grid_3.appendChild(pbsc_pbbsa);

    p_bed_simple_container.appendChild(div_grid_3);

    let div_grid_4 = document.createElement("div");
    div_grid_4.classList.add("grid_30_30_30");

    // 鼻胃管
    let pbsc_ngtube = document.createElement("div");
    pbsc_ngtube.classList.add("pbsc_info");
    if(current_p_bed_data.ngtube == "Y") pbsc_ngtube.innerHTML = `鼻胃管`;

    // 管灌餐
    let pbsc_tube = document.createElement("div");
    pbsc_tube.classList.add("pbsc_info");
    if(current_p_bed_data.tube == "Y") pbsc_tube.innerHTML = `管灌餐`;

    div_grid_4.appendChild(pbsc_ngtube);
    div_grid_4.appendChild(pbsc_tube);

    if(current_p_bed_data.ngtube == "Y" || current_p_bed_data.tube == "Y") {
        p_bed_simple_container.appendChild(div_grid_4);
    }

    let div_grid_5 = document.createElement("div");
    div_grid_5.classList.add("grid_100");

    // 過敏史
    let pbsc_hallergy = document.createElement("div");
    pbsc_hallergy.classList.add("pbsc_info");
    // pbsc_hallergy.innerHTML = `BSA：${+current_p_bed_data.hallergy}㎡`;
    pbsc_hallergy.innerHTML = `過敏史：${current_p_bed_data.hallergy}`;

    if(current_p_bed_data.hallergy != "") {
        div_grid_5.appendChild(pbsc_hallergy);
        p_bed_simple_container.appendChild(div_grid_5);
    }

    let pbsc_doc_container = document.createElement("div");
    pbsc_doc_container.classList.add("pbsc_info");
    pbsc_doc_container.classList.add("pbsc_doctor");
    pbsc_doc_container.innerHTML = `
        <div class="pbsc_doc">主治：${current_p_bed_data.pvsdno_name}(${current_p_bed_data.pvsdno})</div>
        <div class="pbsc_doc">住院：${current_p_bed_data.prdno_name}(${current_p_bed_data.prdno})</div>
    `;

    p_bed_simple_container.appendChild(pbsc_doc_container);

    // let pbsc_pbbsa = document.createElement("div");
    // pbsc_pbbsa.classList.add("pbsc_info");
    // pbsc_pbbsa.innerHTML = `體表面積：${current_p_bed_data.pbbsa}`;

    // p_bed_simple_container.appendChild(pbsc_pbbsa);

    let p_bed_detailed_container = document.createElement("div");
    p_bed_detailed_container.classList.add("p_bed_detailed_container");
    p_bed_detailed_container.innerHTML = `
    <table class="pbd_table">
      <tr class="pbd_th">
        <td>ALB</td>
        <td>SCr</td>
        <td>eGFR</td>
        <td>ALT</td>
      </tr>
      <tr class="pbd_tr">
        <td class="p_status_td" key="alb">${current_p_bed_data.alb}</td>
        <td class="p_status_td" key="scr">${current_p_bed_data.scr}</td>
        <td class="p_status_td" key="egfr">${current_p_bed_data.egfr}</td>
        <td class="p_status_td" key="alt">${current_p_bed_data.alt}</td>
      </tr>
      <tr class="pbd_th">
        <td>K</td>
        <td>CA</td>
        <td>NA</td>
        <td>T.B</td>
      </tr>
      <tr class="pbd_tr">
        <td class="p_status_td" key="k">${current_p_bed_data.k}</td>
        <td class="p_status_td" key="ca">${current_p_bed_data.ca}</td>
        <td class="p_status_td" key="na">${current_p_bed_data.na}</td>
        <td class="p_status_td" key="tb">${current_p_bed_data.tb}</td>
      </tr>
      <tr class="pbd_th">
        <td>WBC</td>
        <td>Hgb</td>
        <td>PLT</td>
        <td>INR</td>
      </tr>
      <tr class="pbd_tr">
        <td class="p_status_td" key="wbc">${current_p_bed_data.wbc}</td>
        <td class="p_status_td" key="hgb">${current_p_bed_data.hgb}</td>
        <td class="p_status_td" key="plt">${current_p_bed_data.plt}</td>
        <td class="p_status_td" key="inr">${current_p_bed_data.inr}</td>
      </tr>
    </table>`;

    pbic_top.appendChild(p_bed_simple_container);
    pbic_top.appendChild(p_bed_detailed_container);

    let pbic_disease_container = document.createElement("div");
    pbic_disease_container.classList.add("pbic_disease_container");

    
    if(current_p_bed_data.disease != "" && current_p_bed_data.disease_code != "") {
        let pbict_table = document.createElement('table');
        pbict_table.classList.add("pbict_table");

        let pbict_thead = document.createElement("tr");
        pbict_thead.classList.add("pbict_thead");
        pbict_thead.innerHTML = `
            <td>項次</td>
            <td>疾病代號</td>
            <td>病名</td>
        `;

        pbict_table.appendChild(pbict_thead);

        let diseasesArray = current_p_bed_data.disease_descrip.split(";");
        let codesArray = current_p_bed_data.disease_code.split(";");
    
        let diseases_arr = diseasesArray.map((item, index) => {
            return {
                name: item,
                code: codesArray[index]
            };
        });

        console.log(diseases_arr);

        diseases_arr.forEach((item, index) => {
            let pbict_tr = document.createElement("tr");
            pbict_tr.classList.add("pbict_tr");
            pbict_tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.code}</td>
                <td>${item.name}</td>
            `;

            pbict_table.appendChild(pbict_tr);
        });

        pbic_disease_container.appendChild(pbict_table);
    } else {
        pbic_disease_container.innerHTML = '無疾病資料';
    }


    p_bed_info_container.appendChild(pbic_top);
    p_bed_info_container.appendChild(pbic_disease_container);

    return p_bed_info_container;
}
function set_p_bed_med_container() {
    // 病床藥品資料
    let p_bed_med_container = document.createElement("div");
    p_bed_med_container.classList.add("p_bed_med_container");

    let pbm_header_container = set_pbm_header_container();
    let pbm_main_container = set_pbm_main_container();
    // let pbm_footer_container = set_pbm_footer_container();

    p_bed_med_container.appendChild(pbm_header_container);
    p_bed_med_container.appendChild(pbm_main_container);
    // p_bed_med_container.appendChild(pbm_footer_container);

    return p_bed_med_container;
}
function set_pbm_header_container() {
    let pbm_header_container = document.createElement("div");
    pbm_header_container.classList.add('pbm_header_container');

    let pbmh_pre_btn = document.createElement("div");
    pbmh_pre_btn.classList.add("pbmh_pre_btn");
    pbmh_pre_btn.classList.add("btn");
    pbmh_pre_btn.innerHTML = "上一床";
    if(patient_bed_index == first_patient_bed_index) {
        pbmh_pre_btn.classList.add("pbmh_pre_btn_not_allow");
        pbmh_pre_btn.classList.add("display_none");
    } else {
        pbmh_pre_btn.addEventListener("click", () => {
            pre_bed_func();
        });
    }

    let pbmh_light_on_btn = document.createElement("div");
    pbmh_light_on_btn.classList.add("pbmh_light_on_btn");
    pbmh_light_on_btn.innerHTML = "亮燈";
    pbmh_light_on_btn.addEventListener("click", () => {
        if(current_med_table == "all" || current_med_table == "") {
            alert("未選擇調劑台，請選好調劑台或使用藥品總量功能");
            return;
        }
        light_switch_func();
    });

    let pbmh_checked_trigger_label = document.createElement("div");
    pbmh_checked_trigger_label.classList.add("pbmh_checked_trigger_label");
    pbmh_checked_trigger_label.classList.add("btn");
    pbmh_checked_trigger_label.setAttribute("checked", false);
    pbmh_checked_trigger_label.innerHTML = "全選";
    pbmh_checked_trigger_label.addEventListener("click", (e) => {
        let tirgger = e.target.getAttribute("checked");
        let pbmh_checked_trigger_label = document.querySelectorAll(".pbmh_checked_trigger_label");
        let med_card_checkbox = document.querySelectorAll(".med_card_checkbox");
        if(tirgger == "false") {
            // 點選後全選
            med_card_checkbox.forEach(element => {
                let temp_boolean = element.classList.contains("med_card_checkbox_disabled");
                if(!element.disabled && !temp_boolean) {
                    element.checked = true;
                    pbmh_checked_trigger_label.forEach(item => {
                        item.innerHTML = "取消全選";
                        item.setAttribute("checked", true);
                    });
                    med_log_arr.push(element.id);

                    let index = med_nodis_log_arr.indexOf(element.id);  // 找到 "orange" 的索引位置

                    if (index !== -1) {
                        med_nodis_log_arr.splice(index, 1);  // 移除索引位置的那個元素
                    }
                }

                // 大瓶藥品api參數設定追加
                let temp_check_isArray = page_setting_params && page_setting_params.big_bottle_exception && page_setting_params.big_bottle_exception.value;

                if(temp_check_isArray) {
                    if(page_setting_params.big_bottle_exception.value == "True") {
                        if(element.getAttribute("isBig") == "L") {
                            element.checked = false;
                        }
                    }
                } else {
                    if(element.getAttribute("isBig") == "L") {
                        element.checked = false;
                    }
                }

                console.log(med_log_arr);
                console.log(med_nodis_log_arr);
            });
        } else {
            med_card_checkbox.forEach(element => {
                let temp_boolean = element.classList.contains("med_card_checkbox_disabled");
                if(!element.disabled && !temp_boolean) {
                    element.checked = false;
                    pbmh_checked_trigger_label.forEach(item => {
                        item.innerHTML = "全選";
                        item.setAttribute("checked", false);
                    });
                    let index = med_log_arr.indexOf(element.id);  // 找到 "orange" 的索引位置

                    if (index !== -1) {
                        med_log_arr.splice(index, 1);  // 移除索引位置的那個元素
                    }

                    med_nodis_log_arr.push(element.id);
                }
            });

            console.log(med_log_arr);
            console.log(med_nodis_log_arr);
        }
    });

    // let pbmh_checked_trigger = document.createElement("input");
    // pbmh_checked_trigger.id = "pbmh_checked_trigger";
    // pbmh_checked_trigger.type = "checkbox";
    // pbmh_checked_trigger.name = "pbmh_checked_trigger";

    // pbmh_checked_trigger_label.appendChild(pbmh_checked_trigger);

    let pbmh_next_btn = document.createElement("div");
    pbmh_next_btn.classList.add("pbmh_next_btn");
    pbmh_next_btn.classList.add("btn");
    pbmh_next_btn.innerHTML = "下一床";
    if(patient_bed_index == final_patient_bed_index) {
        pbmh_next_btn.classList.add("pbmh_pre_btn_not_allow");
    } else {
        pbmh_next_btn.addEventListener("click", () => {
            next_bed_func();
        });
    }

    if(patient_bed_index == final_patient_bed_index) {
        pbmh_next_btn.classList.add("display_none");
    } 

    let pbmh_checked_submit_btn = document.createElement("div");
    pbmh_checked_submit_btn.classList.add("pbmh_checked_submit_btn");
    pbmh_checked_submit_btn.classList.add("btn");
    pbmh_checked_submit_btn.innerHTML = "完成";
    pbmh_checked_submit_btn.addEventListener("click", async () => {
        Set_main_div_enable(true);
        let return_data = await set_post_data_to_check_dispense();
        if(return_data.Code == 200) {
            if(current_med_table == "" || current_med_table == "all") {
                if(current_func == "allocate") {
                    current_med_table = "all";
                    last_current_med_table = "all";
                    let med_table_content = document.querySelector(".med_table_content");
                    med_table_content.innerHTML = "全部";
                }

                post_data = {
                    Value: current_med_table,
                    ValueAry: [med_cart_beds_data[patient_bed_index].GUID]
                }
            } else {
                post_data = {
                    Value: current_med_table.name,
                    ValueAry: [med_cart_beds_data[patient_bed_index].GUID]
                }
            }
        
            current_p_bed_data = await get_patient_GUID(post_data);
            current_p_bed_data = current_p_bed_data.Data;
            current_p_bed_data.cpoe.sort((a, b) => {
                const aHasPubMedY = a.pub_med == "Y" ? 1 : 0;
                const bHasPubMedY = b.pub_med == "Y" ? 1 : 0;
                return aHasPubMedY - bHasPubMedY; // 讓 pub_med 為 "Y" 的排到最後
            });
            await allocate_display_init("");
            alert(`第${current_p_bed_data.bednum}床，完成調劑`);
            Set_main_div_enable(false);
        }
    });

    if(patient_bed_index != final_patient_bed_index) {
        pbmh_checked_submit_btn.classList.add("display_none");
    } 

    pbm_header_container.appendChild(pbmh_pre_btn);
    if(current_func == "allocate") {
        pbm_header_container.appendChild(pbmh_light_on_btn);
    }
    pbm_header_container.appendChild(pbmh_checked_trigger_label);
    pbm_header_container.appendChild(pbmh_checked_submit_btn);
    pbm_header_container.appendChild(pbmh_next_btn);

    return pbm_header_container;
}
function set_pbm_main_container() {
    let pbm_main_container = document.createElement("div");
    pbm_main_container.classList.add("pbm_main_container");
    
    console.log(current_p_bed_data);

    if(current_p_bed_data["cpoe"].length == 0) {
        let no_med_info_div = document.createElement("div");
        no_med_info_div.classList.add("no_med_info_div");
        no_med_info_div.innerHTML = "無藥品資料";

        pbm_main_container.appendChild(no_med_info_div);
        
        return pbm_main_container;
    }

    console.log("頁面設定", page_setting_params);

    current_p_bed_data["cpoe"].forEach((element, index) => {
        let med_card_container = document.createElement("div");
        med_card_container.classList.add("med_card_container");

        if(page_setting_params.order_display_mode) {
            if(page_setting_params.order_display_mode.value == "雙色") {
                if(index % 2 == 0) {
                    med_card_container.classList.add("med_card_container_odd");
                }
            } else if(page_setting_params.order_display_mode.value == "種類區分(口服、針劑)") {
                if(element.ice == "Y") {
                    // med_card_container.classList.add("med_card_container_ice");
                } else if(element.injection == "Y") {
                    med_card_container.classList.add("med_card_container_injection");
                } else if(element.oral == "Y") {
                    med_card_container.classList.add("med_card_container_oral");
                }
            }
        }

        let temp_check_isArray = page_setting_params && page_setting_params["display_public_medicine"] && page_setting_params["display_public_medicine"].value;
        if(temp_check_isArray) {
            if(page_setting_params["display_public_medicine"].value == "False") {
                if (element.pub_med == "Y") {
                    med_card_container.style.display = "none";
                }
            }
        } else {
            if (element.pub_med == "Y") {
                med_card_container.style.display = "none";
            }
        }

        if(element.pub_med == "Y") {
            med_card_container.classList.add("card_pub_med_bgc");
        }

        let med_card_title_container = document.createElement("div");
        med_card_title_container.classList.add("med_card_title_container");

        let med_card_checkbox_label = document.createElement("label");
        med_card_checkbox_label.classList.add("med_card_checkbox_label");
        med_card_checkbox_label.setAttribute("for", `${element.GUID}`);

        let med_card_checkbox = document.createElement("input");
        med_card_checkbox.classList.add("med_card_checkbox");
        med_card_checkbox.id = `${element.GUID}`;
        med_card_checkbox.setAttribute("isBig", element.large);
        let temp_str_code = element.code;
        temp_str_code = temp_str_code.toUpperCase();
        med_card_checkbox.setAttribute("CODE", temp_str_code);
        med_card_checkbox.type = "checkbox";
        if(current_func == "allocate") {
            if(element.dispens_status == "Y") med_card_checkbox.checked = true;
            if(element.dispens_name != "Y") {
                // med_card_checkbox.disabled = true;
                med_card_checkbox.classList.add("med_card_checkbox_disabled");
                med_card_container.classList.add("card_disable");
                med_card_checkbox.addEventListener("click", () => {
                    med_card_checkbox.checked = !med_card_checkbox.checked;
                    alert("請選擇對應調劑台後，在進行調劑");
                });
            } else {
                // med_card_checkbox.disabled = false;
                med_card_checkbox.setAttribute("dispens_name", "Y");
                med_card_checkbox.classList.remove("med_card_checkbox_disabled");
                med_card_checkbox.addEventListener("click", () => {
                    if(med_card_checkbox.checked) {
                        med_log_arr.push(element.GUID);

                        let index = med_nodis_log_arr.indexOf(element.GUID);  // 找到 "orange" 的索引位置
    
                        if (index !== -1) {
                            med_nodis_log_arr.splice(index, 1);  // 移除索引位置的那個元素
                        }
                    } else {
                        let index = med_log_arr.indexOf(element.GUID);  // 找到 "orange" 的索引位置
    
                        if (index !== -1) {
                            med_log_arr.splice(index, 1);  // 移除索引位置的那個元素
                        }

                        med_nodis_log_arr.push(element.GUID);
                    }
                    console.log(med_log_arr);
                    console.log(med_nodis_log_arr);
                })
            }
        } else {
            if(element.check_status == "Y") med_card_checkbox.checked = true;
            if(element.dispens_status != "Y") {
                // med_card_checkbox.disabled = true;
                med_card_checkbox.classList.add("med_card_checkbox_disabled");
                med_card_container.classList.add("card_disable");
                med_card_checkbox.addEventListener("click", () => {
                    med_card_checkbox.checked = !med_card_checkbox.checked;
                    alert("尚未完成調劑，無法進行覆核");
                });
            } else {
                // med_card_checkbox.disabled = false;
                med_card_checkbox.setAttribute("dispens_name", "Y");
                med_card_checkbox.classList.remove("med_card_checkbox_disabled");
                med_card_checkbox.addEventListener("click", () => {
                    if(med_card_checkbox.checked) {
                        med_log_arr.push(element.GUID);

                        let index = med_nodis_log_arr.indexOf(element.GUID);  // 找到 "orange" 的索引位置
    
                        if (index !== -1) {
                            med_nodis_log_arr.splice(index, 1);  // 移除索引位置的那個元素
                        }
                    } else {
                        let index = med_log_arr.indexOf(element.GUID);  // 找到 "orange" 的索引位置
    
                        if (index !== -1) {
                            med_log_arr.splice(index, 1);  // 移除索引位置的那個元素
                        }
    

                        med_nodis_log_arr.push(element.GUID);
                    }
                    console.log(med_log_arr);
                    console.log(med_nodis_log_arr);
                })
            }  
        }


        med_card_checkbox_label.appendChild(med_card_checkbox);

        let med_card_main_display_container = document.createElement("div");
        med_card_main_display_container.classList.add("med_card_main_display_container");

        med_card_main_display_container.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
        });
        
        med_card_main_display_container.addEventListener('touchend', (e) => {
            const touch = e.changedTouches[0];
            const endX = touch.clientX;
            const endY = touch.clientY;
        
            const distanceX = Math.abs(endX - startX);
            const distanceY = Math.abs(endY - startY);
        
            // 設定滑動距離閾值，例如10像素
            if (distanceX < 10 && distanceY < 10) {
                if(!med_card_checkbox.classList.contains("med_card_checkbox_disabled")) {
                    med_card_checkbox.checked = !med_card_checkbox.checked;
                } else {
                    alert("尚未完成調劑，無法進行覆核");
                }
            }
        });

        let med_card_info_container = document.createElement("div");
        med_card_info_container.classList.add("med_card_info_container");

        let med_card_code = document.createElement("div");
        med_card_code.classList.add("med_card_code");
        med_card_code.innerHTML = `藥碼：${element.code}`;

        let med_card_ordseq = document.createElement("div");
        med_card_ordseq.classList.add("med_card_ordseq");
        med_card_ordseq.innerHTML = `序號：${element.ordseq}`;

        let med_card_dosage = document.createElement("div");
        med_card_dosage.classList.add("med_card_dosage");
        med_card_dosage.innerHTML = `劑量：${element.dosage}`;

        let med_card_freqn = document.createElement("div");
        med_card_freqn.classList.add("med_card_freqn");
        let temp_str = element.freqn.toUpperCase()
        if(temp_str.includes("PRN")) {
            med_card_freqn.innerHTML = `頻次：<span class="s_color">${element.freqn}</span>`;
        } else {
            med_card_freqn.innerHTML = `頻次：${element.freqn}`;
        }

        let med_card_route = document.createElement("div");
        med_card_route.classList.add("med_card_route");
        med_card_route.innerHTML = `途徑：${element.route}`;

        let med_card_unit = document.createElement("div");
        med_card_unit.classList.add("med_card_unit");
        med_card_unit.innerHTML = `單位：${element.dunit}`;

        let med_card_storage = document.createElement("div");
        med_card_storage.classList.add("med_card_storage");
        med_card_storage.innerHTML = `儲位：${element.store_position}`;

        let med_card_other_phar = document.createElement("div");
        med_card_other_phar.classList.add("med_card_other_phar");
        med_card_other_phar.innerHTML = element.pharm_name;

        temp_check_isArray = page_setting_params && page_setting_params["display_block"] && page_setting_params["display_block"].value;

        if(temp_check_isArray) {
            for (let i = 0; i < page_setting_params["display_block"]["value"].length; i++) {
                const item = page_setting_params["display_block"]["value"][i];
                switch (item.name) {
                    case "ordseq":
                        if(item.value == "True") med_card_info_container.appendChild(med_card_ordseq);
                        break;
                    case "dosage":
                        if(item.value == "True") med_card_info_container.appendChild(med_card_dosage);
                        break;
                    case "dunit":
                        if(item.value == "True") med_card_info_container.appendChild(med_card_unit);
                        break;
                    case "freqn":
                        if(item.value == "True") med_card_info_container.appendChild(med_card_freqn);
                        break;
                    case "route":
                        if(item.value == "True") med_card_info_container.appendChild(med_card_route);
                        break;
                    case "code":
                        if(item.value == "True") med_card_info_container.appendChild(med_card_code);
                        break;
                    case "storage":
                        if(item.value == "True") med_card_info_container.appendChild(med_card_storage);
                        break;
                
                    default:
                        break;
                }
            }
        } else {
            med_card_info_container.appendChild(med_card_ordseq);
            med_card_info_container.appendChild(med_card_dosage);
            med_card_info_container.appendChild(med_card_unit);
            med_card_info_container.appendChild(med_card_route);
            med_card_info_container.appendChild(med_card_freqn);
            med_card_info_container.appendChild(med_card_code);
        }
            
        
        let med_name_card_container = document.createElement("div");
        med_name_card_container.classList.add("med_name_card_container");

        let med_card_name = document.createElement("div");
        med_card_name.classList.add("med_card_name");
        temp_check_isArray = page_setting_params && page_setting_params.med_name_font_size && page_setting_params.med_name_font_size.value;
        if(temp_check_isArray) {
            med_card_name.style.fontSize = `${page_setting_params.med_name_font_size.value}px`;
        }
        if(!element["med_cloud"][0]) {
            if(element.name == "") {
                med_card_name.innerHTML = ``;
            } else {
                med_card_name.innerHTML = `${element.name}`;
            }
        } else {
            if(!element["med_cloud"][0].NAME) {
                med_card_name.innerHTML = `${element.name}`;
            } else {
                med_card_name.innerHTML = `${element["med_cloud"][0].NAME}`;
            }
        }

        let med_card_cht_name = document.createElement("div");
        med_card_cht_name.classList.add("med_card_cht_name");
        temp_check_isArray = page_setting_params && page_setting_params.med_cht_name_font_size && page_setting_params.med_cht_name_font_size.value;
        if(temp_check_isArray) {
            med_card_cht_name.style.fontSize = `${page_setting_params.med_cht_name_font_size.value}px`;
        }
        if(!element["med_cloud"][0]) {
            if(element.cht_name == "") {
                med_card_cht_name.innerHTML = ``;
            } else {
                med_card_cht_name.innerHTML = `${element.cht_name}`;
            }
        } else {
            if(!element["med_cloud"][0].CHT_NAME) {
                med_card_cht_name.innerHTML = `${element.cht_name}`;
            } else {
                med_card_cht_name.innerHTML = `${element["med_cloud"][0].CHT_NAME}`;
            }
        }

        med_name_card_container.appendChild(med_card_name);
        med_name_card_container.appendChild(med_card_cht_name);

        med_card_main_display_container.appendChild(med_name_card_container);
        med_card_main_display_container.appendChild(med_card_info_container);

        let med_card_note_container = document.createElement("div");
        med_card_note_container.classList.add("med_card_note_container");
        med_card_note_container.innerHTML = `備註：${element.note}`;

        if(element.note) {
            med_card_main_display_container.appendChild(med_card_note_container);
        }

        // console.log(element.pharm_code);
        // console.log(current_cart.phar);

        let med_card_big_bottle_icon = document.createElement("div");
        med_card_big_bottle_icon.classList.add("med_card_big_bottle_icon");
        med_card_big_bottle_icon.innerHTML = `<img src="../image/iv-bag.png" alt="bottle icon">`;
        med_card_big_bottle_icon.setAttribute("GUID", element.GUID);
        if(element.large == "L") {
            med_card_big_bottle_icon.classList.add("med_card_bigB");
        } 
        med_card_big_bottle_icon.addEventListener("click", async () => {
            if(med_card_big_bottle_icon.classList.contains("med_card_bigB")) {
                let post_data = {
                    ValueAry:[element.GUID, ""]
                };
                if(confirm("該處方藥品是否取消大瓶藥標記？")){
                    let return_data = await update_large_in_med_cpoe(post_data);
                    if(return_data.Code == 200) {
                        med_card_big_bottle_icon.classList.remove("med_card_bigB");
                    } else {
                        alert("變更失敗請確認資料");
                    }
                } else {
                    return;
                }
            } else {
                let post_data = {
                    ValueAry:[element.GUID, "L"]
                };
                if(confirm("該處方藥品是否標記為大瓶藥？")){
                    let return_data = await update_large_in_med_cpoe(post_data);
                    if(return_data.Code == 200) {
                        med_card_big_bottle_icon.classList.add("med_card_bigB");
                    } else {
                        alert("變更失敗請確認資料");
                    }
                } else {
                    return;
                }
            }
        });

        let med_card_open_tigger = document.createElement("img");
        med_card_open_tigger.classList.add("med_card_open_tigger");
        med_card_open_tigger.src = "../image/left-arrow.png";
        med_card_open_tigger.setAttribute("trigger", false);

        let med_card_mid_display_container = document.createElement("div");
        med_card_mid_display_container.classList.add("med_card_mid_display_container");

        let med_card_light_btn_for_bed = document.createElement("div");
        med_card_light_btn_for_bed.classList.add("med_card_light_btn_for_bed");
        med_card_light_btn_for_bed.innerHTML = "亮燈";
        // med_card_light_btn_for_bed.setAttribute("code");
        // med_card_light_btn_for_bed.setAttribute("name");
        // med_card_light_btn_for_bed.setAttribute("cht_name");
        med_card_light_btn_for_bed.addEventListener("click", async () => {
            if(current_med_table == "all") {
                await set_light_table(element.code, element.name, element.cht_name);
                popup_light_table_select_div_open();
            } else if(current_med_table == "") {
                await set_light_table(element.code, element.name, element.cht_name);
                popup_light_table_select_div_open();
            } else {
                await light_on_func(element.code, current_med_table.name, current_med_table.type);
            }
        });

        let med_card_qty = document.createElement("div");
        med_card_qty.classList.add("med_card_qty");
        let temp_qty = +element.qty
        med_card_qty.innerHTML = `
            <div>總量</div>
            <div>${temp_qty}</div>
        `;

        med_card_mid_display_container.appendChild(med_card_light_btn_for_bed);
        med_card_mid_display_container.appendChild(med_card_qty);

        let med_cart_warnning_container = document.createElement("div");
        med_cart_warnning_container.classList.add("med_cart_warnning_container");
        med_card_main_display_container.appendChild(med_cart_warnning_container);

        let med_cart_warnning_liver = document.createElement("div");
        med_cart_warnning_liver.classList.add("warnning_icon");
        med_cart_warnning_liver.innerHTML = "肝";

        let med_cart_warnning_kidney = document.createElement("div");
        med_cart_warnning_kidney.classList.add("warnning_icon");
        med_cart_warnning_kidney.innerHTML = "腎";

        let med_cart_warnning_repeat = document.createElement("div");
        med_cart_warnning_repeat.classList.add("warnning_icon");
        med_cart_warnning_repeat.innerHTML = "重";

        let med_cart_warnning_grind = document.createElement("div");
        med_cart_warnning_grind.classList.add("warnning_icon");
        med_cart_warnning_grind.classList.add("not_allow_warnning_icon");
        med_cart_warnning_grind.innerHTML = "磨";

        let med_cart_warnning_self = document.createElement("div");
        med_cart_warnning_self.classList.add("warnning_icon");
        med_cart_warnning_self.innerHTML = "自費";

        if(element.lkflag != "" && element.lkflag != undefined) {
            if(element.lkflag.includes("L")) med_cart_warnning_container.appendChild(med_cart_warnning_liver);
            if(element.lkflag.includes("K")) med_cart_warnning_container.appendChild(med_cart_warnning_kidney);
        }

        if(element.samedg == "Y") med_cart_warnning_container.appendChild(med_cart_warnning_repeat);
        if(element.udngt == "N") med_cart_warnning_container.appendChild(med_cart_warnning_grind);
        if(element.self == "Y") med_cart_warnning_container.appendChild(med_cart_warnning_self);

        med_card_main_display_container.appendChild(med_cart_warnning_container);

        if(element.pharm_code != "") {
            med_card_main_display_container.appendChild(med_card_other_phar);
        }
        med_card_title_container.appendChild(med_card_checkbox_label);
        med_card_title_container.appendChild(med_card_main_display_container);
        med_card_title_container.appendChild(med_card_mid_display_container);
        med_card_title_container.appendChild(med_card_big_bottle_icon);
        med_card_title_container.appendChild(med_card_open_tigger);

        med_card_container.appendChild(med_card_title_container);
        
        let med_more_info_container = document.createElement("div");
        med_more_info_container.classList.add("med_more_info_container");

        fake_icon_popup_data.forEach(item => {
            let med_detail_info_div = document.createElement("div");
            med_detail_info_div.classList.add("med_detail_info_div");
            med_detail_info_div.innerHTML = item.short_name;

            switch (item.short_name) {
                case "處方":
                    med_detail_info_div.addEventListener("click", () => {
                        console.log(element.med_cloud);
                        if(element.med_cloud.length == 0) {
                            set_ppp_info_func("");
                            popup_prescription_info_div_open();
                        } else {
                            set_ppp_info_func(element.med_cloud[0]);
                            popup_prescription_info_div_open();
                        }
                    })
                    break;
                case "外觀":
                    med_detail_info_div.addEventListener("click", async () => {
                        let name;
                        let cht_name;
                        let code;
                        if(element.med_cloud.length == 0) {
                            name = element.name;
                            cht_name = "";
                            code = element.code;
                        } else {
                            name = element.med_cloud[0].NAME; 
                            cht_name = element.med_cloud[0].CHT_NAME;
                            code = element.med_cloud[0].CODE;
                        }
                        await set_pp_med_pic_func(name, cht_name, code);
                        popup_med_pic_div.Set_Visible(true);
                    })
                    break;
                case "仿單":
                    med_detail_info_div.addEventListener("click", () => {
                        if(element.med_cloud.length == 0) {
                            alert("無連接資料");
                        } else {
                            window.open(element.med_cloud[0].PIL_URL, '_blank');
                            // window.open(element.med_cloud[0].med_packeage, '_blank');
                        }
                    })
                    break;
                case "同類":
                    med_detail_info_div.addEventListener("click", () => {
                        if(element.med_cloud.length == 0) {
                            set_ppsd_func("");
                            popup_similar_drugs_div_open();
                        } else {
                            set_ppsd_func(element.med_cloud[0], element.medprice[0]);
                            popup_similar_drugs_div_open();
                        }
                    })
                    break;
                case "規範":
                    med_detail_info_div.addEventListener("click", () => {
                        if(element.med_cloud.length == 0) {
                            set_ppir_func("");
                            popup_insurance_regulations_div_open();
                        } else {
                            let temp_text = element.med_cloud[0].HI_REGULATION.replace(/\n/g, '<br><br>');
                            // let temp_text = element.med_cloud[0].spec.replace(/\n/g, '<br><br>');
                            set_ppir_func(temp_text);
                            popup_insurance_regulations_div_open();
                        }
                    })
                    break;
                case "註解":
                    med_detail_info_div.addEventListener("click", () => {
                       if(element.med_cloud.length == 0) {
                        set_pppns_func("");
                        popup_physician_notes_div_open();
                       } else {
                           set_pppns_func(element.med_cloud[0].NOTE);
                        //    set_pppns_func(element.med_cloud[0].note);
                           popup_physician_notes_div_open();
                       }
                    })
                    break;
            
                default:
                    break;
            }

            med_more_info_container.appendChild(med_detail_info_div);
        });

        let med_inve_log_container = document.createElement("div");
        med_inve_log_container.classList.add("med_inve_log_container");

        let temp_arr = [];

        if(element.med_inve_log.length > 0) {
            temp_arr = element.med_inve_log.filter((e) => {
                return e.op_act == "調劑";
            })
        };

        if(temp_arr.length > 0) {
            let inve_log_card = document.createElement("div");
            inve_log_card.classList.add("inve_log_card");

            let inve_log_op_title = document.createElement("div");
            inve_log_op_title.classList.add("inve_log_op_title");
            inve_log_op_title.classList.add("inve_log_info");
            inve_log_op_title.innerHTML = '操作人';

            let inve_log_qty_title = document.createElement("div");
            inve_log_qty_title.classList.add("inve_log_qty_title");
            inve_log_qty_title.classList.add("inve_log_info");
            inve_log_qty_title.innerHTML = `數量`;

            let inve_log_unit_title = document.createElement("div");
            inve_log_unit_title.classList.add("inve_log_unit_title");
            inve_log_unit_title.classList.add("inve_log_info");
            inve_log_unit_title.innerHTML = `單位`;

            let inve_log_time_title = document.createElement("div");
            inve_log_time_title.classList.add("inve_log_time_title");
            inve_log_time_title.classList.add("inve_log_info");
            inve_log_time_title.innerHTML = `時間`;

            inve_log_card.appendChild(inve_log_op_title);
            inve_log_card.appendChild(inve_log_qty_title);
            // inve_log_card.appendChild(inve_log_unit_title);
            inve_log_card.appendChild(inve_log_time_title);

            med_inve_log_container.appendChild(inve_log_card);

            element.med_inve_log.forEach(item => {
                if(item.op_act == "調劑") {
                    let inve_log_card = document.createElement("div");
                    inve_log_card.classList.add("inve_log_card");
        
                    let inve_log_op = document.createElement("div");
                    inve_log_op.classList.add("inve_log_op");
                    inve_log_op.classList.add("inve_log_info");
                    inve_log_op.innerHTML = `
                        ${item.op_name}
                    `;
        
                    let inve_log_qty = document.createElement("div");
                    inve_log_qty.classList.add("inve_log_qty");
                    inve_log_qty.classList.add("inve_log_info");
                    inve_log_qty.innerHTML = `
                        ${+item.qty}
                    `;
        
                    let inve_log_unit = document.createElement("div");
                    inve_log_unit.classList.add("inve_log_unit");
                    inve_log_unit.classList.add("inve_log_info");
                    inve_log_unit.innerHTML = `
                        ${item.dunit}
                    `;
        
                    let inve_log_time = document.createElement("div");
                    inve_log_time.classList.add("inve_log_time");
                    inve_log_time.classList.add("inve_log_info");
                    inve_log_time.innerHTML = `
                        ${item.op_time}
                    `;
    
                    inve_log_card.appendChild(inve_log_op);
                    inve_log_card.appendChild(inve_log_qty);
                    // inve_log_card.appendChild(inve_log_unit);
                    inve_log_card.appendChild(inve_log_time);
        
                    med_inve_log_container.appendChild(inve_log_card);
                }
            });
        }
        
        med_card_container.appendChild(med_more_info_container);
        med_card_container.appendChild(med_inve_log_container);

        pbm_main_container.appendChild(med_card_container);
    });

    return pbm_main_container;
}
function set_pbm_footer_container() {
    let pbm_footer_container = document.createElement("div");
    pbm_footer_container.classList.add('pbm_footer_container');

    let pbmh_pre_btn = document.createElement("div");
    pbmh_pre_btn.classList.add("pbmh_pre_btn");
    pbmh_pre_btn.classList.add("btn");
    pbmh_pre_btn.innerHTML = "上一床";
    if(patient_bed_index == first_patient_bed_index) {
        pbmh_pre_btn.classList.add("pbmh_pre_btn_not_allow");
        pbmh_pre_btn.classList.add("display_none");
    } else {
        pbmh_pre_btn.addEventListener("click", () => {
            pre_bed_func();
        });
    }

    let pbmf_submit_btn = document.createElement("div");
    pbmf_submit_btn.classList.add("pbmf_submit_btn");
    pbmf_submit_btn.classList.add("btn");
    if(current_func == "allocate") {
        pbmf_submit_btn.innerHTML = "交付覆核";
    } else {
        pbmf_submit_btn.innerHTML = "覆核完成";
    }
    pbmf_submit_btn.addEventListener("click", async () => {
        let now = new Date();
    
        let year = now.getFullYear();
        let month = String(now.getMonth() + 1).padStart(2, '0'); // 月份從 0 開始，所以要加 1
        let day = String(now.getDate()).padStart(2, '0');
    
        let hours = String(now.getHours()).padStart(2, '0');
        let minutes = String(now.getMinutes()).padStart(2, '0');
        let seconds = String(now.getSeconds()).padStart(2, '0');
    
        let time_track = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        let loggedID = sessionStorage.getItem('login_json'); 
        loggedID = JSON.parse(loggedID);
        let post_data = {
            Data:[
                {
                    pharm: current_cart.phar,
                    nurnum: current_cart.hnursta,
                    op_id: loggedID.ID,
                    op_name: loggedID.Name,
                    op_time: time_track
                }
            ]
        }
        console.log(post_data);
        await add_med_inventory_time_track(post_data);
    });

    let pbmh_checked_submit_btn = document.createElement("div");
    pbmh_checked_submit_btn.classList.add("pbmh_checked_submit_btn");
    pbmh_checked_submit_btn.classList.add("btn");
    pbmh_checked_submit_btn.innerHTML = "完成";
    pbmh_checked_submit_btn.addEventListener("click", async () => {
        Set_main_div_enable(true);
        check_cart_dispense()
        let return_data = await set_post_data_to_check_dispense();
        if(return_data.Code == 200) {
            if(current_med_table == "" || current_med_table == "all") {
                if(current_func == "allocate") {
                    current_med_table = "all";
                    last_current_med_table = "all";
                    let med_table_content = document.querySelector(".med_table_content");
                    med_table_content.innerHTML = "全部";
                }

                post_data = {
                    Value: current_med_table,
                    ValueAry: [med_cart_beds_data[patient_bed_index].GUID]
                }
            } else {
                post_data = {
                    Value: current_med_table.name,
                    ValueAry: [med_cart_beds_data[patient_bed_index].GUID]
                }
            }
        
            current_p_bed_data = await get_patient_GUID(post_data);
            current_p_bed_data = current_p_bed_data.Data;
            current_p_bed_data.cpoe.sort((a, b) => {
                const aHasPubMedY = a.pub_med == "Y" ? 1 : 0;
                const bHasPubMedY = b.pub_med == "Y" ? 1 : 0;
                return aHasPubMedY - bHasPubMedY; // 讓 pub_med 為 "Y" 的排到最後
            });
            await allocate_display_init("");
            alert(`第${current_p_bed_data.bednum}床，完成調劑`);
            Set_main_div_enable(false);
        }
    })

    let pbmh_light_on_btn = document.createElement("div");
    pbmh_light_on_btn.classList.add("pbmh_light_on_btn");
    pbmh_light_on_btn.innerHTML = "亮燈";
    pbmh_light_on_btn.addEventListener("click", () => {
        if(current_med_table == "all" || current_med_table == "") {
            alert("未選擇調劑台，請選好調劑台或使用藥品總量功能");
            return;
        } else {
            light_switch_func();
        }
    });

    let pbmh_checked_trigger_label = document.createElement("div");
    pbmh_checked_trigger_label.classList.add("pbmh_checked_trigger_label");
    pbmh_checked_trigger_label.classList.add("btn");
    pbmh_checked_trigger_label.setAttribute("checked", false);
    pbmh_checked_trigger_label.innerHTML = "全選";
    pbmh_checked_trigger_label.addEventListener("click", (e) => {
        let tirgger = e.target.getAttribute("checked");
        let pbmh_checked_trigger_label = document.querySelectorAll(".pbmh_checked_trigger_label");
        let med_card_checkbox = document.querySelectorAll(".med_card_checkbox");
        if(tirgger == "false") {
            // 點選後全選
            med_card_checkbox.forEach(element => {
                let temp_boolean = element.classList.contains("med_card_checkbox_disabled");
                if(!element.disabled && !temp_boolean) {
                    element.checked = true;
                    pbmh_checked_trigger_label.forEach(item => {
                        item.innerHTML = "取消全選";
                        item.setAttribute("checked", true);
                    });
                    med_log_arr.push(element.id);

                    let index = med_nodis_log_arr.indexOf(element.id);  // 找到 "orange" 的索引位置

                    if (index !== -1) {
                        med_nodis_log_arr.splice(index, 1);  // 移除索引位置的那個元素
                    }
                }

                // 大瓶藥品api參數設定追加
                if(element.getAttribute("isBig") == "L") {
                    element.checked = false;
                }
            });

            console.log(med_log_arr);
            console.log(med_nodis_log_arr);
        } else {
            med_card_checkbox.forEach(element => {
                let temp_boolean = element.classList.contains("med_card_checkbox_disabled");
                if(!element.disabled && !temp_boolean) {
                    element.checked = false;
                    pbmh_checked_trigger_label.forEach(item => {
                        item.innerHTML = "全選";
                        item.setAttribute("checked", false);
                    });
                    let index = med_log_arr.indexOf(element.id);  // 找到 "orange" 的索引位置

                    if (index !== -1) {
                        med_log_arr.splice(index, 1);  // 移除索引位置的那個元素
                    }

                    med_nodis_log_arr.push(element.id);
                }
            });

            console.log(med_log_arr);
            console.log(med_nodis_log_arr);
        }
    });

    let pbmh_next_btn = document.createElement("div");
    pbmh_next_btn.classList.add("pbmh_next_btn");
    pbmh_next_btn.classList.add("btn");
    pbmh_next_btn.innerHTML = "下一床";
    if(patient_bed_index == final_patient_bed_index) {
        pbmh_next_btn.classList.add("pbmh_pre_btn_not_allow");
    } else {
        pbmh_next_btn.addEventListener("click", () => {
            next_bed_func();
        });
    }

    if(patient_bed_index == final_patient_bed_index) {
        pbmh_next_btn.classList.add("display_none");
    }

    if(patient_bed_index != final_patient_bed_index) {
        pbmh_checked_submit_btn.classList.add("display_none");
    } 

    pbm_footer_container.appendChild(pbmh_pre_btn);
    if(current_func == "allocate") {
        pbm_footer_container.appendChild(pbmh_light_on_btn);
        // pbm_footer_container.appendChild(pbmf_submit_btn);
    }
    pbm_footer_container.appendChild(pbmh_checked_trigger_label);
    pbm_footer_container.appendChild(pbmh_checked_submit_btn);
    pbm_footer_container.appendChild(pbmh_next_btn);

    return pbm_footer_container;
}
async function pre_bed_func() {
    Set_main_div_enable(true);
    // if(pre_p_bed_data.GUID == current_p_bed_data.GUID || pre_p_bed_data == "") {
    //     setTimeout(() => {
    //         console.log("上一床waitting");
    //         pre_bed_func();
    //     }, 2000);
    // } else {

        Set_main_div_enable(true);
        check_cart_dispense();
        await set_post_data_to_check_dispense();
        let temp_p_bed_index = patient_bed_index;
        let temp_none_bed_num_arr = [];
        let temp_arr_none_bed = [];
        do {
            temp_p_bed_index--;
            if(med_cart_beds_data[temp_p_bed_index]["bed_status"] != "已佔床") {
                temp_none_bed_num_arr.push(+temp_p_bed_index);
            }
        } while(med_cart_beds_data[temp_p_bed_index]["bed_status"] != "已佔床");
    
        last_patient_bed_index = patient_bed_index;
        patient_bed_index = temp_p_bed_index;

        temp_none_bed_num_arr.sort((a, b) => a - b);

        temp_none_bed_num_arr.forEach(element => {
            if(!temp_arr_none_bed.includes(`第${med_cart_beds_data[+element].bednum}床`)) {
                temp_arr_none_bed.push(`第${med_cart_beds_data[+element].bednum}床`); 
            }
        });

        if(temp_arr_none_bed != 0) {
            let temp_str = '';
            temp_arr_none_bed.forEach((element, index) => {
                if(index == temp_arr_none_bed.length - 1) {
                    temp_str += element;
                } else {
                    temp_str += element + "、";
                }
            });
            temp_str += `為空床，已為您轉到第 ${med_cart_beds_data[patient_bed_index].bednum} 床。`;
            alert(temp_str);
        }

        let temp_p_bed_data = current_p_bed_data;
        next_p_bed_data = temp_p_bed_data;
        // current_p_bed_data = pre_p_bed_data;
        allocate_display_init("on");
    // }
}
async function next_bed_func() {
    // if(next_p_bed_data.GUID == current_p_bed_data.GUID  || next_p_bed_data == "") {
    //     setTimeout(() => {
    //         console.log("下一床waitting");
    //         next_bed_func();
    //     }, 2000);
    // } else {

    Set_main_div_enable(true);
    check_cart_dispense();
    set_post_data_to_check_dispense();
    let temp_p_bed_index = patient_bed_index;
    let temp_arr_none_bed = [];
    do {
        temp_p_bed_index++;
        if(med_cart_beds_data[temp_p_bed_index]["bed_status"] != "已佔床") {
            if(!temp_arr_none_bed.includes(`第${med_cart_beds_data[temp_p_bed_index].bednum}床`)) {
                temp_arr_none_bed.push(`第${med_cart_beds_data[temp_p_bed_index].bednum}床`);
            }
        }
    } while(med_cart_beds_data[temp_p_bed_index]["bed_status"] != "已佔床");

    last_patient_bed_index = patient_bed_index;
    patient_bed_index = temp_p_bed_index;

    if(temp_arr_none_bed != 0) {
        let temp_str = '';
        temp_arr_none_bed.forEach((element, index) => {
            if(index == temp_arr_none_bed.length - 1) {
                temp_str += element;
            } else {
                temp_str += element + "、";
            }
        });
        temp_str += `為空床，已為您轉到第 ${med_cart_beds_data[patient_bed_index].bednum} 床。`;
        alert(temp_str);
    }

    let temp_p_bed_data = current_p_bed_data;
    pre_p_bed_data = temp_p_bed_data;
    // current_p_bed_data = next_p_bed_data;
    allocate_display_init("on");
}

async function set_post_data_to_check_dispense() {
    let med_card_checkbox = document.querySelectorAll(".med_card_checkbox");
    let bed_guid = current_p_bed_data.GUID;
    let loggedName = sessionStorage.getItem('login_json');
    loggedName = JSON.parse(loggedName);
    let med_arr = [];
    let return_data;
    let post_data = {
        Value: bed_guid,
        ValueAry: [],
        ServerName: "",
        ServerType: "",
        UserName: loggedName.Name,
    }

    let post_data2 = {
        Data: [
            {
                op_id: loggedName.ID,
                op_name: loggedName.Name
            }
        ],
        ValueAry: [],
        Value: "",
        ServerName: "",
        ServerType: ""
    }

    console.log("調劑", current_med_table);
    if(current_med_table == "all" || current_med_table == "") {

    } else {
        post_data.ServerName = current_med_table.name;
        post_data.ServerType = current_med_table.type;
        post_data2.ServerName = current_med_table.name;
        post_data2.ServerType = current_med_table.type;
    }

    med_card_checkbox.forEach(element => {
        if(element.checked) {
            med_arr.push(element.id);
        };
    });

    let post_data_check;
    if(current_med_table == "" || current_med_table == "all") {
        if(current_func == "allocate") {
            current_med_table = "all";
            last_current_med_table = "all";
            let med_table_content = document.querySelector(".med_table_content");
            med_table_content.innerHTML = "全部";

            post_data_check = {
                Value: current_med_table,
                ValueAry: [med_cart_beds_data[patient_bed_index].GUID]
            }
        } else if (current_func == "review") {
            post_data_check = {
                Value: "all",
                ValueAry: [med_cart_beds_data[patient_bed_index].GUID]
            }
        }

    } else {
        post_data_check = {
            Value: current_med_table.name,
            ValueAry: [med_cart_beds_data[patient_bed_index].GUID]
        }
    }

    console.log("first_load post_data_check", post_data_check);
    let temp_check_data = await get_patient_GUID(post_data_check);
    if(temp_check_data.Code != 200) {
        // alert("病床資料錯誤", temp_check_data.Result);
        // Set_main_div_enable(false);
        // return;
    }
    temp_check_data = temp_check_data.Data;
    let temp_check_arr = [];
    // let temp_check_object = {};
    let temp_none_check_arr = [];
    // 繼續調整中
    // 手動勾Ａ取消Ｂ，med_log_arr有Ａ、med_nodis_log_arr有Ｂ
    // temp_check_arr有新的打勾、temp_none_check_arr有新的不打勾
    if(Array.isArray(temp_check_data.cpoe) && temp_check_data.cpoe.length > 0) {
        if(current_func == "allocate") {
            temp_check_arr = temp_check_data.cpoe.filter((e) => {
                return e.dispens_status == "Y";
            });
            temp_none_check_arr = temp_check_data.cpoe.filter((e) => {
                return e.dispens_status != "Y";
            });
        } else if(current_func == "review") {
            temp_check_arr = temp_check_data.cpoe.filter((e) => {
                return e.check_status == "Y";
            });
            temp_none_check_arr = temp_check_data.cpoe.filter((e) => {
                return e.check_status != "Y";
            });
        }
    }

    temp_check_arr.forEach(element => {
        // temp_check_object[element.GUID] = element.GUID;
        if(!med_arr.includes(element.GUID)) {
            // med_log_arr.push(element.GUID);
            med_arr.push(element.GUID);
            console.log("======================");
            console.log("加入", element.GUID);
        }
    });

    temp_none_check_arr.forEach(element => {
        // temp_none_check_object[element] = element;
        let index = med_arr.indexOf(element.GUID); // 找到 "orange" 的索引位置
        if (index !== -1 && !med_log_arr.includes(element.GUID)) {
            med_arr.splice(index, 1); // 移除索引位置的那個元素
        }
    });

    console.log(med_arr);
    console.log(med_log_arr);
    console.log(med_nodis_log_arr);

    if(current_func == "allocate") {
        post_data2.Value = "調劑"
    } else if(current_func == "review") {
        post_data2.Value = "覆核"
    }

    if(med_arr.length > 0) {
        post_data.ValueAry[0] = med_arr.join(";");
    } else {
        post_data.ValueAry[0] = "";
    }
    console.log("調劑post_data", post_data);
    if(current_func == "allocate") {
        return_data = await api_med_cart_check_dispense(post_data);
    } else {
        return_data = await api_med_cart_double_check(post_data);
    }
    console.log(med_arr);
    
    if(med_log_arr.length > 0) {
        post_data2.ValueAry[0] = med_log_arr.join(";");
        console.log("調劑log post_data", post_data2);
        await add_med_inventory_log(post_data2);
        
        med_log_arr = [];
    }

    return return_data;
};

function open_med_detail_info() {
    let med_card_open_tigger = document.querySelectorAll(".med_card_open_tigger");
    med_card_open_tigger.forEach(item => {
        let med_card_container = item.parentElement.parentElement;
        let temp_h = item.parentElement.clientHeight;
        let temp_h2 = item.parentElement.parentElement.childNodes[1].clientHeight + item.parentElement.parentElement.childNodes[2].clientHeight;
        // console.log("容器", med_card_container);
        // console.log("初始顯示", item.parentElement);
        // console.log("卡片高度", temp_h);
        med_card_container.style.height = `${temp_h}px`;

        item.addEventListener("click", () => {
            let med_card_container_arr = document.querySelectorAll(".med_card_container");
            let med_card_open_tigger_arr = document.querySelectorAll(".med_card_open_tigger");

            if(item.getAttribute("trigger") == "true") {
                item.classList.remove("med_card_open");
                med_card_container.style.height = `${temp_h}px`;
                item.setAttribute("trigger", "false");
                return;
            }

            med_card_container_arr.forEach((element, index) => {
                let temp_h3 = element.childNodes[0].clientHeight;
                let item2 = med_card_open_tigger_arr[index];
                element.style.height = `${temp_h3}px`;
                item2.setAttribute("trigger", "false");
                if(item2.classList.contains("med_card_open")) {
                    item2.classList.remove("med_card_open");
                }
            });

            item.classList.add("med_card_open");
            med_card_container.style.height = `${temp_h + temp_h2}px`;
            item.setAttribute("trigger", "true");
    
        });
    });
}
async function light_switch_func() {
    console.log("current_p_bed_data");
    console.log(current_p_bed_data);
    console.log(current_med_table);
    console.log(color_select);

    if(current_med_table == "all" || current_med_table == "") {
        if(last_light_on_arr["ValueAry"].length > 0) {
            await light_off_func();
            return;
        } else {
            return;
        }
    } else {
        await light_off_func();
    }

    await delay_func(500);
    console.log("開始亮燈");
    let temp_arr = [];
    light_on_arr.ValueAry = []; 
    if(Array.isArray(current_p_bed_data["cpoe"]) && current_p_bed_data["cpoe"].length > 0) {
        current_p_bed_data["cpoe"].forEach(element => {
            if(element.dispens_name == "Y") {
                temp_arr.push(element.code);
            }
        });
    };

    light_on_arr.ValueAry.push(temp_arr.join(","));
    light_on_arr.ValueAry.push(color_select.rgb);
    light_on_arr.ValueAry.push("180"); // 秒數設定
    light_on_arr.ServerName = current_med_table.name;
    last_light_on_arr.ServerName = current_med_table.name;
    light_on_arr.ServerType = current_med_table.type;
    last_light_on_arr.ServerType = current_med_table.type;

    console.log("light_on_arr", light_on_arr);
    await light_on_by_code(light_on_arr);
    
    last_light_on_arr.ValueAry.push(temp_arr.join(","));
    last_light_on_arr.ValueAry.push("0,0,0");
    last_light_on_arr.ValueAry.push("1");
    console.log("last_light_on_arr", last_light_on_arr);
}
async function light_off_func() {
    if(last_light_on_arr["ValueAry"].length > 0) {
        console.log("這邊先關燈");
        await light_on_by_code(last_light_on_arr);
        last_light_on_arr = {
            ServerName: "",
            ServerType: "",
            ValueAry: []
        };
    } else {
        console.log("沒有燈要關");
    }
}

async function light_on_func(code, phar, type) {
    await light_off_func();
    await delay_func(500);
    console.log("開始亮燈+++++++++++++++++++++++++++++");
    light_on_arr.ValueAry = [];

    light_on_arr.ValueAry.push(code);
    light_on_arr.ValueAry.push(color_select.rgb);
    light_on_arr.ValueAry.push("180"); // 秒數設定

    light_on_arr.ServerName = phar;
    last_light_on_arr.ServerName = phar;
    
    light_on_arr.ServerType = type;
    last_light_on_arr.ServerType = type;

    console.log("light_on_arr", light_on_arr);
    // await delay_func(500);
    await light_on_by_code(light_on_arr);
    last_light_on_arr.ValueAry.push(code);
    last_light_on_arr.ValueAry.push("0,0,0");
    last_light_on_arr.ValueAry.push("1");
    console.log("last_light_on_arr", last_light_on_arr);
}

// 延遲函式(毫秒)
function delay_func(ms) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(`等 ${ms} 毫秒`);
            resolve(); // 讓 Promise 變成成功狀態
        }, ms);
    });
}

// 檢查出院退藥資料
async function check_cart_dispense() {
    let post_data = {
        ValueAry:[current_pharmacy.phar]
    };

    console.log("未調劑api check", post_data);
    let return_data = await get_cart_with_NOdispense(post_data);
    if(return_data.Code != 200) {
        console.log("未條藥品check api資料錯誤", return_data.Result);
    } else {
        let temp_arr = return_data.Data;
        if(Array.isArray(temp_arr)) {
            let ppmcl_h_current_cart_select_option = document.querySelectorAll(".ppmcl_h_current_cart_select option");
            let ppml_h_current_cart_select_option = document.querySelectorAll(".ppml_h_current_cart_select option");

            ppmcl_h_current_cart_select_option.forEach(element => {
                if(temp_arr.includes(element.value)) {
                    element.innerHTML = `${element.value} (未完成)`;
                } else {
                    element.innerHTML = element.value;
                }
            });
            ppml_h_current_cart_select_option.forEach(element => {
                if(temp_arr.includes(element.value)) {
                    element.innerHTML = `${element.value} (未完成)`;
                } else {
                    element.innerHTML = element.value;
                }
            });

            let ppmcl_btn = document.querySelector(".ppmcl_btn");
            let med_cart_sum_list_btn = document.querySelector(".med_cart_sum_list_btn");

            if(temp_arr.length == 0) {
                if(!ppmcl_btn.classList.contains("display_done")) {
                    ppmcl_btn.classList.add("display_done");
                }

                if(!med_cart_sum_list_btn.classList.contains("display_done")) {
                    med_cart_sum_list_btn.classList.add("display_done");
                }
            } else {
                if(ppmcl_btn.classList.contains("display_done")) {
                    ppmcl_btn.classList.remove("display_done");
                }

                if(med_cart_sum_list_btn.classList.contains("display_done")) {
                    med_cart_sum_list_btn.classList.remove("display_done");
                }
            }
        }
    }

    post_data = {
        Value: "調劑台",
        ValueAry:[current_pharmacy.phar]
    }
    
    console.log("出院api", post_data);
    return_data = await get_all_cart_discharge(post_data);
    if(return_data.Code != 200) {
        console.log("出院退藥資料錯誤", return_data.Result);
    } else {
        let ppdl_h_current_cart_select_option = document.querySelectorAll(".ppdl_h_current_cart_select option");
        let temp_arr = return_data.Data;
        console.log("出院藥車", temp_arr);
        if(Array.isArray(temp_arr)) {
            ppdl_h_current_cart_select_option.forEach(element => {
                if(temp_arr.includes(element.value)) {
                    element.innerHTML = `${element.value} (出院)`;
                } else {
                    element.innerHTML = element.value;
                }
            });

            let discharged_btn = document.querySelector(".discharged_btn");

            if(temp_arr.length == 0) {
                if(!discharged_btn.classList.contains("display_done")) {
                    discharged_btn.classList.add("display_done");
                }
            } else {
                if(discharged_btn.classList.contains("display_done")) {
                    discharged_btn.classList.remove("display_done");
                }
            }
        }
    }
}
