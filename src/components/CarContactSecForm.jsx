import { useState } from "react"
import Swal from "sweetalert2";

const CarContactSecForm = () => {
    const [request , setRequest] = useState({
        name : "",
        email : "",
        phone : "",
        address : "",
        message : "",
        status:'pending'
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(request);

        fetch("http://localhost:8000/api/car/make-requests", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request),
        })
          .then((response) => response.json())
          .then((data) => {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Request Sent Successfully",
              text: "We will contact you soon",
              showConfirmButton: false,
              timer: 1500,
            });
            setRequest({
              name : "",
              email : "",
              phone : "",
              address : "",
              message : "",
              status:'pending'
            })
          })
          .catch((error) => {
           console.log(error);
          });
    }
    return(
        <div className="form col-md-5">
          <div className="form-content">
            {/* <h2>Contact Us</h2> */}
            <form onSubmit={handleSubmit}>
              <input
                className="input"
                type="text"
                placeholder="Your Name"
                name="name"
                id="name"
                value={request.name}
                onChange={(e) => setRequest({...request, name : e.target.value})}
                required
              />
              <input
                className="input"
                type="email"
                placeholder="Your Email"
                name="email"
                id="email"
                value={request.email}
                onChange={(e) => setRequest({...request, email : e.target.value})}
                required
              />
              <input
                className="input"
                type="text"
                placeholder="Your Phone"
                name="mobile"
                id="mobile"
                value={request.phone}
                onChange={(e) => setRequest({...request, phone : e.target.value})}
                required
              />
              <input
                className="input"
                type="text"
                placeholder="Fully Address"
                name="address"
                id="address"
                value={request.address}
                onChange={(e) => setRequest({...request, address : e.target.value})}
                required
              />
              <textarea
                className="input"
                placeholder="Tell Us About Your Needs"
                name="message"
                id="message"
                value={request.message}
                onChange={(e) => setRequest({...request, message : e.target.value})}
                required
              ></textarea>
              <input type="submit" value="Send" />
            </form>
          </div>
        </div>
    )
}

export default CarContactSecForm