
// 创建一个继承自 <div> 元素的自定义类
class Basic_popup_Div
{
    
    constructor(className ,id, width, height) 
    {     
    //   super();
      this.LoadEvent = [];
      this.ClosedEvent = [];
      this._id = id;
      const overlay = document.createElement('div');
      overlay.style.id = `overlay${this.id}`;
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
      popup_div.style.border = "solid 1px";
      popup_div.style.flexDirection = "column"
      popup_div.style.justifyContent = `center`;
      popup_div.style.alignItems = `center`;
      popup_div.style.opacity = "0" ;
      popup_div.style.transition = "opacity 0.2s, visibility 0.2s 0s";
      popup_div.style.zIndex = "10";
      popup_div.style.visibility = 'visible';

      popup_div.style.opacity = '1';
      this._popup_div = popup_div;
      this.div = overlay;

      overlay.appendChild(popup_div);
    }
    Get_Div()
    {
        return this.div;
    }
    AddControl(control)
    {
        this._popup_div.appendChild(control);
    }
    Clear()
    {
        this._popup_div.innerHTML = ``;
    }
    Set_Size(width, height)
    {
        this._popup_div.style.width = width;
        this._popup_div.style.height = height;  
    }
    Set_Width(width)
    {
        this._popup_div.style.width = width;
    }
    Set_Height(height)
    {
        this._popup_div.style.height = height;
    }
    Set_BackgroundOpacity(opacity)
    {
        this.div.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
    }
    async Set_Visible(visible)
    {
        if(visible)
        {
            for(var i = 0 ; i < this.LoadEvent.length ; i++)
            {
                if(typeof this.LoadEvent[i] == "function") 
                {
                    await this.LoadEvent[i]();
                }
            }
            
            if(typeof this.onVisible != "undefined") this.onVisible();
            this.div.style.display = "block";
            this.div.style.opacity = "1" ;
            this.div.style.visibility  = "visible";
            document.body.style.overflow = "hidden";
        
   
        }
        else
        {
            if(typeof this.onDisvisble != "undefined") this.onDisvisble();
            this.div.style.display = "none";
            this.div.style.opacity = "0" ;
            this.div.style.visibility = "hidden";
            document.body.style.overflowY = "auto";
            for(var i = 0 ; i < this.ClosedEvent.length ; i++)
            {
                if(typeof this.ClosedEvent[i] == "function") 
                {
                    await this.ClosedEvent[i]();
                }
            }

        }
    }
    Get_Visible()
    {
        return this.div.style.visibility == "visible";
    }
    async Show()
    {
        
        this.Set_Visible(true);
    }
    async Close()
    {    
        
        this.Set_Visible(false);
    }
    onVisible;
    onDisvisble;
    _popup_div;
    div;
}
customElements.define('basic-popup-div', Basic_popup_Div, { extends: 'div' });
