import { FaQuoteLeft, FaImage, FaLink, FaTools } from "react-icons/fa";

export default function Features() {
  return (
    <section className="py-16" id="features">
      <div className="container mx-auto px-5">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">
              Unlock The World Of Anime With Our Comprehensive API!
            </h2>
            <p className="text-lg mb-8">
              Discover a treasure trove of anime content and enrich your
              projects with ease using our powerful API.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="flex flex-col items-start">
              <div className="bg-blue-600 p-4 rounded-full text-white mb-4">
                <FaQuoteLeft className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Anime Quotes & Facts
              </h3>
              <p>
                Explore a vast collection of anime quotes, trivia, and facts to
                captivate your audience and add depth to your applications.
              </p>
            </div>
            <div className="flex flex-col items-start">
              <div className="bg-blue-600 p-4 rounded-full text-white mb-4">
                <FaImage className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Anime GIFs & Images
              </h3>
              <p>
                Access a library of animated GIFs and high-quality images to
                visually enhance your anime-themed projects and applications.
              </p>
            </div>
            <div className="flex flex-col items-start">
              <div className="bg-blue-600 p-4 rounded-full text-white mb-4">
                <FaLink className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Comprehensive Anime Data
              </h3>
              <p>
                Utilize a rich dataset covering characters, episodes, series
                details, and more, empowering your applications with in-depth
                anime information.
              </p>
            </div>
            <div className="flex flex-col items-start">
              <div className="bg-blue-600 p-4 rounded-full text-white mb-4">
                <FaTools className="text-2xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Developer-Friendly API
              </h3>
              <p>
                Designed with simplicity in mind, our API offers intuitive
                endpoints and comprehensive documentation, making integration
                seamless for developers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
