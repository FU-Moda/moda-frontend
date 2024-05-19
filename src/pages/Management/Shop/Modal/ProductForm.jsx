import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  clothTypeLabels,
  clothingSizeLabels,
  genderLabels,
  shoeSizeLabels,
} from "../../../../utils/constant";
import { addNewProduct } from "../../../../api/productApi";
import { toast } from "react-toastify";
import { getAllWarehouse } from "../../../../api/warehouseApi";

const ProductForm = () => {
  const { shop } = useSelector((state) => state.shop);
  const [errors, setErrors] = useState({});
  const [wareHouse, setWarehouse] = useState([]);
  const [formData, setFormData] = useState({
    Name: "",
    Description: "",
    ClothType: "",
    Gender: "",
    ShopId: shop.id,
    ProductStocks: [
      {
        clothingSize: null,
        shoeSize: null,
        price: 0,
        quantity: 0,
        warehouseId: null,
      },
    ],
  });
  const [file, setFile] = useState(null);

  //   const handleChange = (e) => {
  //     const { name, value } = e.target;

  //     // Check if the input name includes "ProductStocks"
  //     if (name.includes("ProductStocks")) {
  //       const parts = name.split("."); // Tách chuỗi tên input dựa trên dấu chấm (.)
  //       console.log(parts);
  //       if (parts.length === 2) {
  //         const indexStr = parts[0].match(/\d+/)[0]; // Lấy phần index từ tên input
  //         const index = parseInt(indexStr);
  //         const prop = parts[1];
  //         if (!isNaN(index)) {
  //           const parsedValue =
  //             prop === "price" || prop === "quantity"
  //               ? parseFloat(value) || 0
  //               : value;
  //           console.log(parsedValue);
  //           // Kiểm tra giá trị của formData.ClothType để gán giá trị cho clothingSize hoặc shoeSize
  //           const updatedProductStocks = [...formData.ProductStocks];
  //           if (formData.ClothType >= 0 && formData.ClothType <= 3) {
  //             updatedProductStocks[index] = {
  //               ...updatedProductStocks[index],
  //               clothingSize: parsedValue,
  //               shoeSize: null,
  //             };
  //           } else if (formData.ClothType === 4) {
  //             updatedProductStocks[index] = {
  //               ...updatedProductStocks[index],
  //               clothingSize: null,
  //               shoeSize: parsedValue,
  //             };
  //           }
  //           console.log(updatedProductStocks);
  //           // Update the formData state with the new ProductStocks array
  //           setFormData({
  //             ...formData,
  //             ProductStocks: updatedProductStocks,
  //           });
  //           return;
  //         }
  //       }
  //       // If the index or prop is invalid, return without updating the state
  //       return;
  //     }

  //     // If the input name doesn't include "ProductStocks", update the formData state directly
  //     setFormData({ ...formData, [name]: value });
  //   };
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the input name includes "ProductStocks"
    if (name.includes("ProductStocks")) {
      const parts = name.split("."); // Tách chuỗi tên input dựa trên dấu chấm (.)
      console.log(parts);
      if (parts.length === 2) {
        const indexStr = parts[0].match(/\d+/)[0]; // Lấy phần index từ tên input
        const index = parseInt(indexStr);
        const prop = parts[1];
        console.log(prop);
        if (!isNaN(index)) {
          const parsedValue =
            prop === "clothingSize" ||
            prop === "shoeSize" ||
            prop === "price" ||
            prop === "quantity"
              ? parseFloat(value) || 0
              : value;

          // Create a copy of the ProductStocks array and update the specific item
          const updatedProductStocks = [...formData.ProductStocks];
          updatedProductStocks[index] = {
            ...updatedProductStocks[index],
            [prop]: parsedValue,
          };

          // Update the formData state with the new ProductStocks array
          setFormData({
            ...formData,
            ProductStocks: updatedProductStocks,
          });
          return;
        }
      }
      // If the index or prop is invalid, return without updating the state
      return;
    }

    // If the input name doesn't include "ProductStocks", update the formData state directly
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };
  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!formData.Name.trim()) {
      errors.Name = "Tên sản phẩm không được để trống";
      isValid = false;
    }

    if (!formData.Description.trim()) {
      errors.Description = "Mô tả không được để trống";
      isValid = false;
    }

    if (!formData.ClothType) {
      errors.ClothType = "Vui lòng chọn loại sản phẩm";
      isValid = false;
    }

    if (!formData.Gender) {
      errors.Gender = "Vui lòng chọn giới tính";
      isValid = false;
    }

    if (formData.ProductStocks.some((stock) => stock.price <= 0)) {
      errors.ProductStocks = "Giá sản phẩm phải lớn hơn 0";
      isValid = false;
    }

    if (formData.ProductStocks.some((stock) => stock.quantity <= 0)) {
      errors.ProductStocks = "Số lượng sản phẩm phải lớn hơn 0";
      isValid = false;
    }
    if (formData.ProductStocks.some((stock) => stock.warehouseId == null)) {
      errors.ProductStocks = "Kho phải được chọn";
      isValid = false;
    }
    if (file == null) {
      errors.File = "Ảnh phải được chọn";
      isValid = false;
    }
    setErrors(errors);
    return isValid;
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const addProductStock = () => {
    setFormData({
      ...formData,
      ProductStocks: [
        ...formData.ProductStocks,
        {
          clothingSize: 0,
          shoeSize: 0,
          price: 0,
          quantity: 0,
          warehouseId: null,
        },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const data = new FormData();
      for (const key in formData) {
        if (key === "ProductStocks") {
          formData[key].forEach((stock, index) => {
            data.append(
              `ProductStocks[${index}].clothingSize`,
              stock.clothingSize ? stock.clothingSize : ""
            );
            data.append(`ProductStocks[${index}].price`, stock.price);
            data.append(`ProductStocks[${index}].quantity`, stock.quantity);
            data.append(
              `ProductStocks[${index}].warehouseId`,
              stock.warehouseId
            );
            data.append(
              `ProductStocks[${index}].shoeSize`,
              stock.shoeSize ? stock.shoeSize : ""
            );
          });
        } else {
          data.append(key, formData[key]);
        }
      }
      data.append("File.Img", file);
      const dataResponse = await addNewProduct(data);
      if (dataResponse.isSuccess) {
        toast.success("Tạo mới thành công");
      }
    }
  };
  const removeProductStock = (index) => {
    setFormData({
      ...formData,
      ProductStocks: formData.ProductStocks.filter((_, i) => i !== index),
    });
  };

  const fetchData = async () => {
    const data = await getAllWarehouse(1, 100);
    if (data.isSuccess) {
      setWarehouse(data.result.items);
      console.log(data.result.items);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="max-w-lg mx-auto p-8 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-primary">
        Tạo mới sản phẩm
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Tên sản phẩm</span>
          </label>
          <input
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            className="input input-bordered"
          />
          {errors.Name && <span className="text-error">{errors.Name}</span>}
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Mô tả</span>
          </label>
          <textarea
            name="Description"
            value={formData.Description}
            onChange={handleChange}
            className="textarea textarea-bordered"
          />
          {errors.Description && (
            <span className="text-error">{errors.Description}</span>
          )}
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Loại</span>
          </label>
          <select
            name="ClothType"
            value={formData.ClothType}
            onChange={handleChange}
            className="select select-bordered"
          >
            {Object.keys(clothTypeLabels).map((key) => (
              <option key={key} value={key}>
                {clothTypeLabels[key]}
              </option>
            ))}
          </select>
          {errors.ClothType && (
            <span className="text-error">{errors.ClothType}</span>
          )}
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Dành cho</span>
          </label>
          <select
            name="Gender"
            value={formData.Gender}
            onChange={handleChange}
            className="select select-bordered"
          >
            {Object.keys(genderLabels).map((key) => (
              <option key={key} value={key}>
                {genderLabels[key]}
              </option>
            ))}
          </select>
          {errors.Gender && <span className="text-error">{errors.Gender}</span>}
        </div>

        <div className="mb-4">
          <label className="label">
            <span className="label-text">Danh sách sản phẩm hiện có</span>
          </label>
          {formData.ProductStocks.map((stock, index) => (
            <div
              key={index}
              className="mb-4 p-4 border border-gray-300 rounded"
            >
              <label className="label">
                <span className="label-text">Sản phầm {index + 1}</span>
              </label>
              {formData.ClothType >= 0 && formData.ClothType <= 3 ? (
                <>
                  <div className="form-control mb-2">
                    <label className="label">
                      <span className="label-text">Size</span>
                    </label>
                    <select
                      name={`ProductStocks[${index}].clothingSize`}
                      value={stock.clothingSize}
                      onChange={handleChange}
                      className="select select-bordered"
                    >
                      {Object.entries(clothingSizeLabels).map(
                        ([key, value]) => (
                          <option key={key} value={key}>
                            {value}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </>
              ) : (
                <>
                  <div className="form-control mb-2">
                    <label className="label">
                      <span className="label-text">Size giày</span>
                    </label>
                    <select
                      name={`ProductStocks[${index}].shoeSize`}
                      value={stock.shoeSize}
                      onChange={handleChange}
                      className="select select-bordered"
                    >
                      {Object.entries(shoeSizeLabels).map(([key, value]) => (
                        <option key={key} value={key}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}
              <div className="form-control mb-2">
                <label className="label">
                  <span className="label-text">Giá</span>
                </label>
                <input
                  type="number"
                  name={`ProductStocks[${index}].price`}
                  value={stock.price}
                  onChange={handleChange}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mb-2">
                <label className="label">
                  <span className="label-text">Số lượng</span>
                </label>
                <input
                  type="number"
                  name={`ProductStocks[${index}].quantity`}
                  value={stock.quantity}
                  onChange={handleChange}
                  className="input input-bordered"
                />
              </div>
              {errors.ProductStocks && (
                <span className="text-error">{errors.ProductStocks}</span>
              )}
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">
                    Chọn kho vận chuyển gần nhất
                  </span>
                </label>
                <select
                  name={`ProductStocks[${index}].warehouseId`}
                  value={stock.warehouseId}
                  onChange={handleChange}
                  className="select select-bordered"
                >
                  {wareHouse &&
                    wareHouse.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
              <button
                type="button"
                onClick={() => removeProductStock(index)}
                className="btn btn-error btn-block mt-2 text-white"
              >
                Xóa
              </button>
            </div>
          ))}
        </div>
        <div className="mb-4">
          <button
            type="button"
            onClick={addProductStock}
            className="btn btn-success text-white btn-block"
          >
            Thêm
          </button>
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Ảnh</span>
          </label>
          <input
            type="file"
            name="File.Img"
            onChange={handleFileChange}
            className="file-input file-input-bordered"
          />
        </div>
        {errors.File && <span className="text-error">{errors.File}</span>}
        <button type="submit" className="btn btn-primary btn-block">
          Tạo mới
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
