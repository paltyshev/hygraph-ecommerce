import sendgrid from '@sendgrid/mail';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(req, res) {
  try {
    console.log('REQ.BODY', req.body);
    await sendgrid.send({
      to: 'aleksep@gmail.com', // Your email where you'll receive emails
      from: 'info@toybeary.ru', // your website email address here
      subject: `[Новый заказ на ToyBeary]`,
      html: `
          <p>Имя: ${req.body.name}</p>
          <p>Email: ${req.body.email}</p>
          <p>Адрес: ${req.body.address}</p>
          // <table>
          //   <thead>
          //     <tr>
          //       <th>Название</th>
          //       <th>Количество</th>
          //       <th>Цена</th>
          //     </tr>
          //   </thead>
          //   <tbody>
          //     ${req.body.items.map(
          //       (item) => `
          //       <tr>
          //         <td>${item.product.name}</td>
          //         <td>${item.quantity}</td>
          //         <td>${item.price}</td>
          //       </tr>
          //     `
          //     )}
          //   </tbody>
          //   <tfoot>
          //     <tr>
          //       <td colspan="2">Итого:</td>
          //       <td>${req.body.cartTotal}</td>
          //     </tr>
          //   </tfoot>
          // </table>
        `,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message });
  }

  return res.status(200).json({ error: '' });
}

export default sendEmail;
