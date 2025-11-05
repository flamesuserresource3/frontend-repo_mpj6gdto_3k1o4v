import { useEffect, useState } from 'react'
import { Rocket, Key, Settings } from 'lucide-react'

export default function Header({ apiKey, setApiKey, backendUrl, setBackendUrl }) {
  const [showAdvanced, setShowAdvanced] = useState(false)

  useEffect(() => {
    const savedKey = localStorage.getItem('llm_api_key') || ''
    const savedUrl = localStorage.getItem('backend_url') || ''
    if (savedKey) setApiKey(savedKey)
    if (savedUrl) setBackendUrl(savedUrl)
  }, [setApiKey, setBackendUrl])

  const persist = (key, value) => {
    localStorage.setItem(key, value)
  }

  return (
    <header className="w-full sticky top-0 z-20 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 grid place-items-center text-white shadow">
            <Rocket className="h-5 w-5" />
          </div>
          <div>
            <div className="text-lg font-bold tracking-tight">Analytica Summarizer</div>
            <div className="text-xs text-gray-500">Your documents, distilled.</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border">
            <Key className="h-4 w-4 text-gray-500" />
            <input
              type="password"
              value={apiKey}
              onChange={(e) => {
                setApiKey(e.target.value)
                persist('llm_api_key', e.target.value)
              }}
              placeholder="Enter your API key"
              className="bg-transparent outline-none text-sm w-56"
            />
          </div>

          <button
            onClick={() => setShowAdvanced((s) => !s)}
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg border bg-white"
            aria-label="Advanced settings"
          >
            <Settings className="h-4 w-4" />
            Advanced
          </button>
        </div>
      </div>

      {showAdvanced && (
        <div className="border-t border-gray-200 bg-white/80">
          <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col md:flex-row gap-3 md:items-center">
            <label className="text-sm text-gray-600 min-w-40">Custom Backend URL</label>
            <input
              type="text"
              value={backendUrl}
              onChange={(e) => {
                setBackendUrl(e.target.value)
                persist('backend_url', e.target.value)
              }}
              placeholder="https://api.your-llm.com"
              className="w-full md:flex-1 bg-gray-50 border rounded-lg px-3 py-2 text-sm"
            />
            <div className="text-xs text-gray-500">
              Uses environment by default if left empty.
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
