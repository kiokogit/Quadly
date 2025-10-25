"use client"

import axiosInstance from "@/lib/api-client"
import Link from "next/link"
import { useState } from "react"

const OCRLandingPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string>("")
  const [showModal, setShowModal] = useState(false)
  
  const [method, setMethod] = useState("any")
  const [preProcess, setPreProcess] = useState(true)
  const [enableOcr, setEnableOcr] = useState(true)
  const [pageNumber, setPageNumber] = useState("1")
  const [dpi, setDpi] = useState("200")

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setResult(null)
      setError("")
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!file) {
      setError("Please select a file first")
      return
    }

    setLoading(true)
    setError("")
    setResult(null)

    const formData = new FormData()
    formData.append("file", file)
    formData.append("method", method)
    formData.append("pre_process", preProcess.toString())
    formData.append("enable_ocr", enableOcr.toString())
    formData.append("page_number", pageNumber)
    formData.append("dpi", dpi)

    try {
      const response = await axiosInstance.post(
        "/doc-server/pdf/extract_image_of_pdf",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      setResult(response.data)
      setShowModal(true)
    } catch (err: any) {
      console.error("Error:", err)
      setError(err?.response?.data?.error || "Network error. Make sure your backend is running")
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateCertificate = () => {
    alert("Certificate generation feature - Connect to your PDF generation endpoint")
  }

  const features = [
    {
      icon: "🔍",
      title: "Smart OCR Extraction",
      description: "Extract text from IDs, passports, certificates, and any scanned document with high accuracy using Tesseract OCR.",
    },
    {
      icon: "📋",
      title: "Metadata Analysis",
      description: "Automatically parse and structure document information including names, IDs, dates, and other key fields.",
    },
    {
      icon: "✅",
      title: "Document Validation",
      description: "Verify document authenticity and format compliance. Detect tampering and ensure data integrity.",
    },
    {
      icon: "📄",
      title: "PDF Generation",
      description: "Generate professional certificates, reports, and documents from extracted data with customizable templates.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
            📄
          </div>
          <span className="text-lg font-bold text-orange-600">Uniquad AI</span>
        </div>
        <button className="px-4 py-2 bg-orange-600 text-white rounded-full font-semibold hover:bg-orange-700 transition-colors text-sm">
          Get API Access
        </button>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            Document Intelligence Made Simple
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Scan, extract, validate, and generate documents with AI-powered OCR technology. Perfect for IDs, certificates, invoices, and more.
          </p>
          <div className="flex flex-wrap gap-4 mb-8">
            <span className="px-4 py-2 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-full text-sm font-semibold">
              ✓ 99% Accuracy
            </span>
            <span className="px-4 py-2 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-full text-sm font-semibold">
              ✓ Multi-format Support
            </span>
            <span className="px-4 py-2 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-full text-sm font-semibold">
              ✓ Secure Processing
            </span>
          </div>
        </div>
        <div className="relative">
          {/* <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/document-scanning-illustration-download-in-svg-png-gif-file-formats--technology-business-office-pack-illustrations-4632448.png"
            alt="Document scanning"
            className="w-full h-auto drop-shadow-2xl"
          /> */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 max-w-2xl mx-auto">
            <div className="text-center mb-12">
          <h2 className="text-lg md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Try It Out
          </h2>
          <p className="text-sm md:text-lg text-gray-600 dark:text-gray-300">
            Upload a document and see the magic happen
          </p>
        </div>
          <form id='try' onSubmit={handleSubmit}>
            {/* File Upload */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Upload Document
              </label>
              <input
                type="file"
                name="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                required
                className="w-full px-4 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-orange-500 dark:bg-gray-700 dark:text-white text-sm"
              />
              {file && (
                <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                  ✓ {file.name}
                </p>
              )}
            </div>

            {/* Options Row */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Method
                </label>
                <select
                  name="method"
                  value={method}
                  onChange={(e) => setMethod(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-orange-500 dark:bg-gray-700 dark:text-white text-sm"
                >
                  <option value="any">Any</option>
                  <option value="ocr">OCR Only</option>
                  <option value="text">Text Only</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Page
                </label>
                <input
                  type="number"
                  name="page_number"
                  value={pageNumber}
                  onChange={(e) => setPageNumber(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-orange-500 dark:bg-gray-700 dark:text-white text-sm"
                  min="1"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  DPI
                </label>
                <select
                  name="dpi"
                  value={dpi}
                  onChange={(e) => setDpi(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-orange-500 dark:bg-gray-700 dark:text-white text-sm"
                >
                  <option value="150">150</option>
                  <option value="200">200</option>
                  <option value="300">300</option>
                </select>
              </div>
            </div>

            {/* Checkboxes */}
            <div className="flex gap-4 mb-4 text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="pre_process"
                  checked={preProcess}
                  onChange={(e) => setPreProcess(e.target.checked)}
                  className="w-4 h-4 text-orange-600 rounded"
                />
                <span className="text-gray-700 dark:text-gray-300">Pre-process</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="enable_ocr"
                  checked={enableOcr}
                  onChange={(e) => setEnableOcr(e.target.checked)}
                  className="w-4 h-4 text-orange-600 rounded"
                />
                <span className="text-gray-700 dark:text-gray-300">Enable OCR</span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading || !file}
                className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-full font-semibold hover:bg-orange-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg text-sm"
              >
                {loading ? "Processing..." : "Extract Data"}
              </button>

              <button
                type="button"
                onClick={handleGenerateCertificate}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-sm"
              >
                Generate PDF
              </button>
            </div>

            {/* Error Display */}
            {error && (
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-700 dark:text-red-300 text-sm">
                  ❌ {error}
                </p>
              </div>
            )}
          </form>
        </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 dark:bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Document Processing
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Everything you need to work with documents
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-2 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Try It Out Section */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <Link
                href='#try'
                className="px-6 py-2 bg-orange-100 dark:bg-orange-700 text-gray-900 dark:text-white rounded-full font-semibold hover:bg-orange-200 dark:hover:bg-orange-600 transition-all"
              >
                Try it out
              </Link>
          
        </div>

      </section>

      {/* Result Modal */}
      {showModal && result && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Extraction Results
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              {/* Extracted Fields */}
              {result.extracted_data && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    Extracted Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(result.extracted_data).map(([key, value]) => (
                      <div key={key} className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                        <p className="text-xs font-semibold text-orange-600 dark:text-orange-400 uppercase mb-1">
                          {key.replace(/_/g, " ")}
                        </p>
                        <p className="text-gray-900 dark:text-white font-medium">
                          {value as string || "Not found"}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Raw Text */}
              {result.raw_text && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    Raw Extracted Text
                  </h3>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 overflow-auto">
                    <pre className="text-xs text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                      {result.raw_text}
                    </pre>
                  </div>
                </div>
              )}

              {/* Full JSON */}
              <details className="mt-6">
                <summary className="text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-pointer mb-2">
                  View Full JSON Response
                </summary>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 overflow-auto">
                  <pre className="text-xs text-gray-800 dark:text-gray-200">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              </details>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-full font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
              >
                Close
              </button>
              <button
                onClick={handleGenerateCertificate}
                disabled
                className="px-6 py-2 bg-orange-600 text-white rounded-full font-semibold hover:bg-orange-700 transition-all"
              >
                Generate Certificate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              📄
            </div>
            <span className="text-2xl font-bold">UniQuad AI</span>
          </div>
          <p className="text-gray-400 mb-6">
            Powered by Tesseract OCR • Intelligent Document Processing
          </p>
          <div className="flex justify-center gap-8 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">API Docs</a>
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-gray-500 text-sm mt-6">
            © 2025 UniQuad AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default OCRLandingPage