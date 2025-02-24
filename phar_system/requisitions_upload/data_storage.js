let base64_img = "";
let batch_id = "";
let batch_id_return = [];
let orgin_list_data = [];
let done_list_data = [];
let display_list_data = [];
let sort_list_data = [];
let search_mode = false;
let error_index = 0;
let process_timer;
const maxLength_for_file = 100;
let user_log;
let user_log_data;
const process_bar_status = {
  load: "Uploading...",
  anal: "Analysing..."
};
let IC_SN = "";

let test_data = [
  {
    Data: [
      {
        GUID: "41241234123fads",
        batch_id: "20241215142930",
        batch_num: "114241412",
        cht_name: "萬克適錠60公絲28顆/盒",
        expirydate: "2027.01.22",
        name: "ARC0XIA 60MG 28'S/BX",
        po_num: "1131024001-10",
        qty: "54000",
        check: "已確認",
      },
    ],
    Code: 200,
    Result: "查無對應單號資料",
  },
  {
    Data: [
      {
        GUID: "41241234123fads",
        batch_id: "20241215142930",
        batch_num: "114241412",
        cht_name: "萬克適錠60公絲28顆/盒",
        expirydate: "2027.01.22",
        name: "ARC0XIA 60MG 28'S/BX",
        po_num: "1131024001-11",
        qty: "54000",
        check: "",
      },
    ],
    Code: 200,
    Result: "查無對應單號資料",
  },
  {
    Data: [
      {
        GUID: "41241234123fads",
        batch_id: "20241215142930",
        batch_num: "114241412",
        cht_name: "萬克適錠60公絲28顆/盒",
        expirydate: "2027.01.22",
        name: "ARC0XIA 60MG 28'S/BX",
        po_num: "1131024001-12",
        qty: "540",
        check: "",
      },
    ],
    Code: -1,
    Result: "AI辨識失敗",
  },
  {
    Data: [
      {
        GUID: "41241234123fads",
        batch_id: "20241215142930",
        batch_num: "114241412",
        cht_name: "萬克適錠60公絲28顆/盒",
        expirydate: "2027.01.22",
        name: "ARC0XIA 60MG 28'S/BX",
        po_num: "1131024001-13",
        qty: "540",
        check: "",
      },
    ],
    Code: -2,
    Result: "查無對應單號資料",
  },
  {
    Data: [
      {
        GUID: "41241234123fads",
        batch_id: "20241215142930",
        batch_num: "114241412",
        cht_name: "萬克適錠60公絲28顆/盒",
        expirydate: "2027.01.22",
        name: "ARC0XIA 60MG 28'S/BX",
        po_num: "1131024001-18",
        qty: "540",
        check: "",
      },
    ],
    Code: 200,
    Result: "查無對應單號資料",
  },
  {
    Data: [
      {
        GUID: "41241234123fads",
        batch_id: "20241215142930",
        batch_num: "114241412",
        cht_name: "萬克適錠60公絲28顆/盒",
        expirydate: "2027.01.22",
        name: "ARC0XIA 60MG 28'S/BX",
        po_num: "1131024001-14",
        qty: "540",
        check: "",
      },
    ],
    Code: 200,
    Result: "查無對應單號資料",
  },
];