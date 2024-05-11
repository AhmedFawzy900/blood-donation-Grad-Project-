import DeleteIcon from "@mui/icons-material/Delete";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import axios from "axios";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
const CarRequestDetailInfo = ({ data }) => {
  const navigate = useNavigate();
  const cancelRequest = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.put(`http://localhost:8000/api/car/update-request/${id}`, {status : "cancelled"})
          .then((response) => {
            axios
              .delete(`http://localhost:8000/api/car/delete-request/${id}`)
              .then((response) => {
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success",
                  showConfirmButton: false,
                  timer: 1300,
                });
                setTimeout(() => {
                  navigate("/car/dashboard/requests");
                }, 1300);
              })
              .catch((error) => {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Something went wrong!",
                  showConfirmButton: false,
                  timer: 1500,
                });
              });
          }).catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  };

  const doneRequest = (id) => {
    axios
      .put(`http://localhost:8000/api/car/update-request/${id}`, {
        status: "done",
      })
      .then((response) => {
        Swal.fire({
          title: "Done!",
          text: "these request has been done.",
          icon: "success",
          showConfirmButton: false,
          timer: 1300,
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          showConfirmButton: false,
          timer: 1300,
        });
      });
  };
  return (
    <div className="car-request-info">
      <div className="d-flex justify-content-between align-items-start">
        <div>
          <h4>Name</h4>
          <p>{data.name}</p>
        </div>
        <button
          className="btn btn-danger"
          onClick={() => cancelRequest(data.id)}
        >
          <DeleteIcon />
        </button>
      </div>

      <div>
        <h4>Email</h4>
        <p>{data.email}</p>
      </div>
      <div>
        <h4>Phone</h4>
        <p>{data.phone}</p>
      </div>
      <div>
        <h4>Address</h4>
        <p>{data.address}</p>
      </div>
      <div>
        <h4>Message</h4>
        <p>{data.message}</p>
      </div>

      <button className="btn btn-success" onClick={() => doneRequest(data.id)}>
        Done <TaskAltIcon />
      </button>
    </div>
  );
};

export default CarRequestDetailInfo;
