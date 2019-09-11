import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { useKeywords } from 'context/keywordsContext';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Table from 'antd/lib/table';
import Typography from 'antd/lib/typography';

import Loading from 'components/common/Loading';

const columns = [
  {
    title: 'Keyword',
    dataIndex: 'keyword',
    key: 'keyword',
    render: text => text || 'N/A'
  },
  {
    title: 'Total Results',
    dataIndex: 'total_result',
    key: 'total_result',
    render: text => text || 'N/A'
  },
  {
    title: 'Ad links',
    dataIndex: 'ad_links',
    key: 'ad_links',
    render: text => text || 'N/A'
  },
  {
    title: 'Result links',
    dataIndex: 'result_links',
    key: 'result_links',
    render: text => text || 'N/A'
  }
];

const Container = styled(Row)`
  margin-top: 24px; 
`;

const { Title } = Typography;

function transformKeywords(keywords) {
  return Object.keys(keywords).map(id => {
    const currentData = keywords[id];
    return {
      key: id,
      keyword: currentData.term,
      total_result: currentData.total_results,
      ad_links: currentData['Link::Ad'],
      result_links: currentData['Link::Result']
    }
  });
}

export default function Keywords() {
  const { keywords: { data, loading } } = useKeywords();
  let dataSource;
  if (data) dataSource = transformKeywords(data);

  return (
    <Container type="flex" justify="center">
      <Col span={20}>
        <Row type="flex" justify="space-between" align="middle">
          <Title level={4}>Past Keyword</Title>
          <Link to="/upload">Upload other csv</Link>
        </Row>
        { loading && <Loading /> }
        { !loading && data && <Table columns={columns} dataSource={dataSource} /> }
      </Col>
    </Container>
  );
}



