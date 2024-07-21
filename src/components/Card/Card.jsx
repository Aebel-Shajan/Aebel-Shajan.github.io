import './Card.css';

const Card = ({ children, ...props }) => {
  return <div className="card" {...props}>{children}</div>;
};

export default Card;
