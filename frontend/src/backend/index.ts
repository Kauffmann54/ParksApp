export enum Parks {
  WaltDisneyWorldMagicKingdom = 'WaltDisneyWorldMagicKingdom',
  WaltDisneyWorldEpcot = 'WaltDisneyWorldEpcot',
  WaltDisneyWorldHollywoodStudios = 'WaltDisneyWorldHollywoodStudios',
  WaltDisneyWorldAnimalKingdom = 'WaltDisneyWorldAnimalKingdom',
  UniversalStudiosFlorida = 'UniversalStudiosFlorida',
  UniversalIslandsOfAdventure = 'UniversalIslandsOfAdventure',
}

// Access wait times by Promise
export const CheckWaitTimes = (parkSelected: Parks) => {
    
};

// const calculateDistance = () => {
//     var points = [
//         {
//           latitude: 28.355695,
//           longitude: -81.558891,
//           name: 'Star Tours – The Adventures Continue'
//         },
//         {
//           latitude: 28.354884,
//           longitude: -81.560457,
//           name: 'Star Wars: Rise of the Resistance'
//         },
//         {
//           latitude: 28.356653,
//           longitude: -81.562131,
//           name: 'Roundup Rodeo BBQ'
//         },
//         {
//           latitude: 28.357648,
//           longitude: -81.560297,
//           name: 'The Hollywood Brown Derby'
//         },
//         {
//           latitude: 28.356404,
//           longitude: -81.561894,
//           name: 'Toy Story Mania!'
//         },
//         {
//           latitude: 28.353889,
//           longitude: -81.561689,
//           name: 'Millennium Falcon: Smugglers Run'
//         },
//         {
//           latitude: 28.3566783801,
//           longitude: -81.5605667783,
//           name: "Mickey & Minnie's Runaway Railway"
//         },
//         {
//           latitude: 28.360035,
//           longitude: -81.560707,
//           name: "Lightning McQueen's Racing Academy"
//         },
//         {
//           latitude: 28.356316,
//           longitude: -81.559031,
//           name: 'Vacation Fun - An Original Animated Short with Mickey & Minnie'
//         },
//         {
//           latitude: 28.3550644708,
//           longitude: -81.5594643904,
//           name: 'Muppet*Vision 3D'
//         },
//         {
//           latitude: 28.359553,
//           longitude: -81.559772,
//           name: 'The Twilight Zone Tower of Terror™'
//         },
//         {
//           latitude: 28.355385,
//           longitude: -81.562379,
//           name: 'Alien Swirling Saucers'
//         },
//         {
//           latitude: 28.357611,
//           longitude: -81.558975,
//           name: 'Hollywood & Vine'
//         },
//         {
//           latitude: 28.357482,
//           longitude: -81.558808,
//           name: 'Tune-In Lounge'
//         },
//         {
//           latitude: 28.35686,
//           longitude: -81.560982,
//           name: 'Walt Disney Presents'
//         },
//         {
//           latitude: 28.357821,
//           longitude: -81.561061,
//           name: 'Star Wars Launch Bay Theater'
//         },
//         {
//           latitude: 28.357444,
//           longitude: -81.558881,
//           name: "50's Prime Time Café"
//         },
//         {
//           latitude: 28.356245,
//           longitude: -81.562786,
//           name: 'Slinky Dog Dash'
//         },
//         {
//           latitude: 28.359712,
//           longitude: -81.56059,
//           name: "Rock 'n' Roller Coaster Starring Aerosmith"
//         },
//         {
//           latitude: 28.357849,
//           longitude: -81.560996,
//           name: 'Star Wars Launch Bay'
//         },
//         {
//           latitude: 28.3559,
//           longitude: -81.559495,
//           name: 'Sci-Fi Dine-In Theater Restaurant'
//         },
//         {
//           latitude: 28.354095,
//           longitude: -81.562075,
//           name: "Oga's Cantina at the Walt Disney World Resort"
//         },
//         {
//           latitude: 28.354532,
//           longitude: -81.559012,
//           name: "Mama Melrose's Ristorante Italiano"
//         }
//       ]

//     for (var i = 0; i < points.length; i++) {
//         var dist = distance(points[i].latitude, points[i].longitude, points[i + 1].latitude, points[i + 1].longitude, 'M');
//         console.log(dist, points[i].name, points[i + 1].name);
//     }
// }



// const attractions = [
//     {
//       name: 'Star Tours – The Adventures Continue',
//       location: {
//         latitude: 28.355695,
//         longitude: -81.558891
//       },
//       waitTime: 0.5, // in hours
//       walkingTime: 0.1 // in hours
//     },
//     // Add other attractions here
//   ];
  
//   function calculateTravelTime(location1, location2) {
//     // Calculate travel time in hours using a formula
//     const distanceInKm = distance(location1.latitude, location1.longitude, location2.latitude, location2.longitude, 'K');
//     const travelTimeInHours = distanceInKm / 5; // assuming walking speed of 5 km/hour
//     return travelTimeInHours;
//   }
  
//   function calculateTotalTime(attraction) {
//     const travelTime = calculateTravelTime(userLocation, attraction.location);
//     const totalWaitTime = attraction.waitTime + attraction.walkingTime;
//     const totalTime = travelTime + totalWaitTime;
//     return totalTime;
//   }
  
//   function getRecommendedAttraction() {
//     let recommendedAttraction = null;
//     let minTotalTime = Infinity;
  
//     for (let i = 0; i < attractions.length; i++) {
//       const attraction = attractions[i];
//       const totalTime = calculateTotalTime(attraction);
//       if (totalTime < minTotalTime) {
//         minTotalTime = totalTime;
//         recommendedAttraction = attraction;
//       }
//     }
  
//     return recommendedAttraction;
//   }
  
//   // Example usage
//   const userLocation = { latitude: 28.357943, longitude: -81.561149 }; // replace with actual user location
//   const recommendedAttraction = getRecommendedAttraction();
//   console.log(`Recommended attraction: ${recommendedAttraction.name}`);



// // you can also call GetOpeningTimes on themeparks objects to get park opening hours


// /////// SORT BY RECOMMENDATION
// const attractions2 = [
//     { name: 'Space Mountain', isFavorite: true, priority: 2, waitTime: 20, distance: 1.2 },
//     { name: 'Splash Mountain', isFavorite: false, priority: 1, waitTime: 10, distance: 0.8 },
//     { name: 'Haunted Mansion', isFavorite: true, priority: 3, waitTime: 15, distance: 1.5 },
//     { name: 'Big Thunder Mountain Railroad', isFavorite: false, priority: 2, waitTime: 25, distance: 1.8 },
//     { name: 'Pirates of the Caribbean', isFavorite: false, priority: 1, waitTime: 30, distance: 2.2 },
//   ];
  
//   const sortedAttractions = attractions2.sort((a, b) => {
//     // Sort by whether the attraction is marked as a favorite
//     if (b.isFavorite - a.isFavorite !== 0) {
//       return b.isFavorite - a.isFavorite;
//     }
  
//     // Sort by priority level
//     if (b.priority - a.priority !== 0) {
//       return b.priority - a.priority;
//     }
  
//     // Sort by wait time
//     if (a.waitTime - b.waitTime !== 0) {
//       return a.waitTime - b.waitTime;
//     }
  
//     // Sort by distance
//     return a.distance - b.distance;
//   });
  
//   console.log(sortedAttractions);