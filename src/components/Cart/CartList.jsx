const CartList = ({ cartList, dispatch }) => {
  return (
    <div className="md:col-span-3">
      {cartList.length === 0 && (
        <h1 className="text-2xl font-bold">Không tồn tại sản phẩm nào</h1>
      )}
      {cartList.map((item) => {
        const productQty = item.productStock?.price * item.quantity;
        return (
          <div
            key={item.id}
            className="flex flex-col md:flex-row items-center mb-8 border p-4 rounded-md shadow-md"
          >
            <div className="w-40 h-40 mb-4 md:mb-0">
              <img
                loading="lazy"
                src={item.productItem?.staticFile[0]?.img}
                alt=""
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col p-4 w-full  ">
              <div className="md:w-2/3 flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl font-bold mb-2">
                    {item.productItem?.product?.name}
                  </h3>
                  <div className="mb-2 flex">
                    <strong>Tổng tiền</strong>
                    <div className="mx-2">
                      {" "}
                      <span>{formatPrice(item.productStock?.price)}</span>
                      <span className="mx-2">x {item.quantity}</span>{" "}
                      <span>= {formatPrice(productQty)}</span>
                    </div>
                  </div>
                  <div className="my-2 flex ">
                    <strong>Phân loại</strong>
                    <span className="mx-2">
                      {item.productStock?.clothingSize !== null
                        ? clothingSizeLabels[item.productStock?.clothingSize]
                        : shoeSizeLabels[item.productStock?.shoeSize]}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l mr-2"
                  onClick={() =>
                    dispatch(
                      addToCart({
                        productItem: item.productItem,
                        productStock: item.productStock,
                        num: 1,
                      })
                    )
                  }
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
                <button
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-r mr-2"
                  onClick={() =>
                    dispatch(
                      decreaseQty({
                        productItem: item?.productItem,
                        productStock: item?.productStock,
                        num: 1,
                      })
                    )
                  }
                >
                  <i className="fa-solid fa-minus"></i>
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() =>
                    dispatch(deleteProduct({ productStock: item.productStock }))
                  }
                >
                  X
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default CartList;
