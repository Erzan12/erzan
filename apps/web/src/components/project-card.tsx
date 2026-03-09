type Props = {
    title: string
    description: string
    stack: string[]
    github: string
}

export default function ProjectCard({
    title,
    description,
    stack,
    github
}: Props) {
    return (
        <div className="border rounded-lg p-6">
            <h3 className="text-x1 font-semibold">{title}</h3>

            <p className="mt-2 text-sm text-gray-500">
                {description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
                {stack.map((tech) => (
                    <span 
                        key={tech}
                        className="text-xs border px-2 py-1 rounded"
                    >
                        {tech}
                    </span>
                ))}
            </div>

            <a 
                href={github}
                className="mt-4 inline-block text-sm underline"
            >
                View Repository
            </a>
        </div>
    )
}