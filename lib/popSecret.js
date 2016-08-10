module.exports = function getPopSecret() {
  //This pattern may, on net, be unnecessary here. We might just directly return the function.
  function popSecret(userId) {

  }
};

//NOTE: An easy way to weight, rather than guarantee, matches appearing sooner.
//Once you've narrowed the list of users down to possibles, divide the remaining Users into have-matched and un-matched.
//Roll a die 0 to (2 * matched.length + unmatched.length  [- n to account for 0-indexing?])
//If roll <= 2 * matched.length, divide roll by 2 and use that as the index.

//Ex: 2 matched users and 3 unmatched.
//Roll 0 to 7
// if roll is 2 or less, convert to 0 or 1.

//Actually, not copmletely sure this works.

//OR: https://www.npmjs.com/package/weighted
