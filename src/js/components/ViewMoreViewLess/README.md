## ViewMoreViewLess Component
A higher order component that shows a View More button or a View Less button and conditionally renders the children
based on the `isShowingMore` property value.

### Example

```js
<ViewMoreViewLess
  isShowingMore={this.props.showAllItems}
  onShowMore={this.onShowMore}
>
  // Rest of your content goes here
</ViewMoreViewLess>
```

### Props

| Prop          | Type     | Default     | Possible Values
| ------------- | -------- | ----------- | ---------------------------------------------
| **isShowingMore**    | Boolean   |             | true or false, whether the children should appear or not
| **onShowMore**    | Function   |             | A callback function used to toggle the children's visibility.
| **children**    | Node   |             | An number of JSX / React nodes


### Other Information
Children get passed in via JSX child nodes, not via an explicit prop.