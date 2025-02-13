# React + Go WebAssembly App

This project combines a React frontend with a Go backend compiled to WebAssembly. The React app dynamically loads the WebAssembly module and calls a Go function from JavaScript.

## Project Structure

go-app/
    go.mod
    main.go
react-app/
    .gitignore
    package.json
    public/
        favicon.ico
        index.html
        logo192.png
        logo512.png
        main.wasm
        manifest.json
        robots.txt
        wasm_exec.js
    README.md
    src/
        App.css
        App.js
        App.test.js
        index.css
        index.js
        logo.svg
        setupTests.js

## Getting Started

### Prerequisites

- Node.js
- Go (version 1.22.0 or later)

### Setup

1. Clone the repository.

2. Navigate to the [`react-app`](react-app ) directory and install the dependencies:

    ```sh
    cd react-app
    npm install
    ```

3. Build the Go WebAssembly module:

    ```sh
    npm run build:go
    ```

4. Copy the [`react-app/public/wasm_exec.js`](react-app/public/wasm_exec.js ) file to the `public` directory:

    ```sh
    npm run copy-wasm
    ```

### Available Scripts

In the [`react-app`](react-app ) directory, you can run:

#### `npm start`

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload when you make changes. You may also see any lint errors in the console.

#### [`npm test`](react-app/src/App.test.js )

Launches the test runner in interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified, and the filenames include the hashes. Your app is ready to be deployed!

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Go WebAssembly

The Go code is located in the [`go-app`](go-app ) directory. The [`go-app/main.go`](go-app/main.go ) file contains a simple Go function that is exposed to JavaScript.

### Go Code

```go
package main

import (
    "fmt"
    "syscall/js"
)

func helloWasm(this js.Value, args []js.Value) interface{} {
    message := "Hello from Go WebAssembly!"
    fmt.Println(message)
    return js.ValueOf(message)
}

func main() {
    js.Global().Set("helloWasm", js.FuncOf(helloWasm))
    select {}
}

```


### Building the Go WebAssembly Module
To build the Go WebAssembly module, run the following command from the react-app directory:

#### `npm run build:go`

This will compile the Go code to WebAssembly and move the main.wasm file to the public directory of the React app.

