import Hero from "@/components/Hero";
import MainContent from "@/components/MainContent";
import KitsComponent from "@/components/kits/KitsComponent";
import HowItWorks from "@/components/HowItWorks";
import DeliveryRegions from "@/components/DeliveryRegions";
import Cta from "@/components/Cta";

export default function Home() {

  return (
    <div className="flex flex-col w-full overflow-x-hidden">

      <div className="relative w-full mt-10 md:mt-20">
        <Hero />
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-center 
    bg-white gap-10 lg:gap-20 px-6 py-12 lg:py-20">
        <MainContent />
      </div>

      <KitsComponent />
      <HowItWorks />
      <DeliveryRegions />
      <Cta />

    </div>
  );
}
