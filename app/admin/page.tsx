'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Utensils,
  Image,
  Star,
  Settings,
  LogOut,
} from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('dashboard');

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Tableau de bord',
      icon: LayoutDashboard,
      path: '/admin',
    },
    {
      id: 'services',
      label: 'Services',
      icon: Utensils,
      path: '/admin/services',
    },
    {
      id: 'slides',
      label: 'Slides',
      icon: Image,
      path: '/admin/slides',
    },
    {
      id: 'reviews',
      label: 'Avis',
      icon: Star,
      path: '/admin/reviews',
    },
    {
      id: 'settings',
      label: 'Paramètres',
      icon: Settings,
      path: '/admin/settings',
    },
  ];

  const handleLogout = async () => {
    // TODO: Implement logout logic
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          className="w-64 bg-white shadow-lg"
        >
          <div className="p-6">
            <h1 className="text-2xl font-bold text-custom-grey">Admin Panel</h1>
          </div>
          <nav className="mt-6">
            {menuItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setActiveTab(item.id);
                  router.push(item.path);
                }}
                className={`flex items-center w-full px-6 py-3 text-left ${
                  activeTab === item.id
                    ? 'bg-accent-red text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </motion.button>
            ))}
          </nav>
          <div className="absolute bottom-0 w-64 p-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              className="flex items-center w-full px-6 py-3 text-left text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Déconnexion
            </motion.button>
          </div>
        </motion.div>

        {/* Main content */}
        <div className="flex-1 p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-custom-grey mb-6">
              Bienvenue dans l'interface d'administration
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.slice(1).map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setActiveTab(item.id);
                    router.push(item.path);
                  }}
                  className="bg-gray-50 rounded-lg p-6 cursor-pointer hover:bg-gray-100"
                >
                  <div className="flex items-center justify-center w-12 h-12 bg-accent-red/10 rounded-lg mb-4">
                    <item.icon className="w-6 h-6 text-accent-red" />
                  </div>
                  <h3 className="text-lg font-semibold text-custom-grey mb-2">
                    {item.label}
                  </h3>
                  <p className="text-gray-600">
                    Gérer les {item.label.toLowerCase()} de votre site
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 