# 👨‍🏫 Modo Profesor - Dashboard de Análisis

## 📋 Descripción

Se ha implementado un sistema de cambio de modo que permite alternar entre:
- **Modo Estudiante**: Acceso a tareas, chat, eventos y recursos
- **Modo Profesor**: Dashboard de análisis con datos de todos los estudiantes

## 🔄 Cambio de Modo

### Cómo Cambiar de Modo:
1. Ve a tu **Perfil** (👤)
2. En la sección **CUENTA**, haz clic en **"Cambiar Modo de Vista"**
3. El sistema cambiará automáticamente entre Estudiante ↔ Profesor

### Indicador Visual:
- El botón muestra el modo actual
- Icono animado (🔄) para indicar que es interactivo
- Notificación al cambiar de modo

## 👨‍🎓 Modo Estudiante

### Navegación:
```
🏠 Feed       - Eventos y recursos
📝 Tareas     - Gestión de homework
💬 Chat       - Agentes IA
👥 Resultados - Profesionales
👤 Perfil     - Configuración
```

### Funcionalidades:
- Subir y gestionar tareas
- Chat con 3 tipos de agentes IA
- Ver eventos y recursos
- Buscar profesionales
- Configurar perfil

## 👨‍🏫 Modo Profesor

### Navegación:
```
📊 Dashboard  - Análisis de estudiantes
👤 Perfil     - Configuración
```

### Funcionalidades del Dashboard:

#### 1. Lista de Estudiantes
- Ver todos los estudiantes registrados
- Estado de autorización de cada uno
- Búsqueda y selección rápida

#### 2. Datos Académicos Detallados
- **Información General:**
  - Carrera
  - Ciclo actual
  - Estado de matrícula

- **Rendimiento:**
  - Promedio ponderado
  - Asistencia promedio
  - Créditos aprobados/desaprobados
  - Avance de malla curricular

- **Alertas:**
  - Cursos reprobados
  - Cursos retirados

#### 3. Datos Emocionales
- Horas de estudio estimadas
- Uso de servicios de psicología
- Uso de servicios de tutoría
- Participación en actividades extracurriculares
- Frecuencia de acceso a plataforma

#### 4. Análisis de Riesgo de Deserción

##### Botón "Analizar Riesgo"
Al hacer clic, el sistema analiza al estudiante usando IA y muestra:

**Nivel de Riesgo:**
- 🟢 **BAJO** (0-33%): Estudiante estable
- 🟠 **MEDIO** (34-66%): Requiere atención
- 🔴 **ALTO** (67-100%): Riesgo crítico

**Análisis Completo:**
- ⚠️ **Factores de Riesgo**: Elementos que aumentan probabilidad de deserción
- ✅ **Factores Protectores**: Elementos positivos del estudiante
- 💡 **Recomendaciones**: Acciones sugeridas para apoyar al estudiante

## 🔧 Implementación Técnica

### Servicios de Autenticación Actualizados

```javascript
// Obtener modo actual
authService.getMode() // 'student' | 'teacher'

// Cambiar modo
authService.setMode('teacher')

// Toggle entre modos
authService.toggleMode()
```

### Endpoints de API Utilizados

#### Listar Estudiantes
```javascript
GET /usuarios
Response: { usuarios: [...], total: 30 }
```

#### Obtener Datos de Estudiante
```javascript
GET /usuario?correo=estudiante@email.com
Response: {
  usuario: {...},
  datos_academicos: {...},
  datos_emocionales: {...},
  datos_socioeconomicos: {...}
}
```

#### Analizar Riesgo
```javascript
POST /analisis/usuario
Body: { correo, mensaje }
Response: {
  riesgo_desercion: 52,
  nivel_riesgo: "MEDIO",
  mensaje: "...",
  factores_riesgo: [...],
  factores_protectores: [...],
  recomendaciones: [...]
}
```

## 📊 Interfaz del Dashboard

### Panel Izquierdo: Lista de Estudiantes
- Scroll vertical para muchos estudiantes
- Indicador de autorización
- Selección con highlight
- Avatar y correo visible

