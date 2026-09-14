# Portão do hero — edição complementar

Ferramenta: image_gen integrada, modo de edição (sem CLI).

Fonte: src/assets/tecnoglass/portao-residencial.jpeg. A edição melhora os detalhes e a exposição e adapta o enquadramento. A versão vertical também é usada no cartão “A entrada faz parte do projeto”, conforme solicitado pelo cliente. A foto original permanece preservada e nas outras seções.

Saídas selecionadas:
- src/assets/tecnoglass/hero/portao-desktop-v1.png — 1672 × 941.
- src/assets/tecnoglass/hero/portao-mobile-v1.png — 941 × 1672.

## Prompt desktop

Use case: precise-object-edit.
Asset type: full-bleed architectural website hero, desktop landscape 16:9, high resolution ideally 2560x1440.
Input image 1 is the EDIT TARGET, an actual residential black metal mesh gate photograph.
Primary request: restore and professionally retouch this exact image to remove pixelation, JPEG compression, color noise and harsh blown exposure. Reconstruct clean realistic photographic detail, especially straight crisp black metal edges and fine uniform mesh without moire, while preserving the recognizable real gate: identical frame proportions, same vertical and horizontal divisions, right-side pedestrian door and handle, dark semi-transparent mesh, same white modern house, palm trees, boundary pillars and adjacent wooden slats. Do not replace the gate with a different design or solid panels. Maintain original oblique camera view. Reframe the scene wider for desktop, outpainting only surrounding existing architecture, sky and sidewalk as needed so the whole gate fits comfortably across the lower two thirds with margins. Soft balanced natural daylight, neutral white balance, readable dark metal texture, realistic greenery, no HDR or crunchy sharpening. This photograph fills a website hero with HTML copy over the left half; keep that area relatively calm but do not add a baked-in gradient. Preserve one coherent believable scene. No new people, vehicles, furniture or embellishments; no logos, text, watermark, borders, collage, blurred sidebars or UI.

## Prompt mobile

Use case: precise-object-edit.
Asset type: full-bleed mobile website hero photograph, portrait 9:16, ideally 1440x2560.
Input image 1 is the original EDIT TARGET. Image 2 is a supporting restored desktop version of the SAME gate; match its clean photographic detail, balanced exposure and natural colors.
Create a high-detail portrait composition of the same real residential black metal mesh gate. Remove JPEG pixelation, noise and moire; retain realistic thin mesh and crisp metal profiles without oversharpening. Preserve gate design, relative proportions, vertical/horizontal frame divisions, right pedestrian door and handle, white house, palm trees and wooden slats. Do NOT squeeze or redesign the gate to make it tall. Use a slightly wider-distance portrait architectural framing, extending existing sky above and sidewalk below as necessary, with the gate across the central/lower portion and generous calmer sky/house area in the upper third for HTML title overlay. Gate should remain the main subject and remain identifiable even at phone width. Match original oblique perspective and believable sunny daylight balanced to avoid clipped white highlights. A coherent real photographic scene, no new people, vehicles, decorations, installations or structures. No text, logos, watermarks, borders, collage, UI or blurred filler.
