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
 */
Route.get('/post-a-job', 'JobController.userIndex');

/**
 * Job CRUD Operation
 */
Route.get('/post-a-job/delete/:id', 'JobController.delete');
Route.get('/post-a-job/edit/:id', 'JobController.edit'); 
Route.post('/post-a-job/update/:id', 'JobController.update').validator('CreateJob');
Route.post('/post-a-job', 'JobController.create').validator('CreateJob');