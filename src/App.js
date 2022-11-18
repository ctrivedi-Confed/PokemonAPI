import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './pages/Layout';
import BasicInformation from './pages/BasicInfomation';
import Pokemon from './pages/Pokemon';

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Layout />
        <Routes>
          <Route path="/" element={<BasicInformation />} />
          <Route path="/pokemon" element={<Pokemon />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
