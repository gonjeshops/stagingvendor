# Gonje Frontend app

## Introduction

Gonje is a Multi-vendor E-commerce application that specializes in the delivery of African/Continental groceries.

## Getting Started
- React Next JS Frontend API

### Prerequisites
-   Node JS
-   React 16.8++
-   Next JS


### Resources you might need
- Axios
- Sockets
- Laravel Mix
- React Bootstrap
- Tailwind CSS

### Packages we have used
- package.json
```json
"scripts": {
        "dev": "npm run development",
        "development": "cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --progress --config=node_modules/laravel-mix/setup/webpack.config.js",
        "watch": "npm run development -- --watch",
        "watch-poll": "npm run watch -- --watch-poll",
        "hot": "cross-env NODE_ENV=development node_modules/webpack-dev-server/bin/webpack-dev-server.js --inline --hot --disable-host-check --config=node_modules/laravel-mix/setup/webpack.config.js",
        "prod": "npm run production",
        "production": "cross-env NODE_ENV=production node_modules/webpack/bin/webpack.js --no-progress --config=node_modules/laravel-mix/setup/webpack.config.js"
    },
    "devDependencies": {
        "axios": "^0.19",
        "cross-env": "^7.0",
        "laravel-mix": "^5.0.1",
        "lodash": "^4.17.19",
        "resolve-url-loader": "^3.1.0"
    }
```
- Customer
```json
"@growthday/react-stripe-js": "^1.6.3",
    "@hookform/resolvers": "^2.8.3",
    "@paypal/react-paypal-js": "^7.6.0",
    "@react-google-maps/api": "^2.11.8",
    "@stripe/react-stripe-js": "^1.7.0",
    "@stripe/stripe-js": "^1.22.0",
    "axios": "^0.24.0",
    "bootstrap": "^5.1.3",
    "bootstrap3": "^3.3.5",
    "country-dropdown-with-flags-for-react": "^1.0.0",
    "formik": "^2.2.9",
    "moment": "^2.29.1",
    "moment-duration-format": "^2.3.2",
    "next": "^12.0.7",
    "radium": "^0.26.1",
    "react": "17.0.2",
    "react-calendar": "^3.7.0",
    "react-countdown": "^2.3.2",
    "react-countdown-circle-timer": "^2.5.4",
    "react-country-flag": "^3.0.2",
    "react-device-detect": "^2.1.2",
    "react-dom": "17.0.2",
    "react-epic-spinners": "^0.5.0",
    "react-facebook-login": "^4.1.1",
    "react-fast-marquee": "^1.2.1",
    "react-google-autocomplete": "^2.6.1",
    "react-google-autocomplete-address-fields": "^1.0.5",
    "react-google-login": "^5.2.2",
    "react-google-places-autocomplete": "^3.3.2",
    "react-hook-form": "^7.19.5",
    "react-idle-timer": "^4.6.4",
    "react-infinite-scroll-component": "^6.1.0",
    "react-mailchimp-form": "^1.0.2",
    "react-mailchimp-subscribe": "^2.1.3",
    "react-multi-carousel": "^2.6.5",
    "react-native-svg": "^9.12.0",
    "react-phone-number-input": "^3.1.44",
    "react-places-autocomplete": "^7.3.0",
    "react-redux": "^7.2.6",
    "react-responsive-modal": "^6.1.0",
    "react-router-dom": "^6.0.2",
    "react-simple-image-slider": "^2.3.0",
    "react-tilty": "^2.0.3",
    "react-timer-hook": "^3.0.5",
    "react-toast": "^1.0.3",
    "react-toast-notifications": "^2.5.1",
    "react-toastify": "^8.1.0",
    "react-wow": "^1.0.0",
    "react-yup": "^1.23.0",
    "redux": "^4.1.2",
    "redux-persist": "^6.0.0",
    "redux-thunk": "^2.4.1",
    "socket.io-client": "^4.4.1",
    "timeago-react": "^3.0.4",
    "use-mobile-detect-hook": "^1.0.4",
    "validator": "^13.7.0",
    "wowjs": "^1.1.3",
    "yup": "^0.32.11"
    
    "eslint": "7.32.0",
    "eslint-config-next": "12.0.3",
    "redux-devtools-extension": "^2.13.9"
```
- Vendor
```json
"@pdftron/webviewer": "^8.2.0",
    "@stripe/react-stripe-js": "^1.7.0",
    "@stripe/stripe-js": "^1.22.0",
    "axios": "^0.24.0",
    "babel-loader": "^8.2.3",
    "chart.js": "^3.7.1",
    "formik": "^2.2.9",
    "moment": "^2.29.1",
    "next": "12.0.7",
    "next-redux-wrapper": "^7.0.5",
    "pspdfkit": "^2021.6.2",
    "rc-time-picker": "^3.7.3",
    "react": "17.0.2",
    "react-countdown": "^2.3.2",
    "react-datepicker": "^4.6.0",
    "react-dom": "17.0.2",
    "react-dropzone": "^11.5.1",
    "react-google-maps": "^9.4.5",
    "react-js-pagination": "^3.0.3",
    "react-pdf": "^5.6.0",
    "react-phone-number-input": "^3.1.44",
    "react-redux": "^7.2.6",
    "react-responsive-modal": "^6.2.0",
    "react-select": "^5.2.2",
    "react-toastify": "^8.1.0",
    "recharts": "^2.1.9",
    "redux": "^4.1.2",
    "redux-devtools-extension": "^2.13.9",
    "redux-logger": "^3.0.6",
    "redux-thunk": "^2.4.1",
    "signature_pad": "^4.0.2"
    
    "eslint": "8.6.0",
    "eslint-config-next": "12.0.7",
    "html-loader": "^3.0.1"
```
Super Admin
```json
 "@fontsource/open-sans": "^4.5.0",
    "@headlessui/react": "^1.3.0",
    "@hookform/resolvers": "^2.6.1",
    "@reach/portal": "^0.15.3",
    "@react-google-maps/api": "^2.2.0",
    "@react-pdf/renderer": "^2.0.16",
    "apexcharts": "^3.27.2",
    "axios": "^0.21.1",
    "body-scroll-lock": "^3.1.5",
    "camelcase-keys": "^7.0.0",
    "classnames": "^2.3.1",
    "cookie": "^0.4.1",
    "dayjs": "^1.10.6",
    "framer-motion": "4.1.17",
    "js-cookie": "^2.2.1",
    "lodash": "^4.17.21",
    "next": "11.0.1",
    "next-pwa": "^5.2.23",
    "next-seo": "^4.26.0",
    "overlayscrollbars": "^1.13.1",
    "overlayscrollbars-react": "^0.2.3",
    "rc-pagination": "^3.1.7",
    "rc-progress": "^3.1.3",
    "rc-table": "^7.17.0",
    "rc-time-picker": "^3.7.3",
    "react": "17.0.2",
    "react-apexcharts": "^1.3.9",
    "react-datepicker": "^4.1.1",
    "react-dom": "17.0.2",
    "react-dropzone": "^11.3.4",
    "react-hook-form": "^7.11.0",
    "react-laag": "^2.0.3",
    "react-query": "^3.18.1",
    "react-scroll": "^1.8.2",
    "react-select": "^4.3.0",
    "react-toastify": "^7.0.4",
    "yup": "^0.32.9"
    
    "@types/body-scroll-lock": "^2.6.2",
    "@types/js-cookie": "^2.2.7",
    "@types/lodash": "^4.14.171",
    "@types/node": "^16.3.2",
    "@types/overlayscrollbars": "^1.12.1",
    "@types/react": "^17.0.14",
    "@types/react-datepicker": "^4.1.3",
    "@types/react-select": "^4.0.17",
    "autoprefixer": "^10.3.1",
    "next-i18next": "^8.5.5",
    "postcss": "^8.3.5",
    "tailwindcss": "^2.2.4",
    "tailwindcss-rtl": "^0.7.3",
    "typescript": "^4.3.5"
```





