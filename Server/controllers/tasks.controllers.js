import {pool} from '../db.js'

// Solicita las tareas (Solicita todo el contenido de la tabla tasks)
export const getTasks = async(req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM tasks ORDER BY createAt ASC')
        res.json(result)

    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    
}

// Pide o solicita una sola tarea (Solicita un solo contenido de la tabla tasks)
// En este caso por id por medio del ThunderClient
export const getTask = async(req, res) => {

    try {
        const [result] = await pool.query('SELECT * FROM tasks WHERE id = ?', [req.params.id])
    
        // Condicional para cuando no encuentre un id
        if(result.length === 0){
            return res.status(404).json({message: 'Tarea no encontrada'})
        }
    
        res.json(result[0])
        
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}

// Crea la tarea (Crea contenido de la tabla tasks)
// se escribe todo desde ThunderClient, en la parte de body se escribe en el JSON
// Para luego mostrar la tarea con la descripcion y ademas del ID
export const createTask = async(req, res) => {

    try {
        // el req pide al body el title y description
        const {title, description} = req.body
        // Define el result como el query
        const [result] = await pool.query('INSERT INTO tasks (title, description) VALUES (?, ?)',[title, description])
        // Muestra el resultado
        console.log(result)
        res.json({
            id: result.insertId, 
            title,
            description
        })
        
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}

// Actualiza las tareas por medio del ThunderClient (Actualiza contenido de la tabla tasks)
export const updateTask = async(req, res) => {

    try {
        const {title, description} = req.body
    
        const result = await pool.query('UPDATE tasks SET ? WHERE id = ?', [req.body, req.params.id])
    
        res.json(result)
        
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}

// Elimina la tarea por medio de id por medio del ThunderClient (Elimina contenido de la tabla tasks)
export const deleteTask = async(req, res) => {

    try {
        const [result] = await pool.query('DELETE FROM tasks WHERE id = ?', [req.params.id])
    
        if(result.affectedRows === 0){
            return res.status(404).json({message: 'Tarea no encontrada'})
        }
    
        return res.sendStatus(204)
        
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

}