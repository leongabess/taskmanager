document.getElementById("loginForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const data = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
  };
  

  try {
    //const response = await fetch("http://localhost:5000/api/login", {
    const response = await fetch(`${window.apiBaseUrl}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    if (response.ok) {
        const token = result.token;
        localStorage.setItem("token", token);
        localStorage.setItem("username", result.username);
        console.log("Token é o ", token)
        alert("Login feito!")        
        window.location.href = "./dashboard.html";
    } else {
      alert(result.message || "Erro ao tentar entrar");
    }
  } catch (err) {
    console.error("Erro:", err);
    alert("Erro na conexão com o servidor.");
  }
});