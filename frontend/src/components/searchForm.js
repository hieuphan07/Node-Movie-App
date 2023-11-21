import React, { Fragment, useState, useContext } from 'react';
import ApiContext from '../store/api-context';
import ResultList from './resultList';

import classes from './searchForm.module.css';

// Import assets
import GenreList from '../assets/genreList.json';
import TypeList from '../assets/mediaTypeList.json';

const SearchForm = () => {
	const apiCtx = useContext(ApiContext);

	const [text, setText] = useState('');
	const [genre, setGenre] = useState('Select genre');
	const [type, setType] = useState('Select Media Type');
	const [language, setLanguage] = useState('');
	const [year, setYear] = useState('');

	const [resultMovies, setResultMovies] = useState([]);

	const fetchSearchMovies = async () => {
		if (text) {
			const response = await fetch(
				`${apiCtx.localUrl}${apiCtx.requests.fetchSearch}&keywords=${text}`
			);
			if (!response.ok) throw new Error('Something went wrong!');
			const data = await response.json();
			return data;
		}
	};

	const getSearchMovies = async () => {
		const { results } = await fetchSearchMovies();
		let filterResults = results;

		if (genre !== 'Select genre') {
			filterResults = filterResults.filter((result) => {
				for (let i = 0; i < result['genre_ids'].length; i++) {
					if (result['genre_ids'][i] === parseInt(genre)) {
						return result;
					}
				}
			});
		}

		if (type !== 'Select Media Type') {
			filterResults = filterResults.filter(
				(result) => result['media_type'] === type
			);
		}

		if (language !== '') {
			filterResults = filterResults.filter(
				(result) => result['original_language'] === language
			);
		}

		if (year !== '') {
			filterResults = filterResults.filter(
				(result) =>
					new Date(result['release_date']).getFullYear() === parseInt(year)
			);
		}

		setResultMovies(filterResults);
	};

	const searchHanler = (event) => {
		event.preventDefault();
		if (text) {
			getSearchMovies();
		}
	};

	return (
		<Fragment>
			<div className={classes.formContainer}>
				<form className={classes.form} onSubmit={searchHanler}>
					<div className={classes.input}>
						<input
							className={classes.field}
							type='text'
							value={text}
							placeholder='Search'
							onChange={(e) => setText(e.target.value)}
						/>
						<svg
							className={classes.icon}
							fill='#ccc'
							aria-hidden='true'
							data-prefix='fas'
							data-icon='search'
							role='img'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 512 512'
						>
							<path d='M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z'></path>
						</svg>
					</div>
					<div className={classes.filter}>
						<select id='genre' onChange={(e) => setGenre(e.target.value)}>
							<option>Select genre</option>
							{GenreList.map((genre) => (
								<option key={String(genre.id)} value={genre.id}>
									{genre.name}
								</option>
							))}
						</select>
						<select id='mediaType' onChange={(e) => setType(e.target.value)}>
							<option>Select Media Type</option>
							{TypeList.map((type) => (
								<option key={type} value={type}>
									{type}
								</option>
							))}
						</select>
						<label htmlFor='language'>
							Language:
							<input
								id='language'
								placeholder='en, zh, ja, ko, pl, es, de, it ...'
								onChange={(e) => setLanguage(e.target.value)}
							/>
						</label>
						<label htmlFor='year'>
							Year:
							<input
								id='year'
								placeholder='2018'
								onChange={(e) => setYear(e.target.value)}
							/>
						</label>
					</div>
					<div className={classes.action}>
						<button
							type='reset'
							className={classes.reset}
							onClick={() => setText('')}
						>
							RESET
						</button>
						<button type='submit' className={classes.submit}>
							SEARCH
						</button>
					</div>
				</form>
			</div>
			<ResultList searchMovies={resultMovies} />
		</Fragment>
	);
};

export default SearchForm;
