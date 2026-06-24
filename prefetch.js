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
    '/data-chart.js?v=20260624-101500',
    '/data-library.js?v=20260624-101500',
    '/data-names.js?v=20260624-101500',
    '/pages-extra.js?v=20260624-101500'
  ];
  function hint(url,as){
    if(document.querySelector('link[href="'+url+'"]'))return;
    var l=document.createElement('link');
    l.rel='prefetch';
    l.href=url;
    if(as)l.as=as;
    document.head.appendChild(l);
  }
  function prefixPath(path){
    var m=(location.pathname||'/').match(/^\/(zh|ja|ko|es|fr|de|pt)(?=\/|$)/);
    return (m?('/'+m[1]):'')+path;
  }
  idle(function(){
    pages.forEach(function(p){var url=prefixPath(p);if(location.pathname!==url)hint(url,'document')});
    chunks.forEach(function(p){hint(p,'script')});
  });
})();
