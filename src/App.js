// App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Common/Header';
import ListPage from './components/Pages/ListPage';
import DetailPage from './components/Pages/DetailPage';
import CreatePage from './components/Pages/CreatePage';
import UpdatePage from './components/Pages/UpdatePage';
export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<ListPage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/update/:id" element={<UpdatePage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}