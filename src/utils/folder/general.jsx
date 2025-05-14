import { Send, FileText, Calendar, Users, ArrowRight, Check, Star, ChevronRight } from 'lucide-react';

export const AVATAR_URL="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"

export const USERNAME="Veshal Raj"

export const EMAIL="veshalraj1307@gmail.com"

// Quill editor modules configuration
export const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ]
  };

export const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'color', 'background',
    'list', 'bullet',
    'align',
    'link', 'image'
  ];


export const UPLOAD_PRESET="reachout.cloudinary"

export const CLOUD_NAME="dmlsgfbwu"

export const testimonials = [
  {
    avatar: "A",
    name: "Sarah Johnson",
    role: "Technical Recruiter",
    company: "HireFast",
    content: "The Excel integration saved us hundreds of hours. Now we can take a candidate list and launch a personalized campaign in minutes."
  },
  {
    avatar: "J",
    name: "Michael Chen",
    role: "Talent Acquisition Lead",
    company: "StartupGrid",
    content: "Being able to attach PDFs to templates and schedule follow-ups automatically has doubled our response rates."
  }
];

// LandingPage Features with enhanced descriptions
 export const features = [
  {
    icon: <Users className="h-8 w-8" />,
    title: 'Excel List Management',
    desc: 'Import & organize recruiter data directly from Excel sheets with smart deduplication and tagging',
    color: 'from-blue-600 to-cyan-400'
  },
  {
    icon: <FileText className="h-8 w-8" />,
    title: 'Dynamic Templates',
    desc: 'Create personalized email templates with PDF attachments and dynamic merge tags',
    color: 'from-violet-600 to-purple-400'
  },
  {
    icon: <Send className="h-8 w-8" />,
    title: 'Smart Campaign Builder',
    desc: 'Combine any recruiter list with templates and schedule multi-step sequences',
    color: 'from-emerald-600 to-green-400'
  },
  {
    icon: <Calendar className="h-8 w-8" />,
    title: 'Precision Scheduling',
    desc: 'Automate delivery with timezone-aware scheduling and send-time optimization',
    color: 'from-amber-600 to-yellow-400'
  },
];

export const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };