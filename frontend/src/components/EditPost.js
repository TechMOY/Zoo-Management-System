/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import axios from 'axios'

import '../CSS/EmployeeDashboard.css'


const initial = {
    userName:"",
        firstName:"",
        eID:"",
        lastName:"",
        email:"",
        address:"",
        employeeType:"",
        additional:"",
        DOB:"",
        salary:"",
        userNameError:"",
        emailError:""


}

export default class EditPost extends Component {
    

    constructor(props){
        super(props);
        this.state=initial
    }
    
        handleInputChange =(e) =>{
            const {name,value} = e.target;
    
            this.setState({
                ...this.state,
                [name]:value
            })
        }



        validate = () => { 

            let userNameError="";
            let emailError="";
            let len = 0;
            if(!this.state.email.includes('@')){
                emailError = "Invalid email";
            }
    
            if(emailError === "Invalid email"){
                this.setState({emailError});
                return false
            }
            
            if(this.state.userName.length < 5){
                userNameError = "Username has to be atleast 5 characters long";
            }
    
            if(userNameError === "Username has to be atleast 5 characters long"){
                this.setState({userNameError});
                return false
            }
    
            return true
        }
    
        onSubmit = (e) =>{
            e.preventDefault();

            const isValid = this.validate();
            if(isValid){
                console.log(this.state);
    
                //clear form
                this.setState(initial)
                
                
    
            }else{
                alert("Requirements not fulfiled, Try again");
                return false
            }
            const id =  this.props.match.params.id;
            
            const {userName,firstName,eID,lastName,email,address,employeeType,DOB,salary,additional} = this.state;
      
    
    
            const data={
              
                userName:userName,
                firstName:firstName,
                
                lastName:lastName,
                email:email,
                address:address,
                employeeType:employeeType,
                DOB:DOB,
                salary:salary,
                additional:additional
            }
    
            console.log(data)
    
            axios.put(`http://localhost:8015/post/update/${id}`,data).then((res)=>{
                if(res.data.success){
                    alert("Post Updated Successfully")
                    this.setState(
                    {
                      username:"",
                      firstName:"",
                      eID:"",
                      lastName:"",
                      email:"",
                      address:"",
                      employeeType:"",
                      DOB:"",
                      salary:"",
                      additional:""
    
                    }
                    )
                }
            })
            
        }


    componentDidMount(){
        const id =  this.props.match.params.id;

        axios.get(`http://localhost:8015/post/${id}`).then((res) =>{
            if(res.data.success){
                this.setState({
                    userName:res.data.post.userName,
                    firstName:res.data.post.firstName,
                    eID:res.data.post.eID,
                    lastName:res.data.post.lastName,
                    email:res.data.post.email,
                    address:res.data.post.address,
                    employeeType:res.data.post.employeeType,
                    DOB:res.data.post.DOB,
                    salary:res.data.post.salary,
                    additional:res.data.post.additional

                })
              
            }
        })
        console.log(this.state)
    }

    //font-family: Papyrus, fantasy;
    
    
    render() {
        return (
            <div className="ShasEdit">
            <div className="col-md-8 mt-4 mx-auto" style={{backgroundColor:'white',marginTop:'0px',paddingTop:'30px'}}>
                <h1 className="h3 mb-3 font-weight-normal" style={{fontSize:'36px',textAlign:'center'}}>Edit Records</h1>
                <form className="needs-validation" style={{}} noValidate>
                    

                
                <div className="form-group" style={{marginBottom:'15px'}}>
                <label style={{marginBottom:'5px',fontFamily:"Arial",color:'black'}} >Username</label>
                <input type="text"
                className="form-control"
                name="userName"
                placeholder="Enter Post Category"
                value={this.state.userName}
                onChange={this.handleInputChange}/></div>

                    <div style={{color:"red"}}>
                    {this.state.userNameError}
                    </div>

                <div className="form-group" style={{marginBottom:'15px'}}>
                <label style={{marginBottom:'5px',fontFamily:"Arial",color:'black'}} >Firstname</label>
                <input type="text"
                className="form-control"
                name="firstName"
                placeholder="Enter Post Category"
                value={this.state.firstName}
                onChange={this.handleInputChange}/></div>

                <div className="form-group" style={{marginBottom:'15px'}}>
                <label style={{marginBottom:'5px',fontFamily:"Arial",color:'black'}} >LastName</label>
                <input type="text"
                className="form-control"
                name="lastName"
                placeholder="Enter Post Category"
                value={this.state.lastName}
                onChange={this.handleInputChange}/></div>


                <div className="form-group" style={{marginBottom:'15px'}}>
                <label style={{marginBottom:'5px',fontFamily:"Arial",color:'black'}} >Email</label>
                <input type="text"
                className="form-control"
                name="email"
                placeholder="Enter Post Category"
                value={this.state.email}
                onChange={this.handleInputChange}/></div>

                <div style={{color:"red"}}>
                    {this.state.emailError}
                    </div>

                <div className="form-group" style={{marginBottom:'15px'}}>
                <label style={{marginBottom:'5px',fontFamily:"Arial",color:'black'}} >Address</label>
                <input type="text"
                className="form-control"
                name="address"
                placeholder="Enter Post Category"
                value={this.state.address}
                onChange={this.handleInputChange}/></div>


                <div className="form-group" style={{marginBottom:'15px'}}>
                <label style={{marginBottom:'5px',fontFamily:"Arial",color:'black'}} >EmployeeType</label>
                <input type="text"
                className="form-control"
                name="employeeType"
                placeholder="Enter Post Category"
                value={this.state.employeeType}
                onChange={this.handleInputChange}/></div>


                <div className="form-group" style={{marginBottom:'15px'}}>
                <label style={{marginBottom:'5px',fontFamily:"Arial",color:'black'}} >DOB</label>
                <input type="text"
                className="form-control"
                name="DOB"
                type="date"
                placeholder="Enter Post Category"
                value={this.state.DOB}
                onChange={this.handleInputChange}/></div>


                <div className="form-group" style={{marginBottom:'15px'}}>
                <label style={{marginBottom:'5px',fontFamily:"Arial",color:'black'}} >Salary(USD)</label>
                <input type="text"
                className="form-control"
                name="salary"
                placeholder="Enter Post Category"
                value={this.state.salary}
                onChange={this.handleInputChange}/></div>
                

<div className="form-group" style={{marginBottom:'15px'}}>
                <label style={{marginBottom:'5px',color:'black'}} >Additional Information about the employee</label>
                <textarea type="text"
                rows="10"
                cols="50"
                className="form-control"
                ref={this.ref8}
                name="additional"
                placeholder=""
                value={this.state.additional}
                onChange={this.handleInputChange}></textarea></div>
               
                
                    <button className="btn btn-success" type="submit" style={{marginTop:'15px',marginLeft:'100px'}} onClick={this.onSubmit}>
                        <i className="far fa-check-square"></i>
                        &nbsp; Update
                    </button><br/>
                    <button className="btn btn-success" ><a href="/EmployeeDash">EmployeeDashboard</a></button>
                    




                </form>
                <br/><br/><br/><br/><br/>
            </div>
            </div>
        )
    }
}
