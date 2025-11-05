import { useEffect, useState } from 'react'
import { Copy, Check, Loader } from 'lucide-react'

export default function ResultPanel({ result, loading }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (copied) {
      const t = setTimeout(() => setCopied(false), 1200)
      return () => clearTimeout(t)
    }
  }, [copied])

  const copy = async () => {
    if (!result) return
    await navigator.clipboard.writeText(result)
    setCopied(true)
  }

  return (
    <section className="bg-white/80 backdrop-blur rounded-2xl border p-4 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-gray-800">Summary</h2>
        <button onClick={copy} disabled={!result} className={`inline-flex items-center gap-2 text-sm px-3 py-2 rounded-lg border ${result ? 'bg-white hover:bg-gray-50' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>
          {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />} {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      <div className="rounded-xl border bg-gray-50 p-4 min-h-[140px]">
        {loading ? (
          <div className="flex items-center gap-2 text-gray-600">
            <Loader className="h-4 w-4 animate-spin" /> Generating concise, analytical summary…
          </div>
        ) : result ? (
          <div className="prose prose-sm max-w-none">
            {result.split('\n').map((line, idx) => (
              <p key={idx} className="my-2 leading-relaxed">{line}</p>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 text-sm">Your summary will appear here.</div>
        )}
      </div>
    </section>
  )
}
