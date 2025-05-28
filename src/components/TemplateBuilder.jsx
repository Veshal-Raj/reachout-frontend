import { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Save, Eye, Trash2, X, Paperclip, Plus, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { createEmailTemplate, getEmailTemplates } from '../api';
import { toast } from 'sonner';
import { CLOUD_NAME, formats, modules, UPLOAD_PRESET } from '../utils/folder/general';
import AnimatedBg from './helper/AnimatedBg';
import EmailTemplates from './EmailTemplates';
import TemplatePreview from './TemplatePreview';
import useDebounce from '../hooks/useDebounce';

export default function TemplateBuilder() {
  const [templateName, setTemplateName] = useState('');
  const [subject, setSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [attachments, setAttachment] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const fileInputRef = useRef(null);
  const quillRef = useRef(null);

  const debouncedSearch = useDebounce(searchTerm, 500);

  const handleDeleteTemplate = () => {
    setTemplateName('');
    setSubject("");
    setEmailBody('');
    setAttachment(null);
    toast('Template cleared', {
      description: 'Template editor has been reset'
    });
  };

  const togglePreviewModal = () => {
    if (!templateName.trim() || !emailBody.trim()) {
      toast.error('Please enter template name and content before preview');
      return;
    }
    setIsPreviewModalOpen(!isPreviewModalOpen);
  };

  const handleAttachmentUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      toast.error("Please upload a file");
      return;
    }

    // File validation
    if (!['application/pdf', 'image/jpeg', 'image/png'].includes(file.type)) {
      toast.error(`Unsupported file type: ${file.name}`);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error(`File too large (max 5MB): ${file.name}`);
      return;
    }

    toast.loading('Uploading attachment...');

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", UPLOAD_PRESET);
    data.append("cloud_name", CLOUD_NAME);

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dmlsgfbwu/image/upload", {
          method: "POST",
          body: data
        }
      );

      const uploadedImageUrl = await response.json();
      
      setAttachment({
        url: uploadedImageUrl.url,
        name: file.name,
        size: file.size
      });
      toast.dismiss();
      toast.success('Attachment uploaded successfully');

    } catch (error) {
      console.error("Upload error:", error);
      toast.dismiss();
      toast.error("Failed to upload file");
    }
  };

  const removeAttachment = () => {
    setAttachment(null);
    toast('Attachment removed');
  };

  const handleSaveTemplate = async () => {
    // Validate inputs (without checking attachments)
    if (!templateName.trim()) {
      toast.error('Please enter a template name');
      return;
    }

    if (!subject.trim()) {
      toast.error('Please enter a subject');
      return;
    }

    if (!emailBody.trim()) {
      toast.error('Please add content to your email body');
      return;
    }

    // Create payload with attachments
    const payload = {
      templateName: templateName,
      subject: subject,
      emailBody: emailBody,
      attachments: attachments
    };

    setIsSending(true);
    
    const saveTemplatePromise = async () => {
      const response = await createEmailTemplate(payload);

      if (response.success) {
        // Reset form after successful save
        setTemplateName('');
        setSubject('');
        setEmailBody('');
        setAttachment(null);
        
        // Refresh templates list
        const templatesResponse = await getEmailTemplates();
        if (templatesResponse?.success) {
          setTemplates(templatesResponse?.templatesData?.items || []);
        }
        
        setIsSending(false);
        return { message: response?.message || 'Template saved successfully!' };
      } else {
        setIsSending(false);
        throw new Error(response?.message || 'Failed to save template. Please try again.');
      }
    };

    toast.promise(saveTemplatePromise(), {
      loading: 'Saving template...',
      success: (data) => data.message,
      error: (err) => err.message || 'Something went wrong during save',
    });
  };

  return (
    <div className="relative min-h-screen z-10">
      {/* Animated background */}
      <AnimatedBg />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10 p-4">
        {/* Template Editor Section */}
        <div className="lg:col-span-8">
          <motion.div 
            className="backdrop-blur-xl bg-slate-800/50 rounded-2xl border border-white/10 p-6 shadow-xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="h-10 w-10 rounded-lg bg-gradient-to-r from-purple-600/30 to-blue-600/30 flex items-center justify-center backdrop-blur-sm"
            >
              <Mail className="h-5 w-5 text-purple-400" />
            </motion.div>
              <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                Create Email Template
              </h2>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <label className="block text-sm font-medium mb-2 text-white/80">
                    Template Name
                  </label>
                  <input 
                    type="text" 
                    placeholder="Recruiter Follow-up"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 placeholder-white/30 text-white backdrop-blur-sm"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <label className="block text-sm font-medium mb-2 text-white/80">
                    Subject Line
                  </label>
                  <input 
                    type="text" 
                    placeholder="Exciting Opportunity at Tech Corp"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 placeholder-white/30 text-white backdrop-blur-sm"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <label className="block text-sm font-medium mb-2 text-white/80">
                  Email Content
                </label>
                <div className="border border-white/10 rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm">
                  <ReactQuill 
                    ref={quillRef}
                    theme="snow" 
                    value={emailBody} 
                    onChange={setEmailBody}
                    modules={modules}
                    formats={formats}
                    placeholder="Compose your email..."
                    className="min-h-64 h-64 mb-12 text-white"
                    style={{ 
                      '--text-color': 'rgba(255, 255, 255, 0.9)',
                      '--placeholder-color': 'rgba(255, 255, 255, 0.4)'
                    }}
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-medium mb-2 text-white/80">
                  Attachments
                </label>
                <div className="border-2 border-dashed border-white/10 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex flex-col gap-2">
                    {attachments ? (
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-full bg-blue-500/10 flex items-center justify-center">
                            <Paperclip className="h-4 w-4 text-blue-400" />
                          </div>
                          <div>
                            <p className="font-medium text-white/90 truncate max-w-[180px]">
                              {attachments.name}
                            </p>
                            <p className="text-xs text-blue-400">
                              {(attachments.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button 
                          onClick={removeAttachment}
                          className="h-8 w-8 rounded-full hover:bg-white/5 flex items-center justify-center transition-colors"
                        >
                          <X className="h-4 w-4 text-red-400" />
                        </button>
                      </div>
                    ) : (
                      <div className="text-center py-4 text-white/40">
                        No attachments added
                      </div>
                    )}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => fileInputRef.current.click()}
                    className="w-full mt-4 px-4 py-2 rounded-lg border border-white/10 text-sm font-medium flex items-center justify-center gap-2 hover:bg-white/5"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Attachment</span>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleAttachmentUpload}
                      accept=".pdf,.jpg,.jpeg,.png"
                      style={{ display: 'none' }}
                    />
                  </motion.button>
                  <p className="text-xs text-white/40 mt-2 text-center">
                    PDF, JPG, PNG (Max 5MB)
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center justify-center px-4 py-2.5 rounded-lg border ${
                    !templateName && !subject && !emailBody 
                      ? 'border-white/10 opacity-50 cursor-not-allowed' 
                      : 'border-red-500/30 hover:bg-red-500/10'
                  } text-sm font-medium text-red-400`}
                  onClick={handleDeleteTemplate}
                  disabled={!templateName && !subject && !emailBody}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center justify-center px-4 py-2.5 rounded-lg border ${
                    !templateName || !emailBody 
                      ? 'border-white/10 opacity-50 cursor-not-allowed' 
                      : 'border-blue-500/30 hover:bg-blue-500/10'
                  } text-sm font-medium text-blue-400`}
                  onClick={togglePreviewModal}
                  disabled={!templateName || !emailBody}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                    !templateName || !subject || !emailBody 
                      ? 'bg-gradient-to-r from-blue-600/50 to-purple-600/50 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                  } shadow-lg`}
                  onClick={handleSaveTemplate}
                  disabled={!templateName || !subject || !emailBody}
                >
                  {isSending ? <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </> : <div className="flex items-center justify-center">
                    <Save className="h-4 w-4 mr-2" />
                    Save Template
                  </div>}
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Templates List Section */}
        <EmailTemplates 
          debouncedSearch={debouncedSearch}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          templates={templates}
          setTemplates={setTemplates}
        />
      </div>

      {/* Preview Modal */}
      <TemplatePreview 
        attachments={attachments}
        isPreviewModalOpen={isPreviewModalOpen}
        togglePreviewModal={togglePreviewModal}
        emailBody={emailBody}
        subject={subject}
        templateName={templateName}
      />
    </div>
  );
}