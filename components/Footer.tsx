'use client';

import React from 'react';
import { Facebook, Instagram, Twitter, Mail, Phone, LucideProps } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: Facebook, href: '#' },
    { icon: Instagram, href: '#' },
    { icon: Twitter, href: '#' },
  ];

  const iconProps: LucideProps = {
    size: 20,
    className: 'text-white hover:text-accent-yellow transition-colors'
  };

  const contactIconProps: LucideProps = {
    size: 20,
    className: 'text-white'
  };

  return (
    <footer className="bg-custom-grey text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Logo />
            <p className="text-gray-300">
              Service de ramonage professionnel pour votre sécurité et confort.
            </p>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone {...contactIconProps} />
                <span>01 23 45 67 89</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail {...contactIconProps} />
                <span>contact@ramonage.fr</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Suivez-nous</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                >
                  <social.icon {...iconProps} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; 2025 braises installations. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 