import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import { PageHero } from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { siteImages } from "@/lib/projects";

// Import all images from assets
import bathroomOld from "@/assets/bathroom-old.jpg";
import bathroom from "@/assets/bathroom.jpg";
import cityBeach1 from "@/assets/City Beach Cotemporary style 1.jpg";
import cityBeach3 from "@/assets/City Beach Cotemporary style 3.jpg";
import cityBeach from "@/assets/City Beach Cotemporary style.jpg";
import poolWall1 from "@/assets/Pool and wall 1.jpg";
import poolWall3 from "@/assets/pool and wall 3.jpg";
import poolWall4 from "@/assets/pool and wall 4.jpg";
import poolWall5 from "@/assets/pool and wall 5.jpg";
import poolWall from "@/assets/Pool and Wall.jpg";
import poolWall2 from "@/assets/Pool and wall2.jpg";
import poolWalls from "@/assets/Pool and walls.jpg";
import southFremantle1 from "@/assets/South Frementle .1.jpg";
import southFremantle2 from "@/assets/South Frementle 2.jpg";
import southFremantle3 from "@/assets/South Frementle 3.jpg";
import southFremantle5 from "@/assets/South Frementle 5.jpg";
import southFremantle from "@/assets/south-frementle .jpg";
import heroMicrocement from "@/assets/hero-microcement.jpg";
import customDesigns from "@/assets/custom-designs.jpg";
import training from "@/assets/training.jpg";

