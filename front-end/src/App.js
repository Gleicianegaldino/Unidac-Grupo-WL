import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import { default as AddBreakfast, default as EditBreakfast } from './Breakfast/AddBreakfast';
import ViewBeakfast from './Breakfast/ViewBeakfast';
import Navbar from './layout/Navbar';
import Home from './pages/Home';

function App() {
  return  <div className="App">
              <Router>
                  <Navbar/>
                  <Routes>
                      <Route exact path='/' element={ <Home/>} />
                      <Route exact path='/addBreakfast' element={ <AddBreakfast/>} />
                      <Route exact path='/editBreakfast/:id' element={ <EditBreakfast/>} />
                      <Route exact path='/viewBreakfast/:id' element={ <ViewBeakfast/>} />
                  </Routes>
              </Router>
          </div>;
}

export default App;
