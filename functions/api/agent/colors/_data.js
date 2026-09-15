// 颜色数据模块 — 从 data-names.js 提取，供 API 与 MCP 共用
// 数据源：HTML/CSS 命名颜色（140 个），MDN Web Docs 验证

export const NAMED_COLORS = [
  ["IndianRed","CD5C5C","205, 92, 92","0, 53, 58"],
  ["LightCoral","F08080","240, 128, 128","0, 79, 72"],
  ["Salmon","FA8072","250, 128, 114","6, 93, 71"],
  ["DarkSalmon","E9967A","233, 150, 122","15, 72, 70"],
  ["LightSalmon","FFA07A","255, 160, 122","17, 100, 74"],
  ["Crimson","DC143C","220, 20, 60","348, 83, 47"],
  ["Red","FF0000","255, 0, 0","0, 100, 50"],
  ["FireBrick","B22222","178, 34, 34","0, 68, 42"],
  ["DarkRed","8B0000","139, 0, 0","0, 100, 27"],
  ["Pink","FFC0CB","255, 192, 203","350, 100, 88"],
  ["LightPink","FFB6C1","255, 182, 193","351, 100, 86"],
  ["HotPink","FF69B4","255, 105, 180","330, 100, 71"],
  ["DeepPink","FF1493","255, 20, 147","328, 100, 54"],
  ["MediumVioletRed","C71585","199, 21, 133","322, 81, 43"],
  ["PaleVioletRed","DB7093","219, 112, 147","340, 60, 65"],
  ["Orange","FFA500","255, 165, 0","39, 100, 50"],
  ["DarkOrange","FF8C00","255, 140, 0","33, 100, 50"],
  ["Coral","FF7F50","255, 127, 80","16, 100, 66"],
  ["Tomato","FF6347","255, 99, 71","9, 100, 64"],
  ["OrangeRed","FF4500","255, 69, 0","16, 100, 50"],
  ["Gold","FFD700","255, 215, 0","51, 100, 50"],
  ["Yellow","FFFF00","255, 255, 0","60, 100, 50"],
  ["LightYellow","FFFFE0","255, 255, 224","60, 100, 94"],
  ["LemonChiffon","FFFACD","255, 250, 205","54, 100, 90"],
  ["Khaki","F0E68C","240, 230, 140","54, 77, 75"],
  ["Lavender","E6E6FA","230, 230, 250","240, 67, 94"],
  ["Thistle","D8BFD8","216, 191, 216","300, 24, 80"],
  ["Plum","DDA0DD","221, 160, 221","300, 47, 75"],
  ["Violet","EE82EE","238, 130, 238","300, 76, 72"],
  ["Orchid","DA70D6","218, 112, 214","302, 59, 65"],
  ["Magenta","FF00FF","255, 0, 255","300, 100, 50"],
  ["Fuchsia","FF00FF","255, 0, 255","300, 100, 50"],
  ["MediumOrchid","BA55D3","186, 85, 211","294, 60, 58"],
  ["MediumPurple","9370DB","147, 112, 219","260, 60, 65"],
  ["RebeccaPurple","663399","102, 51, 153","270, 50, 40"],
  ["BlueViolet","8A2BE2","138, 43, 226","271, 76, 53"],
  ["DarkViolet","9400D3","148, 0, 211","271, 100, 41"],
  ["DarkOrchid","9932CC","153, 50, 204","280, 61, 50"],
  ["DarkMagenta","8B008B","139, 0, 139","300, 100, 27"],
  ["Purple","800080","128, 0, 128","300, 100, 25"],
  ["Indigo","4B0082","75, 0, 130","275, 100, 25"],
  ["DarkSlateBlue","483D8B","72, 61, 139","248, 39, 39"],
  ["SlateBlue","6A5ACD","106, 90, 205","248, 53, 58"],
  ["MediumSlateBlue","7B68EE","123, 104, 238","249, 80, 67"],
  ["GreenYellow","ADFF2F","173, 255, 47","84, 100, 59"],
  ["Chartreuse","7FFF00","127, 255, 0","90, 100, 50"],
  ["LawnGreen","7CFC00","124, 252, 0","90, 100, 49"],
  ["Lime","00FF00","0, 255, 0","120, 100, 50"],
  ["LimeGreen","32CD32","50, 205, 50","120, 61, 50"],
  ["PaleGreen","98FB98","152, 251, 152","120, 93, 79"],
  ["LightGreen","90EE90","144, 238, 144","120, 73, 75"],
  ["MediumSpringGreen","00FA9A","0, 250, 154","150, 100, 49"],
  ["SpringGreen","00FF7F","0, 255, 127","150, 100, 50"],
  ["MediumSeaGreen","3CB371","60, 179, 113","147, 50, 47"],
  ["SeaGreen","2E8B57","46, 139, 87","146, 50, 36"],
  ["ForestGreen","228B22","34, 139, 34","120, 61, 34"],
  ["Green","008000","0, 128, 0","120, 100, 25"],
  ["DarkGreen","006400","0, 100, 0","120, 100, 20"],
  ["YellowGreen","9ACD32","154, 205, 50","80, 61, 50"],
  ["OliveDrab","6B8E23","107, 142, 35","80, 60, 35"],
  ["Olive","808000","128, 128, 0","60, 100, 25"],
  ["DarkOliveGreen","556B2F","85, 107, 47","82, 39, 30"],
  ["MediumAquamarine","66CDAA","102, 205, 170","160, 51, 60"],
  ["DarkSeaGreen","8FBC8F","143, 188, 143","120, 25, 65"],
  ["LightSeaGreen","20B2AA","32, 178, 170","177, 70, 41"],
  ["DarkCyan","008B8B","0, 139, 139","180, 100, 27"],
  ["Teal","008080","0, 128, 128","180, 100, 25"],
  ["Aqua","00FFFF","0, 255, 255","180, 100, 50"],
  ["Cyan","00FFFF","0, 255, 255","180, 100, 50"],
  ["LightCyan","E0FFFF","224, 255, 255","180, 100, 94"],
  ["DarkTurquoise","00CED1","0, 206, 209","181, 100, 41"],
  ["Turquoise","40E0D0","64, 224, 208","174, 72, 56"],
  ["MediumTurquoise","48D1CC","72, 209, 204","178, 60, 55"],
  ["PaleTurquoise","AFEEEE","175, 238, 238","180, 65, 81"],
  ["AquaMarine","7FFFD4","127, 255, 212","160, 100, 75"],
  ["PowderBlue","B0E0E6","176, 224, 230","187, 52, 80"],
  ["CadetBlue","5F9EA0","95, 158, 160","182, 25, 50"],
  ["SteelBlue","4682B4","70, 130, 180","207, 44, 49"],
  ["LightSteelBlue","B0C4DE","176, 196, 222","214, 41, 78"],
  ["LightBlue","ADD8E6","173, 216, 230","195, 53, 79"],
  ["SkyBlue","87CEEB","135, 206, 235","197, 71, 73"],
  ["LightSkyBlue","87CEFA","135, 206, 250","203, 92, 75"],
  ["DeepSkyBlue","00BFFF","0, 191, 255","195, 100, 50"],
  ["DodgerBlue","1E90FF","30, 144, 255","210, 100, 56"],
  ["CornflowerBlue","6495ED","100, 149, 237","219, 79, 66"],
  ["RoyalBlue","4169E1","65, 105, 225","225, 73, 57"],
  ["Blue","0000FF","0, 0, 255","240, 100, 50"],
  ["MediumBlue","0000CD","0, 0, 205","240, 100, 40"],
  ["DarkBlue","00008B","0, 0, 139","240, 100, 27"],
  ["Navy","000080","0, 0, 128","240, 100, 25"],
  ["MidnightBlue","191970","25, 25, 112","240, 64, 27"],
  ["LavenderBlush","FFF0F5","255, 240, 245","340, 100, 97"],
  ["MistyRose","FFE4E1","255, 228, 225","6, 100, 94"],
  ["Moccasin","FFE4B5","255, 228, 181","38, 100, 86"],
  ["NavajoWhite","FFDEAD","255, 222, 173","36, 100, 84"],
  ["PeachPuff","FFDAB9","255, 218, 185","29, 100, 86"],
  ["OldLace","FDF5E6","253, 245, 230","39, 85, 95"],
  ["Ivory","FFFFF0","255, 255, 240","60, 100, 97"],
  ["Seashell","FFF5EE","255, 245, 238","25, 100, 97"],
  ["Beige","F5F5DC","245, 245, 220","60, 56, 91"],
  ["Wheat","F5DEB3","245, 222, 179","43, 77, 83"],
  ["Cornsilk","FFF8DC","255, 248, 220","48, 100, 93"],
  ["Linen","FAF0E6","250, 240, 230","30, 67, 94"],
  ["AntiqueWhite","FAEBD7","250, 235, 215","34, 56, 91"],
  ["PapayaWhip","FFEFD5","255, 239, 213","37, 100, 92"],
  ["BlanchedAlmond","FFEBCD","255, 235, 205","36, 100, 90"],
  ["Bisque","FFE4C4","255, 228, 196","33, 100, 89"],
  ["BurlyWood","DEB887","222, 184, 135","34, 57, 70"],
  ["Tan","D2B48C","210, 180, 140","34, 44, 69"],
  ["Chocolate","D2691E","210, 105, 30","25, 75, 47"],
  ["Peru","CD853F","205, 133, 63","30, 59, 53"],
  ["SandyBrown","F4A460","244, 164, 96","28, 87, 67"],
  ["SaddleBrown","8B4513","139, 69, 19","25, 76, 31"],
  ["Sienna","A0522D","160, 82, 45","19, 56, 40"],
  ["Brown","A52A2A","165, 42, 42","0, 59, 41"],
  ["Maroon","800000","128, 0, 0","0, 100, 25"],
  ["FloralWhite","FFFAF0","255, 250, 240","40, 100, 97"],
  ["OldLace2","FDF5E6","253, 245, 230","39, 85, 95"],
  ["White","FFFFFF","255, 255, 255","0, 0, 100"],
  ["WhiteSmoke","F5F5F5","245, 245, 245","0, 0, 96"],
  ["Gainsboro","DCDCDC","220, 220, 220","0, 0, 86"],
  ["LightGrey","D3D3D3","211, 211, 211","0, 0, 83"],
  ["LightGray","D3D3D3","211, 211, 211","0, 0, 83"],
  ["Silver","C0C0C0","192, 192, 192","0, 0, 75"],
  ["DarkGray","A9A9A9","169, 169, 169","0, 0, 66"],
  ["DarkGrey","A9A9A9","169, 169, 169","0, 0, 66"],
  ["Gray","808080","128, 128, 128","0, 0, 50"],
  ["Grey","808080","128, 128, 128","0, 0, 50"],
  ["DimGray","696969","105, 105, 105","0, 0, 41"],
  ["DimGrey","696969","105, 105, 105","0, 0, 41"],
  ["Black","000000","0, 0, 0","0, 0, 0"],
  ["Snow","FFFAFA","255, 250, 250","0, 100, 99"],
  ["Honeydew","F0FFF0","240, 255, 240","120, 100, 97"],
  ["MintCream","F5FFFA","245, 255, 250","150, 100, 98"],
  ["Azure","F0FFFF","240, 255, 255","180, 100, 97"],
  ["AliceBlue","F0F8FF","240, 248, 255","208, 100, 97"],
  ["GhostWhite","F8F8FF","248, 248, 255","240, 100, 99"],
  ["WhiteSmoke2","F5F5F5","245, 245, 245","0, 0, 96"],
  ["MintCream2","F5FFFA","245, 255, 250","150, 100, 98"]
];

