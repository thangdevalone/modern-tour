export type Language = 'en' | 'vi' | 'zh';

export const translations = {
    en: {
        // SEO Metadata
        seo: {
            title: 'Modern Tour - Beautiful Product Tours for React',
            description: 'Create stunning, physics-based product tours with Framer Motion. Headless, themeable, and fully customizable. Perfect for onboarding and feature discovery.',
            keywords: 'react, product tour, onboarding, framer motion, animation, tooltip, walkthrough, user guide, headless ui, react tour, user onboarding, product walkthrough',
            ogTitle: 'Modern Tour - Beautiful Product Tours for React',
            ogDescription: 'Create stunning, physics-based product tours with Framer Motion. Headless, themeable, and fully customizable.',
            twitterTitle: 'Modern Tour - Beautiful Product Tours for React',
            twitterDescription: 'Create stunning, physics-based product tours with Framer Motion. Headless, themeable, and fully customizable.',
        },
        // Header
        nav: {
            animations: 'Animations',
            docs: 'Docs',
            github: 'GitHub',
        },
        // Hero
        hero: {
            badge: 'Open Source & Free',
            title1: 'Interactive',
            title2: 'User Onboarding',
            description: 'Build engaging product tours with physics-based animations. Fully customizable, headless-ready, and brutally simple to use.',
            cta: 'Launch Demo',
            install: 'npm i modern-tour',
        },
        // Features
        features: {
            title: 'Core Features',
            physics: {
                title: 'Physics Engine',
                desc: 'Framer Motion powers 60fps spring animations. Feels native, not web.',
            },
            themeable: {
                title: 'Fully Themeable',
                desc: 'CSS variables for colors, shadows, borders. Supports any design system.',
            },
            headless: {
                title: 'Headless Mode',
                desc: 'Use `useTour()` hook to build 100% custom UI. Zero constraints.',
            },
        },
        // Animation Section
        animations: {
            title: 'Animation Presets',
            subtitle: '5 built-in animation styles. Pick one or create your own.',
            current: 'Current Animation',
            fade: 'Simple opacity transition. Subtle and professional.',
            scale: 'Zoom in/out effect. Great for emphasis.',
            slide: 'Vertical slide with fade. Smooth and elegant.',
            bounce: 'Spring-based bounce. Playful and energetic.',
            smooth: 'Combined scale + slide. Our default preset.',
            tryBtn: 'Try',
            animation: 'Animation',
        },
        // Config Section
        config: {
            title: 'Configuration',
            subtitle: 'Customize every aspect of the tour behavior and appearance.',
            basic: 'Basic Setup',
            labels: 'Custom Labels',
            customAnim: 'Custom Animation',
            theming: 'Theming',
        },
        // Docs Section
        docs: {
            title: 'Quick Start',
            subtitle: 'Get up and running in 3 steps.',
            step1: 'Install Package',
            step2: 'Wrap Provider',
            step3: 'Start Tour',
            advanced: 'Advanced Options',
            advancedList: [
                'Custom positioning (12 positions)',
                'Keyboard navigation',
                'Auto-scroll to elements',
                'Spotlight padding control',
                'Step callbacks (onActive, onLeave)',
            ],
            headless: 'Headless Usage',
            headlessDesc: 'Build completely custom UI using the `useTour()` hook. Access state, actions, and current step data.',
        },
        // Footer
        footer: {
            docs: 'Documentation',
        },
        // Tour Steps
        tour: {
            step1: {
                title: 'MODERN TOUR',
                content: 'A lightweight, customizable tour library built for modern React apps.',
            },
            step2: {
                content: 'Click buttons like this to trigger tours. Guide users through your app step-by-step.',
            },
            step3: {
                title: 'THEME SUPPORT',
                content: 'Toggle dark/light mode. The tour automatically adapts to your theme!',
            },
            step4: {
                title: 'PHYSICS-BASED',
                content: 'All animations use spring physics for natural, smooth motion.',
            },
            step5: {
                title: 'SIMPLE API',
                content: 'Just a few lines of code. TypeScript support included.',
            },
            labels: {
                next: 'Next',
                prev: 'Back',
                finish: 'Done',
                skip: 'Skip',
            },
        },
    },
    vi: {
        // SEO Metadata
        seo: {
            title: 'Modern Tour - Thư viện hướng dẫn sản phẩm cho React',
            description: 'Tạo tour hướng dẫn tuyệt đẹp với hiệu ứng vật lý từ Framer Motion. Headless, tùy chỉnh theme, và hoàn toàn linh hoạt. Hoàn hảo cho onboarding và khám phá tính năng.',
            keywords: 'react, product tour, onboarding, framer motion, animation, hướng dẫn người dùng, tour sản phẩm, react tour, user onboarding',
            ogTitle: 'Modern Tour - Thư viện hướng dẫn sản phẩm cho React',
            ogDescription: 'Tạo tour hướng dẫn tuyệt đẹp với hiệu ứng vật lý từ Framer Motion. Headless, tùy chỉnh theme, và hoàn toàn linh hoạt.',
            twitterTitle: 'Modern Tour - Thư viện hướng dẫn sản phẩm cho React',
            twitterDescription: 'Tạo tour hướng dẫn tuyệt đẹp với hiệu ứng vật lý từ Framer Motion. Headless, tùy chỉnh theme, và hoàn toàn linh hoạt.',
        },
        // Header
        nav: {
            animations: 'Hiệu ứng',
            docs: 'Tài liệu',
            github: 'GitHub',
        },
        // Hero
        hero: {
            badge: 'Mã nguồn mở & Miễn phí',
            title1: 'Hướng dẫn',
            title2: 'Người dùng tương tác',
            description: 'Xây dựng tour hướng dẫn với hiệu ứng vật lý. Tùy chỉnh hoàn toàn, hỗ trợ headless, và cực kỳ dễ sử dụng.',
            cta: 'Xem Demo',
            install: 'npm i modern-tour',
        },
        // Features
        features: {
            title: 'Tính năng chính',
            physics: {
                title: 'Động cơ Vật lý',
                desc: 'Framer Motion với animation 60fps. Mượt mà như native.',
            },
            themeable: {
                title: 'Tùy chỉnh Theme',
                desc: 'CSS variables cho màu sắc, bóng, viền. Hỗ trợ mọi design system.',
            },
            headless: {
                title: 'Chế độ Headless',
                desc: 'Dùng hook `useTour()` để xây UI tùy chỉnh 100%. Không giới hạn.',
            },
        },
        // Animation Section
        animations: {
            title: 'Các kiểu Animation',
            subtitle: '5 kiểu animation có sẵn. Chọn một hoặc tự tạo.',
            current: 'Animation hiện tại',
            fade: 'Chuyển đổi opacity đơn giản. Tinh tế và chuyên nghiệp.',
            scale: 'Hiệu ứng phóng to/thu nhỏ. Tuyệt vời để nhấn mạnh.',
            slide: 'Trượt dọc với fade. Mượt mà và thanh lịch.',
            bounce: 'Nảy dựa trên spring. Vui nhộn và năng động.',
            smooth: 'Kết hợp scale + slide. Kiểu mặc định.',
            tryBtn: 'Thử',
            animation: '',
        },
        // Config Section
        config: {
            title: 'Cấu hình',
            subtitle: 'Tùy chỉnh mọi khía cạnh của tour.',
            basic: 'Cài đặt cơ bản',
            labels: 'Nhãn tùy chỉnh',
            customAnim: 'Animation tùy chỉnh',
            theming: 'Giao diện',
        },
        // Docs Section
        docs: {
            title: 'Bắt đầu nhanh',
            subtitle: 'Chạy trong 3 bước.',
            step1: 'Cài đặt Package',
            step2: 'Bọc Provider',
            step3: 'Bắt đầu Tour',
            advanced: 'Tùy chọn nâng cao',
            advancedList: [
                'Vị trí tùy chỉnh (12 vị trí)',
                'Điều hướng bàn phím',
                'Tự động cuộn đến phần tử',
                'Điều chỉnh spotlight',
                'Callback bước (onActive, onLeave)',
            ],
            headless: 'Sử dụng Headless',
            headlessDesc: 'Tạo UI hoàn toàn tùy chỉnh với hook `useTour()`. Truy cập state, actions, và dữ liệu bước.',
        },
        // Footer
        footer: {
            docs: 'Tài liệu',
        },
        // Tour Steps
        tour: {
            step1: {
                title: 'MODERN TOUR',
                content: 'Thư viện tour nhẹ, tùy chỉnh được, dành cho React hiện đại.',
            },
            step2: {
                content: 'Nhấn các nút như này để kích hoạt tour. Hướng dẫn người dùng từng bước.',
            },
            step3: {
                title: 'HỖ TRỢ THEME',
                content: 'Chuyển đổi chế độ tối/sáng. Tour tự động thích ứng với theme của bạn!',
            },
            step4: {
                title: 'VẬT LÝ HỌC',
                content: 'Tất cả animation sử dụng vật lý spring cho chuyển động tự nhiên, mượt mà.',
            },
            step5: {
                title: 'API ĐƠN GIẢN',
                content: 'Chỉ vài dòng code. Hỗ trợ TypeScript.',
            },
            labels: {
                next: 'Tiếp',
                prev: 'Quay lại',
                finish: 'Xong',
                skip: 'Bỏ qua',
            },
        },
    },
    zh: {
        // SEO Metadata
        seo: {
            title: 'Modern Tour - React 精美产品导览库',
            description: '使用 Framer Motion 的物理动画创建令人惊艳的产品导览。无头模式、可主题化、完全可定制。非常适合用户引导和功能发现。',
            keywords: 'react, product tour, onboarding, framer motion, animation, 产品导览, 用户引导, react tour, 用户上手',
            ogTitle: 'Modern Tour - React 精美产品导览库',
            ogDescription: '使用 Framer Motion 的物理动画创建令人惊艳的产品导览。无头模式、可主题化、完全可定制。',
            twitterTitle: 'Modern Tour - React 精美产品导览库',
            twitterDescription: '使用 Framer Motion 的物理动画创建令人惊艳的产品导览。无头模式、可主题化、完全可定制。',
        },
        // Header
        nav: {
            animations: '动画',
            docs: '文档',
            github: 'GitHub',
        },
        // Hero
        hero: {
            badge: '开源 & 免费',
            title1: '交互式',
            title2: '用户引导',
            description: '使用基于物理的动画构建引人入胜的产品导览。完全可定制、支持无头模式，使用极其简单。',
            cta: '启动演示',
            install: 'npm i modern-tour',
        },
        // Features
        features: {
            title: '核心功能',
            physics: {
                title: '物理引擎',
                desc: 'Framer Motion 提供 60fps 弹簧动画。感觉原生，不像网页。',
            },
            themeable: {
                title: '完全可主题化',
                desc: '使用 CSS 变量控制颜色、阴影、边框。支持任何设计系统。',
            },
            headless: {
                title: '无头模式',
                desc: '使用 `useTour()` 钩子构建 100% 自定义 UI。零约束。',
            },
        },
        // Animation Section
        animations: {
            title: '动画预设',
            subtitle: '5 种内置动画风格。选择一种或创建自己的。',
            current: '当前动画',
            fade: '简单的透明度过渡。微妙而专业。',
            scale: '缩放效果。非常适合强调。',
            slide: '垂直滑动加淡入淡出。流畅而优雅。',
            bounce: '基于弹簧的弹跳。活泼而充满活力。',
            smooth: '缩放 + 滑动组合。我们的默认预设。',
            tryBtn: '试试',
            animation: '动画',
        },
        // Config Section
        config: {
            title: '配置',
            subtitle: '自定义导览行为和外观的各个方面。',
            basic: '基本设置',
            labels: '自定义标签',
            customAnim: '自定义动画',
            theming: '主题',
        },
        // Docs Section
        docs: {
            title: '快速开始',
            subtitle: '3 步即可运行。',
            step1: '安装包',
            step2: '包裹 Provider',
            step3: '启动导览',
            advanced: '高级选项',
            advancedList: [
                '自定义定位（12 个位置）',
                '键盘导航',
                '自动滚动到元素',
                '聚光灯填充控制',
                '步骤回调（onActive, onLeave）',
            ],
            headless: '无头用法',
            headlessDesc: '使用 `useTour()` 钩子构建完全自定义的 UI。访问状态、操作和当前步骤数据。',
        },
        // Footer
        footer: {
            docs: '文档',
        },
        // Tour Steps
        tour: {
            step1: {
                title: 'MODERN TOUR',
                content: '一个轻量级、可定制的导览库，专为现代 React 应用构建。',
            },
            step2: {
                content: '点击这样的按钮来触发导览。一步一步引导用户使用您的应用。',
            },
            step3: {
                title: '主题支持',
                content: '切换深色/浅色模式。导览会自动适应您的主题！',
            },
            step4: {
                title: '基于物理',
                content: '所有动画都使用弹簧物理，实现自然、流畅的运动。',
            },
            step5: {
                title: '简单 API',
                content: '只需几行代码。包含 TypeScript 支持。',
            },
            labels: {
                next: '下一步',
                prev: '上一步',
                finish: '完成',
                skip: '跳过',
            },
        },
    },
} as const;

