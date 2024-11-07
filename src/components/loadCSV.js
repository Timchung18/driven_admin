import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import axios from 'axios';

function CsvViewer() {
  const [data, setData] = useState([]);
  const [columnSums, setColumnSums] = useState({});

  useEffect(() => {
    // Fetch the CSV file using Axios
    axios.get('/joined_tickets_installments.csv')
      .then((response) => {
        Papa.parse(response.data, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const parsedData = result.data;
            setData(parsedData);
            calculateSums(parsedData);
          },
        });
      })
      .catch((error) => console.error('Error fetching the CSV file:', error));
  }, []);

  const calculateSums = (parsedData) => {
    if (parsedData.length === 0) return;

    // Initialize sums for each numeric column
    let sums = {};
    const keys = Object.keys(parsedData[0]);
    keys.forEach((key) => {
      sums[key] = 0;
    });
    const keyToProcess = ["overdue_charge_amount", "is_overdue", ]
    // Calculate the sum for each column that contains numeric data
    parsedData.forEach((row) => {
      keys.forEach((key) => {
        if (!isNaN(row[key]) && row[key] !== '') {
          sums[key] += parseFloat(row[key]);
        }
      });
    });

    setColumnSums(sums);
  };

  return (
    <div>
      {data.length > 0 && (
        <div>
          <h3>CSV Data</h3>
          <table border="1">
            <thead>
              <tr>
                {Object.keys(data[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, idx) => (
                    <td key={idx}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <h3>Column Sums</h3>
          <ul>
            {Object.keys(columnSums).map((key) => (
              <li key={key}>
                {key}: {columnSums[key]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CsvViewer;
