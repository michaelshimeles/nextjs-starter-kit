'use client'

import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, Menu, Shield, Trash2, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()

  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full py-4 px-4 sm:px-6 lg:px-8 bg-white border-b">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Trash2 className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
            <span className="text-lg sm:text-xl font-bold">WasteInspect Pro</span>
          </div>
          <nav className="hidden md:flex space-x-4">
            <Link className="text-sm font-medium hover:text-green-600" href="#services">
              Services
            </Link>
            <Link className="text-sm font-medium hover:text-green-600" href="#how-it-works">
              How It Works
            </Link>
            <Link className="text-sm font-medium hover:text-green-600" href="#testimonials">
              Testimonials
            </Link>
            <Link className="text-sm font-medium hover:text-green-600" href="#faq">
              FAQ
            </Link>
          </nav>
          <div className="md:hidden">
            <Link href="/schedule-demo">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </Link>
          </div>
          <Button className="hidden md:inline-flex bg-green-600 hover:bg-green-700">Get Started</Button>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white py-2 px-4">
          <nav className="flex flex-col space-y-2">
            <Link className="text-sm font-medium hover:text-green-600" href="#services" onClick={() => setMobileMenuOpen(false)}>
              Services
            </Link>
            <Link className="text-sm font-medium hover:text-green-600" href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>
              How It Works
            </Link>
            <Link className="text-sm font-medium hover:text-green-600" href="#testimonials" onClick={() => setMobileMenuOpen(false)}>
              Testimonials
            </Link>
            <Link className="text-sm font-medium hover:text-green-600" href="#faq" onClick={() => setMobileMenuOpen(false)}>
              FAQ
            </Link>
            <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => setMobileMenuOpen(false)}>Get Started</Button>
          </nav>
        </div>
      )}

      <main className="flex-grow">
        <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="container mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Efficient Waste Management Inspections
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8">
              Streamline your waste management processes with our cutting-edge inspection technology
            </p>
            <Button className="bg-green-600 hover:bg-green-700 text-base sm:text-lg py-2 px-4 sm:px-6">
              Schedule a Demo
            </Button>
          </div>
        </section>

        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12">How WasteInspect Pro Works</h2>
            <div className="max-w-3xl mx-auto mb-8 sm:mb-12">
              <div className="aspect-w-16 aspect-h-9">
                <Image
                  src="/placeholder.svg?height=400&width=800"
                  alt="WasteInspect Pro Demo"
                  width={800}
                  height={400}
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
            <div className="flex justify-center space-x-4 sm:space-x-8">
              {["Client 1", "Client 2", "Client 3", "Client 4", "Client 5"].map((client) => (
                <div key={client} className="w-10 h-10 sm:w-16 sm:h-16 bg-gray-200 rounded-full" />
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="container mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Our Services</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Trash2 className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />,
                  title: "Waste Audits",
                  description: "Comprehensive analysis of waste streams and management practices",
                },
                {
                  icon: <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />,
                  title: "Compliance Checks",
                  description: "Ensure adherence to local and federal waste management regulations",
                },
                {
                  icon: <Clock className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />,
                  title: "Real-time Reporting",
                  description: "Instant access to inspection results and recommendations",
                },
                {
                  icon: <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />,
                  title: "Environmental Protection",
                  description: "Minimize environmental impact through optimized waste management",
                },
              ].map((service, index) => (
                <div key={index} className="text-center">
                  <div className="mb-4 flex justify-center">{service.icon}</div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">How It Works</h2>
            <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8">
              {[
                "Schedule an inspection with our team of experts",
                "Our inspectors conduct a thorough on-site waste management audit",
                "Receive a detailed report with actionable insights and recommendations",
                "Implement changes and track improvements over time",
              ].map((step, index) => (
                <div key={index} className="flex items-center">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm sm:text-base">
                      {index + 1}
                    </div>
                  </div>
                  <p className="text-base sm:text-lg">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">What Our Clients Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
              {[
                {
                  quote: "WasteInspect Pro has revolutionized our waste management processes. Highly recommended!",
                  author: "Jane Doe, CEO of GreenCorp",
                },
                {
                  quote: "The insights provided by their inspections have saved us both time and money.",
                  author: "John Smith, Facilities Manager at EcoIndustries",
                },
                {
                  quote: "Their team is professional and thorough. We've seen significant improvements in our waste management.",
                  author: "Michael Shimeles, Operations Manager at CleanTech Solutions",
                },
              ].map((testimonial, index) => (
                <div key={index} className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                  <p className="text-base sm:text-lg mb-4">"{testimonial.quote}"</p>
                  <p className="text-sm sm:text-base font-semibold">{testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8">
              {[
                {
                  question: "How often should we conduct waste management inspections?",
                  answer: "The frequency of inspections depends on your specific needs and regulatory requirements. We typically recommend quarterly inspections for most businesses.",
                },
                {
                  question: "What types of businesses can benefit from your services?",
                  answer: "Our services are valuable for a wide range of industries, including manufacturing, healthcare, hospitality, and educational institutions.",
                },
                {
                  question: "How long does a typical inspection take?",
                  answer: "The duration of an inspection varies based on the size and complexity of your facility. Most inspections are completed within 1-2 business days.",
                },
              ].map((faq, index) => (
                <div key={index}>
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">{faq.question}</h3>
                  <p className="text-sm sm:text-base text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-green-600 text-white">
          <div className="container mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Optimize Your Waste Management?</h2>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8">Get started with WasteInspect Pro today</p>
            <Button className="bg-white text-green-600 hover:bg-gray-100 text-base sm:text-lg py-2 px-4 sm:px-6">
              Schedule Your Inspection
            </Button>
          </div>
        </section>
      </main>

      <footer className="w-full py-6 px-4 sm:px-6 lg:px-8 bg-gray-800 text-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Trash2 className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-base sm:text-lg font-semibold">WasteInspect Pro</span>
            </div>
            <nav className="flex flex-wrap justify-center space-x-4 mb-4 md:mb-0">
              <Link className="text-sm hover:text-green-400 mb-2 md:mb-0" href="#">
                Privacy Policy
              </Link>
              <Link className="text-sm hover:text-green-400 mb-2 md:mb-0" href="#">
                Terms of Service
              </Link>
              <Link className="text-sm hover:text-green-400 mb-2 md:mb-0" href="#">
                Contact Us
              </Link>
            </nav>
            <div className="flex space-x-4">
              <Link className="hover:text-green-400" href="#">
                <span className="sr-only">Facebook</span>
                <svg
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link className="hover:text-green-400" href="#">
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link className="hover:text-green-400" href="#">
                <span className="sr-only">LinkedIn</span>
                <svg
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
          <div className="mt-4 text-center text-xs sm:text-sm">
            © 2024 WasteInspect Pro. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}