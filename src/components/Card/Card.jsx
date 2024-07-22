import './Card.css';

const Card = ({ children, className, ...props }) => {
  const combinedClassName = `card ${className || ''}`.trim();
  return <div className={combinedClassName} {...props}>{children}</div>;
};

export default Card;
