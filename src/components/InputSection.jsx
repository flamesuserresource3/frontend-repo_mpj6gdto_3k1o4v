import { useRef, useState } from 'react'
import { Upload, FileText, Image as ImageIcon, Trash2 } from 'lucide-react'

export default function InputSection({ text, setText, file, setFile, image, setImage }) {
  const fileRef = useRef(null)
  const imageRef = useRef(null)
  const [dragOver, setDragOver] = useState(false)

  const onDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const dropped = e.dataTransfer.files?.[0]
    if (!dropped) return
    if (dropped.type.startsWith('image/')) {
      setImage(dropped)
      setFile(null)
    } else {
      setFile(dropped)
      setImage(null)
    }
  }

  const clearAttachments = () => {
    setFile(null)
    setImage(null)
    if (fileRef.current) fileRef.current.value = ''
    if (imageRef.current) imageRef.current.value = ''
  }

  return (
    <section className="bg-white/80 backdrop-blur rounded-2xl border p-4 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2">
          <FileText className="h-5 w-5 text-indigo-600" />
          Content
        </h2>
        {(file || image) && (
          <button onClick={clearAttachments} className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
            <Trash2 className="h-4 w-4" /> Clear attachments
          </button>
        )}
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        placeholder="Paste any text here…"
        className="w-full resize-y rounded-xl border bg-white/70 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
      />

      <div
        className={`mt-4 border-2 border-dashed rounded-xl p-4 sm:p-6 transition ${dragOver ? 'border-indigo-500 bg-indigo-50/50' : 'border-gray-200 bg-gray-50'}`}
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-gray-700">
            <Upload className="h-5 w-5 text-indigo-600" />
            <div>
              <div className="font-medium text-sm">Drop a document or image</div>
              <div className="text-xs text-gray-500">PDF, DOCX, TXT, PNG, JPG supported (UI only)</div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <label className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-white border rounded-lg cursor-pointer hover:bg-gray-50">
              <FileText className="h-4 w-4" />
              Choose file
              <input ref={fileRef} type="file" accept=".pdf,.doc,.docx,.txt" className="hidden" onChange={(e) => {
                const f = e.target.files?.[0]
                setFile(f || null)
                if (f) setImage(null)
              }} />
            </label>

            <label className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-white border rounded-lg cursor-pointer hover:bg-gray-50">
              <ImageIcon className="h-4 w-4" />
              Choose image
              <input ref={imageRef} type="file" accept="image/*" className="hidden" onChange={(e) => {
                const f = e.target.files?.[0]
                setImage(f || null)
                if (f) setFile(null)
              }} />
            </label>
          </div>
        </div>

        {(file || image) && (
          <div className="mt-4 text-sm text-gray-700">
            Attached: {file ? file.name : image?.name}
          </div>
        )}
      </div>
    </section>
  )
}
