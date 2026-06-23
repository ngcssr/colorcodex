(function(){
  var shared=window.HCC_SHARED||{};
  if(!window.HCC_REGISTER_EXPORT_CORE)return;
  var block=shared.block,cleanHex=shared.cleanHex,hexToRgb=shared.hexToRgb,rgbToHsl=shared.rgbToHsl,rgbToOklch=shared.rgbToOklch,lum=shared.lum,scaleColors=shared.scaleColors,current=shared.current,trackColorBars=shared.trackColorBars,recordClickedHex=shared.recordClickedHex;
  var nodes=shared.exportNodes||{};
  function formatColor(hex,format){var rgb=hexToRgb(hex),hsl=rgbToHsl(rgb.r,rgb.g,rgb.b),ok=rgbToOklch(rgb.r,rgb.g,rgb.b);if(format==='RGB')return 'rgb('+rgb.r+' '+rgb.g+' '+rgb.b+')';if(format==='HSL')return 'hsl('+hsl.h+' '+hsl.s+' '+hsl.l+')';if(format==='OKLCH')return 'oklch('+ok.l+' '+ok.c+' '+ok.h+')';return hex}
  function formatCodeValue(hex,format){var rgb=hexToRgb(hex),hsl=rgbToHsl(rgb.r,rgb.g,rgb.b),ok=rgbToOklch(rgb.r,rgb.g,rgb.b);if(format==='RGB')return rgb.r+', '+rgb.g+', '+rgb.b;if(format==='HSL')return hsl.h+', '+hsl.s+', '+hsl.l;if(format==='OKLCH')return ok.l+', '+ok.c+', '+ok.h;return hex}
  function renderExport(){
    var exportSwatches=nodes.exportSwatches,exportCode=nodes.exportCode,exportPrefix=nodes.exportPrefix;
    if(!exportSwatches||!exportCode||!exportPrefix)return;
    var state=shared.getExportState?shared.getExportState():{},c=current(),colors=state.exportCustomColors?state.exportCustomColors:(state.exportSingle?['#'+c.hex]:scaleColors(c)),names=state.exportCustomColors?colors.map(function(_,i){return String(i+1)}):(state.exportSingle?['1']:['50','100','200','300','400','500','600','700','800','900','950']);
    shared.clear(exportSwatches);
    exportSwatches.style.gridTemplateRows=colors.length===1?'48px':'repeat('+colors.length+',minmax(0,1fr))';
    exportSwatches.style.alignSelf=colors.length===1?'start':'stretch';
    exportSwatches.style.height=colors.length===1?'48px':'';
    var values=colors.map(function(hex){return state.exportMode==='codes'?formatCodeValue(hex,state.exportFormat):formatColor(hex,state.exportFormat)}),prefix=(exportPrefix.value||'color').trim()||'color';
    values.forEach(function(val,i){var hex=colors[i],sw=block('div','hcc-export-swatch'+(lum(hexToRgb(hex))>.55?' dark-text':''));sw.style.backgroundColor=hex;var code=block('span','hcc-export-code');code.appendChild(document.createTextNode(val));code.appendChild(block('span','hcc-copy-mini'));sw.appendChild(code);sw.onclick=function(){recordClickedHex(hex,val)};exportSwatches.appendChild(sw)});
    if(state.exportMode==='tailwind4'){exportCode.value=values.map(function(val,i){return '--'+prefix+'-'+names[i]+': '+val+';'}).join('\n');return}
    if(state.exportMode==='tailwind3'||state.exportMode==='figma'){var lines=['"'+prefix+'": {'];values.forEach(function(val,i){lines.push('  '+names[i]+': "'+val+'"'+(i<values.length-1?',':''))});lines.push('}');exportCode.value=lines.join('\n');return}
    if(state.exportMode==='prefixes'){exportCode.value=values.map(function(val){return val+';'}).join('\n');return}
    exportCode.value=values.join('\n')
  }
  function setMode(mode,button){
    var next=shared.getExportState?shared.getExportState():{};
    next.exportMode=mode;
    if(shared.setExportState)shared.setExportState(next);
    ['hccModeTw4','hccModeTw3','hccModeFigma','hccModePrefix','hccModeCodes'].forEach(function(id){var el=document.getElementById(id);if(el)el.className=''});
    if(button)button.className='active';
    renderExport();
    trackColorBars()
  }
  function setFormat(format,button){
    var next=shared.getExportState?shared.getExportState():{};
    next.exportFormat=format;
    if(shared.setExportState)shared.setExportState(next);
    ['hccFmtHex','hccFmtRgb','hccFmtHsl','hccFmtOklch'].forEach(function(id){var el=document.getElementById(id);if(el)el.className='hcc-export-tab'});
    if(button)button.className='hcc-export-tab active';
    renderExport();
    trackColorBars()
  }
  window.HCC_REGISTER_EXPORT_CORE(function(){
    return {
      renderExport:renderExport,
      setMode:setMode,
      setFormat:setFormat
    };
  });
})();

