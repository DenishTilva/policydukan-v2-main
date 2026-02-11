import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Upload,
  FileText,
  Image,
  X,
  FileCheck,
  AlertCircle,
} from "lucide-react";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  category: string;
}

interface DocumentUploadProps {
  files: UploadedFile[];
  onChange: (files: UploadedFile[]) => void;
}

const documentCategories = [
  { id: "policy", label: "Policy Document", required: true },
  { id: "rc", label: "RC Copy", required: false },
  { id: "previous", label: "Previous Policy", required: false },
  { id: "kyc", label: "KYC Documents", required: false },
  { id: "other", label: "Other", required: false },
];

export function DocumentUpload({ files, onChange }: DocumentUploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("policy");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      handleFiles(selectedFiles);
    }
  };

  const handleFiles = (newFiles: File[]) => {
    const uploadedFiles: UploadedFile[] = newFiles.map((file) => ({
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      category: selectedCategory,
    }));
    onChange([...files, ...uploadedFiles]);
  };

  const removeFile = (id: string) => {
    onChange(files.filter((f) => f.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return Image;
    return FileText;
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      policy: "bg-primary/10 text-primary",
      rc: "bg-success/10 text-success",
      previous: "bg-warning/10 text-warning",
      kyc: "bg-purple-100 text-purple-700",
      other: "bg-muted text-muted-foreground",
    };
    return colors[category] || colors.other;
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-base flex items-center gap-2">
          <FileCheck className="h-4 w-4 text-primary" />
          Document Upload
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Category Selection */}
        <div className="flex flex-wrap gap-2">
          {documentCategories.map((cat) => (
            <Button
              key={cat.id}
              type="button"
              variant={selectedCategory === cat.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(cat.id)}
              className="text-xs"
            >
              {cat.label}
              {cat.required && (
                <span className="text-destructive ml-1">*</span>
              )}
            </Button>
          ))}
        </div>

        {/* Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
            transition-all duration-200
            ${
              dragOver
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50"
            }
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            onChange={handleFileSelect}
            className="hidden"
          />
          <Upload
            className={`h-10 w-10 mx-auto mb-3 ${
              dragOver ? "text-primary" : "text-muted-foreground"
            }`}
          />
          <p className="text-sm font-medium">
            Drop files here or click to upload
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            PDF, JPG, PNG, DOC up to 10MB each
          </p>
        </div>

        {/* Uploaded Files List */}
        {files.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">
              Uploaded Files ({files.length})
            </p>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {files.map((file) => {
                const FileIcon = getFileIcon(file.type);
                return (
                  <div
                    key={file.id}
                    className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg group"
                  >
                    <div className="h-10 w-10 rounded-lg bg-background flex items-center justify-center">
                      <FileIcon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-muted-foreground">
                          {formatFileSize(file.size)}
                        </span>
                        <Badge
                          variant="secondary"
                          className={`text-xs ${getCategoryColor(file.category)}`}
                        >
                          {
                            documentCategories.find((c) => c.id === file.category)
                              ?.label
                          }
                        </Badge>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeFile(file.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Info Banner */}
        <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-lg text-xs">
          <AlertCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <p className="text-muted-foreground">
            Upload policy documents, RC copy, and KYC documents. These will be
            stored securely and can be accessed from the policy detail page.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