// 转换 hex -> {r,g,b}
function hexToRgb(hex) {
  let h = hex.replace(/^#/, '').toUpperCase();
  if (h.length === 3) {
    h = h.split('').map(c => c + c).join('');
  }
  if (!/^[0-9A-F]{6}$/.test(h)) return null;
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

// 转换 {r,g,b} -> {h,s,l}
function rgbToHsl({ r, g, b }) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function lookupColor(name) {
  if (!name) return null;
  const target = String(name).trim().toLowerCase();
  for (const row of NAMED_COLORS) {
    if (row[0].toLowerCase() === target) {
      return {
        name: row[0],
        hex: '#' + row[1],
        rgb: `rgb(${row[2]})`,
        hsl: `hsl(${row[3]})`,
        source_url: 'https://www.colorcodetools.com/color-names/',
      };
    }
  }
  return null;
}

export function listColors() {
  return NAMED_COLORS.map(row => ({
    name: row[0],
    hex: '#' + row[1],
    rgb: `rgb(${row[2]})`,
    hsl: `hsl(${row[3]})`,
    source_url: 'https://www.colorcodetools.com/color-names/',
  }));
}

export function convertHex(hex) {
  if (!hex) return null;
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  const hsl = rgbToHsl(rgb);
  return {
    input_hex: '#' + hex.replace(/^#/, '').toUpperCase(),
    rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
    hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
  };
}

export function isValidHex(hex) {
  if (!hex) return false;
  const h = hex.replace(/^#/, '').toUpperCase();
  if (h.length === 3) return /^[0-9A-F]{3}$/.test(h);
  if (h.length === 6) return /^[0-9A-F]{6}$/.test(h);
  return false;
}

// MCP 工具定义
export const MCP_TOOLS = [
  {
    name: 'lookup-color',
    description: 'Retrieve HTML/CSS named color by name. Returns hex, RGB, and HSL codes.',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'HTML/CSS color name, case-insensitive (e.g. Crimson, salmon)' }
      },
      required: ['name'],
    },
  },
  {
    name: 'convert-color',
    description: 'Convert a hex color string to RGB and HSL representations.',
    inputSchema: {
      type: 'object',
      properties: {
        hex: { type: 'string', description: 'Hex string without # prefix, 3 or 6 digits (e.g. DC143C, fff)' }
      },
      required: ['hex'],
    },
  },
];

export function handleMcpTool(name, args) {
  if (name === 'lookup-color') {
    const result = lookupColor(args?.name);
    if (!result) {
      return {
        content: [{ type: 'text', text: JSON.stringify({ error: 'not_found', message: `Color '${args?.name}' is not a recognized named color.` }) }],
        isError: true,
      };
    }
    return {
      content: [{ type: 'text', text: JSON.stringify(result) }],
    };
  }
  if (name === 'convert-color') {
    if (!isValidHex(args?.hex)) {
      return {
        content: [{ type: 'text', text: JSON.stringify({ error: 'invalid_input', message: 'hex parameter must be 3 or 6 hex digits.' }) }],
        isError: true,
      };
    }
    const result = convertHex(args.hex);
    return { content: [{ type: 'text', text: JSON.stringify(result) }] };
  }
  return {
    content: [{ type: 'text', text: JSON.stringify({ error: 'unknown_tool', message: `Tool '${name}' is not supported.` }) }],
    isError: true,
  };
}
