import './SubtleBackground.css';

export default function SubtleBackground() {

  return (
    <div className="subtle-background">
      {/* Subtle gradient mesh */}
      <div className="gradient-mesh"></div>

      {/* Floating orbs - very subtle */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>
    </div>
  );
}
