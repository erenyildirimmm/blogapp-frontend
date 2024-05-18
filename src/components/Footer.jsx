import React from 'react'
import { BsGithub, BsLinkedin } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className="w-full px-4 py-2 z-50 bg-primary/80 text-gray-50 flex items-center justify-between">
      <h2 className="text-xl font-semibold">BookHub</h2>
      <div className="socials flex items-center gap-4">
        <BsGithub size={25} />
        <BsLinkedin size={25} />
      </div>
    </footer>
  );
}

export default Footer