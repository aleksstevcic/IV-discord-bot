//consts
const twitterprefix = "https://girlcockx.com/";
const instagramprefix = "https://www.ddinstagram.com/";

//fix twitter links automatically
const regex_X = {
    expression: /\b(https:\/\/x.com\/[^/]+\/[^/]+\/\d+)\b/gim,
    length: 14
}
const regex_twitter = {
    expression: /\b(https:\/\/twitter.com\/[^/]+\/[^/]+\/\d+)\b/gim,
    length: 20
}

//instagram links
const regex_instagram = {
    expression: /\b(https:\/\/www.instagram.com\/reel\/[^/]+\/[^/ ]+)\b/gim,
    length: 26
}


function fixLinks(message, regex, replaceWith){

    let msgtext = message.content.toLowerCase();

    if(regex.expression.test(msgtext)){

        let links = msgtext.match(regex.expression) || [];
        
        links?.forEach((item, index) => {
            links[index] = replaceWith + item.substring(regex.length, item.length);
        });

        return links;
    }

    return 0;
}