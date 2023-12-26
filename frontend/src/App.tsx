
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
import ShopProtectedRoute from './routes/ShopProtectedRoute';
import ShopDashboard from './pages/shop/Dashboard';
import NotFound from './components/NotFound';
import ShopCreateProduct from './pages/shop/CreateProduct';
import ShopAllProducts from './pages/shop/AllProducts';
import ProductDetails from './pages/product/ProductDetails';
import Products from './pages/product/Products';
import BestSelling from './pages/product/BestSelling';
import TestSocket from './pages/TestSocket';



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

				<Route path='/shop/dashboard' element={
					<ShopProtectedRoute>
						<ShopDashboard />
					</ShopProtectedRoute>
				} />

				<Route
					path="/shop/dashboard-products"
					element={
						<ShopProtectedRoute>
							<ShopAllProducts />
						</ShopProtectedRoute>
					}
				/>

				<Route
					path="/dashboard/create-product"
					element={
						<ShopProtectedRoute>
							<ShopCreateProduct />
						</ShopProtectedRoute>
					}
				/>

				<Route path='/test-socket' element={<TestSocket />} />
				<Route path='/products' element={<Products />} />
				<Route path='/best-selling' element={<BestSelling />} />
				<Route path='/product/:id' element={<ProductDetails />} />


				<Route path="/" index element={<Home />} />
				<Route path="*" element={<NotFound />} />
				
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
