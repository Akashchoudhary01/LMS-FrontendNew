import HomeLayout from "../Layouts/HomeLayout";
import aboutMainImages from "../assets/images/aboutMainImage.png";
import { celebrities } from "../Constents/CelebritiesData";
import CarousalSlide from '../Components/CarousalSlide'

function AboutUs() {
   
  return (
    <HomeLayout>
      <div className="pl-20 pt-20 flex flex-col text-white">
        {/* hhh */}
        <div className="flex flex-col md:flex-row items-center gap-5 mx-5 md:mx-10">
          <section className="w-full md:w-1/2 space-y-10">
            <h1 className="text-2xl md:text-5xl text-blue-600 font-semibold">
              Affordable and quality education
            </h1>
            <p className="text-xl md:text-3xl text-gray-200">
              Our goal is to provide the affordable and quaity education to the
              world . Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Delectus totam placeat reprehenderit. Repellat velit excepturi
              illo nemo ad aperiam et commodiblanditiis, iure maiores beatae
              inventore! Architecto iusto tenetur labore?
            </p>
          </section>
          <div className="w-full md:w-1/2">
            <img
              id="testOne"
              style={{
                filter: "drop-shadow(0px 10px 10px rgb(0,0,0))",
              }}
              className="drop-shadow-2xl"
              src={aboutMainImages}
              alt="about main image"
            />
          </div>
        </div>
        {/*  */}
         {/* Carousel */}
        <div className="carousel  w-1/2 my-16 m-auto  ">
          {celebrities && celebrities.map(celebrity => (<CarousalSlide
            {...celebrity}
            key={celebrity.slideNumber}
            totalSlides={celebrities.length}
         /> ))}
           


        </div>
        </div>
    
    </HomeLayout>
  );
}
export default AboutUs;
