import banner from "@/assets/site/cemento_front_banner.png";
import projectsPano from "@/assets/site/cemento_projects.png";
import workHall from "@/assets/site/work_image5.jpg";
import workLounge from "@/assets/site/work_image3.jpg";
import workPool from "@/assets/site/work_image.jpg";
import diyTraining from "@/assets/site/cemento_diy_training.jpg";
import materials from "@/assets/site/cemento_materials.jpg";
import trades from "@/assets/site/trades.jpg";
import forbes from "@/assets/site/forbes-apartments-11-scaled.jpg";
import logo from "@/assets/site/cemento_logo-2.png";
import slide1 from "@/assets/site/cemento_front_banner.png";
import slide2 from "@/assets/site/cemento_projects_slide_2.png";
import slide3 from "@/assets/site/slide_3.png";
import slide4 from "@/assets/site/slide_4.png";
import maurizio from "@/assets/site/maurizio.jpg";
import stephin from "@/assets/site/stephin.jpg";
import cementoWork from "@/assets/site/cemento_work.png";
import customDesignsHero from "@/assets/site/cemento_custom_designs.jpg";
import saunders from "@/assets/site/17-saunders-street-mosman-park.jpg";
import applications from "@/assets/site/wokking_image.png";
import bathroom from "@/assets/bathroom.jpg";
import customDesigns from "@/assets/custom-designs.jpg";
import training from "@/assets/training.jpg";
import hero from "@/assets/hero-microcement.jpg";

export const siteImages = {
  banner: banner,
  projectsPano: projectsPano,
  workHall: workHall,
  workLounge: workLounge,
  workPool: workPool,
  diyTraining: diyTraining,
  materials: materials,
  trades: trades,
  forbes: forbes,
  logo: logo,
  slide1: slide1,
  slide2: slide2,
  slide3: slide3,
  slide4: slide4,
  maurizio: maurizio,
  stephin: stephin,
  cementoWork: cementoWork,
  customDesignsHero: customDesignsHero,
  saunders: saunders,
  applicationsGrid: applications,
  bathroom,
  customDesigns,
  training,
  hero,
} as const;

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  image: string;
  /** Masonry weight — tall tiles span two rows on large screens. */
  tall?: boolean;
}

export const projects: Project[] = [
  {
    id: "curved-atrium",
    title: "Curved atrium & floating stair",
    description:
      "A double-height atrium wrapped in seamless micro cement, with a sculpted stair and circular window reveal finished in the same pour.",
    category: "Residential",
    location: "AI",
    image: siteImages.projectsPano,
    tall: true,
  },
  {
    id: "organic-hallway",
    title: "Organic hallway curves",
    description:
      "Flowing wall forms and recessed warm lighting — every corner radiused so there is not a single visible joint.",
    category: "Feature walls",
    location: "AI",
    image: siteImages.workHall,
  },
  {
    id: "arched-niche-lounge",
    title: "North Perth",
    description:
      "A full-height feature wall with a hand-formed arched niche in Sabbia Fine, finished matte for a soft, chalky light.",
    category: "Residential",
    location: "North Perth",
    image: siteImages.workLounge,
  },
  {
    id: "pool-surround",
    title: "Seamless pool surround",
    description:
      "Slip-rated exterior micro cement over existing concrete — no tiles, no grout lines, no lifting edges.",
    category: "Outdoor",
    location: "AI",
    image: siteImages.workPool,
  },
  {
    id: "forbes-apartments",
    title: "Forbes Apartments façade detail",
    description:
      "Textured architectural detailing and curved balcony soffits across a multi-storey apartment development.",
    category: "Commercial",
    location: "Applecross",
    image: siteImages.forbes,
    tall: true,
  },
  {
    id: "benchtop-polish",
    title: "Micro cement benchtop",
    description:
      "A monolithic kitchen benchtop machine-polished on site and sealed for food-safe daily use.",
    category: "Benchtops",
    location: "Malaga workshop",
    image: siteImages.banner,
  },
  {
    id: "wet-area",
    title: "Grout-free wet area",
    description:
      "Fully waterproofed shower and vanity in Cemento Naturale — installed straight over the existing tiles.",
    category: "Bathrooms",
    location: "Subiaco",
    image: siteImages.bathroom,
  },
  {
    id: "sculpted-joinery",
    title: "Sculpted joinery & mouldings",
    description:
      "Custom moulds and formwork built in-house, then coated so the joinery, and we can built cutom furniture.",
    category: "Custom designs",
    location: "AI Design",
    image: siteImages.customDesigns,
  },
  {
    id: "diy-workshop",
    title: "DIY training workshop",
    description:
      "Two-day hands-on workshops covering priming, base coats, trowel technique, sanding and sealing.",
    category: "Training",
    location: "Malaga",
    image: siteImages.diyTraining,
  },
  {
    id: "materials-range",
    title: "Trade materials range",
    description:
      "Microestil bases, finishing coats, primers, sealers and pigments — the exact products our own crews install with.",
    category: "Materials",
    location: "17 Irvine St, Malaga",
    image: siteImages.materials,
  },
  // {
  //   id: "the-team",
  //   title: "The Cemento trade team",
  //   description:
  //     "WASPA and HBA members, with apprentice-of-the-year winners on the tools — every job installed by our own crew.",
  //   category: "Our team",
  //   location: "Perth",
  //   image: siteImages.trades,
  // },
  {
    id: "living-floor",
    title: "Whole-floor continuous pour",
    description:
      "Living, dining and hallway finished as one uninterrupted 2mm surface with no thresholds between rooms.",
    category: "Floors",
    location: "Nedlands",
    image: siteImages.training,
  },
  {
    id: "cave-spa-suite",
    title: "Cave-form spa suite",
    description:
      "A sculpted cave-like bathing suite in seamless white micro cement, with an integrated stone spa and a full-height sea view opening.",
    category: "Bathrooms",
    location: "AI",
    image: siteImages.cementoWork,
    tall: true,
  },
  {
    id: "saunders-street-villa",
    title: "City Beach",
    description:
      "City Beach contemporary accommodation",
    category: "Exterior",
    location: "City Beach",
    image: siteImages.saunders,
  },
  {
    id: "spiral-stair-feature",
    title: "Spiral stair & stone feature wall",
    description:
      "A hand-formed spiral stair coated in smooth micro cement, set against a textured feature wall in the same tonal family.",
    category: "Custom designs",
    location: "AI",
    image: siteImages.customDesignsHero,
  },
];
