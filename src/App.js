import './App.css';
import BarChartContainer from './components/paymentSuccessRateBarChart';
import LineGraph from './components/driversLineGraph';
import CsvViewer from './components/loadCSV';

function App() {
  return (
    <div className="App">
      <BarChartContainer />
      <LineGraph />
      <CsvViewer />
    </div>
  );
}

export default App;
