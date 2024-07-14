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
import { Login } from './apps/pages/Login'
import ChangeTaskPage from './apps/pages/ChangeTaskPage'
import { TableV2 } from './apps/components/Table.v2'
import { Pdf } from './apps/pages/Pdf'

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <PrimeReactProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/main" element={<Main />} exact />
            <Route path="/content" element={<ContentPage />} />
            <Route path="/create-task" element={<CreateTask />} />
            <Route path="/classification" element={<ClassificationPage />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="task/:id" element={<TaskDetail />} />
            <Route path="task-change/:id" element={<ChangeTaskPage />} />
            <Route path="table" element={<TableV2 />} />
            <Route path="pdf-page/:id" element={<Pdf />} />
          </Routes>
        </PrimeReactProvider>
      </Provider>
    </BrowserRouter>
  )
}

export default App
