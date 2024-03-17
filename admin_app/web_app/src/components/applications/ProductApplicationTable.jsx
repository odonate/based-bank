import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTable } from 'react-table';

import { defluxActions } from '@actions';
import styles from '@styles';

const ProductId = ({ row }) => {
  return (
    <div className={styles.tableColumnHeader}>
      {row.original.id}
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

const Status = ({ row }) => {
  return (
    <div className={styles.tableColumnHeader}>
      {row.original.status}
    </div>
  );
};

const Approve = ({ row }) => {
  const dispatch = useDispatch();
  const handleApprove = () => {
    console.log("APPROVING");
    const application = {
      accountId: '35daf0e3-f4f4-5e98-8e3d-7dae966a8bbb',
      approve: true,
    };
    console.log(application);
    dispatch(defluxActions.evaluateProductApplication(application));
  };
  return (
    <div className={styles.tableColumnHeader}>
      <button className={styles.button} onClick={handleApprove}>APPROVE</button>
    </div>
  );
};

const Reject = ({ row }) => {
  const dispatch = useDispatch();
  const handleReject = () => {
    console.log("REJECTING");
    console.log("APPROVING");
    const application = {
      accountId: '35daf0e3-f4f4-5e98-8e3d-7dae966a8bbb',
      approve: false, 
    };
    console.log(application);
    dispatch(defluxActions.evaluateProductApplication(application));
  };
  return (
    <div className={styles.tableColumnHeader}>
      <button className={styles.button} onClick={handleReject}>REJECT</button>
    </div>
  );
};

const ProductApplicationTable = ({ productApplications }) => {
  console.log(productApplications);
  const columns = React.useMemo(
    () => [
      {
        Header: 'PRODUCT ID',
        Cell: ({ row }) => <ProductId row={row}/>
      },
      {
        Header: 'ACCOUNT ID',
        Cell: ({ row }) => <AccountId row={row}/>
      },
      {
        Header: 'STATUS',
        Cell: ({ row }) => <Status row={row}/>
      },
      {
        Header: 'APPROVE',
        Cell: ({ row }) => <Approve row={row}/>
      },
      {
        Header: 'REJECT',
        Cell: ({ row }) => <Reject row={row}/>
      },
    ], []);

  const data = React.useMemo(() => productApplications, [productApplications]);
  
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
        {productApplications.length > 0 ? tableBody : ''}
      </table>
    </div>
  );
};
      
export { ProductApplicationTable };
