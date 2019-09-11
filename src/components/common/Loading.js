import React from 'react';
import styled from 'styled-components';

import Spin from 'antd/lib/spin';
import Icon from 'antd/lib/icon';

const LoadingIcon = styled(Icon)`
  font-size: 48px;
`;

export default function Loading() {
  return (
    <Spin indicator={<LoadingIcon type="loading" spin />} />
  )
}
