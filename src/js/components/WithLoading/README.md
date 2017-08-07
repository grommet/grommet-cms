## WithLoading Component
A higher order component that either renders a loading indicator, or a children.
Useful to wrap a whole container in to give it a loading indicator when processing requests.

### Example

```js
<WithLoading isLoading={this.props.request} fullHeight={false}>
  // Rest of your container goes here
</WithLoading>
```

### Props

| Prop          | Type     | Default     | Possible Values
| ------------- | -------- | ----------- | ---------------------------------------------
| **isLoading**    | Boolean   |             | true or false, whether the loading indicator shows or children
| **fullHeight**    | Boolean   |             | true or false, should the container be full screen height or not?
| **children**    | Node   |             | An number of JSX / React nodes


### Other Information
Children get passed in via JSX child nodes, not via an explicit prop.