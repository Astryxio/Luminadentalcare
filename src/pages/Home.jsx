// Home.jsx
// This file represents the Home PAGE imports

import useReveal from "../hooks/useReveal";
import Banner from "../components/ui/Banner";
import QualityServices from "../features/home/QualityServices";
import TechnologyShowcase from "../features/home/TechnologyShowcase";
import ClinicalFacts from "../features/home/ClinicalFacts";

const Home = () => {
  useReveal();

  return (
    <>
      <Banner />
      <QualityServices />
       <TechnologyShowcase />
             <ClinicalFacts />

    </>
  );
};

export default Home;
