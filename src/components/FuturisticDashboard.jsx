import { memo, useCallback } from 'react';
import { motion as Motion } from 'framer-motion';
import {
  Activity,
  BrainCircuit,
  Cloud,
  DatabaseBackup,
  GitBranch,
  HardDrive,
  Network,
  RadioTower,
  Server,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Workflow,
  Zap,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { devices, logs } from '../data/mockData';

const trafficData = [
  { time: '00:00', ingress: 38, egress: 22, threat: 8 },
  { time: '03:00', ingress: 46, egress: 28, threat: 12 },
  { time: '06:00', ingress: 62, egress: 44, threat: 10 },
  { time: '09:00', ingress: 88, egress: 71, threat: 18 },
  { time: '12:00', ingress: 74, egress: 66, threat: 14 },
  { time: '15:00', ingress: 96, egress: 82, threat: 22 },
  { time: '18:00', ingress: 82, egress: 75, threat: 17 },
  { time: '21:00', ingress: 104, egress: 91, threat: 11 },
];

const healthData = [
  { name: 'Core', score: 98 },
  { name: 'Edge', score: 94 },
  { name: 'Cloud', score: 91 },
  { name: 'FW', score: 87 },
  { name: 'AI', score: 96 },
];

const sections = [
  { title: 'AI Network Monitoring', value: '98.7%', detail: 'Anomaly model confidence', icon: BrainCircuit, tone: 'cyan' },
  { title: 'Server Status', value: '142', detail: 'Compute nodes synchronized', icon: Server, tone: 'green' },
  { title: 'Security Alerts', value: '07', detail: '2 elevated incidents', icon: ShieldAlert, tone: 'pink' },
  { title: 'Traffic Analytics', value: '8.4 Tbps', detail: 'Peak inspected throughput', icon: Activity, tone: 'blue' },
  { title: 'Device Management', value: '248', detail: 'Multi-vendor inventory', icon: HardDrive, tone: 'purple' },
  { title: 'Live Connections', value: '18.9k', detail: 'Encrypted active sessions', icon: RadioTower, tone: 'cyan' },
  { title: 'Automation Tasks', value: '132', detail: 'Workflows executed today', icon: Workflow, tone: 'green' },
  { title: 'Cloud Infrastructure', value: '12', detail: 'Hybrid regions online', icon: Cloud, tone: 'blue' },
  { title: 'Firewall Monitoring', value: '99.2%', detail: 'Policy compliance score', icon: ShieldCheck, tone: 'pink' },
  { title: 'System Health', value: '96%', detail: 'Predictive stability index', icon: Zap, tone: 'purple' },
];

function FuturisticDashboard() {
  const onlineDevices = devices.filter((device) => device.status === 'online').length;

  const handleMouseMove = useCallback((event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`);
  }, []);

  return (
    <Motion.div
      className="futuristic-dashboard"
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, scale: 0.985, filter: 'blur(12px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <AmbientParticles />

      <section className="noc-hero">
        <div>
          <Motion.span className="eyebrow" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            AI Powered NOC
          </Motion.span>
          <Motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
            Autonomous network control system
          </Motion.h1>
          <Motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>
            Real-time infrastructure telemetry, security intelligence, and automation orchestration in one command surface.
          </Motion.p>
        </div>
        <Motion.div className="noc-orbital-logo" animate={{ y: [0, -8, 0], scale: [1, 1.03, 1] }} transition={{ duration: 4, repeat: Infinity }}>
          <Network size={44} />
          <span />
        </Motion.div>
      </section>

      <section className="futuristic-stat-grid">
        {sections.map((section, index) => (
          <MetricCard item={section} index={index} key={section.title} />
        ))}
      </section>

      <section className="noc-grid">
        <GlassPanel className="span-2" title="Traffic Analytics" icon={Activity}>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={trafficData}>
              <defs>
                <linearGradient id="ingress" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="egress" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#a855f7" stopOpacity={0.65} />
                  <stop offset="95%" stopColor="#a855f7" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(148, 163, 184, 0.12)" vertical={false} />
              <XAxis dataKey="time" stroke="#7dd3fc" tickLine={false} axisLine={false} />
              <YAxis stroke="#7dd3fc" tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: '#07111f', border: '1px solid rgba(34, 211, 238, 0.35)', borderRadius: 8 }} />
              <Area type="monotone" dataKey="ingress" stroke="#22d3ee" strokeWidth={3} fill="url(#ingress)" />
              <Area type="monotone" dataKey="egress" stroke="#a855f7" strokeWidth={3} fill="url(#egress)" />
            </AreaChart>
          </ResponsiveContainer>
        </GlassPanel>

        <GlassPanel title="System Health" icon={Sparkles}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={healthData}>
              <CartesianGrid stroke="rgba(148, 163, 184, 0.12)" vertical={false} />
              <XAxis dataKey="name" stroke="#7dd3fc" tickLine={false} axisLine={false} />
              <YAxis stroke="#7dd3fc" tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ background: '#07111f', border: '1px solid rgba(52, 211, 153, 0.35)', borderRadius: 8 }} />
              <Bar dataKey="score" fill="#34d399" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </GlassPanel>

        <GlassPanel className="span-2" title="Network Topology Visualization" icon={GitBranch}>
          <TopologyMap />
        </GlassPanel>

        <GlassPanel title="Live Connections" icon={RadioTower}>
          <div className="connection-list">
            {devices.map((device, index) => (
              <Motion.div className="connection-row" key={device.id} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.08 }}>
                <span className={`connection-dot ${device.status}`} />
                <div>
                  <strong>{device.name}</strong>
                  <small>{device.ip} · {device.vendor}</small>
                </div>
                <em>{device.status}</em>
              </Motion.div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel title="AI Signal Quality" icon={BrainCircuit}>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={trafficData}>
              <Line type="monotone" dataKey="threat" stroke="#fb7185" strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="ingress" stroke="#22d3ee" strokeWidth={2} dot={false} />
              <Tooltip contentStyle={{ background: '#07111f', border: '1px solid rgba(251, 113, 133, 0.35)', borderRadius: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </GlassPanel>

        <GlassPanel className="span-2" title="Animated Activity Feed" icon={TerminalSquare}>
          <div className="ai-activity-feed">
            {logs.concat(logs.slice(0, 2)).map((log, index) => (
              <Motion.div className="ai-feed-row" key={`${log.id}-${index}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}>
                <span className={`feed-level ${log.level}`} />
                <div>
                  <strong>{log.action}</strong>
                  <small>{log.target} · {log.user} · {log.time}</small>
                </div>
              </Motion.div>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel title="Automation Tasks" icon={DatabaseBackup}>
          <div className="task-stack">
            {['Backup fabric configs', 'Provision VLAN 120', 'Rotate firewall policy', 'Validate cloud routes'].map((task, index) => (
              <div className="task-pill" key={task}>
                <span>{index + 1}</span>
                <strong>{task}</strong>
              </div>
            ))}
          </div>
        </GlassPanel>
      </section>

      <div className="dashboard-footer-signal">
        <span>{onlineDevices}/{devices.length} production devices online</span>
        <span>Threat model active</span>
        <span>Automation fabric synchronized</span>
      </div>
    </Motion.div>
  );
}

function MetricCard({ item, index }) {
  const Icon = item.icon;

  return (
    <Motion.article
      className={`future-metric-card ${item.tone}`}
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.045, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, scale: 1.015 }}
    >
      <span className="metric-icon"><Icon size={20} /></span>
      <small>{item.title}</small>
      <strong>{item.value}</strong>
      <em>{item.detail}</em>
    </Motion.article>
  );
}

