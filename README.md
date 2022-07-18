# Assignment

## Description

We'd like you to create a small weather dashboard where the user can:
 - Input one or more cities (though an autocomplete or selection from a list)
 - View the current temperature and weather conditions of each the cities (in a list or a grid or anything, also an icon would be nice)
 - Favorite one or more cities so when they visit the app again the temperatures for those cities will be there (with updated info)

## Installation

 - Clone or download the project
 - Run `npm install`
 - Run `ng serve` for the dev server
 - Add API key to environment file
 - Navigate to `http://localhost:4200/`

# Development

 - The `src/app/data/cities.ts` contains a list of hardcoded city data (the model is in  `src/app/models/city.ts`) 
 - In the `src/app/models/api` there are some interfaces that model the API responses

## Weather API info

 - Docs: `https://openweathermap.org/current`
 - Icons: `https://openweathermap.org/weather-conditions`

### Have fun :)


# Features
- A list of all cities
- Add a city to list 
- Remove a city from list
- Add a favourite
- To check favourites added, refresh. If no favourites, then all cities are included in the list. 


# Notes

- API key added with an interceptor
- One parent component (list), one child component (search). Search component emits the selected city to parent and parent updates the list. 
- Material modules in a grouped module
- City preferences stored to local storage. If we need this to be persistent across browsers and/or not only on a particular machine, then this information should come from the db
- Used cities `src/app/models/city.ts` as the list of the cities available to users



# Improvements
- Handle multiple API calls (one for each city) better as screen jumps (results are returned one after the other). Rxjs combining operator??
- Sync list of cities (available for selection) with list. - remove what is already in the list meaning if all cities are shown then search list should be empty
- More testing on adding cities that are already in the list. 
- App has not been tested for all cases. Bugs are there surely. 


