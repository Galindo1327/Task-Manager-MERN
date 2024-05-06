import { useEffect } from "react"
import TaskCard from "../Components/TaskCard.jsx"
import { useTasks } from "../Context/TaskProvider.jsx"

function TasksPage() {

  const {tasks, loadTasks} = useTasks()

  useEffect(() => {
    // Lo que hace esta funcion es que solicite las tareas de la BD (contenido de la tabla)
    // Esta dentro de un useEffect() para que cargue siempre en la pagina
    loadTasks()
  }, [])
  
  function renderMain() {
    
    if (tasks.length === 0) return <h1 className="bg-teal-100 rounded-md p-4">Aun no hay tareas.</h1>

    return tasks.map(task =>(
      <TaskCard task={task} key={task.id}/>
    ))
    
  }

  return (
    <div>
      <h1 className="text-4xl text-black font-bold text-center p-4">
        Tareas
      </h1>
      <div className="grid grid-cols-3 gap-2">
        {renderMain()}
      </div>
    </div>
  )
}

export default TasksPage