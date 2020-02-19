'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

/**
 * Renders view that can be found
 * inside the layouts/views/ folder.
 */
//Route.on('/').render('index')

/**
 * Renders view via Controller/JobController
 */
Route.get('/','JobController.home');

Route.on('/signup').render('auth.signup');

/**
 * CreateUser - validates data before UserController.create
 */
Route.post('/signup', 'UserController.create').validator('CreateUser');


/**
 * Redirects to public/view/auth/login.edge
 */
Route.on('/login').render('auth.login');

/**
 * When user tries to submit on the login page.
 */
Route.post('/login', 'UserController.login').validator('LoginUser');

/**
 * Logout session
 */
Route.get('/logout', async({auth, response}) =>{
    await auth.logout();
    return response.redirect('/');
})

/**
 * Post job routes
 * returns all job under a specific user
 */
Route.get('/post-a-job', 'JobController.userIndex');

/**
 * Group similar routes together
 */
Route.group(() => {
    Route.get('/delete/:id', 'JobController.delete');
    Route.get('/edit/:id', 'JobController.edit');
    Route.post('/update/:id', 'JobController.update').validator('CreateJob');
}).prefix('/post-a-job');

/**
 * Post a job under a specific user.
 */
Route.post('/post-a-job', 'JobController.create').validator('CreateJob');