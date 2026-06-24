(function(){
  var idle=window.requestIdleCallback||function(fn){return setTimeout(fn,2200)};
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
  var chunks=['/pages-extra.js?v=20260624-150500'];
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
    chunks.forEach(function(p){hint(p,'script')});
    setTimeout(function(){
      pages.slice(0,3).forEach(function(p){var url=prefixPath(p);if(location.pathname!==url)hint(url,'document')});
    },1800);
  },{timeout:4500});
})();
