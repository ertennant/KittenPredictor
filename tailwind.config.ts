import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // accent variants: for buttons, borders, etc. 
        accent: "rgb(var(--accent))",
        'accent-light': "rgb(var(--accent-light))",
        'accent-cyan': "rgb(var(--accent-cyan))",
        'accent-lightest': "rgb(var(--accent-lightest))",
        // custom background colors for single-colour cats 
        gray: "rgb(var(--gray))",
        orange: "rgb(var(--orange))",
        cream: "rgb(var(--cream))",
        chocolate: "rgb(var(--chocolate))",
        cinnamon: "rgb(var(--cinnamon))",
        lilac: "rgb(var(--lilac))",
        fawn: "rgb(var(--fawn))",
        primary: "rgb(var(--primary))",
      },
    },
    backgroundImage: {
      // custom backgrounds for multi-coloured cats 
      'black-w': 'radial-gradient(circle 40px at 5% 5%, rgb(var(--black)) 85%, transparent), radial-gradient(circle 40px at 95% 95%, rgb(var(--black)) 85%, white)',
      'gray-w': 'radial-gradient(circle 40px at 5% 5%, rgb(var(--gray)) 85%, transparent), radial-gradient(circle 40px at 95% 95%, rgb(var(--gray)) 85%, white)',
      'orange-w': 'radial-gradient(circle 40px at 5% 5%, rgb(var(--orange)) 85%, transparent), radial-gradient(circle 40px at 95% 95%, rgb(var(--orange)) 85%, white)',
      'cream-w': 'radial-gradient(circle 40px at 5% 5%, rgb(var(--cream)) 85%, transparent), radial-gradient(circle 40px at 95% 95%, rgb(var(--cream)) 85%, white)',
      'chocolate-w': 'radial-gradient(circle 40px at 5% 5%, rgb(var(--chocolate)) 85%, transparent), radial-gradient(circle 40px at 95% 95%, rgb(var(--chocolate)) 85%, white)',
      'cinnamon-w': 'radial-gradient(circle 40px at 5% 5%, rgb(var(--cinnamon)) 85%, transparent), radial-gradient(circle 40px at 95% 95%, rgb(var(--cinnamon)) 85%, white)',
      'lilac-w': 'radial-gradient(circle 40px at 5% 5%, rgb(var(--lilac)) 85%, transparent), radial-gradient(circle 40px at 95% 95%, rgb(var(--lilac)) 85%, white)',
      'fawn-w': 'linear-gradient(130deg, rgb(var(--orange)) 0%, rgb(var(--fawn)) 15%, rgba(255,255,255,1) 25%, rgba(255,255,255,1) 75%, rgb(var(--fawn)) 85%, rgb(var(--orange)) 100%)',
      'calico': 'radial-gradient(circle 40px at 5% 5%, rgb(var(--black)) 85%, transparent), radial-gradient(circle 40px at 95% 95%, rgb(var(--orange)) 85%, white)',
      'calico-d': 'linear-gradient(130deg, rgb(var(--gray)) 0%, rgb(var(--gray)) 15%, rgba(255,255,255,1) 25%, rgba(255,255,255,1) 75%, rgb(var(--cream)) 85%, rgb(var(--cream)) 100%)',
      'calico-blue': 'radial-gradient(circle 40px at 5% 5%, rgb(var(--gray)) 85%, transparent), radial-gradient(circle 40px at 95% 95%, rgb(var(--cream)) 85%, white)',
      'calico-chocolate': 'radial-gradient(circle 40px at 5% 5%, rgb(var(--chocolate)) 85%, transparent), radial-gradient(circle 40px at 95% 95%, rgb(var(--orange)) 85%, white)',
      'calico-cinnamon': 'radial-gradient(circle 40px at 5% 5%, rgb(var(--cinnamon)) 85%, transparent), radial-gradient(circle 40px at 95% 95%, rgb(var(--orange)) 85%, white)',
      'calico-lilac': 'radial-gradient(circle 40px at 5% 5%, rgb(var(--lilac)) 85%, transparent), radial-gradient(circle 40px at 95% 95%, rgb(var(--cream)) 85%, white)',
      'calico-fawn': 'radial-gradient(circle 40px at 5% 5%, rgb(var(--fawn)) 85%, transparent), radial-gradient(circle 40px at 95% 95%, rgb(var(--cream)) 85%, white)',
      // 'tortie': 'linear-gradient(130deg, transparent 25% 27%, rgb(var(--cream)) 30% 32%, transparent 35% 37%, rgb(var(--cream)) 40% 42%, transparent 45% 47%, rgb(var(--cream)) 50% 52%, transparent 55%), radial-gradient(circle 40px at 5% 5%, black 85%, transparent), radial-gradient(circle 40px at 95% 95%, black 85%, rgb(var(--orange)))',
      'tortie': 'radial-gradient(circle 40px at 5% 5%, black 85%, transparent), radial-gradient(circle 40px at 95% 95%, black 85%, rgb(var(--orange)))',
      'tortie-chocolate': 'radial-gradient(circle 40px at 5% 5%, rgb(var(--chocolate)) 85%, transparent), radial-gradient(circle 40px at 95% 95%, rgb(var(--chocolate)) 85%, rgb(var(--orange)))',
      'tortie-cinnamon': 'radial-gradient(circle 40px at 5% 5%, rgb(var(--cinnamon)) 85%, transparent), radial-gradient(circle 40px at 95% 95%, rgb(var(--cinnamon)) 85%, rgb(var(--orange)))',
      'tortie-blue': 'radial-gradient(circle 40px at 5% 5%, rgb(var(--gray)) 85%, transparent), radial-gradient(circle 40px at 95% 95%, rgb(var(--gray)) 85%, rgb(var(--cream)))',
      'tortie-lilac': 'radial-gradient(circle 40px at 5% 5%, rgb(var(--lilac)) 85%, transparent), radial-gradient(circle 40px at 95% 95%, rgb(var(--lilac)) 85%, rgb(var(--cream)))',
      'tortie-fawn': 'radial-gradient(circle 40px at 5% 5%, rgb(var(--fawn)) 85%, transparent), radial-gradient(circle 40px at 95% 95%, rgb(var(--fawn)) 85%, rgb(var(--cream)))',
      // 'tortie-d': 'linear-gradient(130deg, rgb(var(--gray)) 0%, rgb(var(--gray)) 15%, rgb(var(--cream)) 25%, rgb(var(--cream)) 75%, rgb(var(--gray)) 85%, rgb(var(--gray)) 100%)',
      // 'tortie-w': 'linear-gradient(130deg, rgba(0,0,0,1) 0%, rgb(var(--orange)) 15%, rgba(255,255,255,1) 25%, rgba(255,255,255,1) 75%, rgb(var(--orange)) 85%, rgba(0,0,0,1) 100%)',
      // 'tortie-dw': 'linear-gradient(130deg, rgb(var(--gray)) 0%, rgb(var(--cream)) 15%, rgba(255,255,255,1) 25%, rgba(255,255,255,1) 75%, rgb(var(--cream)) 85%, rgb(var(--gray)) 100%)',
    },
    boxShadow: {
      'glow-sm': '0 0 20px 15px rgba(255, 255, 255, 0.5)', // gives a moderate glow effect around an object, suitable for button hover, etc. 
    },
  },
  plugins: [],
} satisfies Config;
