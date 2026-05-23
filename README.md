# Sistema de Monitoreo de Eventos – Torreta Defensiva GT

## Descripción General

Este proyecto consiste en la implementación de un entorno Linux en la nube para el monitoreo y registro centralizado de eventos generados por el proyecto robótico **Torreta Defensiva GT**. La solución integra un servidor backend, una base de datos no relacional y una interfaz web de visualización, ejecutándose mediante contenedores Docker en un único servidor.

La finalidad del sistema es almacenar y visualizar eventos producidos por el proyecto robótico, permitiendo llevar un historial estructurado de acciones y detecciones realizadas durante su funcionamiento.

Durante el desarrollo se planteó la integración directa con los eventos generados por el sensor ultrasónico HC-SR04 de la torreta. Sin embargo, la transmisión automática de dichos eventos desde el sistema robótico hacia el servidor no logró implementarse completamente. Aun así, se desarrolló la infraestructura necesaria para la recepción, almacenamiento y visualización de registros.

---

# Objetivos

## Objetivo General
Implementar un entorno Linux en la nube que integre un sistema de monitoreo de eventos basado en un backend, una base de datos MongoDB y una interfaz web, utilizando contenedores Docker.

## Objetivos Específicos
- Configurar y administrar un servidor Linux en la nube.
- Implementar un servidor backend para recepción y almacenamiento de eventos.
- Integrar MongoDB para persistencia de datos.
- Desarrollar un dashboard web para visualización de registros.
- Implementar contenedores Docker para todos los servicios.
- Integrar el sistema con el proyecto robótico Torreta Defensiva GT.


# Arquitectura del Sistema
El sistema fue diseñado bajo una arquitectura de tres capas:

```text
Torreta Defensiva GT
        ↓
Servidor Backend API
        ↓
MongoDB
        ↓
Dashboard Web
```

### Flujo del sistema

1. El sistema robótico genera eventos.
2. Los eventos son enviados al servidor backend mediante peticiones HTTP.
3. El backend procesa y almacena los registros en MongoDB.
4. El frontend consulta la información mediante el backend.
5. Los eventos son visualizados desde un dashboard web.

# Componentes del Proyecto

## 1. Backend – Log de Eventos

El backend funciona como receptor centralizado de eventos provenientes del sistema robótico.

Funciones implementadas:

- Exposición de endpoints HTTP.
- Recepción de eventos.
- Registro con timestamp.
- Comunicación con MongoDB.
- Gestión de solicitudes entre frontend y base de datos.

Ejemplo de estructura de evento:

```json
{
   "evento":"deteccion",
   "sensor":"HC-SR04",
   "fecha":"2026-05-22",
   "hora":"14:45:20",
   "distancia":"35 cm"
}
```

---

## 2. Base de Datos – MongoDB

Se implementó una instancia MongoDB ejecutándose dentro de un contenedor Docker.

Su función principal es:

- Almacenar eventos registrados
- Mantener persistencia de información
- Organizar datos de manera estructurada

---

## 3. Frontend – Dashboard Web

El frontend proporciona una interfaz para la visualización de los registros almacenados.

Características:

- Dashboard de eventos
- Consulta de registros
- Visualización ordenada
- Interfaz accesible desde navegador


# Contenedores Docker

El sistema se encuentra dividido en tres servicios:

- Contenedor Backend
- Contenedor MongoDB
- Contenedor Frontend

Todos los componentes se ejecutan dentro de un único servidor Linux.

---

# Dirección IP pública del servidor

IP pública: http://142.93.121.158/
