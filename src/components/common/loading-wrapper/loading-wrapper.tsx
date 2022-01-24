import { memo } from 'react';
import { FetchStatus } from '../../../consts/consts';
import Loading from '../loading/loading';

type LoadingWrapperProps = {
  fetchStatus: FetchStatus;
  children: JSX.Element;
};

function LoadingWrapper({ fetchStatus, children }: LoadingWrapperProps): JSX.Element {
  return (fetchStatus === FetchStatus.Fetched && children) || <Loading />;
}

export default memo(LoadingWrapper);
