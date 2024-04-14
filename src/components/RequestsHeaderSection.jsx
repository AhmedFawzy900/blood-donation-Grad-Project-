import requestImg from "../images/request2.png";
const RequestsHeaderSection = () =>{
    return(
        <div className="header-section container">
        <div className="text">
          <h1 className="">Donation Requests</h1>
          <p className="mb-2">
            Thank you for your commitment to saving lives through blood
            donation! Every donation makes a difference and brings hope to
            those in need
          </p>
        </div>
        <img src={requestImg} alt="" />
      </div>
    )
}

export default RequestsHeaderSection;