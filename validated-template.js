ValidatedTemplate = function(template, actions) {
  let that = this;

  // Get validation method
  this._validateProps = actions.validateProps;
  
  // Get defaultProps
  this._defaultProps = actions.getDefaultProps || {};

  // Setup initial state
  this._getInitialState = actions.getInitialState;
  // TODO: Properly process this from object key-value to name-value
  this._initialState = this._getInitialState ? this._getInitialState() : {};
  
  // On Created
  this._onCreated = actions.onCreated;
  this._extendedOnCreated = function() {
    // Extend the data with defaultProps
    this.data = _.defaults(this.data, that._defaultProps);
    
    // Call validation function
    if (that._validateProps) {
      this.autorun(() => {        
        // TODO: See if this can be limited to dev mode
        that._validateProps.call(this);  
      });
    }
        
    // Create state reactive dictionary for state
    this.state = new ReactiveDict(that._initialState);
    
    if (that._onCreated) that._onCreated.call(this);
  } 
  // Set onCreated function
  Template[template].onCreated(this._extendedOnCreated);
  
  // Set onRendered
  if (actions.onRendered) Template[template].onRendered(actions.onRendered);
  
  // Get specified helpers
  this._helpers = actions.helpers || {};
  // Add template instance helper
  this._helpers.t = function() {
    return Template.instance();
  }
  // Add state helper
  this._helpers.state = function() {
    const template = Template.instance();
    return template.state;
  }
  // Set helpers
  Template[template].helpers(this._helpers);
  
  // Set events
  if (actions.events) Template[template].events(actions.events);
  
  // Set onDestroyed
  if (actions.onDestroyed) Template[template].onDestroyed(actions.onDestroyed);
};