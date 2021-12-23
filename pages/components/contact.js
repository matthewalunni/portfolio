
export default function Contact() {
    const email = () => {
        var subject = "Enquiry";
        var sendTo = "matthew.alunni@gmail.com";
        var openString = 'mailto:' + sendTo + '?subject=' + subject + '&body=' + 'Hi Matthew, I would like to chat.';
        if (typeof window !== "undefined") {
            // Client-side-only code
            window.open(openString, "_blank", "resizable=yes, scrollbars=yes, titlebar=yes, width=800, height=900, top=10, left=10");
        }
    
    }

    return (
        <div id="contact" className="relative bg-white overflow-hidden sm:h-full md:lg:h-full">
            <div className="max-w-7xl mx-auto">
                <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">

                    <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                        <div className="content-center sm:text-center lg:text-center">
                            <h1 className="text-4xl tracking-tight font-extrabold text-gray-800 sm:text-5xl md:text-6xl">
                                <span className="block xl:inline">Get in touch.</span>
                            </h1>
                            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg  sm:mx-auto md:mt-5 md:text-xl lg:mx-auto">Have a question or want to work together? I'd love to hear from you.</p>
                            <div className="content-center mx-auto mt-6 flex justify-center h-2/3">
                                <button onClick={email.bind()} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded w-1/2">
                                    Reach Out
                                </button>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}

