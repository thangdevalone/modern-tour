import React, { useState, useEffect, useMemo } from "react";
import ReactDOM from "react-dom/client";
import { TourProvider, useTour, TourStep } from "../src";
import "./demo.css";
import "./landing.css";
import {
  Moon,
  Sun,
  Play,
  Code,
  Github,
  Zap,
  Palette,
  Rocket,
  Copy,
  Check,
  ChevronRight,
  Terminal,
  BookOpen,
  Layers,
  ArrowRight,
} from "lucide-react";
import {
  translations,
  type Language,
  type Translations,
  updateSEOMeta,
} from "./i18n";

// --- Neo Components ---

const NeoButton = ({
  children,
  variant = "primary",
  className = "",
  ...props
}: any) => {
  const bgClass =
    variant === "secondary"
      ? "neo-btn-secondary"
      : variant === "accent"
        ? "neo-btn-accent"
        : "";
  return (
    <button className={`neo-btn ${bgClass} ${className}`} {...props}>
      {children}
    </button>
  );
};

const NeoCard = ({ title, children, className = "", id, icon }: any) => (
  <div id={id} className={`neo-box ${className}`} style={{ padding: "1.5rem" }}>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "1rem",
        borderBottom: "2px solid var(--neo-border)",
        paddingBottom: "0.5rem",
      }}
    >
      {title && (
        <h3
          style={{
            fontSize: "1.25rem",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          {title}
        </h3>
      )}
      {icon}
    </div>
    <div style={{ fontSize: "1.125rem", lineHeight: 1.6 }}>{children}</div>
  </div>
);

// --- Code Block Component ---
const CodeBlock = ({
  code,
  filename,
  onCopy,
}: {
  code: string;
  filename?: string;
  onCopy?: () => void;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      onCopy?.();
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div
      style={{
        background: "#0d1117",
        border: "3px solid var(--neo-border)",
        boxShadow: "6px 6px 0 var(--neo-shadow)",
        overflow: "hidden",
        fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
        fontSize: "0.8125rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0.5rem 1rem",
          background: "#161b22",
          borderBottom: "1px solid #30363d",
        }}
      >
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#ff5f57",
            }}
          ></div>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#febc2e",
            }}
          ></div>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#28c840",
            }}
          ></div>
          {filename && (
            <span
              style={{
                color: "#8b949e",
                fontSize: "0.75rem",
                marginLeft: "0.5rem",
              }}
            >
              {filename}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          style={{
            background: "none",
            border: "none",
            color: "#8b949e",
            cursor: "pointer",
            padding: "4px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "0.75rem",
          }}
        >
          {copied ? (
            <>
              <Check size={14} /> Copied!
            </>
          ) : (
            <>
              <Copy size={14} /> Copy
            </>
          )}
        </button>
      </div>
      <pre
        style={{
          padding: "1.25rem",
          overflow: "auto",
          margin: 0,
          color: "#e6edf3",
          lineHeight: 1.6,
        }}
      >
        {code}
      </pre>
    </div>
  );
};

// --- Landing Page Content ---

