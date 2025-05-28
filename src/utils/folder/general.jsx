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
            icon: <svg data-testid="excel-icon" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>,
            color: "from-blue-500 to-blue-700",
            title: "Excel List Import",
            desc: "Easily upload your recruiter contact lists from Excel or CSV and convert them into targeted email campaigns."
        },
        {
            icon: <svg data-testid="email-icon" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>,
            color: "from-purple-500 to-purple-700",
            title: "Email Templates",
            desc: "Create personalized email templates that stand out to recruiters and improve your chances of getting interviews."
        },
        {
            icon: <svg data-testid="schedule-icon" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>,
            color: "from-green-500 to-green-700",
            title: "Smart Scheduling",
            desc: "Schedule your emails to send at optimal times when recruiters are most likely to read and respond to your messages."
        },
        {
            icon: <svg data-testid="analytics-icon" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>,
            color: "from-amber-500 to-amber-700",
            title: "Campaign Analytics",
            desc: "Track open rates, responses, and interview requests to optimize your job application outreach strategy."
        }
    ];

export const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };