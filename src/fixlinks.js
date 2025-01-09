module.exports = {
    fixLinks: fixLinks
}

//list of regex matches to make. to register a new one, just add a new object
const regex_objs = [
    {
        expression: /\b(https:\/\/x.com\/[^/]+\/[^/]+\/\d+)\b/gim,
        replaceWith: "https://girlcockx.com/",
        length: 14
    },
    {
        expression: /\b(https:\/\/twitter.com\/[^/]+\/[^/]+\/\d+)\b/gim,
        replaceWith: "https://girlcockx.com/",
        length: 20
    },
    {
        expression: /\b(https:\/\/www.instagram.com\/reel\/[^/]+\/)/gim,
        replaceWith: "https://www.ddinstagram.com/",
        length: 26
    }
];


function test(msgtext, regex){
    return regex.expression.test(msgtext);
}

function fixLinks(msgtext){

    for(let regex of regex_objs){
        
        if(regex.expression.test(msgtext)){

            let links = msgtext.match(regex.expression) || [];
            links?.forEach((item, index) => {
                links[index] = regex.replaceWith + item.substring(regex.length, item.length);
            });
            return links;
        }
    }

    return 0;
}