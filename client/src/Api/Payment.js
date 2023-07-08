async function submitPayment(data) {
  console.log("hi");
  const token = localStorage.getItem("token");
  const response = await fetch("http://localhost:3000/payment", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  console.log("hi");
  if (response.ok) {
    const { url } = await response.json();
    console.log(url);
    window.location = url;
  }
}

export default submitPayment;
