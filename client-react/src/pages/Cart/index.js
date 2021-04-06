import React from 'react';
import { Button, List, Card, Skeleton } from 'antd';
import './index.css';

function CartPage() {
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
  const onRemove = () => {

  }
  return (
    <>
      <section className='main-container' style={{ padding: '20px' }}>
        <List
          itemLayout="horizontal"
          className="list-container"
          dataSource={products}
          renderItem={item => (
            <List.Item
              actions={[<Button key="list-loadmore-edit">delete</Button>]}
            >
              <Skeleton title={false} loading={item.loading} active>
                <List.Item.Meta
                  title={item.name}
                  description={item.description}
                />
              </Skeleton>
            </List.Item>
          )}
        />
      </section>
    </>
  );
};

export default CartPage;
