"use client"

import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { PromptEditor } from '@/components/PromptEditor';
import { JsonViewer } from '@/components/JsonViewer';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import RainbowLoadingBar from '@/components/LoadingBar';

interface Prompt {
  role: string;
  content: string;
}

interface GenerateResponse {
  model: string;
  created_at: string;
  message: {
    role: string;
    content: string;
  };
  done_reason: string;
  done: boolean;
  total_duration: number;
  load_duration: number;
  prompt_eval_count: number;
  prompt_eval_duration: number;
  eval_count: number;
  eval_duration: number;
}


export default function Home() {
  const [result, setResult] = useState<any>({});
  const [models, setModels] = useState<string[]>([]);
  const [parameters, setParameters] = useState({
    model: '',
    temperature: 0.7,
    topP: 0.9,
    topK: 40,
    maxTokens: 2048,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    try {
      const response = await fetch('/api/models');
      const data = await response.json();
      setModels(data.models.map((model: any) => model.name));
    } catch (error) {
      console.error('Error fetching models:', error);
    }
  };


  const handleSubmit = async (submittedPrompts: Prompt[]) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: submittedPrompts,
          ...parameters,
          format: 'json',
          stream: false,
        }),
      });
      const data: GenerateResponse = await response.json();
      
      if (data.message && data.message.content) {
        try {
          const parsedContent = JSON.parse(data.message.content);
          setResult({
            ...parsedContent
          });
        } catch (parseError) {
          console.error('Error parsing JSON content:', parseError);
          setResult({ 
            error: 'Error parsing JSON content',
            rawContent: data.message.content
          });
        }
      } else {
        setResult({ error: 'Invalid response format' });
      }
    } catch (error) {
      console.error('Error:', error);
      setResult({ error: 'Error occurred while generating response' });
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {
        isLoading ? (
          <RainbowLoadingBar />
        ) : null
      }

      <Sidebar
        parameters={parameters}
        setParameters={setParameters}
        models={models}
      />
      <ResizablePanelGroup direction="horizontal" className="flex-1">
        <ResizablePanel defaultSize={50}>
          <PromptEditor 
            onSubmit={(prompts) => handleSubmit(prompts)} 
            isLoading={isLoading}
          />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <JsonViewer data={result} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
