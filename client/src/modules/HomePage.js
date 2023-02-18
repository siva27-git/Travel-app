import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, FormFeedback } from "reactstrap";
import axios from 'axios';

import './HomePage.css';

const HomePage = () => {

    const countryMap = { india: 999, africa: 899, europe: 799 };

    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [destination, setDestination] = useState("india");
    const [budget, setBudget] = useState(countryMap[destination]);
    const [headCount, setHeadCount] = useState(1);

    const [validEmail, setValidEmail] = useState(true);
    const [validName, setValidName] = useState(true);

    const onChangeCountry = (e) => {
        setDestination(e.target.value);
        setHeadCount(1);
        setBudget(countryMap[e.target.value]);
    };

    const onChangeCount = (e) => {
        setHeadCount(e.target.value);
        setBudget(e.target.value * countryMap[destination]);
    };

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
        setValidEmail(/\S+@\S+\.\S+/.test(e.target.value))
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!email) setValidEmail(false)
        if (!name) setValidName(false)

        if (name && (/\S+@\S+\.\S+/.test(email)) && destination && budget && headCount) {
            const bodyPayload = {
                name: name.toLocaleLowerCase().trim(),
                email: email.trim(),
                destination,
                amount: countryMap[destination],
                totalAmount: budget,
                headCount
            }
            const callApi = axios.post('http://localhost:8000/travelopia/addCxDetails', bodyPayload);

            callApi.then(() => {
                onClickReset()
                alert('Form Submitted successfully')
            }).catch((error) => {
                console.log(error)
                alert('Error while submitting the form')
            })
        }
    };

    const onClickReset = () => {
        setName("");
        setEmail("");
        setDestination('india')
        setBudget(countryMap[destination])
        setHeadCount(1)

        setValidEmail(true)
    };

    return (
        <main className="main-section">
            <div className="top-form">
                <div>
                    <Form className="form" onSubmit={(e) => onSubmit(e)}>
                        <FormGroup>
                            <Label  >Name</Label>
                            <Input invalid={!validName}
                                type="text"
                                name="name"
                                value={name}
                                placeholder="enter your name"
                                onChange={(e) => {
                                    setName(e.target.value)
                                    setValidName(true)
                                }}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label >Email</Label>
                            <Input invalid={!validEmail}
                                type="email"
                                name="email"
                                value={email}
                                placeholder="enter your email"
                                onChange={(e) => onChangeEmail(e)}
                            />
                            <FormFeedback>
                                Enter a valid Email
                            </FormFeedback>
                        </FormGroup>

                        <FormGroup>
                            <Label >Where do you want to go ?</Label>
                            <Input
                                type="select"
                                name="destination"
                                value={destination}
                                onChange={(e) => onChangeCountry(e)}
                            >
                                <option value="india">India</option>
                                <option value="africa">Africa</option>
                                <option value="europe">Europe</option>
                            </Input>
                        </FormGroup>

                        <FormGroup>
                            <Label >No of travellers</Label>
                            <Input
                                type="select"
                                name="headCount"
                                value={headCount}
                                onChange={(e) => onChangeCount(e)}
                            >{(Array.from(Array(10).keys())).map((ele) => {
                                return (
                                    <option key={ele + 1}>{ele + 1}</option>
                                )
                            })}
                            </Input>
                        </FormGroup>

                        <FormGroup>
                            <Label >Budget</Label>
                            <div className="input-group has-validation">
                                <span className="input-group-text" id="inputGroupPrepend">$</span> &nbsp;
                                <Input
                                    type="number"
                                    value={budget}
                                    name="budget"
                                    disabled={true}
                                />
                            </div>
                        </FormGroup>
                        <Button className="submit-button" size="lg">Submit</Button>
                    </Form>
                </div>
            </div>
        </main>
    )
};

export default HomePage;