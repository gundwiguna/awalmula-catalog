import Image from "next/image";
import { useState } from "react";
import { Col } from "react-bootstrap";
import s from './Catalog.module.css';

const LikeButton = () => {
    const [like, setLike] = useState(false);
    function toggleLike() {
        setLike(!like);
    }
    return (<div className={`${s.likeButton} d-flex align-items-center justify-content-center`} onClick={toggleLike}>
        <i className={`bi-heart-fill d-flex ${like && 'text-danger'} ${s.icon}`} />
    </div>)
}

const ProductCard  = (props) => {
    const { product } = props;
    const brand = getBrand(product);
    const price = formatPrice(product.price);
    const imgUrl = getImageUrl(product.media_gallery_entries && product.media_gallery_entries[0]?.file);
    const warehouseData = product.extension_attributes?.warehouse_data[0] && JSON.parse(product.extension_attributes?.warehouse_data[0]) || {};

    function getImageUrl (fileName) {
        if (!fileName) {
            return false;
        }
        const hostUrl = 'https://staging-cuan.awalmula.co/pub/media/catalog/product';
        return hostUrl + fileName;
    };
    function formatPrice (price) {
        if (isNaN(price)) {
            return 'Tidak diketahui'
        }
        return Intl.NumberFormat('id-ID', { style: "currency", currency: "IDR" }).format(price);
    };
    function getBrand (product) {
        return product.extension_attributes? JSON.parse(product.extension_attributes?.brand[0] || '{}').brand_name : 'Lokasi tidak diketahui'
    }
    return (
        <Col xs={6} md={4} lg={3} className="p-2">
            <div className={`${s.productCard} position-relative`}>
                <LikeButton />
                <div className={`px-0 px-md-3 d-flex justify-content-center align-items-center position-relative ${s.productImgContainer}`} style={{minHeight: '10rem'}}>
                    {imgUrl && <Image layout="intrinsic" width={260} height={260} objectFit alt={`product-${product.sku}`} className="w-100 img-fluid" src={imgUrl} />}
                    {!imgUrl && (<div>
                        <i className="bi-box2-heart text-success" style={{fontSize: '4rem'}} /></div>
                        )}
                </div>
                <div className="p-2">
                    <div className={`${s.productName}`}>{product.name || product.sku}</div>
                    <div className={`${s.productBrand} text-muted fw-bold`}>{brand}</div>
                    <div className={`${s.productWarehouse}`}>{warehouseData.city}</div>
                    <div className={`${s.productPrice} text-danger fw-bold`}>{price}</div>
                </div>
            </div>
        </Col>
    );
}

export default ProductCard;