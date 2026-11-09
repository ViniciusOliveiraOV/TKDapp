export interface VideoSource {
  title: string;
  publisher: string;
  status: 'demo';
}

const kukkiwon = 'KUKKIWON WORLD TAEKWONDO HEADQUARTERS';

// Titles and publishers checked against YouTube oEmbed on 2026-11-09.
const sources: Record<string, VideoSource> = {
  '2N9ftiNzKck': { title: 'Conheça o Ap Chagi, o Chute Frontal Do Taekwondo', publisher: 'Sergio Moller Taekwondo', status: 'demo' },
  '6Jn_OrIFAJg': { title: 'How to do a Front Kick (Ap Chagi)', publisher: 'Dojang Nim Academy', status: 'demo' },
  '746mc032TCs': { title: 'Mastering The Front Kick/Ap Chagi', publisher: 'United Martial Arts & Fitness Academy', status: 'demo' },
  'BNCR5Y2kXFs': { title: 'Arae makki', publisher: 'Taekwondo Life', status: 'demo' },
  'I5b3pcvOGm0': { title: 'Ap seogi', publisher: 'Tim Wokeu', status: 'demo' },
  'Jp_HVYlcHO0': { title: 'Sonnal Maki', publisher: 'Anyondo Taekwondo', status: 'demo' },
  'LSBRU0Qj8p8': { title: 'Peça por Peça 5: Melhore o seu Chute Arrancando (Huryeo Chagi)', publisher: 'Sergio Moller Taekwondo', status: 'demo' },
  'M825zz7gxN0': { title: 'Conheça o Yeop Chagi, o Chute Lateral Do Taekwondo', publisher: 'Sergio Moller Taekwondo', status: 'demo' },
  'MzbPxmQ_x-w': { title: 'Juchum seogi', publisher: 'Tim Wokeu', status: 'demo' },
  'PkQTB7oHITY': { title: 'Conheça o Dollyeo Chagi, o Chute Circular do Taekwondo', publisher: 'Sergio Moller Taekwondo', status: 'demo' },
  'TqC0tUw5cpA': { title: '09 Conheça o Huryeo Chagi, o Chute Arrancando do Taekwondo', publisher: 'Sergio Moller Taekwondo', status: 'demo' },
  'a8M3Ii-wSB4': { title: 'Momtong Bakat Maki', publisher: 'Anyondo Taekwondo', status: 'demo' },
  'aGwsE_Ajyw0': { title: 'Olgul makki', publisher: 'Tim Wokeu', status: 'demo' },
  'aQRgKBQ2_e8': { title: 'Basic Motions - JIREUGI - Taekwondo Technics in English [HD]', publisher: 'ForumTaekwondo', status: 'demo' },
  'fXQFSpgl0Qc': { title: 'Conheça o Naeryeo Chagi, o Chute Descendo do Taekwondo', publisher: 'Sergio Moller Taekwondo', status: 'demo' },
  'irauOTsqLAg': { title: 'Yop jireugi', publisher: 'Maiwand Taekwondo', status: 'demo' },
  'jmXlOI85nTQ': { title: 'Naeryeo Chagi (Axe Kick)', publisher: 'Lupo Taekwondo', status: 'demo' },
  'lQqjyzSNg-I': { title: 'Otgoreo makki', publisher: 'Taekwondo Life', status: 'demo' },
  'wiM959FiQwY': { title: 'Ap kubi', publisher: 'Tim Wokeu', status: 'demo' },
  'WhkjRruCBTo': { title: 'TAEGEUK 1JANG', publisher: kukkiwon, status: 'demo' },
  'tGlrUplKHh8': { title: 'TAEGEUK 2JANG', publisher: kukkiwon, status: 'demo' },
  'ksSqKt0UkWo': { title: 'TAEGEUK 3JANG', publisher: kukkiwon, status: 'demo' },
  'Lt917gacJho': { title: 'TAEGEUK 4JANG', publisher: kukkiwon, status: 'demo' },
  'VdqNEAHWCBM': { title: 'TAEGEUK 5JANG', publisher: kukkiwon, status: 'demo' },
  'jcBwWo4wN7c': { title: 'TAEGEUK 6JANG', publisher: kukkiwon, status: 'demo' },
  '6FUM1p6qqhQ': { title: 'TAEGEUK 7JANG', publisher: kukkiwon, status: 'demo' },
  'Gr_Je2ZkgkI': { title: 'TAEGEUK 8JANG', publisher: kukkiwon, status: 'demo' },
  'mGa60JDtWmg': { title: 'KORYO', publisher: kukkiwon, status: 'demo' },
  'CRGVSOmaQaY': { title: 'KEUMGANG', publisher: kukkiwon, status: 'demo' },
  'Q4dYdFRbE4U': { title: 'TAEBAEK', publisher: kukkiwon, status: 'demo' },
  'RB-7mBtvtZw': { title: 'PYEONGWON', publisher: kukkiwon, status: 'demo' },
  'hOZB0IESJ38': { title: 'SIPJIN', publisher: kukkiwon, status: 'demo' },
  'nur2WsN7dQw': { title: 'JITAE', publisher: kukkiwon, status: 'demo' },
  'FBxCzK5c4bE': { title: 'CHONKWON', publisher: kukkiwon, status: 'demo' },
  'lRp1JE7f-a8': { title: 'HANSU', publisher: kukkiwon, status: 'demo' },
  'jWClKVOrqJ8': { title: 'ILYEO', publisher: kukkiwon, status: 'demo' },
};

export function getVideoSource(videoId: string): VideoSource | undefined {
  return sources[videoId];
}