// Use a more flexible type that works with all languages
export interface SeoTranslations {
    title: string;
    description: string;
    keywords: string;
    ogTitle: string;
    ogDescription: string;
    twitterTitle: string;
    twitterDescription: string;
}

export interface Translations {
    seo: SeoTranslations;
    nav: { animations: string; docs: string; github: string };
    hero: { badge: string; title1: string; title2: string; description: string; cta: string; install: string };
    features: {
        title: string;
        physics: { title: string; desc: string };
        themeable: { title: string; desc: string };
        headless: { title: string; desc: string };
    };
    animations: {
        title: string;
        subtitle: string;
        current: string;
        fade: string;
        scale: string;
        slide: string;
        bounce: string;
        smooth: string;
        tryBtn: string;
        animation: string;
    };
    config: { title: string; subtitle: string; basic: string; labels: string; customAnim: string; theming: string };
    docs: {
        title: string;
        subtitle: string;
        step1: string;
        step2: string;
        step3: string;
        advanced: string;
        advancedList: readonly string[];
        headless: string;
        headlessDesc: string;
    };
    footer: { docs: string };
    tour: {
        step1: { title: string; content: string };
        step2: { content: string };
        step3: { title: string; content: string };
        step4: { title: string; content: string };
        step5: { title: string; content: string };
        labels: { next: string; prev: string; finish: string; skip: string };
    };
}

