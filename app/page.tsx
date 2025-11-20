"use client"

import Image from "next/image"
import { Menu, FlaskConical, Shield, Database, Repeat, Search, CheckCircle2, Cpu, Cloud, Brain, Zap, Microscope, Layers, X, CircuitBoard, Beaker, Gauge, Network, PlayCircle, GraduationCap, Users, BookOpen, Briefcase } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { EmailWaitlistForm } from "@/components/email-waitlist-form"
import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"

function NetworkVisualization() {
  const [glowingLines, setGlowingLines] = useState<Array<{id: number, type: 'horizontal' | 'vertical', lineIndex: number, duration: number, delay: number, yPos?: number, xPos?: number}>>([])
  const svgRef = useRef<SVGSVGElement>(null)
  const orangeLineRefs = useRef<Map<number, SVGPathElement>>(new Map())
  const gridLineRefs = useRef<Map<string, SVGPathElement>>(new Map())

  // Generate random glowing lines on grid - DISABLED: orange lines only appear on button click
  useEffect(() => {
    // Disable automatic glowing lines - orange lines only appear on deploy button click
    setGlowingLines([])
  }, [])

  // Animate all orange lines with GSAP - loops continuously
  useEffect(() => {
    const orangeLines = Array.from(orangeLineRefs.current.entries())
    
    orangeLines.forEach(([index, path]) => {
      if (path) {
        // Wait for path to be rendered
        requestAnimationFrame(() => {
          const fullPathLength = path.getTotalLength()
          
          if (fullPathLength === 0 || !isFinite(fullPathLength)) {
            console.warn(`Orange line ${index} has invalid length:`, fullPathLength)
            return
          }
          
          // Random end point between 50% and 90% of the path
          const endRatio = 0.5 + Math.random() * 0.4
          const endPathLength = fullPathLength * endRatio
          
          // Set initial state - line is fully hidden
          // Use strokeDasharray with the visible length, and strokeDashoffset to hide it initially
          gsap.set(path, {
            strokeDasharray: endPathLength,
            strokeDashoffset: endPathLength,
            opacity: 1
          })
          
          // Random delay for each line to create staggered effect
          const delay = index * 0.2 + Math.random() * 0.3
          
          // Create timeline that loops infinitely
          const tl = gsap.timeline({ repeat: -1 })
          
          // Animate the line drawing to the random end point
          tl.to(path, {
            strokeDashoffset: 0,
            duration: 2,
            ease: "power2.inOut",
            delay: delay
          })
          // Pause at the end point
          .to({}, { duration: 1 })
          // Reset back to start
          .set(path, {
            strokeDashoffset: endPathLength
          })
          .to({}, { duration: 0.3 })
        })
      }
    })
  }, [])

  // Animate grid lines with random movement
  useEffect(() => {
    const lines = Array.from(gridLineRefs.current.values())
    
    lines.forEach((line) => {
      if (line) {
        // Random delay between 0 and 2 seconds
        const delay = Math.random() * 2
        // Random duration between 3 and 6 seconds
        const duration = 3 + Math.random() * 3
        // Random movement amount (small subtle movement)
        const moveX = (Math.random() - 0.5) * 4
        const moveY = (Math.random() - 0.5) * 4
        
        // Create random animation for each line
        gsap.to(line, {
          x: moveX,
          y: moveY,
          duration: duration,
          delay: delay,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        })
      }
    })
    
    return () => {
      // Cleanup animations on unmount
      lines.forEach(line => {
        if (line) {
          gsap.killTweensOf(line)
        }
      })
    }
  }, [])

  return (
    <div className="relative w-full h-96 mt-20">
      {/* Globe grid background */}
      <div className="absolute inset-0 opacity-40">
        <svg 
          ref={svgRef}
          className="w-full h-full" 
          viewBox="0 0 800 400" 
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--tera-accent)" stopOpacity="0" />
              <stop offset="50%" stopColor="var(--tera-accent)" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--tera-accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {(() => {
            const centerX = 400
            const centerY = 250
            const radiusX = 300
            const radiusY = 200
            const numVertical = 13
            const numHorizontal = 7
            
            const lines: React.ReactElement[] = []
            const poleY = centerY - radiusY

            // Horizontal latitude lines
            for (let i = 1; i < numHorizontal; i++) {
              const latRatio = i / numHorizontal
              const y = poleY + (latRatio * radiusY * 2)
              const angle = Math.asin((y - centerY) / radiusY)
              const xWidth = radiusX * Math.cos(angle)
              
              if (xWidth > 0) {
                const pathD = `M ${centerX - xWidth},${y} A ${xWidth},${xWidth * 0.2} 0 0,0 ${centerX + xWidth},${y}`
                const isGlowing = glowingLines.some(line => 
                  line.type === 'horizontal' && Math.abs((line.yPos || 0) - y) < 20
                )
                
                const lineKey = `lat-${i}`
                lines.push(
                  <g key={lineKey}>
                    <path
                      ref={(el) => { if (el) gridLineRefs.current.set(lineKey, el) }}
                      d={pathD}
                      fill="none"
                      stroke="var(--border)"
                      strokeWidth="1.5"
                      opacity={1}
                    />
                    {isGlowing && (
                      <path
                        className="glow-line"
                        d={pathD}
                        fill="none"
                        stroke="url(#glowGradient)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        style={{
                          filter: 'drop-shadow(0 0 6px var(--tera-accent))'
                        }}
                      />
                    )}
                  </g>
                )
              }
            }

            // Vertical longitude lines - show every other line
            for (let i = 0; i < numVertical; i++) {
              // Skip every other line (show only even indices: 0, 2, 4, 6, 8, 10, 12)
              if (i % 2 !== 0) continue
              
              const lonRatio = (i / (numVertical - 1))
              const lonAngle = (lonRatio - 0.5) * Math.PI
              const points: string[] = []
              
              for (let j = 0; j <= 20; j++) {
                const latRatio = j / 20
                const latAngle = (latRatio - 0.5) * Math.PI
                const x = centerX + radiusX * Math.cos(latAngle) * Math.sin(lonAngle)
                const y = centerY + radiusY * Math.sin(latAngle)
                points.push(`${x.toFixed(2)},${y.toFixed(2)}`)
              }
              
              const pathD = `M ${points.join(' L ')}`
              const isGlowing = glowingLines.some(line => 
                line.type === 'vertical' && Math.abs((line.xPos || 0) - (100 + i * 50)) < 30
              )
              
              const lineKey = `lon-${i}`
              lines.push(
                <g key={lineKey}>
                  <path
                    ref={(el) => { if (el) gridLineRefs.current.set(lineKey, el) }}
                    d={pathD}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.6)"
                    strokeWidth="1.5"
                    opacity={1}
                  />
                  {isGlowing && (
                    <path
                      className="glow-line"
                      d={pathD}
                      fill="none"
                      stroke="url(#glowGradient)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      style={{
                        filter: 'drop-shadow(0 0 6px rgba(249, 115, 22, 0.8))'
                      }}
                    />
                  )}
                </g>
              )
            }
            
            return lines
          })()}
          
          {/* Orange lines from north pole following all vertical grid lines */}
          {(() => {
            const centerX = 400
            const centerY = 250
            const radiusX = 300
            const radiusY = 200
            const poleY = centerY - radiusY
            const numVertical = 13
            const orangeLines: React.ReactElement[] = []
            
            // Create orange line for each visible vertical grid line (every other one)
            for (let i = 0; i < numVertical; i++) {
              // Only create orange lines for visible gridlines (even indices)
              if (i % 2 !== 0) continue
              
              const lonRatio = i / (numVertical - 1)
              const lonAngle = (lonRatio - 0.5) * Math.PI
              
              // Create full path from north pole to bottom (will be truncated in animation)
              const points: string[] = []
              const startY = poleY
              const endY = centerY + radiusY * 0.9 // Full path to 90% down
              
              for (let j = 0; j <= 20; j++) {
                const latRatio = j / 20
                const y = startY + (latRatio * (endY - startY))
                const latAngle = Math.asin((y - centerY) / radiusY)
                const x = centerX + radiusX * Math.cos(latAngle) * Math.sin(lonAngle)
                points.push(`${x.toFixed(2)},${y.toFixed(2)}`)
              }
              
              const pathD = `M ${points.join(' L ')}`
              
              orangeLines.push(
                <g key={`orange-line-${i}`}>
                  <path
                    ref={(el) => { if (el) orangeLineRefs.current.set(i, el) }}
                    d={pathD}
                    fill="none"
                    stroke="var(--tera-accent)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    style={{
                      filter: 'drop-shadow(0 0 8px var(--tera-accent))'
                    }}
                  />
                </g>
              )
            }
            
            return orangeLines
          })()}
        </svg>
      </div>
    </div>
  )
}

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeWorkforceTab, setActiveWorkforceTab] = useState("technician")
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      const headerOffset = 80 // Fixed header height
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
    setMobileMenuOpen(false)
  }

  return (
    <div id="top" className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-[var(--tera-bg)]"></div>
      
      {/* Hero Section with Background */}
      <div className="relative min-h-screen overflow-hidden section-connector bg-transparent">
        {/* Dark overlay outside the box - top (between vertical lines) */}
        <div 
          className="absolute pointer-events-none"
          style={{ 
            top: 0,
            left: 'max(1.5rem, calc((100% - 75rem) / 2))',
            right: 'max(1.5rem, calc((100% - 75rem) / 2))',
            height: 'calc(20vh - 0.5rem)',
            background: 'rgba(0, 0, 0, 0.3)',
            zIndex: 15
          }}
        ></div>
        {/* Dark overlay outside the box - left side */}
        <div 
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{ 
            left: 0,
            right: 'calc(100% - max(1.5rem, calc((100% - 75rem) / 2)))',
            background: 'rgba(0, 0, 0, 0.3)',
            zIndex: 15
          }}
        ></div>
        {/* Dark overlay outside the box - right side */}
        <div 
          className="absolute top-0 bottom-0 pointer-events-none"
          style={{ 
            left: 'calc(100% - max(1.5rem, calc((100% - 75rem) / 2)))',
            right: 0,
            background: 'rgba(0, 0, 0, 0.3)',
            zIndex: 15
          }}
        ></div>
        <div 
          className="section-connector-line left-1" 
          style={{ 
            zIndex: 20,
            top: 'calc(20vh - 0.5rem)',
            height: 'calc(100% - 20vh + 0.5rem)'
          }}
        ></div>
        <div 
          className="section-connector-line right-1" 
          style={{ 
            zIndex: 20,
            top: 'calc(20vh - 0.5rem)',
            height: 'calc(100% - 20vh + 0.5rem)'
          }}
        ></div>
        {/* Horizontal separator line - full width like section separators - only visible when scrolled */}
        {scrolled && (
          <div 
            className="absolute top-16 lg:top-20 left-0 right-0 pointer-events-none"
            style={{ 
              height: '1px', 
              background: 'rgba(255, 255, 255, 0.2)',
              zIndex: 20
            }}
          ></div>
        )}
        {/* Horizontal line at shading cutoff - connects to vertical lines */}
        <div 
          className="absolute pointer-events-none"
          style={{ 
            height: '1px', 
            background: 'rgba(255, 255, 255, 0.2)',
            left: 'max(1.5rem, calc((100% - 75rem) / 2))',
            right: 'max(1.5rem, calc((100% - 75rem) / 2))',
            top: 'calc(20vh - 0.5rem)',
            zIndex: 21
          }}
        ></div>
          {/* Full-width background gradients and spotlight - Absolute (contained in hero section) */}
         <div className="absolute inset-0 z-[1] pointer-events-none">
           <svg
             className="absolute inset-0 w-full h-full hero-animation-svg"
             viewBox="0 0 1200 800"
             fill="none"
             xmlns="http://www.w3.org/2000/svg"
             preserveAspectRatio="none"
           >
            <defs>
              <radialGradient id="neonPulse1" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(255,255,255,1)" />
                <stop offset="30%" stopColor="rgba(251,146,60,1)" />
                <stop offset="70%" stopColor="rgba(249,115,22,0.8)" />
                <stop offset="100%" stopColor="rgba(249,115,22,0)" />
              </radialGradient>
              <radialGradient id="neonPulse2" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
                <stop offset="25%" stopColor="rgba(251,146,60,0.9)" />
                <stop offset="60%" stopColor="rgba(234,88,12,0.7)" />
                <stop offset="100%" stopColor="rgba(234,88,12,0)" />
              </radialGradient>
              <radialGradient id="neonPulse3" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(255,255,255,1)" />
                <stop offset="35%" stopColor="rgba(251,146,60,1)" />
                <stop offset="75%" stopColor="rgba(234,88,12,0.6)" />
                <stop offset="100%" stopColor="rgba(234,88,12,0)" />
              </radialGradient>
              {/* Adding hero text background gradients and filters */}
              <radialGradient id="heroTextBg" cx="0%" cy="20%" r="50%">
                <stop offset="0%" stopColor="rgba(249,115,22,1)" />
                <stop offset="10%" stopColor="rgba(251,146,60,0.7)" />
                <stop offset="25%" stopColor="rgba(234,88,12,0.3)" />
                <stop offset="45%" stopColor="rgba(234,88,12,0.08)" />
                <stop offset="70%" stopColor="rgba(0,0,0,0.1)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0.3)" />
              </radialGradient>
              <filter id="heroTextBlur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="20" result="blur" />
                <feTurbulence baseFrequency="0.7" numOctaves="4" result="noise" />
                <feColorMatrix in="noise" type="saturate" values="0" result="monoNoise" />
                <feComponentTransfer in="monoNoise" result="alphaAdjustedNoise">
                  <feFuncA type="discrete" tableValues="0.03 0.06 0.09 0.12" />
                </feComponentTransfer>
                <feComposite in="blur" in2="alphaAdjustedNoise" operator="multiply" result="noisyBlur" />
                <feMerge>
                  <feMergeNode in="noisyBlur" />
                </feMerge>
              </filter>
              <radialGradient id="backgroundFade1" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(249,115,22,0.15)" />
                <stop offset="50%" stopColor="rgba(249,115,22,0.15)" />
                <stop offset="100%" stopColor="rgba(249,115,22,0.15)" />
              </radialGradient>
              <radialGradient id="backgroundFade2" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(251,146,60,0.12)" />
                <stop offset="50%" stopColor="rgba(251,146,60,0.12)" />
                <stop offset="100%" stopColor="rgba(251,146,60,0.12)" />
              </radialGradient>
              <radialGradient id="backgroundFade3" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(234,88,12,0.18)" />
                <stop offset="50%" stopColor="rgba(234,88,12,0.18)" />
                <stop offset="100%" stopColor="rgba(234,88,12,0.18)" />
              </radialGradient>
              <linearGradient id="threadFade1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(0,0,0,1)" />
                <stop offset="15%" stopColor="rgba(249,115,22,0.8)" />
                <stop offset="85%" stopColor="rgba(249,115,22,0.8)" />
                <stop offset="100%" stopColor="rgba(0,0,0,1)" />
              </linearGradient>
              <linearGradient id="threadFade2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(0,0,0,1)" />
                <stop offset="12%" stopColor="rgba(251,146,60,0.7)" />
                <stop offset="88%" stopColor="rgba(251,146,60,0.7)" />
                <stop offset="100%" stopColor="rgba(0,0,0,1)" />
              </linearGradient>
              <linearGradient id="threadFade3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(0,0,0,1)" />
                <stop offset="18%" stopColor="rgba(234,88,12,0.8)" />
                <stop offset="82%" stopColor="rgba(234,88,12,0.8)" />
                <stop offset="100%" stopColor="rgba(0,0,0,1)" />
              </linearGradient>
              <filter id="backgroundBlur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feTurbulence baseFrequency="0.9" numOctaves="3" result="noise" />
                <feColorMatrix in="noise" type="saturate" values="0" result="monoNoise" />
                <feComponentTransfer in="monoNoise" result="alphaAdjustedNoise">
                  <feFuncA type="discrete" tableValues="0.05 0.1 0.15 0.2" />
                </feComponentTransfer>
                <feComposite in="blur" in2="alphaAdjustedNoise" operator="multiply" result="noisyBlur" />
                <feMerge>
                  <feMergeNode in="noisyBlur" />
                </feMerge>
              </filter>
              <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <g>
              {/* Spotlight glow for hero text - hugging left side */}
              <ellipse
                cx="200"
                cy="200"
                rx="1100"
                ry="280"
                fill="url(#heroTextBg)"
                filter="url(#heroTextBlur)"
                opacity="0.8"
              />
              <ellipse
                cx="150"
                cy="180"
                rx="1150"
                ry="320"
                fill="url(#heroTextBg)"
                filter="url(#heroTextBlur)"
                opacity="0.6"
              />
              </g>
            </svg>
          </div>

          {/* Constrained line animations - Absolute (contained in hero section) */}
         <div className="absolute inset-0 z-[2] flex justify-center pointer-events-none">
           <div className="relative w-full max-w-[75rem] px-6 lg:px-16 h-screen">
             <svg
               className="absolute inset-0 w-full h-full hero-animation-svg"
               viewBox="0 0 1200 800"
               fill="none"
               xmlns="http://www.w3.org/2000/svg"
               preserveAspectRatio="none"
             >
            <defs>
              <radialGradient id="neonPulse1" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(255,255,255,1)" />
                <stop offset="30%" stopColor="rgba(251,146,60,1)" />
                <stop offset="70%" stopColor="rgba(249,115,22,0.8)" />
                <stop offset="100%" stopColor="rgba(249,115,22,0)" />
              </radialGradient>
              <radialGradient id="neonPulse2" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
                <stop offset="25%" stopColor="rgba(251,146,60,0.9)" />
                <stop offset="60%" stopColor="rgba(234,88,12,0.7)" />
                <stop offset="100%" stopColor="rgba(234,88,12,0)" />
              </radialGradient>
              <radialGradient id="neonPulse3" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(255,255,255,1)" />
                <stop offset="35%" stopColor="rgba(251,146,60,1)" />
                <stop offset="75%" stopColor="rgba(234,88,12,0.6)" />
                <stop offset="100%" stopColor="rgba(234,88,12,0)" />
              </radialGradient>
              <linearGradient id="threadFade1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(0,0,0,1)" />
                <stop offset="15%" stopColor="rgba(249,115,22,0.8)" />
                <stop offset="85%" stopColor="rgba(249,115,22,0.8)" />
                <stop offset="100%" stopColor="rgba(0,0,0,1)" />
              </linearGradient>
              <linearGradient id="threadFade2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(0,0,0,1)" />
                <stop offset="12%" stopColor="rgba(251,146,60,0.7)" />
                <stop offset="88%" stopColor="rgba(251,146,60,0.7)" />
                <stop offset="100%" stopColor="rgba(0,0,0,1)" />
              </linearGradient>
              <linearGradient id="threadFade3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="rgba(0,0,0,1)" />
                <stop offset="18%" stopColor="rgba(234,88,12,0.8)" />
                <stop offset="82%" stopColor="rgba(234,88,12,0.8)" />
                <stop offset="100%" stopColor="rgba(0,0,0,1)" />
              </linearGradient>
              <filter id="backgroundBlur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feTurbulence baseFrequency="0.9" numOctaves="3" result="noise" />
                <feColorMatrix in="noise" type="saturate" values="0" result="monoNoise" />
                <feComponentTransfer in="monoNoise" result="alphaAdjustedNoise">
                  <feFuncA type="discrete" tableValues="0.05 0.1 0.15 0.2" />
                </feComponentTransfer>
                <feComposite in="blur" in2="alphaAdjustedNoise" operator="multiply" result="noisyBlur" />
                <feMerge>
                  <feMergeNode in="noisyBlur" />
                </feMerge>
              </filter>
              <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <g>
              {/* Thread 1 - Smooth S-curve from bottom-left to right */}
              <path
                id="thread1"
                d="M-100 720 Q200 590 350 540 Q500 490 650 520 Q800 550 950 460 Q1100 370 1200 340"
                stroke="url(#threadFade1)"
                strokeWidth="0.8"
                fill="none"
                opacity="0.8"
              />
              <circle r="2" fill="url(#neonPulse1)" opacity="1" filter="url(#neonGlow)">
                <animateMotion dur="16s" repeatCount="indefinite">
                  <mpath href="#thread1" />
                </animateMotion>
              </circle>

              {/* Thread 2 - Gentle wave flow */}
              <path
                id="thread2"
                d="M-120 730 Q250 620 400 570 Q550 520 700 550 Q850 580 1000 490 Q1150 400 1300 370"
                stroke="url(#threadFade2)"
                strokeWidth="1.5"
                fill="none"
                opacity="0.7"
              />
              <circle r="3" fill="url(#neonPulse2)" opacity="1" filter="url(#neonGlow)">
                <animateMotion dur="20s" repeatCount="indefinite">
                  <mpath href="#thread2" />
                </animateMotion>
              </circle>

              {/* Thread 3 - Organic curve */}
              <path
                id="thread3"
                d="M-150 710 Q180 580 320 530 Q460 480 600 510 Q740 540 880 450 Q1020 360 1200 330"
                stroke="url(#threadFade3)"
                strokeWidth="1.2"
                fill="none"
                opacity="0.8"
              />
              <circle r="2.5" fill="url(#neonPulse1)" opacity="1" filter="url(#neonGlow)">
                <animateMotion dur="18s" repeatCount="indefinite">
                  <mpath href="#thread3" />
                </animateMotion>
              </circle>

              {/* Thread 4 - Flowing curve */}
              <path
                id="thread4"
                d="M-80 740 Q280 640 450 590 Q620 540 770 570 Q920 600 1070 510 Q1220 420 1350 390"
                stroke="url(#threadFade1)"
                strokeWidth="0.6"
                fill="none"
                opacity="0.6"
              />
              <circle r="1.5" fill="url(#neonPulse3)" opacity="1" filter="url(#neonGlow)">
                <animateMotion dur="22s" repeatCount="indefinite">
                  <mpath href="#thread4" />
                </animateMotion>
              </circle>

              {/* Thread 5 - Natural wave */}
              <path
                id="thread5"
                d="M-130 725 Q220 600 380 550 Q540 500 680 530 Q820 560 960 470 Q1100 380 1280 350"
                stroke="url(#threadFade2)"
                strokeWidth="1.0"
                fill="none"
                opacity="0.7"
              />
              <circle r="2.2" fill="url(#neonPulse2)" opacity="1" filter="url(#neonGlow)">
                <animateMotion dur="16.8s" repeatCount="indefinite">
                  <mpath href="#thread5" />
                </animateMotion>
              </circle>

              {/* Thread 6 - Smooth flow */}
              <path
                id="thread6"
                d="M-50 735 Q300 660 480 610 Q660 560 800 590 Q940 620 1080 530 Q1220 440 1400 410"
                stroke="url(#threadFade3)"
                strokeWidth="1.3"
                fill="none"
                opacity="0.6"
              />
              <circle r="2.8" fill="url(#neonPulse1)" opacity="1" filter="url(#neonGlow)">
                <animateMotion dur="20.8s" repeatCount="indefinite">
                  <mpath href="#thread6" />
                </animateMotion>
              </circle>

              {/* Thread 7 - Organic S-curve */}
              <path
                id="thread7"
                d="M-140 715 Q190 585 340 535 Q490 485 630 515 Q770 545 910 455 Q1050 365 1250 335"
                stroke="url(#threadFade1)"
                strokeWidth="0.9"
                fill="none"
                opacity="0.8"
              />
              <circle r="2" fill="url(#neonPulse3)" opacity="1" filter="url(#neonGlow)">
                <animateMotion dur="19.2s" repeatCount="indefinite">
                  <mpath href="#thread7" />
                </animateMotion>
              </circle>

              {/* Thread 8 - Gentle wave */}
              <path
                id="thread8"
                d="M-100 728 Q260 630 420 580 Q580 530 720 560 Q860 590 1000 500 Q1140 410 1320 380"
                stroke="url(#threadFade2)"
                strokeWidth="1.4"
                fill="none"
                opacity="0.7"
              />
              <circle r="3" fill="url(#neonPulse2)" opacity="1" filter="url(#neonGlow)">
                <animateMotion dur="23.2s" repeatCount="indefinite">
                  <mpath href="#thread8" />
                </animateMotion>
              </circle>

              {/* Thread 9 - Thin flowing curve */}
              <path
                id="thread9"
                d="M-160 722 Q170 595 310 545 Q450 495 590 525 Q730 555 870 465 Q1010 375 1180 345"
                stroke="url(#threadFade3)"
                strokeWidth="0.5"
                fill="none"
                opacity="0.6"
              />
              <circle r="1.2" fill="url(#neonPulse1)" opacity="1" filter="url(#neonGlow)">
                <animateMotion dur="24s" repeatCount="indefinite">
                  <mpath href="#thread9" />
                </animateMotion>
              </circle>

              {/* Thread 10 - Medium thick wave */}
              <path
                id="thread10"
                d="M-110 732 Q240 625 390 575 Q540 525 680 555 Q820 585 960 495 Q1100 405 1300 375"
                stroke="url(#threadFade1)"
                strokeWidth="1.1"
                fill="none"
                opacity="0.8"
              />
              <circle r="2.5" fill="url(#neonPulse3)" opacity="1" filter="url(#neonGlow)">
                <animateMotion dur="17.2s" repeatCount="indefinite">
                  <mpath href="#thread10" />
                </animateMotion>
              </circle>

              {/* Thread 11 - Very thin thread */}
              <path
                id="thread11"
                d="M-130 727 Q210 605 360 555 Q510 505 650 535 Q790 565 930 475 Q1070 385 1260 355"
                stroke="url(#threadFade2)"
                strokeWidth="0.4"
                fill="none"
                opacity="0.5"
              />
              <circle r="1" fill="url(#neonPulse2)" opacity="1" filter="url(#neonGlow)">
                <animateMotion dur="22.8s" repeatCount="indefinite">
                  <mpath href="#thread11" />
                </animateMotion>
              </circle>

              {/* Thread 12 - Thick flowing line */}
              <path
                id="thread12"
                d="M-90 738 Q270 645 430 595 Q590 545 730 575 Q870 605 1010 515 Q1150 425 1380 395"
                stroke="url(#threadFade3)"
                strokeWidth="1.5"
                fill="none"
                opacity="0.7"
              />
              <circle r="3.2" fill="url(#neonPulse1)" opacity="1" filter="url(#neonGlow)">
                <animateMotion dur="18.8s" repeatCount="indefinite">
                  <mpath href="#thread12" />
                </animateMotion>
              </circle>

              {/* Thread 13 - Thin organic curve */}
              <path
                id="thread13"
                d="M-145 718 Q185 588 325 538 Q465 488 605 518 Q745 548 885 458 Q1025 368 1220 338"
                stroke="url(#threadFade1)"
                strokeWidth="0.7"
                fill="none"
                opacity="0.6"
              />
              <circle r="1.8" fill="url(#neonPulse3)" opacity="1" filter="url(#neonGlow)">
                <animateMotion dur="21.2s" repeatCount="indefinite">
                  <mpath href="#thread13" />
                </animateMotion>
              </circle>

              {/* Thread 14 - Medium wave */}
              <path
                id="thread14"
                d="M-70 721 Q290 630 460 580 Q630 530 770 560 Q910 590 1050 500 Q1190 410 1350 380"
                stroke="url(#threadFade2)"
                strokeWidth="1.0"
                fill="none"
                opacity="0.8"
              />
              <circle r="2.3" fill="url(#neonPulse2)" opacity="1" filter="url(#neonGlow)">
                <animateMotion dur="19.6s" repeatCount="indefinite">
                  <mpath href="#thread14" />
                </animateMotion>
              </circle>

              {/* Thread 15 - Very thin delicate line */}
              <path
                id="thread15"
                d="M-165 713 Q165 583 305 533 Q445 483 585 513 Q725 543 865 453 Q1005 363 1200 333"
                stroke="url(#threadFade3)"
                strokeWidth="0.3"
                fill="none"
                opacity="0.4"
              />
              <circle r="0.8" fill="url(#neonPulse1)" opacity="1" filter="url(#neonGlow)">
                <animateMotion dur="24.8s" repeatCount="indefinite">
                  <mpath href="#thread15" />
                </animateMotion>
              </circle>

              {/* Thread 16 - Thick prominent thread */}
              <path
                id="thread16"
                d="M-115 719 Q235 605 385 555 Q535 505 675 535 Q815 565 955 475 Q1095 385 1320 355"
                stroke="url(#threadFade1)"
                strokeWidth="1.5"
                fill="none"
                opacity="0.9"
              />
              <circle r="3.2" fill="url(#neonPulse2)" opacity="1" filter="url(#neonGlow)">
                <animateMotion dur="16.4s" repeatCount="indefinite">
                  <mpath href="#thread16" />
                </animateMotion>
              </circle>

              {/* Thread 17 */}
              <path
                id="thread17"
                d="M-100 720 Q180 660 320 620 Q460 580 600 600 Q740 620 880 560 Q1020 500 1200 340"
                stroke="url(#threadFade2)"
                strokeWidth="0.6"
                fill="none"
                opacity="0.5"
              />
              <circle r="1.5" fill="url(#neonPulse1)" opacity="1" filter="url(#neonGlow)">
                <animateMotion dur="20.4s" repeatCount="indefinite">
                  <mpath href="#thread17" />
                </animateMotion>
              </circle>

              {/* Thread 18 */}
              <path
                id="thread18"
                d="M-100 720 Q200 680 350 640 Q500 600 650 620 Q800 640 950 580 Q1100 520 1200 340"
                stroke="url(#threadFade3)"
                strokeWidth="1.2"
                fill="none"
                opacity="0.7"
              />
              <circle r="2.8" fill="url(#neonPulse2)" opacity="1" filter="url(#neonGlow)">
                <animateMotion dur="18.4s" repeatCount="indefinite">
                  <mpath href="#thread18" />
                </animateMotion>
              </circle>

              {/* Thread 19 */}
              <path
                id="thread19"
                d="M-100 720 Q160 670 280 630 Q400 590 540 610 Q680 630 820 570 Q960 510 1200 340"
                stroke="url(#threadFade1)"
                strokeWidth="0.8"
                fill="none"
                opacity="0.6"
              />
              <circle r="2" fill="url(#neonPulse3)" opacity="1" filter="url(#neonGlow)">
                <animateMotion dur="21.6s" repeatCount="indefinite">
                  <mpath href="#thread19" />
                </animateMotion>
              </circle>

              {/* Thread 20 */}
              <path
                id="thread20"
                d="M-100 720 Q220 690 380 650 Q540 610 680 630 Q820 650 960 590 Q1100 530 1200 340"
                stroke="url(#threadFade2)"
                strokeWidth="1.4"
                fill="none"
                opacity="0.8"
              />
              <circle r="3" fill="url(#neonPulse1)" opacity="1" filter="url(#neonGlow)">
                <animateMotion dur="17.6s" repeatCount="indefinite">
                  <mpath href="#thread20" />
                </animateMotion>
              </circle>

              {/* Thread 21 */}
              <path
                id="thread21"
                d="M-100 720 Q170 675 300 635 Q430 595 570 615 Q710 635 850 575 Q990 515 1200 340"
                stroke="url(#threadFade3)"
                strokeWidth="0.5"
                fill="none"
                opacity="0.4"
              />
              <circle r="1.2" fill="url(#neonPulse2)" opacity="1" filter="url(#neonGlow)">
                <animateMotion dur="23.6s" repeatCount="indefinite">
                  <mpath href="#thread21" />
                </animateMotion>
              </circle>

              {/* Thread 22 */}
              <path
                id="thread22"
                d="M-100 720 Q190 745 340 705 Q490 665 630 685 Q770 705 910 645 Q1050 585 1200 340"
                stroke="url(#threadFade1)"
                strokeWidth="1.1"
                fill="none"
                opacity="0.7"
              />
              <circle r="2.5" fill="url(#neonPulse3)" opacity="1" filter="url(#neonGlow)">
                <animateMotion dur="19.2s" repeatCount="indefinite">
                  <mpath href="#thread22" />
                </animateMotion>
              </circle>

              {/* Thread 23 */}
              <path
                id="thread23"
                d="M-100 720 Q150 725 270 685 Q390 645 530 665 Q670 685 810 625 Q950 565 1200 340"
                stroke="url(#threadFade2)"
                strokeWidth="0.9"
                fill="none"
                opacity="0.6"
              />
              <circle r="2.2" fill="url(#neonPulse1)" opacity="1" filter="url(#neonGlow)">
                <animateMotion dur="20.8s" repeatCount="indefinite">
                  <mpath href="#thread23" />
                </animateMotion>
              </circle>

              {/* Thread 24 */}
              <path
                id="thread24"
                d="M-100 720 Q210 755 370 715 Q530 675 670 695 Q810 715 950 655 Q1090 595 1200 340"
                stroke="url(#threadFade3)"
                strokeWidth="1.3"
                fill="none"
                opacity="0.8"
              />
              <circle r="2.9" fill="url(#neonPulse2)" opacity="1" filter="url(#neonGlow)">
                <animateMotion dur="16.8s" repeatCount="indefinite">
                  <mpath href="#thread24" />
                </animateMotion>
              </circle>

              {/* Thread 25 */}
              <path
                id="thread25"
                d="M-100 720 Q165 730 290 690 Q415 650 555 670 Q695 690 835 630 Q975 570 1200 340"
                stroke="url(#threadFade1)"
                strokeWidth="0.7"
                fill="none"
                opacity="0.5"
              />
              <circle r="1.8" fill="url(#neonPulse3)" opacity="1" filter="url(#neonGlow)">
                <animateMotion dur="22.4s" repeatCount="indefinite">
                  <mpath href="#thread25" />
                </animateMotion>
              </circle>

              {/* Thread 26 */}
              <path
                id="thread26"
                d="M-100 720 Q230 760 390 720 Q550 680 690 700 Q830 720 970 660 Q1110 600 1200 340"
                stroke="url(#threadFade2)"
                strokeWidth="1.0"
                fill="none"
                opacity="0.7"
              />
              <circle r="2.4" fill="url(#neonPulse1)" opacity="1" filter="url(#neonGlow)">
                <animateMotion dur="18.8s" repeatCount="indefinite">
                  <mpath href="#thread26" />
                </animateMotion>
              </circle>

              {/* Thread 27 */}
              <path
                id="thread27"
                d="M-100 720 Q175 740 310 700 Q445 660 585 680 Q725 700 865 640 Q1005 580 1200 340"
                stroke="url(#threadFade3)"
                strokeWidth="0.4"
                fill="none"
                opacity="0.4"
              />
              <circle r="1" fill="url(#neonPulse2)" opacity="1" filter="url(#neonGlow)">
                <animateMotion dur="24.4s" repeatCount="indefinite">
                  <mpath href="#thread27" />
                </animateMotion>
              </circle>

              {/* Thread 28 */}
              <path
                id="thread28"
                d="M-100 720 Q195 750 350 710 Q505 670 645 690 Q785 710 925 650 Q1065 590 1200 340"
                stroke="url(#threadFade1)"
                strokeWidth="1.5"
                fill="none"
                opacity="0.9"
              />
              <circle r="3.1" fill="url(#neonPulse3)" opacity="1" filter="url(#neonGlow)">
                <animateMotion dur="17.2s" repeatCount="indefinite">
                  <mpath href="#thread28" />
                </animateMotion>
              </circle>

              {/* Thread 29 */}
              <path
                id="thread29"
                d="M-100 720 Q155 735 285 695 Q415 655 555 675 Q695 695 835 635 Q975 575 1200 340"
                stroke="url(#threadFade2)"
                strokeWidth="0.8"
                fill="none"
                opacity="0.6"
              />
              <circle r="2" fill="url(#neonPulse1)" opacity="1" filter="url(#neonGlow)">
                <animateMotion dur="21.2s" repeatCount="indefinite">
                  <mpath href="#thread29" />
                </animateMotion>
              </circle>

              {/* Thread 30 */}
              <path
                id="thread30"
                d="M-100 720 Q215 765 375 725 Q535 685 675 705 Q815 725 955 665 Q1095 605 1200 340"
                stroke="url(#threadFade3)"
                strokeWidth="1.2"
                fill="none"
                opacity="0.8"
              />
              <circle r="2.7" fill="url(#neonPulse2)" opacity="1" filter="url(#neonGlow)">
                <animateMotion dur="18s" repeatCount="indefinite">
                  <mpath href="#thread30" />
                </animateMotion>
              </circle>

              {/* Thread 31 */}
              <path
                id="thread31"
                d="M-100 720 Q185 745 325 705 Q465 665 605 685 Q745 705 885 645 Q1025 585 1200 340"
                stroke="url(#threadFade1)"
                strokeWidth="0.6"
                fill="none"
                opacity="0.5"
              />
              <circle r="1.5" fill="url(#neonPulse3)" opacity="1" filter="url(#neonGlow)">
                <animateMotion dur="23.2s" repeatCount="indefinite">
                  <mpath href="#thread31" />
                </animateMotion>
              </circle>

              {/* Thread 32 */}
              <path
                id="thread32"
                d="M-100 720 Q205 755 365 715 Q525 675 665 695 Q805 715 945 655 Q1085 595 1200 340"
                stroke="url(#threadFade2)"
                strokeWidth="1.4"
                fill="none"
                opacity="0.8"
              />
              <circle r="3" fill="url(#neonPulse1)" opacity="1" filter="url(#neonGlow)">
                <animateMotion dur="16.4s" repeatCount="indefinite">
                  <mpath href="#thread32" />
                </animateMotion>
              </circle>

              {/* Thread 33 */}
              <path
                id="thread33"
                d="M-100 720 Q160 730 295 690 Q430 650 570 670 Q710 690 850 630 Q990 570 1200 340"
                stroke="url(#threadFade3)"
                strokeWidth="0.9"
                fill="none"
                opacity="0.6"
              />
              <circle r="2.1" fill="url(#neonPulse2)" opacity="1" filter="url(#neonGlow)">
                <animateMotion dur="20.4s" repeatCount="indefinite">
                  <mpath href="#thread33" />
                </animateMotion>
              </circle>

              {/* Thread 34 */}
              <path
                id="thread34"
                d="M-100 720 Q225 770 385 730 Q545 690 685 710 Q825 730 965 670 Q1105 610 1200 340"
                stroke="url(#threadFade1)"
                strokeWidth="1.1"
                fill="none"
                opacity="0.7"
              />
              <circle r="2.6" fill="url(#neonPulse3)" opacity="1" filter="url(#neonGlow)">
                <animateMotion dur="19.6s" repeatCount="indefinite">
                  <mpath href="#thread34" />
                </animateMotion>
              </circle>

              {/* Thread 35 */}
              <path
                id="thread35"
                d="M-100 720 Q170 740 305 700 Q440 660 580 680 Q720 700 860 640 Q1000 580 1200 340"
                stroke="url(#threadFade2)"
                strokeWidth="0.3"
                fill="none"
                opacity="0.4"
              />
              <circle r="0.8" fill="url(#neonPulse1)" opacity="1" filter="url(#neonGlow)">
                <animateMotion dur="25.2s" repeatCount="indefinite">
                  <mpath href="#thread35" />
                </animateMotion>
              </circle>

              {/* Thread 36 */}
              <path
                id="thread36"
                d="M-100 720 Q240 715 400 675 Q560 635 700 655 Q840 675 980 615 Q1120 555 1200 340"
                stroke="url(#threadFade3)"
                strokeWidth="1.5"
                fill="none"
                opacity="0.9"
              />
              <circle r="3.2" fill="url(#neonPulse2)" opacity="1" filter="url(#neonGlow)">
                <animateMotion dur="16s" repeatCount="indefinite">
                  <mpath href="#thread36" />
                </animateMotion>
              </circle>
              </g>
            </svg>
           </div>
         </div>

        <style jsx>{`
          @keyframes flow {
            0%, 100% {
              opacity: 0.3;
              stroke-dasharray: 0 100;
              stroke-dashoffset: 0;
            }
            50% {
              opacity: 0.8;
              stroke-dasharray: 50 50;
              stroke-dashoffset: -25;
            }
          }

          @keyframes pulse1 {
            0%, 100% { opacity: 0.4; transform: scale(0.8); }
            50% { opacity: 1; transform: scale(1.2); }
          }
          @keyframes pulse2 {
            0%, 100% { opacity: 0.3; transform: scale(0.9); }
            50% { opacity: 1; transform: scale(1.1); }
          }
          @keyframes pulse3 {
            0%, 100% { opacity: 0.5; transform: scale(0.7); }
            50% { opacity: 1; transform: scale(1.3); }
          }
        `}</style>

        {/* Header Navigation */}
        <header 
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled ? "border-b border-border backdrop-blur-md bg-[var(--tera-bg)]/80" : ""
          }`}
        >
          <div className="w-full flex items-center justify-between px-4 sm:px-4 lg:px-6 h-16 lg:h-20">
            <a 
              href="#top" 
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
              className="flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors"
            >
              <div className="relative h-8 sm:h-9 w-auto flex items-center">
                <Image
                  src="/logo/tera-x-logo-light-removebg-preview.png"
                  alt="Tera-X logo"
                  width={140}
                  height={32}
                  className="block dark:hidden h-full w-auto object-contain"
                  priority
                />
                <Image
                  src="/logo/tera-x-logo-dark.png"
                  alt="Tera-X logo"
                  width={140}
                  height={32}
                  className="hidden dark:block h-full w-auto object-contain"
                  priority
                />
              </div>
            </a>

            <nav className="hidden md:flex items-center space-x-1">
              <a 
                href="#capabilities" 
                onClick={(e) => handleNavClick(e, "capabilities")}
                className="px-4 py-2 text-foreground hover:text-foreground/80 transition-colors text-sm lg:text-base  hover:bg-accent/50"
              >
                Capabilities
              </a>
              <a 
                href="#science-drivers" 
                onClick={(e) => handleNavClick(e, "science-drivers")}
                className="px-4 py-2 text-foreground hover:text-foreground/80 transition-colors text-sm lg:text-base  hover:bg-accent/50"
              >
                Science Drivers
              </a>
              <a 
                href="#architecture" 
                onClick={(e) => handleNavClick(e, "architecture")}
                className="px-4 py-2 text-foreground hover:text-foreground/80 transition-colors text-sm lg:text-base  hover:bg-accent/50"
              >
                Architecture
              </a>
              <a 
                href="#workforce-development" 
                onClick={(e) => handleNavClick(e, "workforce-development")}
                className="px-4 py-2 text-foreground hover:text-foreground/80 transition-colors text-sm lg:text-base  hover:bg-accent/50"
              >
                Workforce
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <ThemeToggle />

              {/* Mobile menu button */}
              <button 
                className="md:hidden text-foreground p-2  hover:bg-white/10 transition-colors" 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </header>

        {mobileMenuOpen && (
          <div className={`md:hidden fixed top-16 lg:top-20 left-0 right-0 backdrop-blur-md border-b border-border z-40 shadow-xl transition-all duration-300 ${
            scrolled 
              ? "bg-transparent" 
              : "bg-[var(--tera-bg)]/95"
          }`}>
            <nav className="flex flex-col px-6 py-6 space-y-1">
              <a 
                href="#capabilities" 
                className="px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors " 
                onClick={(e) => handleNavClick(e, "capabilities")}
              >
                Capabilities
              </a>
              <a 
                href="#science-drivers" 
                className="px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors " 
                onClick={(e) => handleNavClick(e, "science-drivers")}
              >
                Science Drivers
              </a>
              <a 
                href="#architecture" 
                className="px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors " 
                onClick={(e) => handleNavClick(e, "architecture")}
              >
                Architecture
              </a>
              <a 
                href="#workforce-development" 
                className="px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors " 
                onClick={(e) => handleNavClick(e, "workforce-development")}
              >
                Workforce
              </a>
              <div className="pt-4 border-t border-border mt-4 flex items-center justify-between gap-4">
                <ThemeToggle />
                {/* <ShimmerButton className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5  text-sm font-medium shadow-lg w-full">
                  Contact Us
                </ShimmerButton> */}
              </div>
            </nav>
          </div>
        )}

        {/* Main Content */}
        <main className="relative z-10 flex flex-col items-center min-h-screen max-w-[75rem] mx-auto px-6 lg:px-16 pt-32 sm:pt-36 lg:pt-40">
          {/* Spotlight effect behind hero text */}
          <div 
            className="absolute pointer-events-none"
            style={{
              top: 'calc(20vh + 2rem)',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '100%',
              maxWidth: '90rem',
              height: '200px',
              background: 'radial-gradient(ellipse 80% 100% at 50% 50%, rgba(255, 107, 0, 0.25) 0%, rgba(255, 107, 0, 0.12) 30%, transparent 70%)',
              filter: 'blur(40px)',
              zIndex: 1
            }}
          />
          {/* Trial Badge - positioned below horizontal line, attached with no padding */}
            <div 
              className="absolute"
              style={{
                top: 'calc(20vh - 0.5rem)',
                marginTop: '1px'
              }}
            >
              <div className="inline-flex items-center bg-transparent backdrop-blur-sm border-x border-b border-border px-3 sm:px-4 py-2">
                <span className="text-foreground text-xs md:text-xs">Coming Soon.</span>
              </div>
            </div>
            <div className="h-16 sm:h-20"></div>


          <h1 className="text-foreground text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight mb-4 sm:mb-6 text-center mt-4 sm:mt-6">
           AI Accelerated Experimentation
          </h1>

          <p className="text-muted-foreground text-base sm:text-lg md:text-xl lg:text-2xl mb-8 sm:mb-10 max-w-2xl text-pretty leading-relaxed text-center">
          HiveLab: A Safe,  Programmable Cloud Laboratory.

          </p>

          <EmailWaitlistForm className="flex flex-col sm:flex-row gap-3 w-full max-w-md mb-6 sm:mb-8 mx-auto" />
        </main>
      </div>

      {/* Trusted by section */}
      <section className="relative z-10 py-16 lg:py-20 bg-[var(--tera-bg)] section-connector">
        <div className="section-connector-line left-1"></div>
        <div className="section-connector-line right-1"></div>
        <div
          className="absolute pointer-events-none"
          style={{
            height: "1px",
            background: "rgba(255, 255, 255, 0.2)",
            left: "max(1.5rem, calc((100% - 75rem) / 2))",
            right: "max(1.5rem, calc((100% - 75rem) / 2))",
            top: 0,
            zIndex: 21,
          }}
        ></div>
        <div className="max-w-[75rem] mx-auto">
          <div className="text-center mb-10 lg:mb-12 px-6 lg:px-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-foreground leading-tight tracking-tight mb-4">
              In collaboration with forward‑looking partners
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Teams advancing semiconductor reliability, biotechnology, and soft robotics on reproducible, model‑informed test beds.
            </p>
          </div>
          <div className="grid grid-cols-3 border border-border bg-transparent">
            {[{
              name: "UW–Madison CHIPS",
              src: "/logo/uw-madisoon_logo.png",
              href: "https://chips.wisc.edu/",
            },
            {
              name: "University Research Park / Element Labs",
              src: "/logo/universty_research_park_logo.png",
              href: "https://universityresearchpark.org/introducing-element-labs/",
            },
            {
              name: "UConn Soft Materials",
              src: "/logo/uconn_logo.png",
              href: "https://polymer.ims.uconn.edu/wang-research-group-video/",
            },
            {
              name: "Madison College",
              src: "/logo/madison_tech_logo.png",
              href: "https://madisoncollege.edu/",
            },
            {
              name: "Redwood EDA",
              src: "/logo/redwood_eda_logo-removebg-preview.png",
              href: "https://www.redwoodeda.com/",
            },
            {
              name: "Liquid Instruments",
              src: "/logo/liquid_inst_logo-removebg-preview.png",
              href: "https://liquidinstruments.com/",
            },
            {
              name: "Elephas",
              src: "/logo/elephas-logo.svg",
              href: "https://elephas.com/",
            },
            {
              name: "Unicorn Biotechnologies",
              src: "/logo/unicon_bio_logo.svg",
              href: "https://www.unicornb.io/",
            },
            {
              name: "Microsanj",
              src: "/logo/microsanj_logo-removebg-preview.png",
              href: "https://microsanj.com/",
            },
            ].map((logo) => (
              <a
                key={logo.src}
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center border border-border/50 bg-black/20 dark:bg-black px-6 py-6 sm:px-8 sm:py-8 hover:bg-accent/50 transition-colors"
              >
                <div
                  className="relative w-full flex items-center justify-center opacity-90"
                  style={{
                    maxWidth: logo.name === "Liquid Instruments" ? 340 : 240,
                    height: logo.name === "Liquid Instruments" ? 136 : 96,
                  }}
                >
                  <Image
                    src={logo.src}
                    alt={logo.name + " logo"}
                    fill
                    sizes="(min-width: 1024px) 140px, 33vw"
                    className="object-contain"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Network Visualization Section */}
      <section className="relative z-10 py-24 lg:py-32 bg-[var(--tera-bg)] section-connector">
        <div className="section-connector-line left-1"></div>
        <div className="section-connector-line right-1"></div>
        {/* Horizontal separator line - connects to vertical lines */}
        <div 
          className="absolute pointer-events-none"
          style={{ 
            height: '1px', 
            background: 'rgba(255, 255, 255, 0.2)',
            left: 'max(1.5rem, calc((100% - 75rem) / 2))',
            right: 'max(1.5rem, calc((100% - 75rem) / 2))',
            top: 0,
            zIndex: 21
          }}
        ></div>
        <div className="max-w-[75rem] mx-auto px-6 lg:px-16">
          {/* Header Text */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-normal text-foreground leading-tight tracking-tight mb-6">
              Utilize A Network of Nodes To Scale Your Experiments
            </h2>
            <p className="text-muted-foreground text-lg lg:text-xl max-w-2xl mx-auto mb-8">
              When you push code to HiveLab, we make it instantly available across our network of nodes.
            </p>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* <ShimmerButton background="var(--accent)" className="hover:bg-white/10 text-foreground dark:text-white px-6 py-3  font-medium border border-border">
                More about Infrastructure
              </ShimmerButton>
              <button className="bg-accent/50 backdrop-blur-sm border border-border text-foreground dark:text-white px-6 py-3  font-medium hover:bg-white/10 transition-all duration-300">
                Learn about Enterprise
              </button> */}
            </div>
          </div>

          {/* Network Visualization */}
          <NetworkVisualization />
        </div>
      </section>

      {/* Multi-Domain Section */}
      <section id="science-drivers" className="relative z-10 py-0 scroll-mt-20 section-connector">
        <div className="section-connector-line left-1"></div>
        <div className="section-connector-line right-1"></div>
        <div className="max-w-[75rem] mx-auto px-6 lg:px-16">
          <div className="border-t border-b border-border p-8 lg:p-12">
            <div className="max-w-3xl mb-16 bg-accent/50 backdrop-blur-sm border border-border/50  p-6 lg:p-8">
              <h2 className="text-4xl lg:text-5xl font-normal text-foreground leading-tight tracking-tight mb-8">
                Multi-Domain Science Drivers
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                HiveLab is explicitly multi-domain. It is not a narrowly scoped test stand, but rather a programmable environment where three science drivers intersect.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Science Driver 1 */}
              <div className="bg-accent/50 backdrop-blur-sm border border-border  p-8 hover:bg-white/10 transition-all duration-300 hover:border-orange-500/30 hover:-translate-y-1">
                <div className="w-12 h-12  bg-orange-500/10 flex items-center justify-center mb-6">
                  <Zap className="w-6 h-6 text-orange-400" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-foreground tracking-tight mb-4">
                  Semiconductor & Photonic Reliability
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Thermal and electrical reliability in semiconductor and photonic devices.
                </p>
              </div>
              {/* Science Driver 2 */}
              <div className="bg-accent/50 backdrop-blur-sm border border-border  p-8 hover:bg-white/10 transition-all duration-300 hover:border-orange-500/30 hover:-translate-y-1">
                <div className="w-12 h-12  bg-orange-500/10 flex items-center justify-center mb-6">
                  <Microscope className="w-6 h-6 text-orange-400" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-foreground tracking-tight mb-4">
                  Biological Systems
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Microenvironmental control and functional readouts in biological systems.
                </p>
              </div>
              {/* Science Driver 3 */}
              <div className="bg-accent/50 backdrop-blur-sm border border-border  p-8 hover:bg-white/10 transition-all duration-300 hover:border-orange-500/30 hover:-translate-y-1">
                <div className="w-12 h-12  bg-orange-500/10 flex items-center justify-center mb-6">
                  <Layers className="w-6 h-6 text-orange-400" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold text-foreground tracking-tight mb-4">
                  Soft Actuators & Materials
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Nonlinear behavior and failure envelopes in soft actuators and compliant materials.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Node Capabilities Section */}
      <section id="architecture" className="relative z-10 py-0 scroll-mt-20 section-connector">
        <div className="section-connector-line left-1"></div>
        <div className="section-connector-line right-1"></div>
        <div className="max-w-[75rem] mx-auto px-6 lg:px-16">
          <div className="border-t border-b border-border p-8 lg:p-12">
          <div className="max-w-3xl mb-16 bg-accent/50 backdrop-blur-sm border border-border/50  p-6 lg:p-8">
            <h2 className="text-4xl lg:text-5xl font-normal text-foreground leading-tight tracking-tight mb-8">
              Node Capabilities
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              HiveLab is designed to run many kinds of science experiments with both automation and human oversight. Everything works together as one system. It is not just a collection of tools. It is an environment where instruments, sensors, and software are coordinated so experiments are reliable, repeatable, and easy to control.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Capability 1: Semiconductor and Materials */}
            <div className="bg-accent/50 backdrop-blur-sm border border-border  p-8 hover:bg-white/10 transition-all duration-300 hover:border-orange-500/30 hover:-translate-y-1">
              <div className="w-12 h-12  bg-orange-500/10 flex items-center justify-center mb-6">
                <CircuitBoard className="w-6 h-6 text-orange-400" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-foreground tracking-tight mb-4">
                Semiconductor and Materials
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm mb-4">
                This part of HiveLab studies electronic materials and devices.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-muted-foreground text-xs">
                  <Zap className="w-3 h-3 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <span>Thermal cameras can measure very small temperature changes at tiny scales, smaller than a micron.</span>
                </div>
                <div className="flex items-start gap-2 text-muted-foreground text-xs">
                  <Search className="w-3 h-3 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <span>The system can test electronics using fast and programmable electrical signals.</span>
                </div>
                <div className="flex items-start gap-2 text-muted-foreground text-xs">
                  <Repeat className="w-3 h-3 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <span>It collects different types of data at the same time, such as electrical, thermal, and optical measurements.</span>
                </div>
                <div className="flex items-start gap-2 text-muted-foreground text-xs">
                  <Repeat className="w-3 h-3 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <span>It can quickly switch between stressing a device and letting it rest and recover.</span>
                </div>
              </div>
            </div>

            {/* Capability 2: Biotechnology */}
            <div className="bg-accent/50 backdrop-blur-sm border border-border  p-8 hover:bg-white/10 transition-all duration-300 hover:border-orange-500/30 hover:-translate-y-1">
              <div className="w-12 h-12  bg-orange-500/10 flex items-center justify-center mb-6">
                <Beaker className="w-6 h-6 text-orange-400" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-foreground tracking-tight mb-4">
                Biotechnology and Microenvironment Control
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm mb-4">
                This part supports biological experiments that require precise conditions.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-muted-foreground text-xs">
                  <Microscope className="w-3 h-3 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <span>It can control temperature, chemicals, light, fluids, and mechanical forces with high precision.</span>
                </div>
                <div className="flex items-start gap-2 text-muted-foreground text-xs">
                  <FlaskConical className="w-3 h-3 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <span>It works with microfluidic devices, controlled chambers, automated dispensers, and imaging systems.</span>
                </div>
                <div className="flex items-start gap-2 text-muted-foreground text-xs">
                  <CheckCircle2 className="w-3 h-3 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <span>Cameras and sensors can watch cells over time to see how they respond.</span>
                </div>
                <div className="flex items-start gap-2 text-muted-foreground text-xs">
                  <Repeat className="w-3 h-3 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <span>It can follow fixed protocols or adjust conditions in real time.</span>
                </div>
                <div className="flex items-start gap-2 text-muted-foreground text-xs">
                  <CheckCircle2 className="w-3 h-3 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <span>Built-in calibration keeps experiments consistent and repeatable.</span>
                </div>
              </div>
            </div>

            {/* Capability 3: Soft Materials */}
            <div className="bg-accent/50 backdrop-blur-sm border border-border  p-8 hover:bg-white/10 transition-all duration-300 hover:border-orange-500/30 hover:-translate-y-1">
              <div className="w-12 h-12  bg-orange-500/10 flex items-center justify-center mb-6">
                <Gauge className="w-6 h-6 text-orange-400" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-foreground tracking-tight mb-4">
                Soft Materials and Robotics
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm mb-4">
                This area studies flexible materials and soft robotic parts.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-muted-foreground text-xs">
                  <Layers className="w-3 h-3 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <span>Sensors, trackers, and high-speed cameras measure stretching, bending, damping, and wear.</span>
                </div>
                <div className="flex items-start gap-2 text-muted-foreground text-xs">
                  <Database className="w-3 h-3 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <span>Robotic tools can twist, pull, push, or apply repeated forces to materials.</span>
                </div>
                <div className="flex items-start gap-2 text-muted-foreground text-xs">
                  <Brain className="w-3 h-3 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <span>It can run many tests with different settings to understand how materials behave.</span>
                </div>
                <div className="flex items-start gap-2 text-muted-foreground text-xs">
                  <Database className="w-3 h-3 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <span>The data supports digital twin models that simulate material behavior.</span>
                </div>
                <div className="flex items-start gap-2 text-muted-foreground text-xs">
                  <Brain className="w-3 h-3 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <span>Machine learning helps identify patterns in how soft actuators perform.</span>
                </div>
              </div>
            </div>

            {/* Capability 4: FPGA Enhanced */}
            <div className="bg-accent/50 backdrop-blur-sm border border-border  p-8 hover:bg-white/10 transition-all duration-300 hover:border-orange-500/30 hover:-translate-y-1 md:col-span-2 lg:col-span-1">
              <div className="w-12 h-12  bg-orange-500/10 flex items-center justify-center mb-6">
                <Network className="w-6 h-6 text-orange-400" strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-semibold text-foreground tracking-tight mb-4">
                FPGA Enhanced Data Pathways
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm mb-4">
                FPGA devices are special computer chips placed near the sensors.
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2 text-muted-foreground text-xs">
                  <Cpu className="w-3 h-3 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <span>They clean and filter data before sending it to the cloud.</span>
                </div>
                <div className="flex items-start gap-2 text-muted-foreground text-xs">
                  <Zap className="w-3 h-3 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <span>They pick out important features and detect events in real time.</span>
                </div>
                <div className="flex items-start gap-2 text-muted-foreground text-xs">
                  <Cloud className="w-3 h-3 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <span>This reduces the amount of data that needs to be transmitted while keeping important details.</span>
                </div>
                <div className="flex items-start gap-2 text-muted-foreground text-xs">
                  <Zap className="w-3 h-3 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <span>It improves the speed of the workflow when network bandwidth is limited.</span>
                </div>
                <div className="flex items-start gap-2 text-muted-foreground text-xs">
                  <Cloud className="w-3 h-3 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                  <span>The FPGA programs can be updated from the cloud.</span>
                </div>
              </div>
            </div>

            {/* Capability 5: Autonomous Execution */}
            <div className="bg-accent/50 backdrop-blur-sm border border-border  p-8 hover:bg-white/10 transition-all duration-300 hover:border-orange-500/30 hover:-translate-y-1 md:col-span-2 lg:col-span-2">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12  bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                  <PlayCircle className="w-6 h-6 text-orange-400" strokeWidth={1.5} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground tracking-tight mb-4">
                    Autonomous and Semi Autonomous Experiment Execution
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm mb-6">
                    HiveLab can run experiments on its own or with human control.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-accent/50  p-4 border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <Repeat className="w-4 h-4 text-orange-400" strokeWidth={1.5} />
                        <span className="text-foreground text-sm font-semibold">Autonomous Mode</span>
                      </div>
                      <p className="text-muted-foreground text-xs leading-relaxed mb-2">
                        The system can automatically handle tasks such as:
                      </p>
                      <ul className="text-muted-foreground text-xs leading-relaxed space-y-1 list-disc list-inside">
                        <li>Calibrating equipment</li>
                        <li>Running long term stability tests</li>
                        <li>Performing high throughput scans</li>
                        <li>Adjusting experiments based on results</li>
                      </ul>
                    </div>
                    <div className="bg-accent/50  p-4 border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-4 h-4 text-orange-400" strokeWidth={1.5} />
                        <span className="text-foreground text-sm font-semibold">Semi Autonomous Mode</span>
                      </div>
                      <p className="text-muted-foreground text-xs leading-relaxed mb-2">
                        Humans stay involved in key decisions. They can:
                      </p>
                      <ul className="text-muted-foreground text-xs leading-relaxed space-y-1 list-disc list-inside">
                        <li>Approve changes</li>
                        <li>Adjust experimental parameters</li>
                        <li>Pause or stop experiments when necessary</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>


      {/* Workforce Development Section */}
      <section id="workforce-development" className="relative z-10 py-0 scroll-mt-20 section-connector">
        <div className="section-connector-line left-1"></div>
        <div className="section-connector-line right-1"></div>
        <div className="max-w-[75rem] mx-auto px-6 lg:px-16">
          <div className="border-t border-b border-border p-8 lg:p-12">
            <div className="max-w-3xl mb-16 bg-accent/50 backdrop-blur-sm border border-border/50  p-6 lg:p-8">
              <h2 className="text-4xl lg:text-5xl font-normal text-foreground leading-tight tracking-tight mb-8">
                Workforce Development
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Workforce development is a defining strength of HiveLab because it integrates professional, academic, and technical training across multiple institutions.
              </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
              <div className="lg:w-1/2">
                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => setActiveWorkforceTab("technician")}
                    className={`text-left group px-4 py-3  transition-all duration-300 border ${
                      activeWorkforceTab === "technician"
                        ? "bg-orange-500/10 border-orange-500/30"
                        : "hover:bg-accent/50 border-border"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10  flex items-center justify-center ${
                        activeWorkforceTab === "technician"
                          ? "bg-orange-500/20"
                          : "bg-accent/50"
                      }`}>
                        <Users className={`w-5 h-5 ${
                          activeWorkforceTab === "technician"
                            ? "text-orange-400"
                            : "text-muted-foreground"
                        }`} strokeWidth={1.5} />
                      </div>
                      <h3 className={`text-xl font-semibold ${
                        activeWorkforceTab === "technician"
                          ? "text-foreground"
                          : "text-muted-foreground group-hover:text-foreground"
                      }`}>
                        Technician Pipeline
                      </h3>
                    </div>
                    <p className={`text-sm leading-relaxed ${
                      activeWorkforceTab === "technician"
                        ? "text-muted-foreground"
                        : "text-muted-foreground"
                    }`}>
                      Through Madison College and MOSAIC
                    </p>
                  </button>

                  <button
                    onClick={() => setActiveWorkforceTab("undergraduate")}
                    className={`text-left group px-4 py-3  transition-all duration-300 border ${
                      activeWorkforceTab === "undergraduate"
                        ? "bg-orange-500/10 border-orange-500/30"
                        : "hover:bg-accent/50 border-border"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10  flex items-center justify-center ${
                        activeWorkforceTab === "undergraduate"
                          ? "bg-orange-500/20"
                          : "bg-accent/50"
                      }`}>
                        <BookOpen className={`w-5 h-5 ${
                          activeWorkforceTab === "undergraduate"
                            ? "text-orange-400"
                            : "text-muted-foreground"
                        }`} strokeWidth={1.5} />
                      </div>
                      <h3 className={`text-xl font-semibold ${
                        activeWorkforceTab === "undergraduate"
                          ? "text-foreground"
                          : "text-muted-foreground group-hover:text-foreground"
                      }`}>
                        Undergraduate Education
                      </h3>
                    </div>
                    <p className={`text-sm leading-relaxed ${
                      activeWorkforceTab === "undergraduate"
                        ? "text-muted-foreground"
                        : "text-muted-foreground"
                    }`}>
                      Workflow design, data interpretation, and digital twins
                    </p>
                  </button>

                  <button
                    onClick={() => setActiveWorkforceTab("graduate")}
                    className={`text-left group px-4 py-3  transition-all duration-300 border ${
                      activeWorkforceTab === "graduate"
                        ? "bg-orange-500/10 border-orange-500/30"
                        : "hover:bg-accent/50 border-border"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10  flex items-center justify-center ${
                        activeWorkforceTab === "graduate"
                          ? "bg-orange-500/20"
                          : "bg-accent/50"
                      }`}>
                        <GraduationCap className={`w-5 h-5 ${
                          activeWorkforceTab === "graduate"
                            ? "text-orange-400"
                            : "text-muted-foreground"
                        }`} strokeWidth={1.5} />
                      </div>
                      <h3 className={`text-xl font-semibold ${
                        activeWorkforceTab === "graduate"
                          ? "text-foreground"
                          : "text-muted-foreground group-hover:text-foreground"
                      }`}>
                        Graduate Training
                      </h3>
                    </div>
                    <p className={`text-sm leading-relaxed ${
                      activeWorkforceTab === "graduate"
                        ? "text-muted-foreground"
                        : "text-muted-foreground"
                    }`}>
                      Cross-institutional collaboration and high-throughput studies
                    </p>
                  </button>

                  <button
                    onClick={() => setActiveWorkforceTab("professional")}
                    className={`text-left group px-4 py-3  transition-all duration-300 border ${
                      activeWorkforceTab === "professional"
                        ? "bg-orange-500/10 border-orange-500/30"
                        : "hover:bg-accent/50 border-border"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10  flex items-center justify-center ${
                        activeWorkforceTab === "professional"
                          ? "bg-orange-500/20"
                          : "bg-accent/50"
                      }`}>
                        <Briefcase className={`w-5 h-5 ${
                          activeWorkforceTab === "professional"
                            ? "text-orange-400"
                            : "text-muted-foreground"
                        }`} strokeWidth={1.5} />
                      </div>
                      <h3 className={`text-xl font-semibold ${
                        activeWorkforceTab === "professional"
                          ? "text-foreground"
                          : "text-muted-foreground group-hover:text-foreground"
                      }`}>
                        Professional Development
                      </h3>
                    </div>
                    <p className={`text-sm leading-relaxed ${
                      activeWorkforceTab === "professional"
                        ? "text-muted-foreground"
                        : "text-muted-foreground"
                    }`}>
                      Workshops for scientists and engineers
                    </p>
                  </button>
                </div>
              </div>

              <div className="lg:w-1/2">
                <div className="bg-accent/50 backdrop-blur-sm border border-border  p-8 lg:p-10 min-h-[400px] relative">
                  {/* Technician Pipeline Content */}
                  <div className={`transition-all duration-300 ${
                    activeWorkforceTab === "technician" 
                      ? "opacity-100 relative z-10" 
                      : "opacity-0 absolute inset-0 z-0 pointer-events-none p-8 lg:p-10"
                  }`}>
                    <div className="w-12 h-12  bg-orange-500/10 flex items-center justify-center mb-6">
                      <Users className="w-6 h-6 text-orange-400" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-2xl font-semibold text-foreground tracking-tight mb-4">
                      Technician Pipeline through Madison College and MOSAIC
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      HiveLab is housed in Element Labs, which also houses the MOSAIC program. Students from Madison College learn on the same platforms that support national research workflows. This ensures that technician training aligns with actual industry practice, including automated test systems, microelectronics handling, biological workflows, and robotics.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Cpu className="w-4 h-4" strokeWidth={1.5} />
                        <span>Automated test systems</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <CircuitBoard className="w-4 h-4" strokeWidth={1.5} />
                        <span>Microelectronics handling</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Beaker className="w-4 h-4" strokeWidth={1.5} />
                        <span>Biological workflows</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Gauge className="w-4 h-4" strokeWidth={1.5} />
                        <span>Robotics</span>
                      </div>
                    </div>
                  </div>

                  {/* Undergraduate Education Content */}
                  <div className={`transition-all duration-300 ${
                    activeWorkforceTab === "undergraduate" 
                      ? "opacity-100 relative z-10" 
                      : "opacity-0 absolute inset-0 z-0 pointer-events-none p-8 lg:p-10"
                  }`}>
                    <div className="w-12 h-12  bg-orange-500/10 flex items-center justify-center mb-6">
                      <BookOpen className="w-6 h-6 text-orange-400" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-2xl font-semibold text-foreground tracking-tight mb-4">
                      Undergraduate Education
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      HiveLab supports undergraduate modules on workflow design, data interpretation, digital twins, hardware interfacing, and scientific reproducibility. Because the Node is accessible through the cloud, undergraduates can operate instruments safely and remotely while learning about automation and modeling.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Repeat className="w-4 h-4" strokeWidth={1.5} />
                        <span>Workflow design</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Database className="w-4 h-4" strokeWidth={1.5} />
                        <span>Data interpretation</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Layers className="w-4 h-4" strokeWidth={1.5} />
                        <span>Digital twins</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Cpu className="w-4 h-4" strokeWidth={1.5} />
                        <span>Hardware interfacing</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <CheckCircle2 className="w-4 h-4" strokeWidth={1.5} />
                        <span>Scientific reproducibility</span>
                      </div>
                    </div>
                  </div>

                  {/* Graduate Training Content */}
                  <div className={`transition-all duration-300 ${
                    activeWorkforceTab === "graduate" 
                      ? "opacity-100 relative z-10" 
                      : "opacity-0 absolute inset-0 z-0 pointer-events-none p-8 lg:p-10"
                  }`}>
                    <div className="w-12 h-12  bg-orange-500/10 flex items-center justify-center mb-6">
                      <GraduationCap className="w-6 h-6 text-orange-400" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-2xl font-semibold text-foreground tracking-tight mb-4">
                      Graduate Training and Cross-Institutional Collaboration
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      Graduate students from UW-Madison, UConn, and partner institutions will use HiveLab to conduct high throughput studies and perform model integrated experiments. This training prepares them to lead autonomous laboratory environments in industry or academia.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Zap className="w-4 h-4" strokeWidth={1.5} />
                        <span>High throughput studies</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Brain className="w-4 h-4" strokeWidth={1.5} />
                        <span>Model integrated experiments</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Network className="w-4 h-4" strokeWidth={1.5} />
                        <span>Cross-institutional collaboration</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <PlayCircle className="w-4 h-4" strokeWidth={1.5} />
                        <span>Autonomous laboratory leadership</span>
                      </div>
                    </div>
                  </div>

                  {/* Professional Development Content */}
                  <div className={`transition-all duration-300 ${
                    activeWorkforceTab === "professional" 
                      ? "opacity-100 relative z-10" 
                      : "opacity-0 absolute inset-0 z-0 pointer-events-none p-8 lg:p-10"
                  }`}>
                    <div className="w-12 h-12  bg-orange-500/10 flex items-center justify-center mb-6">
                      <Briefcase className="w-6 h-6 text-orange-400" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-2xl font-semibold text-foreground tracking-tight mb-4">
                      Professional Development for Scientists and Engineers
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      HiveLab hosts workshops on AI governance, metadata design, scientific communication, and reproducible automation. These learning opportunities are aligned with the national need for a workforce capable of building and operating trustworthy autonomous laboratories.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Brain className="w-4 h-4" strokeWidth={1.5} />
                        <span>AI governance</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Database className="w-4 h-4" strokeWidth={1.5} />
                        <span>Metadata design</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Search className="w-4 h-4" strokeWidth={1.5} />
                        <span>Scientific communication</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Repeat className="w-4 h-4" strokeWidth={1.5} />
                        <span>Reproducible automation</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Shield className="w-4 h-4" strokeWidth={1.5} />
                        <span>Trustworthy autonomous labs</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Capabilities Section */}
      <section id="capabilities" className="relative z-10 py-24 lg:py-32 scroll-mt-20 section-connector">
        <div className="section-connector-line left-1"></div>
        <div className="section-connector-line right-1"></div>
        <div className="max-w-[75rem] mx-auto px-6 lg:px-16 py-8 lg:py-12">
            <div className="max-w-3xl mb-16 bg-accent/50 backdrop-blur-sm border border-border/50  p-6 lg:p-8">
              <h2 className="text-4xl lg:text-5xl font-normal text-foreground leading-tight tracking-tight mb-8">
                Accessible to Every Researcher
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Any qualified researcher, regardless of institution type, can log into HiveLab, build a workflow around real, calibrated instruments, run it under a digital twin informed safety envelope, and walk away with high-quality, well-documented data that can be replayed, audited, and reproduced.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              {/* Use Case 1: Parameter Exploration */}
              <div className="bg-accent/50 backdrop-blur-sm border border-border  p-8 hover:bg-white/10 transition-all duration-300 hover:border-orange-500/30 hover:-translate-y-1">
                <h3 className="text-2xl font-semibold text-foreground tracking-tight mb-4">
                  Explore Parameter Spaces
                </h3>
                <div className="w-full h-[300px] mb-6 border border-border bg-card/60 relative ">
                  <Image
                    src="/ChatGPT Image Nov 18, 2025, 04_16_46 PM.png"
                    alt="3D parameter space visualization cube with sampled points"
                    fill
                    className="object-contain opacity-90 dark:hidden"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                  <Image
                    src="/ChatGPT Image Nov 18, 2025, 11_47_22 AM.png"
                    alt="3D parameter space visualization cube with sampled points"
                    fill
                    className="object-contain opacity-90 hidden dark:block"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  For some users, this may mean exploring parameter spaces that would take months, if ever, to scan manually. HiveLab enables rapid iteration across vast experimental landscapes, accelerating discovery through intelligent automation.
                </p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <FlaskConical className="w-4 h-4" strokeWidth={1.5} />
                    <span>Automated workflows</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Database className="w-4 h-4" strokeWidth={1.5} />
                    <span>High-throughput</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Repeat className="w-4 h-4" strokeWidth={1.5} />
                    <span>Reproducible</span>
                  </div>
                </div>
                <a href="#" className="inline-flex items-center justify-center px-5 h-9 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold tracking-wider  hover:from-orange-600 hover:to-orange-700 transition-all hover:-translate-y-0.5">
                  Learn More
                </a>
              </div>

              {/* Use Case 2: Critical Validation */}
              <div className="bg-accent/50 backdrop-blur-sm border border-border  p-8 hover:bg-white/10 transition-all duration-300 hover:border-orange-500/30 hover:-translate-y-1">
                <h3 className="text-2xl font-semibold text-foreground tracking-tight mb-4">
                  Validate Critical Experiments
                </h3>
                <div className="w-full h-[300px] mb-6 border border-border bg-card/60 relative overflow-hidden">
                  <Image
                    src="/ChatGPT Image Nov 18, 2025, 04_19_18 PM.png"
                    alt="Safety envelope visualization with shield and validated configurations"
                    fill
                    className="object-contain opacity-90 dark:hidden"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                  <Image
                    src="/ChatGPT Image Nov 18, 2025, 12_04_17 PM.png"
                    alt="Safety envelope visualization with shield and validated configurations"
                    fill
                    className="object-contain opacity-90 hidden dark:block"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  For others, it may mean validating a single critical experiment under conditions that must not be misconfigured, such as a thermal reliability test on a new power device or a live cell assay with precious biological material.
                </p>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Shield className="w-4 h-4" strokeWidth={1.5} />
                    <span>Safety envelope</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <CheckCircle2 className="w-4 h-4" strokeWidth={1.5} />
                    <span>Validated configs</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Database className="w-4 h-4" strokeWidth={1.5} />
                    <span>Audit trail</span>
                  </div>
                </div>
                <a href="#" className="inline-flex items-center justify-center px-5 h-9 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold tracking-wider uppercase  hover:from-orange-600 hover:to-orange-700 transition-all hover:-translate-y-0.5">
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom CTA Section */}
        <section className="relative z-10 py-16 lg:py-20 bg-[var(--tera-bg)] section-connector">
          <div className="section-connector-line left-1"></div>
          <div className="section-connector-line right-1"></div>
          <div className="max-w-[75rem] mx-auto px-6 lg:px-16">
            <div className=" py-10 lg:py-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="max-w-xl">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground leading-tight tracking-tight mb-4">
                  Bring model-informed automation to your next experiment.
                </h2>
                <p className="text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed">
                  Share a problem you are working on in semiconductors, biotechnology, or soft robotics, and we will explore how HiveLab can host a safe, reproducible workflow around it.
                </p>
              </div>
              <EmailWaitlistForm className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto max-w-md" />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="relative z-10 border-t border-border bg-background">
          <div className="max-w-[75rem] mx-auto px-6 lg:px-16 py-6 lg:py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-muted-foreground">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
              <span className="text-muted-foreground font-medium">HiveLab</span>
              <span className="hidden sm:inline text-muted-foreground/50">•</span>
              <span>Programmable cloud laboratory for model-informed experimentation.</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-muted-foreground/50"> {new Date().getFullYear()} Tera-X.</span>
              <div className="hidden sm:flex items-center gap-4">
                <a href="#capabilities" className="hover:text-foreground transition-colors">Capabilities</a>
                <a href="#science-drivers" className="hover:text-foreground transition-colors">Science</a>
                <a href="#workforce-development" className="hover:text-foreground transition-colors">Workforce</a>
              </div>
            </div>
          </div>
        </footer>

      </div>
    )
  }
