import './App.css';
import React, { useState } from 'react';
import Histogram from 'react-chart-histogram';

function App() {
	// defining state 
	const [state, setState] = useState({makeHistogram: false, x: [], y: []});

	// variable initiation 
	let contentFetched, splitText, result, wordsArr = [], xLabel = [], yLabel = [], arr2 = [], topFreqData;

	// histogram color set 
  	const options = { fillColor: 'skyblue', strokeColor: 'skyblue' };
	
    const handleClick = async() => {
		// number occurences input check 
		let numOccurences = 20 
		let numOccurenceInput =  document.getElementById("input__text")
		if(numOccurenceInput.value) {
			numOccurences = numOccurenceInput.value
		}
		
		// state definition 
		setState({makeHistogram: false, x: [],y: []});
		
		// fetching plain text 
		await fetch('https://terriblytinytales.com/test.txt')
		.then(response => response.text())
		.then((text) => contentFetched = text)
		.catch(err => console.log("err: ", err))

		// text extraction 
		splitText = contentFetched.replace(/(?:\r\n|\r|\n|\t|[,?/.()@_>]|[-]|[0-9].)/g, ' ').toLowerCase().split(" ");
		splitText = splitText.filter(function(word) { return word.trim() !== '';})

		// character mapping 
		splitText.map((word) => (
			wordsArr = [...wordsArr, {"word": word}]
		)) 
		
		// characters count 
		result = wordsArr.reduce((acc, o) => {
			acc[o.word] = (acc[o.word] = acc[o.word] || 0) + 1;
			return acc; 
		}, {}); 
		Object.entries(result).map((item) => (
			arr2 = [...arr2, {"word": item[0], "count": item[1]}]
		))
		arr2.sort((a,b) => b.count - a.count)

		// character extraction as per user input 	
		topFreqData = arr2.slice(0,numOccurences);

		// x & y label update 
		topFreqData.map((item) => (
			xLabel.push(item.word)
		))
		topFreqData.map((item) => (
			yLabel.push(item.count) 
		))

		// state set 
		setState({makeHistogram: true, x: xLabel, y: yLabel});
	}
	
	
  return ( 
    <div id = "App">
		<h1>Word Histogram</h1>
		<h4>Find words occurences of <a href="https://terriblytinytales.com/test.txt" target="_blank" rel="noreferrer">file</a></h4>
		<div id="user__input">
			<p id="app__text">Find top occurences of <input type="text" id="input__text"/> characters</p>
		</div>
		<button 
			onClick = {handleClick} 
			id ="submit__btn">
				Submit 🚀
		</button>
		<div id='histSection'>
			{state.makeHistogram ? <>
				<Histogram 
					xLabels={state.x}
					yValues={state.y}
					id = "histogram"
					width='1600rem'
					height='550'
					options={options} />
				</>
			: null}
		</div>
    </div>
  );
}

export default App;
