/**
 * mockApi.ts
 *
 * All camp data and search behavior is isolated here.
 * Replace these three async functions with real API calls
 * and the rest of the UI will work without modification.
 */

import type { Camp, Filters, SearchResult } from './types';

const CAMPS: Camp[] = [
  {
    id: 1,
    name: 'Junior Robotics Lab',
    host: 'Bellevue College',
    activity: 'STEM',
    tags: ['Robotics', 'Coding'],
    ages: 'Ages 7–10',
    dates: 'July 13–17',
    schedule: '9:00 AM – 3:30 PM',
    price: 475,
    location: 'Bellevue, WA',
    zip: '98007',
    distance: '3.2 mi',
    extendedCare: 'Late pickup until 5:30 PM',
    popularity: 'Popular with Seattle parents',
    registrationOpen: true,
    image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600&h=360&fit=crop&auto=format',
    description: 'Students build and program real robots using LEGO Mindstorms and Scratch. Each day introduces new challenges: obstacle courses, sorting machines, and team competitions. No prior experience needed.',
    sessions: [
      { label: 'Session 1', dates: 'June 22–26' },
      { label: 'Session 2', dates: 'July 13–17' },
      { label: 'Session 3', dates: 'August 3–7' },
    ],
    dropoff: '8:45–9:00 AM',
    sourceUrl: 'https://www.bellevuecollege.edu/youth',
    lat: 47.6101,
    lng: -122.2015,
  },
  {
    id: 2,
    name: 'Young Coders Bootcamp',
    host: 'Seattle Academy',
    activity: 'STEM',
    tags: ['Coding', 'Python'],
    ages: 'Ages 8–12',
    dates: 'July 6–10',
    schedule: '9:00 AM – 4:00 PM',
    price: 525,
    location: 'Seattle, WA',
    zip: '98112',
    distance: '5.8 mi',
    extendedCare: 'Late pickup until 5:00 PM',
    popularity: 'Saved by 89 parents',
    registrationOpen: true,
    image: 'https://images.unsplash.com/photo-1603356033288-acfcb54801e6?w=600&h=360&fit=crop&auto=format',
    description: 'Campers learn Python fundamentals by building real projects — from simple games to basic web pages. Instructors from the Seattle tech community mentor small groups throughout the week.',
    sessions: [
      { label: 'Session 1', dates: 'July 6–10' },
      { label: 'Session 2', dates: 'July 27–31' },
    ],
    dropoff: '8:50–9:00 AM',
    sourceUrl: 'https://www.seattleacademy.org/summer',
    lat: 47.6319,
    lng: -122.3130,
  },
  {
    id: 3,
    name: 'Science Discovery Week',
    host: 'University of Washington',
    activity: 'STEM',
    tags: ['Science', 'Lab Work'],
    ages: 'Ages 9–13',
    dates: 'July 20–24',
    schedule: '9:00 AM – 3:00 PM',
    price: 395,
    location: 'Seattle, WA',
    zip: '98195',
    distance: '7.1 mi',
    extendedCare: null,
    popularity: null,
    registrationOpen: true,
    image: 'https://images.unsplash.com/photo-1532094349884-543559173eff?w=600&h=360&fit=crop&auto=format',
    description: 'Led by UW graduate students, campers conduct real lab experiments in chemistry, biology, and physics. Tours of research facilities included.',
    sessions: [
      { label: 'Session 1', dates: 'July 20–24' },
      { label: 'Session 2', dates: 'August 10–14' },
    ],
    dropoff: '8:45–9:00 AM',
    sourceUrl: 'https://www.washington.edu/youngscholars',
    lat: 47.6553,
    lng: -122.3035,
  },
  {
    id: 4,
    name: 'Elite Tennis Academy',
    host: 'Lakeside School',
    activity: 'Sports',
    tags: ['Tennis'],
    ages: 'Ages 6–14',
    dates: 'June 29 – July 3',
    schedule: '9:00 AM – 12:00 PM',
    price: 320,
    location: 'Seattle, WA',
    zip: '98125',
    distance: '6.4 mi',
    extendedCare: null,
    popularity: 'Most saved this week',
    registrationOpen: true,
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600&h=360&fit=crop&auto=format',
    description: 'Small-group tennis instruction for beginners through intermediate players. USTA-certified instructors. Rackets available to borrow.',
    sessions: [
      { label: 'Session 1', dates: 'June 29 – July 3' },
      { label: 'Session 2', dates: 'July 13–17' },
      { label: 'Session 3', dates: 'July 27–31' },
    ],
    dropoff: '8:50–9:00 AM',
    sourceUrl: 'https://www.lakesideschool.org/summer',
    lat: 47.7189,
    lng: -122.2978,
  },
  {
    id: 5,
    name: 'Creative Arts Studio',
    host: 'Kirkland Arts Center',
    activity: 'Art',
    tags: ['Painting', 'Sculpture'],
    ages: 'Ages 7–11',
    dates: 'July 13–17',
    schedule: '9:30 AM – 3:30 PM',
    price: 285,
    location: 'Kirkland, WA',
    zip: '98033',
    distance: '4.9 mi',
    extendedCare: 'Late pickup until 5:00 PM (+$60)',
    popularity: null,
    registrationOpen: true,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=360&fit=crop&auto=format',
    description: 'A full week of exploration through painting, collage, ceramics, and printmaking. All materials included. A final gallery showing on Friday afternoon for families.',
    sessions: [
      { label: 'Session 1', dates: 'July 13–17' },
      { label: 'Session 2', dates: 'August 3–7' },
    ],
    dropoff: '9:20–9:30 AM',
    sourceUrl: 'https://www.kirklandartscenter.org',
    lat: 47.6815,
    lng: -122.2087,
  },
  {
    id: 6,
    name: 'Arena Soccer Camp',
    host: 'Arena Sports',
    activity: 'Sports',
    tags: ['Soccer'],
    ages: 'Ages 5–12',
    dates: 'June 22–26',
    schedule: '9:00 AM – 4:00 PM',
    price: 349,
    location: 'Redmond, WA',
    zip: '98052',
    distance: '8.3 mi',
    extendedCare: 'Late pickup until 6:00 PM',
    popularity: 'Popular with parents of 6–9 year olds',
    registrationOpen: false,
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&h=360&fit=crop&auto=format',
    description: 'Indoor and outdoor training from experienced coaches. Skill drills, small-sided games, and a Friday tournament. Snacks provided.',
    sessions: [
      { label: 'Session 1', dates: 'June 22–26' },
      { label: 'Session 2', dates: 'July 6–10' },
      { label: 'Session 3', dates: 'July 20–24' },
      { label: 'Session 4', dates: 'August 3–7' },
    ],
    dropoff: '8:45–9:00 AM',
    sourceUrl: 'https://www.arenasports.net/camps',
    lat: 47.6740,
    lng: -122.1215,
  },
  {
    id: 7,
    name: 'Nature Explorers Camp',
    host: 'Issaquah Alps Trails Club',
    activity: 'Outdoors',
    tags: ['Hiking', 'Nature'],
    ages: 'Ages 8–13',
    dates: 'July 27–31',
    schedule: '8:30 AM – 3:00 PM',
    price: 310,
    location: 'Issaquah, WA',
    zip: '98027',
    distance: '12.1 mi',
    extendedCare: null,
    popularity: null,
    registrationOpen: true,
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&h=360&fit=crop&auto=format',
    description: 'Guided hikes in the Issaquah Alps teach ecology, wildlife tracking, and wilderness skills. Each day explores a different trail with a naturalist guide.',
    sessions: [
      { label: 'Session 1', dates: 'July 6–10' },
      { label: 'Session 2', dates: 'July 27–31' },
    ],
    dropoff: '8:20–8:30 AM',
    sourceUrl: 'https://www.issaquahalps.org/youth',
    lat: 47.5301,
    lng: -122.0326,
  },
  {
    id: 8,
    name: 'Junior Chef Academy',
    host: 'Sur La Table',
    activity: 'Cooking',
    tags: ['Cooking', 'Baking'],
    ages: 'Ages 9–14',
    dates: 'August 3–7',
    schedule: '10:00 AM – 1:00 PM',
    price: 425,
    location: 'Bellevue, WA',
    zip: '98004',
    distance: '2.8 mi',
    extendedCare: null,
    popularity: 'Saved by 54 parents',
    registrationOpen: true,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=360&fit=crop&auto=format',
    description: 'Five days of hands-on cooking instruction covering global cuisines, knife skills, and baking fundamentals. Campers bring home recipes and a completed recipe journal.',
    sessions: [
      { label: 'Session 1', dates: 'August 3–7' },
      { label: 'Session 2', dates: 'August 17–21' },
    ],
    dropoff: '9:50–10:00 AM',
    sourceUrl: 'https://www.surlatable.com/cooking-classes/kids',
    lat: 47.6149,
    lng: -122.1918,
  },
];

