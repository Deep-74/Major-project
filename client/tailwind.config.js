 /** @type {import('tailwindcss').Config} */
 export default {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors:{
        primary:'#405138'                // set the primary color for the tailwind css, same as the primary color of ant design
      }
    },
  },
  plugins: [],
  corePlugins:{preflight:false,            // need add the plugins so that there is not overlapping of the styling  betwenn  antd and tailwindcss
  },
}