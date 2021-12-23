const cardDetails = [
    {
        imageURL: "laser.png",
        title: "Open Source Laser Cutter",
        description: "An open source laser cutter I designed to be used with Arduino and a CNC shield.",
        buttonPath: "https://github.com/matthewalunni/laser-cutter",
    },
    {
        imageURL: "tower.png",
        title: "Tower Grow",
        description: "A 3D printed IoT desktop hydroponic garden controlled through a react native mobile application",
        buttonPath: "https://github.com/matthewalunni/tower_grow",
    },
    {
        imageURL: "django.png",
        title: "Django React SAAS Template",
        description: "A minimalistic django react project template that everyone can use, which works out of the box.",
        buttonPath: "https://github.com/matthewalunni/saas-template-django",
    },
];

function Card(key, imageURL, title, description, buttonPath) {
    return (
        <div key={key} className="h-fit sm:mx-10 p-5 bg-white rounded-xl mt-6 flex">
            <div className="h-fit grid-rows-4 w-full">
                <img
                    className="p-0 h-48 object-cover mx-auto rounded-xl md:border-white md:border-solid md:border-4"
                    src={imageURL} />
                <h1 className="p-1 h-fit text-xl text-center font-semibold text-black">{title}</h1>
                <p className="p-5 h-fit text-grey-dark text-center font-thin text-sm leading-normal md:text-black">
                    {description}
                </p>
                <a
                    href={buttonPath}
                    className="h-fit w-full flex items-center justify-center px-3 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                    target="_blank"
                >
                    See More
                </a>
            </div>
        </div>
    );
}

export default function Projects() {
    return (
        <div id="projects" className="relative bg-gray-800 overflow-hidden sm:h-full md:lg:h-screen">
            <div className="max-w-7xl mx-auto">
                <div className="relative z-10 pb-8 bg-gray-800 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">

                    <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                        <div className="content-center sm:text-center lg:text-center">
                            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                                <span className="block xl:inline">Check out my personal projects.</span>
                            </h1>
                            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg  sm:mx-auto md:mt-5 md:text-xl lg:mx-auto">I love to create things. I am very proud of my personal projects, and would be very happy if you had a look.</p>
                            <div className="content-center grid md:lg:grid-cols-3 mt-6">
                                {cardDetails.map((card, index) => {
                                    return Card(index, card.imageURL, card.title, card.description, card.buttonPath);
                                }
                                )}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}