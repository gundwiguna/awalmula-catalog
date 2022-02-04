import React from 'react';
import Catalog from '../../../../src/components/Catalog';

function index(props) {
    return (
        <div>
            <Catalog predefinedProducts={props.products} />
        </div>
    );
}

export const getServerSideProps = async (context) => {
    const fetchUrl = `https://staging-cuan.awalmula.co/rest/default/V1/categories/${context.params.category}/products`;
    const res = await fetch(fetchUrl);
    const data = await res.json();
    return {
        props: {
            products: data
        }
    };
}

export default index;