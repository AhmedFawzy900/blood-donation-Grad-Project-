import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";
const Sidebar = () => {
  const logout = () =>{
    localStorage.removeItem('Admin');
  }
  return (
    <div
    className="sidebar"
    style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#1787e0">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/car/dashboard"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            MediTour
          </a>
        </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/car/dashboard" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/car/dashboard/requests" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table">Requests</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/car/dashboard/login" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="arrow-circle-left" onclick={()=>logout()}>Logout</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
};
export default Sidebar;
