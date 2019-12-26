package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/joho/godotenv"
)

type page struct {
	template string
	data     map[string]string
}

func render(w http.ResponseWriter, tmpl, data map[string]string){
	tmpl, err := template.New("foo").Parse
	err = tmpl.Execute(w, data)
}

func cvRoute(w http.ResponseWriter, r *http.Request) {}
func indexRoute(w http.ResponseWriter, r *http.Request) {
	// serve the contents of the public directory
	http.FileServer(http.Dir("public"))
}

func main() {
	// load envvars
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	serverPort := os.Getenv("PORT")

	// create server mux config
	handler := http.NewServeMux()

	// handler.handleFunc("/cv", cvRoute) handle assets?
	// Register http handlers
	handler.HandleFunc("/cv", cvRoute)
	handler.HandleFunc("/", indexRoute)

	// set up server
	s := &http.Server{
		Addr:           fmt.Sprintf(":%s", serverPort),
		Handler:        handler,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}

	// serve our new shiny server
	log.Printf("Server starting on port %s", serverPort)
	log.Fatal(s.ListenAndServe())
}
