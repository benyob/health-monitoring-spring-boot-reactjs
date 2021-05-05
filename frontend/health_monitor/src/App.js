import './App.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CompAuth from './component/CompAuth';
import CompDashboard from './component/CompDashboard';
import ThemeService, { cols, themes } from './service/theme.service'
import NotifyMe from './component/NotifyMe';
import { NotifyMeType } from './service/notifications.service';

export const MyThemeContext = React.createContext();
export const ActiveNotifyContext = React.createContext();
function App() {
  const [theme, setTheme] = useState(ThemeService.getTheme())
  const [ActiveNotify, setActiveNotify] = useState({active:false,msg:"",type:NotifyMeType.blue})
  const updateTheme = () => {
    setTheme(ThemeService.getTheme())
  }

 
  const fn_notifyMeThat = (msg ,type) => { 
    if(ActiveNotify.active){
      setActiveNotify({
        active:true,msg:msg,type:type
      })
      return;
    }
    
    setActiveNotify({
      active:true,msg:msg,type:type
    })
    
    setTimeout(()=>{
      setActiveNotify({active:false,msg:msg,type:NotifyMeType.blue})
    } ,3000)
  }

  return (
    <div  className="App">
      <NotifyMe setActiveNotify={setActiveNotify} ActiveNotify={ActiveNotify}/>
        <BrowserRouter>
        <Switch>

            <ActiveNotifyContext.Provider value={fn_notifyMeThat}>
            <MyThemeContext.Provider value={{ theme, updateTheme }}>
              <Route exact path={["/", "/auth"]}
                render={(props) => (<CompAuth {...props} theme={theme} updateTheme={updateTheme} />)} />
              <Route path={"/dashboard"}
                render={(props) => (<CompDashboard {...props} fn_notifyMeThat={fn_notifyMeThat} theme={theme} updateTheme={updateTheme} />)} />
            </MyThemeContext.Provider>
            </ActiveNotifyContext.Provider>

        </Switch>

    </BrowserRouter>
      </div>
  );
}


export default App;
