# Sacada em vídeo — 15/09/2026

A seção `#diferenciais` agora ocupa a tela toda e usa o vídeo fornecido pelo cliente. A versão anterior com painéis em CSS 3D foi substituída no site.

## Material

- Original preservado: `C:/Users/Acer Predator/Downloads/Glass_doors_opening_camera_moving_20260915093546.mp4`.
- Arquivo publicado na build: `public/media/sacada-scroll-v1.mp4`.
- Poster: `public/media/sacada-scroll-poster-v1.jpg`, extraído do primeiro frame.
- Vídeo: 1920 × 1080, 24 fps, 8 segundos; H.264, sem áudio, aproximadamente 7,6 MB.
- Preparação: FFmpeg, CRF 23, keyframe a cada 6 frames e faststart para facilitar a busca durante a rolagem. O original não foi modificado.

## Comportamento

O bloco tem 400svh no desktop e 360svh no mobile; a cena permanece fixa durante o trecho correspondente à duração do vídeo. Não há reprodução automática por tempo: a posição da página determina o frame. Ao voltar, a cena volta. Quando chega ao último frame, acaba o trecho fixo e Soluções entra com a rolagem normal, sem salto forçado, clique obrigatório ou espera adicional.

Textos em HTML, independentes da imagem:

1. Início: “Uma nova forma de viver sua sacada.” e “Role para abrir e descobrir a vista”.
2. Abertura: “Abra espaço para a sua vista.”
3. Entre 57% e 73%, a vista fica sem mensagem central.
4. A partir de 73%: “Sua sacada. Novas possibilidades.”, atendimento na Grande São Paulo e link para as soluções. A mensagem já está completamente visível aos 82%, antes do fim.

Um link para pular a animação permanece disponível. Textos invisíveis ficam fora da navegação por teclado. No mobile, o vídeo horizontal usa recorte central; não existe arquivo vertical fornecido pelo cliente ainda.

O vídeo carrega quando a seção se aproxima da tela. Buscas pendentes são agrupadas para acompanhar o destino mais recente. Sem JavaScript, com preferência de movimento reduzido ou erro de vídeo, há poster estático, título e link para as soluções, sem percurso longo de rolagem. A preferência de movimento reduzido foi revisada no código, não emulada no navegador desta sessão.

## Validação

- `npm run build`: tipos e build sem erros.
- `node scripts/verify-balcony.mjs`: relação rolagem/frame, reversão, último frame, intervalos dos textos, ausência de sobreposição e referência ao poster.
- `node scripts/verify-seo.mjs`: H1, metadados, catálogo com 13 serviços, JSON-LD, robots e sitemap.
- Navegador: desktop 1440 × 900 e mobile 390 × 844; vídeo avançando e voltando, intervalo sem texto, mensagem final, entrada da próxima seção e ausência de transbordamento horizontal.
