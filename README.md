# Project Atelier by Aerio

## Overview:
This project updated an outdated client-facing retail web-portal in order to improve the user experience and boost sales.

## Table of Contents:
- [Description](#Description)
- [Usage](#Usage)
- [Installation](#Installation)
- [Tech Stack](#Tech-Stack)
- [Contributors](#Contributors)
- [License](#License)

## Description:
This release of the client-facing retail web-portal focused on providing the minimum viable product in which users can view product information, discover related products, compare details between products, save items to and remove items from their outfit, view and post questions and answers with pictures, view and post ratings and reviews with pictures, and add items to their cart.

**Top features of this product include:**

A responsive image gallery which allows the user to examine their product of choice
![](http://g.recordit.co/hMANQptxXH.gif)

An add to cart section where users can select from sizes currently in stock, then add items to their cart
![](http://g.recordit.co/bIs2UdEaGc.gif)

A related products list where users can see products similar to the current one
![](http://g.recordit.co/crwaGQVIBd.gif)

A comparison modal where users can compare the current product and a product in the related products list
![](http://g.recordit.co/twuqdl3rOz.gif)

An "add to outfit" feature allowing users to save and remove different products
![](http://g.recordit.co/mXis2xRrlM.gif)

A dynamic question and answer space for users to receive and provide personalized information on a given product
> Q&A GIF TO GO HERE

An informative ratings and reviews section providing the user with key metrics regarding the selected product
> REVIEWS GIF TO GO HERE

Options for light and dark mode
![](http://g.recordit.co/nvCQQMrXXJ.gif)

## Usage:
This project would fit within existing system architecture as a product landing page, and a tool for users to discover additional products which may interest them.

## Installation:
1. Ensure you have the following project dependency:
- Node.js
2. Fork and/or clone the project
3. Install the additional dependencies requied to run the project:
`npm install`
4. Create a .env file and add your Atelier API key
`vim .env`
`"FEC_API_KEY="[your_key_here]""`
5. Initialize Webpack build with Bundle using the following script:
`npm run build`
6. Launch your local server using the following script:
`npm run start`

## Tech Stack:
![ReactJS](https://img.shields.io/badge/React-808080?style=for-the-badge&logo=react&logoColor=61DAFB)
![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=323330)
![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Nodemon](https://img.shields.io/badge/NODEMON-808080.svg?style=for-the-badge&logo=nodemon&logoColor=008000)
![Express](https://img.shields.io/badge/Express.js-808080?style=for-the-badge&logo=express&logoColor=00ff00)
![Jquery](https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=fff&style=for-the-badge)
![Babel](https://img.shields.io/badge/Babel-F9DC3e?style=for-the-badge&logo=babel&logoColor=black)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
![Jest](https://img.shields.io/badge/Jest-808080?style=for-the-badge&logo=Jest&logoColor=ffa500)
![React Testing Library](https://img.shields.io/badge/testing%20library-808080?style=for-the-badge&logo=testing-library&logoColor=#E33332)

## Contributors:
- [Sarah Kay](https://github.com/ThePebbles) - Related Products
- [George Liu](https://github.com/georgeliu8110) - Questions & Answers
- [Rachel Quirbach](https://github.com/rquirbach) - Product Overview
- [Christian Wilsea](https://github.com/cwillsea) - Ratings & Reviews

## License:
None
