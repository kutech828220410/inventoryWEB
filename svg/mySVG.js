function Get_user_SVG(btn_width ,btn_height, svg_width, svg_height ,strokeColor, backgroundColor)
{
    const btn_div = document.createElement("div");
    const div = document.createElement("div");
    btn_div.style.width = btn_width;
    btn_div.style.height= btn_height; 

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.innerHTML = `<?xml version="1.0" ?><svg height="100%" viewBox="0 0 64 64" width="100%" xmlns="http://www.w3.org/2000/svg"><title/><g data-name="set-016@pharmacist-white-female" id="baa4aa63-f125-4fbc-b4b4-f6787177c7ce"><g data-name="pharmacist-white-female" id="f2949e92-5b86-4827-a571-f5926b26849a"><g data-name="pharmacist-white-female-2" id="f51463ec-32d0-4de3-bd3d-1ae48a21e347"><g data-name="Icons" id="becc3f02-52a5-4c6d-b04d-d8750ed8be4b"><path d="M45.73,22V34.75a6,6,0,0,1-6,6h-16a6,6,0,0,1-6-6V22a14,14,0,1,1,28,0Z" fill="#c1ad8b"/><path d="M45.73,34.75V22A14,14,0,0,0,32.88,8.05a13.921,13.921,0,0,0-13,14v12.7a6,6,0,0,0,6,6H39.73A6,6,0,0,0,45.73,34.75Z" fill="#ad9a76"/><path d="M10.14,38.2h0a2.119,2.119,0,0,1-2.08-2.08V31.88a2.119,2.119,0,0,1,2.08-2.08h0a2.119,2.119,0,0,1,2.08,2.08v4.24A2.119,2.119,0,0,1,10.14,38.2Z" fill="#c66161"/><path d="M10.14,29.8a2.119,2.119,0,0,0-2.08,2.08V34h4.16V31.88A2.119,2.119,0,0,0,10.14,29.8Z" fill="#4ba6dd"/><path d="M9.68,32.6v4.24a2,2,0,0,0,.52,1.34,2.119,2.119,0,0,0,2-2.07V31.87a2,2,0,0,0-.52-1.34A2.119,2.119,0,0,0,9.68,32.6Z" fill="#b74242"/><path d="M9.68,32.6V34h2.54V31.88a2,2,0,0,0-.52-1.34A2.1,2.1,0,0,0,9.68,32.6Z" fill="#2f8dd3"/><path d="M10.14,38.2h0a2.119,2.119,0,0,1-2.08-2.08V31.88a2.119,2.119,0,0,1,2.08-2.08h0a2.119,2.119,0,0,1,2.08,2.08v4.24A2.119,2.119,0,0,1,10.14,38.2Z" fill="none" stroke="#333" stroke-linejoin="round"/><circle cx="52.36" cy="33.96" fill="#ddd" r="3.04"/><line fill="none" stroke="#aaa" stroke-linejoin="round" x1="54.51" x2="50.21" y1="31.81" y2="36.11"/><line fill="none" stroke="#eee" stroke-linejoin="round" stroke-width="0.5" x1="55" x2="50.7" y1="32.07" y2="36.37"/><circle cx="52.36" cy="33.96" fill="none" r="3.04" stroke="#333" stroke-linejoin="round"/><path d="M55.21,49.27A5.49,5.49,0,0,0,51,44.87c-3.8-.73-7.62-1.57-13.12-2.6V38H25.56v4.27c-5.4,1-9.47,1.78-13.06,2.61a5.621,5.621,0,0,0-4.19,4.4L8,51.15c1.22.74,12,5.17,23.83,5a59,59,0,0,0,23.63-5Z" fill="#e5c2ba"/><path d="M25.56,38v1.24l5,5.18a4.069,4.069,0,0,1,1.15,2.85,2.629,2.629,0,0,0,2.63,2.63h.52a3,3,0,0,0,3-3V38Z" fill="#d8b3ad"/><polyline fill="none" points="25.56 44.14 25.56 38 37.9 38 37.9 44.14" stroke="#333" stroke-linejoin="round" stroke-width="1.5"/><path d="M25.56,42.27c-5.4,1-9.47,1.78-13.06,2.61a5.621,5.621,0,0,0-4.19,4.4L8,51.15c1.22.74,12,5.17,23.83,5a59,59,0,0,0,23.63-5l-.25-1.9A5.49,5.49,0,0,0,51,44.87c-3.8-.73-7.62-1.57-13.12-2.6" fill="none" stroke="#333" stroke-linejoin="round" stroke-width="1.5"/><path d="M55.21,49.27A5.49,5.49,0,0,0,51,44.87c-3.8-.73-7.62-1.57-13.12-2.6h-.1a13.169,13.169,0,0,1-6,8.95,13.13,13.13,0,0,1-6-8.95h-.3c-5.4,1-9.47,1.78-13.06,2.61a5.621,5.621,0,0,0-4.19,4.4L8,51.15c1.22.74,12,5.17,23.83,5a59,59,0,0,0,23.63-5Z" fill="#dae4e8"/><path d="M23.15,42.71c-4.23.79-7.62,1.47-10.65,2.16a5.621,5.621,0,0,0-4.19,4.4L8,51.15a57.133,57.133,0,0,0,16.85,4.62A45,45,0,0,1,23.15,42.71Z" fill="#eee"/><path d="M38.83,55.68a55.332,55.332,0,0,0,16.62-4.51l-.25-1.9a5.489,5.489,0,0,0-4.2-4.4c-3.17-.61-6.36-1.29-10.51-2.1A44.871,44.871,0,0,1,38.83,55.68Z" fill="#eee"/><path d="M51,47.71C40.42,45.59,37,45.1,37,45.1a13.064,13.064,0,0,1-5.13,6.11A13.071,13.071,0,0,1,26.7,45.1s-10,1.64-14.2,2.61a5.54,5.54,0,0,0-4,3.7,60.007,60.007,0,0,0,23.32,4.76A60.95,60.95,0,0,0,55,51.4,5.4,5.4,0,0,0,51,47.71Z" fill="#bcdaf7"/><path d="M40.75,44.39l-3-2.12c-.73,5.39-5.82,8.84-6,8.95v.84A9.906,9.906,0,0,0,36,50.39l4.76,2.87V44.39Z" fill="#91acc1"/><path d="M25.82,42.07l-2.91,2.32v8.88l6.64-3.9C28,47.25,26.25,45.24,25.82,42.07Z" fill="#91acc1"/><path d="M38.84,55.68A58.807,58.807,0,0,0,55,51.4a5.4,5.4,0,0,0-4-3.69c-3.19-.61-6.41-1.3-10.6-2.12A40.8,40.8,0,0,1,38.84,55.68Z" fill="#ddd"/><path d="M23.24,45.53C19,46.33,15.55,47,12.5,47.71a5.54,5.54,0,0,0-4,3.7,60.426,60.426,0,0,0,16.35,4.36A39.487,39.487,0,0,1,23.24,45.53Z" fill="#ddd"/><path d="M25.56,42.27c-5.4,1-9.47,1.78-13.06,2.61a5.621,5.621,0,0,0-4.19,4.4L8,51.15c1.22.74,12,5.17,23.83,5a59,59,0,0,0,23.63-5l-.25-1.9A5.49,5.49,0,0,0,51,44.87c-3.8-.73-7.62-1.57-13.12-2.6" fill="none" stroke="#333" stroke-linejoin="round" stroke-width="1.5"/><line fill="none" stroke="#333" stroke-linejoin="round" stroke-width="1.5" x1="31.83" x2="31.83" y1="51.21" y2="56.17"/><path d="M17.63,54.18l.36.34a61.82,61.82,0,0,0,6.86,1.24c-1.12-3.51-1.64-7.63-1.71-13.47L16.46,48l3.86,2.72Z" fill="#ddd" stroke="#333" stroke-linejoin="round" stroke-width="1.527"/><path d="M45.77,54.43l.27-.25-2.7-3.5L47.2,48l-6.68-5.67c-.07,5.79-.58,9.89-1.68,13.39A64.909,64.909,0,0,0,45.77,54.43Z" fill="#ddd" stroke="#333" stroke-linejoin="round" stroke-width="1.527"/><path d="M38.13,40.25l2.62,2.09v8.88L35.5,48.09C37.06,46,37.7,43.42,38.13,40.25Z" fill="#bcdaf7"/><path d="M25.53,40.25l-2.62,2.09v8.88l5.25-3.13C26.6,46,26,43.42,25.53,40.25Z" fill="#bcdaf7"/><path d="M28.15,48.08,22.9,51.21V42.33l2.62-2.09h0c.62,5.2,2.4,8.31,6.3,11,3.9-2.66,5.68-5.77,6.3-11h0l2.62,2.09v8.88l-5.25-3.13" fill="none" stroke="#333" stroke-linejoin="round" stroke-width="1.5"/><path d="M42.23,24V22c0-5.41-2.46-10-10.5-10s-10.5,4.59-10.5,10v2c-1.73,0-2.28,1.71-2,4,.24,1.95,1,4,3,4,0,3,1.74,6.37,5.18,8.76,2.18,1.51,3.11,1.74,4.32,1.74s2.26-.07,4.32-1.74C39,38.37,41.23,35,41.23,32c2,0,2.76-2.05,3-4C44.51,25.71,44,24,42.23,24Z" fill="#edccc3"/><path d="M42.23,24V22c0-5.41-2.46-10-10.5-10a16.8,16.8,0,0,0-2.66.2V22.8a3.9,3.9,0,0,1-1.27,2.88.45.45,0,0,0,.2.77,2.582,2.582,0,0,1,1.88,1.88.49.49,0,0,0,.583.375.5.5,0,0,0,.187-.085,1.745,1.745,0,0,1,.58-.32.49.49,0,0,1,.595.355.528.528,0,0,1,.015.125v1.61a1.11,1.11,0,0,0,.62.94c.57.31.18,1.4-.64,1.4a1.691,1.691,0,0,1-.89-.22c-.74-.37-1.43.39-1.27.68s.34,0,1.08.35a2.658,2.658,0,0,0,1.1.27v4.13a.4.4,0,0,0,.31.38c1.31.31,2,2.49-.31,3h0a1.25,1.25,0,0,0-1,1.16,5.667,5.667,0,0,0,.92.07c1.21,0,2.26-.07,4.32-1.74C39,38.39,41.23,35,41.23,32c2,0,2.76-2.05,3-4C44.51,25.71,44,24,42.23,24Z" fill="#e5c2ba"/><path d="M40.69,26.69c-2.43-.39-6.24-.38-8.15.57a2.542,2.542,0,0,0-1.59,0c-.1-.06-3.16-1.4-8.19-.6a.52.52,0,0,0-.44.51v.52a.559.559,0,0,0,.15.37l.51.51a13.411,13.411,0,0,0,.4,1.87.53.53,0,0,0,.27.32,10.179,10.179,0,0,0,4.05.79,8.871,8.871,0,0,0,2.06-.23.551.551,0,0,0,.34-.27,12.663,12.663,0,0,0,1-2.72,1.44,1.44,0,0,1,1.25-.05,13.061,13.061,0,0,0,1,2.77.51.51,0,0,0,.34.27,8.351,8.351,0,0,0,2.06.23,10.262,10.262,0,0,0,4-.79.51.51,0,0,0,.27-.32,12.181,12.181,0,0,0,.4-1.87l.51-.51a.512.512,0,0,0,.15-.37V27.2A.5.5,0,0,0,40.69,26.69Z" fill="#ddb7af"/><path d="M43.42,24.41A1.843,1.843,0,0,0,42.23,24V22c0-5.41-2.46-10-10.5-10s-10.5,4.59-10.5,10v2a2,2,0,0,0-.66.11,20.929,20.929,0,0,1,1.66,4.39c0,.12.4.23.53.23A.25.25,0,0,0,23,28.5c.24-4.89.29-7.28,2.24-9.75,4.1,6.26,14.46,5.06,14.46,10a.59.59,0,0,0,1.17.05,3.71,3.71,0,0,1,.82-2A19.6,19.6,0,0,1,43.42,24.41Z" fill="#e5c2ba"/><path d="M43.42,24.41h0a1.927,1.927,0,0,0-.23-.16,1.219,1.219,0,0,0-.31-.14h-.15a2.011,2.011,0,0,0-.5-.07V22c0-5.41-2.46-10-10.5-10a12.549,12.549,0,0,0-1.39.05c-.44.05-.86.08-1.27.14h0v10c4.67,2.62,10.64,2.83,10.64,6.56a.59.59,0,0,0,1.17.05,3.71,3.71,0,0,1,.82-2A20.405,20.405,0,0,1,43.42,24.41Z" fill="#d8b5af"/><path d="M23.65,26a3.867,3.867,0,0,1,1.43-.53,5.162,5.162,0,0,1,1.52,0c.5.07,1,.19,1.45.3a9.723,9.723,0,0,0,1.34.28h0a.532.532,0,1,1-.1,1.06h-.07a11.563,11.563,0,0,1-1.44-.5,11.634,11.634,0,0,0-1.32-.47,3.08,3.08,0,0,0-2.62.18.19.19,0,0,1-.22-.3Z" fill="#333"/><path d="M39.6,26.3a2.119,2.119,0,0,0-1.27-.37,4.384,4.384,0,0,0-1.34.21c-.44.13-.88.3-1.33.48a9.775,9.775,0,0,1-1.45.49.53.53,0,1,1-.23-1h.08a9.414,9.414,0,0,0,1.33-.26c.47-.12,1-.23,1.45-.31a5.527,5.527,0,0,1,1.52,0A4.159,4.159,0,0,1,39.8,26a.19.19,0,1,1-.19.33A.049.049,0,0,0,39.6,26.3Z" fill="#333"/><path d="M29.8,33.87c1,0,1,.51,2,.51s1-.51,2-.51" fill="none" stroke="#d8b5af" stroke-linecap="round" stroke-miterlimit="10" stroke-width="0.5"/><line fill="none" stroke="#d8b5af" stroke-linecap="round" stroke-miterlimit="10" stroke-width="0.5" x1="31.8" x2="31.8" y1="34.22" y2="34.97"/><line fill="none" stroke="#d8b5af" stroke-linecap="round" stroke-miterlimit="10" stroke-width="0.5" x1="28.85" x2="28.35" y1="36.32" y2="37.32"/><line fill="none" stroke="#d8b5af" stroke-linecap="round" stroke-miterlimit="10" stroke-width="0.5" x1="34.85" x2="35.35" y1="36.32" y2="37.32"/><path d="M29.85,33.38c1,0,1,.5,2,.5s1-.5,2-.5" fill="none" stroke="#ba8d86" stroke-linecap="round" stroke-miterlimit="10" stroke-width="0.75"/><path d="M42.23,24V22c0-5.41-2.46-10-10.5-10s-10.5,4.59-10.5,10v2c-1.73,0-2.28,1.71-2,4,.24,1.95,1,4,3,4,0,3,1.74,6.37,5.18,8.76,2.18,1.51,3.11,1.74,4.32,1.74s2.26-.07,4.32-1.74C39,38.37,41.23,35,41.23,32c2,0,2.76-2.05,3-4C44.51,25.71,44,24,42.23,24Z" fill="none" stroke="#343433" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M32.63,35.61a1.841,1.841,0,0,1-.78.2c-.2,0-.22,0-.68-.2-.8-.32-.85.66-2.33,1.2l.92.94a2.149,2.149,0,0,0,1.55.56h1a2.5,2.5,0,0,0,1.67-.6l.86-.9C33.43,36.3,33.43,35.3,32.63,35.61Z" fill="#a56659"/><path d="M34.84,36.81c-1,0-1.49-.49-3,0h0c-1.48-.5-2,0-3,0" fill="none" stroke="#743f40" stroke-linecap="round" stroke-miterlimit="10" stroke-width="0.5"/><path d="M45.7,21.4a14,14,0,0,0-27.93-.06,7.436,7.436,0,0,0,.9,1.57c1.49,2,3.56,2.94,3.56,5.59V23a10.368,10.368,0,0,1,3-7c3,7.3,15.5,6.28,15.5,11.5V29C41.28,25.45,44.05,24,45.7,21.4Z" fill="#c1ad8b"/><path d="M45.7,21.4a14,14,0,0,0-6.34-11.12A14,14,0,0,0,19.84,22.45v1.79c1.22,1.24,2.39,2.27,2.39,4.26V23a10.368,10.368,0,0,1,3-7c3,7.3,15.5,6.28,15.5,11.5V29C41.28,25.45,44.05,24,45.7,21.4Z" fill="#ad9a76"/><path d="M25.76,16.53A9.64,9.64,0,0,0,23.86,19a9.308,9.308,0,0,0-.93,3,56.749,56.749,0,0,0-.3,6.57h0a.389.389,0,0,1-.4.38H22.22a.4.4,0,0,1-.38-.35,8.723,8.723,0,0,0-.32-1.39,7.774,7.774,0,0,0-.52-1.4,5.62,5.62,0,0,0-2-2.11h0a.229.229,0,0,1-.079-.315l.009-.015a.241.241,0,0,1,.32-.08,6.231,6.231,0,0,1,2.22,2.2,9.109,9.109,0,0,1,.69,1.41,8.127,8.127,0,0,1,.43,1.53l-.79.05a57.944,57.944,0,0,1,0-6.72,10.493,10.493,0,0,1,.88-3.4,11.016,11.016,0,0,1,2-2.91.75.75,0,1,1,1.258.817.732.732,0,0,1-.168.183A.111.111,0,0,1,25.76,16.53Z" fill="#937e60"/><path d="M27,12.78a13.674,13.674,0,0,0,3.13,3,19.074,19.074,0,0,0,3.88,2,28.374,28.374,0,0,1,4.13,2A9.688,9.688,0,0,1,41.52,23a.34.34,0,0,1-.115.467l-.005,0a.35.35,0,0,1-.44-.07,10,10,0,0,0-3.42-2.58c-1.3-.63-2.73-1.06-4.13-1.68a17.717,17.717,0,0,1-4-2.38,12.394,12.394,0,0,1-3-3.61.329.329,0,0,1,.122-.45l.018-.01a.359.359,0,0,1,.45.1Z" fill="#937e60"/><circle cx="21.52" cy="32.54" fill="#dee6ea" r="0.75"/><circle cx="21.29" cy="32.32" fill="#ecf3f4" r="0.27"/><circle cx="42.15" cy="32.54" fill="#dee6ea" r="0.75"/><circle cx="41.99" cy="32.32" fill="#ecf3f4" r="0.27"/><path d="M24.73,14.4A7.769,7.769,0,0,0,26,17.57L27.45,16l-1.36-2.1Z" fill="#ad9a76"/><path d="M25,13.85a8.189,8.189,0,0,0,2.7,4.77,16.13,16.13,0,0,0,5,2.58,28.435,28.435,0,0,1,5.59,2.3,6.845,6.845,0,0,1,2.3,2.33A6,6,0,0,1,41.32,29l-.59-.59-.58.5a7.9,7.9,0,0,1,1.4-3.22,19.324,19.324,0,0,1,2.27-2.48.351.351,0,0,1,.49,0,.341.341,0,0,1,0,.46,25.622,25.622,0,0,0-2,2.56,6.8,6.8,0,0,0-1,2.86.59.59,0,0,1-1.17-.05h0a4.786,4.786,0,0,0-.71-2.48,5.543,5.543,0,0,0-1.91-1.74,43.758,43.758,0,0,0-5.3-2.26A15.824,15.824,0,0,1,27,19.47a8.186,8.186,0,0,1-1.82-2.54,10.081,10.081,0,0,1-.8-3,.34.34,0,0,1,.3-.379h0a.33.33,0,0,1,.36.27Z" fill="#937e60"/><path d="M32.79,27.36a11.2,11.2,0,0,0,1.06,3.19A10.063,10.063,0,0,0,39.7,30a16.081,16.081,0,0,0,.52-3.27A15.245,15.245,0,0,0,32.79,27.36Z" fill="#f2dbd7"/><path d="M34.77,30.71c-.46-1.12-1-2.45-1.07-2.81a20.085,20.085,0,0,1,6.44-.38,2.871,2.871,0,0,1,.07-.77,15.254,15.254,0,0,0-7.43.61,11.2,11.2,0,0,0,1.06,3.19A5.968,5.968,0,0,0,34.77,30.71Z" fill="#edccc3"/><path d="M30.67,27.36a11.2,11.2,0,0,1-1.06,3.19A10.063,10.063,0,0,1,23.76,30a16.081,16.081,0,0,1-.52-3.27A15.245,15.245,0,0,1,30.67,27.36Z" fill="#f2dbd7"/><path d="M23.24,26.75A16.251,16.251,0,0,0,23.76,30a6.016,6.016,0,0,0,.93.34,26.764,26.764,0,0,1-.55-2.89,14.886,14.886,0,0,1,6.18.62l.19.05a4.235,4.235,0,0,0,.16-.78A15.252,15.252,0,0,0,23.24,26.75Z" fill="#edccc3"/><path d="M30.58,27.7a2,2,0,0,1,2.4,0" fill="none" stroke="#333" stroke-miterlimit="10" stroke-width="1.063"/><path d="M23.22,26.83A14.8,14.8,0,0,0,23.75,30a10.052,10.052,0,0,0,5.85.53,10.864,10.864,0,0,0,1.06-3.19,15.313,15.313,0,0,0-8-.53v.53l.53.53" fill="none" stroke="#333" stroke-linejoin="round" stroke-width="1.063"/><path d="M40.24,26.83A14.8,14.8,0,0,1,39.71,30a10.052,10.052,0,0,1-5.85.53,10.864,10.864,0,0,1-1.06-3.19,15.313,15.313,0,0,1,8-.53v.53l-.53.53" fill="none" stroke="#333" stroke-linejoin="round" stroke-width="1.063"/><path d="M34.46,29c.58-.33,2.07-2.25,4-.33a2.467,2.467,0,0,0,.67-.46,4.118,4.118,0,0,0-3-.28" fill="#7f7f7f" stroke="#7f7f7f" stroke-linecap="round" stroke-miterlimit="10" stroke-width="0.535"/><circle cx="36.2" cy="28.62" fill="#7f7f7f" r="0.75"/><circle cx="27.19" cy="28.62" fill="#7f7f7f" r="0.75"/><path d="M29,29c-.58-.33-2.07-2.25-4-.33a2.467,2.467,0,0,1-.67-.46,4.118,4.118,0,0,1,3-.28" fill="#7f7f7f" stroke="#7f7f7f" stroke-linecap="round" stroke-miterlimit="10" stroke-width="0.535"/><path d="M25,40.75H23.73a6,6,0,0,1-6-6V22a14,14,0,1,1,28,0V34.75a6,6,0,0,1-6,6h-.81" fill="none" stroke="#333" stroke-linejoin="round" stroke-width="1.5"/></g></g></g></g></svg>`;
    
    
  
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
      btn_div.style.backgroundColor = "lightgray";
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
      btn_div.style.backgroundColor = "lightgray";
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


function Get_warehouse_SVG(btn_width ,btn_height, svg_width, svg_height ,strokeColor, backgroundColor)
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
      btn_div.style.backgroundColor = "lightgray";
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
        btn_div.style.backgroundColor = "lightgray";
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
      btn_div.style.backgroundColor = "lightgray";
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
      btn_div.style.backgroundColor = "lightgray";
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
        btn_div.style.backgroundColor = "lightgray";
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
        btn_div.style.backgroundColor = "lightgray";
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
        btn_div.style.backgroundColor = "lightgray";
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
        btn_div.style.backgroundColor = "lightgray";
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
        btn_div.style.backgroundColor = "lightgray";
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
        btn_div.style.backgroundColor = "lightgray";
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
        btn_div.style.backgroundColor = "lightgray";
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
        btn_div.style.backgroundColor = "lightgray";
      });
    
      // 滑鼠移出時的事件處理器
      btn_div.addEventListener("mouseout", function() {
        btn_div.style.backgroundColor = backgroundColor;
      });
    
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
    btn_div.addEventListener("mouseover", function() {
        btn_div.style.backgroundColor = "lightgray";
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
    btn_div.addEventListener("mouseover", function() {
        btn_div.style.backgroundColor = "lightgray";
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
    if(clickOn == undefined) clickOn =true;
    if(clickOn)
    {
      btn_div.addEventListener("mouseover", function() 
      {
          btn_div.style.backgroundColor = "lightgray";
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
    btn_div.addEventListener("mouseover", function() {
        btn_div.style.backgroundColor = "lightgray";
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
    btn_div.addEventListener("mouseover", function() {
        btn_div.style.backgroundColor = "lightgray";
      });
    
      // 滑鼠移出時的事件處理器
      btn_div.addEventListener("mouseout", function() {
        btn_div.style.backgroundColor = backgroundColor;
      });
    
    div.appendChild(svg);
    btn_div.appendChild(div);
    
    return btn_div;
}