import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Browse from './pages/browse/Browse';
import Search from './pages/search/Search';
import ApiProvider from './store/api-provider';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyAl233ueYIhzQujpUy4f6abccBO5trAzr0',
	authDomain: 'react-movie-app-66a93.firebaseapp.com',
	projectId: 'react-movie-app-66a93',
	storageBucket: 'react-movie-app-66a93.appspot.com',
	messagingSenderId: '184626921105',
	appId: '1:184626921105:web:f4a2efa13a3b4c32db8930',
};

// Initialize Firebase
// eslint-disable-next-line
const app = initializeApp(firebaseConfig);

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<ApiProvider>
				<Browse />
			</ApiProvider>
		),
	},
	{
		path: '/search',
		element: (
			<ApiProvider>
				<Search />
			</ApiProvider>
		),
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
