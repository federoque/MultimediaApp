import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import  LandingPage from './Components/LandingPage.jsx'
import  Home from './Components/Home.jsx'
import CardDetail from './Components/CardDetail';
import CreateContent from './Components/CreateContent';
import UpdateContent from './Components/UpadateContent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<LandingPage />} />
          <Route path='/home' element={<Home />} />
          <Route path='/content/:id' element={<CardDetail />} />
          <Route path='/createcontent' element={<CreateContent/>}/>
          <Route path='/updatecontent/:id' element={<UpdateContent/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
