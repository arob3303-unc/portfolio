"use client";
import Modal from './Components/Modal'
import Contact from './Components/Contact'
import Image from "next/image";

const Home = () => {
  return (
    <div>
      {/* Header */}
      <header className="nav">
        <nav>
          <ul className="nav-list">
            <li><a href="#about" className="hover">About Me</a></li>
            <li><a href="#projects" className="hover">Projects</a></li>
            <li><a href="#contact-sec" className="hover">Contact Me</a></li>
          </ul>
        </nav>
      </header>

      {/* About Me Section */}
      <section id="about" className="flex flex-col justify-center items-center py-20">
        <div className="about-content">
          <div className="about-text-section">
            <h1 className='about-text'>Hi! It is me, Austin!</h1>
            <h2 className='about-text'>I’m a passionate student exploring the intersection of economics and computer science, driven by a deep curiosity to understand how the world works. My interests lie in leveraging technology to solve meaningful problems, whether it’s unraveling complex systems or creating innovative solutions. I enjoy diving into challenges, learning new concepts, and applying them to make a positive impact.</h2>
          </div>
          <div className="about-image">
            <Image src="/me.jpeg" alt="AI" height={300} width={300}/>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects">
        <h1 className="project-title">My Projects</h1>
        <Modal />
      </section>

      {/* Contact Me Section */}
      <section id="contact-sec">
        <Contact />
      </section>
    </div>
  );
};

export default Home;
