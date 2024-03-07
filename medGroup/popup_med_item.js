var popup_med_item_div;

function get_popup_med_item()
{
    popup_med_item_div = new Basic_popup_Div('popup_med_item_div','popup_med_item_div','','');
    popup_med_item_div._popup_div.style.border = '10px solid white';
    const title_text = get_title_med_item();
    const serch_box_div = get_serch_box_med_item();
    const underline = get_underline_med_item();

    popup_med_item_div.AddControl(title_text);
    popup_med_item_div.AddControl(serch_box_div);
    popup_med_item_div.AddControl(underline);

    let popup_med_drugkind = document.querySelector("#popup_med_drugkind");
    popup_med_drugkind.addEventListener("change", (e) => {
        let self_med_item_set = document.querySelector("#self_med_item_set");
        let popup_date_manager = document.querySelector("#popup_date_manager");
        let popup_double_inventory = document.querySelector("#popup_double_inventory");
        let popup_blind_inventory = document.querySelector("#popup_blind_inventory");
        let popup_balance_report = document.querySelector("#popup_balance_report");
        let popup_double_review = document.querySelector("#popup_double_review");

        let popup_date_manager_div = document.querySelector("#popup_date_manager_div");
        let popup_double_inventory_div = document.querySelector("#popup_double_inventory_div");
        let popup_blind_inventory_div = document.querySelector("#popup_blind_inventory_div");
        let popup_balance_report_div = document.querySelector("#popup_balance_report_div");
        let popup_double_review_div = document.querySelector("#popup_double_review_div");

        if (e.target.value != "N") {
            self_med_item_set.disabled = true;
            self_med_item_set.checked = false;

            popup_date_manager.disabled = true;
            popup_double_inventory.disabled = true;
            popup_blind_inventory.disabled = true;
            popup_balance_report.disabled = true;
            popup_double_review.disabled = true;

            popup_date_manager_div.style.display = "none";
            popup_double_inventory_div.style.display = "none";
            popup_blind_inventory_div.style.display = "none";
            popup_balance_report_div.style.display = "none";
            popup_double_review_div.style.display = "none";
            
        } else {
            self_med_item_set.disabled = false;
        }
    });

    // 設定自定義checked條件
    let self_med_item_set = document.querySelector("#self_med_item_set");
    self_med_item_set.addEventListener("change", (e) => {
        let popup_med_drugkind = document.querySelector("#popup_med_drugkind");

        let popup_date_manager = document.querySelector("#popup_date_manager");
        let popup_double_inventory = document.querySelector("#popup_double_inventory");
        let popup_blind_inventory = document.querySelector("#popup_blind_inventory");
        let popup_balance_report = document.querySelector("#popup_balance_report");
        let popup_double_review = document.querySelector("#popup_double_review");

        let popup_date_manager_div = document.querySelector("#popup_date_manager_div");
        let popup_double_inventory_div = document.querySelector("#popup_double_inventory_div");
        let popup_blind_inventory_div = document.querySelector("#popup_blind_inventory_div");
        let popup_balance_report_div = document.querySelector("#popup_balance_report_div");
        let popup_double_review_div = document.querySelector("#popup_double_review_div");

        if(popup_med_drugkind.value != "N") {
            alert(`非'N'類管制藥品，請去管制藥品設定！`);
            e.target.checked = false;
            return;
        } else {
            if (e.target.checked == true) {
                popup_date_manager.disabled = false;
                popup_double_inventory.disabled = false;
                popup_blind_inventory.disabled = false;
                popup_balance_report.disabled = false;
                popup_double_review.disabled = false;

                popup_date_manager_div.style.display = "block";
                popup_double_inventory_div.style.display = "block";
                popup_blind_inventory_div.style.display = "block";
                popup_balance_report_div.style.display = "block";
                popup_double_review_div.style.display = "block";

            } else {
                popup_date_manager.disabled = true;
                popup_double_inventory.disabled = true;
                popup_blind_inventory.disabled = true;
                popup_balance_report.disabled = true;
                popup_double_review.disabled = true;

                popup_date_manager_div.style.display = "none";
                popup_double_inventory_div.style.display = "none";
                popup_blind_inventory_div.style.display = "none";
                popup_balance_report_div.style.display = "none";
                popup_double_review_div.style.display = "none";
            }
        }
    });

    return popup_med_item_div;
}

function get_title_med_item()
{
    const title_text = document.createElement('div');
    My_Div.Init(title_text, 'title_med_item_div','title_med_item_div', '100%', '40px', 'gray');
    My_Div.Set_Text(title_text ,"藥檔新增/修改" , TextAlignEnum.CENTER , "24px", true,"微軟正黑體","white");
    title_text.style.borderRadius = "5px";
    title_text.style.marginBottom = "10px";
    return title_text;
}

