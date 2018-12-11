# exxir2

### Fix the navigation. 

-- The links to “About” “Team” “Ethos” “Approach” and “Contact” do not work. 

### Intro video 

--It is supposed to play for all new site vistors. Which it does. 
The problem with it is that currently it only starts after user scrolls slightly, it should start immediately after the video is done loading 

### Scroll Arrow.

-- Should be positioned relative to the viewport bottom, and when clicked should scroll user to the top of the grid, and header menu should do it’s animated opening 

### Keep Html organized + load header and footer on each page without having to repeat code on each page

-- Clicking each link on the page opens a new page. We want to keep the html organized so that each page is a different html file. 
  * About.html 
  * Contact.html
  * Creative1.html
  * Development1.html
  * Hospitality1.html
  * Management1.html
  * Creative2.html
  * Development2.html
  * Hospitality2.html
  * Management2.html
  * Creative3.html
  * etc.html
  * etc.html

#### -- The Header and Footer should exist on all pages.. Those elements should not need to be included in each .html file which they currently are.!!


## Organize CSS 
please remove LESS
and please separate the css for mobile and desktop stlyes into different files 



### Define and array and use for navigation arrows

The pages that open when the user clicks a grid image e.g. creative1.html have left right arrows, these navigate users to next and previous pages. Currently these are hardcoded, as you can see here. 

https://gyazo.com/e79a45be844903b02b8b8ddfc8d240f2

Using javascript, we want to be able to define an ordered list of pages, that would look something like this:

* 0 = creative1.html
* 1= creative2.hmtl
* 2=development1.html
* 3=development2.hmtl
* 4=development3.html
* 5=cat.html
* 6=dog.html

## NOTES
please DO NOT use Bootstrap or any other CSS framwork
please DO NOT use LESS or SASS... we only want normal CSS .
thank you 



