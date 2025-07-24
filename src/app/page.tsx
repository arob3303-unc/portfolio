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
            <li><a href="/austin_resume.pdf" download={"austin_resume.pdf"}
            className='resume'
            >Download Resume</a></li>
          </ul>
        </nav>
      </header>

      {/* About Me Section */}
      <section id="about" className="flex flex-col justify-center items-center py-20">
        <div className="about-content">
          <div className="about-text-section">
            <h1 className='about-text'>Hi! It is me, Austin!</h1>
            <h2 className='about-text'>I’m a passionate student studying Economics and Computer Science at the University of North Carolina at Chapel Hill. 
              I have a deep curiosity to understand how the world works. 
              I think understanding how people think and learning code is essential to create innovative products that will transcend this world.
              I enjoy diving into challenges, learning new concepts, and applying them to make a positive impact.</h2>
            <h2 className='about-text'>I am <span className='bold'>currently</span> looking for internships! </h2>
          </div>
          <div className="about-image">
            <Image src="/IMG_9363.jpg" alt="AI" height={300} width={300}/>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects">
        <h1 className="project-title">My Projects.</h1>
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
