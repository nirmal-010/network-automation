import { memo } from 'react';
import { motion as Motion } from 'framer-motion';
import { Cpu, Network, TerminalSquare, Cloud, BrainCircuit, GitBranch, ShieldCheck } from 'lucide-react';
import { SiCisco, SiDocker, SiKubernetes, SiLinux, SiNodedotjs, SiReact } from 'react-icons/si';

const techLogos = [
  { label: 'Linux', icon: SiLinux, x: '-34vw', y: '-24vh', color: '#facc15', delay: 0.1 },
  { label: 'Cisco', icon: SiCisco, x: '31vw', y: '-25vh', color: '#38bdf8', delay: 0.25 },
  { label: 'Docker', icon: SiDocker, x: '-20vw', y: '27vh', color: '#60a5fa', delay: 0.36 },
  { label: 'Kubernetes', icon: SiKubernetes, x: '28vw', y: '24vh', color: '#818cf8', delay: 0.48 },
  { label: 'React', icon: SiReact, x: '-5vw', y: '-33vh', color: '#22d3ee', delay: 0.56 },
  { label: 'Node.js', icon: SiNodedotjs, x: '5vw', y: '33vh', color: '#4ade80', delay: 0.65 },
  { label: 'Cloud', icon: Cloud, x: '-39vw', y: '2vh', color: '#a78bfa', delay: 0.76 },
  { label: 'Firewall', icon: ShieldCheck, x: '38vw', y: '-1vh', color: '#fb7185', delay: 0.86 },
  { label: 'Terminal', icon: TerminalSquare, x: '-15vw', y: '-3vh', color: '#34d399', delay: 0.95 },
  { label: 'AI', icon: BrainCircuit, x: '18vw', y: '3vh', color: '#f472b6', delay: 1.04 },
  { label: 'Topology', icon: GitBranch, x: '-1vw', y: '0vh', color: '#67e8f9', delay: 1.14 },
  { label: 'Compute', icon: Cpu, x: '0vw', y: '-2vh', color: '#c084fc', delay: 1.22 },
];

const wirePaths = [
  'M -20 80 C 150 20 250 170 390 185 S 610 125 800 60',
  'M -20 350 C 130 230 245 265 390 205 S 625 250 800 340',
  'M 60 -10 C 125 135 245 148 380 196 S 570 255 690 430',
  'M 710 -10 C 570 120 520 150 390 195 S 230 245 70 430',
  'M -20 205 C 160 204 250 202 390 198 S 605 198 800 195',
  'M 385 -20 C 375 100 385 145 390 198 S 390 302 385 430',
  'M -20 18 C 135 122 210 152 372 189 S 585 315 800 386',
  'M 800 18 C 650 116 545 160 404 193 S 205 310 -20 386',
];

function CinematicTransition() {
  return (
    <Motion.main
      className="cinematic-transition"
      initial={{ opacity: 0, filter: 'blur(18px)', scale: 1.04 }}
      animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      aria-label="Entering AI network control system"
    >
      <div className="cinematic-aurora" />
      <div className="cinematic-grid" />

      <svg className="cinematic-wire-map" viewBox="0 0 780 420" aria-hidden="true">
        {wirePaths.map((path, index) => (
          <Motion.path
            className={`cinematic-wire wire-tone-${(index % 5) + 1}`}
            d={path}
            key={path}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 1, 0.8] }}
            transition={{ duration: 2.15, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
          />
        ))}
        {wirePaths.slice(0, 6).map((path, index) => (
          <Motion.circle
            className="wire-particle"
            r="4"
            key={`particle-${path}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.8, delay: 1 + index * 0.13, repeat: 1, repeatDelay: 0.15 }}
          >
            <animateMotion dur={`${1.9 + index * 0.15}s`} begin={`${0.9 + index * 0.08}s`} repeatCount="2" path={path} />
          </Motion.circle>
        ))}
      </svg>

      <div className="tech-logo-cloud" aria-hidden="true">
        {techLogos.map((logo, index) => {
          const Icon = logo.icon;
          return (
            <Motion.div
              className="floating-tech-logo"
              key={logo.label}
              style={{ '--logo-color': logo.color }}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0.45, rotate: -18 }}
              animate={{
                x: logo.x,
                y: logo.y,
                opacity: [0, 1, 1, 0.15],
                scale: [0.45, 1, 1.05, 0.65],
                rotate: [-18, 0, index % 2 ? 9 : -9],
              }}
              transition={{ duration: 3.35, delay: logo.delay, ease: [0.16, 1, 0.3, 1] }}
            >
              <Icon size={30} />
              <span>{logo.label}</span>
            </Motion.div>
          );
        })}
      </div>

      <Motion.div
        className="platform-logo-reveal"
        initial={{ opacity: 0, scale: 0.72, filter: 'blur(12px)' }}
        animate={{ opacity: 1, scale: [0.72, 1.08, 1], filter: 'blur(0px)' }}
        transition={{ duration: 1.1, delay: 2.05, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="platform-logo-core">
          <Network size={46} />
        </div>
        <strong>NetOps Pilot</strong>
        <span>AI Network Automation Fabric</span>
      </Motion.div>
    </Motion.main>
  );
}

export default memo(CinematicTransition);
