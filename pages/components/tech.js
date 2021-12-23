import { FaPython, FaReact, FaDatabase, FaMobileAlt } from 'react-icons/fa';

export default function Tech() {
    return (
        <div id="about" className="relative bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">

                    <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                        <div className="content-center sm:text-center lg:text-center">
                            <h1 className="text-4xl tracking-tight font-extrabold text-grey-800 sm:text-5xl md:text-6xl">
                                <span className="block xl:inline">Some tech I like to use.</span>
                            </h1>

                            <p className="mt-3 text-base text-gray-400 sm:mt-5 sm:text-lg  sm:mx-auto md:mt-5 md:text-xl lg:mx-auto">
                                I like to consider myself a lifetime learner, and tech-stack agnostic; however, below are a few of my favorite technologies to work with.</p>

                            <div className="content-center grid grid-cols-4 gap-4 mt-6">
                                <div className="flex items-center justify-center">
                                    <div className="content-center grid grid-row-2">
                                        <FaPython className="h-24 w-24 text-indigo-600 mx-auto" />
                                        Python
                                    </div>
                                </div>
                                <div className="flex items-center justify-center">
                                    <div className="content-center grid grid-row-2">
                                        <FaReact className="h-24 w-24 text-indigo-600 mx-auto" />
                                        React
                                    </div>
                                </div>
                                <div className="flex items-center justify-center">
                                    <div className="content-center grid grid-row-2">
                                        <FaDatabase className="h-24 w-24 text-indigo-600 mx-auto" />
                                        PostgreSQL
                                    </div>
                                </div>
                                <div className="flex items-center justify-center">
                                    <div className="content-center grid grid-row-2">
                                        <FaMobileAlt className="h-24 w-24 text-indigo-600 mx-auto" />
                                        React Native
                                    </div>
                                </div>

                            </div>


                            <p className="mt-3 text-base text-gray-400 sm:mt-5 sm:text-lg  sm:mx-auto md:mt-5 md:text-xl lg:mx-auto">
                                I still like to play around with CAD, CAM, design software, 3D printing, laser cutting, and CNC machining from time to time as well.</p>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}