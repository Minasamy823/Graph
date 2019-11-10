import React, {Component} from 'react';
import './login.css';
import axios from 'axios'


export default class dashboard extends Component {

  state = {
    logged_in : localStorage.getItem('id_token') ? true : false,
    email: "",
    password: ""
  }


  Login =()=>{
    axios.post('http://127.0.0.1:8000/login/' , {
    'username' : this.state.email,
    'password' : this.state.password
  }).then(res => {
          const token = res.data.token // you should firstly fetch the token from the data to be known
          localStorage.setItem('id_token', token) // Store token
      }).then((result)=> {
        console.log(result);
        alert("Logged in")

        this.props.history.push('/charts')
      }).catch((error)=>{
        console.log(error);
        alert("Invalid credentials")
      })
    }


    submitting=(e)=>{
      e.preventDefault()
      this.Login()
    }

    username_changing=(event)=>{
      this.setState({email : event.target.value})
    }
    password_changing=(event)=>{
      this.setState({password : event.target.value})
    }

  render(){

    return(
      <div>
         { !this.state.logged_in ? <div className='backgroundk'>
               <form className='login' onSubmit={this.submitting}>
                    <div className='text'>
                      <h> Log-in to your account / <a href='/register'> Register </a></h>
                    </div>
                    <div className='input-container'>
                        <input name='login' placeholder='login' onChange={this.username_changing}/>
                        <input type='password' placeholder='password' onChange={this.password_changing}/>
                    </div>
                    <div className='button_container'>
                        <button  className='button'> LOGIN </button>
                    </div>
              </form>
        </div> : <div className='logged_in'> You are already logged in  <a href='/charts'>/ Charts</a> </div>}
    </div>


    )
  }
}
