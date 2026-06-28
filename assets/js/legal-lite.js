(function(){
  var currentLang=(String(window.HCC_ROUTE_LANG||'').toLowerCase()||((String(location.pathname||'').match(/^\/(zh|ja|ko|es|fr|de|pt)(?=\/|$)/)||[])[1])||'en');
  var langNames={en:'English',zh:'\u4e2d\u6587',ja:'\u65e5\u672c\u8a9e',ko:'\ud55c\uad6d\uc5b4',es:'Espa\u00f1ol',fr:'Fran\u00e7ais',de:'Deutsch',pt:'Portugu\u00eas'};
  var legalSlugs={about:1,'privacy-policy':1,'terms-of-service':1};
  function pageSlug(){
    var raw=(document.body&&document.body.getAttribute('data-hcc-page'))||'about';
    return legalSlugs[raw]?raw:'about';
  }
  function prefix(lang){lang=lang||currentLang;return lang==='en'?'':'/'+lang}
  function pageUrl(slug,lang){
    var paths={picker:'/color-picker/',image:'/image-color-picker/',wheel:'/color-wheel/',chart:'/color-chart/',library:'/colors/',converter:'/rgb-to-hex/',hex:'/hex-to-rgb/',contrast:'/contrast-checker/',mixer:'/color-mixer/',names:'/color-names/',minecraft:'/minecraft-color-codes/',bukkit:'/bukkit-color-codes/',roblox:'/roblox-color-codes/',guides:'/color-guides/',about:'/about/','privacy-policy':'/privacy-policy/','terms-of-service':'/terms-of-service/'};
    return prefix(lang)+(paths[slug]||paths.about);
  }
  function setLink(id,slug){var el=document.getElementById(id);if(el)el.href=pageUrl(slug)}
  function bindLinks(){
    [['hccNavPicker','picker'],['hccNavImage','image'],['hccNavWheel','wheel'],['hccNavChart','chart'],['hccNavLibrary','library'],['hccNavConverter','converter'],['hccNavRgbHexItem','converter'],['hccNavHexRgbItem','hex'],['hccNavTools','contrast'],['hccNavContrastItem','contrast'],['hccNavMixerItem','mixer'],['hccNavNames','names'],['hccNavNamesColorItem','names'],['hccNavNamesMinecraftItem','minecraft'],['hccNavNamesBukkitItem','bukkit'],['hccNavNamesRobloxItem','roblox'],['hccMobileNavChart','chart'],['hccMobileNavLibrary','library'],['hccMobileNavConverter','converter'],['hccMobileNavHexRgb','hex'],['hccMobileNavContrast','contrast'],['hccMobileNavMixer','mixer'],['hccMobileNavNames','names'],['hccMobileNavMinecraft','minecraft'],['hccMobileNavBukkit','bukkit'],['hccMobileNavRoblox','roblox'],['hccFooterGuides','guides'],['hccFooterAbout','about'],['hccFooterPrivacy','privacy-policy'],['hccFooterTerms','terms-of-service']].forEach(function(pair){setLink(pair[0],pair[1])});
    var brand=document.getElementById('hccTrailBrand');
    if(brand)brand.href=pageUrl('picker');
    var current=document.getElementById('hccTrailCurrent');
    if(current)current.href=pageUrl(pageSlug());
  }
  function bindMenus(){
    var langButton=document.getElementById('hccLangButton'),langSwitch=document.getElementById('hccLangSwitch'),langMenu=document.getElementById('hccLangMenu'),mobileMenu=document.getElementById('hccMobileMenu'),mobileToggle=document.getElementById('hccMobileMenuToggle');
    if(langButton){
      langButton.textContent=langNames[currentLang]||'English';
      langButton.onclick=function(e){
        e.stopPropagation();
        if(langSwitch)langSwitch.className=langSwitch.className.indexOf('show')>-1?'hcc-lang-switch':'hcc-lang-switch show';
        if(mobileMenu)mobileMenu.className='hcc-mobile-menu';
      };
    }
    if(langMenu){
      langMenu.onclick=function(e){e.stopPropagation()};
      Array.prototype.slice.call(langMenu.querySelectorAll('button')).forEach(function(btn){
        btn.className=btn.getAttribute('data-lang')===currentLang?'active':'';
        btn.onclick=function(){
          var lang=btn.getAttribute('data-lang')||'en';
          try{localStorage.setItem('hccLang',lang);localStorage.setItem('hccLangManual','1')}catch(_){}
          location.href=pageUrl(pageSlug(),lang);
        };
      });
    }
    if(mobileToggle&&mobileMenu){
      mobileToggle.onclick=function(e){
        e.stopPropagation();
        mobileMenu.className=mobileMenu.className.indexOf('show')>-1?'hcc-mobile-menu':'hcc-mobile-menu show';
      };
    }
    document.addEventListener('click',function(e){
      if(langSwitch&&!langSwitch.contains(e.target))langSwitch.className='hcc-lang-switch';
      if(mobileMenu&&mobileToggle&&!mobileMenu.contains(e.target)&&e.target!==mobileToggle)mobileMenu.className='hcc-mobile-menu';
    });
  }
  function release(){
    document.documentElement.classList.add('hcc-i18n-ready');
    document.documentElement.classList.remove('hcc-lang-pending');
    document.documentElement.classList.remove('hcc-hover-boot');
  }
  bindLinks();
  bindMenus();
  release();
})();
