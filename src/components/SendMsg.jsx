import React, { useState } from "react";
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import emailjs from 'emailjs-com';
import Swal from "sweetalert2";
import axios from "axios";
const SendMsg = ({data}) => {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    message: "",
  });

  const sendWhatsapp = () => {
    console.log(formData);
    const { phoneNumber, message } = formData;
    console.log(phoneNumber, message);
    if (phoneNumber && message) {
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://web.whatsapp.com/send?phone=+2${phoneNumber}&text=${encodedMessage}`;
      window.open(whatsappUrl, "_blank");
    }
  };


  const sendEmail = () => {
    const { message } = formData;
    const recipientEmail = data.email; // Ensure data.email contains the recipient's email address
  
    if (recipientEmail) {
      emailjs
        .send('service_3exhder', 'template_mdiafry', {
          to_name: data.name,
          to_email: recipientEmail,
          message: message,
        },'iy1BkJev9_Y8yfhuj')
        .then(
          (result) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Your Message has been sent successfully",
              showConfirmButton: false,
              timer: 1500
            });
          },
          (error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              showConfirmButton: false,
              timer: 1500
            });
          }
        );
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        showConfirmButton: false,
        timer: 1500
      });
    }
  };


 
  return (
    <div>

        <div class="form-group">
          <textarea
            class="form-control"
            placeholder="Write Message here..."
            name="message"
            onChange={(e) => setFormData({phoneNumber: data.phone, message: e.target.value })}
            value={formData.message}
            rows="5"
          ></textarea>
        </div>
        <button type="button" class="btn btn-primary mt-3" onClick={() => sendEmail()} >Send Email <EmailIcon/></button>
        <button type="button" onClick={() => sendWhatsapp()} class="btn btn-primary mt-3 mx-3">Send WhatsApp <WhatsAppIcon/></button>
    </div>
  );
};

export default SendMsg;
