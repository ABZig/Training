const express = require('express');
const app = express();
const controllers = require('./controller/controller');
app.set('view engine', 'ejs');  
const route = require("./routes/route");
app.use("/", route);

app.use(express.static('./assets'));    

app.listen(3539, ()=> (console.log(`Server is running on http://localhost:$(3539)`)));
