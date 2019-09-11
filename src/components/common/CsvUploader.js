import React, { useState } from 'react';
import styled from 'styled-components';
import PapaParse from 'papaparse';

import Icon from 'antd/lib/icon';

const StyledIcon = styled(Icon)`
  font-size: 80px;
`;

const StyledInput = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
`;

const FileContainer = styled.div`
  margin-top: 8px;
`;

const Container = styled.div`
  && {
    padding: 12px;
  }
`;

function CsvUploader({ onFileLoaded, onError }) {
  const [filename, setFilename] = useState();

  function handleChangeFile(e) {
    const reader = new FileReader();
    if (e.target.files.length > 0) {
      const currentFilename = e.target.files[0].name;

      reader.onload = event => {
        const csvData = PapaParse.parse(
          event.target.result,
          {
            error: onError,
            encoding: 'UTF-8'
          }
        );
        setFilename(currentFilename);
        onFileLoaded(csvData.data, currentFilename);
      };

      reader.readAsText(e.target.files[0], 'UTF-8');
    }
  }

  return (
    <Container className="ant-upload ant-upload-drag">
      <p className="ant-upload-drag-icon">
        <StyledIcon type="inbox" />
      </p>
      <p className="ant-upload-text">Click here to choose file</p>
      <p className="ant-upload-hint">We support single csv file</p>
      <StyledInput
        type="file"
        accept=".csv, text/csv"
        onChange={e => handleChangeFile(e)}
      />
      {filename && (
        <FileContainer>
          <Icon type="paper-clip" />
          <span>{filename}</span>
        </FileContainer>
      )}
    </Container>
  );
}

export default CsvUploader;
