// Función para registrar el usuario y almacenar las cookies
function registrar() {
    let usuario = document.getElementById("usuarioInput").value;
    let email = document.getElementById("emailInput").value;
    let password = document.getElementById("passwordInput").value;
    let telefono = document.getElementById("telefonoInput").value;

    // Validaciones
    if (!usuario) {
        mostrarError("El nombre de usuario es obligatorio.");
        return;
    }

    if (!validarEmail(email)) {
        mostrarError("El correo electrónico no tiene el formato correcto.");
        return;
    }

    if (!validarPassword(password)) {
        mostrarError("La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número.");
        return;
    }

    if (!validarTelefono(telefono)) {
        mostrarError("El teléfono debe tener 9 dígitos y empezar con 6, 7 o 9.");
        return;
    }

    // Leer las cookies existentes de usuarios y contraseñas
    let usuariosExistentes = obtenerCookie("usuarios");
    let contrasenasExistentes = obtenerCookie("contrasenas");

    // Si no existen cookies, inicializarlas como cadenas vacías
    if (!usuariosExistentes) {
        usuariosExistentes = "";
    }
    if (!contrasenasExistentes) {
        contrasenasExistentes = "";
    }

    // Concatenar el nuevo usuario y contraseña con los existentes
    if (usuariosExistentes !== "") {
        usuariosExistentes += "@" + usuario;
        contrasenasExistentes += "@" + password;
    } else {

        usuariosExistentes = usuario;
        contrasenasExistentes = password;
    }

    // Guardar las cookies actualizadas
    document.cookie = "usuarios=" + usuariosExistentes + "; path=/;";
    document.cookie = "contrasenas=" + contrasenasExistentes + "; path=/;";

    // Limpiar los campos y los errores
    document.getElementById("usuarioInput").value = '';
    document.getElementById("emailInput").value = '';
    document.getElementById("passwordInput").value = '';
    document.getElementById("telefonoInput").value = '';
    mostrarError("");

    alert("Se ha creado el usuario ");
}

// Función para iniciar sesión y verificar las credenciales
function login() {
    let usuario = document.getElementById("usuarioInput").value;
    let password = document.getElementById("passwordInput").value;

    // Obtener las cookies de usuarios y contraseñas
    let usuariosExistentes = obtenerCookie("usuarios");
    let contrasenasExistentes = obtenerCookie("contrasenas");

    // Verificar si las cookies existen
    if (!usuariosExistentes || !contrasenasExistentes) {
        mostrarError("No hay usuarios registrados.");
        return;
    }

    // Convertir las cookies en arrays de usuarios y contraseñas
    let usuariosArray = usuariosExistentes.split("@");
    let contrasenasArray = contrasenasExistentes.split("@");

    // Buscar si el usuario y la contraseña coinciden
    let usuarioValido = false;
    for (let i = 0; i < usuariosArray.length; i++) {
        if (usuariosArray[i] === usuario && contrasenasArray[i] === password) {
            usuarioValido = true;
            break;
        }
    }

    // Si el usuario es válido, redirigir a la página principal
    if (usuarioValido) {
        window.location.href = "../pagina/index.html"; 
    } else {
        mostrarError("Usuario o contraseña incorrectos.");
    }
}

// Función para obtener una cookie por su nombre
function obtenerCookie(nombre) {
    let cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
        let [clave, valor] = cookies[i].split("=");
        if (clave === nombre) {
            return valor;
        }
    }
    return null; 
}

// Función para mostrar los mensajes de error
function mostrarError(mensaje) {
    document.getElementById("errorMessages").innerText = mensaje; 
   
}

// Función para validar el formato del correo electrónico
function validarEmail(email) {
    let valEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return valEmail.test(email);
}

// Función para validar la contraseña
function validarPassword(password) {
    let valPassword = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return valPassword.test(password);
}

// Función para validar el teléfono
function validarTelefono(telefono) {
    let valTelefono = /^[67-9][0-9]{8}$/;
    return valTelefono.test(telefono);
}

// Función para mostrar los mensajes de error
function mostrarError(mensaje) {
    document.getElementById("errorMessages").innerText = mensaje;
}

