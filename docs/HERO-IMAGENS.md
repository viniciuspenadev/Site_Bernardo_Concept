# Imagens do hero Tecnoglass — 14/09/2026

Ferramenta: image_gen integrada (modo de edição; sem CLI).

Fonte: src/assets/tecnoglass/fachada-vidro-esquadrias.jpeg.

Imagens destinadas ao hero, refeitas por edição generativa a pedido do cliente. O carrossel e as seções institucionais continuam usando as fotografias originais, sem reconstrução generativa. A edição expande o enquadramento; elementos periféricos reconstruídos não devem ser usados como documentação técnica da obra.

Saídas selecionadas:
- src/assets/tecnoglass/hero/fachada-desktop-v1.png — composição horizontal 1672 × 941.
- src/assets/tecnoglass/hero/fachada-mobile-v1.png — composição vertical 941 × 1672.

O componente HeroPhoto.astro seleciona a versão vertical até 767 px e a horizontal acima disso. A build cria arquivos WebP responsivos sem alterar estes originais de trabalho.

## Prompt desktop

Use case: precise-object-edit.
Asset type: full-bleed desktop website hero photograph, wide landscape 16:9, ideally 2048x1152.
Input image 1 is the EDIT TARGET: a real photo of a white two-storey residence with black sliding doors, integrated upper windows and a transparent glass balcony railing.
Primary request: reframe and outpaint this exact photograph into a continuous landscape architectural photograph that can fill an entire website hero edge to edge. Keep the recognizable building and its installed glass/aluminium elements geometrically faithful. Preserve the number, divisions, materials, placement and proportions of windows, black profiles, sliding doors and glass railing. Do not redesign the facade or invent extra glass installations. Maintain the white textured facade and cool natural daylight. Extend the scene plausibly using existing sky, patio and boundary wall. Place the building primarily in the center-right 60% of the frame, with calmer patio/wall/sky space on the left for HTML text overlay. Keep both the balcony glazing and ground-floor doors visible. Correct only minor exposure and clarity issues; retain photographic realism and the original camera's slightly low angle. No new people, no furniture, no plants added as decoration, no luxury staging. No text, logos, watermark, frame, borders, panels, collage, blur-filled sidebars or blank margins. The entire image must be one coherent photograph.

## Prompt mobile

Use case: precise-object-edit.
Asset type: full-bleed mobile website hero photograph, portrait 9:16, ideally 1152x2048.
Input image 1 is the EDIT TARGET, not merely a style reference: the supplied photo of a white two-storey residence with black sliding doors, integrated upper windows and transparent glass balcony railing.
Primary request: create a carefully reframed, lightly retouched portrait mobile version of this same photograph. Preserve the actual facade and all installed glass/aluminium work: same number and divisions of windows, door leaves, black profiles and railing panels; same placement, proportions, materials and white textured structure. Keep the low-angle photographic view, naturally overcast daylight and believable real photographic detail. Extend sky at the top and patio at the bottom only as needed to make a 9:16 composition. Keep the house centered, with the glass balcony and ground-floor sliding doors clearly visible and with generous enough margins for a full-screen phone crop. The top 25% should be calmer sky/facade area where a website can overlay a short headline using HTML. Do not redesign or beautify the building into a different project. No new people, furniture or decorative plants. Do not insert text, logos, watermarks, borders, blank padding, blurred filler, UI, collage or graphic elements. One continuous full-frame architectural photograph.
