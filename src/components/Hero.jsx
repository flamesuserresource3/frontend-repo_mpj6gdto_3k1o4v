import Spline from '@splinetool/react-spline'
import { Rocket, ShieldCheck, Sparkles } from 'lucide-react'

export default function Hero({ onPrimary }) {
  return (
    <section className="relative h-[80vh] lg:h-[88vh] overflow-hidden">
      {/* Spline cover background */}
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/cEecEwR6Ehj4iT8T/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Atmospheric overlays: vignettes + vertical gradient, non-blocking */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/70" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_20%_10%,rgba(255,120,60,0.20),transparent),radial-gradient(50%_40%_at_80%_20%,rgba(255,60,0,0.10),transparent)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 h-full flex items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs text-gray-200/90 bg-white/5 backdrop-blur">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> No data stored — your content stays yours
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
            Summaries for builders
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-fuchsia-500">fast, focused, and executive-ready</span>
          </h1>

          <p className="text-gray-300/90 max-w-xl">
            Drop text, files, or images. Choose tone, length, and language. Generate sharp briefs in seconds.
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={onPrimary}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-400 hover:to-red-500 shadow-sm shadow-red-500/20"
            >
              <Sparkles className="h-4 w-4" /> Try it now
            </button>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white/90"
            >
              <Rocket className="h-4 w-4 text-orange-400" /> How it works
            </a>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-300/80 pt-2">
            <div className="flex -space-x-2">
              <span className="h-6 w-6 rounded-full bg-orange-400/40 border border-white/20" />
              <span className="h-6 w-6 rounded-full bg-red-500/40 border border-white/20" />
              <span className="h-6 w-6 rounded-full bg-fuchsia-500/40 border border-white/20" />
            </div>
            Trusted by teams summarizing reports, research, and meeting notes.
          </div>
        </div>
      </div>
    </section>
  )
}
