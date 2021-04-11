package main

import (
	"log"
	"os"

	"github.com/alecthomas/chroma/formatters/html"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
)

type content struct {
	layout, template string
	data             map[string]string
}

// func safeHTML(str string) template.HTML {
// 	return template.HTML(str)
// }

// func render(c *fiber.Ctx, data content) {
// 	// create a custom function to ensure html content does not get expected
// 	customFns := template.FuncMap{"safeHTML": safeHTML}
// 	// parse the template file
// 	fn, err := template.New("").Funcs(customFns).ParseFiles(c.layout, c.template)
// 	if err != nil {
// 		log.Print(err)
// 	}

// 	tmpl := template.Must(fn, err)

// 	// apply the data to the template and write the results in the response writer
// 	tmpl.ExecuteTemplate(c, "layout", data.data)
// }

func render(c *fiber.Ctx, data content) error {
	return c.Render(data.template, fiber.Map{
		"Title": "Hello, World!",
	})
}

func cvRoute(c *fiber.Ctx) error {
	// layout := filepath.Join("views", "layouts", "main.handlebars")
	// fp := filepath.Join("views", "cv.handlebars")

	data := &content{
		template: "cv",
		// data:     newRouteData(renderMarkdown("md/cv.md")),
		data: "",
	}

	render(c, *data)
}

func indexRoute(c *fiber.Ctx) error {
	// layout := filepath.Join("views", "layouts", "main.handlebars")
	// fp := filepath.Join("views", "index.handlebars")

	data := &content{
		template: "index",
		// data:     newRouteData(renderMarkdown("md/about.md")),
		data: "",
	}

	render(c, *data)
}

// func cvRoute(w http.ResponseWriter, r *http.Request) {
// 	layout := filepath.Join("views", "layouts", "main.handlebars")
// 	fp := filepath.Join("views", "cv.handlebars")

// 	c := &content{
// 		layout:   layout,
// 		template: fp,
// 		data:     newRouteData(renderMarkdown("md/cv.md")),
// 	}

// 	render(w, *c)
// }

// func indexRoute(w http.ResponseWriter, r *http.Request) {
// 	layout := filepath.Join("views", "layouts", "main.handlebars")
// 	fp := filepath.Join("views", "index.handlebars")

// 	c := &content{
// 		layout:   layout,
// 		template: fp,
// 		data:     newRouteData(renderMarkdown("md/about.md")),
// 	}

// 	render(w, *c)
// }

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

func markdownToHtml() {}

// func renderMarkdown(file string) string {
// 	// TODO: cache rendered markdown
// 	input, err := ioutil.ReadFile(file)
// 	if err != nil {
// 		log.Print(err)
// 		return ""
// 	}
// 	return string(blackfriday.Run(input))
// }

func main() {
	// load envvars
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	// Initialize standard Go html template engine
	engine := html.New("./views", ".html")

	app := fiber.New(fiber.Config{
		Views: engine,
	})

	app.Use(logger.New())

	// serve the contents of the public directory
	app.Static("/static", "/public")

	// Register http handlers
	app.Get("/cv", cvRoute)
	app.Get("*", indexRoute)

	log.Fatal(app.Listen(":3000"))
}

// func main() {

// 	serverPort := os.Getenv("PORT")

// 	// create server mux config
// 	handler := http.NewServeMux()

// 	// serve the contents of the public directory
// 	fs := http.FileServer(http.Dir("public"))
// 	handler.Handle("/static/", http.StripPrefix("/static/", fs))

// 	// Register http handlers
// 	handler.HandleFunc("/cv", cvRoute)
// 	handler.HandleFunc("/", indexRoute)

// 	// set up server
// 	s := &http.Server{
// 		Addr:           fmt.Sprintf(":%s", serverPort),
// 		Handler:        handler,
// 		ReadTimeout:    10 * time.Second,
// 		WriteTimeout:   10 * time.Second,
// 		MaxHeaderBytes: 1 << 20,
// 	}

// 	// serve our new shiny server
// 	log.Printf("Server starting on port %s - env: %s", serverPort, os.Getenv("ENV"))
// 	log.Fatal(s.ListenAndServe())
// }
