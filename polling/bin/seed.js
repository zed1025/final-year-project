#!/usr/bin/env node
// https://pusher.com/tutorials/social-poll-realtime-counter/
require('mongoose').connect('mongodb://localhost/pollser');

const topics = [
    "Pizza tonight?",
    "Should we go on a trip to Manali after exams?",
    "Should the exams be postponed due to elections?",
    "Should the number of engineering colleges be reduces?",
    "Should developers use IDEs?",
    "Is there a solution to global warming?"
];

const Poll = require('../models/poll');

// empty the collection first
Poll.remove({})
    .then(() => {
        let polls = [];
        for (let i = 0; i < 6; i++) {
            polls.push({
                topic: topics[i],
                choices: [
                    {
                        value: "Yes",
                        votes: 0
                    },
                    {
                        value: "No",
                        votes: 0
                    }
                ]
            });
        }
        return Poll.create(polls);
    })
    .then(() => {
        process.exit();
    })
    .catch((e) => {
        console.log(e);
        process.exit(1);
    });
