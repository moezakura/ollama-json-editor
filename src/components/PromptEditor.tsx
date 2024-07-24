'use client'

import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Prompt {
  role: string;
  content: string;
}

export const PromptEditor = ({ onSubmit }: { onSubmit: (prompts: Prompt[]) => void }) => {
  const [prompts, setPrompts] = useState<Prompt[]>([
    { role: 'System', content: '' },
    { role: 'User', content: '' }
  ]);

  const handleEditorChange = (value: string | undefined, index: number) => {
    const newPrompts = [...prompts];
    newPrompts[index].content = value || '';
    setPrompts(newPrompts);
  };

  const addPrompt = () => {
    setPrompts([...prompts, { role: 'User', content: '' }]);
  };

  const removePrompt = (index: number) => {
    const newPrompts = prompts.filter((_, i) => i !== index);
    setPrompts(newPrompts);
  };

  const handleSubmit = () => {
    onSubmit(prompts);
  };

  return (
    <ScrollArea className="h-full flex flex-col p-4">
      {prompts.map((prompt, index) => (
        <div key={index} className="mb-6 mx-2">
          <Select
            value={prompt.role}
            onChange={(e) => {
              const newPrompts = [...prompts];
              newPrompts[index].role = e.target.value;
              setPrompts(newPrompts);
            }}
          >
            <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select a timezone" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="System">System</SelectItem >
                <SelectItem value="User">User</SelectItem >
                <SelectItem value="Assistant">Assistant</SelectItem >
            </SelectContent>
          </Select>
          <Textarea
            className="mt-2"
            value={prompt.content}
            onChange={(value) => handleEditorChange(value, index)}
          />
          <Button onClick={() => removePrompt(index)} className="mt-2">Remove</Button>
        </div>
      ))}
      <Button onClick={addPrompt} className="mb-4 mr-2">Add Prompt</Button>
      <Button onClick={handleSubmit}>Generate</Button>
    </ScrollArea>
  );
};
