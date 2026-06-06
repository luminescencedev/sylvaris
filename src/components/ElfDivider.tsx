export function ElfDivider() {
  return (
    <div className="elf-divider" aria-hidden="true">
      <svg viewBox="0 0 480 24" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
        <line x1="0" y1="12" x2="196" y2="12" stroke="var(--border)" strokeWidth="1"/>
        <line x1="196" y1="12" x2="210" y2="12" stroke="var(--primary)" strokeWidth="1" opacity="0.4"/>
        <polygon points="218,12 224,6 230,12 224,18" fill="none" stroke="var(--primary)" strokeWidth="1" opacity="0.5"/>
        <polygon points="230,12 240,2 250,12 240,22" fill="var(--primary)" stroke="none" opacity="0.2"/>
        <polygon points="240,12 246,6 252,12 246,18" fill="none" stroke="var(--primary)" strokeWidth="1" opacity="0.7"/>
        <circle cx="240" cy="12" r="2" fill="var(--primary)" opacity="0.9"/>
        <polygon points="228,12 234,6 240,12 234,18" fill="none" stroke="var(--primary)" strokeWidth="1" opacity="0.5"/>
        <polygon points="250,12 256,6 262,12 256,18" fill="none" stroke="var(--primary)" strokeWidth="1" opacity="0.5"/>
        <line x1="270" y1="12" x2="284" y2="12" stroke="var(--primary)" strokeWidth="1" opacity="0.4"/>
        <line x1="284" y1="12" x2="480" y2="12" stroke="var(--border)" strokeWidth="1"/>
      </svg>
    </div>
  )
}
