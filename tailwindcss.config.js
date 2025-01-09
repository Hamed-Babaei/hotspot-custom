tailwind.config = {
  theme: {
    extend: {
      colors: {
        clifford: "#da373d",
      },
      screens: {
        xl: { max: "1279px" },
        lg: { max: "1023px" },
        md: { max: "767px" },
        sm: { max: "639px" },
      },
      fontFamily: {
        Montserrat: ["Montserrat", "sans-serif"],
        Peyda: ["Peyda"],
      },
      backgroundImage: {
        "bg-light": "url(assets/images/bg-desktop.light.jpg)",
        "bg-dark": "url(assets/images/bg-desktop-dark.webp)",
        "bg-light-mobile": "url(assets/images/bg-mobile-l.jpg)",
        "bg-dark-mobile": "url(assets/images/bg-mobile-d.webp)",
      },
      keyframes: {
        fadeDown: {
          "0%": { opacity: "0", transform: "translateY(-100px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInLeft: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        typing: {
          "0%": { width: "0" },
          "100%": { width: "100%" },
        },
        blink: {
          "0%, 50%": { "border-color": "black" },
          "100%": { "border-color": "transparent" },
        },
      },
      animation: {
        fadeDown: "fadeDown 0.5s ease-in-out",
        fadeIn: "fadeIn 0.5s ease-out",
        fadeInDown: "fadeInDown 0.5s ease-out",
        fadeInLeft: "fadeInLeft 0.5s ease-out",
        fadeInRight: "fadeInRight 0.5s ease-out",
        fadeInUp: "fadeInUp 0.5s ease-out",
        fadeOut: "fadeOut 0.5s ease-out",
        typing: "typing 4s steps(30, end) forwards",
        blink:
          "blink 0.6s step-end infinite, typing 4s steps(30, end) forwards",
      },
    },
  },
};
