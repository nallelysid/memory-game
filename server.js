let express = require('express')

let app = express();

app.use(express.static(__dirname+'/dist/memory-game'));

app.get('/*',(req, resp) =>{
    resp.sendFile(__dirname+'/dist/memory-game/index.html');
});

app.listen(process.env.PORT || 8080);