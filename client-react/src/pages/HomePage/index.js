import { Button, List, Card } from 'antd';
import { API } from 'utils/constants';
import './index.css';


function HomePage() {
  const products = [{
    name: 'product, 1',
    stock: 25,
    price: 14.20,
    description: 'this product is very good product yes its :)',
  }, {
    name: 'product, 1',
    stock: 25,
    price: 14.20,
    description: 'this product is very good product yes its :)',
  }, {
    name: 'product, 1',
    stock: 25,
    price: 14.20,
    description: 'this product is very good product yes its :)',
  }];
  return (
    <>
      <div className='main-container'>
        <List
          style={{ display: 'flex', justifyContent: 'center' }}
          grid={{
            gutter: 16,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 2,
            xl: 3,
            xxl: 3,
          }}
          dataSource={products}
          renderItem={item => (
            <List.Item>
              <Card style={{ fontSize: '1.5rem' }} title={item.name}>
                <p>{item.description}</p>
                <p>{item.price}</p>
                <p>{item.stock}</p>
                <Button>add to cart</Button>
              </Card>

            </List.Item>
          )}
        />
      </div>
    </>
  );
};

export default HomePage;
