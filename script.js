// Espera que el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("client-form");
  const messages = document.getElementById("form-messages");
  const anio = document.getElementById("anio");

  // Mostrar el año actual en el footer
  anio.textContent = new Date().getFullYear();

  // Función para mostrar mensajes bonitos
  function showMessage(text, type = "success") {
    messages.textContent = text;
    messages.className = `show ${type}`;
    messages.style.display = "block";

    // Ocultar después de 4 segundos
    setTimeout(() => {
      messages.classList.remove("show");
      setTimeout(() => (messages.style.display = "none"), 300);
    }, 4000);
  }

  // Guardar datos en localStorage
  function saveClient(data) {
    let clients = JSON.parse(localStorage.getItem("clientes")) || [];
    clients.push(data);
    localStorage.setItem("clientes", JSON.stringify(clients));
  }

  // Función de validación
  function validateClient(nombre, cedula, email, telefono, direccion) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cedulaRegex = /^[0-9]{10}$/;
    const telefonoRegex = /^[0-9]{10}$/;
    const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/; // Solo letras y espacios
    
    
    // Campos obligatorios
    if (!nombre || !cedula || !email || !direccion) {
      showMessage("⚠️ Por favor complete todos los campos obligatorios.", "error");
      return false;
    }

    // Validación de nombre
    if (!nombreRegex.test(nombre)) {
      showMessage("❌ El nombre solo debe contener letras y espacios.", "error");
      return false;
    }

    const partesNombre = nombre.trim().split(/\s+/);
    if (partesNombre.length < 2) {
      showMessage("🧾 Ingrese al menos dos nombres (por ejemplo: Juan Pérez).", "error");
      return false;
    }

    // Validación de cédula
    if (!cedulaRegex.test(cedula)) {
      showMessage("❌ La cédula debe tener 10 dígitos numéricos.", "error");
      return false;
    }

    // Validación de correo
    if (!emailRegex.test(email)) {
      showMessage("📧 Ingrese un correo electrónico válido.", "error");
      return false;
    }

    // Validación de teléfono (opcional)
    if (telefono && !telefonoRegex.test(telefono)) {
      showMessage("📞 El teléfono debe tener 10 dígitos numéricos.", "error");
      return false;
    }

     if (!direccion) {
      showMessage("🏠 Por favor ingrese la dirección del cliente.", "error");
      return false;
    }

    return true;
  }

  // Validación y envío del formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("cliente-nombre").value.trim();
    const cedula = document.getElementById("cliente-cedula").value.trim();
    const email = document.getElementById("cliente-email").value.trim();
    const telefono = document.getElementById("cliente-telefono").value.trim();
    const direccion = document.getElementById("cliente-direccion").value.trim();

    if (!validateClient(nombre, cedula, email, telefono,direccion)) return;

    const cliente = {
      nombre,
      cedula,
      fecha_nacimiento: document.getElementById("cliente-fecha-nac").value,
      email,
      telefono,
      direccion,
      empresa: document.getElementById("cliente-empresa").value.trim(),
      tipo: document.getElementById("cliente-tipo").value,
      notas: document.getElementById("cliente-notas").value.trim(),
      registrado: new Date().toLocaleString()
    };

    saveClient(cliente);
    showMessage("✅ Cliente guardado correctamente.", "success");
    form.reset();
  });
});
