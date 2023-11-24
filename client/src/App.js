import { Route, Routes } from 'react-router-dom'
import { Landing } from './routes/Landing'
import { Login } from './routes/Login'
import { Results } from './routes/Results'
import { Upload } from './routes/Upload'

import { NavBar} from './components/NavBar'

function App() {
  return ( // for results path, we should have the url contain the search query so you can send the link to someone else and get same results
    <>
    <NavBar />
    <Routes path='/'>
      <Route index element={<Landing />} />
      <Route path='login' element={<Login />}/>
      <Route path='upload' element={<Upload />} />
      <Route path='results' element={<Results />} />
    </Routes>
    </>
);
}

export default App;
