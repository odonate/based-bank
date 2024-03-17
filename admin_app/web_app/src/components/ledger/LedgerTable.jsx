import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTable } from 'react-table';

import { networkConstants } from '@constants';

import styles from '@styles';

const Venue = ({ row }) => {
  const chainId = networkConstants.VENUE_TO_ID[row.original.venueId];
  let venuePath = null;
  try {
    venuePath = require("@images/venues/" + row.original.venueId.toLowerCase() + ".png");
  } catch (error) {
    venuePath = require("@images/venues/null.png");
  }
  return (
    <div className={styles.tableVenueContainer}>
      <div className={styles.tableVenueIconContainer}>
        <div className={styles.tableVenueIcon}>
          <img src={venuePath} className={styles.tableVenueImg}/>
        </div>
      </div>
    </div>
  );
};

const AccountId = ({ row }) => {
  return (
    <div className={styles.tableColumnHeader}>
      {row.original.accountId}
    </div>
  );
};

const Balance = ({ row }) => {
  return (
    <div className={styles.tableColumnHeader}>
      {row.original.effectiveBalance}
    </div>
  );
};

const AvailableBalance = ({ row }) => {
  return (
    <div className={styles.tableColumnHeader}>
      {row.original.availableBalance}
    </div>
  );
};

const LedgerTable = ({ balances }) => {
  console.log(balances);
  const columns = React.useMemo(
    () => [
      {
        id: 'venue',
        Cell: ({ row }) => <Venue row={row}/>
      },
      {
        Header: 'ACCOUNT ID',
        Cell: ({ row }) => <AccountId row={row}/>
      },
      {
        Header: 'BALANCE',
        Cell: ({ row }) => <Balance row={row}/>
      },
      {
        Header: 'AVAILABLE BALANCE',
        Cell: ({ row }) => <AvailableBalance row={row}/>
      },
    ], []);

  const data = React.useMemo(() => balances, [balances]);
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: data });
  
  const tableHead = (
      <thead>
        {headerGroups.map((headerGroup) => (
            <React.Fragment key={headerGroup.id}>
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
              <tr className={styles.stickyBottomBorder}>
                {headerGroup.headers.map((column) => (
                  <td key={column.id}/>
                ))}
              </tr>
            </React.Fragment>
          ))}
      </thead>
  );
  const tableBody = (
    <tbody {...getTableBodyProps()}>
      {rows.map((row, i) => {
        prepareRow(row);
        return (
          <React.Fragment key={i}>
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td {...cell.getCellProps()} className={styles.tableCell}> 
                 {cell.render('Cell')}
                </td>
              ))}
            </tr>
          </React.Fragment>
        );
      })}
    </tbody>
  );
  
  return (
    <div className={styles.tableContainer}>
      <table {...getTableProps()} className={styles.table}>
        {tableHead}
        {balances.length > 0 ? tableBody : ''}
      </table>
    </div>
  );
};
      
export { LedgerTable };
