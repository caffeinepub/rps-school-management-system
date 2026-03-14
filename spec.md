# RPS International School — Sector 50, Gurugram: School Management System

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Minimalist landing page with single gold "TAKE ME NOW" CTA button leading to login
- Triple-factor login: Username + Password + Security Token
- Hardware fingerprint capture on login; blocked if device not on authorized list
- 7-role RBAC system: Superior, Admin, Accountant, Teacher, Student, Parent, (+ Principal implied by Emergency Protocol)
- Per-role dashboards with null-safe data display (no fake/placeholder data)
- Superior portal: read-only global view — finances, grades, audit logs
- Admin portal: user management, authorized device IDs, session blocking, impersonation mode (view-only without Password Handshake), one-time access request flow for editing Accountant/Teacher data
- Accountant portal: FinancialLedger CRUD, fee penalty application, fee edit requests
- Teacher portal: Academic records (A–E grading), attendance management, leave management, emergency leave protocol
- Student portal: read-only grades, schedules, file sharing up to 1 GB via blob-storage
- Parent portal: fee payment view, student progress read, teacher chat, sibling linkage under single Parent_ID
- Universal Mesh Requests: any role can send formal requests to any other role
- Internal messaging/chat with file attachment support (blob-storage)
- Emergency Leave: high-priority flag, bypasses queue, triggers substitution ticket, alerts Admin
- Audit Engine: immutable log per change — who, what, when, old value, new value, device ID, deep-link to record
- Sibling linkage: multiple students under one Parent_ID, sibling fee discount flag
- Password Handshake flow for Admin elevated edit access
- Session management: active session list, ability to block/terminate sessions

### Modify
N/A — new project

### Remove
N/A — new project

## Implementation Plan

### Backend (Motoko)
1. User store: id, username, passwordHash, securityToken, role, authorizedDeviceIds[], parentId?, siblingIds[], isBlocked
2. Session store: sessionId, userId, deviceId, createdAt, isActive
3. AuditLog store: immutable append-only — actorId, action, targetId, oldValue, newValue, deviceId, timestamp, deepLink
4. AcademicRecord store: studentId, subjectId, grade (A–E | null), teacherId, updatedAt
5. Attendance store: studentId, date, status (Present/Absent/Leave | null), teacherId
6. FinancialLedger store: studentId, amount, type (Fee/Penalty/Discount), status, accountantId, createdAt
7. Leave store: requestId, userId, type (Regular/Emergency), status, createdAt, substitutionTicket?
8. MeshRequest store: fromId, toRole, toId?, subject, body, status, attachmentUrl?, createdAt
9. Chat/Message store: threadId, fromId, toId, body, attachmentUrl?, timestamp
10. SubstitutionTicket store: leaveId, teacherId, substituteId?, status
11. AccessRequest store: requestorId (Admin), targetRole, targetDataId, reason, approvedBy?, status, otp?
12. DeviceFingerprint store: userId, deviceId, label, addedAt, addedByAdminId

### Frontend
- Landing page: navy background, centered gold "TAKE ME NOW" button, no other content
- Auth flow: username → password → security token → device check → role-based redirect
- 7 distinct dashboard layouts per role, navy/gold/white palette
- All data fields null-safe: show "—" or empty state, never fake values
- Audit log viewer with deep-links
- Shared components: MeshRequest modal, Chat thread, FileUpload (blob-storage), EmergencyLeave badge
