/* eslint-disable arrow-body-style */
import React from 'react';
import { Skeleton } from '@material-ui/lab';

const withLoaderTable = (WrappedComponent) => {
  return function WithLoaderTable(props) {
    // eslint-disable-next-line react/prop-types
    const { rows, reload } = props;

    // eslint-disable-next-line react/prop-types
    return reload && rows.length === 0 ? (
      <>
        <div  style={{marginTop: 30}}>
          <Skeleton height={50} variant="text" />
          <Skeleton height={50} animation="wave" variant="text" />
          <Skeleton height={50} variant="text" />

          <Skeleton height={50} animation="wave" variant="text" />
          <Skeleton height={50} variant="text" />
          <Skeleton height={50} animation="wave" variant="text" />
        </div>
      </>
    ) : (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <WrappedComponent {...props} />
    );
  };
};

export default withLoaderTable;
