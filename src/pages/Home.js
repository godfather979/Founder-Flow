export default function Home() {
  return (
    <div className="flex flex-1 min-h-screen bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
      <div className="p-6 md:p-12 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 flex flex-col gap-6 flex-1 w-full">
        {/* Title */}
        <h1 className="text-3xl font-bold">Welcome to FounderFlow</h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-300">
          Your ultimate startup assistant to streamline your journey.
        </p>

        {/* Section Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sections.map((section, index) => (
            <div 
              key={index} 
              className="p-4 bg-neutral-100 dark:bg-neutral-700 rounded-xl shadow-sm border border-neutral-300 dark:border-neutral-600 transition-transform hover:scale-105"
            >
              <h2 className="text-lg font-semibold">{section.title}</h2>
              <p className="text-sm text-neutral-600 dark:text-neutral-300">{section.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const sections = [
  { title: "Ideation", description: "Validate and refine your startup ideas." },
  { title: "Branding", description: "Generate names, logos, and color palettes." },
  { title: "Legal", description: "Get legal guidance for your business." },
  { title: "Marketing", description: "Create and schedule marketing campaigns." },
];
