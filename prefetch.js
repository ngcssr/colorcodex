(function(){
  var idle=window.requestIdleCallback||function(fn){return setTimeout(fn,900)};
  var pages=[
    '/color-picker/',
    '/image-color-picker/',
    '/color-wheel/',
    '/color-chart/',
    '/colors/',
    '/rgb-to-hex/',
    '/contrast-checker/',
    '/color-mixer/'
  ];
  var chunks=[
    '/data-chart.js?v=20260623-233600',
    '/data-library.js?v=20260623-233600',
    '/data-names.js?v=20260623-233600',
    '/pages-extra.js?v=20260623-233600'
  ];
  function hint(url,as){
    if(document.querySelector('link[href="'+url+'"]'))return;
    var l=document.createElement('link');
    l.rel='prefetch';
    l.href=url;
    if(as)l.as=as;
    document.head.appendChild(l);
  }
  idle(function(){
    pages.forEach(function(p){if(location.pathname!==p)hint(p,'document')});
    chunks.forEach(function(p){hint(p,'script')});
  });
})();
