import React from 'react';
import { Card, Image, Typography, Divider, List } from 'antd';

const { Meta } = Card;
const { Title, Text } = Typography;

const ProductCard = ({ product }) => {
  const { product: productData, productStock, staticFile } = product;
  const { name, description } = productData;
  const imageUrl = staticFile[0]?.img || '';

  return (
    <Card
      cover={<Image src={imageUrl} alt={name} />}
      actions={[/* Có thể thêm các nút chức năng ở đây */]}
    >
      <Meta title={name} description={description} />
      <Divider />
      <Title level={5}>Kích thước và số lượng</Title>
      <List
        dataSource={productStock}
        renderItem={(item) => (
          <List.Item>
            <Text strong>Kích thước:</Text> {item.clothingSize} - <Text strong>Số lượng:</Text> {item.quantity}
          </List.Item>
        )}
      />
    </Card>
  );
};

export default ProductCard;