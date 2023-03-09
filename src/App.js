import './App.css';
import React, { useState } from 'react';
import Histogram from 'react-chart-histogram';

function App() {
	const [state, setState] = useState({makeHistogram: false, x: [], y: []});

	let contentFetched, splitText, result, wordsArr = [], xLabel = [], yLabel = [], arr2 = [], topFreqData;
  	const options = { fillColor: 'skyblue', strokeColor: 'skyblue' };
    const handleClick = async() => {
		setState({makeHistogram: false, x: [],y: []});

		await fetch('https://cors-anywhere-deploy.up.railway.app/https://terriblytinytales.com/test.txt')
		.then(response => response.text())
		.then((text) => contentFetched = text)
		.catch(err => console.log("err: ", err))

		splitText = contentFetched.replace(/(?:\r\n|\r|\n|\t|[,?/.()@_>]|[-]|[0-9].)/g, ' ').toLowerCase().split(" ");
		splitText = splitText.filter(function(word) { return word.trim() !== '';})
		splitText.map((word) => {
			wordsArr = [...wordsArr, {"word": word}]
		}) 
		
		result = wordsArr.reduce( (acc, o) => (acc[o.word] = (acc[o.word] || 0) + 1, acc), {} );
		
		Object.entries(result).map((item) => {
			arr2 = [...arr2, {"word": item[0], "count": item[1]}]
		})
		arr2.sort((a,b) => b.count - a.count)

		topFreqData = arr2.slice(0,20);

		topFreqData.map((item) => {
			xLabel.push(item.word); yLabel.push(item.count);
		})
		
		setState({makeHistogram: true, x: xLabel, y: yLabel});
	}
	
	
  return ( 
    <div className = "App">
		<h1></h1>
		<button onClick = {handleClick} className="submit-btn">Submit 🚀</button>
		<div className='histSection'>
			{state.makeHistogram ? <>
			<Histogram 
			xLabels={state.x}
			yValues={state.y}
			className = "histogram"
			width='1601'
			height='550'
			options={options} />
		</>
		: null}
		</div>
    </div>
  );
}

export default App;
