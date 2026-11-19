var express = require("express")
var app = express()

app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const plantList = [
    {
        title: "Monstera",
        image: "images/monstera.svg",
        link: "About Monstera",
        description: "Bright, indirect light. Water when the top 5 cm of soil is dry. Loves humidity."
    },
    {
        title: "Snake Plant",
        image: "images/snake-plant.svg",
        link: "About Snake Plant",
        description: "Very hardy. Low to bright light. Water every 2-3 weeks and never let it sit in water."
    },
    {
        title: "Aloe Vera",
        image: "images/aloe-vera.svg",
        link: "About Aloe Vera",
        description: "Needs lots of sun and sandy, fast-draining soil. Water deeply but rarely."
    }
]

app.get('/api/plants', (req, res) => {
    res.json({ statusCode: 200, data: plantList, message: "Success" })
})

var port = process.env.port || 3000;

app.listen(port, () => {
    console.log("App listening to: " + port)
})
