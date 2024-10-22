import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import loggedInData from './fillerData/loggedIn.json'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './screens/Home'
import Explore from './screens/Explore'
import CreateBlogPost from './screens/Createnewblogpost'
import Blogpostloggedin from './screens/Blogpostloggedin'
import Blogpostnotloggedin from './screens/Blogpostnotloggedin'
import Updateblogpost from './screens/Updateblogpost'
import Login from './screens/Login'
import Register from './screens/Register';
import Profile from './screens/Profile';
import EditProfile from './screens/EditProfile';
import FriendsList from './screens/FriendsList';
import Error404 from './screens/Error404';
import 'bootstrap/dist/css/bootstrap.min.css';


const isAuthenticated = (loggedInData[0].id !== null)

const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
      

        <Route
          path='/createnewblogpost/:username'
          element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<CreateBlogPost />} navigateTo='/login'/>}
        />
        <Route 
          path="/blogpostloggedin/:postId" 
          element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Blogpostloggedin />} navigateTo='/login' />} 
        />
        <Route path="/blogpostnotloggedin" element={<Blogpostnotloggedin />} />
        <Route 
          path="/updateblogpost/:postId" 
          element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Updateblogpost />} navigateTo='/login' />} 
        />
        <Route
          path='/login'
          element={<ProtectedRoute isAuthenticated={!isAuthenticated} element={<Login />} navigateTo={'/'} />}
        />
        <Route
          path='/register'
          element={<ProtectedRoute isAuthenticated={!isAuthenticated} element={<Register />} navigateTo={'/'} />}
        />
        <Route 
            path='/profile/:username'  
            element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Profile />} navigateTo={'/login'} />}
        />
        <Route
          path='/edit-profile'
          element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<EditProfile />} navigateTo='/login'/>}
        />
        <Route
          path='/friendslist'
          element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<FriendsList />} navigateTo='/login'/>}
        />
        <Route
          path='/'
          element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Home />} navigateTo='/login'/>}
        />
        <Route
          path='/explore'
          element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Explore />} navigateTo='/login'/>}
        />

        
        <Route path='*' element={<Error404 />} />
      </Routes>
    </Router>
  )
}

export default App