function get_serch_box_med_item()
{
    const serch_box_med_item_div = document.createElement('div');
    My_Div.Init(serch_box_med_item_div,'serch_box_med_item_div','serch_box_med_item_div', '100%','','');
    My_Div.Set_Block(serch_box_med_item_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.CENTER);
    serch_box_med_item_div.style.alignItems = "center";
    serch_box_med_item_div.style.flexWrap  = "wrap";

    serch_box_med_item_div.innerHTML = `
        <div class="popup_med_info_container">
            <div>
                <label for="popup_med_code">藥碼</label>
                <input type="text" name="popup_med_code" id="popup_med_code" />
                <label for="popup_med_drugkind">管制級別</label>
                <select name="popup_med_drugkind" id="popup_med_drugkind">
                    <option value="N">N</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                </select>
            </div>
            <div>
                <label for="popup_med_name">藥名</label>
                <input type="text" name="popup_med_name" id="popup_med_name" />
            </div>
            <div>
                <label for="popup_med_dianame">學名</label>
                <input type="text" name="popup_med_dianame" id="popup_med_dianame" />
            </div>
            <div>
                <label for="popup_med_ctname">中文名</label>
                <input type="text" name="popup_med_ctname" id="popup_med_ctname" />
            </div>
            <div>
                <label for="popup_med_pakage">包裝單位</label>
                <input type="text" name="popup_med_pakage" id="popup_med_pakage" />
            </div>
            <div>
                <label for="popup_med_scode">健保碼</label>
                <input type="text" name="popup_med_scode" id="popup_med_scode" />
            </div>
            <div>
                <label for="popup_med_factory">廠牌</label>
                <input type="text" name="popup_med_factory" id="popup_med_factory" />
            </div>
            <div>
                <label for="popup_med_lincense">許可證號</label>
                <input
                    type="text"
                    name="popup_med_lincense"
                    id="popup_med_lincense"
                />
            </div>
        </div>
        <div class="popup_med_checkbox_contaienr">
            <div class="popup_med_kind_checked_container">
                <div class="popup_med_type_set_container">
                    <input
                    type="checkbox"
                    name="self_med_item_set"
                    id="self_med_item_set"
                    />
                    <label for="self_med_item_set"> 自定義設定 </label>
                </div>
                <div class="popup_med_item_control_div" id="popup_date_manager_div">
                    <input
                    type="checkbox"
                    name="popup_date_manager"
                    id="popup_date_manager"
                    disabled
                    />
                    <label class="kind_set_style" for="popup_date_manager"
                    >效期管理</label
                    >
                </div>
                <div class="popup_med_item_control_div" id="popup_double_inventory_div">
                    <input
                    type="checkbox"
                    name="popup_double_inventory"
                    id="popup_double_inventory"
                    disabled
                    />
                    <label class="kind_set_style" for="popup_double_inventory"
                    >復盤</label
                    >
                </div>
                <div class="popup_med_item_control_div" id="popup_blind_inventory_div">
                    <input
                    type="checkbox"
                    name="popup_blind_inventory"
                    id="popup_blind_inventory"
                    disabled
                    />
                    <label class="kind_set_style" for="popup_blind_inventory"
                    >盲盤</label
                    >
                </div>
                <div class="popup_med_item_control_div" id="popup_balance_report_div">
                    <input
                    type="checkbox"
                    name="popup_balance_report"
                    id="popup_balance_report"
                    disabled
                    />
                    <label class="kind_set_style" for="popup_balance_report"
                    >結存報表</label
                    >
                </div>
                <div class="popup_med_item_control_div" id="popup_double_review_div">
                    <input
                    type="checkbox"
                    name="popup_double_review"
                    id="popup_double_review"
                    disabled
                    />
                    <label class="kind_set_style" for="popup_double_review"
                    >雙人覆核</label
                    >
                </div>
            </div>
            <div class="popup_med_special_mark_container">
                <div class="popup_med_item_control_div">
                    <input
                    type="checkbox"
                    name="popup_warning_med"
                    id="popup_warning_med"
                    />
                    <label class="kind_set_style" for="popup_warning_med"
                    >警訊藥品</label
                    >
                </div>
                <div class="popup_med_item_control_div">
                    <input
                    type="checkbox"
                    name="popup_high_price_med"
                    id="popup_high_price_med"
                    />
                    <label class="kind_set_style" for="popup_high_price_med"
                    >高價藥品</label
                    >
                </div>
                <div class="popup_med_item_control_div">
                    <input type="checkbox" name="popup_bio_med" id="popup_bio_med" />
                    <label class="kind_set_style" for="popup_bio_med">生物藥劑</label>
                </div>
                <div class="popup_med_item_control_div">
                    <input
                    type="checkbox"
                    name="popup_narcosis_med"
                    id="popup_narcosis_med"
                    />
                    <label class="kind_set_style" for="popup_narcosis_med"
                    >麻醉藥品</label
                    >
                </div>
            </div>
        </div>
    `;

    return serch_box_med_item_div;
}

