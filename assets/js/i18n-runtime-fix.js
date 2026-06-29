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

  var chartCardText = {
      "zh": {
          "full": "完整色表",
          "chart": "颜色表",
          "brand": "HTML 颜色代码",
          "cards": {
              "tailwind": [
                  "Tailwind 颜色表",
                  "Tailwind CSS 是一种流行的实用优先 CSS 框架，提供大量预定义类，方便快速为 HTML 元素设置样式。"
              ],
              "flat": [
                  "Flat Design 颜色表",
                  "扁平化设计色常用于现代网页设计，使用明快醒目的颜色创建简洁清晰的界面。"
              ],
              "material": [
                  "Material Design 颜色表",
                  "Material Design 是 Google 开发的视觉语言和设计系统，具有近似扁平的风格和鲜明的配色。"
              ],
              "websafe": [
                  "Web Safe 颜色表",
                  "网页安全色源于互联网早期，是一组 216 种标准化颜色，可在主要浏览器中保持一致显示。"
              ]
          }
      },
      "ja": {
          "full": "完全なチャート",
          "chart": "カラーチャート",
          "brand": "HTML カラーコード",
          "cards": {
              "tailwind": [
                  "Tailwind カラーチャート",
                  "Tailwind CSS は人気のユーティリティファースト CSS フレームワークで、HTML 要素のスタイル指定に使える多くの定義済みクラスを提供します。"
              ],
              "flat": [
                  "Flat Design カラーチャート",
                  "フラットデザインの色は、明るく大胆な色でシンプルで見やすいインターフェースを作る現代の Web デザインでよく使われます。"
              ],
              "material": [
                  "Material Design カラーチャート",
                  "Material Design は Google が開発した視覚言語とデザインシステムで、ほぼフラットなスタイルと鮮やかな配色が特徴です。"
              ],
              "websafe": [
                  "Web Safe カラーチャート",
                  "Web セーフカラーはインターネット初期に生まれた 216 色の標準パレットで、主要ブラウザで一貫して表示されるよう設計されました。"
              ]
          }
      },
      "ko": {
          "full": "전체 차트",
          "chart": "색상표",
          "brand": "HTML 색상 코드",
          "cards": {
              "tailwind": [
                  "Tailwind 색상표",
                  "Tailwind CSS 는 HTML 요소 스타일링에 사용할 수 있는 다양한 사전 정의 클래스를 제공하는 인기 유틸리티 우선 CSS 프레임워크입니다."
              ],
              "flat": [
                  "Flat Design 색상표",
                  "플랫 디자인 색상은 현대 웹 디자인에서 굵고 밝은 색으로 깔끔하고 단순한 인터페이스를 만들 때 널리 사용됩니다."
              ],
              "material": [
                  "Material Design 색상표",
                  "Material Design 은 Google 이 개발한 시각 언어와 디자인 시스템으로, 거의 평면적인 스타일과 선명한 색 구성이 특징입니다."
              ],
              "websafe": [
                  "Web Safe 색상표",
                  "웹 안전 색상은 인터넷 초기의 표준화된 216 색 팔레트로, 주요 브라우저에서 일관되게 표시되도록 만들어졌습니다."
              ]
          }
      },
      "es": {
          "full": "Tabla completa",
          "chart": "Tabla de colores",
          "brand": "Códigos de color HTML",
          "cards": {
              "tailwind": [
                  "Tabla de colores Tailwind",
                  "Tailwind CSS es un framework CSS popular de utilidad primero que ofrece muchas clases predefinidas para dar estilo a elementos HTML."
              ],
              "flat": [
                  "Tabla de colores Flat Design",
                  "Los colores de diseño plano son populares en el diseño web moderno, donde los colores brillantes y audaces crean interfaces limpias y simples."
              ],
              "material": [
                  "Tabla de colores Material Design",
                  "Material Design es un lenguaje visual y sistema de diseño desarrollado por Google, con un estilo casi plano y esquemas de color vibrantes."
              ],
              "websafe": [
                  "Tabla de colores Web Safe",
                  "Los colores web seguros surgieron al inicio de Internet como una paleta estandarizada de 216 colores que se mostraba de forma consistente en los principales navegadores."
              ]
          }
      },
      "fr": {
          "full": "Nuancier complet",
          "chart": "Nuancier",
          "brand": "Codes couleur HTML",
          "cards": {
              "tailwind": [
                  "Nuancier Tailwind",
                  "Tailwind CSS est un framework CSS utilitaire populaire qui fournit de nombreuses classes prédéfinies pour styliser les éléments HTML."
              ],
              "flat": [
                  "Nuancier Flat Design",
                  "Les couleurs flat design sont très utilisées dans le Web moderne, avec des couleurs vives et marquées pour créer des interfaces simples et nettes."
              ],
              "material": [
                  "Nuancier Material Design",
                  "Material Design est un langage visuel et un système de design développé par Google, avec un style presque plat et des palettes vibrantes."
              ],
              "websafe": [
                  "Nuancier Web Safe",
                  "Les couleurs Web Safe sont apparues au début d’Internet comme une palette standardisée de 216 couleurs affichées de façon cohérente dans les principaux navigateurs."
              ]
          }
      },
      "de": {
          "full": "Vollständige Tabelle",
          "chart": "Farbtafel",
          "brand": "HTML-Farbcodes",
          "cards": {
              "tailwind": [
                  "Tailwind Farbtafel",
                  "Tailwind CSS ist ein beliebtes Utility-first CSS-Framework mit vielen vordefinierten Klassen zum Gestalten von HTML-Elementen."
              ],
              "flat": [
                  "Flat Design Farbtafel",
                  "Flat-Design-Farben sind im modernen Webdesign beliebt, wo kräftige und helle Farben klare, einfache Oberflächen schaffen."
              ],
              "material": [
                  "Material Design Farbtafel",
                  "Material Design ist eine von Google entwickelte visuelle Sprache und ein Designsystem mit fast flachem Stil und lebendigen Farbschemata."
              ],
              "websafe": [
                  "Web Safe Farbtafel",
                  "Websichere Farben entstanden in der frühen Internetzeit als standardisierte Palette aus 216 Farben, die in wichtigen Browsern konsistent dargestellt wurden."
              ]
          }
      },
      "pt": {
          "full": "Tabela completa",
          "chart": "Tabela de cores",
          "brand": "Códigos de cor HTML",
          "cards": {
              "tailwind": [
                  "Tabela de cores Tailwind",
                  "Tailwind CSS é um framework CSS popular de utilitários que oferece muitas classes predefinidas para estilizar elementos HTML."
              ],
              "flat": [
                  "Tabela de cores Flat Design",
                  "Cores de flat design são populares no design web moderno, usando cores fortes e brilhantes para criar interfaces limpas e simples."
              ],
              "material": [
                  "Tabela de cores Material Design",
                  "Material Design é uma linguagem visual e sistema de design desenvolvido pelo Google, com estilo quase plano e esquemas vibrantes."
              ],
              "websafe": [
                  "Tabela de cores Web Safe",
                  "As cores web safe surgiram no início da internet como uma paleta padronizada de 216 cores exibidas de forma consistente nos principais navegadores."
              ]
          }
      }
  };
  function applyChartCardText() {
    var pack = chartCardText[currentLang];
    if (!pack) return;
    Array.prototype.slice.call(document.querySelectorAll('.hcc-chart-card[data-chart-slug]')).forEach(function(card){
      var slug = card.getAttribute('data-chart-slug');
      var data = pack.cards && pack.cards[slug];
      if (!data) return;
      var h = card.querySelector('h2');
      var p = card.querySelector('p');
      var btn = card.querySelector('.hcc-chart-btn');
      if (h) h.textContent = data[0];
      if (p) p.textContent = data[1];
      if (btn) btn.textContent = pack.full;
    });
    var trail = document.getElementById('hccTrailCurrent');
    if (trail && document.body && document.body.getAttribute('data-hcc-page') === 'chart') trail.textContent = pack.chart;
    var brand = document.getElementById('hccTrailBrand');
    if (brand && pack.brand) brand.textContent = pack.brand;
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

  var localizedInfoText = {
      "zh": [
          "使用颜色取色器",
          "使用这个取色器可以可视化选择颜色、直接输入数值、从图片取样，或通过色轮探索调色板。当前颜色会转换为 Hex、RGB、HSL、HSV 和 OKLCH，方便在 CSS、设计工具和导出代码之间使用。",
          "使用 Hex 颜色取色器",
          "你可以拖动选择点、编辑通道数值，或输入 Hex 代码来选择颜色。颜色变化时，色块、和谐配色、颜色变化、对比度预览和导出面板都会基于同一个当前值同步更新。",
          "Hex 颜色有多少种？",
          "Hex 颜色使用 #RRGGBB 形式的六位十六进制字符。每两位分别控制红、绿、蓝通道，范围从 00 到 FF，因此网页设计中可使用 16,777,216 种 RGB 颜色。",
          "图片取色器",
          "图片取色器可以直接从上传图片中取样。移动任意取色点即可捕获颜色、比较取样值，并在不离开页面的情况下导出选中的图片颜色。",
          "色轮",
          "当你想按色相工作时，色轮非常有用。拖动外环改变色相，再调整内部区域来细化饱和度和亮度，同时保持整个界面同步。",
          "颜色阴影、浅色和色调",
          "阴影会把当前色与黑色混合，浅色会与白色混合，色调会让颜色靠近灰色。这些变化适用于悬停状态、边框、背景、禁用状态和分层界面。",
          "颜色和谐",
          "和谐调色板基于色轮上的关系生成。类似色、互补色、分裂互补色、三色、四色和方形组合，可以快速作为品牌配色、界面强调色、数据颜色和插画系统的起点。",
          "颜色空间",
          "RGB 通过红、绿、蓝光描述屏幕颜色。HSL 将色相、饱和度和亮度分离，便于凭感觉调整颜色。HSV 常用于可视化取色器，因为它自然对应饱和度和明度。OKLCH 更贴近人眼感知，在构建现代 CSS 调色板时更稳定。",
          "Hex 代码",
          "Hex 代码简洁、易复制，并被浏览器和设计工具广泛支持。由于 Hex 和 RGB 描述的是同一组红、绿、蓝通道，两者互转不会改变颜色外观。",
          "导出颜色代码",
          "导出面板可以把当前可见调色板整理为 Tailwind、Figma、CSS 变量、带前缀的颜色函数和纯代码列表。点击色块可复制单个颜色，需要整组颜色时使用导出按钮。",
          "WCAG 与无障碍",
          "可读的配色取决于对比度。对比度检查器会比较当前颜色在浅色和深色背景上的表现，帮助你选择更易读的文字、边框和界面表面颜色。",
          "色盲模拟器",
          "模拟器会预览当前颜色在常见色觉差异下可能出现的变化。它能帮助你避免只依赖色相差异的配色，并鼓励使用更强的对比度、标签和辅助视觉提示。",
          "深色和浅色主题",
          "阴影、浅色、色调和和谐配色都可以作为深浅主题的基础。从一个颜色开始，检查周围变化，再导出适合背景、前景、按钮和强调状态的数值。",
          "使用色轮",
          "色轮是一种直观理解颜色关系的工具。它把色相排列在圆环上，方便选择基础色、比较相邻颜色，并根据可预测的关系构建平衡调色板。",
          "什么是色轮？",
          "色轮将红、橙、黄、绿、蓝、紫排列在圆形光谱上。相邻颜色通常更协调柔和，而相对位置的颜色会形成更强的对比和能量。",
          "如何使用这个色轮",
          "拖动色轮选择色相，再在取色区域中调整饱和度和亮度。当前颜色会同步更新 Hex、RGB、HSL、HSV、OKLCH、顶部色条、和谐色块和导出面板。",
          "原色",
          "原色是许多颜色系统的起点。传统艺术理论中原色是红、黄、蓝；在屏幕上，RGB 使用红、绿、蓝光来生成网站、应用和数字设计工具中的颜色。",
          "二次色",
          "二次色由两个原色混合而成。在传统色轮中，橙、绿、紫位于原色之间，帮助连接暖色、冷色和中性色调。",
          "三次色",
          "三次色位于原色和二次色之间，包括黄橙、红橙、红紫、蓝紫、蓝绿、黄绿等组合，让调色板比基础六色色轮更细腻。",
          "暖色与冷色",
          "红、橙、黄等暖色通常显得活跃、明亮且吸引注意；蓝、绿、紫等冷色则更冷静、更有空间感。强配色常以一种色温为基础，另一种作为强调。",
          "互补色",
          "互补色位于色轮相对位置，会形成高对比，适合按钮、高亮、徽章，以及需要从界面中突出显示的元素。",
          "类似色",
          "类似色调色板使用色轮上的相邻颜色。由于色相接近，效果通常更平滑自然，也更容易控制背景、卡片、图表和插画细节。",
          "三角色",
          "三角色调色板使用色轮上等距的三个色相。当一个颜色作为主色，另外两个少量用于强调或辅助元素时，可以形成鲜明而平衡的方案。",
          "分裂互补色",
          "分裂互补配色从一个基础色开始，再使用其直接互补色两侧的两个颜色。它像互补配色一样有强对比，但范围更柔和也更灵活。",
          "四色和方形配色",
          "四色和方形配色使用色轮上的四个颜色。当设计需要多个强调色时很有用，但最好让一个颜色占主导，其余通过浅色或深色保持平衡。",
          "阴影、浅色和色调",
          "选择色相关系后，可以用阴影、浅色和色调让调色板更实用。较浅的颜色可用于背景，较深的颜色可用于文字或边框，柔和色调可用于次级界面状态。",
          "构建配色方案",
          "从主色开始，选择一种和谐类型，再根据真实界面需求测试结果。完整方案通常包括主色、一两个强调色、中性表面、可读文字颜色和对比度安全状态。",
          "导出色轮颜色",
          "当调色板合适时，可以导出为 CSS 变量、Tailwind 值、Figma 友好对象、带前缀的颜色函数或纯代码列表。任何可见色块上的当前颜色也可以直接复制。",
          "无障碍与对比度",
          "颜色和谐不代表一定可读。请检查文字和重要控件的对比度，避免只依赖颜色传达信息，并用模拟器预览常见色觉差异下的调色板变化。"
      ],
      "ja": [
          "カラーピッカーの使い方",
          "このカラーピッカーでは、視覚的に色を選ぶ、値を直接入力する、画像から色をサンプリングする、色相環からパレットを探す、といった作業ができます。現在の色は Hex、RGB、HSL、HSV、OKLCH に変換され、CSS、デザインツール、書き出しコードで使いやすくなります。",
          "Hex カラーピッカーの使い方",
          "選択ポイントをドラッグしたり、チャンネル値を編集したり、Hex コードを入力して色を調整できます。色が変わると、スウォッチ、配色、バリエーション、コントラスト表示、書き出しパネルが同じ選択値から更新されます。",
          "Hex カラーはいくつありますか？",
          "Hex カラーは #RRGGBB 形式の 6 文字の 16 進数で表します。各 2 文字が赤、緑、青を 00 から FF の範囲で制御するため、Web では 16,777,216 種類の RGB カラーを扱えます。",
          "画像カラーピッカー",
          "画像ピッカーでは、アップロードした画像から直接色を取得できます。画像上のポイントを動かして色を取得し、サンプル値を比較し、選択した画像色を書き出せます。",
          "色相環",
          "色相で作業したいときは色相環が便利です。外側のリングをドラッグして色相を変え、内側で彩度と明度を調整すると、画面全体が同期して更新されます。",
          "シェード、ティント、トーン",
          "シェードは選択色に黒を混ぜ、ティントは白を混ぜ、トーンはグレーに近づけます。これらは hover 状態、境界線、背景、無効状態、階層的な UI 面に役立ちます。",
          "配色の調和",
          "調和パレットは色相環上の関係から作られます。類似色、補色、分割補色、トライアド、テトラード、スクエアは、ブランド、UI アクセント、データ色、イラストの出発点になります。",
          "色空間",
          "RGB は赤、緑、青の光で画面色を表します。HSL は色相、彩度、明度を分けるため感覚的に調整しやすく、HSV は視覚的なピッカーに向いています。OKLCH は人の視覚に近い均一さを目指した色空間です。",
          "Hex コード",
          "Hex コードは短く、コピーしやすく、ブラウザやデザインツールで広く使えます。Hex と RGB は同じ赤、緑、青のチャンネルを表すため、見た目を変えずに相互変換できます。",
          "カラーコードの書き出し",
          "書き出しパネルでは、表示中のパレットを Tailwind、Figma、CSS 変数、プレフィックス付き関数、コード一覧として出力できます。単色はスウォッチをクリックしてコピーできます。",
          "WCAG とアクセシビリティ",
          "読みやすい配色には十分なコントラストが必要です。コントラストチェッカーは、選択色を明るい背景と暗い背景で比較し、文字、境界線、面の色を選びやすくします。",
          "色覚シミュレーター",
          "シミュレーターは、一般的な色覚条件で現在の色がどう変化して見えるかを確認します。色相差だけに頼る配色を避け、より強いコントラストやラベルを使う判断に役立ちます。",
          "ダークモードとライトモード",
          "シェード、ティント、トーン、調和パレットは、ダークテーマやライトテーマの基礎になります。1 色から始めて周辺の変化を確認し、背景、前景、ボタン、強調状態に使える値を書き出します。",
          "色相環の使い方",
          "色相環は、色同士の関係を視覚的に理解するためのツールです。色相を円形に並べることで、基本色の選択、近い色の比較、バランスのよいパレット作成がしやすくなります。",
          "色相環とは？",
          "色相環は赤、オレンジ、黄、緑、青、紫を円形スペクトルに配置します。近い色は穏やかにまとまり、反対側の色は強いコントラストを作ります。",
          "この色相環の使い方",
          "色相環をドラッグして色相を選び、ピッカー内で彩度と明度を調整します。現在色は Hex、RGB、HSL、HSV、OKLCH、上部パレット、調和スウォッチ、書き出しパネルへ反映されます。",
          "原色",
          "原色は多くの色体系の出発点です。伝統的な美術理論では赤、黄、青が原色です。画面では RGB が赤、緑、青の光を使って Web やアプリの色を作ります。",
          "二次色",
          "二次色は 2 つの原色を混ぜて作られます。伝統的な色相環では、オレンジ、緑、紫が原色の間にあり、暖色、寒色、中間的な配色をつなぎます。",
          "三次色",
          "三次色は原色と二次色の間にあります。黄橙、赤橙、赤紫、青紫、青緑、黄緑などがあり、基本の 6 色より細かなニュアンスを作れます。",
          "暖色と寒色",
          "赤、オレンジ、黄などの暖色は活発で明るく目を引きます。青、緑、紫などの寒色は落ち着きや広がりを感じさせます。",
          "補色",
          "補色は色相環で反対側にある色です。強いコントラストを作るため、ボタン、ハイライト、バッジ、目立たせたい要素に適しています。",
          "類似色",
          "類似色パレットは色相環上の隣り合う色を使います。色相が近いため、背景、カード、チャート、イラストで自然にまとまりやすくなります。",
          "トライアド配色",
          "トライアド配色は、色相環上で等間隔に並ぶ 3 色を使います。1 色を主役にし、残りを控えめなアクセントにすると鮮やかで安定した配色になります。",
          "分割補色",
          "分割補色は、基準色と、その直接の補色の両隣にある 2 色を使います。補色に近い強い対比を持ちながら、より柔らかく柔軟です。",
          "テトラードとスクエア配色",
          "テトラードとスクエアは色相環上の 4 色を使います。複数のアクセントが必要なときに有効ですが、1 色を主役にし、他の色は明暗で調整すると扱いやすくなります。",
          "シェード、ティント、トーン",
          "色相関係を選んだら、シェード、ティント、トーンで実用的なパレットにします。明るい色は背景に、暗い色は文字や境界線に、落ち着いた色は補助状態に使えます。",
          "配色を組み立てる",
          "メインカラーから始め、調和タイプを選び、実際の UI 要件で試します。完全な配色には主色、アクセント、中立面、読みやすい文字色、コントラストの安全な状態が必要です。",
          "色相環の色を書き出す",
          "パレットが決まったら、CSS 変数、Tailwind 値、Figma 向けオブジェクト、プレフィックス付き関数、コード一覧として書き出せます。表示中のスウォッチからも直接コピーできます。",
          "アクセシビリティとコントラスト",
          "色の調和だけでは読みやすさは保証されません。文字と重要な操作部品のコントラストを確認し、色だけに頼らず、シミュレーターで色覚条件での変化を確認します。"
      ],
      "ko": [
          "색상 선택기 사용법",
          "이 색상 선택기는 시각적으로 색을 고르고, 값을 직접 입력하고, 이미지에서 색을 샘플링하거나 색상환에서 팔레트를 탐색할 수 있습니다. 현재 색상은 Hex, RGB, HSL, HSV, OKLCH 로 변환되어 CSS, 디자인 도구, 내보내기 코드에서 쉽게 사용할 수 있습니다.",
          "Hex 색상 선택기 사용법",
          "선택 지점을 드래그하거나 채널 값을 편집하거나 Hex 코드를 입력해 색을 조정할 수 있습니다. 색이 바뀌면 스와치, 조화 색상, 변형, 대비 미리보기, 내보내기 패널이 같은 현재 값에서 함께 업데이트됩니다.",
          "Hex 색상은 몇 가지인가요?",
          "Hex 색상은 #RRGGBB 형식의 여섯 자리 16진수 문자로 표현됩니다. 각 두 자리는 빨강, 초록, 파랑 채널을 00 부터 FF 까지 제어하므로 웹에서는 16,777,216 가지 RGB 색상을 사용할 수 있습니다.",
          "이미지 색상 선택기",
          "이미지 선택기는 업로드한 이미지에서 직접 색상을 샘플링할 수 있습니다. 선택 지점을 이미지 위로 이동해 색을 캡처하고, 샘플 값을 비교하며, 선택한 이미지 색상을 페이지 안에서 내보낼 수 있습니다.",
          "색상환",
          "색상을 색상 기준으로 다룰 때 색상환이 유용합니다. 바깥 고리를 드래그해 색상을 바꾸고 내부 영역에서 채도와 밝기를 조정하면 나머지 인터페이스도 함께 동기화됩니다.",
          "셰이드, 틴트, 톤",
          "셰이드는 선택 색상에 검정을 섞고, 틴트는 흰색을 섞으며, 톤은 회색에 가깝게 만듭니다. 이 변형은 hover 상태, 테두리, 배경, 비활성 상태, 계층형 UI 표면에 유용합니다.",
          "색상 조화",
          "조화 팔레트는 색상환의 관계에서 만들어집니다. 유사색, 보색, 분할 보색, 삼색, 사색, 사각 배색은 브랜드 팔레트, UI 강조색, 데이터 색상, 일러스트 시스템의 빠른 시작점이 됩니다.",
          "색 공간",
          "RGB 는 빨강, 초록, 파랑 빛으로 화면 색상을 설명합니다. HSL 은 색상, 채도, 명도를 나누어 감각적으로 조정하기 쉽고, HSV 는 시각적 선택기에 잘 맞습니다. OKLCH 는 사람의 시각에 더 균일하게 느껴지도록 설계되었습니다.",
          "Hex 코드",
          "Hex 코드는 짧고 복사하기 쉬우며 브라우저와 디자인 도구에서 널리 지원됩니다. Hex 와 RGB 는 같은 빨강, 초록, 파랑 채널을 설명하므로 외형 변화 없이 서로 변환할 수 있습니다.",
          "색상 코드 내보내기",
          "내보내기 패널은 보이는 팔레트를 Tailwind, Figma, CSS 변수, 접두사가 붙은 색상 함수, 단순 코드 목록으로 정리합니다. 단일 색상은 스와치를 클릭해 복사할 수 있습니다.",
          "WCAG 와 접근성",
          "읽기 쉬운 색 조합은 대비에 달려 있습니다. 대비 검사기는 선택 색상을 밝은 배경과 어두운 배경에서 비교하여 텍스트, 테두리, 표면 색상을 고르기 쉽게 합니다.",
          "색각 이상 시뮬레이터",
          "시뮬레이터는 일반적인 색각 조건에서 현재 색상이 어떻게 달라 보일 수 있는지 미리 보여줍니다. 색상 차이에만 의존하는 팔레트를 피하고 더 강한 대비와 보조 표시를 사용하도록 돕습니다.",
          "다크 모드와 라이트 모드",
          "셰이드, 틴트, 톤, 조화 팔레트는 다크 테마와 라이트 테마의 기반이 될 수 있습니다. 하나의 색에서 시작해 주변 변형을 확인하고 배경, 전경, 버튼, 강조 상태에 맞는 값을 내보냅니다.",
          "색상환 사용법",
          "색상환은 색상 관계를 시각적으로 이해하는 도구입니다. 색상을 원형으로 배치해 기본 색을 고르고 주변 색을 비교하며 균형 잡힌 팔레트를 만들기 쉽게 합니다.",
          "색상환이란?",
          "색상환은 빨강, 주황, 노랑, 초록, 파랑, 보라를 원형 스펙트럼에 배치합니다. 가까운 색은 부드럽게 느껴지고 반대쪽 색은 강한 대비를 만듭니다.",
          "이 색상환 사용 방법",
          "색상환을 드래그해 색상을 선택한 뒤 선택기 안에서 채도와 밝기를 조정합니다. 현재 색상은 Hex, RGB, HSL, HSV, OKLCH 값과 상단 팔레트, 조화 스와치, 내보내기 패널에 반영됩니다.",
          "원색",
          "원색은 많은 색 체계의 시작점입니다. 전통 미술 이론에서는 빨강, 노랑, 파랑이 원색이며 화면에서는 RGB 가 빨강, 초록, 파랑 빛으로 웹과 앱의 색을 만듭니다.",
          "이차색",
          "이차색은 두 원색을 섞어 만듭니다. 전통 색상환에서는 주황, 초록, 보라가 원색 사이에 위치해 따뜻한 색, 차가운 색, 중간 색을 연결합니다.",
          "삼차색",
          "삼차색은 원색과 이차색 사이에 있습니다. 노랑-주황, 빨강-주황, 빨강-보라, 파랑-보라, 파랑-초록, 노랑-초록 등이 포함되어 팔레트에 더 많은 뉘앙스를 줍니다.",
          "따뜻한 색과 차가운 색",
          "빨강, 주황, 노랑 같은 따뜻한 색은 활기 있고 밝으며 시선을 끕니다. 파랑, 초록, 보라 같은 차가운 색은 더 차분하고 넓게 느껴질 수 있습니다.",
          "보색",
          "보색은 색상환에서 서로 반대편에 있는 색입니다. 높은 대비를 만들기 때문에 버튼, 강조, 배지, 주변 인터페이스에서 눈에 띄어야 하는 요소에 유용합니다.",
          "유사색",
          "유사색 팔레트는 색상환의 이웃 색을 사용합니다. 색상이 가까워 배경, 카드, 차트, 일러스트 세부 요소에서 자연스럽고 제어하기 쉽습니다.",
          "삼색 배색",
          "삼색 배색은 색상환에서 균등하게 떨어진 세 색상을 사용합니다. 한 색을 주로 쓰고 나머지를 보조 강조색으로 쓰면 선명하면서 균형 잡힌 구성이 됩니다.",
          "분할 보색",
          "분할 보색은 기준색 하나와 직접 보색 양옆의 두 색을 사용합니다. 보색과 비슷한 강한 대비를 주면서도 더 부드럽고 유연합니다.",
          "사색과 사각 배색",
          "사색과 사각 배색은 색상환의 네 색을 사용합니다. 여러 강조색이 필요할 때 유용하지만 한 색을 주도색으로 두고 나머지를 밝기나 어둡기로 조절하는 것이 좋습니다.",
          "셰이드, 틴트, 톤",
          "색상 관계를 고른 뒤 셰이드, 틴트, 톤으로 실용적인 팔레트를 만듭니다. 밝은 틴트는 배경이 되고 어두운 셰이드는 텍스트나 테두리가 되며 부드러운 톤은 보조 상태를 지원합니다.",
          "색 구성 만들기",
          "주요 색상에서 시작해 조화 유형을 고르고 실제 인터페이스 요구에 맞춰 테스트합니다. 완성된 구성에는 기본색, 강조색, 중립 표면, 읽기 쉬운 텍스트 색, 대비가 안전한 상태가 포함됩니다.",
          "색상환 색상 내보내기",
          "팔레트가 적절하면 CSS 변수, Tailwind 값, Figma 친화 객체, 접두사 색상 함수, 단순 코드 목록으로 내보낼 수 있습니다. 보이는 스와치에서도 바로 복사할 수 있습니다.",
          "접근성과 대비",
          "색상 조화가 읽기 쉬움을 보장하지는 않습니다. 텍스트와 중요한 컨트롤의 대비를 확인하고 색상만으로 의미를 전달하지 않으며 시뮬레이터로 색각 조건에서의 변화를 확인합니다."
      ],
      "es": [
          "Uso del selector de color",
          "Usa este selector para elegir un color visualmente, escribir un valor directamente, tomar muestras desde una imagen o explorar paletas con la rueda de color. El color actual se convierte a Hex, RGB, HSL, HSV y OKLCH para usarlo con CSS, herramientas de diseño y código exportado.",
          "Uso del selector Hex",
          "Puedes moverte por el campo de color arrastrando el punto de selección, editando valores de canal o introduciendo un código Hex. Al cambiar el color, las muestras, armonías, variaciones, vistas de contraste y paneles de exportación se actualizan desde el mismo valor.",
          "¿Cuántos colores Hex hay?",
          "Un color Hex usa seis caracteres hexadecimales en formato #RRGGBB. Cada par controla rojo, verde o azul de 00 a FF, lo que permite 16,777,216 colores RGB posibles.",
          "Selector de color de imagen",
          "El selector de imagen puede tomar colores directamente desde una imagen cargada. Mueve cualquier punto sobre la imagen para capturar un color, comparar valores y exportar los colores seleccionados.",
          "Rueda de color",
          "La rueda de color es útil cuando quieres trabajar por tono. Arrastra el anillo exterior para cambiar el tono y ajusta el área interior para refinar saturación y brillo manteniendo la interfaz sincronizada.",
          "Sombras, tintes y tonos",
          "Las sombras mezclan el color con negro, los tintes con blanco y los tonos lo acercan al gris. Estas variaciones sirven para hover, bordes, fondos, estados desactivados y superficies de interfaz.",
          "Armonías de color",
          "Las paletas armónicas se crean a partir de relaciones en la rueda. Análogas, complementarias, complementarias divididas, triádicas, tetrádicas y cuadradas ofrecen puntos de partida para marcas, UI, datos e ilustración.",
          "Espacios de color",
          "RGB describe colores de pantalla con luz roja, verde y azul. HSL separa tono, saturación y luminosidad; HSV encaja bien con selectores visuales; OKLCH busca una percepción más uniforme para paletas CSS modernas.",
          "Códigos Hex",
          "Los códigos Hex son compactos, fáciles de copiar y ampliamente compatibles. Como Hex y RGB describen los mismos canales, se convierten entre sí sin cambiar la apariencia del color.",
          "Exportar códigos de color",
          "Los paneles de exportación convierten la paleta visible en formatos para Tailwind, Figma, variables CSS, funciones con prefijo y listas de código. Haz clic en una muestra para copiar un color o usa exportar para todo el grupo.",
          "WCAG y accesibilidad",
          "Las combinaciones legibles dependen del contraste. El comprobador compara el color seleccionado sobre fondos claros y oscuros para ayudarte a elegir texto, bordes y superficies accesibles.",
          "Simulador de daltonismo",
          "El simulador muestra cómo puede cambiar el color actual en condiciones comunes de visión del color. Ayuda a evitar paletas que dependen solo del tono y fomenta contraste, etiquetas y señales visuales secundarias.",
          "Temas oscuros y claros",
          "Sombras, tintes, tonos y armonías pueden ser base para temas claros y oscuros. Empieza con un color, revisa variaciones y exporta valores para fondos, primeros planos, botones y estados de énfasis.",
          "Uso de la rueda de color",
          "La rueda de color ayuda a entender visualmente cómo se relacionan los colores. Ordena los tonos en un círculo para elegir un color base, comparar colores cercanos y construir paletas equilibradas.",
          "¿Qué es una rueda de color?",
          "Una rueda coloca rojo, naranja, amarillo, verde, azul y violeta alrededor de un espectro circular. Los colores cercanos se sienten relacionados; los opuestos crean más contraste y energía.",
          "Cómo usar esta rueda",
          "Arrastra la rueda para elegir un tono y ajusta el selector para refinar saturación y brillo. El color actual actualiza Hex, RGB, HSL, HSV, OKLCH, la paleta superior, armonías y paneles de exportación.",
          "Colores primarios",
          "Los primarios son el punto de partida de muchos sistemas. En teoría artística tradicional son rojo, amarillo y azul. En pantalla, RGB usa rojo, verde y azul para crear colores digitales.",
          "Colores secundarios",
          "Los secundarios se crean mezclando dos primarios. En una rueda tradicional, naranja, verde y violeta conectan colores cálidos, fríos y neutros.",
          "Colores terciarios",
          "Los terciarios se sitúan entre primarios y secundarios, como amarillo-naranja, rojo-naranja, rojo-violeta, azul-violeta, azul-verde y amarillo-verde, aportando más matices.",
          "Colores cálidos y fríos",
          "Rojos, naranjas y amarillos suelen sentirse activos y llamativos. Azules, verdes y violetas pueden sentirse más tranquilos y espaciosos.",
          "Colores complementarios",
          "Los complementarios están opuestos en la rueda. Crean alto contraste y son útiles para botones, destacados, insignias y elementos que deben sobresalir.",
          "Colores análogos",
          "Las paletas análogas usan colores vecinos. Al estar cerca, suelen sentirse suaves, naturales y fáciles de controlar en fondos, tarjetas, gráficos e ilustraciones.",
          "Colores triádicos",
          "Las paletas triádicas usan tres tonos espaciados uniformemente. Pueden ser vivas y equilibradas si un color domina y los otros se usan como acentos.",
          "Complementarios divididos",
          "Una paleta complementaria dividida usa un color base y los dos colores junto a su complemento directo. Da contraste fuerte con un rango más suave y flexible.",
          "Tetrádicos y cuadrados",
          "Estas paletas usan cuatro colores alrededor de la rueda. Son útiles cuando se necesitan varios acentos, pero funcionan mejor con un color dominante.",
          "Sombras, tintes y tonos",
          "Después de elegir una relación de tonos, usa sombras, tintes y tonos para hacer práctica la paleta. Los tintes claros sirven para fondos y las sombras oscuras para texto o bordes.",
          "Crear una combinación",
          "Empieza con el color principal, elige una armonía y prueba el resultado en necesidades reales de interfaz. Una combinación completa incluye color principal, acentos, superficies neutras y texto legible.",
          "Exportar colores de la rueda",
          "Cuando la paleta funcione, expórtala como variables CSS, valores Tailwind, objetos para Figma, funciones con prefijo o listas de código. También puedes copiar cualquier muestra visible.",
          "Accesibilidad y contraste",
          "La armonía no garantiza legibilidad. Comprueba contraste para textos y controles importantes, evita depender solo del color y usa el simulador para prever cambios de percepción."
      ],
      "fr": [
          "Utiliser le sélecteur de couleur",
          "Ce sélecteur permet de choisir une couleur visuellement, de saisir une valeur, de prélever une couleur dans une image ou d’explorer des palettes avec la roue chromatique. La couleur est convertie en Hex, RGB, HSL, HSV et OKLCH pour CSS, les outils de design et le code exporté.",
          "Utiliser le sélecteur Hex",
          "Déplacez le point de sélection, modifiez les valeurs de canal ou saisissez un code Hex. Quand la couleur change, les nuances, harmonies, variations, aperçus de contraste et panneaux d’export se mettent à jour depuis la même valeur.",
          "Combien de couleurs Hex existe-t-il ?",
          "Une couleur Hex utilise six caractères hexadécimaux au format #RRGGBB. Chaque paire contrôle rouge, vert ou bleu de 00 à FF, soit 16,777,216 couleurs RGB possibles.",
          "Sélecteur de couleur d’image",
          "Le sélecteur d’image prélève des couleurs directement depuis une image importée. Déplacez un point sur l’image pour capturer une couleur, comparer les valeurs et exporter les couleurs choisies.",
          "Roue chromatique",
          "La roue est utile pour travailler par teinte. Faites glisser l’anneau extérieur pour changer la teinte, puis ajustez la zone intérieure pour affiner saturation et luminosité.",
          "Ombres, teintes et tons",
          "Les ombres mélangent la couleur avec du noir, les teintes avec du blanc, et les tons la rapprochent du gris. Ces variations servent aux états hover, bordures, arrière-plans et surfaces UI.",
          "Harmonies de couleurs",
          "Les harmonies sont construites depuis les relations sur la roue. Analogues, complémentaires, complémentaires divisées, triadiques, tétradiques et carrées donnent des bases rapides pour marques, UI, données et illustrations.",
          "Espaces colorimétriques",
          "RGB décrit les couleurs d’écran avec la lumière rouge, verte et bleue. HSL sépare teinte, saturation et luminosité; HSV convient aux sélecteurs visuels; OKLCH vise une perception plus régulière.",
          "Codes Hex",
          "Les codes Hex sont compacts, faciles à copier et largement compatibles. Hex et RGB décrivent les mêmes canaux, donc la conversion ne change pas l’apparence.",
          "Exporter les codes couleur",
          "Les panneaux d’export transforment la palette visible en formats Tailwind, Figma, variables CSS, fonctions préfixées ou listes de code. Cliquez une nuance pour copier une couleur.",
          "WCAG et accessibilité",
          "La lisibilité dépend du contraste. Le vérificateur compare la couleur sur fonds clairs et sombres pour choisir textes, bordures et surfaces accessibles.",
          "Simulateur de daltonisme",
          "Le simulateur montre comment la couleur peut changer selon des conditions courantes de vision des couleurs. Il aide à éviter les palettes dépendant uniquement de la teinte.",
          "Thèmes sombre et clair",
          "Ombres, teintes, tons et harmonies peuvent former la base de thèmes sombres et clairs. Partez d’une couleur, vérifiez les variations, puis exportez les valeurs utiles.",
          "Utiliser la roue chromatique",
          "La roue aide à comprendre visuellement les relations entre couleurs. Elle dispose les teintes en cercle pour choisir une base, comparer les couleurs voisines et créer des palettes équilibrées.",
          "Qu’est-ce qu’une roue chromatique ?",
          "Une roue place rouge, orange, jaune, vert, bleu et violet autour d’un spectre circulaire. Les couleurs proches sont douces; les opposées créent plus de contraste.",
          "Comment utiliser cette roue",
          "Faites glisser la roue pour choisir une teinte, puis ajustez saturation et luminosité. La couleur met à jour Hex, RGB, HSL, HSV, OKLCH, palette supérieure, harmonies et export.",
          "Couleurs primaires",
          "Les primaires sont le point de départ de nombreux systèmes. En théorie artistique elles sont rouge, jaune et bleu; sur écran, RGB utilise rouge, vert et bleu.",
          "Couleurs secondaires",
          "Les secondaires sont créées en mélangeant deux primaires. Orange, vert et violet relient couleurs chaudes, froides et neutres.",
          "Couleurs tertiaires",
          "Les tertiaires se trouvent entre primaires et secondaires, comme jaune-orange, rouge-orange, rouge-violet, bleu-violet, bleu-vert et jaune-vert.",
          "Couleurs chaudes et froides",
          "Rouges, oranges et jaunes semblent actifs et lumineux. Bleus, verts et violets paraissent plus calmes et spacieux.",
          "Couleurs complémentaires",
          "Les complémentaires sont opposées sur la roue. Elles créent un fort contraste pour boutons, badges, accents et éléments à faire ressortir.",
          "Couleurs analogues",
          "Les palettes analogues utilisent des couleurs voisines. Elles sont souvent naturelles et faciles à maîtriser sur fonds, cartes, graphiques et illustrations.",
          "Couleurs triadiques",
          "Les triadiques utilisent trois teintes espacées régulièrement. Elles peuvent être vives et équilibrées si une couleur domine.",
          "Complémentaires divisées",
          "Une palette complémentaire divisée part d’une base puis utilise les deux couleurs autour de son complément direct. Elle garde du contraste avec plus de souplesse.",
          "Tétradiques et carrées",
          "Ces palettes utilisent quatre couleurs. Elles sont utiles pour plusieurs accents, mais fonctionnent mieux avec une couleur dominante.",
          "Ombres, teintes et tons",
          "Après avoir choisi une relation de teintes, utilisez ombres, teintes et tons pour rendre la palette pratique. Les teintes claires deviennent des fonds et les ombres du texte.",
          "Construire une palette",
          "Commencez par la couleur principale, choisissez une harmonie, puis testez-la dans l’interface. Une palette complète inclut couleur principale, accents, surfaces neutres et texte lisible.",
          "Exporter les couleurs de la roue",
          "Quand la palette convient, exportez-la en variables CSS, valeurs Tailwind, objets Figma, fonctions préfixées ou listes de code.",
          "Accessibilité et contraste",
          "L’harmonie ne garantit pas la lisibilité. Vérifiez le contraste du texte et des contrôles importants, évitez de dépendre seulement de la couleur."
      ],
      "de": [
          "Farbwähler verwenden",
          "Mit diesem Farbwähler kannst du Farben visuell wählen, Werte direkt eingeben, Farben aus Bildern aufnehmen oder Paletten über das Farbrad erkunden. Die aktuelle Farbe wird in Hex, RGB, HSL, HSV und OKLCH umgewandelt.",
          "Hex-Farbwähler verwenden",
          "Du kannst den Auswahlpunkt ziehen, Kanalwerte bearbeiten oder einen Hex-Code eingeben. Wenn sich die Farbe ändert, werden Farbfelder, Harmonien, Variationen, Kontrastvorschauen und Exportbereiche aktualisiert.",
          "Wie viele Hex-Farben gibt es?",
          "Eine Hex-Farbe nutzt sechs hexadezimale Zeichen im Format #RRGGBB. Je zwei Zeichen steuern Rot, Grün oder Blau von 00 bis FF, also 16.777.216 mögliche RGB-Farben.",
          "Bild-Farbwähler",
          "Der Bild-Farbwähler nimmt Farben direkt aus einem hochgeladenen Bild auf. Bewege einen Punkt über das Bild, vergleiche Werte und exportiere die ausgewählten Bildfarben.",
          "Farbrad",
          "Das Farbrad ist nützlich, wenn du über den Farbton arbeitest. Ziehe den äußeren Ring, um den Farbton zu ändern, und passe innen Sättigung und Helligkeit an.",
          "Schattierungen, Tönungen und Töne",
          "Schattierungen mischen Schwarz hinzu, Tönungen Weiß, und Töne bewegen die Farbe Richtung Grau. Diese Varianten eignen sich für Hover, Rahmen, Hintergründe, deaktivierte Zustände und UI-Flächen.",
          "Farbharmonien",
          "Harmonische Paletten entstehen aus Beziehungen im Farbrad. Analoge, komplementäre, geteilte komplementäre, triadische, tetradische und quadratische Kombinationen sind schnelle Startpunkte.",
          "Farbräume",
          "RGB beschreibt Bildschirmfarben mit rotem, grünem und blauem Licht. HSL trennt Farbton, Sättigung und Helligkeit; HSV passt gut zu visuellen Wählern; OKLCH wirkt für Menschen gleichmäßiger.",
          "Hex-Codes",
          "Hex-Codes sind kompakt, leicht zu kopieren und breit unterstützt. Hex und RGB beschreiben dieselben Kanäle, daher ändert eine Umwandlung nicht das Aussehen.",
          "Farbcodes exportieren",
          "Exportbereiche sammeln die sichtbare Palette als Tailwind, Figma, CSS-Variablen, Präfix-Funktionen oder einfache Codelisten. Ein einzelnes Feld kann direkt kopiert werden.",
          "WCAG und Barrierefreiheit",
          "Lesbare Farbkombinationen brauchen Kontrast. Der Kontrastprüfer vergleicht die Farbe auf hellen und dunklen Hintergründen für Text, Rahmen und Flächen.",
          "Farbsinn-Simulator",
          "Der Simulator zeigt, wie sich die aktuelle Farbe bei häufigen Farbsinn-Bedingungen verändern kann. So vermeidest du Paletten, die nur auf Farbtonunterschieden beruhen.",
          "Dunkle und helle Designs",
          "Schattierungen, Tönungen, Töne und Harmonien können die Grundlage für helle und dunkle Designs bilden. Starte mit einer Farbe, prüfe Varianten und exportiere passende Werte.",
          "Farbrad verwenden",
          "Das Farbrad hilft, Beziehungen zwischen Farben visuell zu verstehen. Es ordnet Farbtöne im Kreis an und erleichtert Grundfarbe, Vergleich und ausgewogene Paletten.",
          "Was ist ein Farbrad?",
          "Ein Farbrad ordnet Rot, Orange, Gelb, Grün, Blau und Violett in einem Kreis an. Nahe Farben wirken verwandt; gegenüberliegende Farben erzeugen stärkeren Kontrast.",
          "So verwendest du dieses Farbrad",
          "Ziehe im Farbrad, um einen Farbton zu wählen, und passe anschließend Sättigung und Helligkeit an. Die Werte und Paletten werden automatisch aktualisiert.",
          "Primärfarben",
          "Primärfarben sind Ausgangspunkte vieler Farbsysteme. In klassischer Kunst sind es Rot, Gelb und Blau; auf Bildschirmen nutzt RGB Rot, Grün und Blau.",
          "Sekundärfarben",
          "Sekundärfarben entstehen aus zwei Primärfarben. Orange, Grün und Violett verbinden warme, kühle und neutrale Paletten.",
          "Tertiärfarben",
          "Tertiärfarben liegen zwischen Primär- und Sekundärfarben, etwa Gelb-Orange, Rot-Orange, Rot-Violett, Blau-Violett, Blau-Grün und Gelb-Grün.",
          "Warme und kühle Farben",
          "Rot, Orange und Gelb wirken aktiv und auffällig. Blau, Grün und Violett wirken ruhiger und weiter.",
          "Komplementärfarben",
          "Komplementärfarben liegen sich im Farbrad gegenüber. Sie erzeugen hohen Kontrast und eignen sich für Buttons, Hervorhebungen und auffällige Elemente.",
          "Analoge Farben",
          "Analoge Paletten nutzen benachbarte Farben. Sie wirken meist weich, natürlich und gut kontrollierbar.",
          "Triadische Farben",
          "Triadische Paletten nutzen drei gleichmäßig verteilte Farbtöne. Mit einer dominanten Farbe und zwei Akzenten wirken sie lebendig und ausgewogen.",
          "Geteilte Komplementärfarben",
          "Eine geteilte komplementäre Palette nutzt eine Grundfarbe und die zwei Farben neben ihrer direkten Komplementärfarbe. Das gibt starken, aber weicheren Kontrast.",
          "Tetradische und quadratische Farben",
          "Diese Paletten verwenden vier Farben. Sie sind gut für mehrere Akzente, funktionieren aber am besten mit einer dominanten Farbe.",
          "Schattierungen, Tönungen und Töne",
          "Nach der Farbtonbeziehung machen Schattierungen, Tönungen und Töne die Palette praktisch. Helle Tönungen werden Hintergründe, dunkle Schattierungen Text oder Rahmen.",
          "Ein Farbschema erstellen",
          "Beginne mit der Hauptfarbe, wähle eine Harmonie und teste sie an echten UI-Anforderungen. Ein vollständiges Schema enthält Hauptfarbe, Akzente, neutrale Flächen und lesbaren Text.",
          "Farbradfarben exportieren",
          "Wenn die Palette passt, exportiere sie als CSS-Variablen, Tailwind-Werte, Figma-Objekte, Präfix-Funktionen oder Codelisten.",
          "Barrierefreiheit und Kontrast",
          "Farbharmonie garantiert keine Lesbarkeit. Prüfe Kontrast für Text und wichtige Bedienelemente und verlasse dich nicht allein auf Farbe."
      ],
      "pt": [
          "Como usar o seletor de cor",
          "Use este seletor para escolher uma cor visualmente, digitar um valor, amostrar cores de uma imagem ou explorar paletas pela roda de cores. A cor atual é convertida para Hex, RGB, HSL, HSV e OKLCH.",
          "Como usar o seletor Hex",
          "Arraste o ponto de seleção, edite valores de canal ou informe um código Hex. Quando a cor muda, amostras, harmonias, variações, contrastes e painéis de exportação são atualizados.",
          "Quantas cores Hex existem?",
          "Uma cor Hex usa seis caracteres hexadecimais no formato #RRGGBB. Cada par controla vermelho, verde ou azul de 00 a FF, oferecendo 16.777.216 cores RGB possíveis.",
          "Seletor de cor de imagem",
          "O seletor de imagem amostra cores diretamente de uma imagem enviada. Mova um ponto sobre a imagem para capturar uma cor, comparar valores e exportar as cores escolhidas.",
          "Roda de cores",
          "A roda é útil para trabalhar por matiz. Arraste o anel externo para mudar o matiz e ajuste a área interna para refinar saturação e brilho.",
          "Sombras, tintas e tons",
          "Sombras misturam a cor com preto, tintas com branco e tons aproximam a cor do cinza. Essas variações servem para hover, bordas, fundos e estados de interface.",
          "Harmonias de cor",
          "Paletas harmônicas vêm das relações na roda. Análogas, complementares, complementares divididas, triádicas, tetrádicas e quadradas são bons pontos de partida.",
          "Espaços de cor",
          "RGB descreve cores de tela com luz vermelha, verde e azul. HSL separa matiz, saturação e luminosidade; HSV combina com seletores visuais; OKLCH busca percepção mais uniforme.",
          "Códigos Hex",
          "Códigos Hex são compactos, fáceis de copiar e amplamente suportados. Como Hex e RGB descrevem os mesmos canais, a conversão não muda a aparência.",
          "Exportar códigos de cor",
          "Os painéis de exportação transformam a paleta visível em Tailwind, Figma, variáveis CSS, funções com prefixo ou listas de código. Clique numa amostra para copiar uma cor.",
          "WCAG e acessibilidade",
          "Combinações legíveis dependem de contraste. O verificador compara a cor em fundos claros e escuros para ajudar na escolha de texto, bordas e superfícies.",
          "Simulador de daltonismo",
          "O simulador mostra como a cor atual pode mudar em condições comuns de visão de cor. Ele ajuda a evitar paletas que dependem só do matiz.",
          "Temas escuros e claros",
          "Sombras, tintas, tons e harmonias podem formar a base de temas claros e escuros. Comece com uma cor, revise variações e exporte valores para fundos, textos e botões.",
          "Como usar a roda de cores",
          "A roda ajuda a entender relações entre cores visualmente. Ela organiza matizes em um círculo para escolher uma base, comparar cores próximas e criar paletas equilibradas.",
          "O que é uma roda de cores?",
          "Uma roda coloca vermelho, laranja, amarelo, verde, azul e violeta em um espectro circular. Cores próximas parecem suaves; opostas criam mais contraste.",
          "Como usar esta roda",
          "Arraste a roda para escolher um matiz e ajuste saturação e brilho no seletor. A cor atual atualiza Hex, RGB, HSL, HSV, OKLCH, paleta superior, harmonias e exportação.",
          "Cores primárias",
          "Cores primárias são o ponto de partida de muitos sistemas. Na teoria tradicional são vermelho, amarelo e azul; nas telas, RGB usa vermelho, verde e azul.",
          "Cores secundárias",
          "Cores secundárias são criadas misturando duas primárias. Laranja, verde e violeta conectam paletas quentes, frias e neutras.",
          "Cores terciárias",
          "Cores terciárias ficam entre primárias e secundárias, como amarelo-laranja, vermelho-laranja, vermelho-violeta, azul-violeta, azul-verde e amarelo-verde.",
          "Cores quentes e frias",
          "Vermelhos, laranjas e amarelos parecem ativos e chamativos. Azuis, verdes e violetas parecem mais calmos e espaçosos.",
          "Cores complementares",
          "Complementares ficam opostas na roda. Elas criam alto contraste para botões, destaques, selos e elementos que precisam se destacar.",
          "Cores análogas",
          "Paletas análogas usam cores vizinhas. Como os matizes são próximos, o resultado tende a ser suave e fácil de controlar.",
          "Cores triádicas",
          "Paletas triádicas usam três matizes igualmente espaçados. Elas podem ser vivas e equilibradas quando uma cor lidera e as outras viram acentos.",
          "Complementares divididas",
          "Uma paleta complementar dividida usa uma cor base e as duas cores ao lado de seu complemento direto. Mantém contraste forte com faixa mais suave.",
          "Tetrádicas e quadradas",
          "Essas paletas usam quatro cores. São úteis para vários acentos, mas funcionam melhor com uma cor dominante.",
          "Sombras, tintas e tons",
          "Depois de escolher uma relação de matizes, use sombras, tintas e tons para tornar a paleta prática. Tintas claras viram fundos e sombras escuras viram texto ou bordas.",
          "Criar um esquema de cores",
          "Comece pela cor principal, escolha uma harmonia e teste em necessidades reais de interface. Um esquema completo inclui cor principal, acentos, superfícies neutras e texto legível.",
          "Exportar cores da roda",
          "Quando a paleta estiver boa, exporte como variáveis CSS, valores Tailwind, objetos Figma, funções com prefixo ou listas de código.",
          "Acessibilidade e contraste",
          "Harmonia de cor não garante legibilidade. Verifique contraste para texto e controles importantes, evite depender apenas de cor e use o simulador."
      ]
  };
  function localizedInfoItems() {
    if (localizedInfoText[currentLang]) return localizedInfoText[currentLang];
    return canonicalInfoKeys();
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
    var items = localizedInfoItems();
    renderInfoArticle('.hcc-info-picker', items.slice(0, 26));
    renderInfoArticle('.hcc-info-wheel', items.slice(26));
  }
  function ensureZhInfoText(callback) {
    callback();
  }
  function applyAll() {
    applyChromeText();
    applyHeroText();
    translateDynamicText();
    applyChartCardText();
    ensureZhInfoText(function(){
      renderInfoText();
      translateDynamicText();
      applyChartCardText();
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
      applyChartCardText();
    }, 60);
  });
  if (document.documentElement) observer.observe(document.documentElement, {subtree:true, childList:true});
  setTimeout(function(){ observer.disconnect(); }, 2500);
})();
