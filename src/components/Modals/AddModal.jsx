// // src/components/Modals/AddModal.jsx
// import React, { useState } from "react";
// import { createItem } from "../Api/useApi";

// export default function AddModal({ show, onClose, onSave }) {
//   const initialForm = {
//     name: "",
//     qty: 1,
//     type: "",
//     status: "",
//     buy: "",
//     expire: "",
//     price: 0,
//     note: ""
//   };

//   const [form, setForm] = useState(initialForm);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   if (!show) return null;

//   const handleChange = (field) => (e) => {
//     const value = field === "qty" || field === "price" 
//       ? parseInt(e.target.value) || 0 
//       : e.target.value;
//     setForm({ ...form, [field]: value });
//   };

//   const handleSubmit = async () => {
//     if (!form.name || !form.qty || !form.type || !form.status || !form.buy || !form.expire || !form.price) {
//       setError("모든 필수 항목(*)을 입력해주세요.");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);
//       const res = await createItem(form);
//       alert("항목이 추가되었습니다: " + res.name);
//       setForm(initialForm);
//       onSave();
//       onClose();
//     } catch (err) {
//       console.error(err);
//       setError("추가 중 오류가 발생했습니다.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClose = () => {
//     setForm(initialForm);
//     setError(null);
//     onClose();
//   };

//   return (
//     <div className="modal-overlay" onClick={handleClose}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         <div className="modal-header">
//           <h5><i className="ri-add-circle-line"></i> 새 항목 추가</h5>
//           <button className="btn-close" onClick={handleClose}>×</button>
//         </div>

//         <div className="modal-body">
//           <div className="row g-3">
//             <div className="col-md-6">
//               <label>상품명 *</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={form.name}
//                 onChange={handleChange("name")}
//               />
//             </div>
//             <div className="col-md-6">
//               <label>수량 *</label>
//               <input
//                 type="number"
//                 className="form-control"
//                 value={form.qty}
//                 onChange={handleChange("qty")}
//                 min="1"
//               />
//             </div>
//             <div className="col-md-6">
//               <label>종류 *</label>
//               <select
//                 className="form-select"
//                 value={form.type}
//                 onChange={handleChange("type")}
//               >
//                 <option value="">선택</option>
//                 <option>냉장</option>
//                 <option>냉동</option>
//               </select>
//             </div>
//             <div className="col-md-6">
//               <label>상태 *</label>
//               <select
//                 className="form-select"
//                 value={form.status}
//                 onChange={handleChange("status")}
//               >
//                 <option value="">선택</option>
//                 <option>좋음</option>
//                 <option>빨리 먹어야 함</option>
//                 <option>폐기 예정</option>
//               </select>
//             </div>
//             <div className="col-md-6">
//               <label>구매일 *</label>
//               <input
//                 type="date"
//                 className="form-control"
//                 value={form.buy}
//                 onChange={handleChange("buy")}
//               />
//             </div>
//             <div className="col-md-6">
//               <label>소비기한 *</label>
//               <input
//                 type="date"
//                 className="form-control"
//                 value={form.expire}
//                 onChange={handleChange("expire")}
//               />
//             </div>
//             <div className="col-md-6">
//               <label>가격(원) *</label>
//               <input
//                 type="number"
//                 className="form-control"
//                 value={form.price}
//                 onChange={handleChange("price")}
//                 min="0"
//               />
//             </div>
//             <div className="col-md-6">
//               <label>비고</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={form.note}
//                 onChange={handleChange("note")}
//               />
//             </div>
//           </div>

//           {error && <p className="text-danger mt-3 mb-0">{error}</p>}
//         </div>

//         <div className="modal-footer">
//           <button className="btn btn-secondary" onClick={handleClose}>
//             취소
//           </button>
//           <button
//             className="btn btn-success"
//             onClick={handleSubmit}
//             disabled={loading}
//           >
//             <i className="ri-save-line"></i> {loading ? "저장 중..." : "저장"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
