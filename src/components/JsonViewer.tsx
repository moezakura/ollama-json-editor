'use client'

import React from 'react';
import dynamic from 'next/dynamic';

const ReactJson = dynamic(() => import('react-json-view'), { ssr: false });

export const JsonViewer = ({ data }: { data: any }) => {
  return (
    <div className="h-full p-4 overflow-auto">
      <ReactJson 
        src={data} 
        theme="monokai" 
        enableClipboard={false} 
        displayDataTypes={false}
        displayObjectSize={false}
      />
    </div>
  );
};
