import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface SidebarProps {
  parameters: {
    model: string;
    temperature: number;
    topP: number;
    topK: number;
    maxTokens: number;
  };
  setParameters: React.Dispatch<React.SetStateAction<{
    model: string;
    temperature: number;
    topP: number;
    topK: number;
    maxTokens: number;
  }>>;
  models: string[];
}

export const Sidebar: React.FC<SidebarProps> = ({ parameters, setParameters, models  }) => {
    const [inputValue, setInputValue] = useState(parameters.maxTokens.toString());
    const handleSliderChange = (value) => {
        setParameters({ ...parameters, maxTokens: value[0] });
        setInputValue(value[0].toString());
      };
    
      const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
        
        const parsedValue = parseInt(value, 10);
        if (!isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 100000) {
          setParameters({ ...parameters, maxTokens: parsedValue });
        }
      };
    
      const handleInputBlur = () => {
        const parsedValue = parseInt(inputValue, 10);
        if (isNaN(parsedValue) || parsedValue < 1) {
          setInputValue('1');
          setParameters({ ...parameters, maxTokens: 1 });
        } else if (parsedValue > 100000) {
          setInputValue('100000');
          setParameters({ ...parameters, maxTokens: 100000 });
        }
      };
  return (
    <div className="w-64 bg-gray-100 p-4">
      <h2 className="text-lg font-bold mb-4">Parameters</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="model">Model</Label>
          <Select
            value={parameters.model}
            onValueChange={(value) => setParameters({ ...parameters, model: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              {models.map((model) => (
                <SelectItem key={model} value={model}>
                  {model}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="temperature">Temperature: {parameters.temperature}</Label>
          <Slider
            id="temperature"
            min={0}
            max={1}
            step={0.1}
            value={[parameters.temperature]}
            onValueChange={(value) => setParameters({ ...parameters, temperature: value[0] })}
          />
        </div>
        <div>
          <Label htmlFor="topP">Top P: {parameters.topP}</Label>
          <Slider
            id="topP"
            min={0}
            max={1}
            step={0.1}
            value={[parameters.topP]}
            onValueChange={(value) => setParameters({ ...parameters, topP: value[0] })}
          />
        </div>
        <div>
          <Label htmlFor="topK">Top K: {parameters.topK}</Label>
          <Slider
            id="topK"
            min={0}
            max={100}
            step={1}
            value={[parameters.topK]}
            onValueChange={(value) => setParameters({ ...parameters, topK: value[0] })}
          />
        </div>
        <div>
          <Label htmlFor="maxTokens">Max Tokens: {parameters.maxTokens}</Label>
          <Slider
            id="maxTokens"
            min={1}
            max={100000}
            step={1}
            value={[parameters.maxTokens]}
            onValueChange={handleSliderChange}          />
        </div>
        <div className="flex items-center space-x-4">
        <Label htmlFor="maxTokensInput" className="w-24">Enter value:</Label>
        <Input
          id="maxTokensInput"
          type="number"
          min={1}
          max={100000}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          className="w-24"
        />
      </div>
      </div>
    </div>
  );
};
