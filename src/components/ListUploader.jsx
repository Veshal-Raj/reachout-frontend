import { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import { toast } from 'sonner';
import { Upload, X, FileText, Eye, Trash2, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { getLists, uploadExcel } from '../api';
import PreviewModal from './PreviewModal';
import ListTable from './ListTable';
import { validateEmail } from '../utils/folder/general';
import AnimatedBg from './helper/AnimatedBg';

export default function ListUploader() {
  const [listName, setListName] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [parsedData, setParsedData] = useState([]);
  const [lists, setLists] = useState([]);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    if (!selectedFile.name.match(/\.(xlsx|xls)$/)) {
      toast.error('Please upload a valid Excel file');
      return;
    }

    setFile(selectedFile);
    setFileName(selectedFile.name);

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const workbook = XLSX.read(evt.target.result, { type: 'binary' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);

        const hasInvalidRows = data.some(row => 
          !row.Name || !row.Email || !validateEmail(row.Email)
        );

        if (hasInvalidRows) {
          toast.error('File contains invalid data. Please ensure all rows have valid Name and Email fields.');
          return;
        }

        const formattedData = data.map(row => ({
          receiverName: row.Name,
          receiverEmail: row.Email
        }));

        setParsedData(formattedData);
        toast.success('File processed successfully!');
      } catch (error) {
        console.error('Error parsing Excel file:', error);
        toast.error('Failed to process the Excel file. Please check the format.');
      }
    };
    reader.readAsBinaryString(selectedFile);
  };

  const handleDeleteList = () => {
    setFile(null);
    setFileName('');
    setParsedData([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    toast('List deleted', {
      description: 'Your uploaded list has been cleared'
    });
  };

  const handleSubmit = async () => {
    if (!listName.trim()) {
      toast.error('Please enter a list name');
      return;
    }

    if (!file || parsedData.length === 0) {
      toast.error('Please upload a valid Excel file');
      return;
    }

    setIsSending(true);

    const payload = {
      listName: listName,
      data: parsedData
    };
    
    const createListPromise = async () => {
      const response = await uploadExcel(payload);

      if (response?.success) {
        // Reset form after successful upload
        setListName('');
        setFile(null);
        setFileName('');
        setParsedData([]);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        
        // Refresh lists
        const listsResponse = await getLists();
        if (listsResponse?.success) {
          setLists(listsResponse?.listBuilders || []);
        }
        setIsSending(false);
        return { 
          message: response?.message || 'List uploaded successfully', 
          description: `Processed ${parsedData.length} contacts` 
        };
      } else {
        setIsSending(false);
        throw new Error(response?.message || 'Failed to upload list. Please try again.');
      }
    };

    toast.promise(createListPromise(), {
      loading: "Creating List...",
      success: (data) => (
        <div>
          <p className="font-semibold">{data.message}</p>
          <p className="text-sm text-gray-500">{data.description}</p>
        </div>
      ),
      error: (err) => err.message || "Something went wrong during upload"
    });
  };

  const togglePreviewModal = () => {
    setIsPreviewModalOpen(!isPreviewModalOpen);
  };

  return (
    <div className="relative min-h-screen z-10">
      {/* Animated background */}
      <AnimatedBg />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        {/* Upload Section */}
        <div className="lg:col-span-5 xl:col-span-4">
          <motion.div 
            className="backdrop-blur-xl bg-slate-800/50 rounded-2xl border border-white/10 p-6 shadow-xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-r from-blue-600/30 to-purple-600/30 flex items-center justify-center backdrop-blur-sm">
                <Upload className="h-5 w-5 text-blue-400" />
              </div>
              <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                Upload New List
              </h2>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2 text-white/80">
                  List Name
                </label>
                <input 
                  type="text" 
                  placeholder="Recruiter Contacts Q3"
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 placeholder-white/30 text-white backdrop-blur-sm"
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2 text-white/80">
                  Upload Excel File
                </label>
                <div className={`border-2 border-dashed rounded-lg transition-all duration-300 ${
                  fileName ? 'border-blue-500/30' : 'border-white/10 hover:border-blue-500/30'
                }`}>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept=".xlsx,.xls"
                    className="hidden"
                    onChange={handleFileChange}
                    id="file-upload"
                  />

                  {!fileName ? (
                    <label 
                      htmlFor="file-upload" 
                      className="flex flex-col items-center justify-center py-8 px-4 cursor-pointer"
                    >
                      <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-600/30 to-purple-600/30 flex items-center justify-center mb-3 backdrop-blur-sm">
                        <Upload className="h-6 w-6 text-blue-400" />
                      </div>
                      <p className="font-medium text-white/90">
                        Drag & Drop File
                      </p>
                      <p className="text-xs text-white/60 mt-1">
                        .xlsx or .xls files only
                      </p>
                    </label>
                  ) : (
                    <div className="p-4">
                      <div className="flex items-center justify-between bg-white/5 p-3 rounded-lg border border-white/10 backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                            <FileText className="h-5 w-5 text-green-400" />
                          </div>
                          <div>
                            <p className="font-medium text-white/90 truncate max-w-[180px]">
                              {fileName}
                            </p>
                            <p className="text-xs text-green-400">
                              {parsedData.length} contacts loaded
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={handleDeleteList}
                          className="h-8 w-8 rounded-full hover:bg-white/5 flex items-center justify-center transition-colors"
                        >
                          <X className="h-4 w-4 text-red-400" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center justify-center px-4 py-2.5 rounded-lg border ${
                    parsedData.length === 0 
                      ? 'border-white/10 opacity-50 cursor-not-allowed' 
                      : 'border-blue-500/30 hover:bg-blue-500/10'
                  } text-sm font-medium text-blue-400`}
                  onClick={togglePreviewModal}
                  disabled={parsedData.length === 0}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center justify-center px-4 py-2.5 rounded-lg border ${
                    !file 
                      ? 'border-white/10 opacity-50 cursor-not-allowed' 
                      : 'border-red-500/30 hover:bg-red-500/10'
                  } text-sm font-medium text-red-400`}
                  onClick={handleDeleteList}
                  disabled={!file}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </motion.button>
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
                  !listName || parsedData.length === 0 
                    ? 'bg-gradient-to-r from-blue-600/50 to-purple-600/50 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                } shadow-lg`}
                onClick={handleSubmit}
                disabled={!listName || parsedData.length === 0}
              >
                { isSending ? <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </> : <div className="flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Create List
                </div>
                }
              </motion.button>
            </div>
          </motion.div>
        </div>
        
        {/* Lists Section */}
        <ListTable 
          lists={lists} 
          setLists={setLists} />

      </div>

      {/* Preview Modal */}
      <PreviewModal 
        isPreviewModalOpen={isPreviewModalOpen} 
        parsedData={parsedData} 
        togglePreviewModal={togglePreviewModal} />
    </div>
  );
}