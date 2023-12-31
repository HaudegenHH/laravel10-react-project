## create laravel project

- after installing the laravel installer globally you can create a new project with:
```sh
laravel new [project-name]
```

- in the .env change DB_CONNECTION to sqlite (and comment out host, port, etc
- then run the migrations
```sh
php artisan migrate
```
- with that a "database.sqlite" should have been created in the database folder

- spin up the backend server
```sh
php artisan serve
```

## create react project

- create the react frontend inside the laravel project
```sh
npm create vite@latest
```
During installation:
- as project name choose "react"
- as framework choose react
- choose normal javascript (instead of typescript)

-  then cd into the react folder and install all the dependencies
```sh
npm install
```

- then spin up the (frontend) vite server with
```sh
npm run dev
```
- which is running on port 5173 as default 
- to change the port open the package.json and change the script for running in dev-mode to:
```sh
"dev": "vite --port=3000"
```
---
- install the router
```sh
npm install react-router-dom
```
---

- change indent size in ".editorconfig"
```sh
[*.{js,jsx,css}]
intend_size = 2
```

- create a router.jsx and some routes inside (for: login, signup, dashboard and users)
- to use this Router you open main.jsx and paste in the RouterProvider with the router as props

## layouts

- login and signup will have the same layout
- for any site that requires the user to be logged in, will have its own layout (an admin panel type of layout)
- created under src/components/GuestLayout.jsx and DefaultLayout.jsx
- then create routes for both (Guest-and DefaultLayout), and the existing routes for Login, Signup and Users should become children of those
- Outlet finally is the place where the children will be rendered 


## authentication & state management 

- based on the information if the user is authenticated or not, you define which Layout/page should be rendered
- therefore you will need a state management to save the users authentication status and maybe the authorization infos in the future as well
- lets take the context state management and create a folder src/contexts with ContextProvider.jsx inside (for this small application there is only one context needed)
- 2 things will be needed later on: a "user" object and a "token" which can be both set to null as defaultValue (good for IDE autocompletion to assign values in advance)
- then you need to define the ContextProvider which takes in the children (which the provider wraps to provide the state) as destructured props
- for the user and the token you create a useState hook
- created _setToken with a leading underscore, because we will need a separated setToken fn which purpose is to call first the _setToken with the token that is passed in as parameter and then you will also need to set this token in the LocalStorage
- saving the token there because whenever the user authenticates you need to set it in the localStorage, so that the information (the token) doesnt get lost when the user refreshes the page, meaning: the user has to stay as an authenticated person as long as he doesnt log out
- the StateContext.Provider finally exposes these 2 variables and functions ( user, token, setUser and setToken) as the value prop so that the "children" can access them
- in main.jsx wrap the RouterProvider with the newly created ContextProvider

- **now** based on whether the token is available i want to either render the DefaultLayout or the GuestLayout
- so in the DefaultLayout you simply ask if the token exist (using the useStateContext to access it) and if its null, redirect the user to the login page using the Navigate component
- so basically every route that is children of DefaultLayout leads to "/login" if there is no token
- similar in the GuestLayout: if the token is available and the user is on one of the routes under GuestLayout (login and signup) , then the user will be automatically redirected to "/" and from there redirected to Users page

---

- after the Login/Signup/Logout functionality is done, u can create the actual user page. For that, you need obviously the User model, an (api!) resource controller, and 2 Requests (for store and update):

```sh
php artisan make:controller Api/UserController --model=User --resource --requests --api
```

-as well as a UserResource:

```sh
php artisan make:resource UserResource
```

## UserResource

- A Resource is basically a class that is used to convert the database models into JSON serializable data 

**Note** because i am running in StrictMode useEffect will be called twice (in development! but not in production)

## Seeder
- lets create some users with the DatabaseSeeder 
- so in DatabaseSeeder.php uncomment:

```sh
\App\Models\User::factory(50)->create();
```

- and then run in the console:
```sh
php artisan db:seed
```

**Note:**
 i higly recommend the extension "SQLite Viewer" for vscode or a similar ext to see the users table been seeded with the fake data 

- with the eloquent paginate method you will get back not only the specified perPage results (10 in this case) but also, under "links" the first, the last and the next endpoint  ( ".../api/users?page=1" ), and under "meta" even more information (currentPage, total, from, to,..)


