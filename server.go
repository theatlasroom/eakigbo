package main

import (
	"fmt"
	"html/template"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/joho/godotenv"
	"gopkg.in/russross/blackfriday.v2"
)

type content struct {
	layout, template string
	data             map[string]string
}

func safeHTML(str string) template.HTML {
	return template.HTML(str)
}

func render(w http.ResponseWriter, c content) {
	// create a custom function to ensure html content does not get expected
	customFns := template.FuncMap{"safeHTML": safeHTML}
	// parse the template file
	fn, err := template.New("").Funcs(customFns).ParseFiles(c.layout, c.template)
	if err != nil {
		log.Print(err)
	}

	tmpl := template.Must(fn, err)

	// apply the data to the template and write the results in the response writer
	tmpl.ExecuteTemplate(w, "layout", c.data)
}

func cvRoute(w http.ResponseWriter, r *http.Request) {
	layout := filepath.Join("views", "layouts", "main.handlebars")
	fp := filepath.Join("views", "cv.handlebars")

	c := &content{
		layout:   layout,
		template: fp,
		data:     newRouteData(renderMarkdown("md/cv.md")),
	}

	render(w, *c)
}

func indexRoute(w http.ResponseWriter, r *http.Request) {
	layout := filepath.Join("views", "layouts", "main.handlebars")
	fp := filepath.Join("views", "index.handlebars")

	c := &content{
		layout:   layout,
		template: fp,
		data:     newRouteData(renderMarkdown("md/about.md")),
	}

	render(w, *c)
}

func newRouteData(content string) map[string]string {
	return map[string]string{
		"Headline":    "Ezekiel Kigbo",
		"Title":       "Ezekiel Kigbo | Full Stack Developer - Melbourne",
		"Description": "Full Stack Developer based in Melbourne",
		"Environment": os.Getenv("ENV"),
		// data,
		"Bundle":  "/static/dist/main.js",
		"Styles":  "/static/dist/styles.css",
		"Content": content,
	}
}

func renderMarkdown(file string) string {
	// TODO: cache rendered markdown
	input, err := ioutil.ReadFile(file)
	if err != nil {
		log.Print(err)
		return ""
	}
	return string(blackfriday.Run(input))
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

	// serve the contents of the public directory
	fs := http.FileServer(http.Dir("public"))
	handler.Handle("/static/", http.StripPrefix("/static/", fs))

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
	log.Printf("Server starting on port %s - env: %s", serverPort, os.Getenv("ENV"))
	log.Fatal(s.ListenAndServe())
}
