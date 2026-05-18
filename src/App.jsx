import { lazy, Suspense, useEffect, useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import {
  Activity,
  Bell,
  Boxes,
  Cable,
  CheckCircle2,
  ClipboardList,
  DatabaseBackup,
  FileClock,
  Gauge,
  HardDrive,
  Layers3,
  LockKeyhole,
  Menu,
  Network,
  Play,
  Plus,
  Router,
  Save,
  Search,
  ServerCog,
  ShieldCheck,
  SlidersHorizontal,
  TerminalSquare,
  User,
  WifiOff,
  XCircle,
} from 'lucide-react';
import { backups, devices, logs } from './data/mockData';

const CinematicTransition = lazy(() => import('./components/CinematicTransition'));
const FuturisticDashboard = lazy(() => import('./components/FuturisticDashboard'));

const navItems = [
  { to: '/', label: 'Dashboard', icon: Gauge },
  { to: '/devices', label: 'Devices', icon: Router },
  { to: '/automation', label: 'Automation', icon: ServerCog },
  { to: '/backups', label: 'Backups', icon: DatabaseBackup },
  { to: '/logs', label: 'Logs', icon: FileClock },
];

const statCards = [
  { label: 'Managed Devices', value: '248', detail: '7 vendors connected', icon: HardDrive, tone: 'blue' },
  { label: 'Online Health', value: '96.8%', detail: '4 devices need attention', icon: Activity, tone: 'green' },
  { label: 'Automations Today', value: '132', detail: '98.5% success rate', icon: Play, tone: 'amber' },
  { label: 'Compliance Score', value: '91%', detail: '18 checks pending', icon: ShieldCheck, tone: 'violet' },
];

function App() {
  const [authStage, setAuthStage] = useState('signin');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (authStage !== 'reveal') {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setAuthStage('app');
    }, 4600);

    return () => window.clearTimeout(timer);
  }, [authStage]);

  if (authStage === 'signin') {
    return <SignIn onSignIn={() => setAuthStage('reveal')} />;
  }

  if (authStage === 'reveal') {
    return (
      <Suspense fallback={<LoadingFrame />}>
        <CinematicTransition />
      </Suspense>
    );
  }

  return (
    <div className={sidebarCollapsed ? 'app-shell sidebar-collapsed' : 'app-shell'}>
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">
            <Network size={22} aria-hidden="true" />
          </div>
          <div>
            <strong>NetOps Pilot</strong>
            <span>Automation Center</span>
          </div>
        </div>

        <button className="sidebar-toggle" type="button" onClick={() => setSidebarCollapsed((value) => !value)} aria-label="Toggle sidebar">
          <Menu size={18} />
        </button>

        <nav className="nav-list" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
              <item.icon size={18} aria-hidden="true" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="security-panel">
          <LockKeyhole size={18} aria-hidden="true" />
          <div>
            <strong>RBAC enabled</strong>
            <span>Admin session secured</span>
          </div>
        </div>
      </aside>

      <main className="main-area">
        <header className="topbar">
          <button className="icon-button mobile-only" aria-label="Open menu">
            <Menu size={20} />
          </button>
          <div className="topbar-signal">
            <span />
            Quantum mesh synchronized
          </div>
          <div className="search-box">
            <Search size={18} aria-hidden="true" />
            <input type="search" placeholder="Search devices, VLANs, backups..." />
          </div>
          <button className="icon-button" aria-label="Notifications">
            <Bell size={19} />
          </button>
          <button className="primary-action">
            <Plus size={18} aria-hidden="true" />
            Add Device
          </button>
        </header>

        <Routes>
          <Route path="/" element={<Suspense fallback={<LoadingFrame compact />}><FuturisticDashboard /></Suspense>} />
          <Route path="/devices" element={<Devices />} />
          <Route path="/automation" element={<Automation />} />
          <Route path="/backups" element={<Backups />} />
          <Route path="/logs" element={<Logs />} />
        </Routes>
      </main>
    </div>
  );
}

function LoadingFrame({ compact = false }) {
  return (
    <div className={compact ? 'loading-frame compact' : 'loading-frame'}>
      <span />
      <strong>Synchronizing AI fabric</strong>
    </div>
  );
}

function PageHeader({ eyebrow, title, children }) {
  return (
    <section className="page-header">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
      </div>
      {children}
    </section>
  );
}

