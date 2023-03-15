const queue = require('../config/kue');
const resetPassMailer = require('../mailers/reset_pass_mailer');

// this is the worker that is processed when the reset password job is enqueued
try {
    queue.process('resetPassword', function(job, done){
        // console.log('reset password worker is processing a job', job.data);
        resetPassMailer.newResetPassMail(job.data);
        done();
    });    
} catch (error) {
    console.log('Error in processing the reset password job', error);
}
