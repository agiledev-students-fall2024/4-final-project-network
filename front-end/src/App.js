import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './screens/Home'

const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App