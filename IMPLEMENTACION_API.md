# Implementación de APIs - Tecsup Support App

## 📋 Resumen

Se han implementado las APIs del backend de Tecsup en la aplicación React, integrando los tres microservicios principales:

- **API Tareas**: Gestión de tareas/homework con OCR
- **API Agentes**: Chatbots inteligentes (Mentor Académico, Psicólogo, Orientador Vocacional)
- **API Análisis**: Análisis de datos de estudiantes y predicción de deserción

## 🔧 Configuración

### Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```env
VITE_API_TAREAS=https://3oxmwg97c0.execute-api.us-east-1.amazonaws.com/dev
VITE_API_AGENTES=https://dm8lx9wo68.execute-api.us-east-1.amazonaws.com/dev
VITE_API_ANALISIS=https://nzrmmx0hj7.execute-api.us-east-1.amazonaws.com/dev
```

## 🏗️ Arquitectura

### Estructura de Archivos

```
src/
├── services/
│   ├── api.js          # Servicios de API centralizados
│   └── auth.js         # Servicio de autenticación
├── pages/
│   ├── Login.jsx       # Página de login
│   ├── Chat.jsx        # Chat con agentes IA (actualizado)
│   ├── Profile.jsx     # Perfil de usuario (actualizado)
│   └── Tasks.jsx       # Gestión de tareas (nuevo)
└── App.jsx             # Rutas y autenticación
```

## 🔐 Autenticación

### Sistema de Login Simple

- Login basado en selección de correo (mock)
- 30 usuarios disponibles para testing
- Almacenamiento en localStorage
- Protección de rutas con `ProtectedRoute`

### Usuarios de Prueba

Algunos correos disponibles:
- `carmen.fernandez@gmail.com` (autorización: true)
- `carlos.lopez@utec.edu.pe` (autorización: false)
- `fernando.vega@outlook.com` (autorización: true)

## 📡 APIs Implementadas

### 1. API Tareas (`/src/services/api.js`)

#### Endpoints:

```javascript
// Subir tarea con imagen
tareasAPI.subirTarea(file, correo)

// Listar tareas del usuario
tareasAPI.listarTareas(correo)

// Obtener tarea específica
tareasAPI.obtenerTarea(id, correo)

// Actualizar tarea
tareasAPI.actualizarTarea(id, correo, file)

// Eliminar tarea
tareasAPI.eliminarTarea(id, correo)
```

#### Uso en la App:

- **Página Tasks** (`/tasks`): Gestión completa de tareas
- Upload de imágenes con OCR automático
- Visualización de tareas con texto extraído
- Eliminación de tareas

### 2. API Agentes (`/src/services/api.js`)

#### Endpoints:

```javascript
// Consultar agente IA
agentesAPI.consultarAgente(correo, contexto, mensaje)
// contexto: 'MentorAcademico' | 'Psicologo' | 'OrientadorVocacional'

// Toggle autorización para usar agentes
agentesAPI.toggleAutorizacion(correo, autorizacion)
```

#### Uso en la App:

- **Página Chat** (`/chat`): Chat con 3 tipos de agentes
  - 🎓 Mentor Académico
  - 🧠 Psicólogo
  - 🎯 Orientador Vocacional
- Selector de contexto en el header
- Respuestas en tiempo real desde la API
- Historial de conversación

### 3. API Análisis (`/src/services/api.js`)

#### Endpoints:

```javascript
// Listar todos los usuarios
analisisAPI.listarUsuarios()

// Obtener datos completos de usuario
analisisAPI.obtenerUsuario(correo)

// Actualizar datos de usuario
analisisAPI.actualizarUsuario(correo, datos)

// Analizar riesgo de deserción
analisisAPI.analizarUsuario(correo, mensaje)
```

#### Uso en la App:

- **Página Profile** (`/profile`): 
  - Muestra datos académicos del usuario
  - Toggle de autorización (modo anónimo)
  - Información de carrera, promedio, ciclo
- Datos cargados desde la API al iniciar sesión

## 🎨 Nuevas Funcionalidades

### 1. Sistema de Login
- Selección de usuario desde dropdown
- Validación y almacenamiento de sesión
- Redirección automática

### 2. Gestión de Tareas
- Upload de imágenes (tareas escaneadas)
- OCR automático para extraer texto
- Grid de tareas con preview de imagen
- Eliminación de tareas

### 3. Chat Inteligente
- 3 contextos de agentes diferentes
- Selector visual de contexto
- Respuestas personalizadas según el agente
- Integración completa con backend

### 4. Perfil Mejorado
- Datos académicos reales desde API
- **Modo Anónimo** (mockeado) - oculta identidad en chats
- **Autorización de Recopilación de Datos** (API real) - permite que agentes usen datos académicos
- Información de carrera y rendimiento
- Logout funcional

## 🚀 Cómo Usar

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

### Build

```bash
npm run build
```

## 📱 Flujo de Usuario

1. **Login**: Seleccionar usuario del dropdown
2. **Feed**: Ver eventos y recursos (mock data)
3. **Tasks**: Subir y gestionar tareas con OCR
4. **Chat**: Conversar con agentes IA especializados
5. **Results**: Ver profesionales disponibles (mock data)
6. **Profile**: Ver datos académicos y configuración

## 🔄 Manejo de Errores

- Try-catch en todas las llamadas API
- Mensajes de error amigables
- Loading states durante peticiones
- Fallback a datos mock si falla la API

## 📊 Datos Disponibles

### Desde API:
- Tareas del usuario con OCR
- Conversaciones con agentes IA
- Datos académicos completos
- Análisis de riesgo de deserción

### Mock Data (temporal):
- Eventos y grupos
- Recursos educativos
- Profesionales disponibles
- Estadísticas de usuario

## 🔮 Próximas Mejoras

- [ ] Integrar eventos desde API
- [ ] Sistema de notificaciones real
- [ ] Dashboard de análisis de riesgo
- [ ] Historial de conversaciones persistente
- [ ] Búsqueda y filtros en tareas
- [ ] Edición de tareas
- [ ] Compartir tareas con compañeros

## 🐛 Debugging

### Ver llamadas API en consola:
```javascript
// En api.js, todas las llamadas tienen console.error para errores
```

### Verificar autenticación:
```javascript
import { authService } from './services/auth'
console.log(authService.getCurrentUser())
```

### Test de endpoints:
Usar la colección de Postman incluida: `Tecsup.postman_collection.json`

## 📝 Notas Técnicas

- **CORS**: Las APIs tienen CORS habilitado (`Access-Control-Allow-Origin: *`)
- **Autenticación**: No requiere tokens, solo correo en las peticiones
- **Formato**: Todas las respuestas en JSON
- **Imágenes**: Upload mediante FormData para tareas
- **Estado**: Gestión con React hooks (useState, useEffect)

## 🎯 Testing

### Usuarios Recomendados para Testing:

1. **carmen.fernandez@gmail.com**
   - Autorización: ✅ Activa
   - Tiene datos académicos completos
   - Ideal para probar todas las funcionalidades

2. **carlos.lopez@utec.edu.pe**
   - Autorización: ❌ Inactiva
   - Probar toggle de autorización

3. **fernando.vega@outlook.com**
   - Autorización: ✅ Activa
   - Usuario alternativo

## 📞 Soporte

Para problemas con las APIs, verificar:
1. Variables de entorno configuradas
2. Conexión a internet
3. URLs de API correctas
4. Formato de datos en peticiones
