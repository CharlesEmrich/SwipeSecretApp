const User = require('./models/userModel');
const Interaction = require('./models/interactionModel');

//When the view loads, call this:
module.exports = getPopMutuals;

function getPopMutuals() {

  return function popMutuals (userId) {
      //Search Interactions for ones that like me and have mutual: true.

      //TODO: A way to exclude things which this captures, but who also have rejectMatch Interations in the system.
    let theirs = Interaction.find({
      targetId: userId,
      status: 'approved',
      mutual: true,
      confirm: {$ne: false}
    })
    .populate('originatorId').populate('secret');

    let ours = Interaction.find({
      originatorId: userId,
      status: 'approved',
      mutual: true,
      confirm: {$ne: false}
    });

    return Promise.all([ theirs, ours ]);
  };
}
