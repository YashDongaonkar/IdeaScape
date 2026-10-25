import { Route, Routes } from 'react-router'
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Board from "./pages/IdeaBoard.jsx"
import Signup from "./pages/Signup.jsx"
import CreateIdea from "./pages/CreateIdea.jsx"
import EditIdea from "./pages/EditIdea.jsx"
import IdeaDetail from './pages/IdeaDetail'

import ProtectedRoute from './components/ProtectedRoute.jsx'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/board" element={<Board />} />
        <Route path="/ideas/:id" element={<IdeaDetail />} />
        <Route path="/ideas/new" element={<CreateIdea />} />
        <Route path="/ideas/:id/edit" element={<EditIdea />} />
      </Route>
    </Routes>
  )
}

export default App