let popup_unit_content_div;

function get_popup_unit_content()
{
    popup_unit_content_div = new Basic_popup_Div('popup_unit_content_div','popup_unit_content_div','','');
    popup_unit_content_div._popup_div.style.border = '10px solid white';

    let header = get_pp_unit_content_header();
    let main = get_pp_unit_content_main();
    let footer = get_pp_unit_content_footer();

    popup_unit_content_div.AddControl(header);
    popup_unit_content_div.AddControl(main);
    popup_unit_content_div.AddControl(footer);

    return popup_unit_content_div;
};
function get_pp_unit_content_header() {
    let ppuc_header_container = document.createElement("div");
    ppuc_header_container.classList.add("ppuc_header_container");

    let ppuc_state_container = document.createElement("div");
    ppuc_state_container.classList.add("ppuc_state_container");

    let ppuc_h_title = document.createElement("div");
    ppuc_h_title.classList.add("ppuc_h_title");
    ppuc_h_title.innerText = "請領單位名稱";

    let ppuc_h_close_btn = document.createElement("img");
    ppuc_h_close_btn.classList.add("ppuc_h_close_btn");
    ppuc_h_close_btn.src = "../image/close.png";
    ppuc_h_close_btn.addEventListener("click", () => {
        popup_unit_content_div_close();
    });

    ppuc_header_container.appendChild(ppuc_state_container);
    ppuc_header_container.appendChild(ppuc_h_title);
    ppuc_header_container.appendChild(ppuc_h_close_btn);

    return ppuc_header_container;
}
function get_pp_unit_content_main() {
    let ppuc_main_container = document.createElement("div");
    ppuc_main_container.classList.add("ppuc_main_container");

    let ppuc_med_info_container = set_ppuc_med_info_container();
    let ppuc_med_sub_container = document.createElement("div");
    ppuc_med_sub_container.classList.add("ppuc_med_sub_container");

    ppuc_main_container.appendChild(ppuc_med_info_container);
    ppuc_main_container.appendChild(ppuc_med_sub_container);

    return ppuc_main_container;
}
function get_pp_unit_content_footer() {
    let ppuc_footer_container = document.createElement("div");
    ppuc_footer_container.classList.add("ppuc_footer_container");

    let calculate_input_div = set_calculate_input_div();
    let calculate_div = set_calculate_div();

    ppuc_footer_container.appendChild(calculate_input_div);
    ppuc_footer_container.appendChild(calculate_div);

    return ppuc_footer_container;
}
function popup_unit_content_div_close() {
    popup_unit_content_div.Set_Visible(false);
}
function popup_unit_content_div_open() {
    popup_unit_content_div.Set_Visible(true);
}

function set_unit_state_btn(str) {
    let ppuc_state_container = document.querySelector(".ppuc_state_container");
    ppuc_state_container.innerHTML = "";

    if(str == "true") {
        let ppuc_h_unit_state = document.createElement("div");
        ppuc_h_unit_state.classList.add("btn");
        ppuc_h_unit_state.classList.add("ppuc_h_unit_state_btn");
        ppuc_h_unit_state.innerHTML = "核發";

        ppuc_state_container.appendChild(ppuc_h_unit_state);
    } else {       
        let ppuc_h_unit_state = document.createElement("div");
        ppuc_h_unit_state.classList.add("ppuc_h_unit_state");
        ppuc_h_unit_state.innerHTML = "已核發";

        ppuc_state_container.appendChild(ppuc_h_unit_state);
    }
}

