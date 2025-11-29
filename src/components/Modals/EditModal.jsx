// // src/components/Modals/EditModal.jsx
// import React, { useState, useEffect } from "react";
// import { updateItem } from "../Api/useApi";

// export default function EditModal({ show, onClose, item, onSave }) {
//   const [form, setForm] = useState({
//     name: "",
//     qty: 1,
//     type: "",
//     status: "",
//     buy: "",
//     expire: "",
//     price: 0,
//     note: ""
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (item) {
//       setForm({
//         name: item.name || "",
//         qty: item.qty || 1,
//         type: item.type || "",
//         status: item.status || "",
//         buy: item.buy || "",
//         expire: item.expire || "",
//         price: item.price || 0,
//         note: item.note || ""
//       });
//     }
//   }, [item]);

//   if (!show || !item) return null;

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
//       const res = await updateItem(item.id, form);
//       alert("항목이 수정되었습니다: " + res.name);
//       onSave();
//       onClose();
//     } catch (err) {
//       console.error(err);
//       setError("수정 중 오류가 발생했습니다.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClose = () => {
//     setError(null);
//     onClose();
//   };

//   return (
//     <div className="modal-overlay" onClick={handleClose}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         <div className="modal-header">
//           <h5><i className="ri-edit-2-line"></i> 항목 수정</h5>
//           <button className="btn-close" onClick={handleClose}>×</button>
//         </div>

//         <div className="modal-body">
//           <div className="row g-3">
//             <div className="col-md-6">
//               <label>상품명 *</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="name"
//                 value={form.name}
//                 onChange={handleChange("name")}
//                 required
//               />
//             </div>
//             <div className="col-md-6">
//               <label>수량 *</label>
//               <input
//                 type="number"
//                 className="form-control"
//                 name="qty"
//                 value={form.qty}
//                 onChange={handleChange("qty")}
//                 min="1"
//                 required
//               />
//             </div>
//             <div className="col-md-6">
//               <label>종류 *</label>
//               <select
//                 className="form-select"
//                 name="type"
//                 value={form.type}
//                 onChange={handleChange("type")}
//                 required
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
//                 name="status"
//                 value={form.status}
//                 onChange={handleChange("status")}
//                 required
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
//                 name="buy"
//                 value={form.buy}
//                 onChange={handleChange("buy")}
//                 required
//               />
//             </div>
//             <div className="col-md-6">
//               <label>소비기한 *</label>
//               <input
//                 type="date"
//                 className="form-control"
//                 name="expire"
//                 value={form.expire}
//                 onChange={handleChange("expire")}
//                 required
//               />
//             </div>
//             <div className="col-md-6">
//               <label>가격(원) *</label>
//               <input
//                 type="number"
//                 className="form-control"
//                 name="price"
//                 value={form.price}
//                 onChange={handleChange("price")}
//                 min="0"
//                 required
//               />
//             </div>
//             <div className="col-md-6">
//               <label>비고</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="note"
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
//             className="btn btn-primary"
//             onClick={handleSubmit}
//             disabled={loading}
//           >
//             <i className="ri-save-line"></i> {loading ? "저장 중..." : "수정 저장"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
