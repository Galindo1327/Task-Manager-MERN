import {Link} from 'react-router-dom'

function Navbar() {
  return (
    <div className="bg-teal-400 flex justify-between px-10 py-4">
      <Link to="/" className="font-bold">
        <h1>M.E.R.N Task Manager</h1>
      </Link>

        <ul className="flex gap-x-2">
            <li>
                <Link to="/" className=" bg-indigo-700 px-2 py-1 rounded-md text-white">Home 🏠</Link>
            </li>
            <li>
                <Link to="/new" className=" bg-green-500 px-2 py-1 rounded-md text-white">Create Task ✍️</Link>
            </li>
        </ul>
    </div>
  )
}

export default Navbar
