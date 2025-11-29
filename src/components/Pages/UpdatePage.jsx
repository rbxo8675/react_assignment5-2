// src/components/Pages/UpdatePage.jsx
import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getItems, updateItem } from "../Api/useApi";

export default function UpdatePage() {
  const { id } = useParams();

  // useState
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 수정 횟수 카운터 (useState)
  const [editCount, setEditCount] = useState(0);

  // useRef
  const nameRef = useRef(null);
  const qtyRef = useRef(null);
  const buyRef = useRef(null);
  const expireRef = useRef(null);
  const priceRef = useRef(null);

 
  useEffect(() => {
    const loadItem = async () => {
      try {
        setLoading(true);
        const data = await getItems();
        const found = data.find((i) => i.id === id);

        if (found) {
          setFormData(found);
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


  const validateField = (field, value) => {
    switch (field) {
      case "name":
        if (!value || !value.trim()) {
          alert("이름을 입력해주세요.");
          nameRef.current.focus();
          return false;
        }
        break;
      case "qty":
        if (!value || value <= 0) {
          alert("수량은 1 이상이어야 합니다.");
          qtyRef.current.focus();
          return false;
        }
        break;
      case "buy":
        if (!value) {
          alert("구매일을 선택해주세요.");
          buyRef.current.focus();
          return false;
        }
        break;
      case "expire":
        if (!value) {
          alert("소비기한을 선택해주세요.");
          expireRef.current.focus();
          return false;
        }
        // 소비기한이 구매일보다 빠른지 
        if (formData.buy && value < formData.buy) {
          alert("소비기한은 구매일 이후여야 합니다.");
          expireRef.current.focus();
          return false;
        }
        break;
      case "price":
        if (!value || value < 0) {
          alert("가격을 입력해주세요.");
          priceRef.current.focus();
          return false;
        }
        break;
      default:
        break;
    }
    return true;
  };

  // onChange 시 즉시 PUT API 호출 (수정하기 버튼 없이)
  const handleChange = async (field, value) => {
    // 유효성 
    if (!validateField(field, value)) {
      return;
    }

    // 로컬 상태 업데이트
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);

    // 수정 횟수 증가
    setEditCount((prev) => prev + 1);

    try {
      await updateItem(id, updatedData);
      console.log(`필드 "${field}" 업데이트 완료:`, value);
    } catch (err) {
      console.error("updateItem error:", err);
      alert(`업데이트 실패: ${err.message}`);
      setFormData(formData);
      setEditCount((prev) => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="app-container">
        <div className="update-page">
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

  if (error || !formData) {
    return (
      <div className="app-container">
        <div className="update-page">
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
      <div className="update-page">
        {/* 페이지 헤더 */}
        <div className="page-header">
          <h2 className="page-title">
            <i className="ri-edit-2-line"></i> 항목 수정
          </h2>
          <div className="page-actions">
            <Link to={`/detail/${id}`} className="btn btn-secondary me-2">
              <i className="ri-arrow-left-line"></i> 취소
            </Link>
            <Link to="/list" className="btn btn-outline-secondary">
              <i className="ri-list-check"></i> 목록
            </Link>
          </div>
        </div>

        {/* 폼 컨텐츠 */}
        <div className="form-content">
          <form className="update-form">
            <div className="form-grid">
              {/* 이름 */}
              <div className="form-group">
                <label className="form-label required">
                  <i className="ri-text"></i> 이름
                </label>
                <input
                  ref={nameRef}
                  type="text"
                  className="form-control"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="예: 우유"
                />
              </div>

              {/* 수량 */}
              <div className="form-group">
                <label className="form-label required">
                  <i className="ri-stack-line"></i> 수량
                </label>
                <input
                  ref={qtyRef}
                  type="number"
                  className="form-control"
                  value={formData.qty}
                  onChange={(e) => handleChange("qty", e.target.value)}
                  placeholder="예: 2"
                  min="1"
                />
              </div>

              {/* 종류 */}
              <div className="form-group">
                <label className="form-label required">
                  <i className="ri-folder-3-line"></i> 종류
                </label>
                <select
                  className="form-select"
                  value={formData.type}
                  onChange={(e) => handleChange("type", e.target.value)}
                >
                  <option value="냉장">냉장</option>
                  <option value="냉동">냉동</option>
                  <option value="실온">실온</option>
                </select>
              </div>

              {/* 상태 */}
              <div className="form-group">
                <label className="form-label required">
                  <i className="ri-heart-pulse-line"></i> 상태
                </label>
                <select
                  className="form-select"
                  value={formData.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                >
                  <option value="좋음">좋음</option>
                  <option value="빨리 먹어야 함">빨리 먹어야 함</option>
                  <option value="폐기 예정">폐기 예정</option>
                </select>
              </div>

              {/* 구매일 */}
              <div className="form-group">
                <label className="form-label required">
                  <i className="ri-calendar-check-line"></i> 구매일
                </label>
                <input
                  ref={buyRef}
                  type="date"
                  className="form-control"
                  value={formData.buy}
                  onChange={(e) => handleChange("buy", e.target.value)}
                />
              </div>

              {/* 소비기한 */}
              <div className="form-group">
                <label className="form-label required">
                  <i className="ri-calendar-event-line"></i> 소비기한
                </label>
                <input
                  ref={expireRef}
                  type="date"
                  className="form-control"
                  value={formData.expire}
                  onChange={(e) => handleChange("expire", e.target.value)}
                />
              </div>

              {/* 가격 */}
              <div className="form-group">
                <label className="form-label required">
                  <i className="ri-money-dollar-circle-line"></i> 가격 (원)
                </label>
                <input
                  ref={priceRef}
                  type="number"
                  className="form-control"
                  value={formData.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                  placeholder="예: 3000"
                  min="0"
                />
              </div>

              {/* 비고 */}
              <div className="form-group full-width">
                <label className="form-label">
                  <i className="ri-file-text-line"></i> 비고
                </label>
                <textarea
                  className="form-control"
                  value={formData.note || ""}
                  onChange={(e) => handleChange("note", e.target.value)}
                  placeholder="추가 메모 (선택사항)"
                  rows="3"
                />
              </div>
            </div>

            {/* 버튼 그룹 */}
            <div className="form-actions">
              <Link to="/list" className="btn btn-secondary btn-lg">
                <i className="ri-arrow-left-line"></i> 목록으로
              </Link>
              <Link to={`/detail/${id}`} className="btn btn-primary btn-lg">
                <i className="ri-check-line"></i> 완료
              </Link>
            </div>

            {/* 수정 횟수 - 하단 */}
            <div className="update-counter-bottom">
              페이지 로딩 후 총 수정 횟수: {editCount}회
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
