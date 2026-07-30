ALTER TABLE public.textures ADD COLUMN IF NOT EXISTS image_url text NOT NULL DEFAULT '';

DELETE FROM public.textures;

INSERT INTO public.textures (id, name, description, swatch_color, prompt_fragment, sort_order, image_url) VALUES
('rame-patina','Rame Patina','A warm copper finish with an oxidised patina effect.','#a8563a','a warm copper metallic micro cement finish with an oxidised verdigris patina, rust and turquoise mineral bloom, hand-trowelled movement',1,'/__l5e/assets-v1/4a62b494-6140-4ce2-939c-29aa75fc0546/rame-patina.jpg'),
('azzurro-linea','Azzurro Linea','Deep ocean blue with fine vertical brush lines.','#1f5f8b','a deep ocean blue micro cement finish with fine vertical raked brush lines and subtle tonal depth',2,'/__l5e/assets-v1/349c094d-b887-4b92-b142-feec3d066617/azzurro-linea.jpg'),
('terra-toscana','Terra Toscana','Rustic terracotta with layered movement.','#b5623f','a rustic Tuscan terracotta micro cement finish with layered trowel movement and warm earthen mottling',3,'/__l5e/assets-v1/340dffa8-8106-4807-96c8-b590122c4400/terra-toscana.jpg'),
('sabbia-fine','Sabbia Fine','Fine sand-textured finish in a soft beige.','#d9c7a7','a fine sand-textured micro cement finish in a soft warm beige with delicate pitting and even grain',4,'/__l5e/assets-v1/e5388f7e-8d59-4a2f-a275-218b44970928/sabbia-fine.jpg'),
('coccodrillo','Coccodrillo','Crocodile skin-inspired textured finish.','#b48b4a','a crocodile skin inspired textured micro cement finish with raised scale patterning in warm golden tan',5,'/__l5e/assets-v1/099ce485-e439-4821-bb36-52d9285283da/coccodrillo.jpg'),
('oro-spazzolato','Oro Spazzolato','Brushed gold metallic with subtle shimmer.','#c9a45c','a brushed gold metallic micro cement finish with horizontal brush strokes and a subtle shimmering sheen',6,'/__l5e/assets-v1/70c24016-3cf8-4e63-b4a1-154df30fb182/oro-spazzolato.jpg'),
('marmo-rosa','Marmo Rosa','Grey marble with blush-pink veining.','#c9a3a0','a grey marble effect micro cement finish with soft blush pink veining and cloudy stone movement',7,'/__l5e/assets-v1/34c9b41e-f645-4a07-8093-6fb1fc9e830a/marmo-rosa.jpg'),
('cemento-naturale','Cemento Naturale','Soft natural concrete effect.','#b9b5ae','a soft natural concrete effect micro cement finish in light warm grey with gentle cloudy movement',8,'/__l5e/assets-v1/896d26ce-5708-45f8-ba59-c99b25bce8a2/cemento-naturale.jpg'),
('oro-antico','Oro Antico','Antique brushed gold finish.','#c1934f','an antique brushed gold micro cement finish with aged sandy golden tones and soft trowel seams',9,'/__l5e/assets-v1/39e740fb-b225-4b4d-bb89-565637eed4ab/oro-antico.jpg'),
('corallo-veneziano','Corallo Veneziano','Venetian plaster with warm coral tones.','#c86a55','a Venetian plaster micro cement finish with warm coral and terracotta tones and polished trowel marks',10,'/__l5e/assets-v1/19bd114c-8091-4f4d-89c6-5547f793b1c0/corallo-veneziano.jpg'),
('champagne-velvet','Champagne Velvet','Soft champagne metallic finish.','#dcc49a','a soft champagne metallic micro cement finish with a velvety sheen and cloudy trowel movement',11,'/__l5e/assets-v1/b2693915-5597-402c-85cc-c17c87280720/champagne-velvet.jpg'),
('argento-seta','Argento Seta','Silver silk with elegant horizontal movement.','#c3c6c8','a silver silk metallic micro cement finish with elegant horizontal movement and a satin shimmer',12,'/__l5e/assets-v1/bccad704-be8a-4abd-a5ec-58f7c6a21fa2/argento-seta.jpg');

UPDATE public.orders SET status = 'cancelled', updated_at = now() WHERE status = 'pending';