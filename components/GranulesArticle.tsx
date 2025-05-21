'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const GranulesArticle: React.FC = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        {/* Text Content */}
        <div className="space-y-6">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-accent-red font-bold text-sm animate-blink"
          >
            Nouveauté
          </motion.p>
          <h2 className="text-3xl md:text-4xl font-bold text-custom-grey">
            Le comptoir à granulés
          </h2>
          <p className="text-lg text-gray-600">
            Le comptoir à granulés pour poêles, 100 % bretons, a ouvert zone de Tréhuinec à Plescop. Julie, Grégory et Johann ont créé « Le comptoir à granulés », une entreprise familiale située à Plescop. Ils travaillent avec des producteurs locaux.
          </p>
          <p className="text-lg text-gray-600">
            Le Comptoir à Granulés propose des sacs de 10 kg en plus de 15 kg pour une manipulation facilitée, ainsi que des bûches compressées.
          </p>
          <p className="text-lg text-gray-600">
            Le Comptoir à Granulés proposer des sacs de 10 kg en plus de 15 kg pour une manipulation facilitée, ainsi que des bûches compressées.
          </p>
        </div>

        {/* Image */}
        <div className="relative h-96 w-full rounded-lg overflow-hidden">
          <Image
            src="/uploads/comptoir-granules.jpg" // Assuming the image is added here
            alt="Le comptoir à granulés team"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default GranulesArticle; 