'use strict'

const Job = use('App/Models/Job')

class JobController {

    async home({view}) {

        /**
         * Creates a job
         */
        const  job = new Job;
        job.title = 'My job Title';
        job.link = 'http://google.com';
        job.description = 'My job description';


        /**
         * Saves to database
         */
        await job.save();

        /**
         * Fetch a job
         */
        const jobs = await Job.all();

        /**
         * Renders View page and pass an argument
         */
        return view.render('index', {jobs: jobs.toJSON()})
    }

}

module.exports = JobController
