import React, { useState, useEffect } from 'react';

const HomePage = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [activeProject, setActiveProject] = useState('Mundo de Eldoria');

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouseX(e.clientX);
      if (e.clientX < 50) {
        setSidebarVisible(true);
      } else if (e.clientX > 300) {
        setSidebarVisible(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const projects = [
    { id: 1, name: 'Mundo de Eldoria', color: '#d5ae6f', icon: 'fa-castle' },
    { id: 2, name: 'Cyberpunk 2177', color: '#81a8af', icon: 'fa-city' },
    { id: 3, name: 'Reino dos Dragões', color: '#c79248', icon: 'fa-dragon' }
  ];

  const recentItems = [
    { id: 1, type: 'timeline', title: 'Era dos Heróis', project: 'Mundo de Eldoria', updated: '2 horas atrás', icon: 'fa-timeline' },
    { id: 2, type: 'wiki', title: 'Raças de Eldoria', project: 'Mundo de Eldoria', updated: '1 dia atrás', icon: 'fa-book' },
    { id: 3, type: 'character', title: 'Ficha - Aragorn', project: 'Reino dos Dragões', updated: '3 dias atrás', icon: 'fa-user' },
    { id: 4, type: 'map', title: 'Mapa de Westfall', project: 'Mundo de Eldoria', updated: '5 dias atrás', icon: 'fa-map' }
  ];

  const quickActions = [
    { id: 1, title: 'Nova Linha do Tempo', icon: 'fa-timeline', color: '#d5ae6f', description: 'Crie eventos cronológicos' },
    { id: 2, title: 'Nova Página Wiki', icon: 'fa-book', color: '#81a8af', description: 'Documente seu mundo' },
    { id: 3, title: 'Nova Ficha RPG', icon: 'fa-dice-d20', color: '#c79248', description: 'Crie personagens' },
    { id: 4, title: 'Novo Mapa', icon: 'fa-map', color: '#628d95', description: 'Desenhe territórios' },
    { id: 5, title: 'Novo Bloco de Notas', icon: 'fa-note-sticky', color: '#b27938', description: 'Anote ideias rápidas' },
    { id: 6, title: 'Convidar Colaborador', icon: 'fa-user-plus', color: '#95929e', description: 'Compartilhe seu projeto' }
  ];

  const stats = [
    { label: 'Páginas Wiki', value: 47, icon: 'fa-book', color: '#81a8af' },
    { label: 'Personagens', value: 23, icon: 'fa-users', color: '#d5ae6f' },
    { label: 'Mapas', value: 8, icon: 'fa-map', color: '#628d95' },
    { label: 'Eventos', value: 156, icon: 'fa-timeline', color: '#c79248' }
  ];

  return (
    <div style={styles.container}>
      {/* Background Effects */}
      <div style={styles.backgroundEffects}>
        <div style={{...styles.glow, ...styles.glow1}}></div>
        <div style={{...styles.glow, ...styles.glow2}}></div>
        <div style={{...styles.glow, ...styles.glow3}}></div>
        <div style={{...styles.glow, ...styles.glow4}}></div>
        <div style={{...styles.glow, ...styles.glow5}}></div>
      </div>

      {/* Floating Sidebar */}
      <aside style={{
        ...styles.sidebar,
        transform: sidebarVisible ? 'translateX(0)' : 'translateX(-100%)',
        opacity: sidebarVisible ? 1 : 0
      }}>
        <div style={styles.sidebarContent}>
          <nav style={styles.nav}>
            <a href="#" style={styles.navItem}>
              <i className="fa-light fa-house" style={styles.navIcon}></i>
              <span>Início</span>
            </a>
            <a href="#" style={styles.navItem}>
              <i className="fa-light fa-folder" style={styles.navIcon}></i>
              <span>Meus Projetos</span>
            </a>
            <a href="#" style={styles.navItem}>
              <i className="fa-light fa-clock-rotate-left" style={styles.navIcon}></i>
              <span>Recentes</span>
            </a>
            <a href="#" style={styles.navItem}>
              <i className="fa-light fa-star" style={styles.navIcon}></i>
              <span>Favoritos</span>
            </a>
          </nav>

          <div style={styles.projectsSection}>
            <h3 style={styles.sectionTitle}>Projetos</h3>
            {projects.map(project => (
              <div 
                key={project.id} 
                style={{
                  ...styles.projectItem,
                  backgroundColor: activeProject === project.name ? 'rgba(213, 174, 111, 0.15)' : 'transparent',
                  borderLeft: activeProject === project.name ? '3px solid #d5ae6f' : '3px solid transparent'
                }}
                onClick={() => setActiveProject(project.name)}
              >
                <div style={{...styles.projectColor, backgroundColor: project.color}}></div>
                <i className={`fa-light ${project.icon}`} style={styles.projectIcon}></i>
                <span style={styles.projectName}>{project.name}</span>
              </div>
            ))}
          </div>

          <button style={styles.newProjectButton}>
            <i className="fa-light fa-plus"></i>
            <span>Novo Projeto</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={styles.main}>
        {/* Topbar */}
        <header style={styles.topbar}>
          <div style={styles.topbarLeft}></div>
          <div style={styles.topbarRight}>
            <div style={styles.notificationWrapper}>
              <button style={styles.iconButton}>
                <i className="fa-light fa-bell"></i>
              </button>
              <span style={styles.badge}>3</span>
            </div>
            <div style={styles.userProfile}>
              <div style={styles.avatar}>
                <i className="fa-light fa-user"></i>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div style={styles.content}>
          {/* Stats Cards */}
          <div style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} style={styles.statCard}>
                <div style={{...styles.statIcon, backgroundColor: `${stat.color}33`, color: stat.color}}>
                  <i className={`fa-light ${stat.icon}`}></i>
                </div>
                <div style={styles.statInfo}>
                  <p style={styles.statValue}>{stat.value}</p>
                  <p style={styles.statLabel}>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <section style={styles.section}>
            <h2 style={styles.sectionHeader}>
              <i className="fa-light fa-bolt" style={styles.sectionIcon}></i>
              Ações Rápidas
            </h2>
            <div style={styles.quickActionsGrid}>
              {quickActions.map(action => (
                <div key={action.id} style={styles.actionCard}>
                  <div style={{...styles.actionIcon, backgroundColor: `${action.color}33`, color: action.color}}>
                    <i className={`fa-light ${action.icon}`}></i>
                  </div>
                  <h3 style={styles.actionTitle}>{action.title}</h3>
                  <p style={styles.actionDescription}>{action.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Items */}
          <section style={styles.section}>
            <h2 style={styles.sectionHeader}>
              <i className="fa-light fa-clock" style={styles.sectionIcon}></i>
              Recentes
            </h2>
            <div style={styles.recentList}>
              {recentItems.map(item => (
                <div key={item.id} style={styles.recentItem}>
                  <div style={styles.recentIcon}>
                    <i className={`fa-light ${item.icon}`}></i>
                  </div>
                  <div style={styles.recentInfo}>
                    <h4 style={styles.recentTitle}>{item.title}</h4>
                    <p style={styles.recentMeta}>
                      <span style={styles.recentProject}>{item.project}</span>
                      <span style={styles.recentDot}>•</span>
                      <span style={styles.recentTime}>{item.updated}</span>
                    </p>
                  </div>
                  <button style={styles.recentButton}>
                    <i className="fa-light fa-arrow-right"></i>
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#0a0a0b',
    color: '#f6f8f9',
    fontFamily: "'Inter', sans-serif",
    overflow: 'hidden',
    position: 'relative'
  },
  backgroundEffects: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    pointerEvents: 'none',
    zIndex: 0
  },
  glow: {
    position: 'absolute',
    borderRadius: '50%',
    filter: 'blur(80px)',
    opacity: 0.4
  },
  glow1: {
    width: '400px',
    height: '400px',
    background: 'radial-gradient(circle, rgba(213, 174, 111, 0.3) 0%, rgba(213, 174, 111, 0) 70%)',
    top: '-100px',
    left: '-100px',
    animation: 'float1 8s ease-in-out infinite'
  },
  glow2: {
    width: '600px',
    height: '600px',
    background: 'radial-gradient(circle, rgba(129, 168, 175, 0.25) 0%, rgba(129, 168, 175, 0) 70%)',
    top: '50%',
    right: '-200px',
    animation: 'float2 10s ease-in-out infinite'
  },
  glow3: {
    width: '350px',
    height: '350px',
    background: 'radial-gradient(circle, rgba(199, 146, 72, 0.3) 0%, rgba(199, 146, 72, 0) 70%)',
    bottom: '10%',
    left: '30%',
    animation: 'float3 12s ease-in-out infinite'
  },
  glow4: {
    width: '500px',
    height: '500px',
    background: 'radial-gradient(circle, rgba(213, 174, 111, 0.2) 0%, rgba(213, 174, 111, 0) 70%)',
    top: '20%',
    left: '50%',
    animation: 'pulse 6s ease-in-out infinite'
  },
  glow5: {
    width: '450px',
    height: '450px',
    background: 'radial-gradient(circle, rgba(178, 121, 56, 0.25) 0%, rgba(178, 121, 56, 0) 70%)',
    bottom: '-150px',
    right: '20%',
    animation: 'float1 9s ease-in-out infinite reverse'
  },
  sidebar: {
    position: 'fixed',
    left: 0,
    top: 0,
    height: '100vh',
    width: '280px',
    background: 'rgba(30, 29, 32, 0.7)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    borderRight: '1px solid rgba(213, 174, 111, 0.1)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    zIndex: 1000,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)'
  },
  sidebarContent: {
    padding: '1.5rem',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    marginBottom: '2rem'
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    color: '#d4e0e3',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    fontSize: '0.95rem'
  },
  navIcon: {
    fontSize: '1.2rem',
    width: '1.5rem',
    textAlign: 'center'
  },
  projectsSection: {
    flex: 1,
    overflowY: 'auto',
    paddingTop: '1rem',
    borderTop: '1px solid rgba(213, 174, 111, 0.1)'
  },
  sectionTitle: {
    fontSize: '0.75rem',
    fontWeight: 600,
    textTransform: 'uppercase',
    color: '#95929e',
    marginBottom: '1rem',
    letterSpacing: '0.05em'
  },
  projectItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    marginBottom: '0.5rem'
  },
  projectColor: {
    width: '8px',
    height: '8px',
    borderRadius: '50%'
  },
  projectIcon: {
    fontSize: '1rem',
    color: '#d4e0e3'
  },
  projectName: {
    fontSize: '0.9rem',
    color: '#d4e0e3'
  },
  newProjectButton: {
    marginTop: '1rem',
    padding: '0.75rem',
    backgroundColor: 'rgba(213, 174, 111, 0.1)',
    border: '1px dashed rgba(213, 174, 111, 0.5)',
    borderRadius: '0.5rem',
    color: '#d5ae6f',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    fontSize: '0.9rem',
    fontWeight: 500,
    transition: 'all 0.2s ease'
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    position: 'relative',
    zIndex: 1
  },
  topbar: {
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'transparent'
  },
  topbarLeft: {
    flex: 1
  },
  topbarRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  notificationWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },
  iconButton: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#d4e0e3',
    fontSize: '1.2rem',
    cursor: 'pointer',
    padding: '0.65rem',
    borderRadius: '0.75rem',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '2.75rem',
    height: '2.75rem'
  },
  badge: {
    position: 'absolute',
    top: '-4px',
    left: '-4px',
    backgroundColor: '#c79248',
    color: '#fff',
    fontSize: '0.7rem',
    fontWeight: 600,
    padding: '0.15rem 0.4rem',
    borderRadius: '1rem',
    minWidth: '1.2rem',
    textAlign: 'center',
    border: '2px solid #0a0a0b',
    boxShadow: '0 2px 8px rgba(199, 146, 72, 0.4)'
  },
  userProfile: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  },
  avatar: {
    width: '2.75rem',
    height: '2.75rem',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #d5ae6f 0%, #c79248 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    color: '#0a0a0b',
    border: '2px solid rgba(213, 174, 111, 0.3)',
    boxShadow: '0 4px 12px rgba(213, 174, 111, 0.3)',
    transition: 'all 0.3s ease'
  },
  content: {
    flex: 1,
    overflowY: 'auto',
    padding: '2rem',
    position: 'relative'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  statCard: {
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    padding: '1.5rem',
    borderRadius: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
  },
  statIcon: {
    width: '3rem',
    height: '3rem',
    borderRadius: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)'
  },
  statInfo: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem'
  },
  statValue: {
    margin: 0,
    fontSize: '1.75rem',
    fontWeight: 700,
    color: '#f6f8f9'
  },
  statLabel: {
    margin: 0,
    fontSize: '0.85rem',
    color: '#95929e'
  },
  section: {
    marginBottom: '2rem'
  },
  sectionHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontSize: '1.25rem',
    fontWeight: 600,
    marginBottom: '1.5rem',
    color: '#f6f8f9'
  },
  sectionIcon: {
    color: '#d5ae6f'
  },
  quickActionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem'
  },
  actionCard: {
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    padding: '1.5rem',
    borderRadius: '1rem',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
  },
  actionIcon: {
    width: '3rem',
    height: '3rem',
    borderRadius: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    marginBottom: '0.5rem',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)'
  },
  actionTitle: {
    margin: 0,
    fontSize: '1rem',
    fontWeight: 600,
    color: '#f6f8f9'
  },
  actionDescription: {
    margin: 0,
    fontSize: '0.85rem',
    color: '#95929e',
    lineHeight: 1.5
  },
  recentList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem'
  },
  recentItem: {
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(20px) saturate(180%)',
    WebkitBackdropFilter: 'blur(20px) saturate(180%)',
    padding: '1rem 1.5rem',
    borderRadius: '1rem',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
  },
  recentIcon: {
    width: '2.5rem',
    height: '2.5rem',
    borderRadius: '0.5rem',
    background: 'rgba(213, 174, 111, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    color: '#d5ae6f'
  },
  recentInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem'
  },
  recentTitle: {
    margin: 0,
    fontSize: '0.95rem',
    fontWeight: 500,
    color: '#f6f8f9'
  },
  recentMeta: {
    margin: 0,
    fontSize: '0.8rem',
    color: '#95929e',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  recentProject: {},
  recentDot: {},
  recentTime: {},
  recentButton: {
    background: 'transparent',
    border: 'none',
    color: '#95929e',
    fontSize: '1rem',
    cursor: 'pointer',
    padding: '0.5rem',
    borderRadius: '0.5rem',
    transition: 'all 0.2s ease'
  }
};

// Add keyframes via style tag
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes float1 {
    0%, 100% { transform: translate(0, 0); }
    33% { transform: translate(30px, -30px); }
    66% { transform: translate(-20px, 20px); }
  }
  
  @keyframes float2 {
    0%, 100% { transform: translate(0, 0); }
    33% { transform: translate(-40px, 40px); }
    66% { transform: translate(30px, -20px); }
  }
  
  @keyframes float3 {
    0%, 100% { transform: translate(0, 0); }
    33% { transform: translate(20px, 30px); }
    66% { transform: translate(-30px, -20px); }
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.1); }
  }
`;
document.head.appendChild(styleSheet);

export default HomePage;