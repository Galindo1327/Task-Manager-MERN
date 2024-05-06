import {Form, Formik} from 'formik'
import {useTasks} from '../Context/TaskProvider'
import {useParams, useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react'

function TaskForm() {

  const {createTask, getTask, updateTask} = useTasks()

  const [task, setTask] = useState({
    title: "",
    description: "",
  })

  const params = useParams()
  const navigate = useNavigate()
  
  useEffect(() => {
    const loadTask = async() =>{
      if (params.id){
        const task = await getTask(params.id)
        setTask({
          title: task.title,
          description: task.description
        })
      }
    }
    loadTask()
  }, [])
  

  return (
    <div>

      <Formik
        initialValues={task}
        enableReinitialize={true}   // Ya muestra los valores a editar
        onSubmit={async(values, actions) =>{
          console.log(values);

          if (params.id) {
            await updateTask(params.id, values)
          } else {
            await createTask(values)
          }
          navigate('/')
          setTask({
            title: '',
            description: ''
          })
        }}
      >
        {({handleChange, handleSubmit, values, isSubmitting}) =>(

          <Form onSubmit={handleSubmit} className="bg-teal-100 rounded-md p-4 max-w-sm mx-auto mt-10">
            <h1 className="text-xl font-bold uppercase text-center">
              {params.id ? "Editar Tarea" : "Nueva Tarea"}
            </h1>
            <label className="block my-2 font-semibold">Titulo</label>
            <input 
              type="text" 
              name='title'
              placeholder='Write a title'
              onChange={handleChange} // El handleChange servira cuando el usuario tipee cambios
              // El handleSubmit servira cuando el usuario suba o guarde los cambios 
              value = {values.title}
              className="px-2 py-1 rounded-sm w-full"
            />

            <label className="block my-2 mt-4 font-semibold">Descripción</label>
            <textarea 
              name="description" 
              rows="3" 
              placeholder="Write a description"
              onChange={handleChange}
              value = {values.description}
              className="px-2 py-1 rounded-sm w-full"
            ></textarea>

            <button type="submit" disabled={isSubmitting} className="bg-blue-700 px-2 py-1 rounded-md text-white block w-full mt-4">
              {isSubmitting ? 'Guardando...' : 'Guardar'}
            </button>
          </Form>

        )}
      </Formik>
    </div>
  )
}

export default TaskForm
