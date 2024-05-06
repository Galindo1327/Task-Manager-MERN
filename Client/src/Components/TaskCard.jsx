import {useTasks} from '../Context/TaskProvider'
import {useNavigate} from 'react-router-dom'

function TaskCard({task}) {

    const {deleteTask, toggleTaskDone} = useTasks()
    const navigate = useNavigate()

    const handleDone = async() => {
      await toggleTaskDone(task.id)
    }

  return (
    <div className="bg-teal-100 rounded-md p-4">
        <header className="flex justify-between">
          <h2 className="text-xl font-bold"> {task.title} </h2>
          <span className="ml-5"> {task.done == 1 ? "✅" : "❌"} </span>
        </header>
        <p className="text-sm"> {task.description} </p>
        <span> {task.createAt} </span>
        <div className="flex gap-x-2">
          <button className="bg-red-500 px-2 py-1 rounded-md text-white" onClick={()=> deleteTask(task.id)}>Eliminar</button>
          <button className="bg-blue-700 px-2 py-1 rounded-md text-white" onClick={()=> navigate(`/edit/${task.id}`)}>Editar</button>
          <button className="bg-slate-400 px-2 py-1 rounded-md text-white" onClick={()=> handleDone(task.done)}>
            Marcar
          </button>
        </div>
    </div>
  )
}

export default TaskCard