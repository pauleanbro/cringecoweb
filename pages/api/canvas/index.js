import nc from "next-connect";
import cors from "cors";
import Canvas from 'canvas'
  
// Canvas.registerFont('font/leaguespartan.bold.ttf', {family: 'leaguespartan'})

const applyText = (canvas, username) => {
    const context = canvas.getContext('2d');
    let fontSize = 70;
    
    do {
        context.font = `bold ${fontSize -= 10}px Impact`;
    } while (context.measureText(username).width > canvas.width - 300);
    
    return context.font;
}

const handler = nc()
  .use(cors())
  .post(async (req, res) => {

    // Pegando o nome do usuário
    
    const responseTwitter = await fetch(`https://api.twitter.com/1.1/users/lookup.json?user_id=${req.body.userId}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer '+process.env.TWITTER_BEARER,
      },
    });

    const content = await responseTwitter.json();
    const username = content[0].screen_name;
   
    // fazer porcentangem usando o email do usuario
    const porcentagem = Math.floor(Math.random() * 100);

    const canvas = Canvas.createCanvas(700, 250);
    const context = canvas.getContext('2d');

    const background = await Canvas.loadImage('https://i.imgur.com/GFbXAC2.png');

    context.drawImage(background, 0, 0, canvas.width, canvas.height);

    context.strokeStyle = '#74037b';

    context.strokeRect(0, 0, canvas.width, canvas.height);

    context.font = applyText(canvas, username);
    context.fillStyle = '#CBA45B';
    context.fillText(username, canvas.width / 12.5, canvas.height / 2.8);

    context.font = 'bold 50px Impact';
    context.fillStyle = '#ffffff';
    context.fillText(`é ${porcentagem}% cringe`, canvas.width / 12.5, canvas.height / 1.68);


    context.beginPath();
    context.arc(590, 125, 100, 0, Math.PI * 2, true);
    context.closePath();
    context.clip();

    const avatar = await Canvas.loadImage(req.body.user.image);

    context.drawImage(avatar, 490, 25, 200, 200);

    const image = canvas.toDataURL('image/png');

    //var base64Data = image.replace("data:image/png;base64,", "");

    res.send({
      image: image.toString(),
    });

    /*
    require("fs").writeFile("out.png", base64Data, 'base64', function(err) {
      if (err) {
        console.log(err);
      }
    });
    */



  });

export default handler;
