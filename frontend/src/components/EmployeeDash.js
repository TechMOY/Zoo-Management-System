/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import axios from 'axios';

import '../CSS/EmployeeDashboard.css'
import jsPDF from 'jspdf'
import 'jspdf-autotable'






export default class Home extends Component {
constructor(props){
  super(props);

  this.state={
    posts:[],
    lastID:"10"
  };
  
}


componentDidMount(){
  this.retrievePosts();
  localStorage.setItem('foo', this.state.lastID);
}

retrievePosts(){
  axios.get("http://localhost:8015/posts").then(res=>{
    if(res.data.success){
      this.setState({
        posts:res.data.existingPosts
      })
      console.log(this.state.posts)
    }
  })
}

onDelete = (id) =>{
  axios.delete(`http://localhost:8015/post/delete/${id}`).then((res)=>{
    alert("Delete Successfully");
    this.retrievePosts()
  })
}

filterData(posts,searchKey){
  const result = posts.filter((post)=>
    post.eID.includes(searchKey)
  )
  
  this.setState({posts:result})

}


handleSearchArea = (e) =>{
      const searchKey = e.currentTarget.value


      axios.get("/posts").then(res=>{
        if(res.data.success){
          this.filterData(res.data.existingPosts,searchKey)
        }
      })
}

//Report Generate Function onClick
jspdGenerator=()=>{

        
  //Create document obj
  var doc =new jsPDF("p","pt","c3") 


  doc.html(document.querySelector("#shas99Table"), {
    
    callback:function(pdf){

      pdf.save("AllEmployeeDetails.pdf");
      
    }

  });

 
}
//End of function report 


  render() {
    return (
        <div className="EmpDashBody">
        <div className="header1">
          <div className="row">
          
            <div className="col-lg-9 mt-2 mb-2" id="EmpCaption"><b>
              <h4 className="Shas99HeadingEmpDash">Employee Management Dashboard</h4>
             
              </b>
              <div className="employeeImg"> </div>
              </div>
              <div className="col-lg-3 mt-2 mb-2" id="shas99SearchBar">
              <input style={{color:'#000'}}
              className="form-control"
              type="search"
              placeholder="                                         Search for records"
              name="searchQuery"
              onChange={this.handleSearchArea}>

              </input>
       
              </div>
              </div>
           
        <table className="table table-bordered table-sm table-hover"  style={{}} id="shas99Table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Employee ID</th>
              <th scope="col">Username</th>
              <th scope="col">Firstname</th>
              <th scope="col">Lastname</th>
              <th scope="col">E-mail</th>
              <th scope="col">Address</th>
              <th scope="col">Employee Type</th>
              <th scope="col">Date Of Birth</th>
              <th scope="col">Salary(USD)</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((posts,index) =>(
                          <tr>
                            <th >{index+1}</th>
                            <td>
                                <a href={`/employee/details/${posts._id}`}>
                                {"E"+posts.eID}
                                </a>
                                {/* {this.state.lastID = posts.eID} */}
                                {localStorage.setItem('foo', posts.eID)}
                                </td>
                            <td >{posts.userName}</td>
                             <td>{posts.firstName}</td>
                            <td>{posts.lastName}</td>
                            <td>{posts.email}</td>
                            <td>{posts.address}</td>
                            <td>{posts.employeeType}</td>
                            <td>{posts.DOB}</td>
                            <td>{posts.salary+"$"}</td>
                            <td>
                            <a className="btn btn-warning"  href={`/edit/employee/${posts._id}`} id="shasEdit">
                              <i className="fas fa-edit"></i>&nbsp;Edit
                            </a>
                            {/* &nbsp; */}
                            <a className="btn btn-danger" href="#" onClick={() =>this.onDelete(posts._id)} id="shasDelete">
                              <i className="far fa-trash-alt"></i>&nbsp;Delete
                            </a>
                            </td>
                          </tr>
            
                        ))}

                      </tbody>

        
      
      
      </table>
      <div id="empbtns" style={{marginTop:'30px',marginBottom:'30px',width:'100%'}}>
      <button className="btn btn-success" style={{marginLeft:"0", marginTop:"0px",width:"150px"}} >
        <a href="/adminpanelhome" style={{ textDecoration: "none", color: "white" }}>
           Admin Home
          </a>
          </button>
       
    
        {/* Copy generate from here */}

        
        <button className="btn btn-success" onClick={this.jspdGenerator} style={{margin:'2 0',marginLeft:'30%'}}>Generate Employee Report</button>
        
        <button className="btn btn-success" style={{marginLeft:'560px'}}><a href="/employee/add" style={{textDecoration:'none',color:'white'}}>Add New Employee</a>

</button>

        </div>
      </div> 
      {/* Iwara wena thana */}

    
      </div>)
  }
}
