import React, { Component } from 'react';

import Layer from 'grommet/components/Layer';
import { EntryOrderList } from 'grommet-cms/components';

export class EntryOrder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      layerActive: false,
      entries: this._sortArray(props.entries)
    };

    this._onClose = this._onClose.bind(this);
    this._onListButtonClick = this._onListButtonClick.bind(this);
  }

  _onListButtonClick(entry, direction, index) {
    let entryArray = Object.assign([], this.state.entries);
    let updatedEntry = Object.assign({}, this.state.entries[index]);
    entryArray.splice(index, 1);

    // Lists are sorted from lowest number to highest.
    // This is to match up with automatically incrementing IDs.
    switch(direction) {
      case "increment":
        updatedEntry.order = (updatedEntry.order > 0)
          ? updatedEntry.order - 1
          : updatedEntry.order;
        break;
      case "decrement":
        updatedEntry.order = (updatedEntry.order <= this.state.entries.length)
          ? updatedEntry.order + 1
          : updatedEntry.order;
        break;
    }

    entryArray.splice(updatedEntry.order, 0, updatedEntry);

    entryArray.map((item, index)=>{
      entryArray[index].order = index;
    });

    this.setState({ entries: entryArray });
  }

  _sortArray(entries) {
    let sortedEntries =  entries.sort((a, b) => {
      if(a.order < b.order) return -1;
      if(a.order > b.order) return 1;
      return 0;
    });

    sortedEntries.map((item, index)=>{
      sortedEntries[index].order = index;
    });

    return sortedEntries;
  }

  _onClose() {
    this.setState({layerActive: false});
  }

  render() {
    return (
      <div>
        <Layer closer={true} onClose={this.props.onClose}>
          <EntryOrderList
            entries={this.state.entries}
            posts={this.props.posts}
            onCancel={this.props.onClose}
            onListButtonClick={this._onListButtonClick}
            onSubmit={this.props.onSubmit.bind(this, this.state.entries)}
            request={this.props.request} />
        </Layer>
      </div>
    );
  }
};

export default EntryOrder;
