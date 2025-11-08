import { useMemo, useRef, useState } from 'react'
import Header from './components/Header'
import InputSection from './components/InputSection'
import Controls from './components/Controls'
import ResultPanel from './components/ResultPanel'
import Hero from './components/Hero'

function App() {
  const [apiKey, setApiKey] = useState('')
  const [backendUrl, setBackendUrl] = useState('')

  const [text, setText] = useState('')
  const [file, setFile] = useState(null)
  const [image, setImage] = useState(null)

  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const mainRef = useRef(null)

  const activeBackend = useMemo(() => backendUrl || import.meta.env.VITE_BACKEND_URL || '', [backendUrl])

  const mockSummarize = (content, opts) => {
    const base = (content || '').replace(/\s+/g, ' ').trim()
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

    const combinedText = text || ''

    if (activeBackend) {
      try {
        const form = new FormData()
        form.append('tone', opts.tone)
        form.append('length', opts.length)
        form.append('language', opts.language)
        form.append('bullets', String(opts.bullets))

        if (combinedText) form.append('text', combinedText)
        if (file) form.append('file', file)
        if (image) form.append('image', image)

        const headers = {}
        if (apiKey) {
          headers['Authorization'] = `Bearer ${apiKey}`
          headers['x-api-key'] = apiKey
        }

        const res = await fetch(`${activeBackend.replace(/\/$/, '')}/summarize`, {
          method: 'POST',
          body: form,
          headers,
        })

        const contentType = res.headers.get('content-type') || ''
        if (!res.ok) {
          let errMsg = `Request failed (${res.status})`
          try {
            if (contentType.includes('application/json')) {
              const j = await res.json()
              errMsg = j.message || j.error || JSON.stringify(j)
            } else {
              errMsg = await res.text()
            }
          } catch {}
          throw new Error(errMsg)
        }

        let summary = ''
        if (contentType.includes('application/json')) {
          const data = await res.json()
          summary = data.summary || data.result || data.output || JSON.stringify(data)
        } else {
          summary = await res.text()
        }

        setResult(summary || 'No summary returned by the API.')
      } catch (err) {
        setResult(`There was a problem contacting your API.\n\nDetails: ${err?.message || err}`)
      } finally {
        setLoading(false)
      }
      return
    }

    await new Promise((r) => setTimeout(r, 600))
    setResult(mockSummarize(combinedText || (file ? `File: ${file.name}` : image ? `Image: ${image.name}` : 'No content provided.'), opts))
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Header apiKey={apiKey} setApiKey={setApiKey} backendUrl={backendUrl} setBackendUrl={setBackendUrl} onCTAClick={() => mainRef.current?.scrollIntoView({ behavior: 'smooth' })} />

      <Hero onPrimary={() => mainRef.current?.scrollIntoView({ behavior: 'smooth' })} />

      <main ref={mainRef} className="relative z-10 max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-6" id="how-it-works">
        <div className="lg:col-span-2 space-y-6">
          <InputSection text={text} setText={setText} file={file} setFile={setFile} image={image} setImage={setImage} />
          <Controls onGenerate={handleGenerate} loading={loading} />
        </div>
        <div className="lg:col-span-1">
          <ResultPanel result={result} loading={loading} />
          {activeBackend ? (
            <p className="mt-3 text-xs text-white/60">Using backend: {activeBackend.replace(/\/$/, '')}/summarize</p>
          ) : (
            <p className="mt-3 text-xs text-white/60">No backend connected yet. UI is running with a local preview.</p>
          )}
        </div>
      </main>

      <footer className="relative z-10 max-w-6xl mx-auto px-4 pb-12 text-white/60">
        <div>
          Paste text or drop a file/image, set your preferences, and generate a concise, useful summary. Connect your API in the header to run real requests.
        </div>
      </footer>
    </div>
  )
}

export default App
