import React, { Component } from 'react';
import { Container, Col, Row, Button, Nav, NavItem, NavLink } from 'reactstrap';
import './Header.css';

export default class Header extends Component {
    render() {
        return (
            <header className="site-header">
                <div className="top-header border">
                    <Container >
                        <Nav>
                            <NavItem >
                                <NavLink className="border-left border-right" href="#">Sign Up</NavLink>
                            </NavItem>
                            <NavItem >
                                <NavLink className=" border-right" href="#">Sign In</NavLink>
                            </NavItem>
                            <NavItem >
                                <NavLink className=" border-right" href="#">Sign In with Facebook</NavLink>
                            </NavItem>
                        </Nav>
                    </Container>
                </div>
                <div className="main-header" style={{padding: "35px 0"}}>
                    <Container>
                        <Row>
                            <Col md="4" sm="6" xs="8">
                                <div className="logo">
                                    <h1><a href="/">TRAN STORE</a></h1>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
                <div className="main-nav">
                    <Container>
                        <Row>
                            <Col md="6" sm="7" >
                                <div className="main-nav-items d-flex flex-row">
                                        <div className="main-nav-item border-left border-right ">SHOP</div>
                                        <div className="main-nav-item border-right">DETAILS</div>
                                        <div className="main-nav-item border-right">CONTACTS</div>
                                </div>                                
                            </Col>
                            <Col md="6" sm="5">
                               <div className="notification">
                                <div className="notification-item">Free Shipping on any order above $50</div>
                                    
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    
                </div>
            </header>
        )
    }
}
