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

// Restyles Cognito's own markup (verified 2026-09-04 by inspecting the live
// rendered DOM- it's real elements injected into the page, not a
// cross-origin iframe, and Cognito's own docs document exactly this
// pattern: `#wrapper .cog-button--primary{...}`) to match the site's dark
// kio-* design tokens instead of Cognito's default light theme. Scoped
// under .kiosist-cognito-form so it can never leak onto anything else.
// Cognito's stylesheet carries a `cog-cognito--protect-css` class
// specifically meant to resist being overridden, so a few rules use
// !important where a plain override didn't stick when this was tested.
const COGNITO_FORM_CSS = `
.kiosist-cognito-form .cog-header { display: none !important; }

.kiosist-cognito-form .cog-form__container {
  background: transparent !important;
}

.kiosist-cognito-form .cog-form,
.kiosist-cognito-form .cog-form * {
  font-family: inherit !important;
}

.kiosist-cognito-form .cog-label {
  display: block;
  color: var(--kio-ink) !important;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.kiosist-cognito-form .cog-asterisk {
  color: var(--kio-error) !important;
}

.kiosist-cognito-form .el-input__inner,
.kiosist-cognito-form .el-textarea__inner {
  width: 100%;
  border-radius: 0.75rem;
  border: 1px solid var(--kio-line) !important;
  background: var(--kio-bg) !important;
  color: var(--kio-ink) !important;
  padding: 0.625rem 0.875rem;
  font-size: 0.875rem;
  box-shadow: none !important;
  transition: border-color .15s, box-shadow .15s;
}

.kiosist-cognito-form .el-input__inner::placeholder,
.kiosist-cognito-form .el-textarea__inner::placeholder {
  color: var(--kio-muted) !important;
}

.kiosist-cognito-form .el-input__inner:focus,
.kiosist-cognito-form .el-textarea__inner:focus {
  outline: none;
  border-color: var(--kio-accent) !important;
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--kio-accent) 35%, transparent) !important;
}

.kiosist-cognito-form .el-upload-dragger {
  width: 100%;
  background: transparent !important;
  border: 2px dashed var(--kio-line) !important;
  border-radius: 1rem;
  padding: 1.5rem;
  transition: border-color .15s, background-color .15s;
}
.kiosist-cognito-form .el-upload-dragger:hover {
  border-color: var(--kio-accent) !important;
  background: color-mix(in srgb, var(--kio-accent) 6%, transparent) !important;
}

.kiosist-cognito-form .cog-upload__drag-text {
  color: var(--kio-muted) !important;
  font-size: 0.8rem;
}

.kiosist-cognito-form .cog-upload__upload-button {
  border-radius: 9999px !important;
  border: 1px solid var(--kio-line) !important;
  background: transparent !important;
  color: var(--kio-accent) !important;
  font-weight: 600;
  font-size: 0.8rem;
  padding: 0.5rem 1.25rem;
}

.kiosist-cognito-form .cog-button--primary,
.kiosist-cognito-form .cog-button--submit {
  border-radius: 9999px !important;
  background: var(--kio-accent) !important;
  color: #05070d !important;
  font-weight: 700;
  font-size: 0.875rem;
  padding: 0.625rem 2rem;
  border: none !important;
  box-shadow: none !important;
  transition: background-color .15s;
}
.kiosist-cognito-form .cog-button--primary:hover,
.kiosist-cognito-form .cog-button--submit:hover {
  background: color-mix(in srgb, var(--kio-accent) 85%, black) !important;
}

/* Post-submission confirmation message + the read-only recap of the
   submitted fields Cognito shows underneath it- same "dark text on our now-
   dark card" problem as everything above, just on a DOM shape that only
   appears after a real submit (fieldset.is-read-only), which is why it
   wasn't caught by the input rules above. */
.kiosist-cognito-form .cog-confirmation__message,
.kiosist-cognito-form .cog-confirmation__message p {
  color: var(--kio-ink) !important;
  font-size: 1rem;
  line-height: 1.6;
}

.kiosist-cognito-form .cog-input.is-read-only {
  color: var(--kio-ink) !important;
}
`;

// Cognito Forms' "seamless" embed is meant to be pasted as a literal
// <script src="...seamless.js" data-key="..." data-form="...">- it uses
// document.currentScript to find where to insert its form. That still
// works when the tag is created and appended programmatically like this
// (document.currentScript stays valid for a script inserted via
// appendChild, not just one parsed straight out of the HTML), so this is
// the standard way to drop a "paste this script tag" embed into React.
//
// A MutationObserver flips the loading placeholder off the moment Cognito
// inserts its <form> (confirmed via live inspection- it's a real
// `.cog-form`, not an iframe), so the section doesn't sit on a fixed-height
// blank box once the real form is ready- with an 8s fallback in case it
// lands via some other DOM path.
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
      if (container.querySelector("form")) {
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
      // Cognito's script inserts its <form> as a sibling of itself inside
      // this container- clearing everything on unmount (route change, or a
      // React dev double-invoke) removes both, so remounting never leaves a
      // duplicate embed stacked underneath a fresh one.
      container.innerHTML = "";
    };
  }, [formKey, formId]);

  return (
    <div className={`kiosist-cognito-form relative ${className}`}>
      <style>{COGNITO_FORM_CSS}</style>
      <div ref={containerRef} className="min-h-[420px]" />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center text-sm text-kio-muted">
          Loading application form…
        </div>
      )}
    </div>
  );
}
