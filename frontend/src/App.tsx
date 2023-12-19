
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './pages/auth/user/Register';
import Login from './pages/auth/user/Login';
import ActivationPage from './pages/auth/user/ActivationPage';
import Home from './pages/Home';
import ShopLogin from './pages/auth/shop/ShopLogin';
import ShopRegister from './pages/auth/shop/ShopRegister';
import ShopActivation from './pages/auth/shop/ShopActivation';


function App() {
	
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/activation/:activationToken" element={<ActivationPage />} />
				
				<Route path='/shop/login' element={<ShopLogin />} />
				<Route path='/shop/register' element={<ShopRegister />} />
				<Route path='/shop/activation/:activationToken' element={<ShopActivation />} />
				<Route path="/" index element={<Home />} />
				{/* <Route path='/product' element={<PrivateRoute><Products /></PrivateRoute>} /> */}
			</Routes>

			<ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
			/>
		</BrowserRouter>
	);
}

export default App;
