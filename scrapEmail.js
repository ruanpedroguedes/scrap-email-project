const axios = require('axios');
const cheerio = require('cheerio');
const nodemailer = require('nodemailer');


const scrapeData = async () => {
  try {
    const { data } = await axios.get('https://www.bbc.com/portuguese');
    const $ = cheerio.load(data);
    const headlines = [];
    $('.gs-c-promo-heading__title').each((index, element) => {
      headlines.push($(element).text());
    });
    return headlines.join('\n');
  } catch (error) {
    console.error('Erro ao fazer scraping:', error);
  }
};

const sendEmail = async (scrapedInfo) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ruanpedro9999@gmail.com',
      pass: '1234'
    }
  });

  let mailOptions = {
    from: 'ruanpedro9999@gmail.com',
    to: 'ruanppguedes@cetii.pe.senac.br',
    subject: 'Informações do Scraping',
    text: `Aqui estão as manchetes coletadas:\n\n${scrapedInfo}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email enviado com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar email:', error);
  }
};

const main = async () => {
  const scrapedInfo = await scrapeData();
  if (scrapedInfo) {
    await sendEmail(scrapedInfo);
  }
};

main();
