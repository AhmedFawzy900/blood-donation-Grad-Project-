import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import MarkAsUnreadOutlinedIcon from "@mui/icons-material/MarkAsUnreadOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import logo2 from "../images/logo_2.png";
import { useNavigate } from "react-router";
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];
function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };
  return (
    <AppBar className="navbar" position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img src={logo2} className="lg-logo" alt="logo" />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={(e) => navigate("/home")}>
                <Typography textAlign="center">
                  <HomeOutlinedIcon /> Home
                </Typography>
              </MenuItem>
              <MenuItem onClick={(e) => navigate("/bloodRequst")}>
                <Typography textAlign="center">
                  <PersonSearchOutlinedIcon /> Find Donor
                </Typography>
              </MenuItem>
              <MenuItem>
                <Typography textAlign="center" onClick={(e) => navigate("/requests")}>
                  <MarkAsUnreadOutlinedIcon /> Requests
                </Typography>
              </MenuItem>
              {currentUser.type === "user" && (  
              <MenuItem>
                <Typography
                  textAlign="center"
                  onClick={(e) => navigate("/donate")}
                >
                  <BloodtypeIcon /> Donate
                </Typography>
              </MenuItem>
              )}
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img src={logo2} className="sm-logo" alt="logo" />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <MenuItem>
              <Typography onClick={(e) => navigate("/home")} textAlign="center">
                <HomeOutlinedIcon />
                Home
              </Typography>
            </MenuItem>
            <MenuItem>
              <Typography
                onClick={(e) => navigate("/bloodRequst")}
                textAlign="center"
              >
                <PersonSearchOutlinedIcon />
                Find Donor
              </Typography>
            </MenuItem>
            <MenuItem>
              <Typography
                textAlign="center"
                onClick={(e) => navigate("/requests")}
              >
                <MarkAsUnreadOutlinedIcon />
                Requests
              </Typography>
            </MenuItem>
            {currentUser.type === "user" && (  
              <MenuItem>
                <Typography
                  textAlign="center"
                  onClick={(e) => navigate("/donate")}
                >
                  <BloodtypeIcon />
                  Donate
                </Typography>
              </MenuItem>
              )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
                <AccountCircleOutlinedIcon style={{ "font-size": "35px" }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={() => navigate("/profile")}>
                <Typography textAlign="center">Profile</Typography>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
