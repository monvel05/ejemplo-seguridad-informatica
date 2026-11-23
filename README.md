# NovaComercial — Simulación de Vulnerabilidad de Autorización (IDOR)

Aplicación web de ejemplo con tema limpio diseñada para simular una **vulnerabilidad de autorización** (acceso no autorizado mediante manipulación del parámetro `?id=` en la URL) y su posterior **mitigación**.

## Cuentas de prueba

| Personaje | Correo | Contraseña | ID |
| :--- | :--- | :--- | :--- |
| **Víctima** (Laura Mendoza) | `laura.mendoza@correo.com` | `Laura2026!` | `106` |
| **Atacante** (Carlos Ruiz) | `carlos.ruiz@correo.com` | `Carlos2026!` | `105` |
| **Administrador** (Ing. Roberto Sánchez) | `admin@novacomercial.com` | `Admin2026!` | `100` |

## Guía rápida para la grabación (Escenas 1 a 5)

1. **Escena 1 (Inicio):** Inicia sesión como **Víctima (`laura.mendoza@correo.com`)**. Se abrirá `perfil.html?id=106` mostrando sus datos personales, pedidos y facturas. Luego cierra sesión.
2. **Escena 2 (Ataque):** Inicia sesión como **Atacante (`carlos.ruiz@correo.com`)**. Se abrirá `perfil.html?id=105`.
3. **Escena 3 (Consecuencias):** En la barra de direcciones del navegador, cambia `?id=105` por `?id=106` y presiona **Enter**. Como el sistema está en **modo vulnerable** (solo verifica autenticación, no autorización), mostrará los datos privados de Laura Mendoza.
4. **Escena 4 (Detección y solución):** Cierra sesión e inicia como **Administrador (`admin@novacomercial.com`)**. En el **Panel de Administración y Seguridad**, revisa el registro de auditoría donde quedó evidenciado el acceso no autorizado y haz clic en **"Activar control de autorización (Aplicar mitigación)"**.
5. **Escena 5 (Final):** Cierra sesión, inicia de nuevo como **Atacante (`105`)** e intenta cambiar la URL a `perfil.html?id=106`. El sistema ahora bloqueará el acceso mostrando **403 — Acceso denegado**.

> Puedes usar el botón **"Reiniciar simulación"** dentro del panel de administrador para volver al estado inicial antes de cada toma.
