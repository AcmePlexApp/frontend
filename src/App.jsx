/* React Imports, Setters/Getters*/
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import useMovieTheaterShowtime from "./hooks/useMovieTheaterShowtime";
import useNavTitle from "./hooks/useNavTitle";

/* Components */
import Nav from "./components/Nav";
import MovieList from "./components/MovieList";
import ProtectedRoute from "./components/ProtectedRoute";

/* Pages */
import Cart from "./pages/Cart";
import MyAccount from "./pages/MyAccount";
import Login from "./pages/Login";
import MovieDetail from "./pages/MovieDetail";
import Movies from "./pages/Movies";
import Theaters from "./pages/Theaters";
import PageNotFound from "./pages/PageNotFound";
import Payment from "./pages/Payment";
import PaymentFail from "./pages/PaymentFail";
import PaymentSuccess from "./pages/PaymentSuccess";
import Premium from "./pages/Premium";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Seats from "./pages/Seats";
import Tickets from "./pages/Tickets"

/* Utils */
import { getMovies, mapTheatersAndShowtimes } from "./utils/APIUtils";

function App() {
	const { navTitle } = useNavTitle();
	const { data, setData } = useMovieTheaterShowtime();
	useEffect(() => {
		async function fetchAndMapData() {
			try {
				const movies = await getMovies();
				const mappedData = mapTheatersAndShowtimes(movies);
				console.log("Mapped data:", mappedData);
				setData(mappedData);
			} catch (error) {
				console.error("Failed to fetch and map data:", error);
			}
		}

		fetchAndMapData();
	}, [setData]);

	return (
		<Routes>
			<Route path="/" element={<Navigate to={"/movies"} />} />
			<Route
				path="/movies"
				element={
					<Nav title={"Browse Movies"}>
						<Movies>
							<MovieList movies={Object.values(data.movies)} />
						</Movies>
					</Nav>
				}
			/>
			<Route
				path="/movies/:movieId"
				element={
					<Nav title={navTitle}>
						<MovieDetail />
					</Nav>
				}
			/>
			<Route
				path="/theaters"
				element={
					<Nav title={"Browse Theaters"}>
						<Theaters />
					</Nav>
				}
			/>
			<Route
				path="/theaters/:theaterId"
				element={
					<Nav title={"Browse Showtimes for Theatre "}>
						<Theaters />
					</Nav>
				}
			/>
			<Route
				path="/showtimes/:showtimeId"
				element={
					<Nav title={"Browse Seats"}>
						<Seats />
					</Nav>
				}
			/>
			<Route
				path="/profile"
				element={
					<ProtectedRoute>
					<Nav title={"Profile"}>
						<Profile></Profile>
					</Nav>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/cart"
				element={
					<Nav title={"Your Cart"}>
						<Cart />
					</Nav>
				}
			/>
			<Route
				path="/payment"
				element={
					<ProtectedRoute>
					<Nav title={"Enter Your Credit Card Information"}>
						<Payment></Payment>
					</Nav>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/register"
				element={
					<Nav title={"Sign Up for AcmePlex"}>
						<Register></Register>
					</Nav>
				}
			/>
			<Route
				path="/login"
				element={
					<Nav title={"Login"}>
						<Login />
					</Nav>
				}
			/>
			<Route
				path="/payment/success"
				element={
					<ProtectedRoute>
					<Nav>
						<PaymentSuccess />
					</Nav>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/payment/fail"
				element={
					<ProtectedRoute>
					<Nav>
						<PaymentFail />
					</Nav>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/profile/myaccount"
				element={
					<ProtectedRoute>
					<Nav>
						<MyAccount />
					</Nav>
					</ProtectedRoute>
				}
			/>
			<Route
				path="/profile/mytickets"
				element={
					<Nav>
					<ProtectedRoute>
						<Tickets />
					</ProtectedRoute>			
					</Nav>
				}
			/>
			<Route
				path="profile/premium"
				element={
					<Nav>
					<ProtectedRoute>
						<Premium />
					</ProtectedRoute>
					</Nav>
				}
			/>
			<Route
				path="*"
				element={
					<Nav title={"Page Not Found"}>
						<PageNotFound />
					</Nav>
				}
			/>
		</Routes>
	);
}

export default App;
