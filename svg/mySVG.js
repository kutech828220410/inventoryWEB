function Get_barcode_SVG(btn_width ,btn_height, svg_width, svg_height ,strokeColor, backgroundColor, clickOn)
{
    const btn_div = document.createElement("div");
    const div = document.createElement("div");
    btn_div.style.width = btn_width;
    btn_div.style.height= btn_height; 

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.innerHTML = `<?xml version="1.0" ?><svg height="100%" viewBox="0 0 24 24" width="100%" xmlns="http://www.w3.org/2000/svg"><path d="M5 7h2v10H5zm9 0h1v10h-1zm-4 0h3v10h-3zM8 7h1v10H8zm8 0h3v10h-3z"/><path d="M4 5h4V3H4c-1.103 0-2 .897-2 2v4h2V5zm0 16h4v-2H4v-4H2v4c0 1.103.897 2 2 2zM20 3h-4v2h4v4h2V5c0-1.103-.897-2-2-2zm0 16h-4v2h4c1.103 0 2-.897 2-2v-4h-2v4z"/></svg>`;
    svg.setAttribute("stroke", strokeColor);
    // svg.setAttribute("fill", "none");
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
    if(clickOn == undefined) clickOn =true;
    if(clickOn)
    {
      btn_div.addEventListener("mouseover", function() 
      {
          btn_div.style.backgroundColor = "";
      });
      
      // 滑鼠移出時的事件處理器
      btn_div.addEventListener("mouseout", function() 
      {
        btn_div.style.backgroundColor = backgroundColor;
      });
    }
    div.appendChild(svg);
    btn_div.appendChild(div);
    return btn_div;
}

function Get_storagelocation_SVG(btn_width ,btn_height, svg_width, svg_height ,strokeColor, backgroundColor, clickOn)
{
    const btn_div = document.createElement("div");
    const div = document.createElement("div");
    btn_div.style.width = btn_width;
    btn_div.style.height= btn_height; 

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.innerHTML = `<?xml version="1.0" ?><svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><rect fill="none" height="256" width="256"/><path d="M224,177.3V78.7a8.1,8.1,0,0,0-4.1-7l-88-49.5a7.8,7.8,0,0,0-7.8,0l-88,49.5a8.1,8.1,0,0,0-4.1,7v98.6a8.1,8.1,0,0,0,4.1,7l88,49.5a7.8,7.8,0,0,0,7.8,0l88-49.5A8.1,8.1,0,0,0,224,177.3Z" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><polyline fill="none" points="177 152.5 177 100.5 80 47" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><polyline fill="none" points="222.9 74.6 128.9 128 33.1 74.6" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" x1="128.9" x2="128" y1="128" y2="234.8"/></svg>`;
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
    if(clickOn == undefined) clickOn =true;
    if(clickOn)
    {
      btn_div.addEventListener("mouseover", function() 
      {
          btn_div.style.backgroundColor = "";
      });
      
      // 滑鼠移出時的事件處理器
      btn_div.addEventListener("mouseout", function() 
      {
        btn_div.style.backgroundColor = backgroundColor;
      });
    }
    div.appendChild(svg);
    btn_div.appendChild(div);
    return btn_div;
}

