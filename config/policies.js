/**
 * Policies are simply Express middleware functions which run before your controllers.
 * You can apply one or more policies for a given controller or action.
 *
 * Any policy file (e.g. `authenticated.js`) can be dropped into the `/policies` folder,
 * at which point it can be accessed below by its filename, minus the extension, (e.g. `authenticated`)
 *
 * For more information on policies, check out:
 * http://sailsjs.org/#documentation
 */


module.exports.policies = {

  // default require authentication
  // see api/policies/authenticated.js
  '*': ['authenticated', 'addUserId'],

  // whitelist the auth and main controllers
  'auth':
  {
    '*': true
  },

  'main':
  {
    '*': true
  },

  // Limit user controller view to just the /user endpoint
  UserController : {
    '*': false,
    'index': true,
    'photo': true,
    'info': ['authenticated', 'requireUserId', 'addUserId', 'requireId'],
    'find': 'admin',
    'findAll': 'admin'
  },

  // Disable the index blueprints for FileController due to security concerns
  FileController : {
    'index': false,
    'findAll': 'admin',
    // for testing
    'test': true,
    'testupload': true,
    // everything else is protected
    '*': 'protectedFile'
  },

  ProjectController : {
    '*': ['authenticated', 'addUserId', 'project']
  },

  LikeController : {
    '*': ['authenticated', 'addUserId', 'project'],
    'count': ['authenticated', 'requireId', 'project'],
    'like': ['authenticated', 'requireUserId', 'addUserId', 'requireId'],
    'unlike': ['authenticated', 'requireUserId', 'addUserId', 'requireId']
  },

  EventController : {
    'create': ['authenticated', 'requireUserId', 'addUserId', 'eventUuid'],
    'findAllByProjectId': ['authenticated', 'addUserId', 'requireId', 'project'],
    'attend': ['authenticated', 'requireUserId', 'addUserId', 'requireId'],
    'cancel': ['authenticated', 'requireUserId', 'addUserId', 'requireId'],
    'rsvp': ['authenticated', 'requireUserId', 'addUserId'],
    'ical': ['authenticated', 'addUserId', 'project']
  },

  TagController : {
    '*': ['authenticated'],
    'find': false,
    'create': ['authenticated', 'requireUserId', 'projectId'],
    'destroy': ['authenticated', 'requireUserId', 'requireId'],
    'add': ['authenticated', 'requireUserId'],
    'findAllByProjectId': ['authenticated', 'requireId', 'project']
  },

  CommentController : {
    'find': false,
    'create': ['authenticated', 'requireUserId', 'addUserId'],
    'destroy': ['authenticated', 'requireUserId', 'requireId'],
    'findAllByProjectId': ['authenticated', 'requireId', 'project']
  },

  TagEntityController : {
    // Purely for administrative functions
    '*': 'admin'
  },

  TaskController : {
    'findAllByProjectId': ['authenticated', 'addUserId', 'project']
  }

  /*
  // Here's an example of adding some policies to a controller
  RabbitController: {

    // Apply the `false` policy as the default for all of RabbitController's actions
    // (`false` prevents all access, which ensures that nothing bad happens to our rabbits)
    '*': false,

    // For the action `nurture`, apply the 'isRabbitMother' policy
    // (this overrides `false` above)
    nurture : 'isRabbitMother',

    // Apply the `isNiceToAnimals` AND `hasRabbitFood` policies
    // before letting any users feed our rabbits
    feed : ['isNiceToAnimals', 'hasRabbitFood']
  }
  */
};


/**
 * Here's what the `isNiceToAnimals` policy from above might look like:
 * (this file would be located at `policies/isNiceToAnimals.js`)
 *
 * We'll make some educated guesses about whether our system will
 * consider this user someone who is nice to animals.
 *
 * Besides protecting rabbits (while a noble cause, no doubt), 
 * here are a few other example use cases for policies:
 *
 *  + cookie-based authentication
 *  + role-based access control
 *  + limiting file uploads based on MB quotas
 *  + OAuth
 *  + BasicAuth
 *  + or any other kind of authentication scheme you can imagine
 *
 */

/*
module.exports = function isNiceToAnimals (req, res, next) {

  // `req.session` contains a set of data specific to the user making this request.
  // It's kind of like our app's "memory" of the current user.

  // If our user has a history of animal cruelty, not only will we
  // prevent her from going even one step further (`return`),
  // we'll go ahead and redirect her to PETA (`res.redirect`).
  if ( req.session.user.hasHistoryOfAnimalCruelty ) {
    return res.redirect('http://PETA.org');
  }

  // If the user has been seen frowning at puppies, we have to assume that
  // they might end up being mean to them, so we'll
  if ( req.session.user.frownsAtPuppies ) {
    return res.redirect('http://www.dailypuppy.com/');
  }

  // Finally, if the user has a clean record, we'll call the `next()` function
  // to let them through to the next policy or our controller
  next();
};
*/
