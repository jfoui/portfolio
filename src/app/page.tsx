import Nav from "@/components/Nav";
import MobileNavBar from "@/components/MobileNavBar";
import Reveal from "@/components/Reveal";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <MobileNavBar />
      <main className="pb-14 md:pb-0">
        <Hero />
        <About />
        <Reveal>
          <Skills />
        </Reveal>
        <Reveal>
          <Projects />
        </Reveal>
        <Reveal>
          <Education />
        </Reveal>
        <Reveal>
          <Contact />
        </Reveal>
      </main>
    </>
  );
}
