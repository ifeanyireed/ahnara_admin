# Ahnara Admin Portal 🩺

Welcome to the **Ahnara Admin Portal**, the centralized management console and population health observatory for the **Ahnara Med Suite**—a unified healthcare platform spanning "conception to elder years" based on one shared infrastructure spine.

This Next.js application serves two primary administrative roles:
1. **System Administrators** (under `/src/app/system`): Manage B2B tenants (insurers, employers, councils), enforce centralized billing models, and audit FHIR compliance settings.
2. **Country & Regional Health Administrators** (under `/src/app/country`): Access the real-time population health observatory, register clinical providers, generate health-indicators reporting, and triage live SOS emergency dispatch signals.

---

## 🏗️ Architecture & Modules

### 1. System Administration (`/system`)
Manages the commercial and technical foundations of the Ahnara platform.
*   **B2B Workspace Manager**: Provision and configure workspaces for tenants (e.g., insurance groups like AXA Health, local government boards).
*   **Tenant Billing Manager**: Manage licensing structures (Per-User License, Grant Funded, B2B models) and view payment transactions.
*   **FHIR Compliance Hub**: Configure and monitor integration endpoints for standardized clinical data exchanges (FHIR resources).
*   **Subscription Enforcement**: Manage subscriber tier limits, validated consistently via centralized services.

### 2. Country & Regional Observatory (`/country`)
A population-level overview of healthcare indicators and operational metrics.
*   **Observatory (`/observatory`)**: Live population health analytics (gestational monitoring, immunisation scheduling, child growth curves, and ambient elder wellness trends).
*   **Provider Register (`/providers`)**: Oversee independent practices, clinic systems, and community health worker networks.
*   **Reporting (`/reporting`)**: Generate exportable, donor-compatible reports matching indicators required by funding bodies (e.g., WHO, GFF, Gates Foundation).
*   **SOS Dispatch Center (`/sos`)**: Real-time tracking of acute emergency triggers originating from consumer apps (Maternal SOS, Pediatric crisis, Elder fall/cardiac incidents) routed to active ambulances.

---

## 🎨 UI & Design Tokens

To maintain visual consistency with the design guidelines defined in [AGENTS.md](file:///Volumes/ReedBreedCC/ahnara/ahnara_admin/AGENTS.md):

*   **Colors**:
    *   *Canvas Base Background*: `#E8EFF4` (soft slate-blue)
    *   *Primary Cards*: `#FFFFFF`
    *   *Appointments & Highlights*: Background tint `#E8F3CE` (solid) / `#E8F3CE/45` (low opacity), border `#CCD0A4`, text `#608216`, indicators `#8BB436`
    *   *Brand Elements*: Core Brand Blue `#0089C1`, Sky Blue `#009EDA`, Coral `#FF904C`
    *   *Body Text*: `#0D090C` (slate black)
*   **Layouts**: Grid gaps set to `gap-3` and card padding at `p-4` or `p-6`.
*   **Transitions**: Smooth Framer Motion tab sliding transitions with `layoutId="activeTabBackground"`. Staggered delays for page entrance animations to guide the user's eye from greetings to widgets.

---

## 🛠️ Tech Stack & Setup

### Requirements
*   Node.js v18+
*   npm, yarn, or pnpm

### Getting Started

1.  Navigate to the repository root directory:
    ```bash
    cd ahnara_admin
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the local development server:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## ⚙️ Core Integration Guidelines
*   **Subscription Limits**: Centrally managed in `SubscriptionHelper.ts` and enforced via `SubscriptionService` and middleware. Database configurations must not override these service rules.
*   **Component Reuse**: Utilize components defined in `/src/components/ahnara` for standard card shapes (`AhnaraCard`), inputs (`AhnaraInput`), and buttons (`AhnaraButton`).
