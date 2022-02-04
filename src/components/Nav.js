import Link from 'next/link';
import s from '../../styles/Nav.module.css';
import { Container, Navbar, Nav, NavDropdown, Modal, Button } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';


export default (props) => {
    const [categories, setCategories] = useState({});
    function fetchCategories() {
        const categoriesUrl = 'https://staging-cuan.awalmula.co/rest/default/V1/categories';
        fetch(categoriesUrl)
        .then((res) => res.json())
        .then((jsonData) => {
            setCategories(jsonData);
        });
    }

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(fetchCategories, []);
    return (
        <>
        <div style={{height: '56px'}}></div>
        <Navbar collapseOnSelect={true} expand="sm" bg="dark" variant="dark" fixed="top">
            <Container>
                <Navbar.Brand href="/">Awalmula Catalog</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Link href="/"><a role="button" className="nav-link">Home</a></Link>
                        <Link href="/products"><a role="button" className="nav-link">Products</a></Link>
                        <span onClick={handleShow} role="button" className="nav-link">Categories</span>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Select Categories</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {categories && categories.children_data && categories.children_data.length > 0 &&
                    (categories.children_data.map((item, key) => 
                        <CategoriesItem closeModal={handleClose} key={key} item={item} />))
                    }
            </Modal.Body>
        </Modal>
        </>
    );
}


const CategoriesItem = ({item, isExpanded, closeModal}) => {
    const [isOpen, setIsOpen] = useState(false);
    function toggleOpen() {
        setIsOpen(!isOpen);
    }

    return (
    <ul className={`${s.categoriesUl} ${s.nested} ${!isExpanded && s.active} m-0`}>
        <li><span onClick={toggleOpen} 
            className={`${item.children_data && item.children_data.length > 0 && s.caret} ${isOpen && s.caretDown} mb-2 btn btn-link text-success`}>
                <Link href="/products/category/[category]" as={`/products/category/${item.id}`}><span onClick={closeModal}>{item.name}</span></Link>
            </span>
            {item.children_data && item.children_data.length > 0 && 
                (item.children_data.map((childItem, key) => {
                    return (<CategoriesItem closeModal={closeModal} item={childItem} isExpanded={!isOpen} key={childItem.name + key} />)
                }))
            }
        </li>
    </ul>)
}