
import React, { Component } from 'react'
import { Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
    Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Input, Label} from 'reactstrap';
import { NavLink } from 'react-router-dom';
class Header extends Component {

     constructor(props){
         super(props);

         this.state = {
             isNavOpen: false,
             isModalopen: false
         };

         this.toggleNav = this.toggleNav.bind(this);
         this.toggleModal = this.toggleModal.bind(this);
         this.handleLogin = this.handleLogin.bind(this);
     }

     toggleModal(){
         this.setState({
             isModalopen: !this.state.isModalopen
         });
     }

     toggleNav(){

         this.setState({
             isNavOpen: !this.state.isNavOpen
         });
     }

     handleLogin(event){
         this.toggleModal();
         alert("Username: " + this.username.value+ "Password: " + this.password.value +
         "Remember password: " + this.remember.value);
         event.preventDefault()
     }

    render() {
        return (
            /**
             * react fragments allow us to group together
             * a number of elements
             */
            <React.Fragment>
                <Navbar dark expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav}/>
                        <NavbarBrand className="mr-auto">
                            <img src="assets/images/logo.png"
                                 height="30" width="40"
                                 alt="Restorante Con Fusion"
                            />
                        </NavbarBrand>

                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                    <NavLink className="nav-link" to="/aboutus">
                                        <span className="fa fa-info fa-lg">About us</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/menu">
                                        <span className="fa fa-list fa-lg">Menu</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/home">
                                        <span className="fa fa-home fa-lg">Home</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/contactus">
                                        <span className="fa fa-address-card fa-lg">Contact Us </span>
                                    </NavLink>
                                </NavItem>
                            </Nav>

                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <Button onClick={this.toggleModal}>
                                        <span className="fa fa-sign-in fa-lg">Login</span>
                                    </Button>
                                </NavItem>
                            </Nav>

                        </Collapse>
                    </div>
                </Navbar>
                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Restorante Con Fusion</h1>
                                <p>We take inspiration from th world's best cuisines, and create a unique fusion expericnce,
                                    Our lipsmacking creations will tickle your culinary senses!
                                </p>
                            </div>
                        </div>
                    </div>
                </Jumbotron>
                <Modal isOpen={this.state.isModalopen} toggle={this.toggleModal}>
                    <ModalHeader>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">username</Label>
                                <Input type="text" id="username" name="username"
                                innerRef={(input) => this.username = input}/>
                            </FormGroup>

                            <FormGroup>
                                <Label htmlFor="password">username</Label>
                                <Input type="password" id="username" name="password"
                                innerRef={(input) => this.password = input}/>
                            </FormGroup>

                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" id="remember"  name="remember"
                                    innerRef={(input) => this.remember = input}/>
                                    Remember me
                                </Label>
                            </FormGroup>

                            <Button type="submit" value="submit" className="  primary">Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        )

    }
}

export default Header