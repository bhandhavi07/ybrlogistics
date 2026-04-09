/**
 * Logistics stock imagery (Pexels). Each numeric ID is checked against the Pexels photo title.
 * Homepage “Our Work” and /services cards use **disjoint** scenes so the same shot is not repeated across those areas.
 */
function px(id: number, width: number = 1000) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
}

/* Verified titles (Pexels): vehicles / highway / fleet / moving — use for comments only */
const truckWhiteRoad = 6940962; /* White Truck on Road — hero only */
const semiVolvoRoad = 2199293; /* White Volvo Semi-truck */
const freightTruckColor = 172074; /* Blue and Red Freight Truck on Road */
const trailersEnclosed = 1267325; /* Three White Enclosed Trailers */
const truckSunset = 27855399; /* Truck on road, sun setting */
const trucksParkedYard = 1606957; /* Motor Vehicles Parked on the Road */
const freewayTraffic = 210115; /* Vehicle Driving on Freeway */
const truckMotionBlur = 11262203; /* Photo of a Truck on the Road */
const truckCurvedRoad = 13667595; /* Truck on the Road */
const highwayCloudy = 13682891; /* Scenic View of the Highway Under Cloudy Sky */
const tankerMountainRoad = 28226737; /* Tanker truck on mountain road */
/** Red semi-trucks on desert highway — distinct from hero white truck */
const redTrucksHighway = 11087830;
/** Movers carrying boxes indoors — residential moving, distinct from “Our Work” truck/yard shots */
const moversIndoorBoxes = 7464232;

export const siteImages = {
  heroBanner: px(truckWhiteRoad, 1920),
  heroCard: px(semiVolvoRoad, 1200),
  splitWarehouse: px(trucksParkedYard, 1200),
  splitRoute: px(freewayTraffic, 1200),

  aboutMain: px(truckMotionBlur, 1600),

  homeFocus: {
    freight: px(freightTruckColor, 1000),
    storage: px(trailersEnclosed, 1000),
    urgent: px(truckSunset, 1000),
  },

  aboutGallery: {
    intermodal: px(freewayTraffic, 900),
    warehouse: px(trucksParkedYard, 900),
    linehaul: px(highwayCloudy, 900),
  },

  contactAside: px(semiVolvoRoad, 1000),

  homeOnTheRoad: {
    fleet: px(semiVolvoRoad, 1200),
    yard: px(trailersEnclosed, 1200),
  },

  /**
   * Homepage “Our Work” — scenes **not** reused on /services cards (see services.*).
   */
  homeOurWork: {
    truck: px(redTrucksHighway, 1200),
    moving: px(moversIndoorBoxes, 1200),
    logistics: px(tankerMountainRoad, 1200),
  },

  /**
   * Services grid — each URL unique on /services and **not** the same file as homeOurWork.*.
   */
  services: {
    localFreight: px(truckMotionBlur),
    dcc: px(semiVolvoRoad),
    warehouse: px(trailersEnclosed),
    lastMile: px(trucksParkedYard),
    specialized: px(freightTruckColor),
    moving: px(truckCurvedRoad),
    sameDay: px(freewayTraffic),
    linehaul: px(highwayCloudy),
  },
} as const;