const LandingPage = ({
  isDark,
  setIsDark,
  currentAnimation,
  setCurrentAnimation,
  lang,
  setLang,
  t,
}: {
  isDark: boolean;
  setIsDark: (value: boolean) => void;
  currentAnimation: "fade" | "scale" | "slide" | "bounce" | "smooth";
  setCurrentAnimation: (
    value: "fade" | "scale" | "slide" | "bounce" | "smooth",
  ) => void;
  lang: Language;
  setLang: (value: Language) => void;
  t: Translations;
}) => {
  const { start } = useTour();

  const langLabels: Record<Language, string> = { en: "EN", vi: "VI", zh: "中" };
  const nextLang: Record<Language, Language> = { en: "vi", vi: "zh", zh: "en" };
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("npm i modern-tour");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="landing-root">
      {/* Header */}
      <header className="landing-header">
        <div className="landing-container landing-header-inner">
          <div id="logo-area" className="landing-logo-area">
            <div className="landing-logo-icon">
              <img
                src="/shoes.png"
                alt="Modern Tour Logo"
                style={{ width: 28, height: 28, objectFit: "contain" }}
              />
            </div>
            <span className="landing-logo-text">Modern Tour</span>
          </div>

          <div className="landing-header-actions">
            <nav id="nav-links" className="landing-nav">
              <a href="#features">{t.nav.animations}</a>
              <a href="#docs">{t.nav.docs}</a>
              <a
                href="https://github.com/thangdevalone/modern-tour"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.nav.github}
              </a>
            </nav>

            <div className="landing-header-buttons">
              <div id="theme-toggle">
                <button
                  onClick={() => setIsDark(!isDark)}
                  className="landing-icon-btn"
                  aria-label="Toggle Theme"
                >
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </div>

              <a
                href="https://github.com/thangdevalone/modern-tour"
                target="_blank"
                rel="noopener noreferrer"
                className="landing-icon-btn"
                aria-label="GitHub Repository"
              >
                <Github size={18} />
              </a>

              <button
                onClick={() => setLang(nextLang[lang])}
                className="landing-icon-btn"
                aria-label="Switch Language"
                style={{ fontWeight: 700, fontSize: "0.8rem" }}
              >
                {langLabels[lang]}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <section className="landing-hero">
          <div className="landing-container">
            <div className="landing-hero-content">
              <div className="landing-badge">
                <Zap size={14} />
                <span>{t.hero.badge}</span>
              </div>

              <h1 id="hero-title" className="landing-hero-title">
                {t.hero.title1}
                <br />
                <span className="landing-hero-accent">{t.hero.title2}</span>
              </h1>

              <p className="landing-hero-desc">{t.hero.description}</p>

              <div className="landing-hero-actions">
                <NeoButton
                  id="hero-cta"
                  onClick={() => start()}
                  style={{ padding: "14px 28px", fontSize: "1.125rem" }}
                >
                  <Rocket size={20} /> {t.hero.cta}
                </NeoButton>
                <NeoButton
                  variant="secondary"
                  onClick={handleCopy}
                  style={{ padding: "14px 28px", fontSize: "1.125rem" }}
                >
                  {copied ? <Check size={20} /> : <Copy size={20} />}{" "}
                  {t.hero.install}
                </NeoButton>
              </div>

              {/* Quick install terminal */}
              <div className="landing-terminal">
                <div className="landing-terminal-header">
                  <Terminal size={14} style={{ color: "#8b949e" }} />
                  <span style={{ color: "#8b949e", fontSize: "0.75rem" }}>
                    Terminal
                  </span>
                </div>
                <div className="landing-terminal-body">
                  <span style={{ color: "#7ee787" }}>$</span> npm install
                  modern-tour
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="landing-section">
          <div className="landing-container">
            <div className="landing-section-header">
              <h2 className="landing-section-title">{t.features.title}</h2>
              <div className="landing-section-line"></div>
            </div>

            <div className="landing-grid-3">
              <NeoCard
                id="feature-1"
                title={t.features.physics.title}
                className="neo-card-pink"
                icon={<Zap size={28} />}
              >
                <p>{t.features.physics.desc}</p>
              </NeoCard>
              <NeoCard
                id="feature-2"
                title={t.features.themeable.title}
                className="neo-card-blue"
                icon={<Palette size={28} />}
              >
                <p>{t.features.themeable.desc}</p>
              </NeoCard>
              <NeoCard
                id="feature-3"
                title={t.features.headless.title}
                className="neo-card-teal"
                icon={<Code size={28} />}
              >
                <p>{t.features.headless.desc}</p>
              </NeoCard>
            </div>
          </div>
        </section>

        {/* Animation Showcase */}
        <section
          id="animations"
          className="landing-section landing-section-alt"
        >
          <div className="landing-container">
            <div className="landing-section-header">
              <h2 className="landing-section-title">{t.animations.title}</h2>
              <p className="landing-section-subtitle">
                {t.animations.subtitle}
              </p>
            </div>

            <div className="landing-anim-grid">
              {(["fade", "scale", "slide", "bounce", "smooth"] as const).map(
                (anim) => (
                  <button
                    key={anim}
                    onClick={() => setCurrentAnimation(anim)}
                    className={`neo-btn ${currentAnimation === anim ? "neo-btn-accent" : "neo-btn-secondary"}`}
                    style={{
                      padding: "10px 16px",
                      textTransform: "uppercase",
                      fontWeight: 700,
                      fontSize: "0.8125rem",
                      color:
                        currentAnimation === anim ? "#000" : "var(--neo-text)",
                    }}
                  >
                    {anim}
                  </button>
                ),
              )}
            </div>

            <div
              className="neo-box"
              style={{
                padding: "2rem",
                background: "var(--neo-bg)",
                textAlign: "center",
              }}
            >
              <p style={{ fontSize: "1.125rem", marginBottom: "0.75rem" }}>
                {t.animations.current}:{" "}
                <strong style={{ textTransform: "uppercase" }}>
                  {currentAnimation}
                </strong>
              </p>
              <p
                style={{
                  fontSize: "0.875rem",
                  color: "var(--neo-text)",
                  opacity: 0.6,
                  marginBottom: "1.5rem",
                }}
              >
                {t.animations[currentAnimation]}
              </p>
              <button
                className="neo-btn"
                onClick={() => start()}
                style={{
                  padding: "12px 24px",
                  fontSize: "1rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Play size={18} /> {t.animations.tryBtn}{" "}
                {currentAnimation.charAt(0).toUpperCase() +
                  currentAnimation.slice(1)}{" "}
                {t.animations.animation}
              </button>
            </div>
          </div>
        </section>

        {/* Quick Start / Documentation */}
        <section id="docs" className="landing-section">
          <div className="landing-container">
            <div className="landing-section-header">
              <h2 className="landing-section-title">
                <BookOpen
                  size={36}
                  style={{
                    display: "inline",
                    verticalAlign: "middle",
                    marginRight: "0.5rem",
                  }}
                />
                {t.docs.title}
              </h2>
              <p className="landing-section-subtitle">{t.docs.subtitle}</p>
            </div>

            {/* Step 1: Install */}
            <div className="landing-doc-step">
              <div className="landing-step-label">
                <div className="landing-step-number">1</div>
                <span>{t.docs.step1}</span>
              </div>
              <CodeBlock
                filename="Terminal"
                code={`npm install modern-tour
# or
yarn add modern-tour
# or
pnpm add modern-tour`}
              />
            </div>

            {/* Step 2: Wrap Provider */}
            <div className="landing-doc-step">
              <div className="landing-step-label">
                <div className="landing-step-number">2</div>
                <span>{t.docs.step2}</span>
              </div>
              <CodeBlock
                filename="App.tsx"
                code={`import { TourProvider } from 'modern-tour';
// No CSS import needed — styles are auto-injected!

const steps = [
  {
    target: '#welcome-btn',
    title: 'Welcome!',
    content: 'Click here to get started.',
    position: 'bottom'
  },
  {
    target: '#settings',
    title: 'Settings',
    content: 'Customize your preferences here.',
    position: 'right'
  }
];

function App() {
  return (
    <TourProvider options={{ steps, animation: 'smooth' }}>
      <MyApp />
    </TourProvider>
  );
}`}
              />
            </div>

            {/* Step 3: Trigger */}
            <div className="landing-doc-step">
              <div className="landing-step-label">
                <div className="landing-step-number">3</div>
                <span>{t.docs.step3}</span>
              </div>
              <CodeBlock
                filename="MyApp.tsx"
                code={`import { useTour } from 'modern-tour';

function MyApp() {
  const { start } = useTour();

  return (
    <div>
      <button id="welcome-btn" onClick={() => start()}>
        Start Tour
      </button>
      <button id="settings">Settings</button>
    </div>
  );
}`}
              />
            </div>

            {/* Configuration Examples */}
            <div className="landing-config-grid" id="code-block">
              <div className="landing-config-card">
                <h3 className="landing-config-title">
                  <Layers size={18} /> {t.config.customAnim}
                </h3>
                <CodeBlock
                  code={`// Use a preset
animation: 'smooth' // fade | scale | slide | bounce | smooth

// Or define custom animation
animation: {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -10 },
  transition: { type: 'spring', stiffness: 300, damping: 25 }
}`}
                />
              </div>

              <div className="landing-config-card">
                <h3 className="landing-config-title">
                  <Palette size={18} /> {t.config.theming}
                </h3>
                <CodeBlock
                  filename="styles.css"
                  code={`/* Override CSS variables to match your design system */
:root {
  --tour-bg: #ffffff;
  --tour-text: #09090b;
  --tour-primary: #18181b;
  --tour-primary-foreground: #fafafa;
  --tour-border: #e4e4e7;
  --tour-radius: 0.5rem;
  --tour-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

/* Dark mode auto-detected via .dark class or prefers-color-scheme */
.dark {
  --tour-bg: #09090b;
  --tour-text: #fafafa;
  --tour-primary: #fafafa;
  --tour-primary-foreground: #18181b;
}`}
                />
              </div>

              <div className="landing-config-card">
                <h3 className="landing-config-title">
                  <Code size={18} /> {t.config.labels}
                </h3>
                <CodeBlock
                  code={`<TourProvider options={{
  steps,
  labels: {
    next: 'Continue →',
    prev: '← Back',
    finish: 'Got it!',
    skip: 'Skip Tour',
    close: 'Close'
  },
  showProgress: true,
  showNavigation: true,
  showCloseButton: true,
  keyboardNavigation: true,
  closeOnOverlayClick: true,
  closeOnEscape: true,
  spotlightPadding: 8,
  scrollBehavior: 'smooth'
}}>
  <App />
</TourProvider>`}
                />
              </div>

              <div className="landing-config-card">
                <h3 className="landing-config-title">
                  <Zap size={18} /> {t.docs.headless}
                </h3>
                <CodeBlock
                  filename="CustomTourUI.tsx"
                  code={`import { useTour, useTourActions } from 'modern-tour';

function CustomTourUI() {
  const { isOpen, step, currentStep, totalSteps } = useTour();
  const { start, stop, next, prev, goTo } = useTourActions();

  if (!isOpen) return null;

  return (
    <div className="my-custom-tooltip">
      <h2>{step?.title}</h2>
      <p>{step?.content}</p>
      <span>{currentStep + 1} / {totalSteps}</span>
      <button onClick={prev}>Back</button>
      <button onClick={next}>Next</button>
    </div>
  );
}`}
                />
              </div>
            </div>

            {/* Compatibility Note */}
            <div className="landing-compat-box">
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 900,
                  textTransform: "uppercase",
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <Check size={20} /> Compatibility
              </h3>
              <div className="landing-compat-grid">
                <div className="landing-compat-item">
                  <strong>✅ Tailwind CSS v3</strong>
                  <span>Full support</span>
                </div>
                <div className="landing-compat-item">
                  <strong>✅ Tailwind CSS v4</strong>
                  <span>Full support</span>
                </div>
                <div className="landing-compat-item">
                  <strong>✅ Vanilla CSS</strong>
                  <span>No dependencies</span>
                </div>
                <div className="landing-compat-item">
                  <strong>✅ CSS-in-JS</strong>
                  <span>Styled-components, Emotion</span>
                </div>
                <div className="landing-compat-item">
                  <strong>✅ Next.js / Vite</strong>
                  <span>SSR & SPA</span>
                </div>
                <div className="landing-compat-item">
                  <strong>✅ Zero CSS Import</strong>
                  <span>Styles auto-injected</span>
                </div>
              </div>
            </div>

            {/* Advanced Features */}
            <div className="landing-advanced-grid">
              <div
                className="neo-box"
                style={{ padding: "1.5rem", background: "var(--neo-bg)" }}
              >
                <h4
                  style={{
                    fontWeight: 700,
                    borderBottom: "2px solid var(--neo-border)",
                    paddingBottom: "0.5rem",
                    marginBottom: "0.75rem",
                    textTransform: "uppercase",
                  }}
                >
                  {t.docs.advanced}
                </h4>
                <ul
                  style={{
                    fontSize: "0.875rem",
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                  }}
                >
                  {t.docs.advancedList.map((item: string, i: number) => (
                    <li
                      key={i}
                      style={{
                        padding: "0.375rem 0",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <ChevronRight
                        size={14}
                        style={{ color: "var(--neo-primary)", flexShrink: 0 }}
                      />{" "}
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className="neo-box"
                style={{ padding: "1.5rem", background: "var(--neo-bg)" }}
              >
                <h4
                  style={{
                    fontWeight: 700,
                    borderBottom: "2px solid var(--neo-border)",
                    paddingBottom: "0.5rem",
                    marginBottom: "0.75rem",
                    textTransform: "uppercase",
                  }}
                >
                  Step Positions
                </h4>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "0.375rem",
                    fontSize: "0.8125rem",
                  }}
                >
                  {[
                    "top-start",
                    "top",
                    "top-end",
                    "left-start",
                    "left",
                    "left-end",
                    "right-start",
                    "right",
                    "right-end",
                    "bottom-start",
                    "bottom",
                    "bottom-end",
                  ].map((pos) => (
                    <code
                      key={pos}
                      style={{
                        background: "var(--neo-card)",
                        border: "1px solid var(--neo-border)",
                        padding: "0.25rem 0.5rem",
                        textAlign: "center",
                        fontSize: "0.6875rem",
                      }}
                    >
                      {pos}
                    </code>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-container landing-footer-inner">
          <div className="landing-footer-brand">
            <img
              src="/shoes.png"
              alt="Modern Tour"
              style={{ width: 24, height: 24 }}
            />{" "}
            Modern Tour © 2026
          </div>
          <div className="landing-footer-links">
            <a
              href="https://github.com/thangdevalone/modern-tour"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={14} /> {t.nav.github}
            </a>
            <a href="#docs">{t.footer.docs}</a>
            <a
              href="https://www.npmjs.com/package/modern-tour"
              target="_blank"
              rel="noopener noreferrer"
            >
              NPM
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const CrossPageAbout = ({ onBack }: { onBack: () => void }) => (
  <div className="landing-root" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--neo-bg)' }}>
    <div className="neo-box" style={{ padding: '3rem', textAlign: 'center', maxWidth: 600 }}>
      <h2 id="cross-page-element" style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '1rem', color: 'var(--neo-text)' }}>
        🚀 Cross-Page Works!
      </h2>
      <p style={{ marginBottom: '2rem', fontSize: '1.2rem', lineHeight: 1.6, color: 'var(--neo-text)' }}>
        This is a completely different route/page. The tour automatically waited for the new DOM to render and found this component seamlessly!
      </p>
      <button className="neo-btn neo-btn-primary" onClick={onBack}>
        Go Back Home
      </button>
    </div>
  </div>
);

const App = () => {
  const [currentRoute, setCurrentRoute] = useState("/");
  const [isDark, setIsDark] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState<
    "fade" | "scale" | "slide" | "bounce" | "smooth"
  >("smooth");

  const getInitialLang = (): Language => {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get("lang");
    if (urlLang === "vi" || urlLang === "zh" || urlLang === "en") {
      return urlLang;
    }
    return "en";
  };

  const [lang, setLang] = useState<Language>(getInitialLang);

  const t = useMemo(() => translations[lang] as Translations, [lang]);

  useEffect(() => {
    updateSEOMeta(lang);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", lang);
    window.history.replaceState({}, "", url.toString());
  }, [lang]);

  const localizedSteps: TourStep[] = useMemo(
    () => [
      {
        target: "#hero-title",
        title: t.tour.step1.title,
        content: t.tour.step1.content,
        position: "bottom",
        route: "/",
      },
      {
        target: "#hero-cta",
        content: t.tour.step2.content,
        position: "right",
        route: "/",
      },
      {
        target: "#theme-toggle",
        title: t.tour.step3.title,
        content: t.tour.step3.content,
        position: "bottom",
        route: "/",
      },
      {
        target: "#feature-1",
        title: t.tour.step4.title,
        content: t.tour.step4.content,
        position: "top",
        route: "/",
      },
      {
        target: "#code-block",
        title: t.tour.step5.title,
        content: t.tour.step5.content,
        position: "left",
        route: "/",
      },
      {
        target: "#cross-page-element",
        title: "Cross-Page Tour",
        content: "Awesome! The TourProvider waited for the DOM, detected the page change, and found me smoothly.",
        position: "bottom",
        route: "/about",
      },
    ],
    [t],
  );

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light",
    );
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <TourProvider
      key={`${currentAnimation}-${lang}`}
      options={{
        steps: localizedSteps,
        animation: currentAnimation,
        labels: {
          next: t.tour.labels.next,
          prev: t.tour.labels.prev,
          finish: t.tour.labels.finish,
          skip: t.tour.labels.skip,
        },
        showProgress: true,
        showNavigation: true,
        showCloseButton: true,
        onStepChange: (stepIndex) => {
          const nextRoute = localizedSteps[stepIndex]?.route;
          if (nextRoute) {
            setCurrentRoute(nextRoute);
          }
        }
      }}
    >
      {currentRoute === "/" ? (
        <LandingPage
          isDark={isDark}
          setIsDark={setIsDark}
          currentAnimation={currentAnimation}
          setCurrentAnimation={setCurrentAnimation}
          lang={lang}
          setLang={setLang}
          t={t}
        />
      ) : (
        <CrossPageAbout onBack={() => setCurrentRoute("/")} />
      )}
    </TourProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
