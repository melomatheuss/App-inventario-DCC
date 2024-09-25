# App DCC Inventário

Este é o repositório do App DCC Inventário, uma aplicação móvel desenvolvida para facilitar o gerenciamento de inventários do Departamento de Ciência da Computação (DCC) da Universidade Federal de Roraima. O sistema permite o registro, consulta e gerenciamento de itens com informações essenciais, como nome, descrição, código de barras e fotos.

# Funcionalidades

  Login com Firebase: Sistema de autenticação seguro usando e-mail e senha.
  Cadastro de Itens: Registre itens com código de barras (tombo), nome, descrição, localização e foto.
  Consulta de Itens: Busque itens registrados no banco de dados de forma rápida e eficiente.
  Remoção de Itens: Exclua itens cadastrados diretamente pelo app.

# Tecnologias Utilizadas

O projeto foi desenvolvido usando as seguintes tecnologias:

  React Native: Framework para desenvolvimento de apps móveis.
  Expo: Plataforma que simplifica o uso de APIs e componentes no React Native.
  Firebase: Usado para autenticação, banco de dados em tempo real (Firestore) e armazenamento de fotos (Firebase Storage).
  TypeScript: Garantia de tipagem estática no código para maior robustez.

# Bibliotecas e Dependências

    @react-native-async-storage/async-storage
    @react-native-firebase/app
    @react-native-firebase/auth
    @react-navigation/native
    expo-camera
    expo-barcode-scanner
    ... e outras (consulte package.json para a lista completa).

# Requisitos Funcionais

  Login via Firebase: Autenticação segura de usuários.
  Cadastro de Itens: Campos como nome, código de barras, descrição, localização e foto.
  Busca por Itens: Facilita a localização de itens no banco de dados.
  Remoção de Itens: Exclua itens já registrados.

# Requisitos Não Funcionais

  Desempenho: Tempo de resposta para consultas e cadastros deve ser inferior a 2 segundos.
  Usabilidade: Interface intuitiva e acessível.
  Segurança: Todas as transações utilizam HTTPS e autenticação Firebase.
  Compatibilidade: Suporte a Android 8.0+ e iOS 12.0+.

# Estrutura principal de Pastas


    /src
    /components    # Componentes reutilizáveis
    /screens       # Telas do aplicativo
    /services      # Serviços de integração com Firebase
    /assets        # Imagens e ícones

# Arquitetura

O app segue uma arquitetura cliente-servidor, onde o cliente (aplicativo) se comunica com o servidor Firebase para autenticação e armazenamento de dados.
Modelo de Desenvolvimento

O desenvolvimento do app foi feito seguindo o modelo Scrum, uma metodologia ágil que prioriza a entrega rápida de funcionalidades com ciclos curtos de desenvolvimento chamados sprints. O projeto foi concluído em dois meses.
Requisitos

Para rodar o projeto localmente, você precisará de:

    Node.js (v14+)
    Expo CLI (v5+)
    Conta no Firebase para autenticação e banco de dados.
    Java 17

# Instalação

  Clone o repositório:

    https://github.com/melomatheuss/App-inventario-DCC.git
  
  Instale as dependências:

    npm install
    npm install expo

Caso seja administrador, configure os dois aquivos google-service.json e googleService-Info.plist e coloque disponibilizados no console FireBase e coloque-as na raiz do projeto.
Feito isto execute

Para smartphones android conectados via cabo usb ou Android Studio

    npx expo run:android
Para smartphones IOS conectados em Mac ou utilizando Xcode

    npx expo run:ios 
