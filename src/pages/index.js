import HomeHead from "@/components/pages/home/Head";
import Navbar from "../components/navbar/Main";
import Header from "@/components/pages/home/Header";
import Features from "@/components/pages/home/Features";
import Footer from "../components/footer/Main";

export default function Home() {
  return (
    <>
      {/* Head */}
      <HomeHead />
      <div className="flex flex-col min-h-screen ">
        <main className="flex-shrink-0">
          {/* Navigation */}
          <Navbar />

          {/* Header */}
          <Header />

          {/* Enhanced Features Section */}
          <Features />
        </main>
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
