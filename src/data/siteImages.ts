/**
 * Logistics stock imagery (Pexels). Each numeric ID is checked against the Pexels photo title.
 * This file maps **distinct scenes** per section so the site does not reuse the same shot everywhere.
 */
function px(id: number, width: number = 1000) {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
}

/* Verified titles (Pexels): vehicle / highway / fleet / trailers only */
const truckWhiteRoad = 6940962; /* White Truck on Road */
const semiVolvoRoad = 2199293; /* White Volvo Semi-truck on Side of Road */
const freightTruckColor = 172074; /* Blue and Red Freight Truck on Road */
const trailersEnclosed = 1267325; /* Three White Enclosed Trailers */
const truckSunset = 27855399; /* Truck on road, sun setting */
const trucksParkedYard = 1606957; /* Motor Vehicles Parked on the Road */
const freewayTraffic = 210115; /* Vehicle Driving on Freeway */
const truckMotionBlur = 11262203; /* Photo of a Truck on the Road */
const truckCurvedRoad = 13667595; /* Truck on the Road */
const highwayCloudy = 13682891; /* Scenic View of the Highway Under Cloudy Sky */
const tankerMountainRoad = 28226737; /* Tanker truck on mountain road (Pexels) */

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
    /** Parked-yard / staging — not the same three-trailer shot as Home “Store & distribute” */
    warehouse: px(trucksParkedYard, 900),
    linehaul: px(highwayCloudy, 900),
  },

  contactAside: px(semiVolvoRoad, 1000),

  /** Homepage “On the road & on the job” — distinct scenes from the hero banner */
  homeOnTheRoad: {
    fleet: px(semiVolvoRoad, 1200),
    yard: px(trailersEnclosed, 1200),
  },

  /**
   * Services grid: each URL is unique (no repeats on /services).
   * Scenes differ from home focus cards (freight color / trailers / sunset) where possible.
   */
  services: {
    localFreight: px(truckCurvedRoad),
    dcc: px(semiVolvoRoad),
    warehouse: px(trailersEnclosed),
    lastMile: px(trucksParkedYard),
    specialized: px(tankerMountainRoad),
    moving: px(truckWhiteRoad),
    sameDay: px(freewayTraffic),
    linehaul: px(highwayCloudy),
  },
} as const;
