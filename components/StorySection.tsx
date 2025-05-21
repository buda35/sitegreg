'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import CompanyInfoModal from './CompanyInfoModal';

const StorySection: React.FC = () => {
  const [isCompanyInfoOpen, setIsCompanyInfoOpen] = React.useState(false);

  const realizationImages = [
    '/uploads/20250424_150717.jpg',
    '/uploads/IMG_20191105_110521.jpg',
    '/uploads/IMG_20191120_164246.jpg',
    '/uploads/IMG_20200907_152324.jpg',
    '/uploads/IMG_20200303_131256.jpg',
    '/uploads/hero3 - Copie.jpg',
    '/uploads/IMG_20191118_170948.jpg',
    '/uploads/IMG_20191119_173848.jpg',
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Text Content Column - Notre Histoire */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-custom-grey">
            Notre Histoire
          </h2>
          <p className="text-lg text-gray-600">
            Fondée par Grégory Le Bagousse et Sebastien Leissen, notre entreprise familiale est spécialisée dans la pose de cheminées et l'installation de solutions de chauffage sur tout le département du Morbihan. Passionné par son métier, Grégory a su s'entourer d'une équipe de confiance pour répondre à toutes vos attentes.
          </p>
          <p className="text-lg text-gray-600">
            Aujourd'hui, nous sommes trois poseurs expérimentés à votre service : Sebastien , Jean-Claude et Grégory. Ensemble, nous mettons notre savoir-faire et notre exigence au service de vos projets, en assurant des installations soignées, durables et conformes aux normes.
          </p>
          <p className="text-lg text-gray-600">
            Basés à Brandivy, nous intervenons rapidement sur tout le Morbihan pour vous accompagner dans la création d'un foyer chaleureux et sécurisé.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCompanyInfoOpen(true)}
            className="bg-accent-yellow text-custom-grey px-4 py-2 rounded-lg hover:bg-accent-yellow/90 transition-colors flex items-center gap-2"
          >
            <Info size={20} />
            Informations entreprise
          </motion.button>
        </div>
        
        <div>
          <p className="text-sm text-gray-600 text-center mb-4">réalisations 2025</p>
          <div className="grid grid-cols-2 gap-4 rounded-lg overflow-hidden">
            {realizationImages.map((imageSrc, index) => (
              <div key={index} className="relative h-48 w-full">
                <Image
                  src={imageSrc}
                  alt={`Realization ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <CompanyInfoModal isOpen={isCompanyInfoOpen} onClose={() => setIsCompanyInfoOpen(false)} />
    </section>
  );
};

export default StorySection; 