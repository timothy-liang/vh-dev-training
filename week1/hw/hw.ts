/* eslint-disable */ // just to prevent it from annoying us forever
import fetch, { RequestInit } from 'node-fetch';

// TODO: make typescript declaration for module
let HttpsProxyAgent = require('https-proxy-agent');

// to call this function, you'll need to do two things
// 1st, the function that is called in must have the keyword "async" before the parameters
// 2nd when you call it, you must preface it with "await"
// like in the below example

interface HackerRecord {
	name: string;
	score: number;
	spots: number;
	spotted: number;
	invalidated: number;
	unique: number;
	id: string;
}

const getDataFromAPI = (url: string): Promise<HackerRecord[]> => {
	let req: RequestInit = {};
	if (process.env.HTTP_PROXY) {
		req.agent = new HttpsProxyAgent(process.env.HTTP_PROXY);
	}
	return new Promise((res, rej) => {
		fetch(url, req)
			.then(data => data.json())
			.then(json => {
				// the json variable here is just the stuff you see in the browser
				res(json);
			})
			.catch(err => rej(err));
	});
};

// all these parantheses and braces creates and instantly calls a function.
// This is known as an Instantly Invoked Function Expression (IIFE).
// It has a lot of uses but in this case, since await can only be used in async functions, it's needed
// (async () => {
// 	console.log(await getDataFromAPI('https://spot.benc.me/?time=1549939921')); // sample call - delete before you submit
// })();

// write your homework here
const objectively = async () => {
	console.log(console);

	// put all this in your "objectively" function after you make it
	const whatAmI = { 0: 'A', 1: 'B', 2: 'C', 3: 'D' };

	const getNthByUnique = async (n: number): Promise<HackerRecord> => {
		let data = await getDataFromAPI('https://spot.benc.me/?time=1549939921');
		return data.sort((a, b) => {
			let uniqueDifference = b.unique - a.unique;
			return uniqueDifference != 0 ? uniqueDifference : b.score - a.score;
		})[n - 1];
	};

	console.log(await getNthByUnique(3));
};

(async () => await objectively())();

const awry = async () => {
	// put this stuff in your "awry" function after you make it
	const docTester = [];
	// fill docTester with 1000 random integers between 0 and 99
	for (let i = 0; i < 1000; i++) docTester[i] = Math.floor(Math.random() * 100);
	console.log(docTester); // uncomment this to see the array logged

	let docTesterIndex: number[] = [];
	docTester.forEach((element, index) => (docTesterIndex[index] = element + index));
	console.log(docTesterIndex);

	docTester.map((element, index) => (docTesterIndex[index] = element + index));
	console.log(docTesterIndex);

	console.log(docTesterIndex.reduce((accumulator, element) => (accumulator += element), 0));

	const getNthByUniqueFiltered = async (n: number): Promise<HackerRecord> => {
		let data = await getDataFromAPI('https://spot.benc.me/?time=1549939921');
		return data
			.filter(element => element.spotted == 0 || element.spotted >= 3)
			.sort((a, b) => {
				let uniqueDifference = b.unique - a.unique;
				return uniqueDifference != 0 ? uniqueDifference : b.score - a.score;
			})[n - 1];
	};

	console.log(await getNthByUniqueFiltered(3));
};

(async () => await awry())();
