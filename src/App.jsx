import { useMemo, useState } from 'react'
import Header from './components/Header'
import InputSection from './components/InputSection'
import Controls from './components/Controls'
import ResultPanel from './components/ResultPanel'

function App() {
  const [apiKey, setApiKey] = useState('')
  const [backendUrl, setBackendUrl] = useState('')

  const [text, setText] = useState('')
  const [file, setFile] = useState(null)
  const [image, setImage] = useState(null)

  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const activeBackend = useMemo(() => backendUrl || import.meta.env.VITE_BACKEND_URL || '', [backendUrl])

  const mockSummarize = (content, opts) => {
    // This is a UI-only mock to keep the demo functional without backend calls.
    const base = content.replace(/\s+/g, ' ').trim()
    const limit = opts.length === 'short' ? 160 : opts.length === 'medium' ? 320 : 480
    const truncated = base.length > limit ? base.slice(0, limit - 1) + '…' : base
    const bullets = opts.bullets
      ? `• Key point 1: ${truncated.split('.').filter(Boolean)[0] || truncated}\n• Key point 2: Impact and implications.\n• Next steps: Actions to take.`
      : truncated
    const tonePrefix = {
      analytical: 'Analytical summary:',
      executive: 'Executive brief:',
      neutral: 'Summary:',
      technical: 'Technical digest:',
    }[opts.tone]
    return `${tonePrefix}\n${bullets}`
  }

  const handleGenerate = async (opts) => {
    setLoading(true)
    setResult('')

    // Backend-first policy: UI is ready, but we avoid calling non-existent APIs.
    // When backend /summarize exists, send text/file/image to `${activeBackend}/summarize` with apiKey.
    const combinedText = text || (file ? `File: ${file.name}` : '') || (image ? `Image: ${image.name}` : '') || ''

    // Simulate latency
    await new Promise((r) => setTimeout(r, 700))
    setResult(mockSummarize(combinedText || 'No content provided.', opts))
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <Header apiKey={apiKey} setApiKey={setApiKey} backendUrl={backendUrl} setBackendUrl={setBackendUrl} />

      <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <InputSection text={text} setText={setText} file={file} setFile={setFile} image={image} setImage={setImage} />
          <Controls onGenerate={handleGenerate} loading={loading} />
        </div>
        <div className="lg:col-span-1">
          <ResultPanel result={result} loading={loading} />
          {activeBackend ? (
            <p className="mt-3 text-xs text-gray-500">Using backend: {activeBackend}</p>
          ) : (
            <p className="mt-3 text-xs text-gray-500">No backend connected yet. UI is running with a local preview.</p>
          )}
        </div>
      </main>

      <footer className="max-w-6xl mx-auto px-4 pb-10">
        <div className="text-xs text-gray-500">
          Paste text or drop a file/image, set your preferences, and generate a concise, useful summary. When you're ready, connect your API in the header and wire it to your backend endpoint.
        </div>
      </footer>
    </div>
  )
}

export default App
