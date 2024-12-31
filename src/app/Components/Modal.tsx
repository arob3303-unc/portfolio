import React, { JSX, useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const Modal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null);
  const [isEnlarged, setIsEnlarged] = useState(false); // Tracks image enlargement state
  const modalRef = useRef<HTMLDivElement>(null);


  const openModal = (content: JSX.Element) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
    setIsEnlarged(false); // Reset enlargement state when modal closes
  };

  const toggleEnlarge = () => {
    setIsEnlarged((prev) => !prev);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleClickOutside = (event: { target: unknown; }) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      closeModal();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside, isModalOpen]);

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Project Boxes */}
      <div
        className="project-box"
        onClick={() =>
          openModal(
            <div className="modal-project-overlay">
              <div className="modal-project-img">
                <Image src="/project1.png" alt="Project 1 Image"
                  layout="intrinsic"
                  width={isEnlarged ? 1200 : 1800} 
                  height={isEnlarged ? 1000 : 1750} 
                  onClick={toggleEnlarge}
                  style={{
                    transition: "transform 0.3s ease",
                  }}
                />
              </div>
              <div className="modal-project-text">
                <ul>
                  <li className="modal-project-textcolor1">
                    - Developed first in PyGame for HackNC in 2023, but then earlier this year I
                    decided to make it an online game.
                  </li>
                  <li className="modal-project-textcolor2">- Used Phaser.js for web compatibility</li>
                  <li className="modal-project-textcolor1">
                    - I used Next.js and React for the front-end (like this website)
                  </li>
                  <li className="modal-project-textcolor2">
                    - Supabase for user authentication and their database for online users
                  </li>
                  <li className="modal-project-textcolor1">
                    - The database and user auth integration caused challenges but overcoming this
                    enhanced my problem solving for this type of integration
                  </li>
                  <div className="modal-link">
                    <li>
                      <Link target="_blank" href="https://www.youtube.com/watch?v=noK9FcLZ3vM&t=0s">Youtube Link</Link>
                    </li>
                  </div>
                </ul>
              </div>
            </div>
          )
        }
      >
        <h3 className="project-text">HayBale Game</h3>
        <h1 className="project-sub-text">PostgreSQL, React, Supabase, APIs, Phaser.js</h1>
      </div>

      {/* Add More Project Boxes */}
      <div
        className="project-box"
        onClick={() =>
          openModal(
            <div className="modal-project-overlay">
              <div className="modal-project-img">
                <Image src="/bot.png" alt="Project 2 Image" width={1800} height={1750} />
              </div>
              <div className="modal-project-text">
                <ul>
                  <li className="modal-project-textcolor1">
                    - Developed for people in my Discord server. It used Discord&apos;s API
                  </li>
                  <li className="modal-project-textcolor2">
                    - It was for fun and I enjoyed seeing people interact with something I
                    developed
                  </li>
                  <li className="modal-project-textcolor1">
                    - Counted down the days til the next Call of Duty game released.
                  </li>
                </ul>
              </div>
            </div>
          )
        }
      >
        <h3 className="project-text">Discord Bot</h3>
        <h1 className="project-sub-text">APIs, Python</h1>
      </div>

      <div
        className="project-box"
        onClick={() =>
          openModal(
            <div className="modal-project-overlay">
              <div className="modal-project-img">
                <Image src="/2Dgame.png" alt="Project 3 Image" width={1800} height={1750} />
              </div>
              <div className="modal-project-text">
                <ul>
                  <li className='modal-project-textcolor1'>- Developed using Eclipse IDE</li>
                    <li className='modal-project-textcolor2'>- All the code was Java and this was my first time learning about game code</li>
                    <li>- Experienced with objects, frameworks, and game panels</li>
                    <li>- Interesting part was learning how collision works within a game. </li>
                </ul>
              </div>
            </div>
          )
        }
      >
        <h3 className="project-text">2D Game</h3>
        <h1 className="project-sub-text">Java</h1>
      </div>

      <div
        className="project-box"
        onClick={() =>
          openModal(
            <div className="modal-project-overlay">
              <div className="modal-project-img">
                <Image src="/news.png" alt="Project 4 Image" width={1800} height={1750} />
              </div>
              <div className="modal-project-text">
                <ul>
                  <li className='modal-project-textcolor1'>- HTML and CSS frontend. API route using Python for backend.</li>
                  <li className='modal-project-textcolor2'>- It was for personal use, I wanted to make develop something that would gather articles from all news sites.</li>
                </ul>
              </div>
            </div>
          )
        }
      >
        <h3 className="project-text">News Scraper</h3>
        <h1 className="project-sub-text">APIs, HTML, CSS, Javascript</h1>
      </div>


      <div
        className="project-box"
        onClick={() =>
          openModal(
            <div className="modal-project-overlay">
              {/*
              <div className="modal-project-img">
                <Image src="./" alt="Project 5 Image" width={1800} height={1750} />
              </div>
              */}
              <div className="modal-project-text">
                <ul>
                  <li className='modal-project-textcolor1 text-center' >Still being developed!</li>
                </ul>
              </div>
            </div>
          )
        }
      >
        <h3 className="project-text">Wildfire Detection Project</h3>
        <h1 className="project-sub-text">ML, CNN, PyTorch, Python, Kaggle</h1>
      </div>


      <div
        className="project-box"
        onClick={() =>
          openModal(
            <div className="modal-project-overlay">
              <div className="modal-project-img">
                <Image src="/drone.png" alt="Project 3 Image" width={1800} height={1750} />
              </div>
              <div className="modal-project-text">
                <ul>
                  <li className='modal-project-textcolor1'>- I am passionate about drone photography. Made this website for my drone pictures. Allowed people to look at my work.</li>
                  <li className='modal-project-textcolor2'>- First project that gave me experience with JS.</li>
                  <li className='modal-project-textcolor1'>- A challenge I had making the website device friendly. I figured it out relatively quickly!</li>
                  <li></li>
                </ul>
              </div>
            </div>
          )
        }
      >
        <h3 className="project-text">Drone Website</h3>
        <h1 className="project-sub-text">HTML, CSS, Javascript</h1>
      </div>


      <div
        className="project-box"
        onClick={() =>
          openModal(
            <div className="modal-project-overlay">
              <div className="modal-project-img">
                <Image src="/pygame.png" alt="Project 7 Image" width={1800} height={1750} />
              </div>
              <div className="modal-project-text">
                <ul>
                  <li className='modal-project-textcolor1'>- Two player game developed in PyGame.</li>
                  <li className='modal-project-textcolor2'>- Fairly simple but first project using PyGame and used it as a starter for my HayBale game.</li>
                  <li className='modal-project-textcolor1'>- One player uses awsd and another uses the arrow keys and they shoot each other. Both have 10 total health.</li>
                  <li></li>
                </ul>
              </div>
            </div>
          )
        }
      >
        <h3 className="project-text">1v1 PyGame</h3>
        <h1 className="project-sub-text">Python, PyGame</h1>
      </div>



      <div
        className="project-box"
        onClick={() =>
          openModal(
            <div className="modal-project-overlay">
              <div className="modal-project-img">
                <Image src="/auto.png" alt="Project 8 Image" width={1800} height={1750} />
              </div>
              <div className="modal-project-text">
                <ul>
                  <li className='modal-project-textcolor1'>- Developed for personal use</li>
                  <li className='modal-project-textcolor2'>- Allowed me to automate certain tasks that involved repeated clicks.</li>
                </ul>
              </div>
            </div>
          )
        }
      >
        <h3 className="project-text">Python Autoclicker</h3>
        <h1 className="project-sub-text">Python, Automation</h1>
      </div>



      <div
        className="project-box"
        onClick={() =>
          openModal(
            <div className="modal-project-overlay">
              <div className="modal-project-img">
                <Image src="/website.png" alt="Project 3 Image" width={800} height={750} />
              </div>
              <div className="modal-project-text">
                <ul>
                  <li className='modal-project-textcolor1'>- The website you are on right now!</li>
                  <li className='modal-project-textcolor2'>- Biggest challenge was creating the modal for my project section.</li>
                  <li className='modal-project-textcolor1'>- Overcame it by learning more about React components, useState, and JSX Elements</li>
                  <li className='modal-project-textcolor2'>- Deploying the website on Vercel was a interesting process and I did come into some errors related to node_modules in the process.</li>
                  <div className="modal-link">
                    <li>
                      <Link target="_blank" href="https://github.com/arob3303-unc/portfolio">GitHub Repo Link</Link>
                    </li>
                  </div>
                </ul>
              </div>
            </div>
          )
        }
      >
        <h3 className="project-text">Portfolio Website</h3>
        <h1 className="project-sub-text">React, Next.js, TypeScript, Vercel</h1>
      </div>








      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            {modalContent}
            <button onClick={closeModal} className="modal-close-button">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
