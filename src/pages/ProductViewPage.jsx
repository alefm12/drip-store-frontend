import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from './Layout';
import Gallery from '../components/Gallery/Gallery';
import BuyBox from '../components/BuyBox/BuyBox';
import ProductOptions from '../components/ProductOptions/ProductOptions';
import Section from '../components/Section/Section';
import ProductListing from '../components/ProductListing/ProductListing';
import useProducts from '../hooks/useProducts';
import { getProduct } from '../services/api';
import './pages.css';

export default function ProductViewPage() {
  const { id } = useParams();
  const { products } = useProducts();
  const [product, setProduct] = useState(undefined); // undefined = carregando, null = não encontrado
  const [message, setMessage] = useState('');

  useEffect(() => {
    setProduct(undefined);
    setMessage('');
    getProduct(id).then(setProduct);
    window.scrollTo(0, 0);
  }, [id]);

  const recommended = products.filter((p) => String(p.id) !== String(id)).slice(0, 4);

  if (product === undefined) {
    return (
      <Layout>
        <div className="container page">
          <p className="page__status">Carregando produto...</p>
        </div>
      </Layout>
    );
  }

  if (product === null) {
    return (
      <Layout>
        <div className="container page page__status">
          <h1>Produto não encontrado</h1>
          <Link to="/products">Ver todos os produtos</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container page">
        <nav className="breadcrumb" aria-label="Você está em">
          <Link to="/">Home</Link> / <Link to="/products">Produtos</Link> /{' '}
          <Link to={`/products?filter=${encodeURIComponent(product.brand)}`}>{product.brand}</Link> /{' '}
          <span>{product.name}</span>
        </nav>

        <div className="product-view">
          <Gallery images={product.images} showThumbs width="700" height="570" radius="4px" />

          <BuyBox
            name={product.name}
            reference={product.reference}
            stars={product.stars}
            rating={product.rating}
            price={product.price}
            priceDiscount={product.priceDiscount}
            description={product.description}
            onBuy={() => setMessage('Produto adicionado ao carrinho!')}
          >
            <ProductOptions title="Tamanho" options={product.options.sizes} shape="square" radius="4px" type="text" />
            <ProductOptions title="Cor" options={product.options.colors} shape="circle" type="color" />
          </BuyBox>
        </div>
        {message && (
          <p className="product-view__message" role="status">
            {message}
          </p>
        )}

        <Section title="Produtos recomendados" titleAlign="left" link={{ text: 'Ver todos', href: '/products' }}>
          <ProductListing products={recommended} />
        </Section>
      </div>
    </Layout>
  );
}
