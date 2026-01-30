import ComingSoon from "@/components/carousels/ComingSoonCarousel";
import Hero from "@/components/Hero";
import MainContent from "@/components/MainContent";

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


      <div className="flex flex-col items-start justify-center lg:px-[20%] mt-10 py-10"
        style={{ backgroundImage: 'url(https://res.cloudinary.com/dytw21kw2/image/upload/v1765647023/main_lr3jsg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <ComingSoon />
      </div>

    </div>
  );
}
