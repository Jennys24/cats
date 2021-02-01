const { forEachOfLimit } = require("async");
const express = require("express");
const app = express();
const port = 8000;


app.use(express.static(__dirname + "/public"));
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');


const gatitos = [
  { 
    id: 1,
    nombre: "Fifi", 
    poster: "angora.jpg", 
    comida_favorita: "atun", 
    edad: 2, 
    lugar_dormir: ["alfombra", "colcha rosada","en el techo"]
  },
  { 
    id: 2,
    nombre: "Mr. angry", 
    poster: "caracal.jpg", 
    comida_favorita: "ratones", 
    edad: 4, 
    lugar_dormir: ["frente a la ventana", "en el sofa"]
  },
  { 
    id: 3,
    nombre: "Hippie", 
    poster: "siames.jpg", 
    comida_favorita: "croquetas gatsy", 
    edad: 1, 
    lugar_dormir: ["debajo del sofa"]
  }
]

app.get("/cats", (req, res) => {
  res.render("cats", { gatitos : gatitos });
});

app.get("/:codigo", (req, res) => {
  let gatoenviar ;

  const codigo = req.params.codigo;
  for (const gato of gatitos) {
    if(codigo == gato.nombre){
      gatoenviar = gato;
    }
  }
  if(gatoenviar != undefined)
    res.render("detalles", { gato : gatoenviar });
    else
    res.send(
      `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Error 404</title>
        <link rel="stylesheet" href="css/stylos_error.css">
      </head>
      <body>
        
      <a href="cats"><img class="error" src="/images/404.png" alt="error404"></a>
        
      </body>
      </html>`);
  
  });

app.listen( port, () => console.log(`Listening on port: ${port}`) );

