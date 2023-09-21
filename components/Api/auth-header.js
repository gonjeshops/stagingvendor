export default function authHeader() {
  if (typeof window !== "undefined") {
    const user = JSON.parse(localStorage.getItem("user_detail"));
    if (user && user.token) {
      return { Authorization: "Bearer " + user.token };
    } else {
      return {};
    }
  }
}
