import React, { useState, useEffect } from 'react';
import Logo from '../assets/Logo.png';
import { Link, NavLink } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai'


const Navbar = () => {
  // console.log(isNavOpen)
  const navLinks = [
    { id: 1, name: 'Home', path: '#home' },
    { id: 2, name: 'Skills', path: '#skills' },
    { id: 3, name: 'Projects', path: '#projects' },
    { id: 4, name: 'About', path: '#about' },
    { id: 5, name: 'Contact', path: '#contact' }
  ];

  const [activeLink, setActiveLink] = useState('');

  const scrollActive = () => {
    const scrollY = window.scrollY;
    navLinks.forEach((current) => {
      const section = document.querySelector(current.path);
      if (section) {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 50;

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActiveLink(current.path);
        }
      }
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollActive);
    return () => {
      window.removeEventListener('scroll', scrollActive);
    };
  }, []);

  return (
    <>
      <div id='navbar' className='shadow-md bg-white p-2 px-3 sticky top-0 z-50'>
        <div className='mx-auto flex max-w-[1280px] px-20 items-center justify-between'>
          <Link to={'https://www.linkedin.com/in/krishna-vamshi-kusuma-11717b213/'} target='_blank'><img src={Logo} className='h-16' alt='Logo' /></Link>
          <div className='flex gap-2'>
            <Link target='_blank' to={'https://krishnavamshi-portfolio.netlify.app/'}>
                <div className='border p-3 px-5 rounded-xl shadow-xl bg-[#0442ED] text-white font-medium hover:bg-black text-lg'>
                    My Portfolio
                </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar