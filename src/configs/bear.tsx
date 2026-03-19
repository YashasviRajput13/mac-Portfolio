import type { BearData } from "~/types";

const bear: BearData[] = [
  {
    id: "profile",
    title: "Profile",
    icon: "i-fa-solid:paw",
    md: [
      {
        id: "about-me",
        title: "About Me",
        file: "markdown/about-me.md",
        icon: "i-la:dragon",
        excerpt: "Hey there! I'm a dragon lost in human world..."
      },
      {
        id: "github-stats",
        title: "Github Stats",
        file: "markdown/github-stats.md",
        icon: "i-icon-park-outline:github",
        excerpt: "Here are some status about my github account..."
      },
      {
        id: "about-site",
        title: "About This Site",
        file: "markdown/about-site.md",
        icon: "i-octicon:browser",
        excerpt: "Something about this personal portfolio site..."
      }
    ]
  },
  {
    id: "project",
    title: "Projects",
    icon: "i-octicon:repo",
    md: [
      {
        id: "food-court-management",
        title: "Food Court Management System",
        file: "markdown/food-court-management.md",
        icon: "i-heroicons-solid:fire",
        excerpt: "Built a Java-based system to automate order processing, billing, and inventory using OOP principles.",
        link: "https://github.com/YashasviRajput13/Food-Court-Management-System"
      },
      {
        id: "bidirectional-client-server",
        title: "Bi-Directional Client–Server System",
        file: "markdown/bidirectional-client-server.md",
        icon: "i-ri:gamepad-line",
        excerpt: "Implemented real-time two-way communication using socket programming.",
        link: "https://github.com/YashasviRajput13/Bi-Directional-Client-Server-System"
      },
      {
        id: "employee-management",
        title: "Employee Management System",
        file: "markdown/employee-management.md",
        icon: "i-ri:newspaper-fill",
        excerpt: "Developed a GUI-based system for managing employee records.",
        link: "https://github.com/YashasviRajput13/Employee-Management-System"
      },
      {
        id: "ai-citizen-services",
        title: "AI-Powered Citizen Services Portal",
        file: "markdown/ai-citizen-services.md",
        icon: "i-heroicons:building-office",
        excerpt: "Built a conversational AI platform to simplify access to government schemes.",
        link: "https://citizen-services-portal.vercel.app"
      },
      {
        id: "plan-my-event",
        title: "Plan My Event",
        file: "markdown/plan-my-event.md",
        icon: "i-akar-icons:sword",
        excerpt: "Developed an event management platform for planning, vendor booking, and workflow automation.",
        link: "https://plan-my-event.vercel.app"
      },
      {
        id: "gdg-oist-platform",
        title: "GDG OIST Web Platform",
        file: "markdown/gdg-oist-platform.md",
        icon: "i-icon-park-outline:heavy-metal",
        excerpt: "Built the official GDG On Campus OIST website for events and community updates.",
        link: "https://gdg-oist.vercel.app/"
      }
    ]
  }
];

export default bear;
