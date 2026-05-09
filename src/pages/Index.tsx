import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ParticleCursor from "@/components/ParticleCursor";
import ShootingStars from "@/components/ShootingStars";

const Index = () => {
  return (
    <main className="relative overflow-hidden cursor-none">
      <ShootingStars />
      <ParticleCursor />

      <div className="relative z-10">
        <Navigation />
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </div>
    </main>
  );
};

export default Index;
