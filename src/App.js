import { useState, createContext, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom';
import Header from "./components/Header"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Topic from './pages/Topic';
import Title from './components/Title';
import MyProfile from './pages/MyProfile';
import Create from './pages/Create';
import Thread from './pages/Thread'
import './App.scss';

export const GlobalCtx = createContext(null)

function App() {

  const [gState, setGState] = useState({
    url: "https://hl-forums.herokuapp.com", 
    token: null
  })

  //SEEING IF ALREADY LOGGED IN
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"))
    if (token) {
      setGState({...gState, token: token.token})
    }
  }, [])

  return (
    <GlobalCtx.Provider value={{gState, setGState}}>
      <div className="App">
        {gState.token ? <Title /> : null}
        <Header />
        <main>
            <Switch>
            <Route exact path="/" render={(rp => gState.token ? <Dashboard /> : <Home />)}/>
            <Route path="/signup" render={(rp) => <Signup {...rp}/>} />
            <Route path="/login" render={(rp) => <Login {...rp}/>}/>
            <Route path="/topic/:topic" render={(rp => gState.token ? <Topic {...rp}/> : <Home />)}/>
            <Route path="/post/:topic" render={(rp => gState.token ? <Create {...rp}/> : <Home />)}/>
            <Route path="/thread/:id" render={(rp => gState.token ? <Thread {...rp}/> : <Home />)}/>
            <Route path="/myprofile" render={(rp => gState.token ? <MyProfile /> : <Home />)}/>
            </Switch>
        </main>
      </div>
    </GlobalCtx.Provider>
  );
}

export default App;
