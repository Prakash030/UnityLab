import axios from 'axios';
import React , {useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import './Header.css'
import {FiSearch} from 'react-icons/fi'
import ResponsePage from '../ResponsePage/ResponsePage';
import PostInfo from '../PostInfo/PostInfo';

function Header() {
    const [query, setquery] = useState('');
    const [results, setResults] = useState([]);
    const [selectedPostId, setSelectedPostId] = useState('')
    const [error, setError] = useState(null)
    const [toggle, setToggle] = useState(false);

    const handleInput = (e)=>{
        setquery(e.target.value);
    }
    const handleSearch = async() =>{
        try{
        const response = await axios.get(`http://hn.algolia.com/api/v1/search?query=${query}`);
        console.log(query)
        setResults(response.data.hits);
        console.log(response.data.hits);
        setquery('')
        setToggle(!toggle);
        if(response.data.hits.length ===0){
          setError("Error fetching the details.");
        }
        }
        catch(err){
          console.log(`Failed to fetch the results`);
        }
    }
    if(error){
      toast.error(error);
      setError("");
    }

    const handlePostClick = (postId) => {
      setSelectedPostId(postId);
      console.log(selectedPostId);
    };

    const handleClosePostDetail = () => {
      setSelectedPostId(null);
    };

  return (
    <div>
      
        <div className="navbar">
            <div className="search">
                <div className="inputSearch">
                    <input type="text" name='search' value={query} onChange={handleInput} placeholder='Enter your query'/>
                </div>
                <button onClick={handleSearch} ><FiSearch size={25}/></button>
                
            </div>
        </div>
        <div className="results-container">
          {
            selectedPostId?(
              <PostInfo postId = {selectedPostId} onClose={handleClosePostDetail} />
            )
            :
            (
              <ul>
                <h1 style={{ display: toggle ? 'block' : 'none' }} className='display'>Search Results:</h1>
              {results.map((result) => (
                  <ResponsePage key={result.objectID} result={result} onClick={()=>handlePostClick(result.objectID)}/>
              ))}
            </ul>
            )
          }
      </div>
      <ToastContainer />
    </div>
  )
}

export default Header