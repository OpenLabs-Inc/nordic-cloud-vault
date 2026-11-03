# 222244433

Full SaaS Product Specification Prompt (Dropbox-like)
















You are designing and generating a full-featured SaaS web application similar to Dropbox.
This is NOT a landing page. It must function like a real production-ready SaaS product with authentication, dashboard, file management, collaboration, and settings.
















⸻
















1. Product Overview
















Product type: Cloud Storage & Collaboration SaaS
Core value: Secure file storage, syncing, sharing, and team collaboration
Target users:
	•	Individuals
	•	Teams
	•	Small to medium businesses
















The product must feel robust, scalable, and complete, similar in depth and functionality to Dropbox, Google Drive, or Box.
















⸻
















2. Design & UI Style (Very Important)
















Design style: Minimal Scandinavian Theme
















Guidelines:
	•	Clean, calm, and functional UI
	•	Large white spaces
	•	Soft neutral colors (white, off-white, light gray, soft blue)
	•	No heavy shadows, no visual clutter
	•	Rounded corners (subtle)
	•	Clear typography (Inter / SF Pro / similar)
	•	Simple icons, line-based
	•	Focus on usability and clarity over decoration
















Overall feeling:
















Calm, modern, trustworthy, premium, Nordic minimalism
















⸻
















3. Core Pages & Functionality
















3.1 Public Pages (Pre-Login)
















Home / Marketing Page
Purpose: Explain product value and convert users
















Sections:
	•	Hero section with clear value proposition
	•	How it works (3–4 steps)
	•	Key features (storage, sharing, collaboration, security)
	•	Use cases (personal, teams, businesses)
	•	Pricing teaser
	•	Call to action (Sign up / Log in)
















Pricing Page
	•	Multiple plans (Free / Pro / Business)
	•	Feature comparison table
	•	Monthly / yearly toggle
	•	CTA buttons
Authentication
	•	Sign up (email + password)
	•	Log in
	•	Forgot password
	•	Email verification flow




3.2 Main App (Post-Login)




Dashboard (Home)
Purpose: User’s main entry point




Features:
	•	Storage usage overview
	•	Recently accessed files
	•	Quick actions (Upload file, Create folder)
	•	Recent activity feed




File Manager (Main Core Page)
This is the heart of the product.




Features:
	•	Folder structure (nested folders)
	•	File list view (table)
	•	Grid view toggle
	•	Upload files (drag & drop)
	•	Create / rename / delete folders
	•	File actions:
	•	Preview
	•	Download
	•	Rename
	•	Move
	•	Delete
	•	Search files and folders
	•	Sort by name, date, size




File Preview Page
	•	Preview documents, images, videos
	•	File metadata (size, type, owner, last modified)
	•	Download button
	•	Share button
	•	Comment section (for collaboration)




Shared Files
	•	Files shared with me
	•	Files shared by me
	•	Permission indicators (view / edit)
	•	Revoke access option




Collaboration & Sharing
	•	Generate shareable links
	•	Set permissions:
	•	View only
	•	Edit
	•	Invite users by email
	•	Expiration date for links
	•	Activity log per file




Teams / Workspace (For Business Users)
	•	Create or join a workspace
	•	Team member list
	•	Roles:
	•	Admin
	•	Member
	•	Shared team folders
	•	Manage permissions per folder




3.3 Activity & History




Activity Log
	•	Uploads
	•	Deletes
	•	Shares
	•	Edits
	•	Timestamped history




Version History
	•	File versioning
	•	Restore previous versions




3.4 User & Account Settings




Profile Settings
	•	Name
	•	Email
	•	Profile avatar




Account Settings
	•	Password change
	•	Two-factor authentication
	•	Connected devices




Storage & Plan
	•	Current plan
	•	Storage usage
	•	Upgrade / downgrade plan




Billing
	•	Payment method
	•	Invoices
	•	Subscription status




3.5 Admin / System Pages




Admin Dashboard (If applicable)
	•	User management
	•	Storage usage overview
	•	System status




4. UX & Interaction Notes
	•	Fast, responsive interactions
	•	Clear empty states (e.g. “No files yet”)
	•	Loading states for uploads
	•	Error handling (upload failed, permission denied, etc.)
	•	Accessible and keyboard-friendly




5. Technical Expectations (High Level)
	•	Fully responsive (desktop first, mobile friendly)
	•	Real SaaS logic, not mockups
	•	Clear separation of pages and components
	•	Ready to be extended with backend logic
















⸻




Final Instruction
Build this product as a complete SaaS experience, not a demo or concept.
Every page should feel intentional, usable, and production-ready, following the Minimal Scandinavian design language consistently across the entire product.



Requirements
The requirements for templates are two-part: Design & UX, and Functionality & Backend.

Design & UX

Requirements for design & ux
Template maintains a cohesive, intentional design style across all pages
Visuals, generated assets, and AI-created graphics are high quality and on-brand
Follows strong visual hierarchy and modern UI principles, with polished typography
Contrast ratios support accessibility best practices
Animations and micro-interactions are purposeful and consistent
All copy is written in clear, professional English
Template must contain some type of advanced functionality, such as a calculator, dashboard, log in functionality, advanced component or backend
Layout

Requirements for layout
Consistent spacing, padding, and alignment throughout
Page layouts are thoughtfully differentiated, avoiding repetitive patterns
Content blocks align with Lovable's component-based structure
Responsiveness

Requirements for responsiveness
Every breakpoint adapts smoothly (mobile, tablet, desktop)
Mobile navigation is fully functional and accessible
Components and interactions work across all breakpoints
No essential action relies on hover-only behaviour
Accessibility & Performance

Requirements for accessibility & performance
Complete title, description, and metadata in project settings
No unused pages, duplicate frames, or leftover drafts
Performance optimised — no oversized images or unnecessary animations
Originality

Requirements for originality
Original creation — does not copy layouts from other templates or websites that are not your own.
AI-generated content is unique and doesn't replicate copyrighted designs
Page concepts show creativity unique to the creator's style
Copyright & Licensing

Requirements for copyright & licensing
All media must be AI-generated, licensed for commercial use, or personally owned
No copyrighted logos, product images, brand assets, or trademarked materials
Support

Requirements for support
Paid templates must include a clear refund policy visible at checkout
Creators must remain available to provide customer support
Templates must be maintained over time (fix bugs, replace deprecated features)


Technical requirements
Templates must work smoothly in Lovable, with clean, reliable logic and no broken interactions
AI-generated code should be reviewed and organised so users can easily understand or customise it
We fully support all creator workflows — including designing in Figma, direct code edits in Lovable, or using external IDEs like Cursor or VS Code
Any code created outside Lovable should sync back correctly and remain editable inside the platform
Code should follow basic best practices: clear naming, tidy structure, and no unused files
Templates should not include hardcoded secrets, API keys, or settings that users can't replace
If you include API calls or backend logic, they should use secure methods and include simple setup instructions

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://nordic-cloud-vault.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/faaece04-30d6-4d6b-b979-a65145bbaf72).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
