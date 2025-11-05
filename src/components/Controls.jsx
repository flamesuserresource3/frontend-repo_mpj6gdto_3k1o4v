import { useState } from 'react'
import { Settings, Sparkles } from 'lucide-react'

export default function Controls({ onGenerate, loading }) {
  const [tone, setTone] = useState('analytical')
  const [length, setLength] = useState('short')
  const [bullets, setBullets] = useState(true)
  const [language, setLanguage] = useState('en')

  const handleGenerate = () => {
    onGenerate({ tone, length, bullets, language })
  }

  return (
    <section className="bg-white/80 backdrop-blur rounded-2xl border p-4 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2">
          <Settings className="h-5 w-5 text-indigo-600" />
          Output controls
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="text-xs text-gray-500">Tone</label>
          <select value={tone} onChange={(e) => setTone(e.target.value)} className="mt-1 w-full border rounded-lg px-3 py-2 text-sm bg-white">
            <option value="analytical">Analytical</option>
            <option value="executive">Executive</option>
            <option value="neutral">Neutral</option>
            <option value="technical">Technical</option>
          </select>
        </div>

        <div>
          <label className="text-xs text-gray-500">Length</label>
          <select value={length} onChange={(e) => setLength(e.target.value)} className="mt-1 w-full border rounded-lg px-3 py-2 text-sm bg-white">
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="detailed">Detailed</option>
          </select>
        </div>

        <div>
          <label className="text-xs text-gray-500">Language</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)} className="mt-1 w-full border rounded-lg px-3 py-2 text-sm bg-white">
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="de">German</option>
            <option value="fr">French</option>
          </select>
        </div>

        <div className="flex items-end">
          <label className="inline-flex items-center gap-2 text-sm mt-6">
            <input type="checkbox" checked={bullets} onChange={(e) => setBullets(e.target.checked)} />
            Use bullet points
          </label>
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={handleGenerate}
          disabled={loading}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-medium ${loading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'}`}
        >
          <Sparkles className="h-4 w-4" />
          {loading ? 'Generating…' : 'Generate Summary'}
        </button>
      </div>
    </section>
  )
}
