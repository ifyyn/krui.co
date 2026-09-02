interface IconProps {
  className?: string;
  strokeWidth?: number;
}

export function CompassIcon({ className = "w-6 h-6", strokeWidth = 1.8 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M16 8l-2.2 5.8L8 16l2.2-5.8L16 8z" />
    </svg>
  );
}

export function BedIcon({ className = "w-6 h-6", strokeWidth = 1.8 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 18V6M3 11h12v7M3 18h18M15 11V8.5A1.5 1.5 0 0 0 13.5 7h-1" />
      <path d="M3 18h18" />
    </svg>
  );
}

export function CarIcon({ className = "w-6 h-6", strokeWidth = 1.8 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11" />
      <path d="M4 11h16a1 1 0 0 1 1 1v4h-2M3 16h-1v-4a1 1 0 0 1 1-1h0" />
      <circle cx="7.5" cy="16" r="2" />
      <circle cx="16.5" cy="16" r="2" />
      <path d="M5.5 16h13" />
    </svg>
  );
}

export function SurfIcon({ className = "w-6 h-6", strokeWidth = 1.8 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3c2.5 1.5 3.5 3 2 5-1.2 1.6-3.8 1.5-4.8 3.5-.9 1.8.3 3.7 1.5 4.8" />
      <path d="M2 16c3-2 5-1 7 0s5 2 8 0 3-3 5-4" />
      <path d="M12 3v2M5 21l3-4" />
    </svg>
  );
}

export function BikeIcon({ className = "w-6 h-6", strokeWidth = 1.8 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="6" cy="16" r="3.2" />
      <circle cx="18.5" cy="16" r="3.2" />
      <path d="M6 16l3-6h6l2 4M9 10h6M8 16l2.5 0M18.5 16l-2-3" />
    </svg>
  );
}

export function StarIcon({ className = "w-6 h-6", strokeWidth = 1.8 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3.5l2.5 5.2 5.7.8-4.1 4 1 5.7L12 16.9l-5.1 2.3 1-5.7-4.1-4 5.7-.8L12 3.5z" />
    </svg>
  );
}

export function PinIcon({ className = "w-6 h-6", strokeWidth = 1.8 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 21s-6-5.2-6-10a6 6 0 1 1 12 0c0 4.8-6 10-6 10z" />
      <circle cx="12" cy="11" r="2.2" />
    </svg>
  );
}

export function ClockIcon({ className = "w-6 h-6", strokeWidth = 1.8 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export function CheckIcon({ className = "w-6 h-6", strokeWidth = 2 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function XIcon({ className = "w-6 h-6", strokeWidth = 2 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function MenuIcon({ className = "w-6 h-6", strokeWidth = 1.8 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function SearchIcon({ className = "w-6 h-6", strokeWidth = 1.8 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  );
}

export function ArrowRightIcon({ className = "w-6 h-6", strokeWidth = 1.8 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}

export function ChevronDownIcon({ className = "w-6 h-6", strokeWidth = 1.8 }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function VerifiedIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2l2.4 1.6 2.9-.2 1 2.7 2.6 1.3-.9 2.8.9 2.8-2.6 1.3-1 2.7-2.9-.2L12 21l-2.4-1.6-2.9.2-1-2.7-2.6-1.3.9-2.8-.9-2.8 2.6-1.3 1-2.7 2.9.2L12 2z" />
      <path d="M8.5 12.2l2.3 2.3 4.7-4.7" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function categoryIcon(name: string, className = "w-7 h-7") {
  switch (name) {
    case "compass":
      return <CompassIcon className={className} />;
    case "bed":
      return <BedIcon className={className} />;
    case "car":
      return <CarIcon className={className} />;
    case "surf":
      return <SurfIcon className={className} />;
    case "bike":
      return <BikeIcon className={className} />;
    case "star":
      return <StarIcon className={className} />;
    default:
      return <CompassIcon className={className} />;
  }
}
