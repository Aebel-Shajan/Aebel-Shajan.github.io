import "./Navigation.module.css";
const Navigation = () => {
  const linkNames = ["Me", "Projects", "CV"];
  const linkElements = linkNames.map((linkName, index) => {
    return <a href={"#" + linkName.toLowerCase()} key={"link-" + index}>{linkName}</a>
  })
  return ( 
    <nav>
      {linkElements}
    </nav>
   );
}
 
export default Navigation;