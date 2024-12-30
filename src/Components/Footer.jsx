import {BsFacebook , BsGithub, BsInstagram , BsLinkedin , BsTwitterX} from 'react-icons/bs';


const currentDate = new Date();
const year = currentDate.getFullYear();

 
function Footer(){
    return( 
        <>
        <footer className='relative left-0 bottom-0 w-full h-[10vh] md:h-[10vh] md:mb-0 sm:h-[10vh] lg:h-[10vh] py-2 flex flex-col sm:flex-row items-center justify-between text-gray-100 bg-gradient-to-r from-blue-900 to-blue-600 px-4 sm:px-10 mt-5  md:px-20'>
        <section className='text-lg'>
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

}

export default Footer;