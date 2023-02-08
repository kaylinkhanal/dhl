const puppeteer = require("puppeteer");
const path = require('path')
const generatePdf = async (req, res) => {
  try {
    const reqData = req.body.item;
    const { orderCount, orderImg, senderName_fuzzy, __v, ...data } = reqData;

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const content = `
  <html>
  
    <body>
      <img src="https://www.freepnglogos.com/uploads/dhl-png-logo/dhl-business-live-png-logo-3.png" width="200" alt="dhl logo" /></a>
      <br/><br/>

      <table>

        ${Object.keys(data)
          .map(
            (key) => `
          <tr>
            <td>${key}</td>
            <td>${data[key]}</td>
          </tr>
        `
          )
          .join("")}
      </table>
    </body>
  </html>
`;
    await page.setContent(content);
    await page.pdf({
      path: `${data.senderName} ${data.productType} .pdf`,
      format: "A4",
      printBackground: true,
    });
    await browser.close();
   
    return res.sendFile(path.resolve(`${data.senderName} ${data.productType} .pdf` ));
  //   res.download( ), (err) => { 
  //     if (err) { 
  //         console.log(err); 
  //     } 
  // });

  } catch (err) {
    console.log(err);
  }
};

exports.generatePdf = generatePdf;
