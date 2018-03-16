/**
 * Client for GIPHY-API based on GIPHY SDK
 * @author Fabian Sorn
 */

var GphApiClient    = require('giphy-js-sdk-core')
var client          = GphApiClient('jHgeqdTZcyfeZUJc2Pd93Hs0YBosA0FP')

function search(expression) {
    client.search('gifs', {"q": expression.toString()})
    .then((response) => {
        response.data.forEach((gifObject) => {
        console.log(gifObject)
        })
    })
    .catch((err) => {
        console.error(err);
    })
}

function trending() {
    client.trending("gifs", {})
    .then((response) => {

    })
    .catch((err) => {

    })
}

function getGIF(id) {
    client.gifByID(id)
    .then((response) => {

    })
    .catch((err) => {

    })
}
