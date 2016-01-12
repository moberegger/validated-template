# validated-template
Create Blaze templates using MDG's best practices without any of the boilerplate!

## Purpose
Don't use this yet! Still testing and in development. I have never done this before!

## Inspiration
This package had a couple of inspirations. 
- validated-method
- themeteorchef:controller

## Features
- Simplified syntax for defining template logic.
- Define a validation function that will autorun.
- Can define default values for properties.
- Automatically defines a state ReactiveDictionary.
- Automatically creates helpers for state and the template instance
- Optionally uses React-like APIs to make future transitions to React easier.

## API
ValidatedTemplate comes with support for all of Meteor's standard template methods, plus some extras:

- `ValidatedTemplate`
   - `{string} templateName`
   - `{object} actions`
    - `{function} getDefaultProps`
    - `{function} validateProps`
    - `{function} getInitialState`
    - `{function} onCreated`
    - `{function} onRendered`
    - `{object} helpers`
    - `{object} events`
    - `{function} onDestroyed`

Full API usage:

```js
ValidatedTemplate('myTemplate', {
  getDefaultProps() {
    // Return an object
  },
  validateProps() {
    // Validate data context
  },
  getInitialState() {
    // Return an object
  },
  onCreated() {
    // Stuff to do on created.
  },
  onRendered() {
    // Stuff to do on rendered.
  },
  helpers: {
    myHelper() {
      // Put something on the template.
    }
  },
  events: {
    'click .something'() {
      // Do something on click.
    }
  }
  onDestroyed() {
    // Stuff to do on destroyed.
  }
  
  // React-like aliases
  componentWillMount() {
    // Same as onCreated.
  },
  componentDidMount() {
    // Same as onRendered.
  },
  componentWillUnmount() {
    // Same as onDestroyed.
  }
});
```

## Improvements
- Only validate props when running in Dev mode.
