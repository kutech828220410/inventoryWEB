const AlignItemsEnum = 
{
    STRETCH: 'stretch',
    FLEX_START: 'flex-start',
    FLEX_END: 'flex-end',
    CENTER: 'center',
    BASELINE: 'baseline',
};
const PositionEnum = 
{
    STATIC: 'static',
    RELATIVE: 'relative',
    ABSOLUTE: 'absolute',
    FIXED: 'fixed',
    STICKY: 'sticky',
    NONE: 'none',
};
const JustifyContentEnum = 
{
    FLEX_START: 'flex-start',
    FLEX_END: 'flex-end',
    CENTER: 'center',
    SPACE_BETWEEN: 'space-between',
    SPACE_AROUND: 'space-around',
    SPACE_EVENLY: 'space-evenly',
    LEFT: 'left',
    RIGHT: 'right',  
    TOP: 'top',
    BOTTTOM: 'bottom',
};
const FlexDirectionEnum = 
{
    ROW: 'row',
    ROW_REVERSE: 'row-reverse',
    COLUMN: 'column',
    COLUMN_REVERSE: 'column-reverse',
};
const DisplayEnum = 
{
    BLOCK: 'block',
    INLINE: 'inline',
    INLINE_BLOCK: 'inline-block',
    FLEX: 'flex',
    INLINE_FLEX: 'inline-flex',
    GRID: 'grid',
    INLINE_GRID: 'inline-grid',
    TABLE: 'table',
    TABLE_ROW: 'table-row',
    TABLE_CELL: 'table-cell',
    NONE: 'none',
};
const AlignContentEnum = 
{
    FLEX_START: 'flex-start',
    FLEX_END: 'flex-end',
    CENTER: 'center',
    SPACE_BETWEEN: 'space-between',
    SPACE_AROUND: 'space-around',
    STRETCH: 'stretch',
};
const TextAlignEnum = 
{
    LEFT: 'left',
    RIGHT: 'right',
    CENTER: 'center',
    JUSTIFY: 'justify',
};
// const myDiv = new YourClassName(
//     'my-class',
//     'my-id',
//     '200px',
//     '150px',
//     '#FFF',
//     DisplayEnum.FLEX,
//     PositionEnum.RELATIVE,
//     FlexDirectionEnum.ROW,
//     JustifyContentEnum.SPACE_BETWEEN,
//     AlignItemsEnum.CENTER
//   );
class My_Div
{
    /**
     * @param {DisplayEnum} displayEnum 
     * @param {FlexDirectionEnum} flexDirectionEnum 
     * @param {JustifyContentEnum} justifyContentEnum 
     * @param {AlignItemsEnum} alignItemsEnum 
     */
    constructor(
        className ,
        id, 
        width,
        height ,
        backgroundColor = "",
        displayEnum = DisplayEnum.FIXED,
        flexDirectionEnum = FlexDirectionEnum.COLUMN,
        justifyContentEnum = JustifyContentEnum.CENTER,
        alignItemsEnum = AlignItemsEnum.CENTER ) 
    {     
      this.type = 'My_Div';
      this.className = `${className}`;
      this.id = `${id}`;

      this.div = document.createElement('div');
      this.div.className = `${className}`;
      this.div.id = `${id}`;

      this.div.style.alignItems = `${alignItemsEnum}`;
      this.div.style.display = `${displayEnum}`;
      this.div.style.flexDirection = `${flexDirectionEnum}`;
      this.div.style.justifyContent = `${justifyContentEnum}`;
  
      this.div.style.width = width;
      this.div.style.height = height;
      this.div.style.backgroundColor = backgroundColor;
    //   this.div.style.flexWrap = "wrap";

    }
 
    static Set_position(div ,positionEnum , left, top)
    {
        if(positionEnum!= undefined)
        {
            div.style.position = `${positionEnum}`;
        }       
        if(top != undefined)
        {
            div.style.top = `${top}px`;
        }
        if(left!= undefined)
        {
            div.style.left = `${left}px`;
        }
    }
    /**
     * @param {DisplayEnum} displayEnum 
     * @param {FlexDirectionEnum} flexDirectionEnum 
     * @param {JustifyContentEnum} justifyContentEnum 
     * @param {AlignItemsEnum} alignItemsEnum 
     */
    static Init(div, className, id, width, height, backgroundColor)
    {
        div.className = `${className}`;
        div.id = `${id}`;
        div.style.width = width;
        div.style.height = height;
        div.style.backgroundColor = backgroundColor;
    }
    static Set_display(displayEnum = DisplayEnum.FIXED, flexDirectionEnum = FlexDirectionEnum.COLUMN, justifyContentEnum = JustifyContentEnum.CENTER)
    {
        if(displayEnum!= undefined)
        {
            div.style.display = `${displayEnum}`;
        }  
        if(flexDirectionEnum!= undefined)
        {
            div.style.flexDirection = `${flexDirectionEnum}`;
        }
        if(justifyContentEnum!= undefined)
        {
            div.style.justifyContent = `${justifyContentEnum}`;
        }

    }
    static Set_Text(div ,text, textAlignEnum = TextAlignEnum.CENTER, fontSize = "14px", bolder = false, fontName = "微軟正黑體", color = "black")
    {
        if (fontSize === undefined) fontSize = "14px";
        if (bolder === undefined) bolder = false;
        if (fontName === undefined) fontName = "微軟正黑體";
        if (color === undefined) color = "black";
        if (text === undefined) text = "";
        if (textAlignEnum === undefined) textAlignEnum = TextAlignEnum.CENTER;
        const fontWeight = bolder ? "bold" : "normal";

        div.innerText = text;
        div.style.display = DisplayEnum.FLEX;
        div.style.flexDirection = FlexDirectionEnum.ROW;
        div.style.justifyContent = `${textAlignEnum}`;
        div.style.textAlign =`${textAlignEnum}`;
        div.style.alignItems = 'center';
        div.style.fontSize = fontSize;
        div.style.fontFamily = fontName;
        div.style.fontWeight = fontWeight;
        div.style.color = color;
    }
    static Set_Block(div ,displayEnum = DisplayEnum.FIXED, flexDirectionEnum = FlexDirectionEnum.COLUMN, justifyContent)
    {
        if(displayEnum!= undefined)
        {
            div.style.display = `${displayEnum}`;
        }  
        if(flexDirectionEnum!= undefined)
        {
            div.style.flexDirection = `${flexDirectionEnum}`;
        }
        if(justifyContent!= undefined)
        {
            div.style.justifyContent = `${justifyContent}`;
        }
        div.style.alignItems = 'center';
    }
    static Set_Size(div ,width, height)
    {
        div.style.width = width;
        div.style.height = height;  
    }

   
  
    static Set_Visible(div ,visible)
    {
        console.log(visible);
        if(visible)
        {
            div.style.display = "block";
            div.style.opacity = "1" ;
            div.style.visibility  = "visible";

   
        }
        else
        {
            div.style.display = "block";
            div.style.opacity = "0" ;
            div.style.visibility = "hidden";


        }
    }
    static Get_Visible(div)
    {
        return div.style.visibility == "visible";
    }

    div;
    type;
}
customElements.define('my-div', My_Div, { extends: 'div' });