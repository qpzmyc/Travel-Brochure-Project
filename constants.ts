import { MonthData, Attraction, Source, TrigEquation } from './types';

// Data Source: Climate-Data.org & Weather Spark for Montreal
export const MONTH_DATA: MonthData[] = [
  { month: 'Jan', monthIndex: 1, temp: -9.7, sunlight: 9.1 },
  { month: 'Feb', monthIndex: 2, temp: -7.7, sunlight: 10.5 },
  { month: 'Mar', monthIndex: 3, temp: -2.0, sunlight: 12.0 },
  { month: 'Apr', monthIndex: 4, temp: 6.4, sunlight: 13.6 },
  { month: 'May', monthIndex: 5, temp: 13.5, sunlight: 15.0 },
  { month: 'Jun', monthIndex: 6, temp: 18.8, sunlight: 15.7 },
  { month: 'Jul', monthIndex: 7, temp: 21.2, sunlight: 15.3 },
  { month: 'Aug', monthIndex: 8, temp: 20.1, sunlight: 14.0 },
  { month: 'Sep', monthIndex: 9, temp: 15.3, sunlight: 12.5 },
  { month: 'Oct', monthIndex: 10, temp: 8.6, sunlight: 10.9 },
  { month: 'Nov', monthIndex: 11, temp: 1.8, sunlight: 9.5 },
  { month: 'Dec', monthIndex: 12, temp: -6.3, sunlight: 8.7 },
];

export const ATTRACTIONS: Attraction[] = [
  {
    id: 'old-port',
    name: 'Old Port of Montreal',
    image: 'https://res.cloudinary.com/dqmiqekxl/image/upload/w_1200,h_630,c_auto,f_auto/reportages/vieux_port_de_montreal_11122023_1',
    description: 'A historic riverfront complex offering recreational activities, science centers, and beautiful views of the St. Lawrence River.',
    bestMonthIndex: 6, // July
    mathRelation: 'Located at the peak of the temperature curve (x=7), this outdoor venue is best enjoyed when f(x) ≈ 21.2°C, maximizing comfort for walking tours.',
  },
  {
    id: 'mt-royal',
    name: 'Mount Royal Park',
    image: 'https://a.travel-assets.com/findyours-php/viewfinder/images/res70/541000/541262-montreal.jpg',
    description: 'The green lung of the city, designed by Frederick Law Olmsted. Perfect for hiking in summer and snowshoeing in winter.',
    bestMonthIndex: 9, // October
    mathRelation: 'Best visited when sunlight hours g(x) ≈ 11h (Oct). The lower angle of the sun creates stunning fall foliage contrast, while avoiding the summer heat peak.',
  },
  {
    id: 'underground',
    name: 'RÉSO (Underground City)',
    image: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-720x480/10/6f/57/41.jpg',
    description: 'A vast network of pedestrian corridors connecting metro stations and shopping centers, essential for Montreal life.',
    bestMonthIndex: 0, // January
    mathRelation: 'Ideal when the temperature function hits its global minimum at f(1) ≈ -9.7°C. The sine wave trough dictates indoor exploration.',
  }
];

export const SOURCES: Source[] = [
  { name: 'Climate-Data.org', url: 'https://en.climate-data.org/north-america/canada/quebec/montreal-58/' },
  { name: 'Weather Spark', url: 'https://weatherspark.com/y/25077/Average-Weather-in-Montreal-Canada-Year-Round' },
  { name: 'Tourisme Montréal', url: 'https://www.mtl.org/en' }
];

// Calculated Model Parameters
// Temp: Min ~-10, Max ~21. Amp = 15.5, Vert = 5.5.
// Sunlight: Min ~8.7, Max ~15.7. Amp = 3.5, Vert = 12.2.
export const TEMP_EQUATION: TrigEquation = {
  type: 'cosine',
  A: 15.5,
  B: 0.52, // pi/6 approx
  C: 7,
  D: 5.75,
  label: 'y = 15.5 cos(π/6(x - 7)) + 5.75'
};

export const SUN_EQUATION: TrigEquation = {
  type: 'sine',
  A: 3.5,
  B: 0.52,
  C: 3, // Shifted to match sine starting point for peak at 6
  D: 12.2,
  label: 'y = 3.5 sin(π/6(x - 3)) + 12.2'
};