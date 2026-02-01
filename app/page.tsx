import Link from "next/link";
import { Sparkles, Image, Download, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Create Preschool Designs in Seconds
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              AI-powered design generation for preschools. Type your idea, get professional posters, social media posts, and banners instantly.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/dashboard"
                className="rounded-full bg-primary-600 px-8 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-all"
              >
                Get Started
              </Link>
              <Link
                href="#how-it-works"
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-primary-600 transition-colors"
              >
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="mt-16 flow-root sm:mt-24">
            <div className="relative rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <div className="aspect-video rounded-md bg-white shadow-2xl ring-1 ring-gray-900/10 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4 text-gray-400">
                  <Sparkles className="h-16 w-16" />
                  <p className="text-sm">Preview Coming Soon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600">Three simple steps to create amazing preschool designs</p>
          </div>
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {howItWorks.map((step) => (
                <div key={step.title} className="relative flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                    <span className="text-2xl font-bold">{step.number}</span>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-gray-900">{step.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Perfect for Every Occasion</h2>
            <p className="mt-4 text-lg text-gray-600">Generate designs for all your preschool needs</p>
          </div>
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {useCases.map((useCase) => (
                <div key={useCase.title} className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5 hover:shadow-md transition-shadow">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50">{useCase.icon}</div>
                  <h3 className="mt-4 text-base font-semibold text-gray-900">{useCase.title}</h3>
                  <p className="mt-2 text-sm text-gray-600">{useCase.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Simple, Transparent Pricing</h2>
            <p className="mt-4 text-lg text-gray-600">Choose the plan that works for your preschool</p>
          </div>
          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {pricingPlans.map((plan) => (
              <div key={plan.name} className={`relative rounded-2xl p-8 ring-1 ${plan.featured ? 'bg-primary-600 text-white ring-primary-600' : 'bg-white text-gray-900 ring-gray-200'}`}>
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-orange-500 px-4 py-1 text-xs font-semibold text-white">Popular</div>
                )}
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className={`mt-4 flex items-baseline gap-x-2 ${plan.featured ? 'text-white' : 'text-gray-900'}`}>
                  <span className="text-5xl font-bold tracking-tight">${plan.price}</span>
                  <span className={`text-sm ${plan.featured ? 'text-white/80' : 'text-gray-600'}`}>/month</span>
                </p>
                <ul className={`mt-8 space-y-3 text-sm ${plan.featured ? 'text-white/90' : 'text-gray-600'}`}>
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <Zap className={`h-5 w-5 flex-none ${plan.featured ? 'text-white' : 'text-primary-600'}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/dashboard" className={`mt-8 block rounded-full px-6 py-3 text-center text-sm font-semibold transition-all ${plan.featured ? 'bg-white text-primary-600 hover:bg-gray-50' : 'bg-primary-600 text-white hover:bg-primary-500'}`}>
                  Get started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-primary-600 to-pink-600 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Ready to create amazing designs?</h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white/90">Join preschools using AI to create professional designs in seconds</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/dashboard" className="rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-primary-600 shadow-sm hover:bg-gray-50 transition-all">
                Start Creating Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <p className="text-center text-sm text-gray-400">&copy; 2026 DesignMakr. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

const howItWorks = [
  { number: 1, title: "Describe Your Design", desc: "Type what you want - e.g., birthday poster with balloons." },
  { number: 2, title: "Choose Options", desc: "Pick design type, age group, and theme for tailored results." },
  { number: 3, title: "Generate & Download", desc: "AI creates your design. Download instantly." },
];

const useCases = [
  { title: "Birthday Parties", description: "Colorful invitations and banners", icon: <Sparkles className="h-6 w-6 text-primary-600" /> },
  { title: "Admissions", description: "Posters for enrollment", icon: <Image className="h-6 w-6 text-primary-600" /> },
  { title: "Festivals", description: "Festive holiday themes", icon: <Zap className="h-6 w-6 text-primary-600" /> },
  { title: "Social Media", description: "Instagram-ready posts", icon: <Download className="h-6 w-6 text-primary-600" /> },
];

const pricingPlans = [
  { name: "Starter", price: 9, features: ["10 designs/mo", "All design types", "HD downloads", "Email support"], featured: false },
  { name: "Pro", price: 29, features: ["50 designs/mo", "All design types", "HD downloads", "Priority support", "Custom templates"], featured: true },
  { name: "School", price: 99, features: ["Unlimited designs", "All design types", "HD downloads", "24/7 support", "Custom templates", "Team collaboration"], featured: false },
];
