(function(){
  var assetVersion=window.HCC_ASSET_VERSION||'20260629-061500';
  var currentLang=(String(window.HCC_ROUTE_LANG||'').toLowerCase()||((String(location.pathname||'').match(/^\/(zh|ja|ko|es|fr|de|pt)(?=\/|$)/)||[])[1])||'en');
  var langNames={en:'English',zh:'\u4e2d\u6587',ja:'\u65e5\u672c\u8a9e',ko:'\ud55c\uad6d\uc5b4',es:'Espa\u00f1ol',fr:'Fran\u00e7ais',de:'Deutsch',pt:'Portugu\u00eas'};
  var toast=document.getElementById('hccToast'),toastTimer=null;
  var exportMode='tailwind4',exportFormat='Hex',exportSingle=false,exportCustomColors=null,history=[];
  var chartPaths={tailwind:'tailwind-color-chart/',flat:'flat-design-color-chart/',material:'material-design-color-chart/',websafe:'web-safe-color-chart/'};

  function cleanHex(v){return String(v||'').replace('#','').trim().toUpperCase()}
  function clamp(v,min,max){return Math.min(max,Math.max(min,v))}
  function twoHex(n){n=clamp(Math.round(Number(n)||0),0,255).toString(16);return (n.length<2?'0':'')+n}
  function rgbToHex(r,g,b){return (twoHex(r)+twoHex(g)+twoHex(b)).toUpperCase()}
  function hexToRgb(hex){hex=cleanHex(hex);if(hex.length===3)hex=hex.split('').map(function(c){return c+c}).join('');if(!/^[0-9A-F]{6}$/.test(hex))return null;return {r:parseInt(hex.slice(0,2),16),g:parseInt(hex.slice(2,4),16),b:parseInt(hex.slice(4,6),16)}}
  function rgbToHsl(r,g,b){r/=255;g/=255;b/=255;var max=Math.max(r,g,b),min=Math.min(r,g,b),h=0,s=0,l=(max+min)/2,d=max-min;if(d){s=l>.5?d/(2-max-min):d/(max+min);switch(max){case r:h=(g-b)/d+(g<b?6:0);break;case g:h=(b-r)/d+2;break;case b:h=(r-g)/d+4;break}h*=60}return {h:Math.round(h),s:Math.round(s*100),l:Math.round(l*100)}}
  function hslToRgb(h,s,l){h=(h%360+360)%360;s=clamp(s,0,100)/100;l=clamp(l,0,100)/100;var c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs((h/60)%2-1)),m=l-c/2,r=0,g=0,b=0;if(h<60){r=c;g=x}else if(h<120){r=x;g=c}else if(h<180){g=c;b=x}else if(h<240){g=x;b=c}else if(h<300){r=x;b=c}else{r=c;b=x}return {r:Math.round((r+m)*255+1e-6),g:Math.round((g+m)*255+1e-6),b:Math.round((b+m)*255+1e-6)}}
  function rgbToOklch(r,g,b){function lin(v){v/=255;return v<=.04045?v/12.92:Math.pow((v+.055)/1.055,2.4)}var lr=lin(r),lg=lin(g),lb=lin(b),l=Math.cbrt(.4122214708*lr+.5363325363*lg+.0514459929*lb),m=Math.cbrt(.2119034982*lr+.6806995451*lg+.1073969566*lb),s=Math.cbrt(.0883024619*lr+.2817188376*lg+.6299787005*lb),L=.2104542553*l+.793617785*m-.0040720468*s,a=1.9779984951*l-2.428592205*m+.4505937099*s,bb=.0259040371*l+.7827717662*m-.808675766*s,C=Math.sqrt(a*a+bb*bb),H=Math.atan2(bb,a)*180/Math.PI;if(H<0)H+=360;return {l:L.toFixed(3),c:C.toFixed(3),h:Math.round(H)}}
  function lum(rgb){function f(v){v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4)}return .2126*f(rgb.r)+.7152*f(rgb.g)+.0722*f(rgb.b)}
  function showToast(msg){if(!toast)return;if(toastTimer)clearTimeout(toastTimer);toast.textContent=msg||((currentLang==='zh')?'\u5df2\u590d\u5236\u5230\u526a\u8d34\u677f':'Copied to clipboard');toast.className='hcc-toast';void toast.offsetWidth;toast.className='hcc-toast show';toastTimer=setTimeout(function(){toast.className='hcc-toast'},1400)}
  function copyText(value){var code=String(value||'');if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(code).catch(function(){});showToast()}
  function pageUrl(slug){var prefix=currentLang==='en'?'':'/'+currentLang;var paths={picker:'/color-picker/',image:'/image-color-picker/',wheel:'/color-wheel/',chart:'/color-chart/',library:'/colors/',converter:'/rgb-to-hex/',hex:'/hex-to-rgb/',contrast:'/contrast-checker/',mixer:'/color-mixer/',names:'/color-names/'};return prefix+(paths[slug]||paths.chart)}
  function setLink(id,slug){var el=document.getElementById(id);if(el)el.href=pageUrl(slug)}

  function setSummary(rgb){
    var hex=rgbToHex(rgb.r,rgb.g,rgb.b),hsl=rgbToHsl(rgb.r,rgb.g,rgb.b),ok=rgbToOklch(rgb.r,rgb.g,rgb.b),root=document.getElementById('hccShell'),okText=Number(ok.l).toFixed(2)+', '+Number(ok.c).toFixed(2)+', '+ok.h;
    if(root)root.style.setProperty('--hue',hsl.h);
    [['hccTopHex',hex],['hccTopRgb',rgb.r+', '+rgb.g+', '+rgb.b],['hccTopHsl',hsl.h+', '+hsl.s+', '+hsl.l],['hccTopOklch',okText]].forEach(function(pair){var el=document.getElementById(pair[0]);if(el)el.textContent=pair[1]});
    ['hccMiniTriggerDot','hccMiniInputDot','hccInputDot'].forEach(function(id){var el=document.getElementById(id);if(el)el.style.backgroundColor='#'+hex});
    var mini=document.getElementById('hccMiniHexInput'),input=document.getElementById('hccColorValue');
    if(mini)mini.value=hex;
    if(input)input.value=hex;
    renderStrip(rgb);
    renderPalette();
    if(document.getElementById('hccExportModal')&&document.getElementById('hccExportModal').className.indexOf('show')>-1)renderExport();
  }

  function renderStrip(rgb){
    var strip=document.getElementById('hccTopStrip');
    if(!strip)return;
    var colors=[];
    strip.classList.remove('has-hover');
    for(var i=0;i<11;i++){
      var t=i/10,r=Math.round(rgb.r+(128-rgb.r)*t),g=Math.round(rgb.g+(128-rgb.g)*t),b=Math.round(rgb.b+(128-rgb.b)*t);
      colors.push(rgbToHex(r,g,b));
    }
    strip.innerHTML='';
    colors.forEach(function(code,idx){
      var el=document.createElement('i'),crgb=hexToRgb(code);
      el.style.backgroundColor='#'+code;
      el.style.setProperty('--strip-text',lum(crgb)>.55?'#000':'#fff');
      el.textContent=code;
      el.setAttribute('data-code',code);
      if(idx===0)el.className='active';
      el.onclick=function(){record(code);copyText('#'+code)};
      strip.appendChild(el);
    });
  }

  function mix(a,b,t){return {r:Math.round(a.r+(b.r-a.r)*t),g:Math.round(a.g+(b.g-a.g)*t),b:Math.round(a.b+(b.b-a.b)*t)}}
  function currentRgb(){var top=document.getElementById('hccTopHex'),rgb=hexToRgb(top&&top.textContent);return rgb||{r:109,g:243,b:234}}
  function currentHex(){var rgb=currentRgb();return rgbToHex(rgb.r,rgb.g,rgb.b)}
  function scaleColors(rgb){var stops=[.9,.78,.64,.48,.32,.18,0,.18,.34,.5,.64];return stops.map(function(t,i){var target=i<6?{r:255,g:255,b:255}:(i===6?rgb:{r:0,g:0,b:0}),out=i===6?rgb:mix(rgb,target,t);return '#'+rgbToHex(out.r,out.g,out.b)})}
  function paletteColors(rgb,offsets){var hsl=rgbToHsl(rgb.r,rgb.g,rgb.b);return offsets.map(function(d){var out=hslToRgb(hsl.h+d,hsl.s,hsl.l);return '#'+rgbToHex(out.r,out.g,out.b)})}
  function harmonyColors(rgb){return paletteColors(rgb,[-35,0,35])}
  function miniStrip(colors,active){var s=document.createElement('span'),idx=Math.max(0,Math.min(colors.length-1,active||0));s.className='hcc-mini-strip';s.style.gridTemplateColumns='repeat('+colors.length+',1fr)';colors.forEach(function(hex){var i=document.createElement('i');i.style.backgroundColor=hex;s.appendChild(i)});var dot=document.createElement('span'),rgb=hexToRgb(colors[idx]);dot.className='hcc-mini-dot';s.style.setProperty('--dot-left',((idx+.5)/colors.length*100)+'%');s.style.setProperty('--dot-color',rgb&&lum(rgb)>.55?'#000':'#fff');s.appendChild(dot);return s}
  function block(tag,cls){var el=document.createElement(tag);if(cls)el.className=cls;return el}
  function record(hex){hex=cleanHex(hex);if(!/^[0-9A-F]{6}$/.test(hex)||hex===history[0])return;history=history.filter(function(v){return cleanHex(v)!==hex});history.unshift(hex);history=history.slice(0,24);try{localStorage.setItem('hccColorHistory',JSON.stringify(history))}catch(_){}}
  function loadHistory(){try{var seen={};history=JSON.parse(localStorage.getItem('hccColorHistory')||'[]').map(cleanHex).filter(function(v){if(!/^[0-9A-F]{6}$/.test(v)||seen[v])return false;seen[v]=1;return true}).slice(0,24)}catch(_){history=[]}}
  function chooseColor(hex,copyValue){var h=cleanHex(hex),rgb=hexToRgb(h);if(rgb){record(h);setSummary(rgb)}copyText(copyValue||('#'+h))}
  function renderPalette(){var panel=document.getElementById('hccPalettePanel');if(!panel)return;panel.innerHTML='';var rgb=currentRgb(),rows=[['Tailwind',scaleColors(rgb),6],['Tint',scaleColors(mix(rgb,{r:255,g:255,b:255},.2)),6],['Shade',scaleColors(mix(rgb,{r:0,g:0,b:0},.25)),6],['Tone',scaleColors(mix(rgb,{r:128,g:128,b:128},.25)),6],['Analogous',paletteColors(rgb,[-35,0,35]),1],['Complement',paletteColors(rgb,[0,180]),0],['Split',paletteColors(rgb,[0,150,210]),0],['Triadic',paletteColors(rgb,[0,120,240]),0],['Tetradic',paletteColors(rgb,[0,90,180,270]),0],['Square',paletteColors(rgb,[0,90,180,270]),0]];rows.forEach(function(row,idx){var b=block('button','hcc-palette-row'+(idx===0?' active':'')),label=block('span'),active=row[2]||0;b.type='button';label.textContent=row[0];b.appendChild(label);b.appendChild(miniStrip(row[1],active));b.onclick=function(e){e.stopPropagation();chooseColor(row[1][active]);panel.className='hcc-palette-panel'};panel.appendChild(b)})}
  function renderHistory(){var panel=document.getElementById('hccHistoryPanel');if(!panel)return;panel.innerHTML='';var head=block('div','hcc-history-head'),title=block('span'),clearBtn=block('button','hcc-history-clear');title.textContent=(currentLang==='zh'?'历史记录':'History');clearBtn.type='button';clearBtn.textContent=(currentLang==='zh'?'清除':'Clear');clearBtn.onclick=function(e){e.stopPropagation();history=[];try{localStorage.removeItem('hccColorHistory')}catch(_){}renderHistory()};head.appendChild(title);head.appendChild(clearBtn);panel.appendChild(head);if(!history.length){var empty=block('div','hcc-history-empty');empty.textContent=(currentLang==='zh'?'暂无颜色':'No colors yet');panel.appendChild(empty);return}var grid=block('div','hcc-history-grid'),cur=currentHex();history.forEach(function(hex,idx){var rgb=hexToRgb(hex),b=block('button','hcc-history-item'+(hex===cur?' active':'')),label=block('span','hcc-history-text');b.type='button';b.setAttribute('aria-label','#'+hex);b.setAttribute('data-code',hex);b.style.setProperty('--history-color','#'+hex);b.style.setProperty('--history-text',rgb&&lum(rgb)>.55?'#000':'#fff');b.style.setProperty('--history-width',Math.max(12,28-idx*2)+'px');label.textContent=hex;b.appendChild(label);b.onclick=function(e){e.stopPropagation();chooseColor(hex)};grid.appendChild(b)});panel.appendChild(grid);trackColorBars()}
  function formatColor(hex,format){var rgb=hexToRgb(hex)||currentRgb(),hsl=rgbToHsl(rgb.r,rgb.g,rgb.b),ok=rgbToOklch(rgb.r,rgb.g,rgb.b);if(format==='RGB')return 'rgb('+rgb.r+' '+rgb.g+' '+rgb.b+')';if(format==='HSL')return 'hsl('+hsl.h+' '+hsl.s+' '+hsl.l+')';if(format==='OKLCH')return 'oklch('+ok.l+' '+ok.c+' '+ok.h+')';return '#'+cleanHex(hex)}
  function renderExport(){var modal=document.getElementById('hccExportModal'),swatches=document.getElementById('hccExportSwatches'),codeBox=document.getElementById('hccExportCode'),prefixInput=document.getElementById('hccExportPrefix');if(!modal||!swatches||!codeBox)return;var rgb=currentRgb(),colors=exportCustomColors?exportCustomColors:(exportSingle?['#'+currentHex()]:scaleColors(rgb)),names=exportCustomColors?colors.map(function(_,i){return String(i+1)}):(exportSingle?['1']:['50','100','200','300','400','500','600','700','800','900','950']),prefix=(prefixInput&&prefixInput.value||'color').trim()||'color';swatches.innerHTML='';swatches.style.gridTemplateRows=colors.length===1?'48px':'repeat('+colors.length+',minmax(0,1fr))';var values=colors.map(function(hex){return formatColor(hex,exportFormat)});values.forEach(function(val,i){var hex=colors[i],rgb=hexToRgb(hex),sw=block('div','hcc-export-swatch'+(rgb&&lum(rgb)>.55?' dark-text':'')),code=block('span','hcc-export-code');sw.style.backgroundColor=hex;code.textContent=val;code.appendChild(block('span','hcc-copy-mini'));sw.appendChild(code);sw.onclick=function(){copyText(val)};swatches.appendChild(sw)});if(exportMode==='tailwind4')codeBox.value=values.map(function(val,i){return '--'+prefix+'-'+names[i]+': '+val+';'}).join('\n');else if(exportMode==='tailwind3'||exportMode==='figma')codeBox.value='"'+prefix+'": {\n'+values.map(function(val,i){return '  '+names[i]+': "'+val+'"'+(i<values.length-1?',':'')}).join('\n')+'\n}';else codeBox.value=values.join(exportMode==='prefixes'?';\n':'\n')+(exportMode==='prefixes'?';':'')}
  function waitFullCss(done){var id='hccExportModalCss',href='/assets/css/export-modal.css?v='+(window.HCC_ASSET_VERSION||'20260629-091341'),link=document.getElementById(id);if(!link){link=document.createElement('link');link.id=id;link.rel='stylesheet';link.href=href;document.head.appendChild(link)}if(link.sheet){done();return}var finished=false;function finish(){if(finished)return;finished=true;done()}link.addEventListener('load',finish,{once:true});link.addEventListener('error',finish,{once:true});setTimeout(finish,700)}
  
  function openExport(single,colors){waitFullCss(function(){var modal=document.getElementById('hccExportModal');exportCustomColors=colors||null;exportSingle=single===true&&!exportCustomColors;renderExport();if(modal)modal.className=(exportSingle||exportCustomColors&&exportCustomColors.length===1)?'hcc-modal show single':'hcc-modal show'})}
  function closeExport(){var modal=document.getElementById('hccExportModal');if(modal)modal.className='hcc-modal';exportCustomColors=null}
  function chartPathForLang(lang){var page=(document.body&&document.body.getAttribute('data-hcc-page'))||'chart',slug='';if(page==='chart-tailwind')slug=chartPaths.tailwind;else if(page==='chart-flat')slug=chartPaths.flat;else if(page==='chart-material')slug=chartPaths.material;else if(page==='chart-websafe')slug=chartPaths.websafe;return (lang==='en'?'':'/'+lang)+'/color-chart/'+slug}
  function bindTopShell(){var stripToggle=document.getElementById('hccStripToggle'),palette=document.getElementById('hccPalettePanel'),hist=document.getElementById('hccHistoryToggle'),historyPanel=document.getElementById('hccHistoryPanel'),share=document.getElementById('hccShare'),exportBtn=document.getElementById('hccExport'),copyCurrent=document.getElementById('hccCopyCurrent'),close=document.getElementById('hccCloseExport'),modal=document.getElementById('hccExportModal'),copy=document.getElementById('hccCopyExportCodes'),prefix=document.getElementById('hccExportPrefix'),mini=document.getElementById('hccMiniTrigger'),miniPanel=document.getElementById('hccMiniPicker'),miniInput=document.getElementById('hccMiniHexInput');if(stripToggle&&palette)stripToggle.onclick=function(e){e.stopPropagation();renderPalette();palette.className=palette.className.indexOf('show')>-1?'hcc-palette-panel':'hcc-palette-panel show';if(historyPanel)historyPanel.className='hcc-history-panel'};if(hist&&historyPanel)hist.onclick=function(e){e.stopPropagation();renderHistory();historyPanel.className=historyPanel.className.indexOf('show')>-1?'hcc-history-panel':'hcc-history-panel show';if(palette)palette.className='hcc-palette-panel'};if(share)share.onclick=function(){openExport(false)};if(exportBtn)exportBtn.onclick=function(){openExport(true)};if(copyCurrent)copyCurrent.onclick=function(){copyText('#'+currentHex())};if(mini&&miniPanel)mini.onclick=function(e){e.stopPropagation();miniPanel.className=miniPanel.className.indexOf('show')>-1?'hcc-mini-picker':'hcc-mini-picker show';if(palette)palette.className='hcc-palette-panel';if(historyPanel)historyPanel.className='hcc-history-panel'};if(miniInput)miniInput.oninput=function(){var rgb=hexToRgb(miniInput.value);if(rgb)setSummary(rgb)};if(close)close.onclick=closeExport;if(modal)modal.onclick=function(e){if(e.target===modal)closeExport()};if(copy)copy.onclick=function(){var box=document.getElementById('hccExportCode');copyText(box&&box.value)};if(prefix)prefix.oninput=renderExport;[['hccModeTw4','tailwind4'],['hccModeTw3','tailwind3'],['hccModeFigma','figma'],['hccModePrefix','prefixes'],['hccModeCodes','codes']].forEach(function(pair){var el=document.getElementById(pair[0]);if(el)el.onclick=function(){Array.prototype.slice.call(document.querySelectorAll('#hccExportMenu button')).forEach(function(b){b.className=''});el.className='active';exportMode=pair[1];renderExport()}});[['hccFmtHex','Hex'],['hccFmtRgb','RGB'],['hccFmtHsl','HSL'],['hccFmtOklch','OKLCH']].forEach(function(pair){var el=document.getElementById(pair[0]);if(el)el.onclick=function(){Array.prototype.slice.call(document.querySelectorAll('.hcc-export-tab')).forEach(function(b){b.className='hcc-export-tab'});el.className='hcc-export-tab active';exportFormat=pair[1];renderExport()}});document.addEventListener('click',function(e){if(palette&&stripToggle&&!palette.contains(e.target)&&e.target!==stripToggle)palette.className='hcc-palette-panel';if(historyPanel&&hist&&!historyPanel.contains(e.target)&&e.target!==hist)historyPanel.className='hcc-history-panel';if(miniPanel&&mini&&!miniPanel.contains(e.target)&&!mini.contains(e.target))miniPanel.className='hcc-mini-picker'})}

  function trackColorBars(){
    Array.prototype.slice.call(document.querySelectorAll('.hcc-strip,.hcc-chart-family-bar,.hcc-history-grid')).forEach(function(bar){
      if(bar.dataset.hoverLock)return;
      bar.dataset.hoverLock='1';
      var isFamily=bar.className.indexOf('hcc-chart-family-bar')>-1;
      var isHistory=bar.className.indexOf('hcc-history-grid')>-1;
      var itemSelector=isHistory?'.hcc-history-item':(isFamily?'.hcc-chart-family-swatch':'i');
      function getItems(){return Array.prototype.slice.call(bar.querySelectorAll(itemSelector))}
      function clearHover(){
        getItems().forEach(function(item){
          item.classList.remove('is-hovered');
          item.classList.remove('is-before-hover');
          item.classList.remove('is-after-hover');
        });
        bar.classList.remove('has-hover');
      }
      function setHoverVars(items,r){
        if(!items.length||!r.width)return;
        var n=items.length,base=r.width/n,hover=1.16,near=.94,rest=.9,font=10,pad=5;
        if(n<=1){hover=1;near=1;rest=1}
        else if(n<=3){hover=1.08;near=.98;rest=.96}
        else if(base<44){hover=1.42;near=.9;rest=.84}
        else if(base<62){hover=1.26;near=.92;rest=.86}
        if(isFamily&&base<44)hover=Math.max(hover,1.48);
        if(!isFamily&&base<48)hover=Math.max(hover,1.38);
        if(base<38){font=9.5;pad=3}
        else if(base<58){font=10;pad=4}
        else{font=11;pad=6}
        bar.style.setProperty('--hcc-swatch-hover-grow',hover.toFixed(3));
        bar.style.setProperty('--hcc-swatch-near-grow',near.toFixed(3));
        bar.style.setProperty('--hcc-swatch-rest-grow',rest.toFixed(3));
        bar.style.setProperty('--hcc-swatch-label-font',font+'px');
        bar.style.setProperty('--hcc-swatch-label-pad',pad+'px');
      }
      function activate(item,items){
        if(!item)return;
        if(item.classList.contains('is-hovered')&&bar.classList.contains('has-hover'))return;
        items=items||getItems();
        clearHover();
        var idx=items.indexOf(item);
        item.classList.add('is-hovered');
        if(!isHistory&&idx>0)items[idx-1].classList.add('is-before-hover');
        if(!isHistory&&idx<items.length-1)items[idx+1].classList.add('is-after-hover');
        bar.classList.add('has-hover');
      }
      function pickBySlot(x){
        var items=getItems(),r=bar.getBoundingClientRect();
        if(!items.length||!r.width)return null;
        setHoverVars(items,r);
        var ratio=(x-r.left)/r.width,idx=Math.trunc(Math.max(0,Math.min(.999999,ratio))*items.length);
        idx=Math.max(0,Math.min(items.length-1,idx));
        return {item:items[idx],items:items};
      }
      bar.addEventListener('mousemove',function(e){
        if(isHistory){
          var item=e.target&&e.target.closest?e.target.closest('.hcc-history-item'):null;
          if(item&&bar.contains(item))activate(item);
          return;
        }
        var picked=pickBySlot(e.clientX);
        if(picked)activate(picked.item,picked.items);
      });
      bar.addEventListener('mouseleave',clearHover);
    });
  }

  function bindChrome(){
    setLink('hccNavPicker','picker');setLink('hccNavImage','image');setLink('hccNavWheel','wheel');setLink('hccNavChart','chart');setLink('hccNavLibrary','library');setLink('hccNavConverter','converter');setLink('hccNavRgbHexItem','converter');setLink('hccNavHexRgbItem','hex');setLink('hccNavTools','contrast');setLink('hccNavContrastItem','contrast');setLink('hccNavMixerItem','mixer');setLink('hccNavNames','names');setLink('hccMobileNavChart','chart');setLink('hccMobileNavLibrary','library');setLink('hccMobileNavConverter','converter');setLink('hccMobileNavHexRgb','hex');setLink('hccMobileNavContrast','contrast');setLink('hccMobileNavMixer','mixer');setLink('hccMobileNavNames','names');
    var langButton=document.getElementById('hccLangButton'),langSwitch=document.getElementById('hccLangSwitch'),langMenu=document.getElementById('hccLangMenu'),mobileMenu=document.getElementById('hccMobileMenu'),mobileToggle=document.getElementById('hccMobileMenuToggle');
    if(langButton){langButton.textContent=langNames[currentLang]||'English';langButton.onclick=function(e){e.stopPropagation();if(langSwitch)langSwitch.className=langSwitch.className.indexOf('show')>-1?'hcc-lang-switch':'hcc-lang-switch show';if(mobileMenu)mobileMenu.className='hcc-mobile-menu'}}
    if(langMenu){langMenu.onclick=function(e){e.stopPropagation()};Array.prototype.slice.call(langMenu.querySelectorAll('button')).forEach(function(btn){btn.className=btn.getAttribute('data-lang')===currentLang?'active':'';btn.onclick=function(){var lang=btn.getAttribute('data-lang')||'en';try{localStorage.setItem('hccLang',lang);localStorage.setItem('hccLangManual','1')}catch(_){}location.href=chartPathForLang(lang)}})}
    if(mobileToggle&&mobileMenu){mobileToggle.onclick=function(e){e.stopPropagation();mobileMenu.className=mobileMenu.className.indexOf('show')>-1?'hcc-mobile-menu':'hcc-mobile-menu show'}}
    document.addEventListener('click',function(e){if(langSwitch&&!langSwitch.contains(e.target))langSwitch.className='hcc-lang-switch';if(mobileMenu&&mobileToggle&&!mobileMenu.contains(e.target)&&e.target!==mobileToggle)mobileMenu.className='hcc-mobile-menu'});
  }

  function detailUrl(slug){var prefix=currentLang==='en'?'':'/'+currentLang;return prefix+'/color-chart/'+(chartPaths[slug]||'')}
  function setSwatchHover(cell,on){
    var bar=cell&&cell.parentNode;
    if(!bar)return;
    Array.prototype.slice.call(bar.children).forEach(function(item){item.classList.remove('is-hovered','is-before-hover','is-after-hover')});
    if(on){
      var prev=cell.previousElementSibling,next=cell.nextElementSibling;
      bar.classList.add('has-hover');
      cell.classList.add('is-hovered');
      if(prev)prev.classList.add('is-before-hover');
      if(next)next.classList.add('is-after-hover');
    }else{
      bar.classList.remove('has-hover');
    }
  }

  var chartDataLoading=false,chartDataCallbacks=[];
  function hasChartPlaceholders(){
    var nodes=Array.prototype.slice.call(document.querySelectorAll('#hccChartTable [data-chart-matrix],#hccChartTable [data-chart-family]'));
    return nodes.some(function(node){return !node.children.length});
  }
  function ensureChartData(done){
    done=typeof done==='function'?done:function(){};
    if(!hasChartPlaceholders()||window.HCC_CHART_DEFS){done();return}
    chartDataCallbacks.push(done);
    if(chartDataLoading)return;
    chartDataLoading=true;
    var s=document.createElement('script');
    s.src='/data-chart.js?v='+assetVersion;
    s.defer=true;
    s.onload=s.onerror=function(){
      var callbacks=chartDataCallbacks.slice();
      chartDataCallbacks=[];
      chartDataLoading=false;
      callbacks.forEach(function(fn){fn()});
    };
    document.body.appendChild(s);
  }

  function renderChartIndex(){
    var table=document.getElementById('hccChartTable'),defs=window.HCC_CHART_DEFS||[];
    if(!table||!defs.length)return;
    Array.prototype.slice.call(table.querySelectorAll('[data-chart-matrix]')).forEach(function(matrix){
      if(matrix.children.length)return;
      var slug=matrix.getAttribute('data-chart-matrix')||'',def=null;
      defs.some(function(item){if(item.slug===slug){def=item;return true}return false});
      if(!def)return;
      matrix.innerHTML='';
      (def.groups||[]).forEach(function(group){
        if(def.slug==='material'&&group.length<=2)return;
        var col=block('div','hcc-chart-col');
        (group||[]).forEach(function(hex){
          hex=cleanHex(hex);
          var cell=block('button','hcc-chart-cell');
          cell.type='button';
          cell.title='#'+hex;
          cell.setAttribute('data-code',hex);
          cell.setAttribute('aria-label','#'+hex);
          cell.style.backgroundColor='#'+hex;
          cell.style.setProperty('--cell-bg','#'+hex);
          col.appendChild(cell);
        });
        matrix.appendChild(col);
      });
    });
    table.setAttribute('data-ready','1');
  }

  function currentDetailSlug(){
    var page=(document.body&&document.body.getAttribute('data-hcc-page'))||'';
    if(page==='chart-tailwind')return 'tailwind';
    if(page==='chart-flat')return 'flat';
    if(page==='chart-material')return 'material';
    if(page==='chart-websafe')return 'websafe';
    return '';
  }

  function renderChartDetail(){
    var table=document.getElementById('hccChartTable'),defs=window.HCC_CHART_DEFS||[],slug=currentDetailSlug(),def=null;
    if(!table||!slug||!defs.length)return;
    defs.some(function(item){if(item.slug===slug){def=item;return true}return false});
    if(!def)return;
    Array.prototype.slice.call(table.querySelectorAll('[data-chart-family]')).forEach(function(bar){
      if(bar.children.length)return;
      var idx=parseInt(bar.getAttribute('data-chart-family'),10),group=(def.groups||[])[idx]||[];
      group.forEach(function(hex){
        hex=cleanHex(hex);
        var cell=block('button','hcc-chart-family-swatch'),label=block('span');
        cell.type='button';
        cell.title='#'+hex;
        cell.setAttribute('data-code',hex);
        cell.setAttribute('aria-label','#'+hex);
        cell.style.backgroundColor='#'+hex;
        cell.style.setProperty('--cell-bg','#'+hex);
        label.textContent=hex;
        cell.appendChild(label);
        bar.appendChild(cell);
      });
    });
    table.setAttribute('data-ready','detail-'+slug);
  }

  function bindChart(){
    Array.prototype.slice.call(document.querySelectorAll('#hccChartTable .hcc-chart-cell,#hccChartTable .hcc-chart-family-swatch')).forEach(function(cell){
      var hex=cleanHex(cell.title||cell.getAttribute('title')||cell.getAttribute('aria-label')||cell.getAttribute('data-code')||'');
      var rgb=hexToRgb(hex);
      if(!rgb)return;
      cell.setAttribute('aria-label','#'+hex);
      cell.style.setProperty('--swatch-text',lum(rgb)>.55?'#000':'#fff');
      cell.onclick=function(){record(hex);setSummary(rgb);copyText('#'+hex)};
      if(cell.className.indexOf('hcc-chart-family-swatch')>-1){
        cell.onfocus=function(){setSwatchHover(cell,true)};
        cell.onblur=function(){setSwatchHover(cell,false)};
      }
    });
    Array.prototype.slice.call(document.querySelectorAll('[data-chart-full]')).forEach(function(btn){
      btn.onclick=function(){var slug=btn.getAttribute('data-chart-full');var url=detailUrl(slug);if(url)location.href=url};
    });
  }
  function bindUnifiedMiniPickerPhase102(){
    var trigger=document.getElementById('hccMiniTrigger'),panel=document.getElementById('hccMiniPicker'),sv=document.getElementById('hccMiniSv'),hue=document.getElementById('hccMiniHue'),target=document.getElementById('hccMiniTarget'),hueKnob=document.getElementById('hccMiniHueKnob'),input=document.getElementById('hccMiniHexInput'),palette=document.getElementById('hccPalettePanel'),historyPanel=document.getElementById('hccHistoryPanel');
    if(!trigger||!panel||panel.dataset.phase102Bound)return;
    panel.dataset.phase102Bound='1';
    function rgbToHsvLocal(r,g,b){r/=255;g/=255;b/=255;var max=Math.max(r,g,b),min=Math.min(r,g,b),d=max-min,h=0;if(d){switch(max){case r:h=(g-b)/d+(g<b?6:0);break;case g:h=(b-r)/d+2;break;case b:h=(r-g)/d+4;break}h*=60}return {h:h,s:max?d/max*100:0,v:max*100}}
    function hsvToRgbLocal(h,s,v){h=(h%360+360)%360;s=clamp(s,0,100)/100;v=clamp(v,0,100)/100;var c=v*s,x=c*(1-Math.abs((h/60)%2-1)),m=v-c,r=0,g=0,b=0;if(h<60){r=c;g=x}else if(h<120){r=x;g=c}else if(h<180){g=c;b=x}else if(h<240){g=x;b=c}else if(h<300){r=x;b=c}else{r=c;b=x}return {r:Math.round((r+m)*255),g:Math.round((g+m)*255),b:Math.round((b+m)*255)}}
    function hexFromRgb(rgb){return rgbToHex(rgb.r,rgb.g,rgb.b)}
    function currentRgbLocal(){var top=document.getElementById('hccTopHex'),rgb=hexToRgb(top&&top.textContent);return rgb||{r:109,g:243,b:234}}
    function syncMini(rgb){var hsv=rgbToHsvLocal(rgb.r,rgb.g,rgb.b),hex=hexFromRgb(rgb),root=document.getElementById('hccShell');if(root)root.style.setProperty('--hue',hsv.h);if(target){target.style.left=clamp(hsv.s,0,100)+'%';target.style.top=clamp(100-hsv.v,0,100)+'%'}if(hueKnob){hueKnob.style.left=clamp(hsv.h/360*100,0,100)+'%';hueKnob.style.backgroundColor='hsl('+Math.round(hsv.h)+',100%,50%)'}['hccMiniTriggerDot','hccMiniInputDot','hccInputDot'].forEach(function(id){var el=document.getElementById(id);if(el)el.style.backgroundColor='#'+hex});if(input&&document.activeElement!==input)input.value=hex}
    function applyRgb(rgb,save){var hex=hexFromRgb(rgb);if(save&&typeof record==='function')record(hex);setSummary(rgb);syncMini(rgb)}
    function point(e){var p=e.touches?e.touches[0]:e;return {x:p.clientX,y:p.clientY}}
    function pickSv(e){if(!sv)return;var r=sv.getBoundingClientRect();if(!r.width||!r.height)return;var p=point(e),hsv=rgbToHsvLocal.apply(null,(function(rgb){return [rgb.r,rgb.g,rgb.b]})(currentRgbLocal()));hsv.s=clamp((p.x-r.left)/r.width*100,0,100);hsv.v=clamp(100-(p.y-r.top)/r.height*100,0,100);applyRgb(hsvToRgbLocal(hsv.h,hsv.s,hsv.v),true);if(e.cancelable)e.preventDefault()}
    function pickHue(e){if(!hue)return;var r=hue.getBoundingClientRect();if(!r.width)return;var p=point(e),hsv=rgbToHsvLocal.apply(null,(function(rgb){return [rgb.r,rgb.g,rgb.b]})(currentRgbLocal()));hsv.h=clamp((p.x-r.left)/r.width*360,0,359.999);applyRgb(hsvToRgbLocal(hsv.h,hsv.s,hsv.v),true);if(e.cancelable)e.preventDefault()}
    function drag(el,fn){if(!el)return;el.addEventListener('pointerdown',function(e){e.preventDefault();fn(e);function move(ev){fn(ev)}function up(){document.removeEventListener('pointermove',move);document.removeEventListener('pointerup',up);document.removeEventListener('pointercancel',up)}document.addEventListener('pointermove',move);document.addEventListener('pointerup',up);document.addEventListener('pointercancel',up)})}
    function setOpen(open){panel.className=open?'hcc-mini-picker show':'hcc-mini-picker';if(document.documentElement&&document.documentElement.classList)document.documentElement.classList[open?'add':'remove']('hcc-mini-open');if(open){if(palette)palette.className='hcc-palette-panel';if(historyPanel)historyPanel.className='hcc-history-panel';syncMini(currentRgbLocal())}}
    trigger.onclick=function(e){e.preventDefault();e.stopPropagation();setOpen(panel.className.indexOf('show')<0)};
    panel.onclick=function(e){e.stopPropagation()};
    if(input)input.oninput=function(){var rgb=hexToRgb(input.value);if(rgb)applyRgb(rgb,true)};
    drag(sv,pickSv);
    drag(hue,pickHue);
    document.addEventListener('click',function(e){if(!panel.contains(e.target)&&!trigger.contains(e.target))setOpen(false)});
    syncMini(currentRgbLocal());
  }

  function release(){
    document.documentElement.classList.add('hcc-i18n-ready');
    document.documentElement.classList.remove('hcc-lang-pending');
    document.documentElement.classList.remove('hcc-hover-boot');
  }

  loadHistory();
  bindChrome();
  bindTopShell();
  bindUnifiedMiniPickerPhase102();
  setSummary({r:109,g:243,b:234});
  ensureChartData(function(){
    renderChartIndex();
    renderChartDetail();
    bindChart();
    trackColorBars();
    release();
  });
})();
