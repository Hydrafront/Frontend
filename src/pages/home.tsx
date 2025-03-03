import Solutions from "@/components/home/solutions";
import Intro from "@/components/home/intro";
import Footer from "@/components/home/footer";
import Product from "@/components/home/product";
import OurToken from "@/components/home/our-token";
import Team from "@/components/home/team";
import Roadmap from "@/components/home/roadmap";
import Faq from "@/components/home/faq";
import Join from "@/components/home/join";

const Home = () => {
  
  return (
    <div className="relative">

      {/* background image */}
      <div className="fixed w-full h-[100vh] flex items-center justify-center -z-10">
        <img src="/assets/images/bg-img.png" className="w-2/5" alt="bg-img" />
      </div>
      {/* background image end */}

      {/* dividers */}
      <div className="w-[1px] h-full absolute top-0 left-[calc(4.3vw-1px)] lg:left-[calc(17vw-1px)] bg-borderColor" />
      <div className="w-[1px] h-full absolute top-0 left-1/2 bg-borderColor" />
      <div className="w-[1px] h-full absolute top-0 right-[calc(4.3vw-1px)] lg:right-[calc(17vw-1px)] bg-borderColor" />

      <Intro />

      <Product />

      <Solutions />

      <OurToken />

      <Roadmap />

      <Team />

      <Faq />

      <Join />

      <Footer />

    </div>
  )
}

export default Home
