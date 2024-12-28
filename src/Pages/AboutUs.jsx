import HomeLayout from "../Layouts/HomeLayout";
import aboutMainImages from "../assets/images/aboutMainImage.png";
import apj from "../assets/images/apj.png";
import billGates from "../assets/images/billGates.png";
import einsteine from "../assets/images/einstein.png";
import nelsonMandela from "../assets/images/nelsonMandela.png";
import steveJobs from "../assets/images/stevejobs.png";

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
        <div className="flex">
             {/* Slide 1 */}
          <div id="slide1" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
              <img
                src={apj}  className="w-40 rounded-full border-2 border-gray-400"
              />
              <p className="text-xl text-gray-200">
              "Education is the most powerful weapon which you can use to change the world."
              </p>
              <h3 className="text-2xl font-semibold"> Dr. Apj Abdul Kalam</h3>
              <div className="absolute  left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide5" className="btn btn-circle">
                  {" "}
                  ❮
                </a>
                <a href="#slide2" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
          {/* Slide 2 */}
          <div id="slide2" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
              <img
                src={billGates}
                className="w-40 rounded-full border-2 border-gray-400"
              />
              <p className="text-xl text-gray-200">
              "Coding opens doors to innovation."
              </p>
              <h3 className="text-2xl font-semibold"> Bill Gates</h3>
              <div className="absolute  left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide1" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide3" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
          {/* Slide 3 */}
          <div id="slide3" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
              <img
                src={einsteine}
                className="w-40 rounded-full border-2 border-gray-400"
              />
              <p className="text-xl text-gray-200">
              "Education is not the learning of facts, but the training of the mind to think."
              </p>
              <h3 className="text-2xl font-semibold"> Einsteine</h3>
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide2" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide4" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
          {/* Slide 4 */}
          <div id="slide4" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
              <img
                src={nelsonMandela}
                className="w-40 rounded-full border-2 border-gray-400"
              />
              <p className="text-xl text-gray-200">
              "Education is the most powerful weapon which you can use to change the world."
              </p>
              <h3 className="text-2xl font-semibold"> Nelson Mandela</h3>
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide3" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide5" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>
          {/* Slide 5 */}
          {/* Slide 5 */}
          <div id="slide5" className="carousel-item relative w-full">
            <div className="flex flex-col items-center justify-center gap-4 px-[15%]">
              <img
                src={steveJobs}
                className="w-40 rounded-full border-2 border-gray-400"
              />
              <p className="text-xl text-gray-200">
              "Everyone should learn how to code—it teaches you how to think."  </p>
              <h3 className="text-2xl font-semibold"> Steve Jobs</h3>
              <div className="absolute  left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href="#slide4" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide1" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          </div>


        </div>
         
          {/*  */}
        </div>
      </div>
    </HomeLayout>
  );
}
export default AboutUs;