function get_underline_med_item()
{
    const underline_div = document.createElement('div');
    My_Div.Init(underline_div, 'underline_div_serch_div_popup_serch','underline_div_serch_div_popup_serch', '100%','','');
    underline_div.style.alignItems = "center";

    let underline_new_modify_med_btn = document.createElement("div");
    underline_new_modify_med_btn.classList.add("underline_new_modify_med_btn");
    underline_new_modify_med_btn.innerHTML = "新增/修改";

    let underline_close_med_item_popup_btn = document.createElement("div");
    underline_close_med_item_popup_btn.classList.add('underline_close_med_item_popup_btn');
    underline_close_med_item_popup_btn.innerHTML = "關閉";

    underline_close_med_item_popup_btn.addEventListener("click", () => {
        hide_med_item();
    });

    underline_div.appendChild(underline_new_modify_med_btn);
    underline_div.appendChild(underline_close_med_item_popup_btn);

    return underline_div;
}

async function show_med_item(CODE)
{
    showLoadingPopup();

    if(CODE != '') {
        let title_med_item_div = document.querySelector(".title_med_item_div");
        title_med_item_div.innerHTML = "藥檔修改";

        let underline_new_modify_med_btn = document.querySelector(".underline_new_modify_med_btn");
        underline_new_modify_med_btn.innerHTML = "修改";
        let med_data = await get_medicine_cloud();
        let temp_arr = med_data["Data"].filter(e => e["CODE"] == CODE);
        get_popup_med_item_info(temp_arr[0]);
    }

    popup_med_item_div.Set_Visible(true);
    hideLoadingPopup();
}

function hide_med_item()
{
    popup_med_item_info_init();
    popup_med_item_div.Set_Visible(false);
}

function popup_med_item_info_init() {
    let popup_med_code = document.querySelector("#popup_med_code");
    let popup_med_name = document.querySelector("#popup_med_name");
    let popup_med_dianame = document.querySelector("#popup_med_dianame");
    let popup_med_ctname = document.querySelector("#popup_med_ctname");
    let popup_med_pakage = document.querySelector("#popup_med_pakage");
    let popup_med_scode = document.querySelector("#popup_med_scode");
    let popup_med_factory = document.querySelector("#popup_med_factory");
    let popup_med_lincense = document.querySelector("#popup_med_lincense");
    let popup_med_drugkind = document.querySelector("#popup_med_drugkind");

    let self_med_item_set = document.querySelector("#self_med_item_set");
    let popup_date_manager = document.querySelector("#popup_date_manager");
    let popup_double_inventory = document.querySelector("#popup_double_inventory");
    let popup_blind_inventory = document.querySelector("#popup_blind_inventory");
    let popup_balance_report = document.querySelector("#popup_balance_report");
    let popup_double_review = document.querySelector("#popup_double_review");

    let popup_warning_med = document.querySelector("#popup_warning_med");
    let popup_high_price_med = document.querySelector("#popup_high_price_med");
    let popup_bio_med = document.querySelector("#popup_bio_med");
    let popup_narcosis_med = document.querySelector("#popup_narcosis_med");

    let popup_date_manager_div = document.querySelector("#popup_date_manager_div");
    let popup_double_inventory_div = document.querySelector("#popup_double_inventory_div");
    let popup_blind_inventory_div = document.querySelector("#popup_blind_inventory_div");
    let popup_balance_report_div = document.querySelector("#popup_balance_report_div");
    let popup_double_review_div = document.querySelector("#popup_double_review_div");

    popup_med_code.value = "";
    popup_med_code.disabled = false;
    popup_med_name.value = "";
    popup_med_dianame.value = "";
    popup_med_ctname.value = "";
    popup_med_pakage.value = "";
    popup_med_scode.value = "";
    popup_med_factory.value = "";
    popup_med_lincense.value = "";
    popup_med_drugkind.value = "N";

    self_med_item_set.checked = false;
    popup_date_manager.checked = false;
    popup_date_manager.disabled = true;
    popup_double_inventory.checked = false;
    popup_double_inventory.disabled = true;
    popup_blind_inventory.checked = false;
    popup_blind_inventory.disabled = true;
    popup_balance_report.checked = false;
    popup_balance_report.disabled = true;
    popup_double_review.checked = false;
    popup_double_review.disabled = true;

    popup_date_manager_div.style.display = "none";
    popup_double_inventory_div.style.display = "none";
    popup_blind_inventory_div.style.display = "none";
    popup_balance_report_div.style.display = "none";
    popup_double_review_div.style.display = "none";

    popup_warning_med.checked = false;
    popup_high_price_med.checked = false;
    popup_bio_med.checked = false;
    popup_narcosis_med.checked = false;
}

