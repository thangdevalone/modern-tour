import React, { useState, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import { TourProvider, useTour, TourStep } from '../src';
import '../src/styles.css';
import './landing.css';
import { Moon, Sun, Play, Package, Code, Layers, Github, Zap, Box, Sparkles, Settings, Palette, Rocket, Globe } from 'lucide-react';
import { translations, type Language, type Translations, updateSEOMeta } from './i18n';

// --- Neo Components ---

const NeoButton = ({ children, variant = 'primary', className = '', ...props }: any) => {
    const bgClass = variant === 'secondary' ? 'neo-btn-secondary' : variant === 'accent' ? 'neo-btn-accent' : '';
    return (
        <button className={`neo-btn ${bgClass} ${className} flex items-center justify-center gap-2`} {...props}>
            {children}
        </button>
    );
};

const NeoCard = ({ title, children, className = '', id, icon }: any) => (
    <div id={id} className={`neo-box p-6 md:p-8 ${className}`}>
        <div className="flex items-center justify-between mb-4 border-b-2 border-[var(--neo-border)] pb-2">
            {title && (
                <h3 className="text-xl md:text-2xl font-bold uppercase tracking-wide">
                    {title}
                </h3>
            )}
            {icon}
        </div>
        <div className="text-lg leading-relaxed">{children}</div>
    </div>
);

// --- Landing Page Content ---

const LandingPage = ({
    isDark,
    setIsDark,
    currentAnimation,
    setCurrentAnimation,
    lang,
    setLang,
    t
}: {
    isDark: boolean;
    setIsDark: (value: boolean) => void;
    currentAnimation: 'fade' | 'scale' | 'slide' | 'bounce' | 'smooth';
    setCurrentAnimation: (value: 'fade' | 'scale' | 'slide' | 'bounce' | 'smooth') => void;
    lang: Language;
    setLang: (value: Language) => void;
    t: Translations;
}) => {
    const { start } = useTour();

    const langLabels: Record<Language, string> = { en: 'EN', vi: 'VI', zh: '中' };
    const nextLang: Record<Language, Language> = { en: 'vi', vi: 'zh', zh: 'en' };

    return (
        <div className="min-h-screen flex flex-col font-mono selection:bg-[var(--neo-primary)] selection:text-white">

            {/* Header */}
            <header className="border-b-[3px] border-[var(--neo-border)] sticky top-0 z-40 bg-[var(--neo-bg)]">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <div id="logo-area" className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[var(--neo-primary)] border-[3px] border-[var(--neo-border)] shadow-[3px_3px_0_var(--neo-shadow)] flex items-center justify-center overflow-hidden">
                            <img src="/shoes.png" alt="Modern Tour Logo" className="w-8 h-8 object-contain" />
                        </div>
                        <span className="text-2xl font-black uppercase tracking-tighter">Modern Tour</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <nav id="nav-links" className="hidden md:flex gap-6 font-bold uppercase text-sm">
                            <a href="#animations" className="hover:text-[var(--neo-primary)] transition-colors">{t.nav.animations}</a>
                            <a href="#docs" className="hover:text-[var(--neo-primary)] transition-colors">{t.nav.docs}</a>
                            <a href="https://github.com/thangdevalone/modern-tour" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--neo-primary)] transition-colors">{t.nav.github}</a>
                        </nav>

                        <div id="theme-toggle" className="flex items-center">
                            <button
                                onClick={() => setIsDark(!isDark)}
                                className="w-12 h-12 flex items-center justify-center border-[3px] border-[var(--neo-border)] bg-[var(--neo-card)] transition-all active:translate-y-1 active:shadow-none shadow-[4px_4px_0_var(--neo-shadow)] hover:bg-[var(--neo-secondary)]"
                                aria-label="Toggle Theme"
                                style={{ color: 'var(--neo-text)' }}
                            >
                                {isDark ? <Sun size={24} /> : <Moon size={24} />}
                            </button>

                            {/* GitHub Button */}

                        </div>
                        <a
                            href="https://github.com/thangdevalone/modern-tour"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-12 flex items-center justify-center border-[3px] border-[var(--neo-border)] bg-[var(--neo-card)] transition-all active:translate-y-1 active:shadow-none shadow-[4px_4px_0_var(--neo-shadow)] hover:bg-[var(--neo-text)] hover:text-[var(--neo-bg)] text-[var(--neo-text)]"
                            aria-label="GitHub Repository"
                        >
                            <Github size={24} />
                        </a>
                        {/* Language Switcher */}
                        <button
                            onClick={() => setLang(nextLang[lang])}
                            className="w-12 h-12 flex items-center justify-center border-[3px] border-[var(--neo-border)] bg-[var(--neo-card)] transition-all active:translate-y-1 active:shadow-none shadow-[4px_4px_0_var(--neo-shadow)] hover:bg-[var(--neo-accent)] font-bold text-sm"
                            aria-label="Switch Language"
                            style={{ color: 'var(--neo-text)' }}
                        >
                            {langLabels[lang]}
                        </button>

                        <NeoButton
                            id="header-cta"
                            onClick={() => start()}
                            className="hidden md:flex py-2 text-sm"
                        >
                            <Play size={16} /> Demo
                        </NeoButton>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <main className="flex-1">
                <section className="border-b-[3px] border-[var(--neo-border)] py-20 md:py-32">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto text-center space-y-8">
                            <div className="flex justify-center">
                                <div
                                    className="inline-flex items-center gap-2 bg-[var(--neo-accent)] border-[3px] border-[var(--neo-border)] px-6 py-2 font-bold uppercase text-sm shadow-[4px_4px_0_var(--neo-shadow)]"
                                    style={{ color: '#000' }}
                                >
                                    <span>{t.hero.badge}</span>
                                </div>
                            </div>

                            <h1 id="hero-title" className="text-5xl md:text-7xl font-black leading-[0.9] uppercase tracking-tighter">
                                {t.hero.title1}<br />
                                <span className="text-[var(--neo-secondary)]" style={{ textShadow: '4px 4px 0 var(--neo-border)' }}>{t.hero.title2}</span>
                            </h1>
                            <p className="text-xl md:text-2xl font-medium max-w-2xl mx-auto py-4 px-4 leading-relaxed">
                                {t.hero.description}
                            </p>
                            <div className="flex flex-row flex-wrap gap-4 pt-2 justify-center items-center">
                                <NeoButton id="hero-cta" onClick={() => start()} className="text-lg md:text-xl py-3 px-6 md:py-4 md:px-8">
                                    <Rocket size={24} /> {t.hero.cta}
                                </NeoButton>
                                <NeoButton variant="secondary" className="text-lg md:text-xl py-3 px-6 md:py-4 md:px-8">
                                    <Package size={24} /> {t.hero.install}
                                </NeoButton>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Grid */}
                <section className="py-20 bg-[var(--neo-bg)]">
                    <div className="container mx-auto px-6">
                        <div className="mb-16 text-center">
                            <h2 className="text-4xl md:text-5xl font-black uppercase mb-4">{t.features.title}</h2>
                            <div className="w-24 h-2 bg-[var(--neo-text)] mx-auto"></div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <NeoCard id="feature-1" title={t.features.physics.title} className="bg-[#ff9ff3]" icon={<Zap size={32} />}>
                                <p>{t.features.physics.desc}</p>
                            </NeoCard>
                            <NeoCard id="feature-2" title={t.features.themeable.title} className="bg-[#54a0ff]" icon={<Palette size={32} />}>
                                <p>{t.features.themeable.desc}</p>
                            </NeoCard>
                            <NeoCard id="feature-3" title={t.features.headless.title} className="bg-[#00d2d3]" icon={<Code size={32} />}>
                                <p>{t.features.headless.desc}</p>
                            </NeoCard>
                        </div>
                    </div>
                </section>

                {/* Animation Showcase */}
                <section id="animations" className="border-y-[3px] border-[var(--neo-border)] py-20 bg-[var(--neo-card)]">
                    <div className="container mx-auto px-6">
                        <div className="mb-12 text-center">
                            <h2 className="text-4xl md:text-5xl font-black uppercase mb-4">{t.animations.title}</h2>
                            <p className="text-xl">{t.animations.subtitle}</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4 mb-8">
                            {(['fade', 'scale', 'slide', 'bounce', 'smooth'] as const).map((anim) => (
                                <button
                                    key={anim}
                                    onClick={() => setCurrentAnimation(anim)}
                                    className={`neo-btn ${currentAnimation === anim ? 'neo-btn-accent' : 'neo-btn-secondary'} py-2 md:py-3 uppercase font-bold text-xs md:text-sm`}
                                    style={{ color: currentAnimation === anim ? '#000' : 'var(--neo-text)' }}
                                >
                                    {anim}
                                </button>
                            ))}
                        </div>

                        <div className="neo-box p-8 bg-[var(--neo-bg)] text-center">
                            <p className="text-lg mb-4">{t.animations.current}: <span className="font-bold uppercase">{currentAnimation}</span></p>
                            <p className="text-sm text-[var(--neo-text-secondary)] mb-6">
                                {t.animations[currentAnimation]}
                            </p>
                            <div className="inline-block">
                                <button
                                    className="neo-btn py-3 px-6 text-lg flex items-center gap-2"
                                    onClick={() => start()}
                                >
                                    <Play size={20} /> {t.animations.tryBtn} {currentAnimation.charAt(0).toUpperCase() + currentAnimation.slice(1)} {t.animations.animation}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Configuration Examples */}
                <section className="py-16 md:py-20 bg-[var(--neo-bg)]">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="mb-8 md:mb-12 text-center">
                            <h2 className="text-3xl md:text-5xl font-black uppercase mb-4 flex items-center justify-center gap-2 md:gap-3">
                                <Settings size={32} className="md:w-10 md:h-10" /> {t.config.title}
                            </h2>
                            <p className="text-lg md:text-xl">{t.config.subtitle}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                            <div className="neo-box p-4 md:p-6 bg-[var(--neo-card)]">
                                <h3 className="text-lg md:text-2xl font-bold mb-3 md:mb-4 border-b-2 border-[var(--neo-border)] pb-2 uppercase">{t.config.basic}</h3>
                                <pre className="bg-[#1e1e1e] text-gray-300 p-3 md:p-4 rounded text-xs md:text-sm overflow-x-auto border-2 border-[var(--neo-border)]">
                                    {`<TourProvider options={{
  steps: [
    { target: '#btn', content: 'Click me!' }
  ],
  animation: 'smooth',
  autoStart: true
}}>
  <App />
</TourProvider>`}
                                </pre>
                            </div>

                            <div className="neo-box p-4 md:p-6 bg-[var(--neo-card)]">
                                <h3 className="text-lg md:text-2xl font-bold mb-3 md:mb-4 border-b-2 border-[var(--neo-border)] pb-2 uppercase">{t.config.labels}</h3>
                                <pre className="bg-[#1e1e1e] text-gray-300 p-3 md:p-4 rounded text-xs md:text-sm overflow-x-auto border-2 border-[var(--neo-border)]">
                                    {`options={{
  labels: {
    next: 'Continue →',
    prev: '← Back',
    finish: 'Got it!',
    skip: 'Skip Tour'
  }
}}`}
                                </pre>
                            </div>

                            <div className="neo-box p-4 md:p-6 bg-[var(--neo-card)]">
                                <h3 className="text-lg md:text-2xl font-bold mb-3 md:mb-4 border-b-2 border-[var(--neo-border)] pb-2 uppercase">{t.config.customAnim}</h3>
                                <pre className="bg-[#1e1e1e] text-gray-300 p-3 md:p-4 rounded text-xs md:text-sm overflow-x-auto border-2 border-[var(--neo-border)]">
                                    {`animation: {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
  transition: { 
    type: 'spring',
    stiffness: 300 
  }
}`}
                                </pre>
                            </div>

                            <div className="neo-box p-4 md:p-6 bg-[var(--neo-card)]">
                                <h3 className="text-lg md:text-2xl font-bold mb-3 md:mb-4 border-b-2 border-[var(--neo-border)] pb-2 uppercase">{t.config.theming}</h3>
                                <pre className="bg-[#1e1e1e] text-gray-300 p-3 md:p-4 rounded text-xs md:text-sm overflow-x-auto border-2 border-[var(--neo-border)]">
                                    {`:root {
  --tour-bg: #ffffff;
  --tour-text: #000000;
  --tour-primary: #ff0000;
  --tour-radius: 12px;
  --tour-shadow: 0 4px 12px rgba(0,0,0,0.15);
}`}
                                </pre>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Documentation Section */}
                <section id="docs" className="border-y-[3px] border-[var(--neo-border)] bg-[var(--neo-card)]">
                    <div className="container mx-auto px-6 py-20">
                        <div className="flex flex-col lg:flex-row gap-12">
                            <div className="lg:w-1/3">
                                <h2 className="text-4xl font-black uppercase mb-8 flex items-center gap-3">
                                    <Code size={40} /> {t.docs.title}
                                </h2>
                                <p className="text-xl mb-6">{t.docs.subtitle}</p>
                                <div className="flex flex-col gap-4">
                                    <div className="bg-[var(--neo-secondary)] border-[3px] border-[var(--neo-border)] p-4 font-bold flex items-center gap-4" style={{ color: '#000' }}>
                                        <div className="bg-black text-white w-8 h-8 flex items-center justify-center rounded-full font-mono">1</div>
                                        {t.docs.step1}
                                    </div>
                                    <div className="bg-[var(--neo-accent)] border-[3px] border-[var(--neo-border)] p-4 font-bold flex items-center gap-4" style={{ color: '#000' }}>
                                        <div className="bg-black text-white w-8 h-8 flex items-center justify-center rounded-full font-mono">2</div>
                                        {t.docs.step2}
                                    </div>
                                    <div className="bg-[var(--neo-primary)] border-[3px] border-[var(--neo-border)] p-4 font-bold flex items-center gap-4" style={{ color: '#fff' }}>
                                        <div className="bg-white text-black w-8 h-8 flex items-center justify-center rounded-full font-mono">3</div>
                                        {t.docs.step3}
                                    </div>
                                </div>
                            </div>

                            <div id="code-block" className="lg:w-2/3">
                                <div className="bg-[#1e1e1e] border-[3px] border-[var(--neo-border)] shadow-[8px_8px_0_var(--neo-shadow)] p-0 overflow-hidden text-sm font-mono text-gray-300">
                                    <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-[#333]">
                                        <div className="flex gap-2">
                                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                        </div>
                                        <span className="text-xs text-gray-500">App.tsx</span>
                                    </div>
                                    <div className="p-6 overflow-x-auto">
                                        <pre className="language-jsx">
                                            {`// Step 1: Install
npm install modern-tour framer-motion

// Step 2: Import and configure
import { TourProvider, useTour } from 'modern-tour';
import 'modern-tour/styles.css';

const steps = [
  { 
    target: '#welcome-btn',
    title: 'Welcome!',
    content: 'Click here to get started.',
    position: 'bottom'
  },
  {
    target: '#settings',
    content: 'Customize your preferences here.'
  }
];

function App() {
  return (
    <TourProvider options={{ steps, animation: 'smooth' }}>
      <MyApp />
    </TourProvider>
  );
}

// Step 3: Trigger the tour
function MyApp() {
  const { start } = useTour();
  
  return (
    <button onClick={() => start()}>
      Start Tour
    </button>
  );
}`}
                                        </pre>
                                    </div>
                                </div>

                                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="neo-box p-4 bg-[var(--neo-bg)]">
                                        <h4 className="font-bold border-b-2 border-[var(--neo-border)] pb-2 mb-2 uppercase">{t.docs.advanced}</h4>
                                        <ul className="text-sm space-y-1">
                                            {t.docs.advancedList.map((item: string, i: number) => (
                                                <li key={i}>• {item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="neo-box p-4 bg-[var(--neo-bg)]">
                                        <h4 className="font-bold border-b-2 border-[var(--neo-border)] pb-2 mb-2 uppercase">{t.docs.headless}</h4>
                                        <p className="text-sm">{t.docs.headlessDesc}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="py-12 border-t-[3px] border-[var(--neo-border)] bg-[var(--neo-text)] text-[var(--neo-bg)]">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="font-bold text-2xl uppercase tracking-widest flex items-center gap-2">
                        <img src="/shoes.png" alt="Modern Tour" className="w-6 h-6" /> Modern Tour © 2026
                    </div>
                    <div className="flex gap-6 font-bold uppercase text-sm items-center">
                        <a href="#" className="flex items-center gap-2 hover:text-[var(--neo-secondary)] transition-colors"><Github size={16} /> {t.nav.github}</a>
                        <a href="#docs" className="hover:text-[var(--neo-secondary)] transition-colors">{t.footer.docs}</a>
                        <a href="#" className="hover:text-[var(--neo-secondary)] transition-colors">NPM</a>
                    </div>
                </div>
            </footer>

            {/* Tailwind Utility Styles */}
            <style>{`
        .container { width: 100%; margin-right: auto; margin-left: auto; padding-left: 1.5rem; padding-right: 1.5rem; }
        @media (min-width: 640px) { .container { max-width: 640px; } }
        @media (min-width: 768px) { .container { max-width: 768px; } }
        @media (min-width: 1024px) { .container { max-width: 1024px; } }
        @media (min-width: 1280px) { .container { max-width: 1280px; } }
        .grid { display: grid; }
        .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
        .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .flex { display: flex; }
        .hidden { display: none; }
        .inline { display: inline; }
        .inline-block { display: inline-block; }
        .flex-col { flex-direction: column; }
        .items-center { align-items: center; }
        .justify-between { justify-content: space-between; }
        .justify-center { justify-content: center; }
        .gap-1 { gap: 0.25rem; }
        .gap-2 { gap: 0.5rem; }
        .gap-3 { gap: 0.75rem; }
        .gap-4 { gap: 1rem; }
        .gap-6 { gap: 1.5rem; }
        .gap-8 { gap: 2rem; }
        .gap-12 { gap: 3rem; }
        .space-y-1 > * + * { margin-top: 0.25rem; }
        .p-0 { padding: 0; }
        .p-2 { padding: 0.5rem; }
        .p-3 { padding: 0.75rem; }
        .p-4 { padding: 1rem; }
        .p-6 { padding: 1.5rem; }
        .p-8 { padding: 2rem; }
        .px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
        .px-4 { padding-left: 1rem; padding-right: 1rem; }
        .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
        .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
        .py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
        .px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
        .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
        .px-8 { padding-left: 2rem; padding-right: 2rem; }
        .py-12 { padding-top: 3rem; padding-bottom: 3rem; }
        .py-16 { padding-top: 4rem; padding-bottom: 4rem; }
        .py-20 { padding-top: 5rem; padding-bottom: 5rem; }
        .pt-4 { padding-top: 1rem; }
        .pl-6 { padding-left: 1.5rem; }
        .pb-2 { padding-bottom: 0.5rem; }
        .mb-2 { margin-bottom: 0.5rem; }
        .mb-3 { margin-bottom: 0.75rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .mb-8 { margin-bottom: 2rem; }
        .mb-12 { margin-bottom: 3rem; }
        .mb-16 { margin-bottom: 4rem; }
        .mt-8 { margin-top: 2rem; }
        .ml-1 { margin-left: 0.25rem; }
        .mr-1 { margin-right: 0.25rem; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .w-full { width: 100%; }
        .w-3 { width: 0.75rem; }
        .h-3 { height: 0.75rem; }
        .w-8 { width: 2rem; }
        .h-8 { height: 2rem; }
        .w-12 { width: 3rem; }
        .h-12 { height: 3rem; }
        .min-h-screen { min-height: 100vh; }
        .font-bold { font-weight: 700; }
        .font-black { font-weight: 900; }
        .font-medium { font-weight: 500; }
        .uppercase { text-transform: uppercase; }
        .text-center { text-align: center; }
        .text-xs { font-size: 0.75rem; }
        .text-sm { font-size: 0.875rem; }
        .text-lg { font-size: 1.125rem; }
        .text-xl { font-size: 1.25rem; }
        .text-2xl { font-size: 1.5rem; }
        .text-3xl { font-size: 1.875rem; }
        .text-4xl { font-size: 2.25rem; }
        .text-5xl { font-size: 3rem; }
        .relative { position: relative; }
        .absolute { position: absolute; }
        .sticky { position: sticky; }
        .top-0 { top: 0; }
        .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
        .rounded { border-radius: 0.25rem; }
        .rounded-full { border-radius: 9999px; }
        .border-b { border-bottom-width: 1px; }
        .border-2 { border-width: 2px; }
        .fill-current { fill: currentColor; }
        .bg-red-500 { background-color: #ef4444; }
        .bg-yellow-500 { background-color: #eab308; }
        .bg-green-500 { background-color: #22c55e; }
        .text-white { color: #fff; }
        .text-black { color: #000; }
        .text-gray-300 { color: #d1d5db; }
        .text-gray-500 { color: #6b7280; }
        .space-y-8 > * + * { margin-top: 2rem; }
        .overflow-x-auto { overflow-x: auto; }
        .overflow-hidden { overflow: hidden; }
        .col-span-2 { grid-column: span 2 / span 2; }
        .aspect-video { aspect-ratio: 16 / 9; }
        .transition-colors { transition-property: color, background-color; transition-duration: 150ms; }
        .transition-all { transition-property: all; transition-duration: 150ms; }
        .animate-bounce { animation: bounce 1s infinite; }
        @keyframes bounce {
          0%, 100% { transform: translateY(-10%); animation-timing-function: cubic-bezier(0.8, 0, 1, 1); }
          50% { transform: translateY(0); animation-timing-function: cubic-bezier(0, 0, 0.2, 1); }
        }
        
        @media (min-width: 640px) {
          .sm\:flex-row { flex-direction: row; }
        }
        @media (min-width: 768px) {
          .md\:block { display: block; }
          .md\:flex { display: flex; }
          .md\:flex-row { flex-direction: row; }
          .md\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .md\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .md\:grid-cols-5 { grid-template-columns: repeat(5, minmax(0, 1fr)); }
          .md\:text-sm { font-size: 0.875rem; }
          .md\:text-lg { font-size: 1.125rem; }
          .md\:text-xl { font-size: 1.25rem; }
          .md\:text-2xl { font-size: 1.5rem; }
          .md\:text-5xl { font-size: 3rem; }
          .md\:text-7xl { font-size: 4.5rem; }
          .md\:py-20 { padding-top: 5rem; padding-bottom: 5rem; }
          .md\:py-32 { padding-top: 8rem; padding-bottom: 8rem; }
          .md\:py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
          .md\:px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
          .md\:p-4 { padding: 1rem; }
          .md\:p-6 { padding: 1.5rem; }
          .md\:p-8 { padding: 2rem; }
          .md\:mb-4 { margin-bottom: 1rem; }
          .md\:mb-12 { margin-bottom: 3rem; }
          .md\:gap-3 { gap: 0.75rem; }
          .md\:gap-4 { gap: 1rem; }
          .md\:gap-8 { gap: 2rem; }
          .md\:w-10 { width: 2.5rem; }
          .md\:h-10 { height: 2.5rem; }
        }
        @media (min-width: 1024px) {
          .lg\:w-1\/3 { width: 33.333333%; }
          .lg\:w-2\/3 { width: 66.666667%; }
          .lg\:flex-row { flex-direction: row; }
        }
      `}</style>
        </div>
    );
};

const App = () => {
    const [isDark, setIsDark] = useState(false);
    const [currentAnimation, setCurrentAnimation] = useState<'fade' | 'scale' | 'slide' | 'bounce' | 'smooth'>('smooth');

    // Read language from URL params for SEO-friendly language switching
    const getInitialLang = (): Language => {
        const params = new URLSearchParams(window.location.search);
        const urlLang = params.get('lang');
        if (urlLang === 'vi' || urlLang === 'zh' || urlLang === 'en') {
            return urlLang;
        }
        return 'en';
    };

    const [lang, setLang] = useState<Language>(getInitialLang);

    const t = useMemo(() => translations[lang] as Translations, [lang]);

    // Update SEO meta tags when language changes
    useEffect(() => {
        updateSEOMeta(lang);

        // Update URL without page reload for SEO
        const url = new URL(window.location.href);
        url.searchParams.set('lang', lang);
        window.history.replaceState({}, '', url.toString());
    }, [lang]);

    // Dynamic steps based on language
    const localizedSteps: TourStep[] = useMemo(() => [
        {
            target: '#hero-title',
            title: t.tour.step1.title,
            content: t.tour.step1.content,
            position: 'bottom',
        },
        {
            target: '#hero-cta',
            content: t.tour.step2.content,
            position: 'right',
        },
        {
            target: '#theme-toggle',
            title: t.tour.step3.title,
            content: t.tour.step3.content,
            position: 'bottom',
        },
        {
            target: '#feature-1',
            title: t.tour.step4.title,
            content: t.tour.step4.content,
            position: 'top',
        },
        {
            target: '#code-block',
            title: t.tour.step5.title,
            content: t.tour.step5.content,
            position: 'left',
        },
    ], [t]);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
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
            }}
        >
            <LandingPage
                isDark={isDark}
                setIsDark={setIsDark}
                currentAnimation={currentAnimation}
                setCurrentAnimation={setCurrentAnimation}
                lang={lang}
                setLang={setLang}
                t={t}
            />
        </TourProvider>
    );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
