# Ionic Vue & Capacitor Project

This is a sample project created using Ionic Vue & Capacitor, a framework for building hybrid mobile applications using Vue.js. The project demonstrates how to create a basic mobile application with navigation, routing and API integration.


## Table of Contents

- [Getting Started](#gettingstarted)
- [Installation](#installation)
- [Running the app](#runningtheapp)
- [Testing the app](#testingtheapp)
- [Building the app](#buildingtheapp)
- [Built with](#builtwith)
- [Contributing](#contributing)


## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Installation

### Prerequisites

Before starting, make sure you have the following software installed on your system:

- Git
- Node.js & NPM
- Xcode
- Xcode Command Line Tools
- Homebrew
- Cocoapods

### Installing:

1. Clone the repository:

```
git clone https://github.com/Ermag/mayven-task.git
```

2. Install dependencies:

```
cd mayven-task
npm install
```

## Running the app

```
npm run serve
```
You should be able to access the application at http://localhost:8080

## Testing the app

1. Unit testing:
```
npm run test:unit
```

1. End-2-end testing:
```
npm run test:e2e
```

## Building the app

```
npm run build
```
This will generate a dist directory containing the compiled application files. You can then deploy the application to a web server or package it for distribution in the app stores.

### iOS
1. Make sure that your environment cover [those requirements](https://capacitorjs.com/docs/getting-started/environment-setup#ios-requirements).
2. Follow the installation instructions.
3. Build the app:
```
npm run build
```
4. Sync the web to the native iOS project:
```
npx cap sync
```
5. Open the iOS project in Xcode
```
npx cap open ios
```

## Built with

- [Ionic](https://ionicframework.com/docs/vue/overview)
- [Capacitor](https://capacitorjs.com/docs/)
- [Vue.js](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)

## Contributing
