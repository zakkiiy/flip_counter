import type { Config } from 'tailwindcss'

const config: Config = {
  prefix: '', 
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components//*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        "swing-top-right-fwd": "swing-top-right-fwd 1.0s cubic-bezier(0.455, 0.030, 0.515, 0.955) 1s   both"
      },
      keyframes: {
        "swing-top-right-fwd": {
            "0%": {
                transform: "rotate3d(1, 1, 0, 0deg)",
                "transform-origin": "100% 0%"
            },
            to: {
                transform: "rotate3d(1, 1, 0, 180deg)",
                "transform-origin": "100% 0%"
            }
        }
      },
    },
  },
  plugins: [],
}
export default config