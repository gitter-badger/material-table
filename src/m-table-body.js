/* eslint-disable no-unused-vars */
import * as React from 'react';
import PropTypes from 'prop-types';
import MTableFilterRow from './m-table-filter-row';
import MTableBodyRow from './m-table-body-row';
import { TableBody, TableRow } from '@material-ui/core';
/* eslint-enable no-unused-vars */

export default class MTableBody extends React.Component {
  render() {
    let renderData = this.props.renderData;
    let emptyRowCount = 0;
    if (this.props.options.paging) {
      const startIndex = this.props.currentPage * this.props.pageSize;
      const endIndex = startIndex + this.props.pageSize;
      renderData = renderData.slice(startIndex, endIndex);
      emptyRowCount = this.props.pageSize - renderData.length;
    }
    return (
      <TableBody>
        {this.props.options.filtering &&
          <MTableFilterRow
            columns={this.props.columns.filter(columnDef => { return !columnDef.hidden })}
            emptyCell={this.props.options.selection || (this.props.actions && this.props.actions.filter(a => (!a.isFreeAction)).length > 0)}
            onFilterChanged={this.props.onFilterChanged}
            selection={this.props.options.selection}
            onFilterSelectionChanged={this.props.onFilterSelectionChanged}
          />
        }
        {
          renderData.map((data, index) => {
            return (
              <MTableBodyRow
                data={data}
                index={index}
                key={index}
                options={this.props.options}
                onRowSelected={this.props.onRowSelected}
                actions={this.props.actions}
                columns={this.props.columns}
                getFieldValue={this.props.getFieldValue}
              />
            );
          })
        }
        {[...Array(emptyRowCount)].map((r, index) => <TableRow style={{height: 49}} key={'empty-' + index} />)}
        {emptyRowCount > 0 && <TableRow style={{height: 1}} key={'empty-last1'} />}
      </TableBody>
    );
  }
}

MTableBody.defaultProps = {
  actions: [],
  currentPage: 0,
  pageSize: 5,
  renderData: [],
  selection: false
};

MTableBody.propTypes = {
  actions: PropTypes.array,
  columns: PropTypes.array.isRequired,
  currentPage: PropTypes.number,
  getFieldValue: PropTypes.func.isRequired,
  onRowSelected: PropTypes.func,
  options: PropTypes.object.isRequired,
  pageSize: PropTypes.number,
  renderData: PropTypes.array,
  selection: PropTypes.bool.isRequired,
  onFilterSelectionChanged: PropTypes.func.isRequired
};
