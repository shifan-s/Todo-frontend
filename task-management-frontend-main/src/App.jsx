import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import Dashboard from "./pages/Dashboard"
import Tasks from "./pages/Tasks"
import CreateTask from "./pages/CreateTask"
import Task from "./pages/Task"
import PrivateRoute from "./components/routes/PrivateRoute"
import ErrorPage from "./pages/ErrorPage"


function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Login/>}/>
          <Route path="signup" element={<SignUp/>}/>
          <Route path="dashboard" element={<Dashboard/>}>
            <Route path="user" element={<PrivateRoute/>}/>
            <Route path="tasks" element={<Tasks/>}/>
            <Route path="task/:slug" element={<Task/>}/>
            <Route path="create-task" element={<CreateTask/>}/>
          </Route>
          <Route path="*" element={<ErrorPage/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
