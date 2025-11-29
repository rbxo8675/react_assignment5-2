import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  
  return (
    <header className="app-header">
      <div className="header-container">
        <Link to="/list" className="header-brand">
          <i className="ri-fridge-line"></i>
          <span>냉장고 관리 시스템</span>
        </Link>
        
        <nav className="header-nav">
          <Link 
            to="/list" 
            className={`nav-item ${location.pathname === '/list' || location.pathname === '/' ? 'active' : ''}`}
          >
            <i className="ri-list-check"></i>
            <span>목록</span>
          </Link>
          <Link 
            to="/create" 
            className={`nav-item ${location.pathname === '/create' ? 'active' : ''}`}
          >
            <i className="ri-add-circle-line"></i>
            <span>추가</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
