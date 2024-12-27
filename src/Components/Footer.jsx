import {BsFacebook , BsGithub, BsInstagram , BsLinkedin , BsTwitterX} from 'react-icons/bs';

const currentDate = new Date();
const year = currentDate.getFullYear();

 
function Footer(){
    return( 
        <>
        <footer className='relative left-0 bottom-0 h-[12vh] py-2 flex flex-col sm:flex-row items-center justify-between text-gray-100 bg-gradient-to-r from-blue-900 to-blue-600 sm:px-20 '>
        <section className='text-lg'>
            Copyright {year} | All right Reserved
        </section>

        <section className='flex item-center justify-center gap-7 text-2xl text-white'>
            <a className='hover:text-black transition-all ease-in-out duration-300'> 
                <BsFacebook/>
            </a>
            <a className='hover:text-black transition-all ease-in-out duration-300'> 
                <BsLinkedin/>
            </a>
            <a className='hover:text-black transition-all ease-in-out duration-300'> 
                <BsGithub/>
            </a>
            <a className='hover:text-black transition-all ease-in-out duration-300'> 
                <BsInstagram/>
            </a>
        </section>
   
        </footer>

        </>
    )

}

export default Footer;