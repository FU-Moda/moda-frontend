import React from "react";
import { Table, Image, Button } from "antd";
import { updateProductStatus } from "../../../../api/productApi";
import { toast } from "react-toastify";

const ProductTable = ({ products,fetchData }) => {
    const hasPendingProduct = products.some(product => product.product.status === 0);

  const handleUpdateStatus = async (id, status) => {
    try {
      const response = await updateProductStatus(id, status);
      if (response.isSuccess) {
        toast.success("Update product status successfully");
        fetchData();
      } else {
        toast.error("Failed to update product status");
        fetchData();
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating product status");
    }
  };
  const columns = [
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (imageUrl) => (
        <Image src={imageUrl} alt="Product Image" width={100} />
      ),
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Tên Shop",
      dataIndex: "shopName",
      key: "shopName",
    },
    {
      title: "Địa chỉ Shop",
      dataIndex: "shopAddress",
      key: "shopAddress",
    },
    {
      title: "Kích thước và số lượng",
      dataIndex: "productStock",
      key: "productStock",
      render: (productStock) =>
        productStock.map(({ clothingSize, quantity }) => (
          <div key={`${clothingSize}-${quantity}`}>
            <span>Kích thước: {clothingSize}</span> -{" "}
            <span>Số lượng: {quantity}</span>
          </div>
        )),
    },
  
  ];
  if (hasPendingProduct) {
    columns.push({
      title: "Hành động",
      key: "action",
      render: (record) => (
        <div>
          {record.status === 0 && (
            <>
              <Button
                className="bg-green-600 text-white"
                style={{ marginRight: "8px" }}
                onClick={() => handleUpdateStatus(record.key, 1)}
              >
                <i className="fa-solid fa-circle-check"></i>
              </Button>
              <Button
                className="bg-red-600 text-white"
                onClick={() => handleUpdateStatus(record.key, 2)}
              >
                <i className="fa-solid fa-ban"></i>
              </Button>
            </>
          )}
        </div>
      ),
    });
  }
  const dataSource = products.map((product) => ({
    key: product.product.id,
    image: product.staticFile[0]?.img || "",
    name: product.product.name,
    description: product.product.description,
    shopName: product.product.shop.name,
    shopAddress: product.product.shop.address,
    productStock: product.productStock,
    status: product.product.status,
  }));
  console.log(dataSource);
  return <Table dataSource={dataSource} columns={columns} rowKey="key" />;
};

export default ProductTable;
