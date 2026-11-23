import SEO from "../components/common/SEO"
import AboutSection from "../components/home/AboutSection"
import HeroSection from "../components/home/HeroSection"
import ModelSection from "../components/home/ModelSection"
import PricingSection from "../components/home/PricingSection"
import VideoGallerySection from "../components/home/VideoGallerySection"
import UGCPlanningSection from '../components/home/UGCPlanningSection'



const Home = () => {
  return (
    <main>
        <SEO />
        <HeroSection/>
        <AboutSection/>
        <ModelSection/>
        <VideoGallerySection/>
        <PricingSection/>
        <UGCPlanningSection/>
        
    </main>
  )
}

export default Home