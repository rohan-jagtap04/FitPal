/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: false,
  content: [
   "./projects/authentication/sign-in/sign-in.component.html",
   "./projects/authentication/dashboard/dashboard.component.html",
   "./projects/authentication/sign-up/sign-up.component.html",
   "./projects/user-profile/user-profile.component.html"
  ],
  theme: {
    extend: {

    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('daisyui')
  ],


}
