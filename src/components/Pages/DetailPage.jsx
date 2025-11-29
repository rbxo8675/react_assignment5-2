// src/components/Pages/DetailPage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getItems, deleteItem } from "../Api/useApi";

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadItem = async () => {
      try {
        setLoading(true);
        const data = await getItems();
        const found = data.find((i) => i.id === id);
        
        if (found) {
          setItem(found);
        } else {
          setError("항목을 찾을 수 없습니다.");
        }
      } catch (err) {
        console.error("loadItem error:", err);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadItem();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm(`"${item.name}" 항목을 삭제하시겠습니까?`)) {
      return;
    }
    
    try {
      await deleteItem(id);
      alert("항목이 삭제되었습니다.");
      navigate("/list");
    } catch (err) {
      console.error("delete error:", err);
      alert("삭제에 실패했습니다.");
    }
  };

  const formatPrice = (n) => new Intl.NumberFormat("ko-KR").format(n);

  const getStatusBadge = (status) => {
    switch (status) {
      case "좋음":
        return "badge-success";
      case "빨리 먹어야 함":
        return "badge-warning";
      case "폐기 예정":
        return "badge-danger";
      default:
        return "badge-secondary";
    }
  };

  if (loading) {
    return (
      <div className="app-container">
        <div className="detail-page">
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">데이터를 불러오는 중입니다...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="app-container">
        <div className="detail-page">
          <div className="alert alert-danger" role="alert">
            <i className="ri-error-warning-line"></i> {error || "항목을 찾을 수 없습니다."}
          </div>
          <Link to="/list" className="btn btn-secondary">
            <i className="ri-arrow-left-line"></i> 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="detail-page">
        {/* 페이지 헤더 */}
        <div className="page-header">
          <h2 className="page-title">
            <i className="ri-file-list-3-line"></i> 상세 정보
          </h2>
          <div className="page-actions">
            <Link to="/list" className="btn btn-secondary me-2">
              <i className="ri-arrow-left-line"></i> 목록
            </Link>
            <Link to={`/update/${id}`} className="btn btn-primary me-2">
              <i className="ri-edit-2-line"></i> 수정
            </Link>
            <button onClick={handleDelete} className="btn btn-outline-danger">
              <i className="ri-delete-bin-6-line"></i> 삭제
            </button>
          </div>
        </div>

        {/* 상세 정보 카드 */}
        <div className="detail-content">
          <div className="detail-card">
            <div className="detail-header">
              <h3 className="detail-item-name">
                <i className="ri-shopping-basket-2-line"></i>
                {item.name}
              </h3>
              <span className={`badge ${getStatusBadge(item.status)}`}>
                {item.status}
              </span>
            </div>

            <div className="detail-grid">
              <div className="detail-field">
                <label className="detail-label">
                  <i className="ri-hashtag"></i> ID
                </label>
                <div className="detail-value">{item.id}</div>
              </div>

              <div className="detail-field">
                <label className="detail-label">
                  <i className="ri-folder-3-line"></i> 종류
                </label>
                <div className="detail-value">{item.type}</div>
              </div>

              <div className="detail-field">
                <label className="detail-label">
                  <i className="ri-stack-line"></i> 수량
                </label>
                <div className="detail-value">{item.qty}개</div>
              </div>

              <div className="detail-field">
                <label className="detail-label">
                  <i className="ri-money-dollar-circle-line"></i> 가격
                </label>
                <div className="detail-value">{formatPrice(item.price)}원</div>
              </div>

              <div className="detail-field">
                <label className="detail-label">
                  <i className="ri-calendar-check-line"></i> 구매일
                </label>
                <div className="detail-value">{item.buy}</div>
              </div>

              <div className="detail-field">
                <label className="detail-label">
                  <i className="ri-calendar-event-line"></i> 소비기한
                </label>
                <div className="detail-value">{item.expire}</div>
              </div>

              <div className="detail-field full-width">
                <label className="detail-label">
                  <i className="ri-file-text-line"></i> 비고
                </label>
                <div className="detail-value">{item.note || "(없음)"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
