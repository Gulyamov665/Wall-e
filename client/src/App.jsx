import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './apps/pages/Main'
import ContentPage from './apps/pages/ContentPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} exact/>
        <Route path="/content" element={<ContentPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
