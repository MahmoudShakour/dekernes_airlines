async function signUp(data) {
  const response = await fetch("http://localhost:3000/sign-up", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) return true;
  else return false;
}

export default signUp;
