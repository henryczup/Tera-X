"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PinContainer } from "@/components/ui/3d-pin"
import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import { ArrowRight, Beaker, Cloud, Cpu, LineChart, Lock, Zap, Target, Users, Shield } from 'lucide-react'

const marqueeLogos = [
  { src: "/logo/Horizontal_ReversedOut_width_143px.webp", alt: "Horizontal Reversed Logo" },
  { src: "/logo/crest-only-logo-print-color.png", alt: "UW Crest", className: "h-20" },
  { src: "/logo/liquid-instruments-logo.svg", alt: "Liquid Instruments" },
  { src: "/logo/microsanj-logo.png", alt: "Microsanj" },
  { src: "/logo/URP_Park_logo_CMYK_white-text-whiteoutline-1.svg", alt: "UW Research Park" },
  { src: "/logo/648a3efb235b9e3f7695d899_logo-light (1).svg", alt: "Unicorn Bio" },
  { src: "/logo/Screenshot 2025-11-17 132354.png", alt: "Partner Showcase" },
]

const communityPartners = [
  "UW–Madison CHIPS Center",
  "Madison College MOSAIC Program",
  "University of Connecticut (Soft Robotics)",
  "Elephas",
  "Microsanj",
  "Unicorn Biotechnologies",
  "Redwood EDA",
  "Liquid Instruments",
]

const heroHeadline = "Cloud-connected autonomous labs."

const defaultEase: [number, number, number, number] = [0.22, 0.61, 0.36, 1]

const sectionFade = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: defaultEase },
  },
}

const staggeredContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
}

const childFade = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: defaultEase },
  },
}

const sectionViewport = { once: true, amount: 0.2 }

function AnimatedSiteFrame() {
  return (
    <>
      <div className="pointer-events-none fixed inset-y-0 left-6 w-px bg-neutral-200/80">
        <div className="animate-pulse absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="pointer-events-none fixed inset-y-0 right-6 w-px bg-neutral-200/80">
        <div className="animate-pulse absolute inset-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="pointer-events-none fixed inset-x-0 bottom-6 h-px bg-neutral-200/80">
        <div className="animate-pulse absolute left-1/2 h-px w-40 -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>
    </>
  )
}

