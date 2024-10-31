const nodemailer = require('nodemailer');
const { emailHTML } = require('./email');
require('dotenv').config()
console.log(process.env.SID);


// Configure your email transport
const transporter = nodemailer.createTransport({
  service: 'Gmail',  // or use another email service
  auth: {
    user: process.env.UID, // Your email
    pass: process.env.SID   // Your email password
  }
});

const userEmail =  process.env.CEI
const bookingDetails = {
    userName : 'Prs',
    hotelName: 'taj'
}

// Function to send confirmation email
const sendBookingConfirmationEmail = (userEmail, bookingDetails) => {
    const mailOptions = {
      from: 'prajoshjohny10329@gmail.com',
      to: userEmail,  // Recipient email (user's email)
      subject: 'Booking Confirmation - Hotel XYZ',
      html: emailHTML
    //   text: `Hello ${bookingDetails.userName},\n\nThank you for booking with us!\n\nBooking Details:\nHotel: ${bookingDetails.hotelName}\nCheck-in: ${bookingDetails.checkIn}\nCheck-out: ${bookingDetails.checkOut}\nGuests: ${bookingDetails.guests}\nRoom Type: ${bookingDetails.roomType}\n\nWe look forward to hosting you!\n\nBest Regards,\nHotel XYZ`
    };
  
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error sending email:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  };
  
  sendBookingConfirmationEmail(userEmail, bookingDetails)