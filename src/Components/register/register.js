import React, {Component} from 'react';
import './register.css';
import axios from 'axios'


export default class dashboard extends Component {

  state = {
    name:"",
    email:"",
    password:"",
    passwordmatch:"",
    nameerror:"",
    emailerror:"",
    passworderror:"",
    passwordmatcherror:"",
    logged_in:localStorage.getItem("id_token") ? true : false,
  }



  Register =()=>{
    axios.post('http://127.0.0.1:8000/register/' , {
      'name':this.state.name,
      'email':this.state.email,
      'password':this.state.password
  }).then(res => {
          const token = res.data.token // you should firstly fetch the token from the data to be known
          localStorage.setItem('id_token', token) // Store token
      }).then((result)=> {
        console.log(result);
        alert("Registered")

        this.props.history.push('/charts')
      }).catch((error)=>{
        console.log(error);
        alert("Invalid credentials")
      })
    }


    submitting=(e)=>{
      e.preventDefault()
      let validate = this.validation();
      if (validate) {
          this.setState({nameerror:""})
          this.setState({emailerror:""})
          this.setState({passwerror:""})
          this.setState({passwmatcherror:""})}
      if (this.state.name.length>1 && this.state.email.length>1 &&
          this.state.password.length>1 && this.state.passwordmatch.length>7){
            this.Register()
          }
       }


    username=(event)=>{
      this.setState({name : event.target.value})
    }
    email=(event)=>{
      this.setState({email : event.target.value})
    }
    password=(event)=>{
      this.setState({password : event.target.value})
    }
    passwordmatch =(event)=>{
    this.setState({passwordmatch:event.target.value})
    }

    validation=()=>{
      let nameerror = "";
      let emailerror = "";
      let passwerror = "";
      let passwmatcherror = "";

      if (!this.state.name) {
        nameerror= "This field is required"
        }
      if (!this.state.email || !this.state.email.includes('@') || !this.state.email.includes('.')||!this.state.email.includes('com')) {
        emailerror="Invalid Email"
      }
      if (!this.state.password ||this.state.password.length < 8) {
        passwerror="Password should be at least 8 characs"
      }
      if (!this.state.passwordmatch||this.state.passwordmatch !== this.state.password) {
        passwmatcherror="The pass didn't match"

      }
      if (nameerror||emailerror||passwerror||passwmatcherror) {
            this.setState({nameerror,emailerror,passwerror,passwmatcherror});
            return false;
            }
      return true

    }


  render(){





    return(
      <div>
         { !this.state.logged_in ? <div className='backgroundk'>
             <form className='register' onSubmit={this.submitting}>
                    <div className='text'>
                        <h> Register </h>
                    </div>
                    <div className='input-container'>
                        <input name='name' placeholder='Name' onChange={this.username}/><br/>
                            <br/><div style={{color: "red"}}> {this.state.nameerror}</div><br/>
                        <input name='email' placeholder='Email address' onChange={this.email}/><br/>
                            <br/><div style={{color: "red"}}> {this.state.emailerror}</div><br/>
                        <input type='password' placeholder='password' onChange={this.password}/><br/>
                            <br/><div style={{color: "red"}}> {this.state.passwerror}</div><br/>
                        <input type='password' placeholder='password' onChange={this.passwordmatch}/><br/>
                            <br/><div style={{color: "red"}}> {this.state.passwordmatcherror}</div><br/>
                    </div>
                    <div className='button_container'>
                        <button  className='button'> Register </button>
                    </div>
              </form>
          </div> : <div className='logged_in'> YOu are already logged in  <a href='/charts'>/ Charts</a> </div>}
       </div>


    )
  }
}
