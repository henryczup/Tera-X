import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PinContainer } from "@/components/ui/3d-pin"
import { cn } from "@/lib/utils"
import { ArrowRight, Beaker, Cloud, Cpu, LineChart, Lock, Zap, Target, Users, Shield } from 'lucide-react'

const marqueeLogos = [
  { src: "/logo/liquid-instruments-logo.svg", alt: "Liquid Instruments" },
  { src: "/logo/microsanj-logo.png", alt: "Microsanj" },
  { src: "/logo/URP_Park_logo_CMYK_white-text-whiteoutline-1.svg", alt: "UW Research Park" },
  { src: "/logo/Horizontal_ReversedOut_width_143px.webp", alt: "Horizontal Reversed Logo" },
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

export default function HiveLabLanding() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">T</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold">Tera-X</span>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#platform" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Platform
              </a>
              <a href="#capabilities" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Capabilities
              </a>
              <a href="#community" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Community
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Button size="sm">
                Contact Us
              </Button>
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
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance">
              Cloud-connected autonomous labs.
            </h1>
            <p className="text-xl text-muted-foreground mb-6 max-w-3xl mx-auto text-balance leading-relaxed">
              Real instruments, remote access, reproducible data.
            </p>
            <p className="text-lg font-medium mb-10 text-foreground">
              Automation that supports human insight.
            </p>
            <form className="w-full max-w-xl mx-auto">
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
            </form>
          </div>

          <div className="mt-12 flex justify-center">
            <PinContainer
              title="View Element Labs on Google Maps"
              href="https://www.google.com/maps/place/Element+Labs/@43.057698,-89.569591,15z/data=!4m6!3m5!1s0x8807ae7d5ab696bd:0x69eef4b57d50a4bb!8m2!3d43.057698!4d-89.569591!16s%2Fg%2F11b7x7055" 
            >
              <div className="flex flex-col gap-3 text-slate-900">
                <p className="text-sm uppercase tracking-[0.3em] text-primary">Visit HiveLab</p>
                <h3 className="text-2xl font-semibold">Element Labs</h3>
                <p className="text-sm text-muted-foreground">
                  5510 Element Wy Suite 400, Madison, WI 53719
                </p>
                <div className="mt-2 h-48 w-full overflow-hidden rounded-3xl border border-border">
                  <iframe
                    title="Element Labs on Google Maps"
                    src="https://www.google.com/maps?q=5510+Element+Way+Suite+400,+Madison,+WI+53719&output=embed"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-full w-full"
                  ></iframe>
                </div>
              </div>
            </PinContainer>
          </div>
        </div>
      </section>

      {/* Partner Logos Marquee */}
      <section className="border-y border-border bg-white">
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              What We Build
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-12">
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
          </div>
        </div>
      </section>

      {/* HiveLab Section */}
      <section className="relative overflow-hidden py-24 border-y border-border bg-gradient-to-br from-[#fff5d9] via-white to-white">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,_rgba(253,224,140,0.4),_transparent_60%)]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-12">
            <Badge variant="secondary" className="mb-4 text-primary border-primary/20">
              Flagship PCL Node
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              HiveLab — A Tera-X PCL Test Bed Node
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed mb-6">
              HiveLab, operated by Tera-X at Element Labs in Madison, WI, is a flagship PCL Node demonstrating how autonomous experimentation can safely serve a national research community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
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

            <Card className="p-6 bg-gradient-to-br from-primary/10 to-background">
              <p className="text-muted-foreground leading-relaxed mb-4">
                Every experiment runs inside a structured workflow: parameter sets, safety envelopes, metadata, models, and human approvals are all encoded and versioned.
              </p>
              <p className="text-xl font-semibold text-foreground">
                One portal → many domains → reproducible science.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Cloud-Accessible Labs */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why Cloud-Accessible Labs?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Scale</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Explore parameter spaces that would take months by hand. Run multi-dimensional sweeps, stress–measure–relax sequences, adaptive experiments, and long-term studies without constant supervision.
              </p>
            </Card>

            <Card className="p-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <LineChart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Reproducibility</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Every action—instrument setting, sample ID, firmware version, model assumptions—is captured in a structured metadata record. Experiments can be replayed, audited, and compared across nodes.
              </p>
            </Card>

            <Card className="p-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Safety</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Digital twins enforce validated safety envelopes, and humans approve any proposed step near a boundary. AI cannot issue direct instrument commands—only recommendations with uncertainty estimates.
              </p>
            </Card>

            <Card className="p-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Equitable Access</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                HiveLab brings advanced semiconductor, biological, and soft-materials instrumentation to R1s, PUIs, R2s, community colleges, national labs, and industry partners through the cloud.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Capabilities */}
      <section id="capabilities" className="py-24 bg-muted border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Key Capabilities
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
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
          </div>
        </div>
      </section>

      {/* Community & Workforce Development */}
      <section id="community" className="py-24 bg-muted border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Community & Workforce Development
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Tera-X partners with:
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {communityPartners.map((partner) => (
                <Card key={partner} className="p-4 border-border">
                  <p className="text-foreground font-medium">{partner}</p>
                </Card>
              ))}
            </div>
            <p className="text-muted-foreground leading-relaxed text-center">
              HiveLab trains technicians, undergraduates, graduate researchers, and industry professionals to work in cloud-connected, model-integrated laboratory environments.
            </p>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary/5 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Contact
          </h2>
          <p className="text-xl text-foreground font-medium mb-3">
            Tera-X LLC
          </p>
          <p className="text-lg text-muted-foreground mb-2">
            Cloud-Connected Autonomous Laboratories
          </p>
          <p className="text-lg text-muted-foreground mb-10">
            Madison, Wisconsin, USA
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="text-base">
              Request Access
            </Button>
            <Button size="lg" variant="outline" className="text-base">
              Partnership Inquiries
            </Button>
            <Button size="lg" variant="outline" className="text-base">
              Download Brief
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">T</span>
                </div>
                <span className="text-xl font-bold">Tera-X</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Cloud-connected autonomous laboratories for trustworthy science
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#platform" className="hover:text-foreground transition-colors">Overview</a></li>
                <li><a href="#capabilities" className="hover:text-foreground transition-colors">Capabilities</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">HiveLab</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Community</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#community" className="hover:text-foreground transition-colors">Partners</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Workforce Development</a></li>
                <li><a href="#governance" className="hover:text-foreground transition-colors">Governance</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Request Access</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Partnerships</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Tera-X LLC. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