export function useTranslation(lang: Language): Translations {
    return translations[lang] as Translations;
}

// Locale mapping for Open Graph
const localeMap: Record<Language, string> = {
    en: 'en_US',
    vi: 'vi_VN',
    zh: 'zh_CN',
};

// Helper function to update SEO meta tags dynamically when language changes
export function updateSEOMeta(lang: Language): void {
    const t = translations[lang];
    const seo = t.seo;

    // Update document title
    document.title = seo.title;

    // Update basic meta tags
    const updateMeta = (selector: string, content: string) => {
        const el = document.querySelector(selector) as HTMLMetaElement | null;
        if (el) el.content = content;
    };

    const updateLink = (selector: string, href: string) => {
        const el = document.querySelector(selector) as HTMLLinkElement | null;
        if (el) el.href = href;
    };

    // Update html lang attribute
    document.documentElement.lang = lang;

    // Basic meta tags
    updateMeta('meta[name="title"]', seo.title);
    updateMeta('meta[name="description"]', seo.description);
    updateMeta('meta[name="keywords"]', seo.keywords);

    // Open Graph
    updateMeta('meta[property="og:title"]', seo.ogTitle);
    updateMeta('meta[property="og:description"]', seo.ogDescription);
    updateMeta('meta[property="og:locale"]', localeMap[lang]);
    updateMeta('meta[property="og:url"]', `https://modern-tour.dev/?lang=${lang}`);

    // Twitter
    updateMeta('meta[name="twitter:title"]', seo.twitterTitle);
    updateMeta('meta[name="twitter:description"]', seo.twitterDescription);
    updateMeta('meta[name="twitter:url"]', `https://modern-tour.dev/?lang=${lang}`);

    // Update canonical URL based on language
    updateLink('link[rel="canonical"]', `https://modern-tour.dev/?lang=${lang}`);
}

