import HomeLayout from "../Layouts/HomeLayout";
import aboutMainImages from "../assets/images/aboutMainImage.png";
import { celebrities } from "../Constents/CelebritiesData";
import CarousalSlide from "../Components/CarousalSlide";

function AboutUs() {
  return (
    <HomeLayout>
      <div className="pt-20 px-5 lg:px-10 flex flex-col text-white">
        <div className="flex flex-col md:flex-row md:pl-5 items-center gap-10 mx-auto">
          {/* Text Section */}
          <section className="w-full md:w-1/2 space-y-6 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl text-blue-600 font-semibold">
              Affordable and Quality Education
            </h1>
            <p className="text-lg md:text-2xl text-gray-200">
              Our goal is to provide affordable and quality education to the
              world. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Delectus totam placeat reprehenderit. Repellat velit excepturi
              illo nemo ad aperiam et commodi blanditiis, iure maiores beatae
              inventore! Architecto iusto tenetur labore?
            </p>
          </section>

          {/* Image Section */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              style={{
                filter: "drop-shadow(0px 10px 10px rgba(0,0,0,0.5))",
              }}
              className="drop-shadow-2xl max-w-full h-auto"
              src={aboutMainImages}
              alt="About main visual"
            />
          </div>
        </div>

        {/*  */}
        {/* Carousel */}
        <div className="carousel w-full sm:w-3/4 md:w-2/3 lg:w-1/2 my-10 sm:my-16 md:my-20 m-auto text-center">
          {celebrities &&
            celebrities.map((celebrity) => (
              <CarousalSlide
                {...celebrity}
                key={celebrity.slideNumber}
                totalSlides={celebrities.length}
              />
            ))}
        </div>
      </div>
    </HomeLayout>
  );
}
export default AboutUs;
