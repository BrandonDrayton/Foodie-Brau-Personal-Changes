# Foodie-Bräu

Foodie-Bräu is web application designed to search through different beers, add specific beers to a liked list, and to give food pairing recipes for a selected beer.

---

## Table of Content

1. Introduction
2. Contributors
3. Technologies
4. Installation
5. General Information
6. Acknowledgements

---

### Introduction

The Foodie-Bräu web app was created as part of a group front end project for the full time web development April 2022 cohort at Digital Crafts. The point of the project is to practice interacting with API databases, working with local storage, and html design an layout.

---

### Contributors

This project was created and coded by

- Brandon Drayton <https://github.com/BrandonDrayton>

- Kyle Huskey <https://github.com/kdhuskey>

- Ryan McMillan <https://github.com/rlmcmillan12>

---

### Technologies

- Bootstrap
- JavaScript
- HTML
- CSS
- API Databases
  - Punk API <https://punkapi.com/>
  - EDAMAM Recipe Search API <https://api.edamam.com/>

---

### Installation

To run this web app start first by cloning the repository locally

```
% git clone git@github.com:BrandonDrayton/Foodie-Brau.git
```

Make sure node and npm are installed
<https://docs.npmjs.com/downloading-and-installing-node-js-and-npm>

This project is not stored on a public server. You must open with a development server such as Live Server <https://www.npmjs.com/package/live-server>

With Live Server open the application starting at foodie-brau.html

---

### General Information

This project is a beer and food pairing web application. Once the foodie-brau.html is opened via the developers server you will be on the main page. On load it will display 6 random beers. It has a header that can take you to a the pairing page or your liked beer page. Below is a short simple introduction, and then the search bar is below. You can search beers by name or by using any or all of the select box parameters. THe tiles on the page have a picture of the beer and a short description. You will also see a pairs with button, thumbs up, and a thumbs down. Clicking the pairs with button will take you to the pairing page. Clicking thumbs down will remove the card and add the beer to a local storage list that will not allow the beer to be come up in future searches. Clicking the thumbs up button will store the beer in a liked list on local storage.

The pairing page can be accessed by either clicking on the pairing link in the header or the pairs with button on any beer card. If accessed by the pairing link there will be a random beer rendered to the page and the recipes for that beer. The recipes are found using food pairings provided on each beer from the beer API. The pairings are then searched in the recipe API. When the recipe link buttons are clicked it will take you to a new tab instead of changing the page.

The liked list can be accessed by clicking the link in the page header. Any liked beers will be displayed there, or it will be empty if no beers have been liked. Also instead of having a thumbs up and down there is now a red x. This will remove the beer from the liked list in local storage and remove the card from the page.

---

### Acknowledgements

Special thanks to Professor Lachlan Heywood <https://github.com/lachieh>
