// Datos simulados (Mock Data) y lógica de sesión/autorización para la demostración

const MOCK_USERS = {
  105: {
    id: 105,
    role: "cliente",
    roleLabel: "Cliente",
    nombre: "Juan Pablo Ruiz Navarro",
    email: "pablo.ruiz@correo.com",
    password: "Pablo2026!",
    telefono: "+52 55 4120 8831",
    direccion: "Calle Pino Suárez 214, Col. Centro, Ciudad de México, CP 06000",
    rfc: "RUNC940318HT2",
    metodoPago: "Mastercard terminación 1942",
    fechaRegistro: "12/03/2025",
    pedidos: [
      {
        id: "PED-8801",
        fecha: "02/11/2026",
        producto: "Teclado Mecánico Inalámbrico K8",
        total: "$1,450.00 MXN",
        estado: "Entregado"
      },
      {
        id: "PED-8845",
        fecha: "14/11/2026",
        producto: "Mouse Ergonómico Pro",
        total: "$680.00 MXN",
        estado: "En camino"
      }
    ],
    facturas: [
      {
        folio: "FAC-2026-0412",
        fecha: "02/11/2026",
        concepto: "Teclado Mecánico Inalámbrico K8",
        subtotal: "$1,250.00 MXN",
        iva: "$200.00 MXN",
        total: "$1,450.00 MXN",
        estado: "Pagada"
      }
    ]
  },
  106: {
    id: 106,
    role: "cliente",
    roleLabel: "Cliente",
    nombre: "Laura Mendoza Vega",
    email: "laura.mendoza@correo.com",
    password: "Laura2026!",
    telefono: "+52 55 9876 5432",
    direccion: "Av. Reforma 1450, Lomas de Chapultepec, Ciudad de México, CP 11000",
    rfc: "MEVL910824MDF",
    metodoPago: "Visa Platinum terminación 4829",
    fechaRegistro: "05/01/2024",
    pedidos: [
      {
        id: "PED-9012",
        fecha: "28/10/2026",
        producto: "Laptop Corporativa UltraBook 14\"",
        total: "$24,990.00 MXN",
        estado: "Entregado"
      },
      {
        id: "PED-9089",
        fecha: "10/11/2026",
        producto: "Monitor 27\" 4K IPS + Base Ajustable",
        total: "$8,450.00 MXN",
        estado: "En camino"
      },
      {
        id: "PED-9115",
        fecha: "16/11/2026",
        producto: "Docking Station USB-C Dual HDMI",
        total: "$2,190.00 MXN",
        estado: "Procesando"
      }
    ],
    facturas: [
      {
        folio: "FAC-2026-0501",
        fecha: "28/10/2026",
        concepto: "Laptop Corporativa UltraBook 14\"",
        subtotal: "$21,543.10 MXN",
        iva: "$3,446.90 MXN",
        total: "$24,990.00 MXN",
        estado: "Pagada"
      },
      {
        folio: "FAC-2026-0538",
        fecha: "10/11/2026",
        concepto: "Monitor 27\" 4K IPS + Base Ajustable",
        subtotal: "$7,284.48 MXN",
        iva: "$1,165.52 MXN",
        total: "$8,450.00 MXN",
        estado: "Pagada"
      }
    ]
  },
  100: {
    id: 100,
    role: "admin",
    roleLabel: "Administrador de Seguridad",
    nombre: "Ing. Monica Sánchez",
    email: "monica@novacomercial.com",
    password: "Admin2026!",
    telefono: "+52 55 5000 1000",
    direccion: "Oficinas Centrales NovaComercial, Torre B Piso 8",
    rfc: "SAGR850510ABC",
    metodoPago: "Cuenta Corporativa",
    fechaRegistro: "01/01/2023",
    pedidos: [],
    facturas: []
  }
};

const STORAGE_KEYS = {
  SESSION: "nova_session_user_id",
  SECURITY_MODE: "nova_security_mode", // "vulnerable" | "protected"
  AUDIT_LOGS: "nova_audit_logs"
};

function getSecurityMode() {
  return localStorage.getItem(STORAGE_KEYS.SECURITY_MODE) || "vulnerable";
}

function setSecurityMode(mode) {
  localStorage.setItem(STORAGE_KEYS.SECURITY_MODE, mode);
}

function getCurrentUser() {
  const rawId = localStorage.getItem(STORAGE_KEYS.SESSION);
  if (!rawId) return null;
  return MOCK_USERS[Number(rawId)] || null;
}

function loginWithCredentials(email, password) {
  const normalized = email.trim().toLowerCase();
  const user = Object.values(MOCK_USERS).find(
    (u) => u.email.toLowerCase() === normalized && u.password === password
  );
  if (!user) return null;
  localStorage.setItem(STORAGE_KEYS.SESSION, String(user.id));
  addAuditLog({
    actorId: user.id,
    actorNombre: user.nombre,
    targetId: user.id,
    accion: "Inicio de sesión",
    resultado: "Autenticado"
  });
  return user;
}

function logout() {
  localStorage.removeItem(STORAGE_KEYS.SESSION);
  window.location.href = "index.html";
}

function getAuditLogs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function addAuditLog(entry) {
  const logs = getAuditLogs();
  const now = new Date();
  const hora = now.toLocaleTimeString("es-MX", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
  logs.unshift({
    hora,
    ...entry
  });
  // Mantener los últimos 25 registros
  localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(logs.slice(0, 25)));
}

function resetSimulation() {
  localStorage.setItem(STORAGE_KEYS.SECURITY_MODE, "vulnerable");
  localStorage.removeItem(STORAGE_KEYS.AUDIT_LOGS);
}
