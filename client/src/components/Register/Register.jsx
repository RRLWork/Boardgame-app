import './Register.css'
import axios from "axios";
import {React, useState} from 'react'
import { Form, Button } from "react-bootstrap";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [register, setRegister] = useState(false);
    const handleSubmit = (e) => {
    const configuration = {
            method: "post",
            url: "http://localhost:4000/users/register",
            data: {
              email,
              password,
              
            },
            
          };

        e.preventDefault();
        axios(configuration)
        .then((result) => {
            setRegister(true);
          })
          .catch((error) => {
            error = new Error();
          });
      }

      

    return (
        <>
          <h2>Register</h2>
          <Form onSubmit={(e)=>handleSubmit(e)}>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
          
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>
          {register ? (
          <p className="text-success">You Are Registered Successfully</p>
        ) : (
          <p className="text-danger">You Are Not Registered</p>
        )}


        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Register
        </Button>
      </Form>
        </>
    )
}