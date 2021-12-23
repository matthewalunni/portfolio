import Hero from "./components/hero";
import Tech from './components/tech';
import About from './components/about';
import Projects from './components/projects';
import Contact from './components/contact';

export default function Home() {
  return (
    <>
      <Hero />
      <Tech/>
      <About/>
      <Projects/>
      <Contact/>
    </>
  )
}
