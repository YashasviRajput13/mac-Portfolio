# GDG OIST Web Platform

## Overview

The official website for Google Developer Groups On Campus at Oriental Institute of Science & Technology (OIST) Bhopal. A modern web platform designed to facilitate community engagement, event management, and developer resources.

## 🎯 Project Highlights

- **Organization**: GDG On Campus OIST
- **Technology**: Next.js with TypeScript
- **Purpose**: Community platform and event management
- **Deployment**: Vercel (Production)
- **Status**: Official GDG Platform

## 🏗️ System Architecture

### Core Modules

1. **Home & Landing**
   - Hero section with community introduction
   - Upcoming events showcase
   - Member highlights
   - Community statistics

2. **Events Management**
   - Event calendar and scheduling
   - Registration system
   - Event details and agendas
   - Past events archive

3. **Community Hub**
   - Member profiles and directory
   - Discussion forums
   - Resource sharing
   - Collaboration tools

4. **Resources Library**
   - Technical articles and tutorials
   - Workshop materials
   - Code repositories
   - Learning paths

## 🔧 Technical Implementation

### Frontend Architecture

```typescript
// Core Components
- HomePage (Main landing)
- EventsPage (Event management)
- CommunityPage (Member hub)
- ResourcesPage (Knowledge base)
```

### Backend Services

```typescript
// API Endpoints
- /api/events (Event CRUD)
- /api/members (Member management)
- /api/resources (Content management)
- /api/registrations (Event signups)
```

## 🎨 User Experience Design

### Design Principles
- **Google Material Design**: Consistent with Google ecosystem
- **Accessibility**: WCAG 2.1 compliance
- **Performance**: Optimized loading and interactions
- **Mobile-First**: Responsive design approach

### Visual Identity
- **Brand Colors**: Google GDG color palette
- **Typography**: Google Fonts (Roboto, Poppins)
- **Icons**: Material Design Icons
- **Animations**: Smooth transitions and micro-interactions

## 📊 Platform Features

### Event Management
- **Event Calendar**: Visual calendar with filtering
- **Registration System**: Online event signups
- **Event Types**: Workshops, meetups, hackathons
- **Notifications**: Email and SMS reminders

### Community Features
- **Member Profiles**: Developer portfolios
- **Discussion Forums**: Q&A and discussions
- **Project Showcase: Member projects
- **Mentorship**: Peer-to-peer learning

### Resource Hub
- **Technical Articles**: Developer tutorials
- **Workshop Materials**: Session resources
- **Code Examples**: Open-source projects
- **Learning Paths**: Structured curriculum

## 🛠️ Technical Stack

### Frontend Technologies
- **Framework**: Next.js 13
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: Headless UI
- **Animations**: Framer Motion

### Backend Technologies
- **Runtime**: Node.js
- **Framework**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **File Storage**: Cloudinary

### Third-party Services
- **Email**: SendGrid
- **Analytics**: Google Analytics
- **Deployment**: Vercel
- **Monitoring**: Sentry

## 📈 Community Impact

### Engagement Metrics
- **Active Members**: 200+ registered developers
- **Monthly Events**: 4-5 technical events
- **Workshop Attendance**: 50+ average participants
- **Community Growth**: 150% year-over-year

### Technical Contributions
- **Open Source**: 15+ community projects
- **Workshops**: 20+ technical sessions
- **Hackathons**: 3 successful hackathons
- **Mentorship**: 50+ mentorship pairs

## 🎯 Key Features

### Event System
- **Calendar View**: Interactive event calendar
- **Registration Management**: Online signup system
- **Event Types**: Workshops, tech talks, hackathons
- **Attendance Tracking**: Check-in and analytics

### Member Portal
- **Profile Management**: Customizable developer profiles
- **Skill Tags**: Technology expertise tagging
- **Project Showcase**: Portfolio integration
- **Achievement Badges: Participation rewards

### Resource Library
- **Categorized Content**: Organized by technology
- **Search Functionality**: Advanced search and filtering
- **User Contributions: Community-driven content
- **Rating System**: Content quality feedback

