export default function Hero() {
  return (
    <section className="py-28 text-center px-6">
      <div className="max-w-3xl mx-auto">

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black dark:text-white">
          Full-Stack Developer
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          I build scalable systems, ERP platforms, APIs, and modern web
          applications — with a focus on performance, clean architecture,
          and well-documented developer platforms.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex justify-center gap-4 flex-wrap">

          <a
            href="/projects"
            className="px-6 py-3 rounded-lg bg-black text-white dark:bg-white dark:text-black font-medium hover:opacity-90 transition"
          >
            View Projects
          </a>

          <a
            // href="https://docs.erzan.dev"
            //local dev purposes
            href="http://localhost:3000"
            target="_blank"
            className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-900 transition"
          >
            Engineering Docs
          </a>

        </div>

      </div>
    </section>
  );
}