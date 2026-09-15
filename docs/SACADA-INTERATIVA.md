# Sacada interativa — 15/09/2026

A seção `#diferenciais` combina um cenário fotográfico ilustrativo com seis folhas em CSS 3D. A rolagem avança a abertura e a rolagem inversa fecha o conjunto. Cada folha se desloca e gira para se recolher à direita. Não é uma simulação técnica de um sistema comercial específico.

No desktop, cena e texto ficam lado a lado durante a rolagem. No mobile, o texto vem antes da cena. Barra de abertura e botão permitem controle manual por toque, mouse e teclado. O foco não sobrescreve a abertura escolhida; um novo gesto de rolagem retoma o acompanhamento da página. Com `prefers-reduced-motion`, não há abertura automática nem área prolongada de rolagem, e o botão muda a posição sem animação. Sem JavaScript, há uma composição estática com texto descritivo.

Nenhuma biblioteca 3D foi adicionada. O Astro gera WebP e JPEG responsivos do cenário, carregado sob demanda. A animação usa transformações e quadros apenas durante interação. O texto da empresa permanece no HTML estático.

## Imagem e origem

- Modo: ferramenta nativa `image_gen`, sem CLI.
- Arquivo no projeto: `C:/xampp/htdocs/tecnoglass/src/assets/tecnoglass/interactive/sacada-aberta-v1.png`.
- Saída original: `C:/Users/Acer Predator/.codex/generated_images/01a09fc1-3a4b-7d51-b436-5a6f5892de20/exec-387aa442-44b8-417d-951f-9ea34d686230.png`.
- Dimensões: 1122 × 1402. A composição final recebeu os painéis em código, sem editar a imagem raster.
- Identificação visível: “Demonstração ilustrativa”.

## Prompt usado

Create a premium realistic front-on architectural photograph of an open Brazilian apartment balcony, portrait 4:5. A wide empty rectangular opening spans x=7% to 93% and y=13% to 84% with narrow dark level header and floor tracks and light stone side piers. There must be NO front glass panels, no vertical window mullions, no doors, no folded glass. Clear open air between the foreground tracks; moving glass panels will be added separately in code. Behind the opening is a light travertine balcony floor and a separate simple dark metal safety railing along the outer edge at 65% image height. Beyond is a green tree-lined distant skyline in soft morning light. Restrained chair and potted greenery tucked at the far left, calm neutral materials, level one-point perspective, crisp natural photographic detail. No text, logos, watermark, graphics, people or borders.

## Validação

`npm run build` verifica tipos e compila o site. `node scripts/verify-balcony.mjs` (Node 24) valida limites, sequência de folhas, recolhimento à direita e reversibilidade. `node scripts/verify-seo.mjs` verifica a base SEO do HTML gerado.

Verificação visual no navegador: desktop 1280 × 800, mobile 390 × 844 e 320 × 740, sem transbordamento horizontal; abertura de 0 a 100%, rolagem inversa, botão de abertura/fechamento e controle por teclado. A preferência de movimento reduzido está implementada, mas não foi emulada no navegador desta sessão.
