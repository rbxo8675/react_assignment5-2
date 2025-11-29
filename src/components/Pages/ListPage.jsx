// src/components/Pages/ListPage.jsx
import { useState, useEffect, useCallback } from "react";
import { getItems, deleteItem } from "../Api/useApi";
import ItemRow from "../Items/ItemRow";

export default function ListPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 데이터 로드
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getItems();
      if (Array.isArray(data)) {
        setItems(data);
      } else {
        setItems([]);
      }
    } catch (err) {
      console.error("loadData error:", err);
      setError("목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // 삭제 핸들러
  const handleDelete = async (id) => {
    if (!window.confirm("ID " + id + " 항목을 삭제하시겠습니까?")) {
      return;
    }
    try {
      await deleteItem(id);
      alert("항목이 삭제되었습니다");
      loadData();
    } catch (err) {
      console.error(err);
      alert("삭제 실패");
    }
  };

  // 가격 포맷팅
  const formatPrice = (n) => new Intl.NumberFormat("ko-KR").format(n);

  // 상태에 따른 배지 색상 (파스텔 스타일)
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

  return (
    <div className="app-container">
      {/* 페이지 헤더 */}
      <div className="page-header">
        <h2 className="page-title">
          <i className="ri-list-check"></i> 냉장고 항목 목록
        </h2>
      </div>

      {/* 로딩/에러 표시 */}
      {loading && (
        <div className="d-flex align-items-center py-3 px-4 bg-white">
          <div className="spinner-border text-primary me-2" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <span>불러오는 중입니다...</span>
        </div>
      )}
      {error && <p className="text-danger px-4 py-2 bg-white mb-0">{error}</p>}

      {/* 목록 테이블 */}
      <div className="table-responsive">
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>이름</th>
              <th>종류</th>
              <th>수량</th>
              <th>상태</th>
              <th>구매일</th>
              <th>소비기한</th>
              <th>가격</th>
              <th>비고</th>
              <th>관리</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && !loading ? (
              <tr>
                <td colSpan="10" className="text-center text-muted py-4">
                  <i className="ri-inbox-line" style={{ fontSize: "3rem" }}></i>
                  <br />
                  등록된 항목이 없습니다. 새 항목을 추가해주세요.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <ItemRow
                  key={item.id}
                  item={item}
                  onDelete={() => handleDelete(item.id)}
                  formatPrice={formatPrice}
                  getStatusBadge={getStatusBadge}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
