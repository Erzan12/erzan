"use client"

const learning = [
  "Advanced system design",
  "Backend architecture with NestJS",
  "Performance optimization techniques",
  "Building developer tools",
  "NextJS framework",
  "CI/CD workflows"
]

export default function CurrentlyLearning() {
  return (
    <section className="py-20 max-w-6xl mx-auto px-1">
      <div className="mb-16">
        <h2 className="text-3xl font-bold tracking-tight font-sans mb-4">Currently Learning and Exploring</h2>
        <div className="h-1 w-20 bg-primary rounded-full" />
      </div>
      

      <ul className="space-y-3">
        {learning.map((item, i) => (
          <li
            key={i}
            className="text-sm text-muted-foreground border-l-2 pl-4"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  )
}