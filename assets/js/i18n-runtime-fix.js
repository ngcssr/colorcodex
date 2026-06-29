(function(){
  var currentLang = String(window.HCC_ROUTE_LANG || '').toLowerCase() || ((String(location.pathname || '').match(/^\/(zh|ja|ko|es|fr|de|pt)(?=\/|$)/) || [])[1]) || 'en';
  var langNames = {en:'English',zh:'中文',ja:'日本語',ko:'한국어',es:'Español',fr:'Français',de:'Deutsch',pt:'Português'};
  var fallback = {
    en: {
      nav:{picker:'Picker',image:'Image',wheel:'Wheel',chart:'Chart',library:'Color Library',converter:'Converter',rgbToHex:'RGB to Hex',hexToRgb:'Hex to RGB',tools:'Tools',contrast:'Contrast Checker',mixer:'Color Mixer',names:'Names',colorNames:'Color Names',minecraft:'Minecraft',bukkit:'Bukkit',roblox:'Roblox'},
      page:{crumbColor:'Color Codes',crumbTools:'Color Tools',pickerTitle:'Color Picker',pickerDesc:'Browse colors, generate harmonies, convert values, and export color codes in one simple color toolkit.',imageTitle:'Image Color Picker',imageDesc:'Upload an image, pick colors from pixels, extract a palette, and export color codes.',wheelTitle:'Color Wheel',wheelDesc:'Choose colors on a wheel, build palettes, generate harmonies, and export color codes.',chartTitle:'Color Chart',chartDesc:'Find color schemes with Tailwind CSS, flat design, Material Design, and web safe color charts.',libraryTitle:'Color Library',libraryDesc:'Explore over 100 different shades and copy color codes for your projects.',rgbTitle:'RGB to Hex',rgbDesc:'Convert any RGB value to a Hex color code and view matching HSL, HSV, and CMYK values.',hexTitle:'Hex to RGB',hexDesc:'Convert any Hex color code to RGB and view matching HSL, HSV, OKLCH, and CMYK values.',contrastTitle:'Contrast Checker',contrastDesc:'Check the contrast ratio between foreground and background colors for readable designs.',mixerTitle:'Color Mixer',mixerDesc:'Mix two colors and generate blended steps for palettes and interfaces.'},
      ui:{copy:'Copy',random:'Random palette',exportColors:'Export colors',chooseHarmony:'Choose harmony...',history:'History',clear:'Clear',noColors:'No colors yet',copied:'Copied to clipboard',uploadImage:'Upload image',uploadHint:'Click or drop an image to pick colors from it.',wheelNote:'Click or drag on the wheel to pick a color.',colorHarmonies:'Color harmonies',colorVariations:'Color Variations',colorConversion:'Color Conversion',contrastChecker:'Contrast Checker',blindness:'Blindness Simulator',exportCodes:'Export color codes',copyCodes:'Copy codes',prefix:'prefix',toggle:'Toggle',export:'Export',code:'Code',value:'Value',whiteBg:'White background',blackBg:'Black background',contrastBlack:'contrast ratio on a black background',contrastWhite:'contrast ratio on a white background',element:'Element',smallText:'Small text',largeText:'Large text',uiElement:'UI element',lightness:'Lightness',foreground:'Foreground',background:'Background',colorHex:'Color hex',search:'Search colors'}
    },
    zh: {
      nav:{picker:'取色器',image:'图片',wheel:'色轮',chart:'色表',library:'颜色库',converter:'转换器',rgbToHex:'RGB 转 Hex',hexToRgb:'Hex 转 RGB',tools:'工具',contrast:'对比度检查',mixer:'颜色混合器',names:'名称',colorNames:'颜色名称',minecraft:'Minecraft',bukkit:'Bukkit',roblox:'Roblox'},
      page:{crumbColor:'颜色代码',crumbTools:'颜色工具',pickerTitle:'颜色取色器',pickerDesc:'浏览颜色、生成和谐配色、转换数值，并在一个简单的颜色工具中导出颜色代码。',imageTitle:'图片取色器',imageDesc:'上传图片，从像素中取色，提取调色板并导出颜色代码。',wheelTitle:'色轮',wheelDesc:'在色轮上选取颜色，构建调色板，生成和谐配色并导出颜色代码。',chartTitle:'颜色表',chartDesc:'通过 Tailwind CSS、扁平设计、Material Design 和网页安全色表查找配色方案。',libraryTitle:'颜色库',libraryDesc:'浏览 100 多种颜色和色号，并复制到你的项目中。',rgbTitle:'RGB 转 Hex',rgbDesc:'将任意 RGB 值转换为 Hex 颜色代码，并显示对应的 HSL、HSV 和 CMYK 值。',hexTitle:'Hex 转 RGB',hexDesc:'将任意 Hex 色号转换为 RGB，并显示对应的 HSL、HSV、OKLCH 和 CMYK 值。',contrastTitle:'对比度检查器',contrastDesc:'检查前景色与背景色的对比度，创建更易读的设计。',mixerTitle:'颜色混合器',mixerDesc:'混合两种颜色，并生成适合调色板和界面的过渡色。'},
      ui:{copy:'复制',random:'随机调色板',exportColors:'导出颜色',chooseHarmony:'选择和谐配色...',history:'历史记录',clear:'清除',noColors:'暂无颜色',copied:'已复制到剪贴板',uploadImage:'上传图片',uploadHint:'点击或拖入图片，从图片中选取颜色。',wheelNote:'点击或拖动色轮来选取颜色。',colorHarmonies:'颜色和谐',colorVariations:'颜色变化',colorConversion:'颜色转换',contrastChecker:'对比度检查',blindness:'色盲模拟器',exportCodes:'导出颜色代码',copyCodes:'复制代码',prefix:'前缀',toggle:'折叠',export:'导出',code:'代码',value:'值',whiteBg:'白色背景',blackBg:'黑色背景',contrastBlack:'黑色背景对比度',contrastWhite:'白色背景对比度',element:'元素',smallText:'小字号文本',largeText:'大字号文本',uiElement:'界面元素',lightness:'亮度',foreground:'前景色',background:'背景色',colorHex:'颜色 Hex',search:'搜索颜色'},
      footer:{guides:'颜色指南',about:'关于',privacy:'隐私政策',terms:'服务条款',brand:'HTML 颜色代码'}
    },
    ja: {
      nav:{picker:'ピッカー',image:'画像',wheel:'色相環',chart:'チャート',library:'カラーライブラリ',converter:'変換',rgbToHex:'RGB から Hex',hexToRgb:'Hex から RGB',tools:'ツール',contrast:'コントラスト確認',mixer:'カラーミキサー',names:'名前',colorNames:'カラー名',minecraft:'Minecraft',bukkit:'Bukkit',roblox:'Roblox'},
      page:{crumbColor:'カラーコード',crumbTools:'カラーツール',pickerTitle:'カラーピッカー',pickerDesc:'色を選び、ハーモニーを生成し、値を変換して、カラーコードを書き出せます。',imageTitle:'画像カラーピッカー',imageDesc:'画像をアップロードして色を取得し、パレットとコードを書き出せます。',wheelTitle:'色相環',wheelDesc:'色相環で色を選び、パレットやハーモニーを作成してカラーコードを書き出せます。',chartTitle:'カラーチャート',chartDesc:'Tailwind、フラットデザイン、Material、Web セーフカラーから配色を探せます。',libraryTitle:'カラーライブラリ',libraryDesc:'100 種類以上の色を閲覧し、コードをコピーできます。',rgbTitle:'RGB から Hex',rgbDesc:'RGB 値を Hex カラーコードに変換し、HSL、HSV、CMYK も確認できます。',hexTitle:'Hex から RGB',hexDesc:'Hex カラーコードを RGB に変換し、HSL、HSV、OKLCH、CMYK も確認できます。',contrastTitle:'コントラスト確認',contrastDesc:'前景色と背景色のコントラスト比を確認します。',mixerTitle:'カラーミキサー',mixerDesc:'2 色を混ぜて、パレットや UI に使える色を生成します。'},
      ui:{copy:'コピー',random:'ランダムパレット',exportColors:'色を書き出す',chooseHarmony:'ハーモニーを選択...',history:'履歴',clear:'クリア',noColors:'色はまだありません',copied:'クリップボードにコピーしました',uploadImage:'画像をアップロード',uploadHint:'クリックまたは画像をドロップして色を取得します。',wheelNote:'色相環をクリックまたはドラッグして色を選択します。',colorHarmonies:'カラーハーモニー',colorVariations:'色のバリエーション',colorConversion:'色変換',contrastChecker:'コントラスト確認',blindness:'色覚シミュレーター',exportCodes:'カラーコードを書き出す',copyCodes:'コードをコピー',prefix:'プレフィックス',toggle:'切り替え',export:'書き出し',code:'コード',value:'値',whiteBg:'白背景',blackBg:'黒背景',contrastBlack:'黒背景のコントラスト比',contrastWhite:'白背景のコントラスト比',element:'要素',smallText:'小さいテキスト',largeText:'大きいテキスト',uiElement:'UI 要素',lightness:'明度',foreground:'前景色',background:'背景色',colorHex:'カラー Hex',search:'色を検索'},
      footer:{guides:'カラーガイド',about:'概要',privacy:'プライバシーポリシー',terms:'利用規約',brand:'HTML カラーコード'}
    },
    ko: {
      nav:{picker:'피커',image:'이미지',wheel:'색상환',chart:'차트',library:'색상 라이브러리',converter:'변환기',rgbToHex:'RGB to Hex',hexToRgb:'Hex to RGB',tools:'도구',contrast:'대비 검사',mixer:'색상 믹서',names:'이름',colorNames:'색상 이름',minecraft:'Minecraft',bukkit:'Bukkit',roblox:'Roblox'},
      page:{crumbColor:'색상 코드',crumbTools:'색상 도구',pickerTitle:'색상 피커',pickerDesc:'색상을 선택하고 조화 팔레트를 만들고 값을 변환해 색상 코드를 내보냅니다.',imageTitle:'이미지 색상 피커',imageDesc:'이미지를 업로드하고 픽셀에서 색상을 선택해 팔레트를 내보냅니다.',wheelTitle:'색상환',wheelDesc:'색상환에서 색을 선택하고 조화 팔레트와 코드를 만듭니다.',chartTitle:'색상 차트',chartDesc:'Tailwind, flat, Material, web safe 색상표에서 배색을 찾습니다.',libraryTitle:'색상 라이브러리',libraryDesc:'100가지 이상의 색상을 탐색하고 코드를 복사합니다.',rgbTitle:'RGB to Hex',rgbDesc:'RGB 값을 Hex 코드로 변환하고 HSL, HSV, CMYK 값을 확인합니다.',hexTitle:'Hex to RGB',hexDesc:'Hex 코드를 RGB로 변환하고 HSL, HSV, OKLCH, CMYK 값을 확인합니다.',contrastTitle:'대비 검사기',contrastDesc:'전경색과 배경색의 대비율을 확인합니다.',mixerTitle:'색상 믹서',mixerDesc:'두 색상을 혼합해 팔레트와 UI에 쓸 색을 만듭니다.'},
      ui:{copy:'복사',random:'랜덤 팔레트',exportColors:'색상 내보내기',chooseHarmony:'조화 선택...',history:'기록',clear:'지우기',noColors:'색상이 없습니다',copied:'클립보드에 복사됨',uploadImage:'이미지 업로드',uploadHint:'클릭하거나 이미지를 놓아 색상을 선택하세요.',wheelNote:'색상환을 클릭하거나 드래그해 색을 선택하세요.',colorHarmonies:'색상 조화',colorVariations:'색상 변형',colorConversion:'색상 변환',contrastChecker:'대비 검사',blindness:'색각 시뮬레이터',exportCodes:'색상 코드 내보내기',copyCodes:'코드 복사',prefix:'접두사',toggle:'전환',export:'내보내기',code:'코드',value:'값',whiteBg:'흰색 배경',blackBg:'검은색 배경',contrastBlack:'검은색 배경 대비율',contrastWhite:'흰색 배경 대비율',element:'요소',smallText:'작은 텍스트',largeText:'큰 텍스트',uiElement:'UI 요소',lightness:'명도',foreground:'전경색',background:'배경색',colorHex:'색상 Hex',search:'색상 검색'},
      footer:{guides:'색상 가이드',about:'소개',privacy:'개인정보 처리방침',terms:'서비스 약관',brand:'HTML 색상 코드'}
    },
    es: {
      nav:{picker:'Selector',image:'Imagen',wheel:'Rueda',chart:'Tabla',library:'Biblioteca de colores',converter:'Convertidor',rgbToHex:'RGB a Hex',hexToRgb:'Hex a RGB',tools:'Herramientas',contrast:'Comprobador de contraste',mixer:'Mezclador de colores',names:'Nombres',colorNames:'Nombres de colores',minecraft:'Minecraft',bukkit:'Bukkit',roblox:'Roblox'},
      page:{crumbColor:'Códigos de color',crumbTools:'Herramientas de color',pickerTitle:'Selector de color',pickerDesc:'Explora colores, genera armonías, convierte valores y exporta códigos en una herramienta sencilla.',imageTitle:'Selector de color de imagen',imageDesc:'Sube una imagen, toma colores de sus píxeles, extrae una paleta y exporta códigos.',wheelTitle:'Rueda de color',wheelDesc:'Elige colores en una rueda, crea paletas, genera armonías y exporta códigos.',chartTitle:'Tabla de colores',chartDesc:'Encuentra esquemas con tablas Tailwind CSS, flat design, Material Design y colores web seguros.',libraryTitle:'Biblioteca de colores',libraryDesc:'Explora más de 100 tonos y copia códigos de color para tus proyectos.',rgbTitle:'RGB a Hex',rgbDesc:'Convierte cualquier valor RGB a código Hex y consulta sus valores HSL, HSV y CMYK.',hexTitle:'Hex a RGB',hexDesc:'Convierte cualquier código Hex a RGB y consulta sus valores HSL, HSV, OKLCH y CMYK.',contrastTitle:'Comprobador de contraste',contrastDesc:'Comprueba la relación de contraste entre primer plano y fondo.',mixerTitle:'Mezclador de colores',mixerDesc:'Mezcla dos colores y genera tonos para paletas e interfaces.'},
      ui:{copy:'Copiar',random:'Paleta aleatoria',exportColors:'Exportar colores',chooseHarmony:'Elegir armonía...',history:'Historial',clear:'Borrar',noColors:'Aún no hay colores',copied:'Copiado al portapapeles',uploadImage:'Subir imagen',uploadHint:'Haz clic o suelta una imagen para tomar colores.',wheelNote:'Haz clic o arrastra en la rueda para elegir un color.',colorHarmonies:'Armonías de color',colorVariations:'Variaciones de color',colorConversion:'Conversión de color',contrastChecker:'Comprobador de contraste',blindness:'Simulador de daltonismo',exportCodes:'Exportar códigos de color',copyCodes:'Copiar códigos',prefix:'prefijo',toggle:'Alternar',export:'Exportar',code:'Código',value:'Valor',whiteBg:'Fondo blanco',blackBg:'Fondo negro',contrastBlack:'relación de contraste sobre fondo negro',contrastWhite:'relación de contraste sobre fondo blanco',element:'Elemento',smallText:'Texto pequeño',largeText:'Texto grande',uiElement:'Elemento UI',lightness:'Luminosidad',foreground:'Primer plano',background:'Fondo',colorHex:'Color Hex',search:'Buscar colores'},
      footer:{guides:'Guías de color',about:'Acerca de',privacy:'Política de privacidad',terms:'Términos de servicio',brand:'Códigos de color HTML'}
    },
    fr: {
      nav:{picker:'Sélecteur',image:'Image',wheel:'Roue',chart:'Nuancier',library:'Bibliothèque de couleurs',converter:'Convertisseur',rgbToHex:'RGB vers Hex',hexToRgb:'Hex vers RGB',tools:'Outils',contrast:'Vérificateur de contraste',mixer:'Mélangeur de couleurs',names:'Noms',colorNames:'Noms de couleurs',minecraft:'Minecraft',bukkit:'Bukkit',roblox:'Roblox'},
      page:{crumbColor:'Codes couleur',crumbTools:'Outils couleur',pickerTitle:'Sélecteur de couleur',pickerDesc:'Parcourez les couleurs, générez des harmonies, convertissez les valeurs et exportez les codes couleur.',imageTitle:'Sélecteur de couleur d’image',imageDesc:'Importez une image, prélevez des couleurs dans les pixels, extrayez une palette et exportez les codes.',wheelTitle:'Roue chromatique',wheelDesc:'Choisissez des couleurs sur une roue, créez des palettes, générez des harmonies et exportez les codes.',chartTitle:'Nuancier',chartDesc:'Trouvez des schémas avec les nuanciers Tailwind CSS, flat design, Material Design et web safe.',libraryTitle:'Bibliothèque de couleurs',libraryDesc:'Explorez plus de 100 nuances et copiez les codes couleur pour vos projets.',rgbTitle:'RGB vers Hex',rgbDesc:'Convertissez une valeur RGB en code Hex et consultez les valeurs HSL, HSV et CMYK.',hexTitle:'Hex vers RGB',hexDesc:'Convertissez un code Hex en RGB et consultez les valeurs HSL, HSV, OKLCH et CMYK.',contrastTitle:'Vérificateur de contraste',contrastDesc:'Vérifiez le contraste entre premier plan et arrière-plan.',mixerTitle:'Mélangeur de couleurs',mixerDesc:'Mélangez deux couleurs et générez des tons pour palettes et interfaces.'},
      ui:{copy:'Copier',random:'Palette aléatoire',exportColors:'Exporter les couleurs',chooseHarmony:'Choisir une harmonie...',history:'Historique',clear:'Effacer',noColors:'Aucune couleur pour le moment',copied:'Copié dans le presse-papiers',uploadImage:'Importer une image',uploadHint:'Cliquez ou déposez une image pour prélever des couleurs.',wheelNote:'Cliquez ou faites glisser sur la roue pour choisir une couleur.',colorHarmonies:'Harmonies de couleurs',colorVariations:'Variations de couleur',colorConversion:'Conversion de couleur',contrastChecker:'Vérificateur de contraste',blindness:'Simulateur de daltonisme',exportCodes:'Exporter les codes couleur',copyCodes:'Copier les codes',prefix:'préfixe',toggle:'Basculer',export:'Exporter',code:'Code',value:'Valeur',whiteBg:'Fond blanc',blackBg:'Fond noir',contrastBlack:'rapport de contraste sur fond noir',contrastWhite:'rapport de contraste sur fond blanc',element:'Élément',smallText:'Petit texte',largeText:'Grand texte',uiElement:'Élément UI',lightness:'Luminosité',foreground:'Premier plan',background:'Arrière-plan',colorHex:'Couleur Hex',search:'Rechercher des couleurs'},
      footer:{guides:'Guides couleur',about:'À propos',privacy:'Politique de confidentialité',terms:'Conditions d’utilisation',brand:'Codes couleur HTML'}
    },
    de: {
      nav:{picker:'Farbwähler',image:'Bild',wheel:'Farbrad',chart:'Farbtafel',library:'Farbbibliothek',converter:'Konverter',rgbToHex:'RGB zu Hex',hexToRgb:'Hex zu RGB',tools:'Werkzeuge',contrast:'Kontrastprüfer',mixer:'Farbmischer',names:'Namen',colorNames:'Farbnamen',minecraft:'Minecraft',bukkit:'Bukkit',roblox:'Roblox'},
      page:{crumbColor:'Farbcodes',crumbTools:'Farbwerkzeuge',pickerTitle:'Farbwähler',pickerDesc:'Farben durchsuchen, Harmonien erzeugen, Werte konvertieren und Farbcodes exportieren.',imageTitle:'Bild-Farbwähler',imageDesc:'Bild hochladen, Pixel-Farben wählen, Palette extrahieren und Codes exportieren.',wheelTitle:'Farbrad',wheelDesc:'Farben im Farbrad wählen, Paletten und Harmonien erstellen und Codes exportieren.',chartTitle:'Farbtafel',chartDesc:'Farbschemata mit Tailwind CSS, Flat Design, Material Design und Web-Safe-Tabellen finden.',libraryTitle:'Farbbibliothek',libraryDesc:'Mehr als 100 Farbtöne erkunden und Farbcodes kopieren.',rgbTitle:'RGB zu Hex',rgbDesc:'RGB-Werte in Hex-Farbcodes umwandeln und HSL, HSV und CMYK anzeigen.',hexTitle:'Hex zu RGB',hexDesc:'Hex-Farbcodes in RGB umwandeln und HSL, HSV, OKLCH und CMYK anzeigen.',contrastTitle:'Kontrastprüfer',contrastDesc:'Kontrast zwischen Vordergrund und Hintergrund prüfen.',mixerTitle:'Farbmischer',mixerDesc:'Zwei Farben mischen und Zwischentöne für Paletten und Oberflächen erzeugen.'},
      ui:{copy:'Kopieren',random:'Zufallspalette',exportColors:'Farben exportieren',chooseHarmony:'Harmonie wählen...',history:'Verlauf',clear:'Löschen',noColors:'Noch keine Farben',copied:'In die Zwischenablage kopiert',uploadImage:'Bild hochladen',uploadHint:'Klicken oder Bild ablegen, um Farben zu wählen.',wheelNote:'Klicken oder ziehen Sie im Farbrad, um eine Farbe zu wählen.',colorHarmonies:'Farbharmonien',colorVariations:'Farbvariationen',colorConversion:'Farbkonvertierung',contrastChecker:'Kontrastprüfer',blindness:'Farbsinn-Simulator',exportCodes:'Farbcodes exportieren',copyCodes:'Codes kopieren',prefix:'Präfix',toggle:'Umschalten',export:'Exportieren',code:'Code',value:'Wert',whiteBg:'Weißer Hintergrund',blackBg:'Schwarzer Hintergrund',contrastBlack:'Kontrastverhältnis auf schwarzem Hintergrund',contrastWhite:'Kontrastverhältnis auf weißem Hintergrund',element:'Element',smallText:'Kleiner Text',largeText:'Großer Text',uiElement:'UI-Element',lightness:'Helligkeit',foreground:'Vordergrund',background:'Hintergrund',colorHex:'Farb-Hex',search:'Farben suchen'},
      footer:{guides:'Farbleitfäden',about:'Über uns',privacy:'Datenschutz',terms:'Nutzungsbedingungen',brand:'HTML-Farbcodes'}
    },
    pt: {
      nav:{picker:'Seletor',image:'Imagem',wheel:'Roda',chart:'Tabela',library:'Biblioteca de cores',converter:'Conversor',rgbToHex:'RGB para Hex',hexToRgb:'Hex para RGB',tools:'Ferramentas',contrast:'Verificador de contraste',mixer:'Misturador de cores',names:'Nomes',colorNames:'Nomes de cores',minecraft:'Minecraft',bukkit:'Bukkit',roblox:'Roblox'},
      page:{crumbColor:'Códigos de cor',crumbTools:'Ferramentas de cor',pickerTitle:'Seletor de cor',pickerDesc:'Explore cores, gere harmonias, converta valores e exporte códigos de cor em uma ferramenta simples.',imageTitle:'Seletor de cor de imagem',imageDesc:'Envie uma imagem, escolha cores dos pixels, extraia uma paleta e exporte códigos.',wheelTitle:'Roda de cores',wheelDesc:'Escolha cores em uma roda, crie paletas, gere harmonias e exporte códigos.',chartTitle:'Tabela de cores',chartDesc:'Encontre esquemas com tabelas Tailwind CSS, flat design, Material Design e web safe.',libraryTitle:'Biblioteca de cores',libraryDesc:'Explore mais de 100 tons e copie códigos de cor para seus projetos.',rgbTitle:'RGB para Hex',rgbDesc:'Converta qualquer valor RGB para código Hex e veja HSL, HSV e CMYK.',hexTitle:'Hex para RGB',hexDesc:'Converta qualquer código Hex para RGB e veja HSL, HSV, OKLCH e CMYK.',contrastTitle:'Verificador de contraste',contrastDesc:'Verifique a taxa de contraste entre primeiro plano e fundo.',mixerTitle:'Misturador de cores',mixerDesc:'Misture duas cores e gere tons combinados para paletas e interfaces.'},
      ui:{copy:'Copiar',random:'Paleta aleatória',exportColors:'Exportar cores',chooseHarmony:'Escolher harmonia...',history:'Histórico',clear:'Limpar',noColors:'Ainda sem cores',copied:'Copiado para a área de transferência',uploadImage:'Enviar imagem',uploadHint:'Clique ou solte uma imagem para escolher cores.',wheelNote:'Clique ou arraste na roda para escolher uma cor.',colorHarmonies:'Harmonias de cor',colorVariations:'Variações de cor',colorConversion:'Conversão de cor',contrastChecker:'Verificador de contraste',blindness:'Simulador de daltonismo',exportCodes:'Exportar códigos de cor',copyCodes:'Copiar códigos',prefix:'prefixo',toggle:'Alternar',export:'Exportar',code:'Código',value:'Valor',whiteBg:'Fundo branco',blackBg:'Fundo preto',contrastBlack:'taxa de contraste em fundo preto',contrastWhite:'taxa de contraste em fundo branco',element:'Elemento',smallText:'Texto pequeno',largeText:'Texto grande',uiElement:'Elemento de UI',lightness:'Luminosidade',foreground:'Primeiro plano',background:'Fundo',colorHex:'Cor Hex',search:'Pesquisar cores'},
      footer:{guides:'Guias de cores',about:'Sobre',privacy:'Política de privacidade',terms:'Termos de serviço',brand:'Códigos de cor HTML'}
    }
  };

  function merge(base, extra) {
    var out = {};
    Object.keys(base || {}).forEach(function(k){ out[k] = base[k]; });
    Object.keys(extra || {}).forEach(function(k){
      if (extra[k] && typeof extra[k] === 'object' && !Array.isArray(extra[k])) out[k] = merge(out[k], extra[k]);
      else out[k] = extra[k];
    });
    return out;
  }
  var inline = window.HCC_INLINE_I18N && window.HCC_INLINE_I18N[currentLang];
  var dict = merge(fallback[currentLang] || fallback.en, inline || {});
  dict.footer = merge((fallback[currentLang] && fallback[currentLang].footer) || fallback.en.footer || {}, dict.footer || {});
  dict.ui = merge((fallback[currentLang] && fallback[currentLang].ui) || fallback.en.ui, dict.ui || {});
  dict.nav = merge((fallback[currentLang] && fallback[currentLang].nav) || fallback.en.nav, dict.nav || {});
  dict.page = merge((fallback[currentLang] && fallback[currentLang].page) || fallback.en.page, dict.page || {});

  function text(el, value) {
    if (el && value) el.textContent = value;
  }
  function byId(id) {
    return document.getElementById(id);
  }
  function pagePath(slug, lang) {
    var p = {
      picker:'/color-picker/', image:'/image-color-picker/', wheel:'/color-wheel/', chart:'/color-chart/', library:'/colors/',
      converter:'/rgb-to-hex/', hex:'/hex-to-rgb/', contrast:'/contrast-checker/', mixer:'/color-mixer/', names:'/color-names/',
      minecraft:'/minecraft-color-codes/', bukkit:'/bukkit-color-codes/', roblox:'/roblox-color-codes/', guides:'/color-guides/',
      about:'/about/', privacy:'/privacy-policy/', terms:'/terms-of-service/'
    }[slug] || '/color-picker/';
    return (lang && lang !== 'en' ? '/' + lang : '') + p;
  }
  function setLink(id, label, slug) {
    var el = byId(id);
    if (!el) return;
    text(el, label);
    if (slug) el.href = pagePath(slug, currentLang);
  }
  function replaceButtonTextPreserveSvg(el, value) {
    if (!el || !value) return;
    var svgs = Array.prototype.slice.call(el.querySelectorAll('svg,.hcc-copy-mini'));
    el.textContent = value + (svgs.length ? ' ' : '');
    svgs.forEach(function(svg){ el.appendChild(svg); });
  }
  function applyChromeText() {
    var n = dict.nav, ui = dict.ui, f = dict.footer;
    var langButton = byId('hccLangButton');
    if (langButton) langButton.textContent = langNames[currentLang] || 'English';
    Array.prototype.slice.call(document.querySelectorAll('#hccLangMenu button')).forEach(function(btn){
      btn.className = btn.getAttribute('data-lang') === currentLang ? 'active' : '';
    });
    setLink('hccNavPicker', n.picker, 'picker');
    setLink('hccNavImage', n.image, 'image');
    setLink('hccNavWheel', n.wheel, 'wheel');
    setLink('hccNavChart', n.chart, 'chart');
    setLink('hccNavLibrary', n.library, 'library');
    setLink('hccNavConverter', n.converter, 'converter');
    setLink('hccNavRgbHexItem', n.rgbToHex, 'converter');
    setLink('hccNavHexRgbItem', n.hexToRgb, 'hex');
    setLink('hccNavTools', n.tools, 'contrast');
    setLink('hccNavContrastItem', n.contrast, 'contrast');
    setLink('hccNavMixerItem', n.mixer, 'mixer');
    setLink('hccNavNames', n.names, 'names');
    setLink('hccNavNamesColorItem', n.colorNames, 'names');
    setLink('hccNavNamesMinecraftItem', n.minecraft, 'minecraft');
    setLink('hccNavNamesBukkitItem', n.bukkit, 'bukkit');
    setLink('hccNavNamesRobloxItem', n.roblox, 'roblox');
    setLink('hccMobileNavChart', n.chart, 'chart');
    setLink('hccMobileNavLibrary', n.library, 'library');
    setLink('hccMobileNavConverter', n.rgbToHex, 'converter');
    setLink('hccMobileNavHexRgb', n.hexToRgb, 'hex');
    setLink('hccMobileNavContrast', n.contrast, 'contrast');
    setLink('hccMobileNavMixer', n.mixer, 'mixer');
    setLink('hccMobileNavNames', n.colorNames, 'names');
    setLink('hccMobileNavMinecraft', n.minecraft, 'minecraft');
    setLink('hccMobileNavBukkit', n.bukkit, 'bukkit');
    setLink('hccMobileNavRoblox', n.roblox, 'roblox');
    setLink('hccFooterGuides', f.guides || 'Color Guides', 'guides');
    setLink('hccFooterAbout', f.about || 'About', 'about');
    setLink('hccFooterPrivacy', f.privacy || 'Privacy Policy', 'privacy');
    setLink('hccFooterTerms', f.terms || 'Terms of Service', 'terms');
    var brand = byId('hccTrailBrand');
    if (brand) {
      text(brand, f.brand || 'HTML Color Codes');
      brand.href = pagePath('picker', currentLang);
    }
    replaceButtonTextPreserveSvg(byId('hccCopyCurrent'), ui.copy);
    replaceButtonTextPreserveSvg(byId('hccRandom'), ui.random);
    replaceButtonTextPreserveSvg(byId('hccExport'), ui.exportColors);
    replaceButtonTextPreserveSvg(byId('hccCopyExportCodes'), ui.copyCodes);
    text(byId('hccHarmonyButton'), ui.chooseHarmony);
    text(byId('hccToast'), ui.copied);
    Array.prototype.slice.call(document.querySelectorAll('.hcc-panel-toggle,#hccStripToggle')).forEach(function(btn){
      text(btn, ui.toggle);
      btn.setAttribute('aria-label', ui.toggle);
    });
    var empty = document.querySelector('.hcc-image-empty');
    if (empty) {
      text(empty.querySelector('b'), ui.uploadImage);
      text(empty.querySelector('span'), ui.uploadHint);
    }
    text(document.querySelector('.hcc-wheel-note'), ui.wheelNote);
    [['hccHarmonyPanel', ui.colorHarmonies], ['hccVariationsPanel', ui.colorVariations], ['hccConversionPanel', ui.colorConversion], ['hccContrastPanel', ui.contrastChecker], ['hccBlindPanel', ui.blindness]].forEach(function(pair){
      var el = byId(pair[0]);
      text(el && el.querySelector('.hcc-panel-head h2'), pair[1]);
    });
    var modalTitle = document.querySelector('#hccExportModal .hcc-modal-head h2');
    text(modalTitle, ui.exportCodes);
    var prefix = byId('hccExportPrefix');
    if (prefix) prefix.placeholder = ui.prefix;
  }
  function applyHeroText() {
    var page = (document.body && document.body.getAttribute('data-hcc-page')) || '';
    var p = dict.page;
    var crumb = document.querySelector('.hcc-hero .hcc-crumb');
    var title = document.querySelector('.hcc-hero h1');
    var desc = document.querySelector('.hcc-hero p');
    if (!title || !desc) return;
    if (page === 'picker') { text(crumb, p.crumbColor); text(title, p.pickerTitle); text(desc, p.pickerDesc); }
    else if (page === 'image') { text(crumb, p.crumbColor); text(title, p.imageTitle); text(desc, p.imageDesc); }
    else if (page === 'wheel') { text(crumb, p.crumbColor); text(title, p.wheelTitle); text(desc, p.wheelDesc); }
    else if (page === 'library') { text(crumb, p.crumbColor); text(title, p.libraryTitle); text(desc, p.libraryDesc); }
    else if (page === 'chart' || page.indexOf('chart-') === 0) { text(crumb, p.crumbColor); text(title, p.chartTitle); if (page === 'chart') text(desc, p.chartDesc); }
    else if (page === 'converter') { text(crumb, p.crumbColor); text(title, p.rgbTitle); text(desc, p.rgbDesc); }
    else if (page === 'hex-to-rgb') { text(crumb, p.crumbColor); text(title, p.hexTitle); text(desc, p.hexDesc); }
    else if (page === 'contrast-checker') { text(crumb, p.crumbTools); text(title, p.contrastTitle); text(desc, p.contrastDesc); }
    else if (page === 'color-mixer') { text(crumb, p.crumbTools); text(title, p.mixerTitle); text(desc, p.mixerDesc); }
  }
  function translateDynamicText() {
    var ui = dict.ui;
    var phrase = {
      'Toggle':ui.toggle, 'Export':ui.export, 'Code':ui.code, 'Value':ui.value,
      'White background':ui.whiteBg, 'Black background':ui.blackBg,
      'contrast ratio on a black background':ui.contrastBlack,
      'contrast ratio on a white background':ui.contrastWhite,
      'Element':ui.element, 'Small text':ui.smallText, 'Large text':ui.largeText, 'UI element':ui.uiElement,
      'History':ui.history, 'Clear':ui.clear, 'No colors yet':ui.noColors,
      'Color harmonies':ui.colorHarmonies, 'Color Harmonies':ui.colorHarmonies,
      'Color Variations':ui.colorVariations, 'Color Conversion':ui.colorConversion,
      'Contrast Checker':ui.contrastChecker, 'Blindness Simulator':ui.blindness,
      'Foreground':ui.foreground, 'Background':ui.background, 'Color hex':ui.colorHex
    };
    var harmony = {
      'Analogous': {zh:'类似色',ja:'類似色',ko:'유사색',es:'Análogos',fr:'Analogues',de:'Analog',pt:'Análogas'},
      'Complement': {zh:'互补',ja:'補色',ko:'보색',es:'Complemento',fr:'Complément',de:'Komplement',pt:'Complementar'},
      'Complementary': {zh:'互补色',ja:'補色',ko:'보색',es:'Complementarios',fr:'Complémentaires',de:'Komplementär',pt:'Complementares'},
      'Split': {zh:'分裂',ja:'分割',ko:'분할',es:'Dividido',fr:'Divisé',de:'Geteilt',pt:'Dividido'},
      'Split Complementary': {zh:'分裂互补',ja:'分割補色',ko:'분할 보색',es:'Complementarios divididos',fr:'Complémentaires divisés',de:'Geteilte Komplementärfarben',pt:'Complementares divididas'},
      'Split complementary': {zh:'分裂互补',ja:'分割補色',ko:'분할 보색',es:'Complementarios divididos',fr:'Complémentaires divisés',de:'Geteilte Komplementärfarben',pt:'Complementares divididas'},
      'Triadic': {zh:'三色',ja:'トライアド',ko:'삼각 배색',es:'Triádicos',fr:'Triadiques',de:'Triadisch',pt:'Triádicas'},
      'Tetradic': {zh:'四色',ja:'テトラード',ko:'사각 배색',es:'Tetrádicos',fr:'Tétradiques',de:'Tetradisch',pt:'Tetrádicas'},
      'Square': {zh:'方形配色',ja:'スクエア',ko:'정사각 배색',es:'Cuadrado',fr:'Carré',de:'Quadratisch',pt:'Quadrado'},
      'Tint': {zh:'浅色',ja:'明るい色',ko:'틴트',es:'Tinte',fr:'Teinte',de:'Aufhellung',pt:'Tonalidade clara'},
      'Shade': {zh:'深色',ja:'暗い色',ko:'셰이드',es:'Sombra',fr:'Ombre',de:'Schattierung',pt:'Sombra'},
      'Tone': {zh:'灰调',ja:'トーン',ko:'톤',es:'Tono',fr:'Ton',de:'Ton',pt:'Tom'}
    };
    Object.keys(harmony).forEach(function(k){
      if (harmony[k][currentLang]) phrase[k] = harmony[k][currentLang];
    });
    Array.prototype.slice.call(document.querySelectorAll('#hccHarmonyMenu button,#hccHarmonySelect option,.hcc-palette-row>span,.hcc-title h3,.hcc-wide-title h3,.hcc-convert-row.head div,.hcc-contrast-title h3,.hcc-contrast-table th,.hcc-contrast-table td:first-child,.hcc-converter-title,.hcc-contrast-group h3,.hcc-contrast-label')).forEach(function(el){
      var key = (el.textContent || '').replace(/\s+/g, ' ').trim();
      if (phrase[key]) el.textContent = phrase[key];
    });
  }
  function canonicalInfoKeys() {
    return [
      'Using the Color Picker',
      'Use this color picker to choose a color visually, type a value directly, sample colors from an image, or explore palettes from the color wheel. The current color is converted into Hex, RGB, HSL, HSV, and OKLCH so it can move cleanly between CSS, design tools, and exported code.',
      'Using the Hex Color Picker',
      'The picker lets you move through the color field by dragging the selection point, editing the channel values, or entering a Hex code. As the color changes, the swatches, harmonies, variations, contrast previews, and export panels update from the same selected value.',
      'How Many Hex Colors Are There?',
      'A Hex color uses six hexadecimal characters in the form #RRGGBB. Each pair controls red, green, or blue from 00 to FF, which gives web designers 16,777,216 possible RGB colors.',
      'Image Color Picker',
      'The image picker can sample colors directly from an uploaded picture. Move any pick point over the image to capture a color, compare the sampled values, and export the selected image colors without leaving the page.',
      'Color Wheel',
      'The color wheel is useful when you want to work by hue. Drag around the outer ring to change the hue, then adjust the inner area to refine saturation and brightness while keeping the rest of the interface synchronized.',
      'Color Shades, Tints, and Tones',
      'Shades mix the selected color with black, tints mix it with white, and tones move the color toward gray. These variations are useful for hover states, borders, backgrounds, disabled states, and layered interface surfaces.',
      'Color Harmonies',
      'Harmony palettes are built from relationships on the color wheel. Analogous, complementary, split complementary, triadic, tetradic, and square combinations give you fast starting points for brand palettes, UI accents, data colors, and illustration systems.',
      'Color Spaces',
      'RGB describes screen colors through red, green, and blue light. HSL separates hue, saturation, and lightness, making it easier to adjust a color by feel. HSV is common in visual pickers because it maps naturally to saturation and value. OKLCH is designed to feel more even to human vision, which helps when building modern CSS palettes.',
      'Hex Codes',
      'Hex codes are compact, easy to copy, and widely supported in browsers and design tools. Because Hex and RGB describe the same red, green, and blue channels, a color can be converted between the two without changing its appearance.',
      'Exporting Color Codes',
      'Export panels collect the visible palette into formats for Tailwind, Figma, CSS variables, prefixed color functions, and plain code lists. Click a swatch to copy one color, or use the export button when you need the full group.',
      'WCAG and Accessibility',
      'Readable color combinations depend on contrast. The contrast checker compares the selected color against light and dark backgrounds so you can choose text, border, and surface colors with accessibility in mind.',
      'Color Blindness Simulator',
      'The simulator previews how the current color may shift for common color vision conditions. It helps you avoid palettes that rely only on hue differences and encourages stronger contrast, labels, and secondary visual cues.',
      'Dark and Light Mode Theming',
      'Shades, tints, tones, and harmony palettes can become the base for dark and light themes. Start with one color, check the surrounding variations, then export the values that work for backgrounds, foregrounds, buttons, and emphasis states.',
      'Using the Color Wheel',
      'The color wheel is a visual way to understand how colors relate to one another. It arranges hues around a circle, making it easier to choose a base color, compare nearby colors, and build balanced palettes from predictable relationships.',
      'What Is a Color Wheel?',
      'A color wheel places red, orange, yellow, green, blue, and violet around a circular spectrum. Colors that sit close together usually feel related and gentle, while colors across the wheel create stronger contrast and more energy.',
      'How to Use This Color Wheel',
      'Drag around the wheel to choose a hue, then adjust the color inside the picker to refine saturation and brightness. The current color updates the Hex, RGB, HSL, HSV, and OKLCH values, the top palette, the harmony swatches, and the export panels.',
      'Primary Colors',
      'Primary colors are the starting points for many color systems. In traditional art theory they are red, yellow, and blue. On screens, RGB color uses red, green, and blue light to create the colors used in websites, apps, and digital design tools.',
      'Secondary Colors',
      'Secondary colors are created by mixing two primary colors. In a traditional wheel, orange, green, and violet sit between the primary colors and help connect warm, cool, and neutral-feeling palettes.',
      'Tertiary Colors',
      'Tertiary colors sit between primary and secondary colors. They include combinations such as yellow-orange, red-orange, red-violet, blue-violet, blue-green, and yellow-green, giving a palette more nuance than the basic six-color wheel.',
      'Warm and Cool Colors',
      'Warm colors such as red, orange, and yellow often feel active, bright, and attention-grabbing. Cool colors such as blue, green, and violet can feel calmer and more spacious. A strong palette often uses one temperature as the base and the other as an accent.',
      'Complementary Colors',
      'Complementary colors sit opposite each other on the wheel. They create high contrast and are useful for buttons, highlights, badges, and places where an element needs to stand out from the surrounding interface.',
      'Analogous Colors',
      'Analogous palettes use neighboring colors on the wheel. Because the hues are close together, the result usually feels smooth, natural, and easier to control across backgrounds, cards, charts, and illustration details.',
      'Triadic Colors',
      'Triadic palettes use three hues spaced evenly around the wheel. They can create a vivid but balanced scheme when one color leads and the other two are used more sparingly for accents or supporting elements.',
      'Split Complementary Colors',
      'A split complementary palette starts with one base color, then uses the two colors next to its direct complement. This gives strong contrast like a complementary scheme, but with a softer and more flexible range.',
      'Tetradic and Square Colors',
      'Tetradic and square palettes use four colors around the wheel. They are useful when a design needs several accent colors, but they work best when one color is dominant and the rest are balanced through lighter tints or darker shades.',
      'Shades, Tints, and Tones',
      'After choosing a hue relationship, use shades, tints, and tones to make the palette practical. Lighter tints can become backgrounds, darker shades can become text or borders, and muted tones can support secondary UI states.',
      'Building a Color Scheme',
      'Start with the main color, choose a harmony type, then test the result against real interface needs. A complete scheme usually includes a primary color, one or two accents, neutral surfaces, readable text colors, and contrast-safe states.',
      'Exporting Wheel Colors',
      'When the palette feels right, export the colors as CSS variables, Tailwind values, Figma-friendly objects, prefixed color functions, or plain code lists. The same selected color can also be copied directly from any visible swatch.',
      'Accessibility and Contrast',
      'Color harmony does not guarantee readability. Check contrast for text and important controls, avoid relying on color alone, and use the simulator to preview how the palette may change for common color vision conditions.'
    ];
  }
  function renderInfoArticle(selector, items) {
    var mount = document.querySelector(selector);
    if (!mount) return;
    mount.textContent = '';
    items.forEach(function(value, index) {
      var el = document.createElement(index === 0 ? 'h2' : (index % 2 ? 'p' : 'h3'));
      el.textContent = value;
      mount.appendChild(el);
    });
  }
  function renderInfoText() {
    var hasInfo = document.querySelector('.hcc-info-picker,.hcc-info-wheel');
    if (!hasInfo) return;
    var keys = canonicalInfoKeys();
    if (currentLang === 'zh') {
      var zh = window.HCC_PICKER_ZH_TEXT || {};
      renderInfoArticle('.hcc-info-picker', keys.slice(0, 26).map(function(k){ return zh[k] || k; }));
      renderInfoArticle('.hcc-info-wheel', keys.slice(26).map(function(k){ return zh[k] || k; }));
    } else {
      renderInfoArticle('.hcc-info-picker', keys.slice(0, 26));
      renderInfoArticle('.hcc-info-wheel', keys.slice(26));
    }
  }
  function ensureZhInfoText(callback) {
    if (currentLang !== 'zh' || window.HCC_PICKER_ZH_TEXT || !document.querySelector('.hcc-info-picker,.hcc-info-wheel')) {
      callback();
      return;
    }
    var script = document.createElement('script');
    script.src = '/assets/js/picker-zh-text.js?v=' + (window.HCC_ASSET_VERSION || '20260629-151500');
    script.onload = callback;
    script.onerror = callback;
    document.head.appendChild(script);
  }
  function applyAll() {
    applyChromeText();
    applyHeroText();
    translateDynamicText();
    ensureZhInfoText(function(){
      renderInfoText();
      translateDynamicText();
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', applyAll, {once:true});
  else applyAll();
  setTimeout(applyAll, 120);
  setTimeout(applyAll, 520);
  setTimeout(applyAll, 1200);
  var scheduled = false;
  var observer = new MutationObserver(function(){
    if (scheduled) return;
    scheduled = true;
    setTimeout(function(){
      scheduled = false;
      translateDynamicText();
      applyChromeText();
    }, 60);
  });
  if (document.documentElement) observer.observe(document.documentElement, {subtree:true, childList:true});
  setTimeout(function(){ observer.disconnect(); }, 2500);
})();
