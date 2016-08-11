const User = require('./models/userModel');
const Interaction = require('./models/interactionModel');

//When the view loads, call this:
module.exports = getPopMutuals;

function getPopMutuals() {

  return function popMutuals (userId) {
      //Search Interactions for ones that like me and have mutual: true.

      //TODO: A way to exclude things which this captures, but who also have rejectMatch Interations in the system.
    Interaction.find({
      targetId: userId,
      status: 'approved',
      mutual: true
    }).populate('originatorId')
      //load those selections into an array and return that.
      .then(users => {
        return users;
      });
  };
}
