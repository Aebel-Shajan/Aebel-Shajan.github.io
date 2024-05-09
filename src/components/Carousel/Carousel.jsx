import style from"./Carousel.module.css";


const Carousel = ({ childData }) => {
  const childElements = childData.map((child, index) => {
    return (
      <li key={index}>
      
        <img src={require("../../" + child.image)} alt="" />
        <p>{child.title}</p>
      </li>
    )
  })
  return (
    <div className={style.carouselDiv}>
      <ul>
        {childElements}
      </ul>
    </div>
  );
}

export default Carousel;