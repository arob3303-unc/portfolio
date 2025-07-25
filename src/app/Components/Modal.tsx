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
    <div className="box-grid">
      {/* Project Boxes */}
      <div
        className="project-box"
        onClick={() =>
          openModal(
            <div className="modal-project-overlay">
              <div className="modal-title"> Project One </div>
              <div className="modal-project-img">
                <Image src="/project1.png" alt="Project 1 Image" className="modal-img-height"
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
        <div className="modal-box-imgs">
          <Image className="modal-box-icons" src="/post.png" alt="PostgreSQL" title="PostgreSQL" width={40} height={50} />
          <Image className="modal-box-icons" src="/React.png" alt="ReactJS" width={40} height={50} />
          <Image className="modal-box-icons" src="/OpenAPI.png" alt="APIs" width={40} height={50} />
        </div>
      </div>

      {/* Add More Project Boxes */}
      <div
        className="project-box"
        onClick={() =>
          openModal(
            <div className="modal-project-overlay">
              <div className="modal-project-img">
                <Image className="modal-img-height" src="/bot.png" alt="Project 2 Image" width={1800} height={1750} />
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
        <div className="modal-box-imgs">
          <Image className="modal-box-icons" src="/Python.png" alt="Python" width={40} height={50} />
          <Image className="modal-box-icons" src="/OpenAPI.png" alt="APIs" width={40} height={50} />
        </div>
      </div>

      <div
        className="project-box"
        onClick={() =>
          openModal(
            <div className="modal-project-overlay">
              <div className="modal-project-img">
                <Image className="modal-img-height" src="/2Dgame.png" alt="Project 3 Image" width={1800} height={1750} />
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
        <div className="modal-box-imgs">
          <Image className="modal-box-icons" src="/Java.png" alt="Java" width={40} height={50} />
        </div>
      </div>

      <div
        className="project-box"
        onClick={() =>
          openModal(
            <div className="modal-project-overlay">
              <div className="modal-project-img">
                <Image className="modal-img-height" src="/news.png" alt="Project 4 Image" width={1800} height={1750} />
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
        <div className="modal-box-imgs">
          <Image className="modal-box-icons" src="/OpenAPI.png" alt="APIs" width={40} height={50} />
          <Image className="modal-box-icons" src="/HTML5.png" alt="HTML" width={40} height={50} />
          <Image className="modal-box-icons" src="/CSS3.png" alt="CSS" width={40} height={50} />
          <Image className="modal-box-icons" src="/JavaScript.png" alt="JS" width={40} height={50} />
        </div>
      </div>


      <div
        className="project-box"
        onClick={() =>
          openModal(
            <div className="modal-project-overlay">
              {
              <div className="modal-project-img">
                <Image src="/algo.png" alt="Project 5 Image" width={1800} height={1750} />
              </div>
              }
              <div className="modal-project-text">
                <ul>
                  <li className='modal-project-textcolor1 text-center' >-	Developed an algorithmic trading strategy using pandas and the Yahoo Finance API to execute buy/sell decisions based on 50-day and 200-day moving averages.</li>
                  <li className='modal-project-textcolor2 text-center' >-	Accounted for transaction costs (0.04%) to simulate realistic trading conditions.</li>
                  <li className='modal-project-textcolor1 text-center' >-	Result: Backtested strategy yielded a 366.32% return on Zoom (ZM) while demonstrating the impact of transaction costs (-3.13% on Nvidia), highlighting the importance of fee management. Nvidia returned a 0.08% return if no transaction costs were accounted for.</li>
                  <li className='modal-project-textcolor2 text-center' >BACKTESTING: Strategy to ensure profitable results- -	Backtested the above algorithm over a 10-year period (2015–2025), comparing performance against a buy-and-hold strategy.</li>
                  <li className='modal-project-textcolor1 text-center' >-	Result: Algorithm provided a slight outperformance in certain scenarios and demonstrated potential for further optimization with additional parameters being added and accounting for more common transaction costs (brokerage fees, slippage fees, etc.). </li>
                  <li className='modal-project-textcolor2 text-center' >-	Insight: Zoom experienced a significant surge in share price during the COVID-19 pandemic, followed by a steady decline post-pandemic. This algorithm is well-suited for capturing gains during such &quot;boom&quot; periods and managing trades over the following decade. Given the current unprecedented rise in share prices of several AI companies, applying this strategy to AI stocks could potentially yield profitable results.</li>
                </ul>
              </div>
            </div>
          )
        }
      >
        <h3 className="project-text">Stock Market Algorithm</h3>
        <div className="modal-box-imgs">
          <Image className="modal-box-icons" src="/Python.png" alt="Python" width={40} height={50} />
          <Image className="modal-box-icons" src="/OpenAPI.png" alt="APIs" width={40} height={50} />
        </div>
      </div>


      <div
        className="project-box"
        onClick={() =>
          openModal(
            <div className="modal-project-overlay">
              <div className="modal-project-img">
                <Image className="modal-img-height" src="/drone.png" alt="Project 3 Image" width={1800} height={1750} />
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
        <div className="modal-box-imgs">
          <Image className="modal-box-icons" src="/HTML5.png" alt="HTML" width={40} height={50} />
          <Image className="modal-box-icons" src="/CSS3.png" alt="CSS" width={40} height={50} />
          <Image className="modal-box-icons" src="/JavaScript.png" alt="JS" width={40} height={50} />
        </div>
      </div>


      <div
        className="project-box"
        onClick={() =>
          openModal(
            <div className="modal-project-overlay">
              <div className="modal-project-img">
                <Image className="modal-img-height" src="/pygame.png" alt="Project 7 Image" width={1800} height={1750} />
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
        <div className="modal-box-imgs">
          <Image className="modal-box-icons" src="/Python.png" alt="Python" width={40} height={50} />
        </div>
      </div>



      <div
        className="project-box"
        onClick={() =>
          openModal(
            <div className="modal-project-overlay">
              <div className="modal-project-img">
                <Image className="modal-img-height" src="/auto.png" alt="Project 8 Image" width={1800} height={1750} />
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
        <div className="modal-box-imgs">
          <Image className="modal-box-icons" src="/Python.png" alt="Python" width={40} height={50} />
        </div>
      </div>



      <div
        className="project-box"
        onClick={() =>
          openModal(
            <div className="modal-project-overlay">
              <div className="modal-project-img">
                <Image className="modal-img-height" src="/website.png" alt="Project 3 Image" width={800} height={750} />
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
        <div className="modal-box-imgs">
          <Image className="modal-box-icons" src="/React.png" alt="React" width={40} height={50} />
          <Image className="modal-box-icons" src="/Next.js.png" alt="CSS" width={40} height={50} />
          <Image className="modal-box-icons" src="/TypeScript.png" alt="TS" width={40} height={50} />
          <Image className="modal-box-icons" src="/Vercel.png" alt="Vercel" width={40} height={50} />
          <Image className="modal-box-icons" src="/CSS3.png" alt="CSS" width={40} height={50} />
        </div>
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
