import { useState } from 'react';
import { UploadCloud, X, File } from 'lucide-react';

export default function EvidenceUpload() {
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      setFiles([...files, ...Array.from(e.dataTransfer.files)]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div 
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="w-full border-2 border-dashed border-white/[0.1] hover:border-cyan-500/50 rounded-2xl p-8 text-center transition-colors bg-black/20"
      >
        <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center mx-auto mb-4">
          <UploadCloud className="w-6 h-6 text-cyan-400" />
        </div>
        <p className="text-sm text-slate-300 mb-1">Drag and drop your evidence here</p>
        <p className="text-xs text-slate-500 mb-4">PNG, JPG, PDF up to 10MB</p>
        <label className="px-4 py-2 rounded-xl bg-white/[0.05] text-slate-300 border border-white/[0.1] hover:bg-white/[0.1] transition-all text-sm font-medium cursor-pointer inline-block">
          Browse Files
          <input type="file" className="hidden" multiple onChange={handleFileInput} />
        </label>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <div className="flex items-center gap-3">
                <File className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-slate-300 truncate max-w-[200px] sm:max-w-xs">{file.name}</span>
              </div>
              <button type="button" onClick={() => removeFile(i)} className="text-slate-500 hover:text-rose-400 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
