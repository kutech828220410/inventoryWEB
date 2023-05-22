function Get_pill_SVG(btn_width ,btn_height, svg_width, svg_height ,strokeColor, backgroundColor)
{
    const btn_div = document.createElement("div");
    const div = document.createElement("div");
    btn_div.style.width = btn_width;
    btn_div.style.height= btn_height; 

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.innerHTML = `<?xml version="1.0" ?><svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><rect fill="none" height="256" width="256"/><path d="M112,208a45.2,45.2,0,0,1-64,0h0a45.2,45.2,0,0,1,0-64L96,96l64,64Z" opacity="0.2"/><rect fill="none" height="90.51" rx="45.3" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" transform="translate(-53 128) rotate(-45)" width="226.3" x="14.9" y="82.7"/><line fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" x1="96" x2="160" y1="96" y2="160"/><line fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" x1="160.1" x2="184.5" y1="112.1" y2="88.5"/></svg>`;
    
    
  
    svg.setAttribute("class", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");

    div.style.width = svg_width;
    div.style.height = svg_height;
 
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    div.style.margin = "auto";   
    btn_div.style.backgroundColor = backgroundColor;

    
    div.appendChild(svg);
    btn_div.appendChild(div);
    
    return btn_div;
}

function Get_find_check_SVG(btn_width ,btn_height, svg_width, svg_height ,strokeColor, backgroundColor)
{
    const btn_div = document.createElement("div");
    const div = document.createElement("div");
    btn_div.style.width = btn_width;
    btn_div.style.height= btn_height; 

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.innerHTML = `<?xml version="1.0" ?><svg fill=${backgroundColor} stroke="${strokeColor}  width="100%" height="100%" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"/></svg>`;
    
    
  
    svg.setAttribute("class", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");

    div.style.width = svg_width;
    div.style.height = svg_height;
 
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    div.style.margin = "auto";   
    btn_div.style.backgroundColor = backgroundColor;

    
    div.appendChild(svg);
    btn_div.appendChild(div);
    
    return btn_div;
}

function Get_date_SVG(btn_width ,btn_height, svg_width, svg_height ,strokeColor, backgroundColor)
{
    const btn_div = document.createElement("div");
    const div = document.createElement("div");
    btn_div.style.width = btn_width;
    btn_div.style.height= btn_height; 

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.innerHTML = `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
    <svg fill=${backgroundColor} width="100%" height="100%" viewBox="-3 0 19 19" xmlns="http://www.w3.org/2000/svg" class="cf-icon-svg"><path d="M11.882 3.187a.476.476 0 0 1 .475.475v11.063a.476.476 0 0 1-.475.475H1.118a.476.476 0 0 1-.475-.475V3.662a.476.476 0 0 1 .475-.475h1.328v.721a1.425 1.425 0 0 0 2.85 0v-.72H7.71v.72a1.425 1.425 0 0 0 2.85 0v-.72zm-.634 3.37H1.752v7.535h9.496zm-7.384.821H2.621V8.67h1.243zm0 2.292H2.621v1.292h1.243zm0 2.292H2.621v1.291h1.243zm.561-8.054V2.475a.554.554 0 1 0-1.108 0v1.433a.554.554 0 1 0 1.108 0zm1.613 3.47H4.794V8.67h1.244zm0 2.292H4.794v1.292h1.244zm0 2.292H4.794v1.291h1.244zm2.174-4.584H6.968V8.67h1.244zm0 2.292H6.968v1.292h1.244zm0 2.292H6.968v1.291h1.244zm1.477-8.054V2.475a.554.554 0 0 0-1.108 0v1.433a.554.554 0 0 0 1.108 0zm.696 3.47H9.142V8.67h1.243zm0 2.292H9.142v1.292h1.243zm0 2.292H9.142v1.291h1.243z" stroke="${strokeColor}" stroke-width="0.3"/></svg>`;
    
    
  
    svg.setAttribute("class", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");

    div.style.width = svg_width;
    div.style.height = svg_height;
 
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    div.style.margin = "auto";   
    btn_div.style.backgroundColor = backgroundColor;

    
    div.appendChild(svg);
    btn_div.appendChild(div);
    
    return btn_div;
}
function Get_script_SVG(btn_width ,btn_height, svg_width, svg_height ,strokeColor, backgroundColor)
{
    const btn_div = document.createElement("div");
    const div = document.createElement("div");
    btn_div.style.width = btn_width;
    btn_div.style.height= btn_height; 

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.innerHTML = `<?xml version="1.0" encoding="utf-8"?>

    <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
    <svg version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
    width="100%" height="100%" viewBox="0 0 32 32" xml:space="preserve">
    <style type="text/css">
        .st0{fill:none;stroke:#000000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}
        .st1{fill:none;stroke:#000000;stroke-width:2;stroke-linejoin:round;stroke-miterlimit:10;}
    </style>
    <path class="st0" d="M26.5,3c0.2,0,0.3,0,0.5,0c2.6,0.3,3.9,3.4,2.4,5.6l-9.8,14.7c-1.5,2.2-0.2,5.3,2.4,5.6c0.2,0,0.3,0,0.5,0
        c2.2,0,4-1.8,4-4H20"/>
    <line class="st0" x1="26" y1="3" x2="9.5" y2="3"/>
    <path class="st0" d="M11.3,10.3l-8.7,13C1.2,25.5,2.4,28.7,5,29c0.2,0,0.3,0,0.5,0H22"/>
    <path class="st0" d="M9,3C6.8,3,5,4.8,5,7c0,0.5,0.2,1,0.4,1.4c0.6,1,1.8,1.6,3,1.6H24c-1,0-3.1-2.8-0.9-5.5C23.8,3.6,24.9,3,26,3
        c2.2,0,4,1.8,4,4"/>
    <line class="st0" x1="13" y1="15" x2="18" y2="15"/>
    <line class="st0" x1="11" y1="18" x2="14" y2="18"/>
    </svg>`;
    
    
  
    svg.setAttribute("class", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");

    div.style.width = svg_width;
    div.style.height = svg_height;
 
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    div.style.margin = "auto";   
    btn_div.style.backgroundColor = backgroundColor;

    
    div.appendChild(svg);
    btn_div.appendChild(div);
    
    return btn_div;
}
function Get_find_in_page_SVG(btn_width ,btn_height, svg_width, svg_height ,strokeColor, backgroundColor)
{
    const btn_div = document.createElement("div");
    const div = document.createElement("div");
    btn_div.style.width = btn_width;
    btn_div.style.height= btn_height; 

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.innerHTML = `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 7L13 7" stroke="${strokeColor}}" stroke-width="2" stroke-linecap="round"/>
    <path d="M9 15L12 15" stroke="${strokeColor}" stroke-width="2" stroke-linecap="round"/>
    <path d="M9 11L15 11" stroke="${strokeColor}" stroke-width="2" stroke-linecap="round"/>
    <path d="M19 11V9C19 6.17157 19 4.75736 18.1213 3.87868C17.2426 3 15.8284 3 13 3H11C8.17157 3 6.75736 3 5.87868 3.87868C5 4.75736 5 6.17157 5 9V15C5 17.8284 5 19.2426 5.87868 20.1213C6.75736 21 8.17157 21 11 21H12"
     stroke="${strokeColor}" stroke-width="2"/>
    <circle cx="17.5" cy="17.5" r="2.5" stroke="${strokeColor}" stroke-width="2"/>
    <path d="M21 21L19.5 19.5" stroke="${strokeColor}" stroke-width="2" stroke-linecap="round"/>
    </svg>`;
    svg.setAttribute("stroke", strokeColor);
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke-width", "1.5");
    svg.setAttribute("viewBox", `0 0 24 24`);
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("class", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");

    div.style.width = svg_width;
    div.style.height = svg_height;
 
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    div.style.margin = "auto";   
    btn_div.style.backgroundColor = backgroundColor;

    
    div.appendChild(svg);
    btn_div.appendChild(div);
    
    return btn_div;
}
function Get_add_SVG(btn_width ,btn_height, svg_width, svg_height ,strokeColor, backgroundColor)
{
    const btn_div = document.createElement("div");
    const div = document.createElement("div");
    btn_div.style.width = btn_width;
    btn_div.style.height= btn_height; 

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.innerHTML = `<?xml version="1.0" ?>
    <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
    <svg width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <title/>
    <g id="Complete">
    <g data-name="add" id="add-2">
    <g> 
    <line fill="none" stroke="${strokeColor}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12" x2="12" y1="19" y2="5"/>
    <line fill="none" stroke="${strokeColor}" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="5" x2="19" y1="12" y2="12"/>
    </g>
    </g>
    </g>
    </svg>`;
    svg.setAttribute("stroke", strokeColor);
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke-width", "1.5");
    svg.setAttribute("viewBox", `0 0 24 24`);
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("class", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");

    div.style.width = svg_width;
    div.style.height = svg_height;
 
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    div.style.margin = "auto";   
    btn_div.style.backgroundColor = backgroundColor;

    
    div.appendChild(svg);
    btn_div.appendChild(div);
    
    return btn_div;
}
function Get_lock_SVG(btn_width ,btn_height, svg_width, svg_height ,strokeColor, backgroundColor)
{
    const btn_div = document.createElement("div");
    const div = document.createElement("div");
    btn_div.style.width = btn_width;
    btn_div.style.height= btn_height; 

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.innerHTML = `<?xml version="1.0" encoding="utf-8"?>
    <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="Interface / Lock">
    <path id="Vector" d="M9.23047 9H7.2002C6.08009 9 5.51962 9 5.0918 9.21799C4.71547 9.40973 4.40973 9.71547 4.21799 10.0918C4 10.5196 4 11.0801 4 12.2002V17.8002C4 18.9203 4 19.4801 4.21799 19.9079C4.40973 20.2842 4.71547 20.5905 5.0918 20.7822C5.5192 21 6.07902 21 7.19694 21H16.8031C17.921 21 18.48 21 18.9074 20.7822C19.2837 20.5905 19.5905 20.2842 19.7822 19.9079C20 19.4805 20 18.9215 20 17.8036V12.1969C20 11.079 20 10.5192 19.7822 10.0918C19.5905 9.71547 19.2837 9.40973 18.9074 9.21799C18.4796 9 17.9203 9 16.8002 9H14.7689M9.23047 9H14.7689M9.23047 9C9.10302 9 9 8.89668 9 8.76923V6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6V8.76923C15 8.89668 14.8964 9 14.7689 9" 
    stroke="${strokeColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    </svg>`;
    svg.setAttribute("stroke", strokeColor);
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke-width", "1.5");
    svg.setAttribute("viewBox", `0 0 24 24`);
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("class", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");

    div.style.width = svg_width;
    div.style.height = svg_height;
 
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    div.style.margin = "auto";   
    btn_div.style.backgroundColor = backgroundColor;

    
    div.appendChild(svg);
    btn_div.appendChild(div);
    
    return btn_div;
}
function Get_unlock_SVG(btn_width ,btn_height, svg_width, svg_height ,strokeColor, backgroundColor)
{
    const btn_div = document.createElement("div");
    const div = document.createElement("div");
    btn_div.style.width = btn_width;
    btn_div.style.height= btn_height; 

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.innerHTML = `<?xml version="1.0" encoding="utf-8"?>
    <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="Interface / Lock_Open">
    <path id="Vector" d="M9 9H7.2002C6.08009 9 5.51962 9 5.0918 9.21799C4.71547 9.40973 4.40973 9.71547 4.21799 10.0918C4 10.5196 4 11.0801 4 12.2002V17.8002C4 18.9203 4 19.4801 4.21799 19.9079C4.40973 20.2842 4.71547 20.5905 5.0918 20.7822C5.51921 21 6.07901 21 7.19694 21L16.8031 21C17.921 21 18.48 21 18.9074 20.7822C19.2837 20.5905 19.5905 20.2842 19.7822 19.9079C20 19.4805 20 18.9215 20 17.8036V12.1969C20 11.079 20 10.5192 19.7822 10.0918C19.5905 9.71547 19.2837 9.40973 18.9074 9.21799C18.4796 9 17.9203 9 16.8002 9H9ZM9 9V6.12012C9 4.39699 10.3 3 11.9037 3C12.7277 3 13.4708 3.36879 13.9993 3.96113" 
    stroke="${strokeColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    </svg>`;
    svg.setAttribute("stroke", strokeColor);
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke-width", "1.5");
    svg.setAttribute("viewBox", `0 0 24 24`);
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("class", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");

    div.style.width = svg_width;
    div.style.height = svg_height;
 
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    div.style.margin = "auto";   
    btn_div.style.backgroundColor = backgroundColor;

    
    div.appendChild(svg);
    btn_div.appendChild(div);
    
    return btn_div;
}
function Get_right_direction_SVG(btn_width ,btn_height, svg_width, svg_height ,strokeColor, backgroundColor)
{
    const btn_div = document.createElement("div");
    const div = document.createElement("div");
    btn_div.style.width = btn_width;
    btn_div.style.height= btn_height; 

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.innerHTML = `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
    <svg fill="#000000" width="100%" height="100%" viewBox="0 0 24 24" id="right-direction" xmlns="http://www.w3.org/2000/svg" class="icon line"><path id="primary" d="M20.76,12.65a1,1,0,0,0,0-1.3L14.46,4l-3,2.6L14.34,10H4a1,1,0,0,0-1,1v2a1,1,0,0,0,1,1H14.34l-2.92,3.4,3,2.6Z" 
    style="fill: none; stroke:${strokeColor}; stroke-linecap: round; stroke-linejoin: round; stroke-width: 1.5;"></path></svg>`;
    svg.setAttribute("stroke", strokeColor);
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke-width", "1.5");
    svg.setAttribute("viewBox", `0 0 24 24`);
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("class", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");

    div.style.width = svg_width;
    div.style.height = svg_height;
 
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    div.style.margin = "auto";   
    btn_div.style.backgroundColor = backgroundColor;

    
    div.appendChild(svg);
    btn_div.appendChild(div);
    
    return btn_div;
}
function Get_download_SVG(btn_width ,btn_height, svg_width, svg_height ,strokeColor, backgroundColor)
{
    const btn_div = document.createElement("div");
    const div = document.createElement("div");
    btn_div.style.width = btn_width;
    btn_div.style.height= btn_height; 

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.innerHTML = `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H12M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125" stroke=${strokeColor} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M17.5 15V21M17.5 21L15 18.5M17.5 21L20 18.5" stroke=${strokeColor}} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
    svg.setAttribute("stroke", strokeColor);
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke-width", "1.5");
    svg.setAttribute("viewBox", `0 0 24 24`);
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("class", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");

    div.style.width = svg_width;
    div.style.height = svg_height;
 
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    div.style.margin = "auto";   
    btn_div.style.backgroundColor = backgroundColor;

    
    div.appendChild(svg);
    btn_div.appendChild(div);
    
    return btn_div;
    
}

function Get_trashBox_SVG(btn_width ,btn_height, svg_width, svg_height ,strokeColor, backgroundColor)
{
    const btn_div = document.createElement("div");
    const div = document.createElement("div");
    btn_div.style.width = btn_width;
    btn_div.style.height= btn_height; 
  
    
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("stroke", strokeColor);
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke-width", "1.5");
    svg.setAttribute("viewBox", `0 0 24 24`);
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("class", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
 
  
    const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    polyline.setAttribute("points", "3 6 5 6 21 6");
    
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2");
    
    const line1 = document.createElementNS("http://www.w3.org/2000/svg", "line");

    
    var p0_x1 = 10 ;
    var p0_y1 = 11 ;
    var p0_x2 = 10 ;
    var p0_y2 = 17 ;
    
    var p1_x1 = 14 ;
    var p1_y1 = 11 ;
    var p1_x2 = 14 ;
    var p1_y2 = 17 ;
    
    line1.setAttribute("x1", p0_x1);
    line1.setAttribute("y1", p0_y1);
    line1.setAttribute("x2", p0_x2);
    line1.setAttribute("y2", p0_y2);
    
    const line2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line2.setAttribute("x1", p1_x1);
    line2.setAttribute("y1", p1_y1);
    line2.setAttribute("x2", p1_x2);
    line2.setAttribute("y2", p1_y2);
  
    svg.appendChild(polyline);
    svg.appendChild(path);
    svg.appendChild(line1);
    svg.appendChild(line2);

    div.style.width = svg_width;
    div.style.height = svg_height;
 
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    div.style.margin = "auto";   
    btn_div.style.backgroundColor = backgroundColor;

    
    div.appendChild(svg);
    btn_div.appendChild(div);
    
    return btn_div;
}