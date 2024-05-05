import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import Main from './apps/pages/Main'
import ContentPage from './apps/pages/ContentPage'
import store from './store'

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Main />} exact />
          <Route path="/content" element={<ContentPage />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  )
}

export default App
