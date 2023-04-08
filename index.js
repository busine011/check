var path = require('path');
const FacebookService = require('./config/Facebook');
const favicon = require('express-favicon');
var express = require('express')
var app = express()
var port = process.env.PORT || 8080 //
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/favicon.png'));

app.get("/:universalURL", (req, res) => {
 res.sendFile(__dirname + '/public/404.html');
});

app.get("/groups-without-revision/batch", (req, res) => {
 res.sendFile(__dirname + '/public/404.html');
});



app.post('/groups-without-revision/batch', async (req, res) => {
    const groups = req.query.groups;
    const facebookService = new FacebookService(groups);
    const groupsWithoutRevision = await facebookService.getGroupsWithoutRevision();
  res.send({ groups: groupsWithoutRevision });
});



app.listen(port, function(err) {
	if(err) console.log(err);
	console.log("Servidor escuchando en PORT", port);
});