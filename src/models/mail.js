const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

function sendEmailConfirmationHTML(customerName, orderNro){
  return `<DOCTYPE html>
  
  <html lang="en">
  <head>
    <meta charset= "UTF-8"/>
    <meta hhtp-equiv="X-UA-compatible=" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Documento</title>
    <style>
      .responsive{
        width: 100%;
        height: auto;
      }
      </style>
      </head>
      <body>
      <img
        src="https://previews.123rf.com/images/isselee/isselee1101/isselee110100008/8650613-primer-plano-de-mono-de-su-clase-mixta-entre-el-chimpanc%C3%A9-y-el-bonobo-sonriendo-8-a%C3%B1os-de-edad.jpg"
        class="responsive"
        alt=""
        />
        </body>
        </html>

  `;

}

function getMessage(emailParams){
  return{
    to: emailParams.toEmail,
    from: 'daniel.1702013669@ucaldas.edu.co',
    subject: 'confirmacion orden de comprar BLACKFRIDAY',
    text: `hola ${emailParams.customerName}, te enviamos las imagenes de los productos comprados y la factura`,
    html: sendEmailConfirmationHTML(
      emailParams.customerName,
      emailParams.orderNro
    ),
  };
}


async function sendOrder(emailParams){
  try{
    await sgMail.send(getMessage(emailParams));
    return { message: 'confirmacion de compra enviada' };
  }catch (err) {
    const message = 'No se puedo enviar la orden';
    console.error(message);
    console.error(err);
    if(err.response) console.error(err.response.body);
    return { message };
  }
}

module.exports = {
  sendOrder,
};