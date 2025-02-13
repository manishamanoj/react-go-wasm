package main

import (
	"fmt"
	"syscall/js"
)

// Go function to be called from JavaScript
func helloWasm(this js.Value, args []js.Value) interface{} {
	message := "Hello from Go WebAssembly !"
	fmt.Println(message)
	return js.ValueOf(message)
}

func main() {
	// Register the function in the global JavaScript context
	js.Global().Set("helloWasm", js.FuncOf(helloWasm))

	// Keep the program running to listen for JS calls
	select {}
}