function set_ppuc_med_info_container() {
    let ppuc_med_info_container = document.createElement("div");
    ppuc_med_info_container.classList.add("ppuc_med_info_container");

    let ppuc_mi_detail_container = document.createElement("div");
    ppuc_mi_detail_container.classList.add("ppuc_mi_detail_container");

    for (let i = 0; i < 6; i++) {
        let ppucmi_detail_div = document.createElement("div");
        ppucmi_detail_div.classList.add("ppucmi_detail_div");

        let ppucmi_detail_title = document.createElement("div");
        ppucmi_detail_title.classList.add("ppucmi_detail_content");

        let ppucmi_detail_content = document.createElement("div");
        ppucmi_detail_content.classList.add("ppucmi_detail_content");

        switch (i) {
            case 0:
                ppucmi_detail_title.innerHTML = "藥碼：";
                ppucmi_detail_content.innerHTML = "10103";
                ppucmi_detail_content.id = "ppuc_code";
                break;
            case 1:
                ppucmi_detail_title.innerHTML = "單位：";
                ppucmi_detail_content.innerHTML = "VAL";
                ppucmi_detail_content.id = "ppuc_unit";
                break;
            case 2:
                ppucmi_detail_title.innerHTML = "實發量：";
                ppucmi_detail_content.innerHTML = "500";
                ppucmi_detail_content.id = "ppuc_sys_qty";
                break;
            case 3:
                ppucmi_detail_title.innerHTML = "料號：";
                ppucmi_detail_content.innerHTML = "10103";
                ppucmi_detail_content.id = "ppuc_skdiacode";

                break;
            case 4:
                ppucmi_detail_title.innerHTML = "包裝量：";
                ppucmi_detail_content.innerHTML = "200";
                ppucmi_detail_content.id = "ppuc_pak_num";
                break;
            case 5:
                ppucmi_detail_title.innerHTML = "請領量：";
                ppucmi_detail_content.innerHTML = "200";
                ppucmi_detail_content.id = "ppuc_req_qty";
                break;
        
            default:
                break;
        }

        ppucmi_detail_div.appendChild(ppucmi_detail_title);
        ppucmi_detail_div.appendChild(ppucmi_detail_content);

        ppuc_mi_detail_container.appendChild(ppucmi_detail_div);
    }
    ppuc_med_info_container.appendChild(ppuc_mi_detail_container);

    for (let x = 0; x < 2; x++) {
        let ppuc_mi_name_container = document.createElement("div");
        ppuc_mi_name_container.classList.add("ppuc_mi_name_container");

        let ppucmi_name_title = document.createElement("div");
        ppucmi_name_title.classList.add("ppucmi_name_title");

        let ppucmi_name_content = document.createElement("div");
        ppucmi_name_content.classList.add("ppucmi_name_content");

        switch (x) {
            case 0:
                ppucmi_name_title.innerHTML = "(英)：";
                ppucmi_name_content.innerHTML = "(採)Stesolid Rectal 10mg tube";
                ppucmi_name_content.id = "ppucmi_name";
                break;
            case 1:
                ppucmi_name_title.innerHTML = "(中)：";
                ppucmi_name_content.innerHTML = "疏痙直腸用液劑";
                ppucmi_name_content.id = "ppucmi_cht_name";
                break;
        
            default:
                break;
        }
        ppuc_mi_name_container.appendChild(ppucmi_name_title);
        ppuc_mi_name_container.appendChild(ppucmi_name_content);

        ppuc_med_info_container.appendChild(ppuc_mi_name_container);
    }

    return ppuc_med_info_container;
}

