// js/main.js

// Espera a que la página termine de cargar
document.addEventListener("DOMContentLoaded", () => {
  console.log("Casino Royale — Script activo ✅");

  // --- LOGIN ---
  const loginForm = document.querySelector('form[action="/procesar-login"]');
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault(); // Evita recargar la página

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Validaciones básicas
      if (!email || !password) {
        alert("Por favor completa todos los campos.");
        return;
      }

      // Simular login exitoso
      alert(`Inicio de sesión exitoso para: ${email}`);
      window.location.href = "index.html"; // Redirigir al inicio
    });
  }

  // --- REGISTRO ---
  const registerForm = document.querySelector('form[action="/procesar-registro"]');
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nombre = document.getElementById("nombre").value;
      const email = document.getElementById("email").value;
      const pass = document.getElementById("password").value;
      const confirm = document.getElementById("confirmar").value;

      // Validaciones
      if (!nombre || !email || !pass || !confirm) {
        alert("Todos los campos son obligatorios.");
        return;
      }

      if (pass !== confirm) {
        alert("Las contraseñas no coinciden.");
        return;
      }

      // Simular registro exitoso
      alert(`Registro exitoso. ¡Bienvenido/a, ${nombre}!`);
      window.location.href = "login.html"; // Redirigir al login
    });
  }
});
