/**
 * Camada de acesso a produtos.
 * Se VITE_API_URL estiver definida (ex.: http://localhost:3000), consome a API
 * do projeto back-end (/v1/product/...). Caso contrário, ou se a API falhar,
 * usa os dados locais de src/data/products.js.
 */
import { products as localProducts } from '../data/products';

const API_URL = import.meta.env.VITE_API_URL;

/** Converte um produto da API no formato usado pelos componentes. */
function fromApi(p) {
  const local = localProducts[(p.id - 1) % localProducts.length];
  const sizes = p.options?.find((o) => o.type === 'text')?.values;
  const colors = p.options?.find((o) => o.type === 'color')?.values;
  const hasDiscount = p.price_with_discount > 0 && p.price_with_discount < p.price;

  return {
    ...local,
    id: p.id,
    name: p.name,
    description: p.description || local.description,
    price: p.price,
    priceDiscount: hasDiscount ? p.price_with_discount : undefined,
    image: p.images?.[0]?.content || local.image,
    images: p.images?.length ? p.images.slice(1).map((img) => ({ src: img.content })) : local.images,
    options: { sizes: sizes || local.options.sizes, colors: colors || local.options.colors },
  };
}

async function request(path) {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function getProducts() {
  if (!API_URL) return localProducts;
  try {
    const { data } = await request('/v1/product/search?limit=-1');
    return data.map(fromApi);
  } catch (error) {
    console.warn('API indisponível, usando dados locais.', error);
    return localProducts;
  }
}

export async function getProduct(id) {
  if (!API_URL) return localProducts.find((p) => p.id === Number(id)) || null;
  try {
    return fromApi(await request(`/v1/product/${id}`));
  } catch (error) {
    console.warn('API indisponível, usando dados locais.', error);
    return localProducts.find((p) => p.id === Number(id)) || null;
  }
}
