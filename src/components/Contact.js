import { useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import contactImg from "../assets/img/contact-img.svg"

export const Contact =()=>{
    const fromInitialDetails={
        firstName:'',
        lastName:'',
        email:'',
        phone:'',
        message:''
    }

    const [formDetails,setFormDetails]=useState(fromInitialDetails)
    const [buttonText,setButtonText]=useState('Send')
    const [status,setStatus]=useState({})

    const onFormUpdate=(category,value)=>{
        setFormDetails({
            ...formDetails,[category]:value
        })
    }

    const handelSubmit=async(e)=>{
        e.preventDetail()
        setButtonText('Sending...')
        let response=await fetch("http://localhost:3000/contact",{
            method:"POST",
            headers:{
                "Connntent-Type":"Application/json;charset=utf-8",
            },
            body:JSON.stringify(formDetails),
        });
        setButtonText("SEND")
        let result=response.json()
        setFormDetails(fromInitialDetails)
        if(result.code===200){
            setStatus({success:true,message:"Message sent successfully"})
        } else{
            setStatus({success:false,message:"Somthing went wrong, please try again later."})
        }
    }
    return(
        <section className="contact" id="connect">
            <Container>
                <Row className="align-item-center">
                    <Col md={6}>
                        <img src={contactImg}></img>
                    </Col>
                    <Col md={6}>
                        <h2>Get In Touch</h2>
                        <form onSubmit={handelSubmit}>
                            <Row>
                                <Col sm={6} className="px-1">
                                    <input type="text" value={formDetails.firstName} placeholder="First Name" onChange={(e)=>onFormUpdate('firstName',e.target.value)}/>
                                </Col>
                                <Col sm={6} className="px-1">
                                    <input type="text" value={formDetails.lastName} placeholder="Last Name" onChange={(e)=>onFormUpdate('lastName',e.target.value)}/>
                                </Col>
                                <Col sm={6} className="px-1">
                                    <input type="email" value={formDetails.email} placeholder="Email" onChange={(e)=>onFormUpdate('email',e.target.value)}/>
                                </Col>
                                <Col sm={6} className="px-1">
                                    <input type="number" value={formDetails.phone} placeholder="Phone Number" onChange={(e)=>onFormUpdate('phone',e.target.value)}/>
                                </Col>
                                <Col sm={6} className="px-1">
                                    <textarea row="6" vlaue={formDetails.message} placeholder="Message" onChange={(e)=>onFormUpdate('message',e.target.value)}/>
                                    <button type="submit"><span>{buttonText}</span></button>
                                </Col>
                                {
                                    status.message &&
                                    <Col>
                                    <p classname={status.success===false ? "danger":"success"}>{status.message}</p> 
                                    </Col>
                                }
                            </Row>
                        </form>
                    </Col>
                </Row>
            </Container>
        </section>

    )
}