function Get_paper01_SVG(btn_width ,btn_height, svg_width, svg_height ,strokeColor, backgroundColor, clickOn)
{
    const btn_div = document.createElement("div");
    const div = document.createElement("div");
    btn_div.style.width = btn_width;
    btn_div.style.height= btn_height; 

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.innerHTML = `<?xml version="1.0" ?>
    <!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'>
    <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
    <svg fill="#000000" width="100%" height="100%" viewBox="0 0 270.92 270.92" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd" version="1.1" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
    <style type="text/css">
       <![CDATA[
        .fil0 {fill:black;fill-rule:nonzero}
       ]]>
      </style>
    </defs>
    <g id="Layer_x0020_1">
    <path class="fil0" d="M202.48 217.14c0,7.48 -6.07,13.54 -13.54,13.54l-106.95 0c-7.47,0 -13.54,-6.06 -13.54,-13.54l0 -163.37c0,-7.47 6.07,-13.54 13.54,-13.54l84.29 0c1.93,0 3.74,0.75 5.1,2.11l29.01 29.13c1.35,1.36 2.09,3.17 2.09,5.08l0 140.59zm-30.43 -45.72l0 -44.7c0,-1.95 -1.58,-3.53 -3.53,-3.53 -1.95,0 -3.52,1.58 -3.52,3.53l0 44.7c0,1.94 1.57,3.53 3.52,3.53 1.95,0 3.53,-1.59 3.53,-3.53zm-22.13 3.53c1.95,0 3.53,-1.59 3.53,-3.53l0 -31.65c0,-1.95 -1.58,-3.52 -3.53,-3.52 -1.95,0 -3.53,1.57 -3.53,3.52l0 31.65c0,1.94 1.58,3.53 3.53,3.53zm-17.65 0c1.95,0 3.53,-1.59 3.53,-3.53l0 -55.4c0,-1.95 -1.58,-3.52 -3.53,-3.52 -1.95,0 -3.53,1.57 -3.53,3.52l0 55.4c0,1.94 1.58,3.53 3.53,3.53zm-18.29 0c1.95,0 3.53,-1.59 3.53,-3.53l0 -35.49c0,-1.95 -1.58,-3.52 -3.53,-3.52 -1.94,0 -3.53,1.57 -3.53,3.52l0 35.49c0,1.94 1.59,3.53 3.53,3.53zm68.22 11.83l-85.09 0 0 -85.09c0,-1.95 -1.59,-3.53 -3.53,-3.53 -1.96,0 -3.53,1.58 -3.53,3.53l0 88.61c0,1.95 1.57,3.53 3.53,3.53l88.62 0c1.93,0 3.52,-1.58 3.52,-3.53 0,-1.95 -1.59,-3.52 -3.52,-3.52zm10.22 -114.23l-22.14 0 0 -23.3c0,-1.96 -1.59,-3.53 -3.53,-3.53 -1.95,0 -3.52,1.57 -3.52,3.53l0 26.82c0,1.95 1.57,3.53 3.52,3.53l25.67 0c1.95,0 3.53,-1.58 3.53,-3.53 0,-1.95 -1.58,-3.52 -3.53,-3.52zm12.97 -6.05l-29.01 -29.14c-2.69,-2.7 -6.28,-4.18 -10.1,-4.18l-84.29 0c-11.35,0 -20.59,9.24 -20.59,20.59l0 163.37c0,11.36 9.24,20.6 20.59,20.6l106.95 0c11.36,0 20.59,-9.24 20.59,-20.6l0 -140.59c0,-3.78 -1.47,-7.37 -4.14,-10.05z"/>
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
    if(clickOn == undefined) clickOn =true;
    if(clickOn)
    {
      btn_div.addEventListener("mouseover", function() 
      {
          btn_div.style.backgroundColor = "";
      });
      
      // 滑鼠移出時的事件處理器
      btn_div.addEventListener("mouseout", function() 
      {
        btn_div.style.backgroundColor = backgroundColor;
      });
    }
  
    
    div.appendChild(svg);
    btn_div.appendChild(div);
    
    return btn_div;
}

function Get_logout_SVG(btn_width ,btn_height, svg_width, svg_height ,strokeColor, backgroundColor)
{
    const btn_div = document.createElement("div");
    const div = document.createElement("div");
    btn_div.style.width = btn_width;
    btn_div.style.height= btn_height; 

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.innerHTML = `<?xml version="1.0" ?><svg fill="none" height="100%" viewBox="0 0 24 24" width="100%" xmlns="http://www.w3.org/2000/svg"><path d="M16 4H19C20.1046 4 21 4.89543 21 6V7M16 20H19C20.1046 20 21 19.1046 21 18V17M4.4253 19.4276L10.4253 21.2276C11.7085 21.6126 13 20.6517 13 19.3119V4.68806C13 3.34834 11.7085 2.38744 10.4253 2.77241L4.4253 4.57241C3.57934 4.8262 3 5.60484 3 6.48806V17.5119C3 18.3952 3.57934 19.1738 4.4253 19.4276Z" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><path d="M9.001 12H9" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><path d="M16 12H21M21 12L19 10M21 12L19 14" stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>`;
    
    
  
    svg.setAttribute("class", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");

    div.style.width = svg_width;
    div.style.height = svg_height;
 
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    div.style.margin = "auto";   
    btn_div.style.backgroundColor = backgroundColor;
    btn_div.addEventListener("mouseover", function() 
    {
      btn_div.style.backgroundColor = "";
    });
  
    // 滑鼠移出時的事件處理器
    btn_div.addEventListener("mouseout", function() 
    {
      btn_div.style.backgroundColor = '';
    });
    
    div.appendChild(svg);
    btn_div.appendChild(div);
    
    return btn_div;
}


function Get_user_SVG(btn_width ,btn_height, svg_width, svg_height ,strokeColor, backgroundColor)
{
    const btn_div = document.createElement("div");
    const div = document.createElement("div");
    btn_div.style.width = btn_width;
    btn_div.style.height= btn_height; 

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.innerHTML = `<?xml version="1.0" ?><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g data-name="31. User" id="_31._User"><path d="M23.7,20.308a11.919,11.919,0,0,0-5.342-7.466,8,8,0,1,0-12.709,0A11.894,11.894,0,0,0,.305,20.307a3.01,3.01,0,0,0,.582,2.561A2.977,2.977,0,0,0,3.23,24H20.77a2.977,2.977,0,0,0,2.343-1.132A3.008,3.008,0,0,0,23.7,20.308ZM12,2A6,6,0,1,1,6,8,6.006,6.006,0,0,1,12,2Zm9.549,19.623A.982.982,0,0,1,20.77,22H3.23a.982.982,0,0,1-.779-.377,1.026,1.026,0,0,1-.2-.87A9.9,9.9,0,0,1,7.1,14.306a7.949,7.949,0,0,0,9.813,0,9.925,9.925,0,0,1,4.838,6.45A1.024,1.024,0,0,1,21.549,21.623Z"/></g></svg>`;
    
    
  
    svg.setAttribute("class", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");

    div.style.width = svg_width;
    div.style.height = svg_height;
 
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    div.style.margin = "auto";   
    btn_div.style.backgroundColor = backgroundColor;
    btn_div.addEventListener("mouseover", function() 
    {
      btn_div.style.backgroundColor = "";
    });
  
    // 滑鼠移出時的事件處理器
    btn_div.addEventListener("mouseout", function() 
    {
      btn_div.style.backgroundColor = '';
    });
    
    div.appendChild(svg);
    btn_div.appendChild(div);
    
    return btn_div;
}


function Get_ward_SVG(btn_width ,btn_height, svg_width, svg_height ,strokeColor, backgroundColor)
{
    const btn_div = document.createElement("div");
    const div = document.createElement("div");
    btn_div.style.width = btn_width;
    btn_div.style.height= btn_height; 

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.innerHTML = `<?xml version="1.0" ?><svg height="100%" id="svg8" version="1.1" viewBox="0 0 8.4666665 8.4666669" width="100%" xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:svg="http://www.w3.org/2000/svg"><defs id="defs2"/><g id="layer1" transform="translate(0,-288.53332)"><path d="m 2.1760249,290.47035 v -1.25149 h 4.1716537 v 1.25149" id="path4197" style="opacity:1;fill:none;fill-opacity:1;fill-rule:nonzero;stroke:#000000;stroke-width:1;stroke-linecap:square;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:6.80813837;stroke-opacity:1;paint-order:stroke fill markers"/><path d="m 0.79919825,290.85356 v 5.45106 H 7.7245053 v -5.45106 z" id="path4199" style="opacity:1;fill:none;fill-opacity:1;fill-rule:nonzero;stroke:#000000;stroke-width:1;stroke-linecap:square;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:6.80813837;stroke-opacity:1;paint-order:markers fill stroke"/><path d="m 4.2618518,292.58525 c 0,0.0772 0,1.98768 0,1.98768" id="path4201" style="opacity:1;fill:none;fill-opacity:1;fill-rule:nonzero;stroke:#000000;stroke-width:1;stroke-linecap:square;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:6.80813837;stroke-opacity:1;paint-order:markers fill stroke"/><path d="m 5.2556941,293.57909 c -0.077147,0 -1.9876847,0 -1.9876847,0" id="path4203" style="opacity:1;fill:none;fill-opacity:1;fill-rule:nonzero;stroke:#000000;stroke-width:1;stroke-linecap:square;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:6.80813837;stroke-opacity:1;paint-order:markers fill stroke"/></g></svg>`;
    
    
  
    svg.setAttribute("class", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");

    div.style.width = svg_width;
    div.style.height = svg_height;
 
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    div.style.margin = "auto";   
    btn_div.style.backgroundColor = backgroundColor;
    btn_div.addEventListener("mouseover", function() 
    {
      btn_div.style.backgroundColor = "";
    });
  
    // 滑鼠移出時的事件處理器
    btn_div.addEventListener("mouseout", function() 
    {
      btn_div.style.backgroundColor = '';
    });
    
    div.appendChild(svg);
    btn_div.appendChild(div);
    
    return btn_div;
}


function Get_storehouse_SVG(btn_width ,btn_height, svg_width, svg_height ,strokeColor, backgroundColor)
{
    const btn_div = document.createElement("div");
    const div = document.createElement("div");
    btn_div.style.width = btn_width;
    btn_div.style.height= btn_height; 

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.innerHTML = `<?xml version="1.0" ?><svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><defs><style>.a{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:1.5px;}</style></defs><title/><rect class="a" height="6" rx="0.75" ry="0.75" width="6" x="5.999" y="17.15"/><rect class="a" height="6" rx="0.75" ry="0.75" width="6" x="11.999" y="17.15"/><rect class="a" height="6" rx="0.75" ry="0.75" width="6" x="8.999" y="11.15"/><path class="a" d="M23.249,23.15V7.55a1.5,1.5,0,0,0-.794-1.324l-9.75-5.2a1.5,1.5,0,0,0-1.412,0l-9.75,5.2A1.5,1.5,0,0,0,.749,7.55v15.6"/></svg>`;
    
    
  
    svg.setAttribute("class", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");

    div.style.width = svg_width;
    div.style.height = svg_height;
 
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    div.style.margin = "auto";   
    btn_div.style.backgroundColor = backgroundColor;
    btn_div.addEventListener("mouseover", function() 
    {
      btn_div.style.backgroundColor = "";
    });
  
    // 滑鼠移出時的事件處理器
    btn_div.addEventListener("mouseout", function() 
    {
      btn_div.style.backgroundColor = '';
    });
    
    div.appendChild(svg);
    btn_div.appendChild(div);
    
    return btn_div;
}



function Get_all_SVG(btn_width ,btn_height, svg_width, svg_height ,strokeColor, backgroundColor)
{
    const btn_div = document.createElement("div");
    const div = document.createElement("div");
    btn_div.style.width = btn_width;
    btn_div.style.height= btn_height; 

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.innerHTML = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>


    <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
    <svg 
       xmlns:dc="http://purl.org/dc/elements/1.1/"
       xmlns:cc="http://creativecommons.org/ns#"
       xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
       xmlns:svg="http://www.w3.org/2000/svg"
       xmlns="http://www.w3.org/2000/svg"
       xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
       xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
       width="100%"
       height="100%"
       viewBox="0 0 30 30"
       version="1.1"
       id="svg822"
       inkscape:version="0.92.4 (f8dce91, 2019-08-02)"
       sodipodi:docname="view-all.svg">
      <defs
         id="defs816" />
      <sodipodi:namedview
         id="base"
         pagecolor="#ffffff"
         bordercolor="#666666"
         borderopacity="1.0"
         inkscape:pageopacity="0.0"
         inkscape:pageshadow="2"
         inkscape:zoom="17.833333"
         inkscape:cx="15"
         inkscape:cy="15"
         inkscape:document-units="px"
         inkscape:current-layer="layer1"
         showgrid="true"
         units="px"
         inkscape:window-width="1366"
         inkscape:window-height="713"
         inkscape:window-x="0"
         inkscape:window-y="0"
         inkscape:window-maximized="1"
         inkscape:snap-global="true"
         inkscape:snap-bbox="true"
         showguides="false">
        <inkscape:grid
           type="xygrid"
           id="grid816" />
      </sodipodi:namedview>
      <metadata
         id="metadata819">
        <rdf:RDF>
          <cc:Work
             rdf:about="">
            <dc:format>image/svg+xml</dc:format>
            <dc:type
               rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
            <dc:title>
    
    </dc:title>
          </cc:Work>
        </rdf:RDF>
      </metadata>
      <g
         inkscape:label="Layer 1"
         inkscape:groupmode="layer"
         id="layer1"
         transform="translate(0,-289.0625)">
        <path
           style="opacity:1;fill:#000000;fill-opacity:1;stroke:none;stroke-width:2;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
           d="M 6 4 C 4.892 4 4 4.892 4 6 L 4 14 L 14 14 L 14 4 L 6 4 z M 16 4 L 16 14 L 26 14 L 26 6 C 26 4.892 25.108 4 24 4 L 16 4 z M 4 16 L 4 24 C 4 25.108 4.892 26 6 26 L 14 26 L 14 16 L 4 16 z M 16 16 L 16 26 L 24 26 C 25.108 26 26 25.108 26 24 L 26 16 L 16 16 z "
           transform="translate(0,289.0625)"
           id="rect888" />
      </g>
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
    btn_div.addEventListener("mouseover", function() {
        btn_div.style.backgroundColor = "";
      });
    
      // 滑鼠移出時的事件處理器
      btn_div.addEventListener("mouseout", function() {
        btn_div.style.backgroundColor = backgroundColor;
      });
    
    div.appendChild(svg);
    btn_div.appendChild(div);
    
    return btn_div;
}
function Get_next_SVG(btn_width ,btn_height, svg_width, svg_height ,strokeColor, backgroundColor)
{
    const btn_div = document.createElement("div");
    const div = document.createElement("div");
    btn_div.style.width = btn_width;
    btn_div.style.height= btn_height; 

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.innerHTML = `<?xml version="1.0" encoding="utf-8"?>
    <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
    <svg width="100%" height="100%" viewBox="0 0 1024 1024" class="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path d="M364.8 106.666667L298.666667 172.8 637.866667 512 298.666667 851.2l66.133333 66.133333L768 512z" fill="#2196F3" /></svg>`;
    
    
  
    svg.setAttribute("class", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");

    div.style.width = svg_width;
    div.style.height = svg_height;
 
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    div.style.margin = "auto";   
    btn_div.style.backgroundColor = backgroundColor;
    btn_div.addEventListener("mouseover", function() 
    {
      btn_div.style.backgroundColor = "";
    });
  
    // 滑鼠移出時的事件處理器
    btn_div.addEventListener("mouseout", function() 
    {
      btn_div.style.backgroundColor = '';
    });
    
    div.appendChild(svg);
    btn_div.appendChild(div);
    
    return btn_div;
}
function Get_previous_SVG(btn_width ,btn_height, svg_width, svg_height ,strokeColor, backgroundColor)
{
    const btn_div = document.createElement("div");
    const div = document.createElement("div");
    btn_div.style.width = btn_width;
    btn_div.style.height= btn_height; 

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.innerHTML = `<?xml version="1.0" encoding="utf-8"?>
    <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
    <svg width="100%" height="100%" viewBox="0 0 1024 1024" class="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg">
    <path d="M659.2 917.333333l66.133333-66.133333L386.133333 512 725.333333 172.8 659.2 106.666667 256 512z" fill="#2196F3" /></svg>`;
    
    
  
    svg.setAttribute("class", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");

    div.style.width = svg_width;
    div.style.height = svg_height;
 
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    div.style.margin = "auto";   
    btn_div.style.backgroundColor = backgroundColor;
    btn_div.addEventListener("mouseover", function() 
    {
      btn_div.style.backgroundColor = "";
    });
  
    // 滑鼠移出時的事件處理器
    btn_div.addEventListener("mouseout", function()
    {
       btn_div.style.backgroundColor = '';
    });
 
    div.appendChild(svg);
    btn_div.appendChild(div);
    
    return btn_div;
}
function Get_confirm_SVG(btn_width ,btn_height, svg_width, svg_height ,strokeColor, backgroundColor)
{
    const btn_div = document.createElement("div");
    const div = document.createElement("div");
    btn_div.style.width = btn_width;
    btn_div.style.height= btn_height; 

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.innerHTML = `<?xml version="1.0" encoding="utf-8"?>

    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
    <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
    <svg fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
       width="100%" height="100%" viewBox="0 0 72 72" enable-background="new 0 0 72 72" xml:space="preserve">
    <g>
      <path fill ="${strokeColor}"  d="M24.014,70.462c-2.617,0-5.073-1.016-6.917-2.859L2.175,53.877c-1.908-1.906-2.926-4.364-2.926-6.979
        s1.018-5.072,2.866-6.92c1.849-1.849,4.307-2.866,6.921-2.866c2.591,0,5.029,1,6.872,2.818l8.102,7.109L55.861,4.618
        c0.057-0.075,0.119-0.146,0.186-0.213c1.849-1.85,4.307-2.867,6.921-2.867s5.072,1.018,6.921,2.867
        c3.784,3.784,3.815,9.923,0.093,13.747L31.697,67.416c-0.051,0.065-0.106,0.128-0.165,0.188c-1.914,1.912-4.498,2.926-7.214,2.854
        C24.216,70.46,24.116,70.462,24.014,70.462z M9.037,41.112c-1.546,0-2.999,0.602-4.093,1.695C3.851,43.9,3.25,45.353,3.25,46.898
        s0.602,3,1.694,4.093l14.922,13.726c1.148,1.146,2.6,1.914,4.148,1.914l0.227,0.164c0.05,0,0.1,0,0.151,0l0.221-0.164
        c1.51,0,2.929-0.654,4.008-1.69l38.275-49.294c0.051-0.065,0.105-0.148,0.165-0.207c2.256-2.258,2.256-5.939,0-8.195
        c-1.094-1.094-2.547-1.701-4.093-1.701c-1.502,0-2.917,0.566-3.999,1.602L25.914,51.169c-0.335,0.445-0.84,0.73-1.394,0.787
        c-0.551,0.057-1.106-0.118-1.525-0.486l-9.771-8.573c-0.032-0.028-0.064-0.058-0.095-0.089
        C12.036,41.714,10.583,41.112,9.037,41.112z"/>
    </g>
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
    btn_div.addEventListener("mouseover", function() {
        btn_div.style.backgroundColor = "";
      });
    
      // 滑鼠移出時的事件處理器
      btn_div.addEventListener("mouseout", function() {
        btn_div.style.backgroundColor = '';
      });
    
    div.appendChild(svg);
    btn_div.appendChild(div);
    
    return btn_div;
}
function Get_undo_SVG(btn_width ,btn_height, svg_width, svg_height ,strokeColor, backgroundColor)
{
    const btn_div = document.createElement("div");
    const div = document.createElement("div");
    btn_div.style.width = btn_width;
    btn_div.style.height= btn_height; 

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.innerHTML = `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
    <svg fill="#000000" width="100%" height="100%" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <path fill ="${strokeColor}" d="M30.939 29.448c-0.011 0-0.023 0-0.034-0.001-0.506-0.017-0.825-0.409-0.868-0.913-0.034-0.371-1.061-9.347-15.070-9.337v5.739c0 0.387-0.223 0.739-0.573 0.904-0.347 0.166-0.764 0.115-1.062-0.132l-12.968-10.743c-0.233-0.191-0.366-0.475-0.365-0.774s0.136-0.584 0.368-0.774l12.967-10.643c0.299-0.244 0.712-0.291 1.061-0.128 0.348 0.166 0.572 0.518 0.572 0.903v5.614c5.811 0.184 10.344 2.053 13.261 5.468 4.748 5.556 3.688 13.63 3.639 13.966-0.074 0.489-0.433 0.849-0.927 0.849zM13.967 17.182l0.002-0c10.007 0.006 13.831 3.385 16.014 6.369-0.32-2.39-1.252-5.273-3.282-7.626-2.698-3.128-7.045-4.777-12.735-4.777-0.553 0-1-0.447-1-1v-4.493l-10.389 8.543 10.389 8.622v-4.637c0-0.265 0.105-0.52 0.294-0.708 0.188-0.187 0.441-0.293 0.707-0.293z"></path>
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
    btn_div.addEventListener("mouseover", function() {
        btn_div.style.backgroundColor = "";
      });
    
      // 滑鼠移出時的事件處理器
      btn_div.addEventListener("mouseout", function() {
        btn_div.style.backgroundColor = '';
      });
    
    div.appendChild(svg);
    btn_div.appendChild(div);
    
    return btn_div;
}
function Get_pill_SVG(btn_width ,btn_height, svg_width, svg_height ,strokeColor, backgroundColor)
{
    const btn_div = document.createElement("div");
    const div = document.createElement("div");
    btn_div.style.width = btn_width;
    btn_div.style.height= btn_height; 

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.innerHTML = `<?xml version="1.0" ?><svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><rect fill="none" height="100%" width="100%"/><path d="M112,208a45.2,45.2,0,0,1-64,0h0a45.2,45.2,0,0,1,0-64L96,96l64,64Z" opacity="0.2"/><rect fill="none" height="90.51" rx="45.3" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" transform="translate(-53 128) rotate(-45)" width="226.3" x="14.9" y="82.7"/><line fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" x1="96" x2="160" y1="96" y2="160"/><line fill="none" 
    fill="${strokeColor}" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" x1="160.1" x2="184.5" y1="112.1" y2="88.5"/></svg>`;
    
    
  
    svg.setAttribute("class", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");

    div.style.width = svg_width;
    div.style.height = svg_height;
 
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    div.style.margin = "auto";   
    btn_div.style.backgroundColor = backgroundColor;
    btn_div.addEventListener("mouseover", function() {
        btn_div.style.backgroundColor = "";
      });
    
      // 滑鼠移出時的事件處理器
      btn_div.addEventListener("mouseout", function() {
        btn_div.style.backgroundColor = backgroundColor;
      });
    
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
    svg.innerHTML = `<?xml version="1.0" ?><svg color="${backgroundColor}"  width="100%" height="100%" viewBox="0 0 512 512" 
    xmlns="http://www.w3.org/2000/svg"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" 
    fill="${strokeColor}" stroke-width="0" /></svg>`; 
    
    
  
    svg.setAttribute("class", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");

    div.style.width = svg_width;
    div.style.height = svg_height;
 
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    div.style.margin = "auto";   
    btn_div.style.backgroundColor = backgroundColor;
    btn_div.addEventListener("mouseover", function() {
        btn_div.style.backgroundColor = "";
      });
    
      // 滑鼠移出時的事件處理器
      btn_div.addEventListener("mouseout", function() {
        btn_div.style.backgroundColor = backgroundColor;
      });
    
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
    <svg fill=${backgroundColor} width="100%" height="100%" viewBox="-3 0 19 19" xmlns="http://www.w3.org/2000/svg" class="cf-icon-svg"><path d="M11.882 3.187a.476.476 0 0 1 .475.475v11.063a.476.476 0 0 1-.475.475H1.118a.476.476 0 0 1-.475-.475V3.662a.476.476 0 0 1 .475-.475h1.328v.721a1.425 1.425 0 0 0 2.85 0v-.72H7.71v.72a1.425 1.425 0 0 0 2.85 0v-.72zm-.634 3.37H1.752v7.535h9.496zm-7.384.821H2.621V8.67h1.243zm0 2.292H2.621v1.292h1.243zm0 2.292H2.621v1.291h1.243zm.561-8.054V2.475a.554.554 0 1 0-1.108 0v1.433a.554.554 0 1 0 1.108 0zm1.613 3.47H4.794V8.67h1.244zm0 2.292H4.794v1.292h1.244zm0 2.292H4.794v1.291h1.244zm2.174-4.584H6.968V8.67h1.244zm0 2.292H6.968v1.292h1.244zm0 2.292H6.968v1.291h1.244zm1.477-8.054V2.475a.554.554 0 0 0-1.108 0v1.433a.554.554 0 0 0 1.108 0zm.696 3.47H9.142V8.67h1.243zm0 2.292H9.142v1.292h1.243zm0 2.292H9.142v1.291h1.243z"
     stroke="${strokeColor}" stroke-width="0.3"/></svg>`;
    
    
  
    svg.setAttribute("class", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");

    div.style.width = svg_width;
    div.style.height = svg_height;
 
    div.style.justifyContent = "center";
    div.style.alignItems = "center";
    div.style.margin = "auto";   
    btn_div.style.backgroundColor = backgroundColor;
    btn_div.addEventListener("mouseover", function() {
        btn_div.style.backgroundColor = "";
      });
    
      // 滑鼠移出時的事件處理器
      btn_div.addEventListener("mouseout", function() {
        btn_div.style.backgroundColor = backgroundColor;
      });
    
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
    btn_div.addEventListener("mouseover", function() {
        btn_div.style.backgroundColor = "";
      });
    
      // 滑鼠移出時的事件處理器
      btn_div.addEventListener("mouseout", function() {
        btn_div.style.backgroundColor = backgroundColor;
      });
    
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
    btn_div.addEventListener("mouseover", function() {
        btn_div.style.backgroundColor = "";
      });
    
      // 滑鼠移出時的事件處理器
      btn_div.addEventListener("mouseout", function() {
        btn_div.style.backgroundColor = backgroundColor;
      });
    
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
    btn_div.addEventListener("mouseover", function() {
        btn_div.style.backgroundColor = "";
      });
    
      // 滑鼠移出時的事件處理器
      btn_div.addEventListener("mouseout", function() {
        btn_div.style.backgroundColor = backgroundColor;
      });
    
    div.appendChild(svg);
    btn_div.appendChild(div);
    
    return btn_div;
}

function Get_licenselock_SVG(btn_width ,btn_height, svg_width, svg_height ,strokeColor, backgroundColor)
{
    const btn_div = document.createElement("div");
    const div = document.createElement("div");
    btn_div.style.width = btn_width;
    btn_div.style.height= btn_height; 

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.innerHTML = `<?xml version="1.0" encoding="utf-8"?>
    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="Interface / Lock">
    <path id="" d="M9.23047 9H7.2002C6.08009 9 5.51962 9 5.0918 9.21799C4.71547 9.40973 4.40973 9.71547 4.21799 10.0918C4 10.5196 4 11.0801 4 12.2002V17.8002C4 18.9203 4 19.4801 4.21799 19.9079C4.40973 20.2842 4.71547 20.5905 5.0918 20.7822C5.5192 21 6.07902 21 7.19694 21H16.8031C17.921 21 18.48 21 18.9074 20.7822C19.2837 20.5905 19.5905 20.2842 19.7822 19.9079C20 19.4805 20 18.9215 20 17.8036V12.1969C20 11.079 20 10.5192 19.7822 10.0918C19.5905 9.71547 19.2837 9.40973 18.9074 9.21799C18.4796 9 17.9203 9 16.8002 9H14.7689M9.23047 9H14.7689M9.23047 9C9.10302 9 9 8.89668 9 8.76923V6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6V8.76923C15 8.89668 14.8964 9 14.7689 9" 
    stroke="${strokeColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
    </svg>`;
    svg.setAttribute("stroke", strokeColor);
    // svg.setAttribute("fill", "none");
    svg.setAttribute("stroke-width", "1.5");
    svg.setAttribute("viewBox", `0 0 24 24`);
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("class", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");

    div.style.width = svg_width;
    div.style.height = svg_height;
 
    // div.style.justifyContent = "center";
    // div.style.alignItems = "center";
    // div.style.margin = "auto";   
    // btn_div.style.backgroundColor = backgroundColor;
    // btn_div.addEventListener("mouseover", function() {
    //     btn_div.style.backgroundColor = "";
    //   });
    
    //   // 滑鼠移出時的事件處理器
    //   btn_div.addEventListener("mouseout", function() {
    //     btn_div.style.backgroundColor = backgroundColor;
    //   });
    
    div.appendChild(svg);
    btn_div.appendChild(div);
    
    return btn_div;
}

function Get_lock_SVG(btn_width ,btn_height, svg_width, svg_height ,strokeColor, backgroundColor)
{
    const btn_div = document.createElement("button");
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
    btn_div.addEventListener("mouseover", function() {
        btn_div.style.backgroundColor = "";
      });
    
      // 滑鼠移出時的事件處理器
      btn_div.addEventListener("mouseout", function() {
        btn_div.style.backgroundColor = backgroundColor;
      });
    
    div.appendChild(svg);
    btn_div.appendChild(div);
    
    return btn_div;
}
function Get_unlock_SVG(btn_width ,btn_height, svg_width, svg_height ,strokeColor, backgroundColor)
{
    const btn_div = document.createElement("button");
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
    btn_div.addEventListener("mouseover", function() {
        btn_div.style.backgroundColor = "";
      });
    
      // 滑鼠移出時的事件處理器
      btn_div.addEventListener("mouseout", function() {
        btn_div.style.backgroundColor = backgroundColor;
      });
    
    div.appendChild(svg);
    btn_div.appendChild(div);
    
    return btn_div;
}
function Get_right_direction_SVG(btn_width ,btn_height, svg_width, svg_height ,strokeColor, backgroundColor, clickOn)
{
    const btn_div = document.createElement("button");
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
    if(clickOn == undefined) clickOn =true;
    if(clickOn)
    {
      btn_div.addEventListener("mouseover", function() 
      {
          btn_div.style.backgroundColor = "";
      });
      
      // 滑鼠移出時的事件處理器
      btn_div.addEventListener("mouseout", function() 
      {
        btn_div.style.backgroundColor = backgroundColor;
      });
    }
  
    
    div.appendChild(svg);
    btn_div.appendChild(div);
    
    return btn_div;
}
function Get_download_SVG(btn_width ,btn_height, svg_width, svg_height ,strokeColor, backgroundColor)
{
    const btn_div = document.createElement("button");
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
    btn_div.addEventListener("mouseover", function() {
        btn_div.style.backgroundColor = "";
      });
    
      // 滑鼠移出時的事件處理器
      btn_div.addEventListener("mouseout", function() {
        btn_div.style.backgroundColor = backgroundColor;
      });
    
    div.appendChild(svg);
    btn_div.appendChild(div);
    
    return btn_div;
    
}

function Get_trashBox_SVG(btn_width ,btn_height, svg_width, svg_height ,strokeColor, backgroundColor)
{
    const btn_div = document.createElement("button");
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
    btn_div.addEventListener("mouseover", function() {
        btn_div.style.backgroundColor = "";
      });
    
      // 滑鼠移出時的事件處理器
      btn_div.addEventListener("mouseout", function() {
        btn_div.style.backgroundColor = backgroundColor;
      });
    
    div.appendChild(svg);
    btn_div.appendChild(div);
    
    return btn_div;
}