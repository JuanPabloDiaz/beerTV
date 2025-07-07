'use client'

/**
 * About Page – Beer TV Ads
 * Provides information about the project, data sources and author.
 */

import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/Container'

export const metadata = {
  title: 'About | Beer TV Ads',
  description: 'Learn more about the Beer TV Ads project and its creators.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-200 to-yellow-400 py-12">
      <Container>
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Logo */}
            <Image src="/logo.svg" alt="BeerTV Logo" width={120} height={80} />
            <div>
              <h1 className="text-4xl font-bold text-blue-900 mb-4">About Beer TV Ads</h1>
              <p className="text-lg text-blue-800 leading-relaxed max-w-prose">
                BeerTV is a playful showcase of iconic beer commercials, focusing
                on the unforgettable ads that debut each year during the Super
                Bowl. It is built with Next.js &amp; Tailwind CSS and serves as a
                learning project exploring modern web tech, video streaming and
                server components.
              </p>
            </div>
          </div>

          <hr className="my-8 border-blue-300/30" />

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-blue-900">Tech Stack</h2>
            <ul className="list-disc pl-6 text-blue-800">
              <li>Next.js 14 (App Router, Server Components, ISR)</li>
              <li>React 18</li>
              <li>Tailwind CSS &amp; daisyUI</li>
              <li>Vercel Hosting, Netlify CMS</li>
            </ul>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-semibold text-blue-900">Open Source</h2>
            <p className="text-blue-800">
              The project is MIT-licensed and open to contributions! Visit the
              repository on{' '}
              <Link
                href="https://github.com/JuanPabloDiaz/beerTV"
                className="text-blue-600 underline hover:text-blue-800"
                target="_blank"
              >
                GitHub
              </Link>{' '}
              to report issues or suggest features.
            </p>
          </section>

          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-semibold text-blue-900">Credits</h2>
            <p className="text-blue-800">
              Commercial metadata is sourced from public archives &amp; YouTube.
              All trademarks and videos belong to their respective owners and
              are presented here under fair-use for educational and
              non-commercial purposes.
            </p>
          </section>

          <div className="mt-10 text-center">
            <Link
              href="/"
              className="inline-block bg-blue-900 hover:bg-blue-800 text-yellow-400 font-bold py-3 px-6 rounded-lg transition-colors shadow-lg"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}
