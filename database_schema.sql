-- ==========================================
-- DIGITAL TWIN VERSE (DTV) x EDUKA DATABASE SCHEMA
-- Target Engine: PostgreSQL 15+
-- Architecture: Multi-tenant, Role-Based Access Control (RBAC), AI-powered telemetry
-- ==========================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. TENANCY & ROLE CONFIGURATIONS
CREATE TABLE schools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    subdomain VARCHAR(100) UNIQUE NOT NULL,
    logo_url VARCHAR(512),
    address TEXT,
    contact_phone VARCHAR(50),
    contact_email VARCHAR(100),
    subscription_status VARCHAR(50) DEFAULT 'trial' NOT NULL, -- trial, active, suspended
    subscription_expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TYPE user_role AS ENUM (
    'super_admin',
    'school_admin',
    'principal',
    'teacher',
    'student',
    'parent'
);

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE, -- NULL for super_admin
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(50),
    avatar_url VARCHAR(512),
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    last_login_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 2. ACADEMIC INFRASTRUCTURE
CREATE TABLE academic_years (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(50) NOT NULL, -- e.g. "2026-2027"
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT FALSE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE classes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(100) NOT NULL, -- e.g. "Grade 10"
    code VARCHAR(50) NOT NULL, -- e.g. "G10"
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE class_sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    class_id UUID REFERENCES classes(id) ON DELETE CASCADE NOT NULL,
    academic_year_id UUID REFERENCES academic_years(id) ON DELETE CASCADE NOT NULL,
    section_name VARCHAR(50) NOT NULL, -- e.g. "Section A"
    capacity INTEGER NOT NULL DEFAULT 40,
    room_number VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE subjects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(150) NOT NULL,
    code VARCHAR(50) NOT NULL, -- e.g. "MATH-101"
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 3. USER PROFILES
CREATE TABLE teacher_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    designation VARCHAR(150),
    qualification VARCHAR(255),
    specialization TEXT,
    joined_date DATE NOT NULL,
    bio TEXT,
    performance_score NUMERIC(3, 2) DEFAULT 5.00 NOT NULL -- Review score out of 5.0
);

CREATE TABLE teacher_section_subjects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    teacher_id UUID REFERENCES teacher_profiles(id) ON DELETE CASCADE NOT NULL,
    class_section_id UUID REFERENCES class_sections(id) ON DELETE CASCADE NOT NULL,
    subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE NOT NULL,
    UNIQUE(teacher_id, class_section_id, subject_id)
);

CREATE TABLE parent_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    profession VARCHAR(150),
    emergency_contact_phone VARCHAR(50) NOT NULL,
    address TEXT
);

CREATE TABLE student_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    class_section_id UUID REFERENCES class_sections(id) ON DELETE SET NULL,
    parent_id UUID REFERENCES parent_profiles(id) ON DELETE SET NULL,
    roll_number VARCHAR(50),
    date_of_birth DATE NOT NULL,
    gender VARCHAR(20) NOT NULL,
    national_id VARCHAR(100),
    passport_number VARCHAR(100),
    previous_school TEXT,
    study_area VARCHAR(150), -- Science, Commerce, Arts
    highest_qualification VARCHAR(150),
    enrollment_status VARCHAR(50) DEFAULT 'active' NOT NULL -- active, suspended, alumni
);

-- 4. ATTENDANCE & INGESTION TELEMETRY
CREATE TABLE attendance_records (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES student_profiles(id) ON DELETE CASCADE NOT NULL,
    class_section_id UUID REFERENCES class_sections(id) ON DELETE CASCADE NOT NULL,
    marked_by UUID REFERENCES users(id) ON DELETE SET NULL,
    attendance_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL, -- present, absent, late, excused
    remarks TEXT,
    is_locked BOOLEAN DEFAULT FALSE NOT NULL,
    marked_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    UNIQUE(student_id, attendance_date)
);

-- Index for attendance telemetry dashboard
CREATE INDEX idx_attendance_date_section ON attendance_records (attendance_date, class_section_id);

-- 5. ACADEMIC PERFORMANCE (GRADEBOOK)
CREATE TABLE assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    class_section_id UUID REFERENCES class_sections(id) ON DELETE CASCADE NOT NULL,
    subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE NOT NULL,
    teacher_id UUID REFERENCES teacher_profiles(id) ON DELETE SET NULL NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    due_date TIMESTAMP WITH TIME ZONE NOT NULL,
    max_score NUMERIC(5,2) DEFAULT 100.00 NOT NULL,
    file_attachment_url VARCHAR(512),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE student_assignments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    assignment_id UUID REFERENCES assignments(id) ON DELETE CASCADE NOT NULL,
    student_id UUID REFERENCES student_profiles(id) ON DELETE CASCADE NOT NULL,
    submitted_at TIMESTAMP WITH TIME ZONE,
    file_submission_url VARCHAR(512),
    score_obtained NUMERIC(5,2),
    status VARCHAR(20) DEFAULT 'pending' NOT NULL, -- pending, submitted, graded, late
    feedback TEXT,
    graded_by UUID REFERENCES users(id) ON DELETE SET NULL,
    UNIQUE(assignment_id, student_id)
);

