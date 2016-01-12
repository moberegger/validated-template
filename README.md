# validated-template
Create Blaze templates using MDG's best practices without any of the boilerplate!

##Why did I make this?
- Remove unnecessary boilerplate while promoting best practices as per the MDG guide.
- React-like aliases will allow for easier refactors later on if view layers are to be changed.
- [Sashko said I should!](https://forums.meteor.com/t/similarities-between-react-and-blaze/15883/6?u=moberegger)

##Inspiration
- The concept is an analogous to to the  [`validated-method` package](https://atmospherejs.com/mdg/validated-method)  package and server the same purpose, more or less; remove unnecessary boilerplate and promote best practices. 
- The API is heavily inspired by the [`themeteorchef:controller` package](https://atmospherejs.com/themeteorchef/controller)

##What does it do?
Not much! Haha. Really! It's only like 30 lines of code. You make your events, helpers, and callbacks like you normally do and the package will just take care of some of the boilerplate for you.

##Features
- Generally, a simplified syntax for defining template logic.
- Provide a `validateProps` function that will automatically be placed in an autorun for you. This will validate the data context provided to the template. Right now, this isn't dependant on anything, so you can use `check`, `simple-schema`, `astronomy` or roll your own.
- Provide default properties via the `getDefaultProps` function. The function will set the default properties to the data context before validating it. Must return an object. Only runs the first time when created. This is intentionally named after the React API.
- Automatically create and attach a `state` object to the template. The default state can be set via the `getInitialState` function. Must return an object. Only runs the first time when created. This is intentionally named after the React API.
- Automatically create a `state` helper. This will allow you to access in property inside state directly in your template. Giving it a parameter will provide you the value of that specific property; no parameters will just return the entire state object.
- Automatically create a helper simply called `t` that will just return the template instance. If you have anything else attached to the template instance, you can access it directly through this helper.
- All standard Blaze actions will be applied as usual. So `onCreated`, `onRendered`, `onDestroyed`, `helpers` and `events` behave like normal. The above features are augmented to these without impacting the general behaviour of them.
- An alias for `onCreated` called `componentWillMount`
- An alias for `onRendered` called `componentDidMount`
- An alias for `onDestroyed` called `componentWillUnmount `

## Install
`meteor add moberegger:validated-template`

##What still needs to be done
- I need to write formal tests. I haven't done this before, so bear with me!
- More rigorous testing in general. I have only done tests against the sample to-do app so far.
- I'd like to provide warnings and/or errors if the API is used incorrectly. I want people to feel safe using this. Really make it feel like you are just using Blaze but with a slightly different API.
- I'd like to only have the property validation run in development mode, just like React.
- Improve README.
- Improve documentation in the code itself.




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

**This is still in development so please be gentle!**
