
// 创建一个继承自 <div> 元素的自定义类
class Basic_popup_Div extends HTMLDivElement
{
    constructor(className ,id, width, height) 
    {     
      super();

      const overlay = this;
      overlay.style.position = 'fixed';
      overlay.style.top = 0;
      overlay.style.left = 0;
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      overlay.style.opacity = '0.5';
      overlay.style.zIndex = '1000';
      overlay.style.display = 'block';
      document.body.appendChild(overlay);

      const popup_div = document.createElement('div');
      popup_div.className = `${className}`;
      popup_div.id = `${id}`;
      popup_div.style.backgroundColor = "#FFF";
      popup_div.style.width = width;
      popup_div.style.height = height;
      popup_div.style.position = "fixed";
      popup_div.style.top = "50%";
      popup_div.style.left = "50%";
      popup_div.style.transform = "translate(-50%, -50%)";
      popup_div.style.display = "block";
      popup_div.style.visibility = '';
      popup_div.style.borderRadius = "5px";
      popup_div.style.border = "solid 2px";
      popup_div.style.flexDirection = "column"
      popup_div.style.opacity = "0" ;
      popup_div.style.transition = "opacity 0.2s, visibility 0.2s 0s";
      popup_div.style.zIndex = "10";
      popup_div.style.visibility = 'visible';
      popup_div.style.paddingTop  = "10px";
      popup_div.style.paddingRight  = "10px";
      popup_div.style.opacity = '1';
      this._popup_div = popup_div;
      overlay.appendChild(popup_div);
    }
    AddControl(control)
    {
        this._popup_div.appendChild(control);
    }
    Set_Visible(visible)
    {
        console.log(visible);
        if(visible)
        {
            if(typeof this.onVisible != "undefined") this.onVisible();
            this.style.display = "block";
            this.style.opacity = "1" ;
            this.style.visibility  = "visible";
            document.body.style.overflow = "hidden";

   
        }
        else
        {
            if(typeof this.onDisvisble != "undefined") this.onDisvisble();
            this.style.display = "block";
            this.style.opacity = "0" ;
            this.style.visibility = "hidden";
            document.body.style.overflow = "";

            // var overlay = document.querySelector('.overlay');
            // document.body.removeChild(overlay);
        }
    }
    onVisible;
    onDisvisble;
    _popup_div;
}
customElements.define('basic-popup-div', Basic_popup_Div, { extends: 'div' });