function GlassPanel({ title, icon, className = '', children }) {
  const PanelIcon = icon;

  return (
    <Motion.article className={`glass-panel ${className}`} whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <div className="glass-panel-heading">
        <div>
          <PanelIcon size={18} />
          <h2>{title}</h2>
        </div>
        <span className="live-chip">Live</span>
      </div>
      {children}
    </Motion.article>
  );
}

function TopologyMap() {
  return (
    <div className="topology-stage">
      <svg viewBox="0 0 720 320" className="topology-svg" aria-label="Animated network topology">
        <defs>
          <linearGradient id="topoLine" x1="0" x2="1">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="45%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>
        {[
          'M360 160 L150 84',
          'M360 160 L152 236',
          'M360 160 L570 84',
          'M360 160 L572 236',
          'M150 84 L152 236',
          'M570 84 L572 236',
          'M152 236 L572 236',
        ].map((path) => (
          <path className="topology-line" d={path} key={path} />
        ))}
        {[
          [360, 160, 'AI Core'],
          [150, 84, 'DC Core'],
          [152, 236, 'Branch'],
          [570, 84, 'Cloud'],
          [572, 236, 'Firewall'],
        ].map(([cx, cy, label]) => (
          <g className="topology-node" key={label}>
            <circle cx={cx} cy={cy} r="22" />
            <circle cx={cx} cy={cy} r="7" />
            <text x={cx} y={cy + 42}>{label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function AmbientParticles() {
  return (
    <div className="ambient-particles" aria-hidden="true">
      {Array.from({ length: 28 }).map((_, index) => {
        const left = `${(index * 37) % 100}%`;
        const top = `${(index * 53) % 100}%`;
        const duration = `${5 + index * 0.18}s`;
        const delay = `${index * -0.21}s`;

        return <span key={index} style={{ left, top, animationDuration: duration, animationDelay: delay }} />;
      })}
    </div>
  );
}

export default memo(FuturisticDashboard);
