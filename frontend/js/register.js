document.getElementById("registerForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const data = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
  };

  try {
    const response = await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok) {
      alert("Registrado com sucesso! Prossiga para o login");
      window.location.href = "login.html";
    } else {
      alert(result.message || "Erro ao registrar");
    }
  } catch (err) {
    console.error("Erro:", err);
    alert("Erro na conexão com o servidor.");
  }
});