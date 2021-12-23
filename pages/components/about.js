import { FaPython, FaReact, FaDatabase, FaMobileAlt } from 'react-icons/fa';

export default function About() {
    return (
        <div id="about" className="relative bg-indigo-600 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="relative z-10 pb-8 bg-indigo-600 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">

                    <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                        <div className="content-center sm:text-center lg:text-center">
                            <h1 className="text-4xl tracking-tight font-extrabold text-indigo-900 sm:text-5xl md:text-6xl">
                                <span className="block xl:inline">A little more about me.</span>
                            </h1>

                            <p className="mt-3 text-base text-white sm:mt-5 sm:text-lg  sm:mx-auto md:mt-5 md:text-xl lg:mx-auto">
                                I'm a software engineer with a passion for learning and building things. 
                                I have completed a Bachelor of Computer Science and Business, I'm currently working on my &nbsp;
                                <a  className="text-indigo-900 hover:text-indigo-700"
                                    href="https://www.eng.mcmaster.ca/sept/programs/degree-options/mengdesign/engineering-design" 
                                    target="_blank" 
                                    rel="noopener noreferrer">
                                        Masters of Engineering Design at McMaster University 
                                        </a>. I get to learn about Design Thinking, IoT, Human-Centered Design, Robotics and Automation, Mobile Application Development, and more.
                            </p>

                            <p className="mt-3 text-base text-white sm:mt-5 sm:text-lg  sm:mx-auto md:mt-5 md:text-xl lg:mx-auto">I have work experience in IT, cybersecurity, and full-stack software development.</p>

                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}