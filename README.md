# Front-end Airbnb (React Native)

## Table of Contents

- About The Project
- Built With
- Getting Started
- Usage
- Roadmap
- Disclaimer
- Contact

---

## About The Project

This project is a mobile application inspired by Airbnb, developed with React Native as part of Le Reacteur bootcamp.

It allows users to browse listings, view details and manage authentication within a mobile environment connected to an external API.

Main features:

- Display of listings
- Listing details screen
- User authentication (signup / login)
- Token management with AsyncStorage and Context
- Protected navigation (authenticated vs non-authenticated users)
- Dynamic data fetching from an API
- Navigation with Expo Router
- Logout functionality with token removal
- Reusable UI components (Input, Button, ErrorMessage, etc.)

This project helped me understand how to build a mobile application with React Native, manage authentication state and structure navigation in a real app context.

---

## Built With

- React Native
- Expo
- Expo Router
- Axios
- AsyncStorage
- React Context API
- CSS / React Native styling

---

## Getting Started

### Prerequisites

Make sure you have Node.js and Expo CLI installed.

---

### Installation

Clone the repository:

```bash
git clone https://github.com/Eva-caruana/airbnb-frontend
cd airbnb-frontend
```

Install dependencies:

```bash
yarn install
```

Start the development server:

```bash
yarn start
```

Then scan the QR code with Expo Go or run on a simulator.

### Usage

## Screens

- Home → display all listings
- Room → display details of a specific listing
- Login / Signup → user authentication
  <!-- - Around Me → display listings based on user location -->
  <!-- - Profile → display user information -->

## Features

- Authentication with token storage (AsyncStorage + Context)
- Conditional navigation based on authentication state
- Fetch and display data from API
- List rendering with FlatList
- Navigation with parameters (listing id)
- Loading states with ActivityIndicator

## Roadmap

- Add map integration (display listings on a map)
- Geolocation to fetch nearby listings
- Improve error handling
- Improve UI/UX and styling
- Make the app fully responsive across devices
- Optimize performance and data fetching
- Add favorites feature

## Disclaimer

Disclaimer

This project is an educational replica inspired by Airbnb.
It is not affiliated with Airbnb and has no commercial purpose.

Contact

Eva Caruana
GitHub: https://github.com/Eva-caruana

Project: https://github.com/Eva-caruana/airbnb-project-react-native.git
