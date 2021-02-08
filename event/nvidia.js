
const walle = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhH-DyXUypAuNHVIx44EADYGHvEAxJix0sTA&usqp=CAU"
const rtx_3080 = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLUSplKjB2cKzsTACOCQLl0E6HdHcnxhAnOQ&usqp=CAU"
const spider = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9wQd7r5586f0kpDq_lvsGkN8woLAwLsTgQA&usqp=CAU"

const disp = {false: "- Indisponible ", true: "+ DISPONIBLE !"}

var today = new Date();
var date = today.toLocaleDateString('en-GB');

module.exports = (client, msg) => {
    if (msg.content === '!nvidia') {
      var xhr = new XMLHttpRequest(); 
      xhr.open('GET', 'https://stock.scrapfly.io/nvidia-rtx/json');
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
        
          var reponse = JSON.parse(xhr.responseText);
          var key = Object.keys(reponse)
            for (var item in key) {
                var title = JSON.stringify(key[item])
                var model_k = Object.keys(reponse[key[item]])
                var model = reponse[key[item]]
                
                msg.channel.send("**" + title.replace(/['"]+/g, '') + "  [ " + date + " ]**");
                model_k.map((model_title, k) => {

                    msg.channel.send(JSON.stringify(model_title).replace(/['"]+/g, ''))
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
                        

                        str = 
                        "```diff\n" 
                        + magasin + "\n"
                        + disp[stock] + "\n"
                        + price + currency + "\n\n"
                        + url
                        + "\n```" 

                        if (is_in_stock){
                            msg.channel.send(str)
                        }
                        

                    })
                    
                })
            
            }
        }
      };
      xhr.send();

    }
};