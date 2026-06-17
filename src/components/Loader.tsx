import { useEffect, useState } from "react";

export function Loader() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHidden(true), 1900);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className={`loader-screen ${hidden ? "hidden-loader" : ""}`}>
      <div className="flex flex-col items-center gap-6">
        <div className="text-[10px] tracking-[0.5em] text-[color:var(--accent)] uppercase animate-fade">
          Est. 2025
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl tracking-[0.35em] text-foreground animate-letter">
          AETHER&nbsp;JOURNEYS
        </h1>
        <div className="h-px w-40 bg-[color:var(--accent)]/60 origin-left animate-line delay-500" />
        <div className="text-xs tracking-[0.3em] text-muted-foreground uppercase animate-fade delay-700">
          Travel beyond destinations
        </div>
      </div>
    </div>
  );
}
