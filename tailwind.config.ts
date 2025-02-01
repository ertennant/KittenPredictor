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
      },
    },
    backgroundImage: {
      // custom backgrounds for multi-coloured cats 
      'black-w': 'linear-gradient(130deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 15%, rgba(255,255,255,1) 25%, rgba(255,255,255,1) 75%, rgba(0,0,0,1) 85%, rgba(0,0,0,1) 100%)',
      'gray-w': 'linear-gradient(130deg, rgb(var(--gray)) 0%, rgb(var(--gray)) 15%, rgba(255,255,255,1) 25%, rgba(255,255,255,1) 75%, rgb(var(--gray)) 85%, rgb(var(--gray)) 100%)',
      'orange-w': 'linear-gradient(130deg, rgb(var(--orange)) 0%, rgb(var(--orange)) 15%, rgba(255,255,255,1) 25%, rgba(255,255,255,1) 75%, rgb(var(--orange)) 85%, rgb(var(--orange)) 100%)',
      'cream-w': 'linear-gradient(130deg, rgb(var(--cream)) 0%, rgb(var(--cream)) 15%, rgba(255,255,255,1) 25%, rgba(255,255,255,1) 75%, rgb(var(--cream)) 85%, rgb(var(--cream)) 100%)',
      'chocolate-w': 'linear-gradient(130deg, rgb(var(--chocolate)) 0%, rgb(var(--chocolate)) 15%, rgba(255,255,255,1) 25%, rgba(255,255,255,1) 75%, rgb(var(--chocolate)) 85%, rgb(var(--chocolate)) 100%)',
      'cinnamon-w': 'linear-gradient(130deg, rgb(var(--cinnamon)) 0%, rgb(var(--cinnamon)) 15%, rgba(255,255,255,1) 25%, rgba(255,255,255,1) 75%, rgb(var(--cinnamon)) 85%, rgb(var(--cinnamon)) 100%)',
      'lilac-w': 'linear-gradient(130deg, rgb(var(--lilac)) 0%, rgb(var(--lilac)) 15%, rgba(255,255,255,1) 25%, rgba(255,255,255,1) 75%, rgb(var(--lilac)) 85%, rgb(var(--lilac)) 100%)',
      'fawn-w': 'linear-gradient(130deg, rgb(var(--fawn)) 0%, rgb(var(--fawn)) 15%, rgba(255,255,255,1) 25%, rgba(255,255,255,1) 75%, rgb(var(--fawn)) 85%, rgb(var(--fawn)) 100%)',
      'calico': 'linear-gradient(130deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 15%, rgba(255,255,255,1) 25%, rgba(255,255,255,1) 75%, rgb(var(--orange)) 85%, rgb(var(--orange)) 100%)',
      'calico-d': 'linear-gradient(130deg, rgb(var(--gray)) 0%, rgb(var(--gray)) 15%, rgba(255,255,255,1) 25%, rgba(255,255,255,1) 75%, rgb(var(--cream)) 85%, rgb(var(--cream)) 100%)',
      'tortie': 'linear-gradient(130deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 15%, rgb(var(--orange)) 25%, rgb(var(--orange)) 75%, rgba(0,0,0,1) 85%, rgba(0,0,0,1) 100%)',
      'tortie-d': 'linear-gradient(130deg, rgb(var(--gray)) 0%, rgb(var(--gray)) 15%, rgb(var(--cream)) 25%, rgb(var(--cream)) 75%, rgb(var(--gray)) 85%, rgb(var(--gray)) 100%)',
      'tortie-w': 'linear-gradient(130deg, rgba(0,0,0,1) 0%, rgb(var(--orange)) 15%, rgba(255,255,255,1) 25%, rgba(255,255,255,1) 75%, rgb(var(--orange)) 85%, rgba(0,0,0,1) 100%)',
      'tortie-dw': 'linear-gradient(130deg, rgb(var(--gray)) 0%, rgb(var(--cream)) 15%, rgba(255,255,255,1) 25%, rgba(255,255,255,1) 75%, rgb(var(--cream)) 85%, rgb(var(--gray)) 100%)',
    },
    boxShadow: {
      'glow-sm': '0 0 20px 15px rgba(255, 255, 255, 0.5)', // gives a moderate glow effect around an object, suitable for button hover, etc. 
    },
  },
  plugins: [],
} satisfies Config;
