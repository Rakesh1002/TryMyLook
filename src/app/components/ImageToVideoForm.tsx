'use client';

import { useState, useRef } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Slider } from '../../components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { FaPlus } from 'react-icons/fa';

export default function ImageToVideoForm() {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [cfgScale, setCfgScale] = useState(0.5);
  const [mode, setMode] = useState<'std' | 'pro'>('std');
  const [duration, setDuration] = useState<'5' | '10'>('5');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  const imageInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) {
      setError('Please select an image.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResultUrl(null);

    const formData = new FormData();
    formData.append('requestType', 'img2video');
    formData.append('image', image);
    formData.append('prompt', prompt);
    formData.append('negative_prompt', negativePrompt);
    formData.append('cfg_scale', cfgScale.toString());
    formData.append('mode', mode);
    formData.append('duration', duration);

    try {
      const response = await fetch('/api/try-on', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', JSON.stringify(data, null, 2));

      if (data.result) {
        setResultUrl(data.result);
      } else {
        throw new Error('No result URL found in the response');
      }
    } catch (err) {
      console.error('Error details:', err);
      setError(
        `An error occurred while processing the image: ${
          err instanceof Error ? err.message : String(err)
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <Card>
        <CardContent className="pt-6">
          <Label htmlFor="image" className="text-lg font-semibold">
            Input Image
          </Label>
          <div className="mt-2">
            <div
              className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden cursor-pointer flex items-center justify-center"
              onClick={() => imageInputRef.current?.click()}
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Image preview"
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <FaPlus className="text-gray-400 text-4xl" />
              )}
            </div>
            <Input
              ref={imageInputRef}
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div>
          <Label htmlFor="prompt" className="text-lg font-semibold">
            Prompt
          </Label>
          <Input
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt here"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="negativePrompt" className="text-lg font-semibold">
            Negative Prompt
          </Label>
          <Input
            id="negativePrompt"
            value={negativePrompt}
            onChange={(e) => setNegativePrompt(e.target.value)}
            placeholder="Enter negative prompt here"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="cfgScale" className="text-lg font-semibold">
            CFG Scale: {cfgScale}
          </Label>
          <Slider
            id="cfgScale"
            min={0}
            max={1}
            step={0.01}
            value={[cfgScale]}
            onValueChange={(value) => setCfgScale(value[0])}
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="mode" className="text-lg font-semibold">
            Mode
          </Label>
          <Select
            value={mode}
            onValueChange={(value: 'std' | 'pro') => setMode(value)}
          >
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Select mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="std">Standard</SelectItem>
              <SelectItem value="pro">Professional</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="duration" className="text-lg font-semibold">
            Duration
          </Label>
          <Select
            value={duration}
            onValueChange={(value: '5' | '10') => setDuration(value)}
          >
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5 seconds</SelectItem>
              <SelectItem value="10">10 seconds</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <Button
          type="submit"
          disabled={isLoading || !image}
          className="w-full md:w-auto px-8 py-3 text-lg font-semibold transition-colors duration-200 ease-in-out
                     bg-blue-500 hover:bg-blue-600 text-white hover:text-yellow-200"
        >
          {isLoading ? 'Processing...' : 'Generate Video'}
        </Button>
      </div>

      {error && (
        <Card className="mt-6 bg-red-50">
          <CardContent>
            <p className="text-red-500">{error}</p>
          </CardContent>
        </Card>
      )}

      {resultUrl && (
        <Card className="mt-6">
          <CardContent>
            <h2 className="text-2xl font-semibold mb-4">Result</h2>
            <video controls className="w-full">
              <source src={resultUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </CardContent>
        </Card>
      )}
    </form>
  );
}
