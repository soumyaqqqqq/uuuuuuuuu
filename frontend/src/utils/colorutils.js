export function getFillColor(cases) {
  return cases > 10000000 ? '#001f3f' :
         cases > 9000000  ? '#002b5c' :
         cases > 8000000  ? '#003d7a' :
         cases > 7000000  ? '#005299' :
         cases > 6000000  ? '#0066b2' :
         cases > 5000000  ? '#1a75ff' :
         cases > 4000000  ? '#4d94ff' :
         cases > 3000000  ? '#80b3ff' :
         cases > 2000000  ? '#b3d1ff' :
         cases > 1000000  ? '#cce5ff' :
         cases > 750000   ? '#d6ebff' :
         cases > 500000   ? '#e0f0ff' :
         cases > 250000   ? '#ebf5ff' :
         cases > 100000   ? '#f5faff' :
         cases > 0        ? '#f9fdff' :
                            '#ffffff';
}
