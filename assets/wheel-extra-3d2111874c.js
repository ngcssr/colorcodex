(function(){
  var shared=window.HCC_SHARED||{};
  var clamp=shared.clamp,block=shared.block,lum=shared.lum,hexToRgb=shared.hexToRgb,current=shared.current,pointer=shared.pointer,drag=shared.drag,setFromHsl=shared.setFromHsl,recordPickedRgb=shared.recordPickedRgb;
  var nodes=shared.wheelNodes||{},root=nodes.root,wheel=nodes.wheel,wheelTarget=nodes.wheelTarget,wheelLight=nodes.wheelLight,wheelLightRotor=nodes.wheelLightRotor;
  var bound=false;
  function getState(){return shared.getWheelState?shared.getWheelState():{}}
  function wheelPoint(h,s,rad){var dist=s/100*rad,ang=(h-90)*Math.PI/180;return {x:rad+Math.cos(ang)*dist,y:rad+Math.sin(ang)*dist}}
  function harmonyOffsets(){
    var st=getState(),offsets=[],select=document.getElementById('hccHarmonySelect');
    if(!(st&&st.harmonyChosen)||!select)return offsets;
    var v=select.value;
    if(v==='complementary')offsets=[180];
    else if(v==='split')offsets=[150,210];
    else if(v==='triadic')offsets=[120,240];
    else if(v==='tetradic'||v==='square')offsets=[90,180,270];
    else offsets=[-35,35];
    return offsets;
  }
  function updateWheelTarget(){
    if(!wheel||!wheelTarget||!wheelLightRotor||!root)return;
    var st=getState(),c=current(),hsl=st&&st.pageMode==='wheel'?(st.wheelHslState||c.hsl):c.hsl,r=wheel.getBoundingClientRect();
    if(!r.width)return;
    var rad=r.width/2,p=wheelPoint(hsl.h,hsl.s,rad);
    root.style.setProperty('--wheel-h',hsl.h);
    root.style.setProperty('--wheel-s',hsl.s+'%');
    wheelTarget.style.left=p.x+'px';
    wheelTarget.style.top=p.y+'px';
    wheelLightRotor.style.transform='rotate('+(hsl.l/100*360-90)+'deg)';
    Array.prototype.slice.call(wheel.querySelectorAll('.hcc-wheel-dot')).forEach(function(dot){if(dot.parentNode)dot.parentNode.removeChild(dot)});
    harmonyOffsets().forEach(function(offset){
      var hh=(hsl.h+offset+360)%360,dot=block('span','hcc-wheel-dot'),pt=wheelPoint(hh,hsl.s,rad),textColor=lum(hexToRgb('#'+current().hex))>.55?'#000':'#fff';
      dot.style.left=pt.x+'px';
      dot.style.top=pt.y+'px';
      dot.style.setProperty('--wheel-dot-color',textColor);
      dot.onmousedown=function(ev){ev.stopPropagation();setFromHsl(hh,hsl.s,hsl.l)};
      dot.ontouchstart=function(ev){ev.stopPropagation();setFromHsl(hh,hsl.s,hsl.l)};
      wheel.appendChild(dot);
    });
  }
  function pickWheel(e,force){
    var st=getState(),hsl=st.wheelHslState||current().hsl,p=pointer(e),r=wheel.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2,dx=p.x-cx,dy=p.y-cy,rad=r.width/2,dist=Math.sqrt(dx*dx+dy*dy);
    if(dist>rad+3&&!force)return false;
    dist=clamp(dist,0,rad);
    var h=(Math.atan2(dy,dx)*180/Math.PI+90+360)%360,s=clamp(dist/rad*100,0,100);
    setFromHsl(h,s,hsl.l);
    recordPickedRgb(current().rgb);
    return true;
  }
  function pickWheelLight(e,force){
    var st=getState(),hsl=st.wheelHslState||current().hsl,p=pointer(e),r=wheelLight.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2,dx=p.x-cx,dy=p.y-cy,outerRad=r.width/2,dist=Math.sqrt(dx*dx+dy*dy),inner=outerRad-22,outer=outerRad+12;
    if((dist<inner||dist>outer)&&!force)return false;
    var deg=(Math.atan2(dy,dx)*180/Math.PI+90+360)%360,l=clamp(deg/360*100,0,100);
    setFromHsl(hsl.h,hsl.s,l);
    recordPickedRgb(current().rgb);
    return true;
  }
  function wheelDrag(el,fn){
    function down(e){
      e.preventDefault();
      e.stopPropagation();
      if(!fn(e,false))return;
      if(el.setPointerCapture&&e.pointerId!==undefined){try{el.setPointerCapture(e.pointerId)}catch(_){ }}
      function move(ev){fn(ev,true);if(ev.cancelable)ev.preventDefault()}
      function up(ev){
        if(el.releasePointerCapture&&ev&&ev.pointerId!==undefined){try{el.releasePointerCapture(ev.pointerId)}catch(_){ }}
        document.removeEventListener('pointermove',move);
        document.removeEventListener('pointerup',up);
        document.removeEventListener('pointercancel',up);
      }
      document.addEventListener('pointermove',move);
      document.addEventListener('pointerup',up);
      document.addEventListener('pointercancel',up);
    }
    if(window.PointerEvent){el.onpointerdown=down}else{drag(el,function(ev){fn(ev,true)})}
  }
  function bindWheelEvents(){
    if(bound||!wheel||!wheelLight)return;
    bound=true;
    wheelDrag(wheel,pickWheel);
    wheelDrag(wheelLight,pickWheelLight);
  }
  window.HCC_REGISTER_WHEEL_EXTRA(function(){
    return {updateWheelTarget:updateWheelTarget,pickWheel:pickWheel,pickWheelLight:pickWheelLight,bindWheelEvents:bindWheelEvents};
  });
})();

