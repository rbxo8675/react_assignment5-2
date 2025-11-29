// src/components/Items/ItemRow.jsx
import { Link } from "react-router-dom";

export default function ItemRow({ item, onDelete, formatPrice, getStatusBadge }) {
  return (
    <tr>
      <td>{item.id}</td>
      <td>
        <Link to={`/detail/${item.id}`} className="item-name-link">
          <strong>{item.name}</strong>
        </Link>
      </td>
      <td>{item.type}</td>
      <td>{item.qty}</td>
      <td>
        <span className={`badge ${getStatusBadge(item.status)}`}>
          {item.status}
        </span>
      </td>
      <td>{item.buy}</td>
      <td>{item.expire}</td>
      <td>{formatPrice(item.price)}원</td>
      <td>{item.note || ""}</td>
      <td className="text-nowrap">
        <Link
          to={`/detail/${item.id}`}
          className="btn btn-sm btn-outline-info me-1"
          title="상세보기"
        >
          <i className="ri-eye-line"></i>
        </Link>
        <Link
          to={`/update/${item.id}`}
          className="btn btn-sm btn-outline-primary me-1"
          title="수정"
        >
          <i className="ri-edit-2-line"></i>
        </Link>
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={onDelete}
          title="삭제"
        >
          <i className="ri-delete-bin-6-line"></i>
        </button>
      </td>
    </tr>
  );
}
