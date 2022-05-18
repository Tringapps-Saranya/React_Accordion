import React , {useEffect , useState}from 'react'
import axios from 'axios'
import '../asserts/Accordion.css'
import profile_picture from '../asserts/profile_picture.png'

function Accordion() {

      const[users, setUsers] = useState([])
      const [userId, setUserId] = useState(null);
      const[error,seterror] = useState(null);
      const {REACT_APP_DOMAIN_NAME} = process.env
      const displayconsole = false;

  useEffect(() =>{
        axios.get(`${REACT_APP_DOMAIN_NAME}/api/users`)
        .then(result =>{
            displayconsole && console.log(result);
            setUsers(result.data.data);
            displayconsole && console && console.log(users);
        })
        .catch(errorMessage =>{
            displayconsole && console.log(errorMessage.message);
            seterror(true);
        })
      
  } ,[users,displayconsole,REACT_APP_DOMAIN_NAME]);

  function handleClick(id) {
    if (userId === id) {
      return setUserId(null);
    }
    setUserId(id);
       localStorage.setItem(setUsers,JSON.stringify(users));
  }  
    return (
      <div>
          { error && <h1>Error on this page!</h1>}
          {(users.length === 0) && <h1>There is no user details</h1> } 

        <h1>Welcome to TringApps!</h1>
        {users.map((user) => {
           const { id, first_name, last_name, email, avatar } = user;
          return (
            <div key={id}>
                  <div className="username" onClick={() => handleClick(id)}>{first_name} <span className={userId === id ? "upsymbol" : "downsymbol"} ></span>  </div>
              <div
                className={
                  userId === id
                    ? "userDisplayDetails show"
                    : "userDisplayDetails"
                }>
                <div className='content'>  
                      <img src={avatar || profile_picture} alt="profilepicture"></img>
                      <div  >
                          
                            <div class='text'>  First Name : {first_name}</div>
                          
                             <div class='text'> Last Name : {last_name}</div>
                        
                              <div class='text'>Email : {email}</div>
                      </div>
                </div>
              </div>
            </div>
          );
        })}
     </div>
    );
  }

export default Fetching;
