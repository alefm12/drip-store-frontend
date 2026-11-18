import Layout from './Layout';
import Gallery from '../components/Gallery/Gallery';
import Section from '../components/Section/Section';
import ProductListing from '../components/ProductListing/ProductListing';
import useProducts from '../hooks/useProducts';
import { homeSlides, collections } from '../data/products';
import './pages.css';

export default function HomePage() {
  const { products } = useProducts();

  return (
    <Layout>
      <Gallery images={homeSlides} width="1440" height="681" className="home__gallery" />

      <div className="container page">
        <Section title="Coleções em destaque" titleAlign="center">
          <div className="home__collections">
            {collections.map((item) => (
              <a key={item.src} href="/products" className="home__collection">
                <img src={item.src} alt={item.alt} />
              </a>
            ))}
          </div>
        </Section>

        <Section title="Produtos em alta" titleAlign="left" link={{ text: 'Ver todos', href: '/products' }}>
          <ProductListing products={products.slice(0, 8)} />
        </Section>
      </div>
    </Layout>
  );
}
