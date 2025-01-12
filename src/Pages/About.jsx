import Layout from "../Layout/Layout";
import aboutMainImages from "../Assets/Images/aboutMainImage.png";
import { celebrities } from "../constents/CelebrityData";
import CarousalSlide from "../Components/CrousalSlide";

function About() {
  return (
    <Layout>
      <div className="pt-20 px-5 lg:px-10 flex flex-col text-black">
        <div className="flex flex-col md:flex-row md:pl-5 items-center gap-10 mx-auto">
          {/* Text Section */}
          <section className="w-full md:w-1/2 space-y-6 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl text-blue-600 font-semibold">
              Affordable and Quality Education
            </h1>
            <p className="text-lg md:text-2xl text-black">
            At <span className="text-blue-600 text-xl font-bold">CodeCraft</span>, we believe in making quality coding education accessible to everyone. Our platform offers the best coding courses, designed to cater to learners at every stage of their programming journey. Whether you're a beginner looking to start your coding adventure or an experienced developer aiming to enhance your skills, CodeCraft has something for you. We pride ourselves on delivering affordable courses without compromising on quality. With expert instructors, interactive content, and a hands-on approach, CodeCraft is your go-to resource for mastering coding at your own pace. Start learning today and unlock the world of possibilities with CodeCraft!


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
    </Layout>
  );
}
export default About;
