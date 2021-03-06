/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

define([], function () {
   
    var sBlanco = 'rgb(255, 255, 255)', Blanco = 'rgba(255, 255, 255, opasity)';
    var sGrisOscuro = 'rgb(50, 50, 50)';
    var sGrisClaro = 'rgb(200, 200, 200)', GrisClaro = 'rgba(200, 200, 200, opasity)';
    var sRojo = 'rgb(228, 50, 30)', Rojo = 'rgba(228, 50, 30, opasity)';
    var sRojoClaro = "rgb(226, 93, 107)";
    var sRosa = "rgb(213, 93, 226)", Rosa = "rgba(213, 93, 226, opasity)";
    var sAmarilloClaro = 'rgb(255, 255, 204)', AmarilloClaro = 'rgba(255, 255, 204, opasity)';
    var sGris = 'rgb(230, 230, 230)', Gris = "rgba(230,230,230, opasity)";
    var sNaranjaClaro = 'rgb(255, 239, 204)';
    var sNaranja = 'rgb(255, 174, 102)', Naranja = 'rgba(255, 174, 102, opasity)';
    var Verde = "rgba(50,230,50,opasity)", sVerde = "rgb(50,230,50)";
    var sMorado ="rgb(200,0,200)", Morado = "rgba(200,0,200, opasity)";
    var Amarillo = "rgba( 245, 255, 46 , opasity)", sAmarillo = "rgb( 245, 255, 46 )";
    var Azul = "rgba(70, 100, 230, opasity)", sAzul = "rgb(70, 100, 230)";
    var FullAzul = "rgba(0, 0, 255, opasity)", sFullAzul = "rgb(0, 0, 255)";
    var Celeste = "rgba( 93, 173, 226, opasity)", sCeleste = "rgb( 93, 173, 226 )";
    var VerdeClaro = "rgba( 134, 255, 132 , opasity)", sVerdeClaro = "rgb( 134, 255, 132 )";
    var palettes = {"Accent": ["#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0", "#f0027f", "#bf5b17", "#666666", "#7fc97f", "#beaed4"], "Accent_r": ["#666666", "#bf5b17", "#f0027f", "#f0027f", "#386cb0", "#ffff99", "#fdc086", "#fdc086", "#beaed4", "#7fc97f"], "Blues": ["#e5eff9", "#d3e4f3", "#bfd8ed", "#a1cbe2", "#7db8da", "#5ca4d0", "#3f8fc5", "#2676b8", "#135fa7", "#08488e"], "Blues_r": ["#08488e", "#135fa7", "#2676b8", "#3f8fc5", "#5ca4d0", "#7db8da", "#a1cbe2", "#bfd8ed", "#d3e4f3", "#e5eff9"], "BrBG": ["#874e0a", "#b57826", "#d6af65", "#eedbaa", "#f5efde", "#e0f0ee", "#aee0d8", "#6abdb2", "#2b8d85", "#016259"], "BrBG_r": ["#016259", "#2b8d85", "#6abdb2", "#aee0d8", "#e0f0ee", "#f5efde", "#eedbaa", "#d6af65", "#b57826", "#874e0a"], "BuGn": ["#eaf7fa", "#daf1f1", "#c4e9e1", "#9ddacb", "#78cab1", "#59bb93", "#3fab72", "#28914d", "#107a37", "#006227"], "BuGn_r": ["#006227", "#107a37", "#28914d", "#3fab72", "#59bb93", "#78cab1", "#9ddacb", "#c4e9e1", "#daf1f1", "#eaf7fa"], "BuPu": ["#e6f0f7", "#d1e1ee", "#bacfe4", "#a1bedb", "#92a4cd", "#8c86be", "#8c68af", "#8948a0", "#84258b", "#730b6e"], "BuPu_r": ["#730b6e", "#84258b", "#8948a0", "#8c68af", "#8c86be", "#92a4cd", "#a1bedb", "#bacfe4", "#d1e1ee", "#e6f0f7"], "CMRmap": ["#1c1c5c", "#37269c", "#5928b5", "#933285", "#da3b46", "#f65718", "#e68502", "#e6b515", "#e6d552", "#ededa3"], "CMRmap_r": ["#ededa3", "#e6d552", "#e6b515", "#e68502", "#f65718", "#da3b46", "#933285", "#5928b5", "#37269c", "#1c1c5c"], "Dark2": ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d", "#666666", "#1b9e77", "#d95f02"], "Dark2_r": ["#666666", "#a6761d", "#e6ab02", "#e6ab02", "#66a61e", "#e7298a", "#7570b3", "#7570b3", "#d95f02", "#1b9e77"], "GnBu": ["#e6f6e1", "#d7efd1", "#c6e9c2", "#abdeb6", "#8bd2bf", "#6bc3c9", "#4bb0d1", "#3192c1", "#1878b4", "#085da0"], "GnBu_r": ["#085da0", "#1878b4", "#3192c1", "#4bb0d1", "#6bc3c9", "#8bd2bf", "#abdeb6", "#c6e9c2", "#d7efd1", "#e6f6e1"], "Greens": ["#eaf7e6", "#d8f0d2", "#c1e6ba", "#a4da9e", "#84cc83", "#62bb6d", "#3fa85b", "#289049", "#107a37", "#006227"], "Greens_r": ["#006227", "#107a37", "#289049", "#3fa85b", "#62bb6d", "#84cc83", "#a4da9e", "#c1e6ba", "#d8f0d2", "#eaf7e6"], "Greys": ["#f4f4f4", "#e6e6e6", "#d4d4d4", "#bfbfbf", "#a4a4a4", "#898989", "#707070", "#575757", "#393939", "#1b1b1b"], "Greys_r": ["#1b1b1b", "#393939", "#575757", "#707070", "#898989", "#a4a4a4", "#bfbfbf", "#d4d4d4", "#e6e6e6", "#f4f4f4"], "OrRd": ["#feecd2", "#fedfb5", "#fdd09a", "#fdbd86", "#fc9e69", "#f77f53", "#ed6145", "#db3926", "#c3150e", "#a50000"], "OrRd_r": ["#a50000", "#c3150e", "#db3926", "#ed6145", "#f77f53", "#fc9e69", "#fdbd86", "#fdd09a", "#fedfb5", "#feecd2"], "Oranges": ["#feead6", "#fedcbb", "#fdca99", "#fdb170", "#fd994d", "#f9802d", "#ef6612", "#dd4d04", "#bd3e02", "#9b3203"], "Oranges_r": ["#9b3203", "#bd3e02", "#dd4d04", "#ef6612", "#f9802d", "#fd994d", "#fdb170", "#fdca99", "#fedcbb", "#feead6"], "PRGn": ["#71267e", "#9262a3", "#b695c4", "#dac3df", "#f0e7f0", "#e9f4e7", "#c7e9c1", "#90ce8d", "#4ea359", "#187334"], "PRGn_r": ["#187334", "#4ea359", "#90ce8d", "#c7e9c1", "#e9f4e7", "#f0e7f0", "#dac3df", "#b695c4", "#9262a3", "#71267e"], "Paired": ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a"], "Paired_r": ["#ffff99", "#6a3d9a", "#cab2d6", "#ff7f00", "#fdbf6f", "#e31a1c", "#fb9a99", "#33a02c", "#b2df8a", "#1f78b4"], "Pastel1": ["#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", "#fed9a6", "#ffffcc", "#e5d8bd", "#fddaec", "#f2f2f2", "#fbb4ae"], "Pastel1_r": ["#f2f2f2", "#fddaec", "#e5d8bd", "#ffffcc", "#fed9a6", "#fed9a6", "#decbe4", "#ccebc5", "#b3cde3", "#fbb4ae"], "Pastel2": ["#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4", "#e6f5c9", "#fff2ae", "#f1e2cc", "#cccccc", "#b3e2cd", "#fdcdac"], "Pastel2_r": ["#cccccc", "#f1e2cc", "#fff2ae", "#fff2ae", "#e6f5c9", "#f4cae4", "#cbd5e8", "#cbd5e8", "#fdcdac", "#b3e2cd"], "PiYG": ["#c01879", "#d965a4", "#eba3cd", "#f9d1e8", "#faedf3", "#eff6e5", "#d6eeb6", "#a7d672", "#75b43b", "#498d20"], "PiYG_r": ["#498d20", "#75b43b", "#a7d672", "#d6eeb6", "#eff6e5", "#faedf3", "#f9d1e8", "#eba3cd", "#d965a4", "#c01879"], "PuBu": ["#f1ebf5", "#e0dded", "#c9cee4", "#a9bfdc", "#86b0d3", "#5ea0ca", "#328dbf", "#0d75b3", "#04649d", "#03517e"], "PuBuGn": ["#f1e8f3", "#e0daec", "#c9cee4", "#a9bfdc", "#7eb0d3", "#55a0ca", "#328fbc", "#0b8393", "#01756f", "#01614f"], "PuBuGn_r": ["#01614f", "#01756f", "#0b8393", "#328fbc", "#55a0ca", "#7eb0d3", "#a9bfdc", "#c9cee4", "#e0daec", "#f1e8f3"], "PuBu_r": ["#03517e", "#04649d", "#0d75b3", "#328dbf", "#5ea0ca", "#86b0d3", "#a9bfdc", "#c9cee4", "#e0dded", "#f1ebf5"], "PuOr": ["#ae5506", "#d77a11", "#f4a84c", "#fed299", "#faedda", "#e9eaf2", "#cbc9e2", "#a39bc7", "#7764a5", "#502382"], "PuOr_r": ["#502382", "#7764a5", "#a39bc7", "#cbc9e2", "#e9eaf2", "#faedda", "#fed299", "#f4a84c", "#d77a11", "#ae5506"], "PuRd": ["#ebe6f2", "#dfcfe6", "#d2b3d7", "#ca97c9", "#d776b8", "#e24fa2", "#e52786", "#d2165f", "#b0084b", "#8a0039"], "PuRd_r": ["#8a0039", "#b0084b", "#d2165f", "#e52786", "#e24fa2", "#d776b8", "#ca97c9", "#d2b3d7", "#dfcfe6", "#ebe6f2"], "Purples": ["#f3f1f7", "#e6e5f1", "#d5d5e9", "#bebfdd", "#a9a7cf", "#9390c3", "#7e79b8", "#6e58a7", "#5e3a98", "#4e1c8a"], "Purples_r": ["#4e1c8a", "#5e3a98", "#6e58a7", "#7e79b8", "#9390c3", "#a9a7cf", "#bebfdd", "#d5d5e9", "#e6e5f1", "#f3f1f7"], "RdBu": ["#ab162a", "#cf5246", "#eb9172", "#fac8af", "#faeae1", "#e6eff4", "#bbdaea", "#7bb6d6", "#3c8abe", "#1e61a5"], "RdBu_r": ["#1e61a5", "#3c8abe", "#7bb6d6", "#bbdaea", "#e6eff4", "#faeae1", "#fac8af", "#eb9172", "#cf5246", "#ab162a"], "RdGy": ["#ab162a", "#cf5246", "#eb9172", "#fac8af", "#feefe6", "#f1f1f1", "#d3d3d3", "#ababab", "#7c7c7c", "#484848"], "RdGy_r": ["#484848", "#7c7c7c", "#ababab", "#d3d3d3", "#f1f1f1", "#feefe6", "#fac8af", "#eb9172", "#cf5246", "#ab162a"], "RdPu": ["#fee6e3", "#fdd4d0", "#fcbfbe", "#faa2b6", "#f87ca8", "#ee559d", "#d93095", "#b60982", "#91017a", "#6c0173"], "RdPu_r": ["#6c0173", "#91017a", "#b60982", "#d93095", "#ee559d", "#f87ca8", "#faa2b6", "#fcbfbe", "#fdd4d0", "#fee6e3"], "RdYlBu": ["#d22b27", "#ee613e", "#fa9b58", "#fece7f", "#fff1aa", "#f1fad9", "#cdeaf3", "#9bcce2", "#6ba2cb", "#436fb1"], "RdYlBu_r": ["#436fb1", "#6ba2cb", "#9bcce2", "#cdeaf3", "#f1fad9", "#fff1aa", "#fece7f", "#fa9b58", "#ee613e", "#d22b27"], "RdYlGn": ["#d22b27", "#ee613e", "#fa9b58", "#fece7c", "#fff1a8", "#eef8a8", "#c7e77f", "#93d168", "#57b65f", "#17934e"], "RdYlGn_r": ["#17934e", "#57b65f", "#93d168", "#c7e77f", "#eef8a8", "#fff1a8", "#fece7c", "#fa9b58", "#ee613e", "#d22b27"], "Reds": ["#fee6da", "#fdd0bc", "#fcb499", "#fc9576", "#fb7858", "#f7593f", "#ec382b", "#d11e1f", "#b61319", "#940b13"], "Reds_r": ["#940b13", "#b61319", "#d11e1f", "#ec382b", "#f7593f", "#fb7858", "#fc9576", "#fcb499", "#fdd0bc", "#fee6da"], "Set1": ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33", "#a65628", "#f781bf", "#999999", "#e41a1c"], "Set1_r": ["#999999", "#f781bf", "#a65628", "#ffff33", "#ff7f00", "#ff7f00", "#984ea3", "#4daf4a", "#377eb8", "#e41a1c"], "Set2": ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494", "#b3b3b3", "#66c2a5", "#fc8d62"], "Set2_r": ["#b3b3b3", "#e5c494", "#ffd92f", "#ffd92f", "#a6d854", "#e78ac3", "#8da0cb", "#8da0cb", "#fc8d62", "#66c2a5"], "Set3": ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd"], "Set3_r": ["#ccebc5", "#bc80bd", "#d9d9d9", "#fccde5", "#b3de69", "#fdb462", "#80b1d3", "#fb8072", "#bebada", "#ffffb3"], "Spectral": ["#d0384e", "#ee6445", "#fa9b58", "#fece7c", "#fff1a8", "#f4faad", "#d1ed9c", "#97d5a4", "#5cb7aa", "#3682ba"], "Spectral_r": ["#3682ba", "#5cb7aa", "#97d5a4", "#d1ed9c", "#f4faad", "#fff1a8", "#fece7c", "#fa9b58", "#ee6445", "#d0384e"], "Wistia": ["#eef757", "#f7ee35", "#ffe418", "#ffd40e", "#ffc505", "#ffb800", "#ffad00", "#ffa200", "#fe9700", "#fd8b00"], "Wistia_r": ["#fd8b00", "#fe9700", "#ffa200", "#ffad00", "#ffb800", "#ffc505", "#ffd40e", "#ffe418", "#f7ee35", "#eef757"], "YlGn": ["#f9fdc5", "#eaf7af", "#d2eda0", "#b1df90", "#8bce81", "#64bc6f", "#3fa85b", "#288a47", "#10743c", "#005e33"], "YlGnBu": ["#f2fabc", "#dcf1b2", "#bbe4b5", "#85cfba", "#57bec1", "#34a9c3", "#1d8dbe", "#2166ac", "#24479d", "#1d2e83"], "YlGnBu_r": ["#1d2e83", "#24479d", "#2166ac", "#1d8dbe", "#34a9c3", "#57bec1", "#85cfba", "#bbe4b5", "#dcf1b2", "#f2fabc"], "YlGn_r": ["#005e33", "#10743c", "#288a47", "#3fa85b", "#64bc6f", "#8bce81", "#b1df90", "#d2eda0", "#eaf7af", "#f9fdc5"], "YlOrBr": ["#fff9c7", "#ffeea9", "#fede86", "#fec754", "#fea937", "#f88a21", "#e96d13", "#d15205", "#b03f03", "#8b3005"], "YlOrBr_r": ["#8b3005", "#b03f03", "#d15205", "#e96d13", "#f88a21", "#fea937", "#fec754", "#fede86", "#ffeea9", "#fff9c7"], "YlOrRd": ["#fff2ac", "#ffe48d", "#fed36f", "#feb54f", "#fd9a42", "#fd7636", "#fa4a29", "#e7231e", "#ce0c22", "#ac0026"], "YlOrRd_r": ["#ac0026", "#ce0c22", "#e7231e", "#fa4a29", "#fd7636", "#fd9a42", "#feb54f", "#fed36f", "#ffe48d", "#fff2ac"], "afmhot": ["#2e0000", "#5c0000", "#8a0a00", "#ba3a00", "#e86800", "#ff9617", "#ffc445", "#fff475", "#ffffa3", "#ffffd1"], "afmhot_r": ["#ffffd1", "#ffffa3", "#fff575", "#ffc445", "#ff9717", "#e86900", "#ba3b00", "#8a0b00", "#5c0000", "#2e0000"], "autumn": ["#ff1700", "#ff2e00", "#ff4500", "#ff5d00", "#ff7400", "#ff8b00", "#ffa200", "#ffba00", "#ffd100", "#ffe800"], "autumn_r": ["#ffe800", "#ffd100", "#ffba00", "#ffa200", "#ff8b00", "#ff7400", "#ff5d00", "#ff4500", "#ff2e00", "#ff1700"], "binary": ["#e8e8e8", "#d1d1d1", "#bababa", "#a2a2a2", "#8b8b8b", "#747474", "#5d5d5d", "#454545", "#2e2e2e", "#171717"], "binary_r": ["#171717", "#2e2e2e", "#454545", "#5d5d5d", "#747474", "#8b8b8b", "#a2a2a2", "#bababa", "#d1d1d1", "#e8e8e8"], "bone": ["#14141c", "#282838", "#3c3c54", "#515171", "#666d85", "#7a8999", "#8ea4ae", "#a3c1c3", "#c0d7d7", "#e0ebeb"], "bone_r": ["#e0ebeb", "#c0d7d7", "#a3c1c3", "#8ea4ae", "#7a8999", "#666d85", "#515171", "#3c3c54", "#282838", "#14141c"], "brg": ["#2e00d1", "#5c00a3", "#8a0075", "#ba0045", "#e80017", "#e81700", "#ba4500", "#8a7500", "#5ca300", "#2ed100"], "brg_r": ["#2ed100", "#5ca300", "#8a7500", "#ba4500", "#e81700", "#e80017", "#ba0045", "#8a0075", "#5c00a3", "#2e00d1"], "bwr": ["#2e2eff", "#5c5cff", "#8a8aff", "#babaff", "#e8e8ff", "#ffe8e8", "#ffbaba", "#ff8a8a", "#ff5c5c", "#ff2e2e"], "bwr_r": ["#ff2e2e", "#ff5c5c", "#ff8a8a", "#ffbaba", "#ffe8e8", "#e8e8ff", "#babaff", "#8a8aff", "#5c5cff", "#2e2eff"], "cividis": ["#013271", "#2f426d", "#48526c", "#5e636f", "#727374", "#878478", "#9d9576", "#b6a96f", "#cebc63", "#e7d150"], "cividis_r": ["#e7d150", "#cebc63", "#b6a96f", "#9d9576", "#878478", "#727374", "#5e636f", "#48526c", "#2f426d", "#013271"], "cool": ["#17e8ff", "#2ed1ff", "#45baff", "#5da2ff", "#748bff", "#8b74ff", "#a25dff", "#ba45ff", "#d12eff", "#e817ff"], "cool_r": ["#e817ff", "#d12eff", "#ba45ff", "#a25dff", "#8b74ff", "#748bff", "#5da2ff", "#45baff", "#2ed1ff", "#17e8ff"], "coolwarm": ["#5673e0", "#7597f6", "#94b6ff", "#b5cdfa", "#d1dae9", "#e8d6cc", "#f5c1a9", "#f6a283", "#ea7b60", "#d44e41"], "coolwarm_r": ["#d44e41", "#ea7b60", "#f6a283", "#f5c1a9", "#e8d6cc", "#d1dae9", "#b5cdfa", "#94b6ff", "#7597f6", "#5673e0"], "copper": ["#1c120b", "#392417", "#553622", "#73492e", "#8f5b3a", "#ac6d45", "#c87f51", "#e6915d", "#ffa368", "#ffb573"], "copper_r": ["#ffb573", "#ffa368", "#e6915d", "#c87f51", "#ac6d45", "#8f5b3a", "#73492e", "#553622", "#392417", "#1c120b"], "cubehelix": ["#19122b", "#17344c", "#185b48", "#3c7632", "#7e7a36", "#bc7967", "#d486af", "#caa9e7", "#c2d2f3", "#d6f0ef"], "cubehelix_r": ["#d6f0ef", "#c2d2f3", "#caa9e7", "#d486af", "#bc7967", "#7e7a36", "#3c7632", "#185b48", "#17344c", "#19122b"], "flag": ["#497aff", "#570000", "#fcfeff", "#000000", "#ffdbaf", "#0000af", "#ff0900", "#0313ff", "#a80000", "#b6e0ff"], "flag_r": ["#b6e0ff", "#a80000", "#0313ff", "#ff0900", "#0000af", "#ffdbaf", "#000000", "#fcfeff", "#570000", "#497aff"], "gist_earth": ["#0f2577", "#1f557b", "#2e7b7f", "#3a8c66", "#45994a", "#76a652", "#9db059", "#bab061", "#caa87b", "#e3c3b6"], "gist_earth_r": ["#e3c3b6", "#caa87b", "#bab061", "#9db059", "#76a652", "#45994a", "#3a8c66", "#2e7b7f", "#1f557b", "#0f2577"], "gist_gray": ["#171717", "#2e2e2e", "#454545", "#5d5d5d", "#747474", "#8b8b8b", "#a2a2a2", "#bababa", "#d1d1d1", "#e8e8e8"], "gist_gray_r": ["#e8e8e8", "#d1d1d1", "#bababa", "#a2a2a2", "#8b8b8b", "#747474", "#5d5d5d", "#454545", "#2e2e2e", "#171717"], "gist_heat": ["#220000", "#450000", "#680000", "#8b0000", "#ae0000", "#d01700", "#f34500", "#ff7500", "#ffa347", "#ffd1a3"], "gist_heat_r": ["#ffd1a3", "#ffa347", "#ff7500", "#f34500", "#d11700", "#ae0000", "#8c0000", "#680000", "#450000", "#230000"], "gist_ncar": ["#001bac", "#00d7ff", "#00fa88", "#59d200", "#a4ff28", "#fff000", "#ffb20d", "#ff1300", "#cf18ff", "#ee8df0"], "gist_ncar_r": ["#ee8df0", "#cf18ff", "#ff1300", "#ffb20d", "#fff000", "#a4ff28", "#59d200", "#00fa88", "#00d7ff", "#001bac"], "gist_rainbow": ["#ff5300", "#ffcf00", "#b2ff00", "#31ff00", "#00ff4b", "#00ffc7", "#00bbff", "#0038ff", "#4500ff", "#c200ff"], "gist_rainbow_r": ["#c200ff", "#4500ff", "#0038ff", "#00bbff", "#00ffc7", "#00ff4b", "#31ff00", "#b2ff00", "#ffcf00", "#ff5300"], "gist_stern": ["#d2172e", "#5f2e5c", "#45458a", "#5d5dba", "#7474e8", "#8b8bce", "#a2a26c", "#baba06", "#d1d151", "#e8e8a8"], "gist_stern_r": ["#e8e8a8", "#d1d151", "#baba06", "#a2a26c", "#8b8bce", "#7474e8", "#5d5dba", "#45458a", "#5f2e5c", "#d2172e"], "gist_yarg": ["#e8e8e8", "#d1d1d1", "#bababa", "#a2a2a2", "#8b8b8b", "#747474", "#5d5d5d", "#454545", "#2e2e2e", "#171717"], "gist_yarg_r": ["#171717", "#2e2e2e", "#454545", "#5d5d5d", "#747474", "#8b8b8b", "#a2a2a2", "#bababa", "#d1d1d1", "#e8e8e8"], "gnuplot": ["#4d0089", "#6c01e7", "#8505fd", "#9a0cc0", "#ac1847", "#bc2900", "#cb4100", "#da6300", "#e78c00", "#f3c000"], "gnuplot2": ["#00005c", "#0000b8", "#1000ff", "#5b00ff", "#a312ed", "#eb40bf", "#ff6e91", "#ff9e61", "#ffcc33", "#fffa05"], "gnuplot2_r": ["#fffa05", "#ffcc33", "#ff9e61", "#ff6e91", "#eb40bf", "#a312ed", "#5b00ff", "#1000ff", "#0000b8", "#00005c"], "gnuplot_r": ["#f3c000", "#e78c00", "#da6300", "#cb4100", "#bc2900", "#ac1847", "#9a0cc0", "#8505fd", "#6c01e7", "#4d0089"], "gray": ["#171717", "#2e2e2e", "#454545", "#5d5d5d", "#747474", "#8b8b8b", "#a2a2a2", "#bababa", "#d1d1d1", "#e8e8e8"], "gray_r": ["#e8e8e8", "#d1d1d1", "#bababa", "#a2a2a2", "#8b8b8b", "#747474", "#5d5d5d", "#454545", "#2e2e2e", "#171717"], "hot": ["#470000", "#830000", "#c00000", "#ff0000", "#ff3c00", "#ff7900", "#ffb500", "#fff400", "#ffff4a", "#ffffa4"], "hot_r": ["#ffffa4", "#ffff4a", "#fff400", "#ffb500", "#ff7900", "#ff3c00", "#ff0000", "#c00000", "#830000", "#470000"], "hsv": ["#ff8800", "#eeff00", "#66ff00", "#00ff27", "#00ffaf", "#00c7ff", "#003fff", "#4f00ff", "#d600ff", "#ff00a0"], "hsv_r": ["#ff00a0", "#d600ff", "#4f00ff", "#003fff", "#00c7ff", "#00ffaf", "#00ff27", "#66ff00", "#eeff00", "#ff8800"], "icefire": ["#7bbbce", "#3f90ce", "#475cbc", "#3b3866", "#22222b", "#2d1f21", "#622937", "#a83044", "#dc5534", "#f29558"], "icefire_r": ["#f29558", "#dc5534", "#a83044", "#622937", "#2d1f21", "#22222b", "#3b3866", "#475cbc", "#3f90ce", "#7bbbce"], "inferno": ["#140b34", "#390963", "#5f136e", "#85216b", "#a92e5e", "#cb4149", "#e65d2f", "#f78410", "#fcae12", "#f5db4c"], "inferno_r": ["#f5db4c", "#fcae12", "#f78410", "#e65d2f", "#cb4149", "#a92e5e", "#85216b", "#5f136e", "#390963", "#140b34"], "jet_r": ["#e80000", "#ff5500", "#ffab00", "#ebff0c", "#a0ff56", "#56ffa0", "#0cf4eb", "#0094ff", "#0038ff", "#0000e8"], "magma": ["#120d31", "#331067", "#59157e", "#7e2482", "#a3307e", "#c83e73", "#e95462", "#fa7d5e", "#fea973", "#fed395"], "magma_r": ["#fed395", "#fea973", "#fa7d5e", "#e95462", "#c83e73", "#a3307e", "#7e2482", "#59157e", "#331067", "#120d31"], "mako": ["#231526", "#35264c", "#403974", "#3d5296", "#366da0", "#3487a6", "#35a1ab", "#44bcad", "#6dd3ad", "#aee3c0"], "mako_r": ["#aee3c0", "#6dd3ad", "#44bcad", "#35a1ab", "#3487a6", "#366da0", "#3d5296", "#403974", "#35264c", "#231526"], "nipy_spectral": ["#850096", "#0000c9", "#0085dd", "#00aaa0", "#009c00", "#00da00", "#84ff00", "#f8da00", "#ff5d00", "#da0000"], "nipy_spectral_r": ["#da0000", "#ff5d00", "#f8da00", "#84ff00", "#00da00", "#009c00", "#00aaa0", "#0085dd", "#0000c9", "#850096"], "ocean": ["#005d17", "#003b2e", "#001845", "#000c5d", "#002f74", "#00518b", "#0073a2", "#3097ba", "#75bad1", "#badce8"], "ocean_r": ["#badce8", "#75bad1", "#3098ba", "#0073a2", "#00518b", "#002f74", "#000c5d", "#001845", "#003a2e", "#005d17"], "pink": ["#643e3e", "#8a5858", "#a76c6c", "#c27e7e", "#cb9e8c", "#d5b89a", "#decfa6", "#e7e5b2", "#efefcc", "#f7f7e7"], "pink_r": ["#f7f7e7", "#efefcc", "#e7e5b2", "#decfa6", "#d5b89a", "#cb9e8c", "#c27e7e", "#a76c6c", "#8a5858", "#643e3e"], "plasma": ["#3e049c", "#6300a7", "#8606a6", "#a62098", "#c03a83", "#d5546e", "#e76f5a", "#f68d45", "#fdae32", "#fcd225"], "plasma_r": ["#fcd225", "#fdae32", "#f68d45", "#e76f5a", "#d5546e", "#c03a83", "#a62098", "#8606a6", "#6300a7", "#3e049c"], "prism": ["#fa0063", "#b700b9", "#7300f8", "#6000ff", "#2700ff", "#0001ff", "#0044d7", "#0057c3", "#009b6f", "#1dd50d"], "prism_r": ["#1dd50d", "#009b6f", "#0057c3", "#0044d7", "#0001ff", "#2700ff", "#6000ff", "#7300f8", "#b700b9", "#fa0063"], "rainbow": ["#5247fc", "#2489f5", "#0ac0e8", "#3ae8d6", "#68fcc1", "#96fca7", "#c4e88a", "#f4c069", "#ff8947", "#ff4724"], "rainbow_r": ["#ff4724", "#ff8947", "#f5c069", "#c4e88a", "#97fca7", "#69fcc1", "#3be8d6", "#0bc0e8", "#2389f5", "#5247fc"], "rocket": ["#221331", "#451c47", "#691f55", "#921c5b", "#b91657", "#d92847", "#ed503e", "#f47d57", "#f6a47c", "#f7c9aa"], "rocket_r": ["#f7c9aa", "#f6a47c", "#f47d57", "#ed503e", "#d92847", "#b91657", "#921c5b", "#691f55", "#451c47", "#221331"], "seismic": ["#00008d", "#0000cd", "#1515ff", "#7575ff", "#d1d1ff", "#ffd1d1", "#ff7575", "#ff1515", "#dc0000", "#ae0000"], "seismic_r": ["#ae0000", "#dc0000", "#ff1515", "#ff7575", "#ffd1d1", "#d1d1ff", "#7575ff", "#1515ff", "#0000cd", "#00008d"], "spring": ["#ff17e8", "#ff2ed1", "#ff45ba", "#ff5da2", "#ff748b", "#ff8b74", "#ffa25d", "#ffba45", "#ffd12e", "#ffe817"], "spring_r": ["#ffe817", "#ffd12e", "#ffba45", "#ffa25d", "#ff8b74", "#ff748b", "#ff5da2", "#ff45ba", "#ff2ed1", "#ff17e8"], "summer": ["#178b66", "#2e9666", "#45a266", "#5dae66", "#74ba66", "#8bc566", "#a2d066", "#badc66", "#d1e866", "#e8f366"], "summer_r": ["#e8f466", "#d1e866", "#badc66", "#a2d066", "#8bc566", "#74ba66", "#5dae66", "#45a266", "#2e9666", "#178b66"], "tab10": ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"], "tab10_r": ["#17becf", "#bcbd22", "#7f7f7f", "#e377c2", "#8c564b", "#9467bd", "#d62728", "#2ca02c", "#ff7f0e", "#1f77b4"], "tab20": ["#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c", "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5"], "tab20_r": ["#17becf", "#bcbd22", "#7f7f7f", "#e377c2", "#8c564b", "#c5b0d5", "#ff9896", "#98df8a", "#ffbb78", "#aec7e8"], "tab20b": ["#393b79", "#5254a3", "#6b6ecf", "#9c9ede", "#637939", "#8ca252", "#b5cf6b", "#cedb9c", "#8c6d31", "#bd9e39"], "tab20b_r": ["#ce6dbd", "#7b4173", "#d6616b", "#843c39", "#e7ba52", "#bd9e39", "#cedb9c", "#8ca252", "#9c9ede", "#5254a3"], "tab20c": ["#3182bd", "#6baed6", "#9ecae1", "#c6dbef", "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2", "#31a354", "#74c476"], "tab20c_r": ["#bdbdbd", "#636363", "#bcbddc", "#756bb1", "#a1d99b", "#74c476", "#fdd0a2", "#fd8d3c", "#c6dbef", "#6baed6"], "terrain": ["#1470d6", "#00a8d0", "#15d06a", "#75e37d", "#d1f690", "#e8e28d", "#baa774", "#8a695a", "#a38984", "#d1c4c1"], "terrain_r": ["#d1c4c1", "#a38984", "#8a695a", "#baa774", "#e8e28d", "#d1f690", "#75e37d", "#15d06a", "#00a8d0", "#1470d6"], "twilight": ["#adc3cd", "#759ac1", "#6068b6", "#5b3196", "#3e1150", "#41123d", "#7b2150", "#a94950", "#c48065", "#d2b7a5"], "twilight_r": ["#d2b7a5", "#c48065", "#a94950", "#7b2150", "#41123d", "#3e1150", "#5b3196", "#6068b6", "#759ac1", "#adc3cd"], "twilight_shifted": ["#511a75", "#5e4dab", "#6683bd", "#8db0c5", "#ced3d9", "#dccecb", "#ca9c80", "#b96456", "#953250", "#5d1749"], "twilight_shifted_r": ["#5d1749", "#953250", "#b96456", "#ca9c80", "#dccecb", "#ced3d9", "#8db0c5", "#6683bd", "#5e4dab", "#511a75"], "viridis": ["#482173", "#433e85", "#38588c", "#2d708e", "#25858e", "#1e9b8a", "#2ab07f", "#52c569", "#86d549", "#c2df23"], "viridis_r": ["#c2df23", "#86d549", "#52c569", "#2ab07f", "#1e9b8a", "#25858e", "#2d708e", "#38588c", "#433e85", "#482173"], "vlag": ["#5782bc", "#7e9ac2", "#a3b4cd", "#cad0dd", "#efeef1", "#f7eae8", "#e6c5c3", "#d7a09d", "#c87e7b", "#b95b5a"], "vlag_r": ["#b95b5a", "#c87e7b", "#d7a09d", "#e6c5c3", "#f7eae8", "#efeef1", "#cad0dd", "#a3b4cd", "#7e9ac2", "#5782bc"], "winter": ["#0017f4", "#002ee8", "#0045dc", "#005dd0", "#0074c5", "#008bba", "#00a2ae", "#00baa2", "#00d196", "#00e88b"], "winter_r": ["#00e88b", "#00d196", "#00baa2", "#00a2ae", "#008bba", "#0074c5", "#005dd0", "#0045dc", "#002ee8", "#0017f3"]};
            
    
    function getColor(id, opasity) {
        id = typeof id==="string"? parseInt(id) : id;
        opasity = opasity+"" || "0.5";
        switch(id) {
            case 0: return {rgba: Azul.replace("opasity", opasity), rgb: sAzul};
            case 1: return {rgba: Celeste.replace("opasity", opasity), rgb: sCeleste};
            case 2: return {rgba: Verde.replace("opasity", opasity), rgb: sVerde};
            case 3: return {rgba: VerdeClaro.replace("opasity", opasity), rgb: sVerdeClaro};
            case 4: return {rgba: AmarilloClaro.replace("opasity", opasity), rgb: sAmarilloClaro};
            case 5: return {rgba: Amarillo.replace("opasity", opasity), rgb: sAmarillo};
            case 6: return {rgba: Naranja.replace("opasity", opasity), rgb: sNaranjaClaro};
            case 7: return {rgba: Naranja.replace("opasity", opasity), rgb: sNaranja};
            case 8: return {rgba: Rojo.replace("opasity", opasity), rgb: sRojo};
            case 0: return {rgba: Rosa.replace("opasity", opasity), rgb: sRosa};
            case 10: return {rgba: Blanco.replace("opasity", opasity), rgb: sBlanco};
            case 11: return {rgba: Morado.replace("opasity", opasity), rgb: sMorado};
            default: return {rgba: Gris.replace("opasity", opasity), rgb: sGris};
        }
    }
    
    function getColorByName(name, opasity) {
        opasity = opasity || "0.5";
       switch(name.toLowerCase()) {
            case "azul":        return {rgba: Azul.replace("opasity", opasity), rgb: sAzul};
            case "celeste":     return {rgba: Celeste.replace("opasity", opasity), rgb: sCeleste};
            case "verde":       return {rgba: Verde.replace("opasity", opasity), rgb: sVerde};
            case "verdeclaro":  return {rgba: VerdeClaro.replace("opasity", opasity), rgb: sVerdeClaro};
            case "amarilloclaro": return {rgba: AmarilloClaro.replace("opasity", opasity), rgb: sAmarilloClaro};
            case "amarillo":    return {rgba: Amarillo.replace("opasity", opasity), rgb: sAmarillo};
            case "naranjaclaro": return {rgba: Naranja.replace("opasity", opasity), rgb: sNaranjaClaro};
            case "naranja":     return {rgba: Naranja.replace("opasity", opasity), rgb: sNaranja};
            case "rojo":        return {rgba: Rojo.replace("opasity", opasity), rgb: sRojo};
            case "rosa":        return {rgba: Rosa.replace("opasity", opasity), rgb: sRosa};
            case "blanco":      return {rgba: Blanco.replace("opasity", opasity), rgb: sBlanco};
            case "morado":      return {rgba: Morado.replace("opasity", opasity), rgb: sMorado};
            case "gris":        return {rgba: Gris.replace("opasity", opasity), rgb: sGris};
            default:            return {rgba: Gris.replace("opasity", opasity), rgb: sGris};
        }
    }
    
    function getGradianColor(id, porcent, opasity) {
        //id = typeof id==="string"? parseInt(id) : id;
        opasity = opasity || "0.5";
        switch(id) {
            case "0":
            case 0: return getGradiantBlueRed(porcent, opasity);
            case "1":
            case 1: return getGradiantBlue(porcent, opasity);
            case "2":
            case 2: return getGradiantGreen(porcent, opasity);
            case "3":
            case 3: return getGradiantYellow(porcent, opasity);
            case "4":
            case 4: return getGradiantRed(porcent, opasity);
            case "5":
            case 5: return getGradiantPurple(porcent, opasity);
            default: var p = getCustomPalette(id, porcent, opasity);
                return p || {rgba: Gris.replace("opasity", opasity), rgb: sGris};
        }
    }
    
    function getGradiantGreen(porcent, opasity) {
        var r=20, g, b=50;
        porcent = porcent/100;
        g = Math.round(porcent * 180)+70;
        r = Math.round(10);
        b = Math.round(10);
        return {rgb: "rgb("+r+","+g+","+b+")", rgba: "rgba("+r+","+g+","+b+", "+opasity+")"};
    }
    function getGradiantBlue(porcent, opasity) {
        var r=20, g, b=50;
        porcent = porcent/100;
        porcent = 1-porcent;
        b = Math.round(porcent * 180)+70;
        r = Math.round(10);
        g = Math.round(10);
        return {rgb: "rgb("+r+","+g+","+b+")", rgba: "rgba("+r+","+g+","+b+", "+opasity+")"};
    }
    function getGradiantRed(porcent, opasity) {
        var r=20, g, b=50;
        porcent = porcent/100;
        r = Math.round(porcent * 180)+70;
        g = Math.round(10);
        b = Math.round(10);
        return {rgb:"rgb("+r+","+g+","+b+")", rgba: "rgba("+r+","+g+","+b+", "+opasity+")"};
    }
    function getGradiantYellow(porcent, opasity) {
        var r=20, g, b=50;
        porcent = porcent/100;
        g = Math.round(porcent * 155)+100;
        r = Math.round(porcent * 149)+96;
        b = Math.round(10);
        return {rgb: "rgb("+r+","+g+","+b+")", rgba: "rgba("+r+","+g+","+b+", "+opasity+")"};
    }
    function getGradiantPurple(porcent, opasity) {
        var r=20, g, b=50;
        porcent = porcent/100;
        b = Math.round(porcent * 155)+100;
        r = Math.round(porcent * 94)+61;
        g = Math.round(10);
        return {rgb: "rgb("+r+","+g+","+b+")", rgba: "rgba("+r+","+g+","+b+", "+opasity+")"};
    }
    
    function getGradiantBlueRed(porcent, opasity) {
        var rgb="", rgba="";
        if(porcent<=10) {
            rgb = sAzul;
            rgba = Azul;
        } else {
            if(porcent <=20) {
                rgb = "rgb(48, 166, 228)";
                rgba = "rgba(48, 166, 228, opasity)";
            } else {
                if(porcent<=30) {
                    rgb = "rgb(33, 215, 228)";
                    rgba = "rgba(33, 215, 228, opasity)";
                } else {
                    if(porcent <=40) {
                        rgb = "rgb(39, 228, 153)";
                        rgba = "rgba(39, 228, 153, opasity)";
                    } else {
                        if(porcent<=50) {
                            rgb = "rgb(62, 228, 65)";
                            rgba = "rgba(62, 228, 65, opasity)";
                        }else {
                            if(porcent<=60) {
                                rgb = "rgb(154, 225, 38)";
                                rgba = "rgba(154, 225, 38, opasity)";
                            } else {
                                if(porcent<=70) {
                                    rgb = "rgb(227, 222, 29)";
                                    rgba = "rgba(227, 222, 29, opasity)";
                                } else {
                                    if(porcent<=80) {
                                        rgb = "rgb(226, 182, 29)";
                                        rgba = "rgba(226, 182, 29, opasity)";
                                    } else {
                                        if(porcent<=90) {
                                            rgb = "rgb(227, 124, 28)";
                                            rgba = "rgba(227, 124, 28, opasity)";
                                        } else {
                                            rgb = sRojo;
                                            rgba = Rojo;
        }   }   }   }   }   }   }   }   }
        rgba = rgba.replace("opasity", opasity);
        return {rgb: rgb, rgba: rgba};
    }
    
    function getCustomPalette(id, porcent, opasity) {
        if(!palettes[id])
            return false;
        var pal = palettes[id];
        var i=0, index=10;
        var a = "";
        if(opasity <1) {
            a = "E6";
        }
        while(porcent > index && i <= 9) {
            index += 10;
            i++;
        }
        return {rgb: pal[i], rgba: pal[i]+a};
        //return {rgb: pal[i], rgba: pal[i]+a};
    }
    
    function loadPalettes (div) {
       // if(!palettes) {
            
        //$.getJSON("../../proyecto/recursos/json/color_palette.json", function (data) {
            //palettes = data;
            var n = ["Azul a Rojo", "Azul"];
            var id = [0, 1];
            for(var i in palettes) {
               // if(i === "RdBu" || i === "viridis_r" || i === "Accent") {
                    n[n.length] = i;
                    id[id.length] = i;
                //}
            }
            try {
                if(div && div !== "")
                    setOptions(div, n, false, id);
            } catch(e) {
                
            }
        
    }
    function setOptions (div, options, firstOption, valueOptions) {
        document.getElementById(div).innerHTML = "";
            var base = "<option value='$VALUE'>$LABEL</option>", etiqueta = "";
            if(firstOption !== false) {
                if(!firstOption)
                    firstOption = firstOption || "Todos";
                etiqueta = base.replace("$VALUE", 0).replace("$LABEL", firstOption);
            }
                
            var  n = options.length, values=false;
            if(valueOptions) {
                if(valueOptions.length === n)
                    values = true;
            }
            for(var i =0; i<n; i++) {
                if(values)
                    etiqueta += base.replace("$VALUE", valueOptions[i]).replace("$LABEL", options[i]);
                else 
                    etiqueta += base.replace("$VALUE", i+1).replace("$LABEL", options[i]);
            }
            document.getElementById(div).innerHTML = etiqueta;
    }
    
    function getFullColorScale(id) {
        if(palettes[id]) {
            return palettes[id];
        } else {
            return [getGradianColor(id,0).rgb, getGradianColor(id,11).rgb, getGradianColor(id,22).rgb, 
                getGradianColor(id,33).rgb, getGradianColor(id,44).rgb, getGradianColor(id,55).rgb,
                getGradianColor(id,66).rgb, getGradianColor(id,77).rgb, getGradianColor(id,88).rgb, getGradianColor(id,100).rgb];
        }
    }
    return {
        getColor: getColor,
        getColorByName: getColorByName,
        getGradianColor: getGradianColor,
        loadPalettes: loadPalettes,
        getCustomPalette: getCustomPalette,
        getFullColorScale: getFullColorScale
    };
});