function set_ppuc_med_sub_container(arr) {
    console.log(arr);
    let ppuc_med_sub_container = document.querySelector(".ppuc_med_sub_container");
    ppuc_med_sub_container.innerHTML = "";

    if(arr.length == 0) return;

    let data = arr[0];

    let ppuc_sub_content_div = document.createElement("div");
    ppuc_sub_content_div.classList.add("ppuc_sub_content_div");

    let ppuc_sc_text_container = document.createElement("div");
    ppuc_sc_text_container.classList.add("ppuc_sc_text_container");

    let ppuc_sct_op_date = document.createElement("div");
    ppuc_sct_op_date.classList.add("ppuc_sct_op_date");
    ppuc_sct_op_date.innerHTML = data.DATETIME;

    let ppuc_sct_op_name = document.createElement("div");
    ppuc_sct_op_name.classList.add("ppuc_sct_op_name");
    ppuc_sct_op_name.innerHTML = `操作者：${data.OP}`;

    ppuc_sc_text_container.appendChild(ppuc_sct_op_date);
    ppuc_sc_text_container.appendChild(ppuc_sct_op_name);

    let ppuc_sc_input = document.createElement("div");
    ppuc_sc_input.classList.add("ppuc_sc_input");
    ppuc_sc_input.name = "ppuc_sc_input";
    ppuc_sc_input.id = "ppuc_sc_input";
    ppuc_sc_input.innerHTML = `${data.QTY}`

    ppuc_sub_content_div.appendChild(ppuc_sc_text_container);
    ppuc_sub_content_div.appendChild(ppuc_sc_input);

    ppuc_med_sub_container.appendChild(ppuc_sub_content_div);
}
function set_calculate_input_div() {
    let calculate_input_div = document.createElement("div");
    calculate_input_div.classList.add("pp_calculate_input_div");

    let pp_calculate_input = document.createElement("input");
    pp_calculate_input.classList.add("pp_calculate_input");
    pp_calculate_input.readOnly = false;
    pp_calculate_input.type = "text";
    pp_calculate_input.inputMode = "numeric";
    pp_calculate_input.style.backgroundColor = "";
    pp_calculate_input.style.borderRadius = "5px";
    pp_calculate_input.style.marginRight = "10px";
    pp_calculate_input.style.textAlign = "center";
    pp_calculate_input.style.fontSize = "20px";
    pp_calculate_input.style.fontWeight = "600";
    pp_calculate_input.placeholder = "請輸入算式";
    pp_calculate_input.style.flexGrow = 1;
    pp_calculate_input.readOnly = true;

    let pp_calculate_confirm_btn = document.createElement("div");
    pp_calculate_confirm_btn.classList.add("pp_calculate_confirm_btn");
    pp_calculate_confirm_btn.classList.add("btn");
    pp_calculate_confirm_btn.innerHTML = "送出";

    calculate_input_div.appendChild(pp_calculate_input);
    calculate_input_div.appendChild(pp_calculate_confirm_btn);

    return calculate_input_div;
}
function set_calculate_div() {
    const calculate_div = document.createElement('div');
    My_Div.Init(calculate_div, 'calculate_div','calculate_div', '100%', '180px', '');
    My_Div.Set_Block(calculate_div, DisplayEnum.FLEX, FlexDirectionEnum.COLUMN, JustifyContentEnum.CENTER);

    const calculate_div_row1 = document.createElement('div');
    My_Div.Init(calculate_div_row1, 'calculate_div_row1','calculate_div_row1', '100%', '25%', '');
    My_Div.Set_Block(calculate_div_row1, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);
    const calculate_7_btn = document.createElement('button');
    My_Div.Init(calculate_7_btn, `calculate_btn`,`calculate_7_btn`, '25%', '100%',);
    My_Div.Set_Text(calculate_7_btn ,`7` , TextAlignEnum.CENTER , "20px", true,"微軟正黑體","black");
    calculate_7_btn.addEventListener('click', function()
    {
        calculate_input("7");
    });
    calculate_div_row1.appendChild(calculate_7_btn);
    const calculate_8_btn = document.createElement('button');
    My_Div.Init(calculate_8_btn, `calculate_btn`,`calculate_8_btn`, '25%', '100%',);
    My_Div.Set_Text(calculate_8_btn ,`8` , TextAlignEnum.CENTER , "20px", true,"微軟正黑體","black");
    calculate_8_btn.addEventListener('click', function()
    {
        calculate_input("8");
    });
    calculate_div_row1.appendChild(calculate_8_btn);
    const calculate_9_btn = document.createElement('button');
    My_Div.Init(calculate_9_btn, `calculate_btn`,`calculate_9_btn`, '25%', '100%',);
    My_Div.Set_Text(calculate_9_btn ,`9` , TextAlignEnum.CENTER , "20px", true,"微軟正黑體","black");
    calculate_9_btn.addEventListener('click', function()
    {
        calculate_input("9");
    });
    calculate_div_row1.appendChild(calculate_9_btn);
    const calculate_add_btn = document.createElement('button');
    My_Div.Init(calculate_add_btn, `calculate_btn`,`calculate_add_btn`, '25%', '100%',);
    My_Div.Set_Text(calculate_add_btn ,`+` , TextAlignEnum.CENTER , "20px", true,"微軟正黑體","black");
    calculate_add_btn.addEventListener('click', function()
    {
        calculate_input("+");
    });
    calculate_div_row1.appendChild(calculate_add_btn);

    const calculate_div_row2 = document.createElement('div');
    My_Div.Init(calculate_div_row2, 'calculate_div_row2','calculate_div_row2', '100%', '25%', '');
    My_Div.Set_Block(calculate_div_row2, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);
    const calculate_4_btn = document.createElement('button');
    My_Div.Init(calculate_4_btn, `calculate_btn`,`calculate_4_btn`, '25%', '100%',);
    My_Div.Set_Text(calculate_4_btn ,`4` , TextAlignEnum.CENTER , "20px", true,"微軟正黑體","black");
    calculate_4_btn.addEventListener('click', function()
    {
        calculate_input("4");
    });
    calculate_div_row2.appendChild(calculate_4_btn);
    const calculate_5_btn = document.createElement('button');
    My_Div.Init(calculate_5_btn, `calculate_btn`,`calculate_5_btn`, '25%', '100%',);
    My_Div.Set_Text(calculate_5_btn ,`5` , TextAlignEnum.CENTER , "20px", true,"微軟正黑體","black");
    calculate_5_btn.addEventListener('click', function()
    {
        calculate_input("5");
    });
    calculate_div_row2.appendChild(calculate_5_btn);
    const calculate_6_btn = document.createElement('button');
    My_Div.Init(calculate_6_btn, `calculate_btn`,`calculate_6_btn`, '25%', '100%',);
    My_Div.Set_Text(calculate_6_btn ,`6` , TextAlignEnum.CENTER , "20px", true,"微軟正黑體","black");
    calculate_6_btn.addEventListener('click', function()
    {
        calculate_input("6");
    });
    calculate_div_row2.appendChild(calculate_6_btn);
    const calculate_sub_btn = document.createElement('button');
    My_Div.Init(calculate_sub_btn, `calculate_btn`,`calculate_sub_btn`, '25%', '100%',);
    My_Div.Set_Text(calculate_sub_btn ,`-` , TextAlignEnum.CENTER , "20px", true,"微軟正黑體","black");
    calculate_sub_btn.addEventListener('click', function()
    {
        calculate_input("-");
    });
    calculate_div_row2.appendChild(calculate_sub_btn);

    const calculate_div_row3 = document.createElement('div');
    My_Div.Init(calculate_div_row3, 'calculate_div_row3','calculate_div_row3', '100%', '25%', '');
    My_Div.Set_Block(calculate_div_row3, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);
    const calculate_1_btn = document.createElement('button');
    My_Div.Init(calculate_1_btn, `calculate_btn`,`calculate_1_btn`, '25%', '100%',);
    My_Div.Set_Text(calculate_1_btn ,`1` , TextAlignEnum.CENTER , "20px", true,"微軟正黑體","black");
    calculate_1_btn.addEventListener('click', function()
    {
        calculate_input("1");
    });
    calculate_div_row3.appendChild(calculate_1_btn);
    const calculate_2_btn = document.createElement('button');
    My_Div.Init(calculate_2_btn, `calculate_btn`,`calculate_2_btn`, '25%', '100%',);
    My_Div.Set_Text(calculate_2_btn ,`2` , TextAlignEnum.CENTER , "20px", true,"微軟正黑體","black");
    calculate_2_btn.addEventListener('click', function()
    {
        calculate_input("2");
    });
    calculate_div_row3.appendChild(calculate_2_btn);
    const calculate_3_btn = document.createElement('button');
    My_Div.Init(calculate_3_btn, `calculate_btn`,`calculate_3_btn`, '25%', '100%',);
    My_Div.Set_Text(calculate_3_btn ,`3` , TextAlignEnum.CENTER , "20px", true,"微軟正黑體","black");
    calculate_3_btn.addEventListener('click', function()
    {
        calculate_input("3");
    });
    calculate_div_row3.appendChild(calculate_3_btn);
    const calculate_mul_btn = document.createElement('button');
    My_Div.Init(calculate_mul_btn, `calculate_btn`,`calculate_mul_btn`, '25%', '100%',);
    My_Div.Set_Text(calculate_mul_btn ,`*` , TextAlignEnum.CENTER , "20px", true,"微軟正黑體","black");
    calculate_mul_btn.addEventListener('click', function()
    {
        calculate_input("*");
    });
    calculate_div_row3.appendChild(calculate_mul_btn);

    const calculate_div_row4 = document.createElement('div');
    My_Div.Init(calculate_div_row4, 'calculate_div_row4','calculate_div_row4', '100%', '25%', '');
    My_Div.Set_Block(calculate_div_row4, DisplayEnum.FLEX, FlexDirectionEnum.ROW, JustifyContentEnum.LEFT);
    const calculate_CE_btn = document.createElement('button');
    My_Div.Init(calculate_CE_btn, `calculate_btn`,`calculate_CE_btn`, '25%', '100%',);
    My_Div.Set_Text(calculate_CE_btn ,`CE` , TextAlignEnum.CENTER , "20px", true,"微軟正黑體","black");
    calculate_CE_btn.addEventListener('click', function()
    {
        let pp_calculate_input = document.querySelector(".pp_calculate_input");
        pp_calculate_input.value = "";
    });
    calculate_div_row4.appendChild(calculate_CE_btn);
    const calculate_0_btn = document.createElement('button');
    My_Div.Init(calculate_0_btn, `calculate_btn`,`calculate_0_btn`, '25%', '100%',);
    My_Div.Set_Text(calculate_0_btn ,`0` , TextAlignEnum.CENTER , "20px", true,"微軟正黑體","black");
    calculate_0_btn.addEventListener('click', function()
    {
        calculate_input("0");
    });
    calculate_div_row4.appendChild(calculate_0_btn);
    const calculate_Back_btn = document.createElement('button');
    My_Div.Init(calculate_Back_btn, `calculate_btn`,`calculate_Back_btn`, '25%', '100%',);
    My_Div.Set_Text(calculate_Back_btn ,`←` , TextAlignEnum.CENTER , "20px", true,"微軟正黑體","black");
    calculate_Back_btn.addEventListener('click', function()
    {
        let pp_calculate_input = document.querySelector(".pp_calculate_input");
        pp_calculate_input.value = pp_calculate_input.value.slice(0, -1);
    });
    calculate_div_row4.appendChild(calculate_Back_btn);
    const calculate_Result_btn = document.createElement('button');
    My_Div.Init(calculate_Result_btn, `calculate_btn`,`calculate_Result_btn`, '25%', '100%',);
    My_Div.Set_Text(calculate_Result_btn ,`=` , TextAlignEnum.CENTER , "20px", true,"微軟正黑體","black");
    calculate_Result_btn.addEventListener('click', function()
    {
        let pp_calculate_input = document.querySelector(".pp_calculate_input");
        pp_calculate_input.value = calculateExpression(pp_calculate_input.value);
    });
    calculate_div_row4.appendChild(calculate_Result_btn);

    calculate_div.appendChild(calculate_div_row1);
    calculate_div.appendChild(calculate_div_row2);
    calculate_div.appendChild(calculate_div_row3);
    calculate_div.appendChild(calculate_div_row4);

    return calculate_div;
}
function calculate_input(char)
{
    let pp_calculate_input = document.querySelector(".pp_calculate_input");
    let text = pp_calculate_input.value;
    if(text.length == 0)
    {
        if(char == '0' ||char == '1'||char == '2'||char == '3'||char == '1'||char == '4'||char == '5'||char == '6'||char == '7'||char == '8'||char == '9'||char == '+'||char == '-')
        {
            pp_calculate_input.value = text + char;
        }
    }
    else
    {
        if(char == '0' ||char == '1'||char == '2'||char == '3'||char == '1'||char == '4'||char == '5'||char == '6'||char == '7'||char == '8'||char == '9')
        {
            pp_calculate_input.value = text + char;
        }
        else if(char == '+' ||char == '-'||char == '*')
        {
            let lastChar = text[text.length - 1];
            if(lastChar == "+" || lastChar == '-' || lastChar == '*')
            {
                return;
            }
            pp_calculate_input.value = text + char;
        }
    }
}
function calculateExpression(expression) {
    // 移除所有空格
    expression = expression.replace(/\s+/g, '');
  
    // 创建一个存储数字和运算符的数组
    const stack = [];
    let currentNumber = 0;
    let currentOperator = '+';
  
    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];
  
      if (!isNaN(char)) {
        // 如果是数字字符，将其添加到当前数字
        currentNumber = currentNumber * 10 + parseInt(char);
      }
  
      if (isNaN(char) || i === expression.length - 1) {
        // 如果是运算符或表达式结束
        if (currentOperator === '+') {
          stack.push(currentNumber);
        } else if (currentOperator === '-') {
          stack.push(-currentNumber);
        } else if (currentOperator === '*') {
          stack.push(stack.pop() * currentNumber);
        }
  
        currentNumber = 0;
        currentOperator = char;
      }
    }
  
    // 对数组中的所有数字求和
    return stack.reduce((total, num) => total + num, 0);
}