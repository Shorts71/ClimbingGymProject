import Button from '../shared/button';
import { Link, useNavigate } from 'react-router-dom';

const ProductItem = (props) => {
    const { product, onAddToCartClick } = props;
    const navigate = useNavigate();

    const viewProduct = () => {
      navigate(`/product/${product._id}`);
    };

    return (
    <div className="product">
      <Link to={`/product/${product._id}`}><img style={{ width: 200, height: 'auto' }} src={product.image} alt={product.name}/></Link>
      <h3><Link to={`/product/${product._id}`} style={{textDecoration: 'none', color: 'var(--primary)'}}>{product.name}</Link></h3>
      <p style={{ fontSize: 24 }}>
        <strong>$</strong>{product.price}
      </p>
      <p style={{ fontSize: 20 }}><strong>Rating: {product.rating}/10</strong></p>
      <Button text="Add to Cart" onClick={() => onAddToCartClick(product)} />
    </div>
    );
};

export default ProductItem;