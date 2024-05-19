import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PrimeReactProvider } from 'primereact/api'
import Main from './apps/layouts/Main'
import ContentPage from './apps/pages/ContentPage'
import store from './store'
import 'primereact/resources/themes/lara-light-cyan/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import CreateTask from './apps/pages/CreateTask'
import { ClassificationPage } from './apps/pages/ClassificationPage'
import { Tasks } from './apps/pages/Tasks'
import { TaskDetail } from './apps/pages/TaskDetail'


function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PrimeReactProvider>
          <Routes>
            <Route path="/" element={<Main />} exact />
            <Route path="/content" element={<ContentPage />} />
            <Route path="/create-task" element={<CreateTask />} />
            <Route path="/classification" element={<ClassificationPage />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="task/:id" element={<TaskDetail />} />
          </Routes>
        </PrimeReactProvider>
      </Provider>
    </BrowserRouter>
  )
}

export default App
