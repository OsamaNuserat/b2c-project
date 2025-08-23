'use client';
import React, { useState, useRef } from 'react';
import { Box, Typography, Button, Paper, IconButton, Alert, CircularProgress } from '@mui/material';
import { CloudUpload as CloudUploadIcon, Delete as DeleteIcon, Image as ImageIcon } from '@mui/icons-material';
import { uploadImage } from '@/lib/api/client';

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange, disabled = false, error = false, helperText }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select an image file');
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const result = await uploadImage(file);
      onChange(result.url);
    } catch (error: any) {
      setUploadError(error.message || 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleRemoveImage = () => {
    onChange('');
    setUploadError(null);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileInput}
        style={{ display: 'none' }}
        disabled={disabled || isUploading}
      />
      
      {value ? (
        <Paper
          elevation={1}
          sx={{
            p: 2,
            border: error ? '2px solid #d32f2f' : '2px solid #e0e0e0',
            borderRadius: 1,
            position: 'relative',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <img
              src={value}
              alt="Product"
              style={{
                width: 80,
                height: 80,
                objectFit: 'cover',
                borderRadius: 4,
                cursor: 'pointer',
              }}
              onClick={() => window.open(value, '_blank')}
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Image uploaded successfully
              </Typography>
            </Box>
            <IconButton
              onClick={handleRemoveImage}
              disabled={disabled || isUploading}
              color="error"
              size="small"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Paper>
      ) : (
        <Paper
          elevation={1}
          sx={{
            p: 3,
            border: error ? '2px solid #d32f2f' : dragActive ? '2px solid #1976d2' : '2px dashed #e0e0e0',
            borderRadius: 1,
            backgroundColor: dragActive ? '#f5f5f5' : 'transparent',
            cursor: disabled || isUploading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
          }}
          onClick={handleClick}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
            }}
          >
            {isUploading ? (
              <CircularProgress size={40} />
            ) : (
              <CloudUploadIcon sx={{ fontSize: 40, color: 'text.secondary' }} />
            )}
            <Typography variant="body2" color="text.secondary" textAlign="center">
              {isUploading
                ? 'Uploading...'
                : 'Drag and drop an image here, or click to select'}
            </Typography>
            <Typography variant="caption" color="text.secondary" textAlign="center">
              Supports: JPG, PNG, GIF, WebP (max 5MB)
            </Typography>
          </Box>
        </Paper>
      )}
      
      {(uploadError || helperText) && (
        <Alert
          severity={uploadError ? 'error' : 'info'}
          sx={{ mt: 1 }}
          onClose={uploadError ? () => setUploadError(null) : undefined}
        >
          {uploadError || helperText}
        </Alert>
      )}
    </Box>
  );
}; 