### Panel Derecho: Detalles
- Header con avatar grande
- Secciones organizadas por tipo de dato
- Grid responsive para información
- Botón de análisis prominente
- Resultados con código de colores

## 🎨 Diseño Visual

### Colores de Riesgo:
- **Verde** (#4caf50): Riesgo bajo
- **Naranja** (#ff9800): Riesgo medio
- **Rojo** (#f44336): Riesgo alto

### Cajas de Información:
- **Amarillo**: Advertencias (cursos reprobados)
- **Rojo claro**: Factores de riesgo
- **Verde claro**: Factores protectores
- **Azul claro**: Recomendaciones

## 📱 Responsive

### Desktop (>968px):
- Vista de 2 columnas (lista + detalles)
- Panel de estudiantes: 320px fijo
- Panel de detalles: Flexible
- Scroll independiente en cada panel

### Tablet (640px - 968px):
- Vista apilada vertical
- Lista de estudiantes: Altura reducida (250px)
- Detalles: Altura adaptativa
- Botón para limpiar selección visible

### Mobile (<640px):
- Vista optimizada para móvil
- Lista compacta (180px)
- Cuando hay selección: Lista se reduce (120px)
- Grid de información: 1 columna
- Textos y espaciados reducidos
- Botón ✕ en header para limpiar selección
- Scroll suave personalizado

### Mejoras UX:
- ✅ Indicador de "1 seleccionado" en lista
- ✅ Botón ✕ para limpiar selección rápidamente
- ✅ Animaciones suaves en transiciones
- ✅ Scroll personalizado con colores del tema
- ✅ Loading con animación de reloj
- ✅ Adaptación automática de grid según espacio

## 🔐 Seguridad

- Modo almacenado en localStorage
- Requiere autenticación para acceder
- Datos sensibles solo visibles en modo profesor
- No afecta permisos del backend

## 💡 Casos de Uso

### Para Profesores:
1. **Monitoreo General**: Ver lista completa de estudiantes
2. **Análisis Individual**: Seleccionar estudiante para ver detalles
3. **Identificar Riesgo**: Usar análisis IA para detectar estudiantes en riesgo
4. **Tomar Acción**: Basar intervenciones en recomendaciones del sistema

### Para Administradores:
1. **Reportes**: Generar informes de rendimiento
2. **Estadísticas**: Ver tendencias generales
3. **Intervención Temprana**: Identificar estudiantes que necesitan apoyo
4. **Seguimiento**: Monitorear progreso de estudiantes en riesgo

## 🚀 Flujo de Trabajo Típico

1. **Login** como usuario
2. **Cambiar a Modo Profesor** desde perfil
3. **Navegar al Dashboard** (automático)
4. **Seleccionar estudiante** de la lista
5. **Revisar datos académicos** y emocionales
6. **Analizar riesgo** con IA
7. **Revisar recomendaciones**
8. **Tomar acción** basada en análisis

## 📈 Métricas Disponibles

### Académicas:
- Promedio ponderado
- Asistencia
- Créditos aprobados/desaprobados
- Avance de malla
- Cursos reprobados
- Historial de retiros

### Emocionales:
- Horas de estudio
- Uso de servicios de apoyo
- Actividades extracurriculares
- Frecuencia de acceso

### Socioeconómicas:
- Situación laboral
- Tipo de financiamiento
- Dependencia económica

## ✨ Características Destacadas

✅ **Cambio de Modo Fluido**: Un clic para alternar
✅ **Dashboard Completo**: Toda la información en un lugar
✅ **Análisis IA**: Predicción de riesgo con recomendaciones
✅ **Interfaz Intuitiva**: Fácil de navegar y entender
✅ **Datos en Tiempo Real**: Información actualizada desde API
✅ **Visualización Clara**: Código de colores y organización lógica

## 🎯 Próximas Mejoras Sugeridas

- [ ] Filtros y búsqueda en lista de estudiantes
- [ ] Exportar reportes en PDF
- [ ] Gráficos y estadísticas visuales
- [ ] Comparación entre estudiantes
- [ ] Historial de análisis
- [ ] Notificaciones de estudiantes en riesgo
- [ ] Seguimiento de intervenciones
