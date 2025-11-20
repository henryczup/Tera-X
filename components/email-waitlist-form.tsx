"use client"

import { useState } from "react"
import { ArrowRight, Loader2, Check, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface EmailWaitlistFormProps {
  className?: string
}

export function EmailWaitlistForm({ className }: EmailWaitlistFormProps) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    setMessage("")

    try {
      // TODO: Replace this URL with your Google Apps Script Web App URL
      // Follow this guide to create one: https://github.com/levinunnink/html-form-to-google-sheet
      const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwpm3-l95clCby4wKgSrmv4OGbdQR9aCsre6z6MZ4JTtyjRQ599M__kTHsrg3P1T0pw/exec"
      
      // We use FormData and no-cors mode for Google Apps Script
      const formData = new FormData()
      formData.append("email", email)
      formData.append("timestamp", new Date().toISOString())

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      })

      setStatus("success")
      setMessage("Thanks for joining!")
      setEmail("")
    } catch (error) {
      console.error("Error submitting email:", error)
      setStatus("error")
      setMessage("Something went wrong.")
    }
  }

  return (
    <div className="w-full">
      <form 
        className={cn("flex flex-col sm:flex-row gap-3 w-full max-w-md", className)}
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          disabled={status === "loading" || status === "success"}
          className="flex-1 bg-accent/50 backdrop-blur-sm border border-border px-4 sm:px-6 py-2.5 sm:py-3 text-foreground placeholder:text-muted-foreground/50 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          required
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className={cn(
            "group relative bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold flex items-center justify-center gap-2 backdrop-blur-sm border border-orange-400/30 shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0",
            status === "success" && "bg-green-600 from-green-600 to-green-700 hover:from-green-600 hover:to-green-700 border-green-500/30 shadow-green-500/25"
          )}
        >
          {status === "loading" ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
            </div>
          ) : status === "success" ? (
            <div className="absolute inset-0 flex items-center justify-center gap-2">
              Joined
              <Check className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          ) : null}

          {/* Invisible placeholder to maintain width */}
          <div className={cn("flex items-center gap-2", (status === "loading" || status === "success") && "opacity-0")}>
            Join the waiting list
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-rotate-12 transition-transform duration-300" />
          </div>
          
          {status !== "loading" && status !== "success" && (
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          )}
        </button>
      </form>
      
      {/* Feedback message */}
      {message && (
        <div className={cn(
          "mt-2 text-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-1",
          status === "success" ? "text-green-500" : "text-red-500"
        )}>
          {status === "success" ? (
            <Check className="w-3 h-3" />
          ) : (
            <AlertCircle className="w-3 h-3" />
          )}
          {message}
        </div>
      )}
    </div>
  )
}
