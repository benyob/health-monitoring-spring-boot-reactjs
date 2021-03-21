import './App.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CompAuth from './component/CompAuth';
import CompDashboard from './component/CompDashboard';
import ThemeService from './service/theme.service'

export const MyThemeContext = React.createContext();
function App() {
  const [theme, setTheme] = useState(ThemeService.getTheme())

  const updateTheme = () => {
    setTheme(ThemeService.getTheme())
  }
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>

            <MyThemeContext.Provider value={{ theme, updateTheme }}>
              <Route exact path={["/", "/auth"]}
                render={(props) => (<CompAuth {...props} theme={theme} updateTheme={updateTheme} />)} />
              <Route path={"/dashboard"}
                render={(props) => (<CompDashboard {...props} theme={theme} updateTheme={updateTheme} />)} />
            </MyThemeContext.Provider>

        </Switch>

      </div>
    </BrowserRouter>
  );
}


export default App;
