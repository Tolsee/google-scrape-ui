import React, { useState } from 'react';
import styled from 'styled-components';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Alert from 'antd/lib/alert';
import Icon from 'antd/lib/icon';

import Loading from 'components/common/Loading';

import CsvUploader from 'components/common/CsvUploader';
import { useKeywords } from 'context/keywordsContext';
import { Link } from 'react-router-dom';

const SuccessMessage = styled.p`
  margin-bottom: 0;
`;

const SuccessIcon = styled(Icon)`
  margin-right: 8px;
`;

const StyledRow = styled(Row)`
  margin-top: 12px;
`;

const Container = styled(Row)`
  margin-top: 12em;
`;

const StyledLink = styled(Link)`
  font-size: 18px;
`;

export default function KeywordUploader() {
  const [filename, setFilename] = useState();
  const { upload: { error, loading, success }, uploadKeywords } = useKeywords();

  async function handleUploader(data, file) {
    setFilename(file);
    const keywords = data.flat(Infinity).filter(keyword => !!keyword);
    await uploadKeywords({ keywords });
  }

  return (
    <Container type="flex" justify="center" align="middle">
      <Col xs={16} sm={12}>
        <CsvUploader onFileLoaded={handleUploader} />
        {
          loading && (
            <StyledRow type="flex" justify="center">
              <Loading />
              <p>Uploding file</p>
            </StyledRow>
          )
        }
        {
          error && (
            <StyledRow>
              <Alert>{error}</Alert>
            </StyledRow>
          )
        }
        {
          success && (
            <StyledRow type="flex" justify="center" align="middle">
              <SuccessIcon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />
              <SuccessMessage>Uploaded {filename} successfully</SuccessMessage>
            </StyledRow>
          )
        }
        <StyledRow type="flex" justify="center" align="middle">
          <StyledLink to="/">View keywords</StyledLink>
        </StyledRow>
      </Col>
    </Container>
  )
}
