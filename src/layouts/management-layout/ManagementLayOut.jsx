import { Outlet } from "react-router-dom";
import ManagementHeader from "../../components/management-components/Header/ManagementHeader";
import SideBar from "../../components/management-components/Sidebar/Sidebar";
const ManagementLayOut = () => {
  return (
    <>
      <div className="flex flex-col h-screen">
        <ManagementHeader />

        <div className="flex flex-row flex-1">
          <SideBar />

          <div class="container p-4 shadow-lg my-10 rounded-4xl">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
export default ManagementLayOut;
