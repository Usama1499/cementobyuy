DELETE FROM public.colors;

INSERT INTO public.colors (id, name, hex, prompt_fragment, sort_order, active) VALUES
('mct-050','Frost MCT-050','#F2F2F0','a bright frost white with the faintest cool grey shadowing',10,true),
('mct-100','Eclipse MCT-100','#5A5F5E','a deep eclipse charcoal grey with cool tonal depth',20,true),
('mct-120','Solace MCT-120','#7E8478','a mid solace grey with a soft muted green-grey cast',30,true),
('mct-140','Veil MCT-140','#8A8B7A','a veil grey-olive with a gentle earthy haze',40,true),
('mct-200','Dune MCT-200','#9A8F6B','a warm dune khaki with sandy golden undertones',50,true),
('mct-220','Terra MCT-220','#8E6A4E','a rich terra brown with warm toasted earth tones',60,true),
('mct-240','Husk MCT-240','#8E6558','a husk brown with soft rosy-mauve warmth',70,true),
('mct-300','Shiraz MCT-300','#8C3B3E','a deep shiraz red with wine-like richness',80,true),
('mct-320','Flame MCT-320','#B8453A','a vivid flame terracotta red',90,true),
('mct-400','Moss MCT-400','#8FA282','a soft moss sage green',100,true),
('mct-420','Meadow MCT-420','#1FB08A','a vibrant meadow emerald green with fresh clarity',110,true),
('mct-500','Lagoon MCT-500','#4C9BE8','a clear lagoon sky blue',120,true),
('mct-520','Aquamarine MCT-520','#3E7789','a deep aquamarine teal blue',130,true),
('mct-600','Lavender MCT-600','#8258C8','a rich lavender violet',140,true),
('mct-700','Marigold MCT-700','#E5854A','a warm marigold orange',150,true),
('mct-800','Sunset MCT-800','#EFC069','a golden sunset yellow',160,true);

INSERT INTO public.products (id, name, price, category, image, description, long_description, coverage, unit, stock, sort_order, active)
VALUES (
  'training-diy-workshop',
  'DIY Micro Cement Training — 22 August 2026',
  770,
  'Training',
  'https://www.jotform.com/uploads/5Y_studio/form_files/m520_microestil_plus_base_25kg_954b830b2aa43c9da28f4d9cc6aff1b1.png',
  'Full-day hands-on micro cement workshop at our Malaga warehouse. All materials, tools and lunch included.',
  'A full day on the trowel with Maurizio and the Cemento team: substrate prep, priming, mixing, trowel technique, tinting, sanding and sealing. Small groups so everyone gets their own practice panel.',
  'One participant place',
  'per person',
  20,
  0,
  true
)
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, description = EXCLUDED.description, active = true;