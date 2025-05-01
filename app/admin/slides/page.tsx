'use client';

import { createBrowserClient } from '@supabase/ssr';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Slide {
  id: string;
  title: string;
  description: string;
  image_url: string;
  order_index: number;
}

export default function SlidesPage() {
  const router = useRouter();
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<Slide | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    order_index: '',
    image: null as File | null,
  });

  // Fonction utilitaire pour générer l'URL locale du dossier uploads
  const getImageUrl = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    const fileName = path.split('/').pop();
    return `/uploads/${fileName}`;
  };

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error || !session) {
      router.push('/admin/login');
      return;
    }
    fetchSlides();
  };

  const fetchSlides = async () => {
    try {
      const { data, error } = await supabase
        .from('slides')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      setSlides(data || []);
    } catch (error) {
      console.error('Error fetching slides:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('Début de la soumission du formulaire');
      let imageUrl = editingSlide?.image_url || null;

      // Vérification des données du formulaire
      if (!formData.title || !formData.description || !formData.order_index) {
        throw new Error('Tous les champs sont obligatoires');
      }

      if (formData.image) {
        console.log('Téléchargement de l\'image...');
        const fileExt = formData.image.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        
        // Vérification du type de fichier
        if (!['jpg', 'jpeg', 'png', 'webp'].includes(fileExt?.toLowerCase() || '')) {
          throw new Error('Format d\'image non supporté. Utilisez JPG, JPEG, PNG ou WEBP.');
        }

        // Vérifier l'authentification avant le téléchargement
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
          throw new Error('Vous devez être connecté pour télécharger des images');
        }

        console.log('Tentative de téléchargement vers Supabase Storage...');
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('slides')
          .upload(fileName, formData.image, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          console.error('Erreur lors du téléchargement de l\'image:', uploadError);
          throw new Error(`Erreur de téléchargement: ${uploadError.message}`);
        }
        console.log('Image téléchargée avec succès');
        // Stocker uniquement le chemin de l'image
        imageUrl = `slides/${fileName}`;
      }

      const slideData = {
        title: formData.title,
        description: formData.description,
        order_index: parseInt(formData.order_index),
        image_url: imageUrl || '',
      };

      console.log('Données du slide à enregistrer:', slideData);

      if (editingSlide) {
        console.log('Mise à jour du slide existant');
        const { data, error } = await supabase
          .from('slides')
          .update(slideData)
          .eq('id', editingSlide.id)
          .select();
        if (error) {
          console.error('Erreur lors de la mise à jour:', error);
          throw new Error(`Erreur de mise à jour: ${error.message}`);
        }
        console.log('Slide mis à jour avec succès:', data);
      } else {
        console.log('Création d\'un nouveau slide');
        const { data, error } = await supabase
          .from('slides')
          .insert(slideData)
          .select();
        if (error) {
          console.error('Erreur lors de la création:', error);
          throw new Error(`Erreur de création: ${error.message}`);
        }
        console.log('Slide créé avec succès:', data);
      }

      console.log('Rafraîchissement des slides...');
      await fetchSlides();
      console.log('Fermeture de la modale...');
      setIsModalOpen(false);
      resetForm();
      console.log('Formulaire réinitialisé');
    } catch (error) {
      console.error('Erreur détaillée:', error);
      const errorMessage = error instanceof Error ? error.message : 'Une erreur inconnue est survenue';
      alert(`Erreur: ${errorMessage}\n\nVeuillez vérifier la console pour plus de détails.`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce slide ?')) return;

    try {
      const { error } = await supabase
        .from('slides')
        .delete()
        .eq('id', id);
      if (error) throw error;
      await fetchSlides();
    } catch (error) {
      console.error('Error deleting slide:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      order_index: '',
      image: null,
    });
    setEditingSlide(null);
  };

  const openEditModal = (slide: Slide) => {
    setEditingSlide(slide);
    setFormData({
      title: slide.title,
      description: slide.description,
      order_index: slide.order_index.toString(),
      image: null,
    });
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-custom-grey">Gestion des Slides</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="bg-accent-red text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus size={20} />
          Ajouter un slide
        </motion.button>
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-red"></div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {slides.map((slide) => (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative h-48">
                {slide.image_url ? (
                  <img
                    src={getImageUrl(slide.image_url)}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.error('Erreur de chargement de l\'image:', e);
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <ImageIcon className="text-gray-400" size={40} />
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-custom-grey">
                    {slide.title}
                  </h3>
                  <span className="text-sm text-gray-500">Ordre: {slide.order_index}</span>
                </div>
                <p className="text-gray-600 mb-4">{slide.description}</p>
                <div className="flex justify-end gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => openEditModal(slide)}
                    className="text-accent-red hover:text-accent-red/80"
                  >
                    <Edit size={20} />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleDelete(slide.id)}
                    className="text-red-500 hover:text-red-400"
                  >
                    <Trash2 size={20} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg p-6 max-w-md w-full"
          >
            <h3 className="text-xl font-bold text-custom-grey mb-4">
              {editingSlide ? 'Modifier le slide' : 'Ajouter un slide'}
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Titre
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent-red focus:ring-accent-red"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent-red focus:ring-accent-red"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Ordre d'affichage
                </label>
                <input
                  type="number"
                  value={formData.order_index}
                  onChange={(e) =>
                    setFormData({ ...formData, order_index: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent-red focus:ring-accent-red"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      image: e.target.files?.[0] || null,
                    })
                  }
                  className="mt-1 block w-full"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-accent-red text-white rounded-lg hover:bg-accent-red/90 disabled:opacity-50"
                >
                  {isLoading ? 'Enregistrement...' : 'Enregistrer'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
} 