export default function HiveLabLanding() {
  const heroWords = heroHeadline.split(" ")

  return (
    <div className="relative min-h-screen bg-background overflow-hidden pt-20">
      <AnimatedSiteFrame />
      {/* Navigation */}
      <nav className="border-b border-border/60 bg-white/95 backdrop-blur-xl shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center h-20 gap-8">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-36 sm:h-14 sm:w-48">
                <Image src="/tera-x-logo.png" alt="Tera-X logo" fill className="object-contain" priority />
              </div>
            </div>
            <div className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
              <a href="#platform" className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors">
                Platform
              </a>
              <a href="#capabilities" className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors">
                Capabilities
              </a>
              <a href="#community" className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors">
                Community
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background">
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:20px_20px]",
            "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]"
          )}
        ></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.h1
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance"
              initial={{ opacity: 0, filter: "blur(6px)", y: 20 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {heroWords.map((word, index) => (
                <motion.span
                  key={word + index}
                  initial={{ opacity: 0, filter: "blur(6px)", y: 10 }}
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
                  className="inline-block mr-2"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>
            <motion.p
              className="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto text-balance leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              Real instruments, remote access, reproducible data.
            </motion.p>
            <motion.p
              className="text-lg font-medium mb-10 text-foreground"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1 }}
            >
              Automation that supports human insight.
            </motion.p>
            <motion.form
              className="w-full max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <label className="sr-only" htmlFor="hero-email">
                Enter your email address
              </label>
              <div className="flex items-center gap-2 rounded-full border border-border bg-white/95 shadow-[0_10px_40px_rgba(15,23,42,0.08)] pl-5 pr-2 py-2">
                <input
                  id="hero-email"
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
                  required
                />
                <Button type="submit" size="lg" className="rounded-full bg-foreground text-background hover:bg-foreground/90">
                  Request Access
                </Button>
              </div>
            </motion.form>
          </div>

          <div className="mt-12 flex justify-center">
            {/* Add hero media or illustration here if needed */}
          </div>
        </div>
      </section>

      {/* Partner Logos Marquee */}
      <section className="border-y border-border bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={sectionFade}
        >
          <div className="overflow-hidden py-12">
            <div className="flex gap-16 animate-logo-marquee">
              {marqueeLogos.map((logo) => (
                <div key={logo.src} className="flex items-center opacity-70 hover:opacity-100 transition-opacity">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={200}
                    height={80}
                    className="h-12 w-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* What We Build Section */}
      <section id="platform" className="py-24 border-t border-border bg-background relative overflow-hidden">
        <div
          className={cn(
            "absolute inset-0",
            "[background-size:20px_20px]",
            "[background-image:radial-gradient(#e4e4e7_1px,transparent_1px)]"
          )}
        ></div>
        <div className="pointer-events-none absolute inset-0 bg-white/80 backdrop-blur-[1px] [mask-image:radial-gradient(ellipse_at_center,transparent_35%,black)]"></div>
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={sectionFade}
        >
          <motion.div className="text-center mb-16" variants={childFade}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              What We Build
            </h2>
          </motion.div>

          <motion.div className="grid lg:grid-cols-2 gap-12 mb-12" variants={staggeredContainer}>
            <motion.div variants={childFade}>
              <Card className="p-8 hover:border-primary/50 transition-colors">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Cloud className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-3">Cloud ↔ Laboratory Infrastructure</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Tera-X designs fully programmable laboratory nodes—physical facilities equipped with advanced instruments, robotics, and FPGA-accelerated data pipelines—paired with a cloud orchestration layer that manages workflows, digital twins, and metadata.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Researchers log in, design experiments, schedule instruments, monitor live data, and receive model-validated results, all within a secure and auditable environment.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div variants={childFade}>
              <Card className="p-8 hover:border-primary/50 transition-colors">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-3">Autonomous Experimentation With Human Oversight</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Our systems execute experiments automatically while keeping humans in the loop for every scientific or safety-relevant decision.
                    </p>
                    <p className="text-muted-foreground leading-relaxed mb-3">We combine:</p>
                    <ul className="space-y-2 text-muted-foreground text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Adaptive AI planning</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Domain-specific digital twins</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Real-time model/measurement comparison</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Tiered human approval workflows</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>Complete metadata and provenance logging</span>
                      </li>
                    </ul>
                    <p className="text-foreground font-medium mt-4">
                      The result: faster science with uncompromised trust.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* HiveLab Section */}
      <section className="relative overflow-hidden py-24 border-y border-border bg-gradient-to-br from-[#fff5d9] via-white to-white">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(253,224,140,0.4),_transparent_60%)]"></div>
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={sectionFade}
        >
          <motion.div className="mb-12" variants={staggeredContainer}>
            <motion.div variants={childFade}>
              <Badge variant="secondary" className="mb-4 text-primary border-primary/20">
                Flagship PCL Node
              </Badge>
            </motion.div>
            <motion.h2 className="text-3xl sm:text-4xl font-bold mb-6" variants={childFade}>
              HiveLab — A Tera-X PCL Test Bed Node
            </motion.h2>
            <motion.p className="text-lg text-muted-foreground max-w-3xl leading-relaxed mb-6" variants={childFade}>
              HiveLab, operated by Tera-X at Element Labs in Madison, WI, is a flagship PCL Node demonstrating how autonomous experimentation can safely serve a national research community.
            </motion.p>
          </motion.div>

          <motion.div className="grid md:grid-cols-2 gap-6 mb-8" variants={staggeredContainer}>
            <motion.div variants={childFade}>
              <Card className="p-6 bg-background">
                <h3 className="text-xl font-semibold mb-4">HiveLab integrates:</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <Cpu className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Semiconductor reliability platforms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Beaker className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>High-content biological assays</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Zap className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Soft actuator and compliant materials testbeds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Cpu className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>FPGA-enhanced sensing and edge computing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Cloud className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Cloud-hosted orchestration, digital twins, and AI planners</span>
                  </li>
                </ul>
              </Card>
            </motion.div>

            <motion.div variants={childFade}>
              <Card className="p-6 bg-gradient-to-br from-primary/10 to-background">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Every experiment runs inside a structured workflow: parameter sets, safety envelopes, metadata, models, and human approvals are all encoded and versioned.
                </p>
                <p className="text-xl font-semibold text-foreground">
                  One portal → many domains → reproducible science.
                </p>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Key Capabilities */}
      <section id="capabilities" className="relative overflow-hidden py-24 border-y border-border bg-muted">
        <div className="absolute inset-0 pointer-events-none opacity-80 [background-size:26px_26px] [background-image:radial-gradient(rgba(148,163,184,0.45)_1px,transparent_1px)]"></div>
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-muted/40 via-muted/10 to-transparent"></div>
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={sectionFade}
        >
          <motion.div className="text-center mb-16" variants={childFade}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Key Capabilities
            </h2>
          </motion.div>

          <motion.div className="grid md:grid-cols-2 gap-8" variants={staggeredContainer}>
            <motion.div variants={childFade}>
              <Card className="p-6 border-border">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-primary" />
                  Semiconductor & Photonics
                </h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• Thermal and electrical reliability mapping</li>
                  <li>• Automated stress-measure-relax workflows</li>
                  <li>• Multi-modal sensing and real-time twin updates</li>
                </ul>
              </Card>
            </motion.div>

            <motion.div variants={childFade}>
              <Card className="p-6 border-border">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Beaker className="h-5 w-5 text-primary" />
                  Biological Microenvironments
                </h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• Microfluidic control and chemical gradient generation</li>
                  <li>• High-content imaging and functional assays</li>
                  <li>• Adaptive protocols with safety guardrails</li>
                </ul>
              </Card>
            </motion.div>

            <motion.div variants={childFade}>
              <Card className="p-6 border-border">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Soft Actuators & Materials
                </h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• Force/displacement sensing</li>
                  <li>• High-speed imaging and mechanical test rigs</li>
                  <li>• Parameter sweeps of nonlinear behavior</li>
                </ul>
              </Card>
            </motion.div>

            <motion.div variants={childFade}>
              <Card className="p-6 border-border">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Cpu className="h-5 w-5 text-primary" />
                  FPGA-Enhanced Data Pathways
                </h3>
                <ul className="space-y-2 text-muted-foreground text-sm">
                  <li>• Real-time feature extraction</li>
                  <li>• Low-latency safety checks</li>
                  <li>• Cloud-controlled kernel updates</li>
                </ul>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Community & Workforce Development */}
      <section id="community" className="relative overflow-hidden py-24 border-y border-border bg-muted">
        <div className="absolute inset-0 pointer-events-none opacity-80 [background-size:24px_24px] [background-image:radial-gradient(rgba(148,163,184,0.4)_1px,transparent_1px)]"></div>
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/40 via-transparent to-muted/20"></div>
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={sectionFade}
        >
          <motion.div className="text-center mb-12" variants={childFade}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Community & Workforce Development
            </h2>
            <p className="text-lg text-foreground font-semibold max-w-3xl mx-auto leading-relaxed">
              HiveLab trains technicians, undergraduates, graduate researchers, and industry professionals to work in cloud-connected, model-integrated laboratory environments.
            </p>
          </motion.div>


          <motion.div className="max-w-4xl mx-auto" variants={staggeredContainer}>
            <motion.p className="text-lg text-muted-foreground mb-8 leading-relaxed" variants={childFade}>
              Tera-X partners with:
            </motion.p>
            <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4" variants={staggeredContainer}>
              {communityPartners.map((partner) => (
                <motion.div key={partner} variants={childFade}>
                  <Card className="p-4 border-border">
                    <p className="text-foreground font-medium">{partner}</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary/5 to-background">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={sectionFade}
        >
          <motion.div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" variants={staggeredContainer}>
            <motion.h2 className="text-3xl sm:text-4xl font-bold mb-6" variants={childFade}>
              Contact
            </motion.h2>
            <motion.p className="text-xl text-foreground font-medium mb-3" variants={childFade}>
              Tera-X LLC
            </motion.p>
            <motion.p className="text-lg text-muted-foreground mb-2" variants={childFade}>
              Cloud-Connected Autonomous Laboratories
            </motion.p>
            <motion.p className="text-lg text-muted-foreground mb-10" variants={childFade}>
              Madison, Wisconsin, USA
            </motion.p>
            <motion.form className="w-full max-w-xl mx-auto mb-8" variants={childFade}>
              <label className="sr-only" htmlFor="cta-email">
                Enter your email address
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-3 rounded-full border border-border bg-white/95 shadow-[0_10px_40px_rgba(15,23,42,0.08)] pl-5 pr-2 py-2">
                <input
                  id="cta-email"
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none w-full"
                  required
                />
                <Button type="submit" size="lg" className="rounded-full bg-foreground text-background hover:bg-foreground/90 w-full sm:w-auto">
                  Request Access
                </Button>
              </div>
            </motion.form>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-background">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={sectionViewport}
          variants={sectionFade}
        >
          <motion.div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div className="grid md:grid-cols-4 gap-8 mb-8" variants={staggeredContainer}>
              <motion.div variants={childFade}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                    <span className="text-primary-foreground font-bold text-lg">T</span>
                  </div>
                  <span className="text-xl font-bold">Tera-X</span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Cloud-connected autonomous laboratories for trustworthy science
                </p>
              </motion.div>
              <motion.div variants={childFade}>
                <h4 className="font-semibold mb-3">Platform</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#platform" className="hover:text-foreground transition-colors">Overview</a></li>
                  <li><a href="#capabilities" className="hover:text-foreground transition-colors">Capabilities</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">HiveLab</a></li>
                </ul>
              </motion.div>
              <motion.div variants={childFade}>
                <h4 className="font-semibold mb-3">Community</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#community" className="hover:text-foreground transition-colors">Partners</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Workforce Development</a></li>
                  <li><a href="#governance" className="hover:text-foreground transition-colors">Governance</a></li>
                </ul>
              </motion.div>
              <motion.div variants={childFade}>
                <h4 className="font-semibold mb-3">Contact</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground transition-colors">Request Access</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Partnerships</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Support</a></li>
                </ul>
              </motion.div>
            </motion.div>
            <motion.div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4" variants={staggeredContainer}>
              <motion.p className="text-sm text-muted-foreground" variants={childFade}>
                2025 Tera-X LLC. All rights reserved.
              </motion.p>
              <motion.div className="flex gap-6 text-sm text-muted-foreground" variants={childFade}>
                <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
                <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </footer>
    </div>
  )
}