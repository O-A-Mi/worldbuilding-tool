import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { Link } from 'react-router';

const HomePage = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [activeProject, setActiveProject] = useState('Mundo de Eldoria');

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouseX(e.clientX);
      if (e.clientX < 75) {
        setSidebarVisible(true);
      } else if (e.clientX > 330) {
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
    { label: 'Eventos', value: 156, icon: 'fa-timeline', color: '#c79248', link: '/world-tool/timeline' }
  ];

  return (
    <div className={styles.container}>
      <div className={styles.backgroundEffects}>
        <div className={`${styles.glow} ${styles.glow1}`}></div>
        <div className={`${styles.glow} ${styles.glow2}`}></div>
        <div className={`${styles.glow} ${styles.glow3}`}></div>
        <div className={`${styles.glow} ${styles.glow4}`}></div>
        <div className={`${styles.glow} ${styles.glow5}`}></div>
      </div>

      <aside 
        className={styles.sidebar}
        style={{
          transform: sidebarVisible ? 'translateX(15%)' : 'translateX(-100%)',
          opacity: sidebarVisible ? 1 : 0
        }}
      >
        <div className={styles.sidebarContent}>
          <nav className={styles.nav}>
            <a href="#" className={styles.navItem}>
              <i className={`fa-light fa-house ${styles.navIcon}`}></i>
              <span>Início</span>
            </a>
            <a href="#" className={styles.navItem}>
              <i className={`fa-light fa-folder ${styles.navIcon}`}></i>
              <span>Meus Projetos</span>
            </a>
            <a href="#" className={styles.navItem}>
              <i className={`fa-light fa-clock-rotate-left ${styles.navIcon}`}></i>
              <span>Recentes</span>
            </a>
            <a href="#" className={styles.navItem}>
              <i className={`fa-light fa-star ${styles.navIcon}`}></i>
              <span>Favoritos</span>
            </a>
          </nav>

          <div className={styles.projectsSection}>
            <h3 className={styles.sectionTitle}>Projetos</h3>
            {projects.map(project => (
              <div 
                key={project.id} 
                className={styles.projectItem}
                style={{
                  backgroundColor: activeProject === project.name ? 'rgba(213, 174, 111, 0.15)' : 'transparent',
                }}
                onClick={() => setActiveProject(project.name)}
              >
                <div className={styles.projectColor} style={{ backgroundColor: project.color }}></div>
                <i className={`fa-light ${project.icon} ${styles.projectIcon}`}></i>
                <span className={styles.projectName}>{project.name}</span>
              </div>
            ))}
          </div>

          <button className={styles.newProjectButton}>
            <i className="fa-light fa-plus"></i>
            <span>Novo Projeto</span>
          </button>
        </div>
      </aside>

      <main className={styles.main}>
        <header className={styles.topbar}>
          <div className={styles.topbarLeft}></div>
          <div className={styles.topbarRight}>
            <div className={styles.notificationWrapper}>
              <button className={styles.iconButton}>
                <i className="fa-light fa-bell"></i>
              </button>
              <span className={styles.badge}>3</span>
            </div>
            <div className={styles.userProfile}>
              <div className={styles.avatar}>
                <i className="fa-light fa-user"></i>
              </div>
            </div>
          </div>
        </header>

        <div className={styles.content}>
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <Link key={index} to={stat.link} className={styles.statCard}>
                <div className={styles.statIcon} style={{ backgroundColor: `${stat.color}33`, color: stat.color }}>
                  <i className={`fa-light ${stat.icon}`}></i>
                </div>
                <div className={styles.statInfo}>
                  <p className={styles.statValue}>{stat.value}</p>
                  <p className={styles.statLabel}>{stat.label}</p>
                </div>
              </Link>
            ) || (
              <div key={index} className={styles.statCard}>
                <div className={styles.statIcon} style={{ backgroundColor: `${stat.color}33`, color: stat.color }}>
                  <i className={`fa-light ${stat.icon}`}></i>
                </div>
                <div className={styles.statInfo}>
                  <p className={styles.statValue}>{stat.value}</p>
                  <p className={styles.statLabel}>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          <section className={styles.section}>
            <h2 className={styles.sectionHeader}>
              <i className={`fa-light fa-bolt ${styles.sectionIcon}`}></i>
              Ações Rápidas
            </h2>
            <div className={styles.quickActionsGrid}>
              {quickActions.map(action => (
                <div key={action.id} className={styles.actionCard}>
                  <div className={styles.actionIcon} style={{ backgroundColor: `${action.color}33`, color: action.color }}>
                    <i className={`fa-light ${action.icon}`}></i>
                  </div>
                  <h3 className={styles.actionTitle}>{action.title}</h3>
                  <p className={styles.actionDescription}>{action.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionHeader}>
              <i className={`fa-light fa-clock ${styles.sectionIcon}`}></i>
              Recentes
            </h2>
            <div className={styles.recentList}>
              {recentItems.map(item => (
                <div key={item.id} className={styles.recentItem}>
                  <div className={styles.recentIcon}>
                    <i className={`fa-light ${item.icon}`}></i>
                  </div>
                  <div className={styles.recentInfo}>
                    <h4 className={styles.recentTitle}>{item.title}</h4>
                    <p className={styles.recentMeta}>
                      <span className={styles.recentProject}>{item.project}</span>
                      <span className={styles.recentDot}>•</span>
                      <span className={styles.recentTime}>{item.updated}</span>
                    </p>
                  </div>
                  <button className={styles.recentButton}>
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

export default HomePage;