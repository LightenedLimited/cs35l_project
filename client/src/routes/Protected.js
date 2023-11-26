import { Login } from './Login'

export function Protected({authenticated, setAuthenticated, Content /* component */}){
    if (!authenticated){
        return ( <Login authenticated={authenticated} setAuthenticated={setAuthenticated}></Login>)
    }
    return ( <Content /> )
}