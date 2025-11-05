import { useEffect, useMemo, useState } from 'react'
import { Rocket, Key, Settings, Lock } from 'lucide-react'

export default function Header({ apiKey, setApiKey, backendUrl, setBackendUrl }) {
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [showKeyUI, setShowKeyUI] = useState(true)

  // Determine if URL has ?admin=1 to force show owner controls
  const adminFromUrl = useMemo(() => {
    try {
      const params = new URLSearchParams(window.location.search)
      return params.get('admin') === '1'
    } catch {
      return false
    }
  }, [])

  useEffect(() => {
    const savedKey = localStorage.getItem('llm_api_key') || ''
    const savedUrl = localStorage.getItem('backend_url') || ''
    const hideUI = localStorage.getItem('hide_api_ui') === '1'

    if (savedKey) setApiKey(savedKey)
    if (savedUrl) setBackendUrl(savedUrl)

    // If owner passed ?admin=1, always reveal
    if (adminFromUrl) {
      setShowKeyUI(true)
      localStorage.setItem('hide_api_ui', '0')
    } else {
      setShowKeyUI(!hideUI)
    }
  }, [setApiKey, setBackendUrl, adminFromUrl])

  // Secret shortcut: Ctrl+Shift+A toggles visibility of key/settings UI
  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault()
        setShowKeyUI((prev) => {
          const next = !prev
          localStorage.setItem('hide_api_ui', next ? '0' : '1')
          return next
        })
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const persist = (key, value) => {
    localStorage.setItem(key, value)
  }

  const hideForUsers = () => {
    setShowKeyUI(false)
    localStorage.setItem('hide_api_ui', '1')
    setShowAdvanced(false)
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

        {showKeyUI ? (
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

            <button
              onClick={hideForUsers}
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg border bg-white"
              aria-label="Hide key input for users"
              title="Hide key input for users"
            >
              <Lock className="h-4 w-4" />
              Hide
            </button>
          </div>
        ) : (
          <div className="text-xs text-gray-400">&nbsp;</div>
        )}
      </div>

      {showKeyUI && showAdvanced && (
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
              Uses environment by default if left empty. Toggle with Ctrl+Shift+A to quickly hide/show owner settings.
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
