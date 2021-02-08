const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const disp = {false: "- Indisponible ", true: "+ DISPONIBLE !"}
var today = new Date();
var date = today.toLocaleDateString('en-GB');

module.exports = (client, msg) => {
    if (msg.content === '!nvidia') {
        msg.channel.send("**" + "UPDATE DU [ " + date + " ]**");
        const xhr = new XMLHttpRequest(); 
        xhr.open('GET', 'https://stock.scrapfly.io/nvidia-rtx/json');
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                var response = JSON.parse(xhr.responseText);
                
                getNvidiaScrap(response, msg)
            }
        }
        xhr.send();

    }
};



function getNvidiaScrap(response, msg) {

    var key = Object.keys(response)
    key.map((value, item) => {

        
        var title = JSON.stringify(key[item])
        var model_k = Object.keys(response[key[item]])
        var model = response[key[item]]

        
        model_k.map((model_title, k) => {

            model_name = "**[" + title.replace(/['"]+/g, '') + "]** " + JSON.stringify(model_title).replace(/['"]+/g, '')

            var store = model[model_k[k]]
            Object.keys(store).map((s) => {

                var magasin = JSON.stringify(store[s].store).replace(/['"]+/g, '')
                var url = JSON.stringify(store[s].url).replace(/['"]+/g, '')
                var is_in_stock = store[s].in_stock
                var stock = JSON.stringify(store[s].in_stock).replace(/['"]+/g, '')
                if (store[s].price === null){
                    var price = "/"
                    var currency = ""
                }else {
                    var price = JSON.stringify(store[s].price.amount)
                    var currency = JSON.stringify(store[s].price.currency).replace(/['"]+/g, '')
                }
                

                embed = 
                "```diff\n" 
                + magasin + "\n"
                + disp[stock] + "\n"
                + price + currency + "\n\n"
                + url
                + "\n```" 
                

                if (is_in_stock){
                    msg.channel.send(model_name)
                    msg.channel.send(embed)
                }
                

            })
            
        })



    })
    

}
