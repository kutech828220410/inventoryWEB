let base64_img = "";
let batch_id = "";
let batch_id_return = [];
let orgin_list_data = [];
let display_list_data = [];
let search_mode = false;

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
        qty: "540",
        submit: "Y",
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
        po_num: "1131024001-10",
        qty: "540",
        submit: "",
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
        po_num: "1131024001-10",
        qty: "540",
        submit: "",
      },
    ],
    Code: -1,
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
        po_num: "1131024001-10",
        qty: "540",
        submit: "",
      },
    ],
    Code: -2,
    Result: "查無對應單號資料",
  },
];