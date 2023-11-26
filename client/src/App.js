import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'

import { Landing } from './routes/Landing'
import { Login } from './routes/Login'
import { Protected } from './routes/Protected' 
import { Results } from './routes/Results'
import { Upload } from './routes/Upload'
import { Search } from './routes/Search'

import { NavBar} from './components/NavBar'

function App() {
  let [authenticated, setAuthenticated] = useState(false)
  return ( // for results path, we should have the url contain the search query so you can send the link to someone else and get same results
    <>
    <NavBar />
    <Routes path='/'>
      <Route index element={<Landing />} />
      <Route path='login' element={<Login authenticated={authenticated} setAuthenticated={setAuthenticated}/>}/>
      <Route path='upload' element={<Protected authenticated={authenticated} setAuthenticated={setAuthenticated} Content={() => <Upload />} />} />
      {/*<Route path='search' element={<Protected authenticated={authenticated} setAuthenticated={setAuthenticated} Content={() => <Search />} /> } />*/}
      <Route path='search' element={<Search />}/>
      <Route path='results' element={<Protected authenticated={authenticated} setAuthenticated={setAuthenticated} Content={() => <Results />} />} />
    </Routes>
    </>
);
}

export default App;
