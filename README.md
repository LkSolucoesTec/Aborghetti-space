# Aborghetti — Home animada (Revisão 03)

Projeto estático com HTML, CSS e JavaScript separados. Mantém a identidade visual e os efeitos cinematográficos, com os ajustes solicitados nesta revisão.

## Estrutura

- `index.html` — marcação e conteúdo da página.
- `css/styles.css` — estilos, responsividade e animações CSS.
- `js/animations.js` — animações GSAP e ScrollTrigger.
- `js/interactions.js` — navegação mobile, carrossel de depoimentos, modais de vídeo, reveal e download da apresentação.
- `js/scene.js` — cena abstrata Three.js da Hero (objetos de vidro, partículas e shader de névoa; sem logotipo e sem anéis orbitais).
- `js/preloader.js` — preloader ilustrado responsivo com timeout de segurança.
- `js/config.js` — configuração de vídeo.
- `assets/preloaderdesktop.png` e `assets/preloadermobile.png` — imagens do preloader fornecidas pelo usuário.
- `assets/apresentacao-comercial-aborghetti.pdf` — apresentação comercial fornecida pelo usuário.

## Executar localmente

Abra a pasta no VS Code e execute `index.html` com Live Server. A cena 3D usa módulos Three.js importados via CDN, então precisa de conexão com a internet.

## Observações importantes antes do deploy

1. Os quatro vídeos promocionais não foram fornecidos. Configure `data-video-src` nos quatro elementos `.th` com URLs/arquivos reais. O vídeo principal também depende de um `VIDEO_SRC` válido em `js/config.js`.
2. O download da apresentação valida nome, e-mail, WhatsApp, empresa e consentimento no navegador e inicia o download do PDF local. Para captação real de leads, conecte o formulário a um backend/CRM e publique uma política de privacidade válida. Validação somente no front-end não armazena nem envia os dados.
3. O preloader tem um limite de 4,5 segundos para não deixar o site bloqueado indefinidamente.
4. Dependências externas: GSAP/ScrollTrigger, Three.js e fontes Google via CDN.
5. A sintaxe JavaScript foi verificada com Node.js. O comportamento visual precisa ser validado em navegador desktop e mobile antes do deploy.


## Revisão 04 — Hero 3D restaurada
- Cena Three.js atualizada com shader líquido, blocos de vidro/acrílico, esfera magenta, anéis e 500 partículas.
- Mouse controla a parallax da câmera e a rotação do conjunto.
- Scroll da Hero controla a posição/escala do conjunto e a expansão visual.
- O canvas continua sem logotipo literal; os elementos são abstratos.
- O carregamento sinaliza `scene-ready` após o primeiro frame renderizado.
