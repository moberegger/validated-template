ValidatedTemplate = function(template, actions) { 
  // Set onCreated function
  Template[template].onCreated(function() {
    // Extend the data with defaultProps
    this.data = _.defaults(this.data, actions.getDefaultProps ? actions.getDefaultProps() : {});
    
    // Call validation function
    if (actions.validateProps) {
      this.autorun(() => {        
        // TODO: See if this can be limited to dev mode
        actions.validateProps.call(this);  
      });
    }
        
    // Create state reactive dictionary based on initialState
    this.state = new ReactiveDict(actions.getInitialState ? actions.getInitialState() : {});    
    
    if (actions.onCreated) actions.onCreated.call(this);
    if (actions.componentWillMount) actions.componentWillMount.call(this);
  });
  
  // Set onRendered
  if (actions.onRendered) Template[template].onRendered(actions.onRendered);
  if (actions.componentDidMount) Template[template].onRendered(actions.componentDidMount);
  
  // Set helpers
  // Add template instance helper
  // Add state helper
  Template[template].helpers(_.extend(actions.helpers || {}, {
    t(){
      return Template.instance();
    },
    state(prop) {
      const template = Template.instance();
      return prop ? template.state.get(prop) : template.state;
    }
  }));
  
  // Set events
  if (actions.events) Template[template].events(actions.events);
  
  // Set onDestroyed
  if (actions.onDestroyed) Template[template].onDestroyed(actions.onDestroyed);
  if (actions.componentWillUnmount) Template[template].onRendered(actions.componentWillUnmount);  
};
