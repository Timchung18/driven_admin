import './App.css';
import BarChartContainer from './components/paymentSuccessRateBarChart';
import LineGraph from './components/driversLineGraph';

function App() {
  return (
    <div className="App">
      <BarChartContainer />
      <LineGraph />
    </div>
  );
}

export default App;
