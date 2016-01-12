ValidatedTemplate = function(template, actions) {
  let that = this;
  
  // Get validation method
  this._validateProps = _.get(actions, 'validateProps');
  
  // Get defaultProps
  this._defaultProps = _.get(actions, 'getDefaultProps', {});

  // Setup initial state
  this._getInitialState = _.get(actions, 'getInitialState');
  // TODO: Properly process this from object key-value to name-value
  this._initialState = this._getInitialState ? this._getInitialState() : {};
  
  // On Created
  this._onCreated = function() {
    // Extend the data with defaultProps
    this.data = _.extend(this.data, that._defaultProps);
    
    // Call validation function
    if (this._validateProps) {
      this.autoRun(() => {
        // TODO: See if this can be limited to dev mode
        that._validateProps.call(this);  
      });
    }
        
    // Create state reactive dictionary for state
    this.state = new ReactiveDict(that._initialState);
  } 
  // Set onCreated function
  Template[template].onCreated(this._onCreated);
  
  // Set onRendered
  Template[template].onRendered(actions.onRendered);
  
  // Get specified helpers
  this._helpers = _.get(actions, 'helpers', {});
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
  Template[template].events(actions.events);
  
  // Set onDestroyed
  Template[template].onDestroyed(actions.onDestroyed);
};