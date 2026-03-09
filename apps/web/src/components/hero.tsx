export default function Hero() {
    return (
        <section className="py-24 text-center">
            <h1 className="text-4x1 font-bold">
                Full-Stack Developer
            </h1>

            <p className="mt-4 text-lg text-gray-500">
                Building scalable systems, ERP systems, APIs, and modern web applications.
            </p>

            <div className="mt-6 flex justify-center gap-4">
                <a href="/projects" className="px-6 py-3 bg-black text-white rounded">
                    View Projects
                </a>

                <a 
                   //href="https://docs.erzan.dev"
                   href="http://localhost:3000" target="blank"
                   className="px-6 py-3 border rounded"
                >
                    Engineering Docs
                </a>
            </div>
        </section>
    )
}