function get_popup_med_item_info(object) {
    let popup_med_code = document.querySelector("#popup_med_code");
    let popup_med_name = document.querySelector("#popup_med_name");
    let popup_med_dianame = document.querySelector("#popup_med_dianame");
    let popup_med_ctname = document.querySelector("#popup_med_ctname");
    let popup_med_pakage = document.querySelector("#popup_med_pakage");
    let popup_med_scode = document.querySelector("#popup_med_scode");
    let popup_med_factory = document.querySelector("#popup_med_factory");
    let popup_med_lincense = document.querySelector("#popup_med_lincense");
    let popup_med_drugkind = document.querySelector("#popup_med_drugkind");

    let self_med_item_set = document.querySelector("#self_med_item_set");
    let popup_date_manager = document.querySelector("#popup_date_manager");
    let popup_double_inventory = document.querySelector("#popup_double_inventory");
    let popup_blind_inventory = document.querySelector("#popup_blind_inventory");
    let popup_balance_report = document.querySelector("#popup_balance_report");
    let popup_double_review = document.querySelector("#popup_double_review");

    let popup_warning_med = document.querySelector("#popup_warning_med");
    let popup_high_price_med = document.querySelector("#popup_high_price_med");
    let popup_bio_med = document.querySelector("#popup_bio_med");
    let popup_narcosis_med = document.querySelector("#popup_narcosis_med");

    let popup_date_manager_div = document.querySelector("#popup_date_manager_div");
    let popup_double_inventory_div = document.querySelector("#popup_double_inventory_div");
    let popup_blind_inventory_div = document.querySelector("#popup_blind_inventory_div");
    let popup_balance_report_div = document.querySelector("#popup_balance_report_div");
    let popup_double_review_div = document.querySelector("#popup_double_review_div");

    popup_med_code.value = object.CODE;
    popup_med_code.disabled = true;
    popup_med_name.value = object.NAME;
    popup_med_dianame.value = object.DIANAME;
    popup_med_ctname.value = object.CHT_NAME;
    popup_med_pakage.value = object.PAKAGE;
    popup_med_scode.value = object.HI_CODE;
    popup_med_factory.value = object.BRD;
    popup_med_lincense.value = object.LICENSE;
    if(object.DRUGKIND == "") {
        popup_med_drugkind.value = "N";
    } else {
        popup_med_drugkind.value = object.DRUGKIND;
    }

    if(object.DRUGKIND == "N" || object.DRUGKIND == "") {
        self_med_item_set.checked = false;
        popup_date_manager.checked = false;
        popup_date_manager.disabled = true;
        popup_double_inventory.checked = false;
        popup_double_inventory.disabled = true;
        popup_blind_inventory.checked = false;
        popup_blind_inventory.disabled = true;
        popup_balance_report.checked = false;
        popup_balance_report.disabled = true;
        popup_double_review.checked = false;
        popup_double_review.disabled = true;

        popup_date_manager_div.style.display = "none";
        popup_double_inventory_div.style.display = "none";
        popup_blind_inventory_div.style.display = "none";
        popup_balance_report_div.style.display = "none";
        popup_double_review_div.style.display = "none";
    } else {
        self_med_item_set.checked = false;
        self_med_item_set.disabled = true;
        popup_date_manager.checked = false;
        popup_date_manager.disabled = true;
        popup_double_inventory.checked = false;
        popup_double_inventory.disabled = true;
        popup_blind_inventory.checked = false;
        popup_blind_inventory.disabled = true;
        popup_balance_report.checked = false;
        popup_balance_report.disabled = true;
        popup_double_review.checked = false;
        popup_double_review.disabled = true;

        popup_date_manager_div.style.display = "block";
        popup_double_inventory_div.style.display = "block";
        popup_blind_inventory_div.style.display = "block";
        popup_balance_report_div.style.display = "block";
        popup_double_review_div.style.display = "block";
    }

    popup_warning_med.checked = object.IS_WARRING;
    popup_high_price_med.checked = object.IS_H_COST;
    popup_bio_med.checked = object.IS_BIO;
    popup_narcosis_med.checked = false;
}