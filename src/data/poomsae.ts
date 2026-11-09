export interface Poomsae {
  id: string;
  name: string;
  group: 'taegeuk' | 'dan';
  videoId: string;
}

// Public Kukkiwon reference demonstrations. School rank requirements await instructor approval.
export const poomsae: Poomsae[] = [
  { id: 'taegeuk-1', name: 'Taegeuk Il Jang', group: 'taegeuk', videoId: 'WhkjRruCBTo' },
  { id: 'taegeuk-2', name: 'Taegeuk Yi Jang', group: 'taegeuk', videoId: 'tGlrUplKHh8' },
  { id: 'taegeuk-3', name: 'Taegeuk Sam Jang', group: 'taegeuk', videoId: 'ksSqKt0UkWo' },
  { id: 'taegeuk-4', name: 'Taegeuk Sa Jang', group: 'taegeuk', videoId: 'Lt917gacJho' },
  { id: 'taegeuk-5', name: 'Taegeuk O Jang', group: 'taegeuk', videoId: 'VdqNEAHWCBM' },
  { id: 'taegeuk-6', name: 'Taegeuk Yuk Jang', group: 'taegeuk', videoId: 'jcBwWo4wN7c' },
  { id: 'taegeuk-7', name: 'Taegeuk Chil Jang', group: 'taegeuk', videoId: '6FUM1p6qqhQ' },
  { id: 'taegeuk-8', name: 'Taegeuk Pal Jang', group: 'taegeuk', videoId: 'Gr_Je2ZkgkI' },
  { id: 'dan-1', name: 'Koryo', group: 'dan', videoId: 'mGa60JDtWmg' },
  { id: 'dan-2', name: 'Keumgang', group: 'dan', videoId: 'CRGVSOmaQaY' },
  { id: 'dan-3', name: 'Taebaek', group: 'dan', videoId: 'Q4dYdFRbE4U' },
  { id: 'dan-4', name: 'Pyeongwon', group: 'dan', videoId: 'RB-7mBtvtZw' },
  { id: 'dan-5', name: 'Sipjin', group: 'dan', videoId: 'hOZB0IESJ38' },
  { id: 'dan-6', name: 'Jitae', group: 'dan', videoId: 'nur2WsN7dQw' },
  { id: 'dan-7', name: 'Cheonkwon', group: 'dan', videoId: 'FBxCzK5c4bE' },
  { id: 'dan-8', name: 'Hansu', group: 'dan', videoId: 'lRp1JE7f-a8' },
  { id: 'dan-9', name: 'Ilyeo', group: 'dan', videoId: 'jWClKVOrqJ8' },
];
