'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { createBrowserClient } from '@supabase/ssr';

interface Slide {
  id: string | number;
  title: string;
  description: string;
  image_url: string;
  order_index: number;
}

const localSlides: Slide[] = [
  {
    id: 1,
    title: 'Notre société est certifiée RGE QualiBois 2025',
    description: "Notre société est Reconnu Garant de l'Environnement pour réaliser des travaux de rénovation énergétique ouvrant droit aux aides publiques (MaPrimeRénov', éco-prêt à taux zéro, etc.) et étant gage de compétence.",
    image_url: '/uploads/hero1.jpg',
    order_index: 1,
  },
  {
    id: 2,
    title: 'Pose de poêle',
    description: 'Pose personnalisée par des professionnels',
    image_url: '/uploads/hero2.jpg',
    order_index: 2,
  },
  {
    id: 3,
    title: 'Montage de cheminée',
    description: 'Nous pouvons réaliser la pose d\'inserts et cheminées et nous promulguons tous les conseils nécessaires à optimiser l\'utilisation de votre futur produit.',
    image_url: '/uploads/hero3.jpg',
    order_index: 3,
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slides, setSlides] = useState<Slide[]>(localSlides);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // const supabase = createBrowserClient(
  //   process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  // );

  useEffect(() => {
    // fetchSlides();
    // Since we are using local images, no fetching is needed.
    setIsLoading(false);
  }, []);

  // const fetchSlides = async () => {
  //   try {
  //     console.log('Récupération des slides...');
  //     const { data, error } = await supabase
  //       .from('slides')
  //       .select('*')
  //       .order('order_index', { ascending: true });

  //     if (error) throw error;
  //     console.log('Slides récupérés:', data);
  //     setSlides(data || []);
  //   } catch (error) {
  //     console.error('Error fetching slides:', error);
  //     setError('Erreur lors de la récupération des slides');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  useEffect(() => {
    if (slides.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 10000);
      return () => clearInterval(timer);
    }
  }, [slides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // The getImageUrl function is no longer needed as image_url is already the correct public path.
  // const getImageUrl = (path: string) => {
  //   if (!path) return '';
  //   if (path.startsWith('http')) return path;
  //   const fileName = path.split('/').pop();
  //   return `/uploads/${fileName}`;
  // };

  if (isLoading) {
    return (
      <div className="h-[600px] w-full bg-gray-200 animate-pulse flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-red"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[600px] w-full bg-gray-200 flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="h-[600px] w-full bg-gray-200 flex items-center justify-center">
        <p className="text-gray-500">Aucun slide disponible</p>
      </div>
    );
  }

  const currentSlideData = slides[currentSlide];
  const imageUrl = currentSlideData.image_url; // Use image_url directly
  console.log('Slide actuel:', currentSlideData);
  console.log('URL de l\'image:', imageUrl);

  return (
    <div className="relative h-[600px] w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlideData.id} // Use unique ID for key
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {imageUrl ? (
            <div className="relative w-full h-full mx-auto">
              <img
                src={imageUrl}
                alt={currentSlideData.title}
                className="w-full h-full object-contain"
                onError={(e) => {
                  console.error('Erreur de chargement de l\'image:', e);
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500">Image non disponible</p>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="max-w-2xl text-white"
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  {currentSlideData.title}
                </h1>
                <p className="text-lg md:text-xl mb-8">
                  {currentSlideData.description}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
} 