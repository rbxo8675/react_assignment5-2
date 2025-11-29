// src/components/Pages/CreatePage.jsx
import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createItem } from "../Api/useApi";

export default function CreatePage() {
  const navigate = useNavigate();
  
  // useState
  const [formData, setFormData] = useState({
    name: "",
    qty: "",
    type: "냉장",
    status: "좋음",
    buy: "",
    expire: "",
    price: "",
    note: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // useRef
  const nameRef = useRef(null);
  const qtyRef = useRef(null);
  const buyRef = useRef(null);
  const expireRef = useRef(null);
  const priceRef = useRef(null);

 
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // useRef  
  const validateForm = () => {
    // 이름 
    if (!formData.name.trim()) {
      alert("이름을 입력해주세요.");
      nameRef.current.focus();
      return false;
    }

    // 수량 
    if (!formData.qty || formData.qty <= 0) {
      alert("수량은 1 이상이어야 합니다.");
      qtyRef.current.focus();
      return false;
    }

    // 구매일  
    if (!formData.buy) {
      alert("구매일을 선택해주세요.");
      buyRef.current.focus();
      return false;
    }

    // 소비기한  
    if (!formData.expire) {
      alert("소비기한을 선택해주세요.");
      expireRef.current.focus();
      return false;
    }

    // 소비기한이 구매일보다 빠른지  
    if (formData.expire < formData.buy) {
      alert("소비기한은 구매일 이후여야 합니다.");
      expireRef.current.focus();
      return false;
    }

    // 가격  
    if (!formData.price || formData.price < 0) {
      alert("가격을 입력해주세요.");
      priceRef.current.focus();
      return false;
    }

    return true;
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    // useRef
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // API 호출
      await createItem({
        name: formData.name,
        qty: parseInt(formData.qty),
        type: formData.type,
        status: formData.status,
        buy: formData.buy,
        expire: formData.expire,
        price: parseInt(formData.price),
        note: formData.note
      });

      alert("새 항목이 추가되었습니다!");
      navigate("/list");
    } catch (err) {
      console.error("createItem error:", err);
      alert("항목 추가에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app-container">
      <div className="create-page">
        {/* 페이지 헤더 */}
        <div className="page-header">
          <h2 className="page-title">
            <i className="ri-add-circle-line"></i> 새 항목 추가
          </h2>
          <div className="page-actions">
            <Link to="/list" className="btn btn-secondary">
              <i className="ri-arrow-left-line"></i> 취소
            </Link>
          </div>
        </div>

        {/* 폼 컨텐츠 */}
        <div className="form-content">
          <form onSubmit={handleSubmit} className="create-form">
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
                  value={formData.note}
                  onChange={(e) => handleChange("note", e.target.value)}
                  placeholder="추가 메모 (선택사항)"
                  rows="3"
                />
              </div>
            </div>

            {/* 버튼 그룹 */}
            <div className="form-actions">
              <Link to="/list" className="btn btn-secondary btn-lg">
                <i className="ri-close-line"></i> 취소
              </Link>
              <button
                type="submit"
                className="btn btn-success btn-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    추가 중...
                  </>
                ) : (
                  <>
                    <i className="ri-save-line"></i> 추가하기
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
