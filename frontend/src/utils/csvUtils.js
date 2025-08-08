// Utility to fetch and parse CSV data for charts
import Papa from 'papaparse';

export async function fetchIndiaCasesCSV() {
  const response = await fetch('/model/india_cases.csv');
  const csvText = await response.text();
  return Papa.parse(csvText, { header: true, skipEmptyLines: true }).data;
}
