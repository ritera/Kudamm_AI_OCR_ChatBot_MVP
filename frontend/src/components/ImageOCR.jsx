// src/components/ImageOCR.jsx
import { useState } from 'react'
import {
  CButton, CFormInput, CFormLabel, CSpinner, CAlert,
  CFormSelect, CRow, CCol, CProgress, CCard, CCardBody, CCardHeader
} from '@coreui/react'
import axios from 'axios'

export default function ImageOCR() {
  const [file, setFile] = useState(null)
  const [lang, setLang] = useState('ko')   // 기본 한국어
  const [text, setText] = useState('')
  const [lines, setLines] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const upload = async () => {
    if (!file) return
    setError('')
    const fd = new FormData()
    fd.append('file', file)
    fd.append('lang', lang)     // 백엔드 기본값이 ko여도 명시적으로 보냅니다.

    setLoading(true)
    try {
      const { data } = await axios.post('/api/ocr', fd)
      // 백엔드 응답 형태 방어코드
      setText((data?.text || '').trim())
      setLines(Array.isArray(data?.details) ? data.details : [])
      // 디버깅에 도움
      // console.log('OCR response:', data)
    } catch (e) {
      setError(e?.response?.data?.detail || e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <CRow className="g-2">
        <CCol sm="8">
          <CFormLabel htmlFor="img">이미지 선택</CFormLabel>
          <CFormInput type="file" id="img" accept="image/*"
            onChange={e => setFile(e.target.files?.[0] || null)} />
        </CCol>
        <CCol sm="4">
          <CFormLabel htmlFor="lang">언어</CFormLabel>
          <CFormSelect id="lang" value={lang} onChange={e => setLang(e.target.value)}>
            <option value="ko">한국어</option>
            <option value="en">영어</option>
            <option value="de">독일어</option>
          </CFormSelect>
        </CCol>
      </CRow>

      <CButton className="mt-2" onClick={upload} disabled={loading || !file}>
        {loading ? <CSpinner size="sm" className="me-2" /> : null}
        OCR 실행
      </CButton>

      {error && <CAlert color="danger" className="mt-3">{error}</CAlert>}

      {text && (
        <CCard className="mt-3">
          <CCardHeader>추출 텍스트</CCardHeader>
          <CCardBody>
            <pre style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{text}</pre>
          </CCardBody>
        </CCard>
      )}

      {lines.length > 0 && (
        <CCard className="mt-3">
          <CCardHeader>라인 신뢰도</CCardHeader>
          <CCardBody>
            {lines.map((item, i) => {
              // 백엔드가 [[text, conf], ...] 형태라고 가정하되, 객체도 허용
              const isTuple = Array.isArray(item)
              const t = isTuple ? item[0] : (item?.text ?? '')
              const cRaw = isTuple ? item[1] : (item?.conf ?? item?.confidence ?? 0)
              const c = Math.max(0, Math.min(1, Number(cRaw) || 0))
              return (
                <div key={i} className="mb-3">
                  <div><strong>{t}</strong></div>
                  <CProgress thin value={Math.round(c * 100)} />
                  <small>{Math.round(c * 100)}%</small>
                </div>
              )
            })}
          </CCardBody>
        </CCard>
      )}
    </>
  )
}
