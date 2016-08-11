const User = require('./models/userModel');
const Interaction = require('./models/interactionModel');

// require('./setup-mongoose');

module.exports = getPopSecret;

function getPopSecret() {
  //This pattern may, on net, be unnecessary here. We might just directly return the function.
  return function popSecret(userId) {

    let unwantedPromise = Interaction.distinct('targetId', {
      originatorId: userId
    });

    let approversPromise = Interaction.distinct('originatorId', {
      targetId: userId,
      status: 'approved'
    });

    let unwantedIds = null;

    return Promise.all([unwantedPromise, approversPromise])
    .then(([_unwantedIds, approverIds]) => {
      _unwantedIds.push(userId);
      unwantedIds = _unwantedIds;
      return User.findOne({_id: {
        $nin: unwantedIds,
        $in: approverIds
      }}).populate('secret');
    })
    .then(approvingUser => {
      if (approvingUser) return approvingUser;
      else return User.findOne({_id: {
        $nin: unwantedIds
      }}).populate('secret');
    });
  };
}

// new Interaction({
//   originatorId: '57aab8f8f0622b6832482bb6',
//   targetId: '57aab8f8f0622b6832482bb7'
// }).save();
//
// new Interaction({
//   originatorId: '57aab8f8f0622b6832482bb8',
//   targetId: '57aab8f8f0622b6832482bb6'
// }).save();
//
//   new Interaction({
//     originatorId: '57aab8f8f0622b6832482bb8',
//     targetId: '57aab8f8f0622b6832482bb7'
//   }).save();

// getPopSecret()('57aab8f8f0622b6832482bb8').then(user => {console.log(user);})
// .catch(err => console.log(err));

//NOTE: An easy way to weight, rather than guarantee, matches appearing sooner.
//Once you've narrowed the list of users down to possibles, divide the remaining Users into have-matched and un-matched.
//Roll a die 0 to (2 * matched.length + unmatched.length  [- n to account for 0-indexing?])
//If roll <= 2 * matched.length, divide roll by 2 and use that as the index.

//Ex: 2 matched users and 3 unmatched.
//Roll 0 to 7
// if roll is 2 or less, convert to 0 or 1.

//Actually, not copmletely sure this works.

//OR: https://www.npmjs.com/package/weighted
