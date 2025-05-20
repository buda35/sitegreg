'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string | null;
  tags: string[];
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    tags: '',
    image: null as File | null,
  });

  useEffect(() => {
    // fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      // const { data, error } = await supabase
      //   .from('services')
      //   .select('*')
      //   .order('created_at', { ascending: false });

      // if (error) throw error;
      setServices([]);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl = editingService?.image_url || null;

      if (formData.image) {
        // const fileExt = formData.image.name.split('.').pop();
        // const fileName = `${Math.random()}.${fileExt}`;
        // const { data: uploadData, error: uploadError } = await supabase.storage
        //   .from('services')
        //   .upload(fileName, formData.image);

        // if (uploadError) throw uploadError;
        // imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/services/${fileName}`;
        console.log('Image upload is not implemented without Supabase');
      }

      const serviceData = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        image_url: imageUrl,
        tags: formData.tags.split(',').map(tag => tag.trim()),
      };

      if (editingService) {
        // const { error } = await supabase
        //   .from('services')
        //   .update(serviceData)
        //   .eq('id', editingService.id);
        // if (error) throw error;
        resetForm();
      } else {
        // const { error } = await supabase
        //   .from('services')
        //   .insert(serviceData);
        // if (error) throw error;
        resetForm();
      }

      await fetchServices();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving service:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) return;

    try {
      // const { error } = await supabase
      //   .from('services')
      //   .delete()
      //   .eq('id', id);
      console.error('Error deleting service:', /* error */);
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      price: '',
      tags: '',
      image: null,
    });
    setEditingService(null);
  };

  const openEditModal = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      price: service.price.toString(),
      tags: service.tags.join(', '),
      image: null,
    });
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-custom-grey">Gestion des Services</h2>
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
          Ajouter un service
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
          {services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative h-48">
                {service.image_url ? (
                  <img
                    src={service.image_url}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <ImageIcon className="text-gray-400" size={40} />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-custom-grey mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-accent-red">
                    {service.price}€
                  </span>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => openEditModal(service)}
                      className="text-accent-red hover:text-accent-red/80"
                    >
                      <Edit size={20} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(service.id)}
                      className="text-red-500 hover:text-red-400"
                    >
                      <Trash2 size={20} />
                    </motion.button>
                  </div>
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
              {editingService ? 'Modifier le service' : 'Ajouter un service'}
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
                  Prix (€)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent-red focus:ring-accent-red"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tags (séparés par des virgules)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent-red focus:ring-accent-red"
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