 const emailHTML = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .email-container {
      width: 100%;
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #4CAF50;
      color: white;
      padding: 10px 20px;
      text-align: center;
      border-radius: 10px 10px 0 0;
    }
    .content {
      padding: 20px;
    }
    .content h2 {
      color: #4CAF50;
    }
    .content p {
      margin: 10px 0;
    }
    .footer {
      text-align: center;
      padding: 10px;
      background-color: #f4f4f4;
      border-radius: 0 0 10px 10px;
      font-size: 12px;
      color: #777777;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      <h1>Booking Confirmation</h1>
    </div>
    <div class="content">
      <h2>Hello John Doe,</h2>
      <p>Thank you for booking with us!</p>
      <p><strong>Hotel Name:</strong> Hotel XYZ</p>
      <p><strong>Check-in Date:</strong> 2024-12-01</p>
      <p><strong>Check-out Date:</strong> 2024-12-05</p>
      <p><strong>Guests:</strong> 2</p>
      <p>We look forward to hosting you. If you have any questions, feel free to contact us!</p>
    </div>
    <div class="footer">
      <p>Hotel XYZ | Address Line 1, City, Country | +1 (123) 456-7890</p>
    </div>
  </div>
</body>
</html>
`;

module.exports = { emailHTML };