// Gallery data - all images merged
const galleryData = [
  // Individual images from projects
  {
    id: "hero-microcement",
    type: "single" as const,
    image: heroMicrocement,
  },
  {
    id: "bathroom",
    type: "single" as const,
    image: bathroom,
  },
  {
    id: "custom-designs",
    type: "single" as const,
    image: customDesigns,
  },
  {
    id: "training",
    type: "single" as const,
    image: training,
  },
  {
    id: "bathroom-old",
    type: "single" as const,
    image: bathroomOld,
  },
  
  // Site images from projects
  {
    id: "projects-pano",
    type: "single" as const,
    image: siteImages.projectsPano,
  },
  {
    id: "work-hall",
    type: "single" as const,
    image: siteImages.workHall,
  },
  {
    id: "work-lounge",
    type: "single" as const,
    image: siteImages.workLounge,
  },
  {
    id: "work-pool",
    type: "single" as const,
    image: siteImages.workPool,
  },
  {
    id: "forbes",
    type: "single" as const,
    image: siteImages.forbes,
  },
  {
    id: "banner",
    type: "single" as const,
    image: siteImages.banner,
  },
  {
    id: "diy-training",
    type: "single" as const,
    image: siteImages.diyTraining,
  },
  {
    id: "materials",
    type: "single" as const,
    image: siteImages.materials,
  },
  {
    id: "cemento-work",
    type: "single" as const,
    image: siteImages.cementoWork,
  },
  {
    id: "custom-designs-hero",
    type: "single" as const,
    image: siteImages.customDesignsHero,
  },
  {
    id: "saunders",
    type: "single" as const,
    image: siteImages.saunders,
  },
  
  // City Beach group
  {
    id: "city-beach",
    type: "group" as const,
    coverImage: cityBeach,
    images: [
      cityBeach,
      cityBeach1,
      cityBeach3,
    ],
  },
  
  // Pool group
  {
    id: "pool",
    type: "group" as const,
    coverImage: poolWall,
    images: [
      poolWall,
      poolWall1,
      poolWall2,
      poolWall3,
      poolWall4,
      poolWall5,
      poolWalls,
    ],
  },
  
  // South Fremantle group
  {
    id: "south-fremantle",
    type: "group" as const,
    coverImage: southFremantle,
    images: [
      southFremantle,
      southFremantle1,
      southFremantle2,
      southFremantle3,
      southFremantle5,
    ],
  },
];

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | Cemento Micro Cement Perth" },
      {
        name: "description",
        content:
          "Explore our gallery of micro cement projects across Perth — seamless bathrooms, curved feature walls, benchtops, and commercial fit-outs.",
      },
      { property: "og:title", content: "Gallery | Cemento Micro Cement Perth" },
      {
        property: "og:description",
        content:
          "A visual gallery of completed micro cement work across Perth: wet areas, feature walls, floors, benchtops and commercial fit-outs.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const reduce = useReducedMotion();
  const [selectedGroup, setSelectedGroup] = useState<typeof galleryData[0] | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const openLightbox = (item: typeof galleryData[0], index: number = 0) => {
    setSelectedGroup(item);
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = "unset";
    setTimeout(() => setSelectedGroup(null), 300);
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (!selectedGroup) return;
    const total = selectedGroup.type === "group" ? selectedGroup.images.length : 1;
    if (direction === "prev") {
      setCurrentImageIndex((prev) => (prev - 1 + total) % total);
    } else {
      setCurrentImageIndex((prev) => (prev + 1) % total);
    }
  };

  // Handle keyboard navigation
  useState(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") navigateImage("prev");
      if (e.key === "ArrowRight") navigateImage("next");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const getImageToShow = (item: typeof galleryData[0]) => {
    if (item.type === "group") {
      return item.coverImage;
    }
    return item.image;
  };

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="Our Gallery"
        intro="Browse our portfolio of micro cement installations across Perth — from residential bathrooms to commercial fit-outs and outdoor living spaces."
        image={siteImages.projectsPano}
        imageAlt="Curved micro cement atrium with a floating stair in a Perth home"
      >
        <Button asChild variant="clay" size="lg">
          <Link to="/contact">Start your project</Link>
        </Button>
      </PageHero>

      <section className="container-page py-16 md:py-24">
        <div className="columns-1 gap-4 sm:columns-2 md:gap-5 lg:columns-3 xl:columns-4 [&>*]:mb-4 [&>*]:sm:mb-5">
          {galleryData.map((item, index) => {
            const imageCount = item.type === "group" ? item.images.length : 1;
            const imageSrc = getImageToShow(item);
            
            return (
              <motion.div
                key={item.id}
                className="group relative cursor-pointer overflow-hidden rounded-sm bg-secondary"
                initial={reduce ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => openLightbox(item)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={imageSrc}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    style={{ aspectRatio: "auto" }}
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
                  
                  {/* Image count badge - only show for groups with more than 1 image */}
                  {imageCount > 1 && (
                    <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-xs text-white backdrop-blur-sm">
                      <ImageIcon className="h-3 w-3" />
                      <span>{imageCount}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Lightbox */}
      {isLightboxOpen && selectedGroup && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
            aria-label="Close gallery"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); navigateImage("prev"); }}
            className="absolute left-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 disabled:opacity-50"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); navigateImage("next"); }}
            className="absolute right-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 disabled:opacity-50"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div 
            className="relative max-h-[90vh] max-w-[90vw]" 
            onClick={(e) => e.stopPropagation()}
          >
            {selectedGroup.type === "group" ? (
              <img
                src={selectedGroup.images[currentImageIndex]}
                alt=""
                className="max-h-[85vh] max-w-[90vw] object-contain"
              />
            ) : (
              <img
                src={selectedGroup.image}
                alt=""
                className="max-h-[85vh] max-w-[90vw] object-contain"
              />
            )}
            
            {/* Image counter - only show for groups */}
            {selectedGroup.type === "group" && selectedGroup.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-lg bg-black/60 px-3 py-1.5 text-sm text-white backdrop-blur-sm">
                {currentImageIndex + 1} / {selectedGroup.images.length}
              </div>
            )}

            {/* Thumbnails - only show for groups */}
            {selectedGroup.type === "group" && selectedGroup.images.length > 1 && (
              <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto px-4 py-2 max-w-[80vw]">
                {selectedGroup.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(idx); }}
                    className={`relative h-12 w-12 flex-shrink-0 overflow-hidden rounded border-2 transition-all ${
                      idx === currentImageIndex 
                        ? "border-clay opacity-100" 
                        : "border-white/30 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <section className="border-t border-border bg-[image:var(--gradient-sand)]">
        <div className="container-page flex flex-col items-start gap-6 py-16 md:flex-row md:items-center md:justify-between md:py-20">
          <div className="flex items-center gap-6">
            <img
              src={siteImages.workHall}
              alt="Curved micro cement hallway"
              loading="lazy"
              className="hidden h-24 w-24 rounded-sm object-cover md:block"
            />
            <div>
              <h2 className="text-3xl md:text-4xl">Inspired by what you see?</h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                Book a consultation and we'll plan the works and fix the price on the day.
              </p>
            </div>
          </div>
          <Button asChild variant="clay" size="lg">
            <Link to="/contact">Request a quote</Link>
          </Button>
        </div>
      </section>
    </>
  );
}