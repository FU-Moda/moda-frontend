import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { createShopAccount } from "../../../api/shopApi";
import { toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import LoadingComponent from "../../../components/LoadingComponent/LoadingComponent";
import OtpModal from "../../Common/Account/OtpModal";

const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email("Vui lòng nhập đúng định dạng email")
    .required("Bắt buộc nhập email"),
  firstName: Yup.string().required("Bắt buộc nhập họ"),
  lastName: Yup.string().required("Bắt buộc nhập tên"),
  password: Yup.string()
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .required("Bắt buộc nhập mật khẩu"),
  gender: Yup.boolean().required("Bắt buộc chọn giới tính"),
  phoneNumber: Yup.string().required("Bắt buộc nhập số điện thoại"),
  shopName: Yup.string().required("Bắt buộc nhập tên cửa hàng"),
  description: Yup.string().required("Bắt buộc nhập mô tả"),
  address: Yup.string().required("Bắt buộc nhập địa chỉ"),
});

const SignUpShop = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const handleOtpSubmit = async (otp) => {
    console.log("Submitted OTP:", otp);
    const result = await activeAccount(email, otp);
    if (result.isSuccess) {
      toast.success("Verify successfully");
      setIsModalVisible(false);
      setIsSignUp(false);
    }
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <LoadingComponent isLoading={isLoading} />
      <div className="flex items-center justify-center min-h-screen bg-base2">
        <div className="relative flex flex-col m-6 space-y-8 shadow-2xl rounded-2xl md:flex-row md:space-y-0 md:w-2/3 lg:w-3/4">
          <div className="flex flex-col justify-center p-8 md:p-14 md:w-1/2 ">
            <span className="mb-3 text-4xl font-bold">MODA</span>
            <span className="font-light text-gray-400 mb-8">
              Bạn vui lòng nhập các thông tin chi tiết để đăng ký cửa hàng
            </span>
            <Formik
              initialValues={{
                email: "",
                firstName: "",
                lastName: "",
                password: "",
                gender: true,
                phoneNumber: "",
                shopName: "",
                description: "",
                address: "",
              }}
              validationSchema={SignUpSchema}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  setSubmitting(true);
                  setIsLoading(true);
                  const dataSend = {
                    email: values.email,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    password: values.password,
                    gender: values.gender === "true" ? true : false,
                    phoneNumber: values.phoneNumber,
                    shopName: values.shopName,
                    description: values.description,
                    address: values.address,
                  };
                  const data = await createShopAccount(dataSend);
                  if (data.isSuccess) {
                    toast.success("Tạo tài khoản shop thành công !");
                  } else {
                    for (var i = 0; i < data.messages.length; i++) {
                      toast.error(data.messages[i]);
                      if (data.messages[i] == "Tài khoản chưa được xác thực") {
                        setEmail(values.email);
                        setIsModalVisible(true);
                      }
                    }
                  }
                } catch (err) {
                  console.error(err);
                } finally {
                  setIsLoading(false);
                }
              }}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form>
                  <div className="py-4">
                    <span className="mb-2 text-md">Email</span>
                    <Field
                      className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                      type="email"
                      name="email"
                      placeholder="Email của bạn"
                    />
                    {errors.email && touched.email && (
                      <div className="text-red-500">{errors.email}</div>
                    )}
                  </div>

                  <div className="py-4">
                    <span className="mb-2 text-md">Họ</span>
                    <Field
                      className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                      type="text"
                      name="firstName"
                      placeholder="Họ của bạn"
                    />
                    {errors.firstName && touched.firstName && (
                      <div className="text-red-500">{errors.firstName}</div>
                    )}
                  </div>

                  <div className="py-4">
                    <span className="mb-2 text-md">Tên</span>
                    <Field
                      className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                      type="text"
                      name="lastName"
                      placeholder="Tên của bạn"
                    />
                    {errors.lastName && touched.lastName && (
                      <div className="text-red-500">{errors.lastName}</div>
                    )}
                  </div>

                  <div className="py-4">
                    <span className="mb-2 text-md">Mật khẩu</span>
                    <Field
                      className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                      type="password"
                      name="password"
                      placeholder="Mật khẩu của bạn"
                    />
                    {errors.password && touched.password && (
                      <div
                        className="text-red-500"
                        style={{ fontSize: "0.75rem", marginTop: "0.25rem" }}
                      >
                        {errors.password}
                      </div>
                    )}
                  </div>
                  <div className="py-4 my-1">
                    <span className=" text-md">Giới tính</span>
                    <div role="group" aria-labelledby="checkbox-group">
                      <label>
                        <Field type="radio" name="gender" value="true" />
                        Nam
                      </label>
                      <label className="mx-2">
                        <Field type="radio" name="gender" value="false" />
                        Nữ
                      </label>
                    </div>
                    {errors.gender && touched.gender && (
                      <div className="text-red-500">{errors.gender}</div>
                    )}
                  </div>

                  <div className="py-4">
                    <span className="mb-2 text-md">Số điện thoại</span>
                    <Field
                      className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                      type="text"
                      name="phoneNumber"
                      placeholder="Số điện thoại của bạn"
                    />
                    {errors.phoneNumber && touched.phoneNumber && (
                      <div className="text-red-500">{errors.phoneNumber}</div>
                    )}
                  </div>
                  <div className="py-4">
                    <span className="mb-2 text-md">Tên cửa hàng</span>
                    <Field
                      className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                      type="text"
                      name="shopName"
                      placeholder="Tên cửa hàng của bạn"
                    />
                    {errors.shopName && touched.shopName && (
                      <div className="text-red-500">{errors.shopName}</div>
                    )}
                  </div>
                  <div className="py-4">
                    <span className="mb-2 text-md">Mô tả</span>
                    <Field
                      component="textarea"
                      className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                      name="description"
                      placeholder="Mô tả về cửa hàng của bạn"
                    />
                    {errors.description && touched.description && (
                      <div className="text-red-500">{errors.description}</div>
                    )}
                  </div>
                  <div className="py-4">
                    <span className="mb-2 text-md">Địa chỉ</span>
                    <Field
                      className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                      type="text"
                      name="address"
                      placeholder="Địa chỉ cửa hàng của bạn"
                    />
                    {errors.address && touched.address && (
                      <div className="text-red-500">{errors.address}</div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full mb-6 inline-block px-4 py-2 text-xs text-center font-semibold leading-6 text-white bg-primary rounded-lg transition duration-200"
                    disabled={isSubmitting}
                  >
                    Đăng ký
                  </button>

                  <div className="text-center text-gray-400">
                    Bạn đã có tài khoản?
                    <NavLink
                      style={{ cursor: "pointer" }}
                      className="font-bold text-black "
                      to={"/login"}
                    >
                      {" "}
                      Đăng nhập ở đây
                    </NavLink>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className="relative w-full md:w-1/2">
            <img
              src="https://media.istockphoto.com/id/1151606826/vi/anh/n%E1%BB%99i-th%E1%BA%A5t-c%E1%BB%A7a-c%E1%BB%ADa-h%C3%A0ng-qu%E1%BA%A7n-%C3%A1o-th%E1%BB%9Di-trang-v%E1%BB%9Bi-qu%E1%BA%A7n-%C3%A1o-ph%E1%BB%A5-n%E1%BB%AF-kh%C3%A1c-nhau-tr%C3%AAn-m%C3%B3c-%C3%A1o-v%E1%BB%9Bi-nhi%E1%BB%81u-m%C3%A0u.jpg?s=170667a&w=0&k=20&c=8Otm5d6hO00u1ZcTjxeeiMwRwQYpHjwCcgvDvrUipQc="
              alt="img"
              className="w-full h-full hidden rounded-r-2xl md:block object-cover"
            />
            <div className="absolute hidden bottom-10 right-6 p-6 bg-white bg-opacity-40 backdrop-blur-sm rounded drop-shadow-lg md:block">
              <span className="text-black italic text-xl">
                Moda
                <br />
                Đem lại cho bạn trải nghiệm mua sắm vô cùng tiện lợi.
                <br />
                Giải pháp mua đồ 2nd tại thị trường Việt Nam
              </span>
            </div>
          </div>
        </div>
      </div>
      <OtpModal
        visible={isModalVisible}
        onCancel={handleCancel}
        onOtpSubmit={handleOtpSubmit}
        email={email}
      />
    </>
  );
};

export default SignUpShop;
