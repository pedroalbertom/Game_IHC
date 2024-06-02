# Game_IHC

Bem-vindo ao Game_IHC! Este é um jogo mobile desenvolvido em React Native onde você controla um peixe que deve evitar lixo e coletar alimentos.

## Pré-requisitos

Antes de começar, você precisará ter as seguintes ferramentas instaladas no seu ambiente de desenvolvimento:

- [Node.js](https://nodejs.org/en/) (versão 14.x ou superior)
- [npm](https://www.npmjs.com/) (geralmente instalado junto com o Node.js)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (para desenvolvimento com Expo)
- [Android Studio](https://developer.android.com/studio) (para emular Android ou criar builds para Android)
- [Xcode](https://developer.apple.com/xcode/) (para emular iOS ou criar builds para iOS, disponível apenas no macOS)

## Instalação

1. **Clone este repositório:**

    ```sh
    git clone https://github.com/seu-usuario/Game_IHC.git
    cd Game_IHC
    ```

2. **Instale as dependências do projeto:**

    ```sh
    npm install
    ```

3. **Inicie o servidor de desenvolvimento do Expo:**

    ```sh
    npx expo start
    ```

## Executando no Emulador ou Dispositivo Físico

### Android

1. **Emulador:**
   - Abra o Android Studio e inicie um dispositivo virtual Android (AVD).
   - No terminal onde você iniciou o Expo, pressione `a` para abrir o aplicativo no emulador Android.

2. **Dispositivo Físico:**
   - Conecte seu dispositivo Android via USB.
   - Certifique-se de que a depuração USB está ativada no dispositivo.
   - No terminal onde você iniciou o Expo, pressione `a` para abrir o aplicativo no dispositivo Android.

### iOS

1. **Emulador:**
   - Abra o Xcode e inicie um simulador iOS.
   - No terminal onde você iniciou o Expo, pressione `i` para abrir o aplicativo no simulador iOS.

2. **Dispositivo Físico:**
   - Conecte seu dispositivo iOS via USB.
   - No terminal onde você iniciou o Expo, pressione `i` para abrir o aplicativo no dispositivo iOS. Certifique-se de que o dispositivo está configurado corretamente no Xcode.

## Estrutura do Projeto

- **/assets**: Contém imagens e outros recursos estáticos.
- **/components**: Contém componentes React Native reutilizáveis.
- **/screens**: Contém as telas principais do aplicativo (início, jogo, etc.).
- **App.js**: Ponto de entrada do aplicativo.

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a Licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
