/* eslint-disable react/no-direct-mutation-state */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import axios from 'axios';
import '../CSS/create-booking.css'
import { FormErrors } from './FormErrors';

/* Loin User*/
import { connect } from "react-redux";

import {

  Button,

  Card,

 CardTitle,

  CardSubtitle,

  CardBody

} from "reactstrap";

import PropTypes from "prop-types";

import store from '../store';

import { isAuth } from '../actions/authActions'

import './style.css';

import { Redirect } from 'react-router-dom'

import { logout } from '../actions/authActions';

import { buttonReset} from '../actions/uiActions'; 



import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';


 class CreateBooking extends Component {
    static propTypes = {

        button: PropTypes.bool,
    
        authState: PropTypes.object.isRequired,
    
        buttonReset: PropTypes.func.isRequired,
    
        logout: PropTypes.func.isRequired,
    
      };
    constructor(props) {
        super(props);

        this.state = {
            CustomerEmail:"",
            CustomerName:"",
            MobileNumber:"",
            TourOption:"",
            Date:"",
            Time:"",
            TourGuideName:"",
            formErrors: {email: '', password:''},
            emailValid: false,
            MemberID: '',


            formvalid: false,
            posts:[]

         
            
        }
        this.retrievePosts();
        this.ref1 = React.createRef();
        this.ref2 = React.createRef();
        this.ref3 = React.createRef();
        this.ref4 = React.createRef();
        this.ref5 = React.createRef();
    }

    retrievePosts(){
        axios.get("/posts").then(res =>{
            if(res.data.success){
                this.setState({
                    posts:res.data.existingPosts
                });
                console.log(this.state.posts)
            }
        })
    }


    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        
    
        switch(fieldName) {
          case 'CustomerEmail':
            emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
            fieldValidationErrors.email = emailValid ? '' : ' is invalid';
            break;
       
          default:
            break;
        }
        this.setState({formErrors: fieldValidationErrors,
                        emailValid: emailValid,
                        
                      }, this.validateForm);
      }
    
      validateForm() {
        this.setState({formValid: this.state.emailValid});
      }
    
      errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
      }

   handleInputChange = (e)=>{
        const {name,value} = e.target;
        this.setState({
            ...this.state,
            [name]:value
        },() => { this.validateField(name, value) }
    );
    }

    onsubmit =(e)=>{
        e.preventDefault();
   
        const { CustomerEmail,CustomerName,MobileNumber,TourOption,Date,Time,TourGuideName,MemberID} =this.state; 
        const data ={
            CustomerEmail:CustomerEmail,
            CustomerName:CustomerName,
            MobileNumber:MobileNumber,
            TourOption:TourOption,
            Date:Date,
            Time:Time,
            TourGuideName:TourGuideName,
            MemberID:MemberID
            
        }
        console.log(data);
        //console.log(this.state.MemberID);

        axios.post("http://localhost:8015/booking/save", data).then((res)=>{
            if(res.data.success){
                alert(`New Booking created successfully for email  ${CustomerEmail}`)
               
                this.setState(
                {
                    CustomerEmail:"",
                    CustomerName:"",
                    MobileNumber:"",
                    TourOption:"",
                    Date:"",
                    Time:"",
                    TourGuideName:"",
                    MemberID:""

                });
            }
        }).catch(error => {
            alert ("Empty fields are not accepted");
        });

        
    }
    componentDidMount() {

        // Check if session cookie is present
    
        store.dispatch(isAuth());
    
      }
    Demo = () => {
        this.ref1.current.value = "Chandimaljay@gmail.com"
        this.ref2.current.value = "Chandimal Jayaweera "
        this.ref3.current.value = "0745645456"
        this.ref4.current.value = "Basic"
        this.ref5.current.value = "Mr.Lankesh Suraweera"

        this.state.CustomerEmail = "Chandimaljay@gmail.com"
        this.state.CustomerName = "Chandimal Jayaweera"
        this.state.MobileNumber = "0745645456"
        this.state.TourOption = "Basic"
        this.state.TourGuideName = "Mr.Lankesh Suraweera"

    }
    setMemberId(id){

        this.setState({MemberID : id});

        console.log(this.state.MemberID);

    }

    render() {
        const handleSelect=(e)=>{
            console.log(e);
            
            this.state.TourGuideName = e
            
            
            this.ref5.current.value = e
            
        }
        if(!this.props.authState.isAuthenticated) {

            // return <Redirect to="/" />
      
          }
      
          const {user} = this.props.authState;
        return (
            <div className="create-booking-body">
            <div class="d-flex flex-column justify-content-center w-100 h-100">
            <div className="col-md-8 mt-4 mx-auto" id="content">
                <div id="header">
             <h1 className="h8 mb-8 font-weight-fw-bold align-content-center" id="crtH">  Create A Booking   </h1>
             </div>
             <br/>
           
                    <br/>
                    
                    <form className="create-form"  >
                   
                    <div className="form-group" style={{marginTop:'50px',marginBottom:'15px'}}>
                        <label for="emailC" style={{marginBottom:'5px',color:'#000'}}>Email address</label>
                    <input type="email" 
                        className="form-control" 
                        name="CustomerEmail" 
                        ref={this.ref1}
                        id="cEmail"
                        placeholder={ user ? `${user.email}`: ''}
                        defaultValue={this.state.CustomerEmail}
                        onChange={this.handleInputChange}  
                       
                         required/>
                        
                    </div>
                    <FormErrors formErrors={this.state.formErrors} className="FormError" id="form-error"/>
                   

                    <br/>
                    <div className="form-group">
                    <label for="cName" style={{marginBottom:'5px',color:'#000'}}>Customer Name</label>
                        <input type="text" 
                        className="form-control" 
                        ref={this.ref2}
                        id="cName" name="CustomerName" 
                        placeholder={ user ? `${user.name}`: ''}
                        defaultValue= {this.state.CustomerName}  
                        onChange={this.handleInputChange} required/>
                        
                    </div>
                    <br/>
                    <div className="form-group">
                    <label for="MobileNo" style={{marginBottom:'5px',color:'#000'}}>Mobile Number</label>
                        <input type="tel" 
                        className="form-control" 
                        ref={this.ref3}
                        id="MobileNo"name="MobileNumber" 
                        placeholder="Enter your mobile number"
                        defaultValue={this.state.MobileNumber}  
                        onChange={this.handleInputChange}  required/>
                        
                    </div>
                    <br/>
                    <div className="form-group">
                    <label for="TourOp" style={{marginBottom:'5px',color:'#000'}}>Tour Option</label>
                        <input type="text" 
                        className="form-control" 
                        ref={this.ref4}
                        id="TourOp" name="TourOption" 
                        placeholder="Enter tour option" 
                        defaultValue={this.state.TourOption}  
                        onChange={this.handleInputChange} required />
                        
                    </div>
                    <br/>
                    <div className="form-group">
                    <label for="Date" style={{marginBottom:'5px',color:'#000'}}>Date</label>
                        <input type="date" 
                        className="form-control" 
                        id="Date" 
                        name="Date" 
                        placeholder="Enter date you want to visit"  
                        defaultValue={this.state.Date}  
                        onChange={this.handleInputChange}  required/>
                        
                    </div>
                    <br/>
                    <div className="form-group">
                    <label for="Time" style={{marginBottom:'5px',color:'#000'}}>Allocated time</label>
                        <input type="time" 
                        className="form-control" 
                        id="Time" 
                        name="Time"
                        placeholder="Time you want to visit" 
                        defaultValue={this.state.Time}  
                        onChange={this.handleInputChange} required />
                        
                    </div>
                 <br/>
                    <div className="form-group">
                <DropdownButton align="center" title="Tour Guide" id="dropdown-menu-align-end1" onSelect={handleSelect} >
                <div>
                {this.state.posts.map(posts =>(
                <div>
                {posts.employeeType== "Tour Guide" && 

                <Dropdown.Item eventKey={posts.userName}>
                {posts.userName}
                </Dropdown.Item>
                }</div>
                ))}</div>
                
                </DropdownButton>
                <label style={{marginBottom:'5px',fontSize:'24px'}} id="chamForm">Tour Guide Name</label>
                <input type="text"
                id="vinodRet"
                className="form-control"
                name="Supervisor"
                placeholder="Enter Tour Guide"
                
                value={this.state.TourGuideName}
                onChange={this.handleInputChange}
                ref={this.ref5}
                />
            </div>    
            
                

                    <br/>
                    {/* <div className="form-group">
                    <label for="TName" style={{marginBottom:'5px'}}>Tour Guide Name</label>
                        <input type="text" 
                        className="form-control"
                        ref={this.ref5} 
                        id="TName" 
                        name="TourGuideName" 
                        placeholder="Enter tour guide name" 
                        defaultValue={this.state.TourGuideName}  
                        onChange={this.handleInputChange} required/>
                        
                    </div> */}

                    
                    


                        <br/>
                        <label hidden>{this.state.MemberID = (user ? `${user.id}`: '' )}</label>
                        
                        <br/>
                        <div>
                    <button className="btn btn-success" style={{marginTop:'0px',marginLeft:'120px'}} onClick={this.Demo} type="button">
                        <i className="far fa-check-square"></i>
                        &nbsp; Demo
                    </button>
                        
                       
                    <button className="btn btn-success" type="submit" style={{marginBottom:'0px',marginLeft:'300px'}} onClick={this.onsubmit}>
                        <i className="far fa-check-square"></i>
                        &nbsp; Submit Booking
                    </button>
                    &nbsp;
                    
                   

                        
                    
                    <button className ="btn btn-success" style={{marginLeft:'290px'}}><a href="/TourGuideDashboard" style={{textDecoration:'none' ,color:'white' }}>  Dashboard </a></button>
                    </div> <br/><br/>
                    <br/><br/>
                    </form>

                <br/>
                    
                </div>
                  
     


           
            	
</div>
</div>
        )
    }


}

const mapStateToProps = (state) => ({ //Maps state to redux store as props

    button: state.ui.button,
  
    authState: state.auth
  
  });
  
  
  
  export default connect(mapStateToProps, { logout, buttonReset })( CreateBooking);
