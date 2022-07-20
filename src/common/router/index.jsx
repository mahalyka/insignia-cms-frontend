import React from "react";
import {
  Routes,
  Route,
  BrowserRouter,
  // Link,
  Navigate,
  Outlet
} from "react-router-dom";
import { SysObj } from '../../common/collections/system.js'
import {
  Homepage,
  Login,
  Customer,
  Package,
  Order
} from "../../pages";
import {
  AppBar,
} from "../../components";


const Private = () => {
  return <div></div>
}

export default function PageRouter() {


  function PrivateLayoutComponent() {
    const auth = useAuth();
    return auth
      ? <React.Fragment>
        <AppBar >
          <Outlet />
        </AppBar>
      </React.Fragment>
      : <Navigate to="/login" />;
  }

  return (
    <BrowserRouter basename={`${SysObj.SETTINGS.BASE_BLANK_PREFIX}/`}>
      <Routes>
        <Route exact path={`/`} element={<PrivateLayoutComponent />}>
          <Route path={`/dashboard`} element={<Homepage />} />
          <Route path={`/customer`} element={<Customer />} />
          <Route path={`/order`} element={<Order />} />
          <Route path={`/package`} element={<Package />} />
        </Route>
        <Route path={`/login`} element={<Login />} />

        <Route
          path="/test"
          element={
            <PrivateRoute>
              <Private />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

function PrivateRoute({ children }) {
  const auth = useAuth();
  return auth ? children : <Navigate to="/login" />;
}

function useAuth() {
  return true;
}
