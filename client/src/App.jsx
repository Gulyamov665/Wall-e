import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PrimeReactProvider } from 'primereact/api'
import Main from './apps/layouts/Main'
import ContentPage from './apps/pages/ContentPage'
import store from './store'
import 'primereact/resources/themes/lara-light-cyan/theme.css'
import 'primereact/resources/primereact.min.css' //core css
import 'primeicons/primeicons.css' //icons
import 'primeflex/primeflex.css' // flex
import CreateTask from './apps/pages/CreateTask'

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PrimeReactProvider>
          <Routes>
            <Route path="/" element={<Main />} exact />
            <Route path="/content" element={<ContentPage />} />
            <Route path="/create-task" element={<CreateTask />} />
          </Routes>
        </PrimeReactProvider>
      </Provider>
    </BrowserRouter>
  )
}

export default App
