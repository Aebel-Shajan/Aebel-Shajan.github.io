import "./SearchForm.css";
import Card from "@/components/Card/Card"

const SearchForm = ({setSearchTerm}) => {
    return ( 
    <Card className="search-container">
        <form className="search-form" onSubmit={event => event.preventDefault()}>
            <input 
                type="text" 
                name="query" 
                placeholder="Search..." 
                onChange={event => setSearchTerm(event.target.value)}
                className="search-input" />
        </form>
    </Card>
    );
}

export default SearchForm;