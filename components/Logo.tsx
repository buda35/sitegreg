import React from 'react';
import Image from 'next/image';

const Logo: React.FC = () => {
  return (
    <div className="flex flex-col items-center bg-[#F4D03F] rounded-lg p-3 hover:scale-105 transition-transform duration-300 shadow-md">
      {/* Logo Brandmark */}
      <Image
        src="/uploads/logo_braises.png"
        alt="Logo Braises Installations"
        width={150}
        height={150}
        // className="mb-1"
        style={{ objectFit: 'contain' }}
      />
      {/* <span className="text-xl font-lilita uppercase tracking-wider text-custom-grey leading-tight">
        braises installations
      </span> */}
    </div>
  );
};

export default Logo; 