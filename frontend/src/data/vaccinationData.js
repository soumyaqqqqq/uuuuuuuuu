export const topStatesVaccination = {
  labels: ['Maharashtra', 'UP', 'Bihar', 'MP', 'Tamil Nadu', 'Karnataka', 'Rajasthan', 'Gujarat', 'WB', 'AP'],
  datasets: [{
    label: 'Vaccinated (in Millions)',
    data: [30, 27, 25, 20, 18, 16, 14, 13, 12, 11],
    backgroundColor: '#7c3aed',
  }]
};

export const vaccinationPie = {
  labels: ['Vaccinated', 'Not Vaccinated'],
  datasets: [{
    data: [75, 25],
    backgroundColor: ['#10b981', '#facc15'],
  }]
};

export const infectedPie = {
  labels: ['Infected', 'Healthy'],
  datasets: [{
    data: [15, 85],
    backgroundColor: ['#ef4444', '#60a5fa'],
  }]
};

export const vaccineInfectionTrend = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Vaccinated',
      data: [5, 10, 15, 20, 25, 30],
      borderColor: '#22c55e',
      fill: false,
      tension: 0.4,
    },
    {
      label: 'Infected',
      data: [20, 18, 16, 14, 12, 10],
      borderColor: '#f43f5e',
      fill: false,
      tension: 0.4,
    }
  ]
};
