const UserInfo = ({ user }) => {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex items-center mb-2">
          <span className="font-semibold mr-2">Tên khách hàng:</span>
          <span>{`${user?.firstName} ${user.lastName}`}</span>
        </div>
        <div className="flex items-center mb-2">
          <span className="font-semibold mr-2">Email:</span>
          <span>{user?.email}</span>
        </div>
        <div className="flex items-center mb-2">
          <span className="font-semibold mr-2">Số điện thoại:</span>
          <span>{user?.phoneNumber}</span>
        </div>
        <div className="flex items-center mb-2">
          <span className="font-semibold mr-2">Giới tính:</span>
          <span>{user?.gender ? "Nam" : "Nữ"}</span>
        </div>
        <div className="flex items-center">
          <span className="font-semibold mr-2">Địa chỉ:</span>
          <span>{user?.address}</span>
        </div>
      </div>
    </>
  );
};
export default UserInfo;
