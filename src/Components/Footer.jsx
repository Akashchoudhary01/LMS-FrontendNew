import React from "react";
import { BsFacebook, BsInstagram, BsLinkedin, BsGithub } from "react-icons/bs";

const Footer = () => {
  const newDate = new Date();
  const year = newDate.getFullYear();

  return( 
         <>
         <footer className='relative left-0 bottom-0 w-full h-[10vh] md:h-[10vh] md:mb-0 sm:h-[10vh] lg:h-[10vh] py-2 flex flex-col sm:flex-row items-center justify-between text-gray-100 bg-gradient-to-l from-blue-950 to-blue-400 px-4 sm:px-10 md:px-20'>
         <section className='text-lg text-gray-100'>
             Copyright {year} | All right Reserved
         </section>
 
         <section className='flex item-center justify-center gap-7 text-2xl text-white'>
             <a href=' https://www.facebook.com/profile.php?id=100027197927103' target='_blank' className='hover:text-black transition-all ease-in-out duration-300'> 
                 <BsFacebook />
             </a>
             <a href='https://www.linkedin.com/in/akashChoudhary007/ ' target='_blank' className='hover:text-black transition-all ease-in-out duration-300'> 
                 <BsLinkedin/>
             </a>
             <a href='https://github.com/Akashchoudhary01' target='_blank' onDurationChange={300} className='hover:text-black transition-all ease-in-out duration-300'> 
                 <BsGithub/>
             </a>
             <a href='https://www.instagram.com/_akashchoudhary1/' target='_blank' className='hover:text-black transition-all ease-in-out duration-300'> 
                 <BsInstagram/>
             </a>
         </section>
    
         </footer>
 
         </>
     )
 
};

export default Footer;
