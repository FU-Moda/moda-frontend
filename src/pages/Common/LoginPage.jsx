import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Button, Checkbox } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase.config";
import {
  activeAccount,
  getAccountById,
  googleCallback,
  loginWithEmailPass,
  submitOTPResetPass,
} from "../../api/accountApi";
import { toast } from "react-toastify";
import { decode } from "../../utils/jwtUtil";
import { login } from "../../redux/features/authSlice";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { getShopByAccountId } from "../../api/shopApi";
import { setShop } from "../../redux/features/shopSlice";
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain at least one special character (!@#$%^&*(),.?":{}|<>)'
    ),
});
const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isModalForgotPasswordVisible, setIsModalForgotPasswordVisible] =
    useState(false);
  const { user } = useSelector((state) => state.user || {});
  const dispatch = useDispatch();
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const handleOtpSubmit = async (otp) => {
    console.log("Submitted OTP:", otp);
    const result = await activeAccount(email, otp);
    if (result.isSuccess) {
      toast.success("Verify successfully");
      setIsModalVisible(false);
      setIsSignUp(false);
    }
  };
  const handleForgotSubmit = async (data) => {
    console.log(data);
    const result = await submitOTPResetPass(
      data.email,
      data.recoveryCode,
      data.newPassword
    );
    if (result.isSuccess) {
      toast.success("Reset password successfully");
    } else {
      for (var i = 0; i < result.messages.length; i++) {
        toast.error(result.messages[i]);
      }
    }
    setIsModalForgotPasswordVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleForgotCancel = () => {
    setIsModalForgotPasswordVisible(false);
  };
  const showOtpModal = () => {
    setIsModalVisible(true);
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    const userCred = await signInWithPopup(auth, googleProvider);
    console.log("userCred: ", userCred);

    if (userCred) {
      const accessToken = userCred._tokenResponse.idToken;
      console.log("Google Access Token: ", accessToken);
      var result = await googleCallback(accessToken);
      if (result.isSuccess) {
        console.log("callback: ", result);
        localStorage.setItem("accessToken", result?.result?.token);
        localStorage.setItem("refreshToken", result?.result?.refreshToken);
        var fetchAccount = await getAccountById(
          decode(localStorage.getItem("accessToken")).accountId,
          localStorage.getItem("accessToken")
        );
        if (fetchAccount.isSuccess) {
          const userAccount = fetchAccount.result?.account;
          console.log(userAccount);
          const shopData = await getShopByAccountId(userAccount.id);
          if (shopData.isSuccess) {
            dispatch(login(userAccount));
            dispatch(setShop(shopData.result.items[0]));
            toast.success("Đăng nhập thành công");
            navigate("/");
          }
        }
      }
    }
    setIsLoading(false);
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);
  return (
    <>
      <LoadingComponent isLoading={isLoading} />
      <div className="flex items-center justify-center min-h-screen bg-base2">
        <div className="relative flex flex-col m-6 space-y-8 shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          <div className="flex flex-col justify-center p-8 md:p-14">
            <span className="mb-3 text-4xl font-bold">MODA</span>
            <span className="font-light text-gray-400 mb-8">
              Bạn vui lòng nhập các thông tin chi tiết để đăng nhập
            </span>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={LoginSchema}
              onSubmit={async (values, { setSubmitting }) => {
                try {
                  setIsLoading(true);
                  const data = await loginWithEmailPass(
                    values.email,
                    values.password
                  );
                  if (data.isSuccess) {
                    localStorage.setItem("accessToken", data.result.token);
                    localStorage.setItem(
                      "refreshToken",
                      data.result.refreshToken
                    );
                    var fetchAccount = await getAccountById(
                      decode(localStorage.getItem("accessToken")).accountId,
                      localStorage.getItem("accessToken")
                    );
                    if (fetchAccount.isSuccess) {
                      const userAccount = fetchAccount.result?.account;
                      console.log(userAccount);
                      const shopData = await getShopByAccountId(userAccount.id);
                      if (shopData.isSuccess) {
                        dispatch(login(userAccount));
                        dispatch(setShop(shopData.result.items[0]));
                        toast.success("Đăng nhập thành công");
                        navigate("/");
                      }
                    }
                  } else {
                    for (var i = 0; i < data.messages.length; i++) {
                      toast.error(data.messages[i]);
                      if (data.messages[i] == "The account is not verified !") {
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
                      as={Input}
                      prefix={<MailOutlined />}
                      placeholder="Email của bạn"
                    />
                    {errors.email && touched.email && (
                      <div className="text-red-500">{errors.email}</div>
                    )}
                  </div>
                  <div className="py-4">
                    <span className="mb-2 text-md">Mật khẩu</span>
                    <Field
                      className="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
                      type="password"
                      name="password"
                      as={Input.Password}
                      prefix={<LockOutlined />}
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
                  <div className="flex justify-between w-full py-4  mr-24">
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => setIsModalForgotPasswordVisible(true)}
                      className=" text-md w-full block text-baseGreen italic"
                    >
                      Quên mật khẩu?
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="w-full mb-6 inline-block  px-4 py-2  text-xs text-center font-semibold leading-6 text-white bg-primary rounded-lg transition duration-200"
                    disabled={isSubmitting}
                  >
                    {" "}
                    Đăng nhập
                  </button>
                  <Button className="w-full mb-6" onClick={handleGoogleSignIn}>
                    <i className="fa-brands fa-google mx-2"></i> Đăng nhập với
                    Google
                  </Button>
                  <div className="text-center text-gray-400">
                    Bạn chưa có tài khoản?
                    <a
                      style={{ cursor: "pointer" }}
                      className="font-bold text-black hover:text-baseGreen"
                      onClick={() => setIsSignUp(true)}
                    >
                      {" "}
                      Đăng kí ở đây
                    </a>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className="relative">
            <img
              src="https://media.istockphoto.com/id/1151606826/vi/anh/n%E1%BB%99i-th%E1%BA%A5t-c%E1%BB%A7a-c%E1%BB%ADa-h%C3%A0ng-qu%E1%BA%A7n-%C3%A1o-th%E1%BB%9Di-trang-v%E1%BB%9Bi-qu%E1%BA%A7n-%C3%A1o-ph%E1%BB%A5-n%E1%BB%AF-kh%C3%A1c-nhau-tr%C3%AAn-m%C3%B3c-%C3%A1o-v%E1%BB%9Bi-nhi%E1%BB%81u-m%C3%A0u.jpg?s=170667a&w=0&k=20&c=8Otm5d6hO00u1ZcTjxeeiMwRwQYpHjwCcgvDvrUipQc="
              alt="img"
              className="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
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
    </>
  );
};

export default LoginPage;