/** Simulates network latency */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Search camps by natural-language query and structured filters.
 * Replace with a real API call: POST /api/search
 */
export async function searchCamps(query: string, filters: Filters = {}): Promise<SearchResult> {
  await delay(800);

  const q = query.toLowerCase();
  let results = [...CAMPS];

  if (q) {
    results = results.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.host.toLowerCase().includes(q) ||
      c.activity.toLowerCase().includes(q) ||
      c.tags.some(t => t.toLowerCase().includes(q)) ||
      c.location.toLowerCase().includes(q) ||
      c.zip.includes(q)
    );
  }

  if (filters.activity) {
    results = results.filter(c => c.activity.toLowerCase() === filters.activity!.toLowerCase());
  }
  if (filters.latePickup) {
    results = results.filter(c => c.extendedCare !== null);
  }
  if (filters.priceRange === 'under300') {
    results = results.filter(c => c.price < 300);
  } else if (filters.priceRange === '300-500') {
    results = results.filter(c => c.price >= 300 && c.price <= 500);
  } else if (filters.priceRange === '500plus') {
    results = results.filter(c => c.price > 500);
  }

  const summary = results.length > 0
    ? `I found ${results.length} camp${results.length === 1 ? '' : 's'} matching your search in the Seattle area. Here are the best matches.`
    : `No camps matched "${query}". Try broadening your search.`;

  return { summary, camps: results, total: results.length };
}

/**
 * Fetch a single camp by ID.
 * Replace with: GET /api/camps/:id
 */
export async function getCamp(id: number): Promise<Camp | null> {
  await delay(400);
  return CAMPS.find(c => c.id === id) ?? null;
}

/**
 * Fetch featured / trending camps for the homepage.
 * Replace with: GET /api/camps/featured
 */
export async function getFeaturedCamps(): Promise<Camp[]> {
  await delay(600);
  return CAMPS.slice(0, 6);
}
