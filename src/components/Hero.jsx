import Spline from '@splinetool/react-spline'
import { Rocket, ShieldCheck, Sparkles } from 'lucide-react'

export default function Hero({ onPrimary }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_20%_0%,#c7d2fe33,transparent),radial-gradient(60%_60%_at_100%_40%,#f5d0fe33,transparent)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 pt-10 pb-14 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-gray-600 bg-white/70 backdrop-blur">
            <ShieldCheck className="h-3.5 w-3.5 text-indigo-600" /> No data stored — your content stays yours
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Concise, analytical summaries
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-fuchsia-600">from any text, file, or image</span>
          </h1>

          <p className="text-gray-600 max-w-xl">
            Paste content or drop files. Pick tone, length, and language. Get an executive-ready brief in seconds.
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={onPrimary}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm"
            >
              <Sparkles className="h-4 w-4" /> Try it now
            </button>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border bg-white hover:bg-gray-50 text-gray-700"
            >
              <Rocket className="h-4 w-4 text-indigo-600" /> How it works
            </a>
          </div>

          <div className="flex items-center gap-4 text-xs text-gray-500 pt-2">
            <div className="flex -space-x-2">
              <span className="h-6 w-6 rounded-full bg-indigo-200 border" />
              <span className="h-6 w-6 rounded-full bg-fuchsia-200 border" />
              <span className="h-6 w-6 rounded-full bg-emerald-200 border" />
            </div>
            Trusted by teams summarizing reports, research, and meeting notes.
          </div>
        </div>

        <div className="relative h-[340px] sm:h-[420px] lg:h-[520px]">
          <div className="absolute inset-0 rounded-3xl overflow-hidden border bg-white/50">
            <Spline scene="https://prod.spline.design/VJLoxp84lCdVfdZu/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  )
}
