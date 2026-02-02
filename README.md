# TKDapp - Taekwondo Movements Catalog 🥋

A comprehensive mobile application for learning and practicing Taekwondo techniques. Built with React Native and Expo.

> ⚠️ **Development Status**: This app is currently under active development and has not been released yet.

## 📱 About

TKDapp is a mobile catalog of Taekwondo movements designed to help practitioners learn and perfect their techniques. Each movement includes detailed information, video demonstrations, and practical tips - all in Brazilian Portuguese (PT-BR).

## ✨ Features

- **5 Movement Categories**: Kicks (Chutes), Blocks (Bloqueios), Stances (Posturas), Punches (Socos), and Defenses (Defesas)
- **15 Techniques**: Carefully curated movements with Korean names and Portuguese descriptions
- **Video Demonstrations**: YouTube videos embedded for each technique with carousel navigation
- **Search Functionality**: Quick search across all movements with accent normalization
- **Favorites System**: Save your favorite techniques for quick access (persisted with AsyncStorage)
- **Difficulty Levels**: Beginner, Intermediate, and Advanced classifications
- **Belt System**: Movements organized by belt requirements
- **Offline-Ready**: Core functionality works without internet (videos require connection)

## 🏗️ Project Structure

```
TKDapp/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Badge.tsx       # Difficulty/belt badges
│   │   ├── Card.tsx        # Movement cards
│   │   ├── SearchBar.tsx   # Search input component
│   │   └── VideoPlayer.tsx # YouTube video carousel
│   ├── constants/
│   │   └── theme.ts        # Centralized colors, spacing, fonts
│   ├── data/
│   │   └── movements.ts    # Movement data and categories
│   ├── navigation/
│   │   └── AppNavigator.tsx # Navigation configuration
│   ├── screens/
│   │   ├── CategoriesScreen.tsx # Category selection
│   │   ├── MovementsScreen.tsx  # Movement list with search
│   │   └── DetailScreen.tsx     # Movement details with videos
│   ├── types/
│   │   └── index.ts        # TypeScript interfaces
│   └── utils/
│       ├── helpers.ts      # Utility functions
│       └── storage.ts      # AsyncStorage helpers
├── App.tsx                 # Root component
├── app.json               # Expo configuration
└── package.json           # Dependencies

```

## 🛠️ Tech Stack

- **React Native** (0.81.5) - Cross-platform mobile framework
- **Expo** (~54.0.33) - Development platform and toolkit
- **TypeScript** (~5.9.2) - Type safety and better DX
- **React Navigation** - Navigation library (native-stack, bottom-tabs)
- **AsyncStorage** (^2.2.0) - Local data persistence
- **react-native-youtube-iframe** (^2.4.1) - Video playback
- **react-native-webview** (13.15.0) - Required for YouTube player

## 📋 Prerequisites

- **Node.js** 16.x or higher
- **npm** or **yarn**
- **Expo Go** app (download from App Store or Google Play)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ViniciusOliveiraOV/TKDapp.git
cd TKDapp
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm start
# or
npx expo start
```

### 4. Run on your device

- **Android/iOS**: Open the Expo Go app and scan the QR code
- **Android Emulator**: Press `a` in the terminal
- **iOS Simulator**: Press `i` in the terminal (macOS only)

## 🧹 Troubleshooting

If you encounter issues, try clearing the cache:

```bash
npx expo start --clear
```

Or do a clean reinstall:

```bash
rm -rf node_modules .expo
npm install
npx expo start --clear
```

## 🤝 Contributing

This project is in active development. If you'd like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Development Roadmap

- [ ] Add more movements (target: 50+ techniques)
- [ ] Implement training routines
- [ ] Add progress tracking
- [ ] Include poomsae (forms) section
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Offline video caching
- [ ] Build and publish to app stores

## 👨‍💻 Author

**Vinicius Oliveira**
- GitHub: [@ViniciusOliveiraOV](https://github.com/ViniciusOliveiraOV)

## 📄 License

This project is open source and available under the MIT License.

---

Made with ❤️ and 🥋 for the Taekwondo community

Após iniciar o projeto, você pode:

- **Android**: Pressione `a` no terminal ou escaneie o QR code com o app Expo Go
- **iOS**: Pressione `i` no terminal (requer macOS) ou escaneie o QR code com a câmera
- **Web**: Pressione `w` no terminal

## 📂 Estrutura do Projeto

```
TKDapp/
├── src/
│   ├── data/
│   │   └── movements.ts       # Dados dos movimentos
│   ├── navigation/
│   │   └── AppNavigator.tsx   # Configuração de navegação
│   ├── screens/
│   │   ├── CategoriesScreen.tsx    # Tela de categorias
│   │   ├── MovementsScreen.tsx     # Lista de movimentos
│   │   └── DetailScreen.tsx        # Detalhes do movimento
│   └── types/
│       └── index.ts           # Tipos TypeScript
├── App.tsx                    # Componente principal
└── package.json
```

## 🎨 Categorias Disponíveis

- **Chutes** (Chagi) 🦵
- **Bloqueios** (Makgi) 🛡️
- **Posturas** (Seogi) 🧍
- **Socos** (Jireugi) 👊
- **Defesas** (Defesas) 🙌

## 📱 Como Usar o App

1. **Tela Inicial**: Escolha uma categoria de movimentos
2. **Lista de Movimentos**: Veja todos os movimentos da categoria selecionada
3. **Detalhes**: Toque em um movimento para ver informações completas

## 🔧 Scripts Disponíveis

- `npm start` - Inicia o servidor Expo
- `npm run android` - Executa no Android
- `npm run ios` - Executa no iOS (requer macOS)
- `npm run web` - Executa no navegador

## 📝 Próximas Melhorias

- [ ] Adicionar vídeos demonstrativos
- [ ] Sistema de favoritos
- [ ] Busca por movimentos
- [ ] Modo escuro
- [ ] Acompanhamento de progresso
- [ ] Quiz de conhecimento

## 📄 Licença

Este projeto é de código aberto e está disponível para uso educacional.

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abrir um Pull Request

---