## 🔧 Implementation Details

### Database Schema

```typescript
// Event Model
interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  type: EventType;
  location: string;
  maxAttendees: number;
  currentAttendees: number;
  organizer: Member;
  agenda: AgendaItem[];
}

// Member Model
interface Member {
  id: string;
  name: string;
  email: string;
  bio: string;
  skills: string[];
  projects: Project[];
  events: Event[];
  badges: Badge[];
}
```

### API Implementation

```typescript
// Event Registration API
app.post('/api/events/:id/register', async (req, res) => {
  const eventId = req.params.id;
  const memberId = req.user.id;
  
  // Check availability
  const event = await Event.findById(eventId);
  if (event.currentAttendees >= event.maxAttendees) {
    return res.status(400).json({ error: 'Event full' });
  }
  
  // Register member
  await Event.findByIdAndUpdate(eventId, {
    $push: { attendees: memberId },
    $inc: { currentAttendees: 1 }
  });
  
  // Send confirmation
  await emailService.sendRegistrationConfirmation(memberId, event);
  
  res.json({ success: true });
});
```

### Frontend Component

```typescript
// Event Card Component
const EventCard: React.FC<EventProps> = ({ event }) => {
  const [isRegistered, setIsRegistered] = useState(false);
  
  const handleRegister = async () => {
    try {
      await registerForEvent(event.id);
      setIsRegistered(true);
      toast.success('Successfully registered!');
    } catch (error) {
      toast.error('Registration failed');
    }
  };
  
  return (
    <div className="event-card">
      <div className="event-header">
        <h3>{event.title}</h3>
        <span className="event-type">{event.type}</span>
      </div>
      <p className="event-description">{event.description}</p>
      <div className="event-details">
        <span className="event-date">{formatDate(event.date)}</span>
        <span className="event-location">{event.location}</span>
      </div>
      <div className="event-footer">
        <span className="attendee-count">
          {event.currentAttendees}/{event.maxAttendees}
        </span>
        <button 
          onClick={handleRegister}
          disabled={isRegistered}
          className="register-btn"
        >
          {isRegistered ? 'Registered' : 'Register'}
        </button>
      </div>
    </div>
  );
};
```

## 🎨 Design System

### Component Library
- **Buttons**: Primary, secondary, outline variants
- **Cards**: Event, member, resource cards
- **Forms**: Registration and contact forms
- **Navigation**: Header and footer components

### Theme Configuration
- **Colors**: Google GDG brand colors
- **Typography**: Consistent font hierarchy
- **Spacing**: Standardized spacing system
- **Breakpoints**: Responsive design breakpoints

## 📊 Performance Metrics

- **Page Load Time**: < 2 seconds
- **Lighthouse Score**: 95+ performance
- **Mobile Usability**: 100% mobile-friendly
- **SEO Score**: 95+ search optimization
- **Accessibility**: WCAG 2.1 AA compliant

## 📝 Learning Outcomes

- **Next.js Mastery**: Advanced framework features
- **Community Management**: User engagement strategies
- **Event Management**: Complex scheduling systems
- **Performance Optimization**: Web vitals improvement
- **Team Collaboration**: Open-source contributions

## 🔮 Future Enhancements

- **Mobile App**: Native GDG community app
- **Live Streaming**: Virtual event capabilities
- **Mentorship Platform**: Structured mentorship system
- **Job Board**: Career opportunities portal
- **International Collaboration**: Cross-chapter events

---

**Project Duration**: 3 months  
**Team Size**: Individual Project  
**Status**: Official GDG Platform - Live  

## 🔗 Links

- **Live Platform**: [gdg-oist.vercel.app](https://gdg-oist.vercel.app)
- **GitHub Repository**: [View Source Code](https://github.com/YashasviRajput13/gdg-oist)
- **GDG Community**: Official GDG page
- **Event Calendar**: Upcoming events schedule

---

*This project showcases my ability to build community platforms that bring developers together, facilitate learning, and promote technical collaboration within academic institutions.*
