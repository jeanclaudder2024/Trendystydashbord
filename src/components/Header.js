import { useNavigate, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Avatar,
} from "@mui/material";
import {
 AttachFile as PagesIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import Logo from "../assets/Trendysty-Logo.png"
export default function Header() {

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <AppBar
      position="sticky"
      elevation={1}
      sx={{ backgroundColor: "white", color: "#9A1C25" }}
    >
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
          <Avatar src={Logo} alt="Logo" sx={{ width: 70, height: 70, mr: 2 }} />
        <Link to="/dashboard"  style={{color:"#9A1C25",textDecoration:"none"}}><Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
            Dashboard
          </Typography></Link> 
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        <IconButton color="inherit" sx={{ mr: 1 }}>
          <Link to="/pages"   style={{color:"#9A1C25",textDecoration:"none"}}>
            {" "}
            <PagesIcon />
          </Link>
        </IconButton>
        <Button
          color="inherit"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{ textTransform: "none" }}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
