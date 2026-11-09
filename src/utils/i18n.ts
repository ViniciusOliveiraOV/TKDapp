import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';

const i18n = new I18n({
  'pt': {
    // App
    appTitle: 'Catálogo de Movimentos',
    selectCategory: 'Selecione uma categoria',
    
    // Navigation
    categories: 'Categorias',
    movements: 'Movimentos',
    favorites: 'Favoritos',
    about: 'Sobre',
    explore: 'Explorar',
    
    // Movement Details
    details: 'Detalhes do Movimento',
    difficulty: 'Dificuldade',
    belt: 'Faixa',
    tips: 'Dicas',
    videos: 'Vídeos',
    
    // Difficulty Levels
    beginner: 'Iniciante',
    intermediate: 'Intermediário',
    advanced: 'Avançado',
    
    // Categories
    kicks: 'Chutes',
    kicksDesc: 'Técnicas de chutes do Taekwondo',
    blocks: 'Bloqueios',
    blocksDesc: 'Técnicas de defesa e bloqueio',
    stances: 'Posturas',
    stancesDesc: 'Posições fundamentais',
    punches: 'Socos',
    punchesDesc: 'Técnicas de soco',
    defenses: 'Defesas',
    defensesDesc: 'Técnicas de defesa avançadas',
    
    // Actions
    search: 'Buscar movimento...',
    share: 'Compartilhar',
    addFavorite: 'Adicionar aos favoritos',
    removeFavorite: 'Remover dos favoritos',
    
    // Messages
    noFavorites: '⭐ Nenhum favorito ainda',
    noFavoritesHint: 'Marque movimentos como favoritos para encontrá-los aqui!',
    noMovementsFound: 'Nenhum movimento encontrado',
    noMovementsInCategory: 'Nenhum movimento nesta categoria',
    loading: 'Carregando...',
    error: 'Erro',
    videoUnavailable: 'Vídeo indisponível no app',
    openYoutube: 'Abrir no YouTube',
    
    // Onboarding
    welcome: 'Bem-vindo ao TKDapp! 🥋',
    welcomeDesc: 'Aprenda técnicas de Taekwondo com vídeos e dicas',
    exploreCategories: 'Explore por Categorias',
    exploreCategoriesDesc: 'Chutes, bloqueios, posturas e mais!',
    saveFavorites: 'Salve seus Favoritos',
    saveFavoritesDesc: 'Marque os movimentos para praticar depois',
    skip: 'Pular',
    next: 'Próximo',
    start: 'Começar',
    
    // About Screen
    version: 'Versão',
    aboutApp: 'Sobre o App',
    aboutAppDesc: 'Biblioteca demonstrativa de Taekwondo com vídeos públicos e dicas. O currículo por idade e faixa será definido pelo mestre.',
    developer: 'Desenvolvedor',
    features: 'Recursos',
    feature1: '15 técnicas de Taekwondo',
    feature2: 'Vídeos demonstrativos',
    feature3: 'Sistema de favoritos',
    feature4: 'Busca inteligente',
    feature5: 'Suporte a temas claro/escuro',
    feature6: 'Zonas etárias e graduações CBTKD 2026',
    contact: 'Contato',
    repository: 'Repositório no GitHub',
    madeWith: 'Feito com ❤️ e 🥋 para a comunidade de Taekwondo',
    settings: 'Configurações',
    theme: 'Tema',
    themeLight: '☀️ Claro',
    themeDark: '🌙 Escuro',
    themeAuto: '🌓 Automático',
    language: 'Idioma',
    languagePt: '🇧🇷 Português',
    languageEn: '🇺🇸 English',
  },
  'en': {
    // App
    appTitle: 'Movements Catalog',
    selectCategory: 'Select a category',
    
    // Navigation
    categories: 'Categories',
    movements: 'Movements',
    favorites: 'Favorites',
    about: 'About',
    explore: 'Explore',
    
    // Movement Details
    details: 'Movement Details',
    difficulty: 'Difficulty',
    belt: 'Belt',
    tips: 'Tips',
    videos: 'Videos',
    
    // Difficulty Levels
    beginner: 'Beginner',
    intermediate: 'Intermediate',
    advanced: 'Advanced',
    
    // Categories
    kicks: 'Kicks',
    kicksDesc: 'Taekwondo kicking techniques',
    blocks: 'Blocks',
    blocksDesc: 'Defense and blocking techniques',
    stances: 'Stances',
    stancesDesc: 'Fundamental positions',
    punches: 'Punches',
    punchesDesc: 'Punching techniques',
    defenses: 'Defenses',
    defensesDesc: 'Advanced defense techniques',
    
    // About Screen
    version: 'Version',
    aboutApp: 'About the App',
    aboutAppDesc: 'Taekwondo demo library with public videos and tips. The instructor will define the curriculum for each age group and belt.',
    developer: 'Developer',
    features: 'Features',
    feature1: '15 Taekwondo techniques',
    feature2: 'Video demonstrations',
    feature3: 'Favorites system',
    feature4: 'Smart search',
    feature5: 'Light/dark theme support',
    feature6: 'CBTKD 2026 age groups and belt reference',
    contact: 'Contact',
    repository: 'GitHub Repository',
    madeWith: 'Made with ❤️ and 🥋 for the Taekwondo community',
    settings: 'Settings',
    theme: 'Theme',
    themeLight: '☀️ Light',
    themeDark: '🌙 Dark',
    themeAuto: '🌓 Auto',
    language: 'Language',
    languagePt: '🇧🇷 Português',
    languageEn: '🇺🇸 English',
    
    // Actions
    search: 'Search movement...',
    share: 'Share',
    addFavorite: 'Add to favorites',
    removeFavorite: 'Remove from favorites',
    
    // Messages
    noFavorites: '⭐ No favorites yet',
    noFavoritesHint: 'Mark movements as favorites to find them here!',
    noMovementsFound: 'No movements found',
    noMovementsInCategory: 'No movements in this category',
    loading: 'Loading...',
    error: 'Error',
    videoUnavailable: 'Video unavailable in app',
    openYoutube: 'Open in YouTube',
    
    // Onboarding
    welcome: 'Welcome to TKDapp! 🥋',
    welcomeDesc: 'Learn Taekwondo techniques with videos and tips',
    exploreCategories: 'Explore by Categories',
    exploreCategoriesDesc: 'Kicks, blocks, stances and more!',
    saveFavorites: 'Save your Favorites',
    saveFavoritesDesc: 'Mark movements to practice later',
    skip: 'Skip',
    next: 'Next',
    start: 'Start',
  },
});

i18n.enableFallback = true;
i18n.defaultLocale = 'pt';

export default i18n;
