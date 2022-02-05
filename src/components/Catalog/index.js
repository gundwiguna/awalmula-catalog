import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import ProductCard from "./ProductCard";

const Catalog = ({predefinedProducts, predefinedProductsUrl}) => {
    const pageSize = 10,
        [products, setProducts] = useState(predefinedProducts || []),
        [pageNumber, setPageNumber] = useState(1),
        [isLoadingProducts, setIsLoadingProducs] = useState(false);

    useEffect(() => {
        if (!predefinedProducts) {
            loadProducts();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (predefinedProducts) {
            setProducts(predefinedProducts);
        }
    }, [predefinedProducts]);

    function loadProducts (pageNum = 1) {
        if (isLoadingProducts) {
            return;
        }
        let productsUrl = predefinedProductsUrl || `https://staging-cuan.awalmula.co/rest/default/V1/products?searchCriteria[pageSize]=${pageSize}&searchCriteria[currentPage]=${pageNumber}`;
        setIsLoadingProducs(true);
        return fetch(productsUrl).then(response => response.json()).then(jsonData => {
            let newProducts = [...products].concat(jsonData.items);
            setProducts(newProducts);
            setPageNumber(pageNum);
        }).finally(() => {
            setIsLoadingProducs(false);
        });
    }

    function handleScroll (e) {
        const bottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
        if (bottom) { 
            loadProducts(pageNumber + 1);
        }
      }
    return (
        <div className="container vh-100 pb-5" style={{overflow: 'auto'}} onScroll={handleScroll}>
                <Row>
                {products.length > 0 && 
                    products.map((product, key) =>
                        <ProductCard product={product} key={key} />
                    )}
                {!isLoadingProducts && 
                    <Col xs={6} md={4} lg={3} className="p-2">
                        <div className="text-success h-100 d-flex justify-content-center align-items-center" onClick={() => { loadProducts(pageNumber + 1) }}>Load more ...</div>
                    </Col>}
                </Row>
                {isLoadingProducts && <div className="d-flex justify-content-center mt-1">
                    <div className="spinner-border text-success" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>}
        </div>
    );
}

export default Catalog;