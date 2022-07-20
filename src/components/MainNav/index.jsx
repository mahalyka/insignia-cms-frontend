import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout';
import PaidIcon from '@mui/icons-material/Paid';
import PersonIcon from '@mui/icons-material/Person';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import DashboardIcon from '@mui/icons-material/Dashboard';

export default function MainNav({ open }) {
  const navigate = useNavigate()
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const routeMap = [
    {
      id: 1,
      label: 'Dashboard',
      href: '/dashboard',
      icon: <DashboardIcon />
    },
    {
      id: 2,
      label: 'Customer',
      href: '/customer',
      icon: <PersonIcon />
    },
    {
      id: 3,
      label: 'Travel Package',
      href: '/package',
      icon: <Inventory2Icon />
    },
    {
      id: 4,
      label: 'Order',
      href: '/order',
      icon: <PaidIcon />
    }

  ]

  const handleNavigate = (href, index) => {
    navigate(href, { replace: true })
    setSelectedIndex(index)
  }

  const handleLogout = () => {
    navigate('/login', { replace: true })
  }


  return (
    <>
      <List>
        {routeMap.map((text, index) => (
          <ListItem
            key={text.id}
            disablePadding
            sx={{ display: 'block' }}
            selected={selectedIndex === index}
          >
            <ListItemButton
              onClick={(e) => handleNavigate(text.href, index)}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {text.icon}
              </ListItemIcon>
              <ListItemText primary={text.label} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider />
        <ListItem
          disablePadding
          sx={{ display: 'block' }}
        >
          <ListItemButton
            onClick={handleLogout}
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary='Log out' sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  )
}
