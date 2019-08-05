const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const csv = require('csvtojson');

app.use(cors());

app.get('/', (req, res) => {
    if (req.query.url) {
        axios.get(req.query.url)
            .then((response) => {
                try {
                    csv()
                        .fromString(response.data)
                        .then((jsonObj) => {
                            res.json(jsonObj)
                        });
                } catch (err) {
                    res.send(err);
                }
            }).catch((err) => {
                res.status(400);
                res.send(err);
            })
    } else {
        let errMsg = {
            message: "Inva"
        }
        res.send(errMsg);
    }
});

app.listen(3000, () => console.log('app listening on port 3000!'));