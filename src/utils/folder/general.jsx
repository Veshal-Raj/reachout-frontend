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

export const jobSeekerTestimonials = [
        {
            avatar: "M",
            name: "Michael Chen",
            role: "Software Engineer",
            company: "Hired at TechCorp",
            content: "I was struggling to get responses from recruiters until I used this platform. The ability to import my recruiter list from LinkedIn and send personalized emails on a schedule helped me land 3 interviews in my first week!"
        },
        {
            avatar: "J",
            name: "Jessica Miller",
            role: "Marketing Specialist",
            company: "Hired at BrandSync",
            content: "The email templates were a game-changer for my job search. I customized them for different roles and companies, and my response rate skyrocketed. I got my dream job after just 2 weeks of using this platform."
        },
        {
            avatar: "R",
            name: "Robert Johnson",
            role: "Data Analyst",
            company: "Hired at DataViz",
            content: "As someone who hates cold emailing, this platform made the process painless. I uploaded my Excel list of target companies, created a template, and scheduled the campaign. The analytics helped me refine my approach until I got results."
        },
        {
            avatar: "S",
            name: "Sarah Patel",
            role: "UX Designer",
            company: "Hired at CreativeHub",
            content: "Being able to track which recruiters opened my emails and when they did so helped me time my follow-ups perfectly. I went from zero responses to multiple interviews in just days. Worth every penny!"
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