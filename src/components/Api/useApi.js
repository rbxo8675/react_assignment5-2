// src/components/Api/useApi.js
const API_URL = "https://6915287784e8bd126af8d6f6.mockapi.io/user";

// GET: 전체 목록 가져오기
export async function getItems() {
  const res = await fetch(API_URL);s
  if (!res.ok) throw new Error("GET 요청 실패");
  return res.json();
}

// POST: 새 데이터 추가
export async function createItem(data) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("POST 요청 실패");
  return res.json();
}

// PUT: 데이터 수정
export async function updateItem(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("PUT 요청 실패");
  return res.json();
}

// DELETE: 데이터 삭제
export async function deleteItem(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("DELETE 요청 실패");
  return res.json();
}
