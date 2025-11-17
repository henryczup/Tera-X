import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Beaker, Cloud, Cpu, LineChart, Lock, Zap } from 'lucide-react'

export default function HiveLabLanding() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">T</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold">Tera-X</span>
                  <span className="text-muted-foreground">|</span>
                  <span className="text-lg">HiveLab</span>
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
              <a href="#research" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Research
              </a>
              <a href="#docs" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Documentation
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
              <Button size="sm">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 relative">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 text-primary border-primary/20">
              Tera-X HiveLab • Cloud↔Laboratory Platform
            </Badge>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance">
              The autonomous laboratory platform for{" "}
              <span className="text-primary">advanced research</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto text-balance leading-relaxed">
              Tera-X delivers cloud-connected autonomous nodes for semiconductor testing, biological systems, and soft robotics. 
              Run experiments remotely with real-time digital twin integration.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="text-base">
                Request Access
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="text-base">
                View Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Autonomous Operation</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">100+</div>
              <div className="text-sm text-muted-foreground">Test Protocols</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">Real-time</div>
              <div className="text-sm text-muted-foreground">Digital Twins</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">Cloud</div>
              <div className="text-sm text-muted-foreground">Accessible</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="platform" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Complete laboratory automation
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tera-X HiveLab integrates cutting-edge hardware and software to deliver autonomous, cloud-connected research capabilities
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Cpu className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Semiconductor Testing</h3>
              <p className="text-muted-foreground leading-relaxed">
                Parametric characterization, reliability testing, and device analysis with automated probe stations
              </p>
            </Card>

            <Card className="p-6 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Beaker className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Biological Systems</h3>
              <p className="text-muted-foreground leading-relaxed">
                Yeast growth analysis, cell culture monitoring, and biochemical assays in controlled environments
              </p>
            </Card>

            <Card className="p-6 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Soft Robotics</h3>
              <p className="text-muted-foreground leading-relaxed">
                Pneumatic actuation testing, material characterization, and performance evaluation
              </p>
            </Card>

            <Card className="p-6 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Cloud className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Cloud Integration</h3>
              <p className="text-muted-foreground leading-relaxed">
                Access your laboratory from anywhere with secure cloud connectivity and real-time monitoring
              </p>
            </Card>

            <Card className="p-6 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <LineChart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Digital Twins</h3>
              <p className="text-muted-foreground leading-relaxed">
                Real-time virtual replicas of physical systems with predictive analytics and simulation
              </p>
            </Card>

            <Card className="p-6 hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Access</h3>
              <p className="text-muted-foreground leading-relaxed">
                Enterprise-grade security with role-based access control and encrypted data transmission
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="capabilities" className="py-24 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4 text-primary border-primary/20">
                Advanced Technology
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Built for researchers, by researchers
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Tera-X HiveLab combines state-of-the-art hardware with intelligent software to create a seamless research experience. 
                Our platform handles the complexity so you can focus on discovery.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Autonomous Operation</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Run experiments 24/7 without human intervention using intelligent automation
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Multi-Domain Testing</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Single platform for electronics, biology, and robotics research
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Open Standards</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      RESTful APIs and standard protocols for easy integration
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border border-border p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-mono font-bold text-primary mb-4">↕</div>
                  <div className="text-2xl font-bold mb-2">Cloud↔Laboratory</div>
                  <p className="text-muted-foreground text-sm">
                    Seamless bidirectional communication
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section id="research" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Accelerating research across domains
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From academic institutions to industrial R&D, Tera-X HiveLab powers cutting-edge research
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 border-border">
              <div className="aspect-video rounded-md bg-gradient-to-br from-primary/20 to-primary/5 mb-4 flex items-center justify-center">
                <Cpu className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Device Characterization</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Automated I-V curves, C-V measurements, and reliability testing for semiconductor devices
              </p>
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                Learn more <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </Card>

            <Card className="p-6 border-border">
              <div className="aspect-video rounded-md bg-gradient-to-br from-primary/20 to-primary/5 mb-4 flex items-center justify-center">
                <Beaker className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Biomass Monitoring</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Real-time optical density measurements for yeast and bacterial culture optimization
              </p>
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                Learn more <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </Card>

            <Card className="p-6 border-border">
              <div className="aspect-video rounded-md bg-gradient-to-br from-primary/20 to-primary/5 mb-4 flex items-center justify-center">
                <Zap className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Actuator Testing</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                Pressure response characterization and performance evaluation for soft robotic systems
              </p>
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                Learn more <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary/10 to-background border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to transform your research?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join leading institutions using Tera-X HiveLab to accelerate discovery and innovation
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="text-base">
              Request Access
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="text-base">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">T</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold">Tera-X</span>
                  <span className="text-muted-foreground text-sm">|</span>
                  <span className="text-lg">HiveLab</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Autonomous cloud-connected laboratory platform for advanced research
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Overview</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Capabilities</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Tutorials</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Research</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Partners</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Tera-X. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
