'use client';

import React from 'react';
import { Star, LucideProps } from 'lucide-react';
import { motion } from 'framer-motion';

const reviews = [
  {
    id: 1,
    name: 'Jean Dupont',
    rating: 5,
    comment: 'Service professionnel et rapide. Je recommande vivement !',
  },
  {
    id: 2,
    name: 'Marie Martin',
    rating: 5,
    comment: 'Très satisfaite de l\'intervention. Prix raisonnable et travail soigné.',
  },
  {
    id: 4,
    name: 'Antony Audic',
    rating: 5,
    comment: 'Très content de mon poêle installé à Rennes',
  },
];

const ReviewSection: React.FC = () => {
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
    <section className="py-16 px-4 bg-light-white">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center text-custom-grey mb-12"
        >
          Témoignages Clients
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {reviews.map((review) => (
            <motion.div
              key={review.id}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-accent-yellow"
            >
              <div className="flex mb-4">
                {[...Array(5)].map((_, index) => {
                  const starProps: LucideProps = {
                    size: 20,
                    className: index < review.rating
                      ? 'text-accent-yellow fill-accent-yellow'
                      : 'text-gray-300'
                  };
                  return (
                    <motion.div
                      key={index}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Star {...starProps} />
                    </motion.div>
                  );
                })}
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-gray-600 mb-4"
              >
                {review.comment}
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="font-semibold text-custom-grey"
              >
                {review.name}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewSection; 