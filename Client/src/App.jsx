import {Route, Routes} from 'react-router-dom'

import TasksPage from './Pages/TasksPage'
import TaskForm from './Pages/TaskForm'
import NotFound from './Pages/NotFound'
import { TaskContextProvider } from './Context/TaskProvider'

import Navbar from './Components/Navbar'


function App() {
  return (
    <div className = "bg-teal-200 h-screen">
      <Navbar />
      <div className="container mx-auto py-4 px-8">
        <TaskContextProvider>
          <Routes>
            <Route path="/" element={<TasksPage/>}/>
            <Route path="/new" element={<TaskForm/>}/>
            <Route path="/edit/:id" element={<TaskForm/>}/>
            <Route path="*" element={<NotFound/>}/>   {/* El * sirve para direccionar a cualquier ruta que no se encuentra */}
          </Routes>
        </TaskContextProvider>
      </div>
    </div>
  )
}

export default App
