import VendorBenefits from "./benefits";
import FinalCTA from "./cta";
import VendorEligibility from "./eligable";
import VendorProcess from "./process";
import VendorApplication from "./requestForm";
import TrustSignals from "./trust";
import VendorHero from "./VendorHero";

function VendorHome() {
  return (
    <div className="mt-24">
      <VendorHero />
      <VendorBenefits />
      <VendorEligibility />
      <VendorProcess />
      <VendorApplication />
      <TrustSignals />
      <FinalCTA />
    </div>
  );
}

export default VendorHome;
