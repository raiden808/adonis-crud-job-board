'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

/**
 * Database schema created by
 * cli - adonis make:migration jobs
 * 
 * By runnin 'adonis migration:run'
 * Schema will be created in mysql
 * 
 * Additional note:
 * To check if schema exist check your 
 * adonis_schema table in mysql
 */
class JobsSchema extends Schema {
  up () {
    this.create('jobs', (table) => {
      table.increments()
      table.string('title')
      table.string('link')
      table.string('description')
      table.string('user_id')
      table.timestamps()
    })
  }

  down () {
    this.drop('jobs')
  }
}

module.exports = JobsSchema
