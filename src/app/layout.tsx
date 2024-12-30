import React from 'react';
import './globals.css'; // Global styles
import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    // Define html and body tags in the root layout
    <html lang="en">
      <body>
        {/* Global header */}
        <header className="header">
          <h1>Welcome to My Portfolio</h1>
        </header>

        {/* Main content */}
        <main>{children}</main>

        {/* Global footer */}
        <footer>
          {/* Github logo link*/}
          <div className='footer-images'>
            <a href='https://github.com/arob3303-unc' target='blank' rel='noopener noreferrer'>
              <Image
                src='/Github.png'
                alt='Github Link'
                width={30} height={30}
              />
            </a>
            {/* Linkedin logo link*/}
            <a href='https://www.linkedin.com/in/austin-robinson-60617b296/' target='blank' rel='noopener noreferrer'>
              <Image
                src='/Ln-pic.png'
                alt='Linkedin Link'
                width={30} height={30}
              />
            </a>
          </div>


        </footer>
      </body>
    </html>
  );
}
