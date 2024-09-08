import './Card.css';

const Card = ({ children }) => {
  return (
    <div className="card" onClick={(event) => event.stopPropagation()}>
      {children}
    </div>
  );
};

export default Card;
