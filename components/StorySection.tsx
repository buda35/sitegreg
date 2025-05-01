import React from 'react';
import Image from 'next/image';

const StorySection: React.FC = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden group">
          <Image
            src="/uploads/story.jpg"
            alt="Histoire du service de ramonage"
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-custom-grey">
            Notre Histoire
          </h2>
          <p className="text-lg text-gray-600">
            Fondée par Grégory Le Bagousse, notre entreprise familiale est spécialisée dans la pose de cheminées et l'installation de solutions de chauffage sur tout le département du Morbihan. Passionné par son métier, Grégory a su s'entourer d'une équipe de confiance pour répondre à toutes vos attentes.
          </p>
          <p className="text-lg text-gray-600">
            Aujourd'hui, nous sommes trois poseurs expérimentés à votre service : Seb, Jean-Claude et Grégory. Ensemble, nous mettons notre savoir-faire et notre exigence au service de vos projets, en assurant des installations soignées, durables et conformes aux normes.
          </p>
          <p className="text-lg text-gray-600">
            Basés à Brandivy, nous intervenons rapidement sur tout le Morbihan pour vous accompagner dans la création d'un foyer chaleureux et sécurisé.
          </p>
          <button className="bg-accent-yellow text-custom-grey px-8 py-3 rounded-lg hover:bg-accent-yellow/90 transition-colors shadow-lg">
            En savoir plus
          </button>
        </div>
      </div>
    </section>
  );
};

export default StorySection; 