function SignIn({ onSignIn }) {
  return (
    <main className="signin-screen">
      <section className="signin-visual" aria-hidden="true">
        <div className="signin-logo-orbit">
          <span className="orbit-node node-one" />
          <span className="orbit-node node-two" />
          <span className="orbit-node node-three" />
          <div className="signin-brand-mark">
            <Network size={34} />
          </div>
        </div>
        <div className="signin-wire-field">
          {Array.from({ length: 12 }).map((_, index) => (
            <span className={`signin-wire wire-${index + 1}`} key={index} />
          ))}
        </div>
      </section>

      <section className="signin-card" aria-labelledby="signin-title">
        <div className="signin-card-brand">
          <div className="brand-mark">
            <Network size={22} aria-hidden="true" />
          </div>
          <div>
            <strong>NetOps Pilot</strong>
            <span>Automation Center</span>
          </div>
        </div>
        <div>
          <span className="eyebrow">Secure Access</span>
          <h1 id="signin-title">Sign in to command center</h1>
          <p>Manage inventory, backups, VLANs, and automation workflows from one console.</p>
        </div>

        <form className="signin-form" onSubmit={(event) => {
          event.preventDefault();
          onSignIn();
        }}>
          <label>
            <span>Email or username</span>
            <input defaultValue="admin@netops.local" autoComplete="username" />
          </label>
          <label>
            <span>Password</span>
            <input defaultValue="password" type="password" autoComplete="current-password" />
          </label>
          <button className="primary-action signin-submit" type="submit">
            <User size={17} aria-hidden="true" />
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}

function LogoReveal() {
  const wirePaths = [
    'M 0 66 C 150 42, 270 78, 390 178 S 600 280, 760 190',
    'M 0 280 C 120 215, 245 230, 380 190 S 610 84, 760 122',
    'M 760 330 C 595 285, 525 245, 410 198 S 185 115, 0 150',
    'M 760 54 C 605 90, 535 145, 420 180 S 158 265, 0 338',
    'M 95 0 C 180 115, 270 145, 382 181 S 520 220, 665 400',
    'M 640 0 C 520 118, 485 150, 410 180 S 250 215, 95 400',
    'M 0 205 C 165 198, 245 198, 360 198 S 575 198, 760 198',
    'M 380 0 C 380 92, 380 128, 380 172 S 380 286, 380 400',
  ];

  return (
    <main className="logo-reveal" aria-label="Signing in">
      <svg className="wire-logo-svg" viewBox="0 0 760 400" role="img" aria-label="Network wires forming NetOps Pilot logo">
        {wirePaths.map((path, index) => (
          <path className={`reveal-wire reveal-wire-${index + 1}`} d={path} key={path} />
        ))}
        <g className="formed-logo">
          <rect x="314" y="134" width="132" height="132" rx="24" />
          <path d="M342 172h76v28h-76zM342 216h76v28h-76z" />
          <circle cx="354" cy="186" r="5" />
          <circle cx="406" cy="186" r="5" />
          <circle cx="354" cy="230" r="5" />
          <circle cx="406" cy="230" r="5" />
          <path className="logo-bridge" d="M380 200v16" />
        </g>
      </svg>
      <div className="reveal-copy">
        <strong>NetOps Pilot</strong>
        <span>Building secure automation fabric...</span>
      </div>
    </main>
  );
}

function Dashboard() {
  const onlineDevices = devices.filter((device) => device.status === 'online').length;

  return (
    <div className="page-flow">
      <PageHeader eyebrow="Operations Overview" title="Network automation dashboard">
        <div className="header-actions">
          <button className="secondary-action">
            <SlidersHorizontal size={17} aria-hidden="true" />
            Filters
          </button>
          <button className="primary-action">
            <Play size={17} aria-hidden="true" />
            Run Workflow
          </button>
        </div>
      </PageHeader>

      <section className="stats-grid" aria-label="Network summary">
        {statCards.map((stat) => (
          <article className={`stat-card ${stat.tone}`} key={stat.label}>
            <div className="stat-icon">
              <stat.icon size={20} aria-hidden="true" />
            </div>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
            <small>{stat.detail}</small>
          </article>
        ))}
      </section>

      <section className="dashboard-grid">
        <div className="panel wide">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">Inventory</span>
              <h2>Live device health</h2>
            </div>
            <span className="status-summary">{onlineDevices}/{devices.length} online</span>
          </div>
          <DeviceTable compact />
        </div>

        <div className="panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">Workflow Queue</span>
              <h2>Recent automation</h2>
            </div>
          </div>
          <div className="timeline">
            {logs.map((log) => (
              <div className="timeline-item" key={log.id}>
                <StatusIcon status={log.level} />
                <div>
                  <strong>{log.action}</strong>
                  <span>{log.target}</span>
                </div>
                <time>{log.time}</time>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Devices() {
  return (
    <div className="page-flow">
      <PageHeader eyebrow="Inventory" title="Device management">
        <button className="primary-action">
          <Plus size={17} aria-hidden="true" />
          Add Device
        </button>
      </PageHeader>
      <section className="panel">
        <DeviceTable />
      </section>
    </div>
  );
}

function DeviceTable({ compact = false }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Device</th>
            <th>Vendor</th>
            <th>IP Address</th>
            <th>Status</th>
            {!compact && <th>Site</th>}
            <th>CPU</th>
            <th>Memory</th>
            <th>Last Backup</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => (
            <tr key={device.id}>
              <td>
                <div className="device-cell">
                  <span className="device-icon"><Router size={18} aria-hidden="true" /></span>
                  <div>
                    <strong>{device.name}</strong>
                    <span>{device.type}</span>
                  </div>
                </div>
              </td>
              <td>{device.vendor}</td>
              <td><code>{device.ip}</code></td>
              <td><StatusPill status={device.status} /></td>
              {!compact && <td>{device.site}</td>}
              <td>{device.cpu}%</td>
              <td>{device.memory}%</td>
              <td>{device.lastBackup}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Automation() {
  return (
    <div className="page-flow">
      <PageHeader eyebrow="Automation Engine" title="Run network workflows" />
      <section className="workflow-grid">
        <WorkflowCard
          icon={DatabaseBackup}
          title="Device backup"
          description="Fetch running configuration and store versioned backups."
          fields={['Device group', 'Backup label']}
        />
        <WorkflowCard
          icon={Layers3}
          title="VLAN provisioning"
          description="Create VLANs and apply trunk or access-port changes."
          fields={['VLAN ID', 'VLAN name', 'Target switches']}
        />
        <WorkflowCard
          icon={Cable}
          title="Interface changes"
          description="Enable, disable, describe, or assign addressing remotely."
          fields={['Interface', 'Operation', 'Description']}
        />
        <WorkflowCard
          icon={TerminalSquare}
          title="Config template push"
          description="Deploy standardized snippets across selected vendors."
          fields={['Template', 'Device group']}
        />
      </section>
    </div>
  );
}

function WorkflowCard({ icon, title, description, fields }) {
  const WorkflowIcon = icon;

  return (
    <article className="workflow-card">
      <div className="workflow-title">
        <span className="workflow-icon"><WorkflowIcon size={20} aria-hidden="true" /></span>
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
      <form className="workflow-form">
        {fields.map((field) => (
          <label key={field}>
            <span>{field}</span>
            <input placeholder={field} />
          </label>
        ))}
        <button type="button" className="primary-action">
          <Play size={17} aria-hidden="true" />
          Execute
        </button>
      </form>
    </article>
  );
}

function Backups() {
  return (
    <div className="page-flow">
      <PageHeader eyebrow="Backup & Restore" title="Configuration backup history">
        <button className="primary-action">
          <Save size={17} aria-hidden="true" />
          New Backup
        </button>
      </PageHeader>
      <section className="panel">
        <div className="backup-list">
          {backups.map((backup) => (
            <div className="backup-row" key={backup.id}>
              <div className="backup-id">
                <DatabaseBackup size={18} aria-hidden="true" />
                <div>
                  <strong>{backup.id}</strong>
                  <span>{backup.device}</span>
                </div>
              </div>
              <StatusPill status={backup.status} />
              <span>{backup.size}</span>
              <time>{backup.createdAt}</time>
              <button className="secondary-action">Restore</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function Logs() {
  return (
    <div className="page-flow">
      <PageHeader eyebrow="Audit Trail" title="Automation and activity logs" />
      <section className="panel">
        <div className="log-list">
          {logs.map((log) => (
            <div className="log-row" key={log.id}>
              <StatusIcon status={log.level} />
              <div>
                <strong>{log.action}</strong>
                <span>{log.id} · {log.target} · {log.user}</span>
              </div>
              <time>{log.time}</time>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function StatusPill({ status }) {
  return <span className={`status-pill ${status}`}>{status}</span>;
}

function StatusIcon({ status }) {
  if (status === 'success' || status === 'completed' || status === 'online') {
    return <CheckCircle2 className="status-icon success" size={19} aria-hidden="true" />;
  }
  if (status === 'warning') {
    return <Activity className="status-icon warning" size={19} aria-hidden="true" />;
  }
  if (status === 'offline' || status === 'failed' || status === 'error') {
    return status === 'offline'
      ? <WifiOff className="status-icon error" size={19} aria-hidden="true" />
      : <XCircle className="status-icon error" size={19} aria-hidden="true" />;
  }
  return <Boxes className="status-icon" size={19} aria-hidden="true" />;
}

export default App;
