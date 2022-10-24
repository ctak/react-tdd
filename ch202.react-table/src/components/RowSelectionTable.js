// CodeSandbox 에 있는 예제가 forwardRef 에러가 발생하였음.
// https://codesandbox.io/s/github/tanstack/table/tree/main/examples/react/row-selection
// tanstack 을 보면서 만듦.
// https://react-table-v7.tanstack.com/docs/api/useRowSelect
// https://codesandbox.io/s/react-table-click-on-row-646ug?file=/src/App.js // onClick 설명.
// https://www.daleseo.com/react-table/

import React from 'react';
import Styled from 'styled-components';
import { useRowSelect, useTable } from 'react-table'

const lineColor = '#ddd';
const Container = Styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid ${lineColor};

    tr {
      :last-child {
        td{
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid ${lineColor};
      border-right: 1px solid ${lineColor};

      :last-child {
        border-right: 0;
      }
    }
  }
`;

// checkbox 만들기
const IndeterminateCheckbox = ({ indeterminate, ...rest }) => {
    const ref = React.useRef();

    React.useEffect(() => {
      ref.current.indeterminate = indeterminate;
    }, [ref, indeterminate]);

    return (
      <>
        <input type="checkbox" ref={ref} {...rest} />
      </>
    );
  }


function RowSelectionTable({ columns, data }) {
  /*
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
    },
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );
  */
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
    },
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ])
    }
  )

  // Render the UI for your table
  return (
    <Container>
      <p>Selected Rows: {Object.keys(selectedRowIds).length}</p>
      <pre>
        <code>
          {JSON.stringify(
            {
              selectedRowIds: selectedRowIds,
              'selectedFlatRows[].original': selectedFlatRows.map(d => d.original)
            },
            null,
            2
          )}
        </code>
      </pre>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </Container>
  );
}

export default RowSelectionTable;
