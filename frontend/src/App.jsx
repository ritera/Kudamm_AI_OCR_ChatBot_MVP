import { CContainer, CRow, CCol, CCard, CCardBody, CCardHeader } from '@coreui/react'
import ImageOCR from './components/ImageOCR.jsx'
import ChatBox from './components/ChatBox.jsx'

export default function App () {
  return (
    <CContainer className="my-4">
      <CRow>
        <CCol md={6}>
          <CCard className="mb-4">
            <CCardHeader>📷 Image → Text (OCR)</CCardHeader>
            <CCardBody><ImageOCR /></CCardBody>
          </CCard>
        </CCol>
        <CCol md={6}>
          <CCard>
            <CCardHeader>💬 GPT Chatbot</CCardHeader>
            <CCardBody><ChatBox /></CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}
