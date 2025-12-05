import { useState } from 'react';
import { teacherApi } from '../../api/teacherApi';
import Button from '../common/Button';
import Card from '../common/Card';
import Input from '../common/Input';
import { Upload, File, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

function CurriculumUpload() {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    gradeLevel: '',
    description: ''
  });
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(selectedFile.type)) {
        toast.error('Only PDF and DOCX files are allowed');
        return;
      }

      // Validate file size (10MB)
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast.error('File size must be less than 10MB');
        return;
      }

      setFile(selectedFile);
      // Auto-fill title from filename
      if (!formData.title) {
        setFormData({ ...formData, title: selectedFile.name.replace(/\.[^/.]+$/, '') });
      }
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      if (!formData.title) {
        setFormData({ ...formData, title: droppedFile.name.replace(/\.[^/.]+$/, '') });
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error('Please select a file');
      return;
    }

    setUploading(true);

    try {
      // Create FormData
      const uploadData = new FormData();
      uploadData.append('file', file);
      uploadData.append('title', formData.title);
      uploadData.append('subject', formData.subject);
      uploadData.append('gradeLevel', formData.gradeLevel);
      uploadData.append('description', formData.description);

      // Upload curriculum
      const response = await teacherApi.uploadCurriculum(uploadData);
      toast.success('Curriculum uploaded successfully!');

      setUploadResult({
        id: response.data.id,
        status: 'uploaded'
      });

      // Trigger AI processing
      setProcessing(true);
      await teacherApi.processCurriculum(response.data.id);
      toast.success('AI processing started! This may take a few minutes.');

      setUploadResult({
        id: response.data.id,
        status: 'processing'
      });

      // Reset form
      setFile(null);
      setFormData({ title: '', subject: '', gradeLevel: '', description: '' });

    } catch (error) {
      toast.error(error.message || 'Upload failed');
      setUploadResult({
        status: 'error',
        message: error.message
      });
    } finally {
      setUploading(false);
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Curriculum</h2>
        <p className="text-gray-600">Upload educational materials for AI processing</p>
      </div>

      <Card>
        <form onSubmit={handleUpload} className="space-y-6">
          {/* File Upload Area */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Curriculum File
            </label>
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-500 transition cursor-pointer"
            >
              {file ? (
                <div className="space-y-2">
                  <File className="w-12 h-12 text-primary-600 mx-auto" />
                  <p className="text-sm font-medium text-gray-900">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <button
                    type="button"
                    onClick={() => setFile(null)}
                    className="text-sm text-danger-600 hover:text-danger-700"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                  <div>
                    <label htmlFor="file-upload" className="text-primary-600 hover:text-primary-700 font-medium cursor-pointer">
                      Click to upload
                    </label>
                    <span className="text-gray-600"> or drag and drop</span>
                  </div>
                  <p className="text-xs text-gray-500">PDF or DOCX (max 10MB)</p>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept=".pdf,.docx"
                    onChange={handleFileChange}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Title"
              placeholder="e.g., Grade 5 Mathematics"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />

            <Input
              label="Subject"
              placeholder="e.g., Mathematics"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Grade Level"
              placeholder="e.g., 5"
              value={formData.gradeLevel}
              onChange={(e) => setFormData({ ...formData, gradeLevel: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description (Optional)
            </label>
            <textarea
              placeholder="Brief description of the curriculum..."
              className="input"
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end space-x-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                setFile(null);
                setFormData({ title: '', subject: '', gradeLevel: '', description: '' });
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              icon={Upload}
              loading={uploading || processing}
              disabled={!file}
            >
              {processing ? 'Processing...' : uploading ? 'Uploading...' : 'Upload & Process'}
            </Button>
          </div>
        </form>
      </Card>

      {/* Upload Result */}
      {uploadResult && (
        <Card>
          <div className="flex items-start">
            {uploadResult.status === 'processing' && (
              <>
                <Loader2 className="w-6 h-6 text-primary-600 animate-spin mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Processing with AI</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Your curriculum is being processed. This includes:
                  </p>
                  <ul className="text-sm text-gray-600 mt-2 space-y-1 list-disc list-inside">
                    <li>Extracting text from document</li>
                    <li>Simplifying content for accessibility</li>
                    <li>Generating visual learning cards</li>
                    <li>Creating audio narration</li>
                  </ul>
                </div>
              </>
            )}
            {uploadResult.status === 'uploaded' && (
              <>
                <CheckCircle className="w-6 h-6 text-success-600 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Upload Successful</h4>
                  <p className="text-sm text-gray-600 mt-1">Your curriculum has been uploaded.</p>
                </div>
              </>
            )}
            {uploadResult.status === 'error' && (
              <>
                <AlertCircle className="w-6 h-6 text-danger-600 mr-3 mt-1" />
                <div>
                  <h4 className="font-semibold text-gray-900">Upload Failed</h4>
                  <p className="text-sm text-gray-600 mt-1">{uploadResult.message}</p>
                </div>
              </>
            )}
          </div>
        </Card>
      )}

      {/* Info Card */}
      <Card>
        <h4 className="font-semibold text-gray-900 mb-3">💡 How it works</h4>
        <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
          <li>Upload your curriculum file (PDF or DOCX format)</li>
          <li>Our AI extracts and analyzes the content using Google Cloud Document AI</li>
          <li>Content is simplified using Vertex AI for students with Down syndrome</li>
          <li>Visual learning cards and audio narration are automatically generated</li>
          <li>Lessons become available for students to access</li>
        </ol>
      </Card>
    </div>
  );
}

export default CurriculumUpload;
