"use client";

import { useEffect, useRef, useState } from "react";

interface CognitoFormEmbedProps {
  // From cognitoforms.com -> Share -> Embed -> Seamless.
  formKey?: string;
  formId?: string;
  className?: string;
}

const DEFAULT_FORM_KEY = "TycOYcXxuEmytNohz9WhuQ";
const DEFAULT_FORM_ID = "60";

// Cognito Forms' "seamless" embed is meant to be pasted as a literal
// <script src="...seamless.js" data-key="..." data-form="...">- it uses
// document.currentScript to find where to insert its iframe. That still
// works when the tag is created and appended programmatically like this
// (document.currentScript stays valid for a script inserted via
// appendChild, not just one parsed straight out of the HTML), so this is
// the standard way to drop a "paste this script tag" embed into React.
//
// A MutationObserver flips the loading placeholder off the moment Cognito's
// script inserts its iframe, so the section doesn't sit on a fixed-height
// blank box once the (dynamically-sized) real form is ready- with an 8s
// fallback in case the iframe lands via some other DOM path.
export function CognitoFormEmbed({
  formKey = DEFAULT_FORM_KEY,
  formId = DEFAULT_FORM_ID,
  className = "",
}: CognitoFormEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    setLoaded(false);

    const observer = new MutationObserver(() => {
      if (container.querySelector("iframe")) {
        setLoaded(true);
        observer.disconnect();
      }
    });
    observer.observe(container, { childList: true, subtree: true });

    const fallback = window.setTimeout(() => setLoaded(true), 8000);

    const script = document.createElement("script");
    script.src = "https://www.cognitoforms.com/f/seamless.js";
    script.setAttribute("data-key", formKey);
    script.setAttribute("data-form", formId);
    container.appendChild(script);

    return () => {
      window.clearTimeout(fallback);
      observer.disconnect();
      // Cognito's script inserts its iframe as a sibling of itself inside
      // this container- clearing everything on unmount (route change, or a
      // React dev double-invoke) removes both, so remounting never leaves a
      // duplicate embed stacked underneath a fresh one.
      container.innerHTML = "";
    };
  }, [formKey, formId]);

  return (
    <div className={`relative ${className}`}>
      <div ref={containerRef} className="min-h-[420px]" />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center rounded-2xl border border-kio-line bg-kio-bg text-sm text-kio-muted">
          Loading application form…
        </div>
      )}
    </div>
  );
}
