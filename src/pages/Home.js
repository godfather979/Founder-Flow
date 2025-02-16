export default function Home() {
  return (
    <div className="h-full w-full overflow-auto">

    <div className="flex flex-1 min-h-screen text-neutral-900 dark:text-neutral-100">
      <div className="p-6 md:p-12 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 flex flex-col gap-6 flex-1 w-full">
        {/* Old Code - Title and Description */}
        {/* <h1 className="text-3xl font-bold">Welcome to FounderFlow</h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-300">
          Your ultimate startup assistant to streamline your journey.
        </p> */}

        
        <img
          src="/assets/TextlessLogo.png"
          alt="Logo"
          className="w-auto h-40 mx-auto mb-0" // Adjust the width and height as needed
        />
        {/* New Code - Hero Section */}
        <section id="hero" className="flex flex-col items-center mb-12">
          <h1 className="text-5xl font-bold text-center mb-4">Welcome to FounderFlow</h1>
          <p className="text-lg text-center mb-8">The ultimate startup assistant for solo founders. Validate ideas, build your brand, and stay motivated every step of the way.</p>
        </section>
        {/* Old Code - Section Cards */}
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
        {/* New Code - Features Section
        <section id="features" className="py-16 mb-12">
          <h2 className="text-3xl font-semibold text-center mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="feature-card p-6 bg-white shadow-lg rounded-lg">
              <h3 className="font-semibold text-xl mb-4">Idea Generator</h3>
              <p>Generate startup ideas based on your inputs and preferences.</p>
            </div>
            <div className="feature-card p-6 bg-white shadow-lg rounded-lg">
              <h3 className="font-semibold text-xl mb-4">Roadmap Builder</h3>
              <p>Create a step-by-step plan to bring your idea to life.</p>
            </div>
            <div className="feature-card p-6 bg-white shadow-lg rounded-lg">
              <h3 className="font-semibold text-xl mb-4">Motivation</h3>
              <p>Stay motivated with daily tips and track your progress.</p>
            </div>
          </div>
        </section> */}

        {/* New Code - How It Works Section */}
<section id="how-it-works" className="py-16 bg-neutral-50 dark:bg-neutral-800 mb-12 rounded-xl">
  <h2 className="text-4xl font-semibold text-center text-neutral-900 dark:text-neutral-100 mb-8">How It Works</h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-12">
    <div className="step-card bg-white dark:bg-neutral-700 p-8 rounded-xl shadow-lg transition-transform transform hover:scale-105 text-center">
      <div className="icon mb-4 mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-12 h-12 text-blue-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l4-4m0 0l4 4m-4-4v12" />
        </svg>
      </div>
      <h3 className="font-semibold text-xl text-neutral-900 dark:text-neutral-100">Step 1: Enter Your Idea</h3>
      <p className="text-neutral-600 dark:text-neutral-300">Start by entering your business idea. Fill in the key details to help us understand your vision and goals.</p>
    </div>

    <div className="step-card bg-white dark:bg-neutral-700 p-8 rounded-xl shadow-lg transition-transform transform hover:scale-105 text-center">
      <div className="icon mb-4 mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-12 h-12 text-green-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
        </svg>
      </div>
      <h3 className="font-semibold text-xl text-neutral-900 dark:text-neutral-100">Step 2: Validate with AI</h3>
      <p className="text-neutral-600 dark:text-neutral-300">Let AI tools analyze your idea. We'll provide feedback on its viability, potential risks, and opportunities.</p>
    </div>

    <div className="step-card bg-white dark:bg-neutral-700 p-8 rounded-xl shadow-lg transition-transform transform hover:scale-105 text-center">
      <div className="icon mb-4 mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-12 h-12 text-yellow-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
        </svg>
      </div>
      <h3 className="font-semibold text-xl text-neutral-900 dark:text-neutral-100">Step 3: Build Your Roadmap</h3>
      <p className="text-neutral-600 dark:text-neutral-300">Get a personalized roadmap to turn your idea into a successful startup. We’ll help you with each step, from planning to execution.</p>
    </div>
  </div>
</section>


        {/* New Code - Testimonials Section */}
        <section id="testimonials" className="py-16 bg-neutral-50 dark:bg-neutral-800 mb-12 rounded-xl">
  <h2 className="text-4xl font-semibold text-center text-neutral-900 dark:text-neutral-100 mb-12">What Founders Are Saying</h2>

  <div className="flex flex-wrap justify-center gap-8 px-6 md:px-12">
    {/* Testimonial 1 */}
    <div className="testimonial-card p-8 bg-white dark:bg-neutral-700 shadow-lg rounded-xl max-w-md w-full text-center transition-transform transform hover:scale-105">
      <div className="flex justify-center mb-4">
        <img src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png" alt="Alex's Profile" className="rounded-full border-2 border-neutral-200 dark:border-neutral-600" />
      </div>
      <p className="text-lg text-neutral-900 dark:text-neutral-100 italic mb-4">"FounderFlow helped me validate my startup idea and create a clear roadmap!"</p>
      <p className="text-md font-semibold text-neutral-700 dark:text-neutral-300">- Alex, Founder of MyStartUp</p>
    </div>

    {/* Testimonial 2 */}
    <div className="testimonial-card p-8 bg-white dark:bg-neutral-700 shadow-lg rounded-xl max-w-md w-full text-center transition-transform transform hover:scale-105">
      <div className="flex justify-center mb-4">
        <img src="https://cdn-icons-png.flaticon.com/128/6997/6997662.png" alt="Sarah's Profile" className="rounded-full border-2 border-neutral-200 dark:border-neutral-600" />
      </div>
      <p className="text-lg text-neutral-900 dark:text-neutral-100 italic mb-4">"I love the daily motivation and progress tracking!"</p>
      <p className="text-md font-semibold text-neutral-700 dark:text-neutral-300">- Sarah, Founder of TechHub</p>
    </div>

    {/* Testimonial 3 */}
    <div className="testimonial-card p-8 bg-white dark:bg-neutral-700 shadow-lg rounded-xl max-w-md w-full text-center transition-transform transform hover:scale-105">
      <div className="flex justify-center mb-4">
        <img src="https://cdn-icons-png.flaticon.com/128/219/219970.png" alt="John's Profile" className="rounded-full border-2 border-neutral-200 dark:border-neutral-600" />
      </div>
      <p className="text-lg text-neutral-900 dark:text-neutral-100 italic mb-4">"The AI-powered idea validation gave me the confidence to move forward!"</p>
      <p className="text-md font-semibold text-neutral-700 dark:text-neutral-300">- John, Founder of InnovatorsInc</p>
    </div>

    {/* Testimonial 4 */}
    <div className="testimonial-card p-8 bg-white dark:bg-neutral-700 shadow-lg rounded-xl max-w-md w-full text-center transition-transform transform hover:scale-105">
      <div className="flex justify-center mb-4">
        <img src="https://cdn-icons-png.flaticon.com/128/6833/6833605.png" alt="Emily's Profile" className="rounded-full border-2 border-neutral-200 dark:border-neutral-600" />
      </div>
      <p className="text-lg text-neutral-900 dark:text-neutral-100 italic mb-4">"FounderFlow is like a co-founder guiding me every step of the way!"</p>
      <p className="text-md font-semibold text-neutral-700 dark:text-neutral-300">- Emily, Founder of GreenTech</p>
    </div>

    {/* Testimonial 5 */}
    <div className="testimonial-card p-8 bg-white dark:bg-neutral-700 shadow-lg rounded-xl max-w-md w-full text-center transition-transform transform hover:scale-105">
      <div className="flex justify-center mb-4">
        <img src="https://cdn-icons-png.flaticon.com/128/236/236831.png" alt="David's Profile" className="rounded-full border-2 border-neutral-200 dark:border-neutral-600" />
      </div>
      <p className="text-lg text-neutral-900 dark:text-neutral-100 italic mb-4">"The branding tools helped me establish a strong identity for my startup!"</p>
      <p className="text-md font-semibold text-neutral-700 dark:text-neutral-300">- David, Founder of SmartHomeTech</p>
    </div>
  </div>
</section>


        {/* New Code - Call to Action Section */}
        <section id="call-to-action" className="py-16 text-center">
          <h2 className="text-3xl font-semibold mb-4">Ready to turn your idea into reality?</h2>
          <p className="text-xl mb-8">Join hundreds of founders already using FounderFlow to bring their ideas to life.</p>
        </section>
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
