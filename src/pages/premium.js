import PageWrapper from "@/components/pages/global/PageWrapper";
import PremiumNavbar from "@/components/navbar/Premium";
import Header from "@/components/pages/premium/Header";
import Features from "@/components/pages/premium/Features";
import Plans from "@/components/pages/premium/Plans";
import Footer from "@/components/footer/Main";
import PremiumHead from "@/components/pages/premium/Head";

export default function Premium() {
  return (
    <PageWrapper pageName="premium">
      <div className="flex flex-col min-h-screen bg-gray-900 text-white">
        <PremiumHead />
        <PremiumNavbar />
        <Header />
        <Features />
        <Plans />
        <Footer />
      </div>
    </PageWrapper>
  );
}
