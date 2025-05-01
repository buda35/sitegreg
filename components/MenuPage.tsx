'use client';

import React from 'react';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import { LucideProps } from 'lucide-react';
import { motion } from 'framer-motion';
import OrderFormModal from './OrderFormModal';

const services = [
  {
    id: 1,
    title: 'Ramonage',
    description: 'Nettoyage complet de votre cheminée',
    price: 89,
    image: '/uploads/service1.jpg',
    tags: ['Standard', '1h-2h'],
  },
  {
    id: 2,
    title: 'Pose poêle',
    description: 'Utilisation de poêle de qualité selon notre catalogue, selon vos souhaits et mise en place personnalisable',
    price: 129,
    image: '/uploads/service2.jpg',
    tags: ['Poêle', 'Personnalisé'],
  },
  {
    id: 3,
    title: 'Pose de cheminée',
    description: 'Pose de cheminée à personnaliser, merci de nous contacter pour la réalisation du devis',
    price: 149,
    image: '/uploads/service3.jpg',
    tags: ['Cheminée', 'Sur devis'],
  },
];

const MenuPage: React.FC = () => {
  const cartIconProps: LucideProps = {
    size: 20,
    className: 'text-white'
  };

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center text-custom-grey mb-12"
        >
          Nos Services
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48 group">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  {service.tags.map((tag) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                      className="bg-accent-yellow text-custom-grey px-2 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-custom-grey mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex items-center justify-between">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-accent-red text-white px-4 py-2 rounded-lg hover:bg-accent-red/90 transition-colors flex items-center gap-2"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <ShoppingCart {...cartIconProps} />
                    Commander
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <OrderFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default MenuPage; 