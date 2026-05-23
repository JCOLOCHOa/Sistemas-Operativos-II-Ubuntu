const API_URL = '/api/events'; // Ruta de la API

// Espera a que cargue la página
document.addEventListener('DOMContentLoaded', () => {
    cargarEventos(); // Carga los eventos al iniciar
    setInterval(cargarEventos, 5000); // Actualiza eventos cada 5 segundos
});

// Detecta el envío del formulario
document.getElementById('eventForm').addEventListener('submit', async (e) => {

    e.preventDefault(); // Evita recargar la página

    // Obtiene los valores del formulario
    const tipo = document.getElementById('tipo').value;
    const mensaje = document.getElementById('mensaje').value;
    const datosRaw = document.getElementById('datos').value;

    let datos = {};

    // Convierte el texto JSON a objeto
    try { 
        if (datosRaw) datos = JSON.parse(datosRaw); 
    }
    catch { 
        alert('FORMATO JSON INVALIDO'); 
        return; 
    }

    try {

        // Envía los datos al servidor
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tipo, mensaje, datos })
        });

        // Si se guardó correctamente
        if (res.ok) {
            document.getElementById('eventForm').reset(); // Limpia formulario
            cargarEventos(); // Recarga eventos
        } else {
            alert('ERROR EN TRANSMISION');
        }

    } catch {
        alert('¡SIN CONEXION AL SERVIDOR!');
    }
});

// Función para cargar eventos desde la API
async function cargarEventos() {

    const statusEl = document.getElementById('status');
    const listEl = document.getElementById('eventsList');

    try {

        // Solicita los eventos al servidor
        const res = await fetch(API_URL);
        const events = await res.json();

        // Cambia estado a conectado
        statusEl.innerHTML = '<span>Conectado</span>';
        statusEl.classList.remove('offline');

        // Si no hay eventos
        if (events.length === 0) {
            listEl.innerHTML = '<p class="empty">Esperando transmisiones...</p>';
            return;
        }

        // Recorre y muestra cada evento
        listEl.innerHTML = events.map(ev => {

            // Formatea fecha y hora
            const fecha = new Date(ev.timestamp).toLocaleString('es-GT', {
                year: 'numeric', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit', second: '2-digit'
            });

            // Muestra datos extra si existen
            const datosStr = Object.keys(ev.datos || {}).length
                ? `<pre>${JSON.stringify(ev.datos, null, 2)}</pre>`
                : '';

            // Tarjeta HTML del evento
            return `
            <div class="event-card">
                <div class="meta">
                    <span class="tipo">
                        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="2"/>
                            <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="currentColor" stroke-width="2"/>
                        </svg>
                        ${ev.tipo}
                    </span>
                    <span>${fecha}</span>
                </div>

                <div><strong>${ev.mensaje}</strong></div>

                ${datosStr}
            </div>
            `;
        }).join('');

    } catch {

        // Cambia estado a desconectado
        statusEl.innerHTML = '<span>Desconectado</span>';
        statusEl.classList.add('offline');

        // Mensaje de error
        listEl.innerHTML = '<p class="empty">SIN CONEXION AL SERVIDOR DE COMANDO</p>';
    }
}