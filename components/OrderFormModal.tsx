'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OrderFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OrderFormModal: React.FC<OrderFormModalProps> = ({ isOpen, onClose }) => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    request: '',
    email: '',
  });
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setError('');
    try {
      // EmailJS integration (client-side)
      const res = await fetch('/api/send-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Erreur lors de l\'envoi du message');
      setSent(true);
    } catch (err) {
      setError('Erreur lors de l\'envoi du message.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-lg p-8 max-w-md w-full shadow-lg relative"
          >
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
              aria-label="Fermer"
            >
              ×
            </button>
            <h3 className="text-2xl font-bold mb-4 text-custom-grey">Demande de commande</h3>
            {sent ? (
              <div className="text-green-600 font-semibold text-center py-8">
                Merci, votre demande a bien été envoyée !
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nom</label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent-red focus:ring-accent-red"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Prénom</label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent-red focus:ring-accent-red"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nature de la demande</label>
                  <textarea
                    name="request"
                    value={form.request}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent-red focus:ring-accent-red"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-accent-red focus:ring-accent-red"
                  />
                </div>
                {error && <div className="text-red-500 text-sm">{error}</div>}
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-2 px-4 bg-accent-red text-white rounded-lg hover:bg-accent-red/90 disabled:opacity-50"
                >
                  {isSending ? 'Envoi en cours...' : 'Envoyer'}
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OrderFormModal; 