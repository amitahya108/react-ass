import React, {useState, useEffect} from 'react';
import './App.css';
import ModalImage from "react-modal-image";


function App() {


  const [data_list, set_data_list] = useState([]);
  const [recent_search_list, set_recent_search_list] = useState(" + ");
  const [load_add, set_load_add] = useState(5);
  const [search, set_search] = useState("");
  const [offset, setOffset] = useState(0);

 	useEffect(() => {
 	  window.onscroll = () => {
 	    setOffset(window.pageYOffset)
 	    load_more();
 	  }
 	}, [offset]);


    useEffect(() => {
 	   fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=0171cd8f669cb7ca8b149ddf626c8299&per_page=${load_add}&format=json&nojsoncallback=1`)
 	     .then(data => data.json())
 	     .then(doc => {

 	     	console.log(doc)
 	       set_data_list(doc.photos.photo)
 	     })
 	     .catch(e => {
 	       return e
 	     })
  	}, [load_add])
	


  	const get_filter_arr = ()=>{
		return data_list.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
  	}

  	const load_more = ()=>{
  		set_load_add(load_add + 1);
  	}



  	const add_search = ()=>{
  		const temp = recent_search_list + search +"+";
  		set_recent_search_list(temp);
  	}


  return (
    <div className="App">
		
		<div className="search_bar">
    		<h4>Search Filter</h4>
    		<input type="text" value={search} onChange={(e)=>set_search(e.target.value)}/>
    		
    		<button onClick={()=>add_search()}>Search</button>
    	</div>

    	<div className="search_bar">
    		<h4>Recent Searches</h4>
    		<select onChange={(e)=>set_search(e.target.value)} value={search}>
    		{recent_search_list.split("+").map((item) =>
    			<option key={item.key}  value={item}>{item}</option>
    		)}

    		</select>
    	</div>



    
        <div className="grid">
          {get_filter_arr().map((item, index) => {
            return (
              <div key={item.download_url} className="comp">
                <div className="card-body ">
                <p>{index+1}</p>
                  <ModalImage
    					className="image"
    					small={"https://live.staticflickr.com/"+ item.server  + "/" + item.id + "_"+item.secret +"_w"+ ".jpg"}
 						large={"https://live.staticflickr.com/"+ item.server  + "/" + item.id + "_"+item.secret +"_w"+ ".jpg"}
 						 alt={item.title}
						/>
						<p >Title : {item.title}</p>
                </div>

                
                
              </div>
            )
          })}

            

        </div>

        {
        	offset &&
        	 <div className="load_more">
                 <h2>Loading More</h2>
         </div>
        }
       
    	
    </div>
  );
}

export default App;