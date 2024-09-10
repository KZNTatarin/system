import Layouts from './Components/Layouts'
import './index.css'
import './App.css'

import { BrowserRouter } from "react-router-dom";

function App() {
 
  return (
    <BrowserRouter>
      <Layouts/>
    </BrowserRouter>
  );
}

export default App;
