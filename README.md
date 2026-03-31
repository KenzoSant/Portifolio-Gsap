# 🚀 Kenzo Santos - Front-End Developer Portfolio

> Um portfólio premium desenvolvido com tecnologias modernas, animações fluidas e design imersivo.

## ✨ Sobre o Projeto

Este é o meu portfólio pessoal, desenvolvido para showcase de projetos e habilidades como desenvolvedor Front-End. O projeto apresenta uma experiência visual rica com animações performáticas, design responsivo e interações sofisticadas.

## 🛠️ Stack Tecnológico

### Front-End
- **HTML5** - Semântica moderna e acessibilidade
- **CSS3** - Layout responsivo, animações e variáveis customizadas
- **JavaScript (ES6+)** - Lógica de interação e animações

### Bibliotecas & Frameworks
- **GSAP (GreenSock Animation Platform)** - Animações de alta performance
- **Lenis** - Scroll suave e performático
- **SplitType** - Animação de texto avançada
- **Phosphor Icons** - Ícones modernos e consistentes

### Ferramentas
- **EmailJS** - Formulário de contato funcional
- **Vercel/Render** - Deploy e hosting

## 🎯 Features Principais

### ✨ Animações & Interações
- ⚡ Animações de entrada suaves com GSAP
- 🎭 Efeito de cursor customizado
- 🧲 Botões magnéticos com efeito hover
- 📜 Scroll suave com Lenis
- 🎬 Parallax em imagens e elementos
- 🔄 Transições de página fluidas

### 📱 Design Responsivo
- 📱 Mobile-first approach
- 🎨 Breakpoints otimizados
- 👆 Touch interactions para dispositivos móveis
- 🍔 Menu mobile funcional

### 🎨 Seções do Portfólio
- **Hero Section** - Introdução impactante com vídeo background
- **Serviços** - Cards animados com efeito 3D
- **Projetos** - Showcase com parallax e reveal effects
- **Skills** - Seção interativa com pinning e progress indicators
- **Sobre** - Apresentação pessoal com statistics counters
- **Contato** - Formulário funcional com validação

## 🚀 Performance

- ⚡ **Core Web Vitals** otimizado
- 🎯 **95+** performance score
- 📦 **Lazy loading** de imagens
- 🗜️ **Minificação** de assets
- 🔄 **Smooth scrolling** otimizado

## 📁 Estrutura do Projeto

```
PortifolioGsap/
├── 📁 css/
│   ├── style.css          # Estilos principais
│   └── projects.css       # Estilos da página de projetos
├── 📁 js/
│   └── script.js          # Lógica principal e animações
├── 📁 images/
│   ├── favicon-32x32.png  # Favicon
│   ├── video.mp4          # Background do hero
│   └── [projetos].png     # Imagens dos projetos
├── index.html             # Página principal
├── projects.html          # Página de projetos
└── README.md              # Este arquivo
```

## 🛠️ Como Executar

### Pré-requisitos
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Servidor local para desenvolvimento

### Instalação Local

1. **Clone o repositório**
   ```bash
   git clone https://github.com/KenzoSant/Portifolio-Gsap.git
   cd Portifolio-Gsap
   ```

2. **Inicie um servidor local**
   ```bash
   # Com Python 3
   python -m http.server 8000
   
   # Com Node.js
   npx serve . -p 8000
   
   # Com PHP
   php -S localhost:8000
   ```

3. **Acesse no navegador**
   ```
   http://localhost:8000
   ```

## 🎨 Customização

### Cores
As cores são controladas por variáveis CSS em `css/style.css`:

```css
:root {
    --accent-color: #FF2549;
    --bg-dark: #EAEAEA;
    --text-primary: #0a0a0a;
    /* ... */
}
```

### Animações
As animações são configuradas em `js/script.js` usando GSAP:

```javascript
// Exemplo de animação de entrada
gsap.fromTo(element, 
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, duration: 1 }
);
```

## 📱 Compatibilidade

| Navegador | Versão Mínima | Suporte |
|-----------|---------------|---------|
| Chrome    | 90+           | ✅ Full |
| Firefox   | 88+           | ✅ Full |
| Safari    | 14+           | ✅ Full |
| Edge      | 90+           | ✅ Full |

## 🚀 Deploy

O projeto está otimizado para deploy em plataformas como:

- **Vercel** - Deploy automático
- **Netlify** - Static hosting
- **Render** - Full stack hosting
- **GitHub Pages** - Free static hosting

## 📧 Contato

- **Email**: mateuskenzo_santos@hotmail.com
- **LinkedIn**: [linkedin.com/in/mateuskenzo](https://www.linkedin.com/in/mateuskenzo)
- **GitHub**: [github.com/KenzoSant](https://github.com/KenzoSant)

## 📄 Licença

Este projeto está sob licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fork o projeto
2. Criar uma branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abrir um Pull Request

## ⭐ Créditos

- **GSAP** - Animações web de alta performance
- **Lenis** - Scroll suave por Studio Freight
- **Phosphor Icons** - Icon library flexible
- **Google Fonts** - Tipografia Inter e Outfit

---

<div align="center">
  <p>Criado com ❤️ por <strong>Kenzo Santos</strong></p>
  <p>© 2026 KENZO.S. Todos os direitos reservados.</p>
</div>
