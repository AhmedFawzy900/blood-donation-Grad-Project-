const DshCard = ({img,title,num}) => {
  return (
    <div className="dsh-card">
      <img src={img} alt="" />
      <div className="text">
        <h5>{title}</h5>
        <h2>{num}</h2>
      </div>
    </div>
  );
};

export default DshCard;
