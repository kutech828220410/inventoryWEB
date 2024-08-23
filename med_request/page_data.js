let medicine_page = [];
const ServerName = "";
const ServerType = "網頁";
const TableName = "medicine_page";
let first_key_in = true;
let temp_search_condition = {
  date: "",
  req_unit: "all",
  type: "code",
  content: "",
};
let post_result_data = [];
let code_mode_data = [];
let unit_mode_data = [];
let fake_data = [
    {
      GUID: "ggagag-gew1235a",
      CODE: "STESL",
      NAME: "(採)Stesolid Rectal 10mg tube  ",
      CHT_NAME: "疏痙直腸用液劑",
      PAKAGE: "支",
      RES_UNIT:[
        {
          MASTER_GUID: "ggagag-gew1235a",
          GUID: "we2tga21-twga24a0-ta24ga",
          U_NAME: "A8調劑台",
          REQ_QTY: 200,
          STATE: "已核發" ,
          urgency: "normal",
          Sub_Content: []
        },
        {
          MASTER_GUID: "ggagag-gew1235a",
          GUID: "we2tga21-twga24a0-ta24ga",
          U_NAME: "G8調劑台",
          REQ_QTY: 100,
          STATE: "未核發",
          urgency: "urgent",
          Sub_Content: []
        },
  
      ]
    },
    {
      GUID: "ggagag-gew1235a",
      CODE: "STESL",
      NAME: "(採)Stesolid Rectal 10mg tube  ",
      CHT_NAME: "疏痙直腸用液劑",
      PAKAGE: "支",
      RES_UNIT:[
        {
          MASTER_GUID: "ggagag-gew1235a",
          GUID: "we2tga21-twga24a0-ta24ga",
          U_NAME: "A8調劑台",
          REQ_QTY: 200,
          STATE: "已核發" ,
          urgency: "urgent",
          Sub_Content: [
            {
              DATETIME: "2024-06-27 14:42:32",
              OP: "王小明",
              QTY: 120
            }
          ]
        },
        {
          MASTER_GUID: "ggagag-gew1235a",
          GUID: "we2tga21-twga24a0-ta24ga",
          U_NAME: "G8調劑台",
          REQ_QTY: 200,
          STATE: "未核發" ,
          urgency: "urgent",
          Sub_Content: [
            {
              DATETIME: "2024-06-27 16:42:32",
              OP: "王小明",
              QTY: 80
            }
          ]
        },
      ]
    }
];
let fake_table_data = [
  {
    "GUID": "",
    "UNIT_NAME": "單位名稱",
    "Sub_Content": [
      {
          "GUID": "asdfasdfa-13af113",
          "CODE": "藥碼",
          "NAME": "藥名",
          "CHT_NAME": "中文名",
          "PAKAGE": "藥品單位",
          "PAKAGE_NUM": "包裝數量",
          "UNIT_NAME": "單位名稱",
          "REQ_QTY": "請領量",
          "REAL_QTY": "實領量",
          "STATE": false,
          "URGENCY": "急件判斷",
          "QTY_CHECKED": "實發量確認",
      },
      {
        "GUID": "asdfasdfa-13af113",
        "CODE": "藥碼",
        "NAME": "藥名",
        "CHT_NAME": "中文名",
        "PAKAGE": "藥品單位",
        "PAKAGE_NUM": "包裝數量",
        "UNIT_NAME": "單位名稱",
        "REQ_QTY": "請領量",
        "REAL_QTY": "實領量",
        "STATE": true,
        "URGENCY": "急件判斷",
        "QTY_CHECKED": "實發量確認",
      },
      {
        "GUID": "asdfasdfa-13af113",
        "CODE": "藥碼",
        "NAME": "藥名",
        "CHT_NAME": "中文名",
        "PAKAGE": "藥品單位",
        "PAKAGE_NUM": "包裝數量",
        "UNIT_NAME": "單位名稱",
        "REQ_QTY": "請領量",
        "REAL_QTY": "實領量",
        "STATE": "核發狀態",
        "URGENCY": "急件判斷",
        "QTY_CHECKED": "實發量確認",
      },
    ],
  },
];

let med_list_guid;
let temp_actual_qty;