CREATE TABLE gradebook_entries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES student_profiles(id) ON DELETE CASCADE NOT NULL,
    subject_id UUID REFERENCES subjects(id) ON DELETE CASCADE NOT NULL,
    term VARCHAR(50) NOT NULL, -- e.g., "Term 1", "Midterm", "Finals"
    exam_score NUMERIC(5,2) NOT NULL,
    assignment_avg NUMERIC(5,2),
    total_score NUMERIC(5,2) NOT NULL, -- calculated aggregate
    grade_letter VARCHAR(5) NOT NULL, -- A+, B, C etc.
    teacher_feedback TEXT,
    entered_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    UNIQUE(student_id, subject_id, term)
);

-- 6. FINANCE & LEDGER
CREATE TABLE fee_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE NOT NULL,
    name VARCHAR(150) NOT NULL, -- Tuition, Transport, Library, Lab
    description TEXT
);

CREATE TABLE fee_structures (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    fee_category_id UUID REFERENCES fee_categories(id) ON DELETE CASCADE NOT NULL,
    class_id UUID REFERENCES classes(id) ON DELETE CASCADE NOT NULL,
    academic_year_id UUID REFERENCES academic_years(id) ON DELETE CASCADE NOT NULL,
    amount NUMERIC(10,2) NOT NULL,
    due_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE student_fee_ledgers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES student_profiles(id) ON DELETE CASCADE NOT NULL,
    fee_structure_id UUID REFERENCES fee_structures(id) ON DELETE CASCADE NOT NULL,
    amount_due NUMERIC(10,2) NOT NULL,
    amount_paid NUMERIC(10,2) DEFAULT 0.00 NOT NULL,
    status VARCHAR(20) DEFAULT 'unpaid' NOT NULL, -- unpaid, partial, paid, overdue
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    UNIQUE(student_id, fee_structure_id)
);

CREATE TABLE fee_payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_fee_ledger_id UUID REFERENCES student_fee_ledgers(id) ON DELETE CASCADE NOT NULL,
    amount_paid NUMERIC(10,2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL, -- card, cash, bank_transfer
    transaction_reference VARCHAR(100) UNIQUE,
    payment_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    receipt_url VARCHAR(512)
);

-- 7. INSTITUTIONAL COMMUNICATIONS
CREATE TABLE school_broadcasts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE NOT NULL,
    sender_id UUID REFERENCES users(id) ON DELETE SET NULL NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    target_audience VARCHAR(50) DEFAULT 'all' NOT NULL, -- all, teachers, parents, students
    expires_at DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE teacher_parent_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    teacher_user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    parent_user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    sender_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    message_text TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE NOT NULL,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 8. PROPRIETARY ARTIFICIAL INTELLIGENCE CORE
CREATE TABLE ai_compass_chats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES student_profiles(id) ON DELETE CASCADE NOT NULL,
    session_title VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE ai_compass_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    chat_session_id UUID REFERENCES ai_compass_chats(id) ON DELETE CASCADE NOT NULL,
    sender VARCHAR(10) NOT NULL, -- 'student' or 'ai'
    message_text TEXT NOT NULL,
    sent_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE skill_gap_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES student_profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
    analyzed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    profile_summary TEXT NOT NULL,
    strengths TEXT[], -- Array of core strength tags
    weaknesses TEXT[], -- Array of weak subjects/skills
    job_alignment_score NUMERIC(5,2) NOT NULL -- Match rate with live industry role
);

CREATE TABLE career_roadmaps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES student_profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
    target_role VARCHAR(255) NOT NULL,
    roadmap_data JSONB NOT NULL, -- Constellation path steps, certifications, tasks
    generated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- 9. SaaS BULK DATA INGESTION LOGS
CREATE TABLE bulk_ingestion_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE NOT NULL,
    uploaded_by UUID REFERENCES users(id) ON DELETE SET NULL NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    entity_type VARCHAR(50) NOT NULL, -- 'student_profiles' or 'teacher_profiles'
    records_processed INTEGER DEFAULT 0 NOT NULL,
    records_failed INTEGER DEFAULT 0 NOT NULL,
    status VARCHAR(50) DEFAULT 'processing' NOT NULL, -- processing, completed, failed
    error_summary TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);
