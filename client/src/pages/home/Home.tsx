import WhatWeDo from "./action";
import Destinations from "./destinations";
import Hero from "./Hero";
import HowItWorks from "./Howitworks";
import JetCollection from "./listing";
import LuxuryLifestyle from "./luxurylife";
import Newsletter from "./newsletter";
import VendorsPartners from "./partners";
import BlogSection from "./Posts";
import SponsoredCharterListings from "./SponsoredCharterListings";
import WhyFlyWithUs from "./whyfly";

function Home() {
  return (
    <div>
      <Hero />
      <JetCollection />
      <HowItWorks />
      <BlogSection />
      <SponsoredCharterListings />
      <LuxuryLifestyle />
      <WhatWeDo />
      <WhyFlyWithUs />
      <Destinations />
      <VendorsPartners />
      <Newsletter />
    </div>
  );
}

export default Home;
