'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X, ExternalLink } from 'lucide-react';

interface CompanyInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CompanyInfoModal: React.FC<CompanyInfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-custom-grey">Braises Installations</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-custom-grey">Informations légales</h3>
            <p>SARL Braises Installations</p>
            <p>SIRET : 795 212 828 00011</p>
            <p>Date de création : 23 septembre 2013</p>
          </div>

          <div>
            <h3 className="font-semibold text-custom-grey">Contact</h3>
            <p>Vialgoët, 56390 Brandivy</p>
            <p>Téléphone : 02 97 57 51 23</p>
            <p>Email : braisesinstallations@live.fr</p>
          </div>

          <div>
            <h3 className="font-semibold text-custom-grey">Activité</h3>
            <p>Spécialisée dans l'installation de poêles, inserts, cheminées, chaudières et conduits isolés.</p>
          </div>

          <div>
            <h3 className="font-semibold text-custom-grey">Certifications</h3>
            <p>RGE Qualibois module Air, garantissant des installations respectueuses de l'environnement</p>
            <a
              href="http://www.qualit-enr.org/sarl-braises-installations"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent-red hover:text-accent-red/80 transition-colors mt-2"
            >
              Voir la certification
              <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CompanyInfoModal; 