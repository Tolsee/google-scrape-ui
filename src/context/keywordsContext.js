// @flow
import React, { useState, useEffect } from 'react'
import { get, post } from 'utils/apiClient';

const KeywordsContext = React.createContext();

function KeywordsProvider({ children }) {
  const [keywords, setKeywords] = useState();
  const [keywordsLoading, setKeywordsLoading] = useState(true);
  const [uploadSuccess, setUploadSuccess] = useState();
  const [uploadError, setUploadError] = useState();
  const [uploadLoading, setUploadLoading] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    getKeywords();
  }, []);

  async function getKeywords() {
    setKeywordsLoading(true);
    const { body: { data }} = await get('api/keywords');
    setKeywords(data);
    setKeywordsLoading(false);
  }

  async function uploadKeywords(data) {
    setUploadLoading(true);
    setUploadError(null);
    setUploadSuccess(false);
    const { response, body } = await post('api/keywords/batch', { body: data });
    if (response.status < 400) {
      setKeywords(body.data);
      setUploadSuccess(true);
    } else {
      setUploadError(body.error);
    }
    setUploadLoading(false);
  }

  return (
    <KeywordsContext.Provider value={{
      keywords: { data: keywords, loading: keywordsLoading },
      upload: { error: uploadError, loading: uploadLoading, success: uploadSuccess },
      uploadKeywords,
      getKeywords
    }}>
      {children}
    </KeywordsContext.Provider>
  )
}
function useKeywords() {
  const context = React.useContext(KeywordsContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context;
}

export { KeywordsProvider, useKeywords };
