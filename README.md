## Available Scripts

Make sure you installed everything with
### `npm run install`
In the project directory, you can run:

### `npm run dev`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
If port 3000 is already being used in your machine you can alter it on the `vite.config.ts` file by changing the port value on line 8.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Runs the test suite for the filter action and the dropdown, button and table components on your terminal

### `npm run test:cov`

Also run s the test suite but also gives some insight regarding the test coverage for a statements, branches, functions and lines.

## General Thoughts on the Project

I've decided to utilize React and Typescript as my main tools for the development of this project as they are my most common used "tech stack". For the general configuration of the application I've used Vite, instead of Create React App, because the esbuild bundler which it comes with is much faster than the Webpack used in CRA and the configuration needed for Vite is a lot smaller. Not only that but the CRA pipeline has been left out of latest versions of React as of April 21st, 2022. Another tool that could be used similar to Vite , but not with the same responsibilities and perks is Next. I felt like Next would be a bit overkill for this project, since I wouldn't be using any of its great benefits ( SSR, Routing, built-in backend, etc.); if the project had a bigger scope or would continue along, I believe that Next would be the optimal tool.

As a whole I've used 9 hours to finalize this project, how this period is broken down is as follows:
 -> 1 hour for documentation;
 -> 30 minutes for general project and repository configuration;
 -> 1 hour and a half for testing configuration and test construction;
 -> 5 hours for general development of the project, adding main functionalities;
 -> 1 hours for manual testing and bug fixing;

During the project I had as a goal to try and separate responsibilities between components, main page and any utilities scripts. Since it is a small project I didn't feel like there was a need to utilize React's Context API ( or any other state management library) in order to control the general state of the application. For that I used only a couple of `useState`  hooks; however, in order to not have too much "prop drilling" I left the number of component layers to a minimal. An example of that is how I handled the filtering section:

Instead of prop drilling the filtering logic for 3 layers of components I've decided to render most of the filtering section inside `App.tsx`  and have the communication with the Table component be a bit more straight. The counterpart to this decision is having the codebase for the main page a bit bigger. Nonetheless, I've created a `utils.ts` file to move most of the filtering logic from the `App.tsx` to make everything a bit more organized.

Now, talking about the filtering logic I've separated the relevant information inside a `data.json` file in 3 parts: properties, products and operators. The code for the table as well as the selectors are equipped to handle a change on the products and properties arrays. Moreover, the operator logic was divided in operators that needed a `property value` to be compared to and those who don't need it.  A small remark is that due to not using any third-party libraries for the Dropdowns the `is any of` operator needs to have a separate click behavior; the user needs to  push the command or ctrl key while clicking on the desired option in order to the multiple select component to read more than one chosen value.

Finally, regarding the testing of the application I've decided to utilize `Jest` together with `react-testing-library`  for the sake of being able to test some components atomically but their functionalities and end result as well.  The flow that was tested is the filter a category with an equal operator and a specific value; the hypothesis tested is that using the aforementioned filter the count of table rows would diminish, and be reseted with the use of the "clear" button.

If any questions are left after reading this documentation and testing the application first hand I'be glad to talk about them on our feedback meeting.

--

# Product Filtering Condition Editor UI
A Coding Exercise for UI Developers

# Introduction

Many capabilities of Salsify are built around filtered sets of products. Products at Salsify consist of properties and their values. Properties have a datatype.

In order to create filtered sets of products in Salsify we created a condition editor. This editor is used to build a filter that Salsify applies to the full set of products. The resulting set of products, presented as a list, is updated as filters are added or changed.

In order to create a filter users must choose a property, an operator, and one or more values. Due to the differences in property datatypes, not all operators apply to all properties.

To complete this exercise please build a user interface to create a filter and update a list of products to reflect the results. Use the exercise to demonstrate not only a solution to the problem but your approach to software design and testing.

Provide us with an archive containing the results of your work and a README file with a guided tour of your work, notes on your development process, how long you spent on the exercise, what assumptions you made, etc.  If you wish, this may also be presented as a live site.  In that case simply provide a link to the site and the README file mentioned above.

# Specification

This repository contains a mock `datastore` which includes sample products, property definitions including data types, and the complete set of filter operator. Using this datastore please create a web user interface with the following behavior:

* A user can create a single filter
* Filters have the form `[property] [operator] [property value]`
* Creating or updating a filter causes the the list of products to update
* A user can clear the filter to see all products

Included are [wireframes](http://salsify.github.io/condition-editor-coding-exercise/docs/wireframe.pdf) to illustrate a potential implementation. Feel free to approach this solution in the manner you see fit, but keep in mind we will evaluate your submission more on software design than user experience.

# Tips and Recommendations
- No other Operators or data types will be introduced; they are static.
- Properties and Products vary from customer to customer, you cannot depend on having the same properties or products available each time this application loads

## Properties Types/Operators

Operators define the relationship between properties and property values. Certain operators are only valid for certain property types. The behavior of each operator and the valid operators for each property type are defined as follows:

| Operator | Description |
-----------|--------------
| Equals   | Value exactly matches |
| Is greater than | Value is greater than |
| Is less than  | Value is less than |
| Has any value | Value is present |
| Has no value  | Value is absent  |
| Is any of     | Value exactly matches one of several values |
| Contains      | Value contains the specified text |


| Property Type | Valid Operators |
---------------- | ----------------
| string | Equals |
| | Has any value |
| | Has no value |
| | Is any of |
| | Contains |
| number | Equals |
| | Is greater than |
| | Is less than |
| | Has any value |
| | Has no value |
| | Is any of |
| enumerated | equals |
| | Has any value |
| | Has no value |
| | Is any of |

### Examples

Here are some example property & input combinations and a description of their expected output. This table is meant to further clarify the expected behavior of the aforementioned operators.

| Operator | Example Property | Example Value | Expected Output |
| -------- | ---------------- | ------------------- | --------------- |
| Equals | `Name` | `Headphones` | Products where `Name` is exactly `Headphones` |
| Is greater than | `Price` | `20` | Products where the `Price` > `20` |
| Is less than | `Price` | `20` | Products where `Price` < `20` |
| Has any value | `Description` | --- | Products where `Description` is defined/is NOT null |
| Has no value | `Description` | --- | Products where the `Description` is not defined/IS null |
| Is any of | `Name` | `Headphones, Keys` | Products where the Name is either exactly `Headphones` OR exactly `Keys` |
| Contains | `Name` | `phone` | Products where the Name string CONTAINS `phone` (e.g. `Headphones`, `Telephone`, `Cell Phone`, `Phone`) |

