'use strict'

const Job = use('App/Models/Job')

class JobController {

    async home({view}) {

        /**
         * Fetch a job
         */
        const jobs = await Job.all();

        /**
         * Renders View page and pass an argument
         */
        return view.render('index', {jobs: jobs.toJSON()})
    }

    /**
     * Retrieves particular user jobs
     */
    async userIndex({view, auth}) {


        const jobs = await auth.user.jobs().fetch();

        console.log(auth.user)

        console.log("test")

        /**
         * render .edge file that is selected
         */
        return view.render('jobs', { jobs: jobs.toJSON() })
    }

    /**
     * Post specific jon on specific user
     */
    async create({request, response, session, auth}){
        const job = request.all();

        const posted = await auth.user.jobs().create({
            title: job.title,
            link: job.link,
            description: job.description
        });

        session.flash({ message: 'Your job has been posted!' });
        return response.redirect('back');
    }

    async delete({ response, session, params}) {
        const job = await Job.find(params.id);

        await job.delete();
        session.flash({ message: 'Your job has been removed'});
        return response.redirect('back');
    }

    async edit({ params, view }){
        const job = await Job.find(params.id);
        return view.render('edit', { job:job });
    }

    async udpate({ response, request, session, params}){
        const job = await Job.find(params.id);

        job.title = request.all().title;
        job.link  = request.all().link;
        job.description = request.all().description;

        await job.save();

        session.flash({ message: 'Your job has been updated.' });
        return response.redirect('/post-a-job');
    }
}

module.exports = JobController
