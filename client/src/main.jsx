import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import {BrowserRouter as Router} from "react-router-dom" 
import { StateProvider } from './context/stateProvider'
import { initialState } from './context/initialState'
import reducer from './context/reducer'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <StateProvider initialState={initialState} reducer={reducer}>
      <App />
      </StateProvider>
    </Router>
   
  </React.StrictMode>,
)
