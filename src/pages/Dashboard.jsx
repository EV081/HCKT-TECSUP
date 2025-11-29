import { useState, useEffect } from 'react'
import { analisisAPI } from '../services/api'
import './Dashboard.css'

function Dashboard() {
  const [usuarios, setUsuarios] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [userDetails, setUserDetails] = useState(null)
  const [userAnalysis, setUserAnalysis] = useState(null)
  const [loading, setLoading] = useState(true)
  const [analyzing, setAnalyzing] = useState(false)

  useEffect(() => {
    loadUsuarios()
  }, [])

  const loadUsuarios = async () => {
    try {
      setLoading(true)
      const response = await analisisAPI.listarUsuarios()
      setUsuarios(response.usuarios || [])
    } catch (error) {
      console.error('Error loading users:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadUserDetails = async (correo) => {
    try {
      setSelectedUser(correo)
      setUserDetails(null)
      setUserAnalysis(null)
      
      const details = await analisisAPI.obtenerUsuario(correo)
      setUserDetails(details)
    } catch (error) {
      console.error('Error loading user details:', error)
    }
  }

  const analyzeUser = async () => {
    if (!selectedUser) return

    try {
      setAnalyzing(true)
      const analysis = await analisisAPI.analizarUsuario(
        selectedUser,
        '¿Qué opinas sobre este estudiante?'
      )
      setUserAnalysis(analysis)
    } catch (error) {
      console.error('Error analyzing user:', error)
    } finally {
      setAnalyzing(false)
    }
  }

  const getRiskColor = (nivel) => {
    switch (nivel) {
      case 'BAJO': return '#4caf50'
      case 'MEDIO': return '#ff9800'
      case 'ALTO': return '#f44336'
      default: return '#999'
    }
  }

  return (
    <div className="dashboard-page">
      <header className="page-header">
        <h1>📊 Dashboard de Análisis</h1>
        {selectedUser && (
          <button className="clear-selection" onClick={() => setSelectedUser(null)}>
            ✕
          </button>
        )}
      </header>

      <div className="dashboard-container">
        <div className={`users-panel ${selectedUser ? 'has-selection' : ''}`}>
          <div className="panel-header">
            <h2>Estudiantes ({usuarios.length})</h2>
            {selectedUser && (
              <span className="selected-indicator">1 seleccionado</span>
            )}
          </div>
          {loading ? (
            <div className="loading">Cargando estudiantes...</div>
          ) : (
            <div className="users-list">
              {usuarios.map(user => (
                <div
                  key={user.id}
                  className={`user-item ${selectedUser === user.correo ? 'active' : ''}`}
                  onClick={() => loadUserDetails(user.correo)}
                >
                  <div className="user-avatar">👤</div>
                  <div className="user-info">
                    <span className="user-email">{user.correo}</span>
                    <span className={`user-status ${user.autorizacion ? 'authorized' : 'unauthorized'}`}>
                      {user.autorizacion ? '✓ Autorizado' : '✗ No autorizado'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="details-panel">
          {!selectedUser ? (
            <div className="empty-state">
              <div className="empty-icon">👈</div>
              <h3>Selecciona un estudiante</h3>
              <p>Elige un estudiante de la lista para ver sus detalles</p>
            </div>
          ) : !userDetails ? (
            <div className="loading">Cargando datos...</div>
          ) : (
            <>
              <div className="user-header">
                <div className="user-avatar-large">👤</div>
                <div>
                  <h2>{userDetails.usuario.correo.split('@')[0]}</h2>
                  <p className="user-email-detail">{userDetails.usuario.correo}</p>
                </div>
              </div>

              {userDetails.datos_academicos && (
                <div className="info-section">
                  <h3>📚 Datos Académicos</h3>
                  <div className="info-grid">
                    <div className="info-card">
                      <span className="info-label">Carrera</span>
                      <span className="info-value">{userDetails.datos_academicos.carrera}</span>
                    </div>
                    <div className="info-card">
                      <span className="info-label">Ciclo Actual</span>
                      <span className="info-value">{userDetails.datos_academicos.ciclo_actual}</span>
                    </div>
                    <div className="info-card">
                      <span className="info-label">Promedio</span>
                      <span className="info-value">{userDetails.datos_academicos.promedio_ponderado}</span>
                    </div>
                    <div className="info-card">
                      <span className="info-label">Asistencia</span>
                      <span className="info-value">{userDetails.datos_academicos.asistencia_promedio}%</span>
                    </div>
                    <div className="info-card">
                      <span className="info-label">Créditos Aprobados</span>
                      <span className="info-value">{userDetails.datos_academicos.creditos_aprobados}</span>
                    </div>
                    <div className="info-card">
                      <span className="info-label">Créditos Desaprobados</span>
                      <span className="info-value danger">{userDetails.datos_academicos.creditos_desaprobados}</span>
                    </div>
                    <div className="info-card">
                      <span className="info-label">Avance de Malla</span>
                      <span className="info-value">{userDetails.datos_academicos.avance_malla}%</span>
                    </div>
                    <div className="info-card">
                      <span className="info-label">Estado</span>
                      <span className="info-value">{userDetails.datos_academicos.estado_matricula}</span>
                    </div>
                  </div>

                  {userDetails.datos_academicos.cursos_reprobados?.length > 0 && (
                    <div className="warning-box">
                      <strong>⚠️ Cursos Reprobados:</strong>
                      <p>{userDetails.datos_academicos.cursos_reprobados.join(', ')}</p>
                    </div>
                  )}
                </div>
              )}

              {userDetails.datos_emocionales && (
                <div className="info-section">
                  <h3>🧠 Datos Emocionales</h3>
                  <div className="info-grid">
                    <div className="info-card">
                      <span className="info-label">Horas de Estudio</span>
                      <span className="info-value">{userDetails.datos_emocionales.horas_estudio_estimadas}h</span>
                    </div>
                    <div className="info-card">
                      <span className="info-label">Uso Psicología</span>
                      <span className="info-value">{userDetails.datos_emocionales.uso_servicios_psicologia}</span>
                    </div>
                    <div className="info-card">
                      <span className="info-label">Uso Tutoría</span>
                      <span className="info-value">{userDetails.datos_emocionales.uso_servicios_tutoria}</span>
                    </div>
                    <div className="info-card">
                      <span className="info-label">Actividades Extra</span>
                      <span className="info-value">{userDetails.datos_emocionales.actividades_extracurriculares ? 'Sí' : 'No'}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="analysis-section">
                <button 
                  className="analyze-btn"
                  onClick={analyzeUser}
                  disabled={analyzing}
                >
                  {analyzing ? '🔄 Analizando...' : '🤖 Analizar Riesgo de Deserción'}
                </button>

                {userAnalysis && (
                  <div className="analysis-result">
                    <div className="risk-header">
                      <h3>Análisis de Riesgo</h3>
                      <div 
                        className="risk-badge"
                        style={{ backgroundColor: getRiskColor(userAnalysis.nivel_riesgo) }}
                      >
                        {userAnalysis.riesgo_desercion}% - {userAnalysis.nivel_riesgo}
                      </div>
                    </div>

                    <div className="analysis-message">
                      <p>{userAnalysis.mensaje}</p>
                    </div>

                    {userAnalysis.factores_riesgo?.length > 0 && (
                      <div className="factors-box danger-box">
                        <h4>⚠️ Factores de Riesgo</h4>
                        <ul>
                          {userAnalysis.factores_riesgo.map((factor, idx) => (
                            <li key={idx}>{factor}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {userAnalysis.factores_protectores?.length > 0 && (
                      <div className="factors-box success-box">
                        <h4>✅ Factores Protectores</h4>
                        <ul>
                          {userAnalysis.factores_protectores.map((factor, idx) => (
                            <li key={idx}>{factor}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {userAnalysis.recomendaciones?.length > 0 && (
                      <div className="factors-box info-box">
                        <h4>💡 Recomendaciones</h4>
                        <ul>
                          {userAnalysis.recomendaciones.map((rec, idx) => (
                            <li key={idx}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
