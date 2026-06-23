(function(){
  if('scrollRestoration' in history){history.scrollRestoration='manual'}
  var lazyChunks={};
  function byId(id){return document.getElementById(id)}
  function loadChunk(key,src,done){if(lazyChunks[key]==='loaded'){done&&done();return}if(lazyChunks[key]){lazyChunks[key].push(done);return}lazyChunks[key]=[done];var s=document.createElement('script');s.src=src;s.defer=true;s.onload=function(){var q=lazyChunks[key]||[];lazyChunks[key]='loaded';q.forEach(function(fn){if(fn)fn()})};s.onerror=function(){lazyChunks[key]=null};document.body.appendChild(s)}
  function showToast(text){var toast=byId('hccToast');if(!toast)return;toast.textContent=text||'Copied';toast.className='hcc-toast';void toast.offsetWidth;toast.className='hcc-toast show';clearTimeout(showToast.timer);showToast.timer=setTimeout(function(){toast.className='hcc-toast'},1400)}
  function closeMenus(e){var ls=byId('hccLangSwitch'),mm=byId('hccMobileMenu'),mt=byId('hccMobileMenuToggle');if(ls&&(!e||!ls.contains(e.target)))ls.className='hcc-lang-switch';if(mm&&mt&&(!e||(!mm.contains(e.target)&&e.target!==mt)))mm.className='hcc-mobile-menu'}
  function bindShell(){var langSwitch=byId('hccLangSwitch'),langButton=byId('hccLangButton'),mobileMenu=byId('hccMobileMenu'),mobileToggle=byId('hccMobileMenuToggle');if(mobileToggle&&mobileMenu){mobileToggle.onclick=function(e){e.stopPropagation();mobileMenu.className=mobileMenu.className.indexOf('show')>-1?'hcc-mobile-menu':'hcc-mobile-menu show';if(langSwitch)langSwitch.className='hcc-lang-switch'}}if(langButton&&langSwitch){langButton.onclick=function(e){e.stopPropagation();langSwitch.className=langSwitch.className.indexOf('show')>-1?'hcc-lang-switch':'hcc-lang-switch show';if(mobileMenu)mobileMenu.className='hcc-mobile-menu'}}document.addEventListener('click',closeMenus)}
  window.HCC_SHELL={loadChunk:loadChunk,showToast:showToast,bindShell:bindShell};
  bindShell();
})();



