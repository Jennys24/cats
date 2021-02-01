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
    lugar_dormir: ["alfombra", "colcha rosada"]
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
    lugar_dormir: ["debajo del sofa", "en su camita"]
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
    res.send("vuelve a escribir bien");
  
});

app.listen( port, () => console.log(`Listening on port: ${port}`) );

