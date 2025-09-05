import Link from "next/link";

export default function Logo() {
  return (
    <div className="inline-flex items-center gap-2" aria-label="Lawi Logo">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-orange-600"
      >
        {/* Network / people nodes */}
        <circle cx="12" cy="5" r="2" className="fill-orange-500" /> {/* top */}
        <circle cx="5" cy="19" r="2" className="fill-orange-400" /> {/* left */}
        <circle cx="19" cy="19" r="2" className="fill-orange-400" /> {/* right */}

        {/* Connecting lines */}
        <line x1="12" y1="7" x2="5" y2="17" className="stroke-orange-500" />
        <line x1="12" y1="7" x2="19" y2="17" className="stroke-orange-500" />
        <line x1="5" y1="19" x2="19" y2="19" className="stroke-orange-500" />
      </svg>

    </